# Sitio Web de Búsqueda sobre RESTful API para Motorleads
La necesidad que fue presentada por parte del socio fue la de generar un sitio que hiciera uso de tecnologías web como php, html, javascript y css con el propósito de tener la capacidad de automatizar la realización de consultas hacia su RESTful API. De esta manera, se esperaba que el usuario final pudiese encontrar un determinado automóvil que fuera de su interés con ayuda del llenado secuencial de un formulario. Finalmente, podría visualizar distintos gráficos con información vital para una toma de decisiones estratégica basada en el histórico de precios que ha presentado el automóvil en un periodo determinado.

# Secciones del Sitio
## Inicio de Sesión


### Objetivo de la Sección
Ingrese el objetivo general de esta sección: ¿Cuál es su propósito?

## Menú de Autos
### Previsualización de la Sección
![alt text](https://github.com/RetoMotorLeads2024/RetoMotorLeads2024/blob/main/MenuAutos.png)

### Objetivo de la Sección
Será aquí donde el usuario podrá buscar el auto que le interesa a través del llenado completamente secuencial de un
formulario en el que además no se admiten campos vacíos y que mantiene conexión con la RESTful API. El primer campo que debe ser llenado para comenzar la búsqueda con la ayuda de la API es el de "Marca".

### Funcionalidad de la Sección
Primeramente, se obtendrán todas las marcas a través del endpoint "makes" de la API para rellenar la lista desplegable del campo "Marca" con ellas. Una vez que el usuario escoja aquella que satisface sus necesidades, se realizará una nueva solicitud a la API con la diferencia de utilizar el endpoint "models" para obtener todos los modelos relacionados a la marca previamente seleccionada y poblar la lista desplegable del campo "Modelo" con esta nueva información. Además, podrá notarse que para este punto se mostrará al campo de la marca como inhabilitado y al de modelo como lo contrario para asegurar el completo llenado secuencial de todo aquel campo cuyo contenido exige una constante comunicación con la API, presentándose entonces como excepciones los de kilometraje y color que siempre estarán habilitados. Este procedimiento se sigue para los campos: marca, modelo, año y versión.


