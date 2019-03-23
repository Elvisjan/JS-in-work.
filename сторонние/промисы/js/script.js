let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd'),
    message = {
        failure: 'Отстой, ошибка!'
    }

function zakolebalsya(elem) {
    elem.addEventListener('input', function () {
        function myAsyncFunction(url) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.onload = function () {
                    if (xhr.readyState === 4 && xhr.status == 200) {
                        resolve(xhr.response)
                    } else {
                        reject(xhr.status);
                    }
                };

                xhr.send();
            });
        }
        myAsyncFunction('js/current.json')
            .then(function (text) {
                return JSON.parse(text);
            })
            .then(function (data) {
                inputUsd.value = (inputRub.value / data.usd).toFixed(2);                
            })
            .catch(console.log(message.failure))
            .then(setTimeout(console.clear(), 5000))

    })
}
zakolebalsya(inputRub);