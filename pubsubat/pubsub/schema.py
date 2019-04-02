from django.contrib.auth import get_user_model
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
from .models import User, Category, Publisher, Subscription
import graphene


class UserType(DjangoObjectType):
    class Meta:
        model = User
        filter_fields = ['id', 'name', 'email']
        interfaces = (relay.Node, )


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        filter_fields = {
            'id': ['exact'],
            'name': ['exact', 'icontains', 'istartswith'],
        }
        interfaces = (relay.Node, )


class PublisherType(DjangoObjectType):
    class Meta:
        model = Publisher
        filter_fields = {
            'id': ['exact'],
            'name': ['exact', 'icontains', 'istartswith'],
        }
        interfaces = (relay.Node, )


class SubscriptionType(DjangoObjectType):
    class Meta:
        model = Subscription
        filter_fields = {
            'id': ['exact'],
            'is_active': ['exact'],

            'user__id': ['exact'],
            'user__username': ['exact'],
            'publisher__name': ['exact'],
        }
        exclude_fields = ('start', 'end')
        interfaces = (relay.Node, )


class PubSubQuery(graphene.ObjectType):
    user = relay.Node.Field(UserType)

    category = relay.Node.Field(CategoryType)
    categories = DjangoFilterConnectionField(CategoryType)

    publisher = relay.Node.Field(PublisherType)
    publishers = DjangoFilterConnectionField(PublisherType)

    subscription = relay.Node.Field(SubscriptionType)
    subscriptions = DjangoFilterConnectionField(SubscriptionType)
    my_subscriptions = DjangoFilterConnectionField(SubscriptionType)

    def resolve_my_subscriptions(self, info):
        if not info.context.user.is_authenticated:
            return Subscription.objects.none()
        else:
            return Subscription.objects.filter(user=info.context.user)


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()

        return CreateUser(user=user)

class PubSubMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
