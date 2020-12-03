import React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import BackButton from './BackButton'; 
// import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { gStyles } from '../../style/appStyles';
 
 class CustomToolbar extends React.Component {
    constructor(props) {
        super(props);     
    }
    
  render() {
    return (
        <View style={[styles.navBar,{backgroundColor:this.props.backgroundColor}]}>
        <View style={styles.leftContainer}>
         <BackButton/>   
        </View>
        <Text style={styles.middleContainer}>
         {/* {this.props.title} */}
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
         {this.props.title} 
         </Text>
         <Text style={[{color:'white',fontSize:14}]}>
          UserType: {this.props.userType} 
         </Text>
       </View>
     </View>
        </Text>
        <View style={styles.rightContainer}>
          <View style={styles.rightIcon}>
          {/* <Icon name="ios-search" size={25} color="#000000" /> */}
              </View>
              <View style={styles.rightIcon}>
          <Icon name="options-vertical" size={25} color="white" />
              </View>
        </View>
      </View>
      );
    
    
  }
}
export default CustomToolbar;
const styles = StyleSheet.create({
    navBar: {
      height: 54,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 1,
    },
    leftContainer: {
      justifyContent: 'flex-start',   
      flexDirection: 'row'
    },
    middleContainer: {
        flex: 2,
        color: 'white',
        flexDirection: 'row',
        fontSize:18,
        marginLeft: 10,
        marginRight:10
      },
    rightContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    rightIcon: {
    paddingHorizontal:20,
      resizeMode: 'contain',
    //   backgroundColor: 'white',
    }
  });