# Automatically export all variables
set -a
source .env
set +a

HUB_REPO_ENDPOINT="https://piveau-hub-repo-ln.zazukoians.org"

curl -i -X PUT -H "X-API-Key: $API_KEY_HUB" -H "Content-Type: text/turtle" --data @piveau_catalogues/data-staatskanzlei-kanton-zuerich.ttl "${HUB_REPO_ENDPOINT}/catalogues/staatskanzlei-kanton-zuerich"
curl -i -X PUT -H "X-API-Key: $API_KEY_HUB" -H "Content-Type: text/turtle" --data @piveau_catalogues/data-bafu.ttl "${HUB_REPO_ENDPOINT}/catalogues/bafu"
