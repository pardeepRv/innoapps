import React, { Component } from 'react'
import { SafeAreaView,ScrollView, Text, View, TextInput, TouchableOpacity,
   KeyboardAvoidingView, Image, Alert} from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import DBGrnReceiptDataHelper from "../DB/DBGrnReceiptDataHelper";
import DBPCStaticDataHelper from "../DB/DBPCStaticDataHelper";
import Spinner from "react-native-loading-spinner-overlay";
import Utils from "../Utils/Utils";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {Container, Content, Picker} from 'native-base'
import {Images} from '../Themes'
// Styles
import styles from './Styles/GrnRejectReceiptStyle'
// For API
import API from "../Services/Api";
import FJSON from "format-json";

class GrnRejectReceipt extends Component {

  api = {};
  photoURI: "";
  file_id: 0;
  receipt_id: "";
  data: FormData;

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      entityReceipt: props.navigation.state.params.entityReceipt,
      quantity: "",
      img : null,
      index: props.navigation.state.params.index,
      selectedRejectReason: "",
      selectedUsageType:"",
      selectedUsageTypeValue:"na",
      selectedRejectReasonValue:"na"
    }
    console.tron.log("PRINT index: ", this.state.index);
      this.api = API.create();
      this.getRejectReasons()
      this.getUsageTypes()
  }

  async getUsageTypes() {
    const usageTypes = await DBPCStaticDataHelper.getUsageTypes();
    this.setState({
      usageTypes: usageTypes,
    })

    if (usageTypes.length == 1) {
      this.setState({
        selectedUsageType: usageTypes[0]
      })
    }
  }
  static navigationOptions = ({navigation}) => {
    return {
      title: "REJECT RECEIPTS",
      headerTintColor: 'red',
      headerTitleStyle: { color: 'black' },
      headerRight: (<TouchableOpacity onPress={navigation.getParam('submitRejectReceipt')}>
        <Text style={styles.menuButton}>SUBMIT</Text>
      </TouchableOpacity>)
    }
};

componentDidMount() {
  this.props.navigation.setParams({ submitRejectReceipt: this._submitRejectReceipt })
  console.tron.log("Component Did mount");
}

renderRejectReasonPicker() {
  var items = []
  if (this.state.rejectReasons != null) {
  items = this.state.rejectReasons.map((item, i) => (
    <Picker.Item key={i} label={item.value} value={i} />
  ));
}
  return (
    <Picker
      style={styles.picker}
      textStyle={styles.answer}
      mode="dropdown"
      selectedValue={this.state.selectedRejectReason}
      onValueChange={this.onRejectReasonChange.bind(this)}
    >
    <Picker.Item key="na" label="-" value="na" />

      {items}
    </Picker>
  );

}

async getRejectReasons() {
  const rejectReasons = "REJECTED";//await DBPCStaticDataHelper.getRejectReasons();
  this.setState({
    rejectReasons: rejectReasons,
  })

  if (rejectReasons.length == 1) {
    this.setState({
      selectedRejectReason: rejectReasons[0]
    })
  }
}

async saveRejectReceipt(comments, photoURL, quantity) {

  receipt = this.state.entityReceipt;

  var test = await DBGrnReceiptDataHelper.saveRejectReceipt(comments,
    receipt.deliver_tran_id,
    0.0,
    receipt.item_description,
    receipt.item_number,
    receipt.order_line_number,
    receipt.order_number,
    photoURL,
    parseFloat(quantity),
    receipt.receipt_num,
    receipt.receipt_tran_id,
    receipt.to_organization,
    "rejectReceipt",
    receipt.unit_of_measure);

    this.receipt_id = test;
}

async updateRejectReceipt(id, file_id) {

  let dbRejectReceipt = await DBGrnReceiptDataHelper.updateRejectReceipt(id, file_id);

  return dbRejectReceipt;

}

async deleteRejectReceipt(id) {

  await DBGrnReceiptDataHelper.deleteRejectReceipt(id);
}

async sendFile() {
  this.setState({ isLoading: true });
  console.tron.log("Image data",  this.data);

  await DBGrnReceiptDataHelper.updateReceiptStatus(this.state.entityReceipt.order_number,
    this.state.entityReceipt.order_line_number, this.state.entityReceipt.receipt_num, this.photoURI,
     this.state.selectedRejectReason.value, "pending", new Date(), this.state.quantity);

  const username = await Utils.retrieveDataFromAsyncStorage("USER_NAME");
  const params = [username,'testPhotoName', this.data];
  let result = await this.api["postPhoto"].apply(this, params)

  this.setState({ isLoading: false });

  setTimeout(async() => {
    if (result.ok) {
      console.tron.log("Response API ok: ", result.data);

      this.file_id = result.data.REQUEST_ID;
      //update file id to local
      let updatedReceipt = await this.updateRejectReceipt(this.receipt_id, this.file_id);
      //call change receipt API
      this.postRejectReceipt(updatedReceipt.order_number, updatedReceipt.order_line_number,
         updatedReceipt.quantity, updatedReceipt.unit_of_measure, updatedReceipt.item_number,
          updatedReceipt.item_description, updatedReceipt.to_organization, updatedReceipt.comments,
          updatedReceipt.receipt_num, updatedReceipt.deliver_tran_id, updatedReceipt.receipt_tran_id,
          updatedReceipt.type, updatedReceipt.file_id, this.receipt_id);

    } else {
      console.tron.log(
        "Response API: failed",
        result.status + " - " + result.problem
      );

      this.submitFailedAlert();
    }
  }, 100)
}

async postRejectReceipt(order_number, order_line_number,
  quantity, unit_of_measure, item_number, item_description,
  to_organization, comments, receipt_num, deliver_tran_id,
  receipt_tran_id, type, file_id, receipt_id) {

  this.setState({ isLoading: true });

  const username = await Utils.retrieveDataFromAsyncStorage("USER_NAME");
  const response = await this.api.postRejectReceipt(username, order_number,
    order_line_number, quantity, unit_of_measure, item_number,
    item_description, to_organization, comments, receipt_num,
    deliver_tran_id, receipt_tran_id, type, file_id);

  this.setState({ isLoading: false });

  setTimeout(async() => {
    if (response.ok) {
      console.tron.log("Response API ok: ", response.data);

        this.deleteRejectReceipt(receipt_id);
        await DBGrnReceiptDataHelper.updateReceiptStatus(order_number, order_line_number, receipt_num,this.photoURI,
           comments, "processing",new Date(), quantity)

        Alert.alert(
          "",
          "Reject receipt successfully submitted!",
          [{ text: "OK", onPress: () => this.props.navigation.popToTop() }],
          { cancelable: false }
        );
    } else {
      console.tron.log(
        "Response API: failed",
        response.status + " - " + response.problem
      );

      //To Do : save receipt Data
      Alert.alert(
        "",
        "Unable to submit the reject receipt as there is no internet connection. The change order will be submitted when there is connection.",
        [{ text: "OK", onPress: () => this.props.navigation.popToTop() }],
        { cancelable: false }
      );
    }
  }, 100)
};

async postRejectReceiptWithoutPhoto(order_number, order_line_number,
  quantity, unit_of_measure, item_number, item_description,
  to_organization, comments, receipt_num, deliver_tran_id,
  receipt_tran_id, type, file_id, receipt_id) {

  await DBGrnReceiptDataHelper.updateReceiptStatus(order_number, order_line_number, receipt_num, null,
       //comments
       "REJECTED", "pending",new Date(), quantity)

  this.setState({ isLoading: true });

  const username = await Utils.retrieveDataFromAsyncStorage("USER_NAME");
  const response = await this.api.postRejectReceipt(username, order_number,
    order_line_number, quantity, unit_of_measure, item_number,
    item_description, to_organization, comments, receipt_num,
    deliver_tran_id, receipt_tran_id, type, file_id);

  this.setState({ isLoading: false });

  setTimeout(async() => {
    if (response.ok) {
      console.tron.log("Response API ok: ", response.data);

        this.deleteRejectReceipt(receipt_id);
      await DBGrnReceiptDataHelper.updateReceiptStatus(order_number, order_line_number, receipt_num, null,
           comments, "processing",new Date(), quantity)


        Alert.alert(
          "",
          "Reject receipt successfully submitted!",
          [{ text: "OK", onPress: () => this.props.navigation.popToTop() }],
          { cancelable: false }
        );
    } else {
      console.tron.log(
        "Response API: failed",
        response.status + " - " + response.problem
      );

      //To Do : save receipt Data
      this.submitFailedAlert();
    }
  }, 100)
};

selectPhotoTapped() {
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    mediaType: 'photo',

    storageOptions: {
      skipBackup: true,
      cameraRoll: true,
      path: 'ReceiptsPhotos'
    }
  };
  console.tron.log('selectPhotoTapped');

  ImagePicker.showImagePicker(options, (response) => {
    console.tron.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled photo picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      let source = { uri: response.uri };
      this.setState({
            img: source,
          });
      this.photoURI = source.uri;
      this.data = new FormData();
      this.data.append('photo', {
        uri: source,
        type: 'image/jpeg', // or photo.type
        name: 'testPhotoName'
      });
    }
  }, err => {
    console.tron.log('Error = ', JSON.stringify(err));
  });
}

showAlertMessage(alertMessage) {
  Alert.alert(
    '',
    alertMessage,
    [
      {text: 'OK'},
    ],
    { cancelable: false }
  )
};

_submitRejectReceipt = () => {
  console.tron.log("Submit reject receipt");
  if (isNaN(this.state.quantity) || this.state.quantity == 0){
          this.showAlertMessage("Please enter a valid quantity.");
  }else {
      if (this.state.quantity > this.state.entityReceipt.quantity){
            this.showAlertMessage("Entered amount cannot be higher than available quantity.");
      }else {
        if (this.state.selectedRejectReason == "" || this.state.selectedRejectReason == undefined || this.state.selectedRejectReason == null){
          console.tron.log("COMMENTS: ",this.state.selectedRejectReason );
          this.state.selectedRejectReason = "REJECTED";
           // this.showAlertMessage("Please add a comment.");
           this._submitRejectReceiptConfirmed();
        } else {
              this._submitRejectReceiptConfirmed()
        };
      };
    };
};

 submitFailedAlert() {
   Alert.alert(
     "",
     "Unable to reject the receipt as there is no internet connection. The receipt will be rejected when there is connection.",
     [{ text: "OK", onPress: () => this.props.navigation.popToTop() }],
     { cancelable: false }
   );
 }

_submitRejectReceiptConfirmed() {
  Alert.alert(
    "",
    "Are you sure you want to reject this receipt?",
    [
      { text: "Ok", onPress: this._submit},
      {text:"Cancel", style:"cancel"},
    ],
    { cancelable: false }
  );
}

_submit = () => {

  //save to local
  this.saveRejectReceipt(this.state.selectedRejectReason.value, this.photoURI, this.state.quantity)

  if (this.photoURI != undefined && this.photoURI != "" && this.photoURI != ""){
    console.tron.log("Print Photo URL: ",this.photoURI)
    //send file API
    this.sendFile()

  }else {
    receipt = this.state.entityReceipt;

    this.postRejectReceiptWithoutPhoto(receipt.order_number, receipt.order_line_number,
       this.state.quantity, receipt.unit_of_measure, receipt.item_number,
        receipt.item_description, receipt.to_organization, this.state.selectedRejectReason ="REJECTED",
        receipt.receipt_num, receipt.deliver_tran_id, receipt.receipt_tran_id,
        receipt.type, 0, this.receipt_id);
  };
}

onRejectReasonChange(value : string) {
  const selectedRejectReason = this.state.rejectReasons[value]
  this.setState({selectedRejectReason: selectedRejectReason});
}

renderUsageTypePicker() {
  var items = []
  if (this.state.usageTypes != null) {
  items = this.state.usageTypes.map((item, i) => (
    <Picker.Item key={i} label={item.type} value={i} />
  ));
}
  return (
    <Picker
      style={styles.picker}
      textStyle={styles.answer}
      mode="dropdown"
      selectedValue={this.state.selectedUsageValue}
      onValueChange={this.onUsageValueChange.bind(this)}
    >
    <Picker.Item key="na" label="-" value="na" />

      {items}
    </Picker>
  );
}
onUsageValueChange(value : string) {
  const selectedUsageType = this.state.usageTypes[value]
  this.setState({selectedUsageType: selectedUsageType});
}
  render () {
    return (
      <SafeAreaView style={styles.container}>
      <Spinner visible={this.state.isLoading} />
      <View style={styles.mainContainer}>
      <View style={styles.lineWithBottomSpace}/>
      <ScrollView>

      <KeyboardAvoidingView style={styles.mainContainer} behavior="position" enabled>
          <View style={styles.headerContainer}>
          <View style={styles.lineWithBottomSpace}/>
          <View style={styles.greyInfoContainer}>
            <Text style={styles.infoTextLeft}>Item No</Text>
            <Text style={styles.infoText}>{this.state.entityReceipt.order_number}</Text>
          </View>
          <View style={styles.pinkInfoContainer}>
            <Text style={styles.infoTextLeft}>Description</Text>
            <Text style={styles.infoText}>{this.state.entityReceipt.item_description}</Text>
          </View>
          <View style={styles.greyInfoContainer}>
            <Text style={styles.infoTextLeft}>UOM</Text>
            <Text style={styles.infoText}>{this.state.entityReceipt.unit_of_measure}</Text>
          </View>
          <View style={styles.lastPinkInfoContainer}>
            <Text style={styles.infoTextLeft}>Quantity</Text>
            <Text style={styles.infoText}>{this.state.entityReceipt.quantity}</Text>
          </View>
          </View>
          <View style={styles.lineWithBottomSpace}/>
          <View style={styles.line}/>
          <View style={styles.headerContainer}>
          <View style={styles.box}>
            <View style={styles.boxView}>
              <Text style={styles.question}>QUANTITY REJECTED</Text>
              <TextInput
                style={styles.quantityInput}
                maxLength={7}
                placeholder="0.0 "
                keyboardType="numeric"
                onChangeText={quantity => this.setState({quantity})}
                value={this.state.quantity}
              />
            </View>
          </View>

            {/* <View style={styles.box}>
            <View style={styles.boxView}>
            <Text style={styles.question}>REASON FOR REJECTION *</Text>
                  <Container style={styles.pickerContainer}>
                    <Content>{this.renderRejectReasonPicker()}</Content>
                    </Container>
                    <Text style={styles.pickerAnswer} pointerEvents="none">
                        {this.state.selectedRejectReason != null ? this.state.selectedRejectReason.value : ""}
                      </Text>
                      <Image source={Images.redArrow} style={styles.arrow} />
                </View>
            </View>
        <View style={styles.imageViewBox}>
          <Image source={this.state.img} style={styles.imageView}/>
        </View> */}
        

        </View>
        </KeyboardAvoidingView>
      </ScrollView>

      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {this.selectPhotoTapped()}}
          style={styles.buttonStyle}>
            <View>
              <Text style={styles.buttonText}>ADD PHOTO</Text>
            </View>
        </TouchableOpacity>

      </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GrnRejectReceipt)
