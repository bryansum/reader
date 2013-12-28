var cm = CodeMirror(document.body, {
  readOnly: true,
  cursorBlinkRate: 0,
  mode: 'javascript'
})

function getText(cb) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', 'https://s3.amazonaws.com/www.bsumm.net/queue.js', true)
  xhr.onload = function() {
    if (this.status == 200) {
      cb(null, this.responseText)
    }
  }
  xhr.send()
}

getText(function(err, txt) {
  cm.setValue(txt)
})
