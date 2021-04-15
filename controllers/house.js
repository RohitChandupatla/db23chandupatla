var house = require('../models/house');
// List of all houses
console.log(house.houses);
exports.house_list = async function(req, res) {
    try{
        thehouses = await house.find();
        console.log("thehouses");
        res.send(thehouses);
        }
        catch(err){
            res.status(500);
            res.send(`{"error": ${err}}`);
        } 
    };
// for a specific house.
// for a specific house.
exports.house_detail = async function(req, res) {
    console.log("detail"  + req.params.id)
    try {
        result = await house.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

// Handle house create on POST.
exports.house_create_post = async function(req, res) {
    console.log(req.body)
    let document = new house();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"type_of_house":"Wooden", "location":603E 7TH ST Maryville, "pincode":"64468"}
    document.type_of_house = req.body.type_of_house;
    document.location = req.body.location;
    document.pincode = req.body.pincode;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    } 
};
// Handle house delete form on DELETE.
// Handle house delete on DELETE.
exports.house_delete = async function(req, res) {
    console.log("delete "  + req.params.id)
    try {
        result = await house.findByIdAndDelete( req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};


// Handle house update form on PUT.
// Handle house update form on PUT.
exports.house_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await house.findById( req.params.id)
        // Do updates of properties
        if(req.body.type_of_house) toUpdate.type_of_house = req.body.type_of_house;
        if(req.body.location) toUpdate.location = req.body.location;
        if(req.body.pincode) toUpdate.pincode = req.body.pincode;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};


// VIEWS
// Handle a show all view
exports.house_view_all_Page = async function(req, res) {
    try{
        thehouses = await house.find();
    res.render('house', { title: 'house Search Results', results: thehouses });
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    } 
};

// Handle a show one view with id specified by query
exports.house_view_one_Page = async function(req, res) {
    console.log("single view for id "  + req.query.id)
    try{
        result = await house.findById( req.query.id)
        res.render('housedetail', 
{ title: 'house Detail', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a house.
// No body, no in path parameter, no query.
// Does not need to be async
exports.house_create_Page =  function(req, res) {
    console.log("create view")
    try{
        res.render('housecreate', { title: 'house Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a house.
// query provides the id
exports.house_update_Page =  async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
        let result = await house.findById(req.query.id)
        res.render('houseupdate', { title: 'house Update', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.house_delete_Page = async function(req, res) {
    console.log("Delete view for id "  + req.query.id)
    try{
        result = await house.findById(req.query.id)
        res.render('housedelete', { title: 'house Delete', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};



