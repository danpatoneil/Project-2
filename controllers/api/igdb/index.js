const router = require('express').Router();
const igdb = require('./igdb');
const allowedPlats = require('./platformDictionary');


router.post('/', async(req,res) =>{
    try{
        if(req.body.itemCategory.toLowerCase()==='game'){
            const gameData = await igdb.gameQuery(req.body.itemName);
            const updatedData = gameData.map(item => {
                    return igdb.coverQuery(item.cover)
                    .then(cover => {
                        cover[0].url = cover[0].url.replace("t_thumb","t_cover_big");
                        return {
                            id: item.id,
                            name: item.name,
                            cover: cover[0].url
                        };
                        
                    });
                });

                    Promise.all(updatedData)
                        .then(data => {
                           //console.log(updatedResults);
                            res.status(200).json(data);
                        })
                        .catch(error => {
                            console.error("Error fetching cover images:", error);
                        });
                
         }else if(req.body.itemCategory.toLowerCase()==='console'){
            const consoleData = await igdb.platformQuery(req.body.itemName);
            const updatedData = consoleData.map(item => {
                    return igdb.logoQuery(item.platform_logo)
                    .then(logo => {
                        logo[0].url = logo[0].url.replace("t_thumb","t_cover_big");
                        return {
                            id: item.id,
                            name: item.name,
                            logo: logo[0].url
                        };
                        
                    });
                });

                    Promise.all(updatedData)
                        .then(data => {
                           //console.log(updatedResults);
                            res.status(200).json(data);
                        })
                        .catch(error => {
                            console.error("Error fetching cover images:", error);
                        });
                
         }
        
    }catch(err){
        console.log(err);
    }
});

router.post('/game/:gameID', async(req,res) =>{
    try{
        const gameData = await igdb.gameIdQuery(req.params.gameID);
        const updatedData = gameData.map(item => {
                return igdb.coverQuery(item.cover)
                .then(cover => {
                    cover[0].url = cover[0].url.replace("t_thumb","t_cover_big");
                    return {
                        id: item.id,
                        name: item.name,
                        cover: cover[0].url
                    };
                    
                });
            });

                Promise.all(updatedData)
                    .then(data => {
                        //console.log(data);
                        res.status(200).json(data);
                    })
                    .catch(error => {
                        console.error("Error fetching cover images:", error);
                    });
    }catch(err){
        console.log(err);
    }
});

router.post('/platform/:platformID', async(req,res) =>{
    try{
        const platformData = await igdb.platformIdQuery(req.params.platformID);
        const updatedData = platformData.map(item => {
                //console.log(item.platform_logo);
                return igdb.logoQuery(item.platform_logo)
                .then(logo => {
                    //console.log(logo);
                    logo[0].url = logo[0].url.replace("t_thumb","t_cover_big");
                    return {
                        id: item.id,
                        name: item.name,
                        logo: logo[0].url
                    };
                    
                });
            });

                Promise.all(updatedData)
                    .then(data => {
                        //console.log(data);
                        res.status(200).json(data);
                    })
                    .catch(error => {
                        console.error("Error fetching logos:", error);
                    });
    }catch(err){
        console.log(err);
    }
});


module.exports=router;
