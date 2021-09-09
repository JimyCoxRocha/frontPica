<template>
    <div>
        <v-progress-linear
            indeterminate
            color="primary"
            :active="loading"
        >
        </v-progress-linear>
        <slot name="msgLoading"></slot>
    </div>
</template>

<script>
export default {
    name: "ChargeData",
    data: ()=> ({
        
    }),
    props:{
        loading:{
            type: Boolean,
            required: true
        }
    }
}
</script>

<style>

</style>