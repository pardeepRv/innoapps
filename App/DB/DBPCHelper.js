import DB from '../DB/DB';
import Utils from '../Utils/Utils';

const Realm = require('realm');

let DBPCHelper = {

  // Requisition List
  //-----------------
async saveReqHeaderLines (reqHeaderLines) {

  let dbReqLines = await this.getAllRequisition();

  if (dbReqLines != null){

    for (let i = 0; i < dbReqLines.length; i++) {
      let dbReqLine = dbReqLines[i];
      var isLocalRequisitionExistsInAPI = false

      for (let j = 0; j < reqHeaderLines.length; j++) {
        let reqHeaderLine = reqHeaderLines[j];

        if ((dbReqLine.mobile_req_id != 0 && reqHeaderLine.mobile_req_id != 0
          && dbReqLine.mobile_req_id == reqHeaderLine.mobile_req_id) && (dbReqLine.id != 0 && reqHeaderLine.id != 0
          && dbReqLine.id == reqHeaderLine.id)
          && (dbReqLine.req_line_id !=0 && reqHeaderLine.req_line_id !=0 && dbReqLine.req_line_id == reqHeaderLine.req_line_id)) {
            isLocalRequisitionExistsInAPI = true
          DB.write(() => {
            dbReqLine.id = reqHeaderLine.id,
            dbReqLine.unit_id = reqHeaderLine.unit_id,
            dbReqLine.bu_id = reqHeaderLine.bu_id,
            dbReqLine.preferred_date1 = reqHeaderLine.preferred_date1,
            dbReqLine.preferred_date2 = reqHeaderLine.preferred_date2,
            dbReqLine.create_by = reqHeaderLine.create_by,
            dbReqLine.created_date = reqHeaderLine.created_date,
            dbReqLine.modified_by = reqHeaderLine.modified_by,
            dbReqLine.modified_date = reqHeaderLine.modified_date,
            dbReqLine.vacant = reqHeaderLine.vacant,
            dbReqLine.replacement_reason = reqHeaderLine.replacement_reason,
            dbReqLine.location_code = reqHeaderLine.location_code,
            dbReqLine.location_name = reqHeaderLine.location_name,
            dbReqLine.floor_number = reqHeaderLine.floor_number,
            dbReqLine.yn_posted = reqHeaderLine.yn_posted,
            dbReqLine.requisition_number= reqHeaderLine.requisition_number != undefined && reqHeaderLine.requisition_number != null ? reqHeaderLine.requisition_number : "",
            dbReqLine.building_number = reqHeaderLine.building_number,
            dbReqLine.currency_code = reqHeaderLine.currency_code,
            dbReqLine.supplier_name = reqHeaderLine.supplier_name,
            dbReqLine.mobile_req_id = reqHeaderLine.mobile_req_id != undefined && reqHeaderLine.mobile_req_id != null ? reqHeaderLine.mobile_req_id : 0,
            dbReqLine.req_line_id = reqHeaderLine.req_line_id,
            dbReqLine.req_header_id = reqHeaderLine.req_header_id,
            dbReqLine.service_type = reqHeaderLine.service_type,
            dbReqLine.line_location_code = reqHeaderLine.line_location_code,
            dbReqLine.category_id = reqHeaderLine.category_id,
            dbReqLine.bpa_line_id = reqHeaderLine.bpa_line_id,
            dbReqLine.line_currency_code = reqHeaderLine.line_currency_code,
            dbReqLine.uom = reqHeaderLine.uom,
            dbReqLine.quantity = reqHeaderLine.quantity,
            dbReqLine.unit_cost = reqHeaderLine.unit_cost,
            dbReqLine.item_description = reqHeaderLine.item_description,
            dbReqLine.supplier_item = reqHeaderLine.supplier_item,
            dbReqLine.worker_id = reqHeaderLine.worker_id,
            dbReqLine.usage_type = reqHeaderLine.usage_type,
            dbReqLine.line_yn_posted = reqHeaderLine.line_yn_posted,
            dbReqLine.entity_id = reqHeaderLine.entity_id,
            dbReqLine.yn_padding = reqHeaderLine.yn_padding,
            dbReqLine.item_task = reqHeaderLine.item_task,
            dbReqLine.attribute_name = reqHeaderLine.attribute_name,
            dbReqLine.amount_price = reqHeaderLine.amount_price

            if (reqHeaderLine.order_header_id != undefined || reqHeaderLine.order_header_id != null) {
              dbReqLine.order_header_id = reqHeaderLine.order_header_id
            }

            if (reqHeaderLine.order_number != undefined || reqHeaderLine.order_number != null) {
              dbReqLine.order_number = reqHeaderLine.order_number
            }

            if (reqHeaderLine.loc_id != undefined || reqHeaderLine.loc_id != null) {
              dbReqLine.loc_id = reqHeaderLine.loc_id
            }

          });

          // Check if there are updated number of PO lines
          // Meaning previously there was a change order submission

          if (reqHeaderLine.order_number != "" && dbReqLine.status == "processing"){

              // count duration for processing time out
              var newdate = new Date();
              var duration = (newdate - dbReqLine.submittedAt)

              var currentLineCount = 0
              var newLineCount = 0

              // filtered lines from db
              let dbLines = await this.getDBReqLines(dbReqLine.req_header_id);
              currentLineCount = dbLines.length

              // get count of API lines
              reqHeaderLines.map((line) => {
                if (line.req_header_id == reqHeaderLine.req_header_id){
                  newLineCount++;
                }
              });
              console.tron.log("PRINT NEW DATE, submitted Time and Duration: ", newdate,dbReqLine.submittedAt, duration);
              if (newLineCount != currentLineCount || duration > 300000){
                console.tron.log("LOG", newLineCount, currentLineCount, duration)
                    DB.write(() => {
                  dbReqLine.status = reqHeaderLine.status
                  dbReqLine.local_status = reqHeaderLine.status

                });
              }else {
                // Do nothing
              }
           }else if (dbReqLine.status != "pending" && dbReqLine.status != "draft" && dbReqLine.status != "") {
               DB.write(() => {
               dbReqLine.status = reqHeaderLine.status
               dbReqLine.local_status = reqHeaderLine.status

             });
           };
        }
      }

      var newdate = new Date();
      var duration = (newdate - dbReqLine.submittedAt)
      //console.tron.log("PRINT NEW DATE, submitted Time and Duration: ", newdate,dbReqLine.submitted_at, duration);
      DB.write(() => {
        if (!isLocalRequisitionExistsInAPI){
          if (dbReqLine.status == "processing" &&  duration > 300000) {
            DB.delete(dbReqLine)
          }
        }
      });
    }
  }

  for (let index = 0; index < reqHeaderLines.length; index++) {
    let reqHeaderLine = reqHeaderLines[index];
    var isLocalData = false;

    for (let a = 0; a < dbReqLines.length; a++) {
      let dbReqLine = dbReqLines[a];

      if (dbReqLine.id == reqHeaderLine.id
      && dbReqLine.req_line_id == reqHeaderLine.req_line_id){
          isLocalData = true;
      };
    };

    if (!isLocalData) {
      // save new Requisition

      DB.write(() => {
         DB.create('ReqHeaderLine', reqHeaderLine);
      });
    }
  };

},

 async saveNewRequisition(unit_id,bu_id,preferred_date1,preferred_date2,preferred_date3,
   vacant,replacement_reason,location_code, location_name, floor_number, yn_posted,yn_floor_seal,
   yn_occupied, yn_threshold, yn_padding, yn_pet_treatment,yn_track_strip, status,error_message,
  building_number,currency_code, supplier_id, loc_id, bpa_line_id, usage_type, entity_id,
  attribute_id, submitted_at, additional_information, local_status,pet_bpa_line_id,pet_bpa_qty
  ) {
    console.tron.log("Did Enter to Append!");
        DB.write(() => {
    const test = DB.create('ReqHeaderLine', {
          id: Utils.guid(),
          unit_id:unit_id,
          bu_id:bu_id,
          preferred_date1:preferred_date1,
          preferred_date2:preferred_date2,
          preferred_date3:preferred_date3,
          created_by:null,
          created_date:null,
          modified_by:null,
          modified_date:null,
          vacant:vacant,
          replacement_reason:replacement_reason,
          location_code:location_code,
          location_name:location_name,
          floor_number:floor_number,
          yn_posted:yn_posted,
          yn_floor_seal:yn_floor_seal,
          yn_occupied:yn_occupied,
          yn_padding:yn_padding,
          yn_threshold:yn_threshold,
          yn_pet_treatment:yn_pet_treatment,
          yn_track_strip:yn_track_strip,
          requisition_number: null,
          status:status,
          error_message:error_message,
          building_number:building_number,
          currency_code:currency_code,
          supplier_id: supplier_id,
          supplier_name:null,
          order_header_id:null,
          order_number:null,
          mobile_req_id:null,
          req_line_id:null,
          req_header_id:null,
          service_type: null,
          line_location_code:null,
          loc_id:loc_id,
          category_id: null,
          bpa_line_id: bpa_line_id,
          bpa_header_id: null,
          line_currency_code:null,
          uom: null,
          quantity: null,
          unit_cost:null ,
          item_description:null,
          supplier_item:null,
          worker_id:null,
          usage_type: usage_type,
          line_yn_posted: null,
          entity_id:entity_id ,
          attribute_id:attribute_id ,
          item_task:null ,
          attribute_name:null,
          amount_price:null ,
          submitted_at:submitted_at ,
          additional_information: additional_information,
          local_status:local_status,
          pet_bpa_line_id: pet_bpa_line_id,
          pet_bpa_qty:pet_bpa_qty
          });
          console.tron.log("Did Append New Requisition",test);
        });
    },

  async getAllRequisition() {
      const dbRequisitions = DB.objects('ReqHeaderLine');
      console.tron.log("Db ALL Requisitions: ", dbRequisitions);
      return dbRequisitions;
    },

  async getReqHeaders () {
    const dbReqHeaderLines = DB.objects('ReqHeaderLine').filtered(`TRUEPREDICATE SORT(submittedAt DESC, created_date DESC, requisition_number DESC) DISTINCT(req_header_id)`)
    return dbReqHeaderLines
  },

  async getReqLines (reqHeaderLine) {
    const dbReqLines = DB.objects('ReqHeaderLine').filtered(`req_header_id = $0`, reqHeaderLine.req_header_id)
    console.tron.log("Db Requisitions according to header id: ", dbReqLines);
    return dbReqLines
  },

  async getDBReqLines (reqHeaderId) {
    const dbReqLines = DB.objects('ReqHeaderLine').filtered(`req_header_id = $0`, reqHeaderId)
    console.tron.log("Db Requisitions according to header id: ", dbReqLines);
    return dbReqLines
  },

  async saveCreateRequisition (additional_information, bu_id, building_number, create_by, created_date, currency_code, entity_id, error_message, floor_number, loc_id, local_status, location_code, location_name, mobile_req_id, modified_by, modified_date, order_header_id, order_number, preferred_date1, preferred_date2, preferred_date3, replacement_reason, status, submittedAt, supplier_id, supplier_name, unit_id, unit_name, vacant, yn_floor_seal, yn_occupied, yn_padding, yn_pet_treatment, yn_posted, yn_threshold, yn_track_strip) {
    DB.write(() => {
        DB.create('CreateRequisition', {
          id: Utils.guid(),
          additional_information: additional_information,
          bu_id: bu_id,
          building_number: building_number,
          create_by: create_by,
          created_date: created_date,
          currency_code: currency_code,
          entity_id: entity_id,
          error_message: error_message,
          floor_number: floor_number,
          loc_id: loc_id,
          local_status: local_status,
          location_code: location_code,
          location_name: location_name,
          mobile_req_id: mobile_req_id,
          modified_by: modified_by,
          modified_date: modified_date,
          order_header_id: order_header_id,
          order_number: order_number,
          preferred_date1: preferred_date1,
          preferred_date2: preferred_date2,
          preferred_date3: preferred_date3,
          replacement_reason: replacement_reason,
          request_id: request_id,
          requisition_number: requisition_number,
          status: status,
          submittedAt: submittedAt,
          supplier_id: supplier_id,
          supplier_name: supplier_name,
          unit_id: unit_id,
          unit_name: unit_name,
          vacant: vacant,
          yn_floor_seal: yn_floor_seal,
          yn_occupied: yn_occupied,
          yn_padding: yn_padding,
          yn_pet_treatment: yn_pet_treatment,
          yn_posted: yn_posted,
          yn_threshold: yn_threshold,
          yn_track_strip: yn_track_strip,
        });
    });
  },

  async getCreateRequisitions() {
    const dbCreateRequisitions = DB.objects('CreateRequisition')
    return dbCreateRequisitions
  },

  async saveChangePoLine (attribute_id, bpa_id, bpa_line_id, currency, item_desc, loc_id, material, name, order_id, quantity, req_id, submitStatus, unit_cost, unit_id, uom, usage_type) {
    DB.write(() => {
        DB.create('ChangePoLine', {
          id: Utils.guid(),
          attribute_id: attribute_id,
          bpa_id: bpa_id,
          bpa_line_id: bpa_line_id,
          currency: currency,
          item_desc: item_desc,
          loc_id: loc_id,
          material: material,
          name: name,
          order_id: order_id,
          quantity: quantity,
          req_id: req_id,
          submitStatus: submitStatus,
          unit_cost: unit_cost,
          unit_id: unit_id,
          uom: uom,
          usage_type: usage_type,
        });
    });
  },

  async getChangePoLines () {
    const dbChangePoLines = DB.objects('ChangePoLine')
    return dbChangePoLines
  },
};

module.exports = DBPCHelper;
