import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
        width: '100%',
        height: '100%'
    },
    buttonContainer: {
      width: '100%',
      backgroundColor: 'transparent',
      justifyContent: 'center',
       alignItems: 'center',
       position: 'absolute',
       bottom: 0

    },
    logoutButtonStyle: {
      width: '60%',
      height: 40,
      backgroundColor: 'red',
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      borderRadius: 25
    },
    refreshDataButtonStyle: {
      width: '60%',
      height: 40,
      backgroundColor: '#1A8CE9',
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      borderRadius: 25
    },
    buttonText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    info:{
      backgroundColor:'rgba(255, 255, 255, 0.5)',
      marginBottom: 5
    },
    infoTitle: {
      marginTop:15,
      paddingLeft:10,
      paddingRight:10,
      fontSize: 13,
      marginBottom:5,
      fontWeight:'bold'
    },
    infoText: {
      paddingLeft:10,
      paddingRight:10,
      fontSize: 13,
      marginBottom:15,
      color: '#2F3134'
    },
})
