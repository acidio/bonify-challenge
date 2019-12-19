import React, { useRef } from 'react';

import { useGoogleMapAPI, useMap, useMapClickEvent } from '../hooks/googleMaps';
import './Map.css';

interface Props {
  apiKey: string;
  initialConfig?: google.maps.MapOptions;
  onMapClick: (...args: any) => void;
}

const Map: React.FC<Props> = ({ apiKey, initialConfig, onMapClick }) => {
  const googleMapAPI = useGoogleMapAPI(apiKey);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap({
    googleMapAPI,
    mapContainerRef,
    initialConfig
  });
  useMapClickEvent({ onMapClick, googleMapAPI, map });

  return <div id="map-container" ref={mapContainerRef}></div>;
};

Map.defaultProps = {
  initialConfig: {
    center: { lat: 48, lng: 8 },
    zoom: 5,
    streetViewControl: false
  }
};

export default Map;
