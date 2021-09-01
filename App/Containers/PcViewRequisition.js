import React from "react";
import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import Change from "././PcCreateChangeOrder";
import DBPCHelper from "../DB/DBPCHelper";

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from "./Styles/PcViewRequisitionStyle";

class PcViewRequisition extends React.PureComponent {
  /************************************************************
   * STEP 1
   * This is an array of objects with the properties you desire
   * Usually this should come from Redux mapStateToProps
   *************************************************************/

   static navigationOptions = ({ navigation }) => {
     return {
       title: navigation.state.params ==='undefined' || navigation.state.params.title === 'undefined' ? 'View Requisition': navigation.state.params.title,
       headerTintColor: 'red',
       headerTitleStyle: { color: 'black' },

     };
   };

  reqHeaderLine = "";

  state = {
    reqHeader: {},
    reqLines: [],
    title:"",
  };

  constructor(props) {
    super(props);

    this.getReqLines(props.navigation.state.params.reqHeaderLine);

  }

  async getReqLines(reqHeaderLine) {
    var reqLines = await DBPCHelper.getReqLines(reqHeaderLine);
    this.setState({
      reqHeader: reqLines[0],
      reqLines: reqLines,

    });

    console.tron.log("PRINT LINES:", this.state.reqLines)

    var title = this.state.reqHeader.requisition_number
    this.props.navigation.setParams({title: title.toString()})

  }

  componentWillMount() {
}

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/


  renderRow = ({ item }) => {
    return (
      <View style={styles.row}>
        <View style={styles.rowInfo}>
          <Text style={styles.rowInfoTitle}>{item.attribute_name}</Text>
          <Text style={styles.rowInfoText}>
            {item.quantity + " " + item.uom}
          </Text>
        </View>
        <View style={styles.rowInfo}>
          <Text style={styles.rowInfoTitle}>MATERIAL TYPE</Text>
          <Text style={styles.rowInfoText}>{item.service_type}</Text>
        </View>
        <View style={styles.rowInfo}>
          <Text style={styles.rowInfoTitle}>ITEM DESC</Text>
          <Text style={styles.rowInfoText}>{item.item_description}</Text>
        </View>
        <View style={styles.rowInfo}>
          <Text style={styles.rowInfoTitle}>USAGE TYPE</Text>
          <Text style={styles.rowInfoText}>{item.usage_type}</Text>
        </View>
        <View style={styles.rowInfo}>
          <Text style={styles.rowInfoTitle}>QUANTITY</Text>
          <Text style={styles.rowInfoText}>{item.quantity}</Text>
        </View>
        <View style={styles.rowInfo}>
          <Text style={styles.rowInfoTitle}>UOM</Text>
          <Text style={styles.rowInfoText}>{item.uom}</Text>
        </View>
        <View style={styles.rowInfo}>
          <Text style={styles.rowInfoTitle}>UNIT COST</Text>
          <Text style={styles.rowInfoText}>{item.unit_cost}</Text>
        </View>
        <View style={styles.rowInfo}>
          <Text style={styles.rowInfoTitle}>CURRENCY</Text>
          <Text style={styles.rowInfoText}>{item.currency_code}</Text>
        </View>
        <View style={styles.rowSeparatorLine} />
      </View>
    );
  }

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
    if (this.state.reqHeader.local_status == "pending" || this.state.reqHeader.local_status == "processing"){
      return (
        <View style={styles.container}>
          <View style={styles.ButtonView}>
            <TouchableOpacity
            disabled={true}
              style={ styles.createChangeOrderButtonInactive}>
              <View>
                <Text style={styles.createChangeOrderButtonText}>
                  Create Change Order
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.mainContainer}>
            <View style={styles.mainContainer}>
              <View style={styles.line} />
              <View style={styles.container}>
                <Text style={styles.titleStyle}>Order Header</Text>
                <View style={styles.shortLine} />
                <View style={styles.infoContainer}>
                  <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>PO NUMBER</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.order_number
                        ? this.state.reqHeader.order_number
                        : ""}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>SUPPLIER</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.supplier_name}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>PROPERTY</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.location_name}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>FLOOR</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.floor_number}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>STATUS</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.status}
                    </Text>
                  </View>

                  <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>CURRENCY CODE</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.currency_code}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>BUILDING</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.building_number}
                    </Text>
                  </View>
                  <View style={styles.lastInfo}>
                    <Text style={styles.infoTextLeft}>UNIT</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.unit_id}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.mainContainer}>
              <View style={styles.container}>
                <View style={styles.line} />
                <Text style={styles.titleStyle}>Order Line History</Text>
                <View style={styles.shortLine} />
                <View style={styles.container}>
                  <FlatList
                    contentContainerStyle={styles.listContent}
                    data={this.state.reqLines}
                    renderItem={this.renderRow}
                    keyExtractor={this.keyExtractor}
                    initialNumToRender={this.oneScreensWorth}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    ListEmptyComponent={this.renderEmpty}
                    ItemSeparatorComponent={this.renderSeparator}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }else {
      return (
        <View style={styles.container}>
          <View style={styles.ButtonView}>
            <TouchableOpacity
              onPress={
                this.state.reqHeader.order_number
                  ? () => {
                      this.props.navigation.navigate("Change", {
                        reqHeader: this.state.reqHeader,
                        reqLines: this.state.reqLines
                      });
                    }
                  : null
              }
              style={
                this.state.reqHeader.order_number
                  ? styles.createChangeOrderButtonActive
                  : styles.createChangeOrderButtonInactive
              }
            >
              <View>
                <Text style={styles.createChangeOrderButtonText}>
                  Create Change Order
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.mainContainer}>
            <View style={styles.mainContainer}>
              <View style={styles.line} />
              <View style={styles.container}>
                <Text style={styles.titleStyle}>Order Header</Text>
                <View style={styles.shortLine} />
                <View style={styles.infoContainer}>
                  <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>PO NUMBER</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.order_number
                        ? this.state.reqHeader.order_number
                        : ""}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>SUPPLIER</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.supplier_name}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>PROPERTY</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.location_name}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>FLOOR</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.floor_number}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>STATUS</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.status}
                    </Text>
                  </View>

                  <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>CURRENCY CODE</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.currency_code}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>BUILDING</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.building_number}
                    </Text>
                  </View>
                  <View style={styles.lastInfo}>
                    <Text style={styles.infoTextLeft}>UNIT</Text>
                    <Text style={styles.infoText}>
                      {this.state.reqHeader.unit_id}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.mainContainer}>
              <View style={styles.container}>
                <View style={styles.line} />
                <Text style={styles.titleStyle}>Order Line History</Text>
                <View style={styles.shortLine} />
                <View style={styles.container}>
                  <FlatList
                    contentContainerStyle={styles.listContent}
                    data={this.state.reqLines}
                    renderItem={this.renderRow}
                    keyExtractor={this.keyExtractor}
                    initialNumToRender={this.oneScreensWorth}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    ListEmptyComponent={this.renderEmpty}
                    ItemSeparatorComponent={this.renderSeparator}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
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
)(PcViewRequisition);
