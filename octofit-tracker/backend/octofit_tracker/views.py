from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .models import User, Team, Activity, Leaderboard, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer
from rest_framework.exceptions import NotFound
from bson import ObjectId

@api_view(['GET'])
def api_root(request, format=None):
    base_url = 'https://reimagined-space-waddle-wwg44x66x25j4-8000.app.github.dev/'
    return Response({
        'users': base_url + 'api/users/?format=api',
        'teams': base_url + 'api/teams/?format=api',
        'activities': base_url + 'api/activities/?format=api',
        'leaderboard': base_url + 'api/leaderboard/?format=api',
        'workouts': base_url + 'api/workouts/?format=api'
    })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # Override the get_object method to handle ObjectId
    def get_object(self):
        try:
            obj = self.queryset.get(_id=ObjectId(self.kwargs["pk"]))
        except Exception:
            raise NotFound("User not found.")
        return obj    
    

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.select_related('user').all()
    serializer_class = LeaderboardSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
