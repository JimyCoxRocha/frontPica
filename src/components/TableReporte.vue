<template>
    <v-simple-table
    dense>
        <template v-slot:default>
            <thead class="secondary">
                <tr>
                    
                    <v-col tag="th" cols="1" class="text-center">
                        <p class="ma-0 pa-0 baseColor--text">pathController</p>
                    </v-col>
                    <v-col tag="th" cols="2" class="text-center">
                        <p class="ma-0 pa-0 baseColor--text">pathEndpoint</p>
                    </v-col>
                    <v-col tag="th" cols="1" class="text-center">
                        <p class="ma-0 pa-0 baseColor--text">dateOutput</p>
                    </v-col>
                    <v-col tag="th" cols="3" class="text-center">
                        <p class="ma-0 pa-0 baseColor--text">dataInput</p>
                    </v-col>
                    <v-col tag="th" cols="5" class="text-center">
                        <p class="ma-0 pa-0 baseColor--text">dataOutput</p>
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
        desserts: [
            {
              name1: 'Frozen Yogurt',
              name2: 'Frozen Yogurt',
              name3: 'Frozen Yogurt',
              name4: 'Frozen Yogurt',
              calories: 159,
            },
            {
              name1: 'Frozen Yogurt',
              name2: 'Frozen Yogurt',
              name3: 'Frozen Yogurt',
              name4: 'Frozen Yogurt',
              calories: 159,
            },
            {
              name1: 'Frozen Yogurt',
              name2: 'Frozen Yogurt',
              name3: 'Frozen Yogurt',
              name4: 'Frozen Yogurt',
              calories: 159,
            }
        ],
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
