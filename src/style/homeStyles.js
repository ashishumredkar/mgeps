import React, { Fragment } from "react";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import { AppColors } from "./AppColors";

export const AppDimens = {
  width: Dimensions.get("screen").width,
  height: Dimensions.get("screen").height,
};

// GLOBAL STYLES
export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  container2: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 12,
  },
  list: {
    //backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  cardImage2: {
    flex: 1,
    marginTop: "46%",
    height: 70,
    width: 70,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },
  image: {
    width: 35,
    height: 35,
    resizeMode: "cover",
    resizeMode: "cover",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  icon: {
    height: 20,
    width: 20,
  },
  title: {
    fontSize: 18,
    flex: 1,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 14,
    flex: 1,
    marginLeft: 5,
    color: "#FFFFFF",
    alignSelf: "center",
    fontWeight: "normal",
    width: "100%",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 2,
    paddingBottom: 1,
    paddingHorizontal: 5,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    width: 40,
    height: 40,
    borderRadius: 50 / 2,
    overflow: "hidden",
    margin: 2,
  },
  cardHeader: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
  },
  card: {
    marginHorizontal: 2,
    marginVertical: 2,
    flexBasis: "48%",
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 8,
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  footerSpace: {
    paddingVertical: 5,
    paddingHorizontal: 3,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
  },
  facebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  imageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  textStyle: {
    color: '#fff',
    marginBottom: 4,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  iconSeparatorStyle: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },

  center: {
    alignSelf: "center", 
    alignItems: "center", 
    alignContent: "center"
  },

  retryImage: {
    flex: 1,
    marginTop: "46%",
    height: 70,
    width: 70,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },

  retryText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
});
