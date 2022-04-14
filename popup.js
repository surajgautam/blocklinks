const ENABLED = "enabled";

const showStatus = async () => {
    getStorageValue(ENABLED).then(result => {
        var status = document.getElementById('status');
        var button = document.getElementById('enable');
        if (!result) {
            status.innerText = 'Disabled';
            button.innerText = 'Enable';
            button.className = 'btn btn-success';
            status.className = 'text-danger';
            status.style.color = 'red';
        } else {
            status.innerText = 'Enabled';
            button.innerText = 'Disable';
            button.className = 'btn btn-danger';
            status.className = 'text-success';
        }
    });
}

const setStorageValue = (key, value) => {
    let obj = {
        [key]: value
    };
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set(obj, () => {
            resolve(value);
        })
    })

}

const getStorageValue = async (key) => {
    let p = new Promise(((resolve, reject) => {
        chrome.storage.sync.get(key, (result) => {
            resolve(result[key]);
        });
    }))
    return await p;
}

enable.addEventListener("click", async () => {
    getStorageValue(ENABLED).then(value => {
        setStorageValue(ENABLED, !value)
            .then(result => {
                showStatus();
            })
    })
});

// when the dom is loaded, set value to false i.e the extension is disabled
document.addEventListener('DOMContentLoaded', () => {
    getStorageValue(ENABLED).then(result => {
        if (result === undefined) {
            setStorageValue(ENABLED, false).then(result => {
                showStatus();
            })
        } else {
            showStatus();
        }
    })
})
