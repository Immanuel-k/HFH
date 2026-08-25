import React, { useState } from 'react';
import { Heart, X, QrCode, Copy, Check, ShieldCheck, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { apiService } from '../services/api';
import { DonationResponse } from '../types';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCause?: string;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, defaultCause }) => {
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [cause, setCause] = useState<string>(defaultCause || 'Zero Hunger & Daily Meals');
  
  const [step, setStep] = useState<'SELECT' | 'PAYMENT' | 'SUCCESS'>('SELECT');
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [donationData, setDonationData] = useState<DonationResponse | null>(null);

  if (!isOpen) return null;

  const presets = [500, 1000, 2500, 5000];

  const getImpactMessage = (amt: number) => {
    if (amt >= 5000) return '🚀 Provides 1 woman with complete tailoring kit + 30 hot meals!';
    if (amt >= 2500) return '📚 Provides 5 children with full study kits & evening tuition for 1 month!';
    if (amt >= 1000) return '🍲 Provides 20 hot nutritious meals to street homeless in Paramakudi!';
    if (amt >= 500) return '🐶 Rescues & feeds 15 stray animals with emergency care!';
    return '❤️ Helps HFH distribute fresh daily meals and emergency supplies.';
  };

  const handleInitiatePayment = async () => {
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    if (!finalAmount || finalAmount < 10) {
      alert('Please enter a valid amount (minimum ₹10).');
      return;
    }

    setLoading(true);
    try {
      const res = await apiService.initiateDonation({
        amount: finalAmount,
        donorName: donorName || 'Anonymous Supporter',
        donorEmail: donorEmail || 'supporter@hfh.org',
        donorPhone: donorPhone || '+91 9000000000',
        paymentMethod: 'UPI',
        frequency: 'one-time',
        causeCategory: cause
      });
      setDonationData(res);
      setStep('PAYMENT');
    } catch (err: any) {
      alert(err.message || 'Could not initiate donation portal.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUPI = () => {
    if (donationData?.upiId) {
      navigator.clipboard.writeText(donationData.upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  const handleSimulatePaymentSuccess = async () => {
    if (!donationData) return;
    setLoading(true);
    try {
      await apiService.verifyDonation(donationData.transactionId);
      setStep('SUCCESS');
      
      // Trigger festive celebration confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E50914', '#ffffff', '#FFD700']
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fade-in">
      <div className="glass-panel-glow max-w-xl w-full rounded-3xl border border-red-600/50 overflow-hidden shadow-2xl shadow-red-950/80 relative">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 p-6 border-b border-red-900/40 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/40">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-white">HFH Direct Donation Portal</h3>
              <p className="text-xs text-red-400 font-semibold font-tamil">" கற்றது சமத்துவம் " • 100% Tax Exempt & Selfless</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-white hover:bg-red-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content depending on Step */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {step === 'SELECT' && (
            <div className="space-y-6">
              {/* Cause Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select Cause / Initiative
                </label>
                <select
                  value={cause}
                  onChange={e => setCause(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-red-500"
                >
                  <option value="Zero Hunger & Daily Meals">Zero Hunger & Daily Meals</option>
                  <option value="Child & Youth Education">Child & Youth Education</option>
                  <option value="Women Skill Development">Women Skill Development</option>
                  <option value="Stray Animal Rescue & Care">Stray Animal Rescue & Care</option>
                  <option value="General HFH Welfare Fund">General HFH Welfare Fund</option>
                </select>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select Preset Amount (₹ INR)
                </label>
                <div className="grid grid-cols-4 gap-3 mb-3">
                  {presets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setAmount(p);
                        setCustomAmount('');
                      }}
                      className={`py-3 rounded-xl font-heading font-extrabold text-base transition-all ${
                        amount === p && !customAmount
                          ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 border border-red-500'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      ₹{p}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    placeholder="Enter Custom Amount (e.g. 1500)"
                    value={customAmount}
                    onChange={e => {
                      setCustomAmount(e.target.value);
                    }}
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Dynamic Impact Visual Calculator */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-950 to-red-950/40 border border-red-900/40 flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">Direct Field Impact Calculator</div>
                  <p className="text-xs sm:text-sm text-red-300 font-medium">
                    {getImpactMessage(customAmount ? parseFloat(customAmount) || 0 : amount)}
                  </p>
                </div>
              </div>

              {/* Donor Details */}
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={donorName}
                    onChange={e => setDonorName(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp Number"
                    value={donorPhone}
                    onChange={e => setDonorPhone(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <button
                onClick={handleInitiatePayment}
                disabled={loading}
                className="w-full py-4 text-base font-bold text-white bg-gradient-to-r from-red-600 via-red-600 to-red-700 rounded-xl shadow-lg shadow-red-600/40 hover:shadow-red-600/70 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Proceed to UPI & QR Payment</span>
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </>
                )}
              </button>
            </div>
          )}

          {step === 'PAYMENT' && donationData && (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 inline-block">
                <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider mb-1">Donation Amount</span>
                <span className="font-heading font-black text-3xl text-red-500">₹{donationData.amount} INR</span>
                <span className="text-xs text-slate-400 block mt-1">TxID: {donationData.transactionId}</span>
              </div>

              {/* QR Code Container */}
              <div className="p-6 rounded-3xl bg-white max-w-xs mx-auto shadow-2xl border-4 border-red-600/60 text-slate-900 relative group">
                <img
                  src={donationData.upiQrUrl}
                  alt="Scan HFH UPI QR"
                  className="w-48 h-48 mx-auto"
                />
                <p className="text-xs font-bold text-slate-700 mt-2">Scan with Google Pay, PhonePe, Paytm, BHIM</p>
              </div>

              {/* UPI Copy Box */}
              <div className="max-w-md mx-auto p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block text-left">Official HFH UPI VPA ID</span>
                  <span className="text-sm font-mono font-bold text-white">{donationData.upiId}</span>
                </div>
                <button
                  onClick={handleCopyUPI}
                  className="px-3 py-1.5 rounded-lg bg-red-950 text-red-400 border border-red-800 text-xs font-semibold hover:bg-red-900 transition-colors flex items-center space-x-1"
                >
                  {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                </button>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={handleSimulatePaymentSuccess}
                  disabled={loading}
                  className="w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 transition-all flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>I Have Completed Payment (Simulate Receipt)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setStep('SELECT')}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ← Back to change amount
                </button>
              </div>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="p-8 text-center space-y-5 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-red-600/20 text-red-500 border border-red-500/40 flex items-center justify-center mx-auto shadow-2xl">
                <Heart className="w-10 h-10 fill-current animate-bounce" />
              </div>

              <h3 className="font-heading font-black text-3xl text-white">Nandri / Thank You!</h3>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                Your selfless contribution of <strong className="text-red-400">₹{donationData?.amount}</strong> to Hands for Homeless will directly nourish lives and bring smiles in Paramakudi.
              </p>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1 font-mono text-left max-w-sm mx-auto">
                <div>Receipt No: REC-HFH-2026-981240</div>
                <div>Organization: Hands for Homeless (HFH)</div>
                <div>Location: Paramakudi Taluk, Ramanathapuram</div>
                <div>Status: Verified Non-Profit Transaction</div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 text-sm font-bold text-white bg-red-600 rounded-xl shadow-lg shadow-red-600/30 hover:bg-red-500 transition-colors"
              >
                Done & Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
