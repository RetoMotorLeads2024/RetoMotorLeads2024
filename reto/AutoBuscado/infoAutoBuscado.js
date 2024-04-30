function llenarDatosAutoBuscado(datosFormulario){

    const pMarcaModelo = document.getElementById("pMarcaModelo");

    document.getElementById("imgMarca").src = "../Imagenes/MarcasLogos/"+ datosFormulario["makes"]["name"] + ".png"; 

    pMarcaModelo.innerHTML = datosFormulario["makes"]["name"] + " " + datosFormulario["models"]["name"];

    let elementosRestantes = Object.keys(datosFormulario).length -2;

    document.getElementById("tdMarcaModelo").setAttribute("colspan",elementosRestantes+1);

    for(let llave of Object.keys(datosFormulario)){
        if(llave == "makes" || llave == "models") continue;

        const trInfoAuto = document.getElementById("trDatosAuto");

        const dato = datosFormulario[llave]["name"];

        const tdNuevo = document.createElement("td");
        const pInfo = document.createElement("p");
        pInfo.innerHTML = dato;
        pInfo.setAttribute("class","subtituloCarro");

        tdNuevo.appendChild(pInfo);
        trInfoAuto.appendChild(tdNuevo);

        const tdPuntito = document.createElement("td");
        const pPuntito = document.createElement("p");

        if(elementosRestantes != 1){
            pPuntito.innerHTML ="•";
            tdPuntito.appendChild(pPuntito);
            trInfoAuto.appendChild(tdPuntito);
        }
    

        elementosRestantes = elementosRestantes-1;
        
    }

}

