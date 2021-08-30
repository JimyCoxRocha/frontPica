<template>
  <v-text-field
        v-model="texto"
        :label="label"
        outlined
        hide-details
        dense
        v-on:input="$emit('input', texto)"
    >
    </v-text-field>
</template>

<script>
export default {
    name: "TextFieldSimpleData",
    data: () => ({
        texto: ""
    }),
    props: ['value', 'label'],
}
</script>

<style>

</style>