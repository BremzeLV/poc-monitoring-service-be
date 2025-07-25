#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh postgres:5432
/opt/wait-for-it.sh kafka:9092
npm run migration:run
npm run seed:run:relational
npm run start:prod
