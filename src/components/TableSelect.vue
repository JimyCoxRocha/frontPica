<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="items"
    :single-select="singleSelect"
    item-key="dateOutput"
    show-select
    class="elevation-1"
    :item-selected="obtenerSelecion(selected)"
  >
    <template v-slot:[`item.dataInput`]="{ item }">
      {{ item }}
    </template>
    <template v-slot:[`item.dataOutput`]="{ item }">
      {{ item }}
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: "TableSelect",
    data () {
      return {
        singleSelect: false,
        selected: [],
        headers: [
          {
            text: 'Path categoría',
            align: 'start',
            sortable: false,
            value: 'pathController',
          },
          { text: 'Path endpoint', value: 'pathEndpoint' },
          { text: 'Endpoint', value: 'endpoint' },
          { text: 'Fecha', value: 'dateOutput' },
          { text: 'Input', value: 'dataInput' },
          { text: 'Output', value: 'dataOutput' },
        ],
        
      }
    },
    props: {
        items:{
            type: Array,
            require: true
        },
        obtenerSelecion:{
            type: Function,
            require: true
        }
    },
  }
</script>

<style>

</style>