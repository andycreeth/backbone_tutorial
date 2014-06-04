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
            this.template = _.template('<strong><%= category.name %></strong>')

            this.render();
        },

        render: function() {
            this.$el.html(this.template({
                category: this.model.toJSON()
            }));
        }
    })



    var cat = new CategoryModel();

    var catView = new CategoryView({ model: cat });

    $("#app-container").html(catView.el);
});
