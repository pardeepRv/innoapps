import React, {Component} from 'react'
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Alert
} from 'react-native'
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import DBGrnPurchaseOrderDataHelper from "../DB/DBGrnPurchaseOrderDataHelper";
import CreateReceipt from "../Models/CreateReceipt";
import Spinner from "react-native-loading-spinner-overlay";
import Utils from "../Utils/Utils";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/GrnReceiptDetailsStyle'
// For API
import CreateReceiptsAPIHelper from "../APIHelper/CreateReceiptsAPIHelper";
import FJSON from "format-json";
import API from "../../App/Services/Api";

class GrnReceiptDetails extends Component {

  api = {};
  photoURI: "";
  file_id: 0;
  receipt_id: "";
  data: FormData;

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      entityPurchaseOrder: props.navigation.state.params.entityPurchaseOrder,
      comments: "",
      quantity: "",
      img: null,
      isChecked: true,
      index: props.navigation.state.params.index,
    }

    this.api = API.create();


    console.tron.log("entity Purchase Order Receipt: ", this.state.entityPurchaseOrder);
  }

  static navigationOptions = ({navigation}) => {

      return {
        title: "RECEIPTS",
        headerTintColor: 'red',
        headerTitleStyle: {
          color: 'black'
        },
        headerRight: (<TouchableOpacity onPress={navigation.getParam('submitReceipt')}>
          <Text style={styles.menuButton}>SUBMIT</Text>
        </TouchableOpacity>)
      }

  };

  componentDidMount() {
    this.props.navigation.setParams({submitReceipt: this._submitReceipt})


    if (this.state.entityPurchaseOrder.quantity_received != null || this.state.entityPurchaseOrder.quantity_received != undefined
      || this.state.entityPurchaseOrder.quantity_received != ""){

      if (this.state.entityPurchaseOrder.quantity_received != 0) {
        this.setState({
          quantity: "" + this.state.entityPurchaseOrder.quantity_received,
        });
      }else {
        this.setState({
          quantity: "",
        });
      };
    };

    if (this.state.entityPurchaseOrder.comments != null || this.state.entityPurchaseOrder.comments != undefined){
      this.setState({
        comments:  this.state.entityPurchaseOrder.comments,
      });
    };

    if (this.state.entityPurchaseOrder.photoURL != null || this.state.entityPurchaseOrder.photoURL != undefined){
      let source = {
        uri: this.state.entityPurchaseOrder.photoURL
      };
      this.setState({
        img: source,
      });
    };
  }

  _submitReceiptConfirmed = () => {
    Alert.alert(
      "",
      "Are you sure you want to create this receipt?",
      [
        { text: "Ok", onPress: this._submit},
        {text:"Cancel", style:"cancel"},
      ],
      { cancelable: false }
    );
  }

  _submitReceipt = () => {

    if (this.state.entityPurchaseOrder.submitStatus == "processing") {
      Alert.alert(
        "",
        "This receipt has been submitted",
        [
          { text: "Ok"},
        ],
        { cancelable: false }
      );

    }else{
      console.tron.log("Submit receipt");
      if (isNaN(this.state.quantity) || this.state.quantity == 0){
          this.showAlertMessage("Please enter a valid quantity.");
      }else{
        if (this.state.quantity > this.state.entityPurchaseOrder.quantity_available_to_receive){
          this.showAlertMessage("Entered amount cannot be higher than open quantity.");
        }else {
          this._submitReceiptConfirmed()
        };
      };
    };
  }

  _submit = () => {
    //save to local
    this.saveCreateReceipt(this.state.comments, this.photoURI, this.state.quantity)

    if (this.photoURI != "" && this.photoURI != undefined && this.photoURI != null) {
      //send file API
      this.sendFile()

    }else{
      let receipt = this.state.entityPurchaseOrder
      console.tron.log("receipt organization", receipt.to_organization)
        this.postCreateReceipt(receipt.order_number, receipt.order_line_number,
          parseFloat(this.state.quantity), receipt.unit_of_measure, receipt.to_organization_id,
           receipt.to_organization, this.state.comments, receipt.type,
        0, receipt.distribution_number)
    }
  }

  async saveCreateReceipt(comments, photoURL, quantity) {

    purchaseOrder = this.state.entityPurchaseOrder;

    // Convert quantity string to number
    var quantityNum = parseFloat(quantity);

    var test = await DBGrnPurchaseOrderDataHelper.saveCreateReceipt(
      comments,
      purchaseOrder.item_description,
      true,
      0.0,
      "",
      purchaseOrder.quantity_available_to_receive,
      purchaseOrder.order_line_number,
      purchaseOrder.order_number,
      purchaseOrder.quantity_ordered,
      photoURL,
      quantityNum,
      "draft",
      new Date(),
      purchaseOrder.to_organization,
      purchaseOrder.to_organization_id,
      "createReceipt",
      purchaseOrder.unit_of_measure,
      purchaseOrder.distribution_number,

    );

    this.receipt_id = test;

   await DBGrnPurchaseOrderDataHelper.updatePOStatus(
      purchaseOrder.order_number,
      purchaseOrder.distribution_number,
      purchaseOrder.order_line_number,
      true,
      "pending",
      new Date(),
      quantity,
      quantity,
      comments,
      this.photoURI);
  }

  async updateCreateReceiptFile(id, file_id) {

    let dbCreateReceipt = await DBGrnPurchaseOrderDataHelper.updateCreateReceiptFile(id, file_id);
    return dbCreateReceipt;
  }

  async postCreateReceipt(
      order_number,
      order_line_number,
      quantity,
      unit_of_measure,
      to_organization_id,
      to_organization,
      comments,
      type,
      file_id,
      distribution_number) {

    this.setState({isLoading: true});

    var receipt = new CreateReceipt(
      order_number,
      order_line_number,
      quantity,
      unit_of_measure,
      to_organization_id,
      to_organization,
      comments,
      type,
      file_id,
      distribution_number)

    console.tron.log("Post Create Receipt 1", receipt);

    await DBGrnPurchaseOrderDataHelper.updateCreateReceiptStatus(
      receipt.order_number,
      receipt.distribution_number,
      receipt.order_line_number,
      true,
      "pending",
      new Date(),
      receipt.quantity);

    console.tron.log("Post Create Receipt 2");

    const username = await Utils.retrieveDataFromAsyncStorage("USER_NAME");

    console.tron.log("PRINT FINAL RECEIPT:", [receipt])
    const response = await CreateReceiptsAPIHelper.postCreateReceipt(username, [receipt]);

    this.setState({isLoading: false});

    setTimeout(() => {
      if (response.ok) {
        this.props.navigation.state.params.refreshStatus("processing",this.state.index)
        this.submitSuccessfulAlert()
        console.tron.log("Response API ok: ", response.data);

      } else {
        this.props.navigation.state.params.refreshStatus("pending",this.state.index)
        this.submitFailedAlert();
        console.tron.log("Response API: failed", response.status + " - " + response.problem);
      }
    }, 100)
  };

  nextReceipt = () => {
    if (isNaN(this.state.quantity) || this.state.quantity == 0){
        this.showAlertMessage("Please enter a valid quantity.");
    }else{
      if (this.state.quantity > this.state.entityPurchaseOrder.quantity_available_to_receive){
        this.showAlertMessage("Entered amount cannot be higher than open quantity.");
      }else {
        //save to local
        this.saveCreateReceipt(this.state.comments, this.photoURI, this.state.quantity)
        this.props.navigation.state.params.returnData(this.state.isChecked,this.state.comments, this.photoURI, this.state.quantity,this.state.index)
        this.props.navigation.pop()
      };
    };
  };

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
      "Unable to create the receipts as there is no internet connection. The receipt will be created when there is connection.",
      [{ text: "OK", onPress: () => this.props.navigation.pop() }],
      { cancelable: false }
    );
  }

  showAlertMessage(alertMessage) {
    Alert.alert(
      '',
      alertMessage,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK'},
      ],
      { cancelable: false }
    )
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

    ImagePicker.showImagePicker(options, (response) => {
      console.tron.log('Response = ', response);

      if (response.didCancel) {
        console.tron.log('User cancelled photo picker');
      } else if (response.error) {
        console.tron.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.tron.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {
          uri: response.uri
        };
        this.setState({img: source});
        this.photoURI = source.uri;
        this.data = new FormData();
        this.data.append('photo', {
          uri: source,
          type: 'image/jpeg', // or photo.type
          name: 'testPhotoName'
        });
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  }

  async sendFile() {

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

          console.tron.log("updated file id : ", this.file_id)
          console.tron.log("updated receipt_id : ", this.receipt_id)
        //update file id to local
        let updatedReceipt = await this.updateCreateReceiptFile(this.receipt_id, this.file_id);
        console.tron.log("updated Receipt data: ", updatedReceipt)
        //call change receipt API
        this.postCreateReceipt(updatedReceipt.order_number, updatedReceipt.order_line_number,
          updatedReceipt.quantity, updatedReceipt.unit_of_measure,updatedReceipt.to_organization_id,
          updatedReceipt.to_organization, updatedReceipt.comments, updatedReceipt.type,
          updatedReceipt.file_id, updatedReceipt.distribution_number)

      } else {
        this.props.navigation.state.params.refreshStatus("pending",this.state.index)
        this.submitFailedAlert();
        console.tron.log("Response API: failed", result.status + " - " + result.problem);
      }
    }, 100)
  }

  render() {
    if (this.state.entityPurchaseOrder.submitStatus == "processing" || this.state.entityPurchaseOrder.submitStatus == "pending"){
      return (<View style={styles.container}>
        <Spinner visible={this.state.isLoading} />

        <View style={styles.mainContainer}>
          <View style={styles.lineWithBottomSpace}/>
          <ScrollView>
            <KeyboardAvoidingView style={styles.mainContainer} behavior="position" enabled="enabled">
              <View style={styles.headerContainer}>
                <View style={styles.lineWithBottomSpace}/>
                <View style={styles.greyInfoContainer}>
                  <Text style={styles.infoTextLeft}>Order No.</Text>
                  <Text style={styles.infoText}>{this.state.entityPurchaseOrder.order_number}</Text>
                </View>
                <View style={styles.pinkInfoContainer}>
                  <Text style={styles.infoTextLeft}>Order Line No.</Text>
                  <Text style={styles.infoText}>{this.state.entityPurchaseOrder.order_line_number}</Text>
                </View>
                <View style={styles.greyInfoContainer}>
                  <Text style={styles.infoTextLeft}>Distribution No.</Text>
                  <Text style={styles.infoText}>{this.state.entityPurchaseOrder.distribution_number}</Text>
                </View>
                <View style={styles.pinkInfoContainer}>
                  <Text style={styles.infoTextLeft}>Item No.</Text>
                  <Text style={styles.infoText}>0000</Text>
                </View>
                <View style={styles.greyInfoContainer}>
                  <Text style={styles.infoTextLeft}>Description</Text>
                  <Text style={styles.infoText}>{this.state.entityPurchaseOrder.item_description}</Text>
                </View>
                <View style={styles.pinkInfoContainer}>
                  <Text style={styles.infoTextLeft}>UOM</Text>
                  <Text style={styles.infoText}>{this.state.entityPurchaseOrder.unit_of_measure}</Text>
                </View>
                <View style={styles.greyInfoContainer}>
                  <Text style={styles.infoTextLeft}>Ordered Quantity</Text>
                  <Text style={styles.infoText}>{this.state.entityPurchaseOrder.quantity_ordered}</Text>
                </View>
                <View style={styles.lastPinkInfoContainer}>
                  <Text style={styles.infoTextLeft}>Open Quantity</Text>
                  <Text style={styles.infoText}>{this.state.entityPurchaseOrder.quantity_available_to_receive - this.state.entityPurchaseOrder.quantity_received}</Text>
                </View>
              </View>
              <View style={styles.lineWithBottomSpace}/>
              <View style={styles.line}/>
              <View style={styles.headerContainer}>

                <View style={styles.box}>
                  <View style={styles.boxView}>
                    <Text style={styles.question}>QUANTITY *</Text>

                    <TextInput style={styles.quantityInput} maxLength={7} placeholder="0.0" keyboardType="numeric"
                    onChangeText={text => this.setState({quantity: text})} value={this.state.quantity} editable={false} selectTextOnFocus={false}/>
                  </View>
                </View>
                <View style={styles.textBox}>
                  <TextInput style={styles.input} value={this.state.comments} placeholder='ADD COMMENTS'
                  onChangeText={text => this.setState({comments: text})} multiline={true} editable={false} selectTextOnFocus={false}
                    marginTop={10}
                    marginBottom={15}
                    marginLeft={5}
                    fontSize={12}
                    underlineColorAndroid='transparent'/>
                </View>
                <View style={styles.imageViewBox}>
                  <Image source={this.state.img} style={styles.imageView}/>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
          disabled={true}
          style={styles.disableButtonStyle}>
            <View>
              <Text style={styles.buttonText}>ADD PHOTO</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
           disabled={true} style={styles.disableButtonStyle}>
            <View>
              <Text style={styles.buttonText}>NEXT</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>)
    }else {
      return (<View style={styles.container}>
        <Spinner visible={this.state.isLoading} />

        <View style={styles.mainContainer}>
          <View style={styles.lineWithBottomSpace}/>
          <ScrollView>
            <KeyboardAvoidingView style={styles.mainContainer} behavior="position" enabled="enabled">
              <View style={styles.headerContainer}>
                <View style={styles.lineWithBottomSpace}/>
                <View style={styles.greyInfoContainer}>
                  <Text style={styles.infoTextLeft}>Order No.</Text>
                  <Text style={styles.infoText}>{this.state.entityPurchaseOrder.order_number}</Text>
                </View>
                <View style={styles.pinkInfoContainer}>
                  <Text style={styles.infoTextLeft}>Order Line No.</Text>
                  <Text style={styles.infoText}>{this.state.entityPurchaseOrder.order_line_number}</Text>
                </View>
                <View style={styles.greyInfoContainer}>
                  <Text style={styles.infoTextLeft}>Distribution No.</Text>
                  <Text style={styles.infoText}>{this.state.entityPurchaseOrder.distribution_number}</Text>
                </View>
                <View style={styles.pinkInfoContainer}>
                  <Text style={styles.infoTextLeft}>Item No.</Text>
                  <Text style={styles.infoText}>0000</Text>
                </View>
                <View style={styles.greyInfoContainer}>
                  <Text style={styles.infoTextLeft}>Description</Text>
                  <Text style={styles.infoText}>{this.state.entityPurchaseOrder.item_description}</Text>
                </View>
                <View style={styles.pinkInfoContainer}>
                  <Text style={styles.infoTextLeft}>UOM</Text>
                  <Text style={styles.infoText}>{this.state.entityPurchaseOrder.unit_of_measure}</Text>
                </View>
                <View style={styles.greyInfoContainer}>
                  <Text style={styles.infoTextLeft}>Ordered Quantity</Text>
                  <Text style={styles.infoText}>{this.state.entityPurchaseOrder.quantity_ordered}</Text>
                </View>
                <View style={styles.lastPinkInfoContainer}>
                  <Text style={styles.infoTextLeft}>Open Quantity</Text>
                  <Text style={styles.infoText}>{this.state.entityPurchaseOrder.quantity_available_to_receive - this.state.entityPurchaseOrder.quantity_received}</Text>
                </View>
              </View>
              <View style={styles.lineWithBottomSpace}/>
              <View style={styles.line}/>
              <View style={styles.headerContainer}>

                <View style={styles.box}>
                  <View style={styles.boxView}>
                    <Text style={styles.question}>QUANTITY *</Text>

                    <TextInput style={styles.quantityInput} maxLength={7} placeholder="0.0" keyboardType="numeric"
                    onChangeText={text => this.setState({quantity: text})} value={this.state.quantity}/>
                  </View>
                </View>
                <View style={styles.textBox}>
                  <TextInput style={styles.input} value={this.state.comments} placeholder='ADD COMMENTS'
                  onChangeText={text => this.setState({comments: text})}   multiline={true}
                    marginTop={10}
                    marginBottom={15}
                    marginLeft={5}
                    fontSize={12}
                    underlineColorAndroid='transparent'/>
                </View>
                <View style={styles.imageViewBox}>
                  <Image source={this.state.img} style={styles.imageView}/>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => {
              this.selectPhotoTapped()
            }} style={styles.buttonStyle}>
            <View>
              <Text style={styles.buttonText}>ADD PHOTO</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
              this.nextReceipt()
            }} style={styles.buttonStyle}>
            <View>
              <Text style={styles.buttonText}>NEXT</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>)
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(GrnReceiptDetails)
