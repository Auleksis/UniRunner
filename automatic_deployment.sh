#!/bin/bash
for (( ; ; ))
do
        git fetch origin main &>/dev/null
        LOCAL=$(git rev-parse HEAD)
        REMOTE=$(git rev-parse @{u})


        if [ $LOCAL = $REMOTE ]; then

        else
                git pull origin main &>/dev/null
                docker stop frontend
                docker compose build
                docker compose up
        fi
        sleep 5
done
