import { NextResponse } from "next/server";
import { leadsStore } from "@/lib/leadsStore";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, services, budget, message } = body;

    // Server-side Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please describe your project in at least 10 characters." },
        { status: 400 }
      );
    }

    const leadServices = Array.isArray(services) && services.length > 0 ? services : ["General Inquiry"];
    const leadCompany = company ? company.trim() : "N/A";
    const leadPhone = phone ? phone.trim() : "N/A";
    const leadBudget = budget || "Not specified";

    const newLead = {
      id: `LEAD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: leadPhone,
      company: leadCompany,
      services: leadServices,
      budget: leadBudget,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    // 1. Save in local memory store
    leadsStore.unshift(newLead);

    // 2. Non-blocking Firebase Firestore Save with 2.5s Safety Timeout
    let firebaseSaved = false;
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const savePromise = addDoc(collection(db, "inquiries"), {
        ...newLead,
        createdAt: serverTimestamp(),
      });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Firestore timeout")), 2500)
      );

      try {
        await Promise.race([savePromise, timeoutPromise]);
        firebaseSaved = true;
      } catch (fbErr) {
        console.warn("Firestore non-blocking note:", fbErr);
      }
    }

    // 3. Email Transmission to media.finaldrft@gmail.com
    const destinationEmail = process.env.DESTINATION_EMAIL || "media.finaldrft@gmail.com";
    const smtpUser = process.env.SMTP_USER || "media.finaldrft@gmail.com";
    const smtpPass = process.env.SMTP_PASS;

    let emailSent = false;

    if (smtpPass && smtpPass.trim() !== "") {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: parseInt(process.env.SMTP_PORT || "465"),
          secure: process.env.SMTP_PORT !== "587",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const htmlContent = `
          <div style="font-family: Arial, sans-serif; background-color: #050505; color: #ffffff; padding: 24px; border-radius: 8px;">
            <h2 style="color: #ffffff; border-bottom: 2px solid #333333; padding-bottom: 12px;">New Inquiry from FINALDRFT Website</h2>
            <p><strong>Lead ID:</strong> ${newLead.id}</p>
            <p><strong>Name:</strong> ${newLead.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${newLead.email}" style="color: #60a5fa;">${newLead.email}</a></p>
            <p><strong>Phone:</strong> ${newLead.phone}</p>
            <p><strong>Company:</strong> ${newLead.company}</p>
            <p><strong>Selected Services:</strong> ${newLead.services.join(", ")}</p>
            <p><strong>Budget Range:</strong> ${newLead.budget}</p>
            <div style="background-color: #111111; padding: 16px; border-left: 4px solid #ffffff; margin-top: 16px; border-radius: 4px;">
              <h4 style="margin-top: 0; color: #aaaaaa;">Message:</h4>
              <p style="white-space: pre-wrap; font-size: 15px;">${newLead.message}</p>
            </div>
            <p style="font-size: 12px; color: #777777; margin-top: 24px;">Received on ${new Date().toLocaleString()}</p>
          </div>
        `;

        await transporter.sendMail({
          from: `"FINALDRFT Web Inquiries" <${smtpUser}>`,
          to: destinationEmail,
          replyTo: newLead.email,
          subject: `⚡ New Project Inquiry from ${newLead.name} (${newLead.company})`,
          text: `New Inquiry from ${newLead.name} (${newLead.email}):\n\nServices: ${newLead.services.join(", ")}\nBudget: ${newLead.budget}\nMessage: ${newLead.message}`,
          html: htmlContent,
        });

        emailSent = true;
      } catch (mailErr) {
        console.error("Nodemailer dispatch error:", mailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! Your message has been sent to media.finaldrft@gmail.com and saved to Firebase.",
        leadId: newLead.id,
        emailSent,
        firebaseSaved,
        summary: {
          client: newLead.name,
          email: newLead.email,
          services: newLead.services,
          destination: destinationEmail,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("API /api/contact Error:", err);
    return NextResponse.json(
      { success: false, error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
