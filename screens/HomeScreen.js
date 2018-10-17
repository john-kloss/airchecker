import React from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableHighlight,
  StyleSheet
} from "react-native";

export default class HomeScreen extends React.Component {
  state = {
    items: [
      { title: "Birkenpollen", selected: true },
      { title: "CO2", selected: false },
      { title: "Wurst", selected: false }
    ],
    modalVisible: false
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

  // TODO: update state
  onItemPressed(item) {
    let items = this.state.items;

    this.setState({
      items
    });
  }

  configure = () => {};
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Airchecker anpassen"
          onPress={() => this.setState({ modalVisible: true })}
          // onPress={() => this.props.navigation.navigate("SettingsScreen", {})}
        />

        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <View style={styles.rootView}>
            {this.state.items.map(item => (
              <TouchableHighlight
                onPress={() => this.onItemPressed(item)}
                underlayColor="#f00"
                key={item.title}
              >
                <Text style={styles.text}>
                  {item.title + " " + item.selected}
                </Text>
              </TouchableHighlight>
            ))}
          </View>
        </Modal>
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
