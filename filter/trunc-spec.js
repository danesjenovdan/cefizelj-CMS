describe('trunc', function() {

	beforeEach(module('bunkerCms'));

	it('should ...', inject(function($filter) {

        var filter = $filter('trunc');

		expect(filter('input')).toEqual('output');

	}));

});