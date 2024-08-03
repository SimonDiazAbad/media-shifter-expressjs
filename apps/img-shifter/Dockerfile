# Stage 1: Development
FROM node:alpine as development

WORKDIR /usr/src/app

# Install Yarn globally
RUN apk add --no-cache yarn

# Copy workspace and package manager files
COPY package.json yarn.lock tsconfig.json ./

# Copy the application source code
COPY apps/img-shifter ./apps/img-shifter

# Install dependencies using Yarn
RUN yarn install

# Build the application
RUN yarn img:build

# Stage 2: Production
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Install Yarn globally
RUN apk add --no-cache yarn

# Copy only the necessary files
COPY package.json yarn.lock ./

# Install production dependencies using Yarn
RUN yarn install --production

# Copy the build output and node_modules from the development stage
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules

# Expose the necessary port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/apps/img-shifter/index.js"]
# CMD node dist/apps/img-shifter/index.js