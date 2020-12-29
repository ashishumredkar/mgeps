import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Button,
  Image,
  StatusBar,
  SafeAreaView,
  BackHandler
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { Header, ListItem } from "react-native-elements";
// import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BottomView from "../Screen/BottomView";
import GeneralStatusBarColor from "./Components/GeneralStatusBarColor";
import BackButton from "./Components/BackButton";
// import {withNavigation} from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomToolbar from "./Components/CustomToolbar";
import { gStyles, homeStyles } from "../style/appStyles";
import { listStyles } from "../style/listStyles";
import { AppColors } from "../style/AppColors";

export const Loader = () => (
  <View style={{ minHeight: 230, padding: 20 }}>
    <ActivityIndicator
      color="#000"
      size="large"
      style={{ alignSelf: "center" }}
    />
  </View>
);

export const Divider = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: AppColors.grey10
      }}
    />
  );
};

export default class BidDetails extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: () => null,
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoading: false,
      isLoadingMore: false,
      page: 1,
      pageTitle: "",
      subTitle:'',
      pageLink: "",
      authToken: "",
      totalCount: 0,
    };
  }

  async componentDidMount() {
    await this.readData();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonPressAndroid
    );
  
  }

  handleBackButtonPressAndroid = () => {
    if (!this.props.navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    }

    this.props.navigation.navigate('HomeScreen');
    return true;
  };

  readData = async () => {
    try {

      const token = await AsyncStorage.getItem("auth_token");

      // alert(token)


      if (token) {
        this.setState({
          authToken: token,
        });
        this.fetchData();
      }
    } catch (e) {
      console.log("catch ", e);
    }
  };

  fetchData = async () => {
    //console.log("componentDidMount ", this.props.route.params.link);
    this.setState({
      pageTitle: this.props.route.params.title,
      subTitle: this.props.route.params.subTitle,
      pageLink: this.props.route.params.link,
    });
    this.setState({ isLoading: true });
    const url = `${this.props.route.params.link}?page=${this.state.page}&pageSize=20`;

    console.log("url ", url);

    const abc = "Bearer " + this.state.authToken;
    console.log("url ", abc);

    try {

      fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.state.authToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //body: formdata,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("responseJson", responseJson);
          const mData = responseJson;
          if (mData) {
              if(mData.error){
                this.setState({
                    isLoading: false,
                  });
              }
            this.state.page === 1
              ? this.setState({ users: [...mData] })
              : this.setState({
                  users: [...mData],
                });
            this.setState({
              isLoading: false,
              totalCount: mData.length,
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        })
        .catch((error) => {});
    } catch (err) {
      console.log(err);
    }
  };

  refreshUsers = () => {
    this.setState({ page: 1 }, () => {
      this.fetchData();
    });
  };

  loadMoreUsers = () => {
    this.setState({ page: this.state.page + 1, isLoadingMore: true }, () => {
      this.fetchData();
      this.setState({ isLoadingMore: false });
    });
  };

  AppHeader = (title) => {
    return (
      <Header
        centerComponent={{ text: title, style: { color: "#fff" } }}
        containerStyle={{ paddingTop: 0, height: 60 }}
      />
    );
  };
  EmptyListMessage = ({ item }) => {
    const isLoading = this.state.isLoading;
    return (
      // Flat List Item
      !isLoading && (
        <Pressable style={[styles.container2]} onPress={this.fetchData}>
          <Image
            style={[styles.cardImage, {tintColor: AppColors.grey20}]}
            source={require("../Image/ic_wifi_signal.png")}
          />
          <Text style={[styles.welcome, {color: AppColors.grey90}]}> No Records Found </Text>
          <View
              style={[
                styles.center,
                { flexDirection: "row", flex: 1, marginBottom: 10 },
              ]}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../Image/ic_refresh.png")}
              />
              <Text style={{color: AppColors.grey90}}>Tap to retry</Text>
          </View>
        </Pressable>
      )
    );
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.colorPrimary}}>
        
        <CustomToolbar
          navigation={this.props.navigation}
          title={this.state.pageTitle}
          userType={"Merchant"}
          backgroundColor="#3775f0"
        />
        {/* {this.state.isLoading ?<Loader loading={this.state.isLoading} /> : null } */}
        <View style={{flex: 1, backgroundColor: "#FFFFFF"}}>
          <View style={{ paddingTop: 8, paddingLeft: 8 }}>
            <Text
              numberOfLines={1}
              style={[
                gStyles.contactStyle,
                { color: "grey", fontSize: 14, marginTop: 5 },
              ]}
            >
              {this.state.subTitle}
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

          <View style={{ flex: 0.9 }}>
            {/* <Header
              centerComponent={{
              text: this.state.pageTitle,
              style: { color: "#fff" },
              }}
              containerStyle={{ paddingTop: 0, height: 50 }}
            /> */}
            <FlatList
              data={this.state.users}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    style={{ flex: 1, marginBottom: 10 }}
                    onPress={() => {
                      this.props.navigation.navigate("BidDetailsPage", {
                        data: item,
                        pageTitle: this.state.pageTitle,
                      });
                    }}
                  >
                    <View style={listStyles.viewColumn}>
                      <View style={listStyles.viewRow}>
                        <Text
                          style={[listStyles.title, {fontWeight: item.isAcknowledge === 0 ? "bold" : "normal"}]}>
                          {index + 1 + ". " + item.noticeTitle}
                        </Text>

                        <View style={listStyles.notificationIconView}>
                          {item.isAcknowledge === 1 ? (
                            <Image
                              style={[listStyles.notificationIcon, {tintColor: AppColors.green200}]}
                              source={require("../Image/ic_published.png")}
                            />
                          ) : (
                            <Image
                              style={[listStyles.notificationIcon, {tintColor: AppColors.red200}]}
                              source={require("../Image/ic_unpublished.png")}
                            />
                          )}
                        </View>

                      </View>
                      <Text>ControlNumber: {item.controlNumber}</Text>
                        <Text>BidNotice Id: {item.BidNoticeId}</Text>
                        <Text>Mode Of Bid Submission: {item.modeOfBidSubmission}</Text>
                      {/* <Text style={listStyles.notificationText}>
                        {item.notification}
                      </Text> */}
                    </View>
                  </Pressable>
                );
              }}
              keyExtractor={(user,index) => "" + index}
              refreshing={this.state.isLoadingMore}
              onRefresh={this.refreshUsers}
              ItemSeparatorComponent={() => <Divider />}
              // ListFooterComponent={this.state.isLoadingMore && <Loader />}
              onEndReached={this.loadMoreUsers}
              onEndThreshold={0}
              initialNumToRender={8}
              maxToRenderPerBatch={2}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={this.EmptyListMessage}
            />

            {this.state.isLoading && (
              <View style={{ flex: 1, alignItems: "center" }}>
                <ActivityIndicator size="large" color="#ff6a00" />
              </View>
            )}
          </View>
          {!this.state.isLoading && this.state.users && (
            <View style={listStyles.totalRowsView}>
              <View style={listStyles.textShadow}>
                <Text style={listStyles.textStyle}>
                  Total Rows : {this.state.totalCount}
                </Text>
              </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  container2: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 12,
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
    margin: 10,
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
});

//export default Details;
