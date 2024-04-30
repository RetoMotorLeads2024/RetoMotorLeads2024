<?php
    function paginaAutoBuscado($datosFormulario){
        echo "<html>
        <head>
            <title>Motorleads</title>
            <meta charset='utf-8'>
        </head>
    
        <frameset rows='10%,90%' noresize border=0  >
            <frame src='encabezado.html'>
            <frameset cols='70%, 30%'>
                <frameset rows='20%, 62%,18%'>
                    <frame src='http://localhost/reto/AutoBuscado/autoBuscadoDatos.php?datosFormulario=".$datosFormulario."'>
                    <frame src='http://localhost/reto/AutoBuscado/grafica.php?v=".$_GET["idVehiculo"]."&t=3' scrolling='no'> 
                    <frame src='http://localhost/reto/AutoBuscado/kilometraje.html?v=".$_GET["idVehiculo"]."&t=3' scrolling='no'> 
                </frameset>
        
                <frame src='infoLateral.html'>
        
            </frameset>
        </frameset>
    
    </html>";

    }

    $URLSitio = "http://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
    $URLSitio = str_replace('%22','"',$URLSitio);
    $datosFormulario = $_GET["datosFormulario"];
    $idVehiculo = $_GET["idVehiculo"];
    
    paginaAutoBuscado($datosFormulario);

    
    
?>