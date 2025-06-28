#!/bin/bash

# CelestialCasa Repository Push Script
# This script helps push the mobile game to the CelestialCasa repository

echo "🌌 CelestialCasa - Repository Push Setup"
echo "========================================"

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the celestial-cafe directory."
    exit 1
fi

# Check if remote origin exists
if ! git remote get-url origin &> /dev/null; then
    echo "📡 Adding remote origin..."
    git remote add origin https://github.com/EsKaye/CelestialCasa.git
fi

# Check current remote URL
CURRENT_URL=$(git remote get-url origin)
echo "📍 Current remote: $CURRENT_URL"

# Add all changes
echo "📦 Adding all changes..."
git add .

# Create commit with transformation message
echo "💾 Creating transformation commit..."
git commit -m "Transform CelestialCasa: From Python Trading System to Mobile Game

🌌 Complete Transformation:
- Converted from Python FastAPI to React Native/Expo
- Added cosmic café management gameplay
- Integrated interstellar trading mechanics
- Implemented dual progression system
- Added beautiful cosmic-themed UI
- Cross-platform support (iOS, Android, Web)

🎮 New Features:
- Customer queue management with 4 customer types
- Drink brewing system with market effects
- Real-time cosmic asset trading (STAR, NEB, COS, QUA, VOID)
- Portfolio management and profit tracking
- Shop system with decorations and trading terminals
- Persistent game state with Zustand

🛠️ Technical Stack:
- React Native with Expo framework
- TypeScript for type safety
- Zustand for state management
- React Navigation for routing
- Custom cosmic design system
- GitHub Actions CI/CD pipeline

📱 Platform Support:
- iOS 13.0+ (iPhone & iPad)
- Android 8.0+ (Phones & Tablets)
- Web browsers (Chrome, Firefox, Safari, Edge)

✨ Ready for deployment to App Store and Play Store!"

# Set up main branch
echo "🌿 Setting up main branch..."
git branch -M main

echo ""
echo "✅ Repository prepared for push!"
echo ""
echo "🚀 To push to GitHub:"
echo "   git push -u origin main"
echo ""
echo "⚠️  Note: This will overwrite the existing Python trading system."
echo "   Make sure you want to proceed with the transformation."
echo ""
echo "📱 To test the mobile game:"
echo "   npm start"
echo ""
echo "🔧 To build for deployment:"
echo "   npm run build:ios     # For iOS"
echo "   npm run build:android # For Android"
echo "   npm run build:web     # For Web"
echo ""
echo "✨ Happy gaming! 🌌" 