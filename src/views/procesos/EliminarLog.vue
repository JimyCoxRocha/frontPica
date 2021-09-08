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
                        <Boton :btnData="btnBuscar" :click="clickBuscar" :isDisabled="loading"/>
                    </v-col>
                </v-row>
            </div>
            <div 
            v-show="showButonDelete">
            <v-col
                class="mt-0 pa-0 mb-1"
                md="2"
                >

                <v-dialog
                    v-model="dialog"
                    width="500"
                    
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="red lighten-2"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        
                        >
                            Eliminar
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            Confirmar Eliminación
                        </v-card-title>

                        <v-card-text>
                            ¿Está seguro que desea eliminar los elementos seleccionados?
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-btn
                                color="primary"
                                text
                                @click="clickEliminar"
                            >
                                Eliminar
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                text
                                @click="dialog = false"
                            >
                                cancelar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
            </div>
            <ChargeData 
                :errorDetected = "errorDetected"
                :loading = "loading"
                :messagesErrorDetected = "messagesErrorDetected"
            >
                    <template slot="msgLoading">
                            <p v-show="loading">{{loadingMessage}}</p>
                    </template>
            </ChargeData>
            <div >
                
            <TableSelectLog 
                v-if="!loading"
                :items="dataSolicitada" 
                :obtenerSelecion="obtenerSelecion" 
                :headers="headers" 
                itemKey="_id"
                :columnEdit="false"
                />
            </div>
            </div>
        </div>
    </v-container>
</template>

<script>
import moment from 'moment';
import DatePicker from '../../components/DatePicker.vue';
import Boton from '../../components/Boton.vue';
import TableSelectLog from "../../components/TableSelectLog.vue";
import { btnBuscar, btnDelete } from "../../types/btnDesign.js";
import { findLogsToDelete, deleteLogs } from '../../services/DataServices';
import { consultaReporte } from '../../types/objetoConsultaReporte.js';
import { formatterLogsDelete, setterErrorData } from '../../helpers/setterData.js';
import ChargeData from "../../components/ChargeData.vue";
 

export default {
    name: "EliminarLog",
    data: () =>({
        tipoReporte: "Eliminar Log",
        fechaActual: moment(Date.now()).format('YYYY-MM-DD'),
        valorFechaDesde: moment(Date.now()).subtract(1, 'day').format('YYYY-MM-DD'),
        valorFechaHasta: moment(Date.now()).format('YYYY-MM-DD'),
        dataSolicitada: [],
        messagesErrorDetected: [],
        showButonDelete: false,
        btnBuscar,
        btnDelete,
        loading: false,
        btnDisabled: true,
        errorDetected: false,
        loadingMessage: "",
        dialog: false,
        selected: [],
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: '_id',
          },
          { text: 'Path endpoint', value: 'pathEndPoint' },
          { text: 'Path categoría', value: 'pathController' },
          { text: 'Fecha', value: 'date' }
        ],
    }),
    methods:{
        async chargeData(afterDelete){
            (afterDelete) ? 
                this.loadingMessage = "Actualizando tabla..." :
                this.loadingMessage = "Cargando los datos...";

            return await findLogsToDelete(consultaReporte(this.valorFechaDesde, this.valorFechaHasta))
            .then(({data})=>{
                this.showButonDelete = false;
                return data;
            })
            .catch(error => {
                this.showButonDelete = false;
                this.errorDetected = true;
                this.messagesErrorDetected = setterErrorData(error);
                return [];
            });
            
        },
        async clickBuscar(){
            this.showButonDelete = false;
            this.loading = true;
            this.dataSolicitada = await this.chargeData(false);
            this.loading = false;
        },
        async clickEliminar(){
            this.showButonDelete = false;
            this.dialog = false;
            this.loading = true;
            await deleteLogs(formatterLogsDelete(this.selected))
            .then(({data})=>{
                console.log(data);
                return data;
            })
            .catch(error => {
                this.errorDetected = true;
                this.messagesErrorDetected = setterErrorData(error);
            });
             this.dataSolicitada = await this.chargeData(true);
             this.selected = [];
             this.loading = false;
        },
        obtenerSelecion(elementos){
            this.selected = elementos;
            if(this.selected.length > 0){
                this.showButonDelete = true;
            }else{
                this.showButonDelete = false;
            }
        },
        capturarFechaDesde(fecha){
            this.valorFechaDesde = fecha;
        },
        capturarFechaHasta(fecha){
            this.valorFechaHasta = fecha;
        },
    },    
    components:{
        DatePicker,
        Boton,
        TableSelectLog,
        ChargeData
    },
    
}
</script>

<style>

</style>