import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//@ts-ignore
import { Amplify, Auth } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import { Card } from 'react-native-paper';
import * as Device from 'expo-device';
import { useEffect, useState } from 'react';

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
            <Card style={{ width: '50%', height: '50%', alignItems: 'center', elevation: 10, borderRadius: '3%', justifyItems: 'center' }}>
                <Card.Content>
                    <Text style={{ fontWeight: "700" }}>
                       Hello! {userName || ''}
                    </Text>
                    <TouchableOpacity
                        style={{ backgroundColor: '#FF9900', alignItems: 'center', justifyContent: 'center', marginTop: '15%', borderRadius: '20%', width: 100, height: 50 }}
                        onPress={() => {
                            Auth.signOut();
                        }}
                    >
                        <Text style={{ color: 'white' }}>Sign Out</Text>
                    </TouchableOpacity>

                </Card.Content>
            </Card>
        </View>

    );
};

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
