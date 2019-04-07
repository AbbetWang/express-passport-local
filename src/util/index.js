import * as bcrypt from 'bcrypt'
export const checkUser = async (user, password) => { 
    console.table(user)
    console.log(password)
    const match = await bcrypt.compare(password, user.password);
    console.table(match)
    if(match) {
        console.log('success')
    }
    return match
}
