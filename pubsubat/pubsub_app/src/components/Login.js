import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { AUTH_TOKEN } from '../constants'


const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  render() {
    const { username, password } = this.state
    return (
      <div>
        <h2>Login</h2>
        <div>
          <input
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
            type="text"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <Mutation
            mutation={ LOGIN_MUTATION }
            variables={{ username, password }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <button onClick={mutation}>
                Login
              </button>
            )}
          </Mutation>
        </div>
      </div>
    )
  }

  _confirm = async data => {
    const token = data.tokenAuth.token
    this._saveUserData(token)
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}
