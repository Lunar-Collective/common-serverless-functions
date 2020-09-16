
module.exports = async (root, args, context) => {
    const {db} = context;
    const {name} = root;

    try {
        const q = await db.query({
            query: `for d in place filter d.region == @name collect with count into length return length`,
            bindVars: {
                name
            }
        });
    
        const list = await q.all();
    
        return list[0];
    } catch (error) {
        console.error(error);

        return [];
    }
};