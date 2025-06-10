"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from './BitSindri/Footer';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [artExhibitionImages, setArtExhibitionImages] = useState([]);
  const [insigniaImages, setInsigniaImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    async function validateImages() {
      try {
        // Load wall painting images (1 to 26)
        const wallPaintingPromises = Array.from({ length: 26 }, async (_, i) => {
          const src = `/wall-painting/${i + 1}.jpg`;
          try {
            const res = await fetch(src, { method: 'HEAD' });
            if (res.ok) return src;
            return null;
          } catch {
            return null;
          }
        });

        // Load art exhibition images (1 to 13)
        const artExhibitionPromises = Array.from({ length: 13 }, async (_, i) => {
          const src = `/Art-Exhibition/${i + 1}.jpg`;
          try {
            const res = await fetch(src, { method: 'HEAD' });
            if (res.ok) return src;
            return null;
          } catch {
            return null;
          }
        });

        // Load creations images (1 to 18)
        const insigniaPromises = Array.from({ length: 18 }, async (_, i) => {
          const src = `/creationsg/${i + 1}.jpg`;
          try {
            const res = await fetch(src, { method: 'HEAD' });
            if (res.ok) return src;
            return null;
          } catch {
            return null;
          }
        });

        const [validWallPaintings, validArtExhibition, validInsignia] = await Promise.all([
          Promise.all(wallPaintingPromises),
          Promise.all(artExhibitionPromises),
          Promise.all(insigniaPromises)
        ]);

        setImages(validWallPaintings.filter(Boolean));
        setArtExhibitionImages(validArtExhibition.filter(Boolean));
        setInsigniaImages(validInsignia.filter(Boolean));
        
        // Trigger stagger animation
        setTimeout(() => setImagesLoaded(true), 100);
      } catch (err) {
        setError('Failed to load images');
        console.error('Error loading images:', err);
      } finally {
        setLoading(false);
      }
    }
    validateImages();
  }, []);

  if (loading) {
    return (
      <div className="p-5 py-32 bg-gray-50 min-h-screen flex items-center justify-center animate-fade-in">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#d25c25] border-t-transparent shadow-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 py-32 bg-gray-50 min-h-screen flex items-center justify-center text-red-500 animate-fade-in">
        <div className="bg-white p-6 rounded-lg shadow-lg animate-bounce-in">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">⚠</div>
            <p className="text-lg font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-5 pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-[#d25c25] to-[#e67e22] bg-clip-text">
              Wall Painting
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our exquisite collection of wall paintings that transform spaces into artistic masterpieces. 
              Each piece tells a unique story, bringing color, emotion, and character to your walls with carefully 
              crafted designs that inspire and captivate.
            </p>
            <div className="mt-8 flex items-center justify-center space-x-2 text-gray-500">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#d25c25] to-transparent"></div>
              <span className="text-sm font-medium">Gallery Collection</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#d25c25] to-transparent"></div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-5">
          {images.map((src, index) => (
            <div 
              key={index} 
              className={`break-inside-avoid mb-2.5 relative group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:z-10 ${
                imagesLoaded ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-4'
              }`}
              style={{ 
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'forwards'
              }}
              onClick={() => setSelectedImage({ src, index, type: 'wall-painting' })}
            >
              <div className="relative aspect-auto overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300">
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  width={500}
                  height={500}
                  className="w-full transition-transform duration-300 group-hover:scale-110"
                  priority={index < 4}
                  loading={index >= 4 ? "lazy" : undefined}
                  onError={(e) => {
                    console.error(`Failed to load image: Image ${index + 1} "${src}"`);
                    e.target.style.display = 'none';
                  }}
                />
                
              

                {/* Image number badge */}
                {/* <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  #{index + 1}
                </div> */}
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Art Exhibition Section */}
        <div className="max-w-7xl mx-auto mt-24 pt-16 border-t border-gray-200">
          <div className="text-center mb-16 animate-fade-in">
             <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-[#d25c25] to-[#e67e22] bg-clip-text">
              Art Exhibition
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Step into our curated art exhibition featuring contemporary masterpieces and timeless classics. 
              This collection showcases diverse artistic expressions from talented artists around the world, 
              each piece carefully selected to inspire, provoke thought, and celebrate the beauty of creative expression.
            </p>
            <div className="mt-8 flex items-center justify-center space-x-2 text-gray-500">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#8b5a3c] to-transparent"></div>
              <span className="text-sm font-medium">Exhibition Showcase</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#8b5a3c] to-transparent"></div>
            </div>
          </div>

          {/* Art Exhibition Gallery Grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-5">
            {artExhibitionImages.map((src, index) => (
              <div 
                key={`Art-Exhibition-${index}`} 
                className={`break-inside-avoid mb-2.5 relative group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:z-10 ${
                  imagesLoaded ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-4'
                }`}
                style={{ 
                  animationDelay: `${(images.length + index) * 50}ms`,
                  animationFillMode: 'forwards'
                }}
                onClick={() => setSelectedImage({ src, index: images.length + index, type: 'art-exhibition', originalIndex: index })}
              >
                <div className="relative aspect-auto overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300">
                  <Image
                    src={src}
                    alt={`Art exhibition piece ${index + 1}`}
                    width={500}
                    height={500}
                    className="w-full transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      console.error(`Failed to load art exhibition image: ${index + 1} "${src}"`);
                      e.target.style.display = 'none';
                    }}
                  />
                  
               

                  {/* Image number badge */}
                  {/* <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    #E{index + 1}
                  </div> */}
                </div>
              </div>
            ))}
            
            {/* Show placeholder if no art exhibition images found */}
            {artExhibitionImages.length === 0 && (
              <div className="break-inside-avoid mb-2.5 relative bg-white rounded-2xl shadow-sm p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#8b5a3c] to-[#a0522d] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-700 mb-2">Add Exhibition Images</h4>
                <p className="text-sm text-gray-500">Place your art exhibition images in the /public/art-exhibition/ folder</p>
                <p className="text-xs text-gray-400 mt-2">Files should be named: 1.jpg, 2.jpg, 3.jpg, etc.</p>
              </div>
            )}
          </div>
        </div>

        {/* Creations - Intra School Painting Competition Section */}
        <div className="max-w-7xl mx-auto mt-24 pt-16 border-t border-gray-200">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-[#d25c25] to-[#e67e22] bg-clip-text">
              Creations - Intra School Painting Competition
            </h2>
            <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Celebrate the artistic talents of our students through this vibrant showcase of creativity and imagination. 
              Our intra-school painting competition brings together young artists who express their unique perspectives, 
              emotions, and stories through brushstrokes, creating a wonderful display of emerging artistic excellence.
            </p>
            <div className="mt-8 flex items-center justify-center space-x-2 text-gray-500">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#d25c25] to-transparent"></div>
              <span className="text-sm font-medium">Student Creations</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#d25c25] to-transparent"></div>
            </div>
          </div>

          {/* Creations Gallery Grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-5">
            {insigniaImages.map((src, index) => (
              <div 
                key={`creations-${index}`} 
                className={`break-inside-avoid mb-2.5 relative group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:z-10 ${
                  imagesLoaded ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-4'
                }`}
                style={{ 
                  animationDelay: `${(images.length + artExhibitionImages.length + index) * 50}ms`,
                  animationFillMode: 'forwards'
                }}
                onClick={() => setSelectedImage({ src, index: images.length + artExhibitionImages.length + index, type: 'creations', originalIndex: index })}
              >
                <div className="relative aspect-auto overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300">
                  <Image
                    src={src}
                    alt={`Student creation ${index + 1}`}
                    width={500}
                    height={500}
                    className="w-full transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      console.error(`Failed to load creation image: ${index + 1} "${src}"`);
                      e.target.style.display = 'none';
                    }}
                  />
                  
                

                  {/* Image number badge */}
                  {/* <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    #C{index + 1}
                  </div> */}
                </div>
              </div>
            ))}
            
            {/* Show placeholder if no creation images found */}
            {insigniaImages.length === 0 && (
              <div className="break-inside-avoid mb-2.5 relative bg-white rounded-2xl shadow-sm p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#d25c25] to-[#e67e22] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-700 mb-2">Add Student Creations</h4>
                <p className="text-sm text-gray-500">Place student painting images in the /public/creationsg/ folder</p>
                <p className="text-xs text-gray-400 mt-2">Files should be named: 1.jpg, 2.jpg, 3.jpg, etc.</p>
              </div>
            )}
          </div>
        </div>

      </div>
        <Footer />

      {/* Modal for selected image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 active:scale-95"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <Image
              src={selectedImage.src}
              alt={`Gallery image ${selectedImage.index + 1}`}
              width={800}
              height={600}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
            
            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <div className="text-white">
                <p className="font-bold text-lg mb-1">
                  {selectedImage.type === 'creations' 
                    ? `Student Creation #${selectedImage.originalIndex + 1}` 
                    : selectedImage.type === 'art-exhibition'
                    ? `Art Exhibition Piece #${selectedImage.originalIndex + 1}`
                    : `Wall Painting #${selectedImage.index + 1}`
                  }
                </p>
                <p className="text-white/80 text-sm">
                  {selectedImage.type === 'creations' 
                    ? `${selectedImage.originalIndex + 1} of ${insigniaImages.length} student creations`
                    : selectedImage.type === 'art-exhibition'
                    ? `${selectedImage.originalIndex + 1} of ${artExhibitionImages.length} exhibition pieces`
                    : `${selectedImage.index + 1} of ${images.length} wall paintings`
                  }
                </p>
              </div>
            </div>

            {/* Navigation arrows */}
            {selectedImage.index > 0 && (
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 transition-all duration-200 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  // Navigate to previous image
                  let prevIndex = selectedImage.index - 1;
                  let type, originalIndex, src;
                  if (prevIndex < images.length) {
                    type = 'wall-painting';
                    originalIndex = undefined;
                    src = images[prevIndex];
                  } else if (prevIndex < images.length + artExhibitionImages.length) {
                    type = 'art-exhibition';
                    originalIndex = prevIndex - images.length;
                    src = artExhibitionImages[originalIndex];
                  } else {
                    type = 'creations';
                    originalIndex = prevIndex - images.length - artExhibitionImages.length;
                    src = insigniaImages[originalIndex];
                  }
                  setSelectedImage({
                    src,
                    index: prevIndex,
                    type,
                    ...(originalIndex !== undefined ? { originalIndex } : {})
                  });
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            {selectedImage.index < (images.length + artExhibitionImages.length + insigniaImages.length - 1) && (
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 transition-all duration-200 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  // Navigate to next image
                  let nextIndex = selectedImage.index + 1;
                  let type, originalIndex, src;
                  if (nextIndex < images.length) {
                    type = 'wall-painting';
                    originalIndex = undefined;
                    src = images[nextIndex];
                  } else if (nextIndex < images.length + artExhibitionImages.length) {
                    type = 'art-exhibition';
                    originalIndex = nextIndex - images.length;
                    src = artExhibitionImages[originalIndex];
                  } else {
                    type = 'creations';
                    originalIndex = nextIndex - images.length - artExhibitionImages.length;
                    src = insigniaImages[originalIndex];
                  }
                  setSelectedImage({
                    src,
                    index: nextIndex,
                    type,
                    ...(originalIndex !== undefined ? { originalIndex } : {})
                  });
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                </button>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes bounce-in {
          0% { 
            opacity: 0; 
            transform: scale(0.8); 
          }
          50% { 
            transform: scale(1.05); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        @keyframes modal-in {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        
        .animate-modal-in {
          animation: modal-in 0.4s ease-out;
        }
      `}</style>
    </>
  );
}