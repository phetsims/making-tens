// Copyright 2015, University of Colorado Boulder

/**
 *
 * @author Sharfudeen Ashraf
 */
define( function( require ) {
  'use strict';

  // modules
  var makingTens = require( 'MAKING_TENS/makingTens' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var MakingTensCommonModel = require( 'MAKING_TENS/making-tens/common/model/MakingTensCommonModel' );
  var ExpressionTerms = require( 'MAKING_TENS/making-tens/common/model/ExpressionTerms' );
  var PaperNumberModel = require( 'MAKING_TENS/making-tens/common/model/PaperNumberModel' );
  var MakingTensSharedConstants = require( 'MAKING_TENS/making-tens/common/MakingTensSharedConstants' );

  /**
   *
   * @constructor
   */
  function MakingTensAddingModel() {
    // leftTerm,rightTerm,activeTerm and showBackground
    this.expressionTerms = new ExpressionTerms( {
      highlightBorders: true
    } );
    MakingTensCommonModel.call( this, {} );
  }

  makingTens.register( 'MakingTensAddingModel', MakingTensAddingModel );

  return inherit( MakingTensCommonModel, MakingTensAddingModel, {

    /**
     * creates PaperNumbers based on the values entered through keyboard
     */
    createTerms: function() {
      var self = this;
      this.paperNumbers.clear();
      var valuesToCreate = [ self.expressionTerms.leftTerm, self.expressionTerms.rightTerm ];

      var xOffSet = 200;
      _.each( valuesToCreate, function( numberValue ) {
        if ( numberValue ) {
          var initialPosition = new Vector2( xOffSet, MakingTensSharedConstants.PAPER_NUMBER_PLACEMENT_BOUNDS.height / 3.5 );
          //Keyboard Terms returns as String, so cast it to number
          self.addPaperNumber( new PaperNumberModel( numberValue, initialPosition ) );
          xOffSet += 350;
        }

      } );
    },

    /**
     * @override
     */
    reset: function() {
      MakingTensCommonModel.prototype.reset.call( this );
      this.paperNumbers.clear();
      this.expressionTerms.reset();
    }

  } );
} );