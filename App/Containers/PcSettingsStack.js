import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator} from 'react-navigation'
import IOSIcon from "react-native-vector-icons/Ionicons";
import Settings from '././PcSettings'
import styles from './Styles/PcSettingsStackStyle'
import { DrawerActions } from 'react-navigation';

const PcSettingsStack = StackNavigator({
    Settings: {
        screen: Settings,
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

export default PcSettingsStack;
