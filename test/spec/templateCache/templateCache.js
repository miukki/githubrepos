describe('Testing: be sure all template is exist', function() {
	'use strict';

		var routes, templateCache, _;

	  function fail (x, errCB) {
	    if (!x) {
	      errCB();
	    }
	  }

	

  	function getTmpls(templateUrl){
  		var urls = [];

  		if (!templateUrl) {
  			return [];
  		}

  		urls.push(templateUrl);

  		var tmplBody = templateCache.get(templateUrl);

			//check hidden templates. e.g: ng-include:
			if (tmplBody) {
				var match = tmplBody.match(/((\w+)\/?(\w+))+(\.(tmpl))/g);
				if (typeof match === 'object' && Array.isArray(match)) {
					
					match = _.uniq(match);
					match = getTmplsUtil(match); //took all in tmpls=, ng-include.. templates
					
					urls = [].concat(urls, match);
				}
			}
			
			return urls;
  	}

  	function getTmplsUtil (input) {
			var output = [];

			_.forEach(input, function(uri){
		  	output = output.concat(getTmpls(uri));
				output = _.uniq(output);
			});

			return output;
  	}

  	function runTest(templateUrl) {
			//replace(/[']/g, '')  		

  		var tmplBody = templateCache.get(templateUrl);

  		fail(!!tmplBody, function(){
  			throw new TypeError('Error loading for template: ' + templateUrl);
  		});


  		expect(tmplBody).not.toBeUndefined();

  	}

		beforeEach(module('App'));


    beforeEach(inject(function($templateCache, $route, _lodash_) {
	    templateCache = $templateCache;//.get('url');
	    routes =  $route && $route.routes;
	    _ = _lodash_;

    }));



		it('test templateCache', function() {

			var urls = _.filter(_.map(routes, function(config){
				return config.templateUrl;
			}), function(item){
				return item !== undefined;
			});

			urls = getTmplsUtil(urls); //take all unique templateUrls

			_.forEach(urls, function(uri){
				runTest(uri);
			});

		});



});