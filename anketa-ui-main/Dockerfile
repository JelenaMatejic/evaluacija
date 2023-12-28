# stage 1

FROM node:16-alpine AS my-app-build
WORKDIR /app
COPY . .
RUN yarn install && npm run build

# stage 2

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=my-app-build /app/dist/angularapp /usr/share/nginx/html
EXPOSE 80
