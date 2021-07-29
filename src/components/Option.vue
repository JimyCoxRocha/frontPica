<template>
    <v-expansion-panel-content color="menuItemColor" class="">
        <div class="optionStyles">
            <v-icon color="primary">mdi-checkbox-blank-circle-outline</v-icon>
            <router-link to="opcionUrl" class="optionStyles text-body-2 baseColor--text">
                {{opcionName}}
            </router-link>
        </div>
        
    </v-expansion-panel-content>
</template>

<script>
export default {
    name: "Option",
    props:{
       opcionName: String,
       opcionUrl: String 
    }
}
</script>

<style>
.optionStyles{
    text-align: left;
    text-decoration: none;
}
</style>