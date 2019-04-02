from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Category(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name


class Publisher(models.Model):
    name = models.CharField(max_length=200)
    url = models.URLField(max_length=200, null=True, blank=True)
    desc = models.TextField(null=True, blank=True)

    category = models.ForeignKey(Category, related_name='category', on_delete=models.SET_NULL, null=True, blank=True)
    sub_categories = models.ManyToManyField(Category, related_name='sub_categories', blank=True)

    logo_image = models.ImageField(upload_to='logo/', null=True, blank=True)
    hero_image = models.ImageField(upload_to='hero/', null=True, blank=True)

    def __str__(self):
        return self.name


class SubscribeOption(models.Model):
    name = models.CharField(max_length=200)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)

    def __str__(self):
        return '{} - {}'.format(self.publisher.name, self.name)


class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    subscribe_option = models.ForeignKey(SubscribeOption, on_delete=models.SET_NULL, null=True, blank=True)

    is_active = models.BooleanField(default=True)

    start = models.DateField(null=True, blank=True, help_text="When subscription begins")
    end = models.DateField(null=True, blank=True, help_text="When subscription ends")

    def __str__(self):
        return '{} - {}'.format(self.user.username, self.publisher.name)
