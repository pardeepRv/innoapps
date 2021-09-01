import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.greyBG,
    marginTop: 10
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  line: {
    backgroundColor: Colors.lineGrey,
    height: 1,
    width: '100%'
  },
  shortLine: {
    backgroundColor: Colors.lineGrey,
    height: 1,
    alignSelf: 'center',
    width: '25%',
    marginBottom: 20
  },
  titleStyle: {
    margin: 15,
    fontSize: 14,
    alignSelf: 'center'
  },
  info: {
    marginHorizontal: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.lightGreyBG,
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
  lastInfo: {
    marginHorizontal: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.lightGreyBG,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lineGrey,
    marginBottom: 10
  },
  buttonView: {
    backgroundColor: 'white'
  },
  createChangeOrderButtonActive: {
    width: '90%',
    height: 40,
    backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 25
  },
  createChangeOrderButtonInactive: {
    width: '90%',
    height: 40,
    backgroundColor: Colors.lightGreyText,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 25
  },
  createChangeOrderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  rowInfo: {
    marginHorizontal: 5,
    backgroundColor: Colors.lightGreyBG,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lineGrey,
  },
  rowSeparatorLine: {
    backgroundColor: Colors.lineGrey,
    height: 1,
    width: '100%',
    marginTop: 5
  },
  rowInfoTitle: {
    fontSize: 12,
    paddingLeft: 10
  },
  rowInfoText: {
    fontSize: 12,
    paddingRight: 10
  },
})
