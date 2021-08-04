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
    @change="obtenerContrasenia(password)"
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
        obtenerContrasenia: {
            type: Function,
            require: true
        },
        label: {
            type: String,
            require: true
        }
    }
}
</script>

<style>

</style>