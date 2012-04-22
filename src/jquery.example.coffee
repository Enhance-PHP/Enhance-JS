root = exports ? this

class root.JqueryExample
  this.changeDescription = (id, description) ->
    $('#' + id).attr('alt', description).attr('title', description)
  this.doSomethingWithAjax = (id, url) ->
    'todo'