const {aql} = require('arangojs');
const { paramCase } = require('change-case');

module.exports = async (root, args, context) => {
    const {db} = context;

    try {
        const query = await db.query(
            aql`FOR d IN locations COLLECT name = d.region_longname, abbreviation = d.region_shortname return {name, abbreviation}`,
            {},
            {
                cache: true
            }
            )
        const regions = await query.all();
        
        return regions.map(r => {
            r.slug = paramCase(r.name);

            return r;
        });
    } catch(error) {
        console.error(error);

        return [];
    }

};