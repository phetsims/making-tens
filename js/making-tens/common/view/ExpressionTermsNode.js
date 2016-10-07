// Copyright 2015, University of Colorado Boulder

/**
 * The node that displays the sum of all paper numbers placed on the explorer screen
 * TODO: Also used on the game screen, in a different context, and with an additional term? Doc?
 * TODO: Not even used on the Explore screen?!?
 *
 * @author Sharfudeen Ashraf
 */
define( function( require ) {
  'use strict';

  // modules
  var makingTens = require( 'MAKING_TENS/makingTens' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var HBox = require( 'SCENERY/nodes/HBox' );

  // constants
  var TERM_FONT = new PhetFont( { size: 45, weight: 'bold' } );
  var EQUATION_FONT = new PhetFont( { size: 45, weight: 'bold' } );
  var EQUATION_COLOR = 'rgb(63,63,183)';
  var STROKE_COLOR = '#000';
  var LINE_DASH = [ 5, 5 ];

  /**
   * @constructor
   */
  function ExpressionTermsNode( expressionTerms, options ) {
    var self = this;

    options = options || {
      highlightBorders: false
    };

    Node.call( this, options );

    var leftNumberDisplayBackground = new Rectangle( 0, 0, 100, 78, 10, 10, {
      stroke: STROKE_COLOR,
      lineDash: LINE_DASH,
      lineWidth: 2
    } );

    var rightNumberDisplayBackground = new Rectangle( 0, 0, 100, 78, 10, 10, {
      stroke: STROKE_COLOR,
      lineDash: LINE_DASH,
      lineWidth: 2
    } );

    this.plusNode = new Text( '+', { font: EQUATION_FONT, fill: EQUATION_COLOR } );
    this.equalsSignNode = new Text( '=', { font: EQUATION_FONT, fill: EQUATION_COLOR } );

    this.numberDisplayBox = new HBox( {
      children: [ leftNumberDisplayBackground, this.plusNode,
        rightNumberDisplayBackground ],
      spacing: 5,
      resize: false // since we toggle the stroke
    } );

    this.leftTermTextNode = new Text( '', { font: TERM_FONT, fill: EQUATION_COLOR } );
    this.rightTermTextNode = new Text( '', { font: TERM_FONT, fill: EQUATION_COLOR } );
    this.leftTermTextNode.setDirection( 'rtl' );

    this.addChild( this.leftTermTextNode );
    this.addChild( this.rightTermTextNode );
    this.addChild( this.numberDisplayBox );
    this.addChild( this.equalsSignNode );

    // The number entry panel uses string to display digits.
    function termToDisplay( termValue ) {
      assert && assert( typeof termValue === 'number' );

      if ( termValue === 0 ) {
        return '';
      }
      else {
        return '' + termValue; // cast to string
      }
    }

    expressionTerms.leftTermProperty.link( function( leftTerm ) {
      self.leftTermTextNode.text = termToDisplay( leftTerm );
    } );

    expressionTerms.rightTermProperty.link( function( rightTerm ) {
      self.rightTermTextNode.text = termToDisplay( rightTerm );
      self.layout();
    } );

    // TODO: separate highlightBorders into a separate parameter (presumably)
    if ( options.highlightBorders ) {
      expressionTerms.activeTermProperty.link( function( term ) {
        leftNumberDisplayBackground.stroke = ( term === 'lt' ) ? STROKE_COLOR : null;
        rightNumberDisplayBackground.stroke = ( term === 'rt' ) ? STROKE_COLOR : null;
        self.equalsSignNode.visible = expressionTerms.hasBothTerms();
      } );

    }

    this.leftTermTextNode.left = this.numberDisplayBox.left + leftNumberDisplayBackground.width / 1.2;
    this.leftTermTextNode.centerY = this.numberDisplayBox.centerY;

    this.rightTermTextNode.left = this.numberDisplayBox.left + rightNumberDisplayBackground.left + rightNumberDisplayBackground.width / 8;
    this.rightTermTextNode.centerY = this.numberDisplayBox.centerY;

    this.equalsSignNode.centerY = this.rightTermTextNode.centerY = this.numberDisplayBox.centerY;

    if ( !options.highlightBorders ) {
      leftNumberDisplayBackground.visible = false;
      rightNumberDisplayBackground.visible = false;
    }
  }

  makingTens.register( 'ExpressionTermsNode', ExpressionTermsNode );

  return inherit( Node, ExpressionTermsNode, {
    layout: function() {
      this.equalsSignNode.left = this.numberDisplayBox.right + this.rightTermTextNode.bounds.width - 60;
    }
  } );

} );
