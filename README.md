# Reader

A code reading application.

## Todos
* Pull any public repository from GitHub (client-side? server-side?)

* Order / prioritize file listing? (alternately, pick out important sections manually)
* Filter directories?
* Show visual file size indicator
* Ward Cunningham, braces and semicolon approach (needs to be adjusted for file type)
* Highlight surrounding references on click
* Adjust URLs when switching file location (History API)

* With symbol logging, figure out relative importance and adjust text size accordingly

X * Show the main file in JS mode, non-editable (README.md?)
X * Change the font to Menlo by default
X * Remove the blinking cursor
X* Move to top of file when clicking on repo

X * Add node_modules, .gitignore to ignored files
X * Add ability to filter file list (server-side)

## Backlog
* Switch from header to implementation
* Fork CodeMirror and add modes for JS, etc. to Bower
* Change theme to grayscale, but with comments
* Add scope coloring support for variables (JS only for now)

* Add language stats to repo (similar to GitHub? ... use [Linguist](https://github.com/github/linguist)) -- or use [this API](http://developer.github.com/v3/repos/) -- but this only works summarizing the total Repo, not individual files.

* Determine whether to use *cscope*, *ctags*, or some other system.
* Add gesture-based navigation (forward / backward link navigation?)

## How to install things

    bower install *github* --save

  to save the dependency permanently in the *bower.json* file.

    grunt bower-install

  installs this dependency in the *index.html* file for consumption by other apps.
