import useFetch from "./useFetch"
function useCheckPassword(password){
    const checkUserPassword = (password)=>{
        const regNumber = /\d/
        if(password.length > 7 && regNumber.test(password)){
            return true
        }
        return false
    }
    useFetch(()=>{
        checkUserPassword(password)
    },[])
    return {checkUserPassword}
}
export default useCheckPassword