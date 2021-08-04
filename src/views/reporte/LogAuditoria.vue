<template>
    <v-container fluid fill-height class="d-flex flex-column">
      <div style="width: 100%;" class="baseColor">
        <v-toolbar
          class="mb-2"
          color="secondary"
          dark
          flat
          >
          <v-toolbar-title>{{tipoReporte}}</v-toolbar-title>
        </v-toolbar>
        <div class="mt-10 mr-4 ml-4 mb-10">
          <div>
            <v-row
            >
              <DatePicker 
                :fechaInicial="valorFechaDesde" 
                texto="Fecha Desde:" 
                :capturarFecha="capturarFechaDesde"
                :fechaMax="valorFechaHasta"/>

              <DatePicker 
                :fechaInicial="valorFechaHasta"  
                texto="Fecha Hasta:"
                :capturarFecha="capturarFechaHasta"
                :fechaMin="valorFechaDesde"
                :fechaMax="fechaActual"/>

              <Select 
                texto="Modulo:" 
                :capturarSeleccion="capturarModulo" 
                :opcionesDisponibles="modulos"
                :inputKeyDefecto="inputSelected.keyModulo"/>

              <Select 
                texto="Categoría:" 
                :capturarSeleccion="capturarCategoria" 
                :opcionesDisponibles="categorias"
                :inputKeyDefecto="inputSelected.keyCategoria"/>

              <Select 
                  texto="Servicio:" 
                  :capturarSeleccion="capturarServicio" 
                  :opcionesDisponibles="servicios"
                  :inputKeyDefecto="inputSelected.keyService"/>
              <v-col
                class="mt-0 pa-0 mb-9"
                md="2">
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
                  <Boton :btnData="exportarPDF" :click="savePDF" :isDisabled="btnDisabled"/>
                </v-col>
                <v-col
                  class=" pl-0 pr-0"
                >
                  <Boton :btnData="exportarExcel" :click="saveEXCEL" :isDisabled="btnDisabled"/>
                </v-col>
              </v-row>
            </v-col>
          </div>
          <v-progress-linear
            indeterminate
            color="primary"
            :active="loading"
          >
          </v-progress-linear>
            <p v-show="loading">Cargando los datos...</p>
          <TableReporte :items="dataSolicitada"/>
        </div>
      </div>
    </v-container>
</template>

<script>
  import moment from 'moment';
  import DatePicker from '../../components/DatePicker.vue';
  import Select from '../../components/Select.vue';
  import Boton from '../../components/Boton.vue';
  import TableReporte from '../../components/TableReporte.vue';
  import { findAllLogDebug } from '../../services/DataServices';
  import { consultaReporte } from '../../types/objetoConsultaReporte.js';
  import { convertToPdf } from "../../helpers/convertToPdf.js";
  import { convertToExcel } from "../../helpers/convertToExcel.js";
  import { btnBuscar, exportarPDF, exportarExcel } from "../../types/btnDesign.js";
  
  export default {
      name: "LogAuditoria",
      data: () => ({
        tipoReporte: "Reporte de Logs Auditoría",
        fechaActual: moment(Date.now()).format('YYYY-MM-DD'),
        valorFechaDesde: moment(Date.now()).subtract(1, 'day').format('YYYY-MM-DD'),
        valorFechaHasta: moment(Date.now()).format('YYYY-MM-DD'),
        inputSelected: {
            keyModulo: "pica",
            keyCategoria: "all",
            keyService: "all",
        },
        modulos: [
          {
            key: "pica",
            name: "Proyectos"
          }
        ],
        categorias: [
          {
            key: "all",
            name: "Todos"
          },
          {
            key: "cliente",
            name: "Cliente"
          },
          {
            key: "cliente",
            name: "Cliente"
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
        btnDisabled: true,
        exportarPDF,
        exportarExcel,
        dataSolicitada: [],
        loading: false
      }),
      components:{
        Boton,
        TableReporte,
        DatePicker,
        Select
      },
      methods:{
          async clickBuscar(){
            consultaReporte.fecha_desde = this.valorFechaDesde;
            consultaReporte.fecha_hasta = this.valorFechaHasta;
            consultaReporte.categoria = this.inputSelected.keyCategoria;
            consultaReporte.servicio = this.inputSelected.keyService;
            this.loading = true;
            this.dataSolicitada = await findAllLogDebug(consultaReporte)
            .then((data)=>{
              if(data != [{}] && data != null){
                this.btnDisabled = false;
              }
              return data;
            })
            .catch(err => {
              console.log(err);
            });
            this.loading = false;
          },
          capturarFechaDesde(fecha){
            this.valorFechaDesde = fecha;
          },
          capturarFechaHasta(fecha){
            this.valorFechaHasta = fecha;
          },
          capturarModulo(key){
            this.inputSelected.keyModulo = key;
          },
          capturarServicio(key){
            this.inputSelected.keyService = key;
          },
          capturarCategoria(key){
            this.inputSelected.keyCategoria = key;
          },
          savePDF(){
            convertToPdf(this.dataSolicitada, this.tipoReporte);
          },
          saveEXCEL(){
            convertToExcel(this.dataSolicitada, this.tipoReporte);
          }
      }

  }
</script>

<style  scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #00529F;
}
</style>