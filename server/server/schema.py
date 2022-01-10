import graphene
import graphql_jwt
import system.schema
import travel_expense.schema


class Query(
    system.schema.Query,
    travel_expense.schema.Query,
    graphene.ObjectType,
):
    pass


class Mutation(system.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()


schema = graphene.Schema(
    query=Query,
    mutation=Mutation,
)
