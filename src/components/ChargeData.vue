<template>
  <div>
    <v-progress-linear
        indeterminate
        color="primary"
        :active="loading"
    >
    </v-progress-linear>
    <slot name="msgLoading"></slot>
    <div class="ma-0 mb-5 pa-0 error white--text" v-show="errorDetected" >
    <p>Ha ocurrido el/los siguiente/s error/es:</p>
    <p v-for="(message, index) in messagesErrorDetected" v-bind:key="index">
            {{message}}
    </p>
    </div>
  </div>
</template>

<script>
export default {
    name: "ChargeData",
    data: ()=> ({
        
    }),
    props:{
        errorDetected:{
            type: Boolean,
            required: true
        },
        loading:{
            type: Boolean,
            required: true
        },
        messagesErrorDetected:{
            type: Array,
            require: true
        }
    }
}
</script>

<style>

</style>