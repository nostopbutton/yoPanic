'use strict';

describe("ReferenceDataService", function() {
    var CatalogueService, Range, DesignBuilder, $httpBackend;

    beforeEach(module("panicApp.referenceDataServices"))
    beforeEach(inject(function(_CatalogueService_, _Range_, _DesignBuilder_,  _$httpBackend_) {
        CatalogueService = _CatalogueService_;
        Range = _Range_;
        DesignBuilder = _DesignBuilder_;
        $httpBackend = _$httpBackend_;
//        jasmine.getJSONFixtures().fixturesPath='base/app/referenceData';
        $httpBackend.whenGET("referenceData/styleCatalogue.json")
//            .respond(getJSONFixture('styleCatalogue.json'))
            .respond(200, styleCatalogueJSON);
        $httpBackend.whenGET("referenceData/designBuilder/sheath.json")
            .respond(200, sheathJSON);
        $httpBackend.whenGET("referenceData/designBuilder/swing.json")
            .respond(200, swingSON);
    }))

    xdescribe("DesignBuilderFactory", function() {
        it("should return full config for 'sheath' style", function() {
            var designConfig, styleId = 'sheath';

            DesignBuilder.get({fileId: styleId}).$promise.then(function (result) {
                designConfig = result
            })
            $httpBackend.flush();

            expect(designConfig.id).toEqual(styleId)
            expect(designConfig.style.name).toEqual('Coco')
            expect(designConfig.design.model).toEqual('strap-whole-body')
            expect(designConfig.collection.length).toBe(2)
            expect(designConfig.collection[0].itemId).toEqual('sh-1')
            expect(designConfig.collection[1].itemId).toEqual('sh-2')
        })

        it("should return full config for 'swing' style", function() {
            var designConfig, styleId = 'swing';

            DesignBuilder.get({fileId: styleId}).$promise.then(function (result) {
                designConfig = result
            })
            $httpBackend.flush();

            expect(designConfig.id).toEqual(styleId)
            expect(designConfig.style.name).toEqual('Audrey')
            expect(designConfig.design.model).toEqual('strap-whole-body')
            expect(designConfig.collection.length).toBe(2)
            expect(designConfig.collection[0].itemId).toEqual('sw-1')
            expect(designConfig.collection[1].itemId).toEqual('sw-2')
        })
    })

    xdescribe("RangeFactory", function() {
        it("should return full style catalogue", function() {
            var styleCat, styleIds = [];

            Range.styleCatalogue().$promise.then(function (result) {
                styleCat = result;
            })
            $httpBackend.flush();

            expect(styleCat.length).toBe(2);

            angular.forEach(styleCat, function (style) {
                styleIds = styleIds.concat(style.styleId);
            });
            expect(styleIds).toEqual([ 'sheath', 'swing' ])
        })
    })



    ddescribe("CatalogueService", function() {
        it("should return a list of styles", function() {
            var stylesPromise = CatalogueService.getStyleListPromise();
            var styles = [];

            stylesPromise.then(function(result) {  // this is only run after $http completes
                styles = result;
            });
            $httpBackend.flush();

            expect(styles).toEqual([ 'sheath', 'swing' ])
        })

        it("should return aggregated list of items for specified styles", function() {
            var itemsPromise = CatalogueService.getItemCollectionPromiseForStyles( ['sheath', 'swing' ]);
            var items = [], itemIds = [];

            itemsPromise.then(function(result) {  // this is only run after $http completes
                items = result;
            });
            $httpBackend.flush();

            expect(items.length).toBe(4);

            angular.forEach(items, function (item) {
                itemIds = itemIds.concat(item.itemId);
            });
            expect(itemIds).toEqual([ 'sh-1', 'sh-2', 'sw-1', 'sw-2' ])
        })

        it("should return aggregated list of items extended with style info for specified styles", function() {
            var itemsPromise = CatalogueService.getItemCollectionWithStyleDataPromiseForStyles( ['sheath', 'swing' ]);
            var items = [], itemIds = [], styleName = [];

            itemsPromise.then(function(result) {  // this is only run after $http completes
                items = result;
            });
            $httpBackend.flush();

            expect(items.length).toBe(4);

            angular.forEach(items, function (item) {
                itemIds = itemIds.concat(item.itemId);
            });
            expect(itemIds).toEqual([ 'sh-1', 'sh-2', 'sw-1', 'sw-2' ])

            angular.forEach(items, function (item) {
                styleName = styleName.concat(item.styleName);
            });
            expect(styleName).toEqual([ 'Coco', 'Coco', 'Audrey', 'Audrey' ])
        })

        it("should find a single item from the catalogue", function() {
            var itemPromise = CatalogueService.getItemPromise( 'sheath', 'sh-1' );
            var item, itemIds = [], styleName = [];

            itemPromise.then(function(result) {  // this is only run after $http completes
                item = angular.copy(result);
            });
            $httpBackend.flush();

//            expect(item.collection).toBeUndefined();
            // Item data
            expect(item.itemDesign.itemId).toEqual('sh-1')
            expect(item.itemDesign.itemDesc).toEqual('Sheath dress - Red')
            expect(item.itemDesign.itemDesign.design.neckline.id).toEqual('009')
            // Style data
            expect(item.style.styleId).toEqual('sheath')
            expect(item.style.styleName).toEqual('Coco')
            expect(item.style.price).toEqual(2000)
            // Design data
            expect(item.design.model).toEqual('strap-whole-body')
            expect(item.design.options[0].parts[0].type).toEqual('nek')

        })

    })

var styleCatalogueJSON =         [
    {
        "styleId": "sheath"
        , "type": "dress"
        , "styleName": "Coco"
        , "styleFormalName": "Sheath Dress"
        , "shortDesc": "Our signature dress impeccably tailored cut of the sheath dress flatters your curves by defining your waist and highlighting your calves to give you a perfect hourglass shape. "
        , "strapline": "Turn heads in this classic tailored dress."
        , "description": [ "Whether you choose dark colours or bold colours. our crepe fabric will give you a sophisticated day look.  Add glamour with leather trim or sequin detail for a sassy nighttime vibe. "
        , "Highlight your striking silhouette with killer heels and contrasting obi belt."]
        , "care": [ "Look after it"
        , "And it will last" ]
        , "price": 2000
        , "dressSizes": [10,12,14,16,18]
        , "silhouetteImage": "pat-301-body"
        , "foxyImage": "pat-301"
        , "fc_category": "category||f0413cfa2afa3244e16b1d1893e138c9669316c8a3597fb9c34b6ab99826ab54"
        , "fc_code": "code||2a36651dbfd988e00f18a02e5cbdee7dd867168bb305909c496517204d25ae31"
        , "fc_name": "name||1ed77a1b465d0eaddf3698675b57a2dc8e68696dfe4cf49c551c0d996627c68d"
        , "fc_price": "price||4532e694c6ddc3eee9c7e0ee4acc44f217e18c0ff770697b3bd8e3ec63245fc8"
        , "fc_image": "image||df0c77da9365f3d26c8a2d802c694dfb8eeb89cd5425e9b7e72e1fbf4ea3aeb8||open"
        , "fc_url": "url||2ab1d7cf48d9afe991ac5769fbb34300fd3280c48e55055251d58f8a24921f8d||open"
        , "fc_neckline": "neckline||df5b3e809f1583f528a7b49cc219475db6da209ddbe94767b39f705ef9f4d4b1||open"
        , "fc_sleeves": "sleeves||0a23da813c947351c1edca32042b6d495e21f6f96f35fd907b91480ed64770a9||open"
        , "fc_skirt": "skirt||15dc71987ad145e53fe8364dc4a6b55f079d3e99f8212abcf5c44a4ed2f977f4||open"
        , "fc_peplum": "peplum||bc1407ab12dd24e1862c177e9424492dd11fdf11cd0f50a29359992de726f4ab||open"
        , "fc_rosetta": "rosetta||fb4acd6b327a36b8340ee8b97d25231d441ba0602c703de4f93ed620dd0414eb||open"
        , "fc_belt": "belt||34062ce199df92f8e205c6b1aaef4c7b7e399b92f185cf1466d89e225928a8ac||open"
    }
    , {
        "styleId": "swing"
        , "type": "dress"
        , "styleName": "Audrey"
        , "styleFormalName": "Swing Dress"
        , "shortDesc": "Our classic sheath with perfectly positioned ruffles to draw the eyes to all the right places."
        , "strapline": "Your ultimate wardrobe essential, now impeccably tailored using a classic haute couture cut. "
        , "description": [ "Experiment with colours and trims to define your style and add a belt to really enhance your waist."
            , "Perfect with killer heels for a timeless show stopping look."]
        , "care": [ "Look after it"
            , "And it will last" ]
        , "price": 2000
        , "silhouetteImage": "pat-304-body"
        , "foxyImage": "pat-304"
        , "fc_category": "category||05be67359dd9dfc344935dd39b55945810a66efe99555234f7153ad1084b5f17"
        , "fc_code": "code||ae669290b7afe449027d32791d0de6ac732125ac615bce0db30c8fd5ea0157cf"
        , "fc_name": "name||adbb1f7b19be2e806ee7732ecb290dc54205abaf0a02809cb74c1e95c264cb87"
        , "fc_price": "price||aaad0f9617d3549a8aa950dd152eecae2811078c0806bdec110e201c0dd3ee5b"
        , "fc_image": "image||80c38c433856f7b1e23fb4ffe6e9819d0a5561266d0b971d5302c3d10c617e6a||open"
        , "fc_url": "url||95d7696a8bb8f60541a0e5f4651f5960dd3493633203c6039efd8bc2183e9255||open"
        , "fc_neckline": "neckline||46dfb3a7089aa5ccb84b34ba4d71396faab5c364ed9a8194ad27391727d5119b||open"
        , "fc_sleeves": "sleeves||f6db1dea6572aa92dd0110b5be09b14bdd093db30ea45b76e58fdbfb2f7c9f86||open"
        , "fc_skirt": "skirt||e16f8737dad968e1570342368d3cc8868498b0241da6161b08dde7746d2ce270||open"
        , "fc_peplum": "peplum||2241e7d783d7fb856d5aaf699c7b2862ae09995cb96446bb71aa3f52958c1a36||open"
        , "fc_rosetta": "rosetta||235a9134b4deb226b7e7b11aa7ce53bbe9e4dd75ccbc465ceb8ff2f331407a6a||open"
        , "fc_belt": "belt||7af78b54679a3a671c02c4e93523e90c6b4437f4a988ff4e2b056ae06c78c35f||open"
    }
]

    var sheathJSON =
    {

    "style":
    {
        "styleId": "sheath"
        , "type": "dress"
        , "styleName": "Coco"
        , "styleFormalName": "Sheath Dress"
        , "shortDesc": "Our signature dress impeccably tailored cut of the sheath dress flatters your curves by defining your waist and highlighting your calves to give you a perfect hourglass shape. "
        , "strapline": "Turn heads in this classic tailored dress."
        , "description": [ "Whether you choose dark colours or bold colours. our crepe fabric will give you a sophisticated day look.  Add glamour with leather trim or sequin detail for a sassy nighttime vibe. "
        , "Highlight your striking silhouette with killer heels and contrasting obi belt."]
        , "care": [ "Look after it"
        , "And it will last" ]
        , "price": 2000
        , "dressSizes": [10,12,14,16,18]
        , "silhouetteImage": "pat-301-body"
        , "foxyImage": "pat-301"
        , "fc_category": "category||f0413cfa2afa3244e16b1d1893e138c9669316c8a3597fb9c34b6ab99826ab54"
        , "fc_code": "code||2a36651dbfd988e00f18a02e5cbdee7dd867168bb305909c496517204d25ae31"
        , "fc_name": "name||1ed77a1b465d0eaddf3698675b57a2dc8e68696dfe4cf49c551c0d996627c68d"
        , "fc_price": "price||4532e694c6ddc3eee9c7e0ee4acc44f217e18c0ff770697b3bd8e3ec63245fc8"
        , "fc_image": "image||df0c77da9365f3d26c8a2d802c694dfb8eeb89cd5425e9b7e72e1fbf4ea3aeb8||open"
        , "fc_url": "url||2ab1d7cf48d9afe991ac5769fbb34300fd3280c48e55055251d58f8a24921f8d||open"
        , "fc_neckline": "neckline||df5b3e809f1583f528a7b49cc219475db6da209ddbe94767b39f705ef9f4d4b1||open"
        , "fc_sleeves": "sleeves||0a23da813c947351c1edca32042b6d495e21f6f96f35fd907b91480ed64770a9||open"
        , "fc_skirt": "skirt||15dc71987ad145e53fe8364dc4a6b55f079d3e99f8212abcf5c44a4ed2f977f4||open"
        , "fc_peplum": "peplum||bc1407ab12dd24e1862c177e9424492dd11fdf11cd0f50a29359992de726f4ab||open"
        , "fc_rosetta": "rosetta||fb4acd6b327a36b8340ee8b97d25231d441ba0602c703de4f93ed620dd0414eb||open"
        , "fc_belt": "belt||34062ce199df92f8e205c6b1aaef4c7b7e399b92f185cf1466d89e225928a8ac||open"
    }
        , "design":
    {
        "model": "strap-whole-body"
        , "options": [
        {
            "option_name": "design"
            , "parts": [
            {
                "part_name": "neckline"
                , "type": "nek"
                , "active": "true"
                , "label": "Neckline"
                , "fabricSets": [ {"setId": "s-vc"}]
                , "values": [
                {"id": "001", "name": "bateau"}
                , {"id": "002", "name": "scoop"}
                , {"id": "003", "name": "v-slit"}
                , {"id": "004", "name": "wrap"}
            ]
                , "size": false
                , "trim": true
                , "trimFabricSets": [{"setId": "x-fl"}]
            }
            ,{
                "part_name": "sleeves"
                , "type": "slv"
                , "label": "Sleeves"
                , "fabricSets": [ {"setId": "s-vc"}, {"setId": "x-fl"}]
                , "null_value": "000"
                , "values": [
                    {"id": "000", "name": "none"}
                    , {"id": "002", "name": "cap"}
                    , {"id": "006", "name": "elbow"}
                    , {"id": "009", "name": "flared"}
                ]
            }
            ,{
                "part_name": "skirt"
                , "type": "skt"
                , "label": "Skirt"
                , "fabricSets": [ {"setId": "s-vc"}, {"setId": "x-fl"}]
                , "values": [
                    {"id": "001", "name": "pencil"}
                    , {"id": "002", "name": "ruffle"}
                ]
                , "size": true
                , "sizes": [
                    {"id": "01", "name": "short"}
                    , {"id": "02", "name": "knee"}
                    , {"id": "04", "name": "long"}
                ]
                , "trim": false
            }
        ]
        }]
        , "extras": [
        {
            "name": "extras"
            , "label": "Extras"
            , "active": "true"
            , "parts": [
            {
                "part_name": "peplum"
                , "type": "ext"
                , "label": "Peplum"
                , "fabricSets": [ {"setId": "s-vc"}, {"setId": "x-fl"}]
                , "values": [
                {"id": "002", "name": "peplum", "defaultFabric": "011", "fabricSets": [ {"setId": "s-vc"}]}
            ]
            }
            , {
                "part_name": "rosetta"
                , "type": "ext"
                , "label": "Rosetta"
                , "fabricSets": [ {"setId": "s-vc"}, {"setId": "x-fl"}]
                , "values": [
                    {"id": "003", "name": "rosetta", "defaultFabric": "011", "fabricSets": [ {"setId": "s-vc"}]}
                ]
            }
            , {
                "part_name": "belt"
                , "type": "blt"
                , "active": "true"
                , "label": "Belt"
                , "values": [
                    {"id": "002", "name": "Ribbon belt", "defaultFabric": "008", "fabricSets": [ {"setId": "x-pt"}]}
                    , {"id": "004", "name": "Obi belt", "defaultFabric": "111", "fabricSets": [ {"setId": "x-l"}]}

                ]
            }
        ]}
    ]
        , "default": {
        "design": {
            "neckline":   {"type": "nek", "id": "001", "size": "00", "fabric": "013"}
            , "sleeves":  {"type": "slv", "id": "009", "size": "00", "fabric": "013"}
            , "skirt":    {"type": "skt", "id": "001", "size": "02", "fabric": "013"}
        }
        , "extras": {
            "belt":    {"type": "blt", "id": "002", "size": "00", "fabric": "000", "code": "000-000"},
            "peplum":  {"type": "ext", "id": "002", "size": "00", "fabric": "000", "code": "000-000"},
            "rosetta": {"type": "ext", "id": "003", "size": "00", "fabric": "000", "code": "000-000"}
        }
    }
    }
        , "collection":
        [
            {
                "itemId": "sh-1"
                , "itemDesc": "Sheath dress - Red"
                , "itemDesign": {
                "design": {
                    "neckline":   {"type": "nek", "id": "009", "size": "00", "fabric": "003", "trim": ""}
                    , "sleeves":  {"type": "slv", "id": "001", "size": "00", "fabric": "003", "trim": ""}
                    , "skirt":    {"type": "skt", "id": "030", "size": "02", "fabric": "003", "trim": ""}
                }
                , "extras": {
                    "belt":    {"type": "blt", "id": "002", "size": "00", "fabric": "000", "code": "000-000"},
                    "peplum":  {"type": "ext", "id": "002", "size": "00", "fabric": "000", "code": "000-000"},
                    "rosetta": {"type": "ext", "id": "003", "size": "00", "fabric": "000", "code": "000-000"}
                }
            }
            }
            , {
            "itemId": "sh-2"
            , "itemDesc": "Sheath dress - Black"
            , "itemDesign": {
                "design": {
                    "neckline":   {"type": "nek", "id": "009", "size": "00", "fabric": "010", "trim": ""}
                    , "sleeves":  {"type": "slv", "id": "001", "size": "00", "fabric": "010", "trim": ""}
                    , "skirt":    {"type": "skt", "id": "030", "size": "02", "fabric": "010", "trim": ""}
                }
                , "extras": {
                    "belt":    {"type": "blt", "id": "004", "size": "00", "fabric": "121", "code": "000-000"},
                    "peplum":  {"type": "ext", "id": "002", "size": "00", "fabric": "000", "code": "000-000"},
                    "rosetta": {"type": "ext", "id": "003", "size": "00", "fabric": "000", "code": "000-000"}
                }
            }
        }
        ]
    }


    var swingSON =
    {

        "style":
    {
        "styleId": "swing"
        , "type": "dress"
        , "styleName": "Audrey"
        , "styleFormalName": "Swing Dress"
        , "shortDesc": "Our classic sheath with perfectly positioned ruffles to draw the eyes to all the right places."
        , "strapline": "Your ultimate wardrobe essential, now impeccably tailored using a classic haute couture cut. "
        , "description": [ "Experiment with colours and trims to define your style and add a belt to really enhance your waist."
        , "Perfect with killer heels for a timeless show stopping look."]
        , "care": [ "Look after it"
        , "And it will last" ]
        , "price": 2000
        , "dressSizes": [10,12,14,16,18]
        , "silhouetteImage": "pat-304-body"
        , "foxyImage": "pat-304"
        , "fc_category": "category||05be67359dd9dfc344935dd39b55945810a66efe99555234f7153ad1084b5f17"
        , "fc_code": "code||ae669290b7afe449027d32791d0de6ac732125ac615bce0db30c8fd5ea0157cf"
        , "fc_name": "name||adbb1f7b19be2e806ee7732ecb290dc54205abaf0a02809cb74c1e95c264cb87"
        , "fc_price": "price||aaad0f9617d3549a8aa950dd152eecae2811078c0806bdec110e201c0dd3ee5b"
        , "fc_image": "image||80c38c433856f7b1e23fb4ffe6e9819d0a5561266d0b971d5302c3d10c617e6a||open"
        , "fc_url": "url||95d7696a8bb8f60541a0e5f4651f5960dd3493633203c6039efd8bc2183e9255||open"
        , "fc_neckline": "neckline||46dfb3a7089aa5ccb84b34ba4d71396faab5c364ed9a8194ad27391727d5119b||open"
        , "fc_sleeves": "sleeves||f6db1dea6572aa92dd0110b5be09b14bdd093db30ea45b76e58fdbfb2f7c9f86||open"
        , "fc_skirt": "skirt||e16f8737dad968e1570342368d3cc8868498b0241da6161b08dde7746d2ce270||open"
        , "fc_peplum": "peplum||2241e7d783d7fb856d5aaf699c7b2862ae09995cb96446bb71aa3f52958c1a36||open"
        , "fc_rosetta": "rosetta||235a9134b4deb226b7e7b11aa7ce53bbe9e4dd75ccbc465ceb8ff2f331407a6a||open"
        , "fc_belt": "belt||7af78b54679a3a671c02c4e93523e90c6b4437f4a988ff4e2b056ae06c78c35f||open"
    }
        , "design":
    {
        "model": "strap-whole-body"
        , "options": [
        {
            "option_name": "design"
            , "active": "true"
            , "label": "Customize"
            , "parts": [
            {
                "part_name": "neckline"
                , "type": "nek"
                , "active": "true"
                , "label": "Neckline"
                , "fabricSets": [{"setId": "s-vc"}]
                , "values": [
                {"id": "001", "name": "bateau"}
                , {"id": "002", "name": "scoop"}
                , {"id": "003", "name": "v-slit"}
                , {"id": "004", "name": "wrap"}
            ]
                , "size": false
                , "trim": true
                , "trimFabricSets": [{"setId": "x-fl"}]
            }
            ,{
                "part_name": "sleeves"
                , "type": "slv"
                , "label": "Sleeves"
                , "fabricSets": [ {"setId": "s-vc"}, {"setId": "x-fl"}]
                , "null_value": "000"
                , "values": [
                    {"id": "000", "name": "none"}
                    , {"id": "002", "name": "cap"}
                    , {"id": "006", "name": "elbow"}
                    , {"id": "009", "name": "flared"}
                ]
            }
            ,{
                "part_name": "skirt"
                , "type": "skt"
                , "label": "Skirt"
                , "fabricSets": [ {"setId": "s-vc"}, {"setId": "x-fl"}]
                , "values": [
                    {"id": "005", "name": "swing"}
                ]
                , "size": true
                , "sizes": [
                    {"id": "01", "name": "short"}
                    , {"id": "02", "name": "knee"}
                    , {"id": "04", "name": "long"}
                ]
                , "trim": false
            }
        ]
        }]
        , "extras": [
        {
            "name": "extras"
            , "label": "Extras"
            , "active": "true"
            , "parts": [
            {
                "part_name": "rosetta"
                , "type": "ext"
                , "label": "Rosetta"
                , "fabricSets": [ {"setId": "s-vc"}, {"setId": "x-fl"}]
                , "values": [
                {"id": "003", "name": "rosetta", "defaultFabric": "011", "fabricSets": [ {"setId": "s-vc"}]}
            ]
            }
            ,       {
                "part_name": "belt"
                , "type": "blt"
                , "active": "true"
                , "label": "Belt"
                , "values": [
                    {"id": "002", "name": "Ribbon belt", "defaultFabric": "008", "fabricSets": [ {"setId": "x-pt"}]}
                    , {"id": "004", "name": "Obi belt", "defaultFabric": "111", "fabricSets": [ {"setId": "x-l"}]}
                ]
            }

        ]}
    ]
        , "default": {
        "design": {
            "neckline":   {"type": "nek", "id": "002", "size": "00", "fabric": "011"}
            , "skirt":    {"type": "skt", "id": "005", "size": "02", "fabric": "011"}
            , "sleeves":  {"type": "slv", "id": "000", "size": "00", "fabric": "011"}
        }
        , "extras": {
            "belt":    {"type": "blt", "id": "000", "size": "00", "fabric": "000", "code": "000-000"},
            "rosetta": {"type": "ext", "id": "000", "size": "00", "fabric": "000", "code": "000-000"}
        }
        , "dressSize": 12
        , "model": "strap-whole-body"
    }
    }
        , "collection":
        [
            {
                "itemId": "sw-1"
                , "itemDesc": "Sheath dress - Red"
                , "itemDesign": {
                "design": {
                    "neckline":   {"type": "nek", "id": "009", "size": "00", "fabric": "003", "trim": ""}
                    , "sleeves":  {"type": "slv", "id": "001", "size": "00", "fabric": "003", "trim": ""}
                    , "skirt":    {"type": "skt", "id": "030", "size": "02", "fabric": "003", "trim": ""}
                }
                , "extras": {
                    "belt":    {"type": "blt", "id": "002", "size": "00", "fabric": "000", "code": "000-000"},
                    "peplum":  {"type": "ext", "id": "002", "size": "00", "fabric": "000", "code": "000-000"},
                    "rosetta": {"type": "ext", "id": "003", "size": "00", "fabric": "000", "code": "000-000"}
                }
            }
            }
            , {
            "itemId": "sw-2"
            , "itemDesc": "Sheath dress - Black"
            , "itemDesign": {
                "design": {
                    "neckline":   {"type": "nek", "id": "009", "size": "00", "fabric": "010", "trim": ""}
                    , "sleeves":  {"type": "slv", "id": "001", "size": "00", "fabric": "010", "trim": ""}
                    , "skirt":    {"type": "skt", "id": "030", "size": "02", "fabric": "010", "trim": ""}
                }
                , "extras": {
                    "belt":    {"type": "blt", "id": "004", "size": "00", "fabric": "121", "code": "000-000"},
                    "peplum":  {"type": "ext", "id": "002", "size": "00", "fabric": "000", "code": "000-000"},
                    "rosetta": {"type": "ext", "id": "003", "size": "00", "fabric": "000", "code": "000-000"}
                }
            }
        }
        ]
    }


})