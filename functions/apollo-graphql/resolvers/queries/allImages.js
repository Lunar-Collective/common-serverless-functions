const {aql} = require('arangojs');
const {paramCase, capitalCase} = require('change-case');

module.exports = async (_, __, context) => {
    const {db} = context;
    try {
        const query = await db.query(aql`FOR d IN image return d`)
        const list = await query.all();

        return list.map(i => {
            const tagList = i.tags || [];

                const tags = tagList.map(t => {
                    try {
                        return {
                            _key: t,
                            name: capitalCase(t),
                            slug: paramCase(t)
                        }
                    } catch (error) {
                            console.error(err);
                            return t;
                    }
                });
    
          return {
            _key: i._key,
            description: i.description,
            file: i.file,
            score: i.score,
            dateAdded: i.date_added,
            tags
          }
        });

    } catch(error) {
        console.error(error);

        return [];
    }

};