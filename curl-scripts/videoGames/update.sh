#!/bin/bash

API="http://localhost:4741"
URL_PATH="/video-games"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "videoGame": {
      "title": "'"${TITLE}"'",
      "platform": "'"${PLATFORM}"'",
      "studio": "'"${STUDIO}"'",
      "isAvailable": "'"${AVAILABLE}"'"
    }
  }'

echo
