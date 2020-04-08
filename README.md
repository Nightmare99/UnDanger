 # UnDanger - a women's safety device
 This is the helper app that is used to setup the UnDanger standalone device. Made using React Native and friends.
 ## Dependencies
 - NodeJS
 - NPM
 - React Native
 - Redux
 - Lodash

 ## Installation
 ```npm install```
 
 ## Starting metro server
 ```npm start```

 ## Running android app
 ```npm android``
 
 Make sure you either have an emulator or an android device with USB debugging enabled connected to the computer.
  
 ## Features
 - Create new user accounts.
 - Record audio sample and send to server.
 - Select emergency contacts from mobile's contact list.
 - A decent amount of error handling.
 
 ## A brief peek under the hood
 As soon as the user opens the app, they are greeted by the Login screen. Here, there's an option to register new user as well.

 Once the user is authenticated, they reach the app's home screen. Here, they have options to record audio sample, choose emergency contacts and logout of the app. There is also a button for saving changes, clicking which will lead to the app sending the details to the server for respective CRUD operations.

 All screens that the user can see are in the components folder. The main component is in ```App.js``` where we also have the redux store and reducer declared. In this component, we have stack navigation for all the screens, starting with the login screen.  