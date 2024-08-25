# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
COPY apps/img-shifter/package.json /temp/dev/apps/img-shifter/
COPY packages/commons/package.json /temp/dev/packages/commons/
RUN cd /temp/dev && bun install

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json /temp/prod/
COPY apps/img-shifter/package.json /temp/prod/apps/img-shifter/
COPY packages/commons/package.json /temp/prod/packages/commons/
RUN cd /temp/prod && bun install --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY package.json ./
COPY apps/img-shifter ./apps/img-shifter
COPY packages/commons ./packages/commons

# [optional] tests & build
ENV NODE_ENV=production
# RUN bun test
RUN bun img:build

# copy production dependencies and source code into final image
FROM base AS release
# COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist/img-shifter ./dist/img-shifter
# COPY --from=prerelease /usr/src/app/apps/img-shifter/package.json ./apps/img-shifter/package.json

# run the app
USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", "dist/img-shifter/index.js" ]
