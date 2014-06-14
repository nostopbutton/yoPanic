
fcc.events.cart.preprocess.add(function(e, arr) {
    if (arr['cart'] == 'checkout' || arr['cart'] == 'updateinfo' || arr['output'] == 'json') {
    return true;
    }
    if (arr['cart'] == 'checkout_paypal_express') {
    ga('send', 'pageview', '/paypal_checkout', {
    'hitCallback': function() {
    jQuery.getJSON('https://' + document.domain + '/cart?' + fcc.session_get() + '&h:_fcpm=paypal|cart&output=json&callback=?', function(cart) {
    fcc.events.cart.preprocess.resume();
    });
    }
    });
    return (typeof ga === "function") ? "pause" : true;
    }
    return true;
    });

fcc.events.cart.process.add_pre(function(e, arr) {
    ga(function(tracker) {
        jQuery.getJSON('https://' + storedomain + '/cart?' + fcc.session_get() + '&h:ga=' + escape(tracker.get('clientId')) + '&output=json&callback=?', function(data){
            fcc.events.cart.process.resume();
        });
    });
    return (typeof ga === "function") ? "pause" : true;
    });
