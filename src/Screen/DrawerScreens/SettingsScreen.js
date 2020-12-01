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
  Button,
} from "react-native";
import RadioButton from "../Components/RadioButton";
import { CheckBox } from "react-native-elements";

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
    };
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
      <View style={styles.container}>
        <Modal
          style={styles.modal}
          animationType={"fade"}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          {/*All views of Modal*/}
          <View style={styles.modal}>
            <Text style={styles.text}>Mute notification for...!</Text>
            <Text style={styles.text}>
              choose any one from following options
            </Text>
            <RadioButton PROP={PROP} />
            
            <CheckBox
              title="Show Notifications"
              checked={this.state.checked}
              onPress={() => this.setState({ checked: !this.state.checked })}
            />

            <View style={{ flexDirection: "row", margin: 10 }}>
              <Text
                style={{ flex: 1, margin: 10 }}
                title="OK"
                onPress={() => {
                  this.setState({ isVisible: !this.state.isVisible });
                }}
              >
                {" "}
                OK
              </Text>
              <Text
                style={{ flex: 1, margin: 10 }}
                title="CANCEL"
                onPress={() => {
                  this.setState({ isVisible: !this.state.isVisible });
                }}
              >
                CANCEL
              </Text>
            </View>
          </View>
          <View
            style={{ height: 1, width: "100%", backgroundColor: "white" }}
          />
        </Modal>
        <FlatList
          extraData={this.state}
          data={this.state.calls}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}
        />
      </View>
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
    backgroundColor: "white",
    height: "60%",
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 80,
    marginLeft: 40,
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
  row: {
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
