from django.urls import path
from .views import StreamView, SearchView

urlpatterns = [
    path('stream', StreamView.as_view()),
    path('search', SearchView.as_view()),
]