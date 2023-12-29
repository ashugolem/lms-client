const initialValue = ""

const warningMsg = (state = initialValue, action) =>{
    switch(action.type){
        case "EXISTS": {
            return state = "User already exists! Please relogin!!"
        }
        case "NOTMATCH": {
            return state = "Password does not match !"
        }
        default: return state; 
    }
}

export default warningMsg; 