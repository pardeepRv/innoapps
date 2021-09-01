import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Alert
} from "react-native";
import { connect } from "react-redux";
import AddLine from "././PcAddOrderLine";
import CheckBox from "react-native-modest-checkbox";
import DBPCRequisitionHelper from "../DB/DBPCRequisitionHelper";
import APIHelper from "../APIHelper/APIHelper";
import Spinner from "react-native-loading-spinner-overlay";
import Utils from "../Utils/Utils";

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/PcCreateChangeOrderStyle";

class PcCreateChangeOrder extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "CREATE CHANGE ORDER",
      headerTintColor: "red",
      headerTitleStyle: { color: "black" },
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam("submitLinesAlert")}>
          <Text style={styles.menuButton}>SUBMIT</Text>
        </TouchableOpacity>
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      submitLinesAlert: this._submitLinesAlert
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      reqHeader: props.navigation.state.params.reqHeader,
      reqLines: props.navigation.state.params.reqLines,
      changeOrders: [],
      isLoading: false
    };

  }

  returnData(
    attribute,
    materialType,
    materialCategory,
    usageType,
    quantity,
    index
  ) {
    console.tron.log("Returned Attribute: ", attribute);
    console.tron.log("Returned Material Category ", materialCategory);
    var newChangeOrders = [...this.state.changeOrders];
    var newChangeOrder = {
      attribute: attribute,
      materialType: materialType,
      materialCategory: materialCategory,
      usageType: usageType,
      quantity: quantity,
      selected: true
    };

    if (index == null) {
      newChangeOrders.push(newChangeOrder);
    } else {
      newChangeOrders[index] = newChangeOrder;
    }

    this.setState({ changeOrders: newChangeOrders });
    console.tron.log("Create change order return data state", this.state);
  }

  onChangeCheckbox(selected, index) {
    var newChangeOrders = [...this.state.changeOrders];
    var changeOrder = newChangeOrders[index];
    changeOrder.selected = !changeOrder.selected;
    this.setState({ changeOrders: newChangeOrders });
  }

  deleteLinesAlert() {
    if (
      this.state.changeOrders.filter(changeOrder => changeOrder.selected)
        .length > 0
    ) {
      Alert.alert(
        "Delete Lines",
        "Are you sure you want to delete these lines?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: this.deleteLines.bind(this) }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "",
        "Please select at least one line to delete",
        [{ text: "Cancel", style: "cancel" }, { text: "OK" }],
        { cancelable: false }
      );
    }
  }

  deleteLines() {
    let unselectedChangeOrders = this.state.changeOrders.filter(
      changeOrder => !changeOrder.selected
    );
    this.setState({
      changeOrders: unselectedChangeOrders
    });
  }

  _submitLinesAlert = () => {
    if (
      this.state.changeOrders.filter(changeOrder => changeOrder.selected)
        .length > 0
    ) {
      Alert.alert(
        "Submit Lines",
        "Are you sure you want to submit these lines?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: this.submitLines.bind(this) }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "",
        "Please select at least one line to submit",
        [{ text: "Cancel", style: "cancel" }, { text: "OK" }],
        { cancelable: false }
      );
    }
  };

  submitLines = async () => {
    console.tron.log("Submitting change PO lines...");
    const changePOLines = await DBPCRequisitionHelper.saveChangePOLines(
      this.state.reqHeader,
      this.state.changeOrders
    );

    await DBPCRequisitionHelper.updateReqHeaderLineStatus(
      this.state.reqHeader.req_header_id,
      "pending",
      new Date()
    );

    console.tron.log("changePOLines: ", changePOLines);

    this.setState({
      isLoading: true
    });

    const username = await Utils.retrieveDataFromAsyncStorage("USER_NAME");
    const response = await APIHelper.postChangePOLines(username, changePOLines);

    this.setState({
      isLoading: false
    });

    setTimeout(async () => {
      if (response.ok) {
        console.tron.log("Response API ok: ", response.data);
        DBPCRequisitionHelper.removeChangePOLines(changePOLines);
        await DBPCRequisitionHelper.updateReqHeaderLineStatus(
          this.state.reqHeader.req_header_id,
          "processing",
          new Date()
        );

        Alert.alert(
          "",
          "Change order lines submitted!",
          [{ text: "OK", onPress: () => this.props.navigation.popToTop() }],
          { cancelable: false }
        );
      } else {
        console.tron.log(
          "Response API: failed",
          response.status + " - " + response.problem
        );

        Alert.alert(
          "",
          "Unable to submit the change order as there is no internet connection. The change order will be submitted when there is connection.",
          [{ text: "OK", onPress: () => this.props.navigation.popToTop() }],
          { cancelable: false }
        );
      }
    }, 100);
  };

  /* ***********************************************************
    * STEP 2
    * `renderRow` function. How each cell/row should be rendered
    * It's our best practice to place a single component here:
    *
    * e.g.
      return <MyCustomCell title={item.title} description={item.description} />
    *************************************************************/
  renderRow = ({ item, index }) => {
    return (
      <TouchableHighlight
        onPress={() =>
          this.props.navigation.navigate("AddLine", {
            selectedChangeOrder: item,
            index: index,
            reqHeader: this.state.reqHeader,
            reqLines: this.state.reqLines,
            returnData: this.returnData.bind(this)
          })
        }
      >
        <View style={styles.row}>
          <View style={styles.rowInfo}>
            <CheckBox
              checkboxStyle={styles.checkbox}
              onChange={checked => this.onChangeCheckbox(!item.selected, index)}
              checked={item.selected}
              label=""
            />
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.rowInfoTitle}>NAME</Text>
            <Text style={styles.rowInfoText}>{item.attribute.attribute_name}</Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.rowInfoTitle}>MATERIAL TYPE</Text>
            <Text style={styles.rowInfoText}>{item.materialType.type}</Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.rowInfoTitle}>ITEM DESC</Text>
            <Text style={styles.rowInfoText}>
              {item.materialCategory.item_description}
            </Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.rowInfoTitle}>USAGE TYPE</Text>
            <Text style={styles.rowInfoText}>{item.usageType.type}</Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.rowInfoTitle}>QUANTITY</Text>
            <Text style={styles.rowInfoText}>{item.quantity}</Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.rowInfoTitle}>UOM</Text>
            <Text style={styles.rowInfoText}>{Utils.calculateUOM(item.attribute.uom)}</Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.rowInfoTitle}>UNIT COST</Text>
            <Text style={styles.rowInfoText}>
              {item.materialCategory.unit_cost}
            </Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.rowInfoTitle}>CURRENCY</Text>
            <Text style={styles.rowInfoText}>
              {item.materialCategory.currency_code}
            </Text>
          </View>
          <View style={styles.rowSeparatorLine} />
        </View>
      </TouchableHighlight>
    );
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
  // for instance, if you kept 'favorites' in `this.state.favs`
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
        <Spinner visible={this.state.isLoading} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("AddLine", {
                reqHeader: this.state.reqHeader,
                reqLines: this.state.reqLines,
                selectedChangeOrder: null,
                index: null,
                returnData: this.returnData.bind(this)
              });
            }}
            style={
              this.state.changeOrders.length > 0
                ? styles.buttonStyle
                : styles.buttonStyleFull
            }
          >
            <View>
              <Text style={styles.buttonText}>Add Line</Text>
            </View>
          </TouchableOpacity>
          {this.state.changeOrders.length > 0 && (
            <TouchableOpacity
              onPress={this.deleteLinesAlert.bind(this)}
              style={styles.buttonStyle}
            >
              <View>
                <Text style={styles.buttonText}>Delete Line</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.line} />
        <View style={styles.line} />
        <Text style={styles.titleStyle}>ORDER LINES</Text>
        <View style={styles.shortLine} />

        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.changeOrders}
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PcCreateChangeOrder);
