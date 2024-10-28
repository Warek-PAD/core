#!/bin/bash

DOCKERFILE_DEV=compose.yml
DOCKERFILE_PROD=compose.prod.yml

CMD=${1:-dev}

compose() {
  local dockerfile=$1
  local service=$2

  if [ -z "$service" ]; then
    docker compose --file "$dockerfile" down
    docker compose --file "$dockerfile" up --build --detach
  else
    docker compose --file "$dockerfile" rm --force --stop --volumes "$service"
    docker compose --file "$dockerfile" up --build --detach "$service"
  fi
}

case $CMD in
  dev) compose "$DOCKERFILE_DEV" ;;
  acc) compose "$DOCKERFILE_DEV" "account-service" ;;
  tran) compose "$DOCKERFILE_DEV" "transaction-service" ;;
  gtw) compose "$DOCKERFILE_DEV" "gateway" ;;
  sd) compose "$DOCKERFILE_DEV" "service-discovery" ;;
  prod) compose "$DOCKERFILE_PROD" ;;
  *)
    echo "Unknown command"
    echo "Supported commands: dev, prod, acc, tran, gtw, sd"
    exit 1
    ;;
esac
