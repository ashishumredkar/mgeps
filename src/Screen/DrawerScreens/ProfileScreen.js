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
import { gStyles } from "../../../src/style/appStyles";
import AsyncStorage from "@react-native-community/async-storage";

import { Card } from "react-native-elements";
import GeneralStatusBarColor from "../Components/GeneralStatusBarColor";
import CustomToolbar from "../Components/CustomToolbar";
import { AppColors } from "../../style/AppColors";
import { homeStyles } from "../../style/homeStyles";
import { viewDetailStyles } from "../../style/viewDetailStyles";
import BottomView from "../BottomView";
import { USER_PROFILE_URL } from "../Utils";
import AlertModal from "../Components/AlertModal";
import Loader from "../Components/Loader";

const ProfileScreen = (props) => {
  const [profileData, setProfileData] = useState();
  const [username, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [shortName, setShortName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Failed to load Profile Data"
  );

  useEffect(() => {
    readData();
  }, [username]);

  const readData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@user_data");
      const token = await AsyncStorage.getItem("auth_token");
      const userTypeName = await AsyncStorage.getItem("userType");
      const objUserData = JSON.parse(userData);
      console.log("PofileScreen", userData);

      setUserName(userTypeName);
      setFullName(
        objUserData.fname + " " + objUserData.mname + " " + objUserData.lname
      );
      setShortName(objUserData.fname.charAt(0) + objUserData.lname.charAt(0));
      setEmailAddress(objUserData.email);

      getUserProfileData(
        objUserData.id,
        objUserData.userType,
        token,
        userTypeName
      );
    } catch (e) {
      console.log("catch ", e);
    }
  };

  const onRety = () => {
    readData();
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getUserProfileData = async (id, userTypeId, token, userTypeName) => {
    const data = {
      userId: id,
      userType: userTypeId,
    };
    setLoading(true);
    console.log("Post data :: ", data);

    fetch(USER_PROFILE_URL, {
      //Pune office UAT
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        //Hide Loader
        // setLoading(false);
        if (response) {
          console.log("User data \n\n\n", response);

          if (response.firstName) {
            delete response.firstName;
          }
          if (response.lastName) {
            delete response.lastName;
          }
          if (response.middleName) {
            delete response.middleName;
          }

          const finalUserData = Object.keys(response).map((key) => ({
            [key]: response[key],
          }));

          setProfileData(finalUserData);
        }
      })
      .catch((error) => {
        setLoading(false);
        setModalVisible(true);
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.colorPrimary }}>
      <CustomToolbar
        title={"Profile"}
        userType={username}
        backgroundColor="#3775f0"
      />
      <Loader loading={loading} />

      <AlertModal
        title={"Profile Screen"}
        loading={isModalVisible}
        errorMessage={errorMessage}
        onRety={onRety}
        onCloseModal={closeModal}
      />
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {profileData ? (
          <Card
            style={{ padding: 10, margin: 10, height: "40%", borderRadius: 40 }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={[gStyles.userProfileNameStyle]}>
                <Text style={gStyles.contactStyle}>{shortName}</Text>
              </View>

              <View style={{ width: 10 }}></View>

              {/* CONTACT DETAILS  */}
              <View style={{ paddingTop: 8 }}>
                <Text style={gStyles.contactStyle}>{fullName}</Text>
                <Text>{emailAddress}</Text>
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
              data={profileData}
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
                        <Text style={viewDetailStyles.name}>
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
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
