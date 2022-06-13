// import { StatusBar } from 'expo-status-bar';
//@ts-ignore
import { StyleSheet, Text, View } from 'react-native';
//@ts-ignore
import { Amplify, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import { Card } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Device from 'expo-device';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//@ts-ignore
import config from "./src/aws-exports";
import LiveData from './src/screens/LiveViewScreen';
import LoggedData from './src/screens/LogViewScreen';
import SettingsPage from './src/screens/SettingsScreen';
import {Ionicons} from '@expo/vector-icons';


Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
          <TabScreens />
      </NavigationContainer>
    </SafeAreaProvider >

  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});


const Tab = createMaterialTopTabNavigator();
function TabScreens() {
  // var inset = useSafeAreaInsets();

  return (

      <Tab.Navigator
        initialRouteName='Live Data'
        screenOptions={{tabBarIcons:{}}}
        style={{marginTop:'3%'}}
        
        >
        <Tab.Screen
          name='Live Data'
          component={LiveData}
          options={{ tabBarLabel: 'Live Data'}}
        />
        <Tab.Screen
          name='History'
          component={LoggedData}
          options={{ tabBarLabel: 'History' }}

        />
        <Tab.Screen
          name='Settings'
          component={SettingsPage}
          options={{ tabBarLabel: 'Settings' }}

        />
      </Tab.Navigator>
  )

}

export default (App);