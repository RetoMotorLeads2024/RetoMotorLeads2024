<?php

function construirDatosAuto(){
    include("infoAutoBuscado.html");
}

construirDatosAuto();

echo "<script> llenarDatosAutoBuscado(".$_GET["datosFormulario"].") </script>";

?>