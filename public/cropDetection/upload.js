const uploadbtn = document.getElementsByTagName('button')[0];
const photo = document.querySelector('#file-input');
const display = document.querySelector('.display');
const add_loading = document.querySelector('.loading');


uploadbtn.addEventListener('click', (e) => {
    e.preventDefault();

    add_loading.innerHTML = 'Loading ...';
    uploadbtn.disabled =true;

    const url = 'https://api.rahulvishwakarma.in/predict';
    const formdata = new FormData();
    const file = photo.files[0];
    formdata.append('file', file);

    const fetchOptions = {
        method: "post",
        body: formdata
    };

    fetch(url, fetchOptions)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            display.innerHTML = `Disease: ${data.disease}`;
            add_loading.innerHTML = 'Upload';
            uploadbtn.disabled = false;
        }).catch((error)=> console.log(error));
})