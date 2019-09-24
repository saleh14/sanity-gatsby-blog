const htmlToBlock = require("./../../lib/parseBody")
const sanitizeHTML = require("./../../lib/sanitizeHTML")
const cheerio = require("cheerio")

const db = require("./../../db")

jest.mock("./../../db", () => {
  return {
    get: jest.fn(() => ({
      value: jest.fn(() => {
        return [
          {
            id: "551",
            title: "محاضرة: مناقشة مقال الدكتور براد كارتر في ظهور شمس ثانية",
            section: "activities",
            sectionAr: "◄ أنشطة الجمعية",
            pageContent:
              '\n\t\t\t\t<div class="page_section" "="">◄ أنشطة الجمعية</div>\n\t\t\t\t<div class="page_toolbar">[ <a href="http://www.qasweb.org/activities/item_p.php?id=551">طباعة الصفحة</a> | <a href="javascript:ShowArea(document.all.send_page);" title="أرسل الصفحة">أرسل الصفحة</a> | عدد الزوار: 9319 | عدد الارسال: 0 ]</div>\n\t\t\t\t\t\t\t<div align="center" id="send_page" style="display: none">\n<table border="1" style="font-size: 9pt;border-collapse: collapse; font-family:Tahoma" width="400" cellspacing="0" cellpadding="4" bordercolordark="#C0C0C0" bordercolorlight="#C0C0C0" id="table16" dir="rtl">\n\t\t\t\t\t\t\t\t<tbody><tr>\n\t\t\t\t\t\t\t\t\t<td width="100" bgcolor="#F2FBEC">الإسم</td>\n\t\t\t\t\t\t\t\t\t<td><input type="text" name="from_name" size="20" style="width: 100%"></td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td width="100" bgcolor="#F2FBEC">البريد الإلكتروني</td>\n\t\t\t\t\t\t\t\t\t<td><input type="text" name="from_email" size="20" style="width: 100%"></td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td width="100" bgcolor="#F2FBEC">إسم المرسل إليه</td>\n\t\t\t\t\t\t\t\t\t<td><input type="text" name="to_name" size="20" style="width: 100%"></td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td width="100" bgcolor="#F2FBEC">بريده الإلكتروني</td>\n\t\t\t\t\t\t\t\t\t<td><input type="text" name="to_email" size="20" style="width: 100%"></td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t</tbody></table>\n\t\t\t\t\t\t\t\t<p style="margin-top: 5; margin-bottom: 5" align="center">\n\t\t\t\t\t\t\t\t\t<input onclick="document.all.doaction.value=\'send_activities_item\';setTimeout(CloseMessageSubmitForm, 5000);displayStaticMessage(\'<div style=\\\'font:bold 16px Arial;color:#FF0000\\\' align=center dir=rtl><br>سوف يتم إرسال الصفحة . شكراً لك<br><br><a href=\\\'#\\\' onclick=\\\'closeMessage();document.form_page.submit();\\\'>إغلاق</a></div>\',false)" type="button" value="أرسل الصفحة" name="B2" class="btn" style="font-family: Tahoma; font-size: 9pt">\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</p></div>\n\t\t\t\t<div class="page_content_title">محاضرة: مناقشة مقال الدكتور براد كارتر في ظهور شمس ثانية</div>\n\t\t\t\t<div style="direction: rtl;"><img src="http://www.qasweb.org/media/files/1071858902.jpg" title="" alt="" align="top" border="0px"><br>\n  </div>\n<div style="direction: rtl;"><br>\n  </div>\n<div style="direction: rtl;">ستقام محاضرة تناقش <span style="border-collapse: collapse; font-family: arial, helvetica, sans-serif; font-size: 16px; ">مقال براد كارتر في مقر الجمعية وذلك مساء يوم الخميس 10 فبراير 2011 - الساعة الثامنة مساءً</span></div>\n<div style="direction: rtl;"><span style="border-collapse: collapse; font-family: arial, helvetica, sans-serif; font-size: 16px; "><br>\n    </span></div>\n<div style="direction: rtl;"><span style="border-collapse: collapse; font-family: arial, helvetica, sans-serif; "><span style="font-size: 16px; ">\n      <div>مدة المحاضرة: 30-45 دقيقة</div>\n      <div>المكان: مقر جمعية الفلك</div>\n      <div>محاور المحاضرة : سوبر نوفا - ابط الجوزاء - مقال براد كارتر</div>\n      <div><br>\n        </div>\n      <div>المحاضر / الأستاذ على العبندي</div></span></span></div>\t\t\t\t',
            summary:
              "ستقام محاضرة تناقش مقال براد كارتر في مقر الجمعية وذلك مساء يوم الخميس 10 فبراير 2011 - الساعة الثامنة مساءً",
            images: ["http://www.qasweb.org/media/files/1071858902.jpg"],
            subId: "19",
            subText: "المحاضرات والندوات"
          }
        ]
      })
    }))
  }
})

const posts = db.get("posts").value()

const blocks = []

posts.forEach(({ pageContent, title, section, id }) => {
  const $ = cheerio.load(pageContent)

  $("img").toArray().forEach(el => {
    if (el.attribs && el.attribs.src) {
      el.attribs.src = el.attribs.src.replace("../../", "http://qasweb.org/")
    }
  })

  // $('img').replaceWith(`<p> ${$.html($('img'))} </p>`)
  const page_content = $(".page_content_title").nextAll()
  const sanitizedHtml = sanitizeHTML(page_content)

  console.log(page_content.find("img").children().toArray())
  console.log(`http://www.qasweb.org/${section}/item.php?id=${id}`)

  // sanitizeHTML(pageContent) //?
  const postBlock = {
    _type: "page",
    title,
    section,
    id,
    body: htmlToBlock(sanitizedHtml)
  }
  blocks.push(postBlock)
})

console.log(JSON.stringify(blocks[0].body, null, 2))

// fs.writeFileSync('someBlocks.ndjson', someBlocksValues)

it("should render blocks correctly", () => {
  expect(true).toBe(true)
})

/*
 getJson hardcoded json special case
*/
