<template>
    <v-container fluid fill-height class="d-flex flex-column">
        <div style="width: 100%;" class="baseColor">
            <v-toolbar
            class="mb-2"
            color="secondary"
            dark
            flat
            >
                <v-toolbar-title>{{tipoReporte}}</v-toolbar-title>
            </v-toolbar>
            <div class="mt-10 mr-4 ml-4 mb-10">
                <v-row>
                    <v-col
                        cols = "12"
                        md = "12"
                        xl="6">
                        <v-card
                            class="mx-auto"
                            max-width="100%"
                        >
                            <v-col
                                cols="12"
                                md="12"
                                >
                                <v-row>
                                    <v-col
                                    class="pb-0"
                                    cols="12"
                                    md="3"
                                    >
                                        <v-autocomplete
                                            :items="peticiones" 
                                            v-model="peticionSelected"
                                            item-value="key" 
                                            item-text="key"
                                            outlined
                                            dense
                                            hide-details
                                        ></v-autocomplete>

                                    </v-col>
                                    <v-col
                                    class="pl-md-0 pb-0"
                                    cols="12"
                                    md="7"
                                    >
                                        <v-text-field
                                            v-model="enlacePeticion"
                                            label="Petición"
                                            outlined
                                            hide-details
                                            dense
                                            autocomplete="off"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col
                                    class=""
                                    cols="7"
                                    md="1"
                                    >
                                        <Boton :btnData="btnEnviar" :click="enviarPeticion"/>
                                    </v-col>
                                    
                                </v-row>
                            </v-col>
                            <v-tabs
                                background-color="secondary"
                                center-active
                                dark
                                >
                                <v-tab @click.stop="elementActive = 'BODY'">Body</v-tab>
                                <v-tab @click.stop="elementActive = 'PARAMS'">Params</v-tab>
                                <v-tab @click.stop="elementActive = 'HEADERS'">Headers</v-tab>
                                
                            </v-tabs>
                            <DataTableEdit 
                                tituloTabla="Params"
                                :initialize="initializeParams"
                                :agregar="agregarParams"
                                :editar="editarParams"
                                :eliminar="eliminarParams" 
                                v-show="(elementActive === 'PARAMS') ?  true : false"
                                />

                            <DataTableEdit 
                                tituloTabla="Headers"
                                :initialize="initializeHeaders"
                                :agregar="agregarHeaders"
                                :editar="editarHeaders"
                                :eliminar="eliminarHeaders" 
                                v-show="(elementActive === 'HEADERS') ?  true : false"
                                />
                            <TextAreaAuto 
                                :obtenerTexto="obtenerTexto"
                                v-show="(elementActive === 'BODY') ?  true : false"
                            />  
                        </v-card>
                        <p :v-show="showErrorValidation" class="error white--text">{{errorValidation}}</p>
                    </v-col>
                
                    <v-col
                        cols = "12"
                        md = "12"
                        xl="6">
                        <v-card
                            class="mx-auto"
                            max-width="100%"
                        >
                            <v-col
                                cols = "12"
                                md = "12">
                                <p class="ml-2 mb-0 text-left font-weight-medium text-sm-body-2">Status: {{status}}</p>
                                <p class="ml-2 mb-0 text-left font-weight-medium text-sm-body-2">Time: {{time}}</p>
                                <p class="ml-2 mb-0 text-left font-weight-medium text-sm-body-2">Size: {{size}}</p>
                            </v-col>
                            <p class="font-weight-bold mb-1">Respuesta</p>
                            <v-textarea
                                    name="input-7-1"
                                    filled
                                    label="Body"
                                    auto-grow
                                    hide-details
                                    readonly
                                    :value="respServidor"
                                >
                                </v-textarea>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </div>
    </v-container>
</template>

<script>
    import Boton from '../../components/Boton.vue';
    import DataTableEdit from '../../components/DataTableEdit.vue';
    import TextAreaAuto from '../../components/TextAreaAuto.vue';
    import { btnEnviar } from "../../types/btnDesign.js";
    import { peticionPostman } from "../../services/DataServices.js";
    import { generarObjPostman } from "../../types/objetoPostman.js";
    import { findLocalStorage } from "../../helpers/handleLocalStorage.js";

    export default {
        name: "Postman",
        data: () => ({
            tipoReporte: "Proceso Postman",
            peticionSelected: "GET",
            peticiones: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            enlacePeticion: "",
            btnEnviar,
            elementosParams: [],
            elementosHeaders: [
                {
                    key: 'Authorization',
                    value: findLocalStorage('token'),
                    description: 'Token'
                }
            ],
            elementActive: "BODY",
            dataJSONEnvio: ``,
            respServidor: "",
            status: "",
            time: "",
            size: "",
            errorValidation: "",
            showErrorValidation: false
        }),
        components: {
            Boton,
            DataTableEdit,
            TextAreaAuto
        },
        methods: {
            obtenerTexto(texto){
                this.dataJSONEnvio = texto;
            },
            async enviarPeticion(){
                //llenamos los datos del objeto para enviar al servicio
                let objetoPeticionPostman = generarObjPostman();
                objetoPeticionPostman.elementosHeaders = this.elementosHeaders;
                objetoPeticionPostman.elementosParams = this.elementosParams;
                objetoPeticionPostman.peticion = this.peticionSelected;
                objetoPeticionPostman.url = this.enlacePeticion;
                try{
                    //Covertimos a JSON el dato ingresado
                    (this.dataJSONEnvio != "") 
                        && (objetoPeticionPostman.dataJSONEnvio = JSON.parse(this.dataJSONEnvio));
                        
                    this.showErrorValidation = false;
                    this.errorValidation = "";
                    this.respServidor = await peticionPostman(objetoPeticionPostman)
                    .then((data) =>{
                        console.log(data);
                        this.status = data.status;
                        this.time = data.time;
                        this.size = data.size;
                        return JSON.stringify(data.data, null, 4);
                    })
                    .catch( error =>{
                        return JSON.stringify(error, null, 4);
                    });
                }catch(err){
                    this.errorValidation = "Por favor, recuerde ingresar en formato JSON el valor";
                    this.showErrorValidation = true;
                }
            },
            initializeParams(){
                return this.elementosParams;
            },
            editarParams(editedIndex,editedItem){
                Object.assign(this.elementosParams[editedIndex], editedItem);
            },
            eliminarParams(indexDelete){
                this.elementosParams.splice(indexDelete, 1);
            },
            agregarParams(ItemAdd){
                this.elementosParams.push(ItemAdd);
            },
            initializeHeaders(){
                return this.elementosHeaders;
            },
            editarHeaders(editedIndex,editedItem){
                Object.assign(this.elementosHeaders[editedIndex], editedItem);
            },
            eliminarHeaders(indexDelete){
                this.elementosHeaders.splice(indexDelete, 1);
            },
            agregarHeaders(ItemAdd){
                this.elementosHeaders.push(ItemAdd);
            }
        }
    }
</script>

<style>

</style>