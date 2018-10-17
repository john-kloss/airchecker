import React from "react";
import { View, Button, StyleSheet } from "react-native";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  configure = () => {};
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Einstellungen"
          onPress={() => this.props.navigation.navigate("SettingsScreen")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    padding: 16,
    fontSize: 30
  }
});
