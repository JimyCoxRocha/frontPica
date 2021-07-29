<template>
    <v-container fluid fill-height class="d-flex flex-column">
        <v-toolbar
          class="mb-2 d-flex d-inline-flex"
          color="secondary"
          dark
          flat
          >
          <v-toolbar-title>Reporte de Logs Debug</v-toolbar-title>
        </v-toolbar>

        <v-text-field
            v-model="date"
            label="Picker without buttons"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
    </v-container>
</template>

<script>
export default {
    name: "LogDebug",

}
</script>

<style> 

</style>