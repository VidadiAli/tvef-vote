export const AlertEvent = (text, color) => {
    const thisAlert = document.createElement('span');
    thisAlert.className = 'this-alert';
    thisAlert.textContent = text;
    thisAlert.style.color = color;

    document.getElementsByTagName('section')[0].append(thisAlert);

    setTimeout(() => {
        thisAlert.remove()
    }, 3500);
}