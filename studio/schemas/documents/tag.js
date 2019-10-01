export default {
  name: 'tag',
  type: 'document',
  title: 'Tag',
  fields: [
    {
      name: 'id',
      type: 'string',
      title: 'ID'
    },
    {
      name: 'name_ar',
      type: 'text',
      title: 'Arabic Name'
    }
  ],
  preview: {
    select: {
      title: 'name_ar'
    }
  }
}
