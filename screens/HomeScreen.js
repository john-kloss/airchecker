import React from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  RefreshControl,
  StyleSheet
} from "react-native";

export default class HomeScreen extends React.Component {
  state = {
    refreshing: false,
    values: [
      { title: "Birkenpollen", value: 3 },
      { title: "CO2", value: 5 },
      { title: "Wurst", value: 2 }
    ]
  };
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

  _onRefresh = () => {
    let values = this.state.values;
    for (let i = 0; i < this.state.values.length; i++) {
      const number = Math.floor(Math.random() * 10);
      values[i].value = number;
    }
    this.setState({ values });
  };

  configure = () => {};
  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {this.state.values.map(value => (
          <View key={value.title}>
            <Text>{value.title + ":  " + value.value}</Text>
          </View>
        ))}
        <Button
          title="Einstellungen"
          onPress={() => this.props.navigation.navigate("SettingsScreen")}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    padding: 16,
    fontSize: 30
  }
});
