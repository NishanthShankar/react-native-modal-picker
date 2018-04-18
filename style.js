import { StyleSheet, Dimensions } from 'react-native'

const {height, width} = Dimensions.get('window')

const PADDING = 8
const BORDER_RADIUS = 5
const FONT_SIZE = 16
const HIGHLIGHT_COLOR = '#858585'
const OPTION_CONTAINER_HEIGHT = 400

export default StyleSheet.create({

  overlayStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  optionContainer: {
    borderRadius: BORDER_RADIUS,
    width: width * 0.85,
    maxHeight: OPTION_CONTAINER_HEIGHT,
    backgroundColor: 'rgba(255,255,255,1)',
    margin: 4
  },

  cancelContainer: {
    left: width * 0.1,
    top: (height - OPTION_CONTAINER_HEIGHT) / 2 + 10
  },

  selectStyle: {
    flex: 1,
    borderColor: '#e9e9e9',
    borderWidth: 1,
    padding: 8,
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS
  },

  selectTextStyle: {
    color: HIGHLIGHT_COLOR,
    fontSize: FONT_SIZE
  },

  cancelStyle: {
    borderRadius: BORDER_RADIUS,
    width: width * 0.8,
    backgroundColor: 'rgba(255,255,255,1)',
    padding: PADDING
  },

  cancelTextStyle: {
    textAlign: 'center',
    color: '#333',
    fontSize: FONT_SIZE
  },

  optionStyle: {
    justifyContent: 'center',
    minHeight: 44,
    padding: PADDING
  },

  optionTextStyle: {
    lineHeight: FONT_SIZE,
    fontSize: FONT_SIZE,
    color: HIGHLIGHT_COLOR
  },

  sectionStyle: {
    padding: PADDING * 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },

  sectionTextStyle: {
    textAlign: 'center',
    fontSize: FONT_SIZE
  }
})
