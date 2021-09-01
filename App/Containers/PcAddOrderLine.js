import React, {Component} from 'react'
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Alert,
} from 'react-native'
import {connect} from 'react-redux'
import {Container, Content, Picker, DatePicker} from 'native-base'
const Item = Picker.Item
import {Images} from '../Themes'
import DBPCStaticDataHelper from "../DB/DBPCStaticDataHelper"
import Utils from "../Utils/Utils";

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PcAddOrderLineStyle'

class PcAddOrderLine extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "ADD LINE",
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

  _tappedDoneButton = () => {
    if (this.state.selectedAttribute == null) {
      this.showAlertMessage("Please select an attribute.")
    }
    else if (this.state.selectedMaterialType == null) {
      this.showAlertMessage("Please select a material type.")
    }
    else if (this.state.selectedMaterialCategory == null) {
      this.showAlertMessage("Please select a material description.")
    }
    else if (this.state.selectedUsageType == null) {
      this.showAlertMessage("Please select a usage type.")
    }
    else if (isNaN(this.state.selectedQuantity) || this.state.selectedQuantity <= 0) {
      this.showAlertMessage("Please enter a valid quantity.")
    }
    else {
      console.tron.log("Selected Attribute: ", this.state.selectedAttribute)
        this.props.navigation.state.params.returnData(
          this.state.selectedAttribute,
          this.state.selectedMaterialType,
          this.state.selectedMaterialCategory,
          this.state.selectedUsageType,
          this.state.selectedQuantity,
          this.state.index,
        );
        this.props.navigation.pop();
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

  constructor(props) {
    super(props)

    var selectedChangeOrder = props.navigation.state.params.selectedChangeOrder

    this.state = {
      reqHeader: props.navigation.state.params.reqHeader,
      reqLines: props.navigation.state.params.reqLines,
      index: props.navigation.state.params.index,
      attributes: [],
      pickerAttributes:[],
      selectedAttribute: selectedChangeOrder != null ? selectedChangeOrder.attribute : null,
      selectedMaterialType: selectedChangeOrder != null ? selectedChangeOrder.materialType : null,
      selectedMaterialCategory: selectedChangeOrder != null ? selectedChangeOrder.materialCategory : null,
      selectedUsageType: selectedChangeOrder != null ? selectedChangeOrder.usageType : null,
      selectedQuantity: selectedChangeOrder != null ? selectedChangeOrder.quantity : '',

      selectedAttributeValue: "na",
      selectedMaterialTypeValue: "na",
      selectedMaterialCategoryValue: "na",
      selectedUsageTypeValue: "na",

      supplier: null,
      property: null,
      usageTypes: null,
      materials: null,
      bpaDetails:null,
    }

    this.getAttributes()
    this.getUsageTypes()

    if (this.state.selectedMaterialType != null) {
      this.getMaterialType(this.state.supplier, this.state.selectedMaterialType)
    }
  }

  async getAttributes() {

    this.setState ({
      pickerAttributes:[],
    })

    const property = await DBPCStaticDataHelper.getProperty(this.state.reqHeader.location_name);
    const supplier = await DBPCStaticDataHelper.getSupplier(property, this.state.reqHeader.supplier_name);

    var id = parseFloat(this.state.reqHeader.unit_id)
    const unit = await DBPCStaticDataHelper.getUnit(property, this.state.reqHeader.unit_id);

    for (let i = 0; i < this.state.reqLines.length; i++) {
       let line = this.state.reqLines[i];

       this.state.attributes.push({
          attribute_id: line.attribute_id,
          attribute_name: line.attribute_name,
          uom: line.uom
       });
     }

    this.setState({
      property: property,
      supplier: supplier,
    })

   for (let i = 0; i < this.state.reqLines.length; i++) {
      let line = this.state.reqLines[i];
      for (let j = 0; j < this.state.attributes.length; j++) {
        let att = this.state.attributes[j];
          if (att.attribute_id == line.attribute_id ) {
                if (this.checkAttExist(this.state.pickerAttributes, att)) {
                    console.tron.log("Existing Attribute: ",att)
                }else {
                  if (att.attribute_name != "Labor"){
                    this.state.pickerAttributes.push({
                          attribute_id: line.attribute_id,
                          attribute_name: line.attribute_name,
                            uom: line.uom
                      });
                  }

                }
          }else {
          //do nothing
        }
      }
    }

    this.setState ({
      attributes: this.state.pickerAttributes,
    })

    if (this.state.pickerAttributes.length == 1) {
      this.setState({
        selectedAttribute: this.state.pickerAttributes[0]
      })
    }

  }

  checkAttExist(pickerAttributes, att) {
    for (var i = 0; i < pickerAttributes.length; i++) {
      if (pickerAttributes[i].attribute_id == att.attribute_id) {
          return true;
      }
    }
    return false;
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

/*  async getCategories(materialType) {

    const categories = await DBPCStaticDataHelper.getCategories(materialType);
    this.setState({
      materials: categories
    })

    if (categories.length == 1) {
      this.setState({
        selectedMaterial: categories[0]
      })
    }
  }*/

  async getMaterialType(supplier,selectedType) {
    const dbBpaDetails = await DBPCStaticDataHelper.getBpaDetails(supplier, selectedType.type);

    this.setState({
      bpaDetails: dbBpaDetails
    })

  }

  renderAttributePicker() {
    let items = this.state.attributes.map((item, i) => (
      <Picker.Item key={i} label={item.attribute_name} value={i} />
    ));
    return (
      <Picker
        style={styles.picker}
        textStyle={styles.answer}
        mode="dropdown"
        selectedValue={this.state.selectedAttributeValue}
        onValueChange={this.onAttributeValueChange.bind(this)}
      >
      <Picker.Item key="na" label="-" value="na" />
        {items}
      </Picker>
    );
  }

  renderMaterialTypePicker() {
    var items = []
    if (this.state.supplier != null) {
    items = this.state.supplier.material_category.map((item, i) => (
      <Picker.Item key={i} label={item.type} value={i} />
    ));
  }
    return (
      <Picker
        style={styles.picker}
        textStyle={styles.answer}
        mode="dropdown"
        selectedValue={this.selectedMaterialTypeValue}
        onValueChange={this.onTypeValueChange.bind(this)}
      >
      <Picker.Item key="na" label="-" value="na" />
        {items}
      </Picker>
    );
  }

  renderMaterialCategoryPicker() {
    var items = []
    if (this.state.bpaDetails != null) {
    items = this.state.bpaDetails.map((item, i) => (
      <Picker.Item key={i} label={item.item_description} value={i} />
    ));
  }
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

  onAttributeValueChange(value: string) {
    const selectedAttribute = this.state.attributes[value]
    this.setState({selectedAttribute: selectedAttribute});
  }

  onTypeValueChange(value : string) {
    const selectedType = this.state.supplier.material_category[value]
    this.setState({
      selectedMaterialType: selectedType,
      selectedMaterialCategory: null,
    });

  /*  this.getCategories(selectedType)*/
    this.getMaterialType(this.state.supplier,selectedType)
  }
  onMaterialValueChange(value : string) {
    const selectedMaterialCategory = this.state.bpaDetails[value]
    this.setState({selectedMaterialCategory: selectedMaterialCategory});
  }
  onUsageValueChange(value : string) {
    const selectedUsageType = this.state.usageTypes[value]
    this.setState({selectedUsageType: selectedUsageType});
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView style={styles.container}behavior="position"enabled>

          <View style={styles.box}>
            <View style={styles.boxView}>
              <Text style={styles.question}>ATTRIBUTE NAME *</Text>
              <Container style={styles.pickerContainer}>
                <Content>{this.renderAttributePicker()}</Content>
              </Container>
              <Text style={styles.pickerAnswer} pointerEvents="none">
                {this.state.selectedAttribute != null ? this.state.selectedAttribute.attribute_name : ""}
              </Text>
              <Image source={Images.redArrow} style={styles.arrow} />
            </View>
          </View>

          <View style={styles.box}>
            <View style={styles.boxView}>
              <Text style={styles.question}>MATERIAL TYPE *</Text>
              <Container style={styles.pickerContainer}>
                <Content>{this.renderMaterialTypePicker()}</Content>
              </Container>
              <Text style={styles.pickerAnswer} pointerEvents="none">
                {this.state.selectedMaterialType != null ? this.state.selectedMaterialType.type : ""}
              </Text>
              <Image source={Images.redArrow} style={styles.arrow} />
            </View>
          </View>

          <View style={styles.box}>
            <View style={styles.boxView}>
              <Text style={styles.question}>MATERIAL DESC *</Text>
              <Container style={styles.pickerContainer}>
                <Content>{this.renderMaterialCategoryPicker()}</Content>
              </Container>
              <Text style={styles.pickerAnswer} pointerEvents="none">
                {this.state.selectedMaterialCategory != null ? this.state.selectedMaterialCategory.item_description : ""}
              </Text>
              <Image source={Images.redArrow} style={styles.arrow} />
            </View>
          </View>

          <View style={styles.box}>
            <View style={styles.boxView}>
              <Text style={styles.question}>USAGE TYPE *</Text>
              <Container style={styles.pickerContainer}>
                <Content>{this.renderUsageTypePicker()}</Content>
              </Container>
              <Text style={styles.pickerAnswer} pointerEvents="none">
                {this.state.selectedUsageType != null ? this.state.selectedUsageType.type : ""}
              </Text>
              <Image source={Images.redArrow} style={styles.arrow} />
            </View>
          </View>

            <View style={styles.box}>
              <View style={styles.boxView}>
                <Text style={styles.question}>QUANTITY *</Text>
                <TextInput
                  style={styles.quantityInput}
                  maxLength={4}
                  placeholder="0.0"
                  keyboardType="numeric"
                  onChangeText={text => this.setState({
                    selectedQuantity : text
                  })}
                  value={this.state.selectedQuantity}
                />
              </View>
            </View>

            <View style={styles.box}>
              <View style={styles.boxView}>
                <Text style={styles.question}>UOM</Text>
                <Text style={styles.infoText}>{this.state.selectedMaterialCategory != null ? Utils.calculateUOM(this.state.selectedMaterialCategory.uom) : ''}</Text>
              </View>
            </View>
            <View style={styles.box}>
              <View style={styles.boxView}>
                <Text style={styles.question}>UNIT COST</Text>
                <Text style={styles.infoText}>{this.state.selectedMaterialCategory != null ? this.state.selectedMaterialCategory.unit_cost : ''}</Text>
              </View>
            </View>
            <View style={styles.box}>
              <View style={styles.boxView}>
                <Text style={styles.question}>CURRENCY CODE</Text>
                <Text style={styles.infoText}>{this.state.selectedMaterialCategory != null ? this.state.selectedMaterialCategory.currency_code : ''}</Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PcAddOrderLine)
