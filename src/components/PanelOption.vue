<template>
  <v-expansion-panels class="mb-6">
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon="mdi-menu-down">
               <div>
                    <v-icon color="error">{{icon}}</v-icon>
                    <span>{{nameModule}}</span>
              </div>
        </v-expansion-panel-header>
        <div
        v-for="(item,i) in options"
        :key="i">
          <Option :opcionName="item.option"/>
        </div>
      </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import Option from './Option.vue';
export default {
    name:"PanelOption",
    components: {
      Option
    },
    props:{
      options: Array,
      nameModule: String,
      icon: String
    }
    
}
</script>

<style>

</style>