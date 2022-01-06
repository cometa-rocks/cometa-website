#!/bin/bash

### ---
### start.sh for cometa_website
### ---
# This script DOES NOT replace the default start.sh of the nginx container
# This script just prepares some dependcies to resolve issues with npm and other
# ---
# Changelog:
# 2022-01-05 TONI change_id: 1.1
# 2021-12-22 RRO create
#

#
# GLOBAL VARIABLES
#
VERSION=v14.15.0
DISTRO=linux-x64-musl
INSTALL_DIR=/usr/local/lib/nodejs
export PATH=$INSTALL_DIR/node-$VERSION-$DISTRO/bin:$PATH

#
# Fix the users to 1000+1001
function fix_user() {
    echo "Fixing users to 1000+1001"
    deluser www-data && adduser -DH -h /home/www-data -s /sbin/nologin -u 1000 www-data
    deluser nginx && adduser -DH -h /home/nginx -s /sbin/nologin -u 1001 nginx
}

#
# change_id: 1.1
# restart nginx service
function restart_nginx() {
    echo "Restarting nginx..."
    supervisorctl restart nginx
}

#
# Install the lua package
#
function install_lua(){
    echo "Installing lua package "
    apk add --no-cache nginx-mod-http-lua
}

#
# Install node version manager
#
# https://dev.to/ajeetraina/installing-nodejs-14-on-alpine-linux-154m
function install_nodejs(){
    echo "Switching to /tmp dir"
    cd /tmp

    # uninstall older npm packages
    echo "Uninstalling older node and npm packages"
    apk del npm

    echo "Installing node version $VERSION build against musl / for alpine "
    echo "If you want to updaet this. Change the VERSION variable in $0"
    echo "-------"
    echo "Creating $INSTALL_DIR"
    mkdir -p $INSTALL_DIR
    wget https://unofficial-builds.nodejs.org/download/release/$VERSION/node-$VERSION-$DISTRO.tar.xz
    tar -xvf node-$VERSION-$DISTRO.tar.xz -C $INSTALL_DIR
    # add links to /usr/bin/
    echo "Adding symlinks to /usr/bin"
    ln -s $INSTALL_DIR/node-$VERSION-$DISTRO/bin/node /usr/bin/node
    ln -s $INSTALL_DIR/node-$VERSION-$DISTRO/bin/npm /usr/bin/npm
    ln -s $INSTALL_DIR/node-$VERSION-$DISTRO/bin/npx /usr/bin/npx
}

#
# Install npm
# DEPRECATED: If ran after installing nodejs it will replace nodejs binaries.
#
function install_npm(){
    echo "Installing npm"
    apk add npm 
}

#
# Install angular and npm packages
#
function install_npm_packages(){
    echo "Switching to /cometa_website dir"
    cd /cometa_website

    npm install -g @angular/cli
    npm i --save-dev @angular-devkit/build-angular@latest
    npm i # FIXME .. ask Arslan
}

#
# Build the project
#
function build_angular(){
    echo "Switching to /cometa_website dir"
    cd /cometa_website

    echo "Building project"
    [ ! -f /cometa_website/src/environments/environment.ts ] && { cp /cometa_website/src/environments/environment.prod.ts /cometa_website/src/environments/environment.ts; echo Copied environment.prod.ts; } || echo environment.ts exists
    ng build --aot --extract-licenses --build-optimizer --optimization --configuration production
}

#
# ng serve the project for development without exit
# ... this will start nginx in background
#
function ng_serve_project() {
    # start nginx in background
    /start.sh &
    # the ng server only works, if the $PATH variable is set correctly as seen at the beginning of this script
    ng serve --host 0.0.0.0 --port 4300 --disable-host-check
}

#
# Copy files to dist
#
function deploy_to_nginx(){
    echo "Switching to /cometa_website dir"
    cd /cometa_website

    echo "Copying files to dist"
    cp -r dist/cometa-rocks-website/* /var/www/html
}

#
# Set permissions back to nginx:nginx so next
# deployment won't fail
#
function change_owner(){
    chown -R nginx:nginx /cometa_website
}

# #########
# Outputs help on how to use the script.
# @params:
# #########
function help(){
	echo -ne "
${0} [OPTIONS]

OPTIONS:
	basic						fixes user permissions, installs lua for nginx, nodejs and npm
	compile						installs angular, npm packages, builds the project and deploys it to nginx document root
	full						runs both of the above options (basic and compile)
    serve                       runs ng serve

EXAMPLES:
	* Fresh install / Complete Deployment
	${0} full

	* Just update / Hot deployment
	${0} compile
"
	exit 10
}


# #########
# If no arguments are passed, show help
# #########
if [[ $# -eq 0 ]]; then
    echo "No arguments set ... nothing to do here."
    help
fi

# #########
# User arguments
# #########
while [[ $# -gt 0 ]]
do
    key="$1"
    case $key in
    full)
        fix_user # fix nginx user
        install_lua # install lua for nginx
        install_nodejs # install nodejs
        install_npm_packages # install npm packages
        build_angular # build angular project
        deploy_to_nginx # deploy to nginx document root
        change_owner # change owner permissions
        restart_nginx # restart nginx service
        exit 0;
        shift
        ;;
    basic)
        fix_user # fix nginx user
        install_lua # install lua for nginx
        install_nodejs # install nodejs
        shift
        ;;
    compile)
        install_npm_packages # install npm packages
        build_angular # build angular project
        deploy_to_nginx # deploy to nginx document root
        change_owner # change owner permissions
        restart_nginx # restart nginx service
        exit 0;
        shift
        ;;
    serve)
        ng_serve_project # ng serve this project 
        ;;
    *)    # unknown option
        echo "Unknown option ${key}, try again...";
        help
        shift # past argument
        ;;
    esac
done