import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
// import {withNavigation} from '@react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';

function BackButton(props)  {
    // constructor(props) {
    //     super(props);     
    // }
    const navigation = useNavigation();

   
      if(Platform.OS === 'ios'){     
        return (
            <TouchableOpacity
            onPress={() => navigation.goBack()}>  
            <View style={{ padding:10, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="arrow-back-ios" size={25} color="#FFFFFF" />  
            </View>
            </TouchableOpacity>
          );
      }else{
        return (
            <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <View style={{  padding:10,justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="arrow-back" size={25} color="#FFFFFF" />     
            
            </View>
            </TouchableOpacity>
          );
      }
    
  
}
export default BackButton;