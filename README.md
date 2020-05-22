# chatTo
Chat app for CareerFoundry

ChatTo is a mobile chat app made with React Native and Gifted Chat. It has been made using Expo, a CLI tool that runs with Node.js and allows the development of the app while running it on a server.
 
ChattTo has been tested in both Android and iOS simulators, with minimal differences in the outcome.

What does it do?
	•	Messages can be stored online (via Google Firebase) and offline.
	•	Sending images and location other than the messages
	•	Chat rooms with customized colour
  
I want to install it. What should I do?
	•	Start by installing expo-cli. After that, from the root directory, run `npm install` from the command line. To put the server running, use the command `expo start`.
	•	Once Expo is installed, navigate to the root directory and run npm i.
	•	Next, you can start the app by running expo start. This will launch DevTools on port 19XXX (some number).
	•	You can either scan the barcode using a mobile device (expo app required: Android or iOS) or use a simulator or emulator.


Is that all?
No, it' s not. You have to create a Firebase project on Google and get the SDK config data for you to run it once the information used in the repo is no longer valid. It is simple, once you are done. Not confident? Check this tutorial or follow the instructions below.

Setting up the database
	1.	Head to Firebase click on Sign in in the upper-right corner.
	2.	Use your Google credentials to sign in and create a new Firebase account, unless you already have one.
	3.	Next, click on the Go to console link, which is also in the top-right corner of the window, and choose Add project.
	4.	Give your project a name, With the default settings selected, agree to the terms and click Create Project.
	5.	Create a database by clicking on Develop from the menu and, from the additional menu that appears, select database.
	6.	Next, choose Create database in the Cloud Firestore section.
	7.	It is essential that you make sure you are creating a Firestore Database and not a Realtime Database.
	8.	Before you can start adding data into it, you first need to set up some security rules for your database.

Images

