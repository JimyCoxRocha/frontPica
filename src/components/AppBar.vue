<template>
    <v-app-bar app
        color="secondary"
        >
        <v-app-bar-nav-icon
            color="baseColor"
            @click="execute"
        ></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
         <v-toolbar-title class="d-flex">
            <p class="ma-0 baseColor--text">{{user}}</p>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/login" v-on:click.native="limpiarStorage"><p class="mb-0 baseColor--text">Cerrar Sesión</p></router-link>
        
    </v-app-bar>
    
</template>

<script>
import { findLocalStorage, clearLocalStorage } from "../helpers/handleLocalStorage.js";
export default {
    name: 'AppBar',
    mounted(){
        this.user=findLocalStorage('user');
    },
    data(){
        return{
            user: ''
        }
    },
    props: {
        handleNavBar:{
            type: Function
        }
    },
    methods:{
        execute(){
            if(this.handleNavBar){
                this.handleNavBar();
            }
        },
        limpiarStorage(){
            clearLocalStorage();
        }

    }
}
</script>

<style>

</style>