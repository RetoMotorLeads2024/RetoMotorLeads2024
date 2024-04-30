<?php
    function construirPagina($URLAPI, $URLSitio){
        include("MenuAutos.html");
    }

    $URLSitio = "http://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"]."/MenuAutos";
    $URLSitio = str_replace('%22','"',$URLSitio);

    if(sizeof($_GET) == 0){
        $URLAPI = "https://motorleads-api-d3e1b9991ce6.herokuapp.com/api/v1/makes";
        $nombreLista = "makesL";
        $datosFormulario = "";
        $elementosVisibles = ["makes","mileage","color"];
        $elementosVisibles = json_encode($elementosVisibles);
    }else{
        $URLAPI = $_GET["enlaceAPI"];
        $nombreLista = $_GET["nombreLista"];
        $datosFormulario = $_GET["datosFormulario"];
        $elementosVisibles = $_GET["elementosVisibles"];
    }
    construirPagina($URLAPI, $URLSitio);
    $datos = file_get_contents($URLAPI);
    $datos = json_encode($datos);

    echo "<script>construirFormulario('".$elementosVisibles."')</script>";
    echo "<script>agregarEventListenersListas()</script>";   
    echo "<script>setEnlaceActual('".$URLAPI."')</script>";   
    echo "<script>desplegarDatos(".$datos.",'".$nombreLista."','".$datosFormulario."')</script>";   
?>