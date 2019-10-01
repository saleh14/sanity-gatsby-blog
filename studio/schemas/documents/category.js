export default {
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
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
