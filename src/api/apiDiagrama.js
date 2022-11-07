import { Api } from "../const/api";

export const apiDiagrama = (endpoint, method = "GET", data = null) => {

    console.log(method);
    console.log(endpoint);
    console.log(data);
    if (data) {
        return fetch(Api.url + endpoint, {
            method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .catch((err) => console.log(Api.url + endpoint + ":error " + err));
    }

    return fetch(Api.url + endpoint)
        .then((res) => res.json())
        .catch((err) => console.log(Api.url + endpoint + ":error " + err));
}