console.log("window.location.hash", window.location.hash)
console.log("window.location.port", window.location.port)
console.log("window.location.host, window.location.host")
console.log("window.location.hostname", window.location.hostname)

const app = document.querySelector('#app')

const hashLinks = document.querySelectorAll('.hash-route-link')

const routes = {
    "": {
        title: "Ana Sayfa",
        isApi: false,
        data: "./home.html",
    },
    "#todos": {
        title: "Todo List",
        isApi: true,
        data: "https://jsonplaceholder.typicode.com/todos/",
    },
    "#about": {
        title: "About Us",
        data: "./about-us.html",
        isApi: false,
    },
    "#contact": {
        title: "Contact",
        data: "contact.html",
        isApi: false,
    },
}

function checkRoute(hash = window.location.hash) {
    document.title = routes[hash].title
    const dataUrl = routes[hash].data
    isApi = routes[hash].isApi
    if (isApi) {
        app.innerHTML = ""
        const createUl = document.createElement('ul')
        app.append(createUl)
        
        fetch(dataUrl).then(res => res.json()).then(data => {
            data.forEach(item => {
                const createLi = document.createElement('li')
                createLi.innerHTML = item.title
                createUl.append(createLi)
            })
        })
    } else if (!isApi) {
        fetch(dataUrl).then(res => res.text()).then(data => app.innerHTML = data)
    }
    
}

hashLinks.forEach(item => item.addEventListener("click", (event) => {
    checkRoute(item.hash)
}))

checkRoute()