import API from "../../App/Services/Api";
import FJSON from "format-json";
import DBGrnPurchaseOrderDataHelper from "../DB/DBGrnPurchaseOrderDataHelper";

let CreateReceiptsAPIHelper = {

  async postCreateReceipt(username, receipts) {

        console.tron.log("Post Create Receipt Params", receipts);

        var params = [];
        receipts.map((receipt) => {
          var param = {}
          param['order_number'] = receipt.order_number
          param['order_line_number'] = receipt.order_line_number
          param['quantity'] = parseFloat(receipt.quantity)
          param['unit_of_measure'] = receipt.unit_of_measure
          param['item_number'] = receipt.item_number
          param['item_description'] = receipt.item_description
          param['to_organization'] = receipt.to_organization
          param['to_organization_id'] = receipt.to_organization_id
          //param['receipt_tran_id'] = receipt.receipt_tran_id
          if (receipt.comments) {param['comments'] = receipt.comments}
          param['type'] = receipt.type
          if (receipt.file_id) {param['file_id'] = receipt.file_id}

          params.push(param)
        })

    console.tron.log("Params: ", params);

    const api = API.create();
    const response = await api.postCreateReceipt(username, params);

    if (response.ok) {

      receipts.map(async(receipt) => {
        await DBGrnPurchaseOrderDataHelper.updatePOStatusToProcessing(receipt.order_number, receipt.distribution_number, receipt.order_line_number,false,
          "processing", new Date());
        await DBGrnPurchaseOrderDataHelper.deleteCreateReceipts(receipt.order_number, receipt.distribution_number, receipt.order_line_number);

      })

    } else {

      console.tron.log("Response API: failed", response.status + " - " + response.problem);
    }

    return response;
  }
};

module.exports = CreateReceiptsAPIHelper;
