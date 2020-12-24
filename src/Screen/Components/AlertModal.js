// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Modal, Image, Text } from "react-native";
import { Button } from "react-native-elements";
import { AppColors } from "../../style/AppColors";

const AlertModal = (props) => {
  const { loading, errorMessage,  ...attributes } = props;
    // useEffect(() => {
      
    // }, []);

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
        <View style={styles.activityIndicatorWrapper}>
          <View
            style={{
              backgroundColor: AppColors.red300,
              width: "100%",
              alignSelf: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              source={require("../../Image/no_inter.png")}
              style={[styles.image, {}]}
            />

            <Text style={styles.paragraph}>{props.title}</Text>
          </View>

          <View style={{ backgroundColor: "white", flex: 1, marginTop: 5, paddingLeft: 20, paddingRight: 20,}}>
            <Text style={styles.text}>{errorMessage ? errorMessage : "No Records Found"}</Text>

            <Button
              title="RETRY"
              buttonStyle={{
                marginTop: 15,
                borderRadius: 16,
                backgroundColor: AppColors.red300,
                width: "60%",
                alignItems: "center",
                alignContent: "center",
                alignSelf: "center",
              }}
              onPress={() => props.onRety()}
            />

            <Button
              title="CLOSE"
              buttonStyle={{
                marginTop: 10,
                borderRadius: 16,
                backgroundColor: AppColors.red300,
                width: "60%",
                alignItems: "center",
                alignContent: "center",
                alignSelf: "center",
              }}
              onPress={() => props.onCloseModal()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: "40%",
    width: "70%",
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
    color: "white",
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
});
