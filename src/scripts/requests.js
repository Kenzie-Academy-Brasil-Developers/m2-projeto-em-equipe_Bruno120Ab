import { callToastify } from "./toastify.js"

export const baseURL = "http://localhost:3333"


export const { token } = getUser()

export const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}` 
}

export const red = "#CE4646"
export const green = "#4BA036"

function getUser(){
    const user = localStorage.getItem('@KenziePets:tokenUser') || []
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
    }

    return userLogin

}

async function showPets(){
    const petsNames = await fetch(`${baseURL}/pets`, {
        method: "GET",
        headers: headers
    });
    const petsNamesJSON = await petsNames.json();
    console.log(petsNamesJSON)
    
    const ul = document.querySelector('#petsCards');
    ul.classList.add('cardsAdoption')
    
    petsNamesJSON.forEach(pet => {
        if(pet.available_for_adoption){
            console.log("Ta disponível")
        
            const li = document.createElement('li');
            li.classList.add('card')

            const petName = document.createElement('h2');
            petName.innerText = `${pet.name}`
            petName.classList = "text-1"
            
            const petSpecie = document.createElement ('span')
            petSpecie.innerText = `${pet.species}`
            petSpecie.classList = "text-2"

            const petImage = document.createElement('img');
            petImage.src = `${pet.avatar_url}`;


            ul.append(li);
            li.append(petImage, petName, petSpecie);
        }
    });
}
showPets();