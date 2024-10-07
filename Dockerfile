# set the base image to create the image for react app  
FROM node:20-alpine as builder  
  
# set the working directory to /app  
WORKDIR /app  
  
# copy package.json and package-lock.json to the working directory  
COPY package*.json ./  
  
# install dependencies  
RUN npm install  
  
# copy the rest of the files to the working directory  
COPY . .  

RUN npx vite build
  
FROM nginx:1.21.0-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]