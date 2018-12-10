import React from "react";
import { StyleSheet, Slider } from "react-native";
import {
  View,
  Container,
  Header,
  Title,
  Content,
  Button,
  Text,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Icon
} from "native-base";

export default class SettingsScreen extends React.Component {
  state = {};
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const params = state.params || {};
    return {};
  };
  componentWillMount() {
    this.setState({ items: this.props.navigation.state.params.items });
  }

  /**
   * Event Handler Visibilit of Elements (Eye)
   */
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

  /**
   * Event Handler for Slider Adjustment
   */
  onSliderChanged(item, parameter, value) {
    let items = this.state.items;
    let newItem = items.find(i => {
      return i.title === item.title;
    });
    newItem[parameter] = value;
    this.setState({
      items
    });
  }

  /**
   * Resets both slider tresholds of the specific item
   */
  resetTreshold(item) {
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
  /**
   * Navigation for going back to HomeScreen
   */
  goBack = () => {
    const { navigation } = this.props;
    navigation.state.params.onUpdate(this.state.items);
    navigation.goBack();
  };
  render() {
    return (
      <Container>
        <Header>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              title="Übernehmen"
              onPress={() => this.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Einstellungen</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content>
          {this.state.items.map(item => (
            <View style={{ flex: 1 }} key={item.title}>
              <View style={{ flexDirection: "row" }}>
                {item.visible && (
                  <Button transparent iconLeft>
                    <Icon
                      type="FontAwesome"
                      name="eye"
                      onPress={() => this.onItemPressed(item)}
                    />
                  </Button>
                )}
                {!item.visible && (
                  <Button transparent iconLeft>
                    <Icon
                      type="FontAwesome"
                      name="eye-slash"
                      onPress={() => this.onItemPressed(item)}
                    />
                  </Button>
                )}
                <View underlayColor="#f00">
                  <Text style={styles.text}>{item.title}</Text>
                </View>
              </View>
              {item.visible && (
                <Text style={styles.text}>
                  {"Erhöhte Belastung ab: " + item.threshold1}
                </Text>
              )}
              {item.visible && (
                <Slider
                  minimumValue={0}
                  maximumValue={1000}
                  step={5}
                  value={item.threshold1}
                  thumbTintColor={"yellow"}
                  onSlidingComplete={value =>
                    this.onSliderChanged(item, "threshold1", value)
                  }
                />
              )}

              {item.visible && (
                <Text style={styles.text}>
                  {"Starke Belastung ab: " + item.threshold2}
                </Text>
              )}
              {item.visible && (
                <Slider
                  minimumValue={0}
                  maximumValue={1000}
                  step={5}
                  value={item.threshold2}
                  thumbTintColor={"red"}
                  onSlidingComplete={value =>
                    this.onSliderChanged(item, "threshold2", value)
                  }
                />
              )}
              {item.visible && (
                <Button
                  style={{ position: "absolute", right: 0 }}
                  transparent
                  iconRight
                >
                  <Icon
                    type="FontAwesome"
                    name="undo"
                    onPress={() => this.resetTreshold(item)}
                  />
                </Button>
              )}
              {item.visible && (
                <View style={{ padding: 10 }}>
                  {item.details && (
                    <Button
                      onPress={() =>
                        this.onSliderChanged(item, "details", false)
                      }
                      padder
                      bordered
                      iconRight
                    >
                      <Text>Details aus</Text>
                    </Button>
                  )}

                  {!item.details && (
                    <Button
                      onPress={() =>
                        this.onSliderChanged(item, "details", true)
                      }
                      padder
                      iconRight
                    >
                      <Text>Details an</Text>
                    </Button>
                  )}
                </View>
              )}
            </View>
          ))}
        </Content>
      </Container>
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
