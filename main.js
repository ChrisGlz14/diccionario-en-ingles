 // const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  //Podria usar la url de la API a traves de una variable que la tenga

  //Recupero elementos del DOM
 const result = document.getElementById("result");
 const sound = document.getElementById("sound");
 const btn = document.getElementById("search-btn")


 btn.addEventListener("click", () => {
     let inputWord = document.getElementById("inp-word").value; //Se crea una variable que recupere el value del input


     fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`) // Realiza una solicitud a la API de diccionario con el valor actual del input mediante fetch
         .then((res) => res.json()) // Convierto la respuesta a formato JSON
         .then((data) => {   // Convierto la respuesta a formato JSON
             console.log(data); // Muestro los datos en la consola para verificar la respuesta, luego podria borrarlo

             //Pinto en result el template string con los datos de la API
             result.innerHTML = `
             <div class="word">
                     <h3>${inputWord}</h3>
                     <button onclick="playSound()">
                         <i class="fas fa-volume-up"></i>
                     </button>
                 </div>
                 <div class="details">
                     <p>${data[0].meanings[0].partOfSpeech}</p>
                     <p>/${data[0].phonetic}/</p>
                 </div>
                 <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                 </p>
                 <p class="word-example">
                     ${data[0].meanings[0].definitions[0].example || ""}
                 </p>`;
             sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
         })
         .catch(() => { //Manejo los errores con Catch
             result.innerHTML = `<h3 class="error">No se encuentra la palabra! :/</h3>`;
         });
 });