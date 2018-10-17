import React from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Einstellungen",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  state = {
    items: [
      { title: "Birkenpollen", selected: true },
      { title: "CO2", selected: false },
      { title: "Wurst", selected: false }
    ]
  };

  onItemPressed(item) {
    let items = this.state.items;
    let newItem = items.find(i => {
      return i.title === item.title;
    });
    newItem.selected = !newItem.selected;
    this.setState({
      items
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.items.map(item => (
          <TouchableHighlight
            onPress={() => this.onItemPressed(item)}
            underlayColor="#f00"
            key={item.title}
          >
            <Text style={styles.text}>{item.title + " " + item.selected}</Text>
          </TouchableHighlight>
        ))}
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