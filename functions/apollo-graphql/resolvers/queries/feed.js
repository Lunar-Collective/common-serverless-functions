const { aql } = require("arangojs");


module.exports = async (root, args, context) => {
    const {db} = context;
    const {location} = args;

    try {
        const q = await db.query({
            query: `for d in feed filter d.location == @location return d`,
            bindVars: {
                location: location
            }
        });
        const list = await q.all();

        return list.map(i => {
            return {
                _key: i._key,
                image: i.image,
                contentType: i.content_type,
                title: i.title,
                location: i.location,
                link: i.link,
                linkText: i.linkText,
                file: i.image
            }
        });
    } catch (error) {
        console.error(error);

        return [];
    }
}