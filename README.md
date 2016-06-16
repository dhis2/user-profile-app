# dhis-user-profile-app
DHIS2 user profile app

# Project Link
https://summerofcode.withgoogle.com/projects/#5404582838534144

### Pre-requisites
Since the app uses webpack as a build tool you will need to install this first.
```sh
npm i -g webpack webpack-dev-server
```

### Running the dev server
The following command will start the development server which uses CORS to communicate with a DHIS2 instance. 
```sh
webpack-dev-server
# or
npm start
```


### Building the project
To build a production version of the application run the following command.
```sh
npm run build
```