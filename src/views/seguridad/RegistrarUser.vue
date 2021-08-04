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
                                    <p class="text-right ma-0 mt-2">Usuario:</p>
                                </v-col>

                                <v-col
                                class=""
                                cols="9"
                                md="10"
                                >
                                    <v-text-field
                                        v-model="name"
                                        label="usuario"
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
                                    <TextContrasenia 
                                        label="Contraseña"
                                        :obtenerContrasenia="obtenerContrasenia1"
                                    />
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
                                    <TextContrasenia 
                                        label="Confirmar contraseña"
                                        :obtenerContrasenia="obtenerContrasenia2"
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col
                            cols = "12"
                            md="6">
                            <v-row>
                                <v-col
                                class="pr-0"
                                cols="4"
                                md="3"
                                >
                                    <p class="text-right mt-1">Privilegios: </p>
                                </v-col>
                                <v-col
                                class="pa-0"
                                cols="7"
                                md="8"
                                >
                                <v-autocomplete
                                    :items="privilegios" 
                                    v-model="inputSelected"
                                    item-value="key" 
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
import TextContrasenia from "../../components/TextContrasenia.vue";
import Boton from "../../components/Boton.vue";
import { btnGuardar } from "../../types/btnDesign.js";

export default {
    name: "RegistrarUser",
    data: () => ({
        tipoOpcion: "Registrar un User",
        name: "",
        btnGuardar,
        contrasenia1: "",
        contrasenia2: "",
        inputSelected:"support",
        privilegios: [
          {
            key: "admin",
            name: "Admin"
          },
          {
            key: "support",
            name: "Support"
          }
        ]
    }),
    methods: {
        obtenerContrasenia1(contrasenia){
            this.contrasenia1 = contrasenia;
        },
        obtenerContrasenia2(contrasenia){
            this.contrasenia2 = contrasenia;
        },
        async clickGuardar(){
            console.log("Se está enviado");
        }
    },
    components: {
        TextContrasenia,
        Boton
    }
}
</script>

<style>

</style>