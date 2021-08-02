<template>
    <v-simple-table
    dense
    >
        <template v-slot:default>
            <thead class="secondary">
                <tr>
                    
                    <v-col tag="th" cols="1" class="text-center">
                        <p class="ma-0 pa-0 baseColor--text">Path categoría</p>
                    </v-col>
                    <v-col tag="th" cols="2" class="text-center">
                        <p class="ma-0 pa-0 baseColor--text">Path endpoint</p>
                    </v-col>
                    <v-col tag="th" cols="2" class="text-center">
                        <p class="ma-0 pa-0 baseColor--text">Endpoint</p>
                    </v-col>
                    <v-col tag="th" cols="1" class="text-center"> 
                        <p class="ma-0 pa-0 baseColor--text">Fecha</p>
                    </v-col>
                    <v-col tag="th" cols="3" class="text-center">
                        <p class="ma-0 pa-0 baseColor--text">Input</p>
                    </v-col>
                    <v-col tag="th" cols="5" class="text-center">
                        <p class="ma-0 pa-0 baseColor--text">Output</p>
                    </v-col>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="data in dataSolicitada"
                :key="data.dateInput"
                >
                    <td>{{ data.pathController }}</td>
                    <td>{{ data.pathEndpoint }}</td>
                    <td>{{  }}</td>
                    <td>{{ data.dateOutput }}</td>
                    <td>{{ data.dataInput }}</td>
                    <td>{{ data.dataOutput }}</td>
                </tr>
            </tbody>
        </template>
  </v-simple-table>
</template>

<script>
//https://vuetifyjs.com/en/components/data-iterators/
export default {
    data () {
      return {
      }
    },
    props: {
        dataSolicitada: Array
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
