'use client'


export function getUser() {

    const userJSON = localStorage.getItem('user');

 
    const user = JSON.parse(userJSON);

    return user;
}
