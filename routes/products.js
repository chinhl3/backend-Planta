var express = require('express');
var router = express.Router();
const productcontroller = require('../controller/ProductController');





/**
 * url: http://localhost:6868/products/find_by_id
 * method: GET
 * query:id
 */
    router.get('/find_by_id',async(req, res, next)=>{
        try {
            const {id}=req.query;
            const result = await productcontroller.find_by_id(id);
            if (result == '') {
                return res.status(404).json({ messges: "không tìm thấy sản phẩm nào" });
            }
            return res.status(200).json({ status:true,data: result });
        } catch (error) {
            return res.status(500).json({  status:true,message: error.message});
        }
    })

/**
 * url: http://localhost:6868/products/loc-theo-gia?min=1&max=10
 * method: GET
 * query:{min:8,max:10}
 * response{[product]}
 */

router.get('/loc-theo-gia', async (req, res, next) => {
    try {
        const { min, max } = req.query;
        const result = await productcontroller.loc_theo_gia(min, max);
        if (result == false) {
            return res.status(404).json({ messges: "không tìm thấy sản phẩm nào" });
        }

        return res.status(200).json({ messges: result });


    } catch (error) {
        console.log(error);
        //  throw new Error("Failed to find product");
        return res.status(500).json(error);
    }
});

/**
 * url :http://localhost:6868/products/find_product_categori
 * method:get
 * query:categoryid
 * response{[product]}
 */

router.get('/find_product_categori', async (req, res, next) => {
    try {
        const { categoryid } = req.query;
        const result = await productcontroller.find_product_category(categoryid);
        if (result == '') {
            return res.status(404).json({ messges: "không tìm thấy sản phẩm nào" });
        }

        return res.status(200).json({status:true, messges: result });


    } catch (error) {
        console.log(error);
        //  throw new Error("Failed to find product");
        return res.status(500).json(error);
    }
});



/**
 * url:http://localhost:6686/products/find_product
 * method: GET
 * query:name
 * response:{danh sach san phan cung ten}
 */
// tim kiem theo loai san phẩm là cây hay chậu
router.get('/find_product', async (req, res, next) => {
    try {
        const { type,page } = req.query;
        const result = await productcontroller.find_product(type,page);
        if (result.length==0) {
            return res.status(200).json({  status:false,messges: "không tìm thấy sản phẩm nào" });
        }

        return res.status(200).json({ status:true,messges: result });
    } catch (error) {
        console.log(error);
        //  throw new Error("Failed to find product");
        
        return res.status(500).json(error);
    }
});


/**
 * url:http://localhost:6868/products/delete
 * method:delete
 * query:id
 */

router.delete('/delete', async (req, res, next) => {
    try {
        const { id } = req.query;
        const result = await productcontroller.delete_product(id);
        if (result == false) {
            return res.status(404).json({ messges: "không tìm thấy id để xóa" });
        }
        if (result == true) {
            return res.status(200).json({ messges: "xóa thành công" });
        }

    } catch (error) {
        console.log(error);
        //  throw new Error("Failed to delete product");
        return res.status(500).json(error);
    }
});

/**
 * url:http://localhost:6868/products/update
 * method: Put
 * query:id
 * body:{product}
 */

router.put('/update', async (req, res, next) => {
    try {
        const { id } = req.query;
        const { name, price, img, quanity, description, category } = req.body;
        const result = await productcontroller.update(id, name, price, img, quanity, description, category);
        return res.status(200).json({ messges: result });
    } catch (error) {
        console.log(error);
        //  throw new Error("Failed to update product");
        return res.status(500).json(error);
    }
});



/**
 * url: http://localhost:6686/products/add_product
 * method: POST
 * body:{product}
 * response:thanh coong hay that  bai
 */

router.post('/add_product', async (req, res, next) => {
    try {
       
        const { name, price, img, size, origin, inventory, categoryid, type} = req.body;
        console.log(name, price, img, size, origin, inventory, categoryid, type)
        const result = await productcontroller.add_product(name, price, img, size, origin, inventory, categoryid, type);
        return res.status(200).json(messges = "add product success");
    } catch (error) {
        console.log(error);
        //  throw new Error("Failed to add product");
        return res.status(500).json(error);
    }
});

/**
 * url:http://localhost:6868/products/get_products
 * method:get
 *
 */
router.get('/', async (req, res, next) => {
    try {
        const result = await productcontroller.getdata()
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;