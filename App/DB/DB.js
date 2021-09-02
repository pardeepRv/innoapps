// Static Data Schema
//===================

const Realm = require("realm");


class Property extends Realm.Object {}
Property.schema = {
  name: 'Property',
  schemaVersion: 1,
  properties: {
    location_name: {
      type: 'string',
      default: ''
    },
    location_id: {
      type: 'double',
      default: 0.0
    },
    entity: {
      type: 'list',
      objectType: 'Entity'
    },
    supplier: {
      type: 'list',
      objectType: 'Supplier'
    },
    material_type: {
      type: 'list',
      objectType: 'MaterialType'
    },
    category_config:{
      type: 'list',
      objectType: 'CategoryConfig'
    },
    reject_reason:{
      type: 'list',
      objectType: 'RejectReason'
    }
  }
};


class updatedProperty extends Realm.Object {}
updatedProperty.schema = {
  name: 'Property',
  schemaVersion: 2,
  properties: {
    location_name: {
      type: 'string',
      default: ''
    },
    location_id: {
      type: 'double',
      default: 0.0
    },
    entity: {
      type: 'list',
      objectType: 'Entity'
    },
    supplier: {
      type: 'list',
      objectType: 'Supplier'
    },
    material_type: {
      type: 'list',
      objectType: 'MaterialType'
    },
    category_config:{
      type: 'list',
      objectType: 'CategoryConfig'
    },
    reject_reason:{
      type: 'list',
      objectType: 'RejectReason'
    }
  }
};

class EntityAttribute extends Realm.Object {}
EntityAttribute.schema = {
  name: 'EntityAttribute',
  properties: {
    id: {type: 'double', default: 0.0},
    entity_id: {type: 'double', default: 0.0},
    type: {type: 'string', default: ''},
    uom: {type: 'string', default: ''},
    overall_quantity: {type: 'int', default: 0},
    net_quantity: {type: 'int', default: 0},
    name: {type: 'string', default: ''},
    selected: {type: 'bool', default: false},
    pad: {type: 'bool', default: false},
    threshold: {type: 'bool', default: false},
    pet_treatment: {type: 'bool', default: false},
    material: {type: 'list', objectType:'Category'},
    usageType: {type: 'string', default: ''},
    isUpdated: {type: 'bool', default: false},
    bpa_line_id:{type: 'double', default: 0.0}
  }
};

class Entity extends Realm.Object {}
Entity.schema = {
  name: 'Entity',
  properties: {
    building_number: {
      type: 'string',
      default: ''
    },
    unit_name: {
      type: 'string',
      default: ''
    },
    unit_id: {
      type: 'double',
      default: 0.0
    },
    entity_attributes: {
      type: 'list',
      objectType: 'EntityAttribute'
    }
  }
};

class MaterialCategory extends Realm.Object {}
MaterialCategory.schema = {
  name: 'MaterialCategory',
  properties: {
    type: {
      type: 'string',
      default: ''
    },
    category: {
      type: 'list',
      objectType: 'Category'
    }
    // category: {type: 'list', default: []}
  }
};

class PetTreatment extends Realm.Object {}
PetTreatment.schema = {
  name: 'PetTreatment',
  properties: {
    item_description: {
      type: 'string',
      default: ''
    },
    bpa_header_id: {
      type: 'double',
      default: 0.0
    },
    bpa_line_id: {
      type: 'double',
      default: 0.0
    },
    currency_code: {
      type: 'string',
      default: ''
    },
    unit_cost: {
      type: 'double',
      default: 0.0
    },
    uom: {
      type: 'string',
      default: 0.0
    }
  }
};

class Category extends Realm.Object {}
Category.schema = {
  name: 'Category',
  properties: {
    item_description: {
      type: 'string',
      default: ''
    },
    bpa_line_id: {
      type: 'double',
      default: 0.0
    },
    currency_code: {
      type: 'string',
      default: ''
    },
    unit_cost: {
      type: 'double',
      default: 0.0
    }
  }
};

class Supplier extends Realm.Object {}
Supplier.schema = {
  name: 'Supplier',
  properties: {
    supplier_id: {
      type: 'double',
      default: 0.0
    },
    supplier_name: {
      type: 'string',
      default: ''
    },
    material_category: {
      type: 'list',
      objectType: 'MaterialCategory'
    },
    pet_treatment: {
      type: 'list',
      objectType: 'PetTreatment'
    },
    bpa_detail: {
      type: 'list',
      objectType: 'BPADetail'
    }
  }
};

class BPADetail extends Realm.Object {}
BPADetail.schema = {
  name: 'BPADetail',
  properties: {
    item_description: {
      type: 'string',
      default: ''
    },
    bpa_header_id: {
      type: 'double',
      default: 0.0
    },
    bpa_line_id: {
      type: 'double',
      default: 0.0
    },
    uom: {
      type: 'string?',
      default: ''
    },
    unit_cost: {
      type: 'double?',
      default: 0.0
    },
    currency_code: {
      type: 'string?',
      default: ''
    },
    category_type: {
      type: 'string?',
      default: ''
    },
    category_id:{
      type: 'double',
      default:0.0
    }
  }
};

class MaterialType extends Realm.Object {}
MaterialType.schema = {
  name: 'MaterialType',
  properties: {
    type: {
      type: 'string',
      default: ''
    }
  }
};

class RejectReason extends Realm.Object {}
RejectReason.schema = {
  name: 'RejectReason',
  properties: {
    lookup_type: {
      type: 'string',
      default: ''
    },
    code:{
      type:'string',
      default:''
    },
    value:{
      type: 'string',
      default:''
    }
  }
};

class CategoryConfig extends Realm.Object {}
CategoryConfig.schema = {
  name:'CategoryConfig',
  properties: {
    id:{
      type: 'double',
      default: 0.0
    },
    category_id:{
      type: 'double',
      default: 0.0
    },
    material_type:{
      type: 'string',
      default: ''
    },
    category_type:{
      type: 'string',
      default:''
    }
  }
};





class ReplaceReason extends Realm.Object {}
ReplaceReason.schema = {
  name: 'ReplaceReason',
  properties: {
    reason: {
      type: 'string',
      default: ''
    },
  }
};

class UsageType extends Realm.Object {}
UsageType.schema = {
  name: 'UsageType',
  properties: {
    type: {
      type: 'string',
      default: ''
    }
  }
}

// Product Configurator Schema
//============================

class ReqHeaderLine extends Realm.Object {}
ReqHeaderLine.schema = {
  name: 'ReqHeaderLine',
  properties: {
    id: {
      type: 'double',
      default: 0.0
    },
    unit_id: {
      type: 'string?',
      default: ''
    },
    bu_id: {
      type: 'double',
      default: 0.0
    },
    preferred_date1: {
      type: 'string',
      default: ''
    },
    preferred_date2: {
      type: 'string',
      default: ''
    },
    preferred_date3:{
      type: 'string',
      default: ''
    },
    created_by: {
      type: 'string?',
      default: ''
    },
    created_date: {
      type: 'string?',
      default: ''
    },
    modified_by: {
      type: 'string?',
      default: ''
    },
    modified_date: {
      type: 'string',
      default: ''
    },
    vacant: {
      type: 'string',
      default: ''
    },
    replacement_reason: {
      type: 'string',
      default: ''
    },
    location_code: {
      type: 'string',
      default: ''
    },
    location_name: {
      type: 'string',
      default: ''
    },
    floor_number: {
      type: 'string',
      default: ''
    },
    yn_floor_seal:{
      type: 'string',
      default: ''
    },
    yn_posted: {
      type: 'string',
      default: ''
    },
    yn_occupied:{
      type: 'string',
      default: ''
    },
    yn_padding:{
      type: 'string?',
      default: ''
    },
    yn_threshold:{
      type: 'string',
      default: ''
    },
    yn_pet_treatment:{
      type: 'string',
      default: ''
    },
    yn_track_strip:{
      type: 'string',
      default: ''
    },
    requisition_number: {
      type: 'string?',
      default: ''
    },
    status: {
      type: 'string',
      default: ''
    },
    error_message: {
      type: 'string?',
      default: ''
    },
    building_number: {
      type: 'string',
      default: ''
    },
    currency_code: {
      type: 'string',
      default: ''
    },
    supplier_id:{
      type: 'double',
      default:0
    },
    supplier_name: {
      type: 'string',
      default: ''
    },
    order_header_id: {
      type: 'double?',
      default: 0.0
    },
    order_number: {
      type: 'string?',
      default: ''
    },
    mobile_req_id: {
      type: 'double?',
      default: 0.0
    },
    req_line_id: {
      type: 'double?',
      default: 0.0
    },
    req_header_id: {
      type: 'double?',
      default: 0.0
    },
    service_type: {
      type: 'string',
      default: ''
    },
    line_location_code: {
      type: 'string',
      default: ''
    },
    loc_id: {
      type: 'double',
      default: 0.0
    },
    category_id: {
      type: 'double',
      default: 0.0
    },
    bpa_line_id: {
      type: 'double',
      default: 0.0
    },
    bpa_header_id: {
      type: 'double',
      default: 0.0
    },
    line_currency_code: {
      type: 'string',
      default: ''
    },
    uom: {
      type: 'string',
      default: ''
    },
    quantity: {
      type: 'double',
      default: 0.0
    },
    unit_cost: {
      type: 'double',
      default: 0.0
    },
    item_description: {
      type: 'string',
      default: ''
    },
    supplier_item: {
      type: 'string?',
      default: ''
    },
    worker_id: {
      type: 'double',
      default: 0.0
    },
    usage_type: {
      type: 'string',
      default: ''
    },
    line_yn_posted: {
      type: 'string',
      default: ''
    },
    entity_id: {
      type: 'double',
      default: 0.0
    },
    attribute_id: {
      type: 'double?',
      default: 0.0
    },
    item_task: {
      type: 'string',
      default: ''
    },
    attribute_name: {
      type: 'string',
      default: ''
    },
    amount_price: {
      type: 'double',
      default: 0.0
    },
    submitted_at: {
      type: 'date?'
    },
    additional_information: {
      type: 'string?',
      default: ""
    },
    local_status:{
      type: 'string',
      default:''
    },
    material: {
      type: 'string',
      default:''
    },
    pet_bpa_line_id: {
      type: 'double',
      default: 0.0
    },
    pet_bpa_qty:{
      type: 'double',
      default: 0.0
    },
    local_id:{
      type: 'string',
      default:''
    },
    submittedAt:{
      type: 'date?'
    }
  }
};

class CreateRequisition extends Realm.Object {}
CreateRequisition.schema = {
  name: 'CreateRequisition',
  properties: {
    id: { type: 'string' },
    local_id: {type: 'string',  default: ''},
    additional_information: { type: 'string', default: '' },
    bu_id: { type: 'string', default: '' },
    building_number: { type: 'string', default: '' },
    create_by: { type: 'string', default: '' },
    created_date: { type: 'string', default: '' },
    currency_code: { type: 'string', default: '' },
    entity_id: { type: 'double', default: 0 },
    error_message: { type: 'string', default: '' },
    floor_number: { type: 'string', default: '' },
    loc_id: { type: 'double', default: 0 },
    local_status: { type: 'string', default: '' },
    location_code: { type: 'string', default: '' },
    location_name: { type: 'string', default: '' },
    mobile_req_id: { type: 'double', default: 0 },
    modified_by: { type: 'string', default: '' },
    modified_date: { type: 'string', default: '' },
    order_header_id: { type: 'double', default: 0 },
    order_number: { type: 'string', default: '' },
    preferred_date1: { type: 'string', default: '' },
    preferred_date2: { type: 'string', default: '' },
    preferred_date3: { type: 'string', default: '' },
    replacement_reason: { type: 'string', default: '' },
    request_id: { type: 'double', default: 0 },
    requisition_number: { type: 'string', default: '' },
    status: { type: 'string', default: '' },
    submittedAt: { type: 'date' },
    supplier_id: { type: 'double', default: 0},
    supplier_name: { type: 'string', default: '' },
    unit_id: { type: 'double', default: 0},
    unit_name: { type: 'string', default: '' },
    vacant: { type: 'string', default: '' },
    yn_floor_seal: { type: 'string', default: '' },
    yn_occupied: { type: 'string', default: '' },
    yn_padding: { type: 'string', default: '' },
    yn_posted: { type: 'string', default: '' },
    yn_threshold: { type: 'string', default: '' },
    yn_track_strip: { type: 'string', default: '' },
    attribute_id: {type: 'double', default: 0.0},
    material: { type: 'string', default: '' },
    bpa_line_id: { type: 'double', default: 0.0 },
    usage_type: {type: 'string', default: ''},
    pet_bpa_line_id: { type: 'double', default: 0.0, optional: true },
    pet_bpa_qty: { type: 'double', default: 0.0, optional: true }
  }
};

class ChangePoLine extends Realm.Object {}
ChangePoLine.schema = {
  name: 'ChangePoLine',
  properties: {
    id: {
      type: 'string',
    },
    attribute_id: {
      type: 'double',
      default: 0
    },
    bpa_id: {
      type: 'double',
      default: 0
    },
    bpa_line_id: {
      type: 'double',
      default: 0
    },
    currency: {
      type: 'string',
      default: ''
    },
    item_desc: {
      type: 'string',
      default: ''
    },
    loc_id: {
      type: 'double',
      default: 0
    },
    material: {
      type: 'string',
      default: ''
    },
    name: {
      type: 'string',
      default: ''
    },
    order_id: {
      type: 'double',
      default: 0
    },
    quantity: {
      type: 'string',
      default: ''
    },
    req_id: {
      type: 'double',
      default: 0
    },
    submitStatus: {
      type: 'string',
      default: ''
    },
    unit_cost: {
      type: 'double',
      default: 0
    },
    unit_id: {
      type: 'double',
      default: 0
    },
    uom: {
      type: 'string',
      default: ''
    },
    usage_type: {
      type: 'string',
      default: ''
    },
  }
};

// GRN Schema
//===========

class PurchaseOrder extends Realm.Object {}
PurchaseOrder.schema = {
  name: 'PurchaseOrder',
  //schemaVersion: 0,
  properties: {
    order_number: {
      type: 'string',
      default: ''
    },
    order_line_number: {
      type: 'int',
      default: 0
    },
    distribution_number: {
      type: 'int',
      default: 0
    },
    supplier_name: {
      type: 'string',
      default: ''
    },
    supplier_number: {
      type: 'string',
      default: ''
    },
    location_id: {
      type: 'double',
      default: 0.0
    },
    location_code: {
      type: 'string',
      default: ''
    },
    header_status: {
      type: 'string',
      default: ''
    },
    line_status: {
      type: 'string?',
      default: ''
    },
    item_description: {
      type: 'string',
      default: ''
    },
    unit_of_measure: {
      type: 'string',
      default: ''
    },
    quantity_ordered: {
      type: 'double',
      default: 0.0
    },
    quantity_available_to_receive: {
      type: 'double',
      default: 0.0
    },
    bu_name: {
      type: 'string',
      default: ''
    },
    delivery_date: {
      type: 'string',
      default: ''
    },
    deliver_to_person: {
      type: 'string',
      default: ''
    },
    to_organization_id: {
      type: 'double',
      default: 0.0
    },
    to_organization: {
      type: 'string',
      default: ''
    },
    requestor_name: {
      type: 'string',
      default: ''
    },
    edited: {
      type: 'bool?',
      default: false
    },
    submitStatus: {
      type: 'string?',
      default: ''
    },
    submittedTime: {
      type: 'date?',
    },
    quantity_received: {
      type: 'double?',
      default: 0.0
    },
    comments:{
      type:'string?',
      default:''
    },
    photoURL: {
      type: 'string?',

    },
  }
};


class UpdatedPurchaseOrder extends Realm.Object {}
UpdatedPurchaseOrder.schema = {
  name: 'PurchaseOrder',
  schemaVersion: 1,
  properties: {
    order_number: {
      type: 'string',
      default: ''
    },
    order_line_number: {
      type: 'int',
      default: 0
    },
    distribution_number: {
      type: 'int',
      default: 0
    },
    supplier_name: {
      type: 'string',
      default: ''
    },
    supplier_number: {
      type: 'string',
      default: ''
    },
    location_id: {
      type: 'double',
      default: 0.0
    },
    location_code: {
      type: 'string',
      default: ''
    },
    header_status: {
      type: 'string',
      default: ''
    },
    line_status: {
      type: 'string?',
      default: ''
    },
    item_description: {
      type: 'string',
      default: ''
    },
    unit_of_measure: {
      type: 'string',
      default: ''
    },
    quantity_ordered: {
      type: 'double',
      default: 0.0
    },
    quantity_available_to_receive: {
      type: 'double',
      default: 0.0
    },
    bu_name: {
      type: 'string',
      default: ''
    },
   /* delivery_date: {
      type: 'string',
      default: ''
    },*/
    /*deliver_to_person: {
      type: 'string',
      default: ''
    },*/
    to_organization_id: {
      type: 'double',
      default: 0.0
    },
    to_organization: {
      type: 'string',
      default: ''
    },
    requestor_name: {
      type: 'string',
      default: ''
    },
    edited: {
      type: 'bool?',
      default: false
    },
    submitStatus: {
      type: 'string?',
      default: ''
    },
    submittedTime: {
      type: 'date?',
    },
    quantity_received: {
      type: 'double?',
      default: 0.0
    },
    comments:{
      type:'string?',
      default:''
    },
    photoURL: {
      type: 'string?',

    },
  }
};


class UpdatedPurchaseOrder1 extends Realm.Object {}
UpdatedPurchaseOrder1.schema = {
  name: 'PurchaseOrder',
  schemaVersion: 2,
  properties: {
    order_number: {
      type: 'string',
      default: ''
    },
    order_line_number: {
      type: 'int',
      default: 0
    },
    distribution_number: {
      type: 'int',
      default: 0
    },
    supplier_name: {
      type: 'string',
      default: ''
    },
    supplier_number: {
      type: 'string',
      default: ''
    },
    location_id: {
      type: 'double',
      default: 0.0
    },
    location_code: {
      type: 'string',
      default: ''
    },
    header_status: {
      type: 'string',
      default: ''
    },
    line_status: {
      type: 'string?',
      default: ''
    },
    item_description: {
      type: 'string',
      default: ''
    },
    unit_of_measure: {
      type: 'string',
      default: ''
    },
    quantity_ordered: {
      type: 'double',
      default: 0.0
    },
    quantity_available_to_receive: {
      type: 'double',
      default: 0.0
    },
    bu_name: {
      type: 'string',
      default: ''
    },
 

    to_organization_id: {
      type: 'double',
      default: 0.0
    },
    to_organization: {
      type: 'string',
      default: ''
    },
    requestor_name: {
      type: 'string',
      default: ''
    },
    edited: {
      type: 'bool?',
      default: false
    },
    submitStatus: {
      type: 'string?',
      default: ''
    },
    submittedTime: {
      type: 'date?',
    },
    quantity_received: {
      type: 'double?',
      default: 0.0
    },
    comments:{
      type:'string?',
      default:''
    },
    photoURL: {
      type: 'string?',

    },
  }
};




class UpdatedPurchaseOrder2 extends Realm.Object {}
UpdatedPurchaseOrder2.schema = {
  name: 'PurchaseOrder',
  schemaVersion: 3,
  properties: {
    order_number: {
      type: 'string',
      default: ''
    },
    order_line_number: {
      type: 'int',
      default: 0
    },
    distribution_number: {
      type: 'int',
      default: 0
    },
    supplier_name: {
      type: 'string',
      default: ''
    },
    supplier_number: {
      type: 'string',
      default: ''
    },
    location_id: {
      type: 'double',
      default: 0.0
    },
    location_code: {
      type: 'string',
      default: ''
    },
    header_status: {
      type: 'string',
      default: ''
    },
    line_status: {
      type: 'string?',
      default: ''
    },
    item_description: {
      type: 'string',
      default: ''
    },
    unit_of_measure: {
      type: 'string',
      default: ''
    },
    quantity_ordered: {
      type: 'double',
      default: 0.0
    },
    quantity_available_to_receive: {
      type: 'double',
      default: 0.0
    },
    bu_name: {
      type: 'string',
      default: ''
    },
 

    to_organization_id: {
      type: 'double',
      default: 0.0
    },
    to_organization: {
      type: 'string',
      default: ''
    },
    /*requestor_name: {
      type: 'string',
      default: ''
    },*/
    edited: {
      type: 'bool?',
      default: false
    },
    submitStatus: {
      type: 'string?',
      default: ''
    },
    submittedTime: {
      type: 'date?',
    },
    quantity_received: {
      type: 'double?',
      default: 0.0
    },
    comments:{
      type:'string?',
      default:''
    },
    photoURL: {
      type: 'string?',

    },
  }
};

/*Realm.open({
  schema: [PurchaseOrder.schema],
  schemaVersion: 1,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 1){
      const oldObjects = oldRealm.objects(delivery_date);
    }
  }
})*/



class ChangeReceipt extends Realm.Object {}
ChangeReceipt.schema = {
  name: 'ChangeReceipt',
  properties: {
    id: {
      type: 'string',
      default: ''
    },
    comments: {
      type: 'string',
      default: ''
    },
    deliver_tran_id: {
      type: 'double',
      default: 0.0
    },
    file_id: {
      type: 'double',
      default: 0.0
    },
    item_description: {
      type: 'string',
      default: ''
    },
    item_number: {
      type: 'string',
      default: ''
    },
    order_line_number: {
      type: 'double',
      default: 0.0
    },
    order_number: {
      type: 'string',
      default: ''
    },
    photoURL: {
      type: 'string',
      default: ''
    },
    quantity: {
      type: 'double',
      default: 0.0
    },
    receipt_num: {
      type: 'string',
      default: ''
    },
    receipt_tran_id: {
      type: 'double',
      default: 0.0
    },
    to_organization: {
      type: 'string',
      default: ''
    },
    type: {
      type: 'string',
      default: ''
    },
    unit_of_measure: {
      type: 'string',
      default: ''
    }
  }
};



class ChangeReceipt1 extends Realm.Object {}
ChangeReceipt1.schema = {
  name: 'ChangeReceipt',
  schemaVersion: 1,
  properties: {
    id: {
      type: 'string',
      default: ''
    },
    comments: {
      type: 'string',
      default: ''
    },
    deliver_tran_id: {
      type: 'double',
      default: 0.0
    },
    file_id: {
      type: 'double',
      default: 0.0
    },
    item_description: {
      type: 'string',
      default: ''
    },
    item_number: {
      type: 'string',
      default: ''
    },
    order_line_number: {
      type: 'double',
      default: 0.0
    },
    order_number: {
      type: 'string',
      default: ''
    },
    photoURL: {
      type: 'string',
      default: ''
    },
    quantity: {
      type: 'double',
      default: 0.0
    },
    receipt_num: {
      type: 'string',
      default: ''
    },
    receive_tran_id: {
      type: 'double',
      default: 0.0
    },
    to_organization: {
      type: 'string',
      default: ''
    },
    type: {
      type: 'string',
      default: ''
    },
    unit_of_measure: {
      type: 'string',
      default: ''
    }
  }
};


class RejectReceipt extends Realm.Object {}
RejectReceipt.schema = {
  name: 'RejectReceipt',
  properties: {
    id: {
      type: 'string',
      default: ''
    },
    comments: {
      type: 'string',
      default: ''
    },
    deliver_tran_id: {
      type: 'double',
      default: 0.0
    },
    file_id: {
      type: 'double',
      default: 0.0
    },
    item_description: {
      type: 'string',
      default: ''
    },
    item_number: {
      type: 'string',
      default: ''
    },
    order_line_number: {
      type: 'double',
      default: 0.0
    },
    order_number: {
      type: 'string',
      default: ''
    },
    photoURL: {
      type: 'string',
      default: ''
    },
    quantity: {
      type: 'double',
      default: 0.0
    },
    receipt_num: {
      type: 'string',
      default: ''
    },
    receipt_tran_id: {
      type: 'double',
      default: 0.0
    },
    to_organization: {
      type: 'string',
      default: ''
    },
    type: {
      type: 'string',
      default: ''
    },
    unit_of_measure: {
      type: 'string',
      default: ''
    }
  }
};

class CreateReceipt extends Realm.Object {}
CreateReceipt.schema = {
  name: 'CreateReceipt',
  properties: {
    id: {
      type: 'string',
      default: ''
    },
    comments: {
      type: 'string',
      default: ''
    },
    desc: {
      type: 'string',
      default: ''
    },
    edited: {
      type: 'bool',
      default: false
    },
    file_id: {
      type: 'double',
      default: 0.0
    },
    item_no: {
      type: 'string',
      default: ''
    },
    open_quantity: {
      type: 'double',
      default: 0.0
    },
    order_line_number: {
      type: 'double',
      default: 0.0
    },
    order_number: {
      type: 'string',
      default: ''
    },
    ordered_quantity: {
      type: 'double',
      default: 0.0
    },
    photoURL: {
      type: 'string',
      default: ''
    },
    quantity: {
      type: 'double',
      default: 0.0
    },
    submittedStatus: {
      type: 'string',
      default: ''
    },
    submittedTime: {
      type: 'date',
      default: null
    },
    to_organization:{
      type: 'string',
      default: ''
    },
    to_organization_id: {
      type: 'double',
      default: 0.0
    },
    type: {
      type: 'string',
      default: ''
    },
    unit_of_measure: {
      type: 'string',
      default: ''
    },
    distribution_number: {
      type: 'int',
      default: ''
    },
  }
};

class Receipt extends Realm.Object {}
Receipt.schema = {
  name: 'Receipt',
  properties: {
    order_number: {
      type: 'string',
      default: ''
    },
    order_line_number: {
      type: 'int',
      default: 0
    },
    receipt_num: {
      type: 'string',
      default: ''
    },
    item_description: {
      type: 'string',
      default: ''
    },
    unit_of_measure: {
      type: 'string',
      default: ''
    },
    quantity: {
      type: 'double',
      default: 0.0
    },
    to_organization: {
      type: 'string',
      default: ''
    },
    deliver_tran_id: {
      type: 'double',
      default: 0.0
    },
    receive_tran_id: {
      type: 'double',
      default: 0.0
    },
    receipt_quantity:{
      type:'double',
      default:0.0
    },
    photoURL:{
      type: 'string',
      default:''
    },
    comment:{
      type:'string',
      default:''
    },
    submitStatus:{
      type:'string',
      default:''
    },
    changedQuantity:{
      type:'double',
      default:0.0
    },
    submittedTime:{
      type: 'date?'
    },
  }
};

export default new Realm({
  schema: [
    ReqHeaderLine,
    CreateRequisition,
    ChangePoLine,
    Property,
    Entity,
    EntityAttribute,
    Supplier,
    MaterialCategory,
    PetTreatment,
    BPADetail,
    Category,
    MaterialType,
    CategoryConfig,
    RejectReason,
    ReplaceReason,
    UsageType,
    PurchaseOrder,
    ChangeReceipt,
    RejectReceipt,
    CreateReceipt,
    Receipt
  ]
});
