"use client";

import { useState, useEffect } from "react";
import { MessageSquarePlus, X, Send, ShieldCheck, CheckCircle2, Star } from "lucide-react";
import { TestimonialStack, Testimonial } from "@/components/ui/glass-testimonial-swiper";

export interface CustomerReview {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
  verified: boolean;
  date: string;
}

const INITIAL_REVIEWS: CustomerReview[] = [];

export default function Testimonials() {
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: "",
    role: "",
    company: "",
    quote: "",
    rating: 0,
  });
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState("");

  // Load reviews from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("finaldrft_customer_reviews");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviewsList(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.quote) return;

    const initials = newReview.author
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    const created: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newReview.author.trim(),
      role: newReview.role.trim() || "Client",
      company: newReview.company.trim() || "Brand Partner",
      quote: newReview.quote.trim(),
      rating: newReview.rating || 5,
      avatar: initials || "CR",
      verified: true,
      date: "Just Now",
    };

    const updated = [created, ...reviewsList];
    setReviewsList(updated);

    try {
      localStorage.setItem("finaldrft_customer_reviews", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setNewReview({ author: "", role: "", company: "", quote: "", rating: 0 });
    setHoverRating(0);
    setSuccessMessage("Thank you! Your customer review has been published.");
    setTimeout(() => {
      setSuccessMessage("");
      setIsSubmitOpen(false);
    }, 1800);
  };

  // Convert reviewsList into Testimonial stack items matching website aesthetic
  const stackData: Testimonial[] = reviewsList.map((rev, idx) => ({
    id: rev.id,
    initials: rev.avatar,
    name: rev.author,
    role: `${rev.role} • ${rev.company}`,
    quote: rev.quote,
    tags: [
      { text: rev.company, type: idx === 0 ? "featured" : "default" },
      { text: "Verified Client", type: "default" },
    ],
    stats: [
      { icon: ShieldCheck, text: "Verified Partnership" },
    ],
    avatarGradient: [
      "linear-gradient(135deg, #475569, #0f172a)",
      "linear-gradient(135deg, #334155, #1e293b)",
      "linear-gradient(135deg, #1e293b, #020617)",
    ][idx % 3],
  }));

  return (
    <section id="testimonials" className="py-24 text-white relative bg-black border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-megalona text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Customer <span className="font-voguella italic text-glitter-silver text-4xl sm:text-6xl">Reviews</span>
          </h2>
          <button
            onClick={() => setIsSubmitOpen(true)}
            className="surface-pill inline-flex items-center gap-2 px-5 py-2 text-xs font-megalona font-bold uppercase tracking-wider text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all shadow-md cursor-pointer rounded-full"
          >
            <MessageSquarePlus className="w-4 h-4 text-slate-300" />
            <span>Submit a Review</span>
          </button>
        </div>

        {/* Customer Reviews Stack Swiper */}
        <div className="w-full flex items-center justify-center pt-6 pb-4">
          {reviewsList.length > 0 ? (
            <TestimonialStack testimonials={stackData} visibleBehind={2} />
          ) : (
            <div className="surface-card max-w-md w-full p-8 text-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Star className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-megalona text-lg font-bold text-white mb-2">No Customer Reviews Yet</h3>
              <p className="font-megalona text-xs text-slate-400 mb-6">
                Be the first verified client to publish a review about your experience with FINALDRFT.
              </p>
              <button
                onClick={() => setIsSubmitOpen(true)}
                className="editorial-button px-6 py-2.5 text-xs font-megalona font-bold inline-flex items-center gap-2"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Write First Review</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Submit Customer Review Modal */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="surface-card relative w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-white/20 rounded-3xl">
            <button
              onClick={() => setIsSubmitOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/20"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-megalona text-2xl font-bold text-white mb-2">
              Submit Customer Review
            </h3>
            <p className="font-megalona text-xs text-slate-400 mb-6">
              Share your verified feedback on working with FINALDRFT.
            </p>

            {successMessage ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs font-megalona font-semibold text-center">
                {successMessage}
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4 font-megalona">
                <div>
                  <label className="block font-mono text-xs text-slate-300 uppercase font-bold mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    placeholder="Jordan Miller"
                    className="clean-input w-full px-4 py-3 text-sm rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-xs text-slate-300 uppercase font-bold mb-1.5">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={newReview.role}
                      onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                      placeholder="Founder / CEO"
                      className="clean-input w-full px-4 py-3 text-sm rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-slate-300 uppercase font-bold mb-1.5">
                      Company / Brand
                    </label>
                    <input
                      type="text"
                      value={newReview.company}
                      onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="clean-input w-full px-4 py-3 text-sm rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-slate-300 uppercase font-bold mb-1.5">
                    Your Rating (Click to Rate)
                  </label>
                  <div className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-white/5 border border-white/15">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = star <= (hoverRating || newReview.rating);
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="p-1 transition-transform hover:scale-125 cursor-pointer outline-none focus:outline-none"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              isFilled
                                ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                                : "text-slate-600 hover:text-slate-400"
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="font-mono text-xs text-slate-300 ml-auto">
                      {newReview.rating > 0 ? `${newReview.rating} / 5 Stars` : "0 / 5 Stars"}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-slate-300 uppercase font-bold mb-1.5">
                    Customer Review / Feedback *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.quote}
                    onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                    placeholder="Describe your project outcomes, communication, and experience..."
                    className="clean-input w-full px-4 py-3 text-sm rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-500"
                  />
                </div>

                <button
                  type="submit"
                  className="editorial-button w-full py-3.5 font-megalona font-bold text-xs flex items-center justify-center gap-2 shadow-lg mt-4"
                >
                  <span>Publish Customer Review</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
