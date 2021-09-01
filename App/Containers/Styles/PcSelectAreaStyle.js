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
    width: 120,
    marginBottom: 20,
    alignSelf: 'center'
  },
  titleStyle: {
    margin : 15,
    fontSize: 14,
    alignSelf: 'center',
  },
  header: {
    marginHorizontal : 15,
    backgroundColor: Colors.lightGreyBG,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lineGrey,
  },
  child: {
    marginHorizontal : 15,
    paddingLeft : 15,
    paddingRight : 15,
    backgroundColor: Colors.lightGreyBG,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lineGrey,
  },
  headerText: {
    fontSize: 14
  },
  headerAnsText: {
    fontSize: 14,
    position: 'absolute',
    right: 30
  },
  childText: {
    fontSize: 12
  },
  checkbox : {
    height: 30,
    marginLeft: 10,

  },
  checkboxDisabled : {
    height: 30,
    marginLeft: 10,
    tintColor: Colors.lineGrey,
  },
  arrow: {
    width : 20,
    height : 20,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center'
  },
  picker: {
    width: "100%",
    height: 50,
    backgroundColor: 'transparent',
    position:'absolute',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    paddingRight : 30
  },
  menuButton: {
    marginLeft: 15,
    marginRight: 15,
    color : "red"
  },
})
