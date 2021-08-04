import axios from 'axios';
import { saveLocalStorage } from '../helpers/handleLocalStorage.js';
import { obtenerClaveValorPostman } from '../helpers/obtenerClaveValorPostman.js';
import { generarResponsePostman } from '../helpers/generarResponsePostman.js';
const baseUrl = 'https://my-json-server.typicode.com/JimyCoxRocha/apiPIKA';
const baseUrlDebug = 'https://my-json-server.typicode.com/JimyCoxRocha/dataTable/all'

export const login = async function(payload) {
    await axios.get(`${baseUrl}/login`,{ params: { user: payload.user , password: payload.password} })
    .then(resp => {
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
    datosRecibidos = resp.data;
    return datosRecibidos;
  })
  .catch(error => {
      console.error(error);
    throw error;
  })
  return datosRecibidos;

}

export const peticionPostman = async function(objPostman){
  const timeBeforeRequest = performance.now();
  let tiempo = 0;
  let objetoResp = null;
  
  objetoResp = await axios({
    method: objPostman.peticion,
    url: objPostman.url,
    headers: obtenerClaveValorPostman(objPostman.elementosHeaders),
    data: {...objPostman.dataJSONEnvio, ...obtenerClaveValorPostman(objPostman.elementosParams)},
  }) 


  .then(resp => {
    console.log(resp);
    let timeAfterRequest = performance.now();
    tiempo = (timeAfterRequest - timeBeforeRequest);
    return generarResponsePostman(resp.data, resp.status, tiempo, JSON.stringify(resp).length);
  })
  .catch(error => {
      if (error.response) {
        let timeAfterRequest = performance.now();
        tiempo = (timeAfterRequest - timeBeforeRequest);
        console.log(error.response);
        return generarResponsePostman(error.response.data, error.response.status, tiempo, JSON.stringify(error.response).length);
      }
  })
  return objetoResp;
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