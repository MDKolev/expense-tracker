
FROM node:18-alpine AS build

WORKDIR /expense-tracker

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]