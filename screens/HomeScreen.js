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
    items: [
      { title: "Birkenpollen", value: 3, visible: true },
      { title: "CO2", value: 5, visible: true },
      { title: "Wurst", value: 2, visible: true }
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
    let items = this.state.items;
    for (let i = 0; i < this.state.items.length; i++) {
      const number = Math.floor(Math.random() * 10);
      items[i].value = number;
    }
    this.setState({ items });
  };

  onUpdate = items => {
    this.setState(items);
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
        {this.state.items.map(
          item =>
            item.visible && (
              <View key={item.title}>
                <Text>{item.title + ":  " + item.value}</Text>
              </View>
            )
        )}
        <Button
          title="Einstellungen"
          onPress={() =>
            this.props.navigation.navigate("SettingsScreen", {
              onUpdate: this.onUpdate,
              items: this.state.items
            })
          }
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
