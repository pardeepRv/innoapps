/**
 * Created by dpcui on 27/06/2017.
 */

const workbenchData = [
  {
    header: {
      title: 'Bedroom Closet1',
      area: '26.0 SQFT',
      selected : false,
    },
    member:
      {
        type: 'Carpet',
        material: 'Secret Weapon - Linen Canvas',
        usageType: 'Capex',
        pad: 'YES',
        threshold: 'YES',

      }
  },
  {
    header: {
      title: 'empty Member1',
      area: '24.0 SQFT',
      selected : false,
    }
  },
  {
    header: {
      title: 'Bedroom1',
      area: '24.0 SQFT',
      selected : true,
    },
    member:
      {
        type: 'Carpet',
        material: 'Secret Weapon - Linen Canvas',
        usageType: 'Capex',
        pad: 'YES',
        threshold: 'YES',
      }
  }
  ,
  {
    header: {
      title: 'empty Member',
      area: '24.0 SQFT',
      selected : true,
    }
  }
];

export default {
  workbenchData,
};
