const apiKey = process.env.OPENWEATHER_API_KEY
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: `hello from lamb d a ${ apiKey }`
  }
}
