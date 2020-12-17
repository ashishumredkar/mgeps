import React, { Component } from "react";
import { StyleSheet, Platform, Image, View, Text, TouchableOpacity, Linking } from "react-native";
import { AppColors } from "../style/AppColors";

export default class BottomView extends Component {
  render() {
    return (
      <View style={styles.bottomView}>
        <View style={{ flex: 0.5 }}>
          <Text style={styles.copyRightText}>
            Copyright {"\u00A9"}By.philGEPS{" "}
          </Text>
          <TouchableOpacity onPress={()=> {Linking.openURL('https://www.philgeps.gov.ph/')}}>
            <Text style={styles.hyperLinkText}>philgeps.gov.ph</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: 40 }} />
        <View style={{ flexDirection: "row", flex: 0.5 }}>
          <Text
            style={[styles.btnText, { height: 40, marginTop: 8, fontSize: 11 }]}
          >
            Powered By:
          </Text>

          <TouchableOpacity onPress={()=> {Linking.openURL('http://www.nextenders.com/')}}>
            <Image
              source={require("../Image/nextenders_logo.png")}
              style={{
                width: 80,
                height: 51,
                marginTop: -6,
                marginLeft: 5,
                resizeMode: "contain",
              }}
              />
            </TouchableOpacity>
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
    backgroundColor: AppColors.lightBlue50,
  },
  bottomView: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    margin: 5,
    paddingBottom: Platform.OS === "ios" ? 10 : 10,
    backgroundColor: AppColors.lightBlue50,
  },
  MainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
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
  copyRightText: {
    fontSize: 10,
  },
  hyperLinkText: {
    color: AppColors.colorPrimary,
    fontSize: 14,
    fontWeight: "bold",
  },
});
