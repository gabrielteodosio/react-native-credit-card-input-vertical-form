import PropTypes from 'prop-types'
import React, { Component } from 'react'
import FlipCard from 'react-native-flip-card'
import LinearGradient from 'react-native-linear-gradient'

import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  ImageBackground,
} from 'react-native'

import Icons from './Icons'

const ChipIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAABvCAYAAADG8NPlAAAAAXNSR0IArs4c6QAAC6VJREFUeAHtXUtvHEUQnl2P49hxTBKhoCAhFBk7uXDixAUkDiABAi4cyIk/gHJFghsS3Dgg/gNChAsHxOvIhQOCCxKx81CQkFCivPz2xo75vopr3ds7s17HO9M9M9XSap6701X9bVfV19U9SWLFNJCjgVbO+WRnZ6d9+fLlF1ut1hvYn8P2DLZH8+6383FrAO23hRr+hza80W63f8LxL3Nzc5uDat0HDny5deXKlQsPHz78BPtnB33ZrlVXAwDHPbTvZxMTE1+cPXt2I0uSHnBcv379xObm5te48dWsm+1c/TQAkPydpulbs7Ozi750XXDAhDwJJP2KG875N9lx7TVwF6bmlfn5+T9dSds8ACjG8bmEXQOGq53m7J9E+3937dq1p1yRBRwLCwsf4OTL7gXbb5YGAI5nOp3O567UrcXFxZnt7e3rOHnKvWD7zdMA/I8dmJcXEMX8QenbiErewdaA0Tws9EmM3qOFjuJ9vUCz8rYe2NY04OIhvX/79uvoToJphc+emJxMxicmgtXBHtyjgWdv3rw5ffr06ZX04fZ2cNZz68EDAcjRY8eSkEDtUVGDD5aXl5+G+AsSrcSgh8319WT57t0EYI2hOo2uA3yP41RAOpam4RSxs5PAAeo+n8BYunMnmZyelp6ke8F2gmggPX7yZJAH60PZY2ysrpKI01PJ+spKstXpJFPHjyetdjSdW7d+TdkJrnk6owRoe2ysR+cPAA6aGfojVsJoIDg4KDaBMXPqVHLkaK9vDA4mWbl3L9lYWwujnYY/NQpwaBvQjBybmUnA0ukp2dLsLAMk5qz2qKXwg95WKPxx+z+AfAfNTDo+3nPzNswLzcyDzYH5KT3fsYPDaSA6cFAcOqHTJ04k5D3cQqd1dWkpWVte5lCye8n2C9BAlOBQOY9OTWU6q52NDTEz21vMfLNSlAaiBgeFJg9DM+PT6wQGzQxDYSvFaCB6cFBsUup0VOmw4qBHE+REaGp2ENlYGa0GKgEOFZmhLnsRn9Wlk2qciGppdNtKgYNij4ETIUBInrlFOZFN40RctRxqv3LgUGk5/kJT49Pr6+BESJwRLFYOp4HKgoNi53EipNyFEwEFb+XxNVBpcFBssqnCiSDsdQsd1NX792UQzz1v+8NroPLgUFFJmBEkPvWueSJuaoB+x7aDNVAbcFBMUu6DOBGSZ1aG10CtwEGx6aDSUaXD2lNAt5N2XyMnYtR7j2ryDmoHDhVU80R8TqSzy4kY9a6ayt/WFhwUWah3+CF9eSJIR2Q0Y3ki+cDglVqDQ0QH3a55In5mO/NEVhDRGPWeDZL6g2NXbuVEfDPDXFXhRCxPpA8hjQEHJWc6IqMZP0+EbCoH7ziIZ2VPA40Ch4rNPBFyIj71Tk6EUyMsHfGRphoJDoqex4kQGDQzlifSBIdUu4uMLdnULE6EPEg3T6TBnEh679atDLWVe4qcRB9pVWIV+PzxI0ckcnFNiuSJIOOM0Y6f8Fxi9YI9KgqzouMfbsOUrRF1VrM4kabOnYkCHASC5oSSwQxVyIMM5EQaNncm9f8ppTYM7DmnPepYB7cc+9hCOiDNjE9alVU34USQ2MyxGHc6puaJTGHshmao7iWVpN2AUrLHYN6Fm7nF0VOeZ9180qqsqtLMMNwli+rS7AQw6xvaTypDD8HNiox/cJ6st7KPmpnQISUJs2NPPNE30Vv9JNazriU4OKhYsfW7Uw98UyIhJcc/AoaUNCGSJ+KZEgKDzmpd80SiAIf+8+j/TGdNPYhgOQaClj3IZMYUTfomMncmIIBVh6PcRgUOCsapB7T1tOluYZgbQ0g5sTtF0/eFhBMB9V4nMxMdOAgI/ktl6gH+qb6ZkWH2wCElgUEA+5EenWqh3msydyZKcGiPIbYezqrPTmpIGXI5BoI2jxOpy9yZqMFBkHSnHmTYel2OIaizyvVEAGDfzAiAYWaYL1LVEj04VLE6zO5PPZDlGDCKGtLWs05ZUzQJWmaaMeIKCWDV4UG3lQEHBZNhdvxL/eUYYhlmp59EX8QHMDkRmaIJp7pKpVLgoGIlpBzEiYB+d9nWshtDAZxmcCJ0VqvEiVQOHNrYjBTYlfu2vrscQ0BbTwBPkxPxxodoWmTuDHiRKiQ1VxYcBIkOs/ucCBVPW8+wN2RhvWhmyN24RfwkhOMh/SS3Pnn7lQaHCiWcCEyNb+s5YBba1gsngh6ujxOJhNRTHWZtawEOCkYnlf9SfyhdOZEY8kTIi7hJzTQz7N04yhujmakNOAgQmpnc8Q+dehBw/EP8JJoZ72UEzGlZgrPKbUylVuBQxXL8Q0JKz9bHMMyueSLkbdzCnoM9CHuSWDiRWoKDSpeQkrbezxOJYOoBoxlZT4RjRyDQ3EI/SZKfIuBEemvm1rIG+zL+AUfVDykpWjdPBP/YUIVcyAwAnDl2hGgm5NgRdVJrcGijM6TM5ERg40lM0WkNVdhz0AQyT4Rg1iJmBn4SeZFQZqYR4KDClRPpCynJieBf6uaJagOVuaWflJWOqGNHIQAc8B1eZap+71kMJxn2yj/SMSl0BBktcAacz5fsfbvYPfGT0IvQ5LmhtyY6uT1LkTWBszyH3/+9MT2Hq0zNCfVtvby2A8PsIW09zQynPvDjg4HmpYwPniuUbiPBQaCwd6Ct95djoPI1TwQt4WKq1H1GWVl+UpmVaJxZ8ZVLvmEcqxCuwvFzp2PS1nPsI4q5Mwhvd0oMbcfabbzQBnSAr6wmHo9xiUr0Imuw9a5JITj4+jBGEv7gXll6omnxM96Lfnaapv/yGY01K76CaevpjLKngLHfuwzTIpwIwsoYxz/2Kjr6PQOHp9Pc8Q8uUclh9oCciFfVwg8NHBkq5sAYzYxvSiQdEQBpyms7DBwZ4JBTtPXI5KKp8UPKukw9yBNdzxs4VBM5W1mOgVMPvFeZap5IbMPsOWI81mkDxxBqIyciZiZnmJ0Oax2LgeMArcqQUvJEABa3aJ6Iy5O416u63ytlVaUosd6aJ+KnIwonUrGpB/upzcCxn4Yyrgsnsjv1wL1M6l2mHpATCUi9u3U6zL6B4xDa6+aJeOmI+tqOEMPshxCn76sGjj6VHOyEcCIVnXqwn6QGjv00NMx1cCKk3bOG2XXqQRWdVQPHMI0/5D06zO7niZALYbaZO6g35E8Gvc3AMWL15009qOJrOwwcIwaH/lze1IMqcSIGDm3NAracesBsLn89EeVECJSYi4Gj4NYh9V7V13YYOAoGh/68ciL0SdxCJ3WZa4dFmCdi4HBbquD9XE4kkrkzvvgGDl8jBR8zN4ScSFaeCDkRWU/EmU9TcHUG/ryBY6B6irsoeSJ582Q5dyaC5RgMHMW1/76/nMeJyNyZCJaoNHDs24TF3yCcCHJW/WmYDHVpZrZLnLPiSmvzVlxtBNyXPBGkI/JNVa5JISeygjwRAsjnS4qqLthcwYWBoygNP8bv0lnlTHtmtzOJWQvNDFMRy0pHnJqefg7P/s3MirZARNu813aUXUUDR9kaH/J55ESYr+qvJzLk10dym5mVkaixmB9RToT5qmXmg7TSVN5EbeAopl1H+qtlOaJaaUykvs19mpX6vt5QpbXtgTSwtbUli6S10XX9d6Bv2s211wB6DsFEG2HSP7WX1gQcWgPoLNZnZ2fF52DP8ePQ37Qba68BdBY/AxOy3hUY2/a3tZfYBBxaAwDGJb25PTc39xcOvtETtm20Bhbm5+e/Ug0ICYbe40MgZklP2rZ5Gtg1JRex7UavAg6g5RrU8R4uhFsIvHntEZvEH58/f/4Ht1ICDp44d+7c9wDHu9jdG/Fx77T9WmqAPQY+H6H9P/UFdJbNe3Tp6tWrz4ME+RJe60v+zXZcOw0sQKKLfo+hUvaBQy8sLi6+hnH9CwDJmzh3Ss/bttoaQC+xvhuuXqLzieOuj+FLlgsO98YbN26c7HQ6Z/BDk+5526+OBkiJk/kkwYV2DLdud3VUZjUdpIH/AeFOS9OMFoAsAAAAAElFTkSuQmCC'

const BASE_SIZE = { width: 300, height: 190 }

const s = StyleSheet.create({
  cardContainer: {},
  cardFace: {},
  chip: {
    position: 'absolute',
    top: 20,
    right: 15,
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },
  icon: {
    position: 'absolute',
    top: 20,
    left: 15,
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },
  baseText: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
  },
  placeholder: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  focused: {
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)',
  },
  number: {
    fontSize: 21,
    position: 'absolute',
    top: 95,
    left: 28,
  },
  name: {
    fontSize: 12,
    position: 'absolute',
    bottom: 20,
    left: 25,
    right: 100,
  },
  expiryLabel: {
    fontSize: 9,
    position: 'absolute',
    bottom: 40,
    left: 218,
  },
  expiry: {
    fontSize: 12,
    position: 'absolute',
    bottom: 20,
    left: 220,
  },
  amexCVC: {
    fontSize: 16,
    position: 'absolute',
    top: 73,
    right: 30,
  },
  cvc: {
    fontSize: 16,
    position: 'absolute',
    top: 80,
    right: 30,
  },
})

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
    cardGradientColors: PropTypes.array,
  }

  static defaultProps = {
    name: '',
    placeholder: {
      number: 'XXXX XXXX XXXX XXXX',
      name: 'NOME NO CARTÃO',
      expiry: 'VALIDADE',
      cvc: 'XXX',
    },

    scale: 1,
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
    imageFront: require('../images/card-front.png'),
    imageBack: require('../images/card-back.png'),
    cardGradientColors: ['#bc8743', '#c37f16'],
  }

  render() {
    const {
      focused, cardGradientColors,
      brand, name, number, expiry, cvc,
      placeholder, imageFront, imageBack, scale, fontFamily,
    } = this.props

    const isAmex = brand === 'american-express'
    const shouldFlip = !isAmex && focused === 'cvc'

    const containerSize = { ...BASE_SIZE, height: BASE_SIZE.height * scale }
    const transform = {
      transform: [
        { scale },
        { translateY: ((BASE_SIZE.height * (scale - 1) / 2)) },
      ],
    }

    return (
      <View style={[s.cardContainer, containerSize]}>
        <FlipCard
          friction={10}
          flipHorizontal
          clickable={false}
          flip={shouldFlip}
          perspective={2000}
          flipVertical={false}
          style={{ borderWidth: 0 }}
        >
          <View style={[transform, { borderRadius: 10, overflow: 'hidden' }]}>
            <LinearGradient
              colors={cardGradientColors}
              style={[BASE_SIZE, s.cardFace]}
            >
              <Image style={[s.icon]} source={{ uri: Icons[brand] }}/>
              <Image style={[s.chip]} source={{ uri: ChipIcon }}/>
              <View
                style={[
                  {
                    top: 70,
                    left: 40,
                    padding: 5,
                    width: '73%',
                    borderWidth: 1,
                    borderRadius: 10,
                    position: 'absolute',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  transform,
                ]}
              >
                <Text
                  style={[
                    s.baseText,
                    { fontFamily, fontSize: 16 },
                    !number && s.placeholder,
                    focused === 'number' && s.focused,
                  ]}
                >
                  {!number ? placeholder.number : number}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={[s.baseText, { fontFamily }, s.name, !name && s.placeholder, focused === 'name' && s.focused]}
              >
                {!name ? placeholder.name : name.toUpperCase()}
              </Text>
              {/* Empty autoclose tag, justo have something */}
              <Text
                style={[s.baseText, { fontFamily }, s.expiryLabel, s.placeholder, focused === 'expiry' && s.focused]}/>
              <Text
                style={[s.baseText, { fontFamily }, s.expiry, !expiry && s.placeholder, focused === 'expiry' && s.focused]}>
                {!expiry ? placeholder.expiry : expiry}
              </Text>
              {isAmex && (
                <Text
                  style={[s.baseText, { fontFamily }, s.amexCVC, !cvc && s.placeholder, focused === 'cvc' && s.focused]}>
                  {!cvc ? placeholder.cvc : cvc}
                </Text>
              )}
            </LinearGradient>
          </View>
          <View style={[transform, { borderRadius: 10, overflow: 'hidden' }]}>
            <LinearGradient
              colors={cardGradientColors}
              style={[BASE_SIZE, s.cardFace]}
            >
              <Text style={[s.baseText, s.cvc, !cvc && s.placeholder, focused === 'cvc' && s.focused]}>
                {!cvc ? placeholder.cvc : cvc}
              </Text>
            </LinearGradient>
          </View>
        </FlipCard>
      </View>
    )
  }
}
