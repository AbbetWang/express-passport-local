export async function checkUser(user, password) {
    //... fetch user from a db etc.
 
    const match = await bcrypt.compare(password, user.password);
 
    if(match) {
        console.log('success')
    }
}