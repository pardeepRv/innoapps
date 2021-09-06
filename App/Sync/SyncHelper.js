import { AsyncStorage } from "react-native";
import DB from "../DB/DB";
import Utils from "../Utils/Utils";
import API from "../Services/Api";
import FJSON from "format-json";
import DBPCHelper from "../DB/DBPCHelper";
import DBGrnPurchaseOrderDataHelper from "../DB/DBGrnPurchaseOrderDataHelper";

let SyncHelper = {
  async getAPIReqHeaderLines() {
    const api = API.create();

    const username = await Utils.retrieveDataFromAsyncStorage("USER_NAME");
    const response = await api.getReqHeaderLines(username);
    const reqHeaderLines = response.data.items;
    console.tron.log("Req header lines: ", reqHeaderLines);

    // Save to DB
    await DBPCHelper.saveReqHeaderLines(reqHeaderLines);
  },

  async getPurchaseOrderApi(envUrl) {
      console.log(envUrl, "envUrl in Synchelper>>>>>>>>");
    try {
      const api = API.create(envUrl);

      const username = await Utils.retrieveDataFromAsyncStorage("USER_NAME");
      const response = await api.getPurchaseOrders(username);

      console.log("response in etting PurchaseOrders: ", response);

      const purchaseOrders = response.data.items;
      console.log("PurchaseOrders: ", purchaseOrders);

      // Save to DB
      await DBGrnPurchaseOrderDataHelper.savePurchaseOrders(purchaseOrders);
    } catch (error) {
      console.log("consoling here>>>>>>.", error);
    }
  },
};

module.exports = SyncHelper;
