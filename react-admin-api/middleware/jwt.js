if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const jwt = require('jsonwebtoken');
// const keyAuth = process.env.keyAuth
const keyAuth = "testing"

const readPayloadToken = (token) => {
    let {data} = jwt.verify(token, keyAuth)
    // let timeStamp = new Date(exp * 1000)
    // let expired_at = timeStamp.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'full' })
    const tokenRes = {
        data: data
    }
    return tokenRes
}

const payloadTokenGenerate = (payload) => {
    const token = jwt.sign({data: payload}, keyAuth)
    // const {expired_at} = readPayloadToken(token)
    const tokenRes = {
        access_token: token,
        // expired_at: expired_at
    }
    return tokenRes
}

const testPayloadTokenGenerate = (payload) => {
    const token = jwt.sign({data: payload}, keyAuth, { expiresIn: 100 })
    const {expired_at} = readPayloadToken(token)
    const tokenRes = {
        access_token: token,
        expired_at: expired_at
    }
    return tokenRes
}

// console.log(readPayloadToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjMzNDNjYTgtM2QzNS00YmMyLTlkYmItNmY4MDkwODIxZjI3IiwiaWF0IjoxNjY0Mzc3NjUzLCJleHAiOjE2NjQ0MjA4NTN9.Nl68FEUz3AY1xeIdkOmQE86JRuZ___QhAoL_u86iQjc'));

module.exports = {
    payloadTokenGenerate,
    readPayloadToken,
    testPayloadTokenGenerate
}