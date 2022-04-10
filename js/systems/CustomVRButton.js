

class CustomVRButton{

	constructor( renderer ) {
        this.renderer = renderer;
        
        if ( 'xr' in navigator ) {
            const button = document.createElement('div')
            button.id = 'VRbtn'
            button.style.display = "block"
            document.body.appendChild ( button )

            navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
                supported ? this.showEnterVR( button ) : this.showWebXRNotFound( button )
            })

		} else {
            const message = document.createElement( 'a' );
			if ( window.isSecureContext === false ) {
				message.href = document.location.href.replace( /^http:/, 'https:' );
				message.innerHTML = 'WEBXR NEEDS HTTPS'; 
			} else {
				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';
			}

			message.style.left = '0px';
			message.style.width = '100%';
			message.style.textDecoration = 'none';
            message.style.bottom = '0px';
            message.style.opacity = '1';
            
            document.body.appendChild ( message );
		}

    }

	showEnterVR( button ) {
        let currentSession = null
        const self = this
        // button.style.display = 'block';
        button.innerHTML = `Enter VR`;

        function onSessionStarted( session ) {
            session.addEventListener( 'end', onSessionEnded );
            self.renderer.xr.setSession( session );
            button.textContent = 'EXIT VR';
            currentSession = session;
        }

        function onSessionEnded( ) {
            currentSession.removeEventListener( 'end', onSessionEnded );
            button.textContent = 'ENTER VR';
            currentSession = null;
        }

        button.onclick = function () {
            if ( currentSession === null ) {
                var sessionInit = { optionalFeatures: [ 'local-floor', 'bounded-floor' ] };
                navigator.xr.requestSession( 'immersive-vr', sessionInit ).then( onSessionStarted );
            } else {
                currentSession.end();
            }

        }
    }

    showWebXRNotFound( button ) {    
        button.style.backgroundColor = 'red';
        button.style.display = 'block';
        button.innerHTML = 'VR NOT SUPPORTED';
    }

    disableButton( button ) {
        button.style.cursor = 'auto';
        button.style.opacity = '0.5';
        button.onmouseenter = null;
        button.onmouseleave = null;
        button.onclick = null;

    }
};

export { CustomVRButton };
