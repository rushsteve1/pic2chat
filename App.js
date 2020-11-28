import React from 'react';
import { StatusBar } from 'expo-status-bar';
// import r from 'rethinkdb';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Lobby from './Lobby';
import Room from "./Room";

const dbname = (__DEV__) ? 'test' : 'prod';
// const conn = r.connect({ host: 'rushsteve1.us', port: 32769, db: dbname });

export const ConnectionContext = React.createContext();
const Stack = createStackNavigator();

export default function App() {
    return (
      <ConnectionContext.Provider >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Lobby">
            <Stack.Screen name="Room" component={Room}/>
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto"/>
      </ConnectionContext.Provider>
    );
}
