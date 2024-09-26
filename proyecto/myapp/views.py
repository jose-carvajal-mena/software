from django.http import JsonResponse
from django.views import View
from django.shortcuts import render
from .models import Entregable
import pandas as pd
import numpy as np
import math
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
    def post(self, request, *args, **kwargs):
        print("llego Excel")    
        file = request.FILES['file']
        df = pd.read_excel(file)

        estado_porcentaje= {
            "Init": 0,
            "RevA": 30,
            "RevB0": 50,
            "RevB1": 70,
            "Rechazado":0,
            "RevC": 100,
            "Rev0": 100,
            "Aceptada Con Comentarios": 90,
            "Aceptada Sin Comentarios":100
        }
        for _, row in df.iterrows():
            estado = row['estado_proyecto']
            porcentaje = estado_porcentaje.get(estado, 0)  # Obtener el porcentaje según el estado

            # Calcular hh_ganadas
            hh_ganadas = (porcentaje / 100) * row['hh_vendidas']

            # Generar valores aleatorios para hh_gastadas y dinero_gastado
            hh_gastadas = np.random.randint(0, int(row['hh_vendidas'] * 1.1))
            dinero_gastado = np.random.randint(0, int(row['dinero_invertido'] * 1.1))

            # Calcular eficiencia_hh y eficiencia_dinero
            eficiencia_hh = hh_ganadas / hh_gastadas if hh_gastadas > 0 else 0
            eficiencia_dinero = (row['dinero_invertido'] * (porcentaje / 100)) / dinero_gastado if dinero_gastado > 0 else 0

            # Generar un valor aleatorio para eficacia
            eficacia = np.random.uniform(0, 2)

            Entregable.objects.create(
                proyecto=row['proyecto'],
                id_documento=row['id_documento'],
                nombre_documento=row['nombre_documento'],
                hh_vendidas=row['hh_vendidas'],
                dinero_invertido=row['dinero_invertido'],
                estado_proyecto= row['estado_proyecto'],
                hh_gastadas= hh_gastadas,
                dinero_gastado= dinero_gastado,
                hh_ganadas=hh_ganadas,
                eficiencia_hh= math.floor(eficiencia_hh*100)/100,
                eficiencia_dinero= math.floor(eficiencia_dinero*100)/100,
                eficacia=math.floor(eficacia*100)/100
            )

        return JsonResponse({"success": True})

   
    #def post(self,request, *arg, **kwargs):
    #    print("hola")
    #    if request.method == 'POST':
    #        usuario = request.POST.get('usuario')
    #        tok = request.POST.get('csrf_token')
    #    
    #        return JsonResponse({"data":usuario})
    #    else:
    #        return JsonResponse({"data":usuario})



# funcion genera csrf_token
def get_csrf_token_view(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrf_token': csrf_token})

