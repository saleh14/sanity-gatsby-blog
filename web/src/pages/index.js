import React from 'react'
import { graphql } from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
// import BlogPostPreviewList from '../components/blog-post-preview-list'
import Container from '../components/container'
import BlogPostPreviewGrid from '../components/blog-post-preview-list'
import Layout from '../containers/layout'

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query IndexPageQuery {
    posts: allSanityPost(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          publishedAt
          category{
            name
            name_ar
          }
          sanityId
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
        }
      }
    }
  }
`

const IndexPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts).filter(filterOutDocsPublishedInTheFuture)
    : []

  return (
    <Layout>
      <Container>
        <h1 hidden>Welcome to qasweb</h1>
        {postNodes &&
          postNodes.length > 0 &&
          <BlogPostPreviewGrid nodes={postNodes} />}
      </Container>
    </Layout>
  )
}

export default IndexPage
