import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from "react-native";
import CheckBox from 'react-native-modest-checkbox'
import { connect } from "react-redux";
import { Images } from "../Themes";
import GrnReceiptDetails from "././GrnReceiptDetails";
import Utils from "../Utils/Utils";
import DBGrnPurchaseOrderDataHelper from "../DB/DBGrnPurchaseOrderDataHelper";
import Spinner from "react-native-loading-spinner-overlay";
import CreateReceipt from "../Models/CreateReceipt";
import CreateReceiptsAPIHelper from "../APIHelper/CreateReceiptsAPIHelper";
import API from "../../App/Services/Api";

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/GrnPurchaseOrderDetailsStyle";

class GrnPurchaseOrderDetails extends Component {

    api = {};
    photoURL: "";
    file_id: 0;
    data: FormData;
    totalReceiptsToPost:0;

    constructor(props) {
      super(props);
      this.state = {
        entityPurchaseOrder: props.navigation.state.params.entityPurchaseOrder,
        createReceipt: props.navigation.state.params.createReceipt,
        dataObjects: [],
        filteredOrderLines:[],
        createReceiptObjects:[],
        receiptsToPost:[],
        isLoading: false,
        isChecked : false,
        currentNoOfReceiptsToPost: 0,
        entireReceipts:[],
        totalCount:0,
      };


      this.api = API.create();

    }

  static navigationOptions = ({navigation}) => {
    return {
      title: "PURCHASE ORDER",
      headerTintColor: 'red',
      headerTitleStyle: {
        color: 'black'
      },
      headerRight:

      (<TouchableOpacity onPress={navigation.getParam('submitReceiptAlert')}>
        <Text style={styles.menuButton}>SUBMIT</Text>
      </TouchableOpacity>)

    }
  };

  componentDidMount() {
    this.props.navigation.setParams({submitReceiptAlert: this._submitReceiptAlert})
    console.tron.log("Component Did mount");
    this.getDBGrnPO();
    this.getCreateReceipts();
  }

  checkPoStatus(){
    var count = 0
    for (let i = 0; i < this.state.filteredOrderLines.length; i++) {
      let entity = this.state.filteredOrderLines[i];
      if (entity.submitStatus != "processing" && entity.submitStatus != "pending" ){
        count += 1
      }
    }

    console.tron.log("Print Count:", count)
    this.setState({
      totalCount:count
    });
  }

  async getDBGrnPO() {
    // Retrieve from DB
    let dbPurchaseOrders = await DBGrnPurchaseOrderDataHelper.getPOByOrderNumber(
      this.state.entityPurchaseOrder.order_number
    );
    console.tron.log("DB rrrr: ", dbPurchaseOrders);

    dbPurchaseOrders.map((orderLine) => {
      if (orderLine.quantity_available_to_receive > 0 ){
        this.state.filteredOrderLines.push(orderLine)
      }
    })
    console.tron.log("filteredOrderLines: ", this.state.filteredOrderLines);

   this.setState({
      dataObjects: this.state.filteredOrderLines
    });

    this.checkPoStatus();
  }

  async getCreateReceipts() {
    // Retrieve from DB
    let dbCreateReceipts = await DBGrnPurchaseOrderDataHelper.getCreateReceipts(
      this.state.entityPurchaseOrder.order_number
    );
    console.tron.log("createReceipts retrieved from DB: ", dbCreateReceipts,this.state.entityPurchaseOrder.order_number);

    this.setState({
      createReceiptObjects: dbCreateReceipts
    });
  }

  returnData(edited,comments, photoURL, quantity, index){

    let updatedData = [...this.state.dataObjects]
    updatedData[index] = {...updatedData[index],
      edited: edited,
      comments:comments,
      photoURL: photoURL,
      quantity_received: quantity
    }
    this.setState({dataObjects:updatedData})

  }

  refreshStatus(submitStatus, index){

    let updatedData = [...this.state.dataObjects]
    updatedData[index] = {...updatedData[index],
      submitStatus:submitStatus
    }
    this.setState({dataObjects:updatedData})

  }

  submitAllCreateReceiptsAlert = async () => {

    Alert.alert(
      "Submit Receipts?",
      "Are you sure you want to submit the receipts for all the open purchase order lines? This will ignore any selected lines or draft receipts created previously.",
      [
        { text: "Cancel", style: '' },
        { text: "OK", onPress: this.submitAllCreateReceipts.bind(this) }
      ],
      { cancelable: false }
    );
  };

  submitAllCreateReceipts = async() => {

    await this.getCreateReceipts();
    await this.saveCreateAllReceipt();
    await this.submitReceipt();
  }

  submitSuccessfulAlert() {
    Alert.alert(
      "Successful",
      "Receipts successfully submitted.",
      [
        { text: "OK", onPress: this.navigateBackToMyReceipts }
      ],
      { cancelable: false }
    );
  }

  navigateBackToMyReceipts = async () => {
  this.props.navigation.pop()
  }

  submitFailedAlert() {
    Alert.alert(
      "",
      "Unable to submit the receipts as there is no internet connection. The receipt will be submitted when there is connection.",
      [
        { text: "OK", onPress: this.refreshData }
      ],
      { cancelable: false }
    );
  };

  refreshData = async () => {
    this.getDBGrnPO()
  }

  _submitReceiptAlert = () => {
    if (this.state.createReceiptObjects.length>0){
      Alert.alert(
        "Submit Receipts?",
        "Are you sure you want to submit the receipts for all the selected purchase order lines?",
        [
          { text: "Cancel", style: '' },
          { text: "OK", onPress: this.submitReceipt.bind(this) }
        ],
        { cancelable: false }
      );
    }else {
      Alert.alert(
        "",
        "Please create atleast one receipt to submit.",
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
    }
  };

  submitReceipt = () => {

    this.setState({isLoading: true});

    this.getCreateReceipts();
    console.tron.log("Print Create Receipts: ", this.state.createReceiptObjects)

    if (this.state.createReceiptObjects != null) {

      for (let i = 0; i < this.state.createReceiptObjects.length; i++) {

      let entity = this.state.createReceiptObjects[i];

        if (entity.photoURL != null && entity.photoURL != ""){
          console.tron.log("PRINT PHOTOURL: ", entity.photoURL)
            let source = {
              uri: entity.photoURL
            };
            this.photoURL = entity.photoURL
            this.data = new FormData();
            this.data.append('photo', {
              uri: source,
              type: 'image/jpeg', // or photo.type
              name: 'testPhotoName'
            });

            //send file API : upload image
            this.uploadImage(entity.id)

          }else {
            this.state.currentNoOfReceiptsToPost++;
            this.counterToCallCreateReceiptsAPI(this.state.currentNoOfReceiptsToPost, this.state.createReceiptObjects.length)
        }
      }
    }else {
        console.tron.log("No Create Receipt in DB");
  }
}

  async updateCreateReceiptFile(id, file_id) {

    let dbCreateReceipt = await DBGrnPurchaseOrderDataHelper.updateCreateReceiptFile(id, file_id);
    return dbCreateReceipt;
  }

  async postCreateReceipt() {
    console.tron.log("Did Enter Post Create Receipt ")
    this.setState({isLoading: true});

    for (let i = 0; i < this.state.createReceiptObjects.length; i++) {

    let entity = this.state.createReceiptObjects[i];

    console.tron.log(entity.order_line_number, entity.distribution_number)
    await DBGrnPurchaseOrderDataHelper.updateCreateReceiptStatus(
      entity.order_number,
      entity.distribution_number,
      entity.order_line_number,
      true,
      "pending",
      new Date(),
      entity.quantity);

    }


    console.tron.log(" updated Receipts To Post ",this.state.createReceiptObjects);

    const username = await Utils.retrieveDataFromAsyncStorage("USER_NAME");
    const response = await CreateReceiptsAPIHelper.postCreateReceipt(username,this.state.createReceiptObjects);

    this.setState({isLoading: false});

    setTimeout(() => {
      if (response.ok) {
        console.tron.log("Print Receipts",this.state.createReceiptObjects);
        console.tron.log("Response API ok: ", response.data);
        this.submitSuccessfulAlert();

      } else {
        console.tron.log("Response API: failed", response.status + " - " + response.problem);
        this.submitFailedAlert();
      }
    }, 100);

  };

  async counterToCallCreateReceiptsAPI(currentNoOfReceiptsToPost, totalReceiptsToPost) {

    if (currentNoOfReceiptsToPost == totalReceiptsToPost){
      this.postCreateReceipt();
    }
  };

  async uploadImage(entityID) {

    this.setState({isLoading: true});
    console.tron.log("Image data", this.data);
    const username = await Utils.retrieveDataFromAsyncStorage("USER_NAME");
    const params = [username, 'testPhotoName', this.data];
    let result = await this.api["postPhoto"].apply(this, params)

    this.setState({isLoading: false});

    setTimeout(async () => {

      if (result.ok) {
        console.tron.log("Response API ok: ", result.data);
        this.file_id = result.data.REQUEST_ID;
        console.tron.log("API Response:", entityID, this.data, this.photoURL)

        //update file id to local
       await this.updateCreateReceiptFile(entityID, this.file_id);

       this.state.currentNoOfReceiptsToPost++;
       this.counterToCallCreateReceiptsAPI(this.state.currentNoOfReceiptsToPost, this.state.createReceiptObjects.length)

      } else {
        console.tron.log("Response API: failed", result.status + " - " + result.problem);

      }
    }, 100)
  }

  async saveCreateAllReceipt() {

    let purchaseOrder = this.state.entityPurchaseOrder;

    // Loop through all the lines and create CreateReceipts
    await this.state.dataObjects.map(async (item) => {
      if (item.submitStatus !="processing" && item.submitStatus != "pending"){
        this.state.entireReceipts.push(item)
      }
    })

    if (this.state.entireReceipts.length > 0){

        await this.state.entireReceipts.map(async (item) => {
            console.tron.log("Submite Status: ", item.submitStatus)
          // Convert quantity string to number
          var quantityNum = parseFloat(item.quantity_available_to_receive);

          var test = await DBGrnPurchaseOrderDataHelper.saveCreateReceipt(
            "",
            item.item_description,
            true,
            0.0,
            "",
            item.quantity_available_to_receive,
            item.order_line_number,
            item.order_number,
            item.quantity_ordered,
            "",
            item.quantity_available_to_receive,
            "draft",
            new Date(),
            item.to_organization,
            item.to_organization_id,
            "createReceipt",
            item.unit_of_measure,
            item.distribution_number,

          );

          DBGrnPurchaseOrderDataHelper.updatePOStatus(item.order_number,
            item.distribution_number, item.order_line_number,true, "pending",
            new Date(), item.quantity_available_to_receive,
            item.quantity_available_to_receive, "","");

      })
    } else {
      Alert.alert(
        "",
        "No purchase order lines available for receiving.",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      );
    }
  }

  /************************************************************
   * STEP 1
   * This is an array of objects with the properties you desire
   * Usually this should come from Redux mapStateToProps
   *************************************************************/

  /* ***********************************************************
    * STEP 2
    * `renderRow` function. How each cell/row should be rendered
    * It's our best practice to place a single component here:
    *
    * e.g.
      return <MyCustomCell title={item.title} description={item.description} />
    *************************************************************/
  renderRow = ({ item, index }) => {
    if (!item.edited){

    if (item.submitStatus == "processing"){
      return (
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate("GrnReceiptDetails", {
              entityPurchaseOrder: item,
              index: index,
              returnData:this.returnData.bind(this),
              refreshStatus: this.refreshStatus.bind(this)
            });
          }}>
          <View>
            <View style={styles.row}>
              <View style={styles.rowSection1Processing}>
              <CheckBox
                checkboxStyle={styles.checkboxDisabled}
                checked ={item.edited}
                label={""}
                />
              </View>
              <View style={styles.rowSection2}>
                <Text style={styles.rowLabel}>{item.item_number}</Text>
              </View>
              <View style={styles.rowSection3}>
                <Text style={styles.rowLabel}>{item.item_description}</Text>
              </View>
              <View style={styles.rowSection4}>
                <Text style={styles.rowLabel}>{item.distribution_number}</Text>
              </View>
              <View style={styles.rowSection5}>
                <Text style={styles.rowLabel}>{item.delivery_date}</Text>
              </View>
              <View style={styles.rowSection6}>
                <Image
                  source={Images.rightArrow}
                  style={styles.rightArrow}
                  resizeMode="center"
                />
              </View>
            </View>
            <View style={styles.speratorline} />
          </View>
        </TouchableHighlight>);
    }else if (item.submitStatus == "pending"){
      return (
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate("GrnReceiptDetails", {
              entityPurchaseOrder: item,
              index: index,
              returnData:this.returnData.bind(this),
              refreshStatus: this.refreshStatus.bind(this)
            });
          }}>
          <View>
            <View style={styles.row}>
              <View style={styles.rowSection1Pending}>
              <CheckBox
                checkboxStyle={styles.checkboxDisabled}
                checked ={item.edited}
                label={""}
                />
              </View>
              <View style={styles.rowSection2}>
                <Text style={styles.rowLabel}>{item.item_number}</Text>
              </View>
              <View style={styles.rowSection3}>
                <Text style={styles.rowLabel}>{item.item_description}</Text>
              </View>
              <View style={styles.rowSection4}>
                <Text style={styles.rowLabel}>{item.distribution_number}</Text>
              </View>
              <View style={styles.rowSection5}>
                <Text style={styles.rowLabel}>{item.delivery_date}</Text>
              </View>
              <View style={styles.rowSection6}>
                <Image
                  source={Images.rightArrow}
                  style={styles.rightArrow}
                  resizeMode="center"
                />
              </View>
            </View>
            <View style={styles.speratorline} />
          </View>
        </TouchableHighlight>);
    }else{

    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigation.navigate("GrnReceiptDetails", {
            entityPurchaseOrder: item,
            index: index,
            returnData:this.returnData.bind(this),
            refreshStatus: this.refreshStatus.bind(this)
          });
        }}>
        <View>
          <View style={styles.row}>
            <View style={styles.rowSection1}>
            <CheckBox
              checkboxStyle={styles.checkboxDisabled}
              checked ={item.edited}
              label={""}
              />
            </View>
            <View style={styles.rowSection2}>
              <Text style={styles.rowLabel}>{item.item_number}</Text>
            </View>
            <View style={styles.rowSection3}>
              <Text style={styles.rowLabel}>{item.item_description}</Text>
            </View>
            <View style={styles.rowSection4}>
              <Text style={styles.rowLabel}>{item.distribution_number}</Text>
            </View>
            <View style={styles.rowSection5}>
              <Text style={styles.rowLabel}>{item.delivery_date}</Text>
            </View>
            <View style={styles.rowSection6}>
              <Image
                source={Images.rightArrow}
                style={styles.rightArrow}
                resizeMode="center"
              />
            </View>
          </View>
          <View style={styles.speratorline} />
        </View>
      </TouchableHighlight>);
    }
  }else {
    if (item.submitStatus == "processing") {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigation.navigate("GrnReceiptDetails", {
            entityPurchaseOrder: item,
            index: index,
            returnData:this.returnData.bind(this),
            refreshStatus: this.refreshStatus.bind(this)
          });
        }}
      >
        <View>
          <View style={styles.rowProcessing}>
            <View style={styles.rowSection1Processing}>
            <CheckBox
              checkboxStyle={styles.checkbox}
              checked ={item.edited}
              label={""}
              />
            </View>
            <View style={styles.rowSection2}>
              <Text style={styles.rowLabel}>{item.item_number}</Text>
            </View>
            <View style={styles.rowSection3}>
              <Text style={styles.rowLabel}>{item.item_description}</Text>
            </View>
            <View style={styles.rowSection4}>
              <Text style={styles.rowLabel}>{item.distribution_number}</Text>
            </View>
            <View style={styles.rowSection5}>
              <Text style={styles.rowLabel}>{item.delivery_date}</Text>
            </View>
            <View style={styles.rowSection6}>
              <Image
                source={Images.rightArrow}
                style={styles.rightArrow}
                resizeMode="center"
              />
            </View>
          </View>
          <View style={styles.speratorline} />
        </View>
      </TouchableHighlight>);
    } else if (item.submitStatus == "pending"){
      return (
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate("GrnReceiptDetails", {
              entityPurchaseOrder: item,
              index: index,
              returnData:this.returnData.bind(this),
              refreshStatus: this.refreshStatus.bind(this)
            });
          }}
        >
          <View>
            <View style={styles.row}>
              <View style={styles.rowSection1Pending}>
              <CheckBox
                checkboxStyle={styles.checkbox}
                checked ={item.edited}
                label={""}
                />
              </View>
              <View style={styles.rowSection2}>
                <Text style={styles.rowLabel}>{item.item_number}</Text>
              </View>
              <View style={styles.rowSection3}>
                <Text style={styles.rowLabel}>{item.item_description}</Text>
              </View>
              <View style={styles.rowSection4}>
                <Text style={styles.rowLabel}>{item.distribution_number}</Text>
              </View>
              <View style={styles.rowSection5}>
                <Text style={styles.rowLabel}>{item.delivery_date}</Text>
              </View>
              <View style={styles.rowSection6}>
                <Image
                  source={Images.rightArrow}
                  style={styles.rightArrow}
                  resizeMode="center"
                />
              </View>
            </View>
            <View style={styles.speratorline} />
          </View>
        </TouchableHighlight>);
    } else {
      return (
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate("GrnReceiptDetails", {
              entityPurchaseOrder: item,
              index: index,
              returnData:this.returnData.bind(this),
              refreshStatus: this.refreshStatus.bind(this)
            });
          }}
        >
          <View>
            <View style={styles.row}>
              <View style={styles.rowSection1}>
              <CheckBox
                checkboxStyle={styles.checkbox}
                checked ={item.edited}
                label={""}
                />
              </View>
              <View style={styles.rowSection2}>
                <Text style={styles.rowLabel}>{item.item_number}</Text>
              </View>
              <View style={styles.rowSection3}>
                <Text style={styles.rowLabel}>{item.item_description}</Text>
              </View>
              <View style={styles.rowSection4}>
                <Text style={styles.rowLabel}>{item.distribution_number}</Text>
              </View>
              <View style={styles.rowSection5}>
                <Text style={styles.rowLabel}>{item.delivery_date}</Text>
              </View>
              <View style={styles.rowSection6}>
                <Image
                  source={Images.rightArrow}
                  style={styles.rightArrow}
                  resizeMode="center"
                />
              </View>
            </View>
            <View style={styles.speratorline} />
          </View>
        </TouchableHighlight>);
    }
    };
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
    if (this.state.totalCount > 0) {
      return (
        <View style={styles.container}>
        <Spinner visible={this.state.isLoading} />

          <ScrollView style={styles.mainContainer}>
            <View style={styles.mainContainer}>
              <View style={styles.lineWithBottomSpace} />
              <View style={styles.line} />
              <View style={styles.headerContainer}>
                <Text style={styles.titleStyle}>PURCHASE ORDER HEADER</Text>
                <View style={styles.shortLine} />
                <View style={styles.greyInfoContainer}>
                  <Text style={styles.infoTextLeft}>Order No.</Text>
                  <Text style={styles.infoText}>
                    {this.state.entityPurchaseOrder.order_number}
                  </Text>
                </View>
                <View style={styles.pinkInfoContainer}>
                  <Text style={styles.infoTextLeft}>Supplier Name</Text>
                  <Text style={styles.infoText}>
                    {this.state.entityPurchaseOrder.supplier_name}
                  </Text>
                </View>
                <View style={styles.lastGreyInfoContainer}>
                  <Text style={styles.infoTextLeft}>Supplier No.</Text>
                  <Text style={styles.infoText}>
                    {this.state.entityPurchaseOrder.supplier_number}
                  </Text>
                </View>
              </View>
              <View style={styles.lineWithBottomSpace} />
              <View style={styles.line} />
              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={this.submitAllCreateReceiptsAlert.bind(this)}
                  style={styles.submitAllCreateReceiptsButton}
                >
                  <View>
                    <Text style={styles.submitAllCreateReceiptsButtonText}>
                      RECEIVE ENTIRE PO
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.bottomContainer}>
                <Text style={styles.titleStyle}>PURCHASE ORDER LINES</Text>
                <View style={styles.shortLine} />
                <View style={styles.tableContainer}>
                  <View style={styles.header}>
                    <View style={styles.headerSection1}>
                      <Text style={styles.headerLabel} />
                    </View>
                    <View style={styles.headerSection2}>
                      <Text style={styles.headerLabel}>Item No.</Text>
                    </View>
                    <View style={styles.headerSection3}>
                      <Text style={styles.headerLabel}>Item Description</Text>
                    </View>
                    <View style={styles.headerSection4}>
                      <Text style={styles.headerLabel}>Dist No.</Text>
                    </View>
                    <View style={styles.headerSection5}>
                      <Text style={styles.headerLabel}>Delivery Date</Text>
                    </View>
                  </View>
                  <View style={styles.line} />

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
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }else {
      return (
        <View style={styles.container}>
        <Spinner visible={this.state.isLoading} />

          <ScrollView style={styles.mainContainer}>
            <View style={styles.mainContainer}>
              <View style={styles.lineWithBottomSpace} />
              <View style={styles.line} />
              <View style={styles.headerContainer}>
                <Text style={styles.titleStyle}>PURCHASE ORDER HEADER</Text>
                <View style={styles.shortLine} />
                <View style={styles.greyInfoContainer}>
                  <Text style={styles.infoTextLeft}>Order No.</Text>
                  <Text style={styles.infoText}>
                    {this.state.entityPurchaseOrder.order_number}
                  </Text>
                </View>
                <View style={styles.pinkInfoContainer}>
                  <Text style={styles.infoTextLeft}>Supplier Name</Text>
                  <Text style={styles.infoText}>
                    {this.state.entityPurchaseOrder.supplier_name}
                  </Text>
                </View>
                <View style={styles.lastGreyInfoContainer}>
                  <Text style={styles.infoTextLeft}>Supplier No.</Text>
                  <Text style={styles.infoText}>
                    {this.state.entityPurchaseOrder.supplier_number}
                  </Text>
                </View>
              </View>
              <View style={styles.lineWithBottomSpace} />
              <View style={styles.line} />
              <View style={styles.buttonView}>
                <TouchableOpacity

                  style={styles.submitAllCreateReceiptsButtonInactive}
                >
                  <View>
                    <Text style={styles.submitAllCreateReceiptsButtonText}>
                      RECEIVE ENTIRE PO
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.bottomContainer}>
                <Text style={styles.titleStyle}>PURCHASE ORDER LINES</Text>
                <View style={styles.shortLine} />
                <View style={styles.tableContainer}>
                  <View style={styles.header}>
                    <View style={styles.headerSection1}>
                      <Text style={styles.headerLabel} />
                    </View>
                    <View style={styles.headerSection2}>
                      <Text style={styles.headerLabel}>Item No.</Text>
                    </View>
                    <View style={styles.headerSection3}>
                      <Text style={styles.headerLabel}>Item Description</Text>
                    </View>
                    <View style={styles.headerSection4}>
                      <Text style={styles.headerLabel}>Dist No.</Text>
                    </View>
                    <View style={styles.headerSection5}>
                      <Text style={styles.headerLabel}>Delivery Date</Text>
                    </View>
                  </View>
                  <View style={styles.line} />

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
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }

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
)(GrnPurchaseOrderDetails);
