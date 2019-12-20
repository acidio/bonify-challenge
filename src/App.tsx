import React, { useState, useEffect } from 'react';

import Map from './components/Map';
import VideoBar from './components/VideoBar';
import Sidebar from './components/Sidebar';
import { getVideosByLocation } from './services/youtube';
import './App.css';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY as string;

export interface Location {
  lat: number;
  lng: number;
}

export interface Videos {
  location: Location;
  items: any[];
}

const App: React.FC = () => {
  const [videos, setVideos] = useState<Videos[]>([]);
  const [currentLocation, setCurrentLocation] = useState<number>(0);

  const onMapClick = async (location: Location) => {
    const { lat, lng } = location;
    const response = await getVideosByLocation({ location: `${lat}, ${lng}` });

    if (response) {
      setVideos([...videos, { location, items: response.items }]);
    }
  };

  useEffect(() => {
    console.log('videos', videos);
    const videosLength = videos.length;
    if (videosLength > 0) {
      setCurrentLocation(videosLength - 1);
    }
  }, [videos]);

  return (
    <div id="main">
      <Map onMapClick={onMapClick} apiKey={GOOGLE_API_KEY} />
      <Sidebar>
        <VideoBar videos={videos} currentIndex={currentLocation} />
      </Sidebar>
    </div>
  );
};

export default App;
