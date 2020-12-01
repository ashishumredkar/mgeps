import React, { Component } from "react";
import { StyleSheet, Platform, Image } from "react-native";

import { Container, Footer, Title, Button } from "native-base";

export default class App extends Component {
  render() {
    return (
      <Container>
        <Footer>
          <Button transparent></Button>

          <Title>Copyright {"\u00A9"}By.philGEPS</Title>

          <Image
            source={require("../Image/success.png")}
            style={styles.image}
          />

          <Title>powered {"\u00A9"}By</Title>

          <Image
            source={require("../Image/success.png")}
            style={styles.image}
          />

          <Button transparent></Button>
        </Footer>
      </Container>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
  },

  MainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 10,
  },

  bottomView: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    margin: 10,
    paddingBottom: Platform.OS === "ios" ? 20 : 25,
  },

  image: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    justifyContent: "center",
  },
  textStyle: {
    justifyContent: "center",
    width: "70%",
    fontSize: 14,
    color: "white",
    flex: 1,
  },
});
