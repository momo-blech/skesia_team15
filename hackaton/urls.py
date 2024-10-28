from django.contrib import admin
from django.urls import path
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('generate_equation/', views.generate_equation, name='generate_equation'),
    path('page_accueil/', views.page_accueil, name='page_accueil'),
    path('register/', views.register, name='register'),
    path('game1/', views.game1, name='game1'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('profile/', views.profile, name='profile'),
    path('login/', views.profile, name='profile'),
    path('missions/', views.missions, name='missions'),
    path('techniques-apprentissage/', views.techniques_apprentissage, name='techniques_apprentissage'),
    path('niveau1/', views.niveau1, name='niveau1'),
    path('niveau2/', views.niveau2, name='niveau2'),
    path('avatar/', views.avatar, name='avatar'),
]
