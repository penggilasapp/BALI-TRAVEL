export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateToIdr: number; // 1 Unit of this currency = X IDR
}

export type TravelStyle = 'backpacker' | 'comfort' | 'luxury' | 'nomad';

export interface BudgetCategoryItem {
  id: string;
  label: string;
  idrPerDay: number;
  iconName: string;
  tip?: string;
}

export interface TravelBudgetState {
  days: number;
  travelers: number;
  style: TravelStyle;
  accommodationIdrPerDay: number;
  foodIdrPerDay: number;
  transportIdrPerDay: number;
  activitiesIdrPerDay: number;
  wellnessIdrPerDay: number;
  shoppingIdrPerDay: number;
  includeTouristLevy: boolean; // 150,000 IDR per person
  emergencyBufferPercent: number; // e.g. 10%
  selectedCurrency: string;
  addedDestinationsCost: number; // accumulated from destinations
}

export type BaliRegion = 
  | 'All Regions'
  | 'Ubud & Gianyar'
  | 'South Bali & Bukit'
  | 'Canggu, Seminyak & West'
  | 'North & Bedugul'
  | 'East Bali & Karangasem'
  | 'Nusa Penida & Islands';

export type DestinationCategory = 'temple' | 'waterfall' | 'beach' | 'culture' | 'viewpoint' | 'nature' | 'food';

export interface BaliDestination {
  id: string;
  name: string;
  balineseName?: string;
  region: BaliRegion;
  category: DestinationCategory;
  entranceFeeIDR: number;
  parkingFeeIDR: number;
  image: string;
  badge: 'Authentic Local Gem' | 'Sacred Heritage' | 'Iconic View' | 'Secluded Paradise' | 'Culinary Treasure';
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  etiquetteTips: string;
  bestTime: string;
  travelTimeFromKutaMinutes: number;
  travelTimeFromUbudMinutes: number;
  nearbyFood: string;
  rating: number;
  reviewsCount: number;
}

export interface BaliRoute {
  id: string;
  origin: string;
  destination: string;
  distanceKm: number;
  scooterMinutes: number;
  carMinutes: number;
  trafficNote: string;
  scenicHighlights: string;
}
