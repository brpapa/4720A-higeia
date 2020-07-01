import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import auth from '../auth'
import api from '../services/api'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    api.defaults.auth = { username, password }

    try {
      const res = await api.get('/login')
      
      // TODO
      if (res.status === 202) { // accepted
      
      } else { // unauthorized
      
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Header>Higeia</Header>

        <label htmlFor='input-username' className='sr-only'>
          Username
        </label>
        <TextInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id='input-username'
          placeholder='Username'
          required
          autoFocus
        />
        <label htmlFor='input-password' className='sr-only'>
          Senha
        </label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id='input-password'
          placeholder='Senha'
          required
        />
        <button type='submit' className='btn btn-lg btn-primary btn-block'>
          Entrar
        </button>
      </Form>
      <p>
        {'Ainda não possui cadastro? '}
        <Link to='/register'>Registrar-se</Link>
      </p>
      <p className='mt-5 mb-3 text-muted'>&copy; 2020</p>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Form = styled.form`
  max-width: 330px;
  width: 100%;
  padding: 15px;
`
const Header = styled.h1`
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
`

const Input = styled.input.attrs({ className: 'form-control' })`
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;

  &:focus {
    z-index: 2;
  }
`
const TextInput = styled(Input).attrs({ type: 'text' })`
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
`
const PasswordInput = styled(Input).attrs({ type: 'password' })`
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`

export default Login
