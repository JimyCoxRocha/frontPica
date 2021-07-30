import axios from 'axios';
import { saveLocalStorage } from '../helpers/handleLocalStorage.js';
const baseUrl = 'https://my-json-server.typicode.com/JimyCoxRocha/apiPIKA';
const baseUrlDebug = 'https://my-json-server.typicode.com/JimyCoxRocha/dataTable/all'



/* 
     *  Fetch list of the top 50 stories
     *  returns stories[].
    */
export const login = async function(payload) {
    /* let datosIngreso = {}; */
    await axios.get(`${baseUrl}/login`,{ params: { user: payload.user , password: payload.password} })
    .then(resp => {
      console.log(resp.data);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + resp.data.output.token;//Token
      saveLocalStorage('token', resp.data.output.token);
      saveLocalStorage('user', payload.user);
      saveLocalStorage('menu', JSON.stringify(resp.data.output.menu));
    })
    .catch(error => {
        console.error(error);
      throw error;
    })

}

export const findAllLogDebug = async function() {
  let datosRecibidos = [{}];
  await axios.get(`${baseUrlDebug}`)
  .then(resp => {
    console.log(resp.data);
    datosRecibidos = resp.data;
    console.log(datosRecibidos);
    return datosRecibidos;
  })
  .catch(error => {
      console.error(error);
    throw error;
  })

}

/*  export async function storiesWithItems(){
     let items = [];
     getTopStories().then(stories => {
          stories.forEach(id => {
           axios.get(`${baseUrl}/item/${id}.json`).then( res => {
            items.push(res.data);
           });
          });   
     });
     return items;
 } */