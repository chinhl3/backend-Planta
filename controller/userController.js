const userModel = require('./userModel')
const bcrypt = require('bcryptjs');


// lay danh sach cac san pham co trong cart cua user 

const get_user = async (email) => {
    try {
        var users = await userModel.findOne({ email: email });


        if (!users) {
            return false
        }
        else {
            return users.cart
        }

    } catch (err) {
        console.log(err)
    }
}


const register = async (email, password, ten, sdt) => {
    try {
        var users = await userModel.findOne({ email: email });

        if (users) {
            return null;
        } else {
            var salt = bcrypt.genSaltSync(10);
            var password = bcrypt.hashSync(password, salt);
            users = new userModel({
                email: email,
                password: password,
                name: ten,
                sdt: sdt
            })
            const result = await users.save();
            return result;
        }
    } catch (err) {
        console.log(err)
    }
}

// login user

const login = async (email, password) => {
    try {
        var users = await userModel.findOne({ email: email });

        if (!users) {
            return false
        }
        else {
            var check = bcrypt.compareSync(password, users.password)
            if (check) {
                return users;
            } else {
                return false
            }
        }

    } catch (err) {
        console.log(err)
    }
}

const uptate = async (name, password, email) => {
    try {
        var uesr_update = await userModel.findOne({ email: email });
        uesr_update.name = name || uesr_update.name;
        uesr_update.password = password;
        const result = await uesr_update.save();

        if (!uesr_update) {
            throw new Error('tai khong ton tai');
        }


        return result
    } catch (error) {
        console.log(error)
    }
}

const add_to_car = async (id, email, name, like, price, img, so_luong) => {
    console.log(email);
    try {
        var uesr_add = await userModel.findOne({ email: email });

        if (uesr_add) {

            const cart = uesr_add.cart
            const index = cart.findIndex(item => item.id === id);
            // nếu id sản phẩm đã có trong cart
            if (index != -1) {
                const item = { ...cart[index], quantity: cart[index].quantity + so_luong }
                cart.splice(index, 1, item)
                console.log('da vo day ')
            } else {
                // nếu id sản phẩm đã  có trong cart
                var product = {
                    id: id,
                    name: name,
                    like: like,
                    price: price,
                    img: img,
                    quantity: so_luong
                }
                console.log('da vo day 1')
                cart.push(product)
            }
            uesr_add.cart = cart;
            const result = await uesr_add.save();
            return result;
        } else {
            console.log('da vo day ')
            return false;
        }
    } catch (error) {
        console.log(error)
    }
}

const delete_product = async (email, id) => {
    try {
        var user = await userModel.findOne({ email: email });
        if (user) {
            if(id.toString()=="all"){
                user.cart = [];
                await user.save();
                return user.cart;
            }else{
                
                const updatedCart = user.cart.filter(item => item.id.toString() !== id.toString());
                user.cart = updatedCart
    
                await user.save();
    
                return user.cart;      
            }
           
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}
const Delete_purchased_products = async (email,data) => {
    try {
        console.log(data);
        var user = await userModel.findOne({ email: email });
        if (user) {
            const newArray = user.cart.filter(item1 => !data.some(item2 => item1.id === item2.id));
            user.cart = newArray;
            await user.save();
            return user.cart
        }
        else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { register, login, uptate, add_to_car, get_user, delete_product,Delete_purchased_products}