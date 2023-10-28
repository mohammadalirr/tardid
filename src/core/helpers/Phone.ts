import parsePhoneNumber from 'libphonenumber-js'
import _ from 'lodash'

/**
 * 
 * @param phone 
 * @returns 
 */
function formatPhone(phone?: string | null) {
  if (!_.isEmpty(phone)) {
    const mobile = parsePhoneNumber(String(phone))
    return mobile?.formatInternational()
  }

  return '-'
}

export default formatPhone
