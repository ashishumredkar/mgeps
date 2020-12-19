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
} from "react-native";
import { Badge } from "react-native-elements";
// Import Navigators from React Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
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
import BidDetails from './BidDetails';
import BidDetailsPage from './BidDetailsPage';


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
          // options={{
          //   headerTitle: (props) => <LogoTitle {...props} />,
          //   headerRight: (props) => <NotificationView />,
          // }}
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
      {/* <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile Overview", //Set Header Title
        }}
      /> */}
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
            style={{ width: 35, height: 35 }}
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

  useEffect(() => {
    // Update the document title using the browser API
    readData();
  }, []);

  const readData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@user_data");
      const objUserData = JSON.parse(userData);
      const token = await AsyncStorage.getItem("auth_token");
      this.setState({ notificationCount: 0 });

      console.log("som Navigation ::  ", objUserData);

      var url =
        "https://mgeps-uat-pune.etenders.in/api/Calendars/getCountMobileNotification/" +
        objUserData.id +
        "/" +
        objUserData.userType; // Pune UAT
      // var url = "https://mgeps-uat.philgeps.gov.ph/api/Calendars/getCountMobileNotification/" + objUserData.id + "/" + objUserData.userType; // Live UAT

      console.log("URL Count :: " + url);

      fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Hide Loader
          console.log("Response Data :: ", responseJson);
          console.log("Count :: ", responseJson.notificationCount);
          this.setState({ notificationCount: responseJson.notificationCount });
        })
        .catch((error) => {
          //Hide Loader
          console.error("qwerty  ", error);
        });
    } catch (e) {
      console.log("catch ", e);
    }
  };

  const navigation = useNavigation();

  const [notificationCount, setNotificationCount] = useState(0);

  const [authToken, setauthToken] = useState("");

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //fetch('') // Pune office UAT
    getNotificationCount();
  }, [notificationCount]);

  const getNotificationCount = async () => {
    const userData = await AsyncStorage.getItem(STORAGE_KEY);
    const mData = JSON.parse(userData);
    const token = await AsyncStorage.getItem("auth_token");
    const userType = await AsyncStorage.getItem("userType");
    //console.log("getNotificationCount",token)
    fetch(
      "https://mgeps-uat.philgeps.gov.ph/api/Calendars/getCountMobileNotification/" +
        userType +
        "/" +
        mData.id,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //body: formdata,
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          setNotificationCount(json.notificationCount);
        }
        console.log("mData", json.notificationCount);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  return (
    <RippleButton
      onPress={() => navigation.navigate("HomeScreen")}
      rippleColor={"orange"}
      rippleStyle={{ marginRight: 16 }}
    >
      <View>
        <Image
          style={{
            width: Platform.OS == "ios" ? 30 : 40,
            height: Platform.OS == "ios" ? 30 : 40,
            backgroundColor: "#307ecc",
          }}
          source={require("../Image/notification.png")}
        />
        <Badge
          status="error"
          value={notificationCount}
          containerStyle={{
            position: "absolute",
            top: 2,
            right: -4,
            fontWeight: "bold",
            fontSize: 14,
          }}
        />
      </View>
    </RippleButton>
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
        options={{
          title: "Settings", //Set Header Title
        }}
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
        options={{
          title: "Contact Us", //Set Header Title
        }}
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
          title: "BidEventCalndar", //Set Header Title
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
  const [username, setUserName] = useState("ashish");
  const [profileImage, setProfileImage] = useState("");
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    // Update the document title using the browser API
    readData();
  }, []);

  const readData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@user_data");
      const value = JSON.parse(userData);
      console.log("setAnimatingabc ", value);

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
          source={require("../Image/dashboard.png")}
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
          source={{ uri: "https://bootdey.com/img/Content/avatar/avatar7.png" }}
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
          source={require("../Image/profile.png")}
        />
        <Text style={gStyles.drawerText}>View Organization</Text>
      </View>
    );
  }

  function ContactUsMenu(props) {
    return (
      <View style={gStyles.drawerMenu}>
        <Image
          style={{ width: 25, height: 25 }}
          //source={require("../Image/profile.png")}
          source={{ uri: "https://bootdey.com/img/Content/avatar/avatar7.png" }}
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
          source={require("../Image/profile.png")}
        />
        <Text style={gStyles.drawerText}>View Organization</Text>
      </View>
    );
  }
  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;
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
        <CustomSidebarMenu {...{ employeename: username, ...props }} />
      )}
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

      <Drawer.Screen
        name="bidEventStack"
        options={{
          drawerLabel: (props) => (
            <BidEventCalendarMenu {...{ employeename: username, ...props }} />
          ),
        }}
        component={bidEventStack}
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
        name="contactUsStack"
        options={{
          drawerLabel: (props) => (
            <ContactUsMenu {...{ employeename: username, ...props }} />
          ),
        }}
        component={contactUsStack}
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
