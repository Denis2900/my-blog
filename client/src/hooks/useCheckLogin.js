import { useEffect, useState } from "react"
function useCheckLogin(login){
    const checkUserLogin = (login)=>{
        const regLogin = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
        if(regLogin.test(login)){
            return true
        }
        return false
    }
    useEffect(()=>{
        if(login){
            checkUserLogin(login)
        }
    },[])
    return {checkUserLogin}
}
export default useCheckLogin