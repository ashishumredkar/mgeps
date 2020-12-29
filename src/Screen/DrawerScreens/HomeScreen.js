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
  Platform,
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
    this.datePicker = React.createRef();

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
      Show: false
    };
  }
  async componentDidMount() {
    this.readData();
  }
  openpicker = () => {
    this.datePicker.onPressDate();
  }

  componentDidUpdate(nextProps) {
    const { show } = this.props
    console.log("componentDidMountnextProps ",nextProps)
  
    // if (nextProps.route.params!=undefined && nextProps.route.params.showpicker) {
    
    //   this.datePicker.onPressDate();
     
    // }
   }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log("componentDidMountnextProps ",nextProps.route)

  //   if(nextProps.route.params!=undefined && nextProps.route.params.showpicker ){
  //     return {
  //       show: true,
  //      };
  //   }
  //   // return {
  //   //   show: nextProps.show,
  //   //  };
  //  }
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

        this.getMenuItems();
      }
    } catch (e) {
      console.log("catch ", e);
    }
  };

  getMenuItems = async () => {
    const userData = await AsyncStorage.getItem(STORAGE_KEY);
    const mData = JSON.parse(userData);

    const data = {
      id: mData.id,
      userType: mData.userType,
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
      !isLoading && (
        <View>
          <Pressable style={[styles.noSignalContainer]} onPress={this.getMenuItems}>
              <Image
                  style={[styles.noSignalCardImage, {tintColor: AppColors.grey20}]}
                  source={require("../../Image/ic_wifi_signal.png")}/>
              <Text style={[styles.noRecordTitle, {color: AppColors.grey90}]}> No Records Found </Text>

              <View
                style={[styles.center, { flexDirection: "row", flex: 1, marginBottom: 10 },
                ]}>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../Image/ic_refresh.png")}/>
                <Text style={{color: AppColors.grey90}}>Tap to retry</Text>
              </View>
          </Pressable>
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

    var today = new Date();
    var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    console.log("Today Date :: ", firstDayOfMonth);
    console.log("Date :: ", lastDayOfMonth);
   
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
        minDate={firstDayOfMonth}
        maxDate={lastDayOfMonth}
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
            marginTop: 5,
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
            marginTop: 5,
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
                    <View style={{backgroundColor: AppColors.white, width: 43, height: 43, borderRadius: 50 / 2,}}>
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
  noSignalContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 12,
  },
  noSignalCardImage: {
    flex: 1,
    marginTop: "46%",
    height: 70,
    width: 100,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },
  noRecordTitle: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  center: {
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },
});