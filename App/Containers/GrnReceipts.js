import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { Images } from "../Themes";
import GrnEditReceipt from "././GrnEditReceipt";
import { StackNavigator } from "react-navigation";
import DBGrnReceiptDataHelper from "../DB/DBGrnReceiptDataHelper";
import Spinner from "react-native-loading-spinner-overlay";
import Utils from "../Utils/Utils";
import { NavigationEvents } from "react-navigation";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/GrnReceiptsStyle";

// For API
import API from "../../App/Services/Api";
import FJSON from "format-json";

class GrnReceipts extends Component {
  api = {};
  static navigationOptions = {
    title: "RECEIPTS"
  };
  
  constructor(props) {
    super(props);
    this.api = API.create();

    this.state = {
      isLoading: false,
      dataObjects:[],
      envURL:""
    };
  }

  componentDidMount() {
    this.refreshPayload();
  }

  refreshPayload = () => {
    this.getReceiptApi();

  }

  // MARK: Api
  async getReceiptApi() {
    this.setState({
      isLoading: false,
    });
  //this.api = API.create();
    // api = new API.create();
    //api = {};
    
    const environment = await Utils.retrieveDataFromAsyncStorage("ENVIRONMENT");
    console.tron.log("Environment Variable (API) ", environment);
    //console.tron.log("Original baseURL", API.create(baseURL));
   // envURL = "";
    if (environment == 'SKAD3')
    {
      console.tron.log("INTO IF");
      envURL = "https://skad3a1-skanskapaas.inoappsproducts.com/ords/inoapps_ec/";
      console.tron.log("New ENV URL ", envURL);
      //this.api = new API.create(envURL);
      console.tron.log(this.api, "LETS GOOOO");
      
    }else if (environment == 'SKAD2'){
      envURL = "https://skad2a1-skanskapaas.inoappsproducts.com/ords/inoapps_ec/";
      console.tron.log("New ENV URL ", envURL);
     // this.api = new API.create(envURL);

    }else if (environment == 'SKAD1'){
      envURL = "https://skad1a1-skanskapaas.inoappsproducts.com/ords/inoapps_ec/";
      console.tron.log("New ENV URL ", envURL);
      //this.api = new API.create(envURL);

  }else if (environment == 'SKAT1'){
    envURL = "https://skat1a1-skanskapaas.inoappsproducts.com/ords/inoapps_ec/";
    console.tron.log("New ENV URL ", envURL);
    //this.api = new API.create(envURL);

  }else if (environment == 'PTEST2'){
    envURL = "https://ptest2a1-inoapps4.inoapps.com/ords/inoapps_ec/";
    console.tron.log("New ENV URL ", envURL);
    //this.api = new API.create(envURL);

  }else if (environment == 'PDEV2'){
    envURL = "https://pdev2a1-inoapps4.inoapps.com/ords/inoapps_ec/";
   // this.api = new API.create(envURL);
    console.tron.log("New ENV URL RECEIPTS ", envURL);
  
  
  }else if (environment == 'PDEV1'){
      envURL = "https://pdev1a1-inoapps4.inoapps.com/ords/inoapps_ec/";
     // this.api = new API.create(envURL);
      console.tron.log("New ENV URL RECEIPTS ", envURL);

  }else if (environment == 'PTEST1'){
    envURL = "https://ptest1a1-inoapps4.inoapps.com/ords/inoapps_ec/";
   // this.api = new API.create(envURL);
    console.tron.log("New ENV URL RECEIPTS ", envURL);
  }




    const api = API.create(envURL);
    console.tron.log("New ENV URL RECEIPTS WORKING??? ", envURL);
    const username = await Utils.retrieveDataFromAsyncStorage("USER_NAME");
    const response = await api.getReceipts(username);
    const receipts = response.data.items;
    console.tron.log("Receipts: ", receipts);

    // Save to DB
    await DBGrnReceiptDataHelper.saveReceipts(receipts);

    this.setState({
      isLoading: false,
    });

    setTimeout(() => {
      this.getDBGrnReceipt();
    }, 100)


  }

  async getDBGrnReceipt() {

    this.setState({
        dataObjects:[]
    });
        // Retrieve from DB
    let dbReceipts = await DBGrnReceiptDataHelper.getReceipts();
    console.tron.log("DB r: ", dbReceipts);

        dbReceipts.map((receipt) => {
          if (receipt.quantity > 0) {
          this.state.dataObjects.push(receipt)
        }
      })
  }

  /************************************************************
   * STEP 1
   * This is an array of objects with the properties you desire
   * Usually this should come from Redux mapStateToProps
   *************************************************************/
  state = {
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

  renderRow = ({item, index }) => {
    if (item.submitStatus == "processing"){
      return (
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate("GrnEditReceipt", {
              entityReceipt: item,
              index: index
            })
          }
        >
          <View>
            <View style={styles.row}>
              <View style={styles.rowSection1Processing}>
                <Text style={styles.rowLabel}>{item.order_number}</Text>
              </View>
              <View style={styles.rowSection2}>
                <Text style={styles.rowLabel}>{item.item_description}</Text>
              </View>
              <View style={styles.rowSection3}>
                <Text style={styles.rowLabel3}>{item.receipt_num}</Text>
              </View>
              <View style={styles.rowSection4}>
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
    }else if (item.submitStatus == "pending"){
      return (
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate("GrnEditReceipt", {
              entityReceipt: item,
              index: index
            })
          }
        >
          <View>
            <View style={styles.row}>
              <View style={styles.rowSection1Pending}>
                <Text style={styles.rowLabel}>{item.order_number}</Text>
              </View>
              <View style={styles.rowSection2}>
                <Text style={styles.rowLabel}>{item.item_description}</Text>
              </View>
              <View style={styles.rowSection3}>
                <Text style={styles.rowLabel3}>{item.receipt_num}</Text>
              </View>
              <View style={styles.rowSection4}>
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
    }else{
    return (
      <TouchableHighlight
        onPress={() =>
          this.props.navigation.navigate("GrnEditReceipt", {
            entityReceipt: item,
            index: index
          })
        }
      >
        <View>
          <View style={styles.row}>
            <View style={styles.rowSection1}>
              <Text style={styles.rowLabel}>{item.order_number}</Text>
            </View>
            <View style={styles.rowSection2}>
              <Text style={styles.rowLabel}>{item.item_description}</Text>
            </View>
            <View style={styles.rowSection3}>
              <Text style={styles.rowLabel3}>{item.receipt_num}</Text>
            </View>
            <View style={styles.rowSection4}>
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
  };
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
    return (
      <View style={styles.container}>
      <NavigationEvents
          onWillFocus={payload => {
            console.tron.log("will focus", payload);
            this.refreshPayload();
          }}
        />
        <Spinner visible={this.state.isLoading} />

        <ImageBackground
          source={Images.grnReceiptsBackground}
          style={styles.backgroundImage}
        >
          <View style={styles.header}>
            <View style={styles.headerSection1}>
              <Text style={styles.headerLabel}>Order No</Text>
            </View>
            <View style={styles.headerSection2}>
              <Text style={styles.headerLabel}>Item Description</Text>
            </View>
            <View style={styles.headerSection3}>
              <Text style={styles.headerLabel}>Receipt No</Text>
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
        </ImageBackground>
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
)(GrnReceipts);
