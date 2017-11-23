#!/bin/sh
echo Executing curl with $1 , $2
curl -d "txid=$1&c=$2" http://192.168.192.36:3000/notify
