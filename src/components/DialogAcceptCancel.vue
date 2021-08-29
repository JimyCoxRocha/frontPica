<template>
  <v-dialog
    v-model="activeDialog"
    persistent
    max-width="70%"
    >
    <v-card>
        <v-toolbar dense color="primary">
            <v-toolbar-title class="white--text">
                <slot name="titleCard"></slot>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <slot name="mainDialog"></slot>

        <v-card-actions>
            <v-spacer></v-spacer>
            <slot name="cancel"></slot>
            <slot name="accept"></slot>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    name: "DialogAcceptCancel",
    data: () =>({
        
    }),
    props:{
        activeDialog:{
            type: Boolean,
            required: true
        }
    }
}
</script>
