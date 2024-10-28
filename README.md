# Brief description

Implemented functionality to get all superheroes (list of superheroes with pagination, i.e. 5 superheroes per page), one specific superhero by its id, create resource (superhero), change (update value) of superhero, delete superhero.

On React-application: I tried to make normal styling, used tailwindcss, materialui-components, used Redux-toolkit as a state-manager, and also redux-persist to save the redux state in localstorage - so that when the page reloads, the state is saved, in particular for the current pagination page number. To work with forms I used Formik. To speed up development I used ChatGPT - so in some places components don't look the best, including form components could be rewritten using component compound pattern. Also used react-slick to create an image slider in superhero detail.

Cons and bugs: when changing superhero details, you can select multiple images (as you should), or you can select none. Also tests are not added yet, but I think to do it soon (at least tests of endpoints, not to mention end2end-tests).Also sometimes didn't type the components enough.

## Clone the contents of the repository

You can do this with the command:

```
https://github.com/YaroslavKarpenko/superhero-app.git
```

### Install dependencies

First you need to go to the root of the project

```
cd .\superhero-app\
```

Now we are in the root directory of the React application. Let's install its dependencies:

```
npm i
```

Next we need to do the same for the Express application. Let's go to its directory:

```
cd .\server\
```

Install its dependencies:

```
npm i
```

#### Preparing to work with the database

In this application as a DBMS I chose MongoDB, but still decided to store in the database not the images of superheroes, but links to images, the images themselves should be stored on cloud storage (like AWS S3), but I have them stored in the folder images in the root of the project.
I did it in order not to complicate the work by connecting and configuring AWS.

During the development I used mongo base on a remote cluster (because when I deploy the base in docker-container my PC performance drops).
However, I prepared docker-compose.yml to deploy the MongoDB container locally.

In the root directory of the server application (where docker-compose.yml is located), run the command:

```
docker-compose up -d
```

(the docker kernel itself must be running before doing this, of course).
Make sure the containers are running:

```
docker ps
```

Now you can connect to MongoDB from your application using the following:

Host: localhost

Port: 27017

Use the following URI to connect to MongoDB (for example, in your application):

```
mongodb://localhost:27017/mydatabase
```

It needs to be set in the .env environment variables configuration file
There is already an example of filling in the data in the .env.sample file (you can use this data)

##### Running the application

In the server directory let's launch the application in development mode

```
npm run dev
```

Let's run the client application in the same way by returning to the project root.

```
cd ..
npm run dev
```
