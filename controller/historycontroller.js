const historymodel =require('./historymodel')

const addHistory=async(address,method_ship,name,phone,selected_product,tong) =>{
    try{
        var history=new historymodel({
            address:address,
            method_ship:method_ship,
            name:name,
            phone:phone,
            selected_product:selected_product,
            tong:tong
        })
        const result=await history.save()
        return result
    }catch(error){
        console.log(error)
    }

}
const getHistory=async() =>{
    try{
        var history=await historymodel.find()
        return history
    }catch(error){
        console.log(error)
    }
}
module.exports = {addHistory, getHistory}