const NOMBRE_FORMULARIO = 'APIForm';

//Esta es una lista que contiene cada uno de los ids que se contienen en el formulario. Nótese que son los mismos que los endpoints en la API.
//Si en un futuro quieren agregarse más campos, sólo deben añadirse los nuevos ids a esta lista y a "RELACIONES_ID_ETIQUETA"
const IDS_CAMPOS_FORMULARIO = ['makes', 'models', 'years', 'vehicles', 'mileage', 'color'];

/*
Este es un diccionario cuyas claves son las mismas que lo que existe en la lista "IDS_CAMPOS_FORMULARIO" y cuyos valores
simplemente representan cuál será el nombre con el que se muestre al campo relacionado en la página.
*/
const RELACIONES_ID_ETIQUETA = {'makes' : 'Marca', 'models' : 'Modelo', 'years' : 'Año', 'vehicles' : 'Versión', 'mileage': 'Kilometraje', 'color': 'Color'};

/*
Este es un diccionario que relaciona algunas ids que se contienen en la lista "IDS_CAMPOS_FORMUlARIO" para conocer qué campo
debería habilitar a qué otro campo una vez que sea llenado. Por ejemplo, una vez que el campo "makes" sea llenado, deberá mostrarse
como habilitado al campo "models".
*/
const RELACIONES_CAMPOS = {'makes': 'models', 'models' : 'years', 'years' : 'vehicles'};

const URL_AUTO_BUSCADO = 'http://localhost/reto/AutoBuscado/auto_buscado.php';

/*
Una lista que contiene los ids de los campos que deberían mostrarse como habilitados en este momento.
*/
let elementosVisibles = ['makes', 'mileage', 'color'];

/*
Una constante en la que se almacena la última URL de la API, es principalmente inicializada por PHP.
*/
let enlaceActual = null;

/*
Una lista que almacena los ids de aquellos campos que son considerados como casos especiales. Un caso especial se define como aquel
campo cuyo endpoint relacionado no respeta una estructura secuencial para la API.
Por ejemplo, el campo de vehículo no es considerado un caso especial porque su URL tiene una estructura tal que se percibe secuencialidad
con sus campos anteriores (modelo y año): 
https://motorleads-api-d3e1b9991ce6.herokuapp.com/api/v1/models/<model_id>/years/<year_id>/vehicles

Lo contrario ocurre con modelos porque no lleva secuencialidad con su campo previo "marca" dado que su endpoint para obtener el año es:
 https://motorleads-api-d3e1b9991ce6.herokuapp.com/api/v1/models/<model_id>/years

 y no:  https://motorleads-api-d3e1b9991ce6.herokuapp.com/api/v1/makes/<make_id>/models/<model_id>/years

 Si years también se considerara caso especial, entonces su llamada a la API para los vehículos sería:
 https://motorleads-api-d3e1b9991ce6.herokuapp.com/api/v1/years/<year_id>/vehicles
*/
let casosEspeciales = ['models'];

/*
Dos listas en las que se almacenan tanto los ids como los names de lo que sea obtenido desde la API.
Por ejemplo, si se tuviera una única marca "NISSAN" cuyo id es "1234" entonces en la posición 0 de la lista id tendríamos "1234" y
en la misma posición de names tendríamos "NISSAN".
*/
let ids = [];
let names = [];

/*
Función que guarda todo el contenido de cada uno de los campos presentes en el formulario en un diccionario cuyas
claves serán cada uno de los ids de los campos y sus contenidos serán otro diccionario con una única llave 'name' donde se ubicará
el contenido del campo.

Returns: Un diccionario que mapea cada id de cada campo del formulario con otro diccionario
con una sola llave ´name´ que tendrá el contenido. Teniendo entonces la siguiente estructura:

{makes: {name: Nissan}, models: {name: Versa}}

*/
function guardarDatosFormulario(){
    let datosFormulario = {};
    for(idCampo of IDS_CAMPOS_FORMULARIO){
        const CAMPO = document.getElementById(idCampo);
        if (CAMPO.value.length){
            datosFormulario[idCampo] = {};
            datosFormulario[idCampo]['name'] = CAMPO.value;
            datosFormulario[idCampo]['options'] = [];
            for(opcion of document.getElementById(idCampo+"L").options){
                datosFormulario[idCampo]['options'].push(opcion.value);
            }
            

        }
    }
    datosFormulario = JSON.stringify(datosFormulario);
    return datosFormulario;
}

/*
Función que construye el enlace de la API para obtener los datos que sean solicitados para el siguiente campo del que haya hecho
la llamada a esta función.

Params:
elementoForm: un objeto que represente a un campo del formulario y que sea el que haya hecho la llamada a esta función.
enlaceActualAPI: el último enlace que se haya utilizado para obtener información desde la API.

Por ejemplo, si se envía como argumento de "elementoForm" al campo cuyo id es "makes", entonces se obtendrán los datos para su siguiente
campo según lo estipulado en la variable "RelacionesCampos" que será "models".
*/
function obtenerDatos(elementoForm, enlaceActualAPI){
    datosFormulario = guardarDatosFormulario();

    elementosVisibles.push(RELACIONES_CAMPOS[elementoForm.id]);
    if (casosEspeciales.indexOf(elementoForm.id) == -1){
        enlaceActualAPI += '/' + ids[names.indexOf(elementoForm.value)] + '/' + RELACIONES_CAMPOS[elementoForm.id];
    } else {
        enlaceActualAPI = 'https://motorleads-api-d3e1b9991ce6.herokuapp.com/api/v1/' + elementoForm.id + '/' + ids[names.indexOf(elementoForm.value)] + '/' + RELACIONES_CAMPOS[elementoForm.id];
    }
    enlace = "http://localhost/reto/MenuAutos/menu_autos.php?enlaceAPI="+enlaceActualAPI+"&datosFormulario="+datosFormulario+"&nombreLista="+RELACIONES_CAMPOS[elementoForm.id]+"L"+"&elementosVisibles="+JSON.stringify(elementosVisibles);
    location.href = enlace;
}

/*
Función que valida aquellos campos que no están relacionados con la API.

Retorna true si la validación se lleva con éxito, false en caso contrario.
*/
function validarFormulario(){
    const COLOR_CAMPO = document.getElementById("color");
    const KILOMETRAJE_CAMPO = document.getElementById("mileage");

    if ((COLOR_CAMPO.value.trim().length == 0) || (KILOMETRAJE_CAMPO.value.trim().length == 0)){
        alert("Se necesitan llenar todos los campos");
        return false;
    }

    return true;
}

/*
Función que lleva al usuario a la página "Auto buscado" con toda la información capturada en el formulario y si esta es correctamente
validada.

Retorna true si la validación se lleva con éxito, false en caso contrario.
*/
function Busqueda(){
    
    if(validarFormulario()){
        idVehiculo = ids[names.indexOf(document.getElementById("vehicles").value)]
        datosFormulario = guardarDatosFormulario();
        location.href = URL_AUTO_BUSCADO + '?datosFormulario='+datosFormulario
        +'&idVehiculo='+idVehiculo;
    }
    
}

/*
Función que dinámicamente construye todo el html del formulario en sí mismo.
*/
function construirFormulario(elementosVisiblesPHP){
    
    elementosVisibles = JSON.parse(elementosVisiblesPHP);
    const FORMULARIO = document.createElement('form');
    FORMULARIO.name = NOMBRE_FORMULARIO;
    const TABLA_GENERAL = document.createElement('table');
    const FILA_TABLA_GENERAL = document.createElement('tr');
    FORMULARIO.appendChild(TABLA_GENERAL);
    TABLA_GENERAL.appendChild(FILA_TABLA_GENERAL);
    for(let idCampo of IDS_CAMPOS_FORMULARIO){
        const FILA_TABLA = document.createElement('tr');
        const TABLA = document.createElement('table');
        TABLA.id = idCampo + 'Tabla';
        const FILA_TABLA_INTERNA = document.createElement('tr');
        const DATO_TABLA = document.createElement('td');
        const ESPACIO = document.createElement('br');
        ESPACIO.style.lineHeight = "1px";
        const CONTENIDO = document.createElement('p');
        CONTENIDO.innerHTML = 'Selecciona una ' + RELACIONES_ID_ETIQUETA[idCampo];
        CONTENIDO.setAttribute("class", "subtitulo");


        const FILA2_TABLA = document.createElement('tr');
        const DATO2_TABLA = document.createElement('td');
        const CONTENIDO2 = document.createElement('input');
        CONTENIDO2.setAttribute("list", idCampo + "L");
        CONTENIDO2.id = idCampo;
        CONTENIDO2.disabled = elementosVisibles.indexOf(idCampo) == -1;
        CONTENIDO2.setAttribute("class", "campos");

        DATO_TABLA.appendChild(ESPACIO);
        FILA_TABLA_GENERAL.appendChild(FILA_TABLA);
        FILA_TABLA.appendChild(TABLA);
        TABLA.appendChild(FILA_TABLA_INTERNA);
        FILA_TABLA_INTERNA.appendChild(DATO_TABLA);
        DATO_TABLA.appendChild(CONTENIDO);

        TABLA.appendChild(FILA2_TABLA);
        FILA2_TABLA.appendChild(DATO2_TABLA);
        DATO2_TABLA.appendChild(CONTENIDO2);   
    }

    const FILA3_TABLA = document.createElement('tr');
    const DATO3_TABLA = document.createElement('td');
    const ESPACIO2 = document.createElement('br');
    const BOTON = document.createElement('input');
    BOTON.setAttribute("type","button");
    BOTON.setAttribute("value","Buscar");
    BOTON.setAttribute("class", "boton");
    BOTON.onclick = Busqueda;
    BOTON.setAttribute("hidden", "true");
    BOTON.id = "BOTON_ID";
    
    TABLA_GENERAL.appendChild(FILA3_TABLA);
    FILA3_TABLA.appendChild(DATO3_TABLA);
    DATO3_TABLA.appendChild(ESPACIO2);
    DATO3_TABLA.appendChild(BOTON);

    document.getElementById("divCuadroBlanco").appendChild(FORMULARIO);

}

/*
Función que es utilizada por PHP y establece el enlace actual de la API.
*/
function setEnlaceActual(enlace){
    enlaceActual = enlace;
}

/*
Función que dinámicamente se encarga de crear y poblar de opciones a un "datalist" con los datos recolectados desde la API.
Es principalmente usada desde PHP.

Params:
datos: los datos que fueron obtenidos desde la API.
listaID: la id que deberá tener la nueva datalist.
datosFormPHP: es el diccionario que previamente fue creado con la función "guardarDatosFormulario" y enviado a PHP en el enlace.
*/
function desplegarDatos(datos, listaID, datosFormPHP){
    const LISTA = document.createElement('datalist');
    LISTA.id = listaID;
    if(datos == "") return;
    datos = JSON.parse(datos);
    if(Object.keys(datos).length == 0) return;
    
    ids = [];
    names = [];
    for(let info of datos){
        llaves = Object.keys(info);
        if(info[llaves[0]] == "other") continue;
        ids.push(info[llaves[0]]);
        names.push(info[llaves[1]]);
        const OPCION = document.createElement('option');
        OPCION.value = names[names.length - 1];
        LISTA.appendChild(OPCION);
    }
    document.body.appendChild(LISTA);
    llenarFormulario(datosFormPHP);
}

/*
Función que dinámicamente se encarga de llenar los campos del formulario con información previa.

Params:
datos: los datos con los que se llenará el formulario. Es un diccionario que debe tener estrictamente la misma estructura
que se muestra para el que retorna la función "guardarDatosFormulario".
*/
function llenarFormulario(datos){
    if(datos == "") return;
    datos = JSON.parse(datos);
    for(idCampo of Object.keys(datos)){
        const CAMPO = document.getElementById(idCampo);
        CAMPO.value = datos[idCampo]['name'];
        CAMPO.setAttribute('disabled',true);
    }
}

/*
Función que agrega escuchadores a cada uno de los campos del formulario que se conoce, deben interactuar directamente con la API.
El escuchador exclusivamente se activará cuando se da clic a un elemento de la lista desplegable del campo determinado.
*/
function agregarEventListenersListas(){
    for(idCampo of IDS_CAMPOS_FORMULARIO){
        let funcion = null;
        if(idCampo == "vehicles" || idCampo == "mileage" || idCampo == "color"){
            funcion = function(e){
                
                let esEventoInput = Object.prototype.toString.call(e).indexOf("InputEvent") > -1;
                if(!esEventoInput){
                    const BOTON_BUSCAR = document.getElementById("BOTON_ID");
                    BOTON_BUSCAR.hidden = false;
                    const VEHICLES_CAMPO = document.getElementById("vehicles");
                    VEHICLES_CAMPO.disabled = true;

                }
            }
        }
        else {
            funcion = function(e){
                let esEventoInput = Object.prototype.toString.call(e).indexOf("InputEvent") > -1;
                if(!esEventoInput) obtenerDatos(CAMPO, enlaceActual);
            }
        }
        const CAMPO = document.getElementById(idCampo);
        CAMPO.addEventListener("input",
            funcion , false);
    }
}
