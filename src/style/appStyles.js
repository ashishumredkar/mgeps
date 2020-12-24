import React, {Fragment} from 'react';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import {AppColors} from './AppColors';



export const AppDimens = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};

export const SeperatorView = (props) => {
  return (
    <View
      style={{
        height: 6,
        width: 100,
        backgroundColor: AppColors.AppGrey002,
        borderRadius: 10,
      }}
    />
  );
};



// STATUS BAR
export const LighStatus = () => {
  return (
    <StatusBar backgroundColor={AppColors.AppYellow} barStyle="light-content" />
  );
};

export const BlackStatus = () => {
  return (
    <StatusBar
      backgroundColor={AppColors.AppBlack02}
      barStyle="light-content"
    />
  );
};

export const DarkStatus = () => {
  return (
    <StatusBar backgroundColor={AppColors.white} barStyle="dark-content" />
  );
};

// GLOBAL STYLES
export const gStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  radiocontainer: {
    marginBottom: 35,
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 30,
  },

  drawerMenu: {
    flexDirection: "row",
    marginTop: 2,
    marginBottom: 2,
    height: 10,
  },

  drawerText: {
    height: 25,
    marginTop: 5,
    marginLeft: 10,
    fontWeight: "bold",
  },

  radioText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#000',
    fontWeight: '700',
  },

  radioCircle: {
    height: 25,
    width: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: AppColors.AppOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: AppColors.AppOrange,
  },
  result: {
    marginTop: 20,
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#F3FBFE',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
  cameraButton: {
    backgroundColor: AppColors.AppYellow,
    width: 50,
    height: 50,
    borderWidth: 5,
    borderColor: AppColors.white,
    borderRadius: 25,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  containerAround: {
    backgroundColor: AppColors.white,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  containerFlex: {
    backgroundColor: AppColors.white,
    flex: 1,
  },
  containView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddH32: {
    paddingHorizontal: 32,
  },
  paddH16: {
    paddingHorizontal: 16,
  },
  paddH8: {
    paddingHorizontal: 8,
  },
  justifyCenter: {justifyContent: 'center'},
  alignItems: {alignItems: 'center'},
  alignItemsFullWidth: {
    alignItems: 'flex-start',
    width: '100%',
  },
  flexRow: {flexDirection: 'row'},
  flexColumn: {flexDirection: 'column'},
  itemSeperator1: {
    width: '100%',
    borderColor: AppColors.AppGrey002,
    borderWidth: 0.2,
    marginHorizontal: 16,
  },
  contactStyle: {
    fontSize: 17,
    color: AppColors.colorPrimary,
    fontWeight: 'bold'
  },
  nameLabel: {
    color: AppColors.AppBlack02,
    fontWeight: 'bold',
    fontSize: 18,
  },
  userAvatarStyle: {
    width: 50,
    height: 50,
    color: AppColors.AppGrey002,
    fontWeight: 'bold',
    borderRadius: 50/2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Platform.OS == "ios" ? -100 : -40,
  },
  userProfileNameStyle: {
    width: 50,
    height: 50,
    color: AppColors.AppGrey0015,
    fontWeight: 'bold',
    borderRadius: 50/2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
  },
  subMenuLinking: {
    width: 50,
    height: 50,
    color: AppColors.AppGrey002,
    fontWeight: 'bold',
    borderRadius: 50/2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
  },
  contactsView: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    width: 50,
    height: 50,
    right: 0,
    bottom: 0,
  },
  fabStyle1: {
    width: 50,
    height: 50,
  },
  profilePicView: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    backgroundColor: AppColors.AppGrey001,
  },
  checkboxText: {
  
    color: AppColors.AppBlack,
    fontSize: 15,
  },
  textInputIcon: {position: 'absolute', bottom: 15, left: 0, zIndex: 2},
});

export const Skeletons = {
  placesView: {
    marginBottom: 20,
    children: [
      {
        width: '20%',
        height: 20,
        marginBottom: 10,
      },
      {
        width: '80%',
        height: 15,
      },
    ],
  },

  NearbyContacts: {
    flexDirection: 'row',
    children: Array(10).fill({
      marginLeft: 20,
      children: [
        {
          width: 60,
          height: 60,
          borderRadius: 30,
          marginBottom: 10,
        },
        {
          width: 60,
          height: 20,
          borderRadius: 5,
          marginBottom: 10,
        },
      ],
    }),
  },

  contactView: {
    flexDirection: 'row',
    marginBottom: 30,

    children: [
      {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
      },
      {
        width: '80%',
        height: 40,
      },
    ],
  },

  simplelist: {
    // flexDirection: 'row',
    marginBottom: 30,
    children: [
      {
        width: '100%',
        height: 40,
      },
    ],
  },
};
