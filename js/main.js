let Vaciar=document.getElementById("btnVaciar");  //se declara el button para vaciar la local storage

const comprasKey = "compras"; //DEFINO LA LLAVE
const localStorageCompras = localStorage.getItem(comprasKey); // TOMO EL VALOR DEL LOCAL STORAGE
 console.log(localStorageCompras); // MUESTRO EN CONSOLA EL VALOR PARA COMPROBAR

let compras; 

if (localStorageCompras == null) { // ASIGNO UN VALOR A COMPRAS "NUL" porque si el storage esta vacío su valor sera nullo
  compras = []; //luego entonces si es null, iniciara un array vacío.

} else {  // SI EL LOCAL STORAGE NO ES NULL entonces convierte el JSON a string para mostrarlo de nuevo en la tabla. 
  compras = JSON.parse(localStorageCompras);
  actualizaTabla(); // se ejecuta esta función que muestra el contenido en la tabla. 
  actualizaTotal(); // también se ejecuta esta otra función que suma el total de los precios. 
  actualizaResumen(); // se ejecuta esta función que suma el total de los productos. 
}

let btnSubmit = document.getElementById("btnSubmit"); //se crea el evento click del button submit 
btnSubmit.addEventListener("click", onClickButton);
function onClickButton(e) {
  e.preventDefault();

  almacenaCompra(); // se ejecuta esta función que toma el valor de los campos nombre y número  
  // y que a su vez esta misma función valida los mismos y decide si crear o no el objeto que integrará el array. 

  localStorage.setItem(comprasKey, JSON.stringify(compras)); // si los campos son validos entonces coloca el array - 
  // convertido a formato JSON en el local storage.
 
  actualizaTabla();  // se ejecuta esta función que muestra el contenido en la tabla. 
  actualizaTotal(); // también se ejecuta esta otra función que suma el total de los precios.  
  actualizaResumen(); // se ejecuta esta función que suma el total de los productos. 
}

function almacenaCompra() {  // se ejecuta esta función que toma el valor de los campos nombre y número  
    // y que a su vez esta misma función valida los mismos. 
  const campo1 = document.getElementById("Name");
  const campo2 = document.getElementById("Number");

//console log para comprobaciones
  console.log(campo1.value, campo2.value); 
  console.log(typeof campo1.value, typeof campo2.value);
  console.log(campo1.value.length, campo2.value.length);

  const campoValidos = validaCampos(campo1, campo2); // se crea la constante para validar los campos con una función declarada posteriormente. 

  if (campoValidos == true) { // si los campos son validados arroja un true y se crea el objeto que dará los elementos al array
    //se es verdadero se crea el objeto si es falso evita su creación. 

    // CREACIÓN DE OBJETO "COMPRA"
    const compra = {
      nombre: campo1.value, // se le asigna un nombre a la compra
      cantidad: campo2.value, // se le asigna una cantidad de la compra
      precio: Math.random()*100, // se le asigna un precio aleatorio con Math.random
    }; // AJUSTAR EL PRECIO A DOS DECIMALES SOLO. 

    //METE DENTRO EL OBJETO EN EL ARRAY CON EL MÉTODO PUSH
    compras.push(compra);
  }
}

//A CONTINUACIÓN SE DECLARAN LAS VARIAS FUNCIONES 

function actualizaTabla() { //se muestra el contenido de una tabla html con un inner.HTML
  const tabla = document.getElementById("tablaCompras");
  tabla.innerHTML = `<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Precio</th>
    </tr>
    </thead>
    <tbody>`;

  //SE INTEGRA LA TABLA RECORRIENDO EL ARRAY CON UN FOR 
  for (let index = 0; index < compras.length; index++) { // Se declara la variable contador "index", se establece la condición del bucle
    // la condición es que el contador sea menor a la longitud del array, y luego se establece la iteración en este caso un +1 para recorrer el array. 
   
    const compra = compras[index];  // se establece la sentencia que se ejecutará si la condición anterior se cumple:
    //SE TOMA EL ELEMENTO DEL ARRAY USANDO EL INDICE. ??

    //con un innerHTML se muestran en la tabla los elementos del objeto "compra" creado anteriormente.
    tabla.innerHTML += `<tr> 
    <th scope="row">${index + 1}</th> 
    <td>${compra.nombre}</td>
    <td>${compra.cantidad}</td>
    <td>${compra.precio}</td>
    </tr>`;
  }

  tabla.innerHTML += "</tbody>";
}

//Se crea una función automática para vaciar el contenido de los campos rellenados con anterioridad para no borrarlos manualmente. 
function limpiaCampos(campoNombre, campoCantidad) { 
  campoNombre.value = "";
  campoCantidad.value = "";

  campoNombre.classList.remove("is-invalid");
  campoNombre.classList.remove("is-valid");

  campoCantidad.classList.remove("is-invalid");
  campoCantidad.classList.remove("is-valid");
}

//Se crea la función que validará los campos del nombre del producto y la cantidad de productos.
function validaCampos(campo1, campo2) { 
  let validos = true; // se asigna un true para que solo cree el objeto con campos válidos, de otra forma se crea el objeto con números negativos etc

  if (campo1.value.length >= 3) { //validación correcta

    campo1.classList.remove("is-invalid"); // si es mayor o igual a 3 se validará el campo.
    campo1.classList.add("is-valid");

  } else {
  
    campo1.classList.remove("is-valid"); // si es menor de 3 no se validará el campo.
    campo1.classList.add("is-invalid");

    validos = false; // se asigna un falso para evitar que se cree el objeto con campos no validados. 
  }

  // Se crea un bloque de instrucciones a intentar (TRY), y especifica una respuesta si se produce una excepción o error (CATCH)
  try {
    const cantidadint = parseFloat(campo2.value, 10); //Se declara una variable interna que es igual al valor del campo 2 (numero) en base decimal convertido a número flotante. 
    if (cantidadint > 0 && cantidadint < 11) { // la condición if:  si la variable es menor a 0 Y menor a 11 entonces es validado el campo número. 
      campo2.classList.remove("is-invalid");
      campo2.classList.add("is-valid");

    } else { // DE OTRA FORMA el campo sera inválido. 
      campo2.classList.remove("is-valid");
      campo2.classList.add("is-invalid");

      validos = false; // se asigna un falso para evitar que se cree el objeto con campos no validados
    }
  } catch (error) { // En caso de error se aplica una instrucción alternativa (CATCH) en este caso invalidar el campo 
    // en caso de negativos, (0), de símbolos, letras, etc. 
    campo2.classList.remove("is-valid");
    campo2.classList.add("is-invalid");
    validos = false; // se asigna un falso para evitar que se cree el objeto con campos no validados
  }

  return validos; 
}

// Se crea la función que actualiza el total de los precios de los productos. 
function actualizaTotal() {
  const campoTotal = document.getElementById("total"); // se toma el id del campo donde se observa el total en el html. 
  campoTotal.innerHTML = `$ ${sumaPrecios()}`; // el resultado sera la ejecución de otra función declarada a continuación. 
}

//Función creada para complementar a la función que muestra el total en pantalla con un inner, 
//Esta es la que realiza la suma. 
function sumaPrecios() { 
  let total = 0; 
  for (let compra of compras) { // se utiliza un ciclo del tipo FOR OF para recorrer los elementos del array y sumarlos 
    total += compra.precio;  // total = total + precio (valor del precio del objeto creado "compra") 
    // De esta forma se suman todos y cada uno de los elementos del array. 
  }
  return  Math.round(total); // se redondea el total con la función Math.round
}

function actualizaResumen() {
    const campoResumen = document.getElementById("resumen");
    campoResumen.innerHTML = `${sumaResumen()}`;
  }
  
  function sumaResumen() {
    let total = 0;
    for (let compra of compras) {
      total += parseInt(compra.cantidad);  // suma valores
  
    }
    return  total;
  }

// Se crea el evento click al botón Vaciar para remover los elementos del local storage con un remove item. 
  Vaciar.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem(comprasKey);
    
});