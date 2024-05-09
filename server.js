const igdb = require('apicalypse').default;
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

async function Test (){
    console.log('Start of Query')
const response = await igdb(apiAccess)
    .fields('id, name, first_release_date, platforms')
    .search('smash bros')
    .request('/games');
    console.log(response.data);
    console.log('Énd of Query')
};

Test();
