import { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} className="w-full" />
      <div className="absolute top-1/2 left-0 right-0 flex justify-between">
        <button onClick={handlePrev} className="text-white p-2 bg-gray-800">&lt;</button>
        <button onClick={handleNext} className="text-white p-2 bg-gray-800">&gt;</button>
      </div>
    </div>
  );
};

export default ImageCarousel;

