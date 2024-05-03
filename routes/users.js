var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')

/**
 * url :http://localhost/6868/users/Delete_purchased_products
 * method: POST
 * body:[]
 * response:success or error
 */
router.post('/Delete_purchased_products', async (req, res, next) => {
 
    try {
        const {email,data} = req.body;
        console.log(email);
        console.log(data);
        const result = await userController.Delete_purchased_products(email,data);
        if(result==null){
          return res.status(404).json({status:false,data :  "khong tìm thấy email để xóa"});
        }
        return res.status(200).json({status:true,data :result });
    } catch (error) {
        return res.status(500).json({err: error.message});
    }
});



/**
 * url:http://localhost:6868/users/delete
 * method: POST
 * body:{email,id}
 */
router.post('/delete', async (req, res, next) => {
    try {
        const {email,id} = req.body;
        const result = await userController.delete_product(email,id);
        if(result==null){
          return res.status(404).json({status:false,data :  "khong tìm thấy id để xóa"});
        }
        return res.status(200).json({status:true,data :result });
    } catch (error) {
        return res.status(500).json({err: error.message});
    }
});



/**
 * url:http//localhost:6868/users/
 * method:GET
 * query:email
 */
  router.get('/',async(req,res,next)=>{
    try {
      const {email}=req.query;
      const result = await userController.get_user(email);
      return res.status(200).json({status:true,data:result});
    } catch (error) {
      return res.status(500).json({err: error.message});
    }
  })



/**
 * url:http://localhost:6868/users/add_cart
 * method: POST
 * body: {email,name_procuct,like,price,img}
 */
router.post('/add_cart',async(req,res,next)=>{
  const {id,email,name,like,price,img,so_luong}=req.body;
  // console.log(id,email ,name,like,price,img);
  
  try{
    const result = await userController.add_to_car(id,email,name,like,price,img,so_luong);
    if(result!=null){
      return res.status(200).json({status:true,data :  result});
    }else if(result==false){
      return res.status(404).json({messges :  "tai khoan khong ton tai"});
    }
  }catch(err){
    return res.status(500).json({error: err});
  }
})


/**
 * url:http://localhost:6868/users/update
 * method:put
 * body:{email,password,name}
 */

router.put('/update', async (req, res, next) => {
    try {
      
        const{name,password,email}=req.body;
        const result = await userController.uptate(name,password,email);
        if(result==null){
          return res.status(404).json({ status:false});
        }
        return res.status(200).json({status:true});
    } catch (error) {
        console.log(error)
        res.status(500).json({
          status: 500,
          message: error.message
        })
    }
})


/**
 * url: http://localhost:6868/users/login
 * method: post
 * body: {email, password}
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)
    if(email==null || password==null){
      return res.status(200).json({status:false,messges :  "khong de trong thong tin"});
    }
    const result = await userController.login(email, password);

    if (result==false) {
      return res.status(200).json({status:false,messges :  "tai khoan khong ton tai"});
    }else{
      return res.status(200).json({ status:true,data:result })

    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 500,
      message: error.message
    })
  }
})

/**
 * url:htpp://localhost:6868/users
 * method:post
 * body:{email,password,name}
 * response:tra ve dang ki thanh coong hay that bai
 */
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name,sdt } = req.body;
    console.log(email, password, name,sdt)
    if(email==null||password==null||name==null){
      return res.status(200).json({status:false,messges :  "khong de trong thong tin"});
    } 
    const result = await userController.register(email, password, name,sdt);
    if (result==null) {
      return res.status(200).json({status:false,messges :  "đăng kí không thành công"});
    }
    return res.status(200).json({ status:true })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 500,
      message: error.message
    })
  }
})


module.exports = router;
