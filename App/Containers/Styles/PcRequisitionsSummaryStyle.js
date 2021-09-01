import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  line: {
    backgroundColor: Colors.lineGrey,
    height: 1,
    marginTop : 20,
    width: '100%'
  },
  separatorline: {
    backgroundColor: Colors.lineGrey,
    height: 1,
    marginTop : 10,
    marginBottom:10,
    width: '100%'
  },
  whiteLine: {
    backgroundColor: 'white',
    height: 5,
    marginTop : 5,
    width: '100%'
  },
  shortLine: {
    backgroundColor: Colors.lineGrey,
    height: 1,
    alignSelf: 'center',
    width: '30%'
  },
  titleStyle: {
    margin : 15,
    fontSize: 14,
    alignSelf: 'center',
  },
  info: {
    marginHorizontal : 10,
    paddingLeft : 10,
    paddingRight : 10,
    backgroundColor: Colors.lightGreyBG,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lineGrey,
  },
  infoHeader: {
    marginHorizontal : 10,
    paddingLeft : 10,
    paddingRight : 10,
    backgroundColor: 'rgba(241,241,241,1)',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lineGrey,
  },
  infoTextLeft: {
    color: Colors.lightGreyText,
    fontSize: 12
  },
  infoText: {
    fontSize: 12
  },
  infoContainer: {
    backgroundColor: 'white'
  },
  priceContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
  },
  attributeContainer: {
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom:5,
    marginLeft: 10,
    marginRight: 10
  },
  priceText: {
    fontSize: 12,
    color: 'red'
  },
  menuButton: {
    marginLeft: 15,
    marginRight: 15,
    color : "red"
  },
  box: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd'
  },
  boxView: {
    flex: 1,
    flexDirection: 'row'
  },
  arrow: {
    width : 20,
    height : 20,
    marginLeft: 0,
    marginRight: 10,
    alignSelf: 'center'
  },
  question: {
    flexGrow: 1,
    alignSelf: 'center',
    color: 'grey',
    fontSize: 14,
    textAlign: 'left',
    margin: 10
  },
  pickerContainer: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    position: 'absolute'
  },
  pickerAnswer: {
    color: 'black',
    justifyContent: 'flex-end',
    textAlign: 'right',
    alignSelf: 'center'
  },
  answer: {
    color: 'black',
    fontSize: 14
  },
  picker: {
    width: '100%',
    height: 50,
    color: "transparent",
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingRight: 30
  },
})
