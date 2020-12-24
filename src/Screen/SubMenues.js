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
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import GeneralStatusBarColor from "./Components/GeneralStatusBarColor";
import CustomToolbar from "./Components/CustomToolbar";
import BottomView from "./BottomView";
import { homeStyles } from "../style/homeStyles";
import { gStyles } from "../style/appStyles";
import { AppColors } from "../style/AppColors";
import { DASHBOARD_URL } from "./Utils";
import { Platform } from "react-native";

const STORAGE_KEY = "@user_data";

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
  require("../Image/ic_user_registration.png"),
  require("../Image/ic_auction.png"),
  require("../Image/ic_peoples_1.png"),
  require("../Image/ic_ruppes.png"),
  require("../Image/ic_receipt.png"),
  require("../Image/ic_report.png"),
  require("../Image/ic_comment.png"),
  require("../Image/ic_report.png"),
  require("../Image/ic_auction.png"),
  require("../Image/ic_expand_arrow.png"),
  require("../Image/ic_organization.png"),
];
class SubMenues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [],
      userId: null,
      userType: "",
      authToken: "",
      loading: "",
      title: "",
      iconBackColor:'',
      iconUri:'',
    };
  }
  async componentDidMount() {
    console.log("componentDidMount ", this.props.route.params.data);

    this.setState({
      menuList: this.props.route.params.data,
      title: this.props.route.params.title,
      iconBackColor:this.props.route.params.backgroundColor,
      iconUri:this.props.route.params.iconUrl,
    });
    this.readData();
  }

  readData = async () => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEY);
      const token = await AsyncStorage.getItem("auth_token");
      const userType = await AsyncStorage.getItem("userType");

      const mData = JSON.parse(userData);
      console.log("userData", mData);
      console.log("commando", mData);

      if (userData) {
        this.setState({
          userId: mData.id,
          userType: userType,
          authToken: token,
        });
      }
    } catch (e) {
      console.log("catch ", e);
      alert("Failed to fetch the data from storage" + e);
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.colorPrimary}}>

        <CustomToolbar
          navigation={this.props.navigation}
          title={this.state.title}
          userType={this.state.userType}
          backgroundColor="#3775f0"
        />
        <View style={{flex: 1, backgroundColor: "#FFFFFF"}}>
        <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 5 }}>
          <View style={[gStyles.subMenuLinking, {backgroundColor:this.state.iconBackColor}]}>
            <Image
              style={{ width: 35, height: 35, }}
              source={this.state.iconUri}

            />
          </View>

          <View style={{ width: 10 }}></View>

          {/* CONTACT DETAILS  */}
          <View style={{ paddingTop: 8 }}>
            <Text
              numberOfLines={1}
              style={[gStyles.contactStyle, { color: "black", fontSize: 18,marginTop:5 }]}
            >
              {this.state.title}
            </Text>
          </View>
        </View>
        <Text style={{ height: 2,backgroundColor:'blue',width:'100%',marginTop:5 }}/>

        <View style={{ flex: 0.9,margin:5 }}>
          <FlatList
            data={this.state.menuList}
            renderItem={({ item, index }) => {
              console.log("item ", item);

              return (
                <Pressable
                  style={[homeStyles.card, { backgroundColor: colors[index] }]}
                  onPress={() => {
                    this.props.navigation.navigate("Details", {
                      link: item.link,
                      title: this.state.title + "/" + item.name,
                    });
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
                  <View style={homeStyles.cardHeader}></View>
                </Pressable>
              );
            }}
            //Setting the number of column
            numColumns={2}
            keyExtractor={(item, index) => "" + index}
          />
        </View>

        <View style={{ flex: 0.1, alignSelf: "auto" }}>
          <BottomView />
        </View>
      </View>
      </SafeAreaView>
    );
  }
}

export default SubMenues;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  list: {
    //paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  card: {
    marginHorizontal: 2,
    marginVertical: 2,
    flexBasis: "48%",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: "center",
  },
  title: {
    fontSize: 16,
    flex: 1,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 12,
    flex: 1,
    color: "#FFFFFF",
  },
  icon: {
    height: 20,
    width: 20,
  },
  image: {
    width: 35,
    height: 35,
    resizeMode: "cover",
    justifyContent: "center",
  },
  bottomView: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    paddingBottom: Platform.OS === "ios" ? 25 : 25,
  },
});
