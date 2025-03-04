# 🏠 Real Estate Explorer [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/your-repo/real-estate-app/pulls)

Find your dream home with this mobile-first property discovery app. Built with React Native and Appwrite. 

## ✨ Features

- **Google OAuth Login**: One-tap sign-in with your Google account
- **Smart Search**: Find properties by name, location, or keywords
- **Custom Filters**: Refine by price, property type, or ratings
- **Favorites System**: Save listings with heart icons
- **Rich Details**: High-res images, maps, agent contacts, and neighborhood insights
- **Offline Support**: Browse recently viewed properties without internet

## 🔧 Built With

- **React Native** (TypeScript) - Core framework
- **Appwrite** - Backend services (Auth + Database)
- **Expo Router** - Navigation
- **Tailwind CSS** - Styling
- **React Query** - Data fetching

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- Expo CLI (`npm install -g expo-cli`)
- iOS/Android simulator or physical device

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/real-estate-app.git
   cd real-estate-app
# Real Estate App

## Installation

### Install Dependencies:
```bash
npm install
```

### Start the App:
```bash
npx expo start --port [YOUR PORT NUMBER HERE]
```

Open the expo application on mobile to view this application.

## 📂 Project Structure
```
real-estate-app/
├── app/
│   ├── (auth)/          # Login/signup flows
│   ├── (tabs)/          # Bottom tab navigation
│   └── details/[id].tsx # Property detail screen
├── components/          # Reusable UI components
├── constants/           # Icons, images, theme config
├── lib/
│   ├── appwrite.ts      # Appwrite client setup
│   └── queries/         # React Query hooks
└── types/               # TypeScript interfaces
```

## 🔑 Key Components

### `app/(auth)/sign-in.tsx`
Handles Google OAuth flow with Appwrite. Redirects to home after successful login.

### `lib/queries/useProperties.ts`
Custom hook for fetching/filtering properties with React Query.

### `components/PropertyCard.tsx`
Responsive card component showing price, beds/baths, and favorite button.

### `App Screens`
![WhatsApp Image 2025-02-28 at 09 51 42_edaedd9f](https://github.com/user-attachments/assets/8d8f80a5-2bc3-4925-86c3-2678d400ab50)
![WhatsApp Image 2025-02-28 at 09 51 42_a0f34467](https://github.com/user-attachments/assets/94260613-9fd0-44f1-9b88-60d771b9fa41)
![WhatsApp Image 2025-02-28 at 09 51 42_13595b71](https://github.com/user-attachments/assets/779422b2-c703-4876-8c4c-98bd44ccc3cc)
![WhatsApp Image 2025-02-28 at 09 51 41_ea584546](https://github.com/user-attachments/assets/defb4151-f250-438a-a797-332993bc6cf2)





