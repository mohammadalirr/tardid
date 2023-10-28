import * as yup from 'yup'

const create = yup
  .object({
  })
  .required()

const update = yup
  .object({
  })
  .required()

const activityAreaSchema = { create, update }

export default activityAreaSchema
