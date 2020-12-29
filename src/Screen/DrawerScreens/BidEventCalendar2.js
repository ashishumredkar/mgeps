import React, { useState, useEffect, createRef, useRef } from "react";
import { useFocusEffect } from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Modal,
  Button,
  TouchableOpacity,LogBox
} from "react-native";

import DatePicker from "react-native-datepicker";
import { AppColors } from "../../style/AppColors";
import Loader from "../Components/Loader";
import AsyncStorage from "@react-native-community/async-storage";
const STORAGE_KEY = "@user_data";
import { BID_EVENT_CAL_URL } from "../Utils";

const BidEventCalndar = ({ navigation }) => {
  
  const [isVisible, setisVisible] = useState(false); //kiranab
  const [checked, setchecked] = useState(true); //dsa@1234
  const [date, setdate] = useState(new Date());
  const [modalVisible, setmodalVisible] = useState(false);
  const [authToken, setauthToken] = useState("");

  const [isuserId, setuserId] = useState(false);

  const [loginType, setLoginType] = useState();
  const [userTypeId, setuserTypeId] = useState();

  const [bidEvent, setbidEvent] = useState([]);

  const [picker, setpicker] = useState(false);
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [loading, setloading] = useState(false);
  var pickerRef = useRef()
  var today = new Date();
  var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  useFocusEffect(
    React.useCallback(() => {
      // readData();
     //pickerRef.onPressDate();

      // return () => unsubscribe();
    }, [])
  );

  useEffect(() => {
    alert("ashish")
    readData();
  }, []);

  const readData = async () => {
    const userData = await AsyncStorage.getItem(STORAGE_KEY);
    const mData = JSON.parse(userData);
    const token = await AsyncStorage.getItem("auth_token");
    console.log("userType1 ", mData.id);
    console.log("userType2 ", mData.userType);
    pickerRef.onPressDate();
    setauthToken(token)
    setuserId(mData.id);
    setuserTypeId(mData.userType)
    
  }

  const getBidEvent = async (date) => {
    const data = {
      userId: this.state.userId,
      userType: this.state.userTypeId,
      date: date,
    };

    console.log("getBidEvent ",data)

    this.setState({ loading: true });

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
          this.props.navigation.navigate("BidDetails", {
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
          this.props.navigation.navigate("BidDetails", {
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
    
   const renderPicker =() =>{
     
   
        return (
          <DatePicker
            style={{ width: 200 }}
            ref={picker => {
              pickerRef = picker;
            }}
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
              this.setState({ data: mdate });
            }}
            onCloseModal ={()=>{
              setmodalVisible(false)
              this.props.navigation.navigate("HomeScreen");
            }}
            isVisible={true}

          />
        );
      
    }

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
          onRequestClose={() => {
            this.props.navigation.replace("HomeScreen");
           
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
                  keyExtractor={(item, index) => index.toString}
                />
                <View>
                <TouchableOpacity
                  onPress={() => {
                    setmodalVisible(false)
                    this.props.navigation.replace("HomeScreen");
                  }}
                  style={{ backgroundColor: AppColors.red300, marginLeft: 10, marginRight: 10, borderRadius: 6, padding: 10, marginBottom: 10 }}>
                    <Text style={{fontSize: 14, fontWeight: "bold", textAlign: "center", color: AppColors.white}}>CLOSE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <DatePicker
            style={{ width: 200 }}
            ref={picker => {
              pickerRef = picker;
            }}
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
              this.setState({ data: mdate });
            }}
            onCloseModal ={()=>{
              setmodalVisible(false)
              this.props.navigation.navigate("HomeScreen");
            }}
            isVisible={true}

          />
       
      </View>
    );
       
   

}
export default BidEventCalndar;


// export default class BidEventCalndar extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.datePicker=React.createRef();
//     this.state = {
//       isVisible: false,
//       checked: true,
//       date: new Date(),
//       modalVisible: false,
//       authToken: "",
//       userId: "",
//       userTypeId: "",
//       bidEvent: [],
//       picker:false,
//       isDatePickerVisible:false
//     };

//     console.log("Calling \n\\n\n\\n\n\n\\n\n\\nn\\n\n");
//   }
//   componentWillUnmount() {
//      this.datePicker = null;
//      console.log("Calling \n\\n\n\\n\n\n\\n\n\\nn\\n\n");
//   }

//   async componentDidMount() {
//     console.log("Calling 13234234234234324234 \n\\n\n\\n\n\n\\n\n\\nn\\n\n");
//     LogBox.ignoreAllLogs(['Animated: `useNativeDriver`']);

//     const userData = await AsyncStorage.getItem(STORAGE_KEY);
//     const mData = JSON.parse(userData);
//     const token = await AsyncStorage.getItem("auth_token");
//     console.log("userType1 ", mData.id);
//     console.log("userType2 ", mData.userType);
//     this.openPicker();
//     this.setState({
//       authToken: token,
//       userId: mData.id,
//       userTypeId: mData.userType,
//     });
//   }

// openPicker =()=>{
//   this.datePicker.onPressDate();
//   this.setState({ isVisible: true ,isDatePickerVisible:true});
// }

//   getBidEvent = async (date) => {
//     const data = {
//       userId: this.state.userId,
//       userType: this.state.userTypeId,
//       date: date,
//     };

//     console.log("getBidEvent ",data)

//     this.setState({ loading: true });

//     fetch(BID_EVENT_CAL_URL, {
//       //Pune office UAT
//       method: "POST",
//       headers: {
//         Authorization: "Bearer " + this.state.authToken,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((res) => {
//         //Hide Loader
//         //setLoading(false);
//         console.log("BID_EVENT_CAL_URL", res);
//         if (res) {
//           this.setState({ bidEvent: res, modalVisible: true });
//         }
//         this.setState({ loading: false });
//       })
//       .catch((error) => {
//         //Hide Loader
//         //setLoading(false);
//         console.error("qwerty  ", error);
//         this.setState({ loading: false });
//       });
//   };

//   renderItem = ({ item, index }) =>
//     index === 0 ? (
//       <TouchableOpacity
//         onPress={() => {
//           this.props.navigation.navigate("BidDetails", {
//             link: item.bidNoticeToBeSubmitted.link,
//             title: "Bid Event Calendar",
//             subTitle: item.bidNoticeToBeSubmitted.label,
//           });
//           this.setState({ modalVisible: false });
//         }}
//         key={item.key}
//         style={[
//           styles.RectangleShapeView,
//           { backgroundColor: AppColors.blue400, marginLeft: 5, marginRight: 5, borderRadius: 6 },
//         ]}
//       >
//         <Text
//           style={{
//             alignContent: "center",
//             alignItems: "center",
//             alignSelf: "center",
//             padding: 5,
//             fontSize: 14,
//             fontWeight: "bold",
//             color: AppColors.white,
//             marginTop: 5,
//           }}
//         >
//           {item.bidNoticeToBeSubmitted.label} (
//           {item.bidNoticeToBeSubmitted.count})
//         </Text>
//       </TouchableOpacity>
//     ) : (
//       <TouchableOpacity
//         onPress={() => {
//           this.props.navigation.navigate("BidDetails", {
//             link: item.bidNoticeToBeOpen.link,
//             title: "Bid Event Calendar",
//             subTitle: item.bidNoticeToBeOpen.label,
//           });
//           this.setState({ modalVisible: false });
//         }}
//         key={item.key}
//         style={[
//           styles.RectangleShapeView,
//           { backgroundColor: AppColors.purpleLight, marginLeft: 10, marginRight: 10, borderRadius: 6 },
//         ]}
//       >
//         <Text
//           style={{
//             alignContent: "center",
//             alignItems: "center",
//             alignSelf: "center",
//             padding: 5,
//             fontSize: 14,
//             fontWeight: "bold",
//             color: AppColors.white,
//             marginTop: 5,
//           }}
//         >
//           {item.bidNoticeToBeOpen.label} ({item.bidNoticeToBeOpen.count})
//         </Text>
//       </TouchableOpacity>
//     );

//     renderPicker() {
//       var today = new Date();
//       var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//       var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
   
//         return (
//           <DatePicker
//             style={{ width: 200 }}
//             ref={picker => {
//               this.datePicker = picker;
//             }}
//             date={this.state.date}
//             mode="date"
//             placeholder="Select date baba"
//             format="YYYY-MM-DD"
//             minDate={firstDayOfMonth}
//             maxDate={lastDayOfMonth}
//             confirmBtnText="OK"
//             cancelBtnText="Cancel"
//             onDateChange={(mdate) => {
//               this.getBidEvent(mdate);
//               this.setState({ date: mdate });
//             }}
//             onCloseModal ={()=>{
//               this.setState({ modalVisible: false });
//               this.props.navigation.navigate("HomeScreen");
//             }}
//             isVisible={true}

//           />
//         );
      
//     }
//   render() {
//     if (this.state.loading) return <Loader loading={this.state.loading} />;
//     const { modalVisible } = this.state;

//     return (
//       <View style={styles.container}>

//         <Modal
//           transparent={true}
//           animationType={"fade"}
//           visible={modalVisible}
//           style={{
//             flex: 1,
//             flexDirection: "column",
//             justifyContent: "space-around",
//             backgroundColor: "#00000040",
//           }}
//           onRequestClose={() => {
//             this.props.navigation.replace("HomeScreen");
//             this.setState({ modalVisible: false });
//           }}
//         >
//           <View style={[styles.modalBackground, {width: 450}]}>
//             <View style={[styles.activityIndicatorWrapper, {margin: 50}]}>
//               <View
//                 style={{
//                   flex: 0.5,
//                   width: "80%",
//                   height: 40,
//                   alignSelf: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Image
//                   source={require("../../Image/logo_192.png")}
//                   style={[styles.image]}
//                 />
//                 <Text style={[styles.hyperLinkText]}>
//                   Bid Event Calendar Menus
//                 </Text>
//               </View>

//               <View style={{ backgroundColor: "white", flex: 1, marginTop: 8 }}>
//                 <FlatList
//                   data={this.state.bidEvent}
//                   renderItem={this.renderItem}
//                   keyExtractor={(item, index) => index.toString}
//                 />
//                 <View>
//                 <TouchableOpacity
//                   onPress={() => {
//                     this.setState({ modalVisible: false });
//                     this.props.navigation.replace("HomeScreen");
//                   }}
//                   style={{ backgroundColor: AppColors.red300, marginLeft: 10, marginRight: 10, borderRadius: 6, padding: 10, marginBottom: 10 }}>
//                     <Text style={{fontSize: 14, fontWeight: "bold", textAlign: "center", color: AppColors.white}}>CLOSE</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </Modal>
//         {this.renderPicker()}
//         {/* <DatePicker
//            ref={(picker) => { this.datePickerRef = picker; }}
//           // ref={(ref) => (this.datePickerRef = ref)}
//           date={this.state.date}
//           mode="date"
//           placeholder="select date"
//           format="DD-MM-YYYY"
//           // minDate="2016-05-01"
//           // maxDate="2016-06-01"
//           confirmBtnText="Confirm"
//           cancelBtnText="Cancel"
//           customStyles={{
//             dateIcon: {
//               position: "absolute",
//               left: 0,
//               top: 4,
//               marginLeft: 0,
//             },
//             dateInput: {
//               marginLeft: 36,
//             },
//             // ... You can check the source to find the other keys.
//           }}
//           onDateChange={(mdate) => {
//             this.getBidEvent(mdate);
//             this.setState({ data: mdate });
//           }}
//           onCloseModal ={()=>{
//             this.setState({ modalVisible: false });
//             this.props.navigation.navigate("HomeScreen");
//           }}
//           visible={false}
//         /> */}
//       </View>
//     );
//   }
// }

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
