# RN Web3 Assessment

A production-ready React Native Web3 application built with **Expo**, **TypeScript**, **Reown AppKit (WalletConnect)**, **ethers.js**, **React Query**, **Zustand**, and **NativeWind**.

The application allows users to connect their crypto wallet, browse cryptocurrency data from CoinGecko, view token details, interact with a smart contract deployed on the Ethereum Sepolia Testnet, and manage favorite tokens with persistent storage.

---

# Features

## Core Features

- Connect wallet using Reown AppKit (WalletConnect)
- MetaMask mobile support
- CoinGecko API integration
- Infinite scrolling
- Search cryptocurrencies
- Token details screen
- Smart Contract Read
- Smart Contract Write
- Transaction confirmation
- Error handling
- Loading & Empty states
- Responsive UI
- NativeWind based design system

---

# Bonus Features

- ✅ Persist wallet session
- ✅ Dark mode
- ✅ Infinite scrolling
- ✅ Favorite tokens
- ✅ React Query caching
- ✅ Pull to refresh
- ✅ Reusable Design System
- ✅ Clean Architecture

---

# Tech Stack

- React Native
- Expo
- TypeScript
- NativeWind
- React Navigation
- Zustand
- TanStack React Query
- Reown AppKit
- ethers.js
- Axios
- CoinGecko API

---

# Setup

## Clone Repository

```bash
git clone https://github.com/nandkishorshinde55/RNWeb3Assessment.git
```

```bash
cd RNWeb3Assessment
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Setup

1. Copy the example environment file.

```bash
cp .env.example .env
```

2. Update `.env` with your own values.

```env
EXPO_PUBLIC_REOWN_PROJECT_ID=YOUR_REOWN_PROJECT_ID

EXPO_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS

EXPO_PUBLIC_COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
```

### How to obtain these values

#### Reown Project ID

1. Visit https://cloud.reown.com
2. Create a project.
3. Copy the Project ID.

#### RPC URL

Use any Ethereum Sepolia RPC provider.

Examples:

- Alchemy
- Infura
- QuickNode
- Ankr

#### Smart Contract Address

Deploy the provided contract to the Sepolia network and update the deployed address.

## Run Application

### Install Expo dependencies

```bash
npx expo install
```

### Android

```bash
npx expo run:android
```

### iOS

```bash
npx expo run:ios
```

### Development Server

```bash
npx expo start
```

---

# Major Libraries

## Reown AppKit (WalletConnect)

Purpose

- Connect Web3 wallets
- Wallet session management
- WalletConnect v2 support
- Mobile deep linking

Why selected

- Modern WalletConnect implementation
- Supports MetaMask and multiple wallets
- Production-ready
- Secure session handling

---

## ethers.js

Purpose

- Read smart contract data
- Write transactions
- Sign blockchain transactions
- Ethereum RPC communication

Why selected

- Lightweight
- TypeScript support
- Industry standard
- Excellent documentation

---

## TanStack React Query

Purpose

- API data fetching
- Server state management
- Request caching
- Infinite scrolling

Why selected

- Automatic caching
- Retry mechanism
- Pull to refresh
- Pagination support

---

## Zustand

Purpose

- Global state management

Used for

- Theme
- Favorite Tokens
- Wallet state
- UI preferences

Why selected

- Very lightweight
- Minimal boilerplate
- Excellent TypeScript support

---

## React Navigation

Purpose

Navigation between screens.

Screens

- Wallet
- Dashboard
- Token Details
- Smart Contract

Why selected

- Official React Native navigation library
- Native Stack performance
- Deep linking support

---

## NativeWind

Purpose

Styling.

Why selected

- Tailwind CSS syntax
- Reusable design system
- Dark mode support
- Rapid UI development

---

## Axios

Purpose

API communication.

Used for

- CoinGecko API

Why selected

- Cleaner API
- Request interceptors
- Better error handling

---

# Architecture

The project follows **Clean Architecture** by separating responsibilities into independent layers.

```
src
│
├── api
│
├── assets
│
├── components
│   ├── common
│   ├── crypto
│   ├── token
│   ├── contract
│   └── wallet
│
├── config
│
├── constants
│
├── hooks
│
├── navigation
│
├── providers
│
├── screens
│
├── services
│
├── store
│
├── theme
│
├── types
│
└── utils
```

### Folder Responsibilities

| Folder | Purpose |
|---------|----------|
| api | API services |
| components | Reusable UI components |
| screens | Screen implementations |
| hooks | Custom reusable hooks |
| services | Blockchain & business logic |
| store | Zustand global state |
| navigation | App navigation |
| theme | Colors, typography, spacing |
| utils | Helper functions |

---

# Blockchain Flow

## Update Value

When the user presses **Update Value**, the following happens:

1. User enters a new value.
2. Application validates the input.
3. ethers.js prepares the smart contract transaction.
4. Wallet (MetaMask) opens and asks the user to approve.
5. User reviews and signs the transaction.
6. The signed transaction is broadcast to the Ethereum Sepolia network.
7. The transaction enters the mempool.
8. A validator includes the transaction in a new block.
9. The application waits for transaction confirmation.
10. Once confirmed, the latest contract value is fetched.
11. The UI refreshes automatically with the updated value.

---

# Read vs Write

## Why does reading not require gas?

Reading from a smart contract uses **view** or **pure** functions.

These functions:

- Do not modify blockchain state.
- Execute locally on an RPC node.
- Are not included in a block.
- Do not require miners or validators.

Therefore, **no gas fee is required**.

---

## Why does writing require gas?

Writing to the blockchain changes the blockchain state.

Examples:

- Store value
- Transfer tokens
- Mint NFT

These transactions:

- Must be validated.
- Are included in a block.
- Consume network resources.
- Require validator work.

Therefore, gas fees are required.

---

# Trade-offs / Future Improvements

If additional time were available, the following improvements would be implemented:

- Price charts
- Token swap functionality
- Biometric authentication
- Unit testing
- Integration testing
- End-to-end testing
- Better transaction history
- Localization (i18n)
- Accessibility improvements

---

# Screens

- Wallet Connection
- Dashboard
- Token Details
- Smart Contract

---

# Screenshots

Screenshots are available inside:

<img width="360"  alt="WhatsApp Image 2026-07-09 at 7 47 47 AM" src="https://github.com/user-attachments/assets/de1c059d-4ec8-4440-ad35-c2a7952b0bac" />
<img width="360"  alt="WhatsApp Image 2026-07-09 at 7 47 46 AM" src="https://github.com/user-attachments/assets/a84b039f-4544-472b-9a9a-913d2c92b875" />
<img width="360"  alt="WhatsApp Image 2026-07-09 at 7 47 46 AM-2" src="https://github.com/user-attachments/assets/3888eea5-26d8-4c38-b6a5-6b0d3d753503" />
<img width="360"  alt="WhatsApp Image 2026-07-09 at 7 47 45 AM" src="https://github.com/user-attachments/assets/34c0eb83-b434-4552-bbda-92b38089a33a" />
<img width="360"  alt="WhatsApp Image 2026-07-09 at 7 47 45 AM-2" src="https://github.com/user-attachments/assets/45659425-3ce2-48f4-bb85-2c8b2dc187d6" />
<img width="360"  alt="WhatsApp Image 2026-07-09 at 7 47 44 AM" src="https://github.com/user-attachments/assets/3f658d2b-319f-42f4-b897-506b0c68f5f0" />
<img width="360"  alt="WhatsApp Image 2026-07-09 at 7 47 44 AM-2" src="https://github.com/user-attachments/assets/dbc8a3a6-8183-4e32-b358-37687af6facf" />
<img width="360"  alt="WhatsApp Image 2026-07-09 at 7 47 43 AM" src="https://github.com/user-attachments/assets/c43aae6d-68e1-4847-adad-2f40f4293584" />
<img width="360"  alt="WhatsApp Image 2026-07-09 at 7 47 42 AM" src="https://github.com/user-attachments/assets/b23ba362-ad94-4c31-b1b5-776563e7261d" />
<img width="360"  alt="WhatsApp Image 2026-07-09 at 7 47 42 AM-2" src="https://github.com/user-attachments/assets/f9bd0430-0a95-48c5-830b-7ab0931e6c57" />
<img width="360"  alt="WhatsApp Image 2026-07-09 at 7 47 41 AM" src="https://github.com/user-attachments/assets/036932ef-fa84-4390-af4c-e6b4d30a1c84" />


Included screenshots:

- Wallet Connection
- Dashboard
- Token Details
- Smart Contract Read
- Smart Contract Write
- Dark Mode
- Favorite Tokens

---

# Screen Recording

A short 2–5 minute demo video demonstrates:

- Wallet Connection
- Dashboard
- Infinite Scrolling
- Search
- Favorite Tokens
- Token Details
- Smart Contract Read
- Smart Contract Write
- Transaction Confirmation
- Error Handling
- Dark Mode

Recording Link:- https://drive.google.com/file/d/1GRubwqN8jhlBeMLaLG8phrtMcvA3EbIT/view?usp=sharing


---

# APK File

Android APK File

Download Link:- https://drive.google.com/file/d/11F9pMkca6iF79jjDitL0OI3Wjg8uOqtQ/view?usp=sharing


---

# Deliverables

- ✅ GitHub Repository
- ✅ README
- ✅ Screenshots
- ✅ Screen Recording
- ✅ Application APK

---

# Author

**Nandkishor Shinde**

Senior React Native Developer

- React Native
- TypeScript
- Web3
- Blockchain
- React Query
- Zustand
- NativeWind
- ethers.js
- WalletConnect
