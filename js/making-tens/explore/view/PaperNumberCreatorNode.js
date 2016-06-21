// Copyright 2015, University of Colorado Boulder

/**
 * A Scenery node that can be clicked upon to create Paper Number Nodes
 *
 * @author Sharfudeen Ashraf
 */
define( function( require ) {
  'use strict';

  // modules
  var makingTens = require( 'MAKING_TENS/makingTens' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var PaperNumberModel = require( 'MAKING_TENS/making-tens/common/model/PaperNumberModel' );
  var PaperImageCollection = require( 'MAKING_TENS/making-tens/common/model/PaperImageCollection' );
  var MakingTensSharedConstants = require( 'MAKING_TENS/making-tens/common/MakingTensSharedConstants' );
  var Image = require( 'SCENERY/nodes/Image' );

  /**
   * @param {number} numberValue
   * @param {Function} addShapeToModel - A function for adding the created number  to the model
   * @param {Function} canPlaceNumber - A function to determine if the PaperNumber can be placed on the board
   * @constructor
   */
  function PaperNumberCreatorNode( numberValue, addShapeToModel, combineNumbersIfApplicableCallback, canPlaceNumber,
                                   makingTensView ) {
    Node.call( this );
    var thisNode = this;

    // Create the node that the user will click upon to add a model element to the view.
    var representation = new Image( PaperImageCollection.getNumberImage( numberValue ) );
    representation.scale( 0.64, 0.55 );
    this.addChild( representation );

    var paperNumberModel;
    var parentScreenView = null; // needed for coordinate transforms

    // Add the listener that will allow the user to click on this and create a new shape, then position it in the model.
    var paperNumberNodeCreatorDragHandler = new SimpleDragHandler( {

      // Allow moving a finger (touch) across this node to interact with it
      allowTouchSnag: true,

      start: function( event, trail ) {

        // find the parent screen if not already found by moving up the scene graph
        if ( !parentScreenView ) {
          var testNode = thisNode;
          while ( testNode !== null ) {
            if ( testNode instanceof ScreenView ) {
              parentScreenView = testNode;
              break;
            }
            testNode = testNode.parents[ 0 ]; // move up the scene graph by one level
          }
          assert && assert( parentScreenView, 'unable to find parent screen view' );
        }

        // Determine the initial position of the new element as a function of the event position and this node's bounds.
        var upperLeftCornerGlobal = thisNode.parentToGlobalPoint( thisNode.leftTop );
        var initialPosition = parentScreenView.globalToLocalPoint( upperLeftCornerGlobal );

        // Create and add the new model element.
        paperNumberModel = new PaperNumberModel( numberValue, initialPosition );

        //offset based on clicked position
        var selectedPositionOffset = upperLeftCornerGlobal.minus( event.pointer.point );
        // check if the touched point is within the bottom portion of the node else move appropriate distance - issue #41
        var allowedGlobalCreationBounds = thisNode.getGlobalObjectCreationBounds();
        var offsetY = -allowedGlobalCreationBounds.height - selectedPositionOffset.y;
        var selectedPosition = initialPosition.plus( new Vector2( 0, offsetY ) );

        paperNumberModel.setDestination( selectedPosition );
        paperNumberModel.userControlled = true;
        addShapeToModel( paperNumberModel );

      },

      translate: function( translationParams ) {
        if ( !paperNumberModel ) {
          return;
        }
        var newPos = paperNumberModel.position.plus( translationParams.delta );
        paperNumberModel.constrainPosition( makingTensView.availableViewBoundsProperty.get(), newPos );
      },

      end: function( event, trail ) {
        if ( !paperNumberModel ) {
          return;
        }
        paperNumberModel.userControlled = false;
        var droppedPoint = event.pointer.point;
        var droppedViewPoint = parentScreenView.globalToLocalPoint( event.pointer.point );

        //check if the user has dropped the number within the panel, if "yes" return to origin
        if ( !canPlaceNumber( paperNumberModel, droppedViewPoint ) ) {
          paperNumberModel.returnToOrigin( true );
          paperNumberModel = null;
          return;
        }
        combineNumbersIfApplicableCallback( paperNumberModel, droppedPoint );
        paperNumberModel = null;
      }
    } );

    thisNode.addInputListener( paperNumberNodeCreatorDragHandler );

    // show proper cursor to indicate the paperNumber can be dragged out
    paperNumberNodeCreatorDragHandler.move = function( event ) {
      var allowedGlobalCreationBounds = thisNode.getGlobalObjectCreationBounds();
      if ( allowedGlobalCreationBounds.containsPoint( event.pointer.point ) ) {
        thisNode.cursor = 'pointer';
      }
      else {
        thisNode.cursor = 'default';
      }
    };

    paperNumberNodeCreatorDragHandler.out = function() {
      thisNode.cursor = 'default';
    };


  }

  makingTens.register( 'PaperNumberCreatorNode', PaperNumberCreatorNode );

  return inherit( Node, PaperNumberCreatorNode, {

    /**
     * returns {Bound2}  the bounds only within which a new PaperNumberModel can be pulled out and created
     */
    getGlobalObjectCreationBounds: function() {
      var thisNode = this;
      var localNodeBounds = thisNode.localBounds;
      var pullBounds = Bounds2.rect( localNodeBounds.x, localNodeBounds.height * MakingTensSharedConstants.SPLIT_BOUNDARY_HEIGHT_PROPORTION,
        localNodeBounds.width, localNodeBounds.height );
      var globalCreationBounds = thisNode.localToGlobalBounds( pullBounds );
      return globalCreationBounds;
    }

  } );

} );