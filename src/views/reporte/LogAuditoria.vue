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
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
          v-show="loadingCatalogue"
        >
        </v-progress-circular>
        <p class="ma-0 ba-0" v-show="loadingCatalogue"> Cargando catálogo...</p>
        <p class="ma-0 mb-5 pa-0 error white--text" v-show="errorDetected">Ha ocurrido el siguiente error: {{messageErrorDetected}}</p>
        <div class="mt-10 mr-4 ml-4 mb-10" v-show="dataInitialLoaded">
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
                texto="Modulo:">
                  <v-autocomplete
                    :items="modulos" 
                    v-model="inputSelected.keyModulo"
                    item-value="key" 
                    item-text="name"
                    outlined
                    rounded
                    dense
                    hide-details
                ></v-autocomplete>
                </Select>


              <Select 
                  texto="Servicio:">
                    <v-autocomplete
                    :items="servicios" 
                    v-model="inputSelected.keyService"
                    item-value="key" 
                    item-text="name"
                    outlined
                    rounded
                    dense
                    hide-details
                    @change="serviceSelected()"
                ></v-autocomplete> 
              </Select>
              <Select 
                texto="Endpoint:"> 
                <v-autocomplete
                    :items="categorias" 
                    v-model="inputSelected.keyCategoria"
                    item-value="name" 
                    item-text="name"
                    outlined
                    rounded
                    dense
                    hide-details
                ></v-autocomplete>  
              </Select>
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
          <Notification
            v-if="activeNotification"
            v-model="activeNotification"
            :isError="errorDetected"
            :messages = "messagesNotification"
          />
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
  import Notification from "../../components/Notification.vue";
  import { findReports, findCataloguesOptions, findCataloguesEndPoints } from '../../services/DataServices';
  import { consultaReporte } from '../../types/objetoConsultaReporte.js';
  import { convertToPdf } from "../../helpers/convertToPdf.js";
  import { itemQueryReport, findObjectToReport, findObjectToReportEndPoint, setterErrorData } from "../../helpers/setterData";
  import { convertToExcel } from "../../helpers/convertToExcel.js";
  import { btnBuscar, exportarPDF, exportarExcel } from "../../types/btnDesign.js";

  export default {
      name: "LogAuditoria",
      created(){
        this.cargarCatalogos();
      },
      data: () => ({
        tipoReporte: "Reporte de Logs Auditoría",
        fechaActual: moment(Date.now()).format('YYYY-MM-DD'),
        valorFechaDesde: moment(Date.now()).subtract(1, 'day').format('YYYY-MM-DD'),
        valorFechaHasta: moment(Date.now()).format('YYYY-MM-DD'),
        errorDetected: false,
        messageErrorDetected: "",
        inputSelected: {
            keyModulo: "pos-pica",
            keyCategoria: "all",
            keyService: "all",
        },
        modulos: [
          {
            key: "pos-pica",
            name: "Proyectos"
          }
        ],
        categorias: [
          {
            key: "all",
            name: "Todos"
          }
        ],
        servicios: [
          {
            key: "all",
            name: "Todos"
          }
        ],
        btnBuscar,
        btnDisabled: true,
        exportarPDF,
        exportarExcel,
        dataSolicitada: [],
        loading: false,
        loadingCatalogue: true,
        dataInitialLoaded: false,
        messagesNotification: [],
        errorDetected: false,
        activeNotification: false,
        messagesNotification: [],
        errorDetected: false,
        activeNotification: false,
      }),
      components:{
        Boton,
        TableReporte,
        DatePicker,
        Select,
        Notification
      },
      methods:{
        processComplete(message){
            this.messagesNotification = message;
            this.errorDetected = false;
            this.activeNotification =  true;
        },
        processError(message){
            this.messagesNotification = message;
            this.errorDetected = true;
            this.activeNotification =  true;
        },
        async cargarCatalogos(){
          this.loadingCatalogue= true;
          this.dataInitialLoaded = false;
          this.errorDetected = false;
          this.messageErrorDetected = "";

          try{
            this.modulos = await this.cargarCatalogo("modules");
            this.inputSelected.keyModulo = this.modulos[0].key;

            this.servicios = await this.cargarCatalogo("services/pos-pica");
            this.inputSelected.keyService = this.servicios[0].key;
            this.categorias = await this.cargarEndpoints(this.servicios[0].key);
            
            this.loadingCatalogue= false;
            this.dataInitialLoaded = true;
          }catch(err){
            this.processError(setterErrorData(err));
            this.loadingCatalogue= false;
            this.dataInitialLoaded = false;
          }
        },
        async cargarCatalogo(tipoCatalogo){
          //Llenamos los módulos
          return await findCataloguesOptions(tipoCatalogo)
          .then(({data})=>{
              return data;
          })
          .catch(error => {
            this.processError(setterErrorData(error));
            this.loadingCatalogue= false;
            this.dataInitialLoaded = false;
          });
        },
        async cargarEndpoints(service){
          //Llenamos los módulos
          return await findCataloguesEndPoints(service)
          .then(({data})=>{
            this.inputSelected.keyCategoria = "Todos";
            return [{key: "all",name: "Todos"}, ...data]
          })
          .catch(error => {
            this.processError(setterErrorData(error));
          });
        },
        async clickBuscar(){
          this.errorDetected = false;
          this.messageErrorDetected = "";
          let consulta = consultaReporte(this.valorFechaDesde, this.valorFechaHasta);
            let keyEndpoint = this.categorias.filter(point => (point.name === this.inputSelected.keyCategoria));
            consulta["items"] = itemQueryReport(
              findObjectToReport(this.modulos, this.inputSelected.keyModulo),
              findObjectToReport(this.servicios, this.inputSelected.keyService),
              findObjectToReportEndPoint(this.categorias,  keyEndpoint[0].name));
              this.loading = true;
            if(keyEndpoint[0].key !== "all")
              this.dataSolicitada = await findReports("auditory", consulta)
              .then(({data})=>{
                return data;
              })
              .catch(error => {
                  this.processError(setterErrorData(error));
              });
            else
              this.findAllLogs(consulta);
          if(this.dataSolicitada.length !== 0 )
            this.btnDisabled =false;
          else this.btnDisabled = true;
          this.loading = false;
        },
        async findAllLogs(consulta){
          this.dataSolicitada = await findReports("audits", consulta)
            .then(({data})=>{
              return data;
            })
            .catch(error => {
                this.processError(setterErrorData(error));
            });
            if(this.dataSolicitada.length !== 0 )
              this.btnDisabled =false;
            else this.btnDisabled = true;
              this.loading = false;
        },
        capturarFechaDesde(fecha){
          this.valorFechaDesde = fecha;
        },
        capturarFechaHasta(fecha){
          this.valorFechaHasta = fecha;
        },
        async serviceSelected(){
          this.categorias = await this.cargarEndpoints(this.inputSelected.keyService);
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