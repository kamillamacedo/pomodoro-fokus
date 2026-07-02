const html = document.querySelector('html');
const focusbtt = document.querySelector('.app__card-button--focus');
const shortbtt = document.querySelector('.app__card-button--short');
const longbtt = document.querySelector('.app__card-button--long');

focusbtt.addEventListener('click', () =>{
    html.setAttribute('data-context', 'focus')
});

shortbtt.addEventListener('click', () =>{
    html.setAttribute('data-context', 'short-break')
});

longbtt.addEventListener('click', () =>{
    html.setAttribute('data-context', 'long-break')
});