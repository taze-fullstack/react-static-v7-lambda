const { RECAPTCHA_SECRET_KEY } = process.env

import axios from 'axios'

const secretKey = RECAPTCHA_SECRET_KEY

exports.handler = async (event, context, callback) => {
  const captchaResponse = event.queryStringParameters.token || "NONE"

  let googleUrl = 'https://www.google.com/recaptcha/api/siteverify'
  googleUrl += '?secret=' + secretKey
  googleUrl += '&response=' + captchaResponse

  let googleHeaders = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    }
  }

  return axios.post(googleUrl, {}, googleHeaders)
    .then(result =>
      ({
        statusCode: 200,
        body: JSON.stringify(result.data)
      })
    )
    .catch(error => 
      ({
        statusCode: 422,
        body: String(error)
      })
    )
};
