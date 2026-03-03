# Use Node 24 slim as the base image
FROM node:24-slim

# Set the working directory
WORKDIR /app

# Install system dependencies
# - git: Required for many npm packages
# - python3/make/g++: Required if any native modules need compiling
# - procps: Helps with process management
RUN apt-get update && apt-get install -y \
    git \
    python3 \
    make \
    g++ \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Install Expo CLI globally
RUN npm install -g expo-cli

# Copy package files first to leverage Docker cache
# COPY package*.json ./

# Install dependencies
# RUN npm install

# Copy the rest of your application code
# COPY . .

# Expo development ports:
# 8081 - Metro Bundler
# 19000-19002 - Traditional Expo ports (if using older configs)
EXPOSE 8081

# Start the development server
# --host lan or --tunnel is often needed when running in Docker
# CMD ["npx", "expo", "start", "--dev-client"]