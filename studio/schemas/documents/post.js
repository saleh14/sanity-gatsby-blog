import { format } from 'date-fns'

export default {
  name: 'post',
  type: 'document',
  title: 'Blog Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'id',
      type: 'string',
      title: 'رقم الموضوع'
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'This can be used to schedule post for publishing'
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main image'
    },
    {
      name: 'excerpt',
      type: 'excerptPortableText',
      title: 'Excerpt',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.'
    },
    {
      name: 'category',
      type: 'reference',
      to: {
        type: 'category'
      }
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      description: 'Add keywords that describes your blog.',
      of: [{ type: 'reference', to: { type: 'tag' } }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Body'
    }
  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage'
    }
    // ,
    // prepare({ title = 'No title', publishedAt, slug = {}, media }) {
    //   const dateSegment = format(publishedAt, 'YYYY/MM')
    //   const path = `/${dateSegment}/${slug.current}/`
    //   return {
    //     title,
    //     media,
    //     subtitle: publishedAt ? path : 'Missing publishing date'
    //   }
    // }
  }
}
