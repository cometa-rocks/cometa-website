#!/bin/bash

### ---
### start.sh for cometa_website
### ---
# This script DOES NOT replace the default start.sh of the nginx container
# This script just prepares some dependcies to resolve issues with npm and other
# ---
# Changelog:
# 2021-12-22 RRO create
#

#
# Fix the users to 1000+1001
echo "Fixing users to 1000+1001"
deluser www-data && adduser -DH -h /home/www-data -s /sbin/nologin -u 1000 www-data
deluser nginx && adduser -DH -h /home/nginx -s /sbin/nologin -u 1001 nginx

#
# Install the lua package
#
echo "Installing lua package "
apk add --no-cache nginx-mod-http-lua

#
# Change directory to /tmp so the workdir folder 
# is not filled with nodejs compressed files 
#
echo "Switching to /tmp dir"
cd /tmp

#
# Install node version manager
#
# https://dev.to/ajeetraina/installing-nodejs-14-on-alpine-linux-154m
echo "Installing node version 14.4 build against musl / for alpine "
VERSION=v14.15.0
DISTRO=linux-x64-musl
INSTALL_DIR=/usr/local/lib/nodejs
mkdir -p $INSTALL_DIR
wget https://unofficial-builds.nodejs.org/download/release/$VERSION/node-$VERSION-$DISTRO.tar.xz
tar -xvf node-$VERSION-$DISTRO.tar.xz -C $INSTALL_DIR
export PATH=$INSTALL_DIR/node-$VERSION-$DISTRO/bin:$PATH
[ -f /usr/bin/node ] && mv /usr/bin/node /usr/bin/node_sic
[ -f /usr/bin/node ] && mv /usr/bin/npm /usr/bin/npm_sic
[ -f /usr/bin/node ] && mv /usr/bin/npx /usr/bin/npx_sic
ln -s $INSTALL_DIR/node-$VERSION-$DISTRO/bin/node /usr/bin/node
ln -s $INSTALL_DIR/node-$VERSION-$DISTRO/bin/npm /usr/bin/npm
ln -s $INSTALL_DIR/node-$VERSION-$DISTRO/bin/npx /usr/bin/npx

#
# Install npm
#
echo "Installing npm"
apk add npm 

npm install --prefix /usr/local -g @angular/cli
npm i --prefix /usr/local --save-dev @angular-devkit/build-angular@latest

#
# Change directory back so build can be done
#
echo "Switching to /cometa_website dir"
cd /cometa_website

#
# Build the project
#
echo "Building project"
[ ! -f /cometa_website/src/environments/environment.ts ] && { cp /cometa_website/src/environments/environment.prod.ts /cometa_website/src/environments/environment.ts; echo Copied environment.prod.ts; } || echo environment.ts exists
ng build --aot --extract-licenses --build-optimizer --optimization --configuration production

#
# Copy files to dist
#
echo "Copying files to dist"
cp -r dist/cometa-rocks-website/* /var/www/html
