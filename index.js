module.exports = function () {
  return {
    visitor: {
      CallExpression (path) {
        const {
          node
        } = path
        if (
          node.callee.type === 'Import' &&
          node.arguments[0] &&
          !node.arguments[0].leadingComments
        ) {
          const value = node.arguments[0].value
          const fileName = value.split('/').pop()
          const chunkName = fileName
            .replace(/\B([A-Z])/g, '-$1').toLowerCase()
          path.get('arguments')[0]
            .addComment('leading', ` webpackChunkName: "${chunkName}" `)
        }
      }
    }
  }
}
