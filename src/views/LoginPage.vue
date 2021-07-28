<template>
  <v-container class="pt-0 pb-0 pl-0 pr-0" fluid fill-height>
    <v-row class="signin fill-height" >

      <v-col cols="12" md="8" xs="11" class="left baseColor pa-0" >
        <v-img alt="Vue logo" src="../assets/pycca.png" max-width="500" width="100%"></v-img>
      </v-col>
      <v-col cols="12" md="4" xs="11" class="right primary pa-0">
        <v-container class="mt-xs-5">
          <p class="text-h4 text-md-h3 mt-5">Inicio de Sesión</p>
          <v-form >
              <v-text-field
                v-model="user"
                label="Usuario"
                required
                outlined
                dark
                filled
                dense
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Contraseña"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"
                required
                outlined
                dense
                dark
                filled
                :type="showPass ? 'text' : 'password'"
              ></v-text-field>
              
          <v-col
          class="d-flex m-0"
          cols="10"
          sm="10"

        >
          <v-select
            :items="items"
            label="Ambiente del aplicativo"
            solo
          >
            <template #selection="{ item }">
                <v-chip color="secundary">{{item}}</v-chip>
            </template>
          </v-select>
        </v-col>
              
                <router-link to="/home" class="signin-btn">
                  <v-btn
                    elevation="11"
                    x-large
                    class="baseColor">
                    <p class="mb-0 text-subtitle-2 text-md-subtitle-1">
                      Ingresar  
                    </p>
                  </v-btn>
                </router-link>
              
          </v-form>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    /* import { extend } from 'vee-validate';
    import { required, email } from '@vee-validate/rules'; */

   /*  setInteractionMode('eager')

    extend('required', {
    ...required,
    message: '{_field_} can not be empty'
    })

    extend('email', {
    ...email,
    message: 'Email must be valid'
    }) */

    export default {
      name:"LoginPage",

      data: () => ({
          user: '',
          password: null,
          showPass: false,
          items: ['Producción', 'Prueba']
      }),
    }
</script>

<style>
.signin {
  padding: 0;
  margin: 0;
}
.left {
  padding: 30px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  color: #30ac7c;
}
.right {
  padding: 30px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.signin-btn {
  text-decoration: none;
}
.texto{
  font-size: 2rem;
}
</style>