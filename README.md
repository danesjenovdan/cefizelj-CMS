cefizelj
========

Cefizelj CMS frontend


# Installation

## Bower

    $ bower install

Mac:

    $ sudo bower install --allow-root

## Build and testing


### Testing
Opens testing with livereload for live debugging on http://127.0.0.1:9001
    $ grunt serve

### Build
    $ grunt build

Some issues with ckeditor so the <script> to import the ckeditor needs to be added to the compiled index.html in the /dist folder
