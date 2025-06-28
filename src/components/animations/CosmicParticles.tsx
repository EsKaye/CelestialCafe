import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { colors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
const PARTICLE_COUNT = 20;

interface Particle {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const generateParticles = (): Particle[] => {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 2000 + 1000,
    delay: Math.random() * 1000,
  }));
};

export const CosmicParticles: React.FC = () => {
  const particles = generateParticles();
  const opacities = particles.map(() => useSharedValue(0));
  const scales = particles.map(() => useSharedValue(0));

  useEffect(() => {
    particles.forEach((_, index) => {
      opacities[index].value = withRepeat(
        withDelay(
          particles[index].delay,
          withTiming(1, {
            duration: particles[index].duration,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        ),
        -1,
        true
      );

      scales[index].value = withRepeat(
        withDelay(
          particles[index].delay,
          withTiming(1, {
            duration: particles[index].duration,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        ),
        -1,
        true
      );
    });

    return () => {
      particles.forEach((_, index) => {
        cancelAnimation(opacities[index]);
        cancelAnimation(scales[index]);
      });
    };
  }, []);

  return (
    <View style={styles.container}>
      {particles.map((particle, index) => {
        const particleStyle = useAnimatedStyle(() => ({
          opacity: opacities[index].value,
          transform: [
            { scale: scales[index].value },
            { translateX: particle.x },
            { translateY: particle.y },
          ],
        }));

        return (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                width: particle.size,
                height: particle.size,
                backgroundColor: colors.cosmic.primary,
              },
              particleStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0,
  },
}); 