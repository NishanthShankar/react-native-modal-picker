'use strict'

import React from 'react'

import PropTypes from 'prop-types'
import {
    View,
    Modal,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native'

import styles from './style'
import BaseComponent from './BaseComponent'

let componentIndex = 0

// style: View.propTypes.style,
//   selectStyle: View.propTypes.style,
//   optionStyle: View.propTypes.style,
//   optionTextStyle: Text.propTypes.style,
//   sectionStyle: View.propTypes.style,
//   sectionTextStyle: Text.propTypes.style,
//   cancelStyle: View.propTypes.style,
//   cancelTextStyle: Text.propTypes.style,
//   overlayStyle: View.propTypes.style,

const propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
  initValue: PropTypes.string,
  initSelectedValue: PropTypes.string,
  cancelText: PropTypes.string
}

const defaultProps = {
  data: [],
  onChange: () => {},
  initValue: 'Select me!',
  style: {},
  selectStyle: {},
  optionStyle: {},
  optionTextStyle: {},
  sectionStyle: {},
  sectionTextStyle: {},
  cancelStyle: {},
  cancelTextStyle: {},
  overlayStyle: {},
  cancelText: 'cancel'
}

export default class ModalPicker extends BaseComponent {
  constructor () {
    super()
    this._bind(
      'onChange',
      'open',
      'close',
      'renderChildren'
    )
    this.state = {
      animationType: 'fade',
      modalVisible: false,
      transparent: false,
      selected: 'please select'
    }
  }

  componentDidMount () {
    this.setState({selected: this.props.initValue})
    this.setState({selectedValue: this.props.initSelectedValue})
    this.setState({cancelText: this.props.cancelText})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.initValue !== this.props.initValue) {
      this.setState({selected: nextProps.initValue})
    }
    if (nextProps.initSelectedValue !== this.props.initSelectedValue) {
      this.setState({selectedValue: nextProps.initSelectedValue})
    }
  }

  onChange (item) {
    this.props.onChange(item)
    this.setState({selectedValue: ''})
    this.setState({selected: item.label})
    this.close()
  }

  close () {
    this.setState({
      modalVisible: false
    })
  }

  open () {
    this.setState({
      modalVisible: true
    })
  }

  empty () {}

  renderSection (section) {
    return (
      <View
        key={section.value}
        style={[styles.sectionStyle, this.props.sectionStyle]}>
        <Text style={[styles.sectionTextStyle, this.props.sectionTextStyle]}>
          {section.label}
        </Text>
      </View>
    )
  }

  renderOption (option) {
    return (
      <TouchableOpacity key={option.value} onPress={() => this.onChange(option)}>
        <View style={[styles.optionStyle, this.props.optionStyle]}>
          <Text style={[styles.optionTextStyle, this.props.optionTextStyle]}>
            {option.label}
          </Text>
        </View>
      </TouchableOpacity>)
  }

  renderOptionList () {
    const options = this.props.data.map((item) => {
      if (item.section) {
        return this.renderSection(item)
      } else {
        return this.renderOption(item)
      }
    })

    return (
      <TouchableOpacity
        onPress={this.close}
        activeOpacity={1}
        style={[styles.overlayStyle, this.props.overlayStyle]}
        key={'modalPicker' + (componentIndex++)}>
        <TouchableOpacity
          onPress={this.empty}
          style={styles.optionContainer}>
          <ScrollView keyboardShouldPersistTaps='always'>
            <View style={{paddingHorizontal: 10}}>
              {options}
            </View>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  renderChildren () {
    if (this.props.children) {
      return this.props.children
    }

    let selectedText = this.state.selected
    if (this.state.selectedValue) {
      let tempArray = this.props.data.filter(item =>
        item.value === this.state.selectedValue
      )
      if (tempArray.length) selectedText = tempArray[0].label
    }

    return (
      <View style={[styles.selectStyle, this.props.selectStyle]}>
        <Text style={[styles.selectTextStyle, this.props.selectTextStyle]}>
          {selectedText}
        </Text>
      </View>
    )
  }

  render () {
    const dp = (
      <Modal
        transparent
        ref='modal'
        visible={this.state.modalVisible}
        onRequestClose={this.close}
        animationType={this.state.animationType}>
        {this.renderOptionList()}
      </Modal>
    )

    return (
      <View style={this.props.style}>
        {dp}
        <TouchableOpacity onPress={this.open}>
          {this.renderChildren()}
        </TouchableOpacity>
      </View>
    )
  }
}

ModalPicker.propTypes = propTypes
ModalPicker.defaultProps = defaultProps
