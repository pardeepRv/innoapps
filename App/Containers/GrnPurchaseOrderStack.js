import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { StackNavigator} from 'react-navigation'
import IOSIcon from "react-native-vector-icons/Ionicons";
import GrnPurchaseOrder from '././GrnPurchaseOrder'
import GrnPurchaseOrderDetails from '././GrnPurchaseOrderDetails'
import GrnReceiptDetails from '././GrnReceiptDetails'
import styles from './Styles/GrnPurchaseOrderStackStyle'
import { DrawerActions } from 'react-navigation';

const GrnPurchaseOrderStack = StackNavigator({
    GrnPurchaseOrder: {
        screen: GrnPurchaseOrder,
        navigationOptions:({navigation}) => ({
            title: "ORDERS",
            headerLeft:(
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <IOSIcon style={styles.menuButton} name="ios-menu" size={30} />
              </TouchableOpacity>
            ),
        })
    },
    GrnPurchaseOrderDetails: {
        screen: GrnPurchaseOrderDetails,
      
    },
    GrnReceiptDetails: {
        screen: GrnReceiptDetails,
    }
})

export default GrnPurchaseOrderStack;
