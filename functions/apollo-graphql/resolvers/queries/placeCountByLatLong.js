const { capitalCase, paramCase } = require("change-case");


module.exports = async (root, args, context) => {
    try {
        const {db} = context;
        const {latlong} = root;

        if (!latlong) {
            throw "Must have a latlong field to work"
        }

        const q = await db.query({
            query: `for d IN WITHIN(place, @lat, @long, @meters, "distance") COLLECT WITH COUNT INTO length RETURN length`,
            bindVars: {
                lat: latlong[0],
                long: latlong[1],
                meters: 100
            }
        });
    
        const list = await q.all();
        console.log(list);

        return 0;
    } catch (err) {
        console.error(err);

        return [];
    }
}