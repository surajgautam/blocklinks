const showStatus = () => {
    var status = document.getElementById('status');
    var button = document.getElementById('enable');
    const statusValue = status.innerText;
    if (statusValue === 'Enabled') {
        status.innerText = 'Disabled';
        button.innerText = 'Enable';
        button.className = 'btn btn-success';
        status.className = 'text-danger';
        status.style.color = 'red';
    } else if (statusValue === 'Disabled') {
        status.innerText = 'Enabled';
        button.innerText = 'Disable';
        button.className = 'btn btn-danger';
        status.className = 'text-success';
    }
}

const setEnabled = (value) => {
    chrome.storage.sync.set({"enabled": value}, () => {
    });
}

const syncEnabled = () => {
    chrome.storage.sync.get(["enabled"], (result) => {
        setEnabled(!result.value)
    })
}

enable.addEventListener("click", async () => {
    showStatus();
    syncEnabled();
});

document.addEventListener('DOMContentLoaded', () => {
    setEnabled(false);
})
