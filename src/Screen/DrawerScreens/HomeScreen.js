// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Pressable,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
const STORAGE_KEY = "@user_data";
import Loader from "../Components/Loader";
import { AppColors } from "../../style/AppColors";
import { homeStyles } from "../../style/homeStyles";
import BottomView from "../BottomView";
import { Dialog, ConfirmDialog } from "react-native-simple-dialogs";
import Tnc from "../Components/Tnc";
import { DASHBOARD_URL,BID_EVENT_CAL_URL } from "../Utils";

import CustomToolbar from "../Components/CustomToolbar";
import DatePicker from "react-native-datepicker";

const colors = [
  AppColors.blue400,
  AppColors.yellowLight,
  AppColors.purpleLight,
  AppColors.redLight,
  AppColors.green300,
  AppColors.orangeLight,
  AppColors.goldLight,
  AppColors.grey500,
  AppColors.yellowGoldLight,
  AppColors.teal200,
  AppColors.amber500,
  AppColors.blue400,
];

const imagesArray = [
  require("../../Image/ic_user_registration.png"),
  require("../../Image/ic_auction.png"),
  require("../../Image/ic_peoples_1.png"),
  require("../../Image/ic_ruppes.png"),
  require("../../Image/ic_receipt.png"),
  require("../../Image/ic_report.png"),
  require("../../Image/ic_comment.png"),
  require("../../Image/ic_report.png"),
  require("../../Image/ic_auction.png"),
  require("../../Image/ic_expand_arrow.png"),
  require("../../Image/ic_organization.png"),
  require("../../Image/ic_user_registration.png"),
  require("../../Image/ic_auction.png"),
  require("../../Image/ic_peoples_1.png"),
  require("../../Image/ic_ruppes.png"),
  require("../../Image/ic_report.png"),
  require("../../Image/ic_comment.png"),
  require("../../Image/ic_report.png"),
  require("../../Image/ic_auction.png"),
];

class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: () => null,
    };
  };
  constructor(props) {
    super(props);
    this.datePicker=React.createRef();

    this.state = {
      menuList: [],
      userId: null,
      userType: "",
      userTypeName: "",
      authToken: "",
      loading: true,
      isConditionAccepted: false,
      bidEvent: [],
      date: new Date(),
      modalVisible: false,
    };
  }
  async componentDidMount() {
    this.readData();
  }

  readData = async () => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEY);
      const mData = JSON.parse(userData);

      const token = await AsyncStorage.getItem("auth_token");
      const userTypeName = await AsyncStorage.getItem("userType");
      const tncFlag = await AsyncStorage.getItem("tnc");

      console.log("tncFlag", mData)
      console.log("tncFlag", tncFlag)

      if (!tncFlag) {
        this.setState({ isConditionAccepted: true });
      }

      // this.setState({ isConditionAccepted: true });

      if (userData) {
        this.setState({
          userId: mData.id,
          userType: mData.userType,
          userTypeName: userTypeName,
          authToken: token,
        });

        this.getMenuItems(mData.id, mData.userType, token);
      }
    } catch (e) {
      console.log("catch ", e);
    }
  };

  getMenuItems = async (id, muserType, token) => {
    const data = {
      id: id,
      userType: muserType,
    };
    this.setState({ loading: true });

    fetch(DASHBOARD_URL, {
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
        //Hide Loader
        this.setState({ loading: false });
        console.log("authToken5 ", responseJson);
        this.setState({ menuList: responseJson.dashboardMenuList });
      })
      .catch((error) => {
        //Hide Loader
        this.setState({ loading: false });
        console.error("qwerty  ", error);
      })
      .finally(() => this.setState({ loading: false }));
  };

  EmptyListMessage = ({ item }) => {
    const isLoading = this.state.isLoading;
    return (
      // Flat List Item
      !isLoading && (
        <View>
          <Pressable style={[homeStyles.container2]} onPress={this.fetchData}>
            <Image
              style={homeStyles.retryImage}
              source={{
                uri:
                  "data:image/png;base64,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",
              }}
            />
            <Text style={homeStyles.retryText}> No Records Found </Text>
            <View style={[homeStyles.center, {flexDirection: "row", flex: 1, marginBottom: 10}]}>
              <Image
                style={{width: 30, height: 30}}
                source={require("../../Image/ic_refresh.png")}
              />
              <Text>Tap to retry</Text>
            </View>
          </Pressable>

          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              style={[homeStyles.center, {width: 50, height: 50, backgroundColor: AppColors.colorPrimary, borderRadius: 25, marginBottom: 20}]}
              source={require("../../Image/ic_left.png")}
            />
          </TouchableOpacity>
          
          <View style={[homeStyles.center, {width: "50%"}]}>
            <Button title="Go TO Dashboard" onPress={() => this.props.navigation.navigate("HomeScreen")} />
          </View>
        </View>
      )
    );
  };

  onResponse = (response) => {
    if(!response){
      this.props.navigation.navigate("Auth")
    } else {
      AsyncStorage.setItem("tnc", "true");
      this.setState({ isConditionAccepted: false });
    }
  };

  closeModal = () => {
    this.setState({ isConditionAccepted: false });
  };
  renderPicker() {
   
    return (
      <DatePicker
        style={{ width: 0,height:0 }}
        ref={picker => {
          this.datePicker = picker;
        }}
        date={this.state.date}
        mode="date"
        placeholder="Select date "
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2020-12-12"
        confirmBtnText="OK"
        cancelBtnText="Cancel"
        onDateChange={(mdate) => {
          this.getBidEvent(mdate);
          this.setState({ data: mdate });
        }}
        onCloseModal ={()=>{
          this.setState({ modalVisible: false });
          this.props.navigation.navigate("HomeScreen");
        }}
        showIcon={false}
        isVisible={true}

      />
    );
  
}
getBidEvent = async (date) => {
  const data = {
    userId: this.state.userId,
    userType: this.state.userType,
    date: date,
  };
  console.log("getBidEventhome ",data)

  this.setState({ loading: true });

  fetch(BID_EVENT_CAL_URL, {
    //Pune office UAT
    method: "POST",
    headers: {
      Authorization: "Bearer " + this.state.authToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => {
      //Hide Loader
      //setLoading(false);
      console.log("BID_EVENT_CAL_URL", res);
      if (res) {
        this.setState({ bidEvent: res, modalVisible: true });
      }
      this.setState({ loading: false });
    })
    .catch((error) => {
      //Hide Loader
      //setLoading(false);
      console.error("qwerty  ", error);
      this.setState({ loading: false });
    });
};

renderItem = ({ item, index }) =>
    index === 0 ? (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("BidDetails", {
            link: item.bidNoticeToBeSubmitted.link,
            title: "Bid Event Calendar",
            subTitle: item.bidNoticeToBeSubmitted.label,
          });
          this.setState({ modalVisible: false });
        }}
        key={item.key}
        style={[
          styles.RectangleShapeView,
          { backgroundColor: AppColors.blue400, marginLeft: 5, marginRight: 5, borderRadius: 6 },
        ]}
      >
        <Text
          style={{
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            padding: 5,
            fontSize: 14,
            fontWeight: "bold",
            color: AppColors.white,
          }}
        >
          {item.bidNoticeToBeSubmitted.label} (
          {item.bidNoticeToBeSubmitted.count})
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("BidDetails", {
            link: item.bidNoticeToBeOpen.link,
            title: "Bid Event Calendar",
            subTitle: item.bidNoticeToBeOpen.label,
          });
          this.setState({ modalVisible: false });
        }}
        key={item.key}
        style={[
          styles.RectangleShapeView,
          { backgroundColor: AppColors.purpleLight, marginLeft: 10, marginRight: 10, borderRadius: 6 },
        ]}
      >
        <Text
          style={{
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            padding: 5,
            fontSize: 14,
            fontWeight: "bold",
            color: AppColors.white,
          }}
        >
          {item.bidNoticeToBeOpen.label} ({item.bidNoticeToBeOpen.count})
        </Text>
      </TouchableOpacity>
    );

  render() {
    if (this.state.loading) return <Loader loading={this.state.loading} />;
    const { isConditionAccepted, userType, userTypeName,modalVisible } = this.state;

    console.log("\n\nSom Tye :; ", userTypeName + " \n\n");

    return (
      <View style={{ flex: 1 }}>

{/* <CustomToolbar
        title={"Dashboard"}
        userType={"username"}
        backgroundColor="#3775f0"
      /> */}
        <View style={{ flex: 0.9, margin: 5 }}>
          <Tnc
            loading={isConditionAccepted}
            userType={this.state.userType}
            authToken={this.state.authToken}
            onResponse={this.onResponse}
            onCloseModal={this.closeModal}
          />
          {this.renderPicker() }

          <Modal
          transparent={true}
          animationType={"fade"}
          visible={modalVisible}
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around",
            backgroundColor: "#00000040",
          }}
          onRequestClose={() => {
            // this.props.navigation.replace("HomeScreen");
            this.setState({ modalVisible: false });
          }}
        >
          <View style={[styles.modalBackground, {width: 450}]}>
            <View style={[styles.activityIndicatorWrapper, {margin: 50}]}>
              <View
                style={{
                  flex: 0.5,
                  width: "80%",
                  height: 40,
                  alignSelf: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../Image/logo_192.png")}
                  style={[styles.image]}
                />
                <Text style={[styles.hyperLinkText]}>
                  Bid Event Calendar Menus
                </Text>
              </View>

              <View style={{ backgroundColor: "white", flex: 1, marginTop: 8 }}>
                <FlatList
                  data={this.state.bidEvent}
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => index.toString}
                />
                <View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ modalVisible: false });
                    this.props.navigation.replace("HomeScreen");
                  }}
                  style={{ backgroundColor: AppColors.red300, marginLeft: 10, marginRight: 10, borderRadius: 6, padding: 10, marginBottom: 10 }}>
                    <Text style={{fontSize: 14, fontWeight: "bold", textAlign: "center", color: AppColors.white}}>CLOSE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

          {userTypeName == "Merchant" && this.state.menuList && this.state.menuList.length > 0 ? (
            <TouchableOpacity
              style={homeStyles.facebookStyle}
              activeOpacity={0.5}
              onPress={() => {
                // this.props.navigation.navigate("bidEventStack",{
                //   screen :"BidEventCalndar"
                // })
                this.datePicker.onPressDate();

              }}
            >
              <Image
                source={require("../../Image/calendar.png")}
                style={homeStyles.imageIconStyle}
              />
              <View style={homeStyles.iconSeparatorStyle} />
              <Text style={homeStyles.textStyle}> BID EVENT CALENDAR </Text>
            </TouchableOpacity>
          ) : null}

          <FlatList
            style={homeStyles.list}
            contentContainerStyle={homeStyles.listContainer}
            data={this.state.menuList}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item, index) => {
              return "" + index;
            }}
            ListEmptyComponent={this.EmptyListMessage}
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  style={[homeStyles.card, { backgroundColor: colors[index] }]}
                  onPress={() => {
                    if (item.sub.length > 0) {
                      this.props.navigation.navigate("SubMenues", {
                        data: [...item.sub],
                        title: item.name,
                        backgroundColor: colors[index],
                        iconUrl: imagesArray[index],
                      });
                    } else {
                      this.props.navigation.navigate("Details", {
                        link: item.link,
                        title: item.name,
                      });
                    }
                  }}
                >
                  <View style={homeStyles.cardHeader}>
                    <Text style={homeStyles.title}>{item.name}</Text>
                  </View>

                  <View style={homeStyles.cardFooter}>
                    <View style={{backgroundColor: AppColors.white, width: 45, height: 45, borderRadius: 50 / 2,}}>
                      <Image
                        style={[homeStyles.cardImage, {tintColor: colors[index]}]}
                        source={imagesArray[index]}
                      />
                    </View>

                    <Text style={homeStyles.subTitle}>
                      {item.unRead} Unread Notices
                    </Text>
                  </View>
                  <View style={homeStyles.footerSpace}></View>
                </Pressable>
              );
            }}
          />
        </View>
        <View style={{ flex: 0.1 }}>
          <BottomView />
        </View>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // alignSelf: "center",
    // alignItems: "center",
    // alignContent: "center",
    //backgroundColor: "#ecf0f1",
  },

  modalBackground: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: "40%",
    width: "60%",
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
  hyperLinkText: {
    color: AppColors.colorPrimary,
    fontSize: 18,
    fontWeight: "bold",
    height: 80,
  },
  RectangleShapeView: {
    marginTop: 20,
    width: 120 * 2,
    height: 40,
    backgroundColor: "#FFC107",
  },
});