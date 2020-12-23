// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Modal, Image, Text, Platform } from "react-native";
import { Button } from "react-native-elements";
import { AppColors } from "../../style/AppColors";
import { TERMS_CONDITION_URL } from "../Utils";

const Tnc = (props) => {
  const { loading, userType, authToken, ...attributes } = props;
  const [tncText, setTncText]=useState('')

  useEffect(() => {
    fetchTermAndCondition()
  }, [tncText]);

  const fetchTermAndCondition = async () => {
    fetch(TERMS_CONDITION_URL, {
      "method": "POST",
      body: JSON.stringify({
        userType: userType,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // props.termsCondition = json.termsCondition;
        console.log("Terms Conditions :: ", json.termsCondition);
        setTncText(json.termsCondition);
      })
      .catch((error) => {
        console.error(error);
      })
  };

  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={loading}
      onRequestClose={() => {
        props.onCloseModal();
      }}
    >
      <View style={styles.modalBackground}>
        <View style={{ flexDirection: "row", margin: 10 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ height: 30, color: AppColors.teal500, fontSize: 20, fontWeight: "bold" }}> Terms of Service</Text>
            <Text style={{ height: 30, color: AppColors.teal500, fontSize: 12, marginLeft: 10 }}>Last updated January 2020</Text>
          </View>
        </View>
        <Text style={{ height: 1, backgroundColor:'red', width:'100%' }}/>
        <Text style={{width:'100%', flex:1, marginTop:10, padding:12}}>
          {tncText}
        </Text>
        <View style={styles.bottomView}>
        <Text style={{ height: 1,backgroundColor:'#67EEF0',width:'100%' }}/>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            title="Accept"
            buttonStyle={{
              marginTop: 5,
              borderRadius: 16,
              backgroundColor: AppColors.green600,
              width:120,
              height: 35,
            }}
            onPress={() => props.onResponse(true)}
          />
          <View
            style={{
              width: 50,
              height: 50,
              flex: 1,
            }}
          />

          <Button
            title="Decline"
            buttonStyle={{
              marginTop: 5,
              borderRadius: 16,
              backgroundColor: AppColors.red800,
              width:120,
              height: 35,
            }}
            onPress={() => props.onResponse(false)}
          />

        </View>
        </View>
      </View>
    </Modal>
  );
};

export default Tnc;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "white",
    margin: 20,
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: "90%",
    width: "94%",
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
  paragraph: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 20,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    justifyContent: "center",
  },
  bottomView: {
    width: "100%",
    height: 60,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    margin: 5,
    paddingBottom: Platform.OS === "ios" ? 10 : 10,
    // backgroundColor:AppColors.lightBlue50,
  },
});
