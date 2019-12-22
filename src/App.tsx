import React, { useState, useEffect } from 'react';

import Map from './components/Map';
import VideoBar from './components/VideoBar';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import { getVideosByLocation } from './services/youtube';
import { OnNavigate, Videos, Location } from './types';

import './App.css';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY as string;

const App: React.FC = () => {
  const [videos, setVideos] = useState<Videos[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onNavigate: OnNavigate = direction => {
    setCurrentIndex(currentIndex + (direction === 'back' ? -1 : 1));
  };

  const onMapClick = async (location: Location) => {
    const { lat, lng } = location;
    const response = await getVideosByLocation({ location: `${lat}, ${lng}` });

    if (response) {
      setVideos([...videos, { location, items: response.items }]);
    }
  };

  useEffect(() => {
    const videosLength = videos.length;
    if (videosLength > 0) {
      setCurrentIndex(videosLength - 1);
    }
  }, [videos]);

  const videosToShow = videos.length > 0 ? videos[currentIndex].items : null;

  return (
    <div id="main">
      <Map onMapClick={onMapClick} apiKey={GOOGLE_API_KEY} />
      <Sidebar>
        <Navigation
          currentIndex={currentIndex}
          onNavigate={onNavigate}
          historyLength={videos.length}
        />

        {!videosToShow && (
          <div className="no-locations">
            Click on the map to find the latest videos of the clicked location.
          </div>
        )}

        {videosToShow && videosToShow.length === 0 && (
          <div className="no-locations">
            No videos were found in this location, try a different one.
          </div>
        )}

        {videosToShow && <VideoBar videos={videosToShow} />}
      </Sidebar>
    </div>
  );
};

export default App;
