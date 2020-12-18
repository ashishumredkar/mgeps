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
import DatePicker from "react-native-datepicker";
import { TouchableHighlight } from "react-native-gesture-handler";
import { AppColors } from "../../style/AppColors";
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
    };
  }

  async componentDidMount() {
    this.datePickerRef.onPressDate();
    this.setState({ isVisible: true });
  }

  renderItem = ({ item }) => (
    <View
      key={item.key}
      style={{
        marginTop: 20,
        borderRadius: 16,
        backgroundColor: AppColors.red300,
      }}
    >
      <Text>{item.title}</Text>
    </View>
  );

  render() {
    const { modalVisible } = this.state;

    return (
      <View style={styles.container}>
        <DatePicker
          ref={(ref) => (this.datePickerRef = ref)}
          style={{ width: 200 }}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
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
          onDateChange={(date) => {
            // alert(date)
            this.setState({ modalVisible: true });
          }}
          visible={false}
        />

        <Modal
          transparent={true}
          animationType={"none"}
          visible={modalVisible}
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around",
            backgroundColor: "#00000040",
          }}
          //   onRequestClose={() => {
          //     console.log("Modal has been closed.");
          //   }}
          onRequestClose={() => {
            // setShowModal(false);
            props.onCloseModal();
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <View
                style={{
                  flex: 0.4,
                  width: "100%",
                  alignSelf: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../Image/logo_192.png")}
                  style={[styles.image]}
                />
                <Text style={styles.hyperLinkText}>
                  Bid event Calendar Menus
                </Text>
              </View>

              <View style={{ backgroundColor: "white", flex: 1, marginTop: 15 }}>
                <FlatList
                  data={DATA}
                  renderItem={this.renderItem}
                  keyExtractor={(item) => item.id}
                />
                {/* <Button
              title="RETRY"
              buttonStyle={{
                marginTop: 20,
                borderRadius: 16,
                backgroundColor: AppColors.red300,
              }}
              onPress={() => props.onRety()}
            /> */}

                <Button
                  title="CLOSE"
                  buttonStyle={{
                    width:400,
                    flex:1,
                    marginTop: 20,
                    borderRadius: 16,
                    backgroundColor: AppColors.red300,
                  }}
                  onPress={() => props.onCloseModal()}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ecf0f1",
  },

  modalBackground: {
    flex: 1,
    width: "100%",
    alignItems: "center",
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
    fontSize: 14,
    fontWeight: "bold",
  },
});
