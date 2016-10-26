// Copyright 2015, University of Colorado Boulder

/**
 * Contains an arrangement of level selection buttons.
 *
 * @author Sharfudeen Ashraf
 * @author John Blanco
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var makeATen = require( 'MAKE_A_TEN/makeATen' );
  var MakeATenSharedConstants = require( 'MAKE_A_TEN/make-a-ten/common/MakeATenSharedConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelSelectionButton = require( 'MAKE_A_TEN/make-a-ten/game/view/LevelSelectionButton' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var X_OFFSET = 170;
  var Y_OFFSET = 160;

  /**
   * @constructor
   *
   * @param {MakeATenGameModel} gameModel - Our model
   */
  function StartGameLevelNode( gameModel ) {
    Node.call( this );

    // @private {MakeATenGameModel}
    this.gameModel = gameModel;

    // Add the level buttons
    this.addLevelButton( gameModel.levels[ 0 ], -1, -1 );
    this.addLevelButton( gameModel.levels[ 1 ], 0, -1 );
    this.addLevelButton( gameModel.levels[ 2 ], 1, -1 );
    this.addLevelButton( gameModel.levels[ 3 ], -1.5, 0 );
    this.addLevelButton( gameModel.levels[ 4 ], -0.5, 0 );
    this.addLevelButton( gameModel.levels[ 5 ], 0.5, 0 );
    this.addLevelButton( gameModel.levels[ 6 ], 1.5, 0 );
    this.addLevelButton( gameModel.levels[ 7 ], -1, 1 );
    this.addLevelButton( gameModel.levels[ 8 ], 0, 1 );
    this.addLevelButton( gameModel.levels[ 9 ], 1, 1 );
  }

  makeATen.register( 'StartGameLevelNode', StartGameLevelNode );

  return inherit( Node, StartGameLevelNode, {
    /**
     * Adds a level button at a specified x/y offset (in relation to the center, in button offsets)
     * @private
     *
     * @param {Level} level
     * @param {number} xOffset - How many buttons to the right of the horizontal center should we be?
     * @param {number} yOffset - How many buttons to the bottom of the vertical center should we be?
     */
    addLevelButton: function( level, xOffset, yOffset ) {
      var fireCallback = this.gameModel.startLevel.bind( this.gameModel, level );
      var center = MakeATenSharedConstants.LAYOUT_BOUNDS.center.plus( new Vector2( xOffset * X_OFFSET, yOffset * Y_OFFSET ) );

      this.addChild( new LevelSelectionButton( level.iconNode, fireCallback, level.scoreProperty, {
        baseColor: level.color,
        scale: 0.9, // TODO: why?
        center: center
      } ) );
    }
  } );
} );
