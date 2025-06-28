import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { colors } from '../../constants/colors';
import { strings } from '../../constants/strings';
import { CosmicParticles } from './CosmicParticles';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Start animations
    scale.value = withSequence(
      withTiming(1.2, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      withTiming(1, { duration: 500 })
    );
    
    opacity.value = withTiming(1, { duration: 1000 });
    rotation.value = withTiming(360, { duration: 2000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });

    // Trigger completion after animations
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 500 }, () => {
        onAnimationComplete();
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: withDelay(500, withTiming(0, { duration: 1000 })) }],
  }));

  return (
    <View style={styles.container}>
      <CosmicParticles />
      
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <LottieView
          source={require('../../assets/animations/cosmic-logo.json')}
          autoPlay
          loop={false}
          style={styles.logo}
        />
      </Animated.View>
      
      <Animated.View style={[styles.textContainer, textStyle]}>
        <Animated.Text style={styles.title}>{strings.app.name}</Animated.Text>
        <Animated.Text style={styles.subtitle}>{strings.app.tagline}</Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgrounds.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: width * 0.6,
    height: width * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
    transform: [{ translateY: 20 }],
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
  },
}); 