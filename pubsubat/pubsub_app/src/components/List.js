import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

const query = gql`
{
  subscriptions(user_Username:"lqez") {
    edges {
      node {
        isActive,
        publisher {
          id,
          name
        },
      }
    }
  }
}
`;

class List extends Component {
  render() {
    let { data } = this.props
    if (data.loading || !data.subscriptions) {
      return <div>Loading...</div>
    }
    return (
      <div>
        {data.subscriptions.edges.map(item => (
          <p key={item.node.publisher.id}>
            {item.node.publisher.name}
          </p>
        ))}
      </div>
    )
  }
}

List = graphql(query)(List)
export default List
