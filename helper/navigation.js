import { HomeScreen } from "screens";
import { createStackNavigator } from "react-navigation";

const AppNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen
  }
});

export default AppNavigator