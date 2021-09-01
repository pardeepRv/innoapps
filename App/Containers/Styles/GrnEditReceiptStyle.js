import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.greyBG,
    flex:1
  },
    mainContainer: {
    backgroundColor: Colors.greyBG,
    flex:1
  },
  headerContainer: {
    backgroundColor:'white',
},
   titleStyle: {
      margin: 15,
      fontSize: 14,
      alignSelf: 'center'
    },
    line: {
      backgroundColor: Colors.lineGrey,
    height: 0.5,
    width: '100%'
  },
    lineWithBottomSpace: {
    backgroundColor: Colors.lineGrey,
    height: 0.5,
    width: '100%',
    marginBottom: 10
  },
  pinkInfoContainer: {
    marginHorizontal: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FCE8E7',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoTextLeft: {
    paddingLeft: 5,
    marginTop: 10,
    marginBottom:10,
    fontSize: 12
  },
  infoText: {
    fontSize: 12
  },
  greyInfoContainer: {
    marginHorizontal: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.lightGreyBG,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastPinkInfoContainer: {
    marginHorizontal: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FCE8E7',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:20
  },
  buttonContainer: {
    flexDirection:'row',
    justifyContent: 'center',
     alignItems: 'center',
     marginTop : 10,
     bottom: 0
  },
  buttonStyle: {
    width: '45%',
    height:45,
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 25,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  disableButtonStyle: {
    width: '45%',
    height:45,
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    backgroundColor: 'rgba(211,211,211,1)',
    justifyContent: 'center',
    borderRadius: 25,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  textBox: {
    width: "100%",
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    paddingLeft:10,
    paddingRight:10,
  },
})
