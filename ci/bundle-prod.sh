#!/bin/sh

rojo build default.project.json --output "ci/RemoteSpy.rbxm"

remodel run ci/bundler.lua "ci/RemoteSpy.lua"
