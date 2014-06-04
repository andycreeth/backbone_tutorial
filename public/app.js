$(function() {
    // MODELS
    var CategoryModel = Backbone.Model.extend({
        defaults: {
            name: "example category"
        }
    });




    // VIEWS
    var CategoryView = Backbone.View.extend({
        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html("Hello World");
        }
    })



    var cat = new CategoryModel();

    var catView = new CategoryView();

    $("#app-container").html(catView.el);
});
