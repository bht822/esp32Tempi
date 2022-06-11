import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//@ts-ignore
import { Amplify, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

//@ts-ignore
import config from "./src/aws-exports";
import { useState } from 'react';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});
var SUB_TOPIC = "esp32/pub";
var PUB_TOPIC = "esp32/sub";

Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: 'us-east-2',
  aws_pubsub_endpoint: 'wss://a373cyu1c8k8op-ats.iot.us-east-2.amazonaws.com/mqtt'
}));

function App() {
  const [temperature, setTemperature] = useState(0);
  const [time, setTime] = useState();
  PubSub.subscribe(SUB_TOPIC).subscribe({
    next: (data) => {
      setTemperature(data.value.sensor_a0);
      setTime(data.value.time)
    },
    error: error => console.log(error),
    complete() {
      console.log("done")
    },

  })


  return (
    <View style={styles.container}>
      <Text>Temp is: {temperature} </Text>
      <Text>Time is: {time} </Text>
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default (App);