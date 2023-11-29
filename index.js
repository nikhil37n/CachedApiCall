function cachedApiCall(time) {
    const cache = {};
    return async (url, config = {}) => {
        const key = `${url}${JSON.stringify(config)}`;
        const entry = cache[key];
        if(!entry || Date.now() > entry.expiry) {
            console.log('Making a new API call');
            try{
                let resp = await fetch(url, config);
                resp = await resp.json();
                cache[key] = {value: resp, expiry: Date.now() + time};
            } catch(error) {
                console.log('Error while making API call', error);
            }
        }
    }
}

const call = cachedApiCall(1500);
call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log(a));
setTimeout(() => {
    call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log(a));
},800)
setTimeout(() => {
    call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log(a));
},1600)
