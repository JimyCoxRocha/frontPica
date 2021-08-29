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
            <v-col
                class="mt-0 pa-0 mb-9"
                md="1">
                <Boton :btnData="btnAgregar" :click="clickAgregar"/>
            </v-col>
            
            <ChargeData 
                :errorDetected = "errorDetected"
                :loading = "loading"
                :messagesErrorDetected = "messagesErrorDetected"
            />
            <TableEditAndDelete 
                :items="profiles" 
                :headers="headers" 
                :editedItem="moduleItems"
                :funcEditItem = "funcEditItem"
                :enableItem = "enableItem"
                :deleteItem = "disableItem"
            />
            <v-dialog
                v-model="dialogEdit"
                persistent
                max-width="70%"
                >
                <v-card>
                    <v-toolbar dense color="primary">
                        <v-toolbar-title class="white--text">
                            <span class="text-h5">Editar Perfil</span>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-text>
                        <v-container>
                            <v-row>
                            <v-col cols="12"
                                sm="6"
                                md="4" 
                                v-for="(item, index) in moduleItems" :key="index">
                                <CardProfile :title="item.name">
                                    <template slot="module">
                                        <v-checkbox
                                            v-for="(opcion, index) in item.options" :key="index"
                                            :label="opcion.name"
                                            :value="{idModule: opcion.idModule, idOption: opcion.idOption }"
                                            v-model="selected"
                                        >
                                        </v-checkbox>
                                    </template>
                                    
                                </CardProfile>
                            </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="closeEditProfile"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="saveProfile"
                        >
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <DialogAcceptCancel 
                :activeDialog = "dialogEnableProfile"
            >
                <template slot="titleCard">
                    <span class="text-h5">Habilitar Perfil</span>
                </template>
                <template slot="mainDialog">
                    <v-container>
                        <v-alert
                            type="success"
                        >
                            Está seguro/a que desea habilitar el perfil: {{editProfileSelected.name}}
                        </v-alert>
                    </v-container>
                </template>
                <template slot="cancel">
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="closeDialog"
                    >
                        Cancelar
                    </v-btn>
                </template>
                <template slot="accept">
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="enableProfile"
                    >
                        Aceptar
                    </v-btn>
                </template>
            </DialogAcceptCancel>

            <DialogAcceptCancel 
                :activeDialog = "dialogDisableProfile"
            >
                <template slot="titleCard">
                    <span class="text-h5">Deshabilitar Perfil</span>
                </template>
                <template slot="mainDialog">
                    <v-container>
                        <v-alert
                            type="warning"
                        >
                            Está seguro/a que desea deshabilitar el perfil: {{editProfileSelected.name}}
                        </v-alert>
                    </v-container>
                </template>
                <template slot="cancel">
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="closeDialog"
                    >
                        Cancelar
                    </v-btn>
                </template>
                <template slot="accept">
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="disableProfile"
                    >
                        Aceptar
                    </v-btn>
                </template>
            </DialogAcceptCancel>
            

        </div>
    </div>
  </v-container>
</template>

<script>
import { btnAgregar } from "../../types/btnDesign.js";
import Boton from "../../components/Boton.vue";
import TableEditAndDelete from "../../components/TableEditAndDelete.vue";
import { findProfiles, findProfileOptions, enableProfile, disableProfile } from '../../services/DataServices';
import { setterProfilesInOptionsActives, createProfilesInOptionsUpdates } from '../../helpers/setterData';
import ChargeData from "../../components/ChargeData.vue";
import DialogAcceptCancel from "../../components/DialogAcceptCancel.vue";
import CardProfile from "../../components/CardProfile.vue";
import { findLocalStorage } from "../../helpers/handleLocalStorage.js";

export default {
    name: "RegistrarUser",
    created: function(){
        this.getProfiles();
    },
    data: () => ({
        tipoOpcion: "Mantenimiento de perfil",
        btnAgregar,
        loading: true,
        messagesErrorDetected: [],
        errorDetected: false,
        showButonDelete: false,
        dialogEdit: false,
        dialogEnableProfile: false,
        dialogDisableProfile: false,
        editProfileSelected: 0,
        selected: [],
        profiles: [],
        moduleItems: [],
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'idProfile',
          },
          { text: 'Perfil', value: 'name' },
          { text: 'Estado', value: 'status' },
          { text: 'Opciones', value: 'numOptions' },
          { text: 'Usuarios', value: 'numUsers' },
          { text: 'Acciones', value: 'acciones', sortable: false }
        ],
    }),
    computed:{
        
    },
    methods:{
        clickAgregar(){
            console.log("Se agrego");
        },
        obtenerSelecion(elementos){
            this.selected = elementos;
            if(this.selected.length > 0){
                this.showButonDelete = true;
            }else{
                this.showButonDelete = false;
            }
        },
        async getProfiles(){
            this.loading = true;
            this.profiles = await findProfiles()
                .then((resp)=>{
                    if(resp.data.length > 0){
                        return resp.data;
                    }else{
                        return [];
                    }
                })
                .catch(error => {
                    this.errorDetected = true;
                    this.messagesErrorDetected = error.response.messages;
                    return [];
                });
                this.loading = false;
        },
        async funcEditItem (idProfile) {
            this.editProfileSelected = idProfile;
            this.moduleItems = await findProfileOptions(idProfile)
            .then((resp)=>{
                if(resp.data.length > 0){
                    //Setear los valores
                    this.selected = setterProfilesInOptionsActives(resp.data);
                    return resp.data;
                }else{
                    return [];
                }
            })
            .catch(error => {
                console.log(error);
                /* this.errorDetected = true;
                this.messagesErrorDetected = error.response.messages; */
                return [];
            });
            this.dialogEdit = true;

            // this.editedIndex = this.items.indexOf(item);
            // console.log(this.editedIndex);
            // this.editedItem = Object.assign({}, item)
            // this.dialog = true
        },
        closeEditProfile () {
            this.dialogEdit = false;
            this.selected = [];
            this.moduleItems = [];
        },
        disableItem (idProfile) {
            this.editProfileSelected = idProfile;
            this.dialogDisableProfile = true;
        },
        enableItem(idProfile){
            this.editProfileSelected = idProfile;
            this.dialogEnableProfile = true;
        },
        async disableProfile(){
            await disableProfile(this.editProfileSelected)
            .then((resp)=>{
                console.log(resp.data);
                return resp.data;
            })
            .catch(error => {
                console.log(error.response.data.error);//Acceder a .messages y mostrar el mensaje
                return "";
            });
            this.closeDialog();
        },
        async enableProfile(){
            await enableProfile(this.editProfileSelected)
            .then((resp)=>{
                console.log(resp.data);
                return resp.data;
            })
            .catch(error => {
                console.log(error.response.data.error);//Acceder a .messages y mostrar el mensaje
                return "";
            });
            this.closeDialog();
        },
        closeDialog(){
            this.dialogDisableProfile = false;
            this.dialogEnableProfile = false;
        },
        saveProfile () {
            
            createProfilesInOptionsUpdates(this.selected, this.moduleItems, this.editProfileSelected, this.user=findLocalStorage('user'));
            /* if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
            this.desserts.push(this.editedItem)
            } */
            this.closeEditProfile()
        }
    },
    components:{
        Boton,
        TableEditAndDelete,
        ChargeData,
        CardProfile,
        DialogAcceptCancel
    }
}
</script>

<style>

</style>