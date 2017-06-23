import { List, Record } from 'immutable'

import * as Utils from './utils'

const verifyValue = (value) => {
  return Utils.isArray(value) ? List(value) : value
}

const create = (NAME = null, FIELDS) => {
  FIELDS = Utils.isArray(FIELDS) ? FIELDS.reduce((acc, field) => {
    acc[field] = undefined
    return acc
  }, {}) : FIELDS
  if (!NAME || !FIELDS) {
    throw new Error('IllegalArgumemntsException: NAME and FIELDS are required for redux-persist-model')
  }

  const Base = Record({
    __MODEL__: NAME,
    ...FIELDS
  }, NAME)

  class Model extends Base {

    static NAME = NAME

    static FIELDS = FIELDS

    constructor(data) {
      super(data)
    }

    get(key, defaultValue) {
      let result = super.get(key, defaultValue) || defaultValue || FIELDS[key]
      result = verifyValue(result)
      return result
    }
  }
  return Model
}

export default { create }
