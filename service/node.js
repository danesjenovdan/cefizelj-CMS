angular.module('bunkerCms').factory('NodeService',function(Restangular) {

	var node = {
        data:{
          all:[],
          current:{},
          tree:[],
            raw:{}
        },
        getRootNodes:function(){

            return Restangular.all('nodes').getList();

        },
        getTree:function(cb){


            console.log('get tree');
            var self = this;
            var promise = Restangular.one('node').one('tree').get();

            promise.then(function(res){

                console.log(res);
                self.data.tree = res.tree;
                self.data.raw = res;
                if(cb){
                    cb(res);
                }

            });

            return promise;

        },
        saveNode:function(node, cb){

            var self = this;
            var el = Restangular.restangularizeElement(null,node,'node');

            var promise = el.put();

            promise.then(function(res){

                console.log(res);

                if(cb){
                    self.updateInTree(node._id,node, function(item){
                        console.log(item);

                    });
                    cb(res);
                }

            });

            return promise;

        },
        deleteNode:function(id, cb){

            var self = this;
            var promise = Restangular.one('node',id).remove();
            promise.then(function(res){

                self.findInTree(res, function(item, items){

                    console.log(item, items);

                    for(var i=0;i<items.length;i++){
                        if(items[i]._id === id){
                            items.splice(i,1);
                        }
                    }

                });

                if(cb){

                    cb(res);
                }
            });

            return promise;

        },
        updateInTree:function(id, data, cb){

            var self = this;

            var parseBranch = function(branch){

                for(var i=0;i<branch.length;i++){

                    var b = branch[i];

                    if(b._id === id){
                        branch[i] = data;

                        cb(b, branch);
                    }

                    if(b.items){
                        if(b.items.length > 0){
                            parseBranch(b.items);
                        }
                    }

                }

            };

            parseBranch(self.data.tree);

        },
        findInTree:function(id, cb){

            var self = this;

            var parseBranch = function(branch){

                for(var i=0;i<branch.length;i++){

                    var b = branch[i];

                    if(b._id === id){
                        cb(b, branch);
                    }

                    if(b.items){
                        if(b.items.length > 0){
                            parseBranch(b.items);
                        }
                    }

                }

            };

            parseBranch(self.data.tree);


        },
        sortNodes:function(array, cb){


            var self = this;
            var promise = Restangular.all('sort').post(array);

            promise.then(function(res){
                if(cb){
                    cb(res);
                }
                console.log(res);
            });

            return promise;


        },
        createMenu:function(node, cb){


            var self = this;
            var promise = Restangular.all('node').post(node);

            promise.then(function(res){
                console.log(res);
                //self.data.tree = res.tree;
               // self.data.raw = res;
                res.items = [];
                if(cb){
                    cb(res);
                }

            });

            return promise;

        },
        createPage:function(page, cb){

            var self = this;
            var promise = Restangular.all('node').post(page);

            promise.then(function(res){

                console.log(res);
                res.items = [];
                //self.data.tree = res.tree;
                //self.data.raw = res;

                if(cb){
                    cb(res);
                }

            });

            return promise;

        }
    };

	return node;
});