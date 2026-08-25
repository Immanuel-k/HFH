import React, { useState, useEffect } from 'react';
import { Camera, X } from 'lucide-react';
import { StoryGalleryItem } from '../types';
import { Card3D } from './Card3D';

export const galleryItems: StoryGalleryItem[] = [
  {
    id: 'g1',
    title: 'Food Drives',
    category: '',
    location: '',
    date: '',
    image: '/hunger.jpg',
    description: 'Providing hot, nutritious meals to homeless elderly individuals and daily wage workers who would otherwise go to sleep hungry.'
  },
  {
    id: 'g2',
    title: 'Karpi',
    category: '',
    location: '',
    date: '',
    image: '/education.jpg',
    description: 'Volunteer teachers providing free tuition, school bags, and study project guidance to underprivileged rural students.'
  },
  {
    id: 'g3',
    title: 'Stray Dog Feeding',
    category: '',
    location: '',
    date: '',
    image: '/animals.jpg',
    description: 'Feeding stray dogs daily, treating minor wounds, and installing water bowls during peak summer months.'
  },
  {
    id: 'g4',
    title: 'Kalaikural',
    category: '',
    location: '',
    date: '',
    image: '/kalaikural.jpg',
    description: 'Empowering children and youth through creative art workshops, drawing drives, and handicraft skills.'
  }
];

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<StoryGalleryItem | null>(null);

  // Lock body scrolling when gallery lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-24 relative z-10 bg-[#07070a]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-950/80 border border-red-800/60 px-3.5 py-1.5 rounded-full text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Ground Reality & Field Stories</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            HFH in <span className="text-red-500">Action</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Real moments captured from our food drives, Karpi learning sessions, stray dog feeding, and Kalaikural art drives.
          </p>
        </div>

        {/* Image Grid with High Quality Real Field Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <Card3D
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-black/60">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-transparent to-transparent opacity-85"></div>
                </div>

                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-white group-hover:text-red-400 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (z-[9999] completely covers navbar) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fade-in overflow-hidden"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="glass-panel-glow max-w-3xl w-full rounded-3xl overflow-hidden border border-red-600/40 relative max-h-[90vh] flex flex-col bg-[#0c0c0f]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* High Visibility Prominent Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-50 px-3.5 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-2xl flex items-center justify-center space-x-1.5 hover:scale-105 transition-all cursor-pointer border border-white/30"
              aria-label="Close image detail"
              title="Close Popup"
            >
              <X className="w-5 h-5 shrink-0" />
              <span className="text-xs font-extrabold uppercase tracking-wider hidden sm:inline">Close</span>
            </button>

            <div className="relative w-full max-h-[60vh] overflow-hidden bg-black flex items-center justify-center p-3">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[55vh] w-auto max-w-full object-contain rounded-2xl shadow-xl"
              />
            </div>

            <div className="p-6 bg-[#0c0c0f]">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">{selectedImage.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
