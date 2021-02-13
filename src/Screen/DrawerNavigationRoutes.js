// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  useWindowDimensions,
  Platform,
  ImageBackground,
  Button,
  StyleSheet,
  Picker,
  Divider
} from "react-native";
import { Badge } from "react-native-elements";
// Import Navigators from React Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

// Import Screens
import HomeScreen from "./DrawerScreens/HomeScreen";
import SettingsScreen from "./DrawerScreens/SettingsScreen";
import ViewOrganizationProfileScreen from "./DrawerScreens/ViewOrganizationProfileScreen";
import CustomSidebarMenu from "./Components/CustomSidebarMenu"; //DrawerMenu
import NavigationDrawerHeader from "./Components/NavigationDrawerHeader";
import SubMenues from "./SubMenues";

import ProfileScreen from "./DrawerScreens/ProfileScreen";
import Details from "./Details";
import FinalDetailsPage from "./FinalDetailsPage";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RippleButton } from "./Components/RippleButton";

import { gStyles } from "../../src/style/appStyles";
import ContactUs from "./DrawerScreens/ContactUs";

import BidEventCalndar from "./DrawerScreens/BidEventCalendar";
import BidDetails from "./BidDetails";
import BidDetailsPage from "./BidDetailsPage";
import { NOTIFICATION_COUNT_URL } from "../Screen/Utils";
import EventEmitter from "react-native-eventemitter";

import { createDrawerNavigator } from "@react-navigation/drawer";
import OptionMenu from "./Components/OptionMenu";
import { TouchableOpacity } from "react-native-gesture-handler";
const myIcon = <Icon name="more-vert" size={30} color="white" />;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const STORAGE_KEY = "@user_data";

const homeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Dashboard", //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerRight: (props) => <NotificationView {...props} />,
          headerTitle: (props) => <LogoTitle {...props} />,

          headerStyle: {
            backgroundColor: "#307ecc", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="SubMenues"
        component={SubMenues}
        // options={{
        //   title: "Sub Menues", //Set Header Title
        // }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        // options={{
        //   title: "Details", //Set Header Title
        // }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FinalDetailsPage"
        component={FinalDetailsPage}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BidDetails"
        component={BidDetails}
        // options={{
        //   title: "Details", //Set Header Title
        // }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BidDetailsPage"
        component={BidDetailsPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export function LogoTitle(props) {
  const [username, setUserName] = useState("");

  useEffect(() => {
    // Update the document title using the browser API
    readData();
  }, []);

  const readData = async () => {
    try {
      // const userData = await AsyncStorage.getItem("@user_data");

      const userType = await AsyncStorage.getItem("userType");

      //const value = JSON.parse(userData);
      console.log("setAnimatingabc ", userType);

      setUserName(userType);
      //setProfileData(value);
    } catch (e) {
      console.log("catch ", e);
    }
  };

  return (
    <ImageBackground
      resizeMode="stretch"
      source={require("../Image/world_map.png")}
      style={{ flex: 1, width: "100%" }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: Platform.OS == "ios" ? -5 : 0,
        }}
      >
        <View style={[gStyles.userAvatarStyle]}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../Image/menu_logo.png")}
          />
        </View>

        <View style={{ width: 10 }}></View>

        {/* CONTACT DETAILS  */}
        <View style={{ paddingTop: 8, width: 120 }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Dashboard
          </Text>
          <Text style={[{ color: "white", fontSize: 12 }]}>
            UserType: {username}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export function NotificationView(props) {

  const [username, setUserName] = useState("");
  const navigation = useNavigation();

  const [notificationCount, setNotificationCount] = useState(0);

  const [authToken, setauthToken] = useState("");
  const [showPicker,setPicker]=useState(false)

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getNotificationCount();
    EventEmitter.on("UPDATE_COUNT", (value) => {
      getNotificationCount();
    });
  }, []);

  const getNotificationCount = async () => {
    const userData = await AsyncStorage.getItem(STORAGE_KEY);
    const mData = JSON.parse(userData);
    const token = await AsyncStorage.getItem("auth_token");
    const userType = await AsyncStorage.getItem("userType");
    console.log("getNotificationCount22 ", mData);
    fetch(NOTIFICATION_COUNT_URL + "/" + mData.id + "/" + mData.userType, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //body: formdata,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          if (json.notificationCount > 999) {
            setNotificationCount("999+");
          } else setNotificationCount(json.notificationCount);
        }
        console.log("setNotificationCount", json.notificationCount);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  const navSettings = () => {
    console.log("Home screen....");

    navigation.navigate("SettingsScreen");
  };

  const navProfile = () => {
    console.log("Home screen....");
    navigation.navigate("profile");
  };

  return (
    <View style={[styles.navBar, { backgroundColor: props.backgroundColor }]}>

    <RippleButton
      onPress={() => navigation.navigate("HomeScreen")}
      rippleColor={"orange"}
      rippleStyle={{ marginRight: 16 }}
    >
      <View>
        <Image
          style={{
            width: Platform.OS == "ios" ? 30 : 30,
            height: Platform.OS == "ios" ? 30 : 30,
            backgroundColor: "#307ecc",
          }}
          source={require("../Image/ic_stat_notifications.png")}
        />
        <Badge
          status="error"
          value={notificationCount}
          containerStyle={{
            position: "absolute",
            top: 0,
            right: -20,
            fontWeight: "bold",
            fontSize: 14,
            width: 40,
          }}
        />
      </View>
    </RippleButton>

    <View style={styles.rightContainer}>
        <View style={styles.rightIcon}>
          <OptionMenu
            customButton={myIcon}
            destructiveIndex={1}
            options={["Settings"]}
            actions={[navSettings]}
          />
        </View>
      </View>

    </View>
  );
}

const profileScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),

        headerRight: () => (
          <Icon name="circle-notifications" size={30} color="#900" />
        ),
        headerStyle: {
          backgroundColor: "#307ecc", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const viewOrganizationProfileStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="ViewOrganizationProfileScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),

        headerRight: () => (
          <Icon name="circle-notifications" size={30} color="#900" />
        ),
        headerStyle: {
          backgroundColor: "#307ecc", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="ViewOrganizationProfileScreen"
        component={ViewOrganizationProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const settingScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#307ecc", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const contactUsStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="ContactUs"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#307ecc", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const bidEventStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="BidEventCalndar"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#307ecc", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="BidEventCalndar"
        component={BidEventCalndar}
        options={{
          title: "Bid Event Calendar", //Set Header Title
          headerLeft: null,
          gesturesEnabled: false,
        }}
      />
       <Stack.Screen
        name="BidDetails"
        component={BidDetails}
        // options={{
        //   title: "Details", //Set Header Title
        // }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BidDetailsPage"
        component={BidDetailsPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const DrawerNavigatorRoutes = (props) => {
  const [username, setUserName] = useState("");
  const [userType, setuserType] = useState("");
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    // Update the document title using the browser API
    readData();
  }, []);

  const readData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@user_data");
      const value = JSON.parse(userData);
      const userType = await AsyncStorage.getItem("userType");
      console.log("setAnimatingabc ", userType);

      setuserType(userType);
      setUserName(value.username);
      setProfileData(value);
    } catch (e) {
      console.log("catch ", e);
    }
  };

  function DashboardMenu(props) {
    return (
      <View style={gStyles.drawerMenu}>
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../Image/dashboard.png")}
        />
        <Text style={gStyles.drawerText}>Dashboard</Text>
      </View>
    );
  }

  function BidEventCalendarMenu(props) {
    return (
      <View style={gStyles.drawerMenu}>
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../Image/ic_calendar.png")}
        />
        <Text style={gStyles.drawerText}>Bid Event Calendar</Text>
      </View>
    );
  }
  function SettingsMenu(props) {
    return (
      <View style={gStyles.drawerMenu}>
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../Image/settings.png")}
        />
        <Text style={gStyles.drawerText}>Settings</Text>
      </View>
    );
  }
  function ProfileMenu(props) {
    return (
      <View style={gStyles.drawerMenu}>
        <Image
          style={{ width: 25, height: 25 }}
          //source={require("../Image/profile.png")}
          source={require("../Image/profile.png")}
        />
        <Text style={gStyles.drawerText}>Profile Overview</Text>
      </View>
    );
  }

  function ViewOrganizationProfile(props) {
    return (
      <View style={gStyles.drawerMenu}>
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../Image/ic_organization.png")}
        />
        <Text style={gStyles.drawerText}>My Organization Profile</Text>
      </View>
    );
  }

  function ContactUsMenu(props) {
    return (
      <View style={gStyles.drawerMenu}>
        <Image
          style={{ width: 25, height: 25 }}
          //source={require("../Image/profile.png")}
          source={require("../Image/contact_us.png")}
        />
        <Text style={gStyles.drawerText}>Contact Us</Text>
      </View>
    );
  }
  function ViewOrganizationProfile(props) {
    return (
      <View style={gStyles.drawerMenu}>
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../Image/ic_organization.png")}
        />
        <Text style={gStyles.drawerText}>My Organization Profile</Text>
      </View>
    );
  }
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: "#cee1f2",
        color: "#cee1f2",
        itemStyle: { marginVertical: 5, color: "white" },
        labelStyle: {
          color: "#d8d8d8",
        },
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => (
        <CustomSidebarMenu {...{ employeename: username, ...props,userType: userType }} />
      )}


      // drawerContent={(props) => {
      //   const filteredProps = {
      //     ...props,
      //     state: {
      //       ...props.state,

      //       routeNames: props.state.routeNames.filter(
      //         // To hide single option
      //         // (routeName) => routeName !== 'HiddenPage1',
      //         // To hide multiple options you can add & condition
      //         (routeName) => {
      //           routeName !== 'contactUsStack'
      //           // && routeName !== 'viewOrganizationProfile';
      //         },
      //       ),
      //       routes: props.state.routes.filter(
      //         (route) =>{
      //           bidEventStack
      //           console.log("route",route.name)
      //           route.name !== 'contactUsStack'
      //         }
      //         //console.log("route",route.name)
      //           // route.name !== 'HomeScreen'
      //           // && route.name !== 'viewOrganizationProfile',
      //       ),

      //     },
      //   };
      //   console.log("routeNames",props.routeNames)

      //   return (

      //     <DrawerContentScrollView {...filteredProps}>
      //       <CustomSidebarMenu {...{ employeename: username, ...props }} />

      //       <DrawerItemList {...filteredProps} />
      //     </DrawerContentScrollView>
      //   );
      // }}
      >

      <Drawer.Screen
        name="homeScreenStack"
        // options={{ drawerLabel: "Dashboard" }}
        // options={{ drawerLabel: "Dashboard" ,headerTitle: props => <LogoTitle {...props} /> }}
        options={{
          drawerLabel: (props) => (
            <DashboardMenu {...{ employeename: username, ...props }} />
          ),
        }}
        component={homeScreenStack}
      />

{/* <Drawer.Screen name="bidEventStack" 

component={HomeScreen}
options={{
  drawerLabel: (props) => (
    <BidEventCalendarMenu {...{ employeename: username, ...props }} />
  ),
  headerLeft: () => (
    <NavigationDrawerHeader navigationProps={navigation} />
  ),
  headerRight: (props) => <NotificationView {...props} />,
  
  headerTitle: (props) => <LogoTitle {...props} />,

  headerStyle: {
    backgroundColor: "#307ecc", //Set Header color
  },
  headerTintColor: "#fff", //Set Header text color
  headerTitleStyle: {
    fontWeight: "bold", //Set Header text style
  },
}}/> */}

      <Drawer.Screen
        name="bidEventStack"
        options={{
          drawerLabel: (props) => (
            <BidEventCalendarMenu {...{ employeename: username, ...props }} />
          ),
        }}
        component={ bidEventStack}
        
      />

      <Drawer.Screen
        name="viewOrganizationProfile"
        options={{
          drawerLabel: (props) => (
            <ViewOrganizationProfile
              {...{ employeename: username, ...props }}
            />
          ),
        }}
        //  drawerLabel: props => <ProfileMenu {...props}
        component={viewOrganizationProfileStack}
      />

      <Drawer.Screen
        name="contactUsStack"
        options={{
          drawerLabel: (props) => (
            <ContactUsMenu {...{ employeename: username, ...props }} />
          ),
        }}
        component={contactUsStack}
      />

      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: (props) => (
            <ProfileMenu {...{ employeename: username, ...props }} />
          ),
        }}
        //  drawerLabel: props => <ProfileMenu {...props}
        component={profileScreenStack}
      />

      <Drawer.Screen
        name="settingScreenStack"
        options={{
          drawerLabel: (props) => (
            <SettingsMenu {...{ employeename: username, ...props }} />
          ),
        }}
        component={settingScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
const styles = StyleSheet.create({
  navBar: {
    height: 54,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomWidth: 0,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 4,
    // elevation: 1,
  },
  leftContainer: {
    justifyContent: "flex-start",
    width: 65,
    marginLeft: -12
  },
  middleContainer: {
    flex: 2,
    color: "white",
    flexDirection: "row",
    fontSize: 18,
    marginLeft: -10,
    marginRight: 10,
  },
  rightContainer: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  rightIcon: {
    paddingHorizontal: 20,
    resizeMode: "contain",
    //   backgroundColor: 'white',
  },
});
