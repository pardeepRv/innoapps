import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableHighlight,
  ActivityIndicator, Alert
} from "react-native";
import { connect } from "react-redux";
import { Images } from "../Themes";
import ViewRequisition from "././PcViewRequisition";
import { StackNavigator } from "react-navigation";
import DBPCHelper from "../DB/DBPCHelper";
import Spinner from "react-native-loading-spinner-overlay";
import Utils from "../Utils/Utils";
import DBPCRequisitionHelper from "../DB/DBPCRequisitionHelper";
import { NavigationEvents } from "react-navigation";

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from "./Styles/RequisitionListStyle";

// For API
import API from "../Services/Api";
import FJSON from "format-json";

class RequisitionList extends React.PureComponent {
  static navigationOptions = {
    title: "REQUISITIONS",
    headerBackTitle: "back"
  };

  constructor(props) {
    super(props);

      this.state = {
          dataObjects: [],
          dataToSort:[]
      }
  }

  componentDidMount() {
    this.refreshData();

  }

  refreshData = () => {
    this.getAPIReqHeaderLines();

  }

  pendingPOAlert = () => {
    Alert.alert(
      "",
      "This requisition is pending a purchase order.",
      [
        { text: "OK"}
      ],
      { cancelable: false }
    );
  };

  processingAlert = () => {
    Alert.alert(
      "",
      "This requisition is still being processed.",
      [
        { text: "OK" }
      ],
      { cancelable: false }
    );
  };

  async getAPIReqHeaderLines() {
    this.setState({
      isLoading: true
    })

    const api = API.create();
    const username = await Utils.retrieveDataFromAsyncStorage("USER_NAME");
    const response = await api.getReqHeaderLines(username);
    const reqHeaderLines = response.data.items;
    console.tron.log("Req header lines: ", reqHeaderLines);

    // Save to DB
    await DBPCHelper.saveReqHeaderLines(reqHeaderLines);

    this.setState({
      isLoading: false

    })

    setTimeout(() => {
      this.getDBReqHeaderLines()
    }, 100)
  }



  async getDBReqHeaderLines() {
    this.setState({
        dataObjects:[]
    });
    // Retrieve from DB
    let dbReqHeaderLines = await DBPCHelper.getReqHeaders();
    console.tron.log("DB req header lines: ", dbReqHeaderLines);

    this.setState({
      dataObjects: dbReqHeaderLines
    });

  }
  /************************************************************
   * STEP 1
   * This is an array of objects with the properties you desire
   * Usually this should come from Redux mapStateToProps
   *************************************************************/
  state = {
    isLoading: false,
    dataObjects: []
  };

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow = ({ item }) => {
    if (item.status == "processing"){
      return (
        <TouchableHighlight
          onPress={() => {
            if (item.requisition_number == null || item.requisition_number == undefined || item.requisition_number == "") {
                      this.processingAlert()
            }else {
              if (item.order_number == null || item.order_number == undefined || item.order_number == "") {
                  this.pendingPOAlert()
              }else {

                this.props.navigation.navigate("ViewRequisition",
                {reqHeaderLine : item,

                }
              );}
          }
        }}
        >
          <View>
            <View style={styles.row}>
              <View style={styles.rowSection1}>
                <Text style={styles.rowLabel}>{item.unit_id}</Text>
              </View>
              <View style={styles.rowSection2}>
                <Text style={styles.rowLabel}>{item.requisition_number}</Text>
              </View>
              <View style={styles.rowSection3}>
                <Text style={styles.rowLabel3}>
                  {"Processing"}
                </Text>
                <Image
                  source={Images.rightArrow}
                  style={styles.rightArrow}
                  resizeMode="stretch"
                />
              </View>
            </View>
            <View style={styles.rowSeparatorLine} />
          </View>
        </TouchableHighlight>
      );
    }else if (item.status == "pending"){
      return (
        <TouchableHighlight
          onPress={() => {
            if (item.requisition_number == null || item.requisition_number == undefined || item.requisition_number == "") {
                      this.processingAlert()
            }else {
              if (item.order_number == null || item.order_number == undefined || item.order_number == "") {
                  this.pendingPOAlert()
              }else {
                this.props.navigation.navigate("ViewRequisition",
                {reqHeaderLine : item,

                }
              );}
          }
        }}
        >
          <View>
            <View style={styles.row}>
              <View style={styles.rowSection1}>
                <Text style={styles.rowLabel}>{item.unit_id}</Text>
              </View>
              <View style={styles.rowSection2}>
                <Text style={styles.rowLabel}>{item.requisition_number}</Text>
              </View>
              <View style={styles.rowSection3}>
                <Text style={styles.rowLabel3}>
                  {"Pending"}
                </Text>
                <Image
                  source={Images.rightArrow}
                  style={styles.rightArrow}
                  resizeMode="stretch"
                />
              </View>
            </View>
            <View style={styles.rowSeparatorLine} />
          </View>
        </TouchableHighlight>
      );
    }else if (item.status == "Error"){
      return (
        <TouchableHighlight

          onPress={() => {

        }}
        >
          <View>
            <View style={styles.row}>
              <View style={styles.rowSection1}>
                <Text style={styles.rowLabel}>{item.unit_id}</Text>
              </View>
              <View style={styles.rowSection2}>
                <Text style={styles.errorLabel}>{item.status}</Text>
              </View>
              <View style={styles.rowSection3}>
                <Text style={styles.rowLabel3}>
                  {item.order_number != 0 ? item.order_number : ""}
                </Text>
                <Image
                  source={Images.rightArrow}
                  style={styles.rightArrow}
                  resizeMode="stretch"
                />
              </View>
            </View>
            <View style={styles.rowSeparatorLine} />
          </View>
        </TouchableHighlight>
      );
    }else {
      return (
        <TouchableHighlight
          onPress={() => {
            if (item.requisition_number == null || item.requisition_number == undefined || item.requisition_number == "") {
                      this.processingAlert()
            }else {
              if (item.order_number == null || item.order_number == undefined || item.order_number == "") {
                  this.pendingPOAlert()
              }else {
                this.props.navigation.navigate("ViewRequisition",
                {reqHeaderLine : item,

                }
              );}
          }
        }}
        >
          <View>
            <View style={styles.row}>
              <View style={styles.rowSection1}>
                <Text style={styles.rowLabel}>{item.unit_id}</Text>
              </View>
              <View style={styles.rowSection2}>
                <Text style={styles.rowLabel}>{item.requisition_number}</Text>
              </View>
              <View style={styles.rowSection3}>
                <Text style={styles.rowLabel3}>
                  {item.order_number != 0 ? item.order_number : ""}
                </Text>
                <Image
                  source={Images.rightArrow}
                  style={styles.rightArrow}
                  resizeMode="stretch"
                />
              </View>
            </View>
            <View style={styles.rowSeparatorLine} />
          </View>
        </TouchableHighlight>
      );
    }
  };

  /************************************************************
   * STEP 3
   * Consider the configurations we've set below.  Customize them
   * to your liking!  Each with some friendly advice.
   *************************************************************/

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index;

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20;

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
      <NavigationEvents
          onWillFocus={payload => {
            console.tron.log("will focus", payload);
            this.refreshData();
          }}
        />
      <Spinner visible={this.state.isLoading} />

          <ImageBackground
            style={styles.background}
            source={Images.homeBackground}
          >
          </ImageBackground>
          <View style={styles.header}>
            <View style={styles.headerSection1}>
              <Text style={styles.headerLabel}>Unit No.</Text>
            </View>
            <View style={styles.headerSection2}>
              <Text style={styles.headerLabel}>Req No</Text>
            </View>
            <View style={styles.headerSection3}>
              <Text style={styles.headerLabel}>PO No</Text>
            </View>
          </View>
          <FlatList
            contentContainerStyle={styles.listContent}
            data={this.state.dataObjects}
            renderItem={this.renderRow}
            keyExtractor={this.keyExtractor}
            initialNumToRender={this.oneScreensWorth}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={this.renderEmpty}
            ItemSeparatorComponent={this.renderSeparator}
          />

      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    // ...redux state to props here
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequisitionList);
