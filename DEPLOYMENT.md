# 🚀 Celestial Café - Deployment Guide

This guide provides step-by-step instructions for deploying Celestial Café to various platforms.

## 📋 Prerequisites

### Required Tools
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**
- **Expo CLI** (`npm install -g @expo/cli`)
- **EAS CLI** (`npm install -g eas-cli`)

### Platform-Specific Requirements

#### iOS
- **macOS** (required for iOS builds)
- **Xcode** (latest version)
- **iOS Simulator** or physical device
- **Apple Developer Account** (for App Store deployment)

#### Android
- **Android Studio** (for local development)
- **Android SDK**
- **Android Emulator** or physical device
- **Google Play Console** account (for Play Store deployment)

#### Web
- **Modern web browser**
- **Web hosting service** (Vercel, Netlify, etc.)

## 🔧 Initial Setup

### 1. Clone and Install
```bash
# Clone the repository
git clone https://github.com/yourusername/celestial-cafe.git
cd celestial-cafe

# Install dependencies
npm install

# Start development server
npm start
```

### 2. Configure Environment
```bash
# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Update App Configuration
Edit `app.json` to customize:
- App name and bundle identifier
- Splash screen and icons
- Platform-specific settings

## 📱 Local Development

### Running on Different Platforms

#### iOS Simulator
```bash
npm run ios
```

#### Android Emulator
```bash
npm run android
```

#### Web Browser
```bash
npm run web
```

### Development Commands
```bash
# Start Expo development server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm test
```

## 🏗️ Building for Production

### 1. Configure EAS Build

#### Install EAS CLI
```bash
npm install -g eas-cli
```

#### Login to Expo
```bash
eas login
```

#### Configure Build
```bash
eas build:configure
```

### 2. Build for Different Platforms

#### iOS Build
```bash
# Development build
eas build --platform ios --profile development

# Production build
eas build --platform ios --profile production
```

#### Android Build
```bash
# Development build
eas build --platform android --profile development

# Production build
eas build --platform android --profile production
```

#### Web Build
```bash
npm run build:web
```

## 🚀 Deployment Options

### Option 1: Expo Application Services (EAS)

#### Setup EAS
```bash
# Initialize EAS
eas init

# Configure project
eas build:configure
```

#### Build and Submit
```bash
# Build for all platforms
eas build --platform all

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

### Option 2: Manual Deployment

#### iOS App Store
1. **Build the app**
   ```bash
   eas build --platform ios --profile production
   ```

2. **Download the build**
   - Download from EAS dashboard
   - Or use `eas build:list` to get download URL

3. **Submit to App Store Connect**
   ```bash
   eas submit --platform ios
   ```

#### Google Play Store
1. **Build the app**
   ```bash
   eas build --platform android --profile production
   ```

2. **Download the build**
   - Download from EAS dashboard
   - Or use `eas build:list` to get download URL

3. **Submit to Play Console**
   ```bash
   eas submit --platform android
   ```

#### Web Deployment
1. **Build for web**
   ```bash
   npm run build:web
   ```

2. **Deploy to hosting service**
   ```bash
   # Example: Deploy to Vercel
   npx vercel --prod

   # Example: Deploy to Netlify
   npx netlify deploy --prod --dir=web-build
   ```

### Option 3: GitHub Actions (CI/CD)

The project includes GitHub Actions workflows for automated builds:

1. **Set up repository secrets**
   - `EXPO_TOKEN`: Your Expo access token
   - `APPLE_ID`: Apple Developer account email
   - `APPLE_APP_SPECIFIC_PASSWORD`: App-specific password

2. **Push to main branch**
   - Workflows will automatically trigger
   - Builds will be created for iOS and Android

3. **Monitor builds**
   - Check GitHub Actions tab
   - Download builds when complete

## 🔐 Environment Variables

### Required Variables
```env
# Expo
EXPO_TOKEN=your_expo_token_here

# iOS
APPLE_ID=your_apple_id@email.com
APPLE_APP_SPECIFIC_PASSWORD=your_app_specific_password

# Android
GOOGLE_SERVICE_ACCOUNT_KEY=your_service_account_key.json

# Analytics (optional)
EXPO_PUBLIC_ANALYTICS_KEY=your_analytics_key
```

### Getting Expo Token
1. Go to [Expo Dashboard](https://expo.dev)
2. Navigate to Access Tokens
3. Create a new token
4. Copy the token to your environment variables

## 📊 Monitoring and Analytics

### App Performance
- **Expo Analytics**: Built-in performance monitoring
- **Crash Reporting**: Automatic crash detection
- **Usage Statistics**: User engagement metrics

### Custom Analytics
```typescript
// Add analytics to your app
import { Analytics } from 'expo-analytics';

// Track events
Analytics.track('game_started');
Analytics.track('drink_brewed', { drink: 'Stellar Brew' });
```

## 🔄 Update Process

### 1. Version Management
```bash
# Update version in package.json
npm version patch  # or minor, major

# Update app.json version
# Update CHANGELOG.md
```

### 2. Build and Deploy
```bash
# Build new version
eas build --platform all

# Submit to stores
eas submit --platform all
```

### 3. Over-the-Air Updates
```bash
# Publish update
eas update --branch production --message "Bug fixes and improvements"
```

## 🛠️ Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache
expo r -c

# Reset Metro cache
npx react-native start --reset-cache

# Clear EAS cache
eas build:clean
```

#### iOS Build Issues
- Ensure Xcode is up to date
- Check Apple Developer account status
- Verify provisioning profiles

#### Android Build Issues
- Check Android SDK installation
- Verify keystore configuration
- Ensure Google Play Console setup

#### Web Build Issues
- Check Node.js version compatibility
- Clear npm cache: `npm cache clean --force`
- Verify build output directory

### Getting Help
- **Expo Documentation**: [docs.expo.dev](https://docs.expo.dev)
- **EAS Documentation**: [docs.expo.dev/eas](https://docs.expo.dev/eas)
- **GitHub Issues**: Create an issue in the repository
- **Expo Discord**: Join the Expo community

## 📈 Performance Optimization

### Bundle Size
- Use dynamic imports for large components
- Optimize images and assets
- Remove unused dependencies

### Runtime Performance
- Implement proper memoization
- Optimize re-renders
- Use performance monitoring tools

### Platform-Specific Optimizations
- **iOS**: Optimize for Metal rendering
- **Android**: Use Hermes JavaScript engine
- **Web**: Implement code splitting

## 🔒 Security Considerations

### Code Obfuscation
```bash
# Enable code obfuscation in eas.json
{
  "build": {
    "production": {
      "android": {
        "gradleCommand": ":app:bundleRelease"
      }
    }
  }
}
```

### Environment Variables
- Never commit sensitive data
- Use secure storage for API keys
- Implement proper authentication

### App Store Security
- Follow platform security guidelines
- Implement proper data encryption
- Regular security audits

## 📚 Additional Resources

### Documentation
- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [EAS Build Documentation](https://docs.expo.dev/eas)

### Tools
- [Expo Dev Tools](https://expo.dev/tools)
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [Flipper](https://fbflipper.com)

### Community
- [Expo Discord](https://discord.gg/expo)
- [React Native Community](https://github.com/react-native-community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)

---

**Happy Deploying! 🌌✨**

For additional support, check the [README.md](README.md) or create an issue in the repository. 