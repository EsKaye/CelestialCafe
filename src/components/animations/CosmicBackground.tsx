import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { colors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
const STAR_COUNT = 50;
const NEBULA_COUNT = 3;

interface Star {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface Nebula {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
}

const generateStars = (): Star[] => {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 2000 + 1000,
    delay: Math.random() * 2000,
    opacity: Math.random() * 0.5 + 0.5,
  }));
};

const generateNebulas = (): Nebula[] => {
  return Array.from({ length: NEBULA_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    scale: Math.random() * 0.5 + 0.5,
    rotation: Math.random() * 360,
    opacity: Math.random() * 0.1 + 0.05,
  }));
};

export const CosmicBackground: React.FC = () => {
  const stars = generateStars();
  const nebulas = generateNebulas();
  
  const starOpacities = stars.map(() => useSharedValue(0));
  const nebulaScales = nebulas.map(() => useSharedValue(0));
  const nebulaRotations = nebulas.map(() => useSharedValue(0));

  useEffect(() => {
    // Animate stars
    stars.forEach((_, index) => {
      starOpacities[index].value = withRepeat(
        withDelay(
          stars[index].delay,
          withSequence(
            withTiming(stars[index].opacity, {
              duration: stars[index].duration,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            withTiming(0, {
              duration: stars[index].duration,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            })
          )
        ),
        -1,
        true
      );
    });

    // Animate nebulas
    nebulas.forEach((_, index) => {
      nebulaScales[index].value = withRepeat(
        withTiming(1, {
          duration: 5000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
        -1,
        true
      );

      nebulaRotations[index].value = withRepeat(
        withTiming(360, {
          duration: 20000,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    });

    return () => {
      stars.forEach((_, index) => {
        cancelAnimation(starOpacities[index]);
      });
      nebulas.forEach((_, index) => {
        cancelAnimation(nebulaScales[index]);
        cancelAnimation(nebulaRotations[index]);
      });
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Nebulas */}
      {nebulas.map((nebula, index) => {
        const nebulaStyle = useAnimatedStyle(() => ({
          transform: [
            { translateX: nebula.x },
            { translateY: nebula.y },
            { scale: nebulaScales[index].value * nebula.scale },
            { rotate: `${nebulaRotations[index].value}deg` },
          ],
          opacity: nebula.opacity,
        }));

        return (
          <Animated.View key={`nebula-${index}`} style={[styles.nebula, nebulaStyle]}>
            <View style={styles.nebulaGradient} />
          </Animated.View>
        );
      })}

      {/* Stars */}
      {stars.map((star, index) => {
        const starStyle = useAnimatedStyle(() => ({
          opacity: starOpacities[index].value,
          transform: [
            { translateX: star.x },
            { translateY: star.y },
          ],
        }));

        return (
          <Animated.View
            key={`star-${index}`}
            style={[
              styles.star,
              {
                width: star.size,
                height: star.size,
              },
              starStyle,
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
  star: {
    position: 'absolute',
    backgroundColor: colors.text.primary,
    borderRadius: 999,
  },
  nebula: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  nebulaGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: colors.cosmic.primary,
    opacity: 0.1,
  },
}); 