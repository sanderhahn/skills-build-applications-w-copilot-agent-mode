from bson import ObjectId
from rest_framework import serializers
from .models import Leaderboard, User, Team, Activity, Workout

class UserSerializer(serializers.ModelSerializer):
    # _id = ObjectIdField()
    
    class Meta:
        model = User
        fields = ['_id', 'username', 'email']
        # fields = '__all__' # Include all fields

class TeamSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)  # Include team members

    class Meta:
        model = Team
        fields = ['name', 'members']  # Add 'members' to the fields

class LeaderboardSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Leaderboard
        fields = ['user', 'score']

class ActivitySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Activity
        fields = ['_id', 'activity_type', 'duration', 'user']

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'
