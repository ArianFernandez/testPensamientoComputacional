<template>
  <v-container class="grey lighten-5" >
    <v-row
      :class=" 'mb-12' "
      no-gutters
      
    >
      <v-col
        :key=4
        cols="12"
        align="center"
      justify="center"
      >
        <v-card
          class="pa-2 mx-auto"
          outlined
          
          tile
          height="50px"
        >
        
        <h1>Escenario 2 - Pregunta 3 - Parte 3 - Elige tu solucion</h1>
        
        </v-card>
      </v-col>

            
    </v-row>
    <v-row
      :class=" 'mb-12' "
      no-gutters
      
    >
      <v-col
        :key=4
        cols="12"
        align="center"
      justify="center"
      >
        <v-card
          class="pa-2 mx-auto"
          outlined
          
          tile
          height="150px"
        >
        
        <h1>¿Cual de los tres caminos escogerias?</h1>
        <v-btn
        id="carita"
      class="ma-2"
      outlined
      color="indigo"
      elevation="11"
      v-on:click="guardarSolucion"
      :disabled='pressedC'

    >
      Carita feliz
    </v-btn>
    <v-btn
    id="pacman"
      class="ma-2"
      outlined
      color="teal"
      elevation="11"
      v-on:click="guardarSolucion"
      :disabled='pressedP'

    >
      Pacman
    </v-btn>
    <v-btn
    id="misol"
      class="ma-2"
      outlined
      color="primary"
      v-on:click="guardarSolucion"
      :disabled='pressedM'
      elevation="11"

    >
      Mi solucion
    </v-btn>
        </v-card>
      </v-col>

            
    </v-row>
        <v-row
      :class=" 'mb-12' "
      no-gutters
    >
    <v-col
        :key=3
      >
        <v-card
          class="pa-2"
          outlined
          tile

        >
  <div class="text-center">
    <v-textarea
          name="input-7-1"
          id="aspectos"
          background-color="amber lighten-4"

          label="Aspectos Importantes"
          value=""
        ></v-textarea>
        <v-textarea
          name="input-7-1"
          id="sustentar"
          background-color="light-blue lighten-4"

          label="Sustentar solucion"
          value=""
        ></v-textarea>
    <v-btn
      rounded
      color="primary"
      dark
      v-on:click="validarSolucion"
    >
      Guardar solucion
    </v-btn>
    <v-btn
      rounded
      color="primary"
      dark
      outlined
      
      v-on:click="siguiente"
    >
      Siguiente
    </v-btn>
  </div>
        </v-card>
      </v-col>
      <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Finalizaste
        </v-card-title>

        <v-card-text>
         Muchas gracias por participar
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          

          <v-btn
            color="green darken-1"
            text
            @click="salir"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </v-row>

  </v-container>
</template>

<script>
// import Konva from "konva";

// import VueDraggableResizable from 'vue-draggable-resizable'

var doc = ''
const {
    GoogleSpreadsheet
} = require('google-spreadsheet');
(async function () {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    doc = new GoogleSpreadsheet('1fI43HtfxLceF9d4wlx1qNKttE4J68xvUo828ykV_CbM');

    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
        client_email: 'arianf@dotted-medley-326516.iam.gserviceaccount.com',
        private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDgCUx/AqfeaWV0\nL0fGMl0yLFSPk7itNcEe143qjziiCK3hIi8xpNZpeyw5Venb0E9Xjg5SY9uv/n61\nvpDIxIs5DfTE3ycc90iReGCIYHABLC1XHQ6Co8xhljsHtb7ro2kp7880KF5iUMK1\nOwE16SYhsBXUAGrH6fzbZDunQMOHXLrz0TbWfHdh53b9/aiKOmHeJ6NpulGAOtA/\nhKCNylC+KHgDzJiYrAhjGhiMI7O6Hj2bb9PKaP5ceGPJiVHJT1fC8Nz2aH30FpQX\n/IOI+eRZmJbPXDiFfAKhd9aouDK7KfROUnnd/ij9emawCrzAIKCrOJOgKQtQ41kZ\nacA2YfuvAgMBAAECggEAYpEExE6FT6+cMLlKgTMQWK4zR/XshtxDCpA4gm2fs35R\nDd9t1xAYO1EzPEiFuq2T8sfvmiUP9wbndYuRhJsgS6pNub4aJb7QARxukCGptYJb\nslt40lZBad/gObym8mIzNv2ocmCeYe/5MiXzGuZoXeLsP5ktYaYbFuUq76NpQyhg\n5nD9MGIFAD2i6VcOUsFIymhQRlOjZUtJVS3aRB4IrFGqZS//mv8Ig0yfGeSzBghv\nLnX7da6KovjqkhTzKiQKOBQaH2C9oJh5uHTz+T+dDrGoqhNca/2ok8B6oih54R+V\nWxm0Af/LRaJaAojIIF/wHk6VEWA9GfPoxL6WcumrTQKBgQDw2x8QitR0FF8+WICn\npTSUhqX2gOr2FWcDep0Tdan7Hta+az2sN7f1uUallAHeoA/SurvAIbvWn9kfbXvA\nTZqLK3BjKmpfANqvRo6IUTPynxamlf/05gUGAUlHOrl34ieqy6W+E6ZEjX+pCS5m\nJRrAvqE+YtvOIbitj2vo+cPiowKBgQDuH3HQex6GZHtiznaQqZNG8yRxySwIs2Yq\nkSiZtN2i2XCSVzaI4HGiKQF3smyFBiM8XkstYzOeQtNYBo6EsV7y/ZNpdeF1+q/F\nAb2izakKtKVTPFbEskFr/qdZhJA4935p//oz1ew4OHlaLo24vkwBq180LRLLy2BB\nMdeQRl6fhQKBgDW3KL5vt+ILiRJGeqro1UkqnmjTZ5NqQocsGUv1uesffZUKJb76\nzjQnFfJnh+M2n1DIBIdc/p9nFu1DZY4FwKm5Dl+PXhnB/wOIINGWCpfZkxuj6Gmd\nwxELyGPyXNq3vVECCfzSNQqk5Au22Ho/XDAQU7WuJodaTe2nRtG2olExAoGAOomy\nYg0SSPmEt5qH3TJCyWtWZz6MO6tWj1pV/8tNvQ31NZSJDIcYiEPKX5GWSfFjUiDg\nHE1J0DsfV4FtIcO00slxprha77Tr5uNxqgci6kXUaqznq70ihhj5LPGAvvBgvFA4\nQuvxATUo5/mPz33Ak5x8cAgwmbbqd7x4ALi75D0CgYEA5lxafnGk1GhZ/rUjd9tg\nlRDQoBPZi1SjBq4q+kztN3V2wWU/HmVF+ivkvz1W4X96ra7bNgpCSRI3N1Fhx7N1\nAA4gTjY7qxGhF3F62/eb/fLYYj7N6IV7MJnFJiPWEHyXB0qKliO+uTx7AVsEM2aa\nvIPa9JiF3qZYHqjfu5Rd/hY=\n-----END PRIVATE KEY-----\n',
    });

    await doc.loadInfo(); // loads document properties and worksheets
}());


export default {
    data ()  {
      return{

       
      id:this.$route.params.id,
      eleccion:'',
    aspectos:'',
    sustentar:'',
    respuestas:[],
    pressedC:false,
    pressedP:false,
    pressedM:false,
    opt:'no',
    dialog: false

    }},

    methods: {

    guardarSolucion: function(e){
      console.log()

      this.eleccion = e.currentTarget.getAttribute('id')
      if(this.eleccion == 'carita'){
          this.pressedC = true
          this.pressedP = false
          this.pressedM = false

      }else if(this.eleccion == 'pacman'){
            this.pressedC = false
          this.pressedP = true
          this.pressedM = false
      }else{
            this.pressedC = false
          this.pressedP = false
          this.pressedM = true
      }

      
    },
    salir(){
        
        window.location.href = '/' 

    },
    validarSolucion(){
        this.aspectos = document.getElementById("aspectos").value; 
        this.sustentar = document.getElementById("sustentar").value; 

        if(this.eleccion == 'pacman'){
          this.opt = 'si'
        }else{
          this.opt = 'no'

        }
        this.addRow()
        this.sendRow()
        alert('Se guardo la respuesta. Presionar siguiente')

    },
     sendRow(){
      doc.useServiceAccountAuth({
      client_email: 'arianf@dotted-medley-326516.iam.gserviceaccount.com',
      private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDgCUx/AqfeaWV0\nL0fGMl0yLFSPk7itNcEe143qjziiCK3hIi8xpNZpeyw5Venb0E9Xjg5SY9uv/n61\nvpDIxIs5DfTE3ycc90iReGCIYHABLC1XHQ6Co8xhljsHtb7ro2kp7880KF5iUMK1\nOwE16SYhsBXUAGrH6fzbZDunQMOHXLrz0TbWfHdh53b9/aiKOmHeJ6NpulGAOtA/\nhKCNylC+KHgDzJiYrAhjGhiMI7O6Hj2bb9PKaP5ceGPJiVHJT1fC8Nz2aH30FpQX\n/IOI+eRZmJbPXDiFfAKhd9aouDK7KfROUnnd/ij9emawCrzAIKCrOJOgKQtQ41kZ\nacA2YfuvAgMBAAECggEAYpEExE6FT6+cMLlKgTMQWK4zR/XshtxDCpA4gm2fs35R\nDd9t1xAYO1EzPEiFuq2T8sfvmiUP9wbndYuRhJsgS6pNub4aJb7QARxukCGptYJb\nslt40lZBad/gObym8mIzNv2ocmCeYe/5MiXzGuZoXeLsP5ktYaYbFuUq76NpQyhg\n5nD9MGIFAD2i6VcOUsFIymhQRlOjZUtJVS3aRB4IrFGqZS//mv8Ig0yfGeSzBghv\nLnX7da6KovjqkhTzKiQKOBQaH2C9oJh5uHTz+T+dDrGoqhNca/2ok8B6oih54R+V\nWxm0Af/LRaJaAojIIF/wHk6VEWA9GfPoxL6WcumrTQKBgQDw2x8QitR0FF8+WICn\npTSUhqX2gOr2FWcDep0Tdan7Hta+az2sN7f1uUallAHeoA/SurvAIbvWn9kfbXvA\nTZqLK3BjKmpfANqvRo6IUTPynxamlf/05gUGAUlHOrl34ieqy6W+E6ZEjX+pCS5m\nJRrAvqE+YtvOIbitj2vo+cPiowKBgQDuH3HQex6GZHtiznaQqZNG8yRxySwIs2Yq\nkSiZtN2i2XCSVzaI4HGiKQF3smyFBiM8XkstYzOeQtNYBo6EsV7y/ZNpdeF1+q/F\nAb2izakKtKVTPFbEskFr/qdZhJA4935p//oz1ew4OHlaLo24vkwBq180LRLLy2BB\nMdeQRl6fhQKBgDW3KL5vt+ILiRJGeqro1UkqnmjTZ5NqQocsGUv1uesffZUKJb76\nzjQnFfJnh+M2n1DIBIdc/p9nFu1DZY4FwKm5Dl+PXhnB/wOIINGWCpfZkxuj6Gmd\nwxELyGPyXNq3vVECCfzSNQqk5Au22Ho/XDAQU7WuJodaTe2nRtG2olExAoGAOomy\nYg0SSPmEt5qH3TJCyWtWZz6MO6tWj1pV/8tNvQ31NZSJDIcYiEPKX5GWSfFjUiDg\nHE1J0DsfV4FtIcO00slxprha77Tr5uNxqgci6kXUaqznq70ihhj5LPGAvvBgvFA4\nQuvxATUo5/mPz33Ak5x8cAgwmbbqd7x4ALi75D0CgYEA5lxafnGk1GhZ/rUjd9tg\nlRDQoBPZi1SjBq4q+kztN3V2wWU/HmVF+ivkvz1W4X96ra7bNgpCSRI3N1Fhx7N1\nAA4gTjY7qxGhF3F62/eb/fLYYj7N6IV7MJnFJiPWEHyXB0qKliO+uTx7AVsEM2aa\nvIPa9JiF3qZYHqjfu5Rd/hY=\n-----END PRIVATE KEY-----\n',
      });

       doc.loadInfo();
       var V = []
       V.push({id:11})
       const sheet2 =   doc.sheetsByTitle[this.id]
       const moreRows =  sheet2.addRows(this.respuestas)
        console.log(moreRows)
    },
    siguiente(){
        this.dialog =  true
    },
        addRow(){

        
        this.respuestas.push({ 
          escenario: 2,
          pregunta: 3,
          parte:3,
          tinicio: 'x' ,
          tfin: 'x',
          tiempo: 'x',
          ruta: 'x',
          matriz: 'x',
          cumplio: this.eleccion,
          optima:this.opt ,
          identProblema: 'x',
          aspectos: this.aspectos,
          sustentar: this.sustentar,
          errores: 'x',
          probado: 'x',
          devuelvo: 'x',
          direccion: 'x',
          for: 'x',
          condicional: 'x',
          respuesta: 'x',
          solucion: 'x',
          cantNodos: 'x',
          peso: 'x'
        });
        this.contador +=1
        this.contS += 1
        // this.soluciones.push({id:this.contS,nombre: 'Solucion ' + this.contS, con: this.connections,sol: '' })

    },
       
    }
}
</script>
