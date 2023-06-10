#DOCKER FILE SETUP

# From the image specified, we build a container
FROM node:lts-alpine
# set the base working directory
WORKDIR /app/
# copy the files from local to container /app/
# use * to copy package.json and package-lock.json
COPY package*.json ./
# copy client package and run npm install on client app
COPY client/package*.json client/
RUN npm run install-client --omit=dev
# copy server package and run npm install on server app
COPY server/package*.json server/
RUN npm run install-server --omit=dev
# copy client application code, then run build in container
COPY client/ client/
RUN npm run build --prefix client

# copy server to server
COPY server/ server/
# Switch to less priveleged user
USER node
# To run the image, use CMD
CMD ["npm", "start", "--prefix", "server"]
# Expose the container app to the web via this port
EXPOSE 8000