import { SettingsScreen, TourScreen, HomeScreen } from "screens";
import { createStackNavigator } from "react-navigation";
import React, {Component} from "react";
import { AsyncStorage } from 'react-native';
import  { Root } from "native-base";

const AppNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  TourScreen: {
    screen: TourScreen
  },
  SettingsScreen: {
    screen: SettingsScreen
  }
},
{
  initialRouteName: getInitialScreen() ? "TourScreen" : "HomeScreen",
  headerMode: "none"
});

async function getInitialScreen() {
  const value = await AsyncStorage.getItem("alreadyLaunched");
    if(value !== null){
        AsyncStorage.setItem('alreadyLaunched', true);
        console.log("First time use!");
        return true;
    }
    else{
        console.log("Not first Time use!");
        AsyncStorage.removeItem('alreadyLaunched');
        return false;
    }
}
export default class Navigation extends Component {
  constructor() {
    super();
  }

  render() {
    return (
  <Root>
    <AppNavigator />
  </Root>);
  }
}