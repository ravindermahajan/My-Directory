/**
 * Created by synerzip on 16/3/14.
 */
 define(['backbone','../detailsView/employeeDetailsView.js','../Employee/employeeUrl.js','../editView/edit.js'],function(Backbone,EmployeeDetail,Employee,EditView){

     var employeeDetail= new EmployeeDetail();
     var employee=new Employee();
     var editView= new EditView();

     return Backbone.Router.extend({

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

    })
     Backbone.history.start();
 });


