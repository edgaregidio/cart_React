import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'

import Header from '../../Components/Header'
import schema from '../../schema'
import './styles.css'

export default function Cart() {

  function onSubmit(values) {
    console.log('SUBMIT', values)
  }

  return (

    <div>
      <Header />
      <div className='card-form'>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmit}
          initialValues={{
            name: '',
            email: '',
            cpf: '',
            cep: '',
            address: '',
            district: '',
            number: ''
          }}
          render={({ values, isValid }) => (
            <Form>



              <div className='card-form-content'>
                <div className='result-products'>
                  <div>
                    <h1>Valor total</h1>
                    <h1>R$ 4000,00</h1>
                  </div>

                  <div>
                    <h1>Total de itens</h1>
                    <h1>4</h1>
                  </div>

                </div>
                <div className='form-fields'>
                  <label>Nome</label>
                  <Field name='name' type='text' />
                  <ErrorMessage name='name' />
                </div>

                <div className='form-fields' >
                  <label>E-mail</label>
                  <Field name='email' type='email' />
                  <ErrorMessage name='email' />
                </div>

                <div className='form-fields' >
                  <label>CPF</label>
                  <Field name='cpf' type='text' />
                  <ErrorMessage name='cpf' />
                </div>

                <div className='form-address'>
                  <div className='form-fields' >
                    <label>CEP</label>
                    <Field name='cep' type='numero' />
                    <ErrorMessage name='cep' />
                  </div>
                  <div className='form-fields' >
                    <label>Rua</label>
                    <Field name='address' type='text' />
                    <ErrorMessage name='address' />
                  </div>
                </div>

                <div className='form-address'>
                  <div className='form-fields' >
                    <label>Bairro</label>
                    <Field name='district' type='text' />
                    <ErrorMessage name='district' />
                  </div>
                  <div className='form-fields'>
                    <label>Número</label>
                    <Field name='number' type='numero' />
                    <ErrorMessage name='number' />
                  </div>

                </div>
                <button type='submit' disabled={!isValid}>Cadastrar</button>
              </div>
            </Form>
          )}
        />
      </div>
    </div>
  );
}