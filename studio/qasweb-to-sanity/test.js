$_$wp(1);
const htmlToBlock = ($_$w(1, 0), require('./src/lib/parseBody'));
const sanitizeHTML = ($_$w(1, 1), require('./src/lib/sanitizeHTML'));
const cheerio = ($_$w(1, 2), require('cheerio'));
const fs = ($_$w(1, 3), require('fs'));
const db = ($_$w(1, 4), require('./src/db'));
const posts = ($_$w(1, 5), db.get('posts').value());
const {length} = ($_$w(1, 6), posts);
const $_$wvd8 = $_$w(1, 7), rand = (len = length) => {
        $_$wf(1);
        return $_$w(1, 8), Math.floor(Math.random() * len);
    };
const randomPostIds = ($_$w(1, 9), ['432']);
const somePosts = ($_$w(1, 10), Object.entries(posts).filter(([ind, post]) => {
    $_$wf(1);
    return $_$w(1, 11), randomPostIds.includes(Number(ind));
}).map(([ind, post]) => {
    $_$wf(1);
    return $_$w(1, 12), post;
}).map(p => {
    $_$wf(1);
    let images = ($_$w(1, 13), p.images.map(img => {
        $_$wf(1);
        return $_$w(1, 14), img.replace('../../', 'http://qasweb.org/');
    }));
    return $_$w(1, 15), {
        ...p,
        images
    };
}));
let someBlocks = ($_$w(1, 16), []);
$_$w(1, 17), somePosts.forEach(({pageContent, title, section, id}) => {
    $_$wf(1);
    const $ = ($_$w(1, 18), cheerio.load(pageContent));
    $_$w(1, 19), $('img').toArray().forEach(el => {
        $_$wf(1);
        if ($_$w(1, 20), ($_$w(1, 21), el.attribs) && ($_$w(1, 22), el.attribs.src)) {
            $_$w(1, 23), el.attribs.src = el.attribs.src.replace('../../', 'http://qasweb.org/');
        }
    });
    const sanitizedHtml = ($_$w(1, 24), sanitizeHTML($('.page_content_title').nextAll()));
    const postBlock = ($_$w(1, 25), {
        _type: 'page',
        title,
        section,
        id,
        body: htmlToBlock(sanitizedHtml)
    });
    $_$w(1, 26), someBlocks.push(postBlock);
});
$_$w(1, 27), $_$wv(1, 27, '1,27', 'JSON.stringify(someBlocks, null, 2)', JSON.stringify(someBlocks, null, 2), '$_$ne', 0, 0, '');
$_$wpe(1);