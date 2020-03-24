const hmbtn = document.querySelector('#hamburger');
const ow = document.querySelector('#overview');

const changeFunction = () =>{

    if (ow.style.display == 'none'){
        ow.style.display = 'block';
        hmbtn.style.left = '24%';
    } else {
        ow.style.display = 'none';
       hmbtn.style.left = '1rem';
    }
}