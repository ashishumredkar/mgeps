import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";

import DatePicker from "react-native-datepicker";
import { AppColors } from "../../style/AppColors";
import AsyncStorage from "@react-native-community/async-storage";
const STORAGE_KEY = "@user_data";
import { BID_EVENT_CAL_URL } from "../Utils";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

export default class BidEventCalndar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      checked: true,
      date: new Date(),
      modalVisible: false,
      authToken: "",
      userId: "",
      userTypeId: "",
      bidEvent: [],
    };
  }
  componentWillUnmount() {
    // this.datePickerRef=null;
  }

  async componentDidMount() {
    this.datePickerRef.onPressDate();
    this.setState({ isVisible: true });

    const userData = await AsyncStorage.getItem(STORAGE_KEY);
    const mData = JSON.parse(userData);
    const token = await AsyncStorage.getItem("auth_token");
    console.log("userType1 ", mData.id);
    console.log("userType2 ", mData.userType);
    this.setState({
      authToken: token,
      userId: mData.id,
      userTypeId: mData.userType,
    });
  }

  getBidEvent = async (date) => {
    const data = {
      userId: this.state.userId,
      userType: this.state.userTypeId,
      date: date,
    };

    // fetch("https://mgeps-uat.philgeps.gov.ph/api/BuyerUsers/dashboard", {//Live UAT
    fetch(BID_EVENT_CAL_URL, {
      //Pune office UAT
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.state.authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        //Hide Loader
        //setLoading(false);
        console.log("BID_EVENT_CAL_URL", res);
        if (res) {
          this.setState({ bidEvent: res, modalVisible: true });
        }
      })
      .catch((error) => {
        //Hide Loader
        //setLoading(false);
        console.error("qwerty  ", error);
      });
  };

  renderItem = ({ item, index }) =>
    index === 0 ? (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("BidDetails", {
            link: item.bidNoticeToBeSubmitted.link,
            title: "Bid Event Calendar",
            subTitle: item.bidNoticeToBeSubmitted.label,
          });
          this.setState({ modalVisible: false });
        }}
        key={item.key}
        style={[
          styles.RectangleShapeView,
          { backgroundColor: AppColors.colorPrimary, marginLeft: 10, marginRight: 10 },
        ]}
      >
        <Text
          style={{
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            padding: 10,
            fontSize: 16,
          }}
        >
          {item.bidNoticeToBeSubmitted.label} (
          {item.bidNoticeToBeSubmitted.count})
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("BidDetails", {
            link: item.bidNoticeToBeOpen.link,
            title: "Bid Event Calendar",
            subTitle: item.bidNoticeToBeSubmitted.label,
          });
          this.setState({ modalVisible: false });
        }}
        key={item.key}
        style={[
          styles.RectangleShapeView,
          { backgroundColor: AppColors.AppOrange, marginLeft: 10, marginRight: 10 },
        ]}
      >
        <Text
          style={{
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            padding: 10,
            fontSize: 16,
          }}
        >
          {item.bidNoticeToBeOpen.label} ({item.bidNoticeToBeOpen.count})
        </Text>
      </TouchableOpacity>
    );

  render() {
    const { modalVisible } = this.state;

    return (
      <View style={styles.container}>


        <Modal
          transparent={true}
          animationType={"fade"}
          visible={modalVisible}
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around",
            backgroundColor: "#00000040",
          }}
          //   onRequestClose={() => {
          //     console.log("Modal has been closed.");
          //   }}
          onRequestClose={() => {
            this.props.navigation.navigate("HomeScreen");
            this.setState({ modalVisible: false });
          }}
        >
          <View style={[styles.modalBackground, {width: 450}]}>
            <View style={[styles.activityIndicatorWrapper, {margin: 50}]}>
              <View
                style={{
                  flex: 0.5,
                  width: "80%",
                  height: 40,
                  alignSelf: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../Image/logo_192.png")}
                  style={[styles.image]}
                />
                <Text style={[styles.hyperLinkText]}>
                  Bid Event Calendar Menus
                </Text>
              </View>

              <View style={{ backgroundColor: "white", flex: 1, marginTop: 8 }}>
                <FlatList
                  data={this.state.bidEvent}
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => index.toString}
                />
                <View style={{ backgroundColor: AppColors.red300 }}>
                  <Button
                    title="CLOSE"
                    buttonStyle={{
                      width: 400,
                      marginTop: 60,
                      marginBottom: 20,
                      borderRadius: 16,
                      backgroundColor: AppColors.red300,
                    }}
                    onPress={() => {
                      this.setState({ modalVisible: false });
                      this.props.navigation.navigate("HomeScreen");
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <DatePicker
          ref={(ref) => (this.datePickerRef = ref)}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="DD-MM-YYYY"
          // minDate="2016-05-01"
          // maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(mdate) => {
            this.getBidEvent(mdate);
            this.setState({ data: mdate });
          }}
          onCloseModal ={()=>{
            this.setState({ modalVisible: false });
            this.props.navigation.navigate("HomeScreen");
          }}
          visible={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // alignSelf: "center",
    // alignItems: "center",
    // alignContent: "center",
    //backgroundColor: "#ecf0f1",
  },

  modalBackground: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: "40%",
    width: "60%",
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
  paragraph: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 20,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    justifyContent: "center",
  },
  hyperLinkText: {
    color: AppColors.colorPrimary,
    fontSize: 18,
    fontWeight: "bold",
    height: 80,
  },
  RectangleShapeView: {
    marginTop: 20,
    width: 120 * 2,
    height: 40,
    backgroundColor: "#FFC107",
  },
});
