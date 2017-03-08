function trackMixpanel() {

    var referrer = {
         "referrer": document.referrer
    };

    var track = function(element, tag, refer = referrer) {
        mixpanel.track_links(element, tag, refer);
    }

    // About links
    track(".link-pdf", "View/Download Resume");
    track(".link-linkedin", "Viewed LinkedIn");
    track(".link-github", "Viewed GitHub");

    // Project clicks
    track("#rh_link", "Viewed RealHer");
    track("#tg_link", "Viewed TrueGirl");
    track("#sk_link", "Viewed Skin");
    track("#nn_link", "Viewed Noggin");
    track("#acommerce_link", "Viewed Angular Commerce");
    track("#prom_link", "Viewed Promathius");
    track("#shopify_link", "Viewed Shopify");
}
