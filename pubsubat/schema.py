from graphene import Schema, ObjectType
from pubsub.schema import (PubSubQuery, PubSubMutation)
import graphql_jwt


class Mutation(PubSubMutation):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = Schema(
    query=PubSubQuery,
    mutation=Mutation
)
