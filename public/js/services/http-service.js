/*class HttpService {
    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({ 'content-type': 'application/json' });

        return fetch(url, {
            method: method,
            headers: fetchHeaders,
            body: JSON.stringify(data)
        }).then(x => {
            return x.json();
        });
    }
}*/

class HttpService {
    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({ 'content-type': 'application/json', ...headers });
        
        return fetch(url, {
            method: method,
            headers: fetchHeaders,
            body: JSON.stringify(data)
        }).then(x => {
            if (x.ok) {
                return x.text().then((text) => text ? JSON.parse(text) : {})
            } else {
                throw new Error('Network response was not ok.');
            }
        });
    }
}

export const httpService = new HttpService();