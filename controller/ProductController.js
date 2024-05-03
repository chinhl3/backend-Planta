
const productmodel = require('./ProductModel');
const catecoryModel = require('./catecoryModel');

const getdata = async () => {
    try {
        let query = {};
        query = {

        }

        var data = await productmodel.find(query).sort({ price: -1 });

        return data
    } catch (error) {
        console.log(error);
    }
}

const add_product = async (name, price, img, size, origin, inventory, categoryid, type) => {
    try {
        var nameCatecory = await catecoryModel.findOne({ id_tt: categoryid });
        var category = {
            id: nameCatecory.id_tt,
            like: nameCatecory.like
        }
        var product = new productmodel({
            name: name,
            price: price,
            img: img,
            size: size,
            origin: origin,
            inventory: inventory,
            category: category,
            type: type
        })
        const result = product.save();
        return result
    } catch (error) {
        console.log(error);
    }
}
const update = async (id, name, price, img, quanity, description, category) => {
    try {


        var product_update = await productmodel.findByIdAndUpdate(id,
            {
                name: name,
                price: price,
                img: img,
                quanity: quanity,
                description: description,
                category: category
            }
            , { new: true });
        if (!product_update) {
            throw new Error('san pham  khong ton tai');
        }


        return product_update

    } catch (error) {
        console.log(error);

    }
}
const delete_product = async (id) => {
    try {
        const deletedProduct = await productmodel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
    return true
}
// tim kiem theo loai san phẩm là cây hay chậu

const find_product = async (type, page) => {
    try {
        const page_size = 6;
        // Tìm các sản phẩm có tên chứa một phần của từ khóa tìm kiếm
        var skip = (page - 1) * page_size

        if (page != 0) {
            const products = await productmodel
                .find({ type: { $regex: type, $options: 'i' } })
                .skip(skip)
                .limit(page_size)
                ;

            return products; // Trả về mảng sản phẩm nếu có sản phẩm được tìm thấy
        } else {
            const products = await productmodel
                .find({ type: { $regex: type, $options: 'i' } });

            if (products.length === 0) {
                return false; // Trả về nếu không có sản phẩm nào được tìm thấy
            }
            return products; // Trả về mảng sản phẩm nếu có sản phẩm được tìm thấy
        }

    } catch (error) {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        throw error; // Ném lỗi nếu có lỗi xảy ra trong quá trình tìm kiếm
    }
}
const find_product_category = async (categotyid) => {
    try {
        // Tìm các sản phẩm có tên chứa một phần của từ khóa tìm kiếm
        console.log(categotyid)
        var products = await productmodel.find();
        var test = [];
        if (products.length > 0) {
            for (var i = 0; i < products.length; i++) {
                if (products[i].category.id == categotyid) {
                    test.push(products[i]);
                }
            }
        }

        if (!test.length == null) {
            return null; // Trả về nếu không có sản phẩm nào được tìm thấy
        }

        return test; // Trả về mảng sản phẩm nếu có sản phẩm được tìm thấy
    } catch (error) {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        throw error; // Ném lỗi nếu có lỗi xảy ra trong quá trình tìm kiếm
    }
}

const loc_theo_gia = async (min, max) => {
    try {
        // câu điều kiện
        let query = {};
        query = {
            price: { $gte: min, $lte: max }
        }
        var data = await productmodel.find(query).sort({ quanity: 1 });
        return data;
    } catch (error) {
        console.log(error);
    }
}

const find_by_id = async (id) => {
    try {
        const products = await productmodel.findById(id);
        if (!products) {
            throw new Error('san pham  khong ton tai');
        }

        return products;
    } catch (error) {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        throw error; // Ném lỗi nếu có lỗi xảy ra trong quá trình tìm kiếm
    }
}

module.exports = { getdata, add_product, update, delete_product, find_product, find_product_category, loc_theo_gia, find_by_id }
