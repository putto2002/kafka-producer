# kafka-producer

## Clone repository

```
git clone https://github.com/putto2002/kafka-producer.git
```

## Install dependencies

```
npm install
```

## Set up enviroment variable

Create .env file to store enviroment variables

```
$ touch .env
```

Copy and paste the variables below in the .env file and configure the file

```
# Kakfa
BOOTSTRAP_SERVER=<host name>
SECURITY_PROTOCOL=SASL_SSL
SASL_MECHANISMS=PLAIN
SASL_USERNAME=<sasl usernmae>
SASL_PASSWORD=<sals password>

# Web socket API endpoint
WEBSOCKET_SERVER=<websocket api endpoint>
CRYPTO_SYMBOL=<symbol>
TOPIC=<target topic>
```

## Starting up development enviroment

```
node index.js
```
