#!/bin/bash
# Lisatty Windows/Cygwin:a varten sulut ja export
(
  export NODE_PATH=app/scripts
  ./node_modules/.bin/gulp
)
