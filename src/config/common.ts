import { e2p } from "~/utils/common";
import dayjs from '~/config/date';

function addDash (attr: string) {
  while (attr.indexOf('-') > 0) { // - is in the attribute name, but is not the first character either
    var afterDash = attr.substring(attr.indexOf('-') + 1)
    afterDash = afterDash.substring(0, 1).toUpperCase() + afterDash.substring(1)
    attr = attr.substring(0, attr.indexOf('-')) + afterDash
  }
  return attr
}

export const styleString = (style: any) => {
  return Object.entries(style).map(([k, v]) => `${insertSpaces(k).replace(' ', '-').toLowerCase()}:${v}`).join('; ')
};

export function styleToJson (str: string, opts: any={}) {
    if (typeof str !== 'string') {
      throw new TypeError('Expected a string')
    }
    opts = opts || {}
    var obj: any = {}
  
    str.split(';').forEach(function (string) {
      if (string !== '') {
        var attr = string.split(':')
        let attrName: any;
        if (attr.length > 2) {
          attrName = attr.shift()
          attrName = addDash(attrName)?.trim()
          obj[attrName] = attr.join(':')
        } else {
          attrName = addDash(attr[0])?.trim()
          obj[attrName] = attr[1].trim()
        }
      }
    })
    if (opts.stringify) {
      return JSON.stringify(obj)
    } else {
      return obj
    }
}

export const UUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'?.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
  

export function insertSpaces(string: string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return string[0].toUpperCase() + string.slice(1);
}

export const ch = (hexCode: string, opacity: number) => {
  if (!hexCode) return ''
  let hex = hexCode?.replace('#', '');
  if (hex.length === 3) {
      hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
}

export const jdate = (date: any = new Date(), format = 'YYYY/MM/DD') => {
  return e2p(dayjs(date).calendar('jalali').locale('fa').format(format));
};