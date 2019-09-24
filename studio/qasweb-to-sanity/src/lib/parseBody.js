const { JSDOM } = require('jsdom')
const blockTools = require('@sanity/block-tools').default
const normalizeBlock = require('@sanity/block-tools').normalizeBlock
const sanitizeHTML = require('./sanitizeHTML')
const cheerio = require('cheerio')
const defaultSchema = require('../../schema/defaultSchema')

const blockContentType = defaultSchema
  .get('blogPost')
  .fields.find(field => field.name === 'body').type

function htmlToBlocks (html, options) {
  if (!html) {
    return []
  }

  const blocks = blockTools.htmlToBlocks(sanitizeHTML(html), blockContentType, {
    parseHtml: htmlContent => new JSDOM(htmlContent).window.document,
    rules: [
      {
        deserialize (el, next, block) {
          if (el.tagName && el.tagName.match(/div/i)) {
            if (!el.querySelector('img,div,p,h1,h2,h3,h4,h5')) {
              return block({
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: el.textContent
                  }
                ]
              })
            }
          }

          if (el.tagName === 'IMG') {
            console.log('inside img')
            return block({
              _type: 'images',
              _sanityAsset: `image@${el
                .getAttribute('src')
                .replace(/^\/\//, 'https://')}`,
              block: null
            })
          }

          if (
            el.tagName &&
            el.tagName.match(/(p|h\d|div|a)/i) &&
            el.childNodes.length
          ) {
            const imgIfFound = el.querySelectorAll('img')
              ? el.querySelector('img')
              : null

            if (!imgIfFound) {
              return undefined
            }
            const imgEntries =
              imgIfFound && imgIfFound.entries
                ? Array.from(imgIfFound.entries())
                : [imgIfFound]

            imgIfFound && console.log(imgEntries[0].tagName)
            let imageTag = imgEntries.map(element => {
              if (element.tagName && element.tagName.toLowerCase() === 'img') {
                const block = {
                  _type: 'image',
                  _sanityAsset: `image@${element
                    .getAttribute('src')
                    .replace(/^\/\//, 'https://')}`,
                  children: []
                }
                return block
              }
            })

            console.log('inside p > img')
            return imageTag.map(block)
          }

          // Only convert block-level images, for now
          return undefined
        }
      }
    ]
  })
  return blocks
}
// module.exports = bodyHTML =>normalizeBlock(htmlToBlocks(bodyHTML))
module.exports = bodyHTML => htmlToBlocks(bodyHTML)
