export const login = async(username:string,password:string)=>{

    const res = await fetch('http://localhost:4000/user/login',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({username,password})
    })

    if (!res.ok){
        throw new Error("login failed")
    }

    const data = await res.json()
    localStorage.setItem('token',data.token)

}

