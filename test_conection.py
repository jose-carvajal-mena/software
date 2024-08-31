import MySQLdb

try:
    db= MySQLdb.connect(
        host="localhost",
        user='Prueba',
        passwd= '12345',
        db='entregables'
    )
    print("Conexión exitosa")
except MySQLdb.OperationalError as e:
    print(f"Error: {e}")
