# Likeable
MEAN stack app which determines how many facebook pages you have liked and scans for traces of Kardashian and Bieber in your likes. Users log into the app using an oAuth2.0 strategy and information about users page likes are gathered via Facebook Graph API.

##Before logging in

![Alt text](client/assets/images/loggedout.png?raw=true "logged out")

##After Logging in

After logging in the user will see their liking ratio. The app will detect traces of Kardashian or Bieber in their likes and respond with an appropriate message.

![Alt text](client/assets/images/loggedin.png?raw=true "logged in")

#Usage
You will need a facebook app-id and secret and then place them in server/config/local.env.js as per the example file located in the same directory. In your facebook app you will need to set the address as http://localhost:9000 if running locally.

You will also need an instance of MongoDB running, MongoDB uri is configured in server/config/enviornment.
