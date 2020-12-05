import React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import BackButton from './BackButton'; 
// import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { gStyles } from '../../style/appStyles';

import OptionMenu from '../Components/OptionMenu'
const myIcon = (<Icon name="more-vert" size={30} color="white" />)
import { useNavigation } from '@react-navigation/native';

//  class CustomToolbar extends React.Component {
  const CustomToolbar = (props) => {

    const navigation = useNavigation();

    const navSettings =()=>{
      navigation.navigate("settingScreenStack")
    }
   
  
    return (
        <View style={[styles.navBar,{backgroundColor:props.backgroundColor}]}>
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
       source={require('../../Image/menu_logo.png')}
   />
         </View>
       

       <View style={{ width: 10 }}></View>

       {/* CONTACT DETAILS  */}
       <View style={{ paddingTop: 8 }}>
         <Text style={[gStyles.contactStyle,{color:'white',fontSize:18}]}>
         {props.title} 
         </Text>
         <Text style={[{color:'white',fontSize:14}]}>
          UserType: {props.userType} 
         </Text>
       </View>
     </View>
        </Text>
        <View style={styles.rightContainer}>
          <View style={styles.rightIcon}>
          <OptionMenu
  customButton={myIcon}
  destructiveIndex={1}
  options={["Settings",undefined]}
  actions={[navSettings]}/>
              </View>
            
        </View>
      </View>
      );
    
    
  
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