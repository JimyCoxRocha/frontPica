<template>
  <v-col
    cols="12"
    md="4"
    >
        <v-row>
            <v-col
            class="pr-0"
            cols="5"
            md="4"
            >
            <p class="text-right">{{texto}}</p>
            </v-col>
            <v-col
            @click.stop = "activarDatePicker = true"
            class="pa-0"
            cols="6"
            md="8"
            >
            <v-menu
                v-model="activarDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-bind="attrs"
                    v-on="on"
                    v-model="valorFecha"
                    rounded
                    readonly
                    outlined
                    dense
                    hide-details
                ></v-text-field>
                </template>
                <v-date-picker
                    v-model="valorFecha"
                    @input="activarDatePicker = false"
                    @change="capturarFecha(valorFecha)"
                    locale="es"
                    :max="fechaMax"
                    :min="fechaMin"
                ></v-date-picker>
            </v-menu>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
import moment from 'moment';
export default {
    name:"DatePicker",
    created(){
        this.valorFecha = this.fechaInicial;
    },
    data: ()=>({
        activarDatePicker: false,
        valorFecha: "",
    }),
    props:{
        fechaInicial: {
            type: String,
            default: moment(Date.now()).format('YYYY-MM-DD')
        },
        texto: {
            type: String,
            require: true
        },
        fechaMax:{
            type: String,
            require: true,
            default:""
        },
        fechaMin:{
            type: String,
            require: true,
            default:""
        },
        capturarFecha: {
            type: Function,
            require: true
        }
    },
    methods: {
        
    }
}
</script>

<style  scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #00529F;
}
</style>