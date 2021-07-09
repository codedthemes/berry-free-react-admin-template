# pull official base image
FROM node:14-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm install --silent
RUN npm install react-scripts@4.0.0 -g --silent

# add app
COPY . ./

# Expose port
EXPOSE 3000

# start app
CMD ["npm", "start"]
