<template>
  <v-text-field
        v-model="texto"
        label="Petición"
        outlined
        hide-details
        dense
        @change="capturarTexto(texto)"
    ></v-text-field>
</template>

<script>
export default {
    name: "TextFieldSimpleData",
    data: () => ({
        texto: ""
    }),
    props:{
        capturarTexto: {
            type: Function,
            require: true
        },
    }
}
</script>

<style>

</style>