<template>
  <div  v-if="!isDisabled">
    <v-btn
      rounded
      :color="btnData.color"
      class="white--text"
      @click.stop="click"
      
    >
      <v-icon left>
        {{btnData.icon}}
      </v-icon>
      <p class="ma-0 pa-0 lowercase">{{btnData.texto}}</p>
    </v-btn>
  </div>
</template>

<script>
export default {
    name: "Boton",
    props:{
        btnData: Object,
        click: {
            type: Function
        },
        isDisabled:{
          type: Boolean,
          default: false
        }
    }
}
</script>
<style>
.lowercase{
  text-transform: none;
}
</style>