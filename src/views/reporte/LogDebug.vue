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
                          v-model="date"
                          rounded
                          readonly
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
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
                          v-model="date"
                          rounded
                          readonly
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
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
                      :items="items"
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
                      :items="items"
                      outlined
                      rounded
                      dense
                      hide-details
                    ></v-select>
                  </v-col>

                </v-row>
              </v-col>

              <v-col>
                  <Boton :btnData="btnBuscar"/>
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
          <TableReporte/>
        </div>
      </div>
    </v-container>
</template>

<script>
  import Boton from '../../components/Boton.vue';
  import TableReporte from '../../components/TableReporte.vue';

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
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        fechaDesde: false,
        fechaHasta: false,
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],

        btnBuscar,
        exportarPDF,
        exportarExcel
      }),
      components:{
        Boton,
        TableReporte
      }

  }
</script>

<style  scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #00529F;
}

</style>