// a library to wrap and simplify api calls
import Config from "react-native-config";
import apisauce from "apisauce";
import Utils from "../Utils/Utils";
//import NewEnv from "../Containers/Login";
//import {envparam} from '../Containers/Login';

// our "constructor"
const create = (
  //newURL = "",
  // baseURL = "https://pdev2a1-inoapps4.inoapps.com/ords/inoapps_ec/",

  baseURL = Config.BASE_URL, //commented by pardeep

  // newURL = baseURL,
// baseURL = Environment.envURL,
// baseURL = Utils.retrieveDataFromAsyncStorage("ENVIRONMENT"),

) => {


  console.warn(baseURL, "baseURLbaseURL>>>>>");


  console.tron.log(baseURL, "THE BAD ONE!!!");
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      "Cache-Control": "no-cache"
    },
    // 10 second timeout...
    timeout: 30000,
  });
  console.tron.log(baseURL, "THE BAD ONE!!! AGAIN.......");
  /*const envFile = require('../Containers/Login');
  console.tron.log("Environment Variable (API) ", envFile.envparam);*/
  /*const {envparam} = require('../Containers/Login')
  console.tron.log("Environment Variable (API) ", envparam);*/

 /* const environment = Utils.retrieveDataFromAsyncStorage("ENVIRONMENT");
  console.tron.log("Environment Variable (API) ", environment);
  envURL = "";
  if (environment == 'SKAD3')
  {
    envURL = "https://skad3a1-skanskapaas.inoappsproducts.com/ords/inoapps_ec/"
    console.tron.log("New ENV URL ", envURL);
  }*/

  /*const environment = await Utils.retrieveDataFromAsyncStorage("ENVIRONMENT");
    console.tron.log("Environment Variable (API) ", environment);
    envURL = "";
    if (environment == 'SKAD3')
    {
      console.tron.log("INTO IF");
      envURL = "https://skad3a1-skanskapaas.inoappsproducts.com/ords/inoapps_ec/";
      console.tron.log("New ENV URL ", envURL);
    }

*/

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //https://pdev1a1-inoapps4.inoapps.com/ords/inoapps_ec/product.configurator.v1/getLogin///
  const getLogin = (username, password) => api.post("grn.mobility.v1/PostLogin/" + username + "," + password, {username, password });
  const getReqHeaderLines = (username) => api.get("product.configurator.v1/getReqHeaderLines/" + username);
  const getStaticData = username => api.get("product.configurator.v1/getStaticData/" + username);
  const getReplaceReason = () => api.get("product.configurator.v1/getReplaceReason");
  const postPhoto = (username, filename, photo) => api.post('grn.mobility.v1/postPhoto/' + username + ',' + filename, {photo});
  const postCreateReceipt = (username, receipts) => api.post('grn.mobility.v1/createReceipt/' + username , receipts);
  const postCorrectReceipt = (username, order_number, order_line_number, quantity, unit_of_measure, item_number, item_description, to_organization, comments, receipt_num,  deliver_tran_id, receive_tran_id, type, file_id) => api.post('grn.mobility.v1/correctReceipt/' + username , {order_number, order_line_number, quantity, unit_of_measure, item_number, item_description, to_organization, comments, receipt_num,  deliver_tran_id, receive_tran_id, type, file_id});
  const postRejectReceipt = (username, order_number, order_line_number, quantity, unit_of_measure, item_number, item_description, to_organization, comments, receipt_num, deliver_tran_id, receive_tran_id, type, file_id) => api.post('grn.mobility.v1/rejectReceipt/' + username , {order_number, order_line_number, quantity, unit_of_measure, item_number, item_description, to_organization, comments, receipt_num, deliver_tran_id, receive_tran_id, type, file_id});

  const getUsageType = () => api.get("product.configurator.v1/getUsageType");
  const postCreateRequisition = (username, createRequisitions) => api.post("product.configurator.v1/createRequisition/" + username, createRequisitions);
  const postChangePOLine = (username, changePOLines) => api.post("product.configurator.v1/createChangePOLine/" + username, changePOLines);

  const getPurchaseOrders = username => api.get("grn.mobility.v1/getPurchaseOrder/" + username);
  const getReceipts= username => api.get("grn.mobility.v1/getReceipt/" + username);

  // const getRoot = () => api.get('')
  // const getRate = () => api.get('rate_limit')
  // const getUser = (username) => api.get('search/users', {q: username})
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    // getRoot,
    // getRate,
    // getUser,
    getLogin,
    getReqHeaderLines,
    getStaticData,
    getReplaceReason,
    getPurchaseOrders,
    postPhoto,
    postCreateReceipt,
    postCorrectReceipt,
    postRejectReceipt,
    getReceipts,
    getUsageType,
    postCreateRequisition,
    postChangePOLine
  };
};


/*async const updateAPI =  (

    environment = await Utils.retrieveDataFromAsyncStorage("ENVIRONMENT");
    console.tron.log("Environment Variable (API) ", environment);
    envURL = "";
    if (environment == 'SKAD3')
    {
      console.tron.log("INTO IF");
      envURL = "https://skad3a1-skanskapaas.inoappsproducts.com/ords/inoapps_ec/";
      console.tron.log("New ENV URL ", envURL);
      newURL = api.apisauce.setBaseURL(envURL);
    }
  

)*/


   


// let's return back our create method as the default.
export default {
  create
  //createNewAPI
};
