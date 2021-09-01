import { AsyncStorage } from "react-native"

let Utils = {

  // MARK: AsyncStorage
  async storeDataToAsyncStorage(key, data) {
    console.tron.log('AsyncStorage: Hit store data')
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      // Error saving data
      console.tron.log('AsyncStorage: error saving data')
    }
    return
  },

  async retrieveDataFromAsyncStorage(key) {
    console.tron.log('AsyncStorage: Hit retrieve data')

    try {
      const value = await this.retrieveItem(key)
      console.tron.log('AsyncStorage: ok ', value)

      // Hard code to return small caps if this is for username
      if (key == 'USER_NAME') {
        return value.toUpperCase()
      } else {
        return value
      }
    } catch (error) {
      console.tron.log('AsyncStorage: error retrieving data ' + error)
    }
    return
  },

  async removeItemValue(key) {
    console.tron.log('AsyncStorage: Hit remove data')
   try {
     await AsyncStorage.removeItem(key);
     return true;
   }
   catch(exception) {
       console.tron.log('AsyncStorage: error removing data' + exception)
     return false;
   }
 },

  async retrieveItem(key) {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.tron.log(error.message);
    }
    return
  },

  guid: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
    },

  roundN: function(num, n) {
    return parseFloat(Math.round(num * Math.pow(10, n)) /Math.pow(10,n)).toFixed(n);
  },

  calculateQuantity: function(amount, uom) {

    console.tron.log('Calculate Quantity UOM', uom)
    if (uom == 'EA' || uom == 'LF') {
      amount = 1
    }
    else if (uom == 'SQFT') {
      amount = amount / 9.0
    }

    return Utils.roundN(amount, 3);
  },

  calculateUOM: function(uom) {

    if (uom == 'SQFT') {
      uom = 'SQYD'
    }

    return uom;
  },

  calculateUnitCost: function(unitCost, uom) {
    return Utils.roundN(unitCost, 2);
  },

  calculateTotal: function(amount, unitCost, uom) {

    amount = Utils.calculateQuantity(amount, uom)
    unitCost = Utils.calculateUnitCost(unitCost, uom)

    var num = amount * unitCost

    return Utils.roundN(num, 2);
  },

  calculateTotalNoRound: function(amount, unitCost, uom) {

    amount = Utils.calculateQuantity(amount, uom)
    unitCost = Utils.calculateUnitCost(unitCost, uom)

    var num = amount * unitCost
    return num;
  },

  removeImage(uri) {


  }

};

module.exports = Utils;
