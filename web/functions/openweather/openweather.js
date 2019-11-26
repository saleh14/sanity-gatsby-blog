// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const fetch = require('node-fetch')
const apiKey = process.env.OPENWEATHER_API_KEY
const url = `http://api.openweathermap.org/data/2.5/forecast?id=110107&APPID=${apiKey}`
exports.handler = async (event, context) => {
  try {
    const subject = event.queryStringParameters.name || 'World'
    const result = await fetch(url).then(res => res.json())
    return {
      statusCode: 200,
      body: JSON.stringify({ ...result })
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
