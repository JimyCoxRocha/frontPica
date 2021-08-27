<template>
  <v-container fluid fill-height class="d-flex flex-column">
      <div style="width: 100%;" class="baseColor">
          <v-toolbar
            class="mb-2"
            color="secondary"
            dark
            flat
            >
                <v-toolbar-title>{{tipoOpcion}}</v-toolbar-title>
            </v-toolbar>
            <div class="mt-10 mr-4 ml-4 mb-10">
                <v-row>
                    <v-col
                        class="mt-0 pa-0 mb-9"
                        md="2">
                        <Boton :btnData="btnAgregar" :click="clickAgregar"/>
                    </v-col>
                    <v-col
                        class="mt-0 pa-0 mb-1"
                        v-show="showButonDelete"
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
                </v-row>
                <v-progress-linear
                    indeterminate
                    color="primary"
                    :active="loading"
                >
                </v-progress-linear>
                <p v-show="loading">Cargando los datos...</p>
                <TableSelectLog 
                :items="dataSolicitada" 
                :obtenerSelecion="obtenerSelecion" 
                :headers="headers" 
                itemKey="estado"
                :columnEdit="false"/>
            </div>
        </div>
  </v-container>
</template>

<script>
import { btnAgregar } from "../../types/btnDesign.js";
import Boton from "../../components/Boton.vue";
import TableSelectLog from "../../components/TableSelectLog.vue";

export default {
name: "RegistrarUser",
    data: () => ({
        tipoOpcion: "Mantenimiento de perfil",
        btnAgregar,
        showButonDelete: false,
        dialog: false,
        dataSolicitada: [],
        loading: false,
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'pathController',
          },
          { text: 'Perfil', value: 'perfil' },
          { text: 'Estado', value: 'estado' },
          { text: 'Opciones', value: 'opciones' },
          { text: 'Usuarios', value: 'usuarios' },
          { text: 'Acciones', value: 'acciones' }
        //   { text: 'Input', value: 'dataInput' },
        //   { text: 'Output', value: 'dataOutput' },
        ],
    }),
    methods:{
        clickAgregar(){
            console.log("Se agrego");
        },
        async clickEliminar(){
            this.dialog = false;
            console.log("ELIMINADO");
        },
        obtenerSelecion(elementos){
            this.selected = elementos;
            if(this.selected.length > 0){
                this.showButonDelete = true;
            }else{
                this.showButonDelete = false;
            }
        }
    },
    components:{
        Boton,
        TableSelectLog
    }
}
</script>

<style>

</style>