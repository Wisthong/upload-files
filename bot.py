import sys
import pyautogui as pg
import time
import datetime

# Obtener la ruta completa del archivo desde los argumentos
file_path = sys.argv[1]
# Extraemos solo el nombre del archivo (sin la ruta) usando os.path.basename
import os
file_name = os.path.basename(file_path)

# Día y hora actual (puedes usarlo si necesitas)
# dia = str(datetime.datetime.now().day).zfill(2)
# mes = str(datetime.datetime.now().month).zfill(2)
# year = str(datetime.datetime.now().year)[-2:]

# Iniciar la secuencia de teclas con pyautogui
pg.hotkey('win', 'd')
# Desplazar el mouse a la posición donde está el sistema y lo abre
pg.doubleClick(8, 8)
time.sleep(3)

pg.hotkey('win', 'up')
time.sleep(3)

# Inicio de sesión en el sistema
pg.write("WISTHONG".upper())
pg.press("enter")
pg.write("12345678")
time.sleep(3)

for _ in range(2):
    pg.press("right")
time.sleep(1)

for _ in range(2):
    pg.press("enter")
time.sleep(1)

for _ in range(2):
    pg.press("right")
time.sleep(1)

for _ in range(2):
    pg.press("enter")
time.sleep(1)

pg.press("up")
time.sleep(1)

pg.press("enter")
time.sleep(1)

# Ahora, escribir el nombre del archivo con la estructura "./trm/{{nombre del archivo}}"
file_string = f"./trm/{file_name}"
pg.write(file_string)
pg.press("enter")
