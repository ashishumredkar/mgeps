// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Modal, Image, Text, Platform } from "react-native";
import { Button } from "react-native-elements";
import { AppColors } from "../../style/AppColors";

const Tnc = (props) => {
  const { loading, ...attributes } = props;

  //   const [showModal, setShowModal] = useState(loading);
  //   useEffect(() => {
  //     // Update the document title using the browser API
  //     setShowModal(loading)
  //   }, [showModal]);

  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={loading}
      //   onRequestClose={() => {
      //     console.log("Modal has been closed.");
      //   }}
      onRequestClose={() => {
        // setShowModal(false);
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
            <Text style={{ height: 30 }}> Terms of Service</Text>
            <Text style={{ height: 30 }}>Last updated January 2020</Text>
          </View>
          <Button
            title="DECLINE"
            buttonStyle={{
              marginTop: 5,
              borderRadius: 16,
              backgroundColor: "#F24E0B",
              alignContent: "center",
              height: 40,
            }}
            onPress={() => props.onCloseModal()}
          />
        </View>
        <Text style={{ height: 1,backgroundColor:'red',width:'100%' }}/>

        
        <Text style={{width:'100%' ,flex:1,marginTop:10,padding:12}}>

        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
       
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

       </Text>
        {/* <View
          style={{
            flex: 1,
            height: 1,
            width: "100%",
            backgroundColor: "white",
          }}
        /> */}

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
                backgroundColor: "#A1E13E",
                width:120,
                height: 40,
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
                backgroundColor: "#F24E0B",
                width:120,
                height: 40,
              }}
              onPress={() => props.onResponse(false)}
            />

            {/* <View style={{width: 50, height: 50, backgroundColor: 'steelblue',flex:1}} /> */}
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
