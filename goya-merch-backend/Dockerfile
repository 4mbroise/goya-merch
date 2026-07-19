FROM node:20-alpine

WORKDIR /server

COPY package.json package-lock.json turbo.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/storefront/package.json ./apps/storefront/

RUN npm install --legacy-peer-deps

COPY . .

# Normalize line endings (defends against CRLF from Windows checkouts)
RUN sed -i 's/\r$//' /server/start.sh /server/start-storefront.sh \
    && chmod +x /server/start.sh /server/start-storefront.sh

EXPOSE 9000 5173 9001

# Invoke sh explicitly so a broken/missing shebang can't cause ENOENT
ENTRYPOINT ["sh", "/server/start.sh"]
