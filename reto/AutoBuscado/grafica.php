<!doctype HTML>
    <html>
        <head>
            <title>Hola mundo</title>
            <!-- <link href="a.css" rel="stylesheet" type="text/css"> -->
            <meta charset='utf-8'>
            <link rel='preconnect' href='https://fonts.googleapis.com'>
            <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>
            <link href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' rel='stylesheet'>
        
            <script src="grafica.js" type="text/javascript"></script>
            <link href='grafica.css' rel='stylesheet' type='text/css'>        
        </head>
        <body>
            <center>
            <table>
                <!-- <canvas id="gr"></canvas> -->
                <tr>
                    <td>
                        <table width="100%">
                            <tr>
                                <td class="subtituloCarro">Valor a la Venta</td>
                                <td class="subtituloCarro">Valor Medio</td>
                                <td class="subtituloCarro">Valor a la Compra</td>
                            </tr>
                            <tr id="precios"></tr> <!-- En el js se coloca el resto de la tabla -->
                            <tr id="periodo"></tr>
                            <tr id="variacion"></tr>
                        </table>
                    </td>
                </tr>
                <tr></tr>
                <tr>
                    <td><canvas id="gr" width="800" height="350"></canvas></td>
                </tr>
                <tr></tr>
            </table>
            </center>
            
        </body>
    </html>

<?php
    $v=$_GET["v"];
    $temp=$_GET['t'];
    $datos=file_get_contents("https://motorleads-api-d3e1b9991ce6.herokuapp.com/api/v1/vehicles/".$v."/pricings?filter[since]=".$temp);
    $datos=json_encode($datos);
    echo
    "
    <script>llenarDatos(".$datos.")</script>
    "
?>