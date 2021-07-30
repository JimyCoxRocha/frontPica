<template>
    <v-btn
      rounded
      :color="btnData.color"
      class="white--text"
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
        btnData: Object
    }
}
</script>
<style>
.lowercase{
  text-transform: none;
}
</style>