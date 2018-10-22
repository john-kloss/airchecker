import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Button
} from "react-native";
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
      <View style={styles.container}>
        {this.state.items.map(item => (
          <TouchableHighlight
            onPress={() => this.onItemPressed(item)}
            underlayColor="#f00"
            key={item.title}
          >
            <Text style={styles.text}>{item.title + " " + item.visible}</Text>
          </TouchableHighlight>
        ))}
        <Button title="Übernehmen" onPress={this.goBack} />
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
