import React from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  RefreshControl,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class HomeScreen extends React.Component {
  state = {
    refreshing: false,
    items: [
      { title: "Birke", visible: true, value: 500, threshold1: 33, threshold2:666 },
      { title: "Esche", visible: true, value: 500, threshold1: 133, threshold2:666 },
      { title: "Pappel", visible: true, value: 500, threshold1: 233, threshold2:666 },
      { title: "Roggen", visible: true, value: 500, threshold1: 333, threshold2:666 },
      { title: "Frühblüher", visible: true, value: 500, threshold1: 433, threshold2:666 },
      { title: "Erle", visible: true, value: 500, threshold1: 333, threshold2:666 },
      { title: "Gräser", visible: true, value: 500, threshold1: 333, threshold2:666 },
      { title: "Beifuß", visible: true, value: 500, threshold1: 333, threshold2:666 },
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

  componentWillMount() {
    this._onRefresh();
  }

  _onRefresh = () => {
    let items = this.state.items;
    for (let i = 0; i < this.state.items.length; i++) {
      const level = Math.floor(Math.random() * 3);
      items[i].level = level;
      items[i].value = Math.floor(Math.random() * 100000)/100;
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
        <Ionicons
          name="md-cog"
          size={30}
          onPress={() =>
            this.props.navigation.navigate("SettingsScreen", {
              onUpdate: this.onUpdate,
              items: this.state.items
            })
          }
        />
        {this.state.items.map(
          item =>
            item.visible && (
              <View
                style={{
                  padding: 10,
                  margin: 10,
                  borderRadius: 5,
                  backgroundColor:
                    item.value < item.threshold1
                      ? "green"
                      : item.value < item.threshold2
                      ? "yellow"
                      : "red"
                }}
                key={item.title}
              >
                <Text style={{ textAlign: "center", fontSize: 15 }}>
                  {item.title + ": " + item.value + " Einheit "}
                </Text>
              </View>
            )
        )}
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
  },
  ok: {
    color: "#1AB20E"
  },
  average: {
    color: "#F0E314"
  },
  bad: {
    color: "#FF5733"
  }
});
