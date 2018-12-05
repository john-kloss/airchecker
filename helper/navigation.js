import { HomeScreen, SettingsScreen } from "screens";
import { createStackNavigator } from "react-navigation";
import React from "react";
import  { Root } from "native-base";

const AppNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  SettingsScreen: {
    screen: SettingsScreen
  }
},
{
  initialRouteName: "HomeScreen",
  headerMode: "none"
});

export default () =>
<Root>
  <AppNavigator />
</Root>;