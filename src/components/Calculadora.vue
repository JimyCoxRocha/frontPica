<template>
    <div>
        <h1>This is a calculator</h1>
        <span>{{ resultado }}</span>

        <v-row
            align="center"
            justify="space-around"
        >
            <v-btn
            depressed
            color="primary"
            >
            Primar
            </v-btn>
        </v-row>
    </div>
</template>

<script>
export default {
    name:"calculadora",
    props:{
            resultado: String
        }
}
</script>
