# Stage 1: Development
FROM node:14-buster as development

WORKDIR /usr/src

# Copy workspace and package manager files
COPY package.json yarn.lock tsconfig.json ./

# Copy the application source code
# ideally we will build dist to the root to avoid this 
COPY apps/img-shifter ./apps/img-shifter
RUN rm -rf ./apps/img-shifter/dist

COPY packages/commons ./packages/commons
RUN rm -rf ./packages/commons/dist

# Install dependencies using Yarn
RUN yarn install

# Build the application
RUN yarn commons:build
RUN yarn img:build

# Stage 2: Production
FROM node:14-buster as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src

# Copy only the necessary files
COPY package.json yarn.lock ./

# Install production dependencies using Yarn
RUN yarn install --production

# Copy the build output and node_modules from the development stage
COPY --from=development /usr/src/app/img-shifter/dist ./apps/img-shifter/dist
COPY --from=development /usr/src/packages/commons/dist ./packages/commons/dist

# Expose the necessary port
EXPOSE 3001

# Command to run the application
CMD ["node", "apps/img-shifter/dist/main.js"]
# CMD node dist/apps/img-shifter/index.js