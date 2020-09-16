const {aql} = require('arangojs');
const {paramCase, capitalCase} = require('change-case');

module.exports = async (root, args, context) => {
    const {db} = context;
    try {
        const query = await db.query(
            aql`FOR d IN place return d`,
            {},
            {
                cache: true
            });
            
        const list = await query.all();

        
        return list.map(l => {
            if (!l.tag) {
                l.tag = [];
            }

            l.tags = l.tag.map(t => {
                return {
                    name: capitalCase(t),
                    slug: paramCase(t),
                    _key: t
                };
            });

            return l;
        });
    } catch(error) {
        console.error(error);

        return [];
    }

};