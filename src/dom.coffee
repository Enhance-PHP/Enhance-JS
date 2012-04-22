root = exports ? this

class root.Dom
  this.changeDescription = (element, description) ->
    element.alt = description
    element.title = description