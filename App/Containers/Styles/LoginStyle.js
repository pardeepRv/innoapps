import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
        width: '100%',
        height: '100%'
  },
  title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft : 20,
      marginTop :15
  },
  input: {
    fontSize: 16,
    marginLeft : 20,
    marginTop: 10,
    marginBottom :15
  },
  buttonText: {
      fontSize: 16,
      color: 'white'
    },
    centerView : {
      marginTop: 80,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

    },
    inputView : {
      width: '100%',
      height: '15%',
      backgroundColor: 'white'
    },
    lineView : {
      width: '100%',
      height: 1,
      backgroundColor: Colors.lineGrey
    },
    checkboxView : {
      width: '100%',
      height: 50,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center'
    },
    checkbox : {
      height: 30,
      marginLeft: 10
    },
    loginButton : {
      width: '60%',
      height: 50,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 150
    },
    loginText : {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold'
    },
    inoappsLogo: {
      width: '30%',
      height: '30%'
    },
    logoContainer: {
      flex: 0.07,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    activityIndicator: {
      width: '100%',
      height: '100%',
      height: 10
   },
})
