import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//@ts-ignore
import { Amplify, Auth, PubSub } from 'aws-amplify';
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
const SettingsPage = () => {
    // Initialize state variables 
    const [view, setView] = useState('')
    const [userName, setUserName] = useState('')

    //componentDidLoad() 
    useEffect(() => {
        Device.getDeviceTypeAsync().then((type) => {
            console.log(type)
            type == Device.DeviceType.DESKTOP ? setView('web') : setView('mobile');

            Auth.currentUserInfo().then(el => setUserName(el.username))
        })
    }, [])

    return (

        <View style={styles.container}>
            {/* ts-ignore */}
            <Card style={{ width: '50%', height: '50%', alignItems: 'center', elevation: 10, borderRadius: '3%', justifyItems:'center' }}>
                <Card.Content>
                    <Text>
                        Name: {userName}
                    </Text>
                    <TouchableOpacity
                        style={{ backgroundColor: '#FF9900', alignItems:'center' }}
                        onPress={()=>{
                            Auth.signOut();
                        }}
                    >
                        <Text style={{ color:'white' }}>Sign Out</Text>
                    </TouchableOpacity>

                </Card.Content>
            </Card>
        </View>

    );
};


function WebView() {
    return (
        <View >

        </View>
    )
}

function Mobile() {
    return (
        <View>
            <Text>Mobile Live</Text>
        </View>
    )
}




// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default SettingsPage;
