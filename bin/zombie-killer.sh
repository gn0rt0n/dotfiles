#!/bin/bash

kill -9 `ps -xaw -o state -o ppid | grep Z | grep -v PID | awk '{print $2}'`
