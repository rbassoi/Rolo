export interface Shop {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  district: string;
  city: string;
  state?: string;
  imageUrl?: string;
  phone?: string;
  hours?: string;
  rating?: number;
  total_reviews?: number;
  lat?: number;
  lng?: number;
  place_id?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: 'Novo' | 'Usado' | 'Semi-novo';
  sellerName: string;
  district: string;
  city: string;
  imageUrl?: string;
}
