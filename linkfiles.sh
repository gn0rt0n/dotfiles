#!/usr/bin/env zsh

setopt EXTENDED_GLOB
for rcfile in "${ZDOTDIR:-$HOME}"/.dotfiles/runcoms/^README.md(.N); do
  ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done

# ln -s "${ZDOTDIR:-$HOME}/.dotfiles/vim" ${ZDOTDIR:-$HOME}/.vim
# ln -s "${ZDOTDIR:-$HOME}/.dotfiles/bin" ${ZDOTDIR:-$HOME}/bin
# ln -s "${ZDOTDIR:-$HOME}/.dotfiles/iterm2" ${ZDOTDIR:-$HOME}/.iterm2
# ln -s "${ZDOTDIR:-$HOME}/.dotfiles/nvm" ${ZDOTDIR:-$HOME}/.nvm
# ln -s "${ZDOTDIR:-$HOME}/.dotfiles/vscode" ${ZDOTDIR:-$HOME}/.vscode

git submodule update --init --recursive
