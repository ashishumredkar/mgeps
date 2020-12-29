import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default class RadioButton extends Component {
  state = {
    value: null,
  };

  render() {
    const { PROP } = this.props;
    const { value } = this.state;

    return (
      <View>
        {PROP.map((res) => {
          return (
            <View key={res.key} style={styles.container}>
              <TouchableOpacity
                style={styles.radioCircle}
                onPress={() => {
                  this.setState({
                    value: res.key,
                  });
                }}
              >
                {value === res.key && <View style={styles.selectedRb} />}
              </TouchableOpacity>
              <Text style={styles.radioText}>{res.text}</Text>
            </View>
          );
        })}
        <Text> Selected: {this.state.value} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioText: {
      padding:12,
    marginRight: 35,
    fontSize: 16,
    color: "#000",
    fontWeight: "700",
  },
  radioCircle: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#e9515f",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: "#e9515f",
  },
  result: {
    marginTop: 20,
    color: "white",
    fontWeight: "600",
    backgroundColor: "#F3FBFE",
  },
});
