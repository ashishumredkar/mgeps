import React, {Fragment} from 'react';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import {AppColors} from './AppColors';

export const AppDimens = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};

// GLOBAL STYLES
export const homeStyles = StyleSheet.create({
    title: {
        fontSize: 18,
        flex: 1,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    subTitle: {
        fontSize: 12,
        flex: 1,
        marginLeft: 10,
        color: "#FFFFFF",
        alignSelf: "center",
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "white",
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: "row",
    },
    card: {
        marginHorizontal: 2,
        marginVertical: 2,
        flexBasis: "45%",
        margin: 40,
        borderRadius: 10
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
});
