let passwordInput = document.querySelector('.password')
let showPasswordButton = document.querySelector('.password-button')
let face = document.querySelector('.face')

passwordInput.addEventListener('focus', event => {
  document.querySelectorAll('.hand').forEach(hand => {
    hand.classList.add('hide')
  })
  document.querySelector('.tongue').classList.remove('breath')
})

passwordInput.addEventListener('blur', event => {
  document.querySelectorAll('.hand').forEach(hand => {
    hand.classList.remove('hide')
    hand.classList.remove('peek')
  })
  document.querySelector('.tongue').classList.add('breath')
})


let inputs = document.querySelectorAll('.username, .name, .university');

inputs.forEach(input => {
  input.addEventListener('focus', event => {
    let length = Math.min(input.value.length - 5, 30);
    document.querySelectorAll('.hand').forEach(hand => {
      hand.classList.remove('hide');
      hand.classList.remove('peek');
    });

    face.style.setProperty('--rotate-head', `${-length}deg`);
  });

  input.addEventListener('blur', event => {
    face.style.setProperty('--rotate-head', '0deg');
  });

  input.addEventListener('input', _.throttle(event => {
    let length = Math.min(event.target.value.length - 5, 15 );

    face.style.setProperty('--rotate-head', `${-length}deg`);
  }, 10));
});

