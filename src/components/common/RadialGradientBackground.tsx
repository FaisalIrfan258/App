import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Ellipse } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface RadialGradientBackgroundProps {
  children: React.ReactNode;
}

export const RadialGradientBackground: React.FC<RadialGradientBackgroundProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Radial Gradient Background */}
      <Svg
        height={height}
        width={width}
        style={styles.backgroundGradient}
      >
        <Defs>
          <RadialGradient
            id="radialGradient"
            cx="50%"
            cy="50%"
            rx="70%"
            ry="140%"
          >
            <Stop offset="0%" stopColor="#AB9FF3" stopOpacity="0.18" />
            <Stop offset="60%" stopColor="#AB9FF3" stopOpacity="0.08" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Ellipse
          cx={width / 2}
          cy={height / 2}
          rx={width * 0.70}
          ry={height * 1.40}
          fill="url(#radialGradient)"
        />
      </Svg>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    overflow: 'hidden',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
