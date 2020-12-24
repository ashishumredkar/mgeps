import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Pressable,
  Modal,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-elements";
import RadioButton from "../Components/RadioButton";
import { CheckBox } from "react-native-elements";
import GeneralStatusBarColor from "../Components/GeneralStatusBarColor";
import CustomToolbar from "../Components/CustomToolbar";
import { AppColors } from "../../style/AppColors";
import AsyncStorage from "@react-native-community/async-storage";

const PROP = [
  {
    key: "8 Hours",
    text: "8 Hours",
  },
  {
    key: "1 Week",
    text: "1 Week",
  },
  {
    key: "1 Year",
    text: "1 Year",
  },
];
export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calls: [
        {
          id: 1,
          name: "Profile",
          type: "profile",
          image: "https://bootdey.com/img/Content/avatar/avatar7.png",
        },
        {
          id: 2,
          name: "Mute Notification",
          type: "notification",
          image:
            "https://cdn.iconscout.com/icon/free/png-64/notifications-1780874-1514189.png",
        },
      ],
      isVisible: false,
      checked: true,
      userNameType: "",
    };
  }

  async componentDidMount () {
    const userTypeName = await AsyncStorage.getItem("userType");
    this.setState({userNameType: userTypeName});
  }

  renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          if (item.type === "profile") {
            this.props.navigation.navigate("profile");
          } else {
            //this.props.navigation.navigate("settingScreenStack")

            this.setState({ isVisible: true });
          }
        }}
      >
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{item.name}</Text>
            </View>
            {/* <View style={styles.end}>
              <Image style={[styles.icon, {marginLeft:15, marginRight:5, width:14, height:14}]}
               source={require('../../Image/arrow_icon.png')}
               />
              <Text style={styles.time}>{item.date} {item.time}</Text>
            </View> */}
          </View>
          <Image
            style={[styles.icon, { marginRight: 50 }]}
            source={require("../../Image/arrow_icon.png")}
          />
        </View>
      </Pressable>
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1,backgroundColor: AppColors.colorPrimary}}>
        <CustomToolbar
          title={"Settings"}
          userType={""}
          backgroundColor="#3775f0"
        />
        <View style={styles.container}>
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.isVisible}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
          >
            {/*All views of Modal*/}
            <View style={[styles.modal, {borderColor: AppColors.colorPrimary, borderWidth: 3}]}>
              <Text style={[styles.text, {fontWeight: "bold", fontSize: 18}]}>Mute notification for...!</Text>
              <Text style={styles.text}>
                Choose any one from following options
              </Text>
              <RadioButton PROP={PROP} />

              <CheckBox
                title="Show Notifications"
                checked={this.state.checked}
                onPress={() => this.setState({ checked: !this.state.checked })}
              />

              <View style={{ flexDirection: "row", margin: 10 }}>
                <Button
                  title="OK"
                  buttonStyle={{
                    marginTop: 5,
                    borderRadius: 16,
                    backgroundColor: AppColors.green600,
                    width:120,
                    height: 35,
                  }}
                  onPress={() => {
                    this.setState({ isVisible: !this.state.isVisible });
                  }}
                />
                <View
                  style={{
                    width: 50,
                    height: 50,
                    flex: 1,
                  }}
                />

                <Button
                  title="Cancel"
                  buttonStyle={{
                    marginTop: 5,
                    borderRadius: 16,
                    backgroundColor: AppColors.red800,
                    width:120,
                    height: 35,
                  }}
                  onPress={() => {
                    this.setState({ isVisible: !this.state.isVisible });
                  }}
                />
              </View>
            </View>
            <View
              style={{ height: 1, width: "100%", backgroundColor: "white" }}
            />
          </Modal>
          <FlatList
            extraData={this.state}
            data={this.state.calls}
            keyExtractor={(item,index) => {
              return index.toString();
            }}
            renderItem={this.renderItem}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },

  modal: {
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "white",
    marginTop: 80,
    marginLeft: 40,
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#dcdcdc",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 15,
  },
  mblTxt: {
    fontWeight: "200",
    color: "#777",
    fontSize: 13,
  },
  end: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontWeight: "400",
    color: "#666",
    fontSize: 12,
  },
  icon: {
    height: 28,
    width: 28,
  },
});
