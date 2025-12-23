import { __ } from '@wordpress/i18n';

// Cache the root <html> element to avoid repeated DOM queries.
const rootElement = document.documentElement;
const themeToggles = document.querySelectorAll(
	'.wp-block-tabor-dark-mode-toggle__input'
);

function updateToggleState( toggle, isLightMode ) {
	toggle.checked = isLightMode;
	toggle.setAttribute( 'aria-checked', isLightMode.toString() );
	toggle.setAttribute(
		'aria-label',
		isLightMode
			? __(
					'Switch to dark mode, currently light',
					'dark-mode-toggle-block'
			  )
			: __(
					'Switch to light mode, currently dark',
					'dark-mode-toggle-block'
			  )
	);
}

function toggleTheme() {
	// Toggle the 'theme-light' class.
	rootElement.classList.toggle( 'theme-light' );
	const isLightMode = rootElement.classList.contains( 'theme-light' );

	// Update localStorage based on the presence of the class.
	localStorage.setItem( 'lightMode', isLightMode ? 'enabled' : 'disabled' );

	// Update all toggles' states
	themeToggles.forEach( ( toggle ) =>
		updateToggleState( toggle, isLightMode )
	);
}

// Initialize all toggles
themeToggles.forEach( ( toggle ) => {
	// Set initial state
	const isLightMode = rootElement.classList.contains( 'theme-light' );
	updateToggleState( toggle, isLightMode );

	// Attach event listeners
	toggle.addEventListener( 'click', toggleTheme );
	toggle.addEventListener( 'keydown', ( e ) => {
		if ( e.code === 'Space' || e.code === 'Enter' ) {
			e.preventDefault();
			toggleTheme();
		}
	} );
} );
