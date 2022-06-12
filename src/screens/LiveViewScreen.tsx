import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
//@ts-ignore
import { Amplify, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import { Card } from 'react-native-paper';
import tw from 'twrnc';
import {  useEffect, useState } from 'react';

import {
    LineChart,
} from "react-native-chart-kit";

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
    //Time is 0 when the view origionally loads 
    const [xaxis, _setx] = useState([0])
    const [yaxis, _setY] = useState([0]);

    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    var data = {
        labels: xaxis,
        datasets: [
            {
                data: yaxis,
                color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Temperature"] // optional
    };

    //componentDidLoad() 
    useEffect(() => {

        // Device.getDeviceTypeAsync().then((type) => {
        //     console.log(type)
        //     type == Device.DeviceType.DESKTOP ? setView('web') : setView('mobile');

        // })
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
        return () => {
            listener.unsubscribe();
        }



    }, [])

    /**
     * Update the temperature and also update LineChart Element when time changes
     * @TODO: Add toggle button to toggle change with time or with temperature change
     */
    useEffect(() => {
        console.log("temp changed")
        yaxis.push(temperature)
        xaxis.push(xaxis.length++)
        UpdateChart();
    }, [temperature])

    const chartConfig = {
        backgroundGradientFrom: "#5E2925",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    var UpdateChart = () => {
        return (
            <LineChart
                data={data}
                width={width * 0.8}
                height={height * 0.6}
                chartConfig={chartConfig}
            />
        )
    }

    return (
        <View style={[tw` items-center  justify-center`, { width: '90%', alignSelf: 'center' }]}>
            <UpdateChart />
            <Card style={{ marginTop: '1%', elevation: 10, borderRadius: '3%', }}>
                <Card.Content>
                    <Text style={{ fontWeight: "700" }}>Current Temperature  is:</Text> <Text>{temperature} </Text>
                    <Text style={{ fontWeight: "700" }}>Current Datapoint received is:</Text> <Text>{time} </Text>
                </Card.Content>
            </Card>
            <StatusBar style="auto" />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
    },
});

//make this component available to the app
export default LiveData;
