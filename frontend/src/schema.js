import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string().min(3).required(),
  email: Yup.string().email().required(),
  cpf: Yup.string().min(7).required(),
  cep: Yup.string().min(8).required(),
  address: Yup.string().required(),
  district: Yup.string().required(),
  number: Yup.number().min(1).required(),
})