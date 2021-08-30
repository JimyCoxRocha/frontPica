import axios from 'axios';
import { saveLocalStorage } from '../helpers/handleLocalStorage.js';
import { obtenerClaveValorPostman } from '../helpers/obtenerClaveValorPostman.js';
import { generarResponsePostman } from '../helpers/generarResponsePostman.js';
const urlMdw = 'https://my-json-server.typicode.com/JimyCoxRocha';

export const findProfiles = async function(){
  return await axios.get(`${urlMdw}/ge-profiles/perfil`)
  .then(resp =>{
    return resp.data;
  });
}

export const findProfileOptions= async function({idProfile}){
  return await axios.get(`${urlMdw}/profiles-in-options/all?${idProfile}`)
  .then(resp =>{
    return resp.data;
  });
}

export const disableProfile= async function({idProfile}){
  return await axios.get(`${urlMdw}/disable/disable?${idProfile}`)
  .then(resp =>{
    return resp.data;
  });
}

export const enableProfile= async function({idProfile}){
  return await axios.get(`${urlMdw}/enable/enable?${idProfile}`)
  .then(resp =>{
    return resp.data;
  });
}

export const updateProfileInOption= async function(profileInOptionUpdates){
  return await axios.get(`${urlMdw}/update-profile/update`, profileInOptionUpdates)
  .then(resp =>{
    return resp.data;
  });
}

export const saveProfile= async function(name, description){
  return await axios.get(`${urlMdw}/create-profile/create`, {name, description})
  .then(resp =>{
    return resp.data;
  });
}

export const login = async function(payload) {
    return await axios.get(`${urlMdw}/apiPIKA/login`,{ params: { user: payload.user , password: payload.password} })
    .then(resp => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + resp.data.output.token;//Token
      saveLocalStorage('token', resp.data.output.token);
      saveLocalStorage('user', payload.user);
      saveLocalStorage('menu', JSON.stringify(resp.data.output.menu));
    })
    .catch(error => {
      return error.response;
    })

}

export const findReports = async function(tipoReporte="auditoria"/*, params*/) {
  return await axios.get(
    `${urlMdw}/dataTable/${tipoReporte}`) 
  .then(resp => {
    console.log(resp.data);
    return resp;
  })
  .catch(error => {
      console.error(error);
      return error.response;
  })

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

export const findCataloguesOptions = async function(opcion) {
  let datosRecibidos = [];
  return await axios.get(`${urlMdw}/dataTable/${opcion}`) 
  .then(resp => {
    datosRecibidos = resp;
    return datosRecibidos;
  })
  .catch(error => {
      console.error(error);
      return error.response;
  })

}