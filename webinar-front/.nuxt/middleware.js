const middleware = {}

middleware['authorized'] = require('..\\middleware\\authorized.js')
middleware['authorized'] = middleware['authorized'].default || middleware['authorized']

middleware['unauthorized'] = require('..\\middleware\\unauthorized.js')
middleware['unauthorized'] = middleware['unauthorized'].default || middleware['unauthorized']

export default middleware
