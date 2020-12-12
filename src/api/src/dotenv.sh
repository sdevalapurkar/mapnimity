#!bin/bash

# ===================================================
# Reads all `key=value` lines from a `./.env` file and exports them
# To apply variables to your local shell, use `source dotenv.sh` or `. dotenv.sh`
#
# Usage Example:
# edit the ./.env as needed
# $ source dotenv.sh
# ===================================================

if [ -f .env ]
then
  regex='^.*=.*$'

  while read line
  do
    if [[ $line =~ $regex ]]
    then
      echo $line
      export $line
    fi
  done < .env
fi
