import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ScrollView,
  Platform,
} from "react-native";
import BottomView from "./BottomView";
import CustomToolbar from "./Components/CustomToolbar";
import GeneralStatusBarColor from "./Components/GeneralStatusBarColor";
import AsyncStorage from "@react-native-community/async-storage";

export const Divider = () => {
  return (
    <View
      style={{
        height: 0.5,
        width: "100%",
        backgroundColor: "grey",
      }}
    />
  );
};

export default class FinalDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      pageTitle: "",
      loading: false,
      userType: "Merchant",
      apiUrl: "",
      urlParameter: {},
      authToken: "",
    };
  }

  async componentDidMount() {
    const mData = this.props.route.params.data;
    const token = await AsyncStorage.getItem("auth_token");

    const userType = await AsyncStorage.getItem("userType");

    console.log("urlParameter ", mData);

    this.setState({
      authToken: token,
      userSelected: mData,
      pageTitle: mData.activityType,
      userType: userType,
      urlParameter: mData.urlParameter,
      apiUrl: mData.detailsUrl,
    });

    this.getDetails(token, mData.urlParameter, mData.detailsUrl);
  }

  getDetails = async (token, urlParams, url) => {
    this.setState({ loading: true });
    console.log("urlParams ", urlParams);
    const data = urlParams;
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader

        if (responseJson) {
          this.setState({ loading: false, userSelected: responseJson });
          this.sendAckForRead(
            this.state.authToken,
            responseJson.notificationId,
            responseJson.moduleName
          );
        }

        console.log("getDetails ", responseJson);
      })
      .catch((error) => {
        //Hide Loader
        //setLoading(false);
        console.log("getDetails ", error);
        this.setState({ loading: false });

        console.error("qwerty  ", error);
      })
      .finally(() => this.setState({ loading: false }));
  };

  sendAckForRead = async (token, notificationId, moduleName) => {
    const data = {
      moduleName: moduleName,
      notificationId: notificationId,
    };
    this.setState({ loading: true });
    fetch(
      "https://mgeps-uat.philgeps.gov.ph/api/BuyerUsers/readNotifcationApi",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        this.setState({ loading: false });

        console.log("sendAckForRead ", responseJson);
      })
      .catch((error) => {
        //Hide Loader
        //setLoading(false);
        this.setState({ loading: false });

        console.error("qwerty  ", error);
      })
      .finally(() => this.setState({ loading: false }));
  };

  clickEventListener = (item) => {
    this.setState({ userSelected: item }, () => {
      this.setModalVisible(true);
    });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { userSelected, userType, urlParameter } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <GeneralStatusBarColor
          backgroundColor="#D62223"
          barStyle="light-content"
        />

        <CustomToolbar
          navigation={this.props.navigation}
          title={this.state.pageTitle}
          userType={userType}
          backgroundColor="#3775f0"
        />
        <View style={{ flex: 0.9, margin: 8 }}>
          <View
            style={{
              height: 40,
              width: "100%",
              backgroundColor: "blue",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottomLeftRadius: 2,
            }}
          >
            <Text style={styles.cardTitle}>Details</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardContent} />

            <View
              style={{
                width: "100%",
                // height: "70%",
                flexDirection: "column",
                alignItems: "flex-start",
                alignContent: "flex-start",
              }}
            >
              <Text style={styles.name}>Tender Id {urlParameter.tenderId}</Text>
              <Divider />
              <Text style={styles.name}>
                Notice Reference Number {userSelected.noticeReferenceNumber}
              </Text>
              <Divider />

              <Text style={styles.name}>
                Control Number {userSelected.controlNumber}
              </Text>
              <Divider />

              <Text style={styles.name}>
                Projct Title {userSelected.projectTitle}
              </Text>
              <Divider />

              <Text style={styles.name}>
                Notice Title {userSelected.noticeTitle}
              </Text>
              <Divider />

              <Text style={styles.name}>
                Mode of proc {userSelected.modeOfProcurement}
              </Text>
              <Divider />

              <Text style={styles.name}>
                Business Category {userSelected.businessCategory}
              </Text>
              <Divider />

              <Text style={styles.name}>
                Applicable Proc Rule {userSelected.applicableProcRule}
              </Text>
              <Divider />

              <Text style={styles.name}>
                Source Funds {userSelected.sourceFunds}
              </Text>
              <Divider />

              <Text style={styles.name}>
                Mode of bid Submission {userSelected.modeOfBidSubmission}
              </Text>
              <Divider />

              <Text style={styles.name}>
                Delivery Location {userSelected.deliveryLocation}
              </Text>
              <Divider />

              <Text style={styles.name}>
                Classification {userSelected.classification}
              </Text>
              <Divider />

              <Text style={styles.name}>Lot Type {userSelected.lotType}</Text>
              <Divider />

              {/* <Text style={styles.name}>Created By {userSelected.createdBy}</Text> */}

              <Text style={{width:'100%'}}>
                <Text style={styles.name}>Created By</Text>
                <Text
                  style={{
                    flex:1,
                    fontSize: 14,
                     marginLeft:16,
                    alignContent:'center',
                    color: "grey",
                    fontWeight: "normal",
                  }}
                >
                  {userSelected.createdBy}
                </Text>
              </Text>
              <Divider />

              <Text style={styles.name}>
                Created By UserName {userSelected.createdByUsername}
              </Text>
              <Divider />

              <Text style={styles.name}>
                Created By email {userSelected.createdByEmail}
              </Text>
            </View>
          </View>
        </View>
        {this.state.isLoading && (
          <View style={{ flex: 1, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#ff6a00" />
          </View>
        )}
        <View style={{ flex: 0.1 }}>
          <BottomView />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#ebf0f7",
  },
  header: {
    backgroundColor: "#00CED1",
    height: 200,
  },
  headerContent: {
    padding: 10,
    alignItems: "flex-start",
    flex: 1,
  },
  detailContent: {
    top: 80,
    height: 500,
    width: Dimensions.get("screen").width - 90,
    marginHorizontal: 30,
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#ffffff",
  },
  userList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  BorderClass: {
    // Setting up image width.
    width: 160,

    // Setting up image height.
    height: 160,

    // Set border width.
    borderWidth: 1,

    // Set border color.
    borderColor: "#F44336",
  },
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    // marginVertical: 5,
    backgroundColor: "white",
    // marginHorizontal: 5,
    flexDirection: "column",
    marginBottom: 16,

    borderWidth: 1,
    borderRadius: 12,
    padding: 8,

    // Set border color.
    borderColor: "blue",
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    alignSelf: "flex-start",
    alignContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    margin: 5,
  },

  name: {
    fontSize: 14,
    alignSelf: "flex-start",
    color: "black",
    fontWeight: "bold",
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#696969",
  },
  about: {
    marginHorizontal: 10,
  },

  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  /************ modals ************/
  popup: {
    backgroundColor: "white",
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30,
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height: 250,
  },
  popupHeader: {
    marginBottom: 45,
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent: "center",
  },
  popupButton: {
    flex: 1,
    marginVertical: 16,
  },
  btnClose: {
    height: 20,
    backgroundColor: "#20b2aa",
    padding: 20,
  },
  modalInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
});
