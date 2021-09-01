import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  AppRegistry,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import {Container, Content, Picker, DatePicker} from 'native-base'
import Utils from "../Utils/Utils";
import DBPCRequisitionHelper from "../DB/DBPCRequisitionHelper";
import APIHelper from "../APIHelper/APIHelper";
import Spinner from "react-native-loading-spinner-overlay";
const Item = Picker.Item
import {Images} from '../Themes'
import DBPCStaticDataHelper from "../DB/DBPCStaticDataHelper"
import DBPCHelper from "../DB/DBPCHelper"
import RequisitionList from "../Containers/RequisitionList"
// Styles
import styles from "./Styles/PcRequisitionsSummaryStyle";

// For API
import FJSON from "format-json";

class PcRequisitionsSummary extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "SUMMARY",
      headerTintColor: "red",
      headerTitleStyle: { color: "black" },
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam("submissionCheck")}>
          <Text style={styles.menuButton}>SUBMIT</Text>
        </TouchableOpacity>
      )
    };
  };

  mobile_req_id: "";
  local_id:"";

  constructor(props) {
    super(props);
    this.state = {
      selectedProperty: this.props.navigation.state.params.selectedProperty,
      selectedUnit: this.props.navigation.state.params.selectedUnit,
      selectedSupplier: this.props.navigation.state.params.selectedSupplier,
      selectedReason: this.props.navigation.state.params.selectedReason,
      chosenDate1: this.props.navigation.state.params.chosenDate1,
      chosenDate2: this.props.navigation.state.params.chosenDate2,
      chosenDate3: this.props.navigation.state.params.chosenDate3,
      isChecked: this.props.navigation.state.params.isChecked,
      additionalInfo: this.props.navigation.state.params.additionalInfo,
      selectedEntityAttributes: this.props.navigation.state.params.selectedEntityAttributes,
      isLoading: false,
      materials: null,
      selectedPetTreatment: null,
      isPetTreatment: false,
      totalAmount:0.0,
      paddingDetails:[],
      thresholdDetails:[],
      vacantDetails:[],
      nonVacantDetails:[]
    };
    console.tron.log("PcRequisitionsSummary Data transfered: ", this.state);



  }

  componentDidMount() {
  console.tron.log("Component Did Mount: ", this.state);
    this.props.navigation.setParams({
      submissionCheck: this._submissionCheck
    });
  this.checkPetTreatment();
  this.getCategoryConfig()
  }

  _submissionCheck = async () => {

    if (this.state.isPetTreatment) {
      console.tron.log(this.state.selectedPetTreatment)
      if (this.state.selectedPetTreatment == undefined){
        Alert.alert(
          "",
          "Please select a pet treatment.",
          [
            { text: "OK"}
          ],
          { cancelable: false }
        );
      }else {
        this._tappedSubmitButtonAlert()
      }
    }else {
      this._tappedSubmitButtonAlert()
    }

  }

  _tappedSubmitButtonAlert() {
    Alert.alert(
      "Submit Requisition",
      "Are you sure you want to submit this requisition?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: this.tappedSubmitButton.bind(this) }
      ],
      { cancelable: false }
    );
  };

  tappedSubmitButton = async () => {
    console.tron.log("Enter _tappedSubmitButton");

    // TODO: 1. Save to local DB: CreateRequisition
    /*const requisition = await DBPCRequisitionHelper.saveRequisition(
      this.state.selectedProperty,
      this.state.selectedUnit,
      this.state.selectedSupplier,
      this.state.selectedReason,
      this.state.chosenDate1,
      this.state.chosenDate2,
      this.state.chosenDate3,
      this.state.isChecked,
      this.state.additionalInfo,
      this.state.selectedEntityAttributes,
      this.state.selectedPetTreatment
    );*/

    const newRequisition = await DBPCRequisitionHelper.saveNewRequisition(
      this.state.selectedProperty,
      this.state.selectedUnit,
      this.state.selectedSupplier,
      this.state.selectedReason,
      this.state.chosenDate1,
      this.state.chosenDate2,
      this.state.chosenDate3,
      this.state.isChecked,
      this.state.additionalInfo,
      this.state.selectedEntityAttributes,
      this.state.selectedPetTreatment,
      "pending"
    );

    console.tron.log("Requisition utils ID: ", newRequisition[0].local_id)
    // TODO: 1. Save to local DB
    const requisition = await DBPCRequisitionHelper.saveRequisition(
      newRequisition[0].local_id,
      this.state.selectedProperty,
      this.state.selectedUnit,
      this.state.selectedSupplier,
      this.state.selectedReason,
      this.state.chosenDate1,
      this.state.chosenDate2,
      this.state.chosenDate3,
      this.state.isChecked,
      this.state.additionalInfo,
      this.state.selectedEntityAttributes,
      this.state.selectedPetTreatment
    );

    // TODO: 2. Call API
    this.setState({
      isLoading: true
    });

    const username = await Utils.retrieveDataFromAsyncStorage("USER_NAME");
    const response = await APIHelper.postCreateRequisition(username, requisition);

    this.setState({
      isLoading: false
    });


    setTimeout(() => {
      if (response.ok) {
        console.tron.log("Response API ok: ", response.data);
        this.mobile_req_id = response.data.REQUEST_ID;

    DBPCRequisitionHelper.updateRequisition(newRequisition[0].local_id, this.mobile_req_id, "processing", this.state.selectedUnit);
    DBPCRequisitionHelper.removeRequisition(requisition);
      /*  DBPCRequisitionHelper.removeAttributes(requisition);*/
        Alert.alert(
          "",
          "Requisition successfully submitted!",
          [{ text: "OK", onPress: () => this.props.navigation.popToTop() }],
          { cancelable: false }
        );
      } else {
        console.tron.log(
          "Response API: failed",
          response.status + " - " + response.problem
        );

     //    // TODO: 1. Save to local DB
     // DBPCRequisitionHelper.saveRequisition(
     //      newRequisition[0].local_id,
     //      this.state.selectedProperty,
     //      this.state.selectedUnit,
     //      this.state.selectedSupplier,
     //      this.state.selectedReason,
     //      this.state.chosenDate1,
     //      this.state.chosenDate2,
     //      this.state.chosenDate3,
     //      this.state.isChecked,
     //      this.state.additionalInfo,
     //      this.state.selectedEntityAttributes,
     //      this.state.selectedPetTreatment
     //    );

        Alert.alert(
          "",
          "Unable to submit the requisition as there is no internet connection. The change order will be submitted when there is connection.",
          [{ text: "OK", onPress: () => this.props.navigation.popToTop() }],
          { cancelable: false }
        );
      }
    }, 100);
  };

  keyExtractor = (item, index) => index;
  oneScreensWorth = 20;

  renderPetTreatmentPicker() {
    console.tron.log("Selected Supplier: ", this.state.selectedSupplier);

    var items = []
    if (this.state.selectedSupplier.pet_treatment != null) {
      items = this.state.selectedSupplier.pet_treatment.map((item, i) => (
        <Picker.Item key={i} label={item.item_description} value={i} />
      ));
    }
    return (
      <Picker
        style={styles.picker}
        textStyle={styles.answer}
        mode="dropdown"
        selectedValue={this.state.selectedPetTreatmentValue}
        onValueChange={this.onPetTreatmentValueChange.bind(this)}
      >
      <Picker.Item key="na" label="-" value="na" />
        {items}
      </Picker>
    );
  }

  onPetTreatmentValueChange(value : string) {
    const selectedPetTreatment = this.state.selectedSupplier.pet_treatment[value]
    this.setState({selectedPetTreatment: selectedPetTreatment});
  }

  checkPetTreatment() {
    this.state.selectedEntityAttributes.map((entityAttribute) => {
      if (entityAttribute.petTreatment) {
        this.setState({
          isPetTreatment : true,
        })
      }
    })
  }

  calculateTotalAmount() {
    var amount = 0.0;
    this.state.selectedEntityAttributes.map((item) => {

      amount += Utils.calculateTotalNoRound(item.net_quantity, item.material[0].unit_cost, item.uom)
      if (item.pad) {
        amount += Utils.calculateTotalNoRound(item.net_quantity, item.padding_unit_cost, item.uom)
      }

      if (item.threshold) {
        amount += Utils.calculateTotalNoRound(item.net_quantity, item.threshold_unit_cost, item.thresholdUom)
      }

      if (this.state.isChecked) {
        amount += Utils.calculateTotalNoRound(item.net_quantity, item.vacant_unit_cost, item.uom)
      } else {
        amount += Utils.calculateTotalNoRound(item.net_quantity, item.nonVacant_unit_cost, item.uom)
      }

      if (this.state.selectedPetTreatment != null) {
        console.tron.log('selected pet treatment', this.state.selectedPetTreatment)
        amount += Utils.calculateTotalNoRound(item.net_quantity, this.state.selectedPetTreatment.unit_cost, this.state.selectedPetTreatment.uom)
      }

    });
    return Utils.roundN(amount, 2)
  }

  async getCategoryConfig(){
    console.tron.log("Current state: ", this.state)

    var tempEntityAttributes = this.state.selectedEntityAttributes

    this.state.selectedEntityAttributes.map(async(entityAttribute,index) => {

      if (entityAttribute.pad){
        const categoryConfig = await DBPCRequisitionHelper.getCategoryConfig(entityAttribute.type,"PADDING");
        const bpaDetails = await DBPCRequisitionHelper.getConfigBpaDetail(this.state.selectedSupplier, categoryConfig[0].category_id);
          this.setState({
            paddingDetails: bpaDetails
          });
          console.tron.log("index ", index);
          console.tron.log("entityAttribute ", tempEntityAttributes);

          tempEntityAttributes[index].paddingUom = this.state.paddingDetails[0].uom
          tempEntityAttributes[index].padding_unit_cost = this.state.paddingDetails[0].unit_cost

        console.tron.log("entityAttribute after", tempEntityAttributes);
        console.tron.log("ATTRIBUTE Added Padding: ", this.state.selectedEntityAttributes)
      }

      if (entityAttribute.threshold) {
          const categoryConfig = await DBPCRequisitionHelper.getCategoryConfig(entityAttribute.type,"THRESHOLD");
          const bpaDetails = await DBPCRequisitionHelper.getConfigBpaDetail(this.state.selectedSupplier, categoryConfig[0].category_id);
            this.setState({
              thresholdDetails: bpaDetails
            });
          tempEntityAttributes[index].thresholdUom = this.state.thresholdDetails[0].uom
          tempEntityAttributes[index].threshold_unit_cost = this.state.thresholdDetails[0].unit_cost
          console.tron.log("THRESHOLD Details : ", this.state.thresholdDetails)
      }

    if (this.state.isChecked){
      const categoryConfig = await DBPCRequisitionHelper.getCategoryConfig(entityAttribute.type,"INSTALL.VACANT");
      const bpaDetails = await DBPCRequisitionHelper.getConfigBpaDetail(this.state.selectedSupplier, categoryConfig[0].category_id);
        this.setState({
          vacantDetails: bpaDetails
        });

          tempEntityAttributes[index].vacantUom = this.state.vacantDetails[0].uom
          tempEntityAttributes[index].vacant_unit_cost = this.state.vacantDetails[0].unit_cost

    }else {
      const categoryConfig = await DBPCRequisitionHelper.getCategoryConfig(entityAttribute.type,"INSTALL.NONVACANT");
      const bpaDetails = await DBPCRequisitionHelper.getConfigBpaDetail(this.state.selectedSupplier, categoryConfig[0].category_id);
        this.setState({
          nonVacantDetails: bpaDetails
        });
        tempEntityAttributes[index].nonVacantUom = this.state.nonVacantDetails[0].uom
        tempEntityAttributes[index].nonVacant_unit_cost = this.state.nonVacantDetails[0].unit_cost
    }

    if (index == this.state.selectedEntityAttributes.length - 1){
      this.setState({
        selectedEntityAttributes: tempEntityAttributes
      });
    }

  });



  }

  render() {
    let vacantText;
    if (this.state.isChecked) {
      vacantText = <Text style={styles.infoText}>YES</Text>;
    } else {
      vacantText = <Text style={styles.infoText}>NO</Text>;
    }

  var count = 0
    console.tron.log("Attribute Array: ", this.state.selectedEntityAttributes)
    attributeListArr = this.state.selectedEntityAttributes.map(function(item, index){
    count += 1
    console.tron.log("Attribute array count: ", count)

      return (
        <View>
            <View style={styles.separatorline} />
        <View key={item.id} style={styles.attributeContainer}>
          <View style={styles.infoHeader}>
            <Text style={styles.infoTextLeft}>NAME</Text>
            <Text style={styles.infoText}>{item.name}</Text>
          </View>
          <View style={styles.infoHeader}>
            <Text style={styles.infoTextLeft}>TYPE</Text>
            <Text style={styles.infoText}>{item.type}</Text>
          </View>
          <View style={styles.whiteLine}/>

          <View style={styles.info}>
            <Text style={styles.infoTextLeft}>CATEGORY LABEL</Text>
            <Text style={styles.infoText}>
              {item.material[0].item_description}
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTextLeft}>UOM</Text>
            <Text style={styles.infoText}>
              {Utils.calculateUOM(item.uom)}
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTextLeft}>QUANTITY</Text>
            <Text style={styles.infoText}>
              {Utils.calculateQuantity(item.net_quantity, item.uom)}
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTextLeft}>UNIT COST</Text>
            <Text style={styles.infoText}>
              {Utils.calculateUnitCost(item.material[0].unit_cost, item.uom)}
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTextLeft}>AMOUNT PRICE</Text>
            <Text style={styles.infoText}>
              {Utils.calculateTotal(item.net_quantity, item.material[0].unit_cost, item.uom)}
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTextLeft}>USAGE TYPE</Text>
            <Text style={styles.infoText}>{item.usageType}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTextLeft}>STATUS</Text>
            <Text style={styles.infoText}>-</Text>
          </View>
        </View>

        { item.pad ? (
          <View key={item.id} style={styles.attributeContainer}>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>CATEGORY LABEL</Text>
              <Text style={styles.infoText}>
                {item.type + " PADDING"}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>UOM</Text>
              <Text style={styles.infoText}>
                {Utils.calculateUOM(item.paddingUom)}
                </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>QUANTITY</Text>
              <Text style={styles.infoText}>
                {Utils.calculateQuantity(item.net_quantity, item.uom)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>UNIT COST</Text>
              <Text style={styles.infoText}>
                {Utils.calculateUnitCost(item.padding_unit_cost, item.uom)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>AMOUNT PRICE</Text>
              <Text style={styles.infoText}>
                {Utils.calculateTotal(item.net_quantity, item.padding_unit_cost, item.uom)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>USAGE TYPE</Text>
              <Text style={styles.infoText}>{item.usageType}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>STATUS</Text>
              <Text style={styles.infoText}>-</Text>
            </View>
          </View>
        ) : (
          <View></View>
        )}

        { item.threshold ? (
          <View key={item.id} style={styles.attributeContainer}>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>CATEGORY LABEL</Text>
              <Text style={styles.infoText}>
                {item.type + " THRESHOLD"}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>UOM</Text>
              <Text style={styles.infoText}>
              {Utils.calculateUOM(item.thresholdUom)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>QUANTITY</Text>
              <Text style={styles.infoText}>
                {Utils.calculateQuantity(item.net_quantity, item.thresholdUom)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>UNIT COST</Text>
              <Text style={styles.infoText}>
                {Utils.calculateUnitCost(item.threshold_unit_cost, item.thresholdUom)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>AMOUNT PRICE</Text>
              <Text style={styles.infoText}>
                {Utils.calculateTotal(item.net_quantity, item.threshold_unit_cost, item.thresholdUom)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>USAGE TYPE</Text>
              <Text style={styles.infoText}>{item.usageType}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>STATUS</Text>
              <Text style={styles.infoText}>-</Text>
            </View>
          </View>
        ) : (
          <View></View>
        )}

        { this.state.isChecked ? (
          <View key={item.id} style={styles.attributeContainer}>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>CATEGORY LABEL</Text>
              <Text style={styles.infoText}>
                {item.type + " VACANT.INSTALL"}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>UOM</Text>
              <Text style={styles.infoText}>
              {Utils.calculateUOM(item.vacantUom)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>QUANTITY</Text>
              <Text style={styles.infoText}>
                {Utils.calculateQuantity(item.net_quantity, item.uom)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>UNIT COST</Text>
              <Text style={styles.infoText}>
                {Utils.calculateUnitCost(item.vacant_unit_cost, item.uom)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>AMOUNT PRICE</Text>
              <Text style={styles.infoText}>
                {Utils.calculateTotal(item.net_quantity, item.vacant_unit_cost, item.uom)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>USAGE TYPE</Text>
              <Text style={styles.infoText}>{item.usageType}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>STATUS</Text>
              <Text style={styles.infoText}>-</Text>
            </View>
          </View>
        ) : (
          <View key={item.id} style={styles.attributeContainer}>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>CATEGORY LABEL</Text>
              <Text style={styles.infoText}>
                {item.type + " VACANT.NONINSTALL"}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>UOM</Text>
              <Text style={styles.infoText}>
              {Utils.calculateUOM(item.nonVacantUom)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>QUANTITY</Text>
              <Text style={styles.infoText}>
                {Utils.calculateQuantity(item.net_quantity, item.uom)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>UNIT COST</Text>
              <Text style={styles.infoText}>
                {Utils.calculateUnitCost(item.nonVacant_unit_cost, item.uom)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>AMOUNT PRICE</Text>
              <Text style={styles.infoText}>
                {Utils.calculateTotal(item.net_quantity, item.nonVacant_unit_cost, item.uom)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>USAGE TYPE</Text>
              <Text style={styles.infoText}>{item.usageType}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>STATUS</Text>
              <Text style={styles.infoText}>-</Text>
            </View>
          </View>
        )}

        </View>
      )
    }, this);

    return (
      <View style={styles.container}>
        <Spinner visible={this.state.isLoading} />

        <ScrollView>
          <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.titleStyle}>HEADER</Text>

            <View style={styles.infoContainer}>

              {this.state.isPetTreatment ? <View style={styles.info}>
                <Text style={styles.infoTextLeft}>PET TREATMENT*</Text>
                <Container style={styles.pickerContainer}>
                  <Content>{this.renderPetTreatmentPicker()}</Content>
                </Container>
                <Text style={styles.pickerAnswer} pointerEvents="none">
                  {this.state.selectedPetTreatment != null ? this.state.selectedPetTreatment.item_description : ""}
                </Text>
                <Image source={Images.redArrow} style={styles.arrow} />
              </View> : <View></View> }


              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>PROPERTY</Text>
                <Text style={styles.infoText}>
                  {this.state.selectedProperty != null
                    ? this.state.selectedProperty.location_name
                    : "-"}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>BUILDING</Text>
                <Text style={styles.infoText}>
                  {this.state.selectedUnit != null
                    ? this.state.selectedUnit.building_number
                    : "-"}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>UNIT</Text>
                <Text style={styles.infoText}>
                  {this.state.selectedUnit != null
                    ? this.state.selectedUnit.unit_name
                    : "-"}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>SUPPLIER</Text>
                <Text style={styles.infoText}>
                  {this.state.selectedSupplier != null
                    ? this.state.selectedSupplier.supplier_name
                    : "-"}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>VACANT</Text>
                {vacantText}
              </View>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>PREF. DATE1</Text>
                <Text style={styles.infoText}>{this.state.chosenDate1}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>PREF. DATE2</Text>
                <Text style={styles.infoText}>{this.state.chosenDate2}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>PREF. DATE3</Text>
                <Text style={styles.infoText}>
                  {this.state.chosenDate3 != null
                    ? this.state.chosenDate3
                    : "-"}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>ADDITIONAL INFO</Text>
                <Text style={styles.infoText}>
                  {this.state.additionalInfo != null || this.state.additionalInfo != "" || this.state.additionalInfo != undefined
                    ? this.state.additionalInfo
                    : "-"}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>REPLACEMENT REASON</Text>
                <Text style={styles.infoText}>
                  {this.state.selectedReason != null
                    ? this.state.selectedReason
                    : "-"}
                </Text>
              </View>
            </View>

            <View style={styles.line} />
            <Text style={styles.titleStyle}>ATTRIBUTE AND CATEGORIES</Text>
            <View style={styles.shortLine} />
          </View>

          <View style={styles.priceContainer}>
            <View style={styles.info}>
              <Text style={styles.infoTextLeft}>TOTAL AMOUNT</Text>
              <Text style={styles.priceText}>
                {this.calculateTotalAmount()}
              </Text>
            </View>
          </View>

          { this.state.selectedPetTreatment != null  ? (
            <View style={styles.attributeContainer}>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>CATEGORY LABEL</Text>
                <Text style={styles.infoText}>
                  PET TREATMENT
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>UOM</Text>
                <Text style={styles.infoText}>{
                Utils.calculateUOM(this.state.selectedPetTreatment.uom)}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>QUANTITY</Text>
                <Text style={styles.infoText}>
                {Utils.calculateQuantity(this.state.selectedEntityAttributes[0].net_quantity,   this.state.selectedPetTreatment.uom)}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>UNIT COST</Text>
                <Text style={styles.infoText}>
                  {Utils.calculateUnitCost(this.state.selectedPetTreatment.unit_cost, this.state.selectedPetTreatment.uom)}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>AMOUNT PRICE</Text>
                <Text style={styles.infoText}>
                  {Utils.calculateTotal(this.state.selectedEntityAttributes[0].net_quantity, this.state.selectedPetTreatment.unit_cost, this.state.selectedPetTreatment.uom)}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>USAGE TYPE</Text>
                <Text style={styles.infoText}>-</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoTextLeft}>STATUS</Text>
                <Text style={styles.infoText}>-</Text>
              </View>
            </View>
          ) : (
            null
          )}
          {attributeListArr}
        </ScrollView>
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
)(PcRequisitionsSummary);
