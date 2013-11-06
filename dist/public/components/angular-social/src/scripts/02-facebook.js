app.directive('ngSocialFacebook', function() {
    'use strict';

    var options = {
        counter: {
            url: 'http://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22' +
                 '&callback=JSON_CALLBACK',
            getNumber: function(data) {
                return data.data[0].total_count;
            }
        },
        popup: {
//            url: 'http://www.facebook.com/sharer/sharer.php?u={url}',
//          url: 'http://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Btitle%5D=titlehere&amp;p%5Burl%5D=http%3A%2F%2Fwww.yoururlhere.com&amp;p%5Bsummary%5D=yoursummaryhere&amp;p%5Bimages%5D%5B0%5D=https://www.google.com/images/srpr/logo3w.png'
            url: 'http://www.facebook.com/sharer.php?s=100' +
                  '&p[url]={url}' +
                  '&p[images][0]={image}' +
                  '&p[title]={title}' +
                  '&p[summary]=In this blog, Arzumy will teach you how to rock!>Customized Share',
            width: 600,
            height: 500
        },
        track: {
            'name': 'facebook',
            'action': 'send'
        }
    };
    return {
        restrict: 'C',
        require: '^?ngSocialButtons',
        scope: true,
        replace: true,
        transclude: true,
        template: '<li>' +
                    '<a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)"' +
                        ' class="ng-social-button">' +
                        '<span class="ng-social-icon"></span>' +
                        '<span class="ng-social-text" ng-transclude></span>' +
                    '</a>' +
                    '<span ng-show="count" class="ng-social-counter">{{ count }}</span>' +
                   '</li>',
        link: function(scope, element, attrs, ctrl) {
            element.addClass('ng-social-facebook');
            if (!ctrl) {
                return;
            }
            scope.options = options;
            scope.ctrl = ctrl;
            ctrl.init(scope, element, options);
        }
    };
});