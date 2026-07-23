export type PhoneColor = 'natural' | 'space-black' | 'desert-gold' | 'alpine-white';

export interface ColorOption {
  id: PhoneColor;
  name: string;
  hex: string;
  badge?: string;
  imageAngleFront: string;
  imageAngleSide: string;
  imageAngleBack: string;
  imageAngle3D: string;
}

export interface StorageOption {
  size: string;
  priceDelta: number;
  description: string;
}

export interface PhoneModel {
  id: string;
  name: string;
  tagline: string;
  startingPrice: number;
  monthlyPrice: number;
  rating: number;
  reviewsCount: number;
  displaySize: string;
  chip: string;
  camera: string;
  batteryLife: string;
  weight: string;
  finishes: ColorOption[];
  storageOptions: StorageOption[];
  description: string;
  badge?: string;
}

export interface Accessory {
  id: string;
  name: string;
  tagline: string;
  category: 'audio' | 'power' | 'cases' | 'straps' | 'lenses';
  price: number;
  rating: number;
  image: string;
  colors: { name: string; hex: string }[];
  isNew?: boolean;
  compatibilities: string[];
}

export interface CartItem {
  id: string; // unique cart item id
  productId: string;
  type: 'phone' | 'accessory';
  name: string;
  selectedColor: ColorOption | { name: string; hex: string };
  selectedStorage?: string;
  engravingText?: string;
  hasAuraCare?: boolean;
  tradeInDiscount?: number;
  price: number;
  quantity: number;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName: string;
}

export interface PressAward {
  id: string;
  publication: string;
  award: string;
  quote: string;
  year: string;
}
