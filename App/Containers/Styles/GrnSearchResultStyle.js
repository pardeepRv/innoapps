import { StyleSheet } from 'react-native'
import { ApplicationStyles,Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  headerContainer: {
    backgroundColor: Colors.background
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  row: {
    height: 50,
    backgroundColor: "rgba(250,250,250,1)",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  rowLabel: {
    color: Colors.Black,
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'stretch',
    textAlign: 'left',
    paddingLeft:10,
    paddingRight:10
  },
  rowLabel3: {
    color: Colors.Red,
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'stretch',
    textAlign: 'left',
    paddingLeft:10,
    paddingRight:10

  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  listContent: {

  },
  rightArrow: {
    width: 10,
    height: 20,
    marginRight: Metrics.doubleBaseMargin,
    marginLeft: Metrics.baseMargin,
    alignSelf: 'flex-end'
  },
  header: {
    height: 40,
    backgroundColor: Colors.lightGreyBG,
    flexDirection: 'row',
  },
  headerSection1: {
    width:'30%',
    justifyContent: 'center'

  },
  headerSection2: {
  width:'35%',
    justifyContent: 'center'
  },
  headerSection3: {
    width:'30%',
    justifyContent: 'center',
  },
  headerSeparator: {
    width:'1%',
    justifyContent: 'center',
  },
  rowSection1: {
    width:'30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowSection2: {
      width:'35%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowSection3: {
      width:'25%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowSection4: {
    width:'10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerLabel: {
    color: Colors.red,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'left',
    paddingLeft:10,
    paddingRight:10
  },
  rowSeparatorLine: {
    backgroundColor: 'grey',
    height: 0.5,
    width: '100%'
  },
  separatorLine:{
    width:'1%',
    height:0.5,
    color:Colors.red,
    justifyContent: 'center'
  }
})
