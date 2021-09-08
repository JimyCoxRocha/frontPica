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
                    <Boton :btnData="btnAgregar" :click="clickGuardar"/>
                </v-col>
                <DialogAcceptCancel 
                    :activeDialog = "dialogAddUser"
                >
                    <template slot="titleCard">
                        <span class="text-h5">Agregar Usuario</span>
                    </template>
                    <template slot="mainDialog">
                        <ChargeData 
                            :errorDetected = "errorDetected"
                            :loading = "loading"
                            :messagesErrorDetected = "messagesErrorDetected"
                        >
                                <template slot="msgLoading">
                                        <p v-show="loading">{{loadingMessage}}</p>
                                </template>
                        </ChargeData>
                        <v-col
                            cols = "12">
                            <v-row>
                                <v-col
                                    cols = "12"
                                    md="6">
                                    <v-row>
                                        <v-col
                                        class="pr-0"
                                        cols="3"
                                        md="2"
                                        >
                                            <p class="text-right ma-0 mt-2">Nombre:</p>
                                        </v-col>

                                        <v-col
                                        class=""
                                        cols="9"
                                        md="10"
                                        >
                                            <v-text-field
                                                v-model="name"
                                                label="Nombre"
                                                outlined
                                                hide-details
                                                dense
                                                autocomplete="off"
                                            ></v-text-field>

                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col
                                        class="pr-0"
                                        cols="3"
                                        md="2"
                                        >
                                            <p class="text-right ma-0 mt-2">Apellido:</p>
                                        </v-col>

                                        <v-col
                                        class=""
                                        cols="9"
                                        md="10"
                                        >
                                            <v-text-field
                                                v-model="lastName"
                                                label="Apellido"
                                                outlined
                                                hide-details
                                                dense
                                                autocomplete="off"
                                            ></v-text-field>

                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col
                                        class="pr-0"
                                        cols="3"
                                        md="2"
                                        >
                                            <p class="text-right ma-0 mt-2">Username:</p>
                                        </v-col>

                                        <v-col
                                        class=""
                                        cols="9"
                                        md="10"
                                        >
                                            <v-text-field
                                                v-model="user"
                                                label="Username"
                                                outlined
                                                hide-details
                                                dense
                                                autocomplete="off"
                                            ></v-text-field>

                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col
                                        class="pr-0"
                                        cols="4"
                                        md="2"
                                        >
                                            <p class="text-right ma-0 mt-2">Contraseña:</p>
                                        </v-col>

                                        <v-col
                                        class=""
                                        cols="8"
                                        md="10"
                                        >
                                            <v-text-field
                                                v-model="contrasenia1"
                                                :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                @click:append="showPass1 = !showPass1"
                                                required
                                                outlined
                                                dense
                                                filled
                                                label="Escribir contraseña"
                                                autocomplete="off"
                                                :type="showPass1 ? 'text' : 'password'"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col
                                        class="pr-0"
                                        cols="4"
                                        md="2"
                                        >
                                            <p class="text-right ma-0 mt-2">Confirmar:</p>
                                        </v-col>

                                        <v-col
                                        class=""
                                        cols="8"
                                        md="10"
                                        >
                                        <v-text-field
                                                v-model="contrasenia2"
                                                :append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
                                                @click:append="showPass2 = !showPass2"
                                                required
                                                outlined
                                                dense
                                                filled
                                                autocomplete="off"
                                                label="Confirmar contraseña"
                                                :type="showPass2 ? 'text' : 'password'"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col
                                    cols = "12"
                                    md="6"
                                    v-if="!loadingProfile"
                                    >
                                    <v-row>
                                        <v-col
                                        class="pr-0"
                                        cols="4"
                                        md="3"
                                        >
                                            <p class="text-right mt-1">Profiles: </p>
                                        </v-col>
                                        <v-col
                                        class="pa-0"
                                        cols="7"
                                        md="8"
                                        >
                                        <v-autocomplete
                                            :items="profiles" 
                                            v-model="inputSelected"
                                            item-value="idProfile" 
                                            item-text="name"
                                            outlined
                                            rounded
                                            dense
                                            hide-details
                                            class="mt-2"
                                        ></v-autocomplete>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-col>                                                    
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
                    :activeDialog = "dialogEnableUser"
                >
                    <template slot="titleCard">
                        <span class="text-h5">Habilitar Usuario</span>
                    </template>
                    <template slot="mainDialog">
                        <v-container>
                            <v-alert
                                type="success"
                            >
                                Está seguro/a que desea habilitar el usuario: {{editProfileSelected}}
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
                            @click="enableUser"
                        >
                            Aceptar
                        </v-btn>
                    </template>
                </DialogAcceptCancel>

                <DialogAcceptCancel 
                    :activeDialog = "dialogDisableUser"
                >
                    <template slot="titleCard">
                        <span class="text-h5">Deshabilitar Usuarios</span>
                    </template>
                    <template slot="mainDialog">
                        <v-container>
                            <v-alert
                                type="warning"
                            >
                                Está seguro/a que desea deshabilitar el usuario: {{}}
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
                            @click="disableUser"
                        >
                            Aceptar
                        </v-btn>
                    </template>
                </DialogAcceptCancel>

                <TableEditAndDelete 
                    :items="users" 
                    :headers="headers" 
                    :editedItem="moduleItems"
                    :funcEditItem = "funcEditItem"
                    :enableItem = "enableUser"
                    :deleteItem = "disableUser"
                />
            </div>
        </div>
    </v-container>
</template>

<script>
import Boton from "../../components/Boton.vue";
import { btnAgregar } from "../../types/btnDesign.js";
import ChargeData from "../../components/ChargeData.vue";
import { saveUser, chargeProfiles } from "../../services/DataServices";
import { setterErrorData } from '../../helpers/setterData.js';
import DialogAcceptCancel from "../../components/DialogAcceptCancel.vue";
import TableEditAndDelete from "../../components/TableEditAndDelete.vue";
export default {
    name: "RegistrarUser",
    created: function () {
        this.getUsers();
        this.chargePrivileges();
    },
    data: () => ({
        tipoOpcion: "Registrar un User",
        name: "",
        lastName: "",
        user: "",
        contrasenia1: "",
        contrasenia2: "",
        loadingMessage: "",
        loading: false,
        loadingProfile: false,
        errorDetected: false,
        dialogEnableUser: false,
        dialogDisableUser: false,
        messagesErrorDetected: [],
        btnAgregar,
        showPass1: false,
        showPass2: false,
        inputSelected: 0,
        editUserSelected: 0,
        dialogAddUser,
        profiles: [],
        moduleItems: [],//C.//Los items que se van a editar (Array),
		//Esto es lo que se mostrará en el modal
		//De hecho se lo recorre para presentar los datos (caso mantenimeinto)
        users: [],//C. Estos serán los datos cargados desde el back
        headers: [//C.
          { text: 'ID', align: 'start', sortable: false, value: 'idProfile', },
          { text: 'Perfil', value: 'name' },
          { text: 'Estado', value: 'status' },
          { text: 'Opciones', value: 'numOptions' },
          { text: 'Usuarios', value: 'numUsers' },
          { text: 'Acciones', value: 'acciones', sortable: false }
        ],
    }),
    methods: {
        async getUsers(){
            this.errorDetected = false;
            this.loading = true;
            this.loadingMessage = "Cargando datos...";
            this.users = await findUsers()
            .then(({data})=>{
                console.log(data);
                return data;
            })
            .catch(error => {
                this.errorDetected = true;
                this.messagesErrorDetected = setterErrorData(error);
            });
                this.loading = false;
        },
        clickAgregar(){
            this.dialogAddUser = true;
        },
        async funcEditItem (idUser) {
            this.editUserSelected = idUser;
            this.moduleItems = await findUserById(idUser)
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
        async enableUser(){
            await enableUserById(this.editUserSelected)
            .then((resp)=>{
                console.log(resp.data);
            })
            .catch(error => {
                this.errorDetected = true;
                this.messagesErrorDetected = setterErrorData(error);
            });
            this.closeDialog();
        },
        async disableUser(){
            await disableUserById(this.editUserSelected)
            .then((resp)=>{
                console.log(resp.data);
            })
            .catch(error => {
                this.errorDetected = true;
                this.messagesErrorDetected = setterErrorData(error);
            });
            this.closeDialog();
        },
        disableItem (idUser) {
            this.editUserSelected = idUser;
            this.dialogDisableUser = true;
        },
        enableItem(idUser){
            this.editUserSelected = idUser;
            this.dialogEnableUser = true;
        },
        closeDialog(){
            this.dialogEnableUser = false;
            this.dialogDisableUser = false;
        },
        async clickGuardar(){
            this.errorDetected = false;
            this.loading = true;
            this.loadingMessage = "Guardando usuario...";
            try{
                if(this.contrasenia1.trim() !== this.contrasenia2.trim()){
                    throw ["Las claves de acceso no coinciden. Por favor, verifique nuevamente"];
                }else if(this.name.trim().length == 0 || this.user.trim().length == 0 || 
                         this.lastName.trim().length == 0 || this.contrasenia1.trim().length == 0 ||
                         this.contrasenia2.trim().length == 0 ){
                    throw ["Ingrese los valores correctamente"];
                }
                await saveUser({
                    "idProfile": this.inputSelected,
                    "name": this.name,
                    "lastName": this.lastName,
                    "user": this.user,
                    "password": this.contrasenia1})
                .then(({data})=>{
                    return data;
                })
                .catch(error => {
                    throw setterErrorData(error);
                });
                this.setterData();
            }catch(err){
                this.errorDetected = true;
                this.messagesErrorDetected = err;
            }
            this.loading = false;
        },
        async chargePrivileges(){
            this.errorDetected = false;
            this.loadingProfile = true;
            this.loading = true;
            this.loadingMessage = "Cargando perfiles a mostrar";
            this.profiles = await chargeProfiles()
            .then(({data})=>{
                console.log(data);
                this.inputSelected = data[0].idProfile;
                return data;
            })
            .catch(error => {
                this.errorDetected = true;
                this.messagesErrorDetected = setterErrorData(error);
            });
            this.loading = false;
            this.loadingProfile = false;
        },
        setterData(){
            this.lastName = "";
            this.name = "";
            this.user = "";
            this.contrasenia1 = "";
            this.contrasenia2 = "";
        }
    },
    components: {
        Boton,
        ChargeData,
        TableEditAndDelete,
        DialogAcceptCancel
    }
}
</script>

<style>

</style>
