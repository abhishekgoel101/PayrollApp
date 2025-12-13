/**
 * ChevronLeft icon component
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ChevronLeftProps {
  size?: number;
  color?: string;
}

export function ChevronLeft({ size = 24, color = '#000000' }: ChevronLeftProps) {
  const strokeWidth = 2.5;
  const halfSize = size / 2;
  const offset = size * 0.3;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.line,
          {
            width: halfSize,
            height: strokeWidth,
            backgroundColor: color,
            transform: [
              { translateX: -offset / 2 },
              { translateY: -halfSize / 4 },
              { rotate: '-45deg' },
            ],
          },
        ]}
      />
      <View
        style={[
          styles.line,
          {
            width: halfSize,
            height: strokeWidth,
            backgroundColor: color,
            transform: [
              { translateX: -offset / 2 },
              { translateY: halfSize / 4 },
              { rotate: '45deg' },
            ],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
    borderRadius: 1,
  },
});
