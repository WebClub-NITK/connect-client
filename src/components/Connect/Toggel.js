const Toggel = () => {
    console.log(localStorage.getItem('secondaryToken').toString().length)
    if(localStorage.getItem('secondaryToken').toString().length === 0)
    {
        let tmp = localStorage.getItem('accessToken').toString()
        localStorage.getItem('secondaryToken',tmp)
        window.location.replace('http://localhost:3000/login')
    }
    else
    {
        let tmp1 = localStorage.getItem('accessToken').toString()
        let tmp2 = localStorage.getItem('secondaryToken').toString()
        localStorage.setItem('secondaryToken', tmp1)
        localStorage.setItem('accessToken', tmp2)
        tmp1 = localStorage.getItem('UserId').toString()
        tmp2 = localStorage.getItem('secondaryUserId').toString()
        localStorage.setItem('secondaryUserId', tmp1)
        localStorage.setItem('UserId', tmp2)
    }
}

export default Toggel