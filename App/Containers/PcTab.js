import React, { Component } from 'react';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import PcHomeStack from './PcHomeStack';
import PcRequisitions from '././PcRequisitionsStack'
import PcSettingsStack from '././PcSettingsStack'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PcTabStyle'

const PcTab = createBottomTabNavigator({

    PcHomeStack: {
        screen: PcHomeStack,
        navigationOptions: {
            tabBarLabel:"Home",
            tabBarIcon: ({tintColor}) => (<Image source={Images.home} style={{
                height: 24,
                width: 24,
                tintColor: tintColor
              }}/>)
             }
    },

      PcRequisitionsStack: {
          screen: PcRequisitions,
          navigationOptions: {
              tabBarLabel:"Requisitions",

              tabBarIcon: ({tintColor}) => (<Image source={Images.receipt} style={{
                  height: 24,
                  width: 24,
                  tintColor: tintColor
                }}/>)
               }
      },

        PcSettingsStack: {
            screen: PcSettingsStack,
            navigationOptions: {
                tabBarLabel:"Settings",
                tabBarIcon: ({tintColor}) => (<Image source={Images.setting} style={{
                    height: 24,
                    width: 24,
                    tintColor: tintColor
                  }}/>)
                 }
        }


    ///... add more tabs here

}, {
    initialRouteName: 'PcRequisitionsStack',
    lazy:false,
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

export default PcTab;
