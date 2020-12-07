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
    fontSize: 12,
    flex: 1,
    marginLeft: 10,
    color: "#FFFFFF",
    alignSelf: "center",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 8,
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
    paddingVertical: 10,
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
    paddingVertical: 8,
    paddingHorizontal: 3,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
  },
});
