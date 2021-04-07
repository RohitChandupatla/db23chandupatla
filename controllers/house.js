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
exports.house_detail = function(req, res) {
res.send('NOT IMPLEMENTED: house detail: ' + req.params.id);
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
exports.house_delete = function(req, res) {
res.send('NOT IMPLEMENTED: house delete DELETE ' + req.params.id);
};
// Handle house update form on PUT.
exports.house_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: house update PUT' + req.params.id);
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