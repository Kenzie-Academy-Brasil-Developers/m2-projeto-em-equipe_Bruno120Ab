import { callToastify } from "./toastify.js"

export const baseURL = "http://localhost:3333"


export const { token } = getUser()

export const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}` 
}

export const red = "#CE4646"
export const green = "#4BA036"

export function getUser(){
    const user = localStorage.getItem('@KenziePets:tokenUser') || {}
    console.log(user)
    return user
}

export async function getAllMyPets() {
    const pets = await fetch(`${baseURL}/pets/my_pets`, {
        method: "GET",
        headers: headers
    })

    const petsJSON = pets.json()

    if(!pets.ok) {
        callToastify("Erro ao requisitar meus pets", red)
    } else {
        callToastify("Pets requisitados com sucesso", green)
    }

    return petsJSON
}

export async function loginUser(data){
    const user = await fetch(`${baseURL}/session/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })

    const userLogin = await user.json()
   
    if(!user.ok) {
        callToastify("Failed", red)
    } else {
        callToastify("Sucess", green)
        localStorage.setItem('@KenziePets:tokenUser',`${userLogin.token}`)
        setTimeout(()=>{
            window.location.replace("/ProjetoGrupo/m2-projeto-em-equipe_Bruno120Ab/index.html")
        },1000)
    }

    return userLogin

}