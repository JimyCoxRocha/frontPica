<template>
    <v-app-bar app
        color="primary"
        >
        <v-app-bar-nav-icon
            color="baseColor"
            @click="execute"
        ></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <router-link to="/login"><p class="mb-0 baseColor--text">Cerrar Sesión</p></router-link>
        
    </v-app-bar>
    
</template>

<script>
export default {
    name: 'AppBar',
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
        }
    }
}
</script>

<style>

</style>