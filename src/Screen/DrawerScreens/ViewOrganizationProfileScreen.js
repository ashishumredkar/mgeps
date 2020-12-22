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
import Loader from "../Components/Loader";
import { VIEW_ORGANIZATION_URL } from "../Utils";
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
      userData: undefined,
      profileData: [],
      userId: null,
    };
  }

  async componentDidMount() {
    this.readData();
  }

  readData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@user_data");
      const userType = await AsyncStorage.getItem("userType");
      const token = await AsyncStorage.getItem("auth_token");
      const mData = JSON.parse(userData);

      if (userData) {
        this.setState({
          userId: mData.id,
          userType: userType,
          authToken: token,
          userData: mData,
        });

        this.getOrganizationDetails(mData.id, mData.userType, token);
      }
    } catch (e) {
      console.log("catch ", e);
    }
  };

  getOrganizationDetails = async (id, muserType, token) => {
    this.setState({ loading: true });
    const data = {
      userId: id,
      userType: muserType,
      authToken: token,
    };

    console.log("My Organization Profile :", VIEW_ORGANIZATION_URL);

    fetch(VIEW_ORGANIZATION_URL, {
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

        this.setState({ loading: false, organizationDetails: responseJson });

        console.log("\n\n\n");
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

    const { userData, organizationDetails, userType } = this.state;

    const orgDetails = Object.keys(organizationDetails).map((key) => ({
      [key]: organizationDetails[key],
    }));

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

        <CustomToolbar
          title={"My Organization Profile"}
          userType={userType}
          backgroundColor="#3775f0"
        />
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={[styles.card, { flex: 0.9, margin: 5, marginBottom: 10 }]}
          >
            {/* <Card
            style={{
              padding: 10,
              margin: 10,
              backgroundColor:'blue',
              borderRadius: 80,
              marginBottom: 19,
            }}
          > */}
            <Text style={[gStyles.contactStyle, { marginBottom: 20 }]}>
              Organization Details
            </Text>

            <FlatList
              data={orgDetails}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                //console.log("item ", item);
                const keyValue = Object.keys(item).map((key) => [
                  key,
                  item[key],
                ]);
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
                        marginTop: 0,
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <View
                        style={[
                          viewDetailStyles.notificationLabel,
                          { flexDirection: "row", flex: 1 },
                        ]}
                      >
                        <Text
                          style={[
                            viewDetailStyles.name,
                            { flex: 0.40, fontWeight: "normal", width: 80 },
                          ]}
                        >
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .trim()
                            .replace(/^./, function (str) {
                              return str.toUpperCase();
                            })}
                          :
                        </Text>
                        <Text
                          style={{
                            flex: 0.60,
                            fontSize: 15,
                            marginLeft: 1,
                            textAlign: "left",
                            fontWeight: "normal",
                            paddingLeft: 0,
                            color: AppColors.colorPrimary,
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
                            backgroundColor: AppColors.AppGrey001,
                            marginTop: 8,
                          }}
                        />
                      ) : null}
                      {index % 2 === 0 ? (
                        <View
                          style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: AppColors.AppGrey001,
                            marginTop: 8,
                          }}
                        />
                      ) : null}
                    </View>
                  );
                }
              }}
              //Setting the number of column
              numColumns={1}
              keyExtractor={(item, index) => "" + index}
            />
          </View>
          {/* </View> */}
          <View style={{ flex: 0.1, alignSelf: "auto" }}>
            <BottomView />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

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
  card: {
    borderWidth: 3,
    borderRadius: 3,
    borderColor: AppColors.AppGrey001,
    margin: 4,
    marginRight: 8,
    padding: 10,
  },
});
