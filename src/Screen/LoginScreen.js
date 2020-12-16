// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect, createRef, isValidElement } from "react";
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
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import Loader from "./Components/Loader";
import AlertModal from "./Components/AlertModal";

// import DropDownPicker from "react-native-dropdown-picker";
import DropDownPicker from "react-native-dropdown-picker";

import Toast from "react-native-simple-toast";
import Icon from "react-native-vector-icons/MaterialIcons";

//import messaging from "@react-native-firebase/messaging";
// import firebase from '@react-native-firebase/app';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";

//import PushNotification from "react-native-push-notification";
// import FCM from "react-native-fcm";

import BottomView from "./BottomView";
import { Modal } from "react-native-paper";
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

  const [isModalVisible, setModalVisible] = useState(false);

  const [loginType, setLoginType] = useState("Merchant");

  const [loginCollection, setLoginCollection] = useState([
    // { label: "Agency", value: "Agency" },
    // { label: "Merchant", value: "Merchant" },
  ]);

  const [fcmId, setfcmId] = useState(
    "sdlfksdlflsdf987987s9d89f7sd987f987sd89f798s7df"
  );

  const passwordInputRef = createRef();

  useEffect(() => {
    fetchUserType();
  }, []);

  const fetchUserType = async () => {
    setLoading(true);
    fetch("https://mgeps-uat.philgeps.gov.ph/api/BuyerUsers/loginType") //Live UAT
    // fetch("https://mgeps-uat-pune.etenders.in/api/BuyerUsers/loginType") // Pune office UAT
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

        //PushNotification.checkPermissions(PushNotification.requestPermissions());

        PushNotification.configure({
          // (optional) Called when Token is generated (iOS and Android)
          onRegister: function(token) {
                        console.log('TOKEN:', token);
                        setfcmId(token);
                      },

          // (required) Called when a remote or local notification is opened or received
          onNotification: function(notification) {
            console.log('NotificationHandler:', notification);
          },

          // (optional) Called when Action is pressed (Android)
          onAction: function(notification) {
            console.log ('Notification action received:');
            console.log(notification.action);
            console.log(notification);

            if(notification.action === 'Yes') {
              PushNotification.invokeApp(notification);
            }
          },

          // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
          onRegistrationError: function(err) {
            console.log("onRegistrationError: ",err);
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
      })
      .catch((error) => {
        setModalVisible(true);
        console.error(error);
      })
      .finally(() => setLoading(false));
  };
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

  const ModalScreen = () => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    );
  };

  const onRety = () => {
    setModalVisible(false);
    fetchUserType();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../Image/website_image_fit.png")}
      />
      <Loader loading={loading} />

      <AlertModal
        loading={isModalVisible}
        onRety={onRety}
        onCloseModal={closeModal}
      />

      <View style={{ width: null, height: "42%" }} />

      <View>
        <DropDownPicker
          items={loginCollection}
          placeholder="Select Login Type"
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setLoginType(item.value)}
        />
        <View style={{ width: 300, height: 60 }} />
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
      <TouchableOpacity
        style={styles.outerCircle}
        onPress={() => handleSubmitPress()}
      >
        <View style={styles.innerCircle}>
          {/* <Text style={styles.paragraph}/> */}
          <Image
            style={{
              width: 25,
              height: 25,
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              marginTop: 15,
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
        <Text style={[styles.btnText, styles.underline]}>Forgot Password?</Text>
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
      {/* <Modal
            animationType = {"slide"}
            transparent={false}
            visible={isModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has now been closed.');
            }}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Image
              source={require('../Image/menu_logo.png')}
              style = { styles.image }/>
              <Text style = { styles.text }>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas eget tempus augue, a convallis velit.</Text>
                  </View>
          </Modal> */}
    </KeyboardAvoidingView>
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
