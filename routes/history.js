var express = require('express');
var router = express.Router();
const historycontroller = require('../controller/historycontroller')


/**
 * url:http://localhost:6868/history
 * method:GET
 */

router.get('/', async (req, res, next) => {
    try {
        const result = await historycontroller.getHistory();
        if (result == null) {
            return res.status(404).json({ messges: "không tìm thấy sản phẩm nào" });
        }
        return res.status(200).json({ status: true, data: result });
    }

    catch (error) {
        return res.status(500).json({ err: error.message });
    }
})

/**
 * url:http://localhost:6868/history/add_history
 * method:post
 * body={history}
 */

router.post('/add_history', async (req, res, next) => {
    try {
        const { address, method_ship, name, phone, selected_product, tong } = req.body;
        const result = await historycontroller.addHistory(address, method_ship, name, phone, selected_product, tong);
        if (result) {
            return res.status(200).json({ status: true, data: result });
        } else {
            return res.status(404).json({ status: false, data: "theem ko thanh cong" });
        }

    } catch (error) {
        console.log(error);
        //  throw new Error("Failed to add product");
        return res.status(500).json(error);
    }
});


module.exports = router;
