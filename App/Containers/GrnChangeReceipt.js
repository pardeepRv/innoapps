import React, { Component } from "react";
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import ImagePicker from "react-native-image-picker";
import DBGrnReceiptDataHelper from "../DB/DBGrnReceiptDataHelper";
import Spinner from "react-native-loading-spinner-overlay";
import Utils from "../Utils/Utils";

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/GrnChangeReceiptStyle";
// For API
import API from "../../App/Services/Api";
import FJSON from "format-json";

class GrnChangeReceipt extends Component {
  api = {};
  photoURI: "";
  file_id: 0;
  receipt_id: "";
  data: FormData;

  constructor(props) {
    console.log(props, "props in change receipt>>>");
    super(props);
    this.state = {
      isLoading: false,
      entityReceipt: props.navigation.state.params.entityReceipt,
      comment: "",
      quantity: "",
      img: null,
      correctedQuantity: "",
    };

    this.api = API.create();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "CHANGE RECEIPTS",
      headerTintColor: "red",
      headerTitleStyle: { color: "black" },
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam("submitChangeReceipt")}>
          <Text style={styles.menuButton}>SUBMIT</Text>
        </TouchableOpacity>
      ),
    };
  };

  // MARK: Api
  async getEnvVar() {
    const environment = await Utils.retrieveDataFromAsyncStorage("ENVIRONMENT");
    console.tron.log("Environment Variable (API) ", environment);

    if (environment == "SKAD3") {
      envURL =
        "https://skad3a1-skanskapaas.inoappsproducts.com/ords/inoapps_ec/";
      console.log("New ENV URL ", envURL);
      this.api = new API.create(envURL);
      console.log(this.api, "LETS GOOOO");
    } else if (environment == "SKAD2") {
      envURL =
        "https://skad2a1-skanskapaas.inoappsproducts.com/ords/inoapps_ec/";
      console.log("New ENV URL ", envURL);
      this.api = new API.create(envURL);
    } else if (environment == "SKAD1") {
      envURL =
        "https://skad1a1-skanskapaas.inoappsproducts.com/ords/inoapps_ec/";
      console.log("New ENV URL ", envURL);
      this.api = new API.create(envURL);
    } else if (environment == "SKAT1") {
      envURL =
        "https://skat1a1-skanskapaas.inoappsproducts.com/ords/inoapps_ec/";
      console.log("New ENV URL ", envURL);
      this.api = new API.create(envURL);
    } else if (environment == "PTEST2") {
      envURL = "https://ptest2a1-inoapps4.inoapps.com/ords/inoapps_ec/";
      console.log("New ENV URL ", envURL);
      this.api = new API.create(envURL);
    } else if (environment == "PDEV2") {
      envURL = "https://pdev2a1-inoapps4.inoapps.com/ords/inoapps_ec/";
      this.api = new API.create(envURL);
      console.log("New ENV URL RECEIPTS ", envURL);
    } else if (environment == "PDEV1") {
      envURL = "https://pdev1a1-inoapps4.inoapps.com/ords/inoapps_ec/";
      this.api = new API.create(envURL);
      console.log("New ENV URL RECEIPTS ", envURL);
    } else if (environment == "PTEST1") {
      envURL = "https://ptest1a1-inoapps4.inoapps.com/ords/inoapps_ec/";
      this.api = new API.create(envURL);
      console.log("New ENV URL RECEIPTS ", envURL);
    }
  }

  componentDidMount() {
    this.getEnvVar();
    this.props.navigation.setParams({
      submitChangeReceipt: this._submitChangeReceipt,
    });
    console.tron.log("Component Did mount");
  }

  _submitChangeReceiptConfirmed() {
    Alert.alert(
      "",
      "Are you sure you want to correct this receipt?",
      [
        { text: "Ok", onPress: this._submit },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: false }
    );
  }

  async saveChangeReceipt(comments, photoURL, quantity) {
    console.log(quantity, "quantity coming in fuunc>>>>");
    receipt = this.state.entityReceipt;

    var test = await DBGrnReceiptDataHelper.saveChangeReceipt(
      comments,
      receipt.deliver_tran_id,
      0.0,
      receipt.item_description,
      receipt.item_number,
      receipt.order_line_number,
      receipt.order_number,
      photoURL,
      parseFloat(quantity),
      receipt.receipt_num,
      receipt.receive_tran_id,
      receipt.to_organization,
      "correctReceipt",
      receipt.unit_of_measure
    );

    this.receipt_id = test;
  }

  async updateChangeReceipt(id, file_id) {
    let dbChangeReceipt = await DBGrnReceiptDataHelper.updateChangeReceipt(
      id,
      file_id
    );

    return dbChangeReceipt;
  }

  async deleteChangeReceipt(id) {
    await DBGrnReceiptDataHelper.deleteChangeReceipt(id);
  }

  async sendFile() {
    this.setState({ isLoading: true });
    console.tron.log("Image data", this.data);

    await DBGrnReceiptDataHelper.updateReceiptStatus(
      this.state.entityReceipt.order_number,
      this.state.entityReceipt.order_line_number,
      this.state.entityReceipt.receipt_num,
      this.photoURI,
      this.state.comment,
      "pending",
      new Date(),
      this.state.quantity
    );

    const username = await Utils.retrieveDataFromAsyncStorage("USER_NAME");
    const params = [username, "testPhotoName", this.data];
    let result = await this.api["postPhoto"].apply(this, params);

    this.setState({ isLoading: false });
    setTimeout(async () => {
      if (result.ok) {
        console.tron.log("Response API ok: ", result.data);
        this.file_id = result.data.REQUEST_ID;
        //update file id to local
        let updatedReceipt = await this.updateChangeReceipt(
          this.receipt_id,
          this.file_id
        );
        //call change receipt API
        this.postCorrectReceipt(
          updatedReceipt.order_number,
          updatedReceipt.order_line_number,
          updatedReceipt.quantity,
          updatedReceipt.unit_of_measure,
          updatedReceipt.item_number,
          updatedReceipt.item_description,
          updatedReceipt.to_organization,
          updatedReceipt.comments,
          updatedReceipt.receipt_num,
          updatedReceipt.deliver_tran_id,
          updatedReceipt.receive_tran_id,
          updatedReceipt.type,
          updatedReceipt.file_id,
          this.receipt_id
        );
      } else {
        console.tron.log(
          "Response API: failed",
          result.status + " - " + result.problem
        );
        this.submitFailedAlert();
      }
    }, 100);
  }

  async postCorrectReceipt(
    order_number,
    order_line_number,
    quantity,
    unit_of_measure,
    item_number,
    item_description,
    to_organization,
    comments,
    receipt_num,
    deliver_tran_id,
    receive_tran_id,
    type,
    file_id,
    receipt_id
  ) {
    this.setState({ isLoading: true });

    const username = await Utils.retrieveDataFromAsyncStorage("USER_NAME");
    const response = await this.api.postCorrectReceipt(
      username,
      order_number,
      order_line_number,
      quantity,
      unit_of_measure,
      item_number,
      item_description,
      to_organization,
      comments,
      receipt_num,
      deliver_tran_id,
      receive_tran_id,
      type,
      file_id
    );

    this.setState({ isLoading: false });

    setTimeout(async () => {
      if (response.ok) {
        console.tron.log("Response API ok: ", response.data);

        this.deleteChangeReceipt(receipt_id);
        await DBGrnReceiptDataHelper.updateReceiptStatus(
          order_number,
          order_line_number,
          receipt_num,
          this.photoURI,
          comments,
          "processing",
          new Date(),
          quantity
        );

        Alert.alert(
          "",
          "Change receipt successfully submitted!",
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
          "Unable to submit the change receipt as there is no internet connection. The change order will be submitted when there is connection.",
          [{ text: "OK", onPress: () => this.props.navigation.popToTop() }],
          { cancelable: false }
        );
      }
    }, 100);
  }

  async postCorrectReceiptWithoutPhoto(
    order_number,
    order_line_number,
    quantity,
    unit_of_measure,
    item_number,
    item_description,
    to_organization,
    comments,
    receipt_num,
    deliver_tran_id,
    receive_tran_id,
    type,
    file_id,
    receipt_id
  ) {
    this.setState({ isLoading: true });

    //To Do : save receipt Data
    await DBGrnReceiptDataHelper.updateReceiptStatus(
      order_number,
      order_line_number,
      receipt_num,
      null,
      comments,
      "pending",
      new Date(),
      quantity
    );

    const username = await Utils.retrieveDataFromAsyncStorage("USER_NAME");
    const response = await this.api.postCorrectReceipt(
      username,
      order_number,
      order_line_number,
      Math.abs(quantity),
      unit_of_measure,
      item_number,
      item_description,
      to_organization,
      comments,
      receipt_num,
      deliver_tran_id,
      receive_tran_id,
      type,
      file_id
    );

    this.setState({ isLoading: false });

    setTimeout(async () => {
      console.log("Response API ok: ", response.data);

      if (response.ok) {

        this.deleteChangeReceipt(receipt_id);
        await DBGrnReceiptDataHelper.updateReceiptStatus(
          order_number,
          order_line_number,
          receipt_num,
          null,
          comments,
          "processing",
          new Date(),
          quantity
        );

        Alert.alert(
          "",
          "Change receipt successfully submitted!",
          [{ text: "OK", onPress: () => this.props.navigation.popToTop() }],
          { cancelable: false }
        );
      } else {
        console.log(
          "Response API: failed",
          response.status + " - " + response.problem
        );

        this.submitFailedAlert();
      }
    }, 100);
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      mediaType: "photo",

      storageOptions: {
        skipBackup: true,
        cameraRoll: true,
        path: "ReceiptsPhotos",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({
          img: source,
        });
        this.photoURI = source.uri;
        this.data = new FormData();
        this.data.append("photo", {
          uri: source,
          type: "image/jpeg", // or photo.type
          name: "testPhotoName",
        });
      }
    });
  }

  showAlertMessage(alertMessage) {
    Alert.alert("", alertMessage, [{ text: "OK" }], { cancelable: false });
  }

  submitFailedAlert() {
    Alert.alert(
      "",
      "Unable to change the receipt as there is no internet connection. The receipt will be changed when there is connection.",
      [{ text: "OK", onPress: () => this.props.navigation.pop() }],
      { cancelable: false }
    );
  }

  _submitChangeReceipt = () => {
    console.tron.log("Submit correct receipt");
    if (isNaN(this.state.quantity) || this.state.quantity == 0) {
      this.showAlertMessage("Please enter a valid quantity.");
    } else {
      this._submitChangeReceiptConfirmed();
    }
  };

  _submit = () => {
    debugger;
    //save to local
    this.setState({
      correctedQuantity:
        this.state.entityReceipt.quantity - this.state.quantity,
    });

    this.saveChangeReceipt(
      this.state.comment,
      this.photoURI,
      this.state.correctedQuantity
    );

    if (
      this.photoURI != undefined &&
      this.photoURI != "" &&
      this.photoURI != ""
    ) {
      console.tron.log("Print Photo URL: ", this.photoURI);
      //send file API
      this.sendFile();
    } else {
      receipt = this.state.entityReceipt;

      this.postCorrectReceiptWithoutPhoto(
        receipt.order_number,
        receipt.order_line_number,
        this.state.correctedQuantity,
        receipt.unit_of_measure,
        receipt.item_number,
        receipt.item_description,
        receipt.to_organization,
        this.state.comment,
        receipt.receipt_num,
        receipt.deliver_tran_id,
        receipt.receive_tran_id,
        receipt.type,
        0,
        this.receipt_id
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.isLoading} />

        <View style={styles.mainContainer}>
          <View style={styles.lineWithBottomSpace} />
          <ScrollView>
            <KeyboardAvoidingView
              style={styles.mainContainer}
              behavior="position"
              enabled
            >
              <View style={styles.headerContainer}>
                <View style={styles.lineWithBottomSpace} />
                <View style={styles.greyInfoContainer}>
                  <Text style={styles.infoTextLeft}>Item No</Text>
                  <Text style={styles.infoText}>
                    {this.state.entityReceipt.order_number}
                  </Text>
                </View>
                <View style={styles.pinkInfoContainer}>
                  <Text style={styles.infoTextLeft}>Description</Text>
                  <Text style={styles.infoText}>
                    {this.state.entityReceipt.item_description}
                  </Text>
                </View>
                <View style={styles.greyInfoContainer}>
                  <Text style={styles.infoTextLeft}>UOM</Text>
                  <Text style={styles.infoText}>
                    {this.state.entityReceipt.unit_of_measure}
                  </Text>
                </View>
                <View style={styles.lastPinkInfoContainer}>
                  <Text style={styles.infoTextLeft}>Quantity</Text>
                  <Text style={styles.infoText}>
                    {this.state.entityReceipt.quantity}
                  </Text>
                </View>
              </View>
              <View style={styles.lineWithBottomSpace} />
              <View style={styles.line} />
              <View style={styles.headerContainer}>
                <View style={styles.box}>
                  <View style={styles.boxView}>
                    <Text style={styles.question}>QUANTITY *</Text>
                    <TextInput
                      style={styles.quantityInput}
                      maxLength={7}
                      placeholder="0.0 "
                      keyboardType="numeric"
                      onChangeText={(quantity) => this.setState({ quantity })}
                      value={this.state.quantity}
                    />
                  </View>
                </View>
                <View style={styles.textBox}>
                  <TextInput
                    style={styles.input}
                    placeholder="ADD COMMENTS"
                    onChangeText={(comment) => this.setState({ comment })}
                    multiline={true}
                    marginTop={10}
                    marginBottom={15}
                    marginLeft={5}
                    fontSize={12}
                    underlineColorAndroid="transparent"
                  />
                </View>

                <View style={styles.imageViewBox}>
                  <Image source={this.state.img} style={styles.imageView} />
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              this.selectPhotoTapped();
            }}
            style={styles.buttonStyle}
          >
            <View>
              <Text style={styles.buttonText}>ADD PHOTO</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GrnChangeReceipt);
