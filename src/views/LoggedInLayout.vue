<template>
  <div>
        <AppBar :handleNavBar="handleMenu"/>
        <v-navigation-drawer 
        v-model="sidebarMenu"
        app
        color="secondary"
        >
            <v-list dense color="baseColor" dark>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>
                        <v-img alt="Vue logo" src="../assets/pycca.jpg" max-width="500" width="100%"></v-img>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            
            <v-divider></v-divider>

            <v-list>
                <v-list-item
                    
                    v-for="(menuItem,i) in menuData"
                    :key="i" class="pa-0 secondary">
                    <PanelOption 
                        :nameModule="menuItem.name" 
                        :icon="menuItem.icon" 
                        :options="menuItem.items" />
                </v-list-item>

            </v-list>
        </v-navigation-drawer>

        <v-main class="stylesHome">
            <v-container :fluid="true" fill-height>
                <router-view></router-view>
            </v-container>
        </v-main>
  </div>
</template>

<script>
    import AppBar from '../components/AppBar.vue';
    import { findLocalStorage } from '../helpers/handleLocalStorage.js';
    import PanelOption from "../components/PanelOption.vue";

    export default {
        name:"LoggedInLayout",
        created(){
            if(localStorage.getItem("token") === null){
                this.$router.push('/login');
            }else{
                this.$router.push('/home');
                this.menuData = JSON.parse(findLocalStorage( 'menu' ));
            }
        },
        data(){
            return{
                sidebarMenu: true,
                menuData: [{}]
            }
        },
        components: {
            AppBar,
            PanelOption 
        },
        methods:{
            handleMenu(){
                this.sidebarMenu = !this.sidebarMenu;
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