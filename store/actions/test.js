/*
import BASEURL from '../../constants/api'

export const LOGIN = 'LOGIN';

export const login = (user, pass) => {
    return async dispatch => {
        let resData={};
        try{
            const response = await fetch('http://machynworks1.com:5001/auth',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    user:user,
                    pass:pass
                })
            } 
            );

            if(!response.ok){
                throw new Error('Something Went Wrong')
                //resData={"message":"Something Went Wrong",result:100}
            }
            else
            {
                resData = await response.json();
            }

            if(resData.result == 0)
            {
                dispatch({type:LOGIN,userId:4})
            }
            else
            {
            }
    
        }
        catch(err){
            //resData={"message":err,result:100}
            throw new Error(err);
        }
        
    }
}
*/