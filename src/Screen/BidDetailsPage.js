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
  SafeAreaView
} from "react-native";
import BottomView from "./BottomView";
import CustomToolbar from "./Components/CustomToolbar";
import GeneralStatusBarColor from "./Components/GeneralStatusBarColor";
import AsyncStorage from "@react-native-community/async-storage";
import { gStyles } from "../style/appStyles";
import { viewDetailStyles } from "../style/viewDetailStyles";
import { AppColors } from "../style/AppColors";
import { READ_NOTIFICATION_URL } from "./Utils";

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
    console.log("componentDidMount ",mData)

    this.setState({
      authToken: token,
      userSelected: [],
      pageTitle: mData.noticeTitle,
      userType: userType,
      urlParameter: mData.urlParameter,
      apiUrl: mData.detailsUrl,
      title: this.props.route.params.pageTitle,
    });

    this.setState({ userSelected: mData });
  }


  render() {
    const { userSelected, userType, urlParameter } = this.state;
    const noticeDetails = Object.keys(userSelected).map((key) => ({
      [key]: userSelected[key],
    }));

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.colorPrimary}}>
        {/* <GeneralStatusBarColor
          backgroundColor={AppColors.colorPrimary}
          barStyle="light-content"
        /> */}

        <CustomToolbar
          navigation={this.props.navigation}
          title={this.state.title}
          userType={userType}
          backgroundColor="#3775f0"
        />
        <View style={{flex: 1, backgroundColor: "#FFFFFF"}}>
          <View style={{ paddingTop: 8, paddingLeft: 8 }}>
            <Text
              numberOfLines={1}
              style={[
                gStyles.contactStyle,
                { color: "grey", fontSize: 14, marginTop: 5 },
              ]}
            >
              {this.state.title} /{this.state.pageTitle}
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
                  showsVerticalScrollIndicator ={false}
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
                      typeof keyValue[0][1] === "string" ||
                      typeof keyValue[0][1] === "number"
                    ) {
                      var key = keyValue[0][0];
                      var value = keyValue[0][1];
                      return (
                        <View>
                          <View style={viewDetailStyles.notificationLabel}>
                            <Text style={viewDetailStyles.name}>{key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, function(str){ return str.toUpperCase(); })}:</Text>
                            <Text style={viewDetailStyles.notificationValue}>
                              {value}
                            </Text>
                          </View>
                          <View
                              style={{
                                height: 1,
                                width: "100%",
                                backgroundColor: AppColors.AppGrey001,
                                marginTop: 8,
                              }}
                            />
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
      </SafeAreaView>
    );
  }
}
