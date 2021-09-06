<template>
  <v-text-field
    v-model="password"
    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="showPass = !showPass"
    required
    outlined
    dense
    filled
    autocomplete="off"

    :type="showPass ? 'text' : 'password'"
    v-on:input="$emit('input', password)"
    ></v-text-field>
</template>

<script>
export default {
    name: "TextContrasenia",
    data: () => ({
        password: "",
        showPass: false,
    }),
    props:{
        label: {
            type: String,
            require: true
        },
        value: {
            type: String
        }
    }
}
</script>

<style>

</style>