import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//@ts-ignore
import { Amplify, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import { Card } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Device from 'expo-device';
import tw from 'twrnc';
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

//@ts-ignore
import config from "./src/aws-exports";
import { useEffect, useState } from 'react';
import LiveData from './src/screens/LiveViewScreen';
import LoggedData from './src/screens/LogViewScreen';
import SettingsPage from './src/screens/SettingsScreen';


Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});
// var SUB_TOPIC = "esp32/pub";
// var PUB_TOPIC = "esp32/sub";

// Amplify.addPluggable(new AWSIoTProvider({
//   aws_pubsub_region: 'us-east-2',
//   aws_pubsub_endpoint: 'wss://a373cyu1c8k8op-ats.iot.us-east-2.amazonaws.com/mqtt'
// }));


function App() {

  // const [temperature, setTemperature] = useState(0);
  // const [time, setTime] = useState();
  // const [view, setView] = useState('')
  // useEffect(() => {

  //   Device.getDeviceTypeAsync().then((type) => {
  //     console.log(type)
  //     type == Device.DeviceType.DESKTOP ? setView('web') : setView('mobile');

  //   })


  // }, [])

  // PubSub.subscribe(SUB_TOPIC).subscribe({
  //   next: (data) => {
  //     setTemperature(data.value.temperature);
  //     setTime(data.value.time)
  //   },
  //   error: error => console.log(error),
  //   complete() {
  //     console.log("done")
  //   },

  // })


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


function WebView() {
  return (
    <View>
      <TabScreens />
    </View>
  )
}

function Mobile() {
  return (
    <View>
      <Text>Mobile</Text>
    </View>
  )
}


const Tab = createMaterialTopTabNavigator();
function TabScreens() {
  var inset = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName='Settings'
      screenOptions={{}}
      transitionStyle={'curl'}
    >
      <Tab.Screen
        name='Live Data'
        component={LiveData}
        options={{ tabBarLabel: 'Live Data', lazy:true }}
      />
      <Tab.Screen
        name='Logged Data'
        component={LoggedData}
        options={{ tabBarLabel: 'Logged Data' }}

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