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

# 000 requires special editing of css to deal with long trims
#        ${TP} --smart-update Resources/000.tps
################################################

#        ${TP} --smart-update Resources/003.tps
        ${TP} --smart-update Resources/008.tps
        ${TP} --smart-update Resources/010.tps
#        ${TP} --smart-update Resources/011.tps
#        ${TP} --smart-update Resources/013.tps
#        ${TP} --smart-update Resources/014.tps

        ${TP} --smart-update Resources/085.tps
        ${TP} --smart-update Resources/087.tps
        ${TP} --smart-update Resources/088.tps
        ${TP} --smart-update Resources/089.tps
        ${TP} --smart-update Resources/091.tps

#        ${TP} --smart-update Resources/103.tps

#        ${TP} --smart-update Resources/111.tps
#        ${TP} --smart-update Resources/112.tps
#        ${TP} --smart-update Resources/114.tps
#        ${TP} --smart-update Resources/116.tps
#        ${TP} --smart-update Resources/118.tps

# 120 requires special editing of css to deal with long trims
#        ${TP} --smart-update Resources/120.tps
################################################
        ${TP} --smart-update Resources/300.tps
        ${TP} --smart-update Resources/301.tps
        ${TP} --smart-update Resources/302.tps
        ${TP} --smart-update Resources/303.tps
        ${TP} --smart-update Resources/304.tps
        ${TP} --smart-update Resources/305.tps


        ${TP} --smart-update Resources/406.tps
        ${TP} --smart-update Resources/407.tps
        ${TP} --smart-update Resources/408.tps
        ${TP} --smart-update Resources/410.tps
        ${TP} --smart-update Resources/411.tps
        ${TP} --smart-update Resources/412.tps

        ${TP} --smart-update Resources/body.tps
#        ${TP} --smart-update Resources/fabrics.tps
#        ${TP} --smart-update Resources/icons.tps




#        ${TP} --smart-update Resources/092.tps
#${TP} --smart-update Resources/108.tps
#${TP} --smart-update Resources/110.tps

#${TP} --smart-update Resources/113.tps

#${TP} --smart-update Resources/160.tps
#${TP} --smart-update Resources/161.tps
#${TP} --smart-update Resources/165.tps
#${TP} --smart-update Resources/166.tps
#${TP} --smart-update Resources/168.tps
#${TP} --smart-update Resources/169.tps
#${TP} --smart-update Resources/170.tps

#${TP} --smart-update Resources/306.tps
#${TP} --smart-update Resources/307.tps
#${TP} --smart-update Resources/308.tps
#${TP} --smart-update Resources/309.tps
#${TP} --smart-update Resources/310.tps
#${TP} --smart-update Resources/311.tps
#${TP} --smart-update Resources/312.tps
#${TP} --smart-update Resources/400.tps
#${TP} --smart-update Resources/401.tps
#${TP} --smart-update Resources/402.tps
#${TP} --smart-update Resources/403.tps
#${TP} --smart-update Resources/404.tps
#${TP} --smart-update Resources/405.tps
#        ${TP} --smart-update Resources/409.tps


        cp ${PROJECT_DIR}/${PROJECT}/output/images/* ${PROJECT_DIR}/${PROJECT}/output/images_final_opt

        exit 0
    else
        #if here the TexturePacker command line file could not be found
        echo "TexturePacker tool not installed in ${TP}"
        echo "skipping requested operation."
        exit 1
    fi

fi
exit 0