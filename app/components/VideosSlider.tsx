import React from 'react';
import { Video } from '../types/movie';
import './VideoSlider.css';

interface VideosSliderProps {
  videos: Video[];
}

const VideosSlider: React.FC<VideosSliderProps> = ({ videos }) => {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold mb-4">Trailers</h3>
      <section className="carousel" aria-label="Gallery">
        <ol className="carousel__viewport">
          {videos.map((video, index) => (
            <li
              key={video.id}
              id={`carousel__slide${index + 1}`}
              className="carousel__slide"
            >
              <div className="carousel__snapper">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.name}
                ></iframe>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 text-sm">
                  <span>{video.name}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <aside className="carousel__navigation">
          <ol className="carousel__navigation-list">
            {videos.map((_, index) => (
              <li key={index} className="carousel__navigation-item">
                <a
                  href={`#carousel__slide${index + 1}`}
                  className="carousel__navigation-button"
                >
                  Go to slide {index + 1}
                </a>
              </li>
            ))}
          </ol>
        </aside>
      </section>
    </div>
  );
};

export default VideosSlider;
