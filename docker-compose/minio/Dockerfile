FROM minio/minio:RELEASE.2024-08-17T01-24-54Z-cpuv1

COPY configure.sh /usr/bin/configure.sh
RUN chmod +x /usr/bin/configure.sh

ENTRYPOINT ["/usr/bin/configure.sh"]
CMD ["minio", "server", "/data", "--console-address", ":9001"]
