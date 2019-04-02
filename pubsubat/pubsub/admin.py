from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django_summernote.admin import SummernoteModelAdmin
from .models import (User, Category, Publisher, Subscription, )


admin.site.register(User, UserAdmin)
admin.site.register(Category)
admin.site.register(Publisher, SummernoteModelAdmin)
admin.site.register(Subscription)
