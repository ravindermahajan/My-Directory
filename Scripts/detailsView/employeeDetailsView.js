/**
 * Created by synerzip on 16/3/14.
 */
define([ 'jquery','underscore','backbone','../Collection/employeeCollectionUrl.js'],function($,_,Backbone,EmployeeList){
    return Backbone.View.extend({

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
    })

});