FROM node:16.15-alpine as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build


FROM nginx:latest
COPY --from=build /usr/local/app/dist/stock-market-frontend /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80