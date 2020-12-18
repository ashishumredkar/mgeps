import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { Icon } from "react-native-elements";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import BottomView from "../BottomView";
import { CONTACT_US } from "../Utils";
const STORAGE_KEY = "@user_data";

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calls: [
        {
          id: 1,
          name: "Profile",
          type: "profile",
          image: "https://bootdey.com/img/Content/avatar/avatar7.png",
        },
        {
          id: 2,
          name: "Mute Notification",
          type: "notification",
          image:
            "https://cdn.iconscout.com/icon/free/png-64/notifications-1780874-1514189.png",
        },
      ],
      isVisible: false,
      checked: true,
      Address:'',
      EmailId:'',
      PhoneNo:'',
    };
  }

  async componentDidMount (){
    const userData = await AsyncStorage.getItem(STORAGE_KEY);
    const mData = JSON.parse(userData);
    const token = await AsyncStorage.getItem("auth_token");
    // const userType = await AsyncStorage.getItem("userType");
    this.getContactUsData(mData.id,mData.userType,token);
  }

  getContactUsData = async (id, muserType, token) => {
    const data = {
      id: id,
      userType: muserType,
    };
    console.log("authToken5 ", token);

    // fetch("https://mgeps-uat.philgeps.gov.ph/api/BuyerUsers/dashboard", {//Live UAT
    fetch(CONTACT_US, { //Pune office UAT
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        //Hide Loader
        //setLoading(false);
        if(res){
          this.setState({Address:res.Address,EmailId:res.EmailId,PhoneNo:res.PhoneNo})
        }
      })
      .catch((error) => {
        //Hide Loader
        //setLoading(false);
        console.error("qwerty  ", error);
      });
  };

  renderMap = () => {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 19.094224296260077,
            longitude: 72.82827441979585,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            coordinate={{
              latitude: 19.094224296260077,
              longitude: 72.82827441979585,
            }}
          ></Marker>
        </MapView>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 24, padding: 10,}}>
            Nextenders (India) Private Limited
          </Text>

          <Text style={{ fontSize: 18, padding: 10, color: "Orange" }}>
          {this.state.Address}
          </Text>
          {/* <Text style={{ fontSize: 18, padding: 10, color: "Orange" }}>
            Mumbai,Maharashtra 400049,
          </Text> */}

          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 18, padding: 10, color: "Orange" }}>
            {this.state.EmailId}
            </Text>
            <View
              style={styles.circle}
              underlayColor="#ccc"
              onPress={() => alert("Yaay!")}
            >
              <Icon name="email" type="Zocial" color="white" />
            </View>

            <View
              style={styles.circle}
              underlayColor="#ccc"
              onPress={() => alert("Yaay!")}
            >
              <Icon name="call" type="Zocial" color="white" />
            </View>
          </View>
          <Text style={{ fontSize: 18, padding: 10, color: "Orange" }}>
           {this.state.PhoneNo}
          </Text>
        </View>

        <View style={{ flex: 0.89, margin: 2 }}>{this.renderMap()}</View>
        <View style={{ flex: 0.2, alignSelf: "auto" }}>
          <BottomView />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // flex:1,
    // height: 400,
    // width: 400,
  },
  circle: {
    margin: 5,
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
});
