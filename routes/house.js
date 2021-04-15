var express = require('express');
const house_controlers= require('../controllers/house');
var router = express.Router();

/* GET home page. */
router.get('/', house_controlers.house_view_all_Page );
router.get('/detail', house_controlers.house_view_one_Page);
router.get('/create', house_controlers.house_create_Page);
router.get('/update', house_controlers.house_update_Page);
router.get('/delete', house_controlers.house_delete_Page);

module.exports = router;
