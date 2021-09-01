import React, { Component } from 'react';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import GrnHomeStack from './GrnHomeStack';
import GrnPurchaseOrderStack from './GrnPurchaseOrderStack';
import GrnReceiptsStack from './GrnReceiptsStack';
import GrnSettingsStack from './GrnSettingsStack';
import { Images } from '../Themes'

const GrnTab = createBottomTabNavigator({
  GrnHomeStack: {
    screen: GrnHomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (<Image source={Images.home} style={{
          height: 24,
          width: 24,
          tintColor: tintColor
        }}/>)
    }
  },
  GrnPurchaseOrderStack: {
    screen: GrnPurchaseOrderStack,
    navigationOptions: {
      tabBarLabel: 'Orders',
      tabBarIcon: ({tintColor}) => (<Image source={Images.receipt} style={{
          height: 24,
          width: 24,
          tintColor: tintColor
        }}/>)
    }
  },
  GrnReceiptsStack: {
    screen: GrnReceiptsStack,
    navigationOptions: {
      tabBarLabel: 'Receipts',
      tabBarIcon: ({tintColor}) => (<Image source={Images.receipt} style={{
          height: 24,
          width: 24,
          tintColor: tintColor
        }}/>)
    }
  },

    GrnSettingsStack: {
        screen: GrnSettingsStack,
        navigationOptions: {
            tabBarLabel:"Settings",
            tabBarIcon: ({tintColor}) => (<Image source={Images.setting} style={{
                height: 24,
                width: 24,
                tintColor: tintColor
              }}/>)        }
    }

    ///... add more tabs here

}, {
    initialRouteName: 'GrnPurchaseOrderStack',
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
});

export default GrnTab;
