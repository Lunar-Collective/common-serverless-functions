
module.exports = async (root, args, context) => {
    const {db} = context;
    const {abbreviation} = root;

    try {
        const q = await db.query({
            query: `for d in locations filter d.region_shortname == @abbreviation sort d.city_longname ASC return d`,
            bindVars: {
                abbreviation
            },
            cache: true
        });
    
        const list = await q.all();
    
        return list;
    } catch (error) {
        console.error(error);

        return [];
    }
};