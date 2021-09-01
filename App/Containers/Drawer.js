import React, {Component} from 'react';
import {DrawerNavigator} from 'react-navigation';
import GrnTab from './GrnTab';
import PcTab from './PcTab';

const drawernav = DrawerNavigator({
  DrawerItem1: {
    screen: GrnTab,
    navigationOptions: {
      drawerLabel: "Good Receipts Notice"
    }
  },
  /* DrawerItem2: {
    screen: PcTab,
    navigationOptions: {
      drawerLabel: "Flooring Requisitions"
    }
  } */
}, {
  contentOptions: {
    activeTintColor: 'red',
    activeBackgroundColor: 'transparent',
    inactiveTintColor: 'black',
    inactiveBackgroundColor: 'transparent'
  }
});

export default drawernav;
