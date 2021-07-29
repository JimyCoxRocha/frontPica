import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#00529F',
            secondary: '#3577BD',
            selectedColor: '#00529f',
            menuItemColor: '#2A6CAD',
            red: '#FF1619',
            baseColor: '#fff'
          },
        },
      },
});
