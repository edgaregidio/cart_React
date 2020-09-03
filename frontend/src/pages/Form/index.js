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
          }}
          render={({ values, isValid }) => (
            <Form>
              <div className='card-form-content'>
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
                  <Field name='email' type='text' />
                  <ErrorMessage name='cpf' />
                </div>
                <div className='form-fields' >
                  <label>E-mail</label>
                  <Field name='email' type='email' />
                  <ErrorMessage name='email' />
                </div>
                <button type='submit' disabled={!isValid}>Enviar</button>
              </div>
            </Form>
          )}
        />
      </div>
    </div>
  );
}