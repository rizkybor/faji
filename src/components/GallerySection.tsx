'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ZoomIn, Calendar, MapPin, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

// Enhanced dummy data with categories and details
const galleryItems = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563811771123-5e927c152940?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608659744249-e7a418fb04b6?q=80&w=2115&auto=format&fit=crop"
    ],
    category: "Championship",
    title: "National Rafting Championship 2024",
    date: "Dec 2024",
    location: "Citarik River, West Java",
    size: "large"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1563811771123-5e927c152940?q=80&w=2070&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1563811771123-5e927c152940?q=80&w=2070&auto=format&fit=crop"],
    category: "Training",
    title: "Rescue Training Basic Level",
    date: "Nov 2024",
    location: "Elo River, Central Java",
    size: "normal"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1608659744249-e7a418fb04b6?q=80&w=2115&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608659744249-e7a418fb04b6?q=80&w=2115&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624646580989-9f059e25eb78?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Expedition",
    title: "Mahakam Exploration",
    date: "Oct 2024",
    location: "Mahakam River, East Kalimantan",
    size: "normal"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1596423736737-2e11831887e4?q=80&w=2070&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1596423736737-2e11831887e4?q=80&w=2070&auto=format&fit=crop"],
    category: "Championship",
    title: "World Rafting Championship Selection",
    date: "Sep 2024",
    location: "Asahan River, North Sumatra",
    size: "normal"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1624646580989-9f059e25eb78?q=80&w=2070&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1624646580989-9f059e25eb78?q=80&w=2070&auto=format&fit=crop"],
    category: "Event",
    title: "River Clean Up Day",
    date: "Aug 2024",
    location: "Ciliwung River, Jakarta",
    size: "normal"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596423736737-2e11831887e4?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Training",
    title: "Guide Certification",
    date: "Jul 2024",
    location: "Pekalen River, Central Java",
    size: "large"
  },
];

const categories = ["All", "Championship", "Training", "Expedition", "Event"];

export default function GallerySection() {
  const t = useTranslations('Index.gallery');
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredItems = filter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const handleOpenLightbox = (item: typeof galleryItems[0]) => {
    setSelectedImage(item);
    setCurrentImageIndex(0);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage && selectedImage.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedImage.images.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage && selectedImage.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedImage.images.length) % selectedImage.images.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === cat 
                  ? 'bg-faji-blue text-white shadow-lg shadow-faji-blue/25 scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className={`relative group rounded-2xl overflow-hidden cursor-pointer shadow-md bg-gray-200 ${
                  item.size === 'large' ? 'lg:col-span-2 lg:row-span-2 md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => handleOpenLightbox(item)}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Multiple Images Indicator */}
                {item.images.length > 1 && (
                  <div className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-md rounded-lg text-white z-20">
                    <Layers className="w-4 h-4" />
                  </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-faji-blue text-white text-xs font-bold rounded-lg mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-white text-xl font-bold leading-tight mb-2">{item.title}</h3>
                    <div className="flex items-center gap-4 text-gray-300 text-sm">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {item.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {item.location}</span>
                    </div>
                    {item.images.length > 1 && (
                      <p className="text-xs text-gray-400 mt-2">{item.images.length} photos</p>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-8 h-8" />
              </button>

              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-6xl w-full max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image Container */}
                <div className="relative flex-1 bg-black min-h-[50vh] md:min-h-full group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={selectedImage.images[currentImageIndex]}
                        alt={`${selectedImage.title} - Photo ${currentImageIndex + 1}`}
                        fill
                        className="object-contain"
                        quality={100}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {selectedImage.images.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      
                      {/* Image Counter */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        {currentImageIndex + 1} / {selectedImage.images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Sidebar Info (Desktop) / Bottom Info (Mobile) */}
                <div className="w-full md:w-80 bg-white p-6 flex flex-col justify-between overflow-y-auto border-l border-gray-100">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-faji-blue/10 text-faji-blue px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {selectedImage.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{selectedImage.title}</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 text-gray-600">
                        <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-semibold">Date</p>
                          <p className="text-sm font-medium">{selectedImage.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 text-gray-600">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-semibold">Location</p>
                          <p className="text-sm font-medium">{selectedImage.location}</p>
                        </div>
                      </div>
                    </div>

                    <p className="mt-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-6">
                      Documentation from the {selectedImage.title} event held at {selectedImage.location}.
                      {selectedImage.images.length > 1 ? ` This gallery contains ${selectedImage.images.length} photos capturing key moments.` : ''}
                    </p>
                  </div>

                  {/* Thumbnail Strip */}
                  {selectedImage.images.length > 1 && (
                    <div className="mt-8">
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Photos in this set</p>
                      <div className="grid grid-cols-4 gap-2">
                        {selectedImage.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                              currentImageIndex === idx ? 'border-faji-blue ring-2 ring-faji-blue/20' : 'border-transparent hover:border-gray-300'
                            }`}
                          >
                            <Image src={img} alt="" fill className="object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
