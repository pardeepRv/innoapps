import React, {Component} from 'react'
import {SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, Alert} from 'react-native'
import {connect} from 'react-redux'
import {Images, Colors} from '../Themes'
import {Container, Content, Picker} from 'native-base'
import CheckBox from 'react-native-modest-checkbox'
import DBPCStaticDataHelper from "../DB/DBPCStaticDataHelper"
import DBPCRequisitionHelper from "../DB/DBPCRequisitionHelper"
import DB from "../DB/DB";
import Utils from "../Utils/Utils";

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PcEditAttributeStyle'

const Item = Picker.Item;
let selectedType = null;

class PcEditAttribute extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "EDIT AREA",
      headerTintColor: 'red',
      headerTitleStyle: { color: 'black' },
      headerRight: (<TouchableOpacity onPress={navigation.getParam('tappedDoneButton')}>
        <Text style={styles.menuButton}>DONE</Text>
      </TouchableOpacity>)
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ tappedDoneButton: this._tappedDoneButton });
  }

  constructor(props) {
    super(props);

    this.state = {
      isPad: props.navigation.state.params.entityAttribute.pad,
      isThreshold: props.navigation.state.params.entityAttribute.threshold,
      isPetTreatment: props.navigation.state.params.entityAttribute.petTreatment,

      selectedMaterial: null,
      selectedUsage: null,

      supplier: props.navigation.state.params.supplier,
      entityAttribute: props.navigation.state.params.entityAttribute,
      index: props.navigation.state.params.index,

      materials: [],
      usageTypes: [],

    }
    console.tron.log("PcEditAttribute Data transfered: ", this.state)
    this.initState()
    this.getUsageTypes()
  }

  _tappedDoneButton = () => {
    if (this.state.selectedMaterial == null && this.state.materials.length > 0) {
      this.showAlertMessage("Please select material description.")
    }
    else if (this.state.selectedUsage == null) {
      this.showAlertMessage("Please select usage type.")
    }
    else {

      if (this.state.selectedMaterial == null && this.state.materials.length == 0) {
        this.props.navigation.state.params.returnData(this.selectedType.type, "", 0.0, "", 0.0,
        this.state.selectedUsage.type, this.state.isPad, this.state.isThreshold, this.state.isPetTreatment, this.state.index);
        this.props.navigation.pop();
      }
      else {
        //return / delegate to the previos screen
        this.props.navigation.state.params.returnData(
        this.selectedType.type, this.state.selectedMaterial.item_description, this.state.selectedMaterial.bpa_line_id,
        this.state.selectedMaterial.currency_code, this.state.selectedMaterial.unit_cost,
        this.state.selectedUsage.type, this.state.isPad, this.state.isThreshold, this.state.isPetTreatment, this.state.index);
        this.props.navigation.pop();
      }
    }
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
  }

  initState() {
    const materialCat = this.state.supplier.material_category
    let index = materialCat.findIndex(el => el.type === this.state.entityAttribute.type)
    this.selectedType = materialCat[index]
    this.getCategories(materialCat[index])
  }

  async getUsageTypes() {
    const usageTypes = await DBPCStaticDataHelper.getUsageTypes();
    this.setState({
      usageTypes: usageTypes,
      selectedUsage: usageTypes[0]
    })

    if (this.state.entityAttribute.usageType != "") {
      const usageTypeArr = usageTypes
      let index = usageTypeArr.findIndex(el => el.type === this.state.entityAttribute.usageType)
      this.setState({selectedUsage: usageTypeArr[index]})
    }
  }

  async getCategories(materialType) {
    const categories = await DBPCStaticDataHelper.getCategories(materialType);
    this.setState({
      materials: categories
    })

    if (this.state.entityAttribute.material.length > 0) {
      if (this.state.entityAttribute.material[0].item_description != "") {
        const materialArr = categories
        let index = materialArr.findIndex(el => el.item_description === this.state.entityAttribute.material[0].item_description)
        this.setState({selectedMaterial: materialArr[index]})
      }
    }
  }

  onTypeValueChange(value : string) {
    const selectedType = this.state.supplier.material_category[value]
    this.selectedType = selectedType
    this.setState({selectedMaterial: null});
    this.getCategories(selectedType)
console.tron.log("Selected 1: ", this.selectedType);
    if (selectedType.type != "CARPET") {
      this.setState({isPad: false})
    }

  }
  onMaterialValueChange(value : string) {
    const selectedMaterialCategory = this.state.materials[value]
    this.setState({selectedMaterial: selectedMaterialCategory});
  }
  onUsageValueChange(value : string) {
    const selectedUsageType = this.state.usageTypes[value]
    this.setState({selectedUsage: selectedUsageType});
  }

  renderMaterialTypePicker() {
    let items = this.state.supplier.material_category.map((item, i) => (
      <Picker.Item key={i} label={item.type} value={i} />
    ));
    return (
      <Picker
        style={styles.picker}
        textStyle={styles.answer}
        mode="dropdown"
        selectedValue={this.selectedTypeValue}
        onValueChange={this.onTypeValueChange.bind(this)}
      >
      <Picker.Item key="na" label="-" value="na" />
        {items}
      </Picker>
    );
  }

  renderMaterialCategoryPicker() {
    let items = this.state.materials.map((item, i) => (
      <Picker.Item key={i} label={item.item_description} value={i} />
    ));
    return (
      <Picker
        style={styles.picker}
        textStyle={styles.answer}
        mode="dropdown"
        selectedValue={this.state.selectedMaterialValue}
        onValueChange={this.onMaterialValueChange.bind(this)}
      >
      <Picker.Item key="na" label="-" value="na" />
        {items}
      </Picker>
    );
  }

  renderUsageTypePicker() {
    let items = this.state.usageTypes.map((item, i) => (
      <Picker.Item key={i} label={item.type} value={i} />
    ));
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

  render() {

    let padCheckbox;
    if (this.selectedType.type == 'CARPET') {
      padCheckbox =
      <View style={styles.selection}>
        <Text style={styles.infoText}>
          PAD
        </Text>
        <View style={styles.inside}>
        <CheckBox
          checkboxStyle={styles.checkbox}
          onChange={(checked) => this.setState({
                                 isPad:!this.state.isPad
                             })}
          checked ={this.state.isPad}
          labelBefore = {false}
          label=''
          />
          </View>
      </View>

    }
    else {
      padCheckbox =
      <View style={styles.selection}>
        <Text style={styles.infoTextDisabled}>
          PAD
        </Text>
        <View style={styles.inside}>
        <CheckBox
          checkboxStyle={styles.checkboxDisabled}
          checked ={this.state.isPad}
          labelBefore = {false}
          label=''
          />
          </View>
      </View>

    }

    return (<SafeAreaView style={styles.container}>

      <View style={styles.infoContainer}>

        <View style={styles.info}>
          <Text style={styles.infoText}>
            Name
          </Text>
          <Text style={styles.infoText}>
            {this.state.entityAttribute.name}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoText}>
            UOM
          </Text>
          <Text style={styles.infoText}>
            {Utils.calculateUOM(this.state.entityAttribute.uom)}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoText}>
            Net Quantity
          </Text>
          <Text style={styles.infoText}>
            {Utils.calculateQuantity(this.state.entityAttribute.net_quantity, this.state.entityAttribute.uom)}
          </Text>
        </View>

      </View>

      <View style={styles.selectionContainer}>

        <View style={styles.line}/>

        <View style={styles.selection}>
          <Container style={styles.pickerContainer}>
            <Content>
              <Content>{this.renderMaterialTypePicker()}</Content>
            </Content>
          </Container>
          <Text style={styles.infoText}>
            TYPE
          </Text>
          <View style={styles.inside}>
            <Text style = {styles.pickerAnswer} pointerEvents="none">{this.selectedType != null ? this.selectedType.type : "" ||
          this.state.entityAttribute != null ? this.state.entityAttribute.type : "" }</Text>
            <Image source={Images.redDownArrow} style={styles.arrow}/>
          </View>
        </View>

        <View style={styles.line}/>
        <View style={styles.selection}>
          <Container style={styles.pickerContainer}>
            <Content>
            <Content>{this.renderMaterialCategoryPicker()}</Content>
            </Content>
          </Container>
          <Text style={styles.infoText}>
            MATERIAL DESC. *
          </Text>
          <View style={styles.inside}>
            <Text style = {styles.pickerAnswer} pointerEvents="none">{this.state.selectedMaterial != null ? this.state.selectedMaterial.item_description : ""}</Text>
            <Image source={Images.redDownArrow} style={styles.arrow}/>
          </View>
        </View>

        <View style={styles.line}/>
        <View style={styles.selection}>
          <Container style={styles.pickerContainer}>
            <Content>
              <Content>{this.renderUsageTypePicker()}</Content>
            </Content>
          </Container>
          <Text style={styles.infoText}>
            USAGE TYPE *
          </Text>
          <View style={styles.inside}>
            <Text style = {styles.pickerAnswer} pointerEvents="none">{this.state.selectedUsage != null ? this.state.selectedUsage.type : ""}</Text>
            <Image source={Images.redDownArrow} style={styles.arrow}/>
          </View>
        </View>

        <View style={styles.line}/>
        {padCheckbox}

        <View style={styles.line}/>
        <View style={styles.selection}>
          <Text style={styles.infoText}>
            THRESHOLD
          </Text>
          <View style={styles.inside}>
            <CheckBox
              checkboxStyle={styles.checkbox}
              onChange={(checked) =>
                 this.setState({ isThreshold:!this.state.isThreshold})}
              checked ={this.state.isThreshold}
              labelBefore = {false}
              label=''
              />
          </View>
        </View>
        <View style={styles.line}/>

        <View style={styles.selection}>
          <Text style={styles.infoText}>
            PET TREATMENT
          </Text>
          <View style={styles.inside}>
            <CheckBox
              checkboxStyle={styles.checkbox}
              onChange={(checked) => this.setState({
                                     isPetTreatment:!this.state.isPetTreatment
                                 })}
              checked ={this.state.isPetTreatment}
              labelBefore = {false}
              label=''
              />
          </View>
        </View>
        <View style={styles.line}/>
      </View>
    </SafeAreaView>)
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PcEditAttribute)
