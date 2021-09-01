import API from "../../App/Services/Api";
import FJSON from "format-json";

let APIHelper = {

  async postCreateRequisition(username, createRequisitions) {
    console.tron.log("Create Requisitions: ", createRequisitions);

    var params = [];
    createRequisitions.map((createRequisition) => {
      var param = {}
      param['loc_id'] = createRequisition.loc_id
      param['building'] = createRequisition.building_number
      param['unit_id'] = parseFloat(createRequisition.unit_id)
      param['supplier_id'] = createRequisition.supplier_id
      param['vacant'] = createRequisition.vacant
      param['pref_date_1'] = createRequisition.preferred_date1
      param['pref_date_2'] = createRequisition.preferred_date2
      if (createRequisition.preferred_date3) {param['pref_date_3'] = createRequisition.preferred_date3}
      if (createRequisition.additional_information) {param['add_info'] = createRequisition.additional_information}
      param['replace_reason'] = createRequisition.replacement_reason
      param['attribute_id'] = createRequisition.attribute_id
      param['material'] = createRequisition.material
      param['bpa_line_id'] = createRequisition.bpa_line_id
      param['usage_type'] = createRequisition.usage_type
      param['padding'] = createRequisition.yn_padding
      param['threshold'] = createRequisition.yn_threshold
      if (createRequisition.pet_bpa_line_id) {param['pet_bpa_line_id'] = createRequisition.pet_bpa_line_id}
      if (createRequisition.pet_bpa_qty) {param['pet_bpa_qty'] = createRequisition.pet_bpa_qty}

      params.push(param)
    })

    console.tron.log("Params: ", params);

    const api = API.create();
    const response = await api["postCreateRequisition"].apply(this, [username, params])

    return response;
  },

  async postChangePOLines(username, changeOrders) {
    console.tron.log("Create Change PO Lines: ", changeOrders);

    var params = [];

    changeOrders.map((changeOrder) => {
      var param = {}
      param['order_id'] = changeOrder.order_id
      param['req_id'] = changeOrder.req_id
      param['attribute_id'] = changeOrder.attribute_id
      param['loc_id'] = changeOrder.loc_id
      param['unit_id'] = parseFloat(changeOrder.unit_id)
      param['material'] = changeOrder.material
      param['bpa_id'] = changeOrder.bpa_id
      param['bpa_line_id'] = changeOrder.bpa_line_id
      param['usage_type'] = changeOrder.usage_type
      param['quantity'] = changeOrder.quantity


      params.push(param)
    })

    console.tron.log("Params: ", params);

    const api = API.create();
    const response = await api["postChangePOLine"].apply(this, [username, params])
    return response;
  },
};

module.exports = APIHelper;
