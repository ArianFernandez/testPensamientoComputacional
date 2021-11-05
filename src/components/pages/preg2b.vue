<template>
   <div id="app">
  <v-app id="inspire" dark>
  <v-container class="grey lighten-5">
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
        
        <h1>Escenario 2 - Pregunta 2 - Parte 1 - Crea tu solucion</h1>
        
        </v-card>
      </v-col>

            
    </v-row>

    <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
        md="8"
      >
<v-card
          class="pa-2"
          outlined
          tile
        >
           <v-stage
      ref="stage"
      :config="stageSize"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
    >
      <v-layer>
                <v-arrow
          v-for="line in connections"
          :key="line.id"
          :config="{
            stroke: 'black',
            points: line.points
          }"
        />
        <v-circle
          v-for="target in targets"
          :key="target.id"
          :config="{
            x: target.x,
            y: target.y,
            id: target.id,
            radius: 40,
            stroke: 'black',
            fill: target.color
            
          }"
        />

        <v-star
                ref="ghost"

          :key=1222

          :config="{
            x: 200,
            y: 350,
            id: 123,
            stroke: 'black',
            fill: 'yellow',
             numPoints: 6,
        innerRadius: 10,
        outerRadius: 20,
            
          }"
        />

      </v-layer>
      <v-layer ref="dragLayer"></v-layer>
    </v-stage>
        </v-card>
        
      </v-col>
      <v-col
        cols="6"
        md="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-textarea
          name="input-7-1"
          id="ident"
          background-color="grey lighten-2"
          label="Identificacion del problema"
          value=""
        ></v-textarea>
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
      v-on:click="enviarData">
      Guardar Solucion   
    </v-btn>
<v-btn
      rounded
      outlined
      color="primary"
      dark
      v-on:click="pasaPregunta">
      Siguiente  
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Ups!
        </v-card-title>

        <v-card-text>
         Choco con el fantasma
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          

          <v-btn
            color="green darken-1"
            text
            @click="intentar"
          >
            Intentar <br> denuevo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog2"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Ye!
        </v-card-title>

        <v-card-text>
         Lo lograste
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          

          <v-btn
            color="green darken-1"
            text
            @click="dialog2=false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </v-app>
</div>
</template>

<script>
import Konva from "konva";
const width = window.innerWidth;
const height = window.innerHeight;

var doc = ''
const { GoogleSpreadsheet } = require('google-spreadsheet');
(async function() {
  // Initialize the sheet - doc ID is the long id in the sheets URL
 doc = new GoogleSpreadsheet('1fI43HtfxLceF9d4wlx1qNKttE4J68xvUo828ykV_CbM');

// Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
await doc.useServiceAccountAuth({
  client_email: 'arianf@dotted-medley-326516.iam.gserviceaccount.com',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDgCUx/AqfeaWV0\nL0fGMl0yLFSPk7itNcEe143qjziiCK3hIi8xpNZpeyw5Venb0E9Xjg5SY9uv/n61\nvpDIxIs5DfTE3ycc90iReGCIYHABLC1XHQ6Co8xhljsHtb7ro2kp7880KF5iUMK1\nOwE16SYhsBXUAGrH6fzbZDunQMOHXLrz0TbWfHdh53b9/aiKOmHeJ6NpulGAOtA/\nhKCNylC+KHgDzJiYrAhjGhiMI7O6Hj2bb9PKaP5ceGPJiVHJT1fC8Nz2aH30FpQX\n/IOI+eRZmJbPXDiFfAKhd9aouDK7KfROUnnd/ij9emawCrzAIKCrOJOgKQtQ41kZ\nacA2YfuvAgMBAAECggEAYpEExE6FT6+cMLlKgTMQWK4zR/XshtxDCpA4gm2fs35R\nDd9t1xAYO1EzPEiFuq2T8sfvmiUP9wbndYuRhJsgS6pNub4aJb7QARxukCGptYJb\nslt40lZBad/gObym8mIzNv2ocmCeYe/5MiXzGuZoXeLsP5ktYaYbFuUq76NpQyhg\n5nD9MGIFAD2i6VcOUsFIymhQRlOjZUtJVS3aRB4IrFGqZS//mv8Ig0yfGeSzBghv\nLnX7da6KovjqkhTzKiQKOBQaH2C9oJh5uHTz+T+dDrGoqhNca/2ok8B6oih54R+V\nWxm0Af/LRaJaAojIIF/wHk6VEWA9GfPoxL6WcumrTQKBgQDw2x8QitR0FF8+WICn\npTSUhqX2gOr2FWcDep0Tdan7Hta+az2sN7f1uUallAHeoA/SurvAIbvWn9kfbXvA\nTZqLK3BjKmpfANqvRo6IUTPynxamlf/05gUGAUlHOrl34ieqy6W+E6ZEjX+pCS5m\nJRrAvqE+YtvOIbitj2vo+cPiowKBgQDuH3HQex6GZHtiznaQqZNG8yRxySwIs2Yq\nkSiZtN2i2XCSVzaI4HGiKQF3smyFBiM8XkstYzOeQtNYBo6EsV7y/ZNpdeF1+q/F\nAb2izakKtKVTPFbEskFr/qdZhJA4935p//oz1ew4OHlaLo24vkwBq180LRLLy2BB\nMdeQRl6fhQKBgDW3KL5vt+ILiRJGeqro1UkqnmjTZ5NqQocsGUv1uesffZUKJb76\nzjQnFfJnh+M2n1DIBIdc/p9nFu1DZY4FwKm5Dl+PXhnB/wOIINGWCpfZkxuj6Gmd\nwxELyGPyXNq3vVECCfzSNQqk5Au22Ho/XDAQU7WuJodaTe2nRtG2olExAoGAOomy\nYg0SSPmEt5qH3TJCyWtWZz6MO6tWj1pV/8tNvQ31NZSJDIcYiEPKX5GWSfFjUiDg\nHE1J0DsfV4FtIcO00slxprha77Tr5uNxqgci6kXUaqznq70ihhj5LPGAvvBgvFA4\nQuvxATUo5/mPz33Ak5x8cAgwmbbqd7x4ALi75D0CgYEA5lxafnGk1GhZ/rUjd9tg\nlRDQoBPZi1SjBq4q+kztN3V2wWU/HmVF+ivkvz1W4X96ra7bNgpCSRI3N1Fhx7N1\nAA4gTjY7qxGhF3F62/eb/fLYYj7N6IV7MJnFJiPWEHyXB0qKliO+uTx7AVsEM2aa\nvIPa9JiF3qZYHqjfu5Rd/hY=\n-----END PRIVATE KEY-----\n',
});

await doc.loadInfo(); // loads document properties and worksheets
}());

function generateTargets() {
  const circles = [

    {x:200,y:50,id:1,color:'green',con:{3:5},puntosBorde:[]},
    {x:400,y:50,id:2,color:'green',con:{112:10,3:1,5:1,6:3},puntosBorde:[]},
    {x:600,y:50,id:3,color:'red',con:{112:5,2:1,4:1,10:10},puntosBorde:[]},
    {x:200,y:200,id:4,color:'green',con:{3:1,7:3,9:5},puntosBorde:[]},
    {x:400,y:200,id:112,color:'blue',con:{112:3,2:1,8:5},puntosBorde:[]},
    {x:600,y:200,id:6,color:'green',con:{2:3,3:1,5:5},puntosBorde:[]},
    {x:200,y:350,id:7,color:'green',con:{3:3,4:3,9:1,10:10},puntosBorde:[]},
    {x:400,y:350,id:8,color:'green',con:{5:5,6:5,10:3},puntosBorde:[]},
    {x:600,y:350,id:9,color:'green',con:{5:5,6:5,10:3},puntosBorde:[]}

  ];

  generarBordes(circles)
  // generarDiagonales()
  return circles;
}

function generateTargets2() {
  const circles = [

    {x:228,y:78,id:11,color:'green',con:{3:5},puntosBorde:[]},
    {x:228,y:50,id:12,color:'green',con:{112:10,3:1,5:1,6:3},puntosBorde:[]},
    {x:600,y:50,id:13,color:'green',con:{112:5,2:1,4:1,10:10},puntosBorde:[]},
    {x:200,y:200,id:14,color:'green',con:{3:1,7:3,9:5},puntosBorde:[]},
    {x:400,y:200,id:15,color:'green',con:{112:3,2:1,8:5},puntosBorde:[]},
    {x:600,y:200,id:16,color:'green',con:{2:3,3:1,5:5},puntosBorde:[]},
    {x:200,y:350,id:1112,color:'blue',con:{3:3,4:3,9:1,10:10},puntosBorde:[]},
    {x:400,y:350,id:18,color:'green',con:{5:5,6:5,10:3},puntosBorde:[]},
    {x:600,y:350,id:19,color:'green',con:{5:5,6:5,10:3},puntosBorde:[]}

  ];

  generarBordes(circles)
  // generarDiagonales()
  return circles;
}
 
function generarBordes(cirecle){
          cirecle.forEach(element => {
           element.puntosBorde.push(
             {up:[(element.x),(element.y-40)],
             right:[(element.x+40),(element.y)],
             down:[(element.x),(element.y+40)],
             left:[(element.x-40),(element.y)]
             })

        });
}
export default{
  data() {
    return{
   dialog: false,
   dialog2:false,
    targets: generateTargets(),
    targets2: generateTargets2(),
    anguloDir:
    {up:90,
    upD:45,
    right:0,
    downR:315,
    down:270,
    downL:225,
    left:180,
    
    upL:135},
    stageSize: {
        width: width,
        height: height
      },
      connections: [],
      drawningLine: false,
      image: require('@/assets/ejemplo.jpg'),
      respuestas: [],
      circulo1:0,
      circulo2:0,
      conexiones:[],
      ruta:[],
      rutaMatriz:[],
      rutaFantasma: [4,112,2,112,6,112,8,112],
      contador:0,
      rutaTemp: [],
      aspectos:'',
    sustentar:'',
    ident:'',
      errores: 0,
      tiempoI: 0,
      tiempoF: 0,
      tiMatriz:0,
      tfMAtriz:0,
      matrizT:[],
      cumplio: 'no',
      id:this.$route.params.id 

  }},

  methods: {
      handleMouseDown(e) {
      const onCircle = e.target instanceof Konva.Circle;
      if (!onCircle) {
        return;
      }
      this.drawningLine = true;

      this.tiMatriz = Date.now();

      this.circulo1 = e.target.id()
      this.connections.push({
        id: Date.now(),
        points: [(e.target.x()), (e.target.y())]
      });
    },
    
    handleMouseMove(e) {
      if (!this.drawningLine) {
        return;
      }
      const pos = e.target.getStage().getPointerPosition();
      const lastLine = this.connections[this.connections.length - 1];
      lastLine.points = [lastLine.points[0], lastLine.points[1], pos.x, pos.y];
    },
    sinD(angle) {
var r = Math.round(40*(Math.sin(angle * Math.PI / 180)))


  return r ;
},
cosD(angle) {

var r = Math.round(40*(Math.cos(angle * Math.PI / 180)))

  return r;
},
    handleMouseUp(e) {
      const onCircle = e.target instanceof Konva.Circle;
      if (!onCircle) {
        return;
      }

      this.drawningLine = false;
      const lastLine = this.connections[this.connections.length - 1];
    var dir = this.calcularDireccion(lastLine.points[0],lastLine.points[1],e.target.x(),e.target.y())
    var x1 = this.anguloDir[dir.v1]
    var x2 = this.anguloDir[dir.v2]
    var y1 = this.anguloDir[dir.v1]
    var y2= this.anguloDir[dir.v2]
    this.circulo2 = e.target.id()
    this.rutaTemp.push(this.circulo2)

    this.conexiones.push({
            p1: this.circulo1 ,
            p2: this.circulo2 
        })
      lastLine.points = [
        lastLine.points[0]+((this.cosD(x1))),
        lastLine.points[1]+(-1*(this.sinD(y1))),
        e.target.x()+((this.cosD(x2))),
        e.target.y()+(-1*(this.sinD(y2)))
      ];
      this.contador += 1

      this.tfMatriz = Date.now();
        var tiempoTotal = this.tfMatriz - this.tiMatriz
        this.matrizT.push(tiempoTotal)
      
        if(this.validarChoque()){

          this.dialog = true

        this.cleanRoute()
        return;
      }

      if(this.circulo2==3){
        this.dialog2 = true
      }


    },
    calcularDireccion(x1,y1,x2,y2){
      var v1 = ''
      var v2 = ''
        if(x1<x2 && y1 == y2){
          v1 = 'right'
          v2 = 'left'
        }
        else if(x1>x2 && y1 == y2){
          v1 = 'left'
          v2 = 'right'
        }
        else if(x1==x2 && y1 < y2){
          v1 = 'down'
          v2 = 'up'
        }
        else if(x1==x2 && y1 > y2){
          v1 = 'up'
          v2 = 'down'
        }
        else if(x1<=x2 && y1 > y2){
          v1 = 'upD'
          v2 = 'downL'
        }
        else if(x1>x2 && y1 < y2){
          v1 = 'downL'
          v2 = 'upD'
        }
        else if(x1<x2 && y1 < y2){
          v1 = 'downR'
          v2 = 'upL'
        }
        else if(x1>x2 && y1 > y2){
          v1 = 'upL'
          v2 = 'downR'
        }

      return {v1,v2};
    },
         sendRow(){
      doc.useServiceAccountAuth({
      client_email: 'arianf@dotted-medley-326516.iam.gserviceaccount.com',
      private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDgCUx/AqfeaWV0\nL0fGMl0yLFSPk7itNcEe143qjziiCK3hIi8xpNZpeyw5Venb0E9Xjg5SY9uv/n61\nvpDIxIs5DfTE3ycc90iReGCIYHABLC1XHQ6Co8xhljsHtb7ro2kp7880KF5iUMK1\nOwE16SYhsBXUAGrH6fzbZDunQMOHXLrz0TbWfHdh53b9/aiKOmHeJ6NpulGAOtA/\nhKCNylC+KHgDzJiYrAhjGhiMI7O6Hj2bb9PKaP5ceGPJiVHJT1fC8Nz2aH30FpQX\n/IOI+eRZmJbPXDiFfAKhd9aouDK7KfROUnnd/ij9emawCrzAIKCrOJOgKQtQ41kZ\nacA2YfuvAgMBAAECggEAYpEExE6FT6+cMLlKgTMQWK4zR/XshtxDCpA4gm2fs35R\nDd9t1xAYO1EzPEiFuq2T8sfvmiUP9wbndYuRhJsgS6pNub4aJb7QARxukCGptYJb\nslt40lZBad/gObym8mIzNv2ocmCeYe/5MiXzGuZoXeLsP5ktYaYbFuUq76NpQyhg\n5nD9MGIFAD2i6VcOUsFIymhQRlOjZUtJVS3aRB4IrFGqZS//mv8Ig0yfGeSzBghv\nLnX7da6KovjqkhTzKiQKOBQaH2C9oJh5uHTz+T+dDrGoqhNca/2ok8B6oih54R+V\nWxm0Af/LRaJaAojIIF/wHk6VEWA9GfPoxL6WcumrTQKBgQDw2x8QitR0FF8+WICn\npTSUhqX2gOr2FWcDep0Tdan7Hta+az2sN7f1uUallAHeoA/SurvAIbvWn9kfbXvA\nTZqLK3BjKmpfANqvRo6IUTPynxamlf/05gUGAUlHOrl34ieqy6W+E6ZEjX+pCS5m\nJRrAvqE+YtvOIbitj2vo+cPiowKBgQDuH3HQex6GZHtiznaQqZNG8yRxySwIs2Yq\nkSiZtN2i2XCSVzaI4HGiKQF3smyFBiM8XkstYzOeQtNYBo6EsV7y/ZNpdeF1+q/F\nAb2izakKtKVTPFbEskFr/qdZhJA4935p//oz1ew4OHlaLo24vkwBq180LRLLy2BB\nMdeQRl6fhQKBgDW3KL5vt+ILiRJGeqro1UkqnmjTZ5NqQocsGUv1uesffZUKJb76\nzjQnFfJnh+M2n1DIBIdc/p9nFu1DZY4FwKm5Dl+PXhnB/wOIINGWCpfZkxuj6Gmd\nwxELyGPyXNq3vVECCfzSNQqk5Au22Ho/XDAQU7WuJodaTe2nRtG2olExAoGAOomy\nYg0SSPmEt5qH3TJCyWtWZz6MO6tWj1pV/8tNvQ31NZSJDIcYiEPKX5GWSfFjUiDg\nHE1J0DsfV4FtIcO00slxprha77Tr5uNxqgci6kXUaqznq70ihhj5LPGAvvBgvFA4\nQuvxATUo5/mPz33Ak5x8cAgwmbbqd7x4ALi75D0CgYEA5lxafnGk1GhZ/rUjd9tg\nlRDQoBPZi1SjBq4q+kztN3V2wWU/HmVF+ivkvz1W4X96ra7bNgpCSRI3N1Fhx7N1\nAA4gTjY7qxGhF3F62/eb/fLYYj7N6IV7MJnFJiPWEHyXB0qKliO+uTx7AVsEM2aa\nvIPa9JiF3qZYHqjfu5Rd/hY=\n-----END PRIVATE KEY-----\n',
      });
this.aspectos = document.getElementById("aspectos").value; 
        this.sustentar = document.getElementById("sustentar").value; 
        this.ident = document.getElementById("ident").value; 


       doc.loadInfo();
       var V = []
       V.push({id:11})
       const sheet2 =   doc.sheetsByTitle[this.id]
       const moreRows =   sheet2.addRows(this.respuestas)



        console.log(moreRows)
    },
        addRow(err,ruta,ip,aspectos,tiempo,contador,tiempoI,tiempoF,matriz,vPeso,nodoF){
        this.respuestas.push({ 
          escenario: 2,
          pregunta: 2,
          parte:1,
          tinicio: tiempoI ,
          tfin: tiempoF,
          tiempo: tiempo,
          ruta: ruta,
          matriz: matriz,
          cumplio: nodoF,
          optima: '-',
          identProblema: this.ident,
          aspectos: this.aspectos,
          sustentar: this.sustentar,
          errores: err,
          probado: '-',
          devuelvo: '-',
          direccion: '-',
          for: '-',
          condicional: '-',
          respuesta: 'x',
          solucion: 'x',
          cantNodos: 'x',
          peso: 'x'
        });
        this.contador +=1
        this.contS += 1
        // this.soluciones.push({id:this.contS,nombre: 'Solucion ' + this.contS, con: this.connections,sol: '' })

    },
    getRuta(){
        var total = '7'

        this.conexiones.forEach(element => {
          this.totalNodos +=1
          this.rutaMatriz.push(element.p2)
            total = total.concat(' ,')
            total = total.concat(element.p2)
        });

        return total
    },
    enviarData: function (event) {
            this.tiempoF = Date.now();

      var tI = new Date(this.tiempoI);
        var tf = new Date(this.tiempoF);
        var tt = this.tiempoF-this.tiempoI;
        var rutaT = this.getRuta()
        this.validarCumplio()
        this.aspectos = document.getElementById("aspectos").value; 
        this.sustentar = document.getElementById("sustentar").value; 
        this.ident = document.getElementById("ident").value; 
        this.addRow(this.errores,rutaT,1,1,tt/1000,1,tI.toUTCString(),tf.toUTCString(),this.getMatrizT(),1,this.cumplio)
        this.sendRow()
        this.cleanRoute()
        if (event) {
        // alert('Se añadio la respuesta')
        alert('Se guardo la respuesta. Presionar siguiente')

      }
      // this.pasaPregunta()
    },


    pasaPregunta()
{
        window.location.href = '/escenario1/pregunta2c/' + this.id

} ,   validarChoque(){
      console.log('conex: '+this.rutaTemp[this.contador-1])
        console.log('ruta: '+this.rutaFantasma[this.contador-1])
        if(this.rutaTemp[this.contador-1] == this.rutaFantasma[this.contador-1]){

            return true
        }
       return false
    },
    cleanRoute(){
        this.connections = []
        this.conexiones = []
        this.pesos = []
        this.ruta = []
        this.rutaMatriz = []
        this.rutaTemp = []
        this.respuestas = []
        this.matrizT = []


        this.contador = 0
    },
    intentar(){
        this.errores +=1

        this.dialog = false
        this.cleanRoute()
    },
    guardar(){


      this.enviarData()
    },
    startTimer: function() {
      this.tiempoI = Date.now();
    },
    getMatrizT(){
    var total = ''

        this.matrizT.forEach(element => {
            total = total.concat(element/1000)
            total = total.concat(' ,')

        });

        return total
    },
    validarCumplio(){
      var temp = 0
      this.conexiones.forEach(element => {
          temp = element.p2
        });
      if(temp==3){
        this.cumplio = 'si'
      }
    }

  },
  beforeMount(){
    this.startTimer()
 },
}
</script>
