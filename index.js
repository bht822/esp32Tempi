import { registerRootComponent } from 'expo';
import {withAuthenticator} from 'aws-amplify-react-native';
import {Amplify } from 'aws-amplify';
// import '@aws-amplify/ui-react/styles.css';
//@ts-ignore
import config from "./src/aws-exports";

Amplify.configure({
  config
});

import App from './App';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(withAuthenticator(App,false));
