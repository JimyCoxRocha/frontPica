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
                <v-col
                    class="mt-0 pa-0 mb-9"
                    md="2">
                    <Boton :btnData="btnBuscar" :click="clickBuscar"/>
                </v-col>
                </v-row>
            </div>
            <v-col
                class="mt-0 pa-0 mb-1"
                md="2"
                >
                <Boton :btnData="btnDelete" :click="clickEliminar" :isDisabled="btnDisabled"/>
            </v-col>
            <v-progress-linear
                indeterminate
                color="primary"
                :active="loading"
            >
            </v-progress-linear>
                <p v-show="loading">Cargando los datos...</p>
            <TableReporte :dataSolicitada="dataSolicitada"/>
            </div>
        </div>
    </v-container>
</template>

<script>
import moment from 'moment';
import DatePicker from '../../components/DatePicker.vue';
import Boton from '../../components/Boton.vue';
import TableReporte from '../../components/TableReporte.vue';
import { btnBuscar, btnDelete } from "../../types/btnDesign.js";
import { findAllLogDebug } from '../../services/DataServices';
import { consultaReporte } from '../../types/objetoConsultaReporte.js';

export default {
    name: "EliminarLog",
    data: () =>({
        tipoReporte: "Eliminar Log",
        fechaActual: moment(Date.now()).format('YYYY-MM-DD'),
        valorFechaDesde: moment(Date.now()).subtract(1, 'day').format('YYYY-MM-DD'),
        valorFechaHasta: moment(Date.now()).format('YYYY-MM-DD'),
        dataSolicitada: [{}],
        btnBuscar,
        btnDelete,
        loading: false,
        btnDisabled: true,
    }),
    components:{
        DatePicker,
        Boton,
        TableReporte
    },
    methods:{
        async clickBuscar(){
            consultaReporte.fecha_desde = this.valorFechaDesde;
            consultaReporte.fecha_hasta = this.valorFechaHasta;
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
        async clickEliminar(){
            console.log("ELIMINADO");
        }
    }
}
</script>

<style>

</style>