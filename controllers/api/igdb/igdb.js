const igdb = require('apicalypse').default;
const platformDict = require('./platformDictionary');
require('dotenv').config();

const apiAccess = {
    queryMethod: 'body',
    method: 'post',
    baseURL: 'https://api.igdb.com/v4',
    headers:{
        'Client-ID': process.env.IGDB_USERNAME,
        'Authorization': process.env.IGDB_PASSWORD
    }
};

const placeholder = [{
    id: 0,
    url: ''
}];

async function gameQuery (keyword/*, platform*/){
    // let whereField;

    // if(Number.isInteger(platform)){
    //     whereField = "platforms=("+platform+")"
    // }else if(typeof platform === "string"){
    //     let x =platformDict.idFromValue(platform);
    //     whereField =  ((x === undefined) ? undefined : "platforms=("+x+")");
    // }else{
    //     whereField = undefined;
    // }

    try{
        const response = await igdb(apiAccess)
            .fields('id, name, cover')
            .search(keyword)
            // .where(whereField)
            .request('/games');
        return response.data;
    } catch (err){
        console.log('Game not found. '+ err);
    }
};

async function gameIdQuery (gameId){
    try{
        const response = await igdb(apiAccess)
            .fields('name,cover,platforms')
            .where(`id=${gameId}`)
            .request('/games');
        // console.log('Start of Game ID Query');
        // console.log(response.data);
        // console.log('Énd of Game ID Query');
        return response.data;
    } catch (err){
        console.log('Game not found. '+ err);
    }
};

async function coverQuery (coverId){
    try{
        if(coverId != undefined){
            const response = await igdb(apiAccess)
                .fields('url')
                .where(`id=${coverId}`)
                .request('/covers');
            // console.log('Start of Cover ID Query');
            // console.log(response.data);
            // console.log('Énd of Cover ID Query');
            return response.data;
        }else{
            console.log('Cover not available.')
            return placeholder;
        }
    } catch (err){
        console.log('Cover not available. '+ err);
    }
};

async function platformQuery (keyword){
    try{
        const response = await igdb(apiAccess)
            .fields('name,abbreviation,alternative_name, platform_logo')
            .search(keyword)
            .request('/platforms');
        // console.log('Start of Platform Query');
        // console.log(response.data);
        // console.log('Énd of Platform Query');
        return response.data;
    } catch (err){
        console.log('Platform not found. '+ err);
    }
};

async function platformIdQuery (platformId){
    try{
        const response = await igdb(apiAccess)
            .fields('name, abbreviation, alternative_name, platform_logo')
            .where(`id=${platformId}`)
            .request('/platforms');
        // console.log('Start of Platform ID Query');
        // console.log(response.data);
        // console.log('Énd of Platform ID Query');
        return response.data;
    } catch (err){
        console.log('Platform not found. '+ err);
    }
};

async function logoQuery (logoId){
    try{
        if(logoId != undefined){
            const response = await igdb(apiAccess)
                .fields('url')
                .where(`id=${logoId}`)
                .request('/platform_logos');
            // console.log('Start of Logo ID Query');
            // console.log(response.data);
            // console.log('Énd of Logo ID Query');
            return response.data;
        }else{
            console.log('Logo not available.')
            return placeholder;
        }
    } catch (err){
        console.log('Logo not available. '+ err);
    }
};


// function dataProcessor(data){
//     const arraySize = data.length;
//     console.log(arraySize);
//     for(const obj of data){
//         let keys = obj.platforms;
//         console.log(keys);
//         for(const key of keys){
//             platformIdQuery(key);
//         }
//     }
// }

module.exports ={
    gameIdQuery: gameIdQuery,
    gameQuery: gameQuery,
    coverQuery: coverQuery,
    platformIdQuery: platformIdQuery,
    platformQuery: platformQuery,
    logoQuery: logoQuery
};
