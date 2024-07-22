# RealTimeChat
This chat app allows users to message each other in real time, emulating popular chat apps such as Messenger. This web app allows logging in through the integration of Next Auth, ensuring secure user authentication with Google.  
[Live Preview](https://real-time-chat-orpin.vercel.app/)

## Features
* Signing in with Google
* Adding a user/users
* Real-time chat functionality
* Notification system for errors, new messages, new friend requests

## Installation
* Clone the repository using `git clone`
* `cd` into the RealTimeChat directory
* Create a .env.local file in the root of the project, and add the variables:
    * `NEXTAUTH_SECRET` a string of random characters, preferably long
    * `UPSTASH_REDIS_REST_URL` found in the REST API section once a database is created
    * `UPSTASH_REDIS_REST_TOKEN` found in the REST API section once a database is created
    * `GOOGLE_CLIENT_ID` create OAuth Client ID credentials in Google Cloud -> Additional information section
    * `GOOGLE_CLIENT_SECRET` create OAuth Client ID credentials in Google Cloud -> Additional information section
    * `PUSHER_APP_ID` create Pusher Channel -> App Keys -> app_id
    * `NEXT_PUBLIC_PUSHER_APP_KEY` create Pusher Channel -> App Keys -> key
    * `PUSHER_APP_SECRET` create Pusher Channel -> App Keys -> secret

* Run `npm i` to install the required dependencies
* Run `npm run dev` to start the project and navigate to `http://localhost:3000` to see the project in action 


![Screenshot_1](https://github.com/user-attachments/assets/d1e3e633-41a4-4958-93ae-1599865a5828)
![Adduser](https://github.com/user-attachments/assets/96b0dc24-831c-47f9-9aba-3abc54b54f3e)
![Friendrequest](https://github.com/user-attachments/assets/312c88a0-432f-46f4-a248-f2deed32eeff)
![Notification](https://github.com/user-attachments/assets/d709b9cf-31f8-4995-885f-b710759f33d9)
![Chat](https://github.com/user-attachments/assets/e2b90279-8ce5-4d08-afa9-b1d1f74cb53a)


