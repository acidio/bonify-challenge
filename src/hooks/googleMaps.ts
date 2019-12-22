import { useEffect, useState } from 'react';

// Custom hook for loading Google Maps API
export const useGoogleMapAPI = (apiKey: string) => {
  const [googleMapAPI, setGoogleMapAPI] = useState();

  useEffect(() => {
    const onLoad = () => {
      setGoogleMapAPI(window.google);
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    document.head.append(script);
    script.addEventListener('load', onLoad);

    return () => script.removeEventListener('load', onLoad);
  }, [apiKey]);

  return googleMapAPI;
};

interface UseMapProps {
  googleMapAPI: any;
  mapContainerRef: React.RefObject<HTMLDivElement>;
  initialConfig?: google.maps.MapOptions;
}

// Custom hook to initiate a Google Map
export const useMap = ({
  googleMapAPI,
  mapContainerRef,
  initialConfig
}: UseMapProps) => {
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (!googleMapAPI || !mapContainerRef.current) return;

    const map = new googleMapAPI.maps.Map(
      mapContainerRef.current,
      initialConfig
    );
    setMap(map);
  }, [googleMapAPI, mapContainerRef, initialConfig]);

  return map;
};

interface UseMapClickEventProps {
  googleMapAPI: any;
  onMapClick: (params: any) => void;
  map: google.maps.Map | undefined;
}

// Custom hook to add on click event on a existing Google Maps
export const useMapClickEvent = ({
  onMapClick,
  googleMapAPI,
  map
}: UseMapClickEventProps) => {
  useEffect(() => {
    if (!googleMapAPI || !map) return;

    const listener = googleMapAPI.maps.event.addListener(
      map,
      'click',
      (e: any) => {
        onMapClick({
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        });
      }
    );

    return () => {
      googleMapAPI.maps.event.removeListener(listener);
    };
  }, [googleMapAPI, map, onMapClick]);
};
