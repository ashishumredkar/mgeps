import React, { Component } from "react";
import { StyleSheet, Platform, Image, View, Text } from "react-native";
import { AppColors } from "../style/AppColors";

export default class BottomView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bottomView}>
          <View
            style={{
              flexDirection: "row",
              flex: 0.5,
            }}>
             <Text style={[styles.btnText, { height: 40, marginTop: 10 }]}>
              Copyright {"\u00A9"}By.philGEPS{" "}
            </Text>
            <Image
              source={require("../Image/menu_logo.png")}
              style={styles.image}
            />
            <View style={{ width: 20 }} />
          </View>
          <View style={{ width: 40 }} />
          <View style={{ flexDirection: "row", flex: 0.5 }}>
            <Text style={[styles.btnText, { height: 40, marginTop: 10 }]}>
              Powered Byt:
            </Text>

            <Image
              source={require("../Image/nextenders_logo.png")}
              style={{
                width: 80,
                height: 51,
                marginBottom: 8,
                resizeMode: "contain",
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 20,
    paddingBottom: 80,
    height: 50,
    flex: 1,
    backgroundColor:AppColors.lightBlue50,
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
    margin: 5,
    paddingBottom: Platform.OS === "ios" ? 10 : 10,
    backgroundColor:AppColors.lightBlue50,
  },

  MainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 10,
  },

  bottomView: {
       marginLeft:5,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      paddingBottom: 16,
      paddingTop: 50,
      alignSelf: 'center',
      flexDirection: "row",
    
    // flexDirection: "row",
    // width: "100%",
    // height: 50,
    // justifyContent: "center",
    // alignItems: "center",
    // position: "absolute",
    // bottom: 0,
    // flexDirection: "row",
    // margin: 10,
    // paddingBottom: Platform.OS === "ios" ? 20 : 25,
  },

  image: {
    width: 35,
    height: 35,
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
