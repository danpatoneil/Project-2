const router = require('express').Router();
const igdb = require('./igdb');
const allowedPlats = require('./platformDictionary');


router.post('/', async(req,res) =>{
    try{
        if(req.body.itemCategory==='Game'){
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
                
         }
    }catch(err){
        console.log(err);
    }
});





module.exports=router;
