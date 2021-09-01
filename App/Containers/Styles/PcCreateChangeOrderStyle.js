import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Metrics } from "../../Themes/";

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
    justifyContent: "center"
  },
  boldLabel: {
    fontWeight: "bold",
    alignSelf: "center",
    color: Colors.snow,
    textAlign: "center",
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: "center",
    color: Colors.snow
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  mainContainer: {
    backgroundColor: Colors.greyBG,
    marginTop: 10
  },
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  line: {
    backgroundColor: Colors.lineGrey,
    height: 1,
    width: "100%"
  },
  shortLine: {
    backgroundColor: Colors.lineGrey,
    height: 1,
    alignSelf: "center",
    width: "25%",
    marginBottom: 5
  },
  titleStyle: {
    margin: 15,
    fontSize: 14,
    alignSelf: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "white"
  },
  buttonStyle: {
    width: "45%",
    height: 45,
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    backgroundColor: "red",
    justifyContent: "center",
    borderRadius: 25,
    marginHorizontal: 10,
    margin: 10
  },
  buttonStyleFull: {
    width: "95%",
    height: 45,
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    backgroundColor: "red",
    justifyContent: "center",
    borderRadius: 25,
    marginHorizontal: 10,
    margin: 10
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center"
  },
  info: {
    marginHorizontal: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.lightGreyBG,
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lineGrey
  },
  infoTextLeft: {
    color: Colors.lightGreyText,
    fontSize: 12
  },
  infoText: {
    fontSize: 12
  },
  infoContainer: {
    backgroundColor: "white"
  },
  rowInfo: {
    marginHorizontal: 5,
    backgroundColor: Colors.lightGreyBG,
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lineGrey
  },
  rowSeparatorLine: {
    backgroundColor: "red",
    height: 1,
    width: "100%",
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
  checkbox : {
    height: 30,
    marginLeft: 10
  },
  checkboxDisabled : {
    height: 30,
    marginLeft: 10,
    tintColor: Colors.lineGrey,
  },
  menuButton: {
    marginLeft: 15,
    marginRight: 15,
    color : "red"
  },
});
