    FROM nginx:alpine

    COPY dist /usr/share/nginx/html
    COPY k8s/nginx-redirect.conf /etc/nginx/conf.d/default.confNGINX