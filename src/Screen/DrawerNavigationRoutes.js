// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  
} from "react-native";
// Import Navigators from React Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

// Import Screens
import HomeScreen from "./DrawerScreens/HomeScreen";
import SettingsScreen from "./DrawerScreens/SettingsScreen";
import CustomSidebarMenu from "./Components/CustomSidebarMenu"; //DrawerMenu
import NavigationDrawerHeader from "./Components/NavigationDrawerHeader";
import SubMenues from "./SubMenues";

import ProfileScreen from "./DrawerScreens/ProfileScreen";
import Details from "./Details";
import FinalDetailsPage from "./FinalDetailsPage";
import CustomDrawerContentComponent from "./Components/CustomDrawerContentComponent";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Avatar, Badge, Divider, Modal, Portal } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RippleButton } from "./Components/RippleButton";

import { gStyles } from "../../src/style/appStyles";


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
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        // options={{
        //   title: "Details", //Set Header Title
        // }}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FinalDetailsPage"
        component={FinalDetailsPage}
        options={{headerShown: false}}
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
  return (
    <View style={{ flexDirection: "row",marginLeft: -20,marginTop:5 }}>
         
            <View style={[gStyles.userAvatarStyle]}>
            <Image
        style={{ width: 35,
          height: 35,backgroundColor:'white'}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
            </View>
          

          <View style={{ width: 10 }}></View>

          {/* CONTACT DETAILS  */}
          <View style={{ paddingTop: 8 }}>
            <Text style={[gStyles.contactStyle,{color:'white',fontSize:18}]}>
              Dashboard
            </Text>
            <Text style={[{color:'white',fontSize:14}]}>
             UserType: merchant
            </Text>
          </View>
        </View>
    // <View
    //   style={[,{
    //     marginLeft: -40,marginTop:17,marginLeft:8,flexDirection:'row'
    //   }]}>


    //     <Text style={[{fontFamily:'bold', size:'38', color:'white',height: 40, marginTop: 5,marginLeft:4 ,alignSelf:'flex-start',alignContent:'center',alignItems:"center"}]}>
    //       Profile Overview
    //     </Text>
    // </View>
  );
}

export function NotificationView() {
  const navigation = useNavigation();
  return (
    <RippleButton
      onPress={() => navigation.navigate("HomeScreen")}
      rippleColor={'orange'}
      rippleStyle={{ marginRight: 16 }}
    >
      <View>
         {/* <Badge size={10} style={{width:40,height:40}} /> */}
         <Image
        style={{ width: 40,
          height: 40,backgroundColor:'white'}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
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

        headerRight :()=>(
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
        options={{headerShown: false}}
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
      setProfileData(value);
    } catch (e) {
      console.log("catch ", e);
    }
  };

  const App = () => {
    return <CustomDrawerContentComponent />;
  };
   
  function DashboardMenu(props) {
    return (
      <View style={{ flexDirection: "row", marginTop: 2,marginBottom:2,height:35 }}>

      <Image
        style={{ width: 25, height: 25 }}
        source={require('../Image/registration.png')}
      />
      <Text style={[{ height: 40, marginTop: 5,marginLeft:4 }]}>
      Dashboard
            </Text>
      </View>
    );
  }
  function SettingsMenu(props) {
    return (
      <View style={{ flexDirection: "row", marginTop: 2,marginBottom:2,height:35 }}>

      <Image
        style={{ width: 25, height: 25 }}
        source={require('../Image/registration.png')}
      />
      <Text style={[{ height: 40, marginTop: 5,marginLeft:4 }]}>
      Settings
            </Text>
      </View>
    );
  }
  function ProfileMenu(props) {
    return (
      <View style={{ flexDirection: "row", marginTop: 2,marginBottom:2,height:35 }}>

      <Image
        style={{ width: 25, height: 25 }}
        source={require('../Image/registration.png')}
      />
      <Text style={[{ height: 40, marginTop: 5,marginLeft:4 }]}>
      Profile Overview
            </Text>
      </View>
    );
  }
  
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
      drawerContent={CustomSidebarMenu}
       //drawerContent={<CustomDrawerContentComponent></CustomDrawerContentComponent>}

    >
      <Drawer.Screen
        name="homeScreenStack"
        // options={{ drawerLabel: "Dashboard" }}
       // options={{ drawerLabel: "Dashboard" ,headerTitle: props => <LogoTitle {...props} /> }}
       options={{
        drawerLabel: props => <DashboardMenu {...props} />,
        // headerRight: () => (
        //   <LogoTitle
        //     onPress={() => alert('This is a button!')}
        //     title="Info"
        //     color="#fff"
        //   />
        // ),
      }}
        component={homeScreenStack}
       
      />

      <Drawer.Screen
        name="profile"
        options={{ 
       // drawerLabel: "Profile Overview" }}
       drawerLabel: props => <ProfileMenu {...props} />
      }}

        component={profileScreenStack}
      />
      <Drawer.Screen
        name="settingScreenStack"
        options={{drawerLabel: props => <SettingsMenu {...props} />,
      }}
        component={settingScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
