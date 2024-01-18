# Rembugan App - Realtime CHat Web Based Application

![1](./images/hero.png)

## About App

This is my first project which using websocket technology, i make many mistakes and learn many new things in this project. This project is not perfect, because you may encounter bugs while using it. Maybe I'll fix it another time

## Features

-   Realtime Chatting
-   Private & Group Conversation Type
-   Responsive in any screen devices

## Screenshots

![2](./images/1.png)
![2](./images/2.png)
![3](./images/3.png)
![4](./images/4.png)
![5](./images/5.png)
![5](./images/6.png)

## Library / Framework used

-   NextJS as main Javascript framework
-   Laravel as main PHP framework
-   Zustand for state management
-   Laravel Websockets as self hosted websocket
-   TailwindCSS

## Installation

1. Clone this repository

```
  git clone https://github.com/zaarza/rembugan-app.git
```

2. Install required dependencies

```
  cd frontend
  npm install

  cd backend
  npm install
  composer install
```

3. Configure .env

```
  copy backend/.env-example backend/.env
```

Configure like this:

frontend/.env

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

backend/.env

```
  DB_HOST=db-rembugan
  DB_PORT=3306
  DB_DATABASE=rembugan_app
  DB_USERNAME=root
  DB_PASSWORD=root

  PUSHER_APP_ID=websocket
  PUSHER_APP_KEY=rembugan
  PUSHER_APP_SECRET=rembugan
  PUSHER_HOST=rembugan
  PUSHER_PORT=6001
  PUSHER_SCHEME=https
  PUSHER_APP_CLUSTER=mt1
```

4. Generate key

```
  cd backend/
  php artisan key:generate
```

3. Run project

-   Manual, Development mode

```
  cd frontend
  npm run dev

  cd backend
  php artisan websocket:serve

  cd backend
  php artisan serve
```
