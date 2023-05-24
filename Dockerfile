FROM node:latest AS build

ENV NODE_ENV development

WORKDIR /app

COPY . .

RUN npm install
#RUN npm install -g vite
RUN npm run build
RUN npm prune --production

FROM nginx AS deploy

COPY nginx.conf /etc/nginx/nginx.conf

ENV NODE_ENV production
COPY --from=build ./app/dist /usr/share/nginx/html/
#COPY ./dist /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# FROM node:lts-alpine

# # install simple http server for serving static content
# RUN npm install -g http-server

# # make the 'app' folder the current working directory
# WORKDIR /app

# # copy both 'package.json' and 'package-lock.json' (if available)
# COPY package*.json ./

# # install project dependencies
# RUN npm install

# # copy project files and folders to the current working directory (i.e. 'app' folder)
# COPY . .

# # build app for production with minification
# RUN npm run build

# EXPOSE 8080
# CMD [ "http-server", "dist" ]



