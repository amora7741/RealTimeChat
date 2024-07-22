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

![image](https://github.com/amora7741/XClone/assets/104049707/3dd01a1c-aa21-4086-893e-8b131f849473)
![image](https://github.com/amora7741/XClone/assets/104049707/e99c3f2b-755f-42ca-9587-5dc7812d360d)
![image](https://github.com/amora7741/XClone/assets/104049707/f0d2eeed-818d-4bfb-98e3-4502c84afdf4)

