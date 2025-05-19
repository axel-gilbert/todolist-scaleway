FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage de production pour réduire la taille de l'image
FROM node:20-alpine AS production

WORKDIR /app

# Copier seulement les fichiers nécessaires
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# Le point d'entrée créé par adapter-node
CMD ["node", "build/index.js"] 