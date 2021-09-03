<template>
    <v-col
        cols="12"
        md="4"
        >
        <v-row>
            <v-col
            class="d-inline pr-0"
            cols="4"
            md="3"
            >
            <p class="text-right">{{texto}}</p>
            </v-col>
            <v-col
            class="pa-0"
            cols="7"
            md="8"
            >
            <slot></slot>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
export default {
    name:"Select",
    updated(){
        this.inputSelected = "";
    },
    data: ()=>({
        inputSelected: ""
    }),
    props: {
        texto: {
            type: String,
            require: true
        },
/*         capturarSeleccion: {
            type: Function,
            require: true
        },
        opcionesDisponibles: {
            type: Array,
            require: true
        },
        inputKeyDefecto: {
            type: String,
            require: true
        }, */
    }
}
</script>

<style  scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #00529F;
}
</style>