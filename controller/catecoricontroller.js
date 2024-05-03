const catecoryModel = require('./catecoryModel');

const add_category = async (id_tt,like) => {
    try {
        var category = new catecoryModel({
            id_tt: id_tt,
            like: like
        })
        const result = category.save();
        return result
    } catch (error) {
        console.error(error);
    }
}

const get_category = async (catecoryid) => {
    try {
        var category = await catecoryModel.findOne({_id: catecoryid});
        if(category){
            return category.like;
        }else{
            return null
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    add_category, get_category
}