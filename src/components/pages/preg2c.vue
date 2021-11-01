<template>
  <v-container class="grey lighten-5">
    <v-row
      :class=" 'mb-12' "
      no-gutters
    >
      <v-col
        :key=4
        cols="7"
      >
        <v-card
          class="pa-2"
          outlined
          tile
          height="600px"
        >
    <vue-draggable-resizable  @dragging="onDrag" :x="40" :y="20" :z="1" w="auto" h="auto" @resizing="onResize"  :resizable="false" @dragstop="onDragstop">
      <img :src="b1" id="b1" width="216" height="36.6"  @mousedown="setId" @mouseup="setId2" >
    </vue-draggable-resizable>
        <vue-draggable-resizable @dragging="onDrag" :x="40" :y="70" :z="2" w="auto" h="auto" @resizing="onResize"  :resizable="false" @dragstop="onDragstop">
      <img :src="b2" id="b2" width="216" height="36.6" @mousedown="setId" @mouseup="setId2">
    </vue-draggable-resizable>
        <vue-draggable-resizable  @dragging="onDrag"  :x="40" :y="120" :z="3" w="auto" h="auto" @resizing="onResize"  :resizable="false" @dragstop="onDragstop">
      <img :src="b3" id="b3" width="216" height="36.6" @mousedown="setId" @mouseup="setId2">
    </vue-draggable-resizable>
        <vue-draggable-resizable  @dragging="onDrag"  :x="40" :y="170" :z="4" w="auto" h="auto" @resizing="onResize"  :resizable="false" @dragstop="onDragstop">
      <img :src="b4" id="b4" width="216" height="36.6" @mousedown="setId" @mouseup="setId">
    </vue-draggable-resizable>
    <vue-draggable-resizable  @dragging="onDrag"  :x="40" :y="220" :z="5" w="auto" h="auto" @resizing="onResize"  :resizable="false" @dragstop="onDragstop">
      <img :src="b5" id="b5" width="216" height="36.6" @mousedown="setId" @mouseup="setId2">
    </vue-draggable-resizable>
    <vue-draggable-resizable  @dragging="onDrag" :x="40" :y="270" :z="6" w="auto" h="auto" @resizing="onResize"  :resizable="false" @dragstop="onDragstop">
      <img :src="b6" id="b6" width="216" height="36.6" @mousedown="setId" @mouseup="setId2">
    </vue-draggable-resizable>
    <vue-draggable-resizable  @dragging="onDrag" :x="40" :y="320" :z="7"  w="auto" h="auto" @resizing="onResize"  :resizable="false" @dragstop="onDragstop">
      <img :src="b7" id="b7" width="216" height="36.6" @mousedown="setId" @mouseup="setId2">
    </vue-draggable-resizable>
    <vue-draggable-resizable  @dragging="onDrag" :x="40" :y="370" :z="8" w="auto" h="auto" @resizing="onResize" :resizable="false" @dragstop="onDragstop">
      <img :src="b8" id="b8"  width="185.4" height="171.6" @mousedown="setId" @mouseup="setId2">
    </vue-draggable-resizable>
    <vue-draggable-resizable @dragging="onDrag" :x="250" :y="370" :z="9" w="auto" h="auto" @resizing="onResize" :resizable="false" @dragstop="onDragstop">
      <img :src="b9" id="b9" width="185.4" height="171.6" @mousedown="setId" @mouseup="setId2">
    </vue-draggable-resizable>
<vue-draggable-resizable @dragging="onDrag" :x="40" :y="70" :z="10" w="auto" h="auto" @resizing="onResize" :resizable="false" @dragstop="onDragstop">
      <img :src="b2" id="b2b" width="216" height="36.6" @mousedown="setId" @mouseup="setId2">
    </vue-draggable-resizable>
        </v-card>
      </v-col>

            <v-col
            cols="5"
        :key=3
      >
        <v-card
          class="pa-2"
          outlined
          tile
          height="600px"

        >
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
    <v-btn
      rounded
      color="primary"
      dark
      v-on:click="validarSolucion"
    >
      Probar solucion
    </v-btn>
  </div>
        </v-card>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
// import Konva from "konva";
const width = window.innerWidth;
const height = window.innerHeight;
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

function generateTargets() {
    const circles = [

        {
            x: 200,
            y: 50,
            id: 1,
            color: 'green',
            con: {
                3: 5
            },
            puntosBorde: []
        },
        {
            x: 400,
            y: 50,
            id: 2,
            color: 'green',
            con: {
                112: 10,
                3: 1,
                5: 1,
                6: 3
            },
            puntosBorde: []
        },
        {
            x: 600,
            y: 50,
            id: 3,
            color: 'green',
            con: {
                112: 5,
                2: 1,
                4: 1,
                10: 10
            },
            puntosBorde: []
        },
        {
            x: 200,
            y: 200,
            id: 4,
            color: 'green',
            con: {
                3: 1,
                7: 3,
                9: 5
            },
            puntosBorde: []
        },
        {
            x: 400,
            y: 200,
            id: 112,
            color: 'blue',
            con: {
                112: 3,
                2: 1,
                8: 5
            },
            puntosBorde: []
        },
        {
            x: 600,
            y: 200,
            id: 6,
            color: 'green',
            con: {
                2: 3,
                3: 1,
                5: 5
            },
            puntosBorde: []
        },
        {
            x: 200,
            y: 350,
            id: 7,
            color: 'green',
            con: {
                3: 3,
                4: 3,
                9: 1,
                10: 10
            },
            puntosBorde: []
        },
        {
            x: 400,
            y: 350,
            id: 8,
            color: 'green',
            con: {
                5: 5,
                6: 5,
                10: 3
            },
            puntosBorde: []
        },
        {
            x: 600,
            y: 350,
            id: 9,
            color: 'green',
            con: {
                5: 5,
                6: 5,
                10: 3
            },
            puntosBorde: []
        }

    ];

    generarBordes(circles)
    // generarDiagonales()
    return circles;
}

function generarBordes(cirecle) {
    cirecle.forEach(element => {
        element.puntosBorde.push({
            up: [(element.x), (element.y - 40)],
            right: [(element.x + 40), (element.y)],
            down: [(element.x), (element.y + 40)],
            left: [(element.x - 40), (element.y)]
        })

    });
}
export default {
    data: () => ({

        targets: generateTargets(),
        anguloDir: {
            up: 90,
            upD: 45,
            right: 0,
            downR: 315,
            down: 270,
            downL: 225,
            left: 180,
            upL: 135
        },
        stageSize: {
            width: width,
            height: height
        },
        connections: [],
        drawningLine: false,
        b1: require('@/assets/Bloque01.png'),
        b2: require('@/assets/Bloque02.png'),
        b10: require('@/assets/Bloque02.png'),

        b3: require('@/assets/Bloque03.png'),
        b4: require('@/assets/Bloque04.png'),
        b5: require('@/assets/Bloque05.png'),
        b6: require('@/assets/Bloque06.png'),
        b7: require('@/assets/Bloque07.png'),
        b8: require('@/assets/Bloque08.png'),
        b9: require('@/assets/Bloque09.png'),

        respuestas: [],
        circulo1: 0,
        circulo2: 0,
        conexiones: [],
        ruta: [],
        rutaMatriz: [],
        rutaFantasma: [4, 112, 8, 112, 6, 112, 2, 112],
        contador: 0,
        rutaTemp: [],
        width: 0,
      height: 0,
      x: 0,
      y: 0,
      xtemp:0,
      ytemp:0,
      posiciones: {
        b1:[0,0],
        b2:[0,0],
        b3:[0,0],
        b4:[0,0],
        b5:[0,0],
        b6:[0,0],
        b7:[0,0],
        b8:[0,0],
        b9:[0,0],
        b2b:[0,0]

      },
      tempAbajo:'',
      tempArriba:'',

    }),

    methods: {

    validarSolucion(){
      console.log('b1: '+this.posiciones['b1'][1])
      console.log('b2: '+this.posiciones['b2'][1])
      console.log('b2b: '+this.posiciones['b2b'][1])

      console.log('b3: '+this.posiciones['b3'][1])
      console.log('b4: '+this.posiciones['b4'][1])
      console.log('b5: '+this.posiciones['b5'][1])

      console.log('b6: '+this.posiciones['b6'][1])

      console.log('b7: '+this.posiciones['b7'][1])

      console.log('b8: '+this.posiciones['b8'][1])
      console.log('b9: '+this.posiciones['b9'][1])
      console.log('b9x: '+this.posiciones['b9'][0])
      console.log('b2x: '+this.posiciones['b2'][0])
      console.log('b7x: '+this.posiciones['b7'][0])



      var val = false
      if(((this.posiciones['b2'][1]-this.posiciones['b1'][1]<70 && this.posiciones['b2'][1]-this.posiciones['b1'][1]>0)||(this.posiciones['b2b'][1]-this.posiciones['b1'][1]<70 && this.posiciones['b2b'][1]-this.posiciones['b1'][1]>0)) &&
        ((this.posiciones['b4'][1]-this.posiciones['b2'][1]<70 && this.posiciones['b4'][1]-this.posiciones['b2'][1]>0 )||(this.posiciones['b4'][1]-this.posiciones['b2b'][1]<70 && this.posiciones['b4'][1]-this.posiciones['b2b'][1]>0 ))&&
        this.posiciones['b3'][1]-this.posiciones['b4'][1]<70 && this.posiciones['b3'][1]-this.posiciones['b4'][1]>0
      ){
              console.log('correcto')

      }
      if(this.posiciones['b6'][1]-this.posiciones['b1'][1]<70 && this.posiciones['b6'][1]-this.posiciones['b1'][1]>0 &&
        this.posiciones['b4'][1]-this.posiciones['b6'][1]<70 && this.posiciones['b4'][1]-this.posiciones['b6'][1]>0 &&
        this.posiciones['b9'][1]-this.posiciones['b4'][1]<70 && this.posiciones['b9'][1]-this.posiciones['b4'][1]>0 &&
        ((this.posiciones['b2'][1]-this.posiciones['b9'][1]<70 && this.posiciones['b2'][1]-this.posiciones['b9'][1]>0)||(this.posiciones['b2b'][1]-this.posiciones['b9'][1]<70 && this.posiciones['b2b'][1]-this.posiciones['b9'][1]>0)) &&
        // this.posiciones['b9'][0]-this.posiciones['b2'][0]>20 && this.posiciones['b9'][0]-this.posiciones['b2'][0]<200 &&
        ((this.posiciones['b7'][1]-this.posiciones['b2'][1]<70 && this.posiciones['b7'][1]-this.posiciones['b2'][1])||(this.posiciones['b7'][1]-this.posiciones['b2b'][1]<70 && this.posiciones['b7'][1]-this.posiciones['b2b'][1]))>0 
        // this.posiciones['b9'][0]-this.posiciones['b7'][0]>20 && this.posiciones['b9'][0]-this.posiciones['b7'][0]<200 


      ){
              console.log('correcto')

      }
      if(this.posiciones['b8'][1]-this.posiciones['b1'][1]<70 && this.posiciones['b8'][1]-this.posiciones['b1'][1]>0 &&
        ((this.posiciones['b2'][1]-this.posiciones['b8'][1]<70 && this.posiciones['b2'][1]-this.posiciones['b8'][1]>0) || (this.posiciones['b2b'][1]-this.posiciones['b8'][1]<70 && this.posiciones['b2b'][1]-this.posiciones['b8'][1]>0)) &&
        ((this.posiciones['b5'][1]-this.posiciones['b2'][1]<70 && this.posiciones['b5'][1]-this.posiciones['b2'][1]>0 )||(this.posiciones['b5'][1]-this.posiciones['b2b'][1]<70 && this.posiciones['b5'][1]-this.posiciones['b2b'][1]>0 ))&&
        this.posiciones['b3'][1]-this.posiciones['b5'][1]<70 && this.posiciones['b3'][1]-this.posiciones['b5'][1]>0 &&
        this.posiciones['b9'][1]-this.posiciones['b3'][1]<100 && this.posiciones['b9'][1]-this.posiciones['b3'][1]>0 &&
        ((this.posiciones['b2b'][1]-this.posiciones['b9'][1]<70 && this.posiciones['b2b'][1]-this.posiciones['b9'][1]>0) || (this.posiciones['b2'][1]-this.posiciones['b9'][1]<70 && this.posiciones['b2'][1]-this.posiciones['b9'][1]>0))
      ){
              console.log('correcto')

      }
    return val
    },
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height

      
    },
    onDrag: function (x, y) {
      this.x = x
      this.y = y


    },
    setId: function(event){
      console.log(event.target.id)
      this.tempAbajo = event.target.id
      this.posiciones[event.target.id][0]=this.xtemp
      this.posiciones[event.target.id][1]=this.ytemp

    },
    setId2: function(event){
      console.log(event.target.id)
      this.tempArriba = event.target.id
      if(this.tempAbajo ==  this.tempArriba){
      this.posiciones[this.tempArriba][0]=this.xtemp
      this.posiciones[this.tempArriba][1]=this.ytemp
      }else{
        this.posiciones[this.tempAbajo][0]=this.xtemp
      this.posiciones[this.tempAbajo][1]=this.ytemp
      }
      

    }
    ,
       onDragstop: function(ev){

        this.xtemp = this.x
        this.ytemp = this.y
        return ev 
       }
       
    }
}
</script>
