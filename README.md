# Sitio Web de Búsqueda sobre RESTful API para Motorleads
La necesidad que fue presentada por parte del socio fue la de generar un sitio que hiciera uso de tecnologías web como php, html, javascript y css con el propósito de tener la capacidad de automatizar la realización de consultas hacia su RESTful API. De esta manera, se esperaba que el usuario final pudiese encontrar un determinado automóvil que fuera de su interés con ayuda del llenado secuencial de un formulario. Finalmente, podría visualizar distintos gráficos con información vital para una toma de decisiones estratégica basada en el histórico de precios que ha presentado el automóvil en un periodo determinado.

# Secciones del Sitio
## Inicio de Sesión
### Previsualización de la Sección
![alt text](https://github.com/RetoMotorLeads2024/RetoMotorLeads2024/blob/main/InicioSesion.png)

### Objetivo de la Sección
Se espera que esta página sea utilizada como estructura base para ofrecer la funcionalidad de inicio de sesión, recuperación de contraseña y registro.

### Funcionalidad de la Sección
El alcance del proyecto que fue especificado por parte del socio no estipula ningún tipo de funcionalidad o método de validación para esta sección de la página. Por lo tanto, simplemente basta con dar clic en el botón cuya leyenda es "Iniciar Sesión" para pasar a la sección "Menú de Autos".

## Menú de Autos
### Previsualización de la Sección
![alt text](https://github.com/RetoMotorLeads2024/RetoMotorLeads2024/blob/main/MenuAutos.png)

### Objetivo de la Sección
Será aquí donde el usuario podrá buscar el auto que le interesa a través del llenado completamente secuencial de un
formulario en el que además no se admiten campos vacíos y que mantiene conexión con la RESTful API. El primer campo que debe ser llenado para comenzar la búsqueda con la ayuda de la API es el de "Marca".

### Funcionalidad de la Sección
Primeramente, se obtendrán todas las marcas a través del endpoint "makes" de la API para rellenar la lista desplegable del campo "Marca" con ellas. Una vez que el usuario escoja aquella que satisface sus necesidades, se realizará una nueva solicitud a la API con la diferencia de utilizar el endpoint "models" para obtener todos los modelos relacionados a la marca previamente seleccionada y poblar la lista desplegable del campo "Modelo" con esta nueva información. Además, podrá notarse que para este punto se mostrará al campo de la marca como inhabilitado y al de modelo como lo contrario para asegurar el completo llenado secuencial de todo aquel campo cuyo contenido exige una constante comunicación con la API, presentándose entonces como excepciones los de kilometraje y color que siempre estarán habilitados. Este procedimiento se sigue para los campos: marca, modelo, año y versión.

Cuando el usuario haya terminado de llenar todos los campos que exigen comunicación directa con la API para su correcto funcionamiento y que para este específico caso son: marca, modelo, año y versión; Se mostrará un botón cuya leyenda es "buscar" que llevará al usuario a la sección "Auto Buscado" con toda la información que haya sido recabada si se valida que ningún campo está vacío.

## Auto Buscado
### Previsualización de la sección
![alt text](https://github.com/RetoMotorLeads2024/RetoMotorLeads2024/blob/main/AutoBuscado.png)

### Objetivo de la Sección
Se podrán observar los diferentes valores del auto con las especificaciones de los campos llenados anteriormente en el menú respecto a los meses que se desee cotizar.

### Funcionalidad de la Sección
