// Copyright 2016-2017, University of Colorado Boulder

/**
 * Adding screen for Make a Ten. Allows entering two numbers with a keypad, so that the user can experiment with adding
 * with the sim's usual constraints.
 *
 * @author Sharfudeen Ashraf
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const makeATen = require( 'MAKE_A_TEN/makeATen' );
  const MakeATenAddingModel = require( 'MAKE_A_TEN/make-a-ten/adding/model/MakeATenAddingModel' );
  const MakeATenAddingScreenView = require( 'MAKE_A_TEN/make-a-ten/adding/view/MakeATenAddingScreenView' );
  const MakeATenConstants = require( 'MAKE_A_TEN/make-a-ten/common/MakeATenConstants' );
  const MakeATenUtil = require( 'MAKE_A_TEN/make-a-ten/common/MakeATenUtil' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );

  // images
  const addingHomeScreenImage = require( 'image!MAKE_A_TEN/adding-home-screen.png' );
  const addingNavBarImage = require( 'image!MAKE_A_TEN/adding-nav-bar.png' );

  // strings
  const screenAddingString = require( 'string!MAKE_A_TEN/screen.adding' );

  /**
   * @constructor
   */
  function MakeATenAddingScreen() {

    var options = {
      name: screenAddingString,
      backgroundColorProperty: new Property( MakeATenConstants.SCREEN_BACKGROUND_COLOR ),
      homeScreenIcon: MakeATenUtil.createIconWithBackgroundColor( addingHomeScreenImage, MakeATenConstants.SCREEN_BACKGROUND_COLOR ),
      navigationBarIcon: MakeATenUtil.createIconWithBackgroundColor( addingNavBarImage, MakeATenConstants.SCREEN_BACKGROUND_COLOR )
    };

    Screen.call( this,
      function() { return new MakeATenAddingModel(); },
      function( model ) { return new MakeATenAddingScreenView( model ); },
      options );
  }

  makeATen.register( 'MakeATenAddingScreen', MakeATenAddingScreen );

  return inherit( Screen, MakeATenAddingScreen );
} );
