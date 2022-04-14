// document.addEventListener('click', e => {
//     getStorageValue("enabled").then(result => {
//         if (result) {
//             alert(JSON.stringify(e.target))
//             var anchorElement = e.target.closest('a');
//             if (anchorElement) {
//                 alert(JSON.stringify(e))
//                 alert(JSON.stringify(anchorElement))
//                 anchorElement.preventDefault();
//             }
//         }
//     });
// })
$(document).ready(function () {
    $('a').click(
        function (e) {
            getStorageValue("enabled").then(result => {
                if(result) {
                    alert(JSON.stringify(e))
                    // e.preventDefault();
                    // e.stopPropagation();
                    return false;
                }
            });
        }
    );
})

const getStorageValue = async (key) => {
    let p = new Promise(((resolve, reject) => {
        chrome.storage.sync.get(key, (result) => {
            if (result) {
                resolve(result[key])
            } else {
                reject('error')
            }
        });
    }))
    return await p;
}
