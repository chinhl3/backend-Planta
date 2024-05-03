var express = require('express');
var router = express.Router();
const categorycontroller=require('../controller/catecoricontroller');


router.post('/add_category', async (req, res, next) => {
    try {
        const {id_tt,like}=req.body;
        
        const result = await categorycontroller.add_category(id_tt,like) 
        return res.status(200).json(messges = "add category success");
    } catch (error) {
        console.log(error);
        //  throw new Error("Failed to add product");
         return res.status(500).json(error);
    }
});

/**
 * url:http://localhost:6868/catecory/get_category
 * method: GET
 * query:categoryid
 * response:{category}
 */

router.get('/get_category', async (req, res, next) => {
    try {
        const {categoryid}=req.query;
        const result = await categorycontroller.get_category(categoryid)
        if (result==null) {
            return res.status(404).json({ messges: "không tìm thấy sản phẩm nào" });
        }
        return res.status(200).json(messges = result);
    } catch (error) {
        console.log(error);
        //  throw new Error("Failed to add product");
         return res.status(500).json(error);
    }
});

module.exports = router;