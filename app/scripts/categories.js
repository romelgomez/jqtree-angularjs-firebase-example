'use strict';

angular.module('tree',['ngMessages','cgBusy','jlareau.pnotify'])
  .factory('tree',['$q','$firebaseArray','FireRef','notificationService','$log',function($q,$firebaseArray,FireRef,notificationService,$log){

    var treeRef = function(){
      return FireRef.child('tree');
    };

    /**
     @Name          packAsJqTreeNode
     @visibility    Private
     @Description   Source node is packed as JqTree node.
     @parameters    {sourceNode: object}
     @return        Object
     @implementedBy sourceDataAsJqTreeData();
     */
    var packAsJqTreeNode = function(sourceNode){
      var node = {};
      node.id         = sourceNode.$id;
      node.label      = sourceNode.name;
      node.parentId   = sourceNode.parentId;
      node.left       = parseInt(sourceNode.left);
      node.right      = parseInt(sourceNode.right);
      node.children   = [];
      return node;
    };

    /**
     @Name          insertChildNode
     @visibility    Private
     @Description   Recursive Method; Is like push(), only that this function completely traverses the tree looking for the father to the son or node.
     @parameters    {targetTree: Array,childNode: Object}
     @returns       null
     @implementedBy sourceDataAsJqTreeData();
     */
    var insertChildNode = function(targetTree,childNode){
      angular.forEach(targetTree,function(node){
        if(node.id === childNode.parentId){
          node.children.push(childNode);
        }else{
          if(node.children.length > 0){
            insertChildNode(node.children,childNode);
          }
        }
      });
    };

    return {
      ref:function(){
        return treeRef();
      },
      nodes:function(){
        return $firebaseArray(treeRef().orderByChild('left'));
      },
      updateAllTree:function(newTree){
        var deferred = $q.defer();
        var promise = deferred.promise;
        var ref = treeRef();
        ref.set(newTree, function(error) {
          if (error) {
            notificationService.error(error);
            deferred.reject();
          } else {
            notificationService.success('The tree or nodes has been update');
            deferred.resolve();
          }
        });
        return promise;
      },
      deleteAllTree: function(){
        var deferred = $q.defer();
        var promise = deferred.promise;
        var onComplete = function(error) {
          if (error) {
            notificationService.error(error);
            deferred.reject();
          } else {
            notificationService.success('The tree or nodes has been deleted');
            deferred.resolve();
          }
        };
        treeRef().remove(onComplete);
        return promise;
      },
      /**
       @Name        sourceDataAsJqTreeData
       @Description Recursive Function, Format source data array as JqTree data.
       @parameters  {sourceData: Array}
       @returns     Array
       */
      sourceDataAsJqTreeData: function(sourceData){
        var targetTree = [];
        angular.forEach(sourceData, function(obj){
          var node  = packAsJqTreeNode(obj);
          if(node.parentId !== ''){
            // Is child node
            insertChildNode(targetTree,node);
          }else{
            // Is root node
            targetTree.push(node);
          }
        });
        return targetTree;
      },
      /**
       @Name              prepareDataForFireBase
       @Description       Recursive Method, Prepare data for FireBase data store.
       @parameters        {tree: object}
       @returns           object
       @implementedBy    deleteCategory(), treeMove();
       */
      prepareDataForFireBase: function(tree){
        var nodes = {};
        var process = function(tree){
          angular.forEach(tree,function(node){
            nodes[node.id]                      = {};
            nodes[node.id].name      = node.name;
            nodes[node.id].parentId  = node.parentId;
            nodes[node.id].left      = node.left;
            nodes[node.id].right     = node.right;
            if(node.children.length > 0){
              process(node.children);
            }
          });
        };
        process(tree);
        return nodes;
      },
      /**
       @Name            normalize
       @Description     Recursive Method, Fix .left and .right values of node of tree.
       @parameters      {tree:object}
       @returns         Null
       @implementedBy   deleteCategory(), treeMove();
       */
      normalize: function(tree){
        var count;
        var fix = function(tree,parentId){
          angular.forEach(tree,function(node){
            if(!count){ count = 1; }
            node.left = count; count +=1;
            if(parentId){
              node.parentId = parentId;
            }else{
              node.parentId = '';
            }
            if(node.children !== undefined && node.children.length >= 1){
              // There are child nodes
              fix(node.children,node.id);
            }else{
              node.children = [];
            }
            node.right = count; count +=1;
          });
        };
        fix(tree);
      },
      /**
       @Name              excludeNode
       @Description       Recursive Method, Exclude node delete.
       @parameters        {tree: object, nodeId:  'string, id of node', branch: 'bolean, delete children nodes too'}
       @returns           object; .targetTree: tree with deleted node's already excluded; .recordsIdsForDelete: id of records to delete;
       */
      excludeNode : function(tree,nodeId,branch){
        var result = {
          targetTree: [],
          recordsIdsForDelete:[]
        };
        var getRecordsIdsForDelete = function(deleteNode){
          var result = [];
          result.push(deleteNode.id);
          var process = function(node){
            angular.forEach(node, function (current_node) {
              result.push(current_node.id);
              if(current_node.children.length > 0){
                process(current_node.children);
              }
            });
          };
          process(deleteNode.children);
          return result;
        };
        var process = function(tree){
          angular.forEach(tree, function (node) {
            if(node.id == nodeId){
              if(node.children.length > 0){
                if(branch == true){
                  // delete node and children
                  result.recordsIdsForDelete = getRecordsIdsForDelete(node);
                }else{
                  // Keep children
                  result.recordsIdsForDelete.push(node.id);
                  if(node.parentId == ''){
                    for(var i = 0; i < node.children.length; i++){
                      node.children[i].parentId = '';
                    }
                  }else{
                    for(var e = 0; e < node.children.length; e++){
                      node.children[e].parentId = node.parentId;
                    }
                  }
                  process(node.children);
                }
              }else{
                result.recordsIdsForDelete.push(node.id);
              }
            }else{
              var new_node = {
                id:             node.id,
                parentId:       node.parentId,
                name:           node.label,
                left:           node.left,
                right:          node.right,
                children:       []
              };
              if(node.parentId !== ''){
                // Is child node
                // Función recursiva
                insertChildNode(result.targetTree,new_node);
              }else{
                // Is root node
                // Se inserta el nodo directamente
                result.targetTree.push(new_node);
              }
              if(node.children !== undefined){
                process(node.children);
              }
            }
          });
        };
        process(tree);
        return result;
      }
    };


  }])
  .directive('tree',['$templateCache','$compile','tree','$log',function($templateCache,$compile,tree,$log){

    return {
      restrict:'E',
      replace:true,
      template:'<div><div/>',
      link:function(scope,element){

        /**
         @Name            displayJqTreeData
         @Description     Display initially JqTree Data.
         @parameters      {element: reference of DOM element, data: object}
         @returns         null
         @implementedBy
         */
        var displayJqTreeData = function(element,data){
          var options = {
            dragAndDrop: true,
            selectable: true,
            autoEscape: false,
            autoOpen: true,
            data: data
          };

          element.tree(options);
        };

        /**
         @Name         replaceWholeTree
         @Description  Replace whole Tree.
         @parameters   {element: reference of DOM element, data: object}
         @returns      null
         @implementedBy -> newCategory(), editCategoryName(), deleteCategory(), treeMove()
         */
        var replaceWholeTree = function(element,data){
          element.tree('loadData', data);
        };


        /**
         @Description   Displaying initially Data, which is []
         */
        displayJqTreeData(element,[]);

        /**
         @Description   Observing the move event
         */
        element.bind('tree.move',function(event) {
          event.preventDefault();
          event.move_info.do_move();
          var proposalTree = angular.fromJson(element.tree('toJson'));
          tree.normalize(proposalTree);
          var newTree = tree.prepareDataForFireBase(proposalTree);
          scope.updateAllTree(newTree);
        });

        /**
         @Description   Observing the select event
         */
        element.bind('tree.select',function(event) {
            $log.log('event.node',event.node);
          }
        );

        /**
         @Name          nodes
         @Description   The real time data front fireBase
         */
        var nodes = tree.nodes();

        /**
         @Description   Observing changes in nodes var, which has first [] empty array, after some time is get server data.
         */
        nodes.$watch(function(){
          replaceWholeTree(element,tree.sourceDataAsJqTreeData(nodes));
        });

      }
    };

  }])
  .controller('TreeController',['$scope','notificationService','tree','$modal','$log',function($scope,notificationService,tree,$modal,$log){

    $scope.requestPromise = $scope.httpRequestPromise;

    $scope.nodes = tree.nodes();

    $scope.asJqTreeData = [];

    $scope.nodes.$watch(function () {
      $scope.asJqTreeData = tree.sourceDataAsJqTreeData($scope.nodes);
    });

    $scope.httpRequestPromise = $scope.nodes.$loaded(null,function(error){
      notificationService.error(error);
    });

    var original = angular.copy($scope.model = {
      node: null
    });

    $scope.reset = function(){
      $scope.model = angular.copy(original);
      $scope.form.$setUntouched();
      $scope.form.$setPristine();
    };

    $scope.deleteTree = function(){
      $scope.httpRequestPromise = tree.deleteAllTree();
    };

    $scope.deleteNode = function(node){
      var modalInstance = $modal.open({
        templateUrl: 'deleteNode.html',
        controller: 'DeleteNodeController',
        resolve: {
          node: function () {
            return node;
          }
        }
      });
      modalInstance.result.then(function(branch){
        var newData = tree.excludeNode($scope.asJqTreeData,node.$id,branch);
        tree.normalize(newData.targetTree);
        var newTree = tree.prepareDataForFireBase(newData.targetTree);
        $scope.httpRequestPromise = tree.updateAllTree(newTree);
      }, function (error) {
        notificationService.error(error);
      });
    };

    $scope.submit = function () {
      if($scope.form.$valid){

        var nodesLength = $scope.nodes.length;
        var left, right;

        if(nodesLength >= 1){
          var upperLimit = nodesLength * 2;
          left    = upperLimit+1;
          right   = upperLimit+2;
        }else{
          left    = 1;
          right   = 2;
        }

        var node = {
          left:     left,
          right:    right,
          parentId: '',
          name:     $scope.model.node
        };

        $scope.httpRequestPromise = $scope.nodes.$add(node).then(function() {
          notificationService.success('Data has been saved to our Firebase database');
          $scope.reset();
        },function(error){
          notificationService.error(error);
          //$window.location = '/';
        });

      }
    };

    $scope.updateAllTree = function (newTree){
      $scope.httpRequestPromise = tree.updateAllTree(newTree)
    };


  }])
  .controller('DeleteNodeController',['$scope','$modalInstance','node',function($scope,$modalInstance,node){

    $scope.node           = node;
    $scope.branchCheckBox = (($scope.node.left+1) !== ($scope.node.right));
    $scope.model = {
      branch: null
    };

    $scope.confirm  = function () {
      $modalInstance.close($scope.model.branch);
    };

    $scope.cancel   = function () {
      $modalInstance.dismiss('this has be cancel');
    };

  }]);
