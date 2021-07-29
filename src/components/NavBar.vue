<template>
   <v-navigation-drawer 
        v-model="sidebarMenu" 
        app
        floating
        :permanent="sidebarMenu"
        color="secondary"
        >
        <v-list dense color="baseColor" dark>
            <v-list-item>
<!--                 <v-list-item-action>
                    <v-icon @click.stop="execute">mdi-chevron-left</v-icon>
                </v-list-item-action> -->
                <v-list-item-content>
                    <v-list-item-title>
                       <v-img alt="Vue logo" src="../assets/pycca.jpg" max-width="500" width="100%"></v-img>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-list-item class="px-2" id="miniaaa" @click="execute">
<!--             <v-list-item-avatar>
                <v-icon>mdi-account-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="text-truncate">
                Jane Doeski
            </v-list-item-content> -->
            <v-btn icon small>
                <v-icon color="baseColor">mdi-chevron-left</v-icon>
            </v-btn>
        </v-list-item>
        <v-divider></v-divider>

        <v-list>
            <!-- 
            <v-list-item v-for="item in items" :key="item.title" link :to="item.href">
                <v-list-item-icon>
                    <v-icon color="baseColor">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="baseColor--text">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item> -->
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
            items: [
                { title: 'Home', icon: 'mdi-home-city' },
                { title: 'My Account', icon: 'mdi-account' },
                { title: 'Users', icon: 'mdi-account-group-outline' },
            ],
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