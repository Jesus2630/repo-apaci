const generarID = ()=>{
    const password_hash =  Date.now().toString(32) + Math.random().toString(32).substring(2);
    return password_hash;
}

export default generarID;