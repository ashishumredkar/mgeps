// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect, createRef } from "react";
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
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import Loader from "./Components/Loader";

// import DropDownPicker from "react-native-dropdown-picker";
import DropDownPicker from "react-native-dropdown-picker";

import Toast from "react-native-simple-toast";

//import messaging from "@react-native-firebase/messaging";
// import firebase from '@react-native-firebase/app';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";

//import PushNotification from "react-native-push-notification";
// import FCM from "react-native-fcm";

import BottomView from "./BottomView";
// import Loader from './Components/Loader'

//import {Notifications} from 'react-native-notifications';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { Container, Footer, Title, Button } from "native-base";

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState(""); //kiranab
  const [userPassword, setUserPassword] = useState(""); //dsa@1234
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [forgotPassword, setForgotPassword] = useState("");

  const [loginType, setLoginType] = useState("Merchant");
  const [loginCollection, setLoginCollection] = useState([
    { label: "Agency", value: "Agency" },
    { label: "Merchant", value: "Merchant" },
  ]);
  const [fcmId, setfcmId] = useState(
    "sdlfksdlflsdf987987s9d89f7sd987f987sd89f798s7df"
  );

  const passwordInputRef = createRef();

  useEffect(() => {
    setLoading(true);
    fetch("https://mgeps-uat-pune.etenders.in/api/BuyerUsers/loginType")
      .then((response) => response.json())
      .then((json) => {
        setForgotPassword(json.forgetPassword);
        var points = [json.LoginTypes];

        var mData = []; // Good
        console.log("data ", points);
        console.log("data ", points.length);

        if (points[0].Agency) {
          mData = mData.concat({ label: "Agency", value: "Agency" });
        }
        if (points[0].Merchant) {
          mData = mData.concat({ label: "Merchant", value: "Merchant" });
        }

        console.log("mData", mData);

        setLoginCollection(mData);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // useEffect(() => {

  //  // requestUserPermission();
  //  PushNotificationIOS.addEventListener('notification', onRemoteNotification);
  //   configFcm();
  //   fetchUsers();

  //   showNoti();

  // },[]);

  // const onRemoteNotification = (notification) => {
  //   const isClicked = notification.getData().userInteraction === 1;

  //   if (isClicked) {
  //     // Navigate user to another screen
  //   } else {
  //     // Do something else with push notification
  //   }
  // };

  // const showNoti =async () =>{
  //     console.log("showNoti ","showNoti")

  //   //   try {
  //   //     let result = await FCM.requestPermissions({
  //   //       badge: false,
  //   //       sound: true,
  //   //       alert: true
  //   //     });
  //   //   } catch (e) {
  //   //     console.error(e);
  //   //   }

  //   //   FCM.getFCMToken().then(token => {
  //   //     console.log("TOKEN (getFCMToken)", token);
  //   //     this.setState({ token: token || "" });
  //   //   });

  //   //   if (Platform.OS === "ios") {
  //   //     FCM.getAPNSToken().then(token => {
  //   //       console.log("APNS TOKEN (getFCMToken)", token);
  //   //     });
  //   //   }
  //   //    PushNotificationIOS.scheduleLocalNotification({
  //   //     /* Android Only Properties */
  //   //     channelId: "your-channel-id", // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
  //   //     ticker: "My Notification Ticker", // (optional)
  //   //     showWhen: true, // (optional) default: true
  //   //     autoCancel: true, // (optional) default: true
  //   //     largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
  //   //     largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
  //   //     smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
  //   //     bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
  //   //     subText: "This is a subText", // (optional) default: none
  //   //     bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
  //   //     color: "red", // (optional) default: system default
  //   //     vibrate: true, // (optional) default: true
  //   //     vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
  //   //     tag: "some_tag", // (optional) add tag to message
  //   //     group: "group", // (optional) add group to message
  //   //     groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
  //   //     ongoing: false, // (optional) set whether this is an "ongoing" notification
  //   //     priority: "high", // (optional) set notification priority, default: high
  //   //     visibility: "private", // (optional) set notification visibility, default: private
  //   //     ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
  //   //     shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
  //   //     onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

  //   //     when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
  //   //     usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
  //   //     timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

  //   //     messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

  //   //     actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
  //   //     invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

  //   //     /* iOS only properties */
  //   //     alertAction: "view", // (optional) default: view
  //   //     category: "", // (optional) default: empty string

  //   //     /* iOS and Android properties */
  //   //     id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
  //   //     title: "My Notification Title", // (optional)
  //   //     message: "My Notification Message", // (required)
  //   //     userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
  //   //     playSound: false, // (optional) default: true
  //   //     soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
  //   //     number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
  //   //     repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
  //   //   });
  // }

  // const configFcm = async () =>{
  //   PushNotification.configure({
  //       // (optional) Called when Token is generated (iOS and Android)
  //       onRegister: function(token) {
  //         console.log("TOKEN:", token);
  //       },

  //       // (required) Called when a remote or local notification is opened or received
  //       onNotification: function(notification) {
  //         console.log("NOTIFICATION:", notification);

  //         // process the notification here

  //         // required on iOS only
  //         notification.finish(PushNotificationIOS.FetchResult.NoData);
  //       },
  //       // Android only
  //       senderID: "1090501687137",
  //       // iOS only
  //       permissions: {
  //         alert: true,
  //         badge: true,
  //         sound: true
  //       },
  //       popInitialNotification: true,
  //       requestPermissions: true
  //     });
  // }

  const handleSubmitPress = () => {
    setErrortext("");
    if (!userEmail) {
      Toast.showWithGravity("Please fill Email", Toast.LONG, Toast.CENTER);

      return;
    }
    if (!userPassword) {
      Toast.showWithGravity("Please fill Password", Toast.LONG, Toast.CENTER);

      return;
    }
    setLoading(true);
    let dataToSend = {
      username: userEmail,
      password: userPassword,
      login_type: loginType,
      fcm_id: fcmId,
      country: "IN",
    };
    console.log("dataToSend ", dataToSend);

    fetch("https://mgeps-uat.philgeps.gov.ph/api/BuyerUsers/getToken", {
      method: "POST",
      body: JSON.stringify({
        username: userEmail,
        password: userPassword,
        login_type: loginType,
        fcm_id: "sdlfksdlflsdf987987s9d89f7sd987f987sd89f798s7df",
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
        console.log("res2 ", responseJson.data);

        if (responseJson.errorCode === 1) {
          Toast.showWithGravity(
            responseJson.errorMessage,
            Toast.LONG,
            Toast.CENTER
          );
        }

        // If server response message same as Data Matched
        if (responseJson.userData) {
          AsyncStorage.setItem("auth_token", responseJson.data.token);

          //const log=JSON.stringify(responseJson.userData)

          AsyncStorage.setItem("user_id", "" + responseJson.userData.id);
          AsyncStorage.setItem("userType", loginType);

          AsyncStorage.setItem(
            "@user_data",
            JSON.stringify(JSON.parse(JSON.stringify(responseJson.userData)))
          );

          navigation.replace("DrawerNavigationRoutes");
        } else {
          setErrortext("Please check your email id or password");
          console.log("Please check your email id or password");
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  const onForgotpassword = async () => {
    //alert("forgotPassword "+forgotPassword)
    const supported = await Linking.canOpenURL(forgotPassword);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(forgotPassword);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../Image/website_image_fit.png")}
      />
      <Loader loading={loading} />
      <View style={{ width: null, height: "43%" }} />

      <View>
        <DropDownPicker
          items={loginCollection}
          // items={[
          //   { label: "Agency", value: "Agency" },
          //   { label: "Merchant", value: "Merchant" },
          // ]}
          placeholder="Select Login Type"
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setLoginType(item.value)}
        />
        <View style={{ width: 300, height: 45 }} />
      </View>

      <View style={styles.inputContainer}>
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
          source={{ uri: "https://img.icons8.com/nolan/40/000000/email.png" }}
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
          returnKeyType="next"
        />
        <Image
          style={styles.inputIcon}
          source={{ uri: "https://img.icons8.com/nolan/40/000000/key.png" }}
        />
      </View>

      {/* <TouchableOpacity
        style={styles.btnForgotPassword}
        onPress={() => onForgotpassword}
      >
        <Text style={styles.btnText}>Forgot your password?</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        activeOpacity={0.5}
        onPress={
          // showNoti
          handleSubmitPress
        }
      >
        <Text style={styles.buttonTextStyle}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => onForgotpassword()}
      >
        <Text style={styles.btnText}>Forgot Password</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text style={[styles.btnText, { height: 40, marginTop: 10 }]}>
          Copyright {"\u00A9"}By.philGEPS{" "}
        </Text>
        <Image source={require("../Image/success.png")} style={styles.image} />
      </View>
    </KeyboardAvoidingView>
  );

  return1(
    <View style={styles.container}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ImageBackground
          style={styles.bgImage}
          source={require("../Image/website_image_fit.png")}
        >
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: "center" }}></View>
            <View style={styles.SectionStyle}>
              <DropDownPicker
                items={[
                  { label: "Agency", value: "Agency" },
                  { label: "Merchant", value: "Merchant" },
                ]}
                defaultNull
                placeholder="Select Login Type"
                containerStyle={{
                  height: 40,
                  width: "99%",
                  flex: 1,
                  color: "white",
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderWidth: 1,
                  borderRadius: 30,
                  borderColor: "#dadae8",
                  alignItems: "center",
                  alignContent: "center",
                }}
                onChangeItem={(item) => setLoginType(item.value)}
              />
            </View>
            {/* <DropDownPicker
                items={[
                  {
                    label: "USA",
                    value: "usa",
                   // icon: () => <Icon name="flag" size={18} color="#900" />,
                    hidden: true,
                  },
                  {
                    label: "UK",
                    value: "uk",
                   // icon: () => <Icon name="flag" size={18} color="#900" />,
                  },
                  {
                    label: "France",
                    value: "france",
                    //icon: () => <Icon name="flag" size={18} color="#900" />,
                  },
                ]}
                defaultValue={loginType}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: "#fafafa" }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) => setLoginType(item.value)}
              /> */}

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
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
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
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
                returnKeyType="next"
              />
            </View>
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={
                // showNoti
                handleSubmitPress
              }
            >
              <View style={styles.circle}>
                {/* <Icon name="comments" size={30} color="#900" /> */}
              </View>

              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => {
                navigation.navigate("RegisterScreen");
              }}
            >
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
          <BottomView />
        </ImageBackground>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;
const resizeMode = "center";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginTop: 20,
    marginBottom: 20,
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
    height: 45,
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
});
