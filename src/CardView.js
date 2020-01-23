import PropTypes from 'prop-types';
import React, { Component } from "react";
import FlipCard from "react-native-flip-card";
import LinearGradient from 'react-native-linear-gradient';

import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  ImageBackground,
} from "react-native";

import Icons from "./Icons";

const BASE_SIZE = { width: 300, height: 190 };

const s = StyleSheet.create({
  cardContainer: {},
  cardFace: {},
  icon: {
    position: "absolute",
    top: 20,
    left: 15,
    width: 60,
    height: 40,
    resizeMode: "contain",
  },
  baseText: {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "transparent",
  },
  placeholder: {
    color: "rgba(255, 255, 255, 0.5)",
  },
  focused: {
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 1)",
  },
  number: {
    fontSize: 21,
    position: "absolute",
    top: 95,
    left: 28,
  },
  name: {
    fontSize: 16,
    position: "absolute",
    bottom: 20,
    left: 25,
    right: 100,
  },
  expiryLabel: {
    fontSize: 9,
    position: "absolute",
    bottom: 40,
    left: 218,
  },
  expiry: {
    fontSize: 16,
    position: "absolute",
    bottom: 20,
    left: 220,
  },
  amexCVC: {
    fontSize: 16,
    position: "absolute",
    top: 73,
    right: 30,
  },
  cvc: {
    fontSize: 16,
    position: "absolute",
    top: 80,
    right: 30,
  },
});

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class CardView extends Component {
  static propTypes = {
    focused: PropTypes.string,

    brand: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
    expiry: PropTypes.string,
    cvc: PropTypes.string,
    placeholder: PropTypes.object,

    scale: PropTypes.number,
    fontFamily: PropTypes.string,
    imageFront: PropTypes.number,
    imageBack: PropTypes.number,
  };

  static defaultProps = {
    name: "",
    placeholder: {
      number: "XXXX XXXX XXXX XXXX",
      name: "NOME NO CARTÃO",
      expiry: "VALIDADE",
      cvc: "XXX",
    },

    scale: 1,
    fontFamily: Platform.select({ ios: "Courier", android: "monospace" }),
    imageFront: require("../images/card-front.png"),
    imageBack: require("../images/card-back.png"),
  };

  render() {
    const {
      focused,
      brand, name, number, expiry, cvc,
      placeholder, imageFront, imageBack, scale, fontFamily,
    } = this.props;

    const isAmex = brand === "american-express";
    const shouldFlip = !isAmex && focused === "cvc";

    const containerSize = { ...BASE_SIZE, height: BASE_SIZE.height * scale };
    const transform = { transform: [
      { scale },
      { translateY: ((BASE_SIZE.height * (scale - 1) / 2)) },
    ] };

    return (
      <View style={[s.cardContainer, containerSize]}>
        <LinearGradient colors={['#bc8743', '#c37f16']}>
          <FlipCard
            friction={10}
            flipHorizontal
            clickable={false}
            flip={shouldFlip}
            perspective={2000}
            flipVertical={false}
            style={{ borderWidth: 0 }}
          >
            <ImageBackground
              source={imageFront}
              imageStyle={{resizeMode:'contain'}}
              style={[BASE_SIZE, s.cardFace, transform]}
            >
              <Image style={[s.icon]} source={{ uri: Icons[brand] }} />
              <View
                style={[
                  { position: 'absolute', top: 70, left: 40, borderWidth: 1, borderColor: 'red', width: 200 },
                  transform,
                ]}
              >
                <Text
                  style={[
                    s.baseText,
                    { fontFamily, fontSize: 16 },
                    !number && s.placeholder,
                    focused === "number" && s.focused,
                  ]}
                >
                  {!number ? placeholder.number : number}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={[s.baseText, { fontFamily }, s.name, !name && s.placeholder, focused === "name" && s.focused]}
              >
                {!name ? placeholder.name : name.toUpperCase()}
              </Text>
              {/* Empty autoclose tag, justo have something */}
              <Text style={[s.baseText, { fontFamily }, s.expiryLabel, s.placeholder, focused === "expiry" && s.focused]} />
              <Text style={[s.baseText, { fontFamily }, s.expiry, !expiry && s.placeholder, focused === "expiry" && s.focused]}>
                {!expiry ? placeholder.expiry : expiry}
              </Text>
              {isAmex && (
                <Text style={[s.baseText, { fontFamily }, s.amexCVC, !cvc && s.placeholder, focused === "cvc" && s.focused]}>
                  {!cvc ? placeholder.cvc : cvc}
                </Text>
              )}
            </ImageBackground>
            <ImageBackground
              source={imageBack}
              style={[BASE_SIZE, s.cardFace, transform]}
            >
              <Text style={[s.baseText, s.cvc, !cvc && s.placeholder, focused === "cvc" && s.focused]}>
                {!cvc ? placeholder.cvc : cvc}
              </Text>
            </ImageBackground>
          </FlipCard>
        </LinearGradient>
      </View>
    );
  }
}
