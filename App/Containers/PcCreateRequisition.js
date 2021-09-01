import React, { Component, Dimensions } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  Switch,
  Alert,
} from "react-native";
import { Container, Content, Picker, DatePicker } from "native-base";
const Item = Picker.Item;
import { connect } from "react-redux";
import { Images } from "../Themes";
import DBPCStaticDataHelper from "../DB/DBPCStaticDataHelper"
import { createStackNavigator } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/PcCreateRequisitionStyle";

class PcCreateRequisition extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "CREATE REQUISITION",
      headerTintColor: 'red',
      headerTitleStyle: { color: 'black' },
      headerRight: (<TouchableOpacity onPress={navigation.getParam('selectArea')}>
        <Text style={styles.menuButton} >NEXT</Text>
      </TouchableOpacity>)
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ selectArea: this._selectArea });
  }

  state = {
    isChecked: true,
    selectedProperty: null,
    selectedBuilding: null,
    selectedUnit: null,
    selectedSupplier: null,
    selectedReason: null,
    chosenDate1: null,
    chosenDate2: null,
    chosenDate3: null,
    additionalInfo: "",

    selectedPropertyValue: "na",
    selectedBuildingValue: "na",
    selectedUnitValue: "na",
    selectedSupplierValue: "na",
    selectedReasonValue: "na",

    properties: [],
    buildings: [],
    units: [],
    suppliers: [],
    replaceReasons: [],

    isDateTime1PickerVisible: false,
    isDateTime2PickerVisible: false,
    isDateTime3PickerVisible: false,
  };

  constructor(props) {
    super(props);
    this.setDate1 = this.setDate1.bind(this);
    this.setDate2 = this.setDate2.bind(this);
    this.setDate3 = this.setDate3.bind(this);

    this.getProperties();
    this.getReplaceReasons();
  }

  _selectArea = () => {

    if (this.state.selectedProperty == null) {
      this.showAlertMessage('Please select property.')
    }
    else if (this.state.selectedUnit == null) {
      this.showAlertMessage('Please select unit.')
    }
    else if (this.state.selectedSupplier == null) {
      this.showAlertMessage('Please select supplier.')
    }
    else if (this.state.chosenDate1 == null) {
      this.showAlertMessage('Please select preferred date 1.')
    }
    else if (this.state.chosenDate2 == null) {
      this.showAlertMessage('Please select preferred date 2.')
    }
    else if (this.isSameDate(this.state.chosenDate1, Date())) {
      this.showAlertMessage('Preferred date 1 must be more than today date.')
    }
    else if (this.isSameDate(this.state.chosenDate2, Date())) {
      this.showAlertMessage('Preferred date 2 must be more than today date.')
    }
    else if (this.isSameDate(this.state.chosenDate1, this.state.chosenDate2)) {
      this.showAlertMessage('Preferred date 2 must not be same as preferred date 1.')
    }
    else if (this.state.selectedReason == null) {
      this.showAlertMessage('Please select replacement reason.')
    }
    else {
      this.props.navigation.navigate("SelectArea", {
        selectedProperty: this.state.selectedProperty,
        selectedUnit: this.state.selectedUnit,
        selectedSupplier: this.state.selectedSupplier,
        selectedReason: this.state.selectedReason,
        chosenDate1: this.state.chosenDate1,
        chosenDate2: this.state.chosenDate2,
        chosenDate3: this.state.chosenDate3,
        isChecked: this.state.isChecked,
        additionalInfo: this.state.additionalInfo
      })
    }
  };

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
  }

  isSameDate(date1, date2) {
    if (typeof date2 == 'object') {
      date2 = date2.toString().substr(4, 12)
    }

    if (date1 == date2) {
      return true
    }
    return false
  }

  setDate1(newDate) {
    this.setState({
      chosenDate1: newDate.toString().substr(4, 12)
    });
  }

  setDate2(newDate) {
    this.setState({
      chosenDate2: newDate.toString().substr(4, 12)
    });
  }

  setDate3(newDate) {
    this.setState({
      chosenDate3: newDate.toString().substr(4, 12)
    });
  }

  async onPropertyValueChange(value: string) {
    const selectedProperty = this.state.properties[value]
    this.setState({selectedProperty: selectedProperty})

    await this.getBuildings(selectedProperty)
    await this.getUnits(selectedProperty)
    await this.getSuppliers(selectedProperty)
  }

  onBuildingValueChange(value: string) {
    const selectedBuilding = this.state.buildings[value]
    this.setState({selectedBuilding: selectedBuilding.building_number})
  }

  onUnitValueChange(value: string) {
    console.tron.log('Unit value changed 1', value)
    const selectedUnit = this.state.units[value]
    this.setState({selectedUnit: selectedUnit})
    console.tron.log('Unit value changed 2', value)
    console.tron.log('Unit DATA ', selectedUnit)
  }

  onSupplierValueChange(value: string) {
    const selectedSupplier = this.state.suppliers[value]
    this.setState({selectedSupplier: selectedSupplier})
  }

  onReasonValueChange(value: string) {
    const selectedReason = this.state.replaceReasons[value]
    this.setState({selectedReason: selectedReason.reason})
  }

  async getProperties() {
    const properties = await DBPCStaticDataHelper.getProperties();
    this.setState({
      properties: properties
    })

    if (properties.length == 1) {
      this.setState({
        selectedProperty: properties[0]
      })
      this.getBuildings(properties[0])
      this.getSuppliers(properties[0])
    }
  }

  async getBuildings(property) {
    const buildings = await DBPCStaticDataHelper.getBuildings(property);
    this.setState({
      buildings: buildings
    })

    if (buildings.length == 1) {
      this.setState({
        selectedBuilding: buildings[0].building_number
      })
      this.getUnits(property)
    }
  }

  async getUnits(property) {
    const units = await DBPCStaticDataHelper.getUnits(property);
    this.setState({
      units: units
    })

    if (units.length == 1) {
      this.setState({
        selectedUnit: units[0]
      })
    }
  }

  async getSuppliers(property) {
    const suppliers = await DBPCStaticDataHelper.getSuppliers(property);
    this.setState({
      suppliers: suppliers
    })
  }

  async getReplaceReasons() {
    const replaceReasons = await DBPCStaticDataHelper.getReplaceReasons();
    this.setState({
      replaceReasons: replaceReasons
    })
  }

  renderPropertyPicker() {
    let items = this.state.properties.map((item, i) => (
      <Picker.Item key={i} label={item.location_name} value={i} />
    ));
    return (
      <Picker
        style={styles.picker}
        textStyle={styles.answer}
        mode="dropdown"
        selectedValue={this.state.selectedPropertyValue}
        onValueChange={this.onPropertyValueChange.bind(this)}
      >
      <Picker.Item key="na" label="-" value="na" />
        {items}
      </Picker>
    );
  }

  renderBuildingPicker() {
    let items = this.state.buildings.map((item, i) => (
      <Picker.Item key={i} label={item.building_number} value={i} />
    ));
    return (
      <Picker
        style={styles.picker}
        textStyle={styles.answer}
        mode="dropdown"
        selectedValue={this.state.selectedBuildingValue}
        onValueChange={this.onBuildingValueChange.bind(this)}
      >
      <Picker.Item key="na" label="-" value="na" />
        {items}
      </Picker>
    );
  }

  renderUnitPicker() {
    let items = this.state.units.map((item, i) => (
      <Picker.Item key={i} label={item.unit_name} value={i} />
    ));
    return (
      <Picker
        style={styles.picker}
        textStyle={styles.answer}
        mode="dropdown"
        selectedValue={this.state.selectedUnitValue}
        onValueChange={this.onUnitValueChange.bind(this)}
      >
      <Picker.Item key="na" label="-" value="na" />
        {items}
      </Picker>
    );
  }

  renderSupplierPicker() {
    let items = this.state.suppliers.map((item, i) => (
      <Picker.Item key={i} label={item.supplier_name} value={i} />
    ));
    return (
      <Picker
        style={styles.picker}
        textStyle={styles.answer}
        mode="dropdown"
        selectedValue={this.state.selectedSupplierValue}
        onValueChange={this.onSupplierValueChange.bind(this)}
      >
      <Picker.Item key="na" label="-" value="na" />
        {items}
      </Picker>
    );
  }

  renderReplacementReasonPicker() {
    let items = this.state.replaceReasons.map((item, i) => (
      <Picker.Item key={i} label={item.reason} value={i} />
    ));
    return (
      <Picker
        style={styles.picker}
        textStyle={styles.answer}
        mode="dropdown"
        selectedValue={this.state.selectedReasonValue}
        onValueChange={this.onReasonValueChange.bind(this)}
      >
      <Picker.Item key="na" label="-" value="na" />
        {items}
      </Picker>
    );
  }

  _showDateTime1Picker = () => this.setState({ isDateTime1PickerVisible: true });

  _hideDateTime1Picker = () => this.setState({ isDateTime1PickerVisible: false });

  _handleDate1Picked = (date) => {
    this.setDate1(date);
    this._hideDateTime1Picker();
  };

  _showDateTime2Picker = () => this.setState({ isDateTime2PickerVisible: true });

  _hideDateTime2Picker = () => this.setState({ isDateTime2PickerVisible: false });

  _handleDate2Picked = (date) => {
    this.setDate2(date);
    this._hideDateTime2Picker();
  };

  _showDateTime3Picker = () => this.setState({ isDateTime3PickerVisible: true });

  _hideDateTime3Picker = () => this.setState({ isDateTime3PickerVisible: false });

  _handleDate3Picked = (date) => {
    this.setDate3(date);
    this._hideDateTime3Picker();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView
            style={styles.container}
            behavior="position"
            enabled
          >
            <View style={styles.box}>
              <View style={styles.boxView}>
                <Text style={styles.question}>PROPERTY *</Text>
                <Container style={styles.pickerContainer}>
                  <Content>{this.renderPropertyPicker()}</Content>
                </Container>
                <Text style={styles.pickerAnswer} pointerEvents="none">
                  {this.state.selectedProperty != null ? this.state.selectedProperty.location_name : ""}
                </Text>
                <Image source={Images.redArrow} style={styles.arrow} />
              </View>
            </View>

            <View style={styles.box}>
              <View style={styles.boxView}>
                <Text style={styles.question}>BUILDING *</Text>
                <Container style={styles.pickerContainer}>
                  <Content>{this.renderBuildingPicker()}</Content>
                </Container>
                <Text style={styles.pickerAnswer} pointerEvents="none">
                  {this.state.selectedBuilding != null ? this.state.selectedBuilding : ""}
                </Text>
                <Image source={Images.redArrow} style={styles.arrow} />
              </View>
            </View>

            <View style={styles.box}>
              <View style={styles.boxView}>
                <Text style={styles.question}>UNIT *</Text>
                <Container style={styles.pickerContainer}>
                  <Content>{this.renderUnitPicker()}</Content>
                </Container>
                <Text style={styles.pickerAnswer} pointerEvents="none">
                  {this.state.selectedUnit != null ? this.state.selectedUnit.unit_name : ""}
                </Text>

                <Image source={Images.redArrow} style={styles.arrow} />
              </View>
            </View>

            <View style={styles.box}>
              <View style={styles.boxView}>
                <Text style={styles.question}>SUPPLIER *</Text>
                <Container style={styles.pickerContainer}>
                  <Content>{this.renderSupplierPicker()}</Content>
                </Container>
                <Text style={styles.pickerAnswer} pointerEvents="none">
                  {this.state.selectedSupplier != null ? this.state.selectedSupplier.supplier_name : ""}
                </Text>
                <Image source={Images.redArrow} style={styles.arrow} />
              </View>
            </View>

            <View style={styles.box}>
              <View style={styles.boxView}>
                <Text style={styles.question}>VACANT?</Text>
                <Text style={styles.switchText}>{this.state.isChecked ? 'YES' : 'NO'}</Text>
                <Container style={styles.pickerContainer}>
                  <Content>
                    <Switch
                      style={styles.switchStyle}
                      onValueChange={value =>
                        this.setState({ isChecked: value })
                      }
                      value={this.state.isChecked}
                    />
                  </Content>
                </Container>
              </View>
            </View>

            <View style={styles.box}>
              <View style={styles.boxView}>
                <Text style={styles.question}>PREFERRED DATE 1 *</Text>
                <Container style={styles.pickerContainer}>
                  <Content style={styles.datePicker}>
                    <TouchableOpacity style={styles.datePicker} onPress={this._showDateTime1Picker}>
                      <Text style={styles.dateAnswer}>{this.state.chosenDate1}</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                      isVisible={this.state.isDateTime1PickerVisible}
                      onConfirm={this._handleDate1Picked}
                      onCancel={this._hideDateTime1Picker}
                      minimumDate={new Date()}
                    />
                  </Content>
                </Container>
                <Image source={Images.redArrow} style={styles.arrow} />
              </View>
            </View>

            <View style={styles.box}>
              <View style={styles.boxView}>
                <Text style={styles.question}>PREFERRED DATE 2 *</Text>
                <Container style={styles.pickerContainer}>
                  <Content style={styles.datePicker}>
                    <TouchableOpacity style={styles.datePicker} onPress={this._showDateTime2Picker}>
                      <Text style={styles.dateAnswer}>{this.state.chosenDate2}</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                      isVisible={this.state.isDateTime2PickerVisible}
                      onConfirm={this._handleDate2Picked}
                      onCancel={this._hideDateTime2Picker}
                      minimumDate={new Date()}
                    />
                  </Content>
                </Container>
                <Image source={Images.redArrow} style={styles.arrow} />
              </View>
            </View>

            <View style={styles.box}>
              <View style={styles.boxView}>
                <Text style={styles.question}>PREFERRED DATE 3</Text>
                <Container style={styles.pickerContainer}>
                  <Content style={styles.datePicker}>
                    <TouchableOpacity style={styles.datePicker} onPress={this._showDateTime3Picker}>
                      <Text style={styles.dateAnswer}>{this.state.chosenDate3}</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                      isVisible={this.state.isDateTime3PickerVisible}
                      onConfirm={this._handleDate3Picked}
                      onCancel={this._hideDateTime3Picker}
                      minimumDate={new Date()}
                    />
                  </Content>
                </Container>
                <Image source={Images.redArrow} style={styles.arrow} />
              </View>
            </View>

            <View style={styles.box}>
              <View style={styles.boxView}>
                <Text style={styles.question}>REPLACEMENT REASON *</Text>
                <Container style={styles.pickerContainer}>
                  <Content>{this.renderReplacementReasonPicker()}</Content>
                </Container>
                <Text style={styles.pickerAnswer} pointerEvents="none">
                  {this.state.selectedReason != null ? this.state.selectedReason : ""}
                </Text>
                <Image source={Images.redArrow} style={styles.arrow} />
              </View>
            </View>

            <View style={styles.emptyBox} />
            <View style={styles.textBox}>
              <TextInput
                style={styles.input}
                value={this.state.value}
                placeholder="ADDITIONAL INFORMATION (IF ANY)"
                onChangeText={text => this.setState({ additionalInfo: text })}
                multiline={true}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.emptyBox} />
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
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
)(PcCreateRequisition);
