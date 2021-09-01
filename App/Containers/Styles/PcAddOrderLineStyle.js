import {StyleSheet} from 'react-native'
import {Colors, Metrics} from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold'
  },
  box: {
    width: '100%',
    height: 60,
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
    marginLeft: 10,
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
  switchText: {
    flexGrow: 1,
    alignSelf: 'center',
    color: 'black',
    fontSize: 14,
    textAlign: 'right',
    marginRight: 70
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
  emptyBox: {
    width: '100%',
    height: 30,
    backgroundColor: '#f0f4f7',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd'
  },
  textBox: {
    width: '100%',
    height: 150,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd'
  },
  input: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
    padding: 10
  },
  quantityInput: {
    margin: 5,
    fontSize: 14,
    borderColor: 'grey',
    borderWidth: 1,
    width: '12%',
    textAlign: 'center'
  },
  infoText: {
    flexGrow: 1,
    alignSelf: 'center',
    fontSize: 14,
    textAlign: 'right',
    margin: 10
  },
  switchStyle: {
    alignSelf: 'flex-end',
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
menuButton: {
  marginLeft: 15,
  marginRight: 15,
  color : "red"
}
});
