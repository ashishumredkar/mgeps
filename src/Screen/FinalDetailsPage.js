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
export const  Divider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

export default class FinalDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      data: [
        {
          id: 1,
          name: "Mark Doe",
          position: "CEO",
          image: "https://bootdey.com/img/Content/avatar/avatar7.png",
          about:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
        },
        {
          id: 2,
          name: "John Doe",
          position: "CTO",
          image: "https://bootdey.com/img/Content/avatar/avatar1.png",
          about:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
        },
        {
          id: 3,
          name: "Clark Man",
          position: "Creative designer",
          image: "https://bootdey.com/img/Content/avatar/avatar6.png",
          about:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
        },
        {
          id: 4,
          name: "Jaden Boor",
          position: "Front-end dev",
          image: "https://bootdey.com/img/Content/avatar/avatar5.png",
          about:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
        },
        {
          id: 5,
          name: "Srick Tree",
          position: "Backend-end dev",
          image: "https://bootdey.com/img/Content/avatar/avatar4.png",
          about:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
        },
        {
          id: 6,
          name: "John Doe",
          position: "Creative designer",
          image: "https://bootdey.com/img/Content/avatar/avatar3.png",
          about:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
        },
        {
          id: 7,
          name: "John Doe",
          position: "Manager",
          image: "https://bootdey.com/img/Content/avatar/avatar2.png",
          about:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
        },
        {
          id: 8,
          name: "John Doe",
          position: "IOS dev",
          image: "https://bootdey.com/img/Content/avatar/avatar1.png",
          about:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
        },
        {
          id: 9,
          name: "John Doe",
          position: "Web dev",
          image: "https://bootdey.com/img/Content/avatar/avatar4.png",
          about:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
        },
        {
          id: 10,
          name: "John Doe",
          position: "Analyst",
          image: "https://bootdey.com/img/Content/avatar/avatar7.png",
          about:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
        },
      ],
    };
  }

  async componentDidMount(){


    const mData=this.props.route.params.data;

    this.setState({userSelected:mData})

    console.log("faltusala ",mData.urlParameter)


  }
  clickEventListener = (item) => {
    this.setState({ userSelected: item }, () => {
      this.setModalVisible(true);
    });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {

    const {userSelected}=this.state;
    return (
      <View style={styles.container}>

<View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Details</Text>
            </View>
            <View style={styles.cardContent}>
              {/* {this.__renderColors()} */}
            </View>
          </View>
        <View style={styles.card}>
          <View
            style={{
                width:'100%',
                height:'80%',
              flexDirection: "column",
              alignItems: "flex-start",
              alignContent: "flex-start",
            }}
          >
            <Text style={styles.name}>Tender Id {}</Text>
            <Divider/>
            <Text style={styles.name}>Notice Reference Number {}</Text>
            <Divider/>

            <Text style={styles.name}>Control Number {}</Text>
            <Divider/>

            <Text style={styles.name}>Projct Title {}</Text>
            <Divider/>

            <Text style={styles.name}>Notice Title{}</Text>
            <Divider/>

            <Text style={styles.name}>Mode of proc {}</Text>
            <Divider/>

            <Text style={styles.name}>Business Category {}</Text>
            <Divider/>

            <Text style={styles.name}>Applicable Proc Rule{}</Text>
            <Divider/>

            <Text style={styles.name}>Source Funds {}</Text>
            <Divider/>

            <Text style={styles.name}>Mode of bid Submission {}</Text>
            <Divider/>

            <Text style={styles.name}>Delivery Location {}</Text>
            <Divider/>

            <Text style={styles.name}>Classification{}</Text>
            <Divider/>


            <Text style={styles.name}>Lot Type {}</Text>
            <Divider/>

            <Text style={styles.name}>Created By {}</Text>
            <Divider/>

            <Text style={styles.name}>Created By UserName {}</Text>
            <Divider/>

            <Text style={styles.name}>Created By email {}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 :0,
    backgroundColor:"#ebf0f7",
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

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor:"white",
    marginHorizontal: 5,
    flexDirection: "column",
  },
  cardTitle:{
    color:"#00BFFF",
    fontSize: 18,
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginStart:5
  },

  name: {
    fontSize: 18,
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
