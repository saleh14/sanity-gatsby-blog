export default {
  name: 'person',
  type: 'document',
  title: 'Person',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'gender',
      type: 'string',
      title: 'Gender'
    },
    {
      name: 'job',
      type: 'string',
      title: 'Job'
    },
    {
      name: 'mobile',
      type: 'number',
      title: 'Mobile'
    },

    {
      name: 'email',
      type: 'email',
      title: 'Email'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'Some frontends will require a slug to be set to be able to show the person',
      options: {
        source: 'name',
        maxLength: 96
      }
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current'
    }
  }
}
