define([ 'jquery','underscore','backbone','../Employee/employeeUrl.js'],function($,_,Backbone,Employee){
    var employee=new Employee();

    return Backbone.View.extend({

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
    })

});