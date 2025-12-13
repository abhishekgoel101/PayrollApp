/**
 * App Navigator - Stack navigation configuration
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme';
import { RootStackParamList } from './types';
import { routeConfigs, INITIAL_ROUTE } from './routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={INITIAL_ROUTE}
        screenOptions={{
          contentStyle: styles.content,
          animation: 'slide_from_right',
        }}>
        {routeConfigs.map((config) => (
          <Stack.Screen
            key={config.name}
            name={config.name}
            component={config.component}
            options={config.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.background,
  },
});
