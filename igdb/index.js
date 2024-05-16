const igdb = require('./igdb');
const allowedPlats = require('./platformDictionary');
const workingData ={
    names: new Array(),
    ids: new Array(),
    consoles:new Array()
};
const result = igdb.gameQuery("smash bros", 4);


result.then((data) => {
        workingData.names = data.map(obj => obj.name);
        data.forEach(element => {
            element.platforms.forEach(platform =>{
                if(allowedPlats.index.has(platform.toString())){
                    workingData.consoles.push(platform);
                }
            });
        });
        return workingData;  
   })
   .then((workingData)=> {
        console.log(workingData);
   });
