import DB from "../DB/DB";

let DBPCStaticDataHelper = {
  // Static Data
  //---------
  async saveStaticData(values) {
    console.tron.log("Hit DB save data");

    DB.write(() => {
      const properties = DB.objects("Property");
      if (properties != null) {
        DB.delete(properties);
      }

      values.map((value) => {
        const property = DB.create("Property", {
          location_id: value.LOCATION_ID,
          location_name: value.LOCATION_NAME
        });

        // loop through for Entity
        for (let i = 0; i < value.ENTITY.length; i++) {
          let entity = value.ENTITY[i];

          property.entity.push({
            building_number: entity.BUILDING_NUMBER,
            unit_name: entity.UNIT_NAME,
            unit_id: entity.UNIT_ID
          });

          // loop through for Entity Attribute
          entity.ENTITY_ATTRIBUTES.map((entityAttribute) => {
            property.entity[i].entity_attributes.push({
              id: entityAttribute.ID,
              entity_id: entityAttribute.ENTITY_ID,
              type: entityAttribute.TYPE,
              uom: entityAttribute.UOM,
              overall_quantity: entityAttribute.OVERALL_QUANTITY,
              net_quantity: entityAttribute.NET_QUANTITY,
              name: entityAttribute.NAME
            });
          })
        }

        // loop through for Supplier
        for (let i = 0; i < value.SUPPLIER.length; i++) {
          let supplier = value.SUPPLIER[i];

          property.supplier.push({
            supplier_id: supplier.SUPPLIER_ID,
            supplier_name: supplier.SUPPLIER_NAME,
          });



          // loop through got BPA_DETAIL
          for (let b = 0; b < supplier.BPA_DETAIL.length; b++){
            let bpaDetail = supplier.BPA_DETAIL[b];
            property.supplier[i].bpa_detail.push({
              item_description: bpaDetail.ITEM_DESCRIPTION,
              bpa_header_id: bpaDetail.BPA_HEADER_ID,
              bpa_line_id: bpaDetail.BPA_LINE_ID,
              uom: bpaDetail.UOM,
              unit_cost: bpaDetail.UNIT_COST,
              currency_code: bpaDetail.CURRENCY_CODE,
              category_type: bpaDetail.CATEGORY_TYPE,
              category_id: bpaDetail.CATEGORY_ID

            });
          }


          // loop through for Material Category
          for (let j = 0; j < supplier.MATERIAL_CATEGORY.length; j++) {
            let materialCategory = supplier.MATERIAL_CATEGORY[j];

            property.supplier[i].material_category.push({
              type: materialCategory.TYPE
            });

            // loop through for Category
            materialCategory.CATEGORY.map((category) => {
              property.supplier[i].material_category[j].category.push({
                item_description: category.ITEM_DESCRIPTION,
                bpa_line_id: category.BPA_LINE_ID,
                currency_code: category.CURRENCY_CODE,
                unit_cost: category.UNIT_COST
              });
            })
          }

          // loop through for Pet Treatment
          for (let j = 0; j < supplier.PET_TREATMENT.length; j++) {
            let petTreatment = supplier.PET_TREATMENT[j];

            property.supplier[i].pet_treatment.push({
              item_description: petTreatment.ITEM_DESCRIPTION,
              bpa_header_id: petTreatment.BPA_HEADER_ID,
              bpa_line_id: petTreatment.BPA_LINE_ID,
              currency_code: petTreatment.CURRENCY_CODE,
              unit_cost: petTreatment.UNIT_COST,
              uom: petTreatment.UOM,
            });
          }
        }

        // loop through for Material Type
        value.MATERIAL_TYPE.map((materialType) => {
          property.material_type.push({
            type: materialType.TYPE
          });
        })

        // loop through for Category Config
        value.CATEGORY_CONFIG.map((categoryConfig) => {
          property.category_config.push({
            id: categoryConfig.ID,
            category_id: categoryConfig.CATEGORY_ID,
            material_type: categoryConfig.MATERIAL_TYPE,
            category_type: categoryConfig.CATEGORY_TYPE,
          });
        })

        // loop through for Reject Reason
        value.REJECT_REASON.map((rejectReason) => {
          property.reject_reason.push({
            lookup_type: rejectReason.LOOKUP_TYPE,
            code: rejectReason.CODE,
            value: rejectReason.VALUE,
          });
        })

      })
    });
  },

  async saveRejectReasons(values) {
    console.tron.log("Hit DB save data");

    DB.write(() => {
      const rejectReasons = DB.objects("RejectReason");
      if (rejectReasons != null) {
        DB.delete(rejectReasons);
      }

      values.map((value) => {
        DB.create("RejectReason", {
          type: value.value
        });
      })
    });

    const dbRejectReasons = DB.objects("UsageType");
    console.tron.log("Db Reject Reasons: ", dbRejectReasons);
  },

  async saveReplaceReasons(values) {
    console.tron.log("Hit DB save data", values);
    try {
      DB.write(() => {
        const replaceReasons = DB.objects("ReplaceReason");
        if (replaceReasons != null) {
          DB.delete(replaceReasons);
        }

        values.map((value) => {
          DB.create("ReplaceReason", {
            reason: value.reason
          });
        });
      });

      const dbReplaceReasons = DB.objects("ReplaceReason");
      console.tron.log("Db replace reasons: ", dbReplaceReasons);
    } catch (e) {
      console.tron.log("Realm exception", e.message);
    }
  },

  async saveUsageTypes(values) {
    console.tron.log("Hit DB save data");

    DB.write(() => {
      const usageTypes = DB.objects("UsageType");
      if (usageTypes != null) {
        DB.delete(usageTypes);
      }

      values.map((value) => {
        DB.create("UsageType", {
          type: value.type
        });
      })
    });

    const dbUsageTypes = DB.objects("UsageType");
    console.tron.log("Db usage types: ", dbUsageTypes);
  },

  async getReplaceReasons() {
    const dbReplaceReasons = DB.objects("ReplaceReason");
    console.tron.log("Db replace reasons: ", dbReplaceReasons);
    return dbReplaceReasons;
  },

  async getUsageTypes() {
    const dbUsageTypes = DB.objects("UsageType");
    console.tron.log("Db usage types: ", dbUsageTypes);
    return dbUsageTypes;
  },

  async getRejectReasons() {
    const dbRejectReasons = DB.objects("RejectReason").filtered(`TRUEPREDICATE SORT(value ASC)DISTINCT(value)`);
    console.tron.log("Db reject reasons: ", dbRejectReasons);
    return dbRejectReasons;
  },

  async getProperties() {
    const dbProperties = DB.objects("Property");
    console.tron.log("Db properties: ", dbProperties);
    return dbProperties;
  },

  async getBuildings(property) {
    const dbBuildings = property.entity.filtered(
      `TRUEPREDICATE SORT(building_number ASC) DISTINCT(building_number)`
    );
    console.tron.log("Db buildings: ", dbBuildings);
    return dbBuildings;
  },

  async getUnits(property) {
    const dbUnits = property.entity.filtered(
      `TRUEPREDICATE SORT(unit_name ASC) DISTINCT(unit_id)`
    );
    console.tron.log("Db entities: ", dbUnits);
    return dbUnits;
  },

  async getProperty(locationName) {
    console.tron.log("Location name: ", locationName);

    const dbProperty = DB.objects("Property").filtered(
      `location_name = $0`,
      locationName
    )[0];
    console.tron.log("Db Property: ", dbProperty);
    return dbProperty;
  },

  async getSupplier(property, supplierName) {
    const dbSupplier = property.supplier.filtered(
      `supplier_name = $0`,
      supplierName
    )[0];
    console.tron.log("Db supplier: ", dbSupplier);
    return dbSupplier;
  },

  async getUnit(property, unitID) {
    console.tron.log(unitID);
    const dbUnit = property.entity.filtered(`unit_name = $0`, unitID)[0];
    console.tron.log("Db unit: ", dbUnit);
    return dbUnit;
  },

  async getSuppliers(property) {
    const dbSuppliers = property.supplier.filtered(
      `TRUEPREDICATE SORT(supplier_name ASC)`
    );
    console.tron.log("Db suppliers: ", dbSuppliers);
    return dbSuppliers;
  },

  async getCategories(materialType) {
    const dbCategories = materialType.category.filtered(
      `TRUEPREDICATE SORT(item_description ASC) DISTINCT(item_description)`
    );
    console.tron.log("Db categories: ", dbCategories);
    return dbCategories;
  },

// for change order
  async getBpaDetails(supplier, selectedtype){
    const dbBpaDetails = supplier.bpa_detail.filtered(`category_type = $0`, selectedtype)
    return dbBpaDetails;
  },

  async getMaterial(bpaDetails, selectedType){
    const dbBpaDetails = bpaDetails.filtered(`category_type = $0`, selectedType)
    return dbBpaDetails;
  },


  async getAllCategories() {
    const dbCategories = DB.objects("Category");
    console.tron.log("Db categories: ", dbCategories);
    return dbCategories;
  }
};

module.exports = DBPCStaticDataHelper;
