const { capitalCase, paramCase, camelCase } = require("change-case");


module.exports = async (root, args, context) => {
    const {db} = context;
    const {latlong} = root || {};
    const {lat, long, tag} = args;


    try {
        const q = await db.query({
            query: `for d IN WITHIN(place, @lat, @long, @meters, "distance") FILTER @tag in d.tag return d`,
            bindVars: {
                lat: lat || latlong[0],
                long: long || latlong[1],
                meters: args.meters || 50000,
                tag: camelCase(tag)
            }
        });
    
        const list = await q.all();

        return list.map(i => {
            const tags = i.tag ? i.tag.map(t => {return {_key: t, name: capitalCase(t), slug: paramCase(t)}}) : [];
            const d = i;
            d.tags = tags;
            d.dateAdded = d.date_added;

            return d;
        });
    } catch (err) {
        console.error(err);

        return [];
    }
}