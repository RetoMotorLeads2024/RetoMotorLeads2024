cnv=null;       //Nuestro canvas. Elemento con id "gr"
lnz=null;       //Lienzo donde dibujamos sobre el canvas. Se dibuja en 2d.
min=0;          //Valor mínimo para definir el rango
max=0;          //Valor máximo para definir el rango

/*
objetivo: Centrar el texto dibujado calculando su anchura en pixeles

params:
    pos: la posición donde se va a centrar (x o y)
    text: el texto que se va a mostrar.

retorna la nueva coordenada donde se mostrará centrado
*/
function centrar(pos,tex){
    return pos-(lnz.measureText(tex)).width/2;
}

/*
objetivo: Grafica lineal

params:
    datos: los datos de historic en la api
    ser: id de la serie que se va a graficar, en este caso "sale_price", "medium_price" y "purchase_price"
    conv: arreglo de conversión. Convierte $ a pixeles, se usa para obtener coordenadas de dibujo. Se calcula en dim()
    col: Texto, color para la gráfica.

No retorna.
*/
function serie(datos,ser,conv,col){
    x=25;
    lnz.strokeStyle=col;
    s=new Path2D();
    s.moveTo(x,cnv.height-(datos[datos.length-1][ser]-min)*conv[1]-40) //coordenada inicial
    for(i=datos.length-2;i>=0;i--){
        x=x+conv[0];
        s.lineTo(x,cnv.height-(datos[i][ser]-min)*conv[1]-40);//dibuja una línea al siguente valor convertido en pixeles
    }
    lnz.stroke(s);                                        //s guarda el recorrido, stroke dibuja en el canvas.
    s.lineTo(cnv.width-55-conv[0],cnv.height-50);         //Inicia un nuevo recorrido, rellena con color.
    s.lineTo(25,cnv.height-50);
    lnz.filter="opacity(30%)"
    lnz.fillStyle=col;
    lnz.fill(s);                                          //Ahora usamos fill para dibujar con relleno.
    lnz.filter="opacity(100%)"
    x=25;
    for(i=datos.length-1;i>=0;i--){            //Cada valor es un vértice, y en cada vértice dibujamos 2 círculos.
        lnz.fillStyle=col;
        lnz.beginPath();
        lnz.arc(x,cnv.height-(datos[i][ser]-min)*conv[1]-40,5,0,2*Math.PI); //Primer círculo.
        lnz.fill();
        lnz.fillStyle="white";  //Color del siguiente círculo
        lnz.beginPath();
        lnz.arc(x,cnv.height-(datos[i][ser]-min)*conv[1]-40,2,0,2*Math.PI); //Segundo círculo, más chico que el primero
        x=x+conv[0];
        lnz.fill();
    }
}

/*
objetivo: Calcula la dimensión de la gráfica en "x" y "y".

params:
n: un entero que representa el número de datos a graficar (3 meses, 6 meses, etc.)

retorna un array de conversión de $ a pixeles. En [0] está mi convertidor en "x", y en [1] mi conv en "y".
*/
function dim(n){

    rango=max-min;  //Rango de nuestros valores
    mul=1;
    while(rango>=10){
        mul=mul*10;
        rango=rango/10;
    }
    max=max-(max%(mul))+mul;
    min=min-(min%(mul))-mul;

    return [(cnv.width-80)/(n),(cnv.height-60)/(max-min)];
                            
}

/*
objetivo: Dibuja desde 0 el espacio de la gráfica y sus etiquetas. También manda a llamar serie() para las gráficas
principales.

params:
    datos: Datos recuperados en la api.

No retorna.
 */
function grafica(datos){
    //alert(datos);
    cnv=document.getElementById("gr");
    lnz=cnv.getContext("2d");
    if(datos.length==0) return; //Si no hay datos, no hace nada para evitar errores.

    //Para el mínimo y máximo, asumimos que en la api, la primer posición en el arreglo tiene los datos más recientes
    //y en los datos recientes asumimos que es el valor mínimo de precios. Caso contrario con la última posición del
    //arreglo, la cual asumimos es el valor máximo en precios.
    max=parseFloat(datos[datos.length-1]["sale_price"]);//Aquí se asume que el valor máximo será el último en el arreglo.
    min=parseFloat(datos[0]["purchase_price"]);//Lo mismo para el mínimo, el valor mínimo será el primero.
    conv=dim(datos.length);

    x=25;
    for(i=datos.length-1;i>=0;i--){
        //Dibujamos en el lienzo las etiquetas de los meses 
        lnz.fillText(datos[i]["month_name"],centrar(x,datos[i]["month_name"]),cnv.height-1.5*25);//Colocamos etiquetas.
        if(datos[i]["month"]==1 && i<datos.length-1){
            lnz.fillText(datos[i]["year"],centrar(x,datos[i]["year"]),cnv.height-0.5*25);//Coloca el año cuando sea Enero
        }
        //A la vez que colocamos etiquetas, formamos las líneas punteadas verticales divisoras en la gráfica.
        lnz.beginPath();
        lnz.setLineDash([5,15]);
        lnz.moveTo(x,10);   //Misma coordenada que los meses pero más arriba en el canvas.
        lnz.lineTo(x,cnv.height-50);
        lnz.closePath();
        lnz.strokeStyle="gray";
        lnz.stroke();
        x+=conv[0];
    }
    //Dibujamos un espacio libre.
    lnz.beginPath();
    lnz.setLineDash([5,15]);
    lnz.moveTo(x,10);
    lnz.lineTo(x,cnv.height-50);
    lnz.closePath();
    lnz.strokeStyle="gray";
    lnz.stroke();

    //Dibuja línea divisora en "x"
    x=25;
    rango=((max-min)/5)*conv[1];
    lnz.beginPath();
    lnz.moveTo(x,cnv.height-50);
    lnz.lineTo(cnv.width-55,cnv.height-50);
    lnz.closePath();
    lnz.stroke();   

    //Ahora dibujamos las líneas horizontales y etiquetas de valores en "y".
    y=cnv.height-rango-40;
    for(i=1;i<6;i++){
        lnz.beginPath();
        lnz.setLineDash([5,15]);
        lnz.moveTo(x,y);
        lnz.lineTo(cnv.width-55,y);
        lnz.closePath();
        lnz.strokeStyle="gray";
        lnz.stroke();   
        t="$"+((rango*i)/conv[1]+min);
        lnz.fillText(t,cnv.width-50,y+5);
        y-=rango;
    }

    //Reset a nuestras líneas para empezar a graficar.
    lnz.setLineDash([]);
    lnz.strokeStyle="black";

    //Se manda a llamar serie para hacer las gráficas lineales
    serie(datos,"sale_price",conv,"green");
    serie(datos,"medium_price",conv,"orange");
    serie(datos,"purchase_price",conv,"blue");
}

/*
objetivo: Colocar precios, cambio de "x" años, y variaciones.

params:
    datos: Datos de la api.
    per: entero, periodos, representa la cantidad de datos en historic.
    variar: un arreglo de arreglos. variar[0] accede a valores de venta:
        variar[0][0] es "sale_price_variation" y variar[0][1] es "sale_price_percentage_variation"
        variar[1] valores de medium
        variar[2] valores de purchase

return: No retorna
*/
function precios(datos,per,variar){
    const FILA = document.getElementById("precios");//Recuperamos los elementos del php para llenar la tabla.
    FILA.setAttribute("class", "tituloCarro");
    const FILA2 = document.getElementById("periodo");
    FILA2.setAttribute("class", "subtituloCarro");
    const FILA3 = document.getElementById("variacion");
    FILA3.setAttribute("class", "subtituloCarro");
    const TIPO = ["sale_price", "medium_price", "purchase_price"]
    for(i=0;i<3;i++){
        const CONTENEDOR = document.createElement("td");
        FILA.appendChild(CONTENEDOR);
        CONTENEDOR.innerHTML="$"+datos[TIPO[i]];

        const CONTENEDOR2 = document.createElement("td");
        FILA2.appendChild(CONTENEDOR2);
        CONTENEDOR2.innerHTML="Cambio de "+per+" mes(es)"; //per es la cantidad de meses que solicitó desplegar.

        const CONTENEDOR3 = document.createElement("td");
        FILA3.appendChild(CONTENEDOR3);
        CONTENEDOR3.innerHTML = "-$" + (-variar[i][0]) + " (" + variar[i][1] + "%)"; 
        //variar[i] para avanzar entre venta, medio y compra
        //variar[i][0] nos da el precio, variar[i][1] nos da porcentaje
    }
}

/*
objetivo: Llenamos el espacio de gráfica, precios, y kilometraje.

params:
    datos: Los datos de la api

return: No retorna
*/
function llenarDatos(datos){
    //alert(datos);
    datos=JSON.parse(datos);
    if(datos["historic"].length==0) return;
    grafica(datos["historic"]);
    precios(datos["historic"][0], datos["historic"].length, [[datos["sale_price_variation"], datos["sale_price_percentage_variation"]], [datos["medium_price_variation"], datos["medium_price_percentage_variation"]], [datos["purchase_price_variation"], datos["purchase_price_percentage_variation"]]]);
}