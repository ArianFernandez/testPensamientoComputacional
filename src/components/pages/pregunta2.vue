<template>
    <v-container
      class="grey lighten-5 mb-6"
    >
          <v-card
    color="grey lighten-4"
    flat
    tile
  >
    <v-toolbar dense>

      <v-toolbar-title>Al siguiente día, Pacman y la Carita Feliz tienen examen de Lenguaje, pero Pacman recordó que había olvidado recoger su libro en su casa; por lo que ambos retornan a su casa. Traza un camino para que ambos lleguen a tiempo al colegio luego de recoger la tarea de Pacman</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
  </v-card>
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
        <v-line
          v-for="line in connections"
          :key="line.id"
          :config="{
            stroke: line.color,
            points: line.points
          }"
        />
        <v-circle
          v-for="target in targets"
          :key="target.id"
          :config="{
            x: target.x,
            y: target.y,
            radius: 40,
            stroke: 'black',
            fill: target.color
            
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
          id="aspectos"
          background-color="amber lighten-4"

          label="Aspectos Importantes"
          value=""
        ></v-textarea>
        <v-textarea
          name="input-7-1"
          id="ip"
          background-color="light-blue lighten-4"

          label="Sustentar"
          value=""
        ></v-textarea>
            <v-btn
      rounded
      color="primary"
      dark
      v-on:click="sendRow"
    >
      Guardar Solucion
    </v-btn>
        <v-btn
      rounded
      outlined
      color="primary"
      dark
      v-on:click="enviarData"

    >
      Añadir Solucion
      
    </v-btn>

                <v-btn
                elevation="2"
              color="error"
              fab
              x-large
              dark
      v-on:click="startTimer"

            >
              Start
            </v-btn>


            <v-btn color="primary" @click="submit">Siguiente</v-btn>
              <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Numero
          </th>
          <th class="text-left">
            Nombre
          </th>
          <th class="text-left">
            Solucion
          </th>
          
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in soluciones"
          :key="item.nombre"
          @click="mostrarRuta(item.con,item.id)"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.sol }}</td>

        </tr>
      </tbody>
    </template>
  </v-simple-table>
        </v-card>
      </v-col>
    </v-row>

    </v-container>
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

await doc.loadInfo();
      }());


function generateTargets() {
  const circles = [

    {x:200,y:50,id:112,color:'blue',con:{3:5}},
    {x:400,y:100,id:2,color:'green',con:{112:10,3:1,5:1,6:3}},
    {x:600,y:100,id:3,color:'green',con:{112:5,2:1,4:1,10:10}},
    {x:800,y:100,id:4,color:'green',con:{3:1,7:3,9:5}},
    {x:300,y:250,id:5,color:'green',con:{112:3,2:1,8:5}},
    {x:450,y:250,id:6,color:'yellow',con:{2:3,3:1,5:5}},
    {x:700,y:250,id:7,color:'green',con:{3:3,4:3,9:1,10:10}},
    {x:350,y:400,id:8,color:'green',con:{5:5,6:5,10:3}},
    {x:800,y:400,id:9,color:'green',con:{4:5,7:1,10:5,11:3}},
    {x:600,y:550,id:10,color:'green',con:{3:10,7:10,8:5,9:5,12:3}},
    {x:800,y:550,id:11,color:'green',con:{9:3,111:10}},
    {x:350,y:700,id:12,color:'green',con:{8:10,10:3,14:1}},
    {x:800,y:700,id:111,color:'red',con:{10:10,11:10,12:10,15:3}},
    {x:420,y:850,id:14,color:'green',con:{10:5,13:3,14:5}},
    {x:600,y:850,id:15,color:'green',con:{12:1,15:5,10:5}}
  ];
  return circles;
}

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height
      },
      targets: generateTargets(),
      connections: [],
      soluciones:[],
      drawningLine: false,
      conexiones: [],
      errores: [],
      contS:0,
      t1:0,
      t2:0,
      respuestas: [],
      titulo:"sad",
      pesos:[],
      title: 'Preg 1A',
      inicio: false ,
      fin: false,
      tiempoI: 0,
      idSol: 0,
      totalNodos:0,
      tiempoT: 0,
      tiempoF: 0,
      tiempoIN: 0,
      tiempoFN: 0,
      tiempoTN: 0,
      contador: 1,
      rutaMatriz:[],
      matriz:[],
      sustentar:'',
      validarT: false,
      id:this.$route.params.id 
    };
  },
  methods: {
    enviarData: function (event) {
        var pesoT = this.getTotalWeight()
        var rutaT = this.getRuta()
        var matrizT = this.getMatriz()
        var errorT = this.getErrores()
        let value = document.getElementById("ip").value; 
        let aspectos = document.getElementById("aspectos").value; 
        var tI = new Date(this.tiempoI);
        var tF = new Date(this.tiempoF);
        this.sustentar = document.getElementById("sustentar").value; 

        this.addRow(errorT,pesoT,rutaT,value,aspectos, this.tiempoT/1000,this.contador,tI.toString(), tF.toString(),matrizT,this.validarPeso(),this.validarNodoFinal())
        this.cleanRoute()
        if (event) {
        alert('Se añadio la respuesta')
      }
    },

    handleMouseDown(e) {
      const onCircle = e.target instanceof Konva.Circle;
      if (!onCircle) {
        return;
      }

      var circ = this.getCircle(e.target.x(),e.target.y())
      this.t1=circ
      console.log("C1",this.t1);
      if(this.t1.id == 111 && this.fin == false && this.validarT==true){
          this.inicio=true
      }
      

      if(!this.inicio){
          return;
      }

      this.drawningLine = true;
      this.tiempoIN = Date.now();
      this.connections.push({
        id: Date.now(),
        points: [e.target.x(), e.target.y()],
        color: 'black'
      });

    },
    handleMouseMove(e) {
      if(!this.inicio){
          return;
      }
      if (!this.drawningLine) {
        return;
      }
      const pos = e.target.getStage().getPointerPosition();
      const lastLine = this.connections[this.connections.length - 1];
      lastLine.points = [lastLine.points[0], lastLine.points[1], pos.x, pos.y];
    },
    submit () {
      window.location.href = '/escenario1/pregunta3/' + this.id

    },
    handleMouseUp(e) {
      if(this.inicio == false && this.fin == true){
          return;
      }
      const onCircle = e.target instanceof Konva.Circle;
      if (!onCircle) {
        return;
      }
      var circ = this.getCircle(e.target.x(),e.target.y())
      this.t2=circ.id
      console.log("C2",this.t2);
      console.log("t1",this.t1.con,'t2',this.t2);
      if(this.t2 == 112){
        this.fin = true; 
        this.inicio = false;
      }
      var condic = this.validateConnections(this.t1.con,this.t2);

      console.log('seCreo',this.connections[this.connections.length - 1].points)
      this.drawningLine = false;
      const lastLine = this.connections[this.connections.length - 1];
        var peso = this.getWeights(this.t1.con,this.t2)

      if(condic){
        lastLine.points = [
        lastLine.points[0],
        lastLine.points[1],
        e.target.x(),
        e.target.y(),
        lastLine.color = this.getColor(peso)
      ];
        this.conexiones.push({
            p1: this.t1.id,
            p2: this.t2,
            peso: peso
        })
        this.tiempoFN = Date.now();
        this.tiempoTN = this.tiempoFN - this.tiempoIN
        this.pesos.push(peso)
        this.matriz.push(this.tiempoTN)

      }else{
        this.errores.push({
            p1: this.t1.id,
            p2: this.t2,
        })
        this.connections.pop()
        this.fin = false; 
        this.inicio = true;
      }
        this.tiempoF = Date.now();
        this.tiempoT = this.tiempoF - this.tiempoI;
        this.validarT= false;
      console.log(this.pesos)

    },
    validarNodoFinal(){
        var s = 'f'

        this.conexiones.forEach(element =>{
          if(element.p2 == 6){
            s = 't'
          }
        })

        if(this.conexiones.at(-1).p2 == 112 && s == 't'){
            return 'T'
        }
        return "F"
    },
    mostrarRuta(con,id){
      this.soluciones.forEach(element => {
            if(element.id == id){
              element.sol = 'x'
              this.idSol = id
            }else{
              element.sol = ''
            }
        });
        this.connections= con
    },
    validarPeso(){
      if(this.peso == 24){
        return "T"
      }
      return "F"
    },
    getRuta(){
        var total = '111'

        this.conexiones.forEach(element => {
          this.totalNodos +=1
          this.rutaMatriz.push(element.p2)
            total = total.concat(' ,')
            total = total.concat(element.p2)
        });

        return total
    },
    getMatriz(){
        var total = ''

        this.matriz.forEach(element => {
            total = total.concat(element/1000)
            total = total.concat(' ,')

        });

        return total
    },
    getErrores(){
        return this.errores.length
    },
    getTotalWeight(){
        var total = 0

        this.pesos.forEach(element => {
            total += element
        });
        return total
    },
    getCircle(x,y){
      var circ = 0;
        this.targets.forEach(element => {
          if(x==element.x && y==element.y){
              circ=element;
          }
        });
        return circ
    },
    validateConnections(con,s2){
        var value = false;
        for(var key in con){
          if(key == s2){
            value = true;
          }
        }
        return value;  
    },
    getWeights(con,s2){
        var value = 0;
        for(var key in con){
          if(key == s2){
            value = con[key];
          }
        }
        return value;  
    },
    getTotalNodos(){
      var s = 0
        this.rutaMatriz.forEach(element => {
          if(element!=112){
            s+=1
          }
        });
        
        return s;  
    },
    addRow(err,peso,ruta,ip,aspectos,tiempo,contador,tiempoI,tiempoF,matriz,vPeso,nodoF){
        this.respuestas.push({ 
          escenario: 1,
          pregunta: 2,
          respuesta: contador,
          solucion: 'borrador',
          tinicio: tiempoI ,
          tfin: tiempoF,
          tiempo: tiempo,
          errores: err,
          cantNodos: this.getTotalNodos(),
          peso: peso,
          ruta: ruta,
          matriz: matriz,
          cumplio: nodoF,
          optima: vPeso,
          identProblema: '-',
          aspectos: aspectos,
          sustentar: ip,
          probado: '-',
          devuelvo: '-',
          direccion: '-',
          for: '-',
          parte:1,
          condicional: '-'
        });
        this.contador +=1
        this.contS += 1
        this.soluciones.push({id:this.contS,nombre: 'Solucion ' + this.contS, con: this.connections,sol: '' })

    },
    sendRow: function (event){
       doc.useServiceAccountAuth({
      client_email: 'arianf@dotted-medley-326516.iam.gserviceaccount.com',
      private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDgCUx/AqfeaWV0\nL0fGMl0yLFSPk7itNcEe143qjziiCK3hIi8xpNZpeyw5Venb0E9Xjg5SY9uv/n61\nvpDIxIs5DfTE3ycc90iReGCIYHABLC1XHQ6Co8xhljsHtb7ro2kp7880KF5iUMK1\nOwE16SYhsBXUAGrH6fzbZDunQMOHXLrz0TbWfHdh53b9/aiKOmHeJ6NpulGAOtA/\nhKCNylC+KHgDzJiYrAhjGhiMI7O6Hj2bb9PKaP5ceGPJiVHJT1fC8Nz2aH30FpQX\n/IOI+eRZmJbPXDiFfAKhd9aouDK7KfROUnnd/ij9emawCrzAIKCrOJOgKQtQ41kZ\nacA2YfuvAgMBAAECggEAYpEExE6FT6+cMLlKgTMQWK4zR/XshtxDCpA4gm2fs35R\nDd9t1xAYO1EzPEiFuq2T8sfvmiUP9wbndYuRhJsgS6pNub4aJb7QARxukCGptYJb\nslt40lZBad/gObym8mIzNv2ocmCeYe/5MiXzGuZoXeLsP5ktYaYbFuUq76NpQyhg\n5nD9MGIFAD2i6VcOUsFIymhQRlOjZUtJVS3aRB4IrFGqZS//mv8Ig0yfGeSzBghv\nLnX7da6KovjqkhTzKiQKOBQaH2C9oJh5uHTz+T+dDrGoqhNca/2ok8B6oih54R+V\nWxm0Af/LRaJaAojIIF/wHk6VEWA9GfPoxL6WcumrTQKBgQDw2x8QitR0FF8+WICn\npTSUhqX2gOr2FWcDep0Tdan7Hta+az2sN7f1uUallAHeoA/SurvAIbvWn9kfbXvA\nTZqLK3BjKmpfANqvRo6IUTPynxamlf/05gUGAUlHOrl34ieqy6W+E6ZEjX+pCS5m\nJRrAvqE+YtvOIbitj2vo+cPiowKBgQDuH3HQex6GZHtiznaQqZNG8yRxySwIs2Yq\nkSiZtN2i2XCSVzaI4HGiKQF3smyFBiM8XkstYzOeQtNYBo6EsV7y/ZNpdeF1+q/F\nAb2izakKtKVTPFbEskFr/qdZhJA4935p//oz1ew4OHlaLo24vkwBq180LRLLy2BB\nMdeQRl6fhQKBgDW3KL5vt+ILiRJGeqro1UkqnmjTZ5NqQocsGUv1uesffZUKJb76\nzjQnFfJnh+M2n1DIBIdc/p9nFu1DZY4FwKm5Dl+PXhnB/wOIINGWCpfZkxuj6Gmd\nwxELyGPyXNq3vVECCfzSNQqk5Au22Ho/XDAQU7WuJodaTe2nRtG2olExAoGAOomy\nYg0SSPmEt5qH3TJCyWtWZz6MO6tWj1pV/8tNvQ31NZSJDIcYiEPKX5GWSfFjUiDg\nHE1J0DsfV4FtIcO00slxprha77Tr5uNxqgci6kXUaqznq70ihhj5LPGAvvBgvFA4\nQuvxATUo5/mPz33Ak5x8cAgwmbbqd7x4ALi75D0CgYEA5lxafnGk1GhZ/rUjd9tg\nlRDQoBPZi1SjBq4q+kztN3V2wWU/HmVF+ivkvz1W4X96ra7bNgpCSRI3N1Fhx7N1\nAA4gTjY7qxGhF3F62/eb/fLYYj7N6IV7MJnFJiPWEHyXB0qKliO+uTx7AVsEM2aa\nvIPa9JiF3qZYHqjfu5Rd/hY=\n-----END PRIVATE KEY-----\n',
      });

       doc.loadInfo();
       
       const sheet2 =   doc.sheetsByTitle[this.id]

       this.respuestas.forEach(element => {
          console.log("element: "+element.respuesta)
          console.log("id: "+this.idSol)

            if(element.escenario == 1 && element.respuesta == this.idSol){
                element.solucion = 'solucion'
            }else{
                element.solucion = 'borrador'

            }

        });

        const moreRows =  sheet2.addRows(this.respuestas)
        console.log(moreRows)
        console.log(event)

      

    },
    
    startTimer: function (event){
      // el evento cuyo tiempo ha transcurrido aquí:
      this.cleanRoute()

        this.validarT = true;
        console.log(this.id); // 2

        this.tiempoI  = Date.now();

        console.log(event)
    },
    cleanRoute(){
        this.connections = []
        this.errores = []
        this.conexiones = []
        this.pesos = []
        this.fin = false; 
        this.inicio = false;
        this.matriz = []
        this.rutaMatriz = []

    },
    getColor(valor){
        var r = ''
        switch (valor) {
          case 1:
          r = 'black'
          break;
          case 3:
          r = 'green'
          break;
          case 5:
          r = 'yellow'
          break;
          case 10:
          r = 'red'
          break;
        }
        return r;
    }

  }
  };

</script>