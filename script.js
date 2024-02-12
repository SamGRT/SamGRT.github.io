let guardados = localStorage.getItem("usuario");
const principal_container = document.querySelector(".Principal_Container");
const Ranking = document.querySelector(".Victory_container");
Ranking.classList.innerHTML = guardados;
const title = document.querySelector(".title");
const Second_container= document.querySelector(".Second_container");
const reset= document.querySelector(".reinicio");
principal_container.classList.remove("hidden");
Ranking.classList.remove("hidden");
title.classList.remove("moved");
Second_container.classList.add("hidden");
reset.classList.add("hidden");
let nrosSorteados =0;
let players=[];
let dim = 0 ;
let numRonda = 0;
let puntaje1=0;
let puntaje2=0;
let puntaje3=0;
let puntaje4=0;
let tableros = [];
let ganador= "";
let juego_terminado=false;


function StartGame(players, dim){
    if (players.some(player => player.trim() === '') || dim==0) {
        
        alert("Asegurese de registrar 4 jugadores, confirmarlos y seleccionar una dimensión ");
    } else {

        alert("¡A JUGAR!");
        principal_container.classList.add("hidden");
        Ranking.classList.add("hidden");
        title.classList.add("moved");
        Second_container.classList.remove("hidden");
        for (let index = 0; index < 4; index++) {
            tableros[index]= generar_tablero(dim);
        }
        const nros_fulltab= tableros[0].flat();
        console.log(nros_fulltab); /*nros par carton lleno*/
        
        /*mostar tableros,creacion de tableros */
        

        let table1 = document.querySelector(".table1");
        display_tablero(tableros[0],table1,players[0]);
        table1.classList.remove("hidden");

        let table2 = document.querySelector(".table2");
        display_tablero(tableros[1],table2,players[1]);
        table2.classList.add("hidden");

        let table3 = document.querySelector(".table3");
        display_tablero(tableros[2],table3,players[2]);
        table3.classList.add("hidden");

        let table4 = document.querySelector(".table4");
        display_tablero(tableros[3],table4,players[3]);   
        table4.classList.add("hidden"); 

        document.getElementById("J1").addEventListener("click", function(event){
            event.preventDefault();
            table1.classList.remove("hidden");
            table2.classList.add("hidden");
            table3.classList.add("hidden");
            table4.classList.add("hidden"); 

        });
        document.getElementById("J2").addEventListener("click", function(event){
            event.preventDefault();
            table1.classList.add("hidden");
            table2.classList.remove("hidden");
            table3.classList.add("hidden");
            table4.classList.add("hidden"); 

        });
        document.getElementById("J3").addEventListener("click", function(event){
            event.preventDefault();
            table1.classList.add("hidden");
            table2.classList.add("hidden");
            table3.classList.remove("hidden");
            table4.classList.add("hidden"); 

        });
        document.getElementById("J4").addEventListener("click", function(event){
            event.preventDefault();
            table1.classList.add("hidden");
            table2.classList.add("hidden");
            table3.classList.add("hidden");
            table4.classList.remove("hidden"); 

        });
        let horiz_vert1 =false;
        let horiz_vert2=false;
        let horiz_vert3= false;
        let horiz_vert4=false;

        let diagonal_Tab1 =false;
        let diagonal_Tab2=false;
        let diagonal_Tab3= false;
        let diagonal_Tab4 = false;
        nrosSorteados =0;
        document.getElementById("Sortear_buttom").addEventListener("click", function(event){
            event.preventDefault();
            
            
            if (numRonda!=25){
                numRonda++;
                nrosSorteados++;
                nros_generados = nros_a_sortear(nros_fulltab,dim);
                document.getElementById("round").innerHTML= "RONDA:  "+ numRonda;
                let nro_sorteado= document.getElementById("nroSorteado");
                nro_sorteado.textContent= nros_generados[nrosSorteados-1]; 
                
                
                
                nro_encontrado(table1,nros_generados[nrosSorteados -1]);
                nro_encontrado(table2,nros_generados[nrosSorteados -1]);
                nro_encontrado(table3,nros_generados[nrosSorteados -1]);
                nro_encontrado(table4,nros_generados[nrosSorteados -1]);

                
                
                  
                horiz_vert1 = horizontales_verticales(table1);
                
              
                horiz_vert2= horizontales_verticales(table2);
                horiz_vert3= horizontales_verticales(table3);
                horiz_vert4= horizontales_verticales(table4);
                /* estas no se por que no me funcionaron
                diagonal_Tab1 = diagonales(table1);
                diagonal_Tab2 = diagonales(table2);
                diagonal_Tab3= diagonales(table3);
                diagonal_Tab4= diagonales(table4);
                */
                if (horiz_vert1){puntaje1+=1}
                else if (horiz_vert2){puntaje2+=1}
                else if (horiz_vert3){puntaje3+=1}
                else if (horiz_vert4){puntaje4+=1}
                /*
                else if (diagonal_Tab1){puntaje1+=3}
                else if (diagonal_Tab2){puntaje2+=3}
                else if (diagonal_Tab3){puntaje3+=3}
                else if (diagonal_Tab4){puntaje4+=3}
                */
            }
            if(numRonda == 25 ){
                document.getElementById("round").innerHTML= "RONDA:  "+ numRonda;
                ganador = players[variableMayor(puntaje1,puntaje2,puntaje3,puntaje4)-1];
                if (variableMayor(puntaje1,puntaje2,puntaje3,puntaje4) ==1){
                    console.log("bye");
                    GameOver(players,ganador,puntaje1);

                }else if (variableMayor(puntaje1,puntaje2,puntaje3,puntaje4) ==2){
                    GameOver(players,ganador,puntaje2);
                } else if (variableMayor(puntaje1,puntaje2,puntaje3,puntaje4) ==3){GameOver(players,ganador,puntaje3);}
                else if (variableMayor(puntaje1,puntaje2,puntaje3,puntaje4) ==4){GameOver(players,ganador,puntaje4)}
                }
        
        });
        
        
    }
    
}

document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    let user1 = document.getElementById('user1').value;
    let user2 = document.getElementById('user2').value;
    let user3 = document.getElementById('user3').value;
    let user4 = document.getElementById('user4').value;
    players = [user1,user2,user3,user4];

    console.log(players);

});
let buttoms = document.querySelectorAll("#buttomsM");
function resetButtonStyles() {
    buttoms.forEach(function(button) {
        button.style.backgroundColor = "whitesmoke";
        button.style.color= "black"; 
    });
}

    document.querySelector(".b3X3").addEventListener('click', function(event) {
        event.preventDefault();
        resetButtonStyles();
        dim = 3;
        this.style.backgroundColor = "rgb(18, 78, 78)"; 
        this.style.color = "white";
        
    });

    document.querySelector(".b4x4").addEventListener('click', function(event) {
        event.preventDefault();
        resetButtonStyles();
        dim = 4;
        this.style.backgroundColor = "rgb(18, 78, 78)"; 
        this.style.color = "white";
    });

    document.querySelector(".b5X5").addEventListener('click', function(event) {
        event.preventDefault();
        resetButtonStyles();
        dim = 5;
        this.style.backgroundColor = "rgb(18, 78, 78)"; 
        this.style.color = "white";
    });
    
    

document.getElementById("PlayButtom").addEventListener("click", function(event) {
 event.preventDefault();
    StartGame(players,dim)

    
    
    ;});


    function variableMayor(a, b, c, d) {
        let max = Math.max(a, b, c, d);
        if (max === a) {
            return 1;
        } else if (max === b) {
            return 2;
        } else if (max === c) {
            return 3;
        } else {
            return 4;
        }
    }
    
    
function GameOver(players, ganador,puntaje){
    reset.classList.remove("hidden");
    let felicidades = document.createElement("div");
    felicidades.textContent = "FELICIDADES "+ ganador + " !, TU PUNTAJE --> "+puntaje;
    felicidades.className="feli hidden";
    document.body.appendChild(felicidades);
    document.querySelector(".feli").classList.remove("hidden");
    localStorage.setItem("usuario",ganador + "ptos: " + puntaje);


    

    document.getElementById("reset").addEventListener("click", function(event) {
        event.preventDefault(); 
        players=[];
        dim = 0 ;
        numRonda = 0;
        puntaje=0;
        tableros = [];
        principal_container.classList.remove("hidden");
        Ranking.classList.remove("hidden");
        title.classList.remove("moved");
        Second_container.classList.add("hidden");
        reset.classList.add("hidden");
        document.querySelector(".feli").classList.add("hidden");
        
    });



}

function lineaSeleccionada(linea) {
    for (let i = 0; i < linea.length; i++) {
        let fila_columna = linea[i];
        if (!fila_columna.classList.contains("acertados")) { // Corrección aquí
            return false;
        }
    }
    return true;
    }
    
    

function horizontales_verticales(table){
        /*lineas horizontales y verticales*/
        
        for (let i = 0; i < table.getElementsByClassName("row").length; i++) {
            let row = table.getElementsByClassName("row")[i].getElementsByClassName("celdas");
            let column = [];
            for (let j = 0; j < table.getElementsByClassName("row").length; j++) {
                column.push(table.getElementsByClassName("row")[j].getElementsByClassName("celdas")[i]);
            }
            if (lineaSeleccionada(row) || lineaSeleccionada(column)) {
                console.log(lineaSeleccionada(row));
                console.log(lineaSeleccionada(column));
                return true;
            }
        }
        return false;
    }
    

function diagonales(table){
     /*lineas diagonales*/
     let diagonal1 = [];
     let diagonal2 = [];
     for (let i = 0; i < table.getElementsByClassName("row").length; i++) {
         diagonal1.push(table.getElementsByClassName("row")[i].getElementsByClassName("celdas")[i]);
         diagonal2.push(table.getElementsByClassName("row")[i].getElementsByClassName("celdas")[table.length - i - 1]);
     }
     return lineaSeleccionada(diagonal1) || lineaSeleccionada(diagonal2);
 }
    
    


               
function nro_encontrado (especific_table, numero){
    let celdas = especific_table.getElementsByClassName("celdas");
    
        for (let i = 0; i < celdas.length; i++) {
            if (celdas[i].textContent == numero) {
                celdas[i].style.backgroundColor = "whitesmoke";
                celdas[i].classList.add("acertados");
                
            }
        }
    }
      
  
function nros_a_sortear (fulltab,dim){
    let aleatorios = nroAleatorio();
    let nros = [];
    switch (dim) {
        case 3:
            for (let i = 0; i < 16 ; i++) {
                nros[i]= aleatorios[i];
                
            }
            nros= nros.concat(fulltab);

            return nros;
    
        case 4:
            for (let i = 0; i < 9 ; i++) {
                nros[i]= aleatorios[i];
                
            }
            nros=nros.concat(fulltab);

            return nros;
        case 5:
            fulltab.sort();
            return fulltab;

            
    }

}       

function xor3(horizontal, vertical, diagonal) {
    return (horizontal ? 1 : 0) + (vertical ? 1 : 0) + (diagonal ? 1 : 0) === 1;
}

function xor2(a, b) {
    return (a ? 1 : 0) + (b ? 1 : 0) === 1;
}
   
function nroAleatorio() { /*array de nros del 1 al 50 mezclados aleatoriamente*/
    let numeros = [];
    for (let i = 1; i <= 50; i++) {
        numeros.push(i);
    }

    numeros.sort(() => Math.random() - 0.5);

    return numeros;
}


function generar_tablero(dim){
    let numeros = nroAleatorio();
    let tablero=[];
    for (let i = 0; i < dim; i++) {
        tablero[i] = [];
        for (let j = 0; j < dim; j++) {
            tablero[i][j] = numeros[i * dim + j];
            
        }        
    }
    console.log(tablero);
    return tablero;
} 

function display_tablero(matriz,especific_table,nombreJugador){
    
    while (especific_table.firstChild) {
        especific_table.removeChild(especific_table.firstChild);
    }
    
    let titulo = document.createElement("h4");
    titulo.textContent = "Jugador --> " + nombreJugador;
    titulo.style.position= "absolute";
    titulo.style.bottom= "100%";
    titulo.style.left="25%";
    especific_table.appendChild(titulo);
    for (let i = 0; i < matriz.length; i++) {
        let row = document.createElement("div");
        row.className="row";
        for (let j = 0; j < matriz[i].length; j++) {
            let celda = document.createElement("div");
            celda.textContent = matriz[i][j];
            celda.className="celdas";
        
            row.appendChild(celda);
        }

        especific_table.appendChild(row);

        
    }

}

/*function NrosUnicos(cantidad_nros){

    const nrosunicos = new Set();
    while(nrosunicos.size < cantidad_nros){
        const nrosorteado = nroAleatorio();
        nrosunicos.add(nrosorteado);
    }
    return Array.from(nrosunicos);
}*/







