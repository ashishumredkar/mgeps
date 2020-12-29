import React, { useState, useEffect, createRef, useRef } from "react";
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Modal,
  Button,
  TouchableOpacity,SafeAreaView
} from "react-native";

import DatePicker from "react-native-datepicker";
import { BID_EVENT_CAL_URL } from "../Utils";
import { AppColors } from "../../style/AppColors";
import AsyncStorage from "@react-native-community/async-storage";
const STORAGE_KEY = "@user_data";

const BidEventCalndar = () => {
  const pickerRef = useRef()
  const dateRef = useRef()
  const [value, setValue] = useState()
  const dataset_1 = [1, 2, "Java", "Kotlin", "C++", "C#", "PHP"]

  const [modalVisible, setmodalVisible] = useState(false);
  const [authToken, setauthToken] = useState("");
  const [date, setdate] = useState(new Date());
  var today = new Date();
  var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const [bidEvent, setbidEvent] = useState([]);
  const [userId, setuserId] = useState();

  const [loginType, setLoginType] = useState();
  const [userTypeId, setuserTypeId] = useState();
  const [picker, setpicker] = useState(false);
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [loading, setloading] = useState(false);

  const useNav=useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      readData();
      dateRef.current.onPressDate()
    }, [userTypeId,userId])
  );

  useEffect(() => {
  
    readData();
  }, []);

  const readData = async () => {
    const userData = await AsyncStorage.getItem(STORAGE_KEY);
    const mData = JSON.parse(userData);
    const token = await AsyncStorage.getItem("auth_token");
   
    // pickerRef.onPressDate();
    setauthToken(token)
    setuserId(mData.id);
    setuserTypeId(mData.userType)
    
  }
  const getBidEvent = async (date) => {
    const data = {
      userId: userId,
      userType: userTypeId,
      date: date,
    };

    console.log("getBidEvent ",data)

    setloading(true)

    fetch(BID_EVENT_CAL_URL, {
      //Pune office UAT
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
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
          setbidEvent(res)
          setmodalVisible(true)
        }
        setloading(false)
      })
      .catch((error) => {
        //Hide Loader
        //setLoading(false);
        console.error("qwerty  ", error);
        setloading(false)
      });
  };

  const renderItem = ({ item, index }) =>
    index === 0 ? (
      <TouchableOpacity
        onPress={() => {
          useNav.navigate("BidDetails", {
            link: item.bidNoticeToBeSubmitted.link,
            title: "Bid Event Calendar",
            subTitle: item.bidNoticeToBeSubmitted.label,
          });
          setmodalVisible(false)        }}
        key={item.key}
        style={[
          styles.RectangleShapeView,
          { backgroundColor: AppColors.blue400, marginLeft: 5, marginRight: 5, borderRadius: 6 },
        ]}
      >
        <Text
          style={{
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            padding: 5,
            fontSize: 14,
            fontWeight: "bold",
            color: AppColors.white,
            marginTop: 5,
          }}
        >
          {item.bidNoticeToBeSubmitted.label} (
          {item.bidNoticeToBeSubmitted.count})
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          useNav.navigate("BidDetails", {
            link: item.bidNoticeToBeOpen.link,
            title: "Bid Event Calendar",
            subTitle: item.bidNoticeToBeOpen.label,
          });
          setmodalVisible(false)
        
        }}
        key={item.key}
        style={[
          styles.RectangleShapeView,
          { backgroundColor: AppColors.purpleLight, marginLeft: 10, marginRight: 10, borderRadius: 6 },
        ]}
      >
        <Text
          style={{
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            padding: 5,
            fontSize: 14,
            fontWeight: "bold",
            color: AppColors.white,
            marginTop: 5,
          }}
        >
          {item.bidNoticeToBeOpen.label} ({item.bidNoticeToBeOpen.count})
        </Text>
      </TouchableOpacity>
    );
  return (
    <>
      <SafeAreaView>
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
          onRequestClose={() => {
            useNav.replace("HomeScreen");
           
            setmodalVisible(false)
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
                  data={bidEvent}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => ""+index}
                />
                <View>
                <TouchableOpacity
                  onPress={() => {
                    setmodalVisible(false)
                    useNav.replace("HomeScreen");
                  }}
                  style={{ backgroundColor: AppColors.red300, marginLeft: 10, marginRight: 10, borderRadius: 6, padding: 10, marginBottom: 10 }}>
                    <Text style={{fontSize: 14, fontWeight: "bold", textAlign: "center", color: AppColors.white}}>CLOSE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
     
      <DatePicker
            style={{ width: 0,height:0 }}
          
            ref={dateRef}
            // ref={picker => {
            //   dateRef = picker;
            // }}
            date={date}
            mode="date"
            placeholder="Select date baba"
            format="YYYY-MM-DD"
            minDate={firstDayOfMonth}
            maxDate={lastDayOfMonth}
            confirmBtnText="OK"
            cancelBtnText="Cancel"
            onDateChange={(mdate) => {

              getBidEvent(mdate);
              setdate(mdate)
              // this.setState({ data: mdate });
            }}
            onCloseModal ={()=>{
              setmodalVisible(false)
              useNav.navigate("HomeScreen");
            }}
            isVisible={true}

          />
    </>
  )
}

export default BidEventCalndar

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