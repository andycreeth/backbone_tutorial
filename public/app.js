$(function() {
    // MODELS
    var CategoryModel = Backbone.Model.extend({
        defaults: {
            name: "example category"
        }
    });


    var cat = new CategoryModel();

    console.log(cat);
});
