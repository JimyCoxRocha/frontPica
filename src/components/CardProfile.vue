<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-toolbar dense color="primary">
      <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text>
        <slot name="module"></slot>

        <!-- <li v-for="(user, i) in nombres" :key="i">
            <slot v-bind:user="user"></slot>
        </li>
            <button @click="mostarClick">Boton</button>
            <slot v-bind:estado="activado"></slot>
         -->
    </v-card-text>
  </v-card>
</template>

<script>

export default {
    name: "CardPRofile",
    data: () => ({
        nombres: [
            {
                name: "andres"
            },
            {
                name: "cox"
            }
        ],
        activado: true
    }),
    props:{
        title:{
            type: String,
            required: true
        }
    },
    methods:{
        mostarClick(){
            this.activado = !this.activado;
        }
    }
}
</script>

<style>

</style>