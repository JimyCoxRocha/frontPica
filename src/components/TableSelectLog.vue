<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="items"
    :single-select="singleSelect"
    :item-key="itemKey"
    show-select
    class="elevation-1"
    :item-selected="obtenerSelecion(selected)"
  >
    <template v-slot:[`item.actions`]="{ item }" v-if="columnEdit">
      <v-icon
        small
        class="mr-2"
      >
        mdi-pencil {{item}}
      </v-icon>
    </template>

    <!-- <template v-slot:[`item.dataInput`]="{ item }">
      {{ item }}
    </template>
    <template v-slot:[`item.dataOutput`]="{ item }">
      {{ item }}
    </template> -->
  </v-data-table>
</template>

<script>
  export default {
    name: "TableSelectLog",
    data () {
      return {
        singleSelect: false,
        selected: []
      }
    },
    props: {
        items:{
            type: Array,
            required: true
        },
        itemKey:{
            type: String,
            required: true
        },
        obtenerSelecion:{
            type: Function,
            required: true
        },
        headers:{
          type: Array,
          required: true
        },
        columnEdit:{
          type: Boolean,
          required: true
        }
    },
  }
</script>

<style>

</style>