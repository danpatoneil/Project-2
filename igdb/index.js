const igdb = require('./igdb');
const allowedPlats = require('./platformDictionary');

igdb.gameQuery("smash bros", 4)
    .then((res) => {
        const coverPromises = res.map(item => {
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

        Promise.all(coverPromises)
            .then(updatedResults => {
                console.log(updatedResults);
            })
            .catch(error => {
                console.error("Error fetching cover images:", error);
            });
    })
    .catch(error => {
        console.error("Error fetching game data:", error);
    });
