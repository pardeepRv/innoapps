import DB from "../DB/DB";
import Utils from "../Utils/Utils";
import moment from 'moment';

const Realm = require("realm");

let DBPCRequisitionHelper = {
  async saveRequisition(
    local_id,
    selectedProperty,
    selectedUnit,
    selectedSupplier,
    selectedReason,
    chosenDate1,
    chosenDate2,
    chosenDate3,
    isChecked,
    additionalInfo,
    selectedEntityAttributes,
    selectedPetTreatment
  ) {
    console.tron.log("Hit DB saveRequisition : CREATE REQUISITION");

    let vacant,
      requisitionArr = [];
    DB.write(() => {
      if (isChecked) {
        vacant = "Y";
      } else {
        vacant = "N";
      }

      selectedEntityAttributes.map((each) => {
        let pad, threshold, petTreatment;

        if (each.pad) {
          pad = "Y";
        } else {
          pad = "N";
        }

        if (each.threshold) {
          threshold = "Y";
        } else {
          threshold = "N";
        }

        // Capitalize first word of material
        var material = each.type.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');

        const requisition = DB.create("CreateRequisition", {
          id: Utils.guid(),
          local_id: local_id,
          loc_id: selectedProperty.location_id,
          building_number: selectedUnit.building_number,
          unit_id: selectedUnit.unit_id,
          supplier_id: selectedSupplier.supplier_id,
          vacant: vacant,
          preferred_date1: moment(chosenDate1).format('DD.MM.YYYY'),
          preferred_date2: moment(chosenDate2).format('DD.MM.YYYY'),
          preferred_date3: chosenDate3 != null ? moment(chosenDate3).format('DD.MM.YYYY') : '',
          replacement_reason: selectedReason,
          submittedAt: new Date(),
          attribute_id: each.id,
          material: material,
          bpa_line_id: each.material[0].bpa_line_id,
          usage_type: each.usageType,
          yn_padding: pad,
          yn_threshold: threshold,
          pet_bpa_line_id: selectedPetTreatment != null ? selectedPetTreatment.bpa_line_id : null,
          pet_bpa_qty: selectedPetTreatment != null ? 1.0 : null,
          additional_information: additionalInfo != null ? additionalInfo:''
        });

        console.tron.log("Requisition: ", requisition);
        requisitionArr = [...requisitionArr, requisition];
      })
    });

    console.tron.log("Requisition Arr: ", requisitionArr);
    return requisitionArr;
  },

  async saveNewRequisition(
    selectedProperty,
    selectedUnit,
    selectedSupplier,
    selectedReason,
    chosenDate1,
    chosenDate2,
    chosenDate3,
    isChecked,
    additionalInfo,
    selectedEntityAttributes,
    selectedPetTreatment,
    status
  ) {
    console.tron.log("Hit DB save New Requisition");
      console.tron.log("Print Supplier ID: ", selectedUnit.unit_id, selectedUnit.unit_name);
    let vacant,
      requisitionArr = [];
    DB.write(() => {
      if (isChecked) {
        vacant = "Y";
      } else {
        vacant = "N";
      }

      selectedEntityAttributes.map((each) => {
        let pad, threshold, petTreatment;

        if (each.pad) {
          pad = "Y";
        } else {
          pad = "N";
        }

        if (each.threshold) {
          threshold = "Y";
        } else {
          threshold = "N";
        }

        // Capitalize first word of material
        var material = each.type.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');

        const requisition = DB.create("ReqHeaderLine", {
          local_id: Utils.guid(),
          loc_id: selectedProperty.location_id,
          building_number: selectedUnit.building_number,
          unit_id: "" + selectedUnit.unit_name,
          supplier_id: selectedSupplier.supplier_id,
          vacant: vacant,
          preferred_date1: moment(chosenDate1).format('DD.MM.YYYY'),
          preferred_date2: moment(chosenDate2).format('DD.MM.YYYY'),
          preferred_date3: chosenDate3 != null ? moment(chosenDate3).format('DD.MM.YYYY') : '',
          replacement_reason: selectedReason,
          attribute_id: each.id,
          material: material,
          bpa_line_id: each.material[0].bpa_line_id,
          usage_type: each.usageType,
          yn_padding: pad,
          yn_threshold: threshold,
          pet_bpa_line_id: selectedPetTreatment != null ? selectedPetTreatment.bpa_line_id : 0,
          pet_bpa_qty: selectedPetTreatment != null ? 1.0 : 0,
          status: status,
          additional_information: additionalInfo != null ? additionalInfo:'',
        });

        console.tron.log("New Requisition: ", requisition);
        requisitionArr = [...requisitionArr, requisition];
      })
    });

    console.tron.log("New Requisition Arr: ", requisitionArr);
    return requisitionArr;
  },

  async removeRequisition(createdRequisition) {
    DB.write(() => {
      if (createdRequisition != null) {
        DB.delete(createdRequisition);
      }
    });
    console.tron.log("Done remove requisition");
  },

  async removeAttributes(attributes) {
    DB.write(() => {
      if (attributes != null) {
        DB.delete(attributes);
      }
    });
    console.tron.log("Done remove entity attributes");
  },

  async removeAllRequisition() {
    DB.write(() => {
      const requisitions = DB.objects("CreateRequisition");
      DB.delete(requisitions);
    });
  },

  async getCreatedRequisition() {
    const dbCreateRequisitions = DB.objects("CreateRequisition");
    console.tron.log("Db created requisitions: ", dbCreateRequisitions);
    return dbCreateRequisitions;
  },

  async getCategoryConfig(material_type, category_type){
      const categoryConfig = DB.objects("CategoryConfig").filtered('material_type = $0 AND category_type = $1', material_type, category_type);
      return categoryConfig
  },

  async getConfigBpaDetail(supplier, category_id){
    const dbBpaDetails = supplier.bpa_detail.filtered(`category_id = $0`, category_id)
    return dbBpaDetails;
  },


  async saveChangePOLines(reqHeader, changeOrders) {
    console.tron.log("Hit DB saveChangePOLine");
    var changePOLines = []

    DB.write(() => {

      changeOrders.map((changeOrder) => {
        const changePOLine = DB.create("ChangePoLine", {
          id: Utils.guid(),
          attribute_id: changeOrder.attribute.attribute_id,
          bpa_id: changeOrder.materialCategory.bpa_header_id,
          bpa_line_id: changeOrder.materialCategory.bpa_line_id,
          currency: changeOrder.materialCategory.currency_code,
          item_desc: changeOrder.materialCategory.item_description,
          loc_id: reqHeader.loc_id,
          material: changeOrder.materialType.type,
          name: '',
          order_id: reqHeader.order_header_id,
          quantity: changeOrder.quantity,
          req_id: reqHeader.req_header_id,
          submitStatus: 'pending',
          local_status: 'pending',
          unit_cost: changeOrder.materialCategory.unit_cost,
          unit_id: parseFloat(reqHeader.unit_id),
          uom: reqHeader.uom,
          usage_type: changeOrder.usageType.type,
        });

        changePOLines.push(changePOLine)
      })
    });

    console.tron.log("Change PO Lines Arr: ", changePOLines);
    return changePOLines;
  },

  async removeChangePOLines(changePOLines) {
    DB.write(() => {
      DB.delete(changePOLines);
    });

    console.tron.log("Done remove change PO lines");
  },

  async updateReqHeaderLineStatus(reqHeaderID, status,date) {
    var reqHeaderLines = DB.objects('ReqHeaderLine').filtered('req_header_id = $0', reqHeaderID)

    DB.write(() => {

      reqHeaderLines.map((reqHeaderLine) => {
        reqHeaderLine.status = status,
        reqHeaderLine.local_status = status,
        reqHeaderLine.submittedAt = date
      })
    });

    console.tron.log("Req header lines status updated: ", reqHeaderLines);
  },

  async updateCreateRequisition(id, status, submittedAt) {
    console.tron.log("DID ENTER UPDATE CREATE REQUISITION")
    var requisitions = DB.objects('CreateRequisition').filtered('id = $0', id)

    let reqToUpdate = requisitions[0]
    DB.write(() => {
    console.tron.log("Did update Create Requisition")
        reqToUpdate.status = status
        // update submitted Time
        reqToUpdate.submittedAt = submittedAt
    });

    console.tron.log("Req header lines status updated: ", reqToUpdate);
    return reqToUpdate
  },

  async updateRequisition(local_id, mobile_req_id, status, selectedUnit) {
    console.tron.log("DID ENTER UPDATE REQUISITION")
    var requisitions = DB.objects('ReqHeaderLine').filtered('local_id = $0', local_id)

    let reqToUpdate = requisitions[0]
    DB.write(() => {
    console.tron.log("Did update New Requisition with Mobile ID")
        reqToUpdate.mobile_req_id = mobile_req_id,
        reqToUpdate.status = status,
        reqToUpdate.local_status = '',
        reqToUpdate.submittedAt = new Date(),
        reqToUpdate.unit_id = selectedUnit.unit_name

    });

    console.tron.log("SUCCESFULLY UPDATED REQ after SUBMISSION: ", reqToUpdate);
    return reqToUpdate
  },

  async updateAttributes(attribute_id, type, material, usageType, pad, threshold, pet_treatment, isUpdated){
    var dbAttributes = DB.objects('EntityAttribute').filtered('id = $0', attribute_id)
    let attributeToUpdate = dbAttributes[0];
        console.tron.log("Attribute to update  ", attributeToUpdate)
      DB.write(() => {
        console.tron.log("Attribute did update !");
            console.tron.log("Attribute type: ", type);
                console.tron.log("Attribute  material: ", material);
                    console.tron.log("Attribute Usage Type: ", usageType);
                        console.tron.log("Attribute pad: ", pad);

        attributeToUpdate.type = type,
        attributeToUpdate.material = material,
        attributeToUpdate.usageType = usageType,
        attributeToUpdate.pad = pad,
        attributeToUpdate.threshold = pet_treatment,
        attributeToUpdate.isUpdated = isUpdated

      });
          console.tron.log("Updated Attributes: ",attributeToUpdate);
  },
};

module.exports = DBPCRequisitionHelper;
