$ = require 'jquery'

do fill = (item = 'Test tagline here') ->
  $('.tagline').append "#{item}"
fill
