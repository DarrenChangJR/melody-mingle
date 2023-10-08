from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RoomSerializer, SaveRoomSerializer
from .models import Room


class RoomView(generics.ListAPIView):

    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class JoinRoomView(APIView):

    def get(self, request, format=None):
        if not request.session.exists(request.session.session_key):
            request.session.create()
        
        code = request.GET.get('code')
        if code:
            room = Room.objects.filter(code=code).first()
            if room:
                request.session['room_code'] = code
                data = RoomSerializer(room).data
                data['is_host'] = request.session.session_key == data['host']
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class SaveRoomView(APIView):

    def post(self, request, format=None):
        if not request.session.exists(request.session.session_key):
            request.session.create()
        
        serializer = SaveRoomSerializer(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data['guest_can_pause']
            host = request.session.session_key
            
            room, created = Room.objects.update_or_create(
                host=host,
                defaults=dict(guest_can_pause=guest_can_pause)
            )
            request.session['room_code'] = room.code
            return Response(RoomSerializer(room).data, status=(status.HTTP_201_CREATED if created else status.HTTP_202_ACCEPTED))
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    

class UserInRoomView(APIView):

    def get(self, request, format=None):
        if not request.session.exists(request.session.session_key):
            request.session.create()
        code = request.session.get('room_code')
        if Room.objects.filter(code=code).exists():
            return Response({'code': code}, status=status.HTTP_200_OK)
        else:
            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)


class LeaveRoomView(APIView):

    def get(self, request, format=None):
        code = request.session.pop('room_code', None)
        if code:
            room = Room.objects.filter(code=code, host=request.session.session_key).first()
            if room:
                room.delete()
        
        return Response({'message': 'Left Room'}, status=status.HTTP_200_OK)