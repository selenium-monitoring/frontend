FROM node:20 AS build

WORKDIR /build
COPY . /build

RUN npm install
RUN npm run build --prod

# final image
FROM nginx:stable-alpine-slim
COPY --from=build /build/dist/selenium-monitoring /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80