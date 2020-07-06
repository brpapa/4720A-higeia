// TODO: https://ant.design/components/form/#components-form-demo-normal-login
// TODO: https://ant.design/components/result/
import React, { useState } from 'react'
import styled from 'styled-components'

import { TUser, TGender } from './../types'

// TODO
const Register = () => {
  const [user, setUser] = useState<TUser>('doctor')
  const [gender, setGender] = useState<TGender>('M')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      if (e.target.name === 'user')
        setUser(e.target.id === 'doctor' ? 'doctor' : 'patient')
      else if (e.target.name === 'gender')
        setGender(e.target.id === 'M' ? 'M' : 'F')
    }
  }
  async function handleSubmit() {}

  return (
    <Container>
      <h1 style={{ paddingTop: '20px', fontSize: '80px' }}>
        {/* {emojis[user][gender]} */}
      </h1>
      <Form>
        <h2>Quem é você?</h2>
        <label htmlFor='' className='form-label'>
          Usuário
        </label>
        <div className='input-group'>
          <FormCheck>
            <RadioInput
              name='user'
              id='doctor'
              checked={user === 'doctor'}
              onChange={handleChange}
            />
            <label className='form-check-label' htmlFor='doctor'>
              Doutor
            </label>
          </FormCheck>
          <FormCheck>
            <RadioInput
              name='user'
              id='patient'
              checked={user === 'patient'}
              onChange={handleChange}
            />
            <label className='form-check-label' htmlFor='patient'>
              Paciente
            </label>
          </FormCheck>
        </div>

        <label htmlFor='' className='form-label'>
          Gênero
        </label>
        <div className='input-group'>
          <FormCheck>
            <RadioInput
              name='gender'
              id='M'
              checked={gender === 'M'}
              onChange={handleChange}
            />
            <label className='form-check-label' htmlFor='M'>
              M
            </label>
          </FormCheck>
          <FormCheck>
            <RadioInput
              name='gender'
              id='F'
              checked={gender === 'F'}
              onChange={handleChange}
            />
            <label className='form-check-label' htmlFor='F'>
              F
            </label>
          </FormCheck>
        </div>

        <div className='col-md-6'>
          <label htmlFor='inputEmail4' className='form-label'>
            Email
          </label>
          <input type='email' className='form-control' id='inputEmail4' />
        </div>
        <div className='col-md-6'>
          <label htmlFor='inputPassword4' className='form-label'>
            Password
          </label>
          <input type='password' className='form-control' id='inputPassword4' />
        </div>
        <div className='col-12'>
          <label htmlFor='inputAddress' className='form-label'>
            Address
          </label>
          <input
            type='text'
            className='form-control'
            id='inputAddress'
            placeholder='1234 Main St'
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputAddress2' className='form-label'>
            Address 2
          </label>
          <input
            type='text'
            className='form-control'
            id='inputAddress2'
            placeholder='Apartment, studio, or floor'
          />
        </div>
        <div className='col-md-6'>
          <label htmlFor='inputCity' className='form-label'>
            City
          </label>
          <input type='text' className='form-control' id='inputCity' />
        </div>
        <div className='col-md-4'>
          <label htmlFor='inputState' className='form-label'>
            State
          </label>
          <select id='inputState' className='form-select'>
            <option selected>Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div className='col-md-2'>
          <label htmlFor='inputZip' className='form-label'>
            Zip
          </label>
          <input type='text' className='form-control' id='inputZip' />
        </div>
        <div className='col-12'>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              id='gridCheck'
            />
            <label className='form-check-label' htmlFor='gridCheck'>
              Check me out
            </label>
          </div>
        </div>
        <div className='col-12'>
          <button type='submit' className='btn btn-primary'>
            Sign in
          </button>
        </div>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Form = styled.form.attrs({ className: 'row g-3' })`
  width: 90%;
  padding: 15px;
  background-color: white;
  border-radius: 15px;
`
const FormCheck = styled.div.attrs({
  className: 'form-check form-check-inline',
})``
const RadioInput = styled.input.attrs({
  type: 'radio',
  className: 'form-check-input',
})``

export default Register
