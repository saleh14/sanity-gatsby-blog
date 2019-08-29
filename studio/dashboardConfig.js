export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-blog'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5d683c5b7ce5e43029c1ea18',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-blog-studio-csia4x7f',
                  apiId: '017a90e1-cfb0-49ad-9c7f-279bd9a76dab'
                },
                {
                  buildHookId: '5d683c5c1730212890876396',
                  title: 'Blog Website',
                  name: 'sanity-gatsby-blog-web-19pzdr11',
                  apiId: '182b15e5-164b-456b-9179-d8c2786ec9a0'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/saleh14/sanity-gatsby-blog',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-gatsby-blog-web-19pzdr11.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
