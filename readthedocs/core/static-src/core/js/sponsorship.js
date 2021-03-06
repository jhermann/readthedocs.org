/* Read the Docs - Documentation promotions */

var $ = window.$;

module.exports = {
    Promo: Promo
};

function Promo (text, link, image) {
    this.text = text;
    this.link = link;
    this.image = image;
    this.promo = null;
}

Promo.prototype.create = function () {
    var self = this,
        nav_side = $('nav.wy-nav-side');

    if (nav_side.length) {
        // Add elements
        promo = $('<div />')
            .attr('class', 'wy-menu rst-pro');

        // Promo info
        var promo_about = $('<div />')
            .attr('class', 'rst-pro-about');
        var promo_about_link = $('<a />')
            .attr('href', 'http://docs.readthedocs.org/en/latest/sponsors.html#sponsorship-information')
            .appendTo(promo_about);
        var promo_about_icon = $('<i />')
            .attr('class', 'fa fa-info-circle')
            .appendTo(promo_about_link);
        promo_about.appendTo(promo);

        // Promo image
        if (self.image) {
            var promo_image_link = $('<a />')
                .attr('class', 'rst-pro-image-wrapper')
                .attr('href', this.link);
            var promo_image = $('<img />')
                .attr('class', 'rst-pro-image')
                .attr('src', this.image)
                .appendTo(promo_image_link);
            promo.append(promo_image_link);
        }

        // Create link with callback
        var promo_text = $('<span />')
            .html(this.text);
        $(promo_text).find('a').each(function () {
            $(this)
                .attr('class', 'rst-pro-link')
                .attr('href', this.link)
                .attr('target', '_blank')
                .on('click', function (ev) {
                    if (_gaq) {
                        _gaq.push(
                            ['rtfd._setAccount', 'UA-17997319-1'],
                            ['rtfd._trackEvent', 'Promo', 'Click', self.variant]
                        );
                    }
                })
        });
        promo.append(promo_text);

        promo.appendTo(nav_side);

        promo.wrapper = $('<div />')
            .attr('class', 'rst-pro-wrapper')
            .appendTo(nav_side);

        return promo;
    }
}

// Position promo
Promo.prototype.display = function () {
    var promo = this.promo,
        self = this;

    if (! promo) {
        promo = this.promo = this.create();
    }
    promo.show();
}

Promo.prototype.disable = function () {
}

// Variant factory method
Promo.from_variants = function (variants) {
    var chosen = Math.floor(Math.random() * variants.length),
        variant = variants[chosen],
        text = variant.text,
        link = variant.link,
        image = variant.image,
        id = variant.id,
        promo = new Promo(text, link, image);
    promo.variant = id
    return promo;
};
