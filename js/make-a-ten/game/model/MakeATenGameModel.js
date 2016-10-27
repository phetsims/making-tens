// Copyright 2015, University of Colorado Boulder

/**
 * Model for the game screen of Make a Ten.
 *
 * @author Sharfudeen Ashraf
 */
define( function( require ) {
  'use strict';

  // modules
  var makeATen = require( 'MAKE_A_TEN/makeATen' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Vector2 = require( 'DOT/Vector2' );
  var GameState = require( 'MAKE_A_TEN/make-a-ten/game/model/GameState' );
  var NumberChallengeFactory = require( 'MAKE_A_TEN/make-a-ten/game/model/NumberChallengeFactory' );
  var MakeATenCommonModel = require( 'MAKE_A_TEN/make-a-ten/common/model/MakeATenCommonModel' );
  var Level = require( 'MAKE_A_TEN/make-a-ten/game/model/Level' );
  var ExpressionTerms = require( 'MAKE_A_TEN/make-a-ten/common/model/ExpressionTerms' );
  var PaperNumber = require( 'MAKE_A_TEN/make-a-ten/common/model/PaperNumber' );
  var MakeATenConstants = require( 'MAKE_A_TEN/make-a-ten/common/MakeATenConstants' );

  // Level descriptions
  var gameInfoLevel1String = require( 'string!MAKE_A_TEN/game.info.level1' );
  var gameInfoLevel2String = require( 'string!MAKE_A_TEN/game.info.level2' );
  var gameInfoLevel3String = require( 'string!MAKE_A_TEN/game.info.level3' );
  var gameInfoLevel4String = require( 'string!MAKE_A_TEN/game.info.level4' );
  var gameInfoLevel5String = require( 'string!MAKE_A_TEN/game.info.level5' );
  var gameInfoLevel6String = require( 'string!MAKE_A_TEN/game.info.level6' );
  var gameInfoLevel7String = require( 'string!MAKE_A_TEN/game.info.level7' );
  var gameInfoLevel8String = require( 'string!MAKE_A_TEN/game.info.level8' );
  var gameInfoLevel9String = require( 'string!MAKE_A_TEN/game.info.level9' );
  var gameInfoLevel10String = require( 'string!MAKE_A_TEN/game.info.level10' );

  // Level icons
  var levelIcon1 = require( 'image!MAKE_A_TEN/level-1.png' );
  var levelIcon2 = require( 'image!MAKE_A_TEN/level-2.png' );
  var levelIcon3 = require( 'image!MAKE_A_TEN/level-3.png' );
  var levelIcon4 = require( 'image!MAKE_A_TEN/level-4.png' );
  var levelIcon5 = require( 'image!MAKE_A_TEN/level-5.png' );
  var levelIcon6 = require( 'image!MAKE_A_TEN/level-6.png' );
  var levelIcon7 = require( 'image!MAKE_A_TEN/level-7.png' );
  var levelIcon8 = require( 'image!MAKE_A_TEN/level-8.png' );
  var levelIcon9 = require( 'image!MAKE_A_TEN/level-9.png' );
  var levelIcon10 = require( 'image!MAKE_A_TEN/level-10.png' );

  /**
   * @constructor
   */
  function MakeATenGameModel() {
    var self = this;

    // Created here, since due to the initialization of phet.joist.random we need to delay until the model is created
    // (can't do at require.js load time), thus we have a separate challenge factory.
    var numberChallengeFactory = new NumberChallengeFactory();

    // @public {Array.<Level>} - All of the game levels for this screen.
    this.levels = [
      new Level( 1, '#FC4280', levelIcon1, gameInfoLevel1String, numberChallengeFactory ),
      new Level( 2, '#FC4280', levelIcon2, gameInfoLevel2String, numberChallengeFactory ),
      new Level( 3, '#FC4280', levelIcon3, gameInfoLevel3String, numberChallengeFactory ),
      new Level( 4, '#06A5AD', levelIcon4, gameInfoLevel4String, numberChallengeFactory ),
      new Level( 5, '#06A5AD', levelIcon5, gameInfoLevel5String, numberChallengeFactory ),
      new Level( 6, '#06A5AD', levelIcon6, gameInfoLevel6String, numberChallengeFactory ),
      new Level( 7, '#06A5AD', levelIcon7, gameInfoLevel7String, numberChallengeFactory ),
      new Level( 8, '#8653BF', levelIcon8, gameInfoLevel8String, numberChallengeFactory ),
      new Level( 9, '#8653BF', levelIcon9, gameInfoLevel9String, numberChallengeFactory ),
      new Level( 10, '#8653BF', levelIcon10, gameInfoLevel10String, numberChallengeFactory )
    ];

    // @public {BooleanProperty} - Whether sounds will occur on completion of game actions.
    this.soundEnabledProperty = new BooleanProperty( true );

    // @public {Property.<Level>} - The current level
    this.currentLevelProperty = new Property( this.levels[ 0 ] );

    // @public {NumberProperty} - The score for whatever the current level is.
    this.currentScoreProperty = new NumberProperty( 0 );

    // @public {Property.<NumberChallenge|null>} - The current challenge when in a level
    this.currentChallengeProperty = new Property( null );

    // @public {Property.<GameState>} - Current game state
    this.gameStateProperty = new Property( GameState.CHOOSING_LEVEL );

    MakeATenCommonModel.call( this );

    this.expressionTerms = new ExpressionTerms();

    this.paperNumbers.lengthProperty.link( function( newLength, oldLength ) {
      if ( newLength === 1 && oldLength === 2 && self.gameStateProperty.value === GameState.PRESENTING_INTERACTIVE_CHALLENGE ) { // The user has added the two numbers, trigger success state
        self.gameStateProperty.value = GameState.CORRECT_ANSWER;
      }
    } );

    // Keep our currentScore updated when the level changes.
    this.currentLevelProperty.link( function( level, oldLevel ) {
      self.currentScoreProperty.value = level.scoreProperty.value;
    } );
    // Keep our currentScore updated when our current level's score changes.
    this.levels.forEach( function( level ) {
      level.scoreProperty.link( function( score ) {
        if ( level === self.currentLevelProperty.value ) {
          self.currentScoreProperty.value = score;
        }
      } );
    } );
  }

  makeATen.register( 'MakeATenGameModel', MakeATenGameModel );

  return inherit( MakeATenCommonModel, MakeATenGameModel, {
    /**
     * Starts a new challenge with the level specified
     * @public
     *
     * @param {Level} level
     */
    startLevel: function( level ) {
      this.currentLevelProperty.value = level;

      // Set up the model for the next challenge
      this.currentChallengeProperty.value = level.generateChallenge();

      // Change to new game state.
      this.gameStateProperty.value = GameState.PRESENTING_INTERACTIVE_CHALLENGE;
    },

    /**
     * The user can play as many times as wants. And Each time, he
     * combines the numbers b making Tens his score for that level will be incremented
     */
    handleCorrectAnswer: function() {
      this.currentLevelProperty.value.scoreProperty.value++;
      this.gameStateProperty.value = GameState.MOVE_TO_NEXT_CHALLENGE;
    },

    nextChallenge: function() {
      this.currentChallengeProperty.value = this.currentLevelProperty.value.generateChallenge();
      this.gameStateProperty.value = GameState.PRESENTING_INTERACTIVE_CHALLENGE;
    },

    setChoosingLevelState: function() {
      this.gameStateProperty.value = GameState.CHOOSING_LEVEL;
      this.paperNumbers.clear();
    },

    /**
     * //@private
     * creates PaperNumbers based on the type of Number Challenge
     * @param {NumberChallenge} numberChallenge
     */
    createTerms: function( numberChallenge ) {
      var self = this;
      this.paperNumbers.clear();
      this.expressionTerms.leftTermProperty.value = numberChallenge.leftTerm;
      this.expressionTerms.rightTermProperty.value = numberChallenge.rightTerm;

      var valuesToCreate = [ numberChallenge.leftTerm, numberChallenge.rightTerm ];
      var xOffSet = 200;
      _.each( valuesToCreate, function( numberValue ) {
        assert && assert( typeof numberValue === 'number' );
        if ( !numberValue ) {
          return;
        }
        var initialPosition = new Vector2( xOffSet, MakeATenConstants.LAYOUT_BOUNDS.height / 2.5 );
        self.addPaperNumber( new PaperNumber( numberValue, initialPosition ) );
        xOffSet += 350;
      } );
    },

    reset: function() {
      MakeATenCommonModel.prototype.reset.call( this );

      this.soundEnabledProperty.reset();
      this.currentLevelProperty.reset();
      this.currentScoreProperty.reset();
      this.currentChallengeProperty.reset();
      this.gameStateProperty.reset();

      for ( var i = 0; i < this.levels.length; i++ ) {
        this.levels[ i ].reset();
      }
    }
  }, {
    // TODO: factor this out
    NUMBER_OF_LEVELS: 10
  } );
} );