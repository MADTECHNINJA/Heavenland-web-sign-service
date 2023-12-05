FROM node:18

# Set Fontawesome token as build arg
ARG AuthToken

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apt update



# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" $AuthToken
RUN npm install --global yarn --force
RUN yarn install

# it builds
RUN npm run build
RUN yarn build
# expose 3000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

# start the app
CMD [ "yarn", "start" ]
