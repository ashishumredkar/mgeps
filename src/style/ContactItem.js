import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable,  } from 'react-native';
import { gStyles } from './appStyles';

import { AppColors } from './AppColors';



export const ContactItem = (props) => {

  let listItem = props.listItem;

  let authToken=props.authToken

  

  let [selected, setSelection] = useState(listItem.isSelected);
  let [isInvite, setIsInvite] = useState(listItem.userFound);

  //its a must to have this check so that whenever data changes reflects back here
  useEffect(() => {
    setSelection(listItem.isSelected)
  }, [listItem.isSelected])

 
  const sendInvite =(contactData)=>{


      const data = {

          "contacts" : [(contactData)]
      }
      console.log("sendInviteerr  ",data)
      api.sendInvite(data,authToken, (err, res) => {
        if (err) {

           console.log("sendInviteerr  ",err)

        }
        else {
         
          if (res.status === 200) {
            
            Toast.showWithGravity(res.message, Toast.LONG, Toast.CENTER);

          } else {

          }

        }
      })
    }



  return (
    <Pressable
      // onPress={() => props.onItemTap('Item Clicked'+JSON.stringify(listItem))}
      style={gStyles.contactsView}>
      {listItem.hasThumbnail ? (
        <Image
          style={gStyles.userAvatarStyle}
          source={{ uri: listItem.thumbnailPath }}
        />
      ) : (
          <View style={[gStyles.userAvatarStyle]}>
            <Text>
              {listItem.givenName.charAt(0) + listItem.familyName.charAt(0)}
            </Text>
          </View>
        )}

      <View style={{ width: 10 }}></View>

      {/* CONTACT DETAILS  */}
      <View>
        <Text style={gStyles.contactStyle}>
          {listItem.givenName} {listItem.middleName} {listItem.familyName}
        </Text>
        <Text>
          {listItem.phoneNumbers === undefined ||
            listItem.phoneNumbers.length === 0
            ? ''
            : listItem.phoneNumbers[0].number}
        </Text>
        
      </View>
      
    </Pressable>
  );
};