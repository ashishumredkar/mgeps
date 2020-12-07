import React, {Fragment} from 'react';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import {AppColors} from './AppColors';

export const AppDimens = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};

// GLOBAL STYLES
export const listStyles = StyleSheet.create({
    viewColumn: {
        flexDirection: "column",
        margin: 5
    },
    viewRow: {
        flexDirection: "row",
        fontWeight: "normal"
    },
    title: {
        color: AppColors.colorPrimary,
        fontSize: 16,
        flex: 1,
        width: '80%'
    },
    notificationIconView: {
        flexDirection: "row-reverse", 
        width: 30
    },
    notificationIcon: {
        marginRight: 5,
        height: 28,
        width: 28
    },
    notificationText: {
        color: "black", 
        fontSize: 14
    },
    totalRowsView: {
        flex: 1,
        marginBottom: 80,
        width: "100%",
        height: 30,
        justifyContent: "center",
        alignItems: "flex-end",
        position: "absolute", //Here is the trick
        bottom: 0, //Here is the trick,
    },
    textShadow: {
        fontWeight: "bold",
        fontSize: 16,
        backgroundColor: "white",
        color: "#FFFFFF",
        fontFamily: "Times New Roman",
        paddingLeft: 5,
        paddingRight: 5,
        textShadowColor: "#585858",
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        borderColor: "red",
        borderWidth: 1,
        marginRight: 10,
        borderRadius: 8,
    },
    textStyle: {
        color: "black",
        fontSize: 16,
        marginRight: 5,
        marginTop: 4,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      },
});
