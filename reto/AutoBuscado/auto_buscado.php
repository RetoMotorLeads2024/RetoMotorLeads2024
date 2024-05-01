<?php
    function paginaAutoBuscado($datosFormulario){
        echo "<html>
        <head>
            <title>Motorleads</title>
            <meta charset='utf-8'>
        </head>
        <table width='100%' style='border: 0px; margin: 0px'>
            <tr style='border: 0px;'>
                <td style='border: 0px;' width='100%' colspan='2'>
                    <iframe src='encabezado.html' width='100%' height='70' style='border: 0;'></iframe>
                </td>
            </tr>
            <tr style='border: 0px;'>
                <td width='70%' style='border: 0px;'>
                    <iframe src='http://localhost/reto/AutoBuscado/autoBuscadoDatos.php?datosFormulario=".$datosFormulario."' width='100%' height='100%' style='border: 0;'></iframe>
                </td>
                <td rowspan='2' valign='top' style='border: 0px;'>
                    <iframe src='infoLateral.html' width='100%' height='100%' style='border: 0;'></iframe>
                </td>
            <tr style='border: 0px;'>
                <td width='70%' style='border: 0px;'>
                    <iframe src='http://localhost/reto/AutoBuscado/grafica.php?v=".$_GET["idVehiculo"]."&t=3&mil=".$datosFormulario."' width='100%' height='650' style='border: 0;'></iframe>
                </td style='border: 0px;'>
            </tr>
        </table>
    </html>";
    }

    $URLSitio = "http://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
    $URLSitio = str_replace('%22','"',$URLSitio);
    $datosFormulario = $_GET["datosFormulario"];
    $idVehiculo = $_GET["idVehiculo"];
    
    paginaAutoBuscado($datosFormulario);
    
    
?>
