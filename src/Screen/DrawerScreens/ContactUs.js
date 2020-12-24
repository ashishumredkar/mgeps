import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Icon } from "react-native-elements";
import GeneralStatusBarColor from "../Components/GeneralStatusBarColor";
import CustomToolbar from "../Components/CustomToolbar";
import { AppColors } from "../../style/AppColors";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import BottomView from "../BottomView";
import { CONTACT_US } from "../Utils";
import { ActivityIndicator } from "react-native";
import AlertModal from "../Components/AlertModal";
const STORAGE_KEY = "@user_data";

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      checked: true,
      userType: "",
      userTypeName: "",
      Address: "",
      EmailId: "",
      PhoneNo: "",
      isLoading: false,
      isModalVisible: true,
      errorMessage: "Failed to load Contact",
    };
  }

  async componentDidMount() {
    this.getDetails();
  }

  getDetails =async()=>{
    const userData = await AsyncStorage.getItem(STORAGE_KEY);
    const mData = JSON.parse(userData);
    const token = await AsyncStorage.getItem("auth_token");
    const userTypeName = await AsyncStorage.getItem("userType");
    // const userType = await AsyncStorage.getItem("userType");
    this.getContactUsData(mData.id, mData.userType, token, userTypeName);
  }

  getContactUsData = async (id, muserType, token, userTypeName) => {
    const data = {
      id: id,
      userType: muserType,
    };
    console.log("authToken5 ", token);

    fetch(CONTACT_US, {
      //Pune office UAT
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
        console.log("getContactUsData",res)
        if (res) {
          this.setState({
            muserType,
            Address: res.Address,
            EmailId: res.EmailId,
            PhoneNo: res.PhoneNo,
            userTypeName,
            isLoading: false,
            isModalVisible: false 
          });
        }
      })
      .catch((error) => {
        //Hide Loader
        //setLoading(false);
        this.setState({ isLoading: false, isModalVisible: true });
        console.error("qwerty  ", error);
      });
  };

  renderMap = () => {
    return (
      <View
        style={[styles.container, { ackgroundColor: AppColors.colorPrimary }]}
      >
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

  onRety = () => {
    this.setState({ isModalVisible: false, isLoading: true });

    this.getDetails();
  };

  closeModal = () => {
    this.props.navigation.navigate("HomeScreen")
    this.setState({ isModalVisible: false, isLoading: false });
  };

  render() {
    const { isModalVisible, errorMessage } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={this.state.isLoading}
            color="#bc2b78"
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CustomToolbar
          title={"Contact Us"}
          userType={this.state.userTypeName}
          backgroundColor="#3775f0"
        />
        <View style={{ flex: 1 }}>
          <View style={{ margin: 20, flex: 0.9 }}>
            {/* <Text style={{ fontSize: 24, padding: 10,}}>
              Nextenders (India) Private Limited
            </Text> */}

            <AlertModal
              title={"Contact Us"}
              loading={isModalVisible}
              errorMessage={errorMessage}
              onRety={this.onRety}
              onCloseModal={this.closeModal}
            />

            <View style={{ backgroundColor: AppColors.grey10, height: "50%" }}>
              <Text style={{ fontSize: 18, padding: 10 }} selectable={true}>
                {this.state.Address.replace(/,/g, ",\n").trim()}
              </Text>

              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Text
                  style={{ fontSize: 18, paddingLeft: 10, paddingBottom: 8 }}
                  selectable={true}
                >
                  {this.state.EmailId}
                </Text>
              </View>
              <Text
                style={{ fontSize: 18, paddingLeft: 10, paddingBottom: 8 }}
                selectable={true}
              >
                {this.state.PhoneNo}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      "mailto:" +
                        this.state.EmailId +
                        "?subject=Contact Us&body=Hi Team,\n"
                    )
                  }
                >
                  <View
                    style={styles.circle}
                    underlayColor="#ccc"
                    onPress={() => alert("Yaay!")}
                  >
                    <Icon name="email" type="Zocial" color="white" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => Linking.openURL("tel:" + this.state.PhoneNo)}
                >
                  <View
                    style={styles.circle}
                    underlayColor="#ccc"
                    onPress={() => alert("Yaay!")}
                  >
                    <Icon name="call" type="Zocial" color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* <View style={{ flex: 0.89, margin: 2 }}>{this.renderMap()}</View> */}
          <View style={{ flex: 0.1, alignSelf: "auto" }}>
            <BottomView />
          </View>
        </View>
      </SafeAreaView>
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
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
});
