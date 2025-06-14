import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { createMatrixGenerator } from 'matrix-core';

export interface MatrixRainNativeProps {
  isLoading: boolean;
  color?: string;
}

export const MatrixRainOverlayNative: React.FC<MatrixRainNativeProps> = ({ isLoading, color = '#00ff00' }) => {
  const [frame, setFrame] = React.useState(() => createMatrixGenerator({ columns: 0, rows: 0 }));
  useEffect(() => {
    const { width, height } = Dimensions.get('window');
    setFrame(createMatrixGenerator({ columns: Math.floor(width / 10), rows: Math.floor(height / 10) }));
  }, []);
  // Placeholder simple implementation
  if (!isLoading) return null;
  return <View style={[StyleSheet.absoluteFill, { backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }]}>
    <Text style={{ color }}>Loading...</Text>
  </View>;
};
