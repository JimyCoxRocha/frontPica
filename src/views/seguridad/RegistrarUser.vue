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
                <Boton :btnData="btnGuardar" :click="clickGuardar"/>
            </div>
        </div>
    </v-container>
</template>

<script>
import Boton from "../../components/Boton.vue";
import { btnGuardar } from "../../types/btnDesign.js";
import ChargeData from "../../components/ChargeData.vue";
import { saveUser, chargeProfiles } from "../../services/DataServices";
import { setterErrorData } from '../../helpers/setterData.js';

export default {
    name: "RegistrarUser",
    created: function () {
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
        messagesErrorDetected: [],
        btnGuardar,
        showPass1: false,
        showPass2: false,
        inputSelected: 0,
        profiles: [
          
        ]
    }),
    methods: {
        async clickGuardar(){
            this.errorDetected = false;
            this.loading = true;
            this.loadingMessage = "Guardando usuario";
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
        ChargeData
    }
}
</script>

<style>

</style>
