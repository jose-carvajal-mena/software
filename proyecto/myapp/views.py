from django.http import JsonResponse
from django.views import View
from django.shortcuts import render
from .models import Entregable
import pandas as pd
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.views.decorators.csrf import get_token
from django.http import JsonResponse

class EntregablesView(View):
    def get(self, request, *args, **kwargs):
        data = list(Entregable.objects.values(
            'proyecto', 'id_documento', 'nombre_documento',
            'hh_vendidas', 'dinero_invertido',
            'dinero_gastado', 'estado_proyecto', 'hh_ganadas',
            'hh_gastadas', 'eficiencia_hh', 'eficiencia_dinero', 'eficacia'
        ))
        return JsonResponse(data, safe=False)


class UploadExcelView(View):
    
    #@ensure_csrf_cookie
    #def post(self, request, *args, **kwargs):
        
    #    file = request.FILES['file']
    #    df = pd.read_excel(file)
    #
    #     for _, row in df.iterrows():
    #        Entregable.objects.create(
    #            proyecto=row['Proyecto'],
    #            id_documento=row['ID Documento'],
    #            nombre_documento=row['Nombre Documento'],
    #            hh_vendidas=row['HH Vendidas'],
    #            dinero_invertido=row['Dinero Invertido'],
    #            estado_proyecto='Rev0',
    #            hh_gastadas=0,
    #            dinero_gastado=0,
    #            hh_ganadas=0,
    #            eficiencia_hh=0,
    #            eficiencia_dinero=0,
    #            eficacia=0
    #    
    #      )

    #    return JsonResponse({"success": True})

   
    def post(self,request, *arg, **kwargs):
        print("hola")
        if request.method == 'POST':
            usuario = request.POST.get('usuario')
            tok = request.POST.get('csrf_token')
        
            return JsonResponse({"data":usuario})
        else:
            return JsonResponse({"data":usuario})



# funcion genera csrf_token
def get_csrf_token_view(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrf_token': csrf_token})

