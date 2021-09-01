import React, { Component } from 'react'
import { View,
    Text,
     SafeAreaView,
    ImageBackground, ActivityIndicator,
  Image } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/GrnHomeStyle'

class GrnHome extends Component {

  static navigationOptions = {
      title: 'HOME',
    };

  constructor (props) {
    super(props);

  }



  render () {
    return (
      <SafeAreaView style={styles.container}>
          {/* <View style={styles.logoContainer}>
            <Image source={Images.inoappsLogo} style={styles.inoappsLogo}>
</Image>
            </View> */}
            <View style={styles.container}>
            <ImageBackground source={Images.grnHomeBackground} style={styles.backgroundImage}>

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

export default connect(mapStateToProps, mapDispatchToProps)(GrnHome)
