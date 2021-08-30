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
