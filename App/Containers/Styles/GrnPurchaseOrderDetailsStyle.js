import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../Themes/";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.greyBG,
    flex: 1
  },
  mainContainer: {
    backgroundColor: Colors.greyBG,
    flex: 1
  },
  headerContainer: {
    backgroundColor: "white",
    width: "100%",
    justifyContent: "center"
  },
  bottomContainer: {
    backgroundColor: "white",
    flex: 1
  },
  tableContainer: {
    backgroundColor: "white",
    flex: 1,
    width: "95%",
    alignSelf: "center",
    justifyContent: "center"
  },
  titleStyle: {
    margin: 15,
    fontSize: 14,
    alignSelf: "center"
  },
  menuButton: {
    marginLeft: 15,
    marginRight: 15,
    color: "red"
  },
  line: {
    backgroundColor: Colors.lineGrey,
    height: 0.5,
    width: "100%"
  },
  lineWithBottomSpace: {
    backgroundColor: Colors.lineGrey,
    height: 0.5,
    width: "100%",
    marginBottom: 10
  },
  pinkInfoContainer: {
    marginHorizontal: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#FCE8E7",
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  infoTextLeft: {
    paddingLeft: 5,
    marginTop: 10,
    marginBottom: 10,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  lastGreyInfoContainer: {
    marginHorizontal: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.lightGreyBG,
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  shortLine: {
    backgroundColor: "grey",
    height: 1,
    alignSelf: "center",
    width: "25%",
    marginBottom: 10
  },
  titleStyle: {
    margin: 15,
    fontSize: 14,
    alignSelf: "center"
  },
  header: {
    backgroundColor: Colors.lightGreyBG,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center"
  },
  headerSection1: {
    width: "5%",
    justifyContent: "center"
  },
  headerSection2: {
    width: "20%",
    justifyContent: "center"
  },
  headerSection3: {
    width: "33%",
    justifyContent: "center"
  },
  headerSection4: {
    width: "14%",
    justifyContent: "center"
  },
  headerSection5: {
    width: "28%",
    justifyContent: "center"
  },
  row: {
    backgroundColor: Colors.lightGreyBG,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  rowSection1: {
    width: "5%",
    alignItems: "stretch",
    justifyContent: "center",

  },
  rowSection1Pending: {
    width: "5%",
    alignItems: "stretch",
    backgroundColor: "rgba(255,128,0,1)",
    justifyContent: "center",
  },
  rowSection1Processing: {
    width: "5%",
    alignItems: "stretch",
    backgroundColor: "rgba(0,204,0,1)",
    justifyContent: "center",
  },
  rowSection2: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  rowSection3: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center"
  },
  rowSection4: {
    width: "14%",
    justifyContent: "center",
    alignItems: "center"
  },
  rowSection5: {
    width: "18%",
    justifyContent: "center",
    alignItems: "center"
  },
  rowSection6: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center"
  },
  headerLabel: {
    color: Colors.red,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "left",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    marginBottom: 5
  },
  rowLabel: {
    color: Colors.Black,
    fontWeight: "bold",
    fontSize: 12,
    alignSelf: "stretch",
    textAlign: "left",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    marginBottom: 5
  },
  speratorline: {
    backgroundColor: Colors.lineGrey,
    height: 0.5,
    width: "100%",
    marginBottom: 5,
    justifyContent: "center",
    alignSelf: "center"
  },
  submitAllCreateReceiptsButton: {
    width: "90%",
    height: 40,
    backgroundColor: "red",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 25,
    marginBottom: 20
  },
  submitAllCreateReceiptsButtonInactive: {
    width: '90%',
    height: 40,
    backgroundColor: Colors.lightGreyText,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 25,
    marginBottom: 20
  },
  submitAllCreateReceiptsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  checkbox : {
    height: 20,
    width:20,
    marginLeft:-1
  },
  checkboxDisabled : {
    height: 20,
    width: 20,
    marginLeft:-1,
    tintColor: Colors.lineGrey
  },
});
