// Constante que declara el nombre del formulario.
const NOM_FORM_LOGIN = 'loginForm';

// Constante que declara un arreglo en donde se encuentran los campos que se requieren para hacer logIn.
const IDS_FORM_LOGIN = ['mail', 'pwd'];

// Constante que declara las relaciones entre los campos y sus identificadores.
const RELACIONES_FORM_LOGIN = {'mail' : 'Email', 'pwd' : 'Contraseña'};

// Constante que declara la URL de la siguiente página después de hacer login, la cual sería menu_autos.
const URL_MENU_AUTOS = 'http://localhost/reto/MenuAutos/menu_autos.php';

// Función en la que se declara el cambio de URL al presionar el botón de "Iniciar sesión".
function validarFormulario(){
    location.href = URL_MENU_AUTOS;
}