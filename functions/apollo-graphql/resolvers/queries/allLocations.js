const {aql} = require('arangojs');

module.exports = async (root, args, context) => {
    const {db} = context;
    try {
        const query = await db.query(aql`FOR d IN locations return d`, {}, {
            cache: true
        });
        
        const list = await query.all();
        
        return list;
    } catch(error) {
        console.error(error);

        return [];
    }

};