import { Shop, Product } from '@/types';

export const shops: Shop[] = [
  {
    id: '1',
    name: 'Padaria Sion',
    description: 'Pães artesanais, bolos e um café da manhã completo todos os dias.',
    category: 'Padaria',
    address: 'Rua Grão Mogol, 500',
    district: 'Sion',
    city: 'Belo Horizonte',
    phone: '(31) 3222-1234',
    hours: 'Seg-Dom: 06:00 - 21:00'
  },
  {
    id: '2',
    name: 'Mercado do Bairro',
    description: 'Tudo o que você precisa em hortifruti, carnes e mercearia.',
    category: 'Supermercado',
    address: 'Av. Nossa Sra. do Carmo, 1200',
    district: 'Sion',
    city: 'Belo Horizonte',
    phone: '(31) 3333-5678',
    hours: 'Seg-Sáb: 08:00 - 20:00'
  },
  {
    id: '3',
    name: 'Papelaria Central',
    description: 'Material escolar, escritório e presentes criativos.',
    category: 'Papelaria',
    address: 'Rua Pium-Í, 200',
    district: 'Sion',
    city: 'Belo Horizonte',
    phone: '(31) 3444-9012',
    hours: 'Seg-Sex: 09:00 - 18:00, Sáb: 09:00 - 13:00'
  },
  {
    id: '4',
    name: 'Sion Pet Shop',
    description: 'Banho, tosa e produtos premium para o seu pet.',
    category: 'Pet Shop',
    address: 'Rua Patagônia, 150',
    district: 'Sion',
    city: 'Belo Horizonte',
    phone: '(31) 3555-3456',
    hours: 'Seg-Sex: 08:00 - 19:00, Sáb: 08:00 - 14:00'
  }
];

export const products: Product[] = [
  {
    id: '1',
    title: 'Bicicleta Caloi Aro 29',
    description: 'Bicicleta inteirinha, pouco uso. Perfeita pra dar umas bandas no parque.',
    price: 850.00,
    condition: 'Semi-novo',
    sellerName: 'João Silva',
    district: 'Sion',
    city: 'Belo Horizonte'
  },
  {
    id: '2',
    title: 'Violão Giannini',
    description: 'Violão bão demais da conta, som limpo. Acompanha capa.',
    price: 320.00,
    condition: 'Usado',
    sellerName: 'Maria Mendonça',
    district: 'Sion',
    city: 'Belo Horizonte'
  },
  {
    id: '3',
    title: 'Cafeteira Expresso',
    description: 'Cafeteira novinha, ganhei e nunca usei. Pra passar aquele cafezinho no capricho.',
    price: 150.00,
    condition: 'Novo',
    sellerName: 'Carlos Antônio',
    district: 'Sion',
    city: 'Belo Horizonte'
  },
  {
    id: '4',
    title: 'Mesa de Centro Rústica',
    description: 'Mesa de madeira maciça, um trem lindo pra enfeitar a sala.',
    price: 450.00,
    condition: 'Usado',
    sellerName: 'Ana Paula',
    district: 'Sion',
    city: 'Belo Horizonte'
  }
];
