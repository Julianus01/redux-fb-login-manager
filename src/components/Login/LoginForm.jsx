import React from 'react'
import { Form, Icon, Input, Button, Divider } from 'antd'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../state/ducks/authDuck'

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

    return (
      <React.Fragment>
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

        <Divider style={{ fontWeight: 300 }}>or</Divider>

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
    this.actions.loginWithGoogle()
  }

  loginWithFacebook = async () => {
    this.actions.loginWithFacebook()
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
  margin-bottom: 16px;
`

const FacebookButton = styled(Button)`
  width: 100%;
`

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authActions, dispatch)
})

export default compose(
  connect(null, mapDispatchToProps),
  withRouter,
)((LoginForm = Form.create()(LoginForm)))
