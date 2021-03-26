// Récupération de l'API

function get(url){
    const promise = new Promise(function(resolve, reject){
        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.onreadystatechange = function(){
            if (this.readyState === XMLHttpRequest.DONE){
                if(this.status === 200){
                    resolve(JSON.parse(request.responseText));
                }else{
                    reject(request.status);
                }
            }
        };
        request.send(); 
    });
    return promise;
}

// Renvoi de l'API

function post(url, data){
    const promise = new Promise(function(resolve, reject){
        const request = new XMLHttpRequest();
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.onreadystatechange = function () {
            if (this.readyState === 4){
                if(this.status === 201){
                    resolve(JSON.parse(this.responseText));
                 }else{
                    reject(request.status);
                }
            }
        };
        request.send(JSON.stringify(data));
    });
    return promise;
}