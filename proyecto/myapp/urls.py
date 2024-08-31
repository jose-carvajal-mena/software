from django.urls import path
from .views import UploadExcelView, EntregablesView
from .views import get_csrf_token_view

urlpatterns = [
    
    path('upload_excel/', UploadExcelView.as_view(), name='upload_excel'),
    path('entregables/', EntregablesView.as_view(), name='entregables'),
    path('get_csrf_token/', get_csrf_token_view, name='get_csrf_token'),
    
]
