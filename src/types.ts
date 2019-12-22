export interface Location {
  lat: number;
  lng: number;
}

export interface Videos {
  location: Location;
  items: any[];
}

type Direction = 'back' | 'forward';
export type OnNavigate = (direction: Direction) => void;
