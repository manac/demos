const Query = {
    // params: new URLSearchParams(window.location.search),
    read: (key) => {
        const params = new URLSearchParams(window.location.search);
        console.log(params.get(key));
        return params.get(key);
    }
}