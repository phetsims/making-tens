// Copyright 2016, University of Colorado Boulder

/**
 * Dialog that describes each game level.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var makeATen = require( 'MAKE_A_TEN/makeATen' );
  var Dialog = require( 'JOIST/Dialog' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Node = require( 'SCENERY/nodes/Node' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // Template for inserting the level number
  var gameInfoLevelXString = require( 'string!MAKE_A_TEN/game.info.levelX' );

  var LEVEL_NUMBER_FONT = new PhetFont( { size: 14, weight: 'bold' } );
  var LEVEL_DESCRIPTION_FONT = new PhetFont( 14 );

  /**
   * @constructor
   *
   * @param {Array.<Level>} levels - All game levels
   */
  function InfoDialog( levels ) {
    var padWidth = new Text( StringUtils.format( gameInfoLevelXString, '10' ), { font: LEVEL_NUMBER_FONT } ).width + 20;
    function createLevelNode( level ) {
      return new Node( {
        children: [
          new Text( StringUtils.format( gameInfoLevelXString, '' + level.number ), {
            font: LEVEL_NUMBER_FONT
          } ),
          new Text( level.description, {
            font: LEVEL_DESCRIPTION_FONT,
            x: padWidth
          } )
        ]
      } );
    }
    var contentNode = new VBox( {
      align: 'left',
      spacing: 14,
      children: levels.map( createLevelNode )
    } );

    Dialog.call( this, contentNode, {
      modal: true,
      hasCloseButton: false
    } );
  }

  makeATen.register( 'InfoDialog', InfoDialog );

  return inherit( Dialog, InfoDialog );
} );
