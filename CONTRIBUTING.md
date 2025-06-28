# Contributing to Celestial Café

Thank you for your interest in contributing to Celestial Café! This document provides guidelines and information for contributors.

## 🌟 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- Expo CLI (`npm install -g @expo/cli`)

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/celestial-cafe.git`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

## 🎯 How to Contribute

### Reporting Bugs
- Use the GitHub issue template
- Include detailed steps to reproduce
- Provide device/OS information
- Include screenshots if relevant

### Suggesting Features
- Check existing issues first
- Use the feature request template
- Describe the feature clearly
- Explain why it would be beneficial

### Code Contributions
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Add tests if applicable
4. Run the test suite: `npm test`
5. Commit your changes: `git commit -m 'Add your feature'`
6. Push to your branch: `git push origin feature/your-feature`
7. Create a Pull Request

## 📝 Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible
- Use meaningful variable names

### React/React Native
- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use proper prop types

### Styling
- Use the existing design system
- Follow the color palette in `src/constants/colors.ts`
- Use the font system in `src/constants/fonts.ts`
- Maintain consistent spacing and layout

### State Management
- Use Zustand for global state
- Keep local state in components when appropriate
- Follow the existing store patterns

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- GameScreen.test.tsx
```

### Writing Tests
- Test component behavior, not implementation
- Use descriptive test names
- Mock external dependencies
- Test error cases

## 📱 Platform Considerations

### iOS
- Test on different iPhone/iPad sizes
- Consider safe area insets
- Test with different iOS versions

### Android
- Test on different screen densities
- Consider back button behavior
- Test with different Android versions

### Web
- Test responsive design
- Consider keyboard navigation
- Test with different browsers

## 🎨 Design Contributions

### UI/UX Improvements
- Follow the cosmic theme
- Maintain accessibility standards
- Consider mobile-first design
- Test on actual devices

### Assets
- Use appropriate formats (PNG for icons, SVG for scalable graphics)
- Optimize file sizes
- Follow naming conventions
- Include different sizes for different platforms

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex logic
- Update README for new features
- Include usage examples

### API Documentation
- Document new API endpoints
- Include request/response examples
- Update API documentation

## 🔄 Pull Request Process

1. **Title**: Use clear, descriptive titles
2. **Description**: Explain what and why, not how
3. **Screenshots**: Include screenshots for UI changes
4. **Tests**: Ensure all tests pass
5. **Linting**: Fix any linting errors
6. **Review**: Address review comments promptly

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass
- [ ] Manual testing completed
- [ ] Cross-platform testing

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 🚀 Release Process

### Versioning
We use semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR**: Breaking changes
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes, backward compatible

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Release notes written

## 🆘 Getting Help

- **Issues**: Create an issue for bugs or questions
- **Discussions**: Use GitHub Discussions for general questions
- **Documentation**: Check the README and inline docs
- **Community**: Join our community channels

## 📄 License

By contributing to Celestial Café, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Celestial Café! 🌌✨ 