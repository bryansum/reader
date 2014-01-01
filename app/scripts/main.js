
var cm = CodeMirror(document.body, {
  readOnly: true,
  // cursorBlinkRate: 0,
  mode: 'javascript'
})

var serverUrl = 'http://localhost:8080'

// ---------------- Utility methods --------------
function get(url, cb) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.onload = function() {
    if (this.status == 200)
      cb(null, this.responseText)
    else
      cb("Problem", null)
  }
  xhr.send()
}

function getJSON(url, cb) {
  return get(url, function(err, responseText) {
    if (err)
      cb(err, null)
    else
      cb(null, JSON.parse(responseText))
  })
}

var gJson

// ---------------- File tree --------------

function setCMContent(url) {
  get(url, function(err, responseText) {
    cm.setValue(responseText)
  })
}

function setFileTree(url) {

  getJSON(url, function(err, json) {
    var ul = document.querySelector('#filetree')
    ul.innerHTML = ''

    for (var i = 0; i < json.length; i++) {
      var li = document.createElement('li')
      var a = document.createElement('a')
      a.setAttribute('href', json[i])
      a.onclick = function(e) {
        e.preventDefault()
        var filepath = e.target.getAttribute('href')
        setCMContent(url + '/' + filepath)
      }
      a.innerHTML = json[i]
      li.appendChild(a)
      ul.appendChild(li)
    }
  })
}

getJSON(serverUrl + '/listing', function(err, json) {
  var ul = document.querySelector('#prjtree')

  for (var i = 0; i < json.length; i++) {
    var li = document.createElement('li')
    var a = document.createElement('a')
    a.setAttribute('href', serverUrl + '/' + json[i])
    a.onclick = function(e) {
      e.preventDefault()
      setFileTree(e.target.getAttribute('href'))
    }
    a.innerHTML = json[i]
    li.appendChild(a)
    ul.appendChild(li)
  }

  gJson = json
})

