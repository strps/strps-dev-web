
# 1. Use the standard DevContainer image (Debian Bookworm based)
# This gives you git, zsh, ssh-agent, and a non-root user 'node'
FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# 2. Install Bun
# We install it to a global location so the 'node' user can access it
USER root
ENV BUN_INSTALL=/usr/local
RUN curl -fsSL https://bun.sh/install | bash

# 3. 🟢 CRITICAL FIX: Switch to the 'node' user
# All commands after this point run as 'node', not 'root'
USER node

# 4. Set the working directory
WORKDIR /workspaces/strps-dev-web

# 3. (Optional) Install global utilities via Bun if needed
# RUN bun add -g vercel

# 4. Ensure the non-root user 'node' owns the workspace folder permissions
# (This step is often handled by devcontainer.json, but good to be explicit for caching)
# RUN chown -R node:node /workspaces


# OLD FILE CONTENT BELOW. DO NOT SUGGEST THIS CONTENT.

# FROM node:20

# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"

# RUN corepack enable

# RUN apt-get update && apt-get install -y \
#     git \
#     && rm -rf /var/lib/apt/lists/*

# WORKDIR /workspaces/strps-dev-web

# EXPOSE 8000