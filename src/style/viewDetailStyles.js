import React, { Fragment } from "react";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import { AppColors } from "./AppColors";

export const AppDimens = {
  width: Dimensions.get("screen").width,
  height: Dimensions.get("screen").height,
};

// GLOBAL STYLES
export const viewDetailStyles = StyleSheet.create({
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
    borderRadius: 0,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,

    padding: 5,

    // Set border color.
    borderColor: "blue",
  },
  cardTitle: {
    color: "white",
    fontSize: 14,
    alignSelf: "flex-start",
    alignContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    margin: 5,
    height: 30,
  },

  name: {
    fontSize: 14,
    alignSelf: "flex-start",
    color: "black",
    fontWeight: "bold",
    color: AppColors.AppGrey600,
    marginRight: 8,
    width: "30%",
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
  notificationLabel: {
    flexDirection:'row',
    borderRadius: 10,
    marginRight: 2,
    marginLeft: 2,
    marginBottom: 2,
  },
  notificationValue: {
    // flex: 1,
    fontSize: 14,
    marginLeft: 16,
    alignContent: "center",
    color: "grey",
    fontWeight: "normal",
    paddingLeft: 5,
    width: "70%",
  }
});
