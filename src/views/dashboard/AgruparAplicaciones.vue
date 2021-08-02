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
                        <apexchart type="pie" width="400" :options="chartOptions" :series="series"></apexchart>
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
        </div>
    </v-container>
</template>

<script>
import moment from 'moment';
import DatePicker from '../../components/DatePicker.vue';
import { btnBuscar } from "../../types/btnDesign.js";
import Boton from '../../components/Boton.vue';

export default {
    name:"AgruparAplicaciones",
    data: () => ({
        tipoReporte: "Agrupado por Aplicaciones",
        series: [44, 55],
        chartOptions: {
            chart: {
                width: 380,
                type: 'pie'
            },
            labels: ['Logs Auditoria', 'Logs Error'],
            colors: ["#2A6CAD", "#F27036"],
            dataLabels: {
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
            },
            legend: {
                show: true,
                fontSize: '15em',
            },
            responsive: [{
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
            }]
        },
        btnBuscar,
        fechaActual: moment(Date.now()).format('YYYY-MM-DD'),
        valorFechaDesde: moment(Date.now()).subtract(1, 'day').format('YYYY-MM-DD'),
        valorFechaHasta: moment(Date.now()).format('YYYY-MM-DD'),
        loading: false
    }),
    components:{
        DatePicker,
        Boton
    },
    methods:{
        async clickBuscar(){
            this.loading = !this.loading;
        },
        capturarFechaDesde(fecha){
            this.valorFechaDesde = fecha;
        },
        capturarFechaHasta(fecha){
            this.valorFechaHasta = fecha;
        },
    }
}
</script>

<style>

</style>