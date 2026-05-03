# Sion Portal

Sion Portal is a local commerce and marketplace platform designed specifically for the Sion district in Belo Horizonte. Built with Next.js and powered by Supabase, the portal connects local businesses with residents through a curated directory, a robust marketplace, and real-time localized features.

## 🚀 Features

- **Local Shop Directory:** Discover and explore businesses located strictly within the Sion district.
- **Supabase-Backed Marketplace:** A secure, scalable, and fully functional marketplace for local vendors.
- **Real-Time CEP Validation:** Enforces local commerce security by restricting registration and services to verified local addresses.
- **Dynamic Category Filtering:** Easily find what you need from local businesses with intuitive filtering.
- **Administrative CRUD Interfaces:** Powerful management tools for shops, users, and promotional ad banners.

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** Vanilla CSS Modules for a modern, vibrant, and customized premium aesthetic.
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Language:** TypeScript

## 📦 Getting Started

### Prerequisites

Ensure you have Node.js (v18+) and npm installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sion-portal.git
   cd sion-portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Set up your `.env.local` file with the necessary Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🤝 Contributing

We welcome community contributions to help improve the Sion Portal! 

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing code style.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌟 Acknowledgments

- The resilient local commerce community of the Sion district, Belo Horizonte.
