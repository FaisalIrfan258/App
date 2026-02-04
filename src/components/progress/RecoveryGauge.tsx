import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, G, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { fonts } from '../../constants/theme';

interface RecoveryGaugeProps {
  percentage: number;
  size?: number;
}

const { width: screenWidth } = Dimensions.get('window');

const COLORS = {
  primary: '#AB9FF0',
  primaryDark: '#705AAF',
  gaugeTrack: '#2A2A2E',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.60)',
  tickInactive: 'rgba(255, 255, 255, 0.15)',
};

const RecoveryGauge: React.FC<RecoveryGaugeProps> = ({ percentage, size = 300 }) => {
  const strokeWidth = 20;
  const radius = (size - strokeWidth - 40) / 2;
  const center = size / 2;

  // Arc from 135° to 405° (270° sweep, gap at bottom)
  const startAngle = 135;
  const endAngle = 405;
  const sweepAngle = 270;

  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const rad = toRadians(angle);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  // Background arc path
  const startPoint = polarToCartesian(center, center, radius, startAngle);
  const endPoint = polarToCartesian(center, center, radius, endAngle);

  const backgroundArcPath = `
    M ${startPoint.x} ${startPoint.y}
    A ${radius} ${radius} 0 1 1 ${endPoint.x} ${endPoint.y}
  `;

  // Progress arc path
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  const progressAngle = startAngle + (sweepAngle * clampedPercentage) / 100;
  const progressEndPoint = polarToCartesian(center, center, radius, progressAngle);
  const largeArcFlag = (sweepAngle * clampedPercentage) / 100 > 180 ? 1 : 0;

  const progressArcPath = `
    M ${startPoint.x} ${startPoint.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${progressEndPoint.x} ${progressEndPoint.y}
  `;

  // Needle calculation
  const needleAngle = startAngle + (sweepAngle * clampedPercentage) / 100;
  const needleLength = radius - 25;
  const needleEndPoint = polarToCartesian(center, center, needleLength, needleAngle);
  const needleStartPoint = polarToCartesian(center, center, 20, needleAngle + 180);

  // Needle tip glow position
  const needleTipPoint = polarToCartesian(center, center, needleLength + 5, needleAngle);

  // Generate tick marks (small dots around the arc)
  const tickCount = 36;
  const ticks = [];
  const tickRadius = radius + 18;
  for (let i = 0; i <= tickCount; i++) {
    const tickAngle = startAngle + (sweepAngle * i) / tickCount;
    const point = polarToCartesian(center, center, tickRadius, tickAngle);
    const isActive = tickAngle <= progressAngle;
    // Make every 9th tick slightly larger (quarter markers)
    const isLargeTick = i % 9 === 0;
    ticks.push({ point, isActive, isLargeTick, angle: tickAngle });
  }

  // L and H label positions (below the arc ends)
  const lPosition = polarToCartesian(center, center, radius + 45, startAngle + 15);
  const hPosition = polarToCartesian(center, center, radius + 45, endAngle - 15);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient id="progressGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#5A4A8F" />
            <Stop offset="50%" stopColor="#7B6BB8" />
            <Stop offset="100%" stopColor="#AB9FF0" />
          </LinearGradient>
          <LinearGradient id="needleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#5A4A8F" />
            <Stop offset="70%" stopColor="#8B7FD4" />
            <Stop offset="100%" stopColor="#FFFFFF" />
          </LinearGradient>
        </Defs>

        {/* Background arc */}
        <Path
          d={backgroundArcPath}
          stroke={COLORS.gaugeTrack}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />

        {/* Tick marks */}
        {ticks.map((tick, index) => (
          <Circle
            key={index}
            cx={tick.point.x}
            cy={tick.point.y}
            r={tick.isLargeTick ? 3 : 1.5}
            fill={tick.isActive ? COLORS.primary : COLORS.tickInactive}
          />
        ))}

        {/* Progress arc */}
        {clampedPercentage > 0 && (
          <Path
            d={progressArcPath}
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
        )}

        {/* Needle - capsule shape with gradient */}
        <G>
          {/* Needle body */}
          <Path
            d={`M ${needleStartPoint.x} ${needleStartPoint.y} L ${needleEndPoint.x} ${needleEndPoint.y}`}
            stroke="url(#needleGradient)"
            strokeWidth={8}
            strokeLinecap="round"
            fill="none"
          />
          {/* Needle tip glow */}
          <Circle
            cx={needleTipPoint.x}
            cy={needleTipPoint.y}
            r={6}
            fill="#FFFFFF"
            opacity={0.9}
          />
          {/* Center hub */}
          <Circle
            cx={center}
            cy={center}
            r={8}
            fill="#3A3A3E"
          />
        </G>
      </Svg>

      {/* L label */}
      <Text style={[styles.labelText, { position: 'absolute', left: lPosition.x - 8, top: lPosition.y - 10 }]}>
        L
      </Text>

      {/* H label */}
      <Text style={[styles.labelText, { position: 'absolute', left: hPosition.x - 8, top: hPosition.y - 10 }]}>
        H
      </Text>

      {/* Center content */}
      <View style={styles.centerContent}>
        <Text style={styles.recoveryLabel}>Recovery</Text>
        <Text style={styles.percentageText}>{clampedPercentage}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: COLORS.primary,
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recoveryLabel: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  percentageText: {
    fontSize: 72,
    fontFamily: fonts.bold,
    color: COLORS.textPrimary,
    letterSpacing: -2,
  },
});

export default RecoveryGauge;
