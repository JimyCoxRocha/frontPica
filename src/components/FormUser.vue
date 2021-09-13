<template>
    <v-dialog
        v-model="activeDialog"
        persistent
        max-width="85%"
        >

        <v-card>
            <v-toolbar dense color="primary">
                <v-toolbar-title class="white--text">
                    <span class="text-h5">{{userOption}}</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <slot name="charge"></slot>
            <div class="ma-0 mb-5 pa-0 error white--text" v-show="errorDetected" >
                <p>{{messageErrorValidation}}</p>
            </div>
            <v-form ref="entryForm" @submit.prevent="(isValid()) 
                ? clickGuardar(inputSelectedNow, name, lastName,user,contrasenia1, true) 
                : clickGuardar(inputSelectedNow, name, lastName,user,contrasenia1, false)">
                <v-col
                    cols = "12">
                    <v-row>
                        <v-col
                            cols = "12"
                            md="6">
                            <v-row>
                                <v-col
                                class="pr-0"
                                cols="3"
                                md="2"
                                >
                                    <p class="text-right ma-0 mt-2">Nombre:</p>
                                </v-col>

                                <v-col
                                class=""
                                cols="9"
                                md="10"
                                >
                                    <v-text-field
                                        v-model="name"
                                        label="Nombre"
                                        outlined
                                        dense
                                        autocomplete="off"
                                        :rules="stringRules"
                                    ></v-text-field>

                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col
                                class="pr-0"
                                cols="3"
                                md="2"
                                >
                                    <p class="text-right ma-0 mt-2">Apellido:</p>
                                </v-col>

                                <v-col
                                class=""
                                cols="9"
                                md="10"
                                >
                                    <v-text-field
                                        v-model="lastName"
                                        label="Apellido"
                                        outlined
                                        dense
                                        autocomplete="off"
                                        :rules="stringRules"
                                    ></v-text-field>

                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col
                                class="pr-0"
                                cols="3"
                                md="2"
                                >
                                    <p class="text-right ma-0 mt-2">Username:</p>
                                </v-col>

                                <v-col
                                class=""
                                cols="9"
                                md="10"
                                >
                                    <v-text-field
                                        v-model="user"
                                        label="Username"
                                        outlined
                                        dense
                                        autocomplete="off"
                                        :rules="stringRules"
                                    ></v-text-field>

                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col
                                class="pr-0"
                                cols="4"
                                md="2"
                                >
                                    <p class="text-right ma-0 mt-2">Contraseña:</p>
                                </v-col>

                                <v-col
                                class=""
                                cols="8"
                                md="10"
                                >
                                    <v-text-field
                                        v-model="contrasenia1"
                                        :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append="showPass1 = !showPass1"
                                        required
                                        outlined
                                        dense
                                        filled
                                        label="Escribir contraseña"
                                        autocomplete="off"
                                        :type="showPass1 ? 'text' : 'password'"
                                        :rules="valueRequired"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col
                                class="pr-0"
                                cols="4"
                                md="2"
                                >
                                    <p class="text-right ma-0 mt-2">Confirmar:</p>
                                </v-col>

                                <v-col
                                class=""
                                cols="8"
                                md="10"
                                >
                                <v-text-field
                                        v-model="contrasenia2"
                                        :append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append="showPass2 = !showPass2"
                                        required
                                        outlined
                                        dense
                                        filled
                                        autocomplete="off"
                                        label="Confirmar contraseña"
                                        :type="showPass2 ? 'text' : 'password'"
                                        :rules="valueRequired"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col
                            cols = "12"
                            md="6"
                            >
                            <v-row>
                                <v-col
                                class="pr-0"
                                cols="4"
                                md="3"
                                >
                                    <p class="text-right mt-1">Profiles: </p>
                                </v-col>
                                <v-col
                                class="pa-0"
                                cols="7"
                                md="8"
                                >
                                <v-autocomplete
                                    :items="profiles" 
                                    v-model="inputSelectedNow"
                                    item-value="idProfile" 
                                    item-text="name"
                                    outlined
                                    rounded
                                    dense
                                    hide-details
                                    class="mt-2"
                                ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col> 
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <slot name ="cancel"></slot>
                    <v-btn
                        color="blue darken-1"
                        text
                        type="submit"
                    >
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "FormUser",
    created: function() {
        this.name = this.initializer.name;
        this.lastName = this.initializer.lastName;
        this.user = this.initializer.user;
        this.contrasenia1 = this.initializer.contrasenia1;
        this.contrasenia2 = this.initializer.contrasenia2;
        this.inputSelectedNow= this.inputSelected;
    },
    data: () =>({
        messageErrorValidation: "",
        errorDetected: false,
        inputSelectedNow: 0,
        name: "",
        lastName: "",
        user: "",
        contrasenia1: "",
        contrasenia2: "",
        showPass1: false,
        showPass2: false,
        stringRules : [
            v => !!v || 'Field is required',
            v => /^[a-zA-Z]+$/.test(v) || 'Debe Ser String',
        ],
        valueRequired : [
            v => !!v || 'Field is required'
        ],
    }),
    methods:{
        isValid(){
            try{
                if (this.$refs.entryForm.validate()){
                    if(this.contrasenia1.trim() !== this.contrasenia2.trim())
                        throw "Las claves de acceso no coinciden. Por favor, verifique nuevamente.";

                    this.messageErrorValidation = "";
                    this.errorDetected = false;
                    return true;
                }else{
                    throw "Ingrese los valores correctamente. Recuerde no colocar números en el nombre, apellido y el username.";
                }
            }catch(err){
                this.messageErrorValidation = err;
                this.errorDetected = true;
                return false;
            }
        },
        saveUser() {
            try{
                if(this.contrasenia1.trim() !== this.contrasenia2.trim()){
                    
                        throw "Las claves de acceso no coinciden. Por favor, verifique nuevamente";
                }else if(this.name.trim().length == 0 || this.user.trim().length == 0 || 
                            this.lastName.trim().length == 0 || this.contrasenia1.trim().length == 0 ||
                            this.contrasenia2.trim().length == 0 ){
                    throw "Ingrese los valores correctamente";
                }
                this.errorDetected = false;
                this.messageErrorValidation = "";
                this.errorDetected = false;
                return true;
            }catch(err){
                this.errorDetected = true;
                this.messageErrorValidation = err;
                return false;
            }
        }
    },
    props:{
        activeDialog:{
            type: Boolean,
            required: true
        },
        initializer: {
            type: Object
        },
        profiles:{
            type:Array
        },
        inputSelected:{
            type: Number
        },
        userOption: {
            type: String
        },
        clickGuardar:{
            type: Function,
            required: true
        }
    }
}
</script>
