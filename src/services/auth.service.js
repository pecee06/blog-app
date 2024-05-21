import { Client, Account, ID, OAuthProvider } from "appwrite";
import env from "../../env"

class Auth{
    client = new Client()
    account

    constructor(){
        this.client
        .setEndpoint(env.apiEndpoint)
        .setProject(env.projectId)
        this.account = new Account(this.client)
    }

    async signup({email="", password=""}){
        try {
            const res = await this.account.create(ID.unique(), email, password)
            return res
        } catch (err) {
            console.error(err);
            return false
        }
    }

    signupWithGoogle(){
        this.account.createOAuth2Session(OAuthProvider.Google)
    }

    async login({email="", password=""}){
        try {
            const res = await this.account.createEmailPasswordSession(email, password)
            return res
        } catch (err) {
            console.error(err);
            return false
        }
    }

    async getUser(){
        try {
            const res = await this.account.get()
            return res
        } catch (err) {
            console.error(err);
            return false
        }
    }

    async changePassword({oldPassword="", newPassword=""}){
        try {
            const res = await this.account.updatePassword(newPassword, oldPassword)
            return res
        } catch (err) {
            console.error(err);
            return false
        }
    }

    async logout(){
        try {
            const res = await this.account.deleteSessions()
            return res
        } catch (err) {
            console.error(err);
            return false
        }
    }
}

const authService = new Auth
export default authService