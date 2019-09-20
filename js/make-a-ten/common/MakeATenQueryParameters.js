// Copyright 2016-2019, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const makeATen = require( 'MAKE_A_TEN/makeATen' );

  const MakeATenQueryParameters = QueryStringMachine.getAll( {

    // Initializes the Explore screen with specific numbers, spaced horizontally,
    // e.g. ?exploreNumbers=10,51, where 0 indicates none.
    exploreNumbers: {
      type: 'array',
      elementSchema: {
        type: 'number'
      },
      defaultValue: [ 10 ]
    }
  } );

  makeATen.register( 'MakeATenQueryParameters', MakeATenQueryParameters );

  return MakeATenQueryParameters;
} );
