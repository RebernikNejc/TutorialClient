import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import TutorialScreen from './TutorialScreen';
import FormScreen from './FormScreen';
import EdgeScreen from './EdgeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen name="Tutorial" component={TutorialScreen}></Stack.Screen>
            <Stack.Screen name="Form" component={FormScreen}></Stack.Screen>
            <Stack.Screen name="Edge" component={EdgeScreen}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;