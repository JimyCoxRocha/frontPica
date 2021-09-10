<template>
    <v-container fluid fill-height class="d-flex flex-column">
        <div style="width: 100%;" class="baseColor">
            <v-toolbar
                class="mb-2"
                color="secondary"
                dark
                flat
                >
                <v-toolbar-title>{{ tipoReporte }}</v-toolbar-title>
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
                        <v-col
                            class="mt-0 pa-0 mb-9"
                            md="2"
                        >
                            <Boton :btnData="btnBuscar" :click="clickBuscar" :isDisabled="loading"/>
                        </v-col>
                    </v-row>
                </div>
                <ChargeData 
                    :loading = "loading"
                >
                    <template slot="msgLoading">
                            <p v-show="loading">Cargando los datos...</p>
                    </template>
                </ChargeData>
                <v-card-text class="d-flex justify-center" v-if="!loading || errorDetected">
                    <div id="chart3">
                        <apexchart type="pie" width="400" :options="chartOptionsPie" :series="seriesPie"></apexchart>
                    </div>
                </v-card-text>
                </div>
                    <ChargeData 
                        :loading = "loadingDataBar"
                    >
                        <template slot="msgLoading">
                                <p v-show="loadingDataBar">Cargando gráfico de barras por servicio...</p>
                        </template>
                    </ChargeData>
                    <div id="chart" v-show="showMoreDetailsChart">
                        <apexchart type="bar" height="350" :options="chartOptionsBar" :series="seriesBar"></apexchart>
                    </div>
                    <v-col
                        class="mt-0 pa-0 mb-9"
                        md="2"
                        v-show="showMoreDetailsChart"
                    >
                        <Boton :btnData="btnCerrar" :click="clickCerrar"/>
                    </v-col>

                    <Notification
                        v-if="activeNotification"
                        v-model="activeNotification"
                        :isError="errorDetected"
                        :messages = "messagesNotification"
                    />
                <div>
            </div>
        </div>
    </v-container>
</template>

<script>
import moment from 'moment';
import DatePicker from '../../components/DatePicker.vue';
import Boton from '../../components/Boton.vue';
import ChargeData from '../../components/ChargeData.vue';
import Notification from "../../components/Notification.vue";
import { btnBuscar, btnCerrar } from "../../types/btnDesign.js";
import { formatterSeriesBar } from "../../helpers/setterData.js";
import { findStadisticPie, findStadisticByEndpoint } from "../../services/DataServices.js";
import { consultaReporte } from '../../types/objetoConsultaReporte.js';

/* const LOGS_AUDITORIA = 1;
const LOGS_ERROR = 0; */

const configResponsiveChart = {
    breakpoint: 480,
    options: {
        chart: {
            width: 300
        },
        legend: {
            position: 'bottom'
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '1rem',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
                colors: undefined
            },
            background: {
                enabled: true,
                foreColor: '#fff',
            }
        },
    },
}

const dataLabelChart = {
    enabled: true,
        style: {
        fontSize: '1.2rem',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: undefined
    },
    background: {
        enabled: true,
        foreColor: '#fff',
    }
}

export default {
    name:"AgruparAplicaciones",
    created(){
        this.obtenerDataPie();
    },
    data: () => ({
        tipoReporte: "Agrupado por Aplicaciones",
        seriesPie: [ [44] ],
        seriesBar: [ {name: "", data: [6,6]} ],
        btnBuscar,
        btnCerrar,
        fechaActual: moment(Date.now()).format('YYYY-MM-DD'),
        valorFechaDesde: moment(Date.now()).subtract(1, 'day').format('YYYY-MM-DD'),
        valorFechaHasta: moment(Date.now()).format('YYYY-MM-DD'),
        loading: false,
        loadingDataBar: false,
        showMoreDetailsChart: false,
        errorBarDetected: false,
        errorDetected: false,
        servicesBar: [],
        messagesNotification: [],
        errorDetected: false,
        activeNotification: false,
    }),
    components:{
        DatePicker,
        Boton,
        ChargeData,
        Notification
    },
    computed:{
        chartOptionsPie: function() {
            return {
                chart: {
                    width: 380,
                    type: 'pie',
                    events: {
                        dataPointSelection: (event, chartConte, config) => {
                            /* this.obtenerPathsEndpoints(); */
                            this.cargarDatosDetalleBar(config.dataPointIndex);
                        }
                    }
                },
                labels: ['Logs Auditoria', 'Logs Error'],
                colors: ["#2A6CAD", "#F27036"],
                dataLabels: dataLabelChart,
                legend: {
                    show: true,
                    fontSize: '15em',
                },
                responsive: [ configResponsiveChart ]
            }
        },
        chartOptionsBar: function() {
            return {
                chart: {
                    height: 350,
                    type: 'bar',
                },
                labels: this.servicesBar,
                colors: ["#2A6CAD", "#F27036"],
                dataLabels: dataLabelChart,
                legend: {
                    show: true,
                    fontSize: '15em',
                }
            }
        },
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
         async cargarDatosDetalleBar (index) {
             const indexReport = ["auditory", "error"];
            if(indexReport[index] === this.seriesBar[0].name){
                this.clickCerrar();
                return;
            }
             this.loadingDataBar = true;
             this.showMoreDetailsChart = false;
            try{

                let {data} = await findStadisticByEndpoint(indexReport[index] ,consultaReporte(this.valorFechaDesde, this.valorFechaHasta))
                    .then((data)=>{
                        return data;
                    })
                    .catch(error => {
                        this.processError(setterErrorData(error));
                    });
            
                let aux = formatterSeriesBar(data);
                this.servicesBar = aux.keys;
                this.seriesBar = aux.count;
                this.showMoreDetailsChart = true;
            }catch(err){
                this.processError(setterErrorData(err));
                this.showMoreDetailsChart = false;
            }
            this.loadingDataBar = false;
        },
        async clickBuscar(){
            this.clickCerrar();
            this.loading = true;
            this.seriesPie = this.obtenerDataPie();
        },
        clickCerrar(){
            this.seriesBar = [ {name: "", data: [6,6]} ];
            this.showMoreDetailsChart = false;
        },
        capturarFechaDesde(fecha){
            this.valorFechaDesde = fecha;
        },
        capturarFechaHasta(fecha){
            this.valorFechaHasta = fecha;
        },
        async obtenerDataPie(){
            this.loading = true;
            this.seriesPie = await findStadisticPie(consultaReporte(this.valorFechaDesde, this.valorFechaHasta))
              .then(({data})=>{
                  return [data.logAuditory, data.logError];
              })
              .catch(error => {
                  this.processError(setterErrorData(error));
              });
            
            this.loading = false;
        },
        async obtenerDataBar(){
            return await findStadisticPie(consultaReporte(this.valorFechaDesde, this.valorFechaHasta))
              .then(({data})=>{
                  return [data.logAuditory, data.logError];
              })
              .catch(error => {
                  this.processError(setterErrorData(error));
              });
        }
    }
}
</script>

<style>

</style>