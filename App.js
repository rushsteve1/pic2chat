import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-url-polyfill/auto';
// Imports for connecting to supabase database:
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://vujfevtyfmbxeyyyclso.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwNzI3MTE0NSwiZXhwIjoxOTIyODQ3MTQ1fQ.cs-P26get-37wALCG1sIPvbamr-YgKkVZFLPiLo2OZo';
export const supabase = createClient(supabaseUrl, supabaseKey);
// These are the different "screens" or pages that can be visited:
import Lobby from './Lobby';
import Room from "./Room";

const Stack = createStackNavigator();

export default function App() {
    return (
      <>
        <NavigationContainer>
          {/* Initially, start out in lobby: */}
          <Stack.Navigator initialRouteName="Lobby">
            {/* Possible screens are room and lobby: */}
            <Stack.Screen name= "Lobby" component={Lobby}/>
            <Stack.Screen name = "Room" component = {Room}/>
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto"/>
      </>
    );
}
