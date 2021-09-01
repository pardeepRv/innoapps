import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator} from 'react-navigation'
import IOSIcon from "react-native-vector-icons/Ionicons";
import GrnSettings from '././GrnSettings'
import styles from './Styles/GrnSettingsStackStyle'
import { DrawerActions } from 'react-navigation';

const GrnSettingsStack = StackNavigator({
    GrnSettings: {
        screen: GrnSettings,
        navigationOptions:({navigation}) => ({
            title: "SETTINGS",
            headerLeft:(
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <IOSIcon style={styles.menuButton} name="ios-menu" size={30} />
              </TouchableOpacity>
            )
        })
    }
})

export default GrnSettingsStack;
