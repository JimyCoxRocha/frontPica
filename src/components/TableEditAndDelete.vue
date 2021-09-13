<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
    :search="search"
    :custom-filter="filterOnlyCapsText"
  >
    <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Buscar por cualquier campo texto"
          class="mx-4"
        ></v-text-field>
    </template>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">¿Está seguro que desea aliminar el elemento?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">Eliminar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <template v-slot:[`item.status`]="{ item }">
      {{ (item.status === true) ? "Activo": "Inactivo" }}
    </template>
    <template v-slot:[`item.acciones`]="{ item }">
      <div v-if="optionDisabled(item)">

      
        <v-icon
          small
          class="mr-2"
          @click="funcEditItem(item)"
        >
          mdi-pencil
        </v-icon>

        <v-icon
          small
          @click="(item.status) ? deleteItem(item) : enableItem(item)"
        >
        {{optionActiveDesactive(item)}}
          
        </v-icon>
      </div>
      <div v-else>
         <p class="blue--text ma-0 pa-0">Activo</p>
      </div>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: "TableEditAndDelete",
    data () {
      return {
        singleSelect: false,
        dialogDelete: false,
        dialog: false,
        editedIndex: -1,
        deleteItemIcon: "mdi-delete",
        enableItemIcon: "mdi-check-bold",
        selected: [],
        search: '',
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar' : 'Editar'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    methods:{
        optionDisabled(item){      
        if (this.typeRegister === "user"){
          if(item.idUser === this.disableOptionIn){
            return false;}
          else{
            return true;}
        }

        if(this.typeRegister === "profile"){
          if(item.idProfile === this.disableOptionIn)
            return false;
          else
            return true;
        }
        return true;
      },
      valor: function(val){
        console.log(val);
      },
      optionActiveDesactive: function ({status}){
        return (status) ? this.deleteItemIcon : this.enableItemIcon;
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      filterOnlyCapsText (value, search) {
        return  value != null && 
                search != null && 
                typeof value === 'string' && 
                value.toString().toUpperCase().indexOf(search.toUpperCase()) !== -1
      }
    },
    props: {
        disableOptionIn:{
          type: Number
        },
        typeRegister:{
          type: String
        },
        items:{
            type: Array,
            required: true
        },
        headers:{
          type: Array,
          required: true
        },
        editedItem:{
          type: Array,
          required: true
        },
        funcEditItem:{
          type: Function,
          required: true
        },
        enableItem:{
          type: Function,
          required: true
        },
        deleteItem:{
          type: Function,
          required: true
        }
    },
  }
</script>

<style>

</style>