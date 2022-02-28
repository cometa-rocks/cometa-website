# CometaRocksWebsite

This is the official cometa-rocks website. It is mirrored from git.mvara.de to github.com/cometa-rocks.

Feel free to contribute. We would be happy to acknowledge your pull-request :-)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Development server

* Edit to your needs `php/cometa_secret_variables.php` and `src/environments/environment`.
* docker-compose -f docker-compose-dev.yml up -d --force-recreate
* manually serve `npx ng serve  --host 0.0.0.0 --port 4300 --disable-host-check`
* Make sure to to tunnel the ports 8011 and 4300 via ssh 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
For production use `ng build --aot --extract-licenses --build-optimizer --optimization --configuration production`.
The build is automatically prepared by the `prepare.sh` script. it is executed on startup of the container by .gitlab-ci.yml.

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
