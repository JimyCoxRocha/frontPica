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

                <v-col cols="6">
                    <v-row>
                        <v-col cols="2">
                            <p  class="mb-0 mt-2">Estado: </p>
                        </v-col>
                        <v-col
                            cols="7"
                            >
                                <v-autocomplete
                                :items="status" 
                                v-model="statusSelected.key"
                                item-value="key" 
                                item-text="name"
                                outlined
                                rounded
                                dense
                                hide-details
                            ></v-autocomplete>
                        </v-col>
                        <v-col
                            class="mt-0 pb-0 mb-0"
                            md="2">
                            <Boton :btnData="btnBuscar" :click="clickBuscar"/>
                        </v-col>
                    </v-row>
                </v-col>

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
                    :disableOptionIn="obtainItemDisabled"
                    typeRegister = "user"
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
import { btnAgregar, btnBuscar } from "../../types/btnDesign.js";
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
          { text: 'Profile', value: 'nameProfile' },
          { text: 'Status', value: 'status' },
          { text: 'Acciones', value: 'acciones', sortable: false }
        ],
        messagesNotification: [],
        errorDetected: false,
        activeNotification: false,
        btnBuscar,
        status : [
            {
                key: "true",
                name: "Activo"
            },
            {
                key: "false",
                name: "Inactivo"
            },
            {
                key: "all",
                name: "Todos"
            }
        ],
        statusSelected: {
            key: "all"
        },
    }),
    computed:{
        obtainItemDisabled: function (){
            try{
                return parseInt(localStorage.getItem("idUser"));
            }catch(error){
                this.processError(["Error al intentar obtener el usuario de esta sesión."]);
                return 0;
            }
        }
    },
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
            this.users = await findUsers("all")
            .then(({data})=>{
                return data;
            })
            .catch(error => {
                this.processError(setterErrorData(error));
                return [];
            });
                this.statusSelected.key = "all";
                this.loading = false;
        },
        async clickBuscar(){
            this.loading = true;
            this.users = await findUsers(this.statusSelected.key)
                .then((resp)=>{
                    if(resp.data.length > 0){
                        return resp.data;
                    }else{
                        return [];
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.processError(setterErrorData(error));
                    return [];
                });
                this.loading = false;
        },
        clickAgregar(){
            this.userOption = "Registrar un Nuevo Usuario";
            this.setterData();
            this.chargePrivileges("registerUser");
        },
        async funcEditItem (user) {
            this.userOption = "Actualizar Usuario";
            this.optionUpdateUser = true;
            this.editUserSelected = user.idUser;
            this.chargePrivileges("editUser");
            this.moduleItems = await findUserById(user.idUser)
            .then(({data})=>{
                this.inputSelected = data.idProfile;
                this.initializer = data;
                this.initializer.contrasenia2 = data.password;
                this.initializer.contrasenia1 = data.password;
                this.dialogAddUser = true;
                return [data];
            })
            .catch(error => {
                this.processError(setterErrorData(error));
            });
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
                this.processError(setterErrorData(err));
                
            }
            this.loading = false;
            this.getUsers();
        },
        async clickUpdateUser(inputSelected, name, lastName,user,contrasenia1, isvalid){
            this.loading = true;
            this.loadingMessage = "Actualizando usuario...";
            if(isvalid){
                try{
                    if (this.inputSelected === inputSelected && this.initializer.name === name &&
                    this.initializer.lastName === lastName && this.initializer.user === user &&
                    contrasenia1 === this.initializer.contrasenia1)
                        throw ["Por favor, recuerde que debe agregar nuevos campos para proseguir con la actualización..."];

                    await updateUser({"idProfile": inputSelected,"name": name,
                            "lastName": lastName,"user": user,"password": contrasenia1, "idUser": this.editUserSelected})
                    .then((data)=>{
                        this.processComplete(data.messages);
                        this.setterData();
                        this.closeDialog();
                        this.getUsers();
                        this.optionUpdateUser = false;
                    })
                    .catch(error => {
                        this.optionUpdateUser = true;
                        this.processError(setterErrorData(error));
                    });
                }catch(err){
                    this.optionUpdateUser = true;
                    this.processError(setterErrorData(err));
                    //Vigilar como se comporta
                }
                this.getUsers();
            }
                this.loading = false;
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
        async chargePrivileges(typeEvent){
            this.loadingProfile = true;
            this.loading = true;
            this.loadingMessage = "Cargando perfiles a mostrar";
            this.profiles = await chargeProfiles()
            .then(({data})=>{
                this.inputSelected = data[0].idProfile;
                (typeEvent === "registerUser") 
                    ? this.dialogAddUser = true
                    : this.dialogAddUser = false;
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
        FormUser,
        Notification
    }
}
</script>

<style>

</style>
