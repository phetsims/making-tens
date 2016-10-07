// Copyright 2015, University of Colorado Boulder

/**
 *
 *
 * @author Sharfudeen Ashraf
 */
define( function( require ) {
  'use strict';

  // modules
  var makingTens = require( 'MAKING_TENS/makingTens' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * TODO: fix documentation here
   * @param [{number|null}leftTerm,{number|null}rightTerm,{string|null}activeTerm,{boolean|null}highlightBorders} options]
   * @constructor
   */
  function ExpressionTerms( options ) {
    if ( !options ) {
      options = {};
    }
    assert && assert( options.leftTerm === undefined || typeof options.leftTerm === 'number', 'Types' );
    assert && assert( options.rightTerm === undefined || typeof options.rightTerm === 'number', 'Types' );
    assert && assert( options.activeTerm === undefined || typeof options.activeTerm === 'string', 'Types' );
    assert && assert( options.highlightBorders === undefined || typeof options.highlightBorders === 'boolean', 'Types' );

    options = options || {};
    PropertySet.call( this, {
      leftTerm: options.leftTerm !== undefined ? options.leftTerm : 0,
      rightTerm: options.rightTerm !== undefined ? options.rightTerm : 0,
      activeTerm: options.activeTerm !== undefined ? options.activeTerm : 'none', // TODO: enumeration?
      highlightBorders: options.highlightBorders !== undefined ? options.highlightBorders : false // looks like a cast to false?
    } );

  }

  makingTens.register( 'ExpressionTerms', ExpressionTerms );

  return inherit( PropertySet, ExpressionTerms, {

    /**
     * Useful for showing equals sign
     *
     * @returns {boolean}
     */
    hasBothTerms: function() {
      return (this.activeTerm === 'none') && (!!this.leftTerm && !!this.rightTerm);
    },

    reset: function() {
      this.leftTerm = null;
      this.rightTerm = null;
      this.activeTerm = 'none';
    }

  } );

} );