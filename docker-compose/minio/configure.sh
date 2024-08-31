#!/bin/sh

minio server /data --console-address ":${MINIO_CONSOLE_PORT}" &

sleep 5

mc alias set myminio http://localhost:"${MINIO_SERVER_PORT}" "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD"
mc mb myminio/images

# mc admin user add myminio "$MINIO_IMAGES_USER" "$MINIO_IMAGES_PASSWORD"
# # TODO: create more specific policies
# mc admin policy attach myminio readwrite --user="$MINIO_IMAGES_USER"

wait
