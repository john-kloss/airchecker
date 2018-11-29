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
import Toast from 'react-native-simple-toast';


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
    Toast.show('item: ' + item.title+ "invisible");
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
    Toast.show('item: ' + item.title + ' parameter: ' + parameter + ' value: ' + value);

    
    let items = this.state.items;
    let newItem = items.find(i => {
      return i.title === item.title;
    });
    newItem[parameter] = value;
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
        <Button
          title="Übernehmen"
          onPress={() => this.props.navigation.goBack()}
        />

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
            <Text style={styles.text}>{"threshold1: " + item.threshold1}</Text>
            {item.visible && <Slider minimumValue={0}
                                     maximumValue={item.threshold2} 
                                     step={5}
                                     value={item.threshold1} 
                                     onSlidingComplete={(value) => this.onSliderChanged(item, "threshold1", value)}
                                     />}

            <Text style={styles.text}>{"threshold2: " + item.threshold2}</Text>
            {item.visible && <Slider minimumValue={item.threshold1} 
                                     maximumValue={1000} 
                                     step={5}
                                     value={item.threshold2} 
                                     onSlidingComplete={(value) => this.onSliderChanged(item, "threshold2", value)}
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
