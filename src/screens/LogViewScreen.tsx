//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { Card } from 'react-native-paper';
import tw from 'twrnc';
import { useEffect, useState } from 'react';
import {
    LineChart,
} from "react-native-chart-kit";
import axios from "axios";
let api: any;
const LOCALHOST = 'http://localhost:8080';
// create a component
const LoggedData = () => {
    const [xaxis, _setx] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    const [yaxis, _setY] = useState([55, 52, 51, 42, 32, 32, 31, 58, 55, 59]);
    const [ready, setReady] = useState(false);

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
    // const getData =  () =>{
    //     let api = axios.create({
    //         baseURL: 'http://localhost:8080',
    //         headers: { Accept: 'application/json' },
    //       })
    //     const data =  api.get('localhost:8080');
    //     console.log(data)
    // }

    useEffect(() => {
        /**
         * This is where the data from the backend will be fetched and set to the chart data
         */
        // getData()

    }, [])




    return (
        <View style={{ width:'80%', alignSelf: 'center', alignContent:'center', justifyContent:'center',marginTop: '3%' }}>
            <LineChart
                data={data}
                width={width * 0.8}
                height={height * 0.6}
                chartConfig={chartConfig}
            />
            <StatusBar style="auto" />

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});


export default LoggedData;

