<template>
   <v-navigation-drawer 
        v-model="sidebarMenu" 
        app
        floating
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
                    :nameModule="menuItem.module" 
                    :icon="menuItem.icon" 
                    :options="menuItem.items" />
            </v-list-item>

        </v-list>
    </v-navigation-drawer>
</template>

<script>
import PanelOption from "../components/PanelOption.vue";
export default {
    name: 'NavBar',
    data(){
        return {
            mostrarMenu: this.sidebarMenu
        }
    },
    components:{
        PanelOption
    }
    ,
    props:{
        sidebarMenu: Boolean,
        handleNavBar:{
            type: Function
        },
        menuData: {
            type: Array,
            required: false // User can accept a userData object on params, or not. It's totally optional.
        }
    },
    computed: {
      double() {
        return this.value * 2;
      }
    },
    methods:{
    }

}
</script>

<style>

</style>