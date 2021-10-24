FROM nginx:latest

ADD ./deploy/nginx.conf /etc/nginx/conf.d/default.conf

ADD ./dist/talent-web /usr/share/nginx/html