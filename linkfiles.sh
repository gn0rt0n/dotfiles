#!/usr/bin/env zsh

setopt EXTENDED_GLOB
for rcfile in "${ZDOTDIR:-$HOME}"/.dotfiles/runcoms/^README.md(.N); do
  ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done

ln -s "${ZDOTDIR:-$HOME}/.dotfiles/vim" ${ZDOTDIR:-$HOME}/.vim

git submodule update --init --recursive
