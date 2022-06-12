import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//@ts-ignore
import { Amplify, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import { Card } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Device from 'expo-device';
import tw from 'twrnc';
import config from "../aws-exports";
import React, { Component, useEffect, useState } from 'react';

// Config
// Amplify.configure({
//     ...config,
//     Analytics: {
//         disabled: true,
//     },
// });
var SUB_TOPIC = "esp32/pub";
var PUB_TOPIC = "esp32/sub";

Amplify.addPluggable(new AWSIoTProvider({
    aws_pubsub_region: 'us-east-2',
    aws_pubsub_endpoint: 'wss://a373cyu1c8k8op-ats.iot.us-east-2.amazonaws.com/mqtt'
}));


// create a component
const LiveData = () => {
    // Initialize state variables 
    const [temperature, setTemperature] = useState(0);
    const [time, setTime] = useState();
    const [view, setView] = useState('')

    //componentDidLoad() 
    useEffect(() => {

        Device.getDeviceTypeAsync().then((type) => {
            console.log(type)
            type == Device.DeviceType.DESKTOP ? setView('web') : setView('mobile');

        })
        const listener = PubSub.subscribe(SUB_TOPIC).subscribe({
            next: (data) => {
                console.log(data)
                setTemperature(data.value.temperature);
                setTime(data.value.time)
            },
            error: error => console.log(error),
            complete() {
                console.log("done")
            },

        })
        return()=>{
            listener.unsubscribe();
        }


    }, [])

    return (
        <View style={[tw`flex-1 items-center  justify-center width-100% height-100%`]}>
            <Card>
                <Card.Content>
                    <Text>Temp is: {temperature} </Text>
                    <Text>Time is: {time} </Text>
                </Card.Content>
            </Card>
            <StatusBar style="auto" />
        </View>
    );
};


// function WebView({ temperature, time }: any) {
//     return (
//         <View >
//             <View style={[tw`flex-1 items-center  justify-center width-100% height-100%`]}>
//                 <Card>
//                     <Card.Content>
//                         <Text>Temp is: {temperature} </Text>
//                         <Text>Time is: {time} </Text>
//                     </Card.Content>
//                 </Card>
//                 <StatusBar style="auto" />
//             </View>
//         </View>
//     )
// }

// function Mobile({ temperature, time }: any) {
//     return (
//         <View>
//             <Text>Mobile Live</Text>
//         </View>
//     )
// }




// define your styles
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default LiveData;
