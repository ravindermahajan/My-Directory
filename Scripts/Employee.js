/**
 * Created by synerzip on 11/3/14.
 */

(function($){

        $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
            options.url = 'http://backbonejs-beginner.herokuapp.com' + options.url;
        });

    var EmployeeList= Backbone.Collection.extend({
        url:'/users'
    });


    var EmployeeDetail=Backbone.View.extend({

        el:'.content',
        render:function(){
            var self=this;
            var employeeList=new EmployeeList();
            employeeList.fetch({
                success:function(data){
                    var employeeTemplate= _.template($('#employee-list-template').html(),{users:data.models});
                    self.$el.html(employeeTemplate);
                }
            })
        }
    });

    var Employee = Backbone.Model.extend({
        urlRoot: '/users'
    });

    var employeeDetail= new EmployeeDetail();
    var employee=new Employee();



    var EmployeeEditView=Backbone.View.extend({
        el:'.content',
        render:function(options){
            var self=this;
            if(options && options.id){
                var employee=new Employee({id:options.id});
                employee.fetch({
                    success:function(data){
                        var editTemplate= _.template($('#create-edit-template').html(),{user:data});
                        self.$el.html(editTemplate);
                    }
                })
            }
            else{
                var editTemplate= _.template($('#create-edit-template').html(),{user:null});
                self.$el.html(editTemplate);
            }

        },
        events:{
            'submit .edit-user-form':'callSave'

        },
        callSave:function(ev){

            var empDetail={firstname:ev.currentTarget[0].value,lastname:ev.currentTarget[1].value,age:ev.currentTarget[2].value};
           // var empDetail=ev.currentTarget[3].value!=''? $.extend({},empDetail,{id:ev.currentTarget[3].value}):empDetail;
            employee.save(empDetail,{
                success:function(data){
                    router.navigate('', {trigger:true});
                }
            })
        }
    });

    var editView= new EmployeeEditView();

    var Router = Backbone.Router.extend({

        // routes configuration
        routes: {
            '' : 'defaultRoute',
            'create':'createRoute',
            "edit/:id": 'editRoute',
            "delete/:id":'deleteRoute'
        },
        defaultRoute: function() {
            employeeDetail.render();
        },
        createRoute:function(){
            editView.render();

        },
        editRoute:function(routeId){
            editView.render({id:routeId});

        },
        deleteRoute:function(routeId){
            var employee=new Employee({id:routeId});
            employee.destroy({
                success:function(data){
                    router.navigate('', {trigger:true});
                }
            })

        }

    });
    var router = new Router();
    Backbone.history.start();

})(jQuery);

