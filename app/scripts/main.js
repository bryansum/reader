/* global CodeMirror */
(function() {
  'use strict';

  var cm = new CodeMirror(document.body, {
    readOnly: true,
    lineNumbers: true,
    dragDrop: false,
    pollInterval: Infinity
  })

  var serverUrl = 'http://localhost:8080'

  // ---------------- Utility methods --------------
  function get(url, cb) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function() {
      if (this.status === 200)
        cb(null, this.responseText, xhr)
      else
        cb('There was a problem', null, null)
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

  function getMimeType(xhr) {
    var header = xhr.getResponseHeader('Content-Type'),
        ct = header ? header.split(';')[0] : ''
    return CodeMirror.mimeModes[ct]
  }

  function setCMContent(url) {
    get(url, function(err, responseText, xhr) {

      if (!err) {
        cm.setOption('mode', getMimeType(xhr))
        cm.setValue(responseText)
        document.body.scrollTop = 0
      }
    })
  }

  function setRepoFileTree(url) {

    getJSON(url, function(err, json) {
      var ul = document.querySelector('#filetree')
      ul.innerHTML = ''

      function onclick(e) {
        e.preventDefault()
        var url = e.target.getAttribute('href')
        setCMContent(url)
      }

      for (var i = 0; i < json.files.length; i++) {
        var li = document.createElement('li')
        var a = document.createElement('a')

        var name = json.files[i].name
        a.setAttribute('href', url + '/' + name)
        // a.setAttribute('data-mime-type', json[i]['mime-type'])
        a.onclick = onclick
        a.innerHTML = name
        li.appendChild(a)
        ul.appendChild(li)
      }
    })
  }

  function setRepoList() {
    getJSON(serverUrl + '/listing', function(err, json) {
      var ul = document.querySelector('#prjtree')

      function onclick(e) {
        var readme = e.target.getAttribute('data-readme'),
            url = e.target.getAttribute('href')

        setRepoFileTree(url)

        if (readme) {
          setCMContent(url + '/' + readme)
        }
        cm.setValue('')

        e.preventDefault()
      }

      for (var i = 0; i < json.length; i++) {
        var li = document.createElement('li')
        var a = document.createElement('a')
        a.setAttribute('href', serverUrl + '/' + json[i].name)
        a.setAttribute('data-readme', json[i].readme.name)
        a.onclick = onclick
        a.innerHTML = json[i].name
        li.appendChild(a)
        ul.appendChild(li)
      }

      gJson = json
    })
  }

  setRepoList()
})()
