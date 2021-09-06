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
            <v-btn dark color="red" class="mt-6" @click="showMessage">Click Me</v-btn>


            <ChargeData 
                :errorDetected = "errorDetected"
                :loading = "loading"
                :messagesErrorDetected = "messagesErrorDetected"
            >
                    <template slot="msgLoading">
                            <p v-show="loading">Guardando los datos...</p>
                    </template>
            </ChargeData>
            <TableEditAndDelete 
                :items="profiles" 
                :headers="headers" 
                :editedItem="moduleItems"
                :funcEditItem = "funcEditItem"
                :enableItem = "enableItem"
                :deleteItem = "disableItem"
            />
            <v-dialog
                v-if= "dialogEdit"
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
                    <v-container v-if = "showAlertInfo">
                        <v-alert
                            type="info"
                        > Debe realizar algún cambio </v-alert>
                    </v-container>
                    <v-container>
                        <ChargeData 
                            :errorDetected = "errorDetected"
                            :loading = "loadingSaveData"
                            :messagesErrorDetected = "messagesErrorDetected"
                        >
                            <template slot="msgLoading">
                                <p v-show="loadingSaveData">Guardando los datos...</p>
                            </template>
                        </ChargeData>
                    </v-container>
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
                            @click="closeDialog"
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
                :activeDialog = "dialogAddProfile"
            >
                <template slot="titleCard">
                    <span class="text-h5">Agregar Perfil</span>
                </template>
                <template slot="mainDialog">
                    <v-container v-if = "showAlertInfo">
                        <v-alert
                            type="info"
                        > Debe ingresar los datos </v-alert>
                    </v-container>
                    <v-container>
                       <v-row
                       > 
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-row>
                                    <v-col
                                        class="pr-0"
                                        cols="2"
                                        md="2"
                                    >
                                        <p class="text-right ma-0 mt-2">Nombre:</p>
                                    </v-col>
                                    <v-col
                                        class="pr-0"
                                        cols="9"
                                        md="10"
                                    >
                                        <TextFieldSimpleData 
                                            v-if= "dialogAddProfile"
                                            v-model="nameProfile"
                                            label= "Nombre del perfil"
                                        />
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-row>
                                    <v-col
                                        class="pr-0"
                                        cols="2"
                                        md="3"
                                    >
                                        <p class="text-right ma-0 mt-2">Descripción:</p>
                                    </v-col>
                                    <v-col
                                        class="pr-0"
                                        cols="9"
                                        md="8"
                                    >
                                        <TextFieldSimpleData 
                                            v-if= "dialogAddProfile"
                                            v-model="descriptionProfile"
                                            label= "Descripción del perfil"
                                        />
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
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
                        @click="addProfile"
                    >
                        Guardar
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
import { findProfiles, findProfileOptions, enableProfile, disableProfile, updateProfileInOption, saveProfile } from '../../services/DataServices';
import { setterProfilesInOptionsActives, createProfilesInOptionsUpdates, setterErrorData } from '../../helpers/setterData';
import ChargeData from "../../components/ChargeData.vue";
import DialogAcceptCancel from "../../components/DialogAcceptCancel.vue";
import TextFieldSimpleData from "../../components/TextFieldSimpleData.vue";
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
        loadingSaveData: false,
        messagesErrorDetected: [],
        errorDetected: false,
        dialogEdit: false,
        dialogEnableProfile: false,
        dialogDisableProfile: false,
        dialogAddProfile: false,
        editProfileSelected: 0,
        showAlertInfo: false,
        nameProfile: "",
        descriptionProfile: "",
        interactivities: [],
        selected: [],
        profiles: [],
        moduleItems: [],
        headers: [
          { text: 'ID', align: 'start', sortable: false, value: 'idProfile', },
          { text: 'Perfil', value: 'name' },
          { text: 'Estado', value: 'status' },
          { text: 'Opciones', value: 'numOptions' },
          { text: 'Usuarios', value: 'numUsers' },
          { text: 'Acciones', value: 'acciones', sortable: false }
        ],
    }),
    methods:{
        showMessage() {
            console.log("Exce");
                this.messages.push("sadfsf");
            this.interactivities.push("fsafaf");
        // Use sweetalert2
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
                    this.messagesErrorDetected = setterErrorData(error);
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
                this.errorDetected = true;
                this.messagesErrorDetected = setterErrorData(error);
            });
            this.dialogEdit = true;
        },
        async disableProfile(){
            await disableProfile(this.editProfileSelected)
            .then((resp)=>{
                console.log(resp.data);
            })
            .catch(error => {
                this.errorDetected = true;
                this.messagesErrorDetected = setterErrorData(error);
            });
            this.closeDialog();
        },
        async enableProfile(){
            await enableProfile(this.editProfileSelected)
            .then((resp)=>{
                console.log(resp.data);
            })
            .catch(error => {
                this.errorDetected = true;
                this.messagesErrorDetected = setterErrorData(error);
            });
            this.closeDialog();
        },
        async saveProfile () {
            try {
                const profileInOptionUpdates = createProfilesInOptionsUpdates(
                    this.selected, this.moduleItems, 
                    this.editProfileSelected, this.user=findLocalStorage('user'));
                this.loadingSaveData = true;
                await updateProfileInOption(profileInOptionUpdates)
                    .then((resp)=>{
                        console.log(resp.data);
                    })
                    .catch(error => {
                        this.errorDetected = true;
                        this.messagesErrorDetected = setterErrorData(error);
                    });
                this.closeDialog();
            } catch (error) {
                this.showAlertInfo = true;
                this.selected = setterProfilesInOptionsActives(this.moduleItems);
            }
        },
        async addProfile () {
            try {
                if((this.nameProfile.trim() === '') || (this.descriptionProfile.trim() === ''))
                    throw "Debe ingresar los datos";

                await saveProfile(this.nameProfile, this.descriptionProfile)
                .then((resp)=>{
                    console.log(resp.data);
                })
                .catch(error => {
                    this.errorDetected = true;
                    this.messagesErrorDetected = setterErrorData(error);
                });
                this.closeDialog();
            } catch (error) {
                this.showAlertInfo = true;
            }
        },
        closeDialog(){
            this.dialogDisableProfile = false;
            this.dialogEnableProfile = false;
            this.dialogAddProfile = false;
            this.dialogEdit = false;
            this.showAlertInfo = false;
            this.loadingSaveData = false;
        },
        clickAgregar(){
            this.dialogAddProfile = true;
        },
        disableItem (idProfile) {
            this.editProfileSelected = idProfile;
            this.dialogDisableProfile = true;
        },
        enableItem(idProfile){
            this.editProfileSelected = idProfile;
            this.dialogEnableProfile = true;
        },
    },
    components:{
        Boton,
        TableEditAndDelete,
        ChargeData,
        CardProfile,
        DialogAcceptCancel,
        TextFieldSimpleData
    }
}
</script>