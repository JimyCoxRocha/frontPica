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
                            <!-- <DataTableEdit 
                                :initialize="initializeParams"
                                :agregar="agregarParams"
                                :editar="editarParams"
                                :eliminar="eliminarParams" /> -->
                                
                        </v-card>
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

    export default {
        name: "Postman",
        data: () => ({
            tipoReporte: "Proceso Postman",
            peticionSelected: "GET",
            peticiones: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            enlacePeticion: "",
            btnEnviar,
            elementosParams: [],
            elementosHeaders: [],
            elementActive: "BODY",
            dataJSONEnvio: ``,
            respServidor: "",
            status: "",
            time: "",
            size: ""
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
                let objetoPeticionPostman = generarObjPostman;
                objetoPeticionPostman.elementosHeaders = this.elementosHeaders;
                objetoPeticionPostman.elementosParams = this.elementosParams;
                objetoPeticionPostman.dataJSONEnvio = JSON.parse(this.dataJSONEnvio);
                objetoPeticionPostman.peticion = this.peticionSelected;
                objetoPeticionPostman.url = this.enlacePeticion;


                this.respServidor = await peticionPostman(objetoPeticionPostman)
                .then((data) =>{
                    return JSON.stringify(data, null, 4);
                })
                .catch( error =>{
                    console.error(error);
                });

                console.log(objetoPeticionPostman);
            },
            initializeParams(){
                return this.elementosParams;
            },
            editarParams(editedIndex,editedItem){
                Object.assign(this.elementosParams[editedIndex], editedItem);
                console.log("Se editó correctamente: ");
                console.log(this.elementosParams);
            },
            eliminarParams(indexDelete){
                this.elementosParams.splice(indexDelete, 1);
                console.log("eliminó: ");
                console.log(this.elementosParams);
            },
            agregarParams(ItemAdd){
                this.elementosParams.push(ItemAdd);
                console.log("Se guardó correctamente: ");
                console.log(this.elementosParams);
            },
            initializeHeaders(){
                return this.elementosHeaders;
            },
            editarHeaders(editedIndex,editedItem){
                Object.assign(this.elementosHeaders[editedIndex], editedItem);
                console.log("Se editó HEADER correctamente: ");
                console.log(this.elementosHeaders);
            },
            eliminarHeaders(indexDelete){
                this.elementosHeaders.splice(indexDelete, 1);
                console.log("eliminó header: ");
                console.log(this.elementosHeaders);
            },
            agregarHeaders(ItemAdd){
                this.elementosHeaders.push(ItemAdd);
                console.log("Se guardó correctamente HEader: ");
                console.log(this.elementosHeaders);
            }
        }
    }
</script>

<style>

</style>