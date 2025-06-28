#!/bin/bash

# Celestial Café Deployment Script
# This script helps set up the project for Git deployment

echo "🌌 Celestial Café - Deployment Setup"
echo "====================================="

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

# Initialize Git repository (if not already initialized)
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
fi

# Add all files to Git
echo "📦 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Celestial Café mobile game

- Cosmic café management game
- Customer queue and drink brewing system
- Shop system with decorations
- Level progression and experience system
- Beautiful cosmic-themed UI
- Cross-platform support (iOS, Android, Web)"

# Set up main branch
echo "🌿 Setting up main branch..."
git branch -M main

echo ""
echo "✅ Git repository initialized successfully!"
echo ""
echo "🚀 Next steps:"
echo "1. Create a new repository on GitHub/GitLab"
echo "2. Add the remote origin:"
echo "   git remote add origin https://github.com/yourusername/celestial-cafe.git"
echo "3. Push to remote:"
echo "   git push -u origin main"
echo ""
echo "📱 To run the app:"
echo "   npm start"
echo ""
echo "🔧 To build for deployment:"
echo "   npm run build:ios     # For iOS"
echo "   npm run build:android # For Android"
echo "   npm run build:web     # For Web"
echo ""
echo "✨ Happy coding! 🌌" 