import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { StackNavigator} from 'react-navigation'
import IOSIcon from "react-native-vector-icons/Ionicons";
import GrnReceipts from '././GrnReceipts'
import GrnEditReceipt from '././GrnEditReceipt'
import GrnChangeReceipt from '././GrnChangeReceipt'
import GrnRejectReceipt from '././GrnRejectReceipt'
import styles from './Styles/GrnReceiptsStackStyle'
import { DrawerActions } from 'react-navigation';

const GrnReceiptsStack = StackNavigator({
    GrnReceipts: {
        screen: GrnReceipts,
        navigationOptions:({navigation}) => ({
            title: "MANAGE RECEIPTS",
            headerLeft:(
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <IOSIcon style={styles.menuButton} name="ios-menu" size={30} />
              </TouchableOpacity>
            )
        })
    },
    GrnEditReceipt: {
        screen: GrnEditReceipt,
        navigationOptions:({navigation}) => ({
            title: "RECEIPT",
            headerTintColor: 'red',
            headerTitleStyle: { color: 'black' },
        })
    },
    GrnChangeReceipt: {
        screen: GrnChangeReceipt,
    },
    GrnRejectReceipt: {
        screen: GrnRejectReceipt,
    }
})

export default GrnReceiptsStack;
