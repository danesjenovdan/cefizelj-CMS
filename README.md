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

Some issues with ckeditor so the script tag containing the ckeditor destination path needs to be **removed prior to build** from index.html and **added** to the compiled index.html in the /dist folder

    <script src="bower_components/ckeditor/ckeditor.js"></script>
