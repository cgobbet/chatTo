<h1>Chat app for CareerFoundry</h1>

<b>ChatTo</b> is a mobile chat app made with <b>React Native</b> and <b>Gifted Chat</b>. It has been made using Expo, a CLI tool that runs with Node.js and allows the development of the app while running it on a server.<br/>
 
<b>ChatTo</b>has been tested in both Android and iOS simulators, with minimal differences in the outcome.<br/>

<b>What does it do?</b><br/>
	-	Messages can be stored online (via Google Firebase) and offline.
	-	Sending images and location other than the messages
	-	Chat rooms with customized colour
  
<b>I'm feelinmg adventurous and I want to install it. What should I do?</b><br/>
	-	Start by installing expo-cli. After that, from the root directory, run `npm install` from the command line. To put the server running, use the command `expo start`.
	-	Once Expo is installed, navigate to the root directory and run npm i.
	-	Next, you can start the app by running expo start. This will launch DevTools on port 19XXX (some number).
	-	You can either scan the barcode using a mobile device (expo app required: Android or iOS) or use a simulator or emulator.

<b>Is that all?</b><br/>
No, it' s not. You have to create a Firebase project on Google and get the SDK config data for you to run it once the information used in the repo is no longer valid. It is simple, once you are done. Not confident? Check this tutorial or follow the instructions below.

<b>Setting up the database</b><br/>
	1.	Head to Firebase click on Sign in in the upper-right corner.<br/>
	2.	Use your Google credentials to sign in and create a new Firebase account, unless you already have one.<br/>
	3.	Next, click on the Go to console link, which is also in the top-right corner of the window, and choose <b>Add project</b>.<br/>
	4.	Give your project a name, With the default settings selected, agree to the terms and click <b>Create Project</b>.<br/>
	5.	Create a database by clicking on <b>Develop</b> from the menu and, from the additional menu that appears, select database.<br/>
	6.	Next, choose <b>Create database</b> in the Cloud Firestore section.<br/>
	7.	It is essential that you make sure you are <b>creating a Firestore Database</b> and not a Realtime Database.<br/>
	8.	Before you can start adding data into it, you first need to set up some security rules for your database.<br/>

<b>Images</b>
<a href="https://ibb.co/3TV2PvM"><img src="https://i.ibb.co/b6YTGF2/Start-Screen.png" alt="Start-Screen" border="0"></a>
<a href="https://ibb.co/wwJCk6L"><img src="https://i.ibb.co/SdQ0jvx/Chat-Screen.png" alt="Chat-Screen" border="0"></a>

