import React, { Component } from 'react';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag'

class Login extends Component {
  state = {
    login: true,
    email: '',
    password: '',
    name: ''
  };

  render = () => (
    <div>
      <h4 className={'mv3'}>{this.state.login ? 'Login' : 'Sign Up'}</h4>
      <div className={'flex flex-column'}>
        {!this.state.login && 
        <input
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          type={'text'}
          placeholder={'Your name'}
        />}
        <input
          value={this.state.email}
          onChange={(e) => this.setState({ email: e.target.value })}
          type={'text'}
          placeholder={'Your email address'}
        />
        <input
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
          type={'password'}
          placeholder={'Choose a safe password'}
        />
      </div>
      <div className={'flex mt3'}>
        <div 
          className={'pointer mr2 button'}
          onClick={() => this.confirm()}
        >
          {this.state.login ? 'login' : 'create account'}
        </div>
        <div 
          className={'pointer button'}
          onClick={() => this.setState({ login: !this.state.login })}
        >
          {this.state.login ? 'need to create an account?' : 'already have an account'}
        </div>
      </div>
    </div>
  );

  confirm = async () => {
    const { name, email, password } = this.state;
    if (this.state.login) {
      const result = await this.props.authenticationMutation({
        variables: {
          email,
          password
        }
      });
      const { user: { id }, token } = result.data.authenticateUser;
      this.saveUserData(id, token);
    } else {
      const result = await this.props.signUpUserMutation({
        variables: {
          name,
          email,
          password
        }
      });
      const { id, token } = result.data.signUpUser;
      this.saveUserData(id, token);
    }
    this.props.history.push('/');
  };

  saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
  };
}

const SIGNUP_USER_MUTATION = gql`
  mutation SignUpUserMutation($email: String!, $password: String!, $name: String!) {
    signUpUser(
      user: {
        email: $email,
        password: $password,
        name: $name
    }) {
      id
      token
    }
  }
`;

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation($email: String!, $password: String!) {
    authenticateUser(authenticateInfo: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`;

export default compose(
  graphql(SIGNUP_USER_MUTATION, { name: 'signUpUserMutation' }),
  graphql(AUTHENTICATE_USER_MUTATION, { name: 'authenticationMutation' })
)(Login);