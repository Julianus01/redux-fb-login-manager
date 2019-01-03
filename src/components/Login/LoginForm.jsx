import React from 'react'
import { Form, Icon, Input, Button, Row, Divider } from 'antd'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../../ducks/userDuck'

const emailRules = {
  rules: [
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
    {
      required: true,
      message: 'Please input your E-mail!',
    },
  ],
}

const passwordRules = {
  rules: [
    { required: true, message: 'Please input your Password!' },
    { min: 6, message: 'Password must be at least 6 characters' },
  ],
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      emailLoading: false,
    }

    this.actions = this.props.actions
  }

  render() {
    const { getFieldDecorator } = this.props.form
    // console.log(this.props)

    return (
      <React.Fragment>
        <Form onSubmit={this.validateFormAndLogin}>
          <FormItem>
            {getFieldDecorator('email', emailRules)(
              <Input placeholder='Email' prefix={<InputIcon type='mail' />} />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('password', passwordRules)(
              <Input
                prefix={<InputIcon type='lock' />}
                type='password'
                placeholder='Password'
              />
            )}
          </FormItem>

          <LoginButton
            type='primary'
            htmlType='submit'
            loading={this.state.emailLoading}
          >
            {!this.state.emailLoading && 'Login'}
          </LoginButton>
        </Form>

        <Divider style={{ fontWeight: 300 }}>or</Divider>

        <Row style={{ display: 'flex' }}>
          <GmailButton
            icon='google'
            onClick={this.loginWithGoogle}
          >
          </GmailButton>

          <FacebookButton
            icon='facebook'
            onClick={this.loginWithFacebook}
          >
          </FacebookButton>
        </Row>
      </React.Fragment>
    )
  }

  validateFormAndLogin = event => {
    event.preventDefault()
    this.props.form.validateFields((err, formData) => {
      if (!err) {
        this.loginWithEmailAndPassword(formData)
      }
    })
  }

  loginWithEmailAndPassword = async formData => {
    try {
      this.setState({ emailLoading: true })
      await this.actions.loginWithEmailAndPassword(formData)
    } catch (error) {
      this.setState({ emailLoading: false })
    }
  }

  loginWithGoogle = async () => {
    const { authContainer } = this.props
    await authContainer.loginWithGoogle()
  }

  loginWithFacebook = async () => {
    const { authContainer } = this.props
    await authContainer.loginWithFacebook()
  }
}

const FormItem = Form.Item

const InputIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`

const LoginButton = styled(Button)`
  width: 100%;
`

const GmailButton = styled(Button)`
  width: 100%;
  margin-right: 8px;
`

const FacebookButton = styled(Button)`
  width: 100%;
  margin-left: 8px;
`

export default compose(
  connect(
    state => state,
    dispatch => ({
      actions: bindActionCreators(userActions, dispatch)
    })
  ),
  withRouter,
)((LoginForm = Form.create()(LoginForm)))
