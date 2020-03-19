import PropTypes from 'prop-types';
import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes
} from "react-native";

const s = StyleSheet.create({
  baseInputStyle: {
    color: "black",
    flex: 1
  },

});

export default class CCInput extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,

    status: PropTypes.oneOf(["valid", "invalid", "incomplete"]),

    containerStyle: ViewPropTypes.style,
    inputStyle: Text.propTypes.style,
    labelStyle: Text.propTypes.style,
    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBecomeEmpty: PropTypes.func,
    onBecomeValid: PropTypes.func,
  };

  static defaultProps = {
    label: "",
    value: "",
    inputStyle: {},
    labelStyle: {},
    onFocus: () => {},
    containerStyle: {},
    onChange: () => {},
    status: "incomplete",
    onBecomeEmpty: () => {},
    onBecomeValid: () => {},
    keyboardType: "numeric",
  };

  UNSAFE_componentWillReceiveProps = newProps => {
    const { status, value, onBecomeEmpty, onBecomeValid, field } = this.props;
    const { status: newStatus, value: newValue } = newProps;

    if (value !== "" && newValue === "") onBecomeEmpty(field);
    if (status !== "valid" && newStatus === "valid") onBecomeValid(field);
  };

  focus = () => this.refs.input.focus();

  _onFocus = () => this.props.onFocus(this.props.field);
  _onChange = value => this.props.onChange(this.props.field, value);

  render() {
    const {
      label, value, placeholder, status, keyboardType,
      containerStyle, inputStyle, labelStyle,
      validColor, invalidColor, placeholderColor
    } = this.props;

    return (
      <TouchableOpacity
        onPress={this.focus}
        activeOpacity={0.99}
      >
        <View style={[containerStyle,{justifyContent:'space-between'}]}>
          {!!label && (
            <Text style={[labelStyle]}>{label}</Text>
          )}
          <TextInput
            ref="input"
            autoCorrect={false}
            autoCapitalise="words"
            keyboardType={keyboardType}
            style={[
              s.baseInputStyle,
              inputStyle,
              ((validColor && status === "valid") ? { color: validColor } :
                (invalidColor && status === "invalid") ? { color: invalidColor } :
                {}),
            ]}
            value={value}
            onFocus={this._onFocus}
            placeholder={placeholder}
            onChangeText={this._onChange}
            placeholderTextColor={'#ada8a4'}
            underlineColorAndroid={"transparent"}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
