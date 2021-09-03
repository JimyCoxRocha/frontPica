<template>
    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="30"
        class="elevation-1"
    >
    <template v-slot:[`item.dataInput`]="{ item }">
      {{ item.dataInput }}
    </template>
    <template v-slot:[`item.dataOutput`]="{ item }">
      {{ item.dataOutput }}
    </template>
  </v-data-table>
</template>

<script>
//https://vuetifyjs.com/en/components/data-iterators/
export default {
    data () {
      return {
          headers: [
          {
            text: 'Path categoría',
            align: 'start',
            sortable: false,
            value: 'pathController',
          },
          { text: 'Path endpoint', value: 'pathEndpoint' },
          { text: 'Endpoint', value: 'pathController' },
          { text: 'Fecha', value: 'date' },
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
    }
  }
</script>

<style>
table th + th { border-left:2px solid #dddddd; }
table td + td { border-left:2px solid #dddddd; }
tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, .05);
}
tbody tr:nth-of-type(odd):hover {
    background-color: rgba(0, 0, 0, .05)!important;
}
tbody tr:nth-of-type(even):hover {
    background-color: rgba(255, 255, 255, 0.05)!important;
}
</style>
