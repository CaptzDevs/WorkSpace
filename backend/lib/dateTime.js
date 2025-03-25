console.log(process.env.NODE_ENV);

export function formatDate(currentDate){
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const format = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return format;
}

export function getCurrentDateTime(secondsToAdd = 0) {
    const currentDate = new Date();

    currentDate.setSeconds(currentDate.getSeconds() + secondsToAdd);

    if(process.env.NODE_ENV === 'dev'){
        currentDate.setHours(currentDate.getHours());
    }else{
        currentDate.setHours(currentDate.getHours()+7);
    }

    const format = formatDate(currentDate)

    return format;
}


export function getCurrentAndExpireTime() {
    const currentDate = new Date();
    const expireDate = new Date();

    if(process.env.NODE_ENV === 'dev'){
        currentDate.setHours(expireDate.getHours());
        expireDate.setHours(expireDate.getHours());
    }else{
        currentDate.setHours(expireDate.getHours()+7);
        expireDate.setHours(expireDate.getHours()+7);
    }
    
    expireDate.setHours(23);
    expireDate.setMinutes(59);
    expireDate.setSeconds(59);

    return {current : formatDate(currentDate) , expire : formatDate(expireDate)};
}

//------------------------

/** 
*    @param {string} expire_date 2024-02-01 17:02:43
*    @returns {boolean} return true if token is expired
*    
*/

export function isExpired( expiration) {
    const expirationDate = new Date(expiration);
    const currentDate = new Date();

    const expirationTime = expirationDate.getTime();
    const currentTime = currentDate.getTime();

    return expirationTime < currentTime;
}



