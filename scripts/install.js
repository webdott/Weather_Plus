// let deferredInstallPrompt = null;
// const installButton = document.querySelector('.install__button');
// installButton.addEventListener('click', installPWA);

// window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);


// const saveBeforeInstallPromptEvent = (evt) => {
//     //Add code to save event and show the install button
//     deferredInstallPrompt = evt;
//     installButton.removeAttribute('hidden');
// }

// const installPWA = (evt) => {
//     //Add code to show install prompt and hide the install button
//     deferredInstallPrompt.prompt();
//     //Hide install button, it cant be called twice
//     evt.srcElement.setAttribute('hidden', true);

//     //Log user response to prompt
//     deferredInstallPrompt.userChoice
//     .then((choice) => {
//         if (choice.outcome === 'accepted') {
//             console.log('User accepted the A2HS prompt', choice);
//         } else {
//             console.log('User dismissed the A2HS prompt', choice);
//         }
//         deferredInstallPrompt = null;
//     });
// }

// window.addEventListener('appinstalled', logAppInstalled);

// const logAppInstalled = (evt) => {


//     //Add code to log event
//     console.log('WeatherPlus App was installed', evt);
// }