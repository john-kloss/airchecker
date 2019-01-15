import React, { Component } from 'react';
import {Image, Dimensions, StyleSheet, StatusBar, View} from 'react-native';
import { Container, Header, Content, Textarea, List, ListItem, Text, H1, Icon, Button } from 'native-base';
import { IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';


export default class TourScreen extends Component {
  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <Container style={{backgroundColor: "#252525"}}>
      <View style={{flex: 1, flexDirection: 'column', flexWrap: 'wrap'}}>
          <IndicatorViewPager
                    ref={viewPager => { this.viewPager = viewPager; }}
                    style={{flex: 1}}
                    indicator={this._renderDotIndicator()}>
                    <View style={styles.container}>
                      <Image source={require('../assets/icon.png')} style={styles.thumbnail}/>
                      <H1 style={[styles.headline, {top: 0}]}>Willkommen im Airchecker</H1>
                      <Text style={[styles.descriptions, {top: 10}]}>
                      Nachfolgend möchten wir dich kurz durch die Kernfunktionen der App führen und dir zeigen, was der Airchecker alles für dich machen kann.
                      </Text>
                      <Button style={{top: 25}} onPress={() => this.viewPager.setPage(1)} block padder>
                        <Text>Los gehts!</Text>
                      </Button>
                    </View>
                    <View style={styles.container}>
                      <H1 style={styles.headline}>Startseite</H1>
                      <Image source={require('../assets/tour1.jpg')} style={styles.image}/>
                      <Text style={styles.descriptions}>
                      Dies ist deine Startseite. Hier findest du eine Übersicht aller Luftschadstoffe mit den aktuellen gemessenen Werten, die der Airchecker erfassen kann.
                      </Text>
                      <Button transparent onPress={() => this.viewPager.setPage(2)} style={styles.doneButton}>
                        <Icon type="FontAwesome" name="angle-right"/>
                      </Button>
                    </View>
                    <View style={styles.container}>
                    <H1 style={styles.headline}>Aktualisieren</H1>
                      <Image source={require('../assets/tour2_refresh.jpg')} style={styles.image}/>
                      <Text style={styles.descriptions}>
                      Streiche mit deinem Finger einfach von oben nach unten über das Display, um die Übersicht zu aktualisieren. So lädt der Airchecker erneut die aktuellen Schadstoffwerte .
                      </Text>
                      <Button transparent onPress={() => this.viewPager.setPage(3)} style={styles.doneButton}>
                        <Icon type="FontAwesome" name="angle-right"/>
                      </Button>
                    </View>
                    <View style={styles.container}>
                    <H1 style={styles.headline}>Persönliche Einstellungen</H1>
                      <Image source={require('../assets/tour4.jpg')} style={styles.image}/>
                      <Text style={styles.descriptions}>
                      Über das <Icon style={{fontSize: 18, color: "#ffffff"}} name="menu" /> Icon gelangst du ins Einstellungsmenü. In diesem Menü kannst du alle verfügbaren Schadstoffe über das <Icon style={{fontSize: 18, color: "#ffffff"}} type="FontAwesome" name="eye"/> Icon ein- und ausblenden.
                      </Text>
                      <Button transparent onPress={() => this.viewPager.setPage(4)} style={styles.doneButton}>
                        <Icon type="FontAwesome" name="angle-right"/>
                      </Button>
                    </View>
                    <View style={styles.container}>
                    <H1 style={styles.headline}>Belastungswerte anpassen</H1>
                      <Image source={require('../assets/tour3_settings.jpg')} style={styles.image}/>
                      <Text style={styles.descriptions}>
                      Zudem kannst du für jeden Schadstoff deine persönlichen Belastungswerte (wie stark bist du gegen den bestimmten Stoff allergisch) festlegen. Über "Einheit An/Aus" kannst du die Einheiten in der Übersicht auch gerne ausblenden.
                      </Text>
                      <Button iconRight bordered onPress={() => this.props.navigation.navigate("HomeScreen")} style={styles.doneButton}>
                        <Text>OK</Text>
                        <Icon type='FontAwesome' name='check' />
                      </Button>
                    </View>
          </IndicatorViewPager>
          <Button transparent onPress={() => this.props.navigation.navigate("HomeScreen")} style={styles.skipButton}>
            <Text style={{color: "#444"}}>Skip</Text>
          </Button>
        </View>
      </Container>
    );
  }
  _renderDotIndicator() {
    return <PagerDotIndicator
              pageCount={5}
              style={{bottom: 16}}
              dotStyle={{backgroundColor: '#FFFFFF88'}}/>;
}
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  skipButton: {
    position: 'absolute',
    bottom: 2,
    left: 16
  },
  doneButton: {
    position: 'absolute',
    bottom: 2,
    right: 16
  },
  thumbnail: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.6,
    resizeMode: 'contain',
  },
  image: {
    top: 10,
    width: windowWidth * 0.8,
    height: windowHeight * 0.6,
    resizeMode: 'contain',
  },
  headline: {
    top: 20,
    bottom: 20,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
  },
  descriptions: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
    width: windowWidth * 0.8,
  },
  container: {
    alignItems: 'center',
  }
});