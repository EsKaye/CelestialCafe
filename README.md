# 🌌 Celestial Café - Cosmic Trading Hub

Welcome to **Celestial Café**, a unique mobile game that combines cosmic café management with interstellar trading! Serve cosmic drinks to celestial customers while building your portfolio in the cosmic markets. Where coffee meets cryptocurrency in the vast expanse of space! ☕📈

## ✨ Features

- 🌟 **Cosmic Café Management**: Run your own space café with unique cosmic drinks
- 📊 **Trading System**: Buy and sell cosmic assets in real-time markets
- 🌙 **Customer Types**: Serve regular customers, VIPs, cosmic beings, and traders
- 🌠 **Market Effects**: Drinks influence market trends and trading opportunities
- 💫 **Dual Progression**: Level up both café management and trading skills
- 🛍️ **Shop System**: Purchase decorations and trading terminals
- 🌌 **Beautiful UI**: Stunning cosmic-themed interface with smooth animations
- 📱 **Cross-Platform**: Works on iOS, Android, and Web

## 🎮 Gameplay

### Core Mechanics
- **Customer Queue**: Manage incoming customers with different patience levels
- **Drink Brewing**: Start brewing drinks and serve them when ready
- **Market Trading**: Buy and sell cosmic assets like STAR, NEB, COS tokens
- **Resource Management**: Use stardust for drinks, cosmic credits for trading
- **Satisfaction System**: Keep customers happy to earn better tips
- **Dual Progression**: Level up café management and trading separately

### Customer Types
- ⭐️ **Regular Customers**: Standard orders with moderate tips
- 🌟 **VIP Customers**: Higher patience and better tips
- 🌠 **Cosmic Customers**: Legendary customers with the best rewards
- 📈 **Trader Customers**: Provide market insights and trading opportunities

### Drink Rarities & Market Effects
- **Common**: Basic drinks with mild market effects
- **Rare**: Special drinks with stronger market influence
- **Legendary**: Ultimate drinks that can significantly impact markets

### Cosmic Assets
- **STAR**: Stellar Token - Most stable cosmic currency
- **NEB**: Nebula Coin - Volatile but potentially rewarding
- **COS**: Cosmic Cash - Premium cosmic currency
- **QUA**: Quantum Token - Highly volatile quantum currency
- **VOID**: Void Coin - Mysterious void-based currency

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/EsKaye/CelestialCasa.git
cd CelestialCasa
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the development server**
```bash
npm start
# or
yarn start
```

4. **Run on your preferred platform**
```bash
# iOS
npm run ios
# Android
npm run android
# Web
npm run web
```

## 🛠️ Development

### Project Structure
```
CelestialCasa/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ErrorBoundary.tsx
│   ├── constants/           # Theme and configuration
│   │   ├── colors.ts
│   │   └── fonts.ts
│   ├── data/               # Game data and content
│   │   └── gameData.ts
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/           # Screen components
│   │   ├── GameScreen.tsx
│   │   └── TradingScreen.tsx
│   └── store/             # State management
│       └── gameStore.ts
├── assets/                # Images and static files
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

### Available Scripts
- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser
- `npm run build:ios` - Build for iOS
- `npm run build:android` - Build for Android
- `npm run build:web` - Build for web
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### State Management
The app uses **Zustand** for state management with persistent storage:
- Game progress (level, experience, stardust)
- Trading portfolio and market data
- Customer queue and brewing drinks
- Unlocked content and achievements
- Settings and preferences

## 🎨 Design System

### Color Palette
- **Primary**: Deep cosmic purple (#6B4EFF)
- **Secondary**: Nebula pink (#FF4E8C)
- **Accent**: Golden stardust (#FFD700)
- **Background**: Deep space (#0A0A1F)
- **Text**: Pure starlight (#FFFFFF)
- **Success**: Growth green (#4EFF8B)
- **Error**: Red giant (#FF4E4E)

### Typography
- **Primary**: SpaceGrotesk (cosmic, modern)
- **Secondary**: Inter (clean, readable)
- **Decorative**: Orbitron (futuristic accents)

## 📱 Platform Support

### iOS
- Minimum iOS version: 13.0
- Supports iPhone and iPad
- Optimized for both portrait and landscape

### Android
- Minimum Android version: 8.0 (API 26)
- Supports phones and tablets
- Adaptive icons and splash screens

### Web
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design
- Touch and mouse input support

## 🚀 Deployment

### iOS App Store
1. Configure your app in `app.json`
2. Run `npm run build:ios`
3. Follow Expo's iOS deployment guide
4. Submit to App Store Connect

### Google Play Store
1. Configure your app in `app.json`
2. Run `npm run build:android`
3. Follow Expo's Android deployment guide
4. Submit to Google Play Console

### Web Deployment
1. Run `npm run build:web`
2. Deploy the `web-build` folder to your hosting service
3. Configure custom domain if needed

## 🧪 Testing

### Manual Testing
- Test on different device sizes
- Verify customer spawning and patience mechanics
- Check drink brewing and serving functionality
- Test trading mechanics and market updates
- Verify shop purchases and upgrades
- Test save/load functionality

### Automated Testing
```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file for local development:
```env
EXPO_PUBLIC_API_URL=your_api_url_here
EXPO_PUBLIC_ANALYTICS_KEY=your_analytics_key
```

### App Configuration
Edit `app.json` to customize:
- App name and bundle identifier
- Splash screen and icons
- Platform-specific settings
- Build configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent code formatting
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Expo** for the amazing development platform
- **React Native** community for the robust framework
- **Zustand** for simple and effective state management
- **Animal Restaurant** for café management inspiration
- **Trading platforms** for market mechanics inspiration
- All cosmic baristas and traders who contributed to this project

## 🆘 Support

- **Issues**: Create an issue in the repository
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the `/docs` folder for detailed guides

## 🔄 Version History

- **v1.0.0** - Initial release with core café management features
- **v1.1.0** - Added shop system and decorations
- **v1.2.0** - Enhanced customer types and progression system
- **v2.0.0** - **NEW**: Added cosmic trading system and market mechanics

---

**Celestial Café** - Where cosmic baristas serve stellar brews and trade the stars! ☕✨📈

Made with ❤️ by the Celestial Café team 