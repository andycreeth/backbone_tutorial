$(function() {
    // MODELS
    var CategoryModel = Backbone.Model.extend({
        defaults: {
            name: "example category"
        }
    });



    // COLLECTIONS
    var CategoriesCollection = Backbone.Collection.extend({
        model: CategoryModel
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
    var cat2 = new CategoryModel();

    var cats = new CategoriesCollection();

    cats.add(cat);
    cats.add(cat2);

    cats.each(function(c) {
        var view = new CategoryView({ model: c });

        $("#app-container").append(view.el);
    });
});
