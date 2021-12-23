# CometaRocksWebsite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Development server

* Edit to your needs `php/cometa_secret_variables.php` and `src/environments/environment`.
* docker-compose up -d
* Enter docker
* Set Environment as seen prepare.sh
```
VERSION=v14.15.0
DISTRO=linux-x64-musl
INSTALL_DIR=/usr/local/lib/nodejs
export PATH=$INSTALL_DIR/node-$VERSION-$DISTRO/bin:$PATH
```
* Run  `ng serve --host 0.0.0.0 --port 4300 --disable-host-check` for a dev server. Navigate to `http://localhost:4300/`. The app will automatically reload if you change any of the source files.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
For production use `ng build --aot --extract-licenses --build-optimizer --optimization --configuration production`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Deployment

* See .gitlab-ci.yml .. this get's executed every time a deployment is done
* It prepares the archives, replaces passwords, sets the mailto adress and more
* Then checks tries to start the container with "docker-compose up -d" and if it is up and running, it executes ./prepare.sh compile
