import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../state/ducks/authDuck'

class RegisterForm extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      registerLoading: false,
      confirmDirty: false,
    }

    this.validators = {
      emailRules: {
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
      },
      passwordRules: {
        rules: [
          { required: true, message: 'Please input your Password!' },
          { min: 6, message: 'Password must be at least 6 characters' },
          { validator: this.validateToNextPassword }
        ],
      },
      confirmPasswordRules: {
        rules: [
          { required: true, message: 'Please confirm your password!' },
          { min: 6, message: 'Password must be at least 6 characters' },
          { validator: this.validateToFirstPassword, }
        ]
      }
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    console.log('Register Form render')

    return (
      <React.Fragment>
        <Form onSubmit={this.validateFormAndRegister}>
          <Form.Item>
            {getFieldDecorator('email', this.validators.emailRules)(
              <Input placeholder='Email' prefix={<InputIcon type='mail' />} />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('password', this.validators.passwordRules)(
              <Input
                prefix={<InputIcon type='lock' />}
                type='password'
                placeholder='Password' />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('confirm', this.validators.confirmPasswordRules)(
              <Input
                prefix={<InputIcon type='lock' />}
                type="password" placeholder='Confirm Password'
                onBlur={this.handleConfirmBlur} />
            )}
          </Form.Item>

          <RegisterButton type='primary' htmlType='submit' loading={this.state.registerLoading} >
            {!this.state.registerLoading && 'Register'}
          </RegisterButton>

          <Link to="/login">login here</Link>
        </Form>
      </React.Fragment>
    )
  }

  handleConfirmBlur = event => {
    const { value } = event.target;
    this.setState(prevState => ({
      confirmDirty: prevState.confirmDirty || !!value
    }));
  }

  validateToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you entered are inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  validateFormAndRegister = event => {
    event.preventDefault()
    this.props.form.validateFields((err, formData) => {
      if (!err) {
        this.register(formData)
      }
    })
  }

  register = async formData => {
    try {
      this.setState({ registerLoading: true })

      const { email, password } = formData
      await this.props.actions.register({ email, password })
    } catch (error) {
      this.setState({ registerLoading: false })
      console.log('Got error when registering: ', error)
    }
  }
}

const InputIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`

const RegisterButton = styled(Button)`
  width: 100%;
`



const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authActions, dispatch)
})

const WrappedRegisterForm = Form.create()(RegisterForm)

export default compose(
  connect(null, mapDispatchToProps),
)(WrappedRegisterForm)
