<!doctype HTML>
    <html>
        <head>
            <title>Hola mundo</title>
            <!-- <link href="a.css" rel="stylesheet" type="text/css"> -->
            <script src="kilometraje.js" type="text/javascript"></script>
        </head>
        <body>
            <table>
                <tr>
            </table>
        </body>
    </html>

<?php
    $v=$_GET["v"];
    $temp=$_GET['t'];
    $datos=file_get_contents("https://motorleads-api-d3e1b9991ce6.herokuapp.com/api/v1/vehicles/".$v."/pricings?filter[since]=".$temp);
    $datos=json_encode($datos);
    echo
    "
    <script>grafica(".$datos.")</script>
    "
?>