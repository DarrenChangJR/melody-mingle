from django.urls import path
from .views import RoomView, SaveRoomView, JoinRoomView, UserInRoomView, LeaveRoomView

urlpatterns = [
    path('room', RoomView.as_view()),
    path('save-room', SaveRoomView.as_view()),
    path('join-room', JoinRoomView.as_view()),
    path('user-in-room', UserInRoomView.as_view()),
    path('leave-room', LeaveRoomView.as_view()),
]