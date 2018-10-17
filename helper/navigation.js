import { HomeScreen, SettingsScreen } from "screens";
import { createStackNavigator } from "react-navigation";

const AppNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  SettingsScreen: {
    screen: SettingsScreen
  }
});

export default AppNavigator;
