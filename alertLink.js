document.addEventListener('click', e => {
    getStorageValue("enabled").then(result => {
        if (result) {
            var anchorElement = e.target.closest('a');
            if (anchorElement && anchorElement.href) {
                alert('prevented')
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                return false;
            }
        }
    });
})

const getStorageValue = async (key) => {
    let p = new Promise(((resolve, reject) => {
        chrome.storage.sync.get(key, (result) => {
            resolve(result[key]);
        });
    }))
    return await p;
}
