const { capitalCase, paramCase } = require("change-case");


module.exports = async (parent, args, context) => {
  const {db} = context;

  try {
    const q = await db.query({
      query: `for d in image sort d.@sortCol desc limit @limit return d`,
      bindVars: {
        sortCol: args.sort || 'score',
        limit: args.limit || 20
      }
    });

    const list = await q.all();

    return list.map(i => {
      const tagList = i.tags || [];
      const tags = tagList.map(t => {
        return {
          _key: t,
          name: capitalCase(t),
          slug: paramCase(t)
        }
      });

      return {
        _key: i._key,
        description: i.description,
        file: i.file,
        score: i.score,
        dateAdded: i.date_added,
        tags
      }
    })
  } catch (err) {
    console.error(err);

    return [];
  }
}