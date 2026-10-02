"use client";

import React, { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';

// --- Component Interfaces ---
export interface Testimonial {
  id: string | number;
  initials: string;
  name: string;
  role: string;
  quote: string;
  tags: { text: string; type: 'featured' | 'default' }[];
  stats: { icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; text: string; }[];
  avatarGradient: string;
}

export interface TestimonialStackProps {
  testimonials: Testimonial[];
  /** How many cards to show behind the main card */
  visibleBehind?: number;
}

// --- The Component ---
export const TestimonialStack = ({ testimonials, visibleBehind = 2 }: TestimonialStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalCards = testimonials.length;

  const navigate = useCallback((newIndex: number) => {
    setActiveIndex((newIndex + totalCards) % totalCards);
  }, [totalCards]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    if (index !== activeIndex) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
    cardRefs.current[activeIndex]?.classList.add('is-dragging');
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartRef.current);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    cardRefs.current[activeIndex]?.classList.remove('is-dragging');
    if (Math.abs(dragOffset) > 50) {
      navigate(activeIndex + (dragOffset < 0 ? 1 : -1));
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, activeIndex, navigate]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  if (!testimonials?.length) return null;

  return (
    <div className="testimonials-stack relative w-full max-w-2xl mx-auto pb-16 min-h-[380px] sm:min-h-[360px] flex items-center justify-center select-none">
      {testimonials.map((testimonial, index) => {
        const isActive = index === activeIndex;
        // Calculate the card's position in the display order
        const displayOrder = (index - activeIndex + totalCards) % totalCards;

        // --- DYNAMIC STYLE CALCULATION ---
        const style: CSSProperties = {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transition: isDragging && isActive ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
        };

        if (displayOrder === 0) { // The active card
          style.transform = `translateX(${dragOffset}px)`;
          style.opacity = 1;
          style.zIndex = totalCards;
          style.cursor = isDragging ? 'grabbing' : 'grab';
        } else if (displayOrder <= visibleBehind) { // Cards stacked behind
          const scale = 1 - 0.05 * displayOrder;
          const translateY = -1.8 * displayOrder; // in rem
          style.transform = `scale(${scale}) translateY(${translateY}rem)`;
          style.opacity = 1 - 0.25 * displayOrder;
          style.zIndex = totalCards - displayOrder;
          style.pointerEvents = 'none';
        } else { // Cards that are out of view
          style.transform = 'scale(0.8) translateY(-4rem)';
          style.opacity = 0;
          style.zIndex = 0;
          style.pointerEvents = 'none';
        }

        const tagClasses = (type: 'featured' | 'default') => type === 'featured'
          ? 'bg-white/15 text-white border border-white/30 font-semibold'
          : 'bg-white/5 text-slate-300 border border-white/10';

        return (
          <div
            ref={el => { cardRefs.current[index] = el; }}
            key={testimonial.id}
            className="testimonial-card surface-card rounded-3xl bg-black/85 backdrop-blur-2xl border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden"
            style={style} // Apply dynamic styles here
            onMouseDown={(e) => handleDragStart(e, index)}
            onTouchStart={(e) => handleDragStart(e, index)}
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-megalona font-bold text-base shadow-md border border-white/20"
                    style={{ background: testimonial.avatarGradient || 'linear-gradient(135deg, #334155, #0f172a)' }}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <h3 className="text-white font-megalona font-bold text-lg leading-tight">{testimonial.name}</h3>
                    <p className="text-xs font-mono text-slate-400 mt-1">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {testimonial.tags.map((tag, i) => (
                    <span key={i} className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full uppercase ${tagClasses(tag.type)}`}>
                      {tag.text}
                    </span>
                  ))}
                </div>
              </div>

              <blockquote className="font-megalona text-slate-200 text-base sm:text-lg leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>

              {testimonial.stats && testimonial.stats.length > 0 && (
                <div className="flex items-center justify-between border-t border-white/10 pt-4 gap-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-4">
                    {testimonial.stats.map((stat, i) => {
                      const IconComponent = stat.icon;
                      return (
                        <span key={i} className="flex items-center gap-1.5 text-slate-300">
                          {IconComponent && <IconComponent className="h-3.5 w-3.5 text-slate-400" />}
                          <span>{stat.text}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Pagination Dots */}
      <div className="pagination flex items-center gap-2 justify-center absolute -bottom-2 left-0 right-0 z-30">
        {testimonials.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to testimonial ${index + 1}`}
            onClick={() => navigate(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === index
                ? 'bg-white w-7 shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
