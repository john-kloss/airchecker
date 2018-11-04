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
      { title: "Birkenpollen", value: 300, visible: true, threshold1: 333, threshold2:666, status: styles.ok },
      { title: "CO2", value: 500, visible: true, threshold1: 333, threshold2:666, status: styles.average },
      { title: "Wurst", value: 200, visible: true, threshold1: 333, threshold2:666, status: styles.bad }
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
      const number = Math.floor(Math.random() * 100000)/100;
      items[i].value = number;
      if (items[i].value <= items[i].threshold1)
        {items[i].status = styles.ok }
      else if (items[i].value <= items[i].threshold2)
        {items[i].status = styles.average }
      else 
        {items[i].status = styles.bad }
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
                <Text style={item.status}>              
                  {
                    
                    item.title + ":  " + item.value
                  }
                </Text>
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
  },
  ok: {
    color: '#1AB20E',
  },
  average: {
    color: '#F0E314',
  },
  bad: {
    color: '#FF5733',
  }

});

