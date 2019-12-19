import React, { useState, useEffect } from 'react';

import Map from './components/Map';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

export interface Location {
  lat: number;
  lng: number;
}

const App: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  const onMapClick = (location: Location) =>
    setLocations([...locations, location]);

  useEffect(() => {
    console.log('locations', locations);
  }, [locations]);

  return (
    <>
      <Map onMapClick={onMapClick} apiKey={GOOGLE_MAPS_API_KEY} />
    </>
  );
};

export default App;
