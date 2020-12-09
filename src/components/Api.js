// ПРИМЕР ИНИЦИАЛИЗАЦИИ КЛАССА const api = new Api({
//     baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
//     headers: {
//       authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//       'Content-Type': 'application/json'
//     }
//   }); 


// fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
//   headers: {
//     authorization: '8bcd8154-9450-4170-8ca5-d5b37663d1a8'
//   }
// })

export default class Api {
    constructor(options) {
        this._url = options.baseUrl
        this._token = options.headers
        this._method = options.method
        this._body = options.body
    }



    getProfile() {
        this._avatar = document.querySelector('.profile__avatar')
        this._profileName = document.querySelector('.profile__name')
        this._about = document.querySelector('.profile__about-self')
        return fetch(this._url + '/users/me', {
            headers: this._token
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
            
        }).then( data => {
            this._avatar.src = data.avatar
            this._profileName.textContent = data.name
            this._about.textContent = data.about
        }).catch(err => {console.log(err)});
    }

    getCards() {
        return fetch(this._url + '/cards', {
            headers: this._token
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
            
        })
    }

    changeProfile() {
        return fetch(this._url + '/users/me', {
            method: this._method,
            headers: this._token,
            body: this._body
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
            
        })
    }

    changeAvatar() {
        return fetch(this._url + '/users/me/avatar', {
            method: this._method,
            headers: this._token,
            body: this._body
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
            
        })
        
    }

    addCard() {
        return fetch(this._url + '/cards', {
            method: this._method,
            headers: this._token,
            body: this._body
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    deleteCard(id_card) {
        return fetch(this._url +`/cards/${id_card}`, {
            method: this._method,
            headers: this._token
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    toggleLike(id_card) {
        return fetch(this._url +`/cards/likes/${id_card}`, {
            method: this._method,
            headers: this._token
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    updateAvatar() {
        {
            return fetch(this._url +'users/me/avatar', {
                method: this._method,
                headers: this._token,
                body: this._body
            }).then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
        }
    }


}