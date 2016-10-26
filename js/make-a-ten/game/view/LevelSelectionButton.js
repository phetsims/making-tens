// Copyright 2015, University of Colorado Boulder

/**
 * Button for selecting a game level. The user of MakeATen game
 * can play as many level as he wants and there is no such thing as perfect score.
 * The Vegas LevelSelectionButton is copied over to MakeATen, because of the need to display
 * the score in "Text", next  to the star symbol.
 *
 *
 * @author Sharfudeen Ashraf
 * @author John Blanco
 * @author Chris Malley
 */
define( function( require ) {
  'use strict';

  // modules
  var makeATen = require( 'MAKE_A_TEN/makeATen' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var GameTimer = require( 'VEGAS/GameTimer' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ScoreNode = require( 'MAKE_A_TEN/make-a-ten/game/view/ScoreNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var Text = require( 'SCENERY/nodes/Text' );

  // constants
  var SCALING_TOLERANCE = 1E-4; // Empirically chosen as something the human eye is unlikely to notice.

  // TODO: Consider making this commonly accessible (or finding a better way to do it).
  // Create a node that is scaled and padded out to meet the size specification.
  function createSizedImageNode( icon, size ) {
    icon.scale( Math.min( size.width / icon.bounds.width, size.height / icon.bounds.height ) );
    if ( Math.abs( icon.bounds.width - size.width ) < SCALING_TOLERANCE &&
         Math.abs( icon.bounds.height - size.height ) < SCALING_TOLERANCE ) {
      // The aspect ratio of the icon matched that of the specified size, so no padding is necessary.
      return icon;
    }
    // else padding is needed in either the horizontal or vertical direction.
    var background = Rectangle.dimension( size, { fill: null } );
    icon.center = background.center;
    background.addChild( icon );
    return background;
  }

  /**
   * @param {Node} icon Scenery node that appears on the button above the progress indicator, scaled to fit
   * @param {function} fireFunction Called when the button fires
   * @param {Property.<number>} scoreProperty
   * @param {Object} [options]
   * @constructor
   */
  function LevelSelectionButton( icon, fireFunction, scoreProperty, options ) {

    Node.call( this );

    options = _.extend( {
      // button size and appearance
      buttonWidth: 150,
      buttonHeight: 150,
      cornerRadius: 10,
      baseColor: 'rgb( 242, 255, 204 )',
      buttonXMargin: 10,
      buttonYMargin: 10,
      // progress indicator (stars)
      scoreNodeProportion: 0.2, // percentage of the button height occupied by the progress indicator, (0,0.5]
      scoreNodeMinXMargin: 10,
      scoreNodeMinYMargin: 5,
      iconToscoreNodeYSpace: 10,
      // best time (optional)
      bestTimeProperty: null, // null if no best time || {Property.<number>} best time in seconds
      bestTimeVisibleProperty: null, // null || Property.<boolean>} controls visibility of best time
      bestTimeFill: 'black',
      bestTimeFont: new PhetFont( 24 ),
      bestTimeYSpacing: 10,  // vertical space between drop shadow and best time
      // phetio.js
      phetioID: null
    }, options );

    assert && assert( options.scoreNodeProportion > 0 && options.scoreNodeProportion <= 0.5, 'scoreNodeProportion value out of range' );

    var maxContentWidth = options.buttonWidth - 2 * options.buttonXMargin;

    // Progress indicator (stars), scaled to fit
    var scoreNodeBackground = new Rectangle( 0, 0, maxContentWidth,
      options.buttonHeight * options.scoreNodeProportion, options.cornerRadius, options.cornerRadius, {
        fill: 'white',
        stroke: 'black',
        lineWidth: 1,
        pickable: false
      } );
    var scoreNode = new ScoreNode( scoreProperty, {
      pickable: false
    } );
    scoreNode.scale( Math.min(
      ( scoreNodeBackground.width - 2 * options.scoreNodeMinXMargin ) / scoreNode.width,
      ( scoreNodeBackground.height - 2 * options.scoreNodeMinYMargin ) / scoreNode.height ) );

    // Icon, scaled and padded to fit and to make the button size correct.
    var iconSize = new Dimension2( maxContentWidth, options.buttonHeight - scoreNodeBackground.height -
                                                    2 * options.buttonYMargin - options.iconToscoreNodeYSpace );
    var adjustedIcon = createSizedImageNode( icon, iconSize );
    adjustedIcon.pickable = false;

    // Assemble the content.
    var contentNode = new Node();
    if ( scoreNodeBackground.width > adjustedIcon.width ) {
      adjustedIcon.centerX = scoreNodeBackground.centerX;
    }
    else {
      scoreNodeBackground.centerX = adjustedIcon.centerX;
    }
    scoreNodeBackground.top = adjustedIcon.bottom + options.iconToscoreNodeYSpace;
    scoreNode.center = scoreNodeBackground.center;
    contentNode.addChild( adjustedIcon );
    contentNode.addChild( scoreNodeBackground );
    contentNode.addChild( scoreNode );

    // Create the button
    var buttonOptions = {
      content: contentNode,
      xMargin: options.buttonXMargin,
      yMargin: options.buttonYMargin,
      baseColor: options.baseColor,
      cornerRadius: options.cornerRadius,
      listener: fireFunction,
      phetioID: options.phetioID
    };
    var button = new RectangularPushButton( buttonOptions );
    this.addChild( button );

    // Best time (optional), centered below the button, does not move when button is pressed
    if ( options.bestTimeProperty ) {
      var bestTimeNode = new Text( '', { font: options.bestTimeFont, fill: options.bestTimeFill } );
      this.addChild( bestTimeNode );
      options.bestTimeProperty.link( function( bestTime ) {
        bestTimeNode.text = ( bestTime ? GameTimer.formatTime( bestTime ) : '' );
        bestTimeNode.centerX = button.centerX;
        bestTimeNode.top = button.bottom + options.bestTimeYSpacing;
      } );
      if ( options.bestTimeVisibleProperty ) {
        options.bestTimeVisibleProperty.linkAttribute( bestTimeNode, 'visible' );
      }
    }

    // Pass options to parent class
    this.mutate( options );
  }

  makeATen.register( 'LevelSelectionButton', LevelSelectionButton );

  return inherit( Node, LevelSelectionButton );
} );