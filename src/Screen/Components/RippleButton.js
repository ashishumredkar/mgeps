import React from 'react';
import {
    TouchableRipple,
  } from 'react-native-paper';

export function RippleButton(props) {
    return (
      <TouchableRipple
        onPress={() => {
          props.onPress(true);
        }}
        rippleColor={props.rippleColor ? props.rippleColor : 'grey'}
        style={props.rippleStyle ? props.rippleStyle : {alignItems: 'center'}}>
        {props.children}
      </TouchableRipple>
    );
  }