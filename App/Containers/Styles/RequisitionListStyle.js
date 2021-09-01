import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  row: {
    height: 50,
    backgroundColor: "rgba(250,250,250,0.8)",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  rowLabel: {
    color: Colors.Black,
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  errorLabel: {
    color: "red",
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  rowLabel3: {
    color: Colors.Red,
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'stretch',
    textAlign: 'center',
    flex: 1
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
    flex: 0.27,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerSection2: {
    flex: 0.27,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerSection3: {
    flex: 0.46,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowSection1: {
    flex: 0.27,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowSection2: {
    flex: 0.27,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowSection3: {
    flex: 0.46,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerLabel: {
    color: Colors.red,
    fontWeight: 'bold',
    fontSize: 12
  },
  rowSeparatorLine: {
    backgroundColor: Colors.lineGrey,
    height: 0.5,
    width: '100%'
  },
  activityIndicator: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 10
 },
})
