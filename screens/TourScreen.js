import React, { Component } from 'react';
import {Image, Dimensions, StyleSheet, StatusBar} from 'react-native';
import { Container, Header, Content, Textarea, List, ListItem, Text, H1, Icon, Button, View } from 'native-base';
import { IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';


export default class TourScreen extends Component {
  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <Container style={{backgroundColor: "#252525"}}>
      <View style={{flex: 1}}>
          <IndicatorViewPager
                    ref={viewPager => { this.viewPager = viewPager; }}
                    style={{flex: 1}}
                    indicator={this._renderDotIndicator()}>
                    <View style={styles.container}>
                      <Image source={require('../assets/icon.png')} style={styles.image}/>
                      <H1 style={styles.headline}>Willkommen im Airchecker</H1>
                      <Text style={[styles.descriptions, {top: 10}]}>
                      Nachfolgend möchten wir dich kurz durch die Kernfeatures der App führen und dir zeigen, was der Airchecker Alles für dich machen kann.
                      </Text>
                      <Button style={{top: 25}} onPress={() => this.viewPager.setPage(1)} block padder>
                        <Text>Los gehts!</Text>
                      </Button>
                    </View>
                    <View style={styles.container}>
                      <H1 style={styles.headline}>Startseite</H1>
                      <Image source={require('../assets/tour1.jpg')} style={styles.image}/>
                      <Text style={styles.descriptions}>
                      Hier findest du eine Übersicht aller Luftschadstoffe mit den aktuellen gemessenen Werten, die der Airchecker erfassen kann. Dies ist deine Startseite!
                      </Text>
                    </View>
                    <View style={styles.container}>
                    <H1 style={styles.headline}>Aktualisieren</H1>
                      <Image source={require('../assets/tour2_refresh.jpg')} style={styles.image}/>
                      <Text style={styles.descriptions}>
                      Durch einen 'Swipe Down' kannst du Ansicht aktualisieren und so jederzeit die aktuellen Schadstoffwerte erneut vom Airchecker anfordern.
                      </Text>
                    </View>
                    <View style={styles.container}>
                    <H1 style={styles.headline}>Persönliche Einstellungen</H1>
                      <Image source={require('../assets/tour4.jpg')} style={styles.image}/>
                      <Text style={styles.descriptions}>
                      Über das <Icon style={{color: "#ffffff"}} fontSize={40} name="menu" /> Icon gelangst du ins Einstellungsmenü. In diesem Menü kannst du alle verfügbaren Schadstoffe über das <Icon style={{color: "#ffffff"}} fontSize={20} type="FontAwesome" name="eye"/> Icon an- oder abwählen.
                      </Text>
                    </View>
                    <View style={styles.container}>
                    <H1 style={styles.headline}>Belastungswerte anpassen</H1>
                      <Image source={require('../assets/tour3_settings.jpg')} style={styles.image}/>
                      <Text style={styles.descriptions}>
                      Zudem kannst du für jeden Schadstoff deine persönlichen Belastungswerte festlegen. Über "Details An/Aus" kannst du die Einheiten auch gerne ausblenden.
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
  image: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.6,
    resizeMode: 'contain',
  },
  headline: {
    top: 10,
    bottom: 20,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff"
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