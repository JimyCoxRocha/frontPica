<template>
  <v-textarea
      name="input-7-1"
      filled
      :label="label"
      auto-grow
      v-model="valor"
      @change="obtenerTexto(valor)"
      hide-details
      height="23rem"
    ></v-textarea>
</template>

<script>
export default {
    name:"TextAreaAuto",
    data: () => ({
        label: "",
        valor: ""
    }),
    props:{
        obtenerTexto: {
            type: Function,
            require: true
        },
    }
}
</script>

<style>

</style>