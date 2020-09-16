const { capitalCase, paramCase } = require("change-case");


module.exports = async (root, args, context) => {
    const {db} = context;
    let tag = args.tag;

    if (root && root._key) {
        tag = root._key;
    }

    try {
        const q = await db.query({
            query: `for d in image filter @tag in d.tags return d`,
            bindVars: {
                tag
            }
        });
    
        const list = await q.all();

        return list.map(i => {
            const tags = i.tags ? i.tags.map(t => {return {_key: t, name: capitalCase(t), slug: paramCase(t)}}) : [];

            return {
                _key: i._key,
                description: i.description,
                score: i.score,
                file: i.file,
                dateAdded: i.date_added,
                tags
            }
        });
    } catch (err) {
        console.error(err);

        return [];
    }
}