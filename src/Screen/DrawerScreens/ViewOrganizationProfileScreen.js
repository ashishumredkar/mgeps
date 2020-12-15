// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { gStyles } from "../../style/appStyles";
import AsyncStorage from "@react-native-community/async-storage";

import { Card } from "react-native-elements";
import GeneralStatusBarColor from "../Components/GeneralStatusBarColor";
import CustomToolbar from "../Components/CustomToolbar";
import { AppColors } from "../../style/AppColors";
import { homeStyles } from "../../style/homeStyles";
import { viewDetailStyles } from "../../style/viewDetailStyles";
import BottomView from "../BottomView";
const STORAGE_KEY = "@user_data";

class ViewOrganizationProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationDetails: [],
      pageTitle: "",
      loading: false,
      userType: "",
      apiUrl: "",
      urlParameter: {},
      authToken: "",
      title: "",
    };
  }
  
  componentDidMount() {
    this.readData();
  }

  readData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@user_data");
      const userType = await AsyncStorage.getItem("userType");
      const value = JSON.parse(userData);

      setUserName(userType);
      setUserData(value);

      const noticeDetails = Object.keys(value).map((key) => ({
        [key]: value[key],
      }));
      console.log("setAnimatingabc ", noticeDetails);

      setProfileData(noticeDetails);
    } catch (e) {
      console.log("catch ", e);
    }
  };

  getOrganizationDetails = async () => {
    this.setState({ loading: true });

    const userData = await AsyncStorage.getItem(STORAGE_KEY);
    const mData = JSON.parse(userData);

    const token = await AsyncStorage.getItem("auth_token");

    console.log("Token ::", token);
    console.log("user Type", mData.userType);
    console.log("user Id", mData.id);
    const data = {
      userId: mData.id,
      userType: mData.userType
    };

    var url = "https://mgeps-uat-pune.etenders.in/api/BuyerUsers/viewOrganization"; // Pune UAT
    // var url = "https://mgeps-uat.philgeps.gov.ph/api/BuyerUsers/viewOrganization"; // Live UAT
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader

        if (responseJson) {
          this.setState({ loading: false, organizationDetails: responseJson });
          this.setState({ loading: false });
        }

        console.log("getDetails ", responseJson);
      })
      .catch((error) => {
        //Hide Loader
        //setLoading(false);
        console.log("getDetails ", error);
        this.setState({ loading: false });

        console.error("qwerty  ", error);
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    if (this.state.loading) return <Loader loading={this.state.loading} />;

    const { isConditionAccepted } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <GeneralStatusBarColor
          backgroundColor={AppColors.colorPrimary}
          barStyle="light-content"
        />

        <CustomToolbar
          title={"View Organization"}
          userType={"Somshine"}
          backgroundColor="#3775f0"
        />

        {userData ? (
          <Card
            style={{ padding: 10, margin: 10, height: "40%", borderRadius: 40 }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={[gStyles.userAvatarStyle]}>
                <Text>{userData.fname.charAt(0) + userData.lname.charAt(0)}</Text>
              </View>

              <View style={{ width: 10 }}></View>

              {/* CONTACT DETAILS  */}
              <View style={{ paddingTop: 8 }}>
                <Text style={gStyles.contactStyle}>
                  {userData.fname} {userData.mname} {userData.lname}
                </Text>
                <Text>
                  {userData.email === undefined || userData.email.length === 0
                    ? "email"
                    : userData.email}
                </Text>
              </View>
            </View>
          </Card>
        ) : null}
        <View style={{ flex: 0.9, margin: 5 }}>
          <Card
            style={{
              padding: 10,
              margin: 10,
              height: "40%",
              borderRadius: 80,
              marginBottom: 8,
            }}
          >
            <FlatList
              data={organizationDetails}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                //console.log("item ", item);
                const keyValue = Object.keys(item).map((key) => [key, item[key]]);
                console.log(
                  "Key Value :: ",
                  keyValue + " Type :: " + typeof keyValue[0][1]
                );

                if (
                  typeof keyValue[0][1] === "string" ||
                  typeof keyValue[0][1] === "number"
                ) {
                  var key = keyValue[0][0];
                  var value = keyValue[0][1];
                  return (
                    <View
                      style={{
                        padding: 3,
                        margin: 2,
                        borderRadius: 10,
                        flex: 1,
                        marginBottom: 8,
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <View
                        style={[
                          viewDetailStyles.notificationLabel,
                          { flexDirection: "column" },
                        ]}
                      >
                        <Text style={viewDetailStyles.name}>{key}:</Text>
                        <Text
                          style={{
                            flex: 1,
                            width: "100%",
                            fontSize: 14,
                            marginLeft: 1,
                            alignContent: "center",
                            color: "grey",
                            fontWeight: "normal",
                            paddingLeft: 0,
                          }}
                        >
                          {value}
                        </Text>
                      </View>
                      {index % 2 != 0 ? (
                        <View
                          style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "grey",
                            marginTop: 8,
                          }}
                        />
                      ) : null}
                      {index % 2 === 0 ? (
                        <View
                          style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "grey",
                            marginTop: 8,
                          }}
                        />
                      ) : null}
                    </View>
                  );
                }
              }}
              //Setting the number of column
              numColumns={2}
              keyExtractor={(item, index) => "" + index}
            />
          </Card>
        </View>
        <View style={{ flex: 0.1, alignSelf: "auto" }}>
          <BottomView />
        </View>
      </SafeAreaView>
    );
  }
};

export default ViewOrganizationProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    backgroundColor: "white",
  },
  paragraph: {
    margin: 5,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
});
