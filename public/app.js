$(function() {
    // MODELS
    var CategoryModel = Backbone.Model.extend({
        defaults: {
            name: "example category"
        }
    });



    // COLLECTIONS
    var CategoriesCollection = Backbone.Collection.extend({
        model: CategoryModel,

        url: '/categories'
    });



    // VIEWS
    var CategoryView = Backbone.View.extend({
        tagName: "li",

        events: {
            "click": "changeName"
        },

        initialize: function() {
            this.template = _.template('<strong><%= category.name %></strong>')

            this.render();
        },

        render: function() {
            this.$el.html(this.template({
                category: this.model.toJSON()
            }));
        },

        changeName: function() {
            this.model.set({ name: "You clicked me!" });

            this.model.save();
        }
    })

    var CategoriesView = Backbone.View.extend({
        tagName: "ul",

        initialize: function() {
            this.collection = new CategoriesCollection();

            this.listenTo(this.collection, "sync", this.render);

            this.collection.fetch();
        },

        render: function() {
            var _this  = this;

            _this.$el.empty();

            this.collection.each(function(c) {
                var view = new CategoryView({ model: c });

                _this.$el.append(view.el);
            });
        }
    });

    var view = new CategoriesView();

    $("#app-container").html(view.el);
});
