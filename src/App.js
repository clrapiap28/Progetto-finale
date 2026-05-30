import React, {useState, useEffect} from "react";
import {View, Text, Button, Image, StyleSheet, SafeAreaView} from "react-native";


//50 CARTE COMPLETE (Situazioni spiacevoli a scuola)

/**
 * Elenco completo delle carte del gioco.
 * Ogni carta rappresenta una situazione sfortunata a scuola
 * con un indice di sfortuna compreso tra 5 e 100.
 *
 * @typedef {Object} Carta
 * @property {number} id Identificativo univoco.
 * @property {string} nome Descrizione della situazione.
 * @property {string} immagine Percorso o URL dell'immagine.
 * @property {number} indice Grado di sfortuna della carta.
 */

/**
 * Mazzo completo delle carte disponibili.
 * @type {Carta[]}
 */

const carte=[
  {id:1, nome: "Dimentichi il quaderno di italiano", immagine: "fda67c50-652d-4b3e-9588-f78d3e689c2d.png", indice: 5.0},
  {id:2, nome: "Cade l'astuccio aperto per terra e finisce tutto a terra", immagine: "c3915113-4ff0-4c6d-829e-4f11875fb337.png", indice: 7.0},
  {id:3, nome: "Ti dimentichi dello zaino sull’autobus", immagine: "https://thumbs.dreamstime.com/b/una-borsa-perduta-o-uno-zaino-sdraiato-sul-sedile-dell-autobus-sullo-sfondo-sfuocato-del-bus-beni-immobili-nei-trasporti-pubblici-229783651.jpg", indice: 9.0},
  {id:4, nome: "La tua presentazione PowerPoint non si apre", immagine: "https://images.wondershare.com/recoverit/article/2019/05/ppt-error-1.jpg", indice: 11.0},
  {id:5, nome: "Dimentichi che c’è educazione fisica e sei l’unico senza cambio", immagine: "23bf8e1f-0834-45c4-b463-23a465e3c0e1.png", indice: 13.0 },
  {id:6, nome: "Il distributore automatico ti mangia i soldi e resta bloccato", immagine: "https://c8.alamy.com/compit/f1xewt/il-cibo-bloccato-nel-distributore-f1xewt.jpg", indice: 15.0 },
  {id:7, nome: "Ti rubano lo zaino con dentro computer, chiavi e compiti", immagine: "", indice: 17.0 },
  {id:8, nome: "Ti ammali proprio durante la settimana delle verifiche decisive", immagine: "https://www.issalute.it/images/foto_contributi/240x240/raffreddore.jpg", indice: 19.0 },
  {id:9, nome: "Entri nell’aula sbagliata davanti a tutti.", immagine: "c3953c35-96d1-44c6-8059-c54b54435c02.png", indice: 21.0 },
  {id:10, nome: "Il professore ti scopre mentre copi i compiti all’ultimo secondo", immagine: "6c9f8230-59c7-4b4a-9a5c-e7ed4526e393.png", indice: 23.0 },
  {id:11, nome: "La classe è in silenzio totale e il tuo stomaco fa un rumore assurdo", immagine: "", indice: 25.0 },
  {id:12, nome: "Rompi accidentalmente la sedia mentre ti siedi", immagine: "435c189f-1271-491b-a2c1-329fdafdacb3.png", indice: 27.0 },
  {id:13, nome: "Suona il telefono in classe nel silenzio totale", immagine: "ba4ddf7c-808d-49f9-9add-ba4bab7ba66d.png", indice: 29.0 },
  {id:14, nome: "Ti rendi conto di aver studiato il capitolo sbagliato", immagine: "35f16ffe-5666-4091-82c0-2a5a148f3d72.png", indice: 31.0 },
  {id:15, nome: "Il compagno accanto a te vomita durante la verifica", immagine: "b7868fa6-4dff-4b43-b124-bf2fe38cc0a1.png", indice: 33.0 },
  {id:16, nome: "Ti si strappano i pantaloni mentre ti alzi", immagine: "bbf3422f-28d1-48b0-8849-92512bd55015.png", indice: 35.0 },
  {id:17, nome: "Il professore legge ad alta voce un tuo messaggio imbarazzante trovato sul banco", immagine: "244a0035-b667-45a7-8ec7-bb72bb369633.png", indice: 37.0 },
  {id:18, nome: "Prendi un’insufficienza enorme proprio nel giorno dei colloqui", immagine: "7f7fc3da-84ff-44fd-80d0-3f6fcec4dfd7.png", indice: 39.0 },
  {id:19, nome: "La classe ride per una risposta completamente sbagliata che hai dato", immagine: "d88e6f3b-84de-4d87-a53c-77be1a18525c.png", indice: 41.0 },
  {id:20, nome: "Durante l’interrogazione ti viene un vuoto totale", immagine: "6d7c54a7-adc3-45e0-be4a-a1133131c5cd.png", indice: 43.0 },
  {id:21, nome: "Ti rompi gli occhiali durante educazione fisica", immagine: "91316cb7-1748-464d-9a5b-f0d11e12b3c6.png", indice: 45.0 },
  {id:22, nome: "Rimani chiuso nel bagno durante la ricreazione", immagine: "796ae73c-e64f-467e-96e9-102c8a2440db.png", indice: 47.0 },
  {id:23, nome: "Il computer del laboratorio si blocca e perdi un progetto fatto in settimane", immagine: "dc96e160-a4ef-4cb1-b6f1-f54ab866ae29.png", indice: 49.0 },
  {id:24, nome: "Ti cancellano per errore il voto migliore dal registro", immagine: "afdaf47f-21cd-46dd-9be1-4d6547c7d8c9.png", indice: 51.0 },
  {id:25, nome: "Ti suona la campanella nell'orecchio", immagine: "fc444c8d-f279-4251-8f41-a9e0672d14c5.png", indice: 53.0 },
  {id:26, nome: "Scopri di avere due verifiche a sorpresa nella stessa mattina", immagine: "4929cde0-e3c2-4805-ac41-5ce41a5b265a.png", indice: 55.0 },
  {id:27, nome: "Il professore perde il tuo compito migliore e ti mette insufficiente perché “non risulta consegnato”", immagine: "6f5eb12d-9808-42e4-a44a-3d6b26f0ead3.png", indice: 57.0 },
  {id:28, nome: "Informatica interroga a sorpresa sull'argomento che non hai capito", immagine: "784f6ce3-a159-404e-a8ea-052c50bb800a.png", indice: 59.0 },
  {id:29, nome: "Il professore ti sceglie come esempio… di cosa NON fare", immagine: "32eb84c2-a20d-4bdc-b620-39e45bad7acf.png", indice: 61.0 },
  {id:30, nome: "Il tuo evidenziatore esplode e ti ritrovi le dita fluorescenti per tutto il giorno", immagine: "3237cebf-5830-472a-b263-2ff04636b2a3.png", indice: 63.0 },
  {id:31, nome: "Il professore decide di mostrare “un elaborato anonimo pieno di errori”… ed è chiaramente il tuo", immagine: "4678e853-89c7-4470-8fe6-28d8cebd00c3.png", indice: 65.0 },
  {id:32, nome: "Ti addormenti per un secondo e il prof ti fa una domanda proprio in quel momento", immagine: "1a1c829a-827c-4898-849d-3bf8d0149400.png", indice: 67.0 },
  {id:33, nome: "Ti accorgi troppo tardi di aver scritto tutta la verifica con la matita", immagine: "0aac4005-2579-4c3a-b71c-4c3a056fad85.png", indice: 69.0 },
  {id:34, nome: "Durante l’intervallo qualcuno si siede sul tuo panino senza accorgersene", immagine: "7a6b0760-d092-4141-b978-e6d0a734656f.png", indice: 71.0 },
  {id:35, nome: "Stai per consegnare il compito e ti accorgi di aver saltato una pagina intera", immagine: "5b27109e-a612-46ee-9934-ea740e02e11b.png", indice: 73.0 },
  {id:36, nome: "Hai caldo tutta la mattina perché hai messo una felpa pesantissima senza controllare il meteo", immagine: "", indice: 75.0 },
  {id:37, nome: "Cerchi di aprire una porta spingendo… ma andava tirata", immagine: "", indice: 77.0},
  {id:38, nome: "Devi leggere ad alta voce e trovi una parola che non sai pronunciare", immagine: "", indice: 79.0},
  {id:39, nome: "Il professore continua a parlare durante una verifica distraendoti", immagine: "", indice: 81.0},
  {id:40, nome: "Scrivi una risposta lunga e poi scopri di aver saltato la domanda precedente", immagine: "", indice: 83.0},
  {id:41, nome: "Ti dimentichi di mettere il nome sulla verifica", immagine: "", indice: 85.0 },
  {id:42, nome: "Vai in bagno durante l’intervallo e quando torni qualcuno ha preso il tuo posto", immagine: "", indice: 87.0},
  {id:43, nome: "Arrivi con la batteria del computer al 2% e hai dimenticato il caricatore", immagine: "", indice: 89.0},
  {id:44, nome: "Ti prestano un righello tutto piegato durante un compito sulle funzioni matematiche", immagine: "", indice: 91.0},
  {id:45, nome: "Ti siedi nell’unico banco che traballa", immagine: "", indice: 93.0 },
  {id:46, nome: "Prepari un discorso mentale perfetto per l’interrogazione… ma quando inizi a parlare ti incarti subito", immagine: "", indice: 95.0 },
  {id:47, nome: "Dici sottovoce un gossip importantissimo al tuo compagno di banco e fanno tutti silenzio proprio nel momento clou ", immagine: "", indice: 96.0},
  {id:48, nome: "Mentre cancelli la matita sulla verifica, ti si strappa il foglio", immagine: "", indice: 97.0},
  {id:49, nome: "Ti dimentichi una bottiglietta aperta nello zaino per tutta la mattina", immagine: "", indice: 98.0},
  {id:50, nome: "Fai scena muta all’esame orale davanti alla commissione", immagine: "", indice: 100.0},
];


const shuffle=(arr)=>{
  const copia=[...arr];

  for(let i=copia.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [copia[i], copia[j]]=[copia[j], copia[i]];
  }
  return copia;
}




export default function App(){
  const [schermata,setSchermata]=useState("HOME");
  const [mano,setMano]=useState([]);
  const [cartaRound,setCartaRound]=useState(null);
  const [v,setVite]=useState(3);
  const [timer,setTimer]=useState(30);
  const [messaggio,setMessaggio]=useState("");



  //INIZIA IL GIOCO
  const startGame=()=>{
    const iniziali=shuffle(carte).slice(0, 3).sort((a, b)=>a.indice-b.indice);
    setMano(iniziali);
    setVite(3);
    setSchermata("GIOCO!");
  };

 
  //ALTRO ROUND
 
  const altroRound=()=>{
    const disponibili=carte.filter(c=>!mano.some(m=>m.id===c.id));
    const scelta=disponibili[Math.floor(Math.random()*disponibili.length)];
    setCartaRound(scelta);
    setTimer(30);
    setSchermata("ROUND");
  };

 
  //TIMER
  
  useEffect(()=>{
    if(schermata!=="ROUND")return;

    if (timer<=0){
      setVite(v-1);
      setMessaggio("DIN DIN DIN!!Tempo scaduto!Hai perso una vita ;(");
      setSchermata("RISULTATO");
      return;
    }

    const interval=setInterval(()=>setTimer(t=>t-1),1000);
    return()=>clearInterval(interval);
  }, [schermata, timer]);

  
  //CONTROLLO POSIZIONE
  
  const controlla=(posizioneScelta)=>{
    const ordinata=[...mano,cartaRound].sort((a, b)=>a.indice-b.indice);
    const posizioneCorretta=ordinata.indexOf(cartaRound);

    if (posizioneScelta===posizioneCorretta){
      setMano(ordinata);
      setMessaggio("CORRETTO! Hai ottenuto la carta :)");
    } else {
      setVite(v-1);
      setMessaggio("SBAGLIATO! Hai perso una vita ;(");
    }

    setSchermata("FINE");
  };

  
  //FINE PARTITA
  
  useEffect(()=>{
    if(mano.length===6){
      setMessaggio("VICTORY! Hai ottenuto 6 carte.");
      setSchermata("FINE");
    }
    if(v===0){
      setMessaggio("LOSER! Hai finito le vite.");
      setSchermata("FINE");
    }
  }, [mano, v]);

  
  //LE VITE
 
  const renderVite=()=>{
    return(
      <Text style={styles.vite}>
        {v>= 1 ? "❤️" : "🤍"}
        {v>= 2 ? "❤️" : "🤍"}
        {v>= 3 ? "❤️" : "🤍"}
      </Text>
    );
  };


  //SCHERMATE

  if (schermata==="HOME"){
  return(
    <SafeAreaView style={styles.center}>
      <Text style={styles.titolo}>
        Gioco della Sfortuna
      </Text>

      <Button
        title="Comincia la tua partita"
        onPress={startGame}
      />
    </SafeAreaView>
  );
}

if (schermata==="GIOCO!"){
  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.titolo}>Le tue carte</Text>

      <Text style={styles.info}>Carte: {mano.length}/6 </Text>

      {renderVite()}

      {mano.map(c=>(
        <Text key={c.id} style={styles.nome}>
          {c.nome}
        </Text>
      ))}

      <Button
        title="Nuovo Round"
        onPress={altroRound}
      />
    </SafeAreaView>
  );
}

if (schermata==="ROUND"){
  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.titolo}>
        Nuova Situazione
      </Text>

      <Text style={styles.info}>
        Carte: {mano.length}/6
      </Text>

      {renderVite()}

      <Text style={styles.timer}>
        ⏳ {timer}s
      </Text>

      <Image
        source={{uri: cartaRound.immagine}}
        style={styles.img}
      />

      <Text style={styles.nome}>
        {cartaRound.nome}
      </Text>

      {mano.map((m, i)=>(
        <Button
          key={i}
          title={`Dopo ${m.indice}`}
          onPress={()=>controlla(i+1)}
        />
      ))}
    </SafeAreaView>
  );
}

if (schermata==="RISULTATO"){
  return(
    <SafeAreaView style={styles.center}>
      <Text style={styles.titolo}>
        {messaggio}
      </Text>

      <Button
        title="Continua"
        onPress={altroRound}
      />
    </SafeAreaView>
  );
}

if(schermata==="FINE"){
  return(
    <SafeAreaView style={styles.center}>
      <Text style={styles.titolo}>
        {messaggio}
      </Text>

      <Button
        title="Torna alla Home"
        onPress={() => setSchermata("HOME")}
      />
    </SafeAreaView>
  );
}

return null;  

}

const styles=StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"lightblue",
  },



  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"lightblue",
    padding:20,
  },



  titolo:{
    fontSize:32,
    fontWeight:"bold",
    marginBottom:20,
    textAlign:"center",
    color:"white",
  },



  info:{
    fontSize:18,
    marginBottom:8,
    textAlign:"center",
    color:"lightgray",
  },




  timer:{
    fontSize:30,
    fontWeight:"bold",
    color:"red",
    marginBottom:15,
    textAlign:"center",
  },



  vite:{
    fontSize:32,
    marginBottom:20,
    textAlign:"center",
  },



  img:{
    width:"100%",
    height:240,
    borderRadius:20,
    marginVertical:15,
    resizeMode:"cover",
    borderWidth:3,
    borderColor:"gray",
  },



  nome:{
    fontSize:22,
    textAlign:"center",
    color:"white",
    marginBottom:20,
    fontWeight:"600",
    lineHeight:30,
  },



  cartaRound:{
    backgroundColor:"blue",
    padding:18,
    borderRadius:20,
    marginBottom:15,
    shadowColor:"black",
    shadowOffset:{
      width:0,
      height:4,
    },
    shadowOpacity:0.3,
    shadowRadius:5,
    elevation:6,
  },



  testoCarta:{
    color:"white",
    fontSize:17,
    lineHeight:24,
  },



  bottone:{
    backgroundColor:"lightblue",
    padding:15,
    borderRadius:15,
    marginTop:12,
  },



  testoBottone:{
    color:"white",
    textAlign:"center",
    fontSize:18,
    fontWeight:"bold",
  },



  schermataFinale:{
    backgroundColor:"darkblue",
    padding:30,
    borderRadius:25,
    width:"90%",
  },

});









