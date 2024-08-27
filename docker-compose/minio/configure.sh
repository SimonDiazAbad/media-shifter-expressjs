#!/bin/sh

# Start MinIO server in the background
minio server /data --console-address ":9001" &

# Ensure the server has time to start
sleep 5

# Set up the MinIO client and create bucket
mc alias set myminio http://localhost:9000 "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD"
mc mb myminio/images

# Wait indefinitely to keep the container running
wait
