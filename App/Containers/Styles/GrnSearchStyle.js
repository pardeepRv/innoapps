import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  textBox: {
    width: "100%",
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    paddingLeft:10,
    paddingRight:10,
  },
  titleBox:{
    backgroundColor: '#F0F4F7',
  },
  title: {
    width: "100%",
    paddingLeft:10,
    paddingRight:10,
    marginTop:10,
    marginBottom:10,
    fontSize:12
  },
  line: {
    backgroundColor: 'grey',
    height: 0.5,
    width: '100%'
  },
  box: {
    width: "100%",
    height: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd'
  },
  boxView: {
    flex:1,
    flexDirection: 'row'
  },
  arrow: {
    width : 25,
    height : 25,
    alignSelf: 'center',
    margin : 10
  },
  question: {
    flexGrow: 1,
    alignSelf: 'center',
    color: 'black',
    fontSize: 14,
    textAlign: 'left',
    margin : 10
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
  datePicker: {
    width: "100%",
    height: 50,
    backgroundColor: 'transparent',
    position:'absolute'
  },
  pickerContainer: {
    width: "100%",
    height: 50,
    backgroundColor: 'transparent',
    position:'absolute'
  },
  dateAnswer: {
    color: 'black',
    fontSize: 14,
    textAlign: 'right',
    marginRight : 30,
    marginTop : 7
  },
  datePlaceHolder: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'right',
    marginRight : 30,
    marginTop : 7
  }
})
