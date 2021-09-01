import React, { Component } from 'react'
import { View,
    Text,
     SafeAreaView,
    ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PcHomeStyle'

class PcHome extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <SafeAreaView style={styles.container}>
            <View style={styles.container}>
            <ImageBackground source={Images.grnSettingsBackground} style={styles.backgroundImage}>

            </ImageBackground>
            </View>
        </SafeAreaView>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(PcHome)
