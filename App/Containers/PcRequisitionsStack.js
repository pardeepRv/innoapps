import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {StackNavigator} from 'react-navigation'
import IOSIcon from "react-native-vector-icons/Ionicons";
import Requisitions from '././RequisitionList'
import CreateRequisition from '././PcCreateRequisition'
import SelectArea from '././PcSelectArea'
import Summary from '././PcRequisitionsSummary'
import ViewRequisition from '././PcViewRequisition'
import Change from '././PcCreateChangeOrder'
import AddLine from '././PcAddOrderLine'
import EditAttribute from '././PcEditAttribute'
import styles from './Styles/PcRequisitionsStackStyle'
import { DrawerActions } from 'react-navigation';

const PcRequisitionsStack = StackNavigator({
  Requisitions: {
    screen: Requisitions,
    navigationOptions: ({navigation}) => ({
      title: "REQUISITIONS",
      headerLeft: (<TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <IOSIcon style={styles.menuButton} name="ios-menu" size={30}/>
      </TouchableOpacity>),
      headerRight: (<TouchableOpacity onPress={() => navigation.push("CreateRequisition")}>
        <IOSIcon style={styles.menuButton} name="ios-add" size={30}/>
      </TouchableOpacity>)
    })
  },
  CreateRequisition: {
    screen: CreateRequisition,
  },
  SelectArea: {
    screen: SelectArea,
  },
  EditAttribute: {
    screen: EditAttribute,
  },
  Summary: {
    screen: Summary,
  },
  ViewRequisition: {
    screen: ViewRequisition,

  },
  Change: {
    screen: Change,
  },
  AddLine: {
    screen: AddLine,
  }
})

export default PcRequisitionsStack;
