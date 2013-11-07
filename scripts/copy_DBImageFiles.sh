#! /usr/bin/env bash

PROJECT_DIR="/Users/Pete/dev/Sprites"
PROJECT="DesignBuilder"

DROPBOX='/Users/Pete/Dropbox/letsgetfabulous/AURZA/website/productImages/designBuilder'
DROPBOX_BODY='/Users/Pete/Dropbox/letsgetfabulous/AURZA/website/productImages/body'
MISSING='/Users/Pete/dev/Sprites/missing'

# check directory exists
if [ -d "${PROJECT_DIR}/${PROJECT}" ]; then

    echo "cleaning ${PROJECT_DIR}/${PROJECT}..."
    rm -fv ${PROJECT_DIR}/${PROJECT}/*

else
    echo "Creating directory ${PROJECT_DIR}/${PROJECT}..."
    mkdir ${PROJECT_DIR}/${PROJECT}
fi

echo "Copying files..."
echo "From: ${DROPBOX}"
echo "To: ${PROJECT_DIR}/${PROJECT}"
cp -v ${DROPBOX}/* ${PROJECT_DIR}/${PROJECT}

echo "Copying files..."
echo "From: ${DROPBOX_BODY}"
echo "To: ${PROJECT_DIR}/${PROJECT}"
cp -v ${DROPBOX_BODY}/* ${PROJECT_DIR}/${PROJECT}

exit 0