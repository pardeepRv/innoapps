import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import GrnChangeReceipt from '././GrnChangeReceipt'
import GrnRejectReceipt from '././GrnRejectReceipt'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/GrnEditReceiptStyle'

class GrnEditReceipt extends Component {

  constructor (props) {
    super(props)

    this.state = {
      entityReceipt: props.navigation.state.params.entityReceipt,
      index: props.navigation.state.params.index,
    }
  }

  static navigationOptions = {
  title: 'EDIT RECEIPTS',
};

  render () {
    if (this.state.entityReceipt.submitStatus == "processing"){
      return (
        <View style={styles.container}>
        <View style={styles.mainContainer}>
        <View style={styles.lineWithBottomSpace}/>
        <ScrollView>
        <KeyboardAvoidingView style={styles.mainContainer} behavior="position" enabled>
            <View style={styles.line}/>
            <View style={styles.headerContainer}>
            <View style={styles.greyInfoContainer}>
              <Text style={styles.infoTextLeft}>Item No.</Text>
              <Text style={styles.infoText}>{this.state.entityReceipt.order_number}</Text>
            </View>
            <View style={styles.pinkInfoContainer}>
              <Text style={styles.infoTextLeft}>Description</Text>
              <Text style={styles.infoText}>{this.state.entityReceipt.item_description}</Text>
            </View>
            <View style={styles.greyInfoContainer}>
              <Text style={styles.infoTextLeft}>UOM</Text>
              <Text style={styles.infoText}>{this.state.entityReceipt.unit_of_measure}</Text>
            </View>
            <View style={styles.pinkInfoContainer}>
              <Text style={styles.infoTextLeft}>Quantity</Text>
              <Text style={styles.infoText}>{this.state.entityReceipt.quantity - this.state.entityReceipt.changedQuantity}</Text>
            </View>
            <View style={styles.greyInfoContainer}>
              <Text style={styles.infoTextLeft}>Status</Text>
              <Text style={styles.infoText}>Processing</Text>
            </View>
            </View>
            <View style={styles.lineWithBottomSpace}/>
            <View style={styles.headerContainer}>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>

        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={true}
            style={styles.disableButtonStyle}>
              <View>
                <Text style={styles.buttonText}>CHANGE</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={true}
            style={styles.disableButtonStyle}>
              <View>
                <Text style={styles.buttonText}>REJECT</Text>
              </View>
          </TouchableOpacity>
        </View>
        </View>
      )

    }else if (this.state.entityReceipt.submitStatus == "pending"){
      return (
        <View style={styles.container}>
        <View style={styles.mainContainer}>
        <View style={styles.lineWithBottomSpace}/>
        <ScrollView>
        <KeyboardAvoidingView style={styles.mainContainer} behavior="position" enabled>
            <View style={styles.line}/>
            <View style={styles.headerContainer}>
            <View style={styles.greyInfoContainer}>
              <Text style={styles.infoTextLeft}>Item No.</Text>
              <Text style={styles.infoText}>{this.state.entityReceipt.order_number}</Text>
            </View>
            <View style={styles.pinkInfoContainer}>
              <Text style={styles.infoTextLeft}>Description</Text>
              <Text style={styles.infoText}>{this.state.entityReceipt.item_description}</Text>
            </View>
            <View style={styles.greyInfoContainer}>
              <Text style={styles.infoTextLeft}>UOM</Text>
              <Text style={styles.infoText}>{this.state.entityReceipt.unit_of_measure}</Text>
            </View>
            <View style={styles.pinkInfoContainer}>
              <Text style={styles.infoTextLeft}>Quantity</Text>
              <Text style={styles.infoText}>{this.state.entityReceipt.quantity - this.state.entityReceipt.changedQuantity}</Text>
            </View>
            <View style={styles.greyInfoContainer}>
              <Text style={styles.infoTextLeft}>Status</Text>
              <Text style={styles.infoText}>Pending</Text>
            </View>
            </View>
            <View style={styles.lineWithBottomSpace}/>
            <View style={styles.headerContainer}>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>

        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.disableButtonStyle}>
              <View>
                <Text style={styles.buttonText}>CHANGE</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.disableButtonStyle}>
              <View>
                <Text style={styles.buttonText}>REJECT</Text>
              </View>
          </TouchableOpacity>
        </View>
        </View>
      )
    }else {
      return (
        <View style={styles.container}>
        <View style={styles.mainContainer}>
        <View style={styles.lineWithBottomSpace}/>
        <ScrollView>
        <KeyboardAvoidingView style={styles.mainContainer} behavior="position" enabled>
            <View style={styles.line}/>
            <View style={styles.headerContainer}>
            <View style={styles.greyInfoContainer}>
              <Text style={styles.infoTextLeft}>Item No.</Text>
              <Text style={styles.infoText}>{this.state.entityReceipt.order_number}</Text>
            </View>
            <View style={styles.pinkInfoContainer}>
              <Text style={styles.infoTextLeft}>Description</Text>
              <Text style={styles.infoText}>{this.state.entityReceipt.item_description}</Text>
            </View>
            <View style={styles.greyInfoContainer}>
              <Text style={styles.infoTextLeft}>UOM</Text>
              <Text style={styles.infoText}>{this.state.entityReceipt.unit_of_measure}</Text>
            </View>
            <View style={styles.pinkInfoContainer}>
              <Text style={styles.infoTextLeft}>Quantity</Text>
              <Text style={styles.infoText}>{this.state.entityReceipt.quantity}</Text>
            </View>
            </View>
            <View style={styles.lineWithBottomSpace}/>
            <View style={styles.headerContainer}>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>

        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {this.props.navigation.navigate('GrnChangeReceipt', {entityReceipt: this.state.entityReceipt,
            index: this.state.index })}}
            style={styles.buttonStyle}>
              <View>
                <Text style={styles.buttonText}>CHANGE</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {this.props.navigation.navigate('GrnRejectReceipt', {entityReceipt: this.state.entityReceipt,
            index: this.state.index})}}
            style={styles.buttonStyle}>
              <View>
                <Text style={styles.buttonText}>REJECT</Text>
              </View>
          </TouchableOpacity>
        </View>
        </View>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GrnEditReceipt)
