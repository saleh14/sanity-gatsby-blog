export default {
  name: 'formPage',
  type: 'document',
  title: 'Form Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'text',
      type: 'excerptPortableText',
      title: 'Text',
      validation: Rule => Rule.required()
    },
    {
      name: 'form',
      type: 'form',
      title: 'Form'
    },
    {
      name: 'registered',
      type: 'array',
      of: [{ type: 'person' }]
    }
  ]
}
