// Defining Model
var Vehicle = Backbone.Model.extend();

// Defining Collection
var Vehicles = Backbone.Collection.extend({
    model: Vehicle
});

// Defining View (for Model)
var VehicleView = Backbone.View.extend({
    tagName: "li",
    events: {
        "click .delete": "onDelete"
    },
    onDelete: function() {
        this.remove();
    },
    render: function() {
        this.$el.html(this.model.get("registration_no") + ` <button class="delete">Delete</button>`);
        this.$el.attr("id", this.model.id);
        return this;
    }
});

// Defining View (for Collection)
var VehiclesView = Backbone.View.extend({
    tagName: "ul",
    events: {
        "click .add": "onAdd"
    },
    initialize: function() {
//        this.model.on("add", this.onVehicleAdded, this);
    },
    onAdd: function() {
        var newid = this.$el.length + 1;
        var newVehicle = new Vehicle({ id: newid, registration_no: inputfield.value });
        var vehicleView = new VehicleView({ model: newVehicle });
        this.$el.append(vehicleView.render().$el);        
//        vehicles.add(newVehicle);
//        this.onVehicleAdded(newVehicle);
    },
    onVehicleAdded: function(vehicle) {
        var vehicleView = new VehicleView({ model: vehicle });
        this.$el.append(vehicleView.render().$el);        
//        this.model.get("inputfield")
    },
    render: function() {
        var self = this;
        this.$el.append(`<input type="text" id="inputfield"><button class="add">Add</button>`);
        this.model.each(function(vehicle){
            var vehicleView = new VehicleView({ model: vehicle });
            self.$el.append(vehicleView.render().$el);
        });

    }
});

// Creating Model
//var vehicle = new Vehicle();

// Creating Collection
var vehicles = new Vehicles([
    new Vehicle({ id: 1, vehicle_model: "GOL", manufacturer: "Volkswagen", registration_no: "1234" }),
    new Vehicle({ id: 2, vehicle_model: "Fusca", manufacturer: "Volkswagen", registration_no: "5555" }),
    new Vehicle({ id: 3, vehicle_model: "Celta", manufacturer: "Chevrolet", registration_no: "777" })
]);

// Creating View (for Model)
//var vehicleView = new VehicleView();

// Creating View (for Collection)
var vehiclesView = new VehiclesView({ el: "#container", model: vehicles });
vehiclesView.render();
