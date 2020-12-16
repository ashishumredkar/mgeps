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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
          headerRight: (props) => <NotificationView />,
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
    <View style={{ flexDirection: "row", marginTop: -10 }}>
      <ImageBackground
        source={require("../Image/world_map.png")}
        style={{
          flexDirection: "row",
          flex: 1,
          marginLeft: -40,
          resizeMode: "cover",
          justifyContent: "center",
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
        <View style={{ paddingTop: 8, marginLeft: -8 }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Dashboard
          </Text>
          <Text style={[{ color: "white", fontSize: 12 }]}>
            UserType: {username}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

export function NotificationView() {
  const navigation = useNavigation();
  return (
    <RippleButton
      onPress={() => navigation.navigate("HomeScreen")}
      rippleColor={"orange"}
      rippleStyle={{ marginRight: 16 }}
    >
      <View>
        {/* <Badge size={10} style={{width:40,height:40}} /> */}
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
          value="99+"
          containerStyle={{
            position: "absolute",
            top: 2,
            right: -4,
            fontWeight: "bold",
            fontSize: 14,
          }}
        />

        {/* <MaterialCommunityIcons size={30} name={"bell-outline"} /> */}
        {/* <Avatar.Image height={10} style={{ color: "#f80" }}  source={{ uri: "https://img.icons8.com/nolan/40/000000/email.png" }} /> */}
      </View>
    </RippleButton>
  );
}
// export const NearByStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="Nearby">
//       <Stack.Screen
//         name="Nearby"
//         component={Nearby}
//         options={{
//           headerTitle: (props) => <LogoTitle {...props} />,
//           headerRight: (props) => <NotificationView />,
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
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
      console.log("setAnimatingabc " , value);

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
          source={require("../Image/settings.png")}
        />
        <Text style={gStyles.drawerText}>Contact Us</Text>
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
