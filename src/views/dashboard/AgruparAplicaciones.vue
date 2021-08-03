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
                            <Boton :btnData="btnBuscar" :click="clickBuscar"/>
                        </v-col>
                    </v-row>
                </div>
                <v-card-text class="d-flex justify-center">
                    <div id="chart3">
                        <apexchart type="pie" width="400" :options="chartOptionsPie" :series="seriesPie"></apexchart>
                    </div>
                </v-card-text>
                
                <v-progress-linear
                    indeterminate
                    color="primary"
                    :active="loading"
                >
                </v-progress-linear>
                    <p v-show="loading">Cargando los datos...</p>
            </div>
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
        </div>
    </v-container>
</template>

<script>
import moment from 'moment';
import DatePicker from '../../components/DatePicker.vue';
import { btnBuscar, btnCerrar } from "../../types/btnDesign.js";
import Boton from '../../components/Boton.vue';
import { fomatearSeriesPie, formatearSeriesBar, obtenerPathsEndpoints } from "../../helpers/formatearDataChart.js";

const LOGS_AUDITORIA = 1;
const LOGS_ERROR = 0;

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
        seriesBar: [ {data: [6,6]} ],
        btnBuscar,
        btnCerrar,
        fechaActual: moment(Date.now()).format('YYYY-MM-DD'),
        valorFechaDesde: moment(Date.now()).subtract(1, 'day').format('YYYY-MM-DD'),
        valorFechaHasta: moment(Date.now()).format('YYYY-MM-DD'),
        loading: false,
        showMoreDetailsChart: false
    }),
    components:{
        DatePicker,
        Boton,
    },
    computed:{
        chartOptionsPie: function() {
            return {
                chart: {
                    width: 380,
                    type: 'pie',
                    events: {
                        dataPointSelection: (event, chartConte, config) => {
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
                labels: obtenerPathsEndpoints(),
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
        async clickBuscar(){
            this.loading = !this.loading;
        },
        clickCerrar(){
            this.showMoreDetailsChart = false;
        },
        capturarFechaDesde(fecha){
            this.valorFechaDesde = fecha;
        },
        capturarFechaHasta(fecha){
            this.valorFechaHasta = fecha;
        },
        cargarDatosDetalleBar: function(index) {
            if(index == LOGS_AUDITORIA){
                console.log("valor AUDITORIA: "+index);
                this.seriesBar = this.obtenerDataBar("AUDITORIA");//Datos auditoria
                console.log(this.seriesPie);
                this.showMoreDetailsChart = true;
            }else if(index == LOGS_ERROR){
                console.log("valor ERROR: "+index);
                this.seriesBar = this.obtenerDataBar("ERROR");//Datos Error
                console.log(this.seriesBar);
                this.showMoreDetailsChart = true;
            }
        },
        async obtenerDataPie(){
            this.seriesPie = fomatearSeriesPie();
            /* await findAllLogDebug(consultaReporte)
                .then((data)=>{
                if(data != [{}] && data != null){
                    this.btnDisabled = false;
                }
                return data;
                })
                .catch(err => {
                console.log(err);
                }); */
        },
        obtenerDataBar(reporte){
            return formatearSeriesBar(reporte);
            /* await findAllLogDebug(consultaReporte)
                .then((data)=>{
                if(data != [{}] && data != null){
                    this.btnDisabled = false;
                }
                return data;
                })
                .catch(err => {
                console.log(err);
                }); */
        }
    }
}
</script>

<style>

</style>