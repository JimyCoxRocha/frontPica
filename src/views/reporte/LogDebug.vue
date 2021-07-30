<template>
    <v-container fluid fill-height class="d-flex flex-column">
      <div style="width: 100%;" class="baseColor">
        <v-toolbar
          class="mb-2"
          color="secondary"
          dark
          flat
          >
          <v-toolbar-title>Reporte de Logs Debug</v-toolbar-title>
        </v-toolbar>
        <div class="mt-10 mr-4 ml-4 mb-10">
          <div>
            <v-row
            >
              <v-col
                cols="12"
                md="3"
              >
                <v-row>
                  <v-col
                    class="pr-0"
                    cols="5"
                    md="6"
                  >
                    <p class="text-right">Fecha Desde:</p>
                  </v-col>
                  <v-col
                  @click.stop = "fechaDesde = true"
                  class="pa-0"
                  cols="6"
                  md="6"
                  >
                    <v-menu
                      v-model="fechaDesde"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-bind="attrs"
                          v-on="on"
                          v-model="valorFechaDesde"
                          rounded
                          readonly
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="valorFechaDesde"
                        @input="fechaDesde = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                cols="12"
                md="3"
              >
                <v-row>
                  <v-col
                    class="d-inline pr-0"
                    cols="5"
                    md="6"
                  >
                    <p class="text-right">Fecha Hasta:</p>
                  </v-col>
                  <v-col
                  @click.stop = "fechaHasta = true"
                  class="pa-0"
                  cols="6"
                  md="6"
                  >
                    <v-menu
                      v-model="fechaHasta"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-bind="attrs"
                          v-on="on"
                          v-model="valorFechaHasta"
                          rounded
                          readonly
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="valorFechaHasta"
                        @input="fechaHasta = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                cols="12"
                md="3"
              >
                <v-row>
                  <v-col
                    class="d-inline pr-0"
                    cols="4"
                    md="4"
                  >
                    <p class="text-right">Modulo:</p>
                  </v-col>
                  <v-col
                  class="pa-0"
                  cols="7"
                  md="8"
                  >
                    <v-select
                      :items="modulos" 
                      v-model="inputSelected.keyModulo"
                      item-value="key" 
                      item-text="name"
                      outlined
                      rounded
                      dense
                      hide-details
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>


              <v-col
                cols="12"
                md="3"
              >
                <v-row>
                  <v-col
                    class="d-inline pr-0"
                    cols="4"
                    md="4"
                  >
                    <p class="text-right">Servicio:</p>
                  </v-col>


                  <v-col
                    class="pa-0"
                    cols="7"
                    sm="6"
                  >
                    <v-select
                      :items="servicios" 
                      v-model="inputSelected.keyService"
                      item-value="key" 
                      item-text="name"
                      outlined
                      rounded
                      dense
                      hide-details
                    ></v-select>
                  </v-col>

                </v-row>
              </v-col>

              <v-col>
                  <Boton :btnData="btnBuscar" :click="clickBuscar"/>
              </v-col>
            </v-row>
          </div>
          

          <div class="d-flex justify-end">
            <v-col
              cols = "12"
              md = "4"
            >
              <v-row>
                <v-col
                  class=" pl-0 pr-0"
                >
                  <Boton :btnData="exportarPDF"/>
                </v-col>
                <v-col
                  class=" pl-0 pr-0"
                >
                  <Boton :btnData="exportarExcel"/>
                </v-col>
              </v-row>
            </v-col>
          </div>
          <TableReporte :dataSolicitada="dataSolicitada"/>
        </div>
      </div>
    </v-container>
</template>

<script>
  import Boton from '../../components/Boton.vue';
  import TableReporte from '../../components/TableReporte.vue';
  import { findAllLogDebug } from '../../services/DataServices';
  import { consultaReporte } from '../../types/objetoConsultaReporte.js';

  const btnBuscar = {
    icon: "mdi-magnify",
    texto: "Buscar",
    color: "secondary",
  }

  const exportarPDF = {
    icon: "mdi-file-pdf-outline",
    texto: "Exportar PDF",
    color: "secondary",
  }
  const exportarExcel = {
    icon: "mdi-file-excel-outline",
    texto: "Exportar Excel",
    color: "excelColor",
  }

  export default {
      name: "LogDebug",
      data: () => ({
        fechaDesde: false,
        valorFechaDesde: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        fechaHasta: false,
        valorFechaHasta: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        inputSelected: {
            keyModulo: "pica",
            keyService: "all",
        },
        modulos: [
          {
            key: "pica",
            name: "Proyectos"
          }
        ],
        servicios: [
          {
            key: "all",
            name: "Todos"
          },
          {
            key: "catalogue",
            name: "Catálogo"
          }
        ],
        btnBuscar,
        exportarPDF,
        exportarExcel,
        dataSolicitada: [{}]
      }),
      components:{
        Boton,
        TableReporte
      },
      methods:{
          async clickBuscar(){
            consultaReporte.fecha_desde = this.valorFechaDesde;
            consultaReporte.fecha_hasta = this.valorFechaHasta;
            console.log(consultaReporte);

            this.dataSolicitada = await findAllLogDebug(consultaReporte)
            .then((data)=>{
              return data;
            })
            .catch(err => {
              console.log(err);
            })
          }
      }

  }
</script>

<style  scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #00529F;
}

</style>