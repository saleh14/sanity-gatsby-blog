const { isFuture } = require('date-fns')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { format } = require('date-fns')

async function createBlogPostPages(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityPost {
        edges {
          node {
            id
            sanityId
            publishedAt
            title
            category{
              name
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []

  postEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach((edge, index) => {
      const { id, publishedAt, category, sanityId } = edge.node
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/${category.name}/${sanityId}/`

      reporter.info(`Creating blog post page: ${path}`)

      createPage({
        path,
        component: require.resolve('./src/templates/blog-post.js'),
        context: { id }
      })
    })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createBlogPostPages(graphql, actions, reporter)
}
