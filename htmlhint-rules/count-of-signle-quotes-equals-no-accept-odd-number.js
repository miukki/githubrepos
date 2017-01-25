var HTMLHint  = require('htmlhint').HTMLHint;

module.exports = {
    init: initRule 
};

function initRule () {

    HTMLHint.addRule({
        id: 'count-of-signle-quotes-equals-no-accept-odd-number',
        description: 'Attribute values must be in double quotes.',
        init: function(parser, reporter){
            var self = this;
            parser.addListener('tagstart', function(event){
                var attrs = event.attrs,
                    attr,
                    col = event.col + event.tagName.length + 1;
                for (var i=0, l=attrs.length; i<l; i++) {
                    attr = attrs[i];
                    if((attr.value !== '' && attr.quote !== '"') ||
                        (attr.value === '' && attr.quote === "'") || 
                          (attr.quote === '"' && attr.value !== '' && attr.value.match(/[']/g) && !(attr.value.match(/[']/g).length%2==0))
                        ){

                        reporter.error('The value of attribute [ '+attr.name+' ] not accept value contain\'s single quote and count of signle quotes equals odd number.', event.line, col + attr.index, self, attr.raw);
                    }
                }
            });
        }
    });

}

