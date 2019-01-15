import React from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  View,
  Text
} from "native-base";
import { RefreshControl } from "react-native";

export default class HomeScreen extends React.Component {
  state = {
    refreshing: false,
    items: [
      {
        title: "Birke",
        visible: true,
        details: true,
        value: 500,
        level: 1,
        threshold1: 33,
        threshold2: 666,
        settings: false

      },
      {
        title: "Esche",
        visible: true,
        details: true,
        value: 500,
        level: 1,
        threshold1: 133,
        threshold2: 666,
        settings: false
      },
      {
        title: "Pappel",
        visible: true,
        details: true,
        value: 500,
        level: 1,
        threshold1: 233,
        threshold2: 666,
        settings: false
      },
      {
        title: "Roggen",
        visible: false,
        details: true,
        value: 500,
        threshold1: 333,
        threshold2: 666,
        settings: false
      },
      {
        title: "Frühblüher",
        visible: false,
        details: true,
        value: 500,
        level: 1,
        threshold1: 433,
        threshold2: 666,
        settings: false
      },
      {
        title: "Erle",
        visible: false,
        details: true,
        value: 500,
        level: 1,
        threshold1: 333,
        threshold2: 666,
        settings: false
      },
      {
        title: "Gräser",
        visible: false,
        details: true,
        value: 500,
        level: 1,
        threshold1: 333,
        threshold2: 666,
        settings: false
      },
      {
        title: "Beifuß",
        visible: false,
        details: true,
        value: 500,
        level: 1,
        threshold1: 333,
        threshold2: 666,
        settings: false
      }
    ]
  };

  componentWillMount() {
    this._onRefresh();
    this.props.navigation.setParams({
      navigate: this.navigate
    });
  }

  /**
   * Refresh Method of the Refresh Control
   */
  _onRefresh = () => {
    let items = this.state.items;
    for (let i = 0; i < this.state.items.length; i++) {
      const level = Math.floor(Math.random() * 3);
      items[i].level = level;
      items[i].value = Math.floor(Math.random() * 100000) / 100;
    }
    this.setState({ items });
  };

  /**
   * Method for the items in state
   */
  onUpdate = items => {
    this.setState(items);
  };

  navigate = () => {
    this.props.navigation.navigate("SettingsScreen", {
      onUpdate: this.onUpdate,
      items: this.state.items
    });
  };

  configure = () => { };
  render() {
    return (
      <Container>
        <Header>
          <Left style={{ flex: 1 }}>
            <Button
                transparent
                onPress={() => this._onRefresh()
                }
              >
              <Icon type="FontAwesome" name="refresh" />
            </Button>
          </Left>
          <Body>
            <Title>Übersicht</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate("SettingsScreen", {
                  onUpdate: this.onUpdate,
                  items: this.state.items
                })
              }
            >
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View />
          {this.state.items.filter(i => i.visible).length === 0 &&
            <View>
              <Text style={{
                textAlign: "center",
                fontSize: 15,
                padding: 10
              }}>
                Aktuell sind keine Allergene ausgewählt.
                Nutze die Einstellungen, um etwas einzublenden.
              </Text>
            </View>
          }
          {this.state.items.map(
            item =>
              item.visible && (
                <View
                  full
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
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      color:
                        item.backgroundColor == "yellow" ? "white" : "black"
                    }}
                  >
                    {item.details
                      ? item.title + ": " + item.value + " µg/m3"
                      : item.title}
                  </Text>
                </View>
              )
          )}
        </Content>
      </Container>
    );
  }
}