import axios from 'axios';
import { saveLocalStorage } from '../helpers/handleLocalStorage.js';
import { obtenerClaveValorPostman } from '../helpers/obtenerClaveValorPostman.js';
import { generarResponsePostman } from '../helpers/generarResponsePostman.js';
import { jsonToUrlEncode } from '../helpers/setterData';

const urlMdw = 'http://localhost:8081/api-visor/v1';

export const login = async function(payload) {
  return await axios.post(`${urlMdw}/securitys/login`, payload)
  .then(resp => {
    axios.defaults.headers.common['Authorization'] = resp.data.data.token;//Token
    saveLocalStorage('token',resp.data.data.token);
    saveLocalStorage('user', payload.user);
    saveLocalStorage('menu', JSON.stringify(resp.data.data.menu));
    return resp
  });

}

export const findCataloguesOptions = async function(opcion) {
  return await axios.get(`${urlMdw}/catalogues/${opcion}`) 
  .then(({data}) => {
    return data;
  })
}

export const findCataloguesEndPoints = async function(services) {
  return await axios.get(`${urlMdw}/catalogues/endpoints/?keyService=${services}`) 
  .then(({data}) => {
    return data;
  })
}

export const findReports = async function(tipoReporte="auditoria", params) {
  return await axios.get(`${urlMdw}/reports/${tipoReporte}?body=${jsonToUrlEncode(params)}`) 
  .then(({data}) => {
    return data;
  });
}

export const findStadisticPie = async function(fecha) {
  return await axios.get(`${urlMdw}/reports/agrupar?body=${jsonToUrlEncode(fecha)}`) 
  .then(({data}) => {
    return data;
  });
}

export const findStadisticByEndpoint = async function(typeReport = "auditory", fecha){
  return await axios.get(`${urlMdw}/reports/agrupar/${typeReport}/servicio?body=${jsonToUrlEncode(fecha)}`) 
  .then(({data}) => {
    return data;
  });
}

export const findLogsToDelete = async function(fecha){
  return await axios.get(`${urlMdw}/logs?body=${jsonToUrlEncode(fecha)}`)
  .then(resp =>{
    return resp.data;
  });
}

export const deleteLogs = async function(dataLog){
  return await axios.delete(`${urlMdw}/logs/`, {data: dataLog} )
  .then(resp =>{
    return resp.data;
  });
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