import { useEffect, useState } from "react"

const useFetch = (url,objectRequest,callback)=>{
    const [data,setData] = useState({
        body:null
    })
    const fetchRequest = (url,objectRequest,callback = null)=>{
        fetch(url,objectRequest)
            .then(res=>res.json())
            .then((result)=>{
                if(callback){
                    callback(result)
                }
                else{
                    setData({body:result})
                }
            })
    }
    useEffect(()=>{
        if(url){
            fetchRequest(url,objectRequest,callback)
        }
    },[])
    return {data,fetchRequest}
}
export default useFetch