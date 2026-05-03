export interface Shop {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  district: string;
  city: string;
  imageUrl?: string;
  phone?: string;
  hours?: string;
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
