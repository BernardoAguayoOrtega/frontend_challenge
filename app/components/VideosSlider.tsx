'use client';

import React from 'react';
import { Video } from '../types/movie';
import './VideoSlider.css';

interface VideosSliderProps {
  videos: Video[];
}

const VideosSlider: React.FC<VideosSliderProps> = ({ videos }) => {
  const scrollToVideo = (index: number) => {
    const container = document.querySelector('.carousel-content');
    if (container) {
      const scrollAmount = container.clientWidth * index;
      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="my-8">
      <h3 className="text-xl font-bold mb-4">Trailers</h3>
      <div className="carousel-container">
        <div className="carousel-content">
          {videos.map((video, index) => (
            <div key={video.id} className="carousel-item">
              <iframe
                className="video-frame"
                src={`https://www.youtube.com/embed/${video.key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.name}
              ></iframe>
            </div>
          ))}
        </div>
        <div className="carousel-navigation">
          {videos.map((_, index) => (
            <button
              key={index}
              className="carousel-dot"
              onClick={() => scrollToVideo(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideosSlider;
