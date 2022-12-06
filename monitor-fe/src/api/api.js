const URL = process.env.REACT_APP_API_URL;
const getSystemInfo = () => {
    return new Promise((res, rej) =>
        fetch(`${URL}/system`).then(res => res.json()).then((result) => {
            res(result);
        }).catch(err=>res(null))
    );
}

const fetchShutdown = () => {
    return new Promise((res, rej) =>
        fetch(`${URL}/shutdown`).then(res => res()).catch(err=>rej(err))
    );
}

const fetchRestart = () => {
    return new Promise((res, rej) =>
        fetch(`${URL}/restart`).then(res => res()).catch(err=>rej(err))
    );
}

const fetchSleep = () => {
    return new Promise((res, rej) =>
        fetch(`${URL}/sleep`).then(res => res()).catch(err=>rej(err))
    );
}

const fetchApp = (id) => {
    return new Promise((res, rej) =>
        fetch(`${URL}/app/${id}`).then(res => res()).catch(err=>rej(err))
    );
}

module.exports = {
    getSystemInfo,
    fetchApp,
    fetchRestart,
    fetchShutdown,
    fetchSleep
}