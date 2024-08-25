# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
COPY apps/gateway/package.json /temp/dev/apps/gateway/
COPY packages/commons/package.json /temp/dev/packages/commons/
RUN cd /temp/dev && bun install

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json /temp/prod/
COPY apps/gateway/package.json /temp/prod/apps/gateway/
COPY packages/commons/package.json /temp/prod/packages/commons/
RUN cd /temp/prod && bun install --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY package.json ./
COPY apps/gateway ./apps/gateway
COPY packages/commons ./packages/commons

# [optional] tests & build
ENV NODE_ENV=production
# RUN bun test
RUN bun gateway:build

# copy production dependencies and source code into final image
FROM base AS release
# COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist/gateway ./dist/gateway
# COPY --from=prerelease /usr/src/app/apps/gateway/package.json ./apps/gateway/package.json

# run the app
USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", "dist/gateway/index.js" ]
