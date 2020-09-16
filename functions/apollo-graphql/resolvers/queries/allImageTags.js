const {aql} = require('arangojs');
const { capitalCase, paramCase } = require('change-case');

module.exports = async (root, args, context, info) => {
    const {db} = context;
    try {
        const query = await db.query(aql`FOR d IN image_tag return d`)
        const list = await query.all();
        
        return list.map(i => {
            return {
                _key: i._key,
                name: capitalCase(i._key),
                slug: paramCase(i._key),
                file: i.image
            }
        });
    } catch(error) {
        console.error(error);

        return [];
    }
}