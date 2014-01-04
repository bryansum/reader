# Reader

A code reading application.

## Todos
* Pull any public repository from GitHub (client-side? server-side?)

X * Show the main file in JS mode, non-editable (README.md?)
X * Change the font to Menlo by default
X * Remove the blinking cursor
* Add scope coloring support for variables (JS only for now)

* Fork CodeMirror and add modes for JS, etc. to Bower
* Change theme to grayscale, but with comments
* Add node_modules, .gitignore to ignored files
* Add ability to filter file list (server-side)
* Add language stats to repo (similar to GitHub? ... use [Linguist](https://github.com/github/linguist)) -- or use [this API](http://developer.github.com/v3/repos/) -- but this only works summarizing the total Repo, not individual files.

* Move to top of file when clicking on repo
* Show visual file size indicator

### Add repo search
* Determine whether to use *cscope*, *ctags*, or some other system.

* Add gesture-based navigation (forward / backward link navigation?)

## How to install things

    bower install *github* --save

  to save the dependency permanently in the *bower.json* file.

    grunt bower-install

  installs this dependency in the *index.html* file for consumption by other apps.
