# Use uma imagem base com Node.js
FROM node:18

# Crie e defina o diretório de trabalho na imagem
WORKDIR /usr/src/app

# Copie o arquivo package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do npm
RUN npm install


# Copie o restante do código-fonte da aplicação
COPY . .

# Exponha a porta 3000 usada pela aplicação
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["node", "app.js"]
