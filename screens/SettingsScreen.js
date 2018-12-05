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
import Toast from "react-native-simple-toast";

export default class SettingsScreen extends React.Component {
  state = {};
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const params = state.params || {};
    return {
      title: "Einstellungen",
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerLeft: (
        <Ionicons
          name="md-arrow-back"
          size={30}
          onPress={params.goBack}
          color="white"
        />
      )
    };
  };

  componentWillMount() {
    this.setState({ items: this.props.navigation.state.params.items });
    this.props.navigation.setParams({
      goBack: this.goBack
    });
  }

  // change if item is selected or not
  onItemPressed(item) {
    Toast.show("item: " + item.title + "invisible");
    let items = this.state.items;
    let newItem = items.find(i => {
      return i.title === item.title;
    });
    newItem.visible = !newItem.visible;
    this.setState({
      items
    });
  }

  onSliderChanged(item, parameter, value) {
    Toast.show(
      "item: " + item.title + " parameter: " + parameter + " value: " + value
    );

    let items = this.state.items;
    let newItem = items.find(i => {
      return i.title === item.title;
    });
    newItem[parameter] = value;
    this.setState({
      items
    });
  }

  resetTreshold(item) {
    Toast.show(item.title + " Reset ");

    let items = this.state.items;
    let newItem = items.find(i => {
      return i.title === item.title;
    });
    newItem.threshold1 = newItem.threshold1recommendet;
    newItem.threshold2 = newItem.threshold2recommendet;
    this.setState({
      items
    });
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.state.params.onUpdate(this.state.items);
    navigation.goBack();
  };
  render() {
    return (
      <ScrollView style={styles.container}>
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
              {item.details && (
                <TouchableHighlight onPress={() => this.onSliderChanged(item, "details", false)}>
                  <Ionicons name="md-happy" size={30} color="black" />
                </TouchableHighlight>
              )}
              {!item.details && (
                <TouchableHighlight onPress={() => this.onSliderChanged(item, "details", true)}>
                  <Ionicons name="md-sad" size={30} color="black" />
                </TouchableHighlight>
              )}
              <View underlayColor="#f00">
                <Text style={styles.text}>{item.title}</Text>
              </View>
            </View>
            {item.visible && <Text style={styles.text}>{"Erhöhte Belastung ab: " + item.threshold1}</Text>}
            {item.visible && <Slider minimumValue={0}
                                     maximumValue={1000} 
                                     step={5}
                                     value={item.threshold1} 
                                     thumbTintColor = {"yellow"}
                                     onSlidingComplete={(value) => this.onSliderChanged(item, "threshold1", value)}
                                     />}

            {item.visible && <Text style={styles.text}>{"Starke Belastung ab: " + item.threshold2}</Text>}
            {item.visible && <Slider minimumValue={0} 
                                     maximumValue={1000} 
                                     step={5}
                                     value={item.threshold2} 
                                     thumbTintColor = {"red"}
                                     onSlidingComplete={(value) => this.onSliderChanged(item, "threshold2", value)}
                                     />}
            {item.visible && <Button
              title="Zurücksetzen"
              onPress={() => this.resetTreshold(item)}
            />}
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
