import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button';
import { AUTH_TOKEN } from '../constants'


class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div>
        <h1>Pubsub.at</h1>
        <div>
        {authToken ? (
          <Button color="default"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN)
              this.props.history.push(`/`)
            }}
          >
            Logout
          </Button>
        ) : (
          <Button color="primary" component={Link} to="/login">
            Login
          </Button>
        )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
