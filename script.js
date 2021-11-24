'use strict'

document.getElementById('search-form').onsubmit = (e) => {
    e.preventDefault()
    let input = e.target['user-input'].value

    fetchUserData('./data/users.json').then(data => {
        let sortedUsers = [...data]
        if (input) {
            sortedUsers = searchUsers(sortedUsers, input)
        }
        outputData(sortedUsers)
    })
    e.target.reset()
}

function outputData(arr) {
    const searchResults = document.getElementById('search-result')
    searchResults.innerHTML = ''
    let html = ''
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            html += `<ol><li>
            ${i}
            - ${arr[i].firstName} ${arr[i].lastName}
            - Email: ${arr[i].email}
        </li></ol>    
        `
        }
    } else {
        html = '<ol><li>404 User not found</li><ol>'
    }
    searchResults.innerHTML = html
}

function searchUsers(arr, input) {
    input.toLowerCase()
    arr = arr.filter(i => {
        return (
            i.firstName.toLowerCase().startsWith(input) ||
            i.lastName.toLowerCase().startsWith(input) ||
            (i.firstName.toLowerCase() + ' ' + i.lastName.toLowerCase()).startsWith(input)
        )
    })
    return arr
}

async function fetchUserData(url) {
    const res = await fetch(url)
    const data = await res.json()
    return data
}