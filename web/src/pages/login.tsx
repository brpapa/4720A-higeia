// TODO: https://ant.design/components/form/#components-form-demo-normal-login
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import auth from '../auth'
import api, { addAuthHeader } from '../services/api'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [feedback, setFeedback] = useState('')
  const [remember, setRemember] = useState(true)

  const history = useHistory()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    addAuthHeader(username, password)

    try {
      const { data } = await api.get(`/login/${username}`)
      auth.login(remember, data.user, username, password)
      history.replace('/')
    } catch (err) {
      setFeedback(
        !err.response
          ? 'Não foi possível acessar o servidor.'
          : err.response.status === 401
            ? 'Usuário ou senha inválidos.'
            : 'Erro no servidor.'
      )
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

        <div className='form-check mb-2'>
          <input
            className='form-check-input'
            type='checkbox'
            id='remember-check'
            checked={remember}
            onChange={() => setRemember((prev) => !prev)}
          />
          <label className='form-check-label' htmlFor='remember-check'>
            Lembrar de mim
          </label>
        </div>

        {feedback !== '' && <p className='text-danger'>{feedback}</p>}

        <button type='submit' className='btn btn-lg btn-primary btn-block'>
          Entrar
        </button>
      </Form>
      <p>
        {'Ainda não possui cadastro? '}
        <Link className='link-primary' to='/register'>
          Registrar-se
        </Link>
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
  /* background-color: white; */
`
const Header = styled.h1`
  text-align: center;
  font-weight: 900;
  margin-bottom: 30px;
  font-size: 60px;
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



/*
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const NormalLoginForm = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

ReactDOM.render(<NormalLoginForm />, mountNode);
*/