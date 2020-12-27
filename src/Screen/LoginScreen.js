// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect, createRef, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Picker,
  Platform,
  ImageBackground,
  Linking,
  Button,
  TouchableWithoutFeedback,SafeAreaView
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import Loader from "./Components/Loader";
import AlertModal from "./Components/AlertModal";
import GeneralStatusBarColor from "./Components/GeneralStatusBarColor";
import { AppColors } from "../style/AppColors";
// import DropDownPicker from "react-native-dropdown-picker";
import DropDownPicker from "react-native-dropdown-picker";
import ReactNativePickerModule from "react-native-picker-module"


import Toast from "react-native-simple-toast";
import Icon from "react-native-vector-icons/MaterialIcons";
import BottomView from "./BottomView";
import { Modal } from "react-native-paper";
import { LOGIN_URL, LOGIN_TYPE_URL } from "./Utils";
// import Loader from './Components/Loader'

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState(""); //kiranab
  const [userPassword, setUserPassword] = useState(""); //dsa@1234
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [forgotPassword, setForgotPassword] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);

  const [loginType, setLoginType] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const [loginCollection, setLoginCollection] = useState([]);

  const [fcmId, setfcmId] = useState(
    "sdlfksdlflsdf987987s9d89f7sd987f987sd89f798s7df"
  );

  const passwordInputRef = createRef();

  const pickerRef = useRef()
  const [value, setValue] = useState()
  const dataset_1 = [1, 2, "Java", "Kotlin", "C++", "C#", "PHP"]
  const dataset_2 = [
    {
      value: 101,
      label: "Javascript",
    },
    {
      value: "golang_101",
      label: "Go",
    },
    {
      value: "kotlin_dsl",
      label: "Kotlin",
    },
    {
      value: "java_101",
      label: "Java",
    },
    {
      value: "cplusplus",
      label: "C++",
    },
    {
      value: "csharp_201",
      label: "C#",
    },
    {
      value: "php_201",
      label: "PHP",
    },
  ]

  useEffect(() => {
    getFcm();
    fetchUserType();
  }, []);

  const getFcm = () => {
    PushNotification.configure({
      //(optional) Called when Token is generated (iOS and Android)
      requestPermissions: Platform.OS === "ios",
      onRegister: function (token) {
        console.log("TOKEN:", token);
        setfcmId(token.token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log("NotificationHandler:", notification);
      },

      // (optional) Called when Action is pressed (Android)
      onAction: function (notification) {
        console.log("Notification action received:");
        console.log(notification.action);
        console.log(notification);

        if (notification.action === "Yes") {
          PushNotification.invokeApp(notification);
        }
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.log("onRegistrationError: ", err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  };

  const fetchUserType = async () => {
    setLoading(true);
    fetch(LOGIN_TYPE_URL)
      .then((response) => response.json())
      .then((json) => {
        setForgotPassword(json.forgetPassword);
        var points = [json.LoginTypes];
        var mData = []; // Good
       // mData = mData.concat({ label: "Select Login Type", value: "Select Login Type" });
        setLoginType("Select Login Type");

        if (points[0].Agency) {
          mData = mData.concat({ label: "Agency", value: "Agency" });
        }
        if (points[0].Merchant) {
          mData = mData.concat({ label: "Merchant", value: "Merchant" });
        }

        console.log("mData", mData);
        setLoginCollection(mData);
        //PushNotification.checkPermissions(PushNotification.requestPermissions());
      })
      .catch((error) => {
        setModalVisible(true);
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  const handleSubmitPress = () => {
    setErrortext("");

    if (!loginType) {
      Toast.showWithGravity(
        "Please Select Login Type",
        Toast.LONG,
        Toast.CENTER
      );
      return;
    }
    if (!userEmail) {
      Toast.showWithGravity("Please fill Email", Toast.LONG, Toast.CENTER);
      return;
    }
    if (!userPassword) {
      Toast.showWithGravity("Please fill Password", Toast.LONG, Toast.CENTER);
      return;
    }

    setLoading(true);
  
    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({
        username: userEmail,
        password: userPassword,
        login_type: loginType,
        fcm_id: fcmId,
        country: "IN",
      }),
      headers: {
        //Header Defination
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log("res1 ", responseJson);
        console.log("handleSubmitPress ", responseJson.data);

        // If server response message same as Data Matched
        if (responseJson.userData) {
          AsyncStorage.setItem("auth_token", responseJson.data.token);
          console.log("LOGIN RESPONSE", JSON.stringify(responseJson.userData));

          AsyncStorage.setItem("user_id", "" + responseJson.userData.id);
          AsyncStorage.setItem("userType", loginType);
          AsyncStorage.setItem(
            "@user_data",
            JSON.stringify(JSON.parse(JSON.stringify(responseJson.userData)))
          );

          navigation.replace("DrawerNavigationRoutes");
        } else {
          if (responseJson.hasOwnProperty("errorMessage")) {
            setErrorMessage(responseJson.errorMessage);
          } else if (responseJson.hasOwnProperty("message")) {
            setErrorMessage(responseJson.message);
          }
          setModalVisible(true);
          setLoading(false);
          // setErrortext("Please check your email id or password");
          console.log("Please check your email id or password");
        }
      })
      .catch((error) => {
        //Hide Loader
        setModalVisible(true);
        setErrorMessage("Failed to login, Please try again.");
        setLoading(false);
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  const onForgotpassword = async () => {
    //alert("forgotPassword "+forgotPassword)

    try {
      const supported = await Linking.canOpenURL(forgotPassword);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(forgotPassword);
      } else {
        Toast.showWithGravity(
          "Please connect with internet or try again",
          Toast.LONG,
          Toast.CENTER
        );
      }
    } catch (err) {
      Toast.showWithGravity(
        "Please connect with internet or try again",
        Toast.LONG,
        Toast.CENTER
      );
    }
  };

  const onRety = () => {
    setModalVisible(false);

    if (userEmail && userPassword) {
      handleSubmitPress();
    } else fetchUserType();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={-130}
      >
        <GeneralStatusBarColor
          backgroundColor="#3775f0"
          barStyle="light-content"
        />

        <ImageBackground
          style={styles.bgImage}
          source={require("../Image/website_image_fit.png")}
        />
        <Loader loading={loading} />

        <AlertModal
           title={"Login Type"}
          loading={isModalVisible}
          errorMessage={errorMessage}
          onRety={onRety}
          onCloseModal={closeModal}
        />


      <ReactNativePickerModule
        pickerRef={pickerRef}
        value={value}
        title={"Select Login Type"}
        items={loginCollection}
        titleStyle={{ color: "black" }}
        itemStyle={{ color: "black" }}
        selectedColor="#FC0"
        confirmButtonEnabledTextStyle={{ color: "black" }}
        confirmButtonDisabledTextStyle={{ color: "grey" }}
        cancelButtonTextStyle={{ color: "black" }}
        confirmButtonStyle={{
          backgroundColor: "white",
        }}
        cancelButtonStyle={{
          backgroundColor: "white",
        }}
        contentContainerStyle={{
          backgroundColor: "white",
        }}
        onCancel={() => {
          console.log("Cancelled")
        }}
        onValueChange={value => {
          console.log("value: ", value)
          setLoginType(value)
        }}
      />
        <View style={{ width: null, height: "50%" }} />

        <View>
        <TouchableOpacity style={styles.inputContainer} onPress={() => pickerRef.current.show()} >
          <Text
            style={[styles.inputs,{alignSelf:'center',alignContent:'center',alignItems:'center',marginTop:22}]}
            underlineColorAndroid="transparent"
            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
            placeholder="USERNAME" //dummy@abc.com
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            value={loginType}
            keyboardType="default"
            returnKeyType="next"
            onSubmitEditing={() =>
              passwordInputRef.current && passwordInputRef.current.focus()
            }
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
            editable={false}
          >{loginType}</Text>
          <Image
            style={styles.inputIcon}
            source={require("../Image/ic_expand_arrow.png")}

          />
        </TouchableOpacity>
            {/*<View style={{backgroundColor: AppColors.white, borderRadius: 50/2, paddingLeft: 10, height: 40, fontWeight: "bold", flexDirection: "row"}}>
           <Picker
              selectedValue={loginType}
              onValueChange={(itemValue, itemIndex) => {
                setLoginType(itemValue);
                console.log("Login tyep ::: ", itemValue);
              }}
              mode='dialog'
              style={{backgroundColor: AppColors.white, flex: 0.95, marginTop: -5, fontWeight: "bold"}}
              textStyle={{backgroundColor: AppColors.white, flex: 0.95, marginTop: -5, fontWeight: "bold"}}
            >
                {loginCollection.map(item => (
                    <Picker.Item style={{fontWeight: "bold"}} textStyle={{fontWeight: "bold"}}
                        key={item.value}
                        label={item.label}
                        value={item.value}
                    />
                ))}
              </Picker>
              <Image
                style={{marginTop: 2}}
                source={require("../Image/ic_expand_arrow.png")}
              /> 
          </View>*/}
          <View style={{ width: 300, height: 0 }} />
        </View>
        <View style={styles.inputContainer} >
          <TextInput
            style={styles.inputs}
            underlineColorAndroid="transparent"
            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
            placeholder="USERNAME" //dummy@abc.com
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            value={userEmail}
            keyboardType="default"
            returnKeyType="next"
            onSubmitEditing={() =>
              passwordInputRef.current && passwordInputRef.current.focus()
            }
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <Image
            style={styles.inputIcon}
            source={require("../Image/email_ico.png")}
            />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={(UserPassword) => setUserPassword(UserPassword)}
            placeholder="PASSWORD" //12345
            placeholderTextColor="#8b9cb5"
            keyboardType="default"
            value={userPassword}
            ref={passwordInputRef}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
            underlineColorAndroid="#f000"
            returnKeyType="done"
          />
          <Image
            style={styles.inputIcon}
            source={require("../Image/key_ico.png")}

          />
        </View>
        <TouchableOpacity
          style={styles.outerCircle}
          onPress={() => handleSubmitPress()}
        >
          <View style={styles.innerCircle}>
            <Image
              style={{
                width: 25,
                height: 25,
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                marginTop: 12,
              }}
              source={require("../../src/Image/right_arrw.png")}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: 80,
            height: 2,
            backgroundColor: "white",
            alignSelf: "center",
            marginTop: 6,
          }}
        />

        <Text style={styles.paragraph}> Log In </Text>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => onForgotpassword()}
        >
          <Text style={[styles.btnText, styles.underline]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text
            style={[styles.btnText, { height: 40, marginTop: 10 }]}
            onPress={() => {
              Linking.openURL("https://www.philgeps.gov.ph/");
            }}
          >
            Copyright {"\u00A9"}By.philGEPS{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://www.philgeps.gov.ph/");
            }}
          >
            <Image
              source={require("../Image/menu_logo.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;
const resizeMode = "center";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3775f0",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 0,
    width: 300,
    height: 40,
    marginTop: 20,
    // marginBottom: 10,
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
    zIndex: 0,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 10,
    width: 300,
    backgroundColor: "transparent",
  },
  loginButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: "white",
  },
  bgImage: {
    flex: 1,
    resizeMode,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },

  MainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 10,
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
    margin: 10,
    paddingBottom: Platform.OS === "ios" ? 20 : 25,
  },

  image: {
    width: 35,
    height: 35,
    resizeMode: "cover",
    justifyContent: "center",
  },
  textStyle: {
    justifyContent: "center",
    width: "70%",
    fontSize: 14,
    color: "white",
    flex: 1,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "red",
    borderColor: "black",
    borderWidth: 3,
  },
  container3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  outerCircle: {
    marginTop: 20,
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: "white",
  },
  innerCircle: {
    borderRadius: 30,
    width: 50,
    height: 50,
    margin: 5,
    backgroundColor: "white",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
  },
  paragraph: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 20,
  },
  underline: { textDecorationLine: "underline" },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00BCD4",
    height: 300,
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 80,
    marginLeft: 40,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
