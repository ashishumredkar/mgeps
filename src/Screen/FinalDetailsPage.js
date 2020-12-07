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
} from "react-native";
import BottomView from "./BottomView";
import CustomToolbar from "./Components/CustomToolbar";
import GeneralStatusBarColor from "./Components/GeneralStatusBarColor";
import AsyncStorage from "@react-native-community/async-storage";
import { gStyles } from "../style/appStyles";
import { viewDetailStyles } from "../style/viewDetailStyles";
import { AppColors } from "../style/AppColors";

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
      userType: "Merchant",
      apiUrl: "",
      urlParameter: {},
      authToken: "",
      title: "",
    };
  }

  async componentDidMount() {
    const mData = this.props.route.params.data;
    const token = await AsyncStorage.getItem("auth_token");

    const userType = await AsyncStorage.getItem("userType");

    console.log("urlParameter ", mData);

    this.setState({
      authToken: token,
      userSelected: mData,
      pageTitle: mData.activityType,
      userType: userType,
      urlParameter: mData.urlParameter,
      apiUrl: mData.detailsUrl,
      title: this.props.route.params.pageTitle,
    });

    this.getDetails(token, mData.urlParameter, mData.detailsUrl);
  }

  getDetails = async (token, urlParams, url) => {
    this.setState({ loading: true });
    console.log("urlParams ", urlParams);
    const data = urlParams;
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
          this.setState({ loading: false, userSelected: responseJson });
          this.setState({ loading: false });
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
        this.setState({ loading: false });

        console.error("qwerty  ", error);
      })
      .finally(() => this.setState({ loading: false }));
  };

  sendAckForRead = async (token, notificationId, moduleName) => {
    const data = {
      moduleName: moduleName,
      notificationId: notificationId,
    };
    this.setState({ loading: true });
    fetch(
      "https://mgeps-uat.philgeps.gov.ph/api/BuyerUsers/readNotifcationApi",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("sendAckForRead ", responseJson);
      })
      .catch((error) => {
        //Hide Loader
        console.error("qwerty  ", error);
      })
      .finally(() => this.setState({ loading: false }));
  };

  clickEventListener = (item) => {
    this.setState({ userSelected: item }, () => {
      this.setModalVisible(true);
    });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { userSelected, userType, urlParameter } = this.state;
    const noticeDetails = Object.keys(userSelected).map((key) => ({
      [key]: userSelected[key],
    }));

    return (
      <View style={{ flex: 1 }}>
        <GeneralStatusBarColor
          backgroundColor={AppColors.colorPrimary}
          barStyle="light-content"
        />

        <CustomToolbar
          navigation={this.props.navigation}
          title={this.state.pageTitle}
          userType={userType}
          backgroundColor="#3775f0"
        />

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
        <View style={{ flex: 0.9, margin: 8 }}>
          <View
            style={{
              height: 32,
              width: "100%",
              backgroundColor: "#3775f0",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottomLeftRadius: 2,
            }}
          >
            <Text style={viewDetailStyles.cardTitle}>Details</Text>
          </View>
          <View style={viewDetailStyles.card}>
            <View style={viewDetailStyles.cardContent} />

            <View
              style={{
                width: "100%",
                // height: "70%",
                flexDirection: "column",
                alignItems: "flex-start",
                alignContent: "flex-start",
              }}
            >
              <FlatList
                data={noticeDetails}
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
                    typeof keyValue[0][1] === "string" ||
                    typeof keyValue[0][1] === "number"
                  ) {
                    var key = keyValue[0][0];
                    var value = keyValue[0][1];
                    return (
                      <View style={viewDetailStyles.notificationLabel}>
                        <Text style={viewDetailStyles.name}>{key}:</Text>
                        <Text style={viewDetailStyles.notificationValue}>
                          {value}
                        </Text>

                        <View></View>
                      </View>
                    );
                  }
                }}
                //Setting the number of column
                numColumns={1}
                keyExtractor={(item, index) => "" + index}
              />
            </View>
          </View>
        </View>
        {this.state.isLoading && (
          <View style={{ flex: 1, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#ff6a00" />
          </View>
        )}
        <View style={{ flex: 0.1 }}>
          <BottomView />
        </View>
      </View>
    );
  }
}
