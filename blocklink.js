document.addEventListener('click', e => {
    //preventing by default at first because e.preventDefault() doesn't work after async call.
    e.preventDefault();
    getStorageValue("enabled").then(result => {
        var anchorElement = e.target.closest('a');
        if (!result) {
            //if not enabled, letting user click links by setting window.location
            if (anchorElement && anchorElement.href) {
                window.location = anchorElement.href;
            }
        }
    });
})

async function getStorageValue(key) {
    let p = new Promise(((resolve, reject) => {
        chrome.storage.sync.get(key, (result) => {
            resolve(result[key]);
        });
    }))
    return await p;
}

