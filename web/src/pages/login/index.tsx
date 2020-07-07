import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './styles.scss'
import auth from '../../auth'
import api, { addAuthHeader } from '../../services/api'

export default () => {
  const history = useHistory()

  async function handleSubmit({ username, password, remember }: any) {
    addAuthHeader(username, password)
    message.loading({ content: 'Carregando...', key: 'msg' })

    api
      .get(`/login/${username}`)
      .then(({ data }: any) => {
        message.success({ content: 'Logado com sucesso!', key: 'msg' })
        auth.login(remember, data.user, username, password)
        history.replace('/')
      })
      .catch((err) => {
        message.error({
          content: !err.response
            ? 'Erro ao se conectar com o servidor!'
            : err.response.status === 401
              ? 'Usuário ou senha inválidos!'
              : 'Erro interno no servidor!',
          key: 'msg',
        })
      })
  }

  return (
    <div className='container'>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
      >
        <h1 style={{ textAlign: 'center' }}>Higeia</h1>
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: 'Por favor, digite seu username!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Por favor, digite sua senha!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
            type='password'
            placeholder='Senha'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Lembrar de mim</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            block
            htmlType='submit'
            className='login-form-button'
          >
            Entrar
          </Button>
          Ou <Link to='/register'>registre-se</Link> agora!
        </Form.Item>
      </Form>
    </div>
  )
}
