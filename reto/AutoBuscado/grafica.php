<!doctype HTML>
    <html>
        <head>
            <title>Hola mundo</title>
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
                <tr>
                    <td>
                        <table width="100%">
                            <tr>
                                <td class="subtituloCarro">Valor a la Venta<canvas id="venta" width="11" height="11"></canvas></td>
                                <td class="subtituloCarro">Valor Medio<canvas id="medio" width="11" height="11"></canvas></td>
                                <td class="subtituloCarro">Valor a la Compra<canvas id="compra" width="11" height="11"></canvas></td>
                            </tr>
                            <tr id="precios"></tr> <!-- En el js se coloca el resto de la tabla -->
                            <tr id="periodo"></tr>
                            <tr id="variacion"></tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td id="botones"></td>
                </tr>
                <tr style="height:60%;">
                    <td><canvas id="gr" width="900" height="250" style="width:100%; height: 100%;"></canvas></td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" style="text-align: center;">
                            <tr>
                                <td><p class="subtituloCarro">Kilometro Esperado</p></td>
                                <td><p class="subtituloCarro">Kilometraje Promedio</p></td>
                            </tr>
                            <tr id="km" style="font-weight: bold;"></tr>
                            <tr>
                                <td colspan="2">
                                    <canvas id="esquema" width="700" style="width:80%;"></canvas>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            </center>
            
        </body>
    </html>

<?php
    $v=$_GET["v"];
    $temp=$_GET['t'];
    $datos=file_get_contents("https://motorleads-api-d3e1b9991ce6.herokuapp.com/api/v1/vehicles/".$v."/pricings?filter[since]=".$temp);
    $datos=json_encode($datos);
    $mil=$_GET['mil'];
    echo
    "
    <script>llenarDatos(".$datos.", '".$v."',".$mil.")</script>
    "
?>
