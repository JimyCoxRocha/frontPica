<template>
  <v-data-table
    :headers="headers"
    :items="elementos"
    sort-by="calories"
    class="elevation-1"
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{tituloTabla}}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nuevo Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.key"
                      label="KEY"
                      autocomplete="off"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.value"
                      label="VALUE"
                      autocomplete="off"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      label="DESCRIPTION"
                      autocomplete="off"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Está seguro que desea eliminar el item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      No se ha ingresado data aún
    </template>
  </v-data-table>
</template>

<script>
export default {
    name: "DataTableEdit",
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'KEY',
          align: 'start',
          sortable: false,
          value: 'key',
        },
        { text: 'VALUE', value: 'value' },
        { text: 'DESCRIPTION', value: 'description', sortable: false, },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      elementos: [],
      editedIndex: -1,
      editedItem: {
        key: '',
        value: '',
        description: ''
      },
      defaultItem: {
        key: '',
        value: '',
        description: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar Elemento' : 'Editar Elemento'
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

    created () {
      this.elementos = this.initialize();
      //this.initialize()
    },

    methods: {
      /* initialize () {
        this.elementos = [
          {
            key: 'Frozen Yogurt',
            value: "159",
            description: "6.0",
          }
        ]
      }, */

      editItem (item) {
        this.editedIndex = this.elementos.indexOf(item)
        this.editedItem = Object.assign({}, item)//Elemento editado, se guardan los cambios
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.elementos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.eliminar(this.editedIndex);
        this.closeDelete();
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          this.editar(this.editedIndex,this.editedItem);
          } else {
            this.agregar(this.editedItem);
            //this.elementos.push(this.elementos.push(this.editedItem))
        }
        this.close()
      },
    },
    props:{
      tituloTabla: String,
      agregar: {
            type: Function,
            require: true
      },
      initialize: {
            type: Function,
            require: true
      },
      editar:{
        type: Function,
        require: true
      },
      eliminar:{
        type: Function,
        require: true
      }
    }
}
</script>

<style>

</style>