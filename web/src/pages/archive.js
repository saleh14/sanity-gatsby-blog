import React from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes } from '../lib/helpers'
import BlogPostPreviewGrid from '../components/blog-post-preview-grid'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
// import SEO from '../components/seo'
import Layout from '../containers/layout'

import { responsiveTitle1 } from '../components/typography.module.css'

export const query = graphql`
  query ArchivePageQuery {
    posts: allSanityPost(
      limit: 30
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          sanityId
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          category{
            name
          }
          _rawExcerpt
        }
      }
    }
  }
`

const ArchivePage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts)

  return (
    <Layout>
      <Container>
        <h1 className={responsiveTitle1}>Archive</h1>
        {postNodes &&
          postNodes.length > 0 &&
          <BlogPostPreviewGrid nodes={postNodes} />}
      </Container>
    </Layout>
  )
}

export default ArchivePage
