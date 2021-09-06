import DB from "../DB/DB";
import Utils from "../Utils/Utils";

const Realm = require("realm");

let DBGrnPurchaseOrderDataHelper = {

  async savePurchaseOrders(purchaseOrders) {

        let dbPurchaseOrders = await this.getAllPurchaseOrders();
       /* DB.write(() =>{
          DB.delete(dbPurchaseOrders);
          })*/
        console.log("PRINT LOCAL Puchase Orders: ",dbPurchaseOrders);

          if (dbPurchaseOrders != null) {
           
            for (let i = 0; i < dbPurchaseOrders.length; i++) {
            let dbPurchaseOrder = dbPurchaseOrders[i];
            var isLocalPoExistsInAPIData = false

              for (let i = 0; i < purchaseOrders.length; i++) {
                let po = purchaseOrders[i];

              if (dbPurchaseOrder.order_number == po.order_number && dbPurchaseOrder.order_line_number == po.order_line_number && dbPurchaseOrder.distribution_number == po.distribution_number) {
                  isLocalPoExistsInAPIData = true

                  DB.write(() => {
                    dbPurchaseOrder.order_number = po.order_number,
                    dbPurchaseOrder.order_line_number = po.order_line_number,
                    dbPurchaseOrder.distribution_number = po.distribution_number,
                    dbPurchaseOrder.supplier_name = po.supplier_name,
                    dbPurchaseOrder.supplier_number = po.supplier_number,
                    dbPurchaseOrder.location_id = po.location_id,
                    dbPurchaseOrder.location_code = po.location_code,
                    dbPurchaseOrder.header_status = po.header_status,
                    dbPurchaseOrder.line_status = po.line_status,
                    dbPurchaseOrder.item_description = po.item_description,
                    //dbPurchaseOrder.unit_of_measure = po.unit_of_measure,
                    dbPurchaseOrder.quantity_ordered = po.quantity_ordered,
                    dbPurchaseOrder.bu_name = po.bu_name,
                    //dbPurchaseOrder.delivery_date = po.delivery_date,
                    //dbPurchaseOrder.deliver_to_person = po.deliver_to_person,
                    dbPurchaseOrder.to_organization_id = po.to_organization_id,
                    dbPurchaseOrder.to_organization = po.to_organization,
                    //dbPurchaseOrder.requestor_name = po.requestor_name,
                    dbPurchaseOrder.edited = po.edited

                  });


                  var newdate = new Date();
                  var duration = (newdate - dbPurchaseOrder.submittedTime)

                  if (dbPurchaseOrder.submittedTime != "" && dbPurchaseOrder.submittedTime != null){
                    console.log("duration: ", duration)
                    console.log("Submitted Time: ", dbPurchaseOrder.submittedTime)//1553837059628
                    console.log("New Date: ", newdate)
                  }

                  if (dbPurchaseOrder.submitStatus == "processing" , (dbPurchaseOrder.quantity_available_to_receive != po.quantity_available_to_receive || duration > 300000)){
                      if (dbPurchaseOrder.quantity_received != 0){
                        console.log("PROCESSING");
                        console.log("print local quantity: ", dbPurchaseOrder.quantity_received)
                        console.log("print API quantity: ", po.quantity_received)
                      }

                    DB.write(() => {
                      dbPurchaseOrder.submitStatus = "",
                      dbPurchaseOrder.submittedTime = null,
                      dbPurchaseOrder.quantity_received = 0,
                      dbPurchaseOrder.quantity_available_to_receive = po.quantity_available_to_receive
                      dbPurchaseOrder.comments = "",
                      dbPurchaseOrder.photoURL = ""

                      /*recToUpdate.photoURL = "",
                      recToUpdate.comment = ""*/
                    });
                  }else if (dbPurchaseOrder.submitStatus == "pending") {
                      console.log("PENDING");
                    /*do nothing*/
                  }else {

                    DB.write(() => {
                      dbPurchaseOrder.quantity_available_to_receive = po.quantity_available_to_receive
                    });
                    console.log("Db update quantity");
                  }
              }
            };


            if (!isLocalPoExistsInAPIData){
              await this.deletePurchaseOrder();

            };

          };
        }


      for (let i = 0; i < purchaseOrders.length; i++) {
        let po = purchaseOrders[i];

        var isPoExistsInLocalDB = false;

        for (let i = 0; i < dbPurchaseOrders.length; i++) {
          let dbPurchaseOrder = dbPurchaseOrders[i];
          if (dbPurchaseOrder.order_number == po.order_number && dbPurchaseOrder.order_line_number == po.order_line_number && dbPurchaseOrder.distribution_number == po.distribution_number ) {
              isPoExistsInLocalDB = true;
          };
        };

        if (!isPoExistsInLocalDB){
            console.log("Not Local Data");
              DB.write(async() => {
                DB.create("PurchaseOrder", po);
            });
        }
      };
    // DB.write(() => {
    //   let dbPurchaseOrders = DB.objects("PurchaseOrder");
    //   if (dbPurchaseOrders.length > 0) {
    //
    //     purchaseOrders.map((purchaseOrder) => {
    //       var dbExistingPurchaseOrders = DB.objects("PurchaseOrder").filtered('order_number = $0 AND distribution_number == $1',purchaseOrder.order_number, purchaseOrder.distribution_number);
    //       if (dbExistingPurchaseOrders.length == 0) {
    //         DB.create("PurchaseOrder", purchaseOrder);
    //       }
    //     })
    //   } else {
    //     purchaseOrders.map((purchaseOrder) => {
    //       DB.create("PurchaseOrder", purchaseOrder);
    //     })
    //   }
    // });
  },

  async getAllPurchaseOrders() {
    const dbPurchaseOrders = DB.objects("PurchaseOrder");
    //DB.deleteAll(dbPurchaseOrders);
    return dbPurchaseOrders;
  },

  async deletePurchaseOrders(purchaseOrder) {
    DB.delete(purchaseOrder);
    

    const dbPurchaseOrders = DB.objects("PurchaseOrder");
    console.log("Hit DB delete data", dbPurchaseOrders);
  },
  async deletePurchaseOrder() {
    console.log("Hit DB delete PO");
    let dbPurchaseOrder = DB.objects("PurchaseOrder")
    if (dbPurchaseOrder != null) {
        DB.write(() => {
          DB.delete(dbPurchaseOrder);
        });
    }
  },



  async updatePOStatus(
    order_number,
    distribution_number,
    order_line_number,
    edited,
    submitStatus,
    submittedTime,
    quantity, quantity_received, comments, photoURL) {

      if (edited == null || edited == "" || edited != true){
        edited = false
      }

    var dbExistingPurchaseOrders = null;

    if (distribution_number && order_line_number) {
      var dbExistingPurchaseOrders = DB.objects("PurchaseOrder").filtered('order_number = $0 AND distribution_number == $1 AND order_line_number == $2',order_number, distribution_number, order_line_number);
    } else {
      var dbExistingPurchaseOrders = DB.objects("PurchaseOrder").filtered('order_number = $0',order_number);
    }
    let poToUpdate = dbExistingPurchaseOrders[0];

      if (poToUpdate){
        if (quantity_received != null && quantity_received > 0) {

          DB.write(() => {
            console.log("DID UPDATE PO WHEN SUBMIT")
              poToUpdate.edited = edited,
              poToUpdate.submitStatus = submitStatus,
              poToUpdate.submittedTime = submittedTime,
              poToUpdate.quantity_received = parseFloat(quantity_received)

          });

        }else {
          DB.write(() => {
            poToUpdate.edited = edited,
              poToUpdate.submitStatus = submitStatus,
              poToUpdate.submittedTime = submittedTime
          });
        }

          if (comments != null || comments != "" ){
              DB.write(() => {
            poToUpdate.comments = comments

              });
          };

          if (photoURL != null || photoURL != "") {
              DB.write(() => {
              poToUpdate.photoURL = photoURL

              });
          };
      }
      console.log("UPDATED PO:", poToUpdate)


    return poToUpdate;
  },

  async updatePOStatusToProcessing(
    order_number,
    distribution_number,
    order_line_number,
    edited,
    submitStatus,
    submittedTime, comments, photoURL) {

console.log("Processing Submitted Time: ", submittedTime)
    var dbExistingPurchaseOrders = null;

    if (distribution_number && order_line_number) {
      var dbExistingPurchaseOrders = DB.objects("PurchaseOrder").filtered('order_number = $0 AND distribution_number == $1 AND order_line_number == $2',order_number, distribution_number, order_line_number);
    } else {
      var dbExistingPurchaseOrders = DB.objects("PurchaseOrder").filtered('order_number = $0',order_number);
    }
    let poToUpdate = dbExistingPurchaseOrders[0];

      DB.write(() => {
          poToUpdate.edited = edited,
          poToUpdate.submitStatus = submitStatus,
          poToUpdate.submittedTime = submittedTime
      });
  console.log("Print Processing Edited:", poToUpdate)
    return poToUpdate;
  },

  async getPurchaseOrders() {
    const dbPurchaseOrders = DB.objects("PurchaseOrder").filtered(`TRUEPREDICATE SORT(order_number DESC, order_line_number ASC, distribution_number ASC)`);
    //DISTINCT(order_number)
    return dbPurchaseOrders;
  },

  async getAllPurchaseOrders() {
    const dbPurchaseOrders = DB.objects("PurchaseOrder")
    return dbPurchaseOrders;
  },

  async getPOByOrderNumber(order_number) {
    const dbPurchaseOrders = DB.objects("PurchaseOrder").filtered('order_number == $0', order_number);
    return dbPurchaseOrders;
  },

  async getCreateReceipts(order_number) {
    const dbCreateReceipts = DB.objects("CreateReceipt").filtered('order_number == $0', order_number);
    return dbCreateReceipts;
  },

  async saveCreateReceipt(
    comments,
    desc,
    edited,
    file_id,
    item_no,
    open_quantity,
    order_line_number,
    order_number,
    ordered_quantity,
    photoURL,
    quantity,
    submittedStatus,
    submittedTime,
    to_organization,
    to_organization_id,
    type,
    unit_of_measure,
    distribution_number
  ) {
    console.log("Hit DB save data");

    let id = Utils.guid()

    DB.write(() => {
      const dbCreateReceipt = DB.objects("CreateReceipt");

      DB.create("CreateReceipt", {
        id: id,
        comments: comments,
        desc: desc,
        edited: edited,
        file_id: file_id,
        item_no: item_no,
        open_quantity: open_quantity,
        order_line_number: order_line_number,
        order_number: order_number,
        ordered_quantity: ordered_quantity,
        photoURL: photoURL,
        quantity: quantity,
        submittedStatus: submittedStatus,
        submittedTime: submittedTime,
        to_organization: to_organization,
        to_organization_id: to_organization_id,
        type: type,
        unit_of_measure: unit_of_measure,
        distribution_number:distribution_number,
      });
    });

    const dbCreateReceipt = DB.objects("CreateReceipt");
    console.log("Db create receipt: ", dbCreateReceipt);
    return id;
  },

  async updateCreateReceiptFile(
    id,
    file_id) {
    console.log("Hit DB update data");

    let dbUpdateReceipt = DB.objects("CreateReceipt").filtered('id == $0', id);
    let receiptToUpdate = dbUpdateReceipt[0];
    DB.write(() => {
      receiptToUpdate.file_id = file_id
    });
    console.log("Db update create receipt: ", dbUpdateReceipt);
    return receiptToUpdate;
  },

  async updateCreateReceiptStatus(
    order_number,
    distribution_number,
    order_line_number,
    edited,
    submitStatus,
    submittedTime,
    quantity) {
    console.log("Hit DB update data");

    let dbUpdateReceipt = DB.objects("CreateReceipt").filtered('order_number = $0 AND distribution_number == $1 AND order_line_number == $2', order_number, distribution_number, order_line_number);
    console.log("Db update create receipt : ", dbUpdateReceipt[0]);
    console.log(order_number,distribution_number,order_line_number,edited,submitStatus,submittedTime,quantity);

    let receiptToUpdate = dbUpdateReceipt[0];
    if (quantity != null) {
      DB.write(() => {
        receiptToUpdate.edited = edited,
          receiptToUpdate.submitStatus = submitStatus,
          receiptToUpdate.submittedTime = submittedTime,
          receiptToUpdate.quantity = quantity
      });
    }
    else {
      DB.write(() => {
        receiptToUpdate.edited = edited,
          receiptToUpdate.submitStatus = submitStatus,
          receiptToUpdate.submittedTime = submittedTime
      });
    }
  },

  async deleteCreateReceipt(id) {
    console.log("Hit DB delete data");

    let dbCreateReceipts = DB.objects("CreateReceipt").filtered('id == $0', id);

    if (dbCreateReceipts != null) {
      let receiptToDelete = dbCreateReceipts[0]
      DB.write(() => {
      /*  dbCreateReceipts.map((dbCreateReceipt) => {*/

          Utils.removeImage(receiptToDelete.photoURL)

            DB.delete(receiptToDelete);
      /*  })*/

      });
        console.log("SUCCESFULLY DELETED");
    }

  },

  async deleteCreateReceipts(order_number,
    distribution_number,
    order_line_number) {

    let dbCreateReceipts = DB.objects("CreateReceipt").filtered('order_number = $0 AND distribution_number == $1 AND order_line_number == $2', order_number, distribution_number, order_line_number);
      try {

        if (dbCreateReceipts != null){
          let receiptToDelete = dbCreateReceipts[0];
          DB.write(() => {

              DB.delete(receiptToDelete);
              console.log("Done remove RECEIPTS");
          });
            return receiptToDelete;
        }
      } catch (e) {
        console.log(e); //uncaught
    }
  },

};

module.exports = DBGrnPurchaseOrderDataHelper;
