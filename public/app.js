$(function() {
    // MODELS
    var CategoryModel = Backbone.Model.extend({
        defaults: {
            name: "example category"
        }
    });

    var TemplateModel = Backbone.Model.extend({

    });



    // COLLECTIONS
    var CategoriesCollection = Backbone.Collection.extend({
        model: CategoryModel,

        url: '/categories'
    });

    var TemplatesCollection = Backbone.Collection.extend({
        model: TemplateModel,

        url: function() {
            return _.result(this.category, "url") + '/templates';
        },

        initialize: function(options) {
            this.category = options.category;
        }
    })



    // VIEWS
    var CategoryView = Backbone.View.extend({
        tagName: "li",

        events: {
            "click": "changeName"
        },

        initialize: function() {
            this.template = _.template('<strong><%= category.name %></strong><ul></ul>');

            this.collection = new TemplatesCollection({ category: this.model });

            this.listenTo(this.collection, "sync", this.render);

            this.collection.fetch();
        },

        render: function() {
            this.$el.html(this.template({
                category: this.model.toJSON()
            }));

            this.$el.find("ul").empty();

            var _this = this;

            this.collection.each(function(t) {
                var view = new TemplateView({ model: t });

                _this.$el.find("ul").append(view.el);
            })
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

    var TemplateView = Backbone.View.extend({
        tagName: "li",

        initialize: function() {
            this.template = _.template('<h3><%= template.name %>: </h3><p><%= template.body %></p>');

            this.render();
        },

        render: function() {
            this.$el.html(this.template({
                template: this.model.toJSON()
            }));
        }
    });

    var view = new CategoriesView();

    $("#app-container").html(view.el);
});
