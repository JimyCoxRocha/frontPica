<template>
  <div>
        <AppBar :handleNavBar="handleMenu"/>
        <NavBar :sidebarMenu="sidebarMenu" :handleNavBar="handleMenu"/>
        <v-main>
            <router-view></router-view>  
        </v-main>
  </div>
</template>

<script>
    import AppBar from '../components/AppBar.vue';
    import NavBar from '../components/NavBar.vue';

    export default {
        name:"Home",
        data(){
            return{
                sidebarMenu: true,
            }
        },
        components: {
            AppBar,
            NavBar  
        },
        methods:{
            handleMenu(){
              this.sidebarMenu = !this.sidebarMenu;  
            }
        },
    }
</script>

<style>

</style>