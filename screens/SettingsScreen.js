import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Button,
  Slider,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

  componentWillMount() {
    this.setState({ items: this.props.navigation.state.params.items });
  }

  // change if item is selected or not
  onItemPressed(item) {
    let items = this.state.items;
    let newItem = items.find(i => {
      return i.title === item.title;
    });
    newItem.visible = !newItem.visible;
    this.setState({
      items
    });
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onUpdate(this.state.items);
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <Button title="Übernehmen" onPress={navigation.goBack()} />

        {this.state.items.map(item => (
          <View style={{ flex: 1 }} key={item.title}>
            <View style={{ flexDirection: "row" }}>
              {item.visible && (
                <TouchableHighlight onPress={() => this.onItemPressed(item)}>
                  <Ionicons name="md-eye" size={30} color="black" />
                </TouchableHighlight>
              )}
              {!item.visible && (
                <TouchableHighlight onPress={() => this.onItemPressed(item)}>
                  <Ionicons name="md-eye-off" size={30} color="black" />
                </TouchableHighlight>
              )}
              <View underlayColor="#f00">
                <Text style={styles.text}>{item.title}</Text>
              </View>
            </View>
            {item.visible && <Slider minimumValue={0} maximumValue={100} />}
          </View>
        ))}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10
  },
  text: {
    padding: 10,
    fontSize: 20
  }
});
