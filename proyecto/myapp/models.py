from django.db import models

class Entregable(models.Model):
    proyecto = models.CharField(max_length=100)
    id_documento = models.CharField(max_length=100)
    nombre_documento = models.CharField(max_length=100)
    hh_vendidas = models.IntegerField()
    dinero_invertido = models.FloatField()
    dinero_gastado = models.FloatField(default=0)
    estado_proyecto = models.CharField(max_length=50, default='Rev0')
    hh_gastadas = models.IntegerField(default=0)
    hh_ganadas = models.IntegerField(default=0)
    eficiencia_hh = models.FloatField(default=0)
    eficiencia_dinero = models.FloatField(default=0)
    eficacia = models.FloatField(default=0)

    def __str__(self):
        return self.proyecto
