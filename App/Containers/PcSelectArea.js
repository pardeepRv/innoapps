import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  AppRegistry,
  FlatList,
  TouchableHighlight,
  Alert
} from 'react-native';

import ExpandableList from 'react-native-expandable-section-flatlist';
import CheckBox from 'react-native-modest-checkbox'
import {connect} from 'react-redux'
import MockData from './Constant/mockData';
import {Images} from '../Themes'
import EditAttribute from '././PcEditAttribute'
import {StackNavigator} from 'react-navigation'
import DB from "../DB/DB";
import Utils from "../Utils/Utils";

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PcSelectAreaStyle'

class PcSelectArea extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "SELECT AREA",
      headerTintColor: 'red',
      headerTitleStyle: { color: 'black' },
      headerRight: (<TouchableOpacity onPress={navigation.getParam('tappedNextButton')}>
        <Text style={styles.menuButton} >NEXT</Text>
      </TouchableOpacity>)
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ tappedNextButton: this._tappedNextButton });
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedProperty: props.navigation.state.params.selectedProperty,
      selectedUnit: props.navigation.state.params.selectedUnit,
      selectedSupplier: props.navigation.state.params.selectedSupplier,
      selectedReason: props.navigation.state.params.selectedReason,
      chosenDate1: props.navigation.state.params.chosenDate1,
      chosenDate2: props.navigation.state.params.chosenDate2,
      chosenDate3: props.navigation.state.params.chosenDate3,
      isChecked: props.navigation.state.params.isChecked,
      additionalInfo: props.navigation.state.params.additionalInfo,
      entityAttributes: props.navigation.state.params.selectedUnit.entity_attributes,
    };
    console.tron.log("PcSelectArea Data transfered: ", this.state)
    console.tron.log("PRINT Attributes: ", this.state.entityAttributes)
  }

  _tappedNextButton = () => {

    let selectedEntityAttributes = []
    this.state.entityAttributes.map( (each) => {
      if (each.selected) {
        selectedEntityAttributes = [...selectedEntityAttributes, each]
      }
    })

    if (selectedEntityAttributes.length > 0) {
      this.props.navigation.navigate("Summary", {
        selectedProperty: this.state.selectedProperty,
        selectedUnit: this.state.selectedUnit,
        selectedSupplier: this.state.selectedSupplier,
        selectedReason: this.state.selectedReason,
        chosenDate1: this.state.chosenDate1,
        chosenDate2: this.state.chosenDate2,
        chosenDate3: this.state.chosenDate3,
        isChecked: this.state.isChecked,
        additionalInfo: this.state.additionalInfo,
        selectedEntityAttributes: selectedEntityAttributes,
      })
    }
    else {
      this.showAlertMessage("Please select at least one area.")
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

  returnData(type, item_description, bpa_line_id, currency_code, unit_cost, usageType, isPad, isThreshold, isPetTreatment, index) {
    let newArr = [...this.state.entityAttributes]
    let materialArr = [...newArr[index].material]

    newArr[index] = {...newArr[index],
      type: type,
      material: materialArr,
      usageType: usageType,
      isUpdated: true,
      pad: isPad,
      threshold: isThreshold,
      petTreatment: isPetTreatment,
      selected: true}

    materialArr[0] = {...materialArr[0],
      item_description: item_description, bpa_line_id: bpa_line_id,
      currency_code: currency_code, unit_cost: unit_cost}

    this.setState({entityAttributes: newArr})
  }

  onChangeCheckbox(selected, index) {
    console.tron.log('Pc Select Area State', this.state);
    console.tron.log('Selected', selected);

    let newArr = [...this.state.entityAttributes]
    newArr[index] = {...newArr[index], selected: selected.checked}
    this.setState({entityAttributes: newArr})
    console.tron.log('Pc Select Area State', this.state);
  }

  renderRow = ({item, index}) => {
    if (!item.isUpdated) {

      return (<TouchableHighlight onPress={() => this.props.navigation.navigate('EditAttribute', {
        supplier: this.state.selectedSupplier,
        entityAttribute: item,
        index: index,
        returnData: this.returnData.bind(this)
      })}>
        <View style={styles.header}>
          <CheckBox
            checkboxStyle={styles.checkboxDisabled}
            checked ={item.selected}
            label={item.name}
            labelStyle={styles.headerText}
            />
          <Text style={styles.headerAnsText}>
            {Utils.calculateQuantity(item.net_quantity, item.uom)} {Utils.calculateUOM(item.uom)}
          </Text>
          <Image source={Images.redArrow} style={styles.arrow}/>
        </View>
      </TouchableHighlight>);

    } else {

      let padText, thresholdText, petTreatmentText;

      if (item.pad) {
        padText = <Text style={styles.childText}>YES</Text>
      }
      else {
        padText = <Text style={styles.childText}>NO</Text>
      }

      if (item.threshold) {
        thresholdText = <Text style={styles.childText}>YES</Text>
      }
      else {
        thresholdText = <Text style={styles.childText}>NO</Text>
      }

      if (item.petTreatment) {
        petTreatmentText = <Text style={styles.childText}>YES</Text>
      }
      else {
        petTreatmentText = <Text style={styles.childText}>NO</Text>
      }


      return (<TouchableHighlight onPress={() => this.props.navigation.navigate('EditAttribute', {
        supplier: this.state.selectedSupplier,
        entityAttribute: item,
        index: index,

        returnData: this.returnData.bind(this)
      })}>
        <View>

          <View style={styles.header}>
            <CheckBox
              checkboxStyle={styles.checkbox}
              onChange={(checked) => this.onChangeCheckbox(checked, index)}
              checked={item.selected}
              label={item.name}
              labelStyle={styles.headerText}
              />
            <Text style={styles.headerAnsText}>
              {Utils.calculateQuantity(item.net_quantity, item.uom)} {Utils.calculateUOM(item.uom)}
            </Text>
            <Image source={Images.redArrow} style={styles.arrow}/>
          </View>

          <View style={styles.child}>
            <Text style={styles.childText}>
              Type
            </Text>
            <Text style={styles.childText}>
              {item.type}
            </Text>
          </View>

          <View style={styles.child}>
            <Text style={styles.childText}>
              MATERIAL DESC.
            </Text>
            <Text style={styles.childText}>
              {item.material[0].item_description}
            </Text>
          </View>

          <View style={styles.child}>
            <Text style={styles.childText}>
              USAGE TYPE
            </Text>
            <Text style={styles.childText}>
              {item.usageType}
            </Text>
          </View>

          <View style={styles.child}>
            <Text style={styles.childText}>
              PAD
            </Text>
            {padText}

          </View>

          <View style={styles.child}>
            <Text style={styles.childText}>
              THRESHOLD
            </Text>
            {thresholdText}
          </View>

          <View style={styles.child}>
            <Text style={styles.childText}>
              PET TREATMENT
            </Text>
            {petTreatmentText}
          </View>

        </View>
      </TouchableHighlight>)
    };
  }

  keyExtractor = (item, index) => index

  oneScreensWorth = 20

  render() {
    return (<View style={styles.container}>

      <Text style={styles.titleStyle}>
        ATTRIBUTE AND CATEGORIES
      </Text>
      <View style={styles.line}/>
      <FlatList
      contentContainerStyle={styles.listContent}
      data={this.state.entityAttributes}
      renderItem={this.renderRow}
      keyExtractor={this.keyExtractor}
      initialNumToRender={this.oneScreensWorth}
      ListHeaderComponent={this.renderHeader}
      ListFooterComponent={this.renderFooter}
      ListEmptyComponent={this.renderEmpty}
      ItemSeparatorComponent={this.renderSeparator}/>
    </View>)
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PcSelectArea)
