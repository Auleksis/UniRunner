# set the base image to create the image for react app  
FROM node:20-alpine  
  
# set the working directory to /app  
WORKDIR /app  
  
# copy package.json and package-lock.json to the working directory  
COPY package*.json ./  
  
# install dependencies  
RUN npm install  
  
# copy the rest of the files to the working directory  
COPY . .  

RUN npm run build
  
FROM nginx
# Copy the ngnix.conf to the container
COPY ngnix.conf /etc/nginx/conf.d/default.conf
# Copy the React app build files to the container
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]