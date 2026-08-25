import {
  VolunteerRequest,
  ContactMessage,
  ImpactStats,
  DonationInitiateRequest,
  DonationResponse
} from '../types';

// In-memory mock database state
const mockDb = {
  volunteers: [] as VolunteerRequest[],
  contacts: [] as ContactMessage[],
  donations: [] as DonationResponse[],
  stats: {
    mealsServed: 54280,
    childrenEducated: 1240,
    animalsRescued: 560,
    activeVolunteers: 185,
    medicalDrives: 42,
    womenTrained: 210,
    lastUpdated: new Date().toISOString()
  } as ImpactStats
};

// Helper delay to simulate network call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  /**
   * POST /api/volunteer - Register new volunteer
   */
  async registerVolunteer(data: VolunteerRequest): Promise<{ success: boolean; message: string; volunteerId: string }> {
    await delay(800);
    if (!data.fullName || !data.phone || !data.email) {
      throw new Error('Name, Phone, and Email are required.');
    }
    
    mockDb.volunteers.push(data);
    mockDb.stats.activeVolunteers += 1;

    // Send direct form payload to FormSubmit.co for handsforhomeless7@gmail.com
    try {
      fetch('https://formsubmit.co/ajax/handsforhomeless7@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[HFH VOLUNTEER REGISTRATION] ${data.fullName} (${data.location || 'Paramakudi'})`,
          _template: 'table',
          _captcha: 'false',
          fullName: data.fullName,
          phone: data.phone,
          email: data.email,
          location: data.location || 'Not Specified',
          availability: data.availability,
          skills: data.skills.join(', '),
          message: data.message || 'Ready to volunteer!'
        })
      }).catch(err => console.warn('FormSubmit background dispatch:', err));
    } catch (e) {
      // silent background catch
    }
    
    return {
      success: true,
      message: `Thank you ${data.fullName}! Your volunteer application has been registered and dispatched to handsforhomeless7@gmail.com. Our team will contact you at ${data.phone}.`,
      volunteerId: `HFH-VOL-${Math.floor(1000 + Math.random() * 9000)}`
    };
  },

  /**
   * POST /api/contact - Send direct email message to handsforhomeless7@gmail.com
   */
  async sendContactMessage(data: ContactMessage): Promise<{ success: boolean; message: string }> {
    await delay(600);
    if (!data.name || !data.email || !data.message) {
      throw new Error('Name, Email, and Message are required.');
    }

    mockDb.contacts.push(data);

    // 1. Dispatch form data via FormSubmit API to handsforhomeless7@gmail.com
    try {
      await fetch('https://formsubmit.co/ajax/handsforhomeless7@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[HFH Website Message] ${data.subject || 'General Inquiry'} from ${data.name}`,
          _template: 'table',
          _captcha: 'false',
          name: data.name,
          email: data.email,
          phone: data.phone || 'N/A',
          subject: data.subject || 'General Inquiry',
          message: data.message
        })
      });
    } catch (err) {
      console.warn('FormSubmit endpoint background call:', err);
    }

    // 2. Trigger mailto window composer pre-filled directly to handsforhomeless7@gmail.com
    const emailSubject = encodeURIComponent(`[HFH Website Inquiry] ${data.subject || 'General Inquiry'} - ${data.name}`);
    const emailBody = encodeURIComponent(
      `SENDER NAME: ${data.name}\n` +
      `SENDER EMAIL: ${data.email}\n` +
      `PHONE NUMBER: ${data.phone || 'N/A'}\n` +
      `SUBJECT: ${data.subject || 'General Inquiry'}\n\n` +
      `MESSAGE:\n${data.message}\n\n` +
      `----------------------------------------\n` +
      `Dispatched directly to handsforhomeless7@gmail.com`
    );

    const mailtoUrl = `mailto:handsforhomeless7@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 500);

    return {
      success: true,
      message: `Your message has been formatted and dispatched to handsforhomeless7@gmail.com! Opening your email client to verify sending.`
    };
  },

  /**
   * GET /api/impact-stats - Fetch dynamic impact stats
   */
  async getImpactStats(): Promise<ImpactStats> {
    await delay(400);
    return { ...mockDb.stats };
  },

  /**
   * POST /api/donate/initiate - Payment initialization for UPI/QR
   */
  async initiateDonation(data: DonationInitiateRequest): Promise<DonationResponse> {
    await delay(900);
    if (!data.amount || data.amount <= 0) {
      throw new Error('Please specify a valid donation amount.');
    }

    const txId = `HFH-UPI-${Date.now().toString().slice(-8)}`;
    const upiVpa = 'handsforhomeless7@gmail.com';
    
    // Standard UPI intent format for QR code generation
    const qrData = `upi://pay?pa=${upiVpa}&pn=Hands%20For%20Homeless%20HFH&am=${data.amount}&cu=INR&tn=Donation%20HFH%20Ramanathapuram`;

    const response: DonationResponse = {
      transactionId: txId,
      upiId: 'handsforhomeless7@gmail.com',
      upiQrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`,
      amount: data.amount,
      currency: 'INR',
      status: 'PENDING',
      timestamp: new Date().toISOString(),
      taxExemptEligible: true
    };

    mockDb.donations.push(response);
    
    if (data.amount >= 500) {
      const estimatedMeals = Math.floor(data.amount / 50);
      mockDb.stats.mealsServed += estimatedMeals;
    }

    return response;
  },

  /**
   * Mock verify donation status
   */
  async verifyDonation(transactionId: string): Promise<{ status: 'SUCCESS'; receiptNo: string }> {
    await delay(1200);
    return {
      status: 'SUCCESS',
      receiptNo: `REC-HFH-2026-${Math.floor(100000 + Math.random() * 900000)}`
    };
  }
};
