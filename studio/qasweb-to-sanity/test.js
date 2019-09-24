const htmlToBlock = require('./src/lib/parseBody')
const sanitizeHTML = require('./src/lib/sanitizeHTML')
const cheerio = require('cheerio')
const fs = require('fs')

const db = require('./src/db')

const posts = db.get('posts').value()
console.log(posts.filter(p=>p.id==='551')) 
// random posts Ids
const { length } = posts
const rand = (len = length) => Math.floor(Math.random() * len)
const randomPostIds = [551]
// const randomPostIds = Array.from({ length: 15 }, () => rand())

// random posts data
const somePosts = Object.entries(posts)
  .filter( ([ind, post]) => randomPostIds.includes(Number(post.id)) && post.section === 'activities')
  // .filter(([ind, post]) => randomPostIds.includes(Number(post.id)))
  .map(([ind, post]) => post)
  .map(p => {
    let images = p.images.map(img =>
      img.replace('../../', 'http://qasweb.org/')
    )
    return { ...p, images }
  })

/*
 // detect posts with tables content
  let postsWithTable = []
  posts.forEach(({ pageContent, section, id }) => {
  const $ = cheerio.load(pageContent)
  const sanitizedHtml = sanitizeHTML($('.page_content_title').nextAll())
  const checkWithCheerio = cheerio.load(sanitizedHtml)

  if (checkWithCheerio('table>tbody').html()) {
    const len = checkWithCheerio('table>tbody tr').toArray().length
    if (len > 8 ) {
      postsWithTable.push(`http://www.qasweb.org/${section}/item.php?id=${id}`)
    }
  }
 }) // ?.
*/

let someBlocks = []
somePosts.forEach(({ pageContent, title, section, id }) => {
  const $ = cheerio.load(pageContent)

  $('img')
    .toArray()
    .forEach(el => {
      if (el.attribs && el.attribs.src) {
        el.attribs.src = el.attribs.src.replace('../../', 'http://qasweb.org/')
      }
    })

  const page_content = $('.page_content_title').nextAll()
  const sanitizedHtml = '<div> hey' + sanitizeHTML(page_content)  + ' </div>'
    // $.html(page_content.find('img')) //?
  // sanitizedHtml //?

  console.log(`http://www.qasweb.org/${section}/item.php?id=${id}`)

  // sanitizeHTML(pageContent) //?
  const postBlock = {
    _type: 'page',
    title,
    section,
    id,
    body: htmlToBlock(sanitizedHtml)
  }
  someBlocks.push(postBlock)
})

const someBlocksValues = someBlocks.map(block => JSON.stringify(block, null, 2)).join('\n') // ?

// fs.writeFileSync('someBlocks.ndjson', someBlocksValues)
// JSON.stringify(someBlocks, null, 2)//?
