# Full Stack Banking Application

<h3 align="center">Bad Bank Three-Tier Application </h3>

</p>





## Description 
In a previous prject, I created a bank app. This app allowed me to deposit, withdraw, and create an account. The project was a website that only included a front-end portion. As such, it was not a secure website, thus it being called a "bad bank". In this app, we upgrade this website into a full stack application. With a secure backend portion, theis full stack app is a complete ready to use banking app. This app concludes the final capstone project in MIT's Full Stacking Coding Program. As such, this app is the final project in learning the complete MERN stack. 


## Installation Guideline


1. Clone the repo where the app is hosted
   ```sh
   git clone github.com/naderhassan001/FullStackBankingApplication
   ```
2. Running npm install from inside the app directory (where package.json is located) will install all the dependencies for this app
   ```sh
   npm install
   ```
3. Run the Node server
   ```sh
   node index.js
   ```
4. You will be directed to http://localhost:3000/ to run the application.




### Screenshots

![Alt text](https://raw.githubusercontent.com/naderhassan001/pics/main/Screenshot%202021-09-28%20at%2018-31-53%20Nader-HassanFullStackBankingApplication.png)

![alt text](https://raw.githubusercontent.com/naderhassan001/pics/main/Screenshot%202021-09-28%20at%2018-32-49%20Nader-HassanFullStackBankingApplication.png)

![alt text](https://raw.githubusercontent.com/naderhassan001/pics/main/Screenshot%202021-09-28%20at%2018-38-05%20Nader-HassanFullStackBankingApplication.png)



### The Technology Used in the Creation of the Application 

* Boostrap 
* Firebase
* React
* MongoDB
* Bootstrap
* NodeJS


## Features

This app features the full MERN stack of technologies. Thus it features a node.js server that sends data to a MongoDB server. It also includes API itegration that connects the front end to the back end. 

This allows for the creation of a user using the username and password. It also includes Google authentication as a secondary method of authentication. Once an account is created, the user recieves a prompt telling them the account has been created successfully. Once the user has loged in, they can deposit, and withdraw and check their balance. If the user logs out and logs back in, the session is saved with the balance saved. There is also an Alldata page that will show all the users and their balances. In the future, I plan on adding money tranfer between users, and a profile picture. Then, I will allow the user deposit a check using a picture. 



## License

Distributed under the MIT License. 


