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

    var CategoriesView = Backbone.View.extend({
        initialize: function() {
            this.render();
        },

        render: function() {
            var _this  = this;

            this.collection.each(function(c) {
                var view = new CategoryView({ model: c });

                _this.$el.append(view.el);
            });
        }
    });



    var cat = new CategoryModel();
    var cat2 = new CategoryModel();

    var cats = new CategoriesCollection();

    cats.add(cat);
    cats.add(cat2);

    var view = new CategoriesView({ collection: cats });

    $("#app-container").html(view.el);
});
