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
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Einstellungen</Title>
          </Body>
          <Right style={{ flex: 1 }}>
          <Button
              transparent
              title="Hilfe"
              onPress={() => this.props.navigation.navigate("TourScreen")}
            >
              <Icon type="FontAwesome" name="info" />
            </Button>
          </Right>
        </Header>
        <Content>
          {this.state.items.map(item => (
            <View style={{ flex: 1 }} key={item.title}>
              <View style={{ flexDirection: "row" }}>
                {item.visible && (
                  <Button transparent onPress={() => this.onItemPressed(item)} iconLeft>
                    <Icon
                      type="FontAwesome"
                      name="eye"
                    />
                  </Button>
                )}
                {!item.visible && (
                  <Button transparent onPress={() => this.onItemPressed(item)} iconLeft>
                    <Icon
                      type="FontAwesome"
                      name="eye-slash"
                    />
                  </Button>
                )}

                
                <View underlayColor="#f00">
                  <Text onPress={() => this.onItemPressed(item)} style={styles.text}>{item.title}</Text>
                </View>
              </View>
              {item.visible && (
                <Text style={styles.text}>
                  {"Allergielevel: " + item.level}
                </Text>
              )}
              {item.visible && (
                <Slider
                  minimumValue={0}
                  maximumValue={5}
                  step={1}
                  value={item.level}
                  thumbTintColor={"yellow"}
                  onSlidingComplete={value =>
                    this.onSliderChanged(item, "level", value)
                  }
                />
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
                      <Text>Einheiten aus</Text>
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
                      <Text>Einheiten an</Text>
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
