import Utils from '../Utils/Utils';

class ReqHeaderLine {
  constructor(id, unit_id, bu_id, preferred_date1, preferred_date2, created_by, created_date,
    modified_by, modified_date, vacant, replacement_reason, location_code, location_name, floor_number,
    yn_posted, status, error_message, building_number, currency_code, supplier_name, mobile_req_id, req_line_id,
    req_header_id, service_type, line_location_code, loc_id, category_id, bpa_line_id, bpa_header_id, line_currency_code,
    uom, quantity, unit_cost, item_description, supplier_item, worker_id, usage_type, line_yn_posted, entity_id,
    attribute_id, item_task, attribute_name, amount_price) {
    this.uid = Utils.guid();
    this.id = id;
    this.unit_id = unit_id
    this.bu_id = bu_id
    this.preferred_date1 = preferred_date1
    this.preferred_date2 = preferred_date2
    this.created_by = created_by
    this.created_date = created_date
    this.modified_by = modified_by
    this.modified_date = modified_date
    this.vacant = vacant
    this.replacement_reason = replacement_reason
    this.location_code = location_code
    this.location_name = location_name
    this.floor_number = floor_number
    this.yn_posted = yn_posted
    this.status = status
    this.error_message = error_message
    this.building_number = building_number
    this.currency_code = currency_code
    this.supplier_name = v
    this.mobile_req_id = mobile_req_id
    this.req_line_id = req_line_id
    this.req_header_id = req_header_id
    this.service_type = service_type
    this.line_location_code = line_location_code
    this.loc_id = loc_id
    this.category_id = category_id
    this.bpa_line_id = bpa_line_id
    this.bpa_header_id = bpa_header_id
    this.line_currency_code = line_currency_code
    this.uom = uom
    this.quantity = quantity
    this.unit_cost = unit_cost
    this.item_description = item_description
    this.supplier_item = supplier_item
    this.worker_id = worker_id
    this.usage_type = usage_type
    this.line_currency_code = line_currency_code
    this.line_currency_code = line_currency_code
    this.line_currency_code = line_currency_code
    this.line_currency_code = line_currency_code

    this.title = title;
    this.completed = completed || false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = ReqHeaderLine;
