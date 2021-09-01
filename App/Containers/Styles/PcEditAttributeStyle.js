import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : 'white'
  },
  infoContainer: {
    backgroundColor: Colors.lightGreyBG
  },
  info: {
    marginHorizontal : 10,
    backgroundColor: Colors.lightGreyBG,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey'
  },
  infoText: {
    fontSize: 12
  },
  infoTextDisabled: {
    fontSize: 12,
    color: Colors.lineGrey
  },
  line: {
    backgroundColor: Colors.lineGrey,
    height: 1,
    width: '100%',
  },
  selectionContainer: {
    flex: 1,
    backgroundColor: Colors.lightGreyBG,
    marginTop : 10
  },
  selection: {
    marginHorizontal : 10,
    backgroundColor: Colors.lightGreyBG,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inside: {
    backgroundColor: Colors.lightGreyBG,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox : {
    height: 30,
    marginLeft: 10,
    marginRight: 10
  },
  checkboxDisabled : {
    height: 30,
    marginLeft: 10,
    marginRight: 10,
    tintColor: Colors.lineGrey,
  },
  arrow: {
    width : 20,
    height : 20,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center'
  },
  answer: {
    color: 'black',
    fontSize: 12
  },
  picker: {
    width: '100%',
    height: 50,
    color: "transparent",
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingRight: 30
  },
  pickerContainer: {
    width: "100%",
    height: 50,
    backgroundColor: 'transparent',
    position:'absolute'
  },
  pickerAnswer: {
    color: 'black',
    justifyContent: 'flex-end',
    textAlign: 'right',
    alignSelf: 'center'
  },
  menuButton: {
    marginLeft: 15,
    marginRight: 15,
    color : "red"
  }
})
