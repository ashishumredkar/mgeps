import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ScrollView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
  Button
} from "react-native";
import BottomView from "./BottomView";
import CustomToolbar from "./Components/CustomToolbar";
import GeneralStatusBarColor from "./Components/GeneralStatusBarColor";
import AsyncStorage from "@react-native-community/async-storage";
import { gStyles } from "../style/appStyles";
import { viewDetailStyles } from "../style/viewDetailStyles";
import { AppColors } from "../style/AppColors";
import { READ_NOTIFICATION_URL } from "./Utils";
import EventEmitter from "react-native-eventemitter";

export const Divider = () => {
  return (
    <View
      style={{
        height: 0.5,
        width: "100%",
        backgroundColor: "grey",
      }}
    />
  );
};

export default class FinalDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      pageTitle: "",
      loading: false,
      isLoading: false,
      userType: "Merchant",
      apiUrl: "",
      urlParameter: {},
      authToken: "",
      title: "",
    };
  }

  async componentDidMount() {
    const mData = this.props.route.params.data;

    console.log("\n\n\n Data :: ", mData);
    const token = await AsyncStorage.getItem("auth_token");
    const userType = await AsyncStorage.getItem("userType");

    this.setState({
      authToken: token,
      userSelected: [],
      pageTitle: mData.activityType,
      userType: userType,
      urlParameter: mData.urlParameter,
      apiUrl: mData.detailsUrl,
      title: this.props.route.params.pageTitle,
      isLoading: false,
    });

    this.getDetails();
  }

  getDetails = async () => {
    this.setState({ loading: true, isLoading: true });
    console.log("Detail Page URL ..... :: ", this.state.apiUrl);
    console.log("\n\n\n\n");
    console.log("urlParams ", this.state.urlParameter);
    console.log("\n\n\n\n");
    const data = this.state.urlParameter;
    fetch(this.state.apiUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.state.authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loading: false });
        //Hide Loader

        if (responseJson) {
          this.setState({ userSelected: responseJson });
          this.sendAckForRead(
            this.state.authToken,
            responseJson.notificationId,
            responseJson.moduleName
          );
        }

        console.log("getDetails ", responseJson);
      })
      .catch((error) => {
        //Hide Loader
        //setLoading(false);
        console.log("getDetails ", error);
        this.setState({ loading: false, isLoading: false });
        console.error("qwerty  ", error);
      })
      .finally(() => this.setState({ loading: false, isLoading: false }));
  };

  sendAckForRead = async (token, notificationId, moduleName) => {
    const data = {
      moduleName: moduleName,
      notificationId: notificationId,
    };

    var url = READ_NOTIFICATION_URL; // Pune UAT
    // var url = "https://mgeps-uat.philgeps.gov.ph/api/BuyerUsers/readNotifcationApi"; // LIVE UAt
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
        console.log("sendAckForRead ", responseJson);
        EventEmitter.emit("UPDATE_COUNT", true);
      })
      .catch((error) => {
        //Hide Loader
        console.error("qwerty  ", error);
      })
      .finally(() => this.setState({ loading: false }));
  };

  EmptyListMessage = ({ item }) => {
    const isLoading = this.state.isLoading;
    return (
      // Flat List Item
      !isLoading && (
        <View style={{flex: 1}}>
          <Pressable style={[styles.container2]} onPress={this.getDetails}>
          <Image
              style={[styles.cardImage, {tintColor: AppColors.grey20}]}
              source={require("../Image/ic_wifi_signal.png")}/>
            <Text style={[styles.welcome, {color: AppColors.grey90}]}> No Records Found </Text>

            <View
              style={[
                styles.center,
                { flexDirection: "row", flex: 1, marginBottom: 10 },
              ]}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../Image/ic_refresh.png")}
              />
              <Text style={{color: AppColors.grey90}}>Tap to retry</Text>
            </View>
          </Pressable>

          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              style={[styles.center, {width: 50, height: 50, backgroundColor: AppColors.colorPrimary, borderRadius: 25, marginBottom: 20}]}
              source={require("../Image/ic_left.png")}
            />
          </TouchableOpacity>

          <View style={[styles.center, {width: "70%"}]}>
            <Button title="Go TO Dashboard" onPress={() => this.props.navigation.navigate("HomeScreen")} />
          </View>
        </View>
      )
    );
  };

  render() {
    const { userSelected, userType, urlParameter } = this.state;
    const noticeDetails = Object.keys(userSelected).map((key) => ({
      [key]: userSelected[key],
    }));

    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: AppColors.colorPrimary }}
      >
        <CustomToolbar
          navigation={this.props.navigation}
          title={this.state.pageTitle}
          userType={userType}
          backgroundColor="#3775f0"
        />
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          <View style={{ flex: 0.9, zIndex: 0 }}>
            <View style={{ paddingTop: 8, paddingLeft: 8 }}>
              <Text
                numberOfLines={1}
                style={[
                  gStyles.contactStyle,
                  { color: "grey", fontSize: 14, marginTop: 5 },
                ]}
              >
                {this.state.title}
              </Text>
            </View>

            <Text
              style={{
                height: 2,
                backgroundColor: "blue",
                width: "100%",
                marginTop: 5,
              }}
            />
            <View style={{ margin: 8 }}>
              <View
                style={{
                  height: 28,
                  width: "100%",
                  backgroundColor: AppColors.colorPrimary,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  borderBottomLeftRadius: 2,
                }}
              >
                <Text style={viewDetailStyles.cardTitle}>Details</Text>
              </View>
              <View style={viewDetailStyles.card}>
                <View style={viewDetailStyles.cardContent} />
                
                {this.state.loading && (
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#ff6a00" />
                  </View>
                )}
                
                <View
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignContent: "flex-start",
                  }}
                >
                  <FlatList
                    data={noticeDetails}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                      //console.log("item ", item);
                      const keyValue = Object.keys(item).map((key) => [
                        key,
                        item[key],
                      ]);
                      console.log(
                        "Key Value :: ",
                        keyValue + " Type :: " + typeof keyValue[0][1]
                      );

                      if (
                        (!["moduleName", "notificationId"].includes(keyValue[0][0]))
                        && (typeof keyValue[0][1] === "string" || typeof keyValue[0][1] === "number")
                      ) {
                        var key = keyValue[0][0];
                        var value = keyValue[0][1];
                        return (
                          <View>
                            <View style={viewDetailStyles.notificationLabel}>
                              <Text style={[viewDetailStyles.name, {width: "30%"}]}>
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .trim()
                                  .replace(/^./, function (str) {
                                    return str.toUpperCase();
                                  })}
                                :
                              </Text>
                              <Text style={viewDetailStyles.notificationValue}>
                                {value}
                              </Text>
                            </View>
                            <View
                              style={{
                                height: 1,
                                width: "100%",
                                backgroundColor: AppColors.AppGrey001,
                                marginTop: 4,
                              }}
                            />
                          </View>
                        );
                      }
                    }}
                    //Setting the number of column
                    numColumns={1}
                    keyExtractor={(item, index) => "" + index}
                    ListEmptyComponent={this.EmptyListMessage}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 0.1, zIndex: 999 }}>
            <BottomView />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  container2: {
    flex: 1,
    flexDirection: "column",
    width: 350,
    marginLeft: -15,
    marginTop: -70,
  },
  toolbar: {
    backgroundColor: "#E9EAED",
    height: 56,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  message: {
    color: "red",
    fontSize: 15,
    margin: 8,
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: "center",
  },
  cardImage: {
    flex: 1,
    marginTop: "46%",
    height: 70,
    width: 70,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },

  center: {
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center"
  },
});