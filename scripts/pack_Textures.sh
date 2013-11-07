#! /usr/bin/env bash

PROJECT_DIR="/Users/Pete/dev/Sprites"
PROJECT="dressSprites"

TP="/usr/local/bin/TexturePacker/TexturePacker"
cd ${PROJECT_DIR}/${PROJECT}

if [ "${ACTION}" = "clean" ]; then
    echo "cleaning..."
    
    rm -f output/*.css
    rm -f output/*.png

    # ....
    # add all files to be removed in clean phase
    # ....
else
    #ensure the file exists
    if [ -f "${TP}" ]; then
        echo "building..."
        # create assets
        # ${TP} --smart-update Resources/test.tps
        
        ${TP} --smart-update Resources/000.tps
        ${TP} --smart-update Resources/003.tps
        ${TP} --smart-update Resources/008.tps
        ${TP} --smart-update Resources/010.tps
        ${TP} --smart-update Resources/011.tps
        ${TP} --smart-update Resources/013.tps
        ${TP} --smart-update Resources/014.tps
        ${TP} --smart-update Resources/085.tps
        ${TP} --smart-update Resources/087.tps
        ${TP} --smart-update Resources/088.tps
        ${TP} --smart-update Resources/089.tps
${TP} --smart-update Resources/103.tps
${TP} --smart-update Resources/108.tps
${TP} --smart-update Resources/110.tps
${TP} --smart-update Resources/111.tps
${TP} --smart-update Resources/112.tps
${TP} --smart-update Resources/113.tps
${TP} --smart-update Resources/114.tps
        ${TP} --smart-update Resources/120.tps
        ${TP} --smart-update Resources/160.tps
        ${TP} --smart-update Resources/161.tps
        ${TP} --smart-update Resources/165.tps
        ${TP} --smart-update Resources/166.tps
        ${TP} --smart-update Resources/168.tps
        ${TP} --smart-update Resources/169.tps
        ${TP} --smart-update Resources/170.tps
        ${TP} --smart-update Resources/body.tps

        cp ${PROJECT_DIR}/${PROJECT}/output/images cp ${PROJECT_DIR}/${PROJECT}/output/images_opt

        exit 0
    else
        #if here the TexturePacker command line file could not be found
        echo "TexturePacker tool not installed in ${TP}"
        echo "skipping requested operation."
        exit 1
    fi

fi
exit 0