const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX - 9}px`;
    cursor.style.top = `${e.clientY - 9}px`;
});

document.addEventListener('mousedown', (e) => {
    cursor.style.transform = 'scale(0.8)';

    const wave = document.createElement('div');
    wave.className = 'wave';
    wave.style.left = `${e.clientX}px`;
    wave.style.top = `${e.clientY}px`;
    document.body.appendChild(wave);

    wave.addEventListener('animationend', () => {
        wave.remove();
    });
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});
