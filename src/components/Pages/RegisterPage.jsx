import React from 'react'
import { Row, Card } from 'antd'
import styled from 'styled-components'
import RegisterForm from '../Register/RegisterForm'

const RegisterPage = () => (
  <Wrapper type='flex' justify='center'>
    <RegisterCard title='Register'>
      <RegisterForm />
    </RegisterCard>
  </Wrapper>
)

const Wrapper = styled(Row)`
  height: 100vh;
  padding-top: 20vh;
`

const RegisterCard = styled(Card)`
  max-width: 300px;
  width: 100%;
  height: fit-content;
  margin: 16px;
`

export default RegisterPage
