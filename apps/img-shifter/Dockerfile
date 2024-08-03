# FROM node:alpine as development

# WORKDIR /usr/src/app

# COPY package.json ./
# COPY pnpm-lock.yaml ./
# COPY pnpm-workspace.yaml ./
# COPY tsconfig.json tsconfig.json

# RUN npm install -g pnpm

# COPY apps/img-shifter apps/img-shifter

# RUN pnpm install -r

# RUN pnpm img:build

# FROM node:alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package.json ./
# COPY pnpm-lock.yaml ./

# RUN npm install -g pnpm

# RUN pnpm install --prod

# COPY --from=development /usr/src/app/dist ./dist
# COPY --from=development /usr/src/app/node_modules ./node_modules

# EXPOSE 3000

# CMD ["node", "dist/apps/img-shifter/index"]
# # CMD ["pnpm", "img:dev"]

# Stage 1: Development
FROM node:alpine as development

WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy workspace and package manager files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./

# Copy the application source code
COPY apps/img-shifter ./apps/img-shifter

# Install dependencies with --shamefully-hoist to avoid symbolic links issues
RUN pnpm install -r --shamefully-hoist

# Build the application
RUN pnpm img:build

# Stage 2: Production
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the necessary files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies with --shamefully-hoist to avoid symbolic links issues
RUN pnpm install --prod --shamefully-hoist

# Copy the build output and node_modules from the development stage
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules

# Expose the necessary port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/apps/img-shifter/index.js"]
