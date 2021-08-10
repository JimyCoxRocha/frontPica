<template>
  <div>
        <AppBar :handleNavBar="handleMenu"/>
        <NavBar :sidebarMenu="sidebarMenu" 
                :handleNavBar="handleMenu" 
                :menuData="menuData" 
                :initialValueDisplayLgAndUp="initialValueDisplayLgAndUp"
                :initialValueDisplayMdAndDown="initialValueDisplayMdAndDown"/>
        
        <v-main class="stylesHome">
            <v-container fill-height>
                <router-view></router-view>
            </v-container>
        </v-main>
  </div>
</template>

<script>
    import AppBar from '../components/AppBar.vue';
    import NavBar from '../components/NavBar.vue';
    import { findLocalStorage } from '../helpers/handleLocalStorage.js';

    export default {
        name:"Home",
        created(){
            this.menuData = JSON.parse(findLocalStorage( 'menu' ));
        },
        data(){
            return{
                sidebarMenu: true,
                menuData: [{}]
            }
        },
        components: {
            AppBar,
            NavBar  
        },
/*         computed:{
            width(){
                if (this.$vuetify.breakpoint.smAndDown) {
                    return this.sidebarMenu = false;
                }
            }
        }, */
        methods:{
            handleMenu(){
                this.sidebarMenu = !this.sidebarMenu;  
               
            },
            initialValueDisplayLgAndUp(){
                this.sidebarMenu = true;
                console.log("initialValueDisplayLgAndUp: "+this.sidebarMenu);
            },
            initialValueDisplayMdAndDown(){
                this.sidebarMenu = false;
                console.log("initialValueDisplayMdAndDown: "+this.sidebarMenu);
            }
        },
    }
</script>

<style>
.stylesHome{
    min-height: 100vh;
    background-color: #ECF0F5;
}
</style>