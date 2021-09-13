export const setterProfilesInOptionsActives = (modules) => {
    let optionsSelected = [];
    for(const module of modules)
        for(const option of module.options)
            (option.optionSelected) && 
                (optionsSelected = [...optionsSelected, {idModule: option.idModule, idOption: option.idOption }]);

    return optionsSelected;
    
}

export const createProfilesInOptionsUpdates = (optionsSelected, modules, idProfile, user) => {
    let optionsUpdates = [], optionFind = {}, optionSetter = {};
    for(const module of modules)
        for(const option of module.options){
            optionSetter = {};
            if(option.optionSelected == true){
                optionFind = optionsSelected.find( opcion => opcion.idOption === option.idOption );
                if(optionFind === undefined)
                    optionSetter = {idOption: option.idOption, optionSelected: false }
            }else if (option.optionSelected == false){
                optionFind = optionsSelected.find( opcion => opcion.idOption === option.idOption );
                if(optionFind !== undefined)
                    optionSetter = {idOption: option.idOption, optionSelected: true }
            }
            
            if(Object.keys(optionSetter).length !== 0){
                optionsUpdates.push(optionSetter);
            }
        }
        if(optionsUpdates.length === 0){
            throw "Debe realizar cambios";
        }
        const profileInOptionUpdates = {
            idProfile: idProfile.idProfile, 
            usernameAdmin: user,
            options: optionsUpdates
        }
    return profileInOptionUpdates;
    
}

export const itemQueryReport = (modulo, service, categorias) => {
    let endPoints = [];
    try{
            if(categorias instanceof Array)
                for(const categoria of categorias )
                    endPoints.push({"key": categoria.key, "service": categoria.keyService, "method": categoria.method});
            else{
                if(categorias.key !== "all" )
                    endPoints.push({"key": categorias.key, "service": categorias.keyService, "method": categorias.method});
            }

        return [
            {
                "module": modulo.key,
                "services":[
                    {
                        "key": service.key,
                        "dataBase": service.database,
                        endPoints
                    }
                ]
            }
        ];        
    }catch(err){
        throw "Error al formatear el objeto query";
    }

}

export const findObjectToReport = (data, key) => {
    return data.find(aux => aux.key === key);
}

export const findObjectToReportEndPoint = (data, name) => {
    return data.find(aux => aux.name === name);
}


export const jsonToUrlEncode = (json) => { 
    return encodeURIComponent(JSON.stringify(json));
}

export const formatterSimpleListByKey = (data) => {
    let list = [];
    for(const value of data)
        list.push(value.key);
    return list;
}

export const formatterSeriesBar = ({services, log}) => {
    let list = {
        keys: [],
        count: [{
                name: log,
                data: []
        }]
    };
    try{
        for(const service of services){
            list.keys.push(service.key);
            list.count[0].data.push(service.count);
        }
        //[3,6,1]
        return list;
    }catch(err){
        throw "Ocurrió un error al cargar los servicios del bar";
    }
}

export const formatterLogsDelete = (logs) => {
    let formatLogsDelete = [];
    for(const log of logs){
        formatLogsDelete.push({
            "dataBase": log.dataBase,
            "_id": log._id,
            "_rev": log._rev
        });
    }
    console.log(formatLogsDelete);
    return formatLogsDelete;
}

export const setterErrorData = (msg) => {
    
    try{
        if(msg.response.data.messages === undefined)
            return ["Error en la comunicación con el servicio."];

        return  msg.response.data.messages;
    }catch(err){
        return ["Error en la comunicación con el servicio."];
    }
}
