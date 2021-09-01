// Simple React Native specific changes

import '../I18n/I18n'

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  //5 min
  submitThreshold: 5 * 60 * 1000,
}
