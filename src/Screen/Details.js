import React, { useState, useEffect, Component, createRef } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  Modal,
  RadioButton,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import { Header, ListItem, Button } from "react-native-elements";
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
import { Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EventEmitter from "react-native-eventemitter";

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
        backgroundColor: AppColors.grey10,
      }}
    />
  );
};
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      isLoading: true,
      isLoadingMore: false,
      page: 1,
      pageTitle: "",
      mainMenu: "",
      subMenu: "",
      pageLink: "",
      authToken: "",
      totalCount: 0,
      userType: "",
      totalPageNo: 0,
      isVisible: false,
      notificationText: "",
      activityTypeText: "",
      departmentText: "",
      classificationText: "",
      eventIdText: "",
    };
  }

  async componentDidMount() {
    await this.readData();
    EventEmitter.on("OPEN_FILTER", (value) => {
        this.showFilters()
      
    });
  }

  readData = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const userType = await AsyncStorage.getItem("userType");

      if (token) {
        this.setState({
          authToken: token,
          userType: userType,
        });
        this.fetchData();
      }
    } catch (e) {
      console.log("catch ", e);
    }
  };

  fetchData = async () => {
    this.setState({
      pageTitle: this.props.route.params.title,
      mainMenu: this.props.route.params.mainMenu,
      subMenu: this.props.route.params.subMenu,
      pageLink: this.props.route.params.link,
      isVisible: false,
    });
    this.setState({ isLoading: true });
    var url = `${this.props.route.params.link}?page=${this.state.page}&pageSize=20`;

    try {
      if (this.state.notificationText) {
        url = url + "&notification=" + this.state.notificationText;
      }

      if (this.state.activityTypeText) {
        url = url + "&activityType=" + this.state.activityTypeText;
      }

      if (this.state.departmentText) {
        url = url + "&departmentName=" + this.state.departmentText;
      }
      if (this.state.classificationText) {
        url = url + "&classificationType=" + this.state.classificationText;
      }
      if (this.state.eventIdText) {
        url = url + "&eventId=" + this.state.eventIdText;
      }

      console.log("\n\nFinale url :: ", url);

      fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.state.authToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("responseJson", responseJson);
          const mData = responseJson.rows;
          if (mData) {
            this.state.page === 1
              ? this.setState({ users: mData })
              : this.setState({
                  users: [...this.state.users, ...responseJson.rows],
                });
            this.setState({
              isLoading: false,
              totalCount: responseJson.totalRows,
              totalPageNo: responseJson.totalPageNo,
            });
          } else {
            this.setState({
              isLoading: false,
              totalCount: responseJson.totalRows,
              users: null,
            });
          }
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
            totalCount: 0,
            users: [],
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  refreshUsers = () => {
    this.setState({ page: 1 }, () => {
      this.fetchData();
    });
  };

  showFilters = () => {
    console.log("Calleddd this.....");
    this.setState({
      notificationText: "",
      activityTypeText: "",
      departmentText: "",
      classificationText: "",
      eventIdText: "",
    });
    this.setState({ isVisible: true, page: 1 });
  };

  resetFilters = () => {
    this.setState({
      isVisible: false,
      notificationText: "",
      activityTypeText: "",
      departmentText: "",
      classificationText: "",
      eventIdText: "",
    });
  };

  loadMoreUsers = () => {
    if (this.state.totalPageNo >= this.state.page + 1) {
      this.setState({ page: this.state.page + 1, isLoadingMore: true }, () => {
        this.fetchData();
        this.setState({ isLoadingMore: false });
      });
    }
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
        <View>
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

          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              style={[
                styles.center,
                {
                  width: 50,
                  height: 50,
                  backgroundColor: AppColors.colorPrimary,
                  borderRadius: 25,
                  marginBottom: 20,
                },
              ]}
              source={require("../Image/ic_left.png")}
            />
          </TouchableOpacity>

          <View style={[styles.center, { width: "40%" }]}>
            <Button
              title="Go TO Dashboard"
              onPress={() => this.props.navigation.navigate("HomeScreen")}
            />
          </View>
        </View>
      )
    );
  };

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: AppColors.colorPrimary }}
      >
        <CustomToolbar
          showFilter={true}
          navigation={this.props.navigation}
          title={this.state.subMenu}
          userType={this.state.userType}
          backgroundColor="#3775f0"
        />
        {/* {this.state.isLoading ?<Loader loading={this.state.isLoading} /> : null } */}
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          <View style={{ paddingTop: 8, paddingLeft: 8 }}>
            <Text
              numberOfLines={1}
              style={[
                gStyles.contactStyle,
                { color: "grey", fontSize: 14, marginTop: 5 },
              ]}
            >
              {this.state.pageTitle}
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
                      //Update the list data to set as visited
                      const localListData = this.state.users;
                      localListData[index].isAcknowledge = 1;
                      this.setState({ users: localListData });

                      this.props.navigation.navigate("FinalDetailsPage", {
                        data: item,
                        pageTitle: this.state.pageTitle,
                        mainMenu: this.state.mainMenu,
                        subMenu: this.state.subMenu,
                      });
                    }}
                  >
                    <View style={listStyles.viewColumn}>
                      <View style={listStyles.viewRow}>
                        <Text
                          style={[
                            listStyles.title,
                            {
                              fontWeight:
                                item.isAcknowledge === 0 ? "bold" : "normal",
                            },
                          ]}
                        >
                          {index + 1 + ". " + item.activityType}
                        </Text>
                        <View style={listStyles.notificationIconView}>
                          {item.isAcknowledge === 1 ? (
                            <Image
                              style={[
                                listStyles.notificationIcon,
                                { tintColor: AppColors.green200 },
                              ]}
                              source={require("../Image/ic_published.png")}
                            />
                          ) : (
                            <Image
                              style={[
                                listStyles.notificationIcon,
                                { tintColor: AppColors.red200 },
                              ]}
                              source={require("../Image/ic_unpublished.png")}
                            />
                          )}
                        </View>
                      </View>

                      <Text style={listStyles.notificationText}>
                        {item.notification}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}
              keyExtractor={(user) => "" + user.id}
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
          {!this.state.isLoading &&
            this.state.users &&
            this.state.users.length > 0 && (
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

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.isVisible}
          onRequestClose={() => {
            this.setState({ isVisible: false });
          }}
          scrollHorizontal={true}
        >
          <View
            style={[
              styles.modal,
              { borderColor: AppColors.colorPrimary, borderWidth: 3 },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: AppColors.colorPrimary,
              }}
            >
              <TouchableOpacity
                onPress={() => this.setState({ isVisible: false })}
              >
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    marginTop: 7,
                    tintColor: AppColors.white,
                  }}
                  source={require("../Image/ic_close.png")}
                />
              </TouchableOpacity>

              <Text style={[styles.modelTitle]}>Filter</Text>
            </View>
            <DismissKeyboard>
              <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                keyboardVerticalOffset={-130}
              >
                <View style={{ flexDirection: "column", flex: 1 }}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      underlineColorAndroid="transparent"
                      onChangeText={(value) =>
                        this.setState({ notificationText: value })
                      }
                      value={this.state.notificationText}
                      placeholder="Type Notification Keyword" //dummy@abc.com
                      placeholderTextColor="#8b9cb5"
                      autoCapitalize="none"
                      keyboardType="default"
                      returnKeyType={"next"}
                      onSubmitEditing={() => {
                        this.secondTextInput.focus();
                      }}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      blurOnSubmit={false}
                    />
                    <Image
                      style={styles.inputIcon}
                      source={require("../Image/ic_search.png")}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      underlineColorAndroid="transparent"
                      onChangeText={(value) =>
                        this.setState({ activityTypeText: value })
                      }
                      value={this.state.activityTypeText}
                      placeholder="Type Activity Type Keyword" //dummy@abc.com
                      placeholderTextColor="#8b9cb5"
                      autoCapitalize="none"
                      keyboardType="default"
                      returnKeyType="next"
                      ref={(input) => {
                        this.secondTextInput = input;
                      }}
                      onSubmitEditing={() => {
                        this.thirdTextInput.focus();
                      }}
                      underlineColorAndroid="#f000"
                      blurOnSubmit={false}
                    />
                    <Image
                      style={styles.inputIcon}
                      source={require("../Image/ic_search.png")}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      underlineColorAndroid="transparent"
                      onChangeText={(value) =>
                        this.setState({ departmentText: value })
                      }
                      value={this.state.departmentText}
                      placeholder="Type Department Keyword" //dummy@abc.com
                      placeholderTextColor="#8b9cb5"
                      autoCapitalize="none"
                      keyboardType="default"
                      returnKeyType="next"
                      returnKeyType="next"
                      ref={(input) => {
                        this.thirdTextInput = input;
                      }}
                      onSubmitEditing={() => {
                        this.fourthTextInput.focus();
                      }}
                      underlineColorAndroid="#f000"
                      blurOnSubmit={false}
                    />
                    <Image
                      style={styles.inputIcon}
                      source={require("../Image/ic_search.png")}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      underlineColorAndroid="transparent"
                      onChangeText={(value) =>
                        this.setState({ classificationText: value })
                      }
                      value={this.state.classificationText}
                      placeholder="Type Classification Keyword" //dummy@abc.com
                      placeholderTextColor="#8b9cb5"
                      autoCapitalize="none"
                      keyboardType="default"
                      returnKeyType="next"
                      ref={(input) => {
                        this.fourthTextInput = input;
                      }}
                      onSubmitEditing={() => {
                        this.fifthTextInput.focus();
                      }}
                      underlineColorAndroid="#f000"
                      blurOnSubmit={false}
                    />
                    <Image
                      style={styles.inputIcon}
                      source={require("../Image/ic_search.png")}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      underlineColorAndroid="transparent"
                      onChangeText={(value) =>
                        this.setState({ eventIdText: value })
                      }
                      value={this.state.eventIdText}
                      placeholder="Type Event Id Keyword" //dummy@abc.com
                      placeholderTextColor="#8b9cb5"
                      autoCapitalize="none"
                      keyboardType="default"
                      returnKeyType="default"
                      ref={(input) => {
                        this.fifthTextInput = input;
                      }}
                      underlineColorAndroid="#f000"
                      blurOnSubmit={false}
                    />
                    <Image
                      style={styles.inputIcon}
                      source={require("../Image/ic_search.png")}
                    />
                  </View>
                </View>
              </KeyboardAvoidingView>
            </DismissKeyboard>

            <View
              style={{ flexDirection: "row", margin: 10, alignSelf: "center" }}
            >
              <Button
                title="Apply Filter"
                buttonStyle={{
                  marginTop: 5,
                  borderRadius: 16,
                  backgroundColor: AppColors.green600,
                  width: 120,
                  height: 35,
                  padding: 5,
                }}
                onPress={() => {
                  this.fetchData();
                }}
              />
              <Button
                title="Close"
                buttonStyle={{
                  marginTop: 5,
                  marginLeft: 5,
                  borderRadius: 16,
                  backgroundColor: AppColors.red400,
                  width: 120,
                  height: 35,
                  padding: 5,
                }}
                onPress={() => {
                  this.resetFilters();
                }}
              />
            </View>
          </View>
          <View
            style={{ height: 1, width: "100%", backgroundColor: "white" }}
          />
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    alignContent: "center",
  },
  modal: {
    justifyContent: "flex-start",
    height: "60%",
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "white",
    marginTop: 80,
    marginLeft: 40,
  },

  modelTitle: {
    fontWeight: "bold",
    color: AppColors.white,
    fontSize: 18,
    backgroundColor: AppColors.colorPrimary,
    padding: 10,
    marginLeft: -5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 0,
    width: "90%",
    height: 45,
    marginTop: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputIcon: {
    width: 25,
    height: 25,
    marginRight: 15,
    justifyContent: "center",
  },
});

//export default Details;
