<template>
    <v-expansion-panel-content>
        <div class="optionStyles">
            <v-icon color="error">mdi-checkbox-blank-circle-outline</v-icon>
            <router-link to="opcionUrl" class="optionStyles">{{opcionName}}</router-link>
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