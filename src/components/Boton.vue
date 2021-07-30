<template>
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
</template>

<script>
export default {
    name: "Boton",
    props:{
        btnData: Object,
        click: {
            type: Function
        }
    }
}
</script>
<style>
.lowercase{
  text-transform: none;
}
</style>