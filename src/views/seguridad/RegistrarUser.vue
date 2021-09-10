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

                <FormUser
                    v-if="dialogAddUser"
                    :initializer = "initializer"
                    :profiles = "profiles"
                    :inputSelected = "inputSelected"
                    :activeDialog = "dialogAddUser"
                    :userOption="userOption"
                    :clickGuardar = "(optionUpdateUser) ? clickUpdateUser : clickGuardar"
                    >
                    <template slot="charge">
                    <ChargeData 
                        :loading = "loading"
                    >
                            <template slot="msgLoading">
                                    <p v-show="loading">Guardando los datos...</p>
                            </template>
                    </ChargeData>
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
                </FormUser>



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
                                Está seguro/a que desea habilitar el usuario: {{editUserSelected.name}}
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
                                Está seguro/a que desea deshabilitar el usuario: {{editUserSelected.name}}
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
                    v-if="!loading"
                    :items="users" 
                    :headers="headers" 
                    :editedItem="moduleItems"
                    :funcEditItem = "funcEditItem"
                    :enableItem = "enableItem"
                    :deleteItem = "disableItem"
                />
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
import Boton from "../../components/Boton.vue";
import DialogAcceptCancel from "../../components/DialogAcceptCancel.vue";
import TableEditAndDelete from "../../components/TableEditAndDelete.vue";
import FormUser from "../../components/FormUser.vue";
import Notification from "../../components/Notification.vue";
import ChargeData from "../../components/ChargeData.vue";
import { btnAgregar } from "../../types/btnDesign.js";
import { saveUser, chargeProfiles, findUsers, findUserById,
         enableUserById, disableUserById , updateUser } from "../../services/DataServices";
import { setterErrorData } from '../../helpers/setterData.js';

export default {
    name: "RegistrarUser",
    created: function () {
        this.getUsers();
    },
    data: () => ({
        tipoOpcion: "Registrar un User",
        userOption: "",
        loadingMessage: "",
        loading: false,
        loadingProfile: false,
        errorDetected: false,
        dialogEnableUser: false,
        dialogDisableUser: false,
        btnAgregar,
        optionUpdateUser: false,
        initializer: {
            name: "",
            lastName: "",
            user: "",
            contrasenia1: "",
            contrasenia2: "",
        },
        inputSelected: 0,
        editUserSelected: 0,
        dialogAddUser:false,
        profiles: [],
        moduleItems: [],//C.//Los items que se van a editar (Array),
		//Esto es lo que se mostrará en el modal
		//De hecho se lo recorre para presentar los datos (caso mantenimeinto)
        users: [],//C. Estos serán los datos cargados desde el back
        headers: [//C.
          { text: 'ID', align: 'start', sortable: true, value: 'idUser', },
          { text: 'Name', value: 'name' },
          { text: 'User', value: 'user' },
          { text: 'Status', value: 'status' },
          { text: 'Acciones', value: 'acciones', sortable: false }
        ],
        messagesNotification: [],
        errorDetected: false,
        activeNotification: false,
    }),
    methods: {
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
        async getUsers(){
            this.loading = true;
            this.loadingMessage = "Cargando datos...";
            this.users = await findUsers()
            .then(({data})=>{
                return data;
            })
            .catch(error => {
                this.processError(setterErrorData(error));
            });
                this.loading = false;
        },
        clickAgregar(){
            this.userOption = "Registrar un Nuevo Usuario";
            this.setterData();
            this.chargePrivileges();
        },
        async funcEditItem (user) {
            this.userOption = "Actualizar Usuario";
            this.optionUpdateUser = true;
            this.editUserSelected = user.idUser;
            this.chargePrivileges();
            this.moduleItems = await findUserById(user.idUser)
            .then(({data})=>{
                
                this.inputSelected = data.idProfile;
                this.initializer = data;
                this.initializer.contrasenia2 = data.password;
                this.initializer.contrasenia1 = data.password;
                return [data];
            })
            .catch(error => {
                this.processError(setterErrorData(error));
            });
            this.dialogAddUser = true;
        },
        async clickGuardar(inputSelected, name, lastName,user,contrasenia1){
            this.loading = true;
            this.loadingMessage = "Guardando usuario...";
            try{
                
                await saveUser({"idProfile": inputSelected,"name": name,
                        "lastName": lastName,"user": user,"password": contrasenia1})
                .then((data)=>{
                    this.processComplete(data.messages);
                })
                .catch(error => {
                    throw setterErrorData(error);
                });
                this.closeDialog();
            }catch(err){
                this.processError(setterErrorData(error));
                
            }
            this.loading = false;
            this.getUsers();
        },
        async clickUpdateUser(inputSelected, name, lastName,user,contrasenia1){
            this.loading = true;
            this.loadingMessage = "Actualizando usuario...";
            try{
                await updateUser({"idProfile": inputSelected,"name": name,
                        "lastName": lastName,"user": user,"password": contrasenia1, "idUser": this.editUserSelected})
                .then((data)=>{
                    this.processComplete(data.messages);
                })
                .catch(error => {
                    throw setterErrorData(error);
                });
                this.setterData();
                this.closeDialog();
                this.getUsers();
            }catch(err){
                this.processError(setterErrorData(error));
                
            }
            this.loading = false;
            this.optionUpdateUser = false;
            this.getUsers();
        },
        async enableUser(){
            this.loading = true;
            await enableUserById(this.editUserSelected)
            .then((resp)=>{
                this.processComplete(resp.messages);
            })
            .catch(error => {
                this.processError(setterErrorData(error));
            });
            this.closeDialog();
            this.loading = false;
            this.getUsers();
        },
        async disableUser(){
            this.loading = true;
            await disableUserById(this.editUserSelected)
            .then((resp)=>{
                this.processComplete(resp.messages);
            })
            .catch(error => {
                this.processError(setterErrorData(error));
            });
            this.closeDialog();
            this.getUsers();
            this.loading = false;
        },
        disableItem (user) {
            this.editUserSelected = user;
            this.dialogDisableUser = true;
        },
        enableItem(user){
            this.editUserSelected = user;
            this.dialogEnableUser = true;
        },
        closeDialog(){
            this.dialogEnableUser = false;
            this.dialogDisableUser = false;
            this.dialogAddUser = false;
        },
        async chargePrivileges(){
            this.loadingProfile = true;
            this.loading = true;
            this.loadingMessage = "Cargando perfiles a mostrar";
            this.profiles = await chargeProfiles()
            .then(({data})=>{
                this.inputSelected = data[0].idProfile;
                this.dialogAddUser = true;
                return data;
            })
            .catch(error => {
                this.processError(setterErrorData(error));
                
            });
            this.loading = false;
            this.loadingProfile = false;
        },
        setterData(){
            this.initializer.lastName = "";
            this.initializer.name = "";
            this.initializer.user = "";
            this.initializer.contrasenia1 = "";
            this.initializer.contrasenia2 = "";
        }
    },
    components: {
        Boton,
        ChargeData,
        TableEditAndDelete,
        DialogAcceptCancel,
        FormUser
    }
}
</script>

<style>

</style>
