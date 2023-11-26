FROM node:14-alpine
RUN apk add --no-cache bash
WORKDIR /app
COPY package*.json db_migration wait-for-it.sh ./
RUN npm i 
COPY . .
RUN npm run build
# RUN npm run db-init-all
EXPOSE 3000
# CMD ["npm", "start"]
