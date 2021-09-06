import Api from "../Services/Api";
import Utils from "../Utils/Utils";

export default EnvironmentVar = async() => {
    
  const environment = await Utils.retrieveDataFromAsyncStorage("ENVIRONMENT");
   console.log("Getting  Environment Variable (API) in common function>>>>>>>>>>>>", environment);

  if (environment == "SKAD3") {
    console.log("INTO IF");
    envURL = "https://skad3a1-skanskapaas.inoappsproducts.com/ords/inoapps_ec/";
    console.log("New ENV URL ", envURL);
    Api.create(envURL);
    console.log(this.api, "LETS GOOOO");
  } else if (environment == "SKAD2") {
    envURL = "https://skad2a1-skanskapaas.inoappsproducts.com/ords/inoapps_ec/";
    console.log("New ENV URL ", envURL);
    Api.create(envURL);
  } else if (environment == "SKAD1") {
    envURL = "https://skad1a1-skanskapaas.inoappsproducts.com/ords/inoapps_ec/";
    console.log("New ENV URL ", envURL);
    Api.create(envURL);
  } else if (environment == "SKAT1") {
    envURL = "https://skat1a1-skanskapaas.inoappsproducts.com/ords/inoapps_ec/";
    console.log("New ENV URL ", envURL);
    Api.create(envURL);
  } else if (environment == "PTEST2") {
    envURL = "https://ptest2a1-inoapps4.inoapps.com/ords/inoapps_ec/";
    console.log("New ENV URL ", envURL);
    Api.create(envURL);
  } else if (environment == "PDEV2") {
    envURL = "https://pdev2a1-inoapps4.inoapps.com/ords/inoapps_ec/";
    console.log("New ENV URL ", envURL);
    Api.create(envURL);
  } else if (environment == "PDEV1") {
    envURL = "https://pdev1a1-inoapps4.inoapps.com/ords/inoapps_ec/";
    console.log("New ENV URL ", envURL);
  } else if (environment == "PTEST1") {
    envURL = "https://ptest1a1-inoapps4.inoapps.com/ords/inoapps_ec/";
    console.log("New ENV URL ", envURL);
    Api.create(envURL);
  }

  return envURL;
};
