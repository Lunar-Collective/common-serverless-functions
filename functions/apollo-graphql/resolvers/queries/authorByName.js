
module.exports = (root, args, context) => {
    return [].find(x => x.name === args.name) || 'NOTFOUND'
};