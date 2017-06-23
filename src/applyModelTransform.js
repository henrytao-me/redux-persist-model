import { Record } from 'immutable'
import { createTransform } from 'redux-persist'

import * as Utils from './utils'

const verifyModelData = (data) => {
  return !(data instanceof Record) && Utils.isObject(data) && !!data.__MODEL__
}

const verifyModelInstance = (inst) => {
  return inst instanceof Record && !!inst.__MODEL__
}

// transform state coming from redux on its way to being serialized and stored
const serialize = (models, inboundState) => {
  if (Utils.isArray(inboundState)) {
    inboundState = inboundState.map(state => serialize(models, state))
  } else if (verifyModelInstance(inboundState) && !!models[inboundState.__MODEL__]) {
    inboundState = inboundState.toJS()
  } else if (Utils.isObject(inboundState)) {
    inboundState = Object.keys(inboundState).reduce((acc, key) => {
      acc[key] = serialize(models, inboundState[key])
      return acc
    }, {})
  }
  return inboundState
}

// transform state coming from storage, on its way to be rehydrated into redux
const deserialize = (models, outboundState) => {
  if (Utils.isArray(outboundState)) {
    outboundState = outboundState.map(state => deserialize(models, state))
  } else if (verifyModelData(outboundState) && !!models[outboundState.__MODEL__]) {
    outboundState = Object.keys(outboundState).reduce((acc, key) => {
      acc[key] = deserialize(models, outboundState[key])
      return acc
    }, {})
    const ModelClass = models[outboundState.__MODEL__]
    outboundState = new ModelClass(outboundState)
  } else if (Utils.isObject(outboundState)) {
    outboundState = Object.keys(outboundState).reduce((acc, key) => {
      acc[key] = deserialize(models, outboundState[key])
      return acc
    }, {})
  }
  return outboundState
}

export default (models = []) => {
  // verify Model.NAME
  models.forEach(model => {
    if (!model.NAME) {
      throw new Error('CreateModelTransform error: Model.NAME should be declared')
    }
  })

  // convert models to map
  models = models.reduce((acc, model) => {
    acc[model.NAME] = model
    return acc
  }, {})

  // create redux-persist transform
  return createTransform(
    (inboundState, key) => {
      const state = serialize(models, inboundState, key)
      // console.log('ssssssssssssss', key, state, inboundState)
      return state
    },
    (outboundState, key) => {
      const state = deserialize(models, outboundState, key)
      // console.log('dddddddddddddd', key, state, outboundState)
      return state
    }
  )
}
