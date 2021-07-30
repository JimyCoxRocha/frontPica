<template>
    <v-expansion-panel-content color="menuItemColor" class="">
        <div class="optionStyles">
            <v-icon color="primary">mdi-checkbox-blank-circle-outline</v-icon>
            <router-link :to="opcionUrl" class="optionStyles text-body-2 baseColor--text">
                {{opcionName}}
            </router-link>
        </div>
        
    </v-expansion-panel-content>
</template>

<script>
import { obtenerRutasModulo } from "../helpers/obtenerRutasModulo.js";
export default {
    name: "Option",
    data(){
        return{
            opcionUrl: "/hola"
        }
    },
    props:{
       opcionName: String
    },
    mounted(){
        this.opcionUrl = obtenerRutasModulo(this.opcionName);
    }
}
</script>

<style>
.optionStyles{
    text-align: left;
    text-decoration: none;
}
</style>