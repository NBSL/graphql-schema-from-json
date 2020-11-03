(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['json-to-grapgql'] = {}));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var inflection = createCommonjsModule(function (module, exports) {
	/*!
	 * inflection
	 * Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>
	 * MIT Licensed
	 *
	 * @fileoverview
	 * A port of inflection-js to node.js module.
	 */

	( function ( root, factory ){
	  {
	    module.exports = factory();
	  }
	}( commonjsGlobal, function (){

	  /**
	   * @description This is a list of nouns that use the same form for both singular and plural.
	   *              This list should remain entirely in lower case to correctly match Strings.
	   * @private
	   */
	  var uncountable_words = [
	    // 'access',
	    'accommodation',
	    'adulthood',
	    'advertising',
	    'advice',
	    'aggression',
	    'aid',
	    'air',
	    'aircraft',
	    'alcohol',
	    'anger',
	    'applause',
	    'arithmetic',
	    // 'art',
	    'assistance',
	    'athletics',
	    // 'attention',

	    'bacon',
	    'baggage',
	    // 'ballet',
	    // 'beauty',
	    'beef',
	    // 'beer',
	    // 'behavior',
	    'biology',
	    // 'billiards',
	    'blood',
	    'botany',
	    // 'bowels',
	    'bread',
	    // 'business',
	    'butter',

	    'carbon',
	    'cardboard',
	    'cash',
	    'chalk',
	    'chaos',
	    'chess',
	    'crossroads',
	    'countryside',

	    // 'damage',
	    'dancing',
	    // 'danger',
	    'deer',
	    // 'delight',
	    // 'dessert',
	    'dignity',
	    'dirt',
	    // 'distribution',
	    'dust',

	    'economics',
	    'education',
	    'electricity',
	    // 'employment',
	    // 'energy',
	    'engineering',
	    'enjoyment',
	    // 'entertainment',
	    'envy',
	    'equipment',
	    'ethics',
	    'evidence',
	    'evolution',

	    // 'failure',
	    // 'faith',
	    'fame',
	    'fiction',
	    // 'fish',
	    'flour',
	    'flu',
	    'food',
	    // 'freedom',
	    // 'fruit',
	    'fuel',
	    'fun',
	    // 'funeral',
	    'furniture',

	    'gallows',
	    'garbage',
	    'garlic',
	    // 'gas',
	    'genetics',
	    // 'glass',
	    'gold',
	    'golf',
	    'gossip',
	    'grammar',
	    // 'grass',
	    'gratitude',
	    'grief',
	    // 'ground',
	    'guilt',
	    'gymnastics',

	    // 'hair',
	    'happiness',
	    'hardware',
	    'harm',
	    'hate',
	    'hatred',
	    'health',
	    'heat',
	    // 'height',
	    'help',
	    'homework',
	    'honesty',
	    'honey',
	    'hospitality',
	    'housework',
	    'humour',
	    'hunger',
	    'hydrogen',

	    'ice',
	    'importance',
	    'inflation',
	    'information',
	    // 'injustice',
	    'innocence',
	    // 'intelligence',
	    'iron',
	    'irony',

	    'jam',
	    // 'jealousy',
	    // 'jelly',
	    'jewelry',
	    // 'joy',
	    'judo',
	    // 'juice',
	    // 'justice',

	    'karate',
	    // 'kindness',
	    'knowledge',

	    // 'labour',
	    'lack',
	    // 'land',
	    'laughter',
	    'lava',
	    'leather',
	    'leisure',
	    'lightning',
	    'linguine',
	    'linguini',
	    'linguistics',
	    'literature',
	    'litter',
	    'livestock',
	    'logic',
	    'loneliness',
	    // 'love',
	    'luck',
	    'luggage',

	    'macaroni',
	    'machinery',
	    'magic',
	    // 'mail',
	    'management',
	    'mankind',
	    'marble',
	    'mathematics',
	    'mayonnaise',
	    'measles',
	    // 'meat',
	    // 'metal',
	    'methane',
	    'milk',
	    'minus',
	    'money',
	    // 'moose',
	    'mud',
	    'music',
	    'mumps',

	    'nature',
	    'news',
	    'nitrogen',
	    'nonsense',
	    'nurture',
	    'nutrition',

	    'obedience',
	    'obesity',
	    // 'oil',
	    'oxygen',

	    // 'paper',
	    // 'passion',
	    'pasta',
	    'patience',
	    // 'permission',
	    'physics',
	    'poetry',
	    'pollution',
	    'poverty',
	    // 'power',
	    'pride',
	    // 'production',
	    // 'progress',
	    // 'pronunciation',
	    'psychology',
	    'publicity',
	    'punctuation',

	    // 'quality',
	    // 'quantity',
	    'quartz',

	    'racism',
	    // 'rain',
	    // 'recreation',
	    'relaxation',
	    'reliability',
	    'research',
	    'respect',
	    'revenge',
	    'rice',
	    'rubbish',
	    'rum',

	    'safety',
	    // 'salad',
	    // 'salt',
	    // 'sand',
	    // 'satire',
	    'scenery',
	    'seafood',
	    'seaside',
	    'series',
	    'shame',
	    'sheep',
	    'shopping',
	    // 'silence',
	    'sleep',
	    // 'slang'
	    'smoke',
	    'smoking',
	    'snow',
	    'soap',
	    'software',
	    'soil',
	    // 'sorrow',
	    // 'soup',
	    'spaghetti',
	    // 'speed',
	    'species',
	    // 'spelling',
	    // 'sport',
	    'steam',
	    // 'strength',
	    'stuff',
	    'stupidity',
	    // 'success',
	    // 'sugar',
	    'sunshine',
	    'symmetry',

	    // 'tea',
	    'tennis',
	    'thirst',
	    'thunder',
	    'timber',
	    // 'time',
	    // 'toast',
	    // 'tolerance',
	    // 'trade',
	    'traffic',
	    'transportation',
	    // 'travel',
	    'trust',

	    // 'understanding',
	    'underwear',
	    'unemployment',
	    'unity',
	    // 'usage',

	    'validity',
	    'veal',
	    'vegetation',
	    'vegetarianism',
	    'vengeance',
	    'violence',
	    // 'vision',
	    'vitality',

	    'warmth',
	    // 'water',
	    'wealth',
	    'weather',
	    // 'weight',
	    'welfare',
	    'wheat',
	    // 'whiskey',
	    // 'width',
	    'wildlife',
	    // 'wine',
	    'wisdom',
	    // 'wood',
	    // 'wool',
	    // 'work',

	    // 'yeast',
	    'yoga',

	    'zinc',
	    'zoology'
	  ];

	  /**
	   * @description These rules translate from the singular form of a noun to its plural form.
	   * @private
	   */

	  var regex = {
	    plural : {
	      men       : new RegExp( '^(m|wom)en$'                    , 'gi' ),
	      people    : new RegExp( '(pe)ople$'                      , 'gi' ),
	      children  : new RegExp( '(child)ren$'                    , 'gi' ),
	      tia       : new RegExp( '([ti])a$'                       , 'gi' ),
	      analyses  : new RegExp( '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$','gi' ),
	      hives     : new RegExp( '(hi|ti)ves$'                    , 'gi' ),
	      curves    : new RegExp( '(curve)s$'                      , 'gi' ),
	      lrves     : new RegExp( '([lr])ves$'                     , 'gi' ),
	      aves      : new RegExp( '([a])ves$'                      , 'gi' ),
	      foves     : new RegExp( '([^fo])ves$'                    , 'gi' ),
	      movies    : new RegExp( '(m)ovies$'                      , 'gi' ),
	      aeiouyies : new RegExp( '([^aeiouy]|qu)ies$'             , 'gi' ),
	      series    : new RegExp( '(s)eries$'                      , 'gi' ),
	      xes       : new RegExp( '(x|ch|ss|sh)es$'                , 'gi' ),
	      mice      : new RegExp( '([m|l])ice$'                    , 'gi' ),
	      buses     : new RegExp( '(bus)es$'                       , 'gi' ),
	      oes       : new RegExp( '(o)es$'                         , 'gi' ),
	      shoes     : new RegExp( '(shoe)s$'                       , 'gi' ),
	      crises    : new RegExp( '(cris|ax|test)es$'              , 'gi' ),
	      octopi    : new RegExp( '(octop|vir)i$'                  , 'gi' ),
	      aliases   : new RegExp( '(alias|canvas|status|campus)es$', 'gi' ),
	      summonses : new RegExp( '^(summons)es$'                  , 'gi' ),
	      oxen      : new RegExp( '^(ox)en'                        , 'gi' ),
	      matrices  : new RegExp( '(matr)ices$'                    , 'gi' ),
	      vertices  : new RegExp( '(vert|ind)ices$'                , 'gi' ),
	      feet      : new RegExp( '^feet$'                         , 'gi' ),
	      teeth     : new RegExp( '^teeth$'                        , 'gi' ),
	      geese     : new RegExp( '^geese$'                        , 'gi' ),
	      quizzes   : new RegExp( '(quiz)zes$'                     , 'gi' ),
	      whereases : new RegExp( '^(whereas)es$'                  , 'gi' ),
	      criteria  : new RegExp( '^(criteri)a$'                   , 'gi' ),
	      genera    : new RegExp( '^genera$'                       , 'gi' ),
	      ss        : new RegExp( 'ss$'                            , 'gi' ),
	      s         : new RegExp( 's$'                             , 'gi' )
	    },

	    singular : {
	      man       : new RegExp( '^(m|wom)an$'                  , 'gi' ),
	      person    : new RegExp( '(pe)rson$'                    , 'gi' ),
	      child     : new RegExp( '(child)$'                     , 'gi' ),
	      ox        : new RegExp( '^(ox)$'                       , 'gi' ),
	      axis      : new RegExp( '(ax|test)is$'                 , 'gi' ),
	      octopus   : new RegExp( '(octop|vir)us$'               , 'gi' ),
	      alias     : new RegExp( '(alias|status|canvas|campus)$', 'gi' ),
	      summons   : new RegExp( '^(summons)$'                  , 'gi' ),
	      bus       : new RegExp( '(bu)s$'                       , 'gi' ),
	      buffalo   : new RegExp( '(buffal|tomat|potat)o$'       , 'gi' ),
	      tium      : new RegExp( '([ti])um$'                    , 'gi' ),
	      sis       : new RegExp( 'sis$'                         , 'gi' ),
	      ffe       : new RegExp( '(?:([^f])fe|([lr])f)$'        , 'gi' ),
	      hive      : new RegExp( '(hi|ti)ve$'                   , 'gi' ),
	      aeiouyy   : new RegExp( '([^aeiouy]|qu)y$'             , 'gi' ),
	      x         : new RegExp( '(x|ch|ss|sh)$'                , 'gi' ),
	      matrix    : new RegExp( '(matr)ix$'                    , 'gi' ),
	      vertex    : new RegExp( '(vert|ind)ex$'                , 'gi' ),
	      mouse     : new RegExp( '([m|l])ouse$'                 , 'gi' ),
	      foot      : new RegExp( '^foot$'                       , 'gi' ),
	      tooth     : new RegExp( '^tooth$'                      , 'gi' ),
	      goose     : new RegExp( '^goose$'                      , 'gi' ),
	      quiz      : new RegExp( '(quiz)$'                      , 'gi' ),
	      whereas   : new RegExp( '^(whereas)$'                  , 'gi' ),
	      criterion : new RegExp( '^(criteri)on$'                , 'gi' ),
	      genus     : new RegExp( '^genus$'                      , 'gi' ),
	      s         : new RegExp( 's$'                           , 'gi' ),
	      common    : new RegExp( '$'                            , 'gi' )
	    }
	  };

	  var plural_rules = [

	    // do not replace if its already a plural word
	    [ regex.plural.men       ],
	    [ regex.plural.people    ],
	    [ regex.plural.children  ],
	    [ regex.plural.tia       ],
	    [ regex.plural.analyses  ],
	    [ regex.plural.hives     ],
	    [ regex.plural.curves    ],
	    [ regex.plural.lrves     ],
	    [ regex.plural.foves     ],
	    [ regex.plural.aeiouyies ],
	    [ regex.plural.series    ],
	    [ regex.plural.movies    ],
	    [ regex.plural.xes       ],
	    [ regex.plural.mice      ],
	    [ regex.plural.buses     ],
	    [ regex.plural.oes       ],
	    [ regex.plural.shoes     ],
	    [ regex.plural.crises    ],
	    [ regex.plural.octopi    ],
	    [ regex.plural.aliases   ],
	    [ regex.plural.summonses ],
	    [ regex.plural.oxen      ],
	    [ regex.plural.matrices  ],
	    [ regex.plural.feet      ],
	    [ regex.plural.teeth     ],
	    [ regex.plural.geese     ],
	    [ regex.plural.quizzes   ],
	    [ regex.plural.whereases ],
	    [ regex.plural.criteria  ],
	    [ regex.plural.genera    ],

	    // original rule
	    [ regex.singular.man      , '$1en' ],
	    [ regex.singular.person   , '$1ople' ],
	    [ regex.singular.child    , '$1ren' ],
	    [ regex.singular.ox       , '$1en' ],
	    [ regex.singular.axis     , '$1es' ],
	    [ regex.singular.octopus  , '$1i' ],
	    [ regex.singular.alias    , '$1es' ],
	    [ regex.singular.summons  , '$1es' ],
	    [ regex.singular.bus      , '$1ses' ],
	    [ regex.singular.buffalo  , '$1oes' ],
	    [ regex.singular.tium     , '$1a' ],
	    [ regex.singular.sis      , 'ses' ],
	    [ regex.singular.ffe      , '$1$2ves' ],
	    [ regex.singular.hive     , '$1ves' ],
	    [ regex.singular.aeiouyy  , '$1ies' ],
	    [ regex.singular.matrix   , '$1ices' ],
	    [ regex.singular.vertex   , '$1ices' ],
	    [ regex.singular.x        , '$1es' ],
	    [ regex.singular.mouse    , '$1ice' ],
	    [ regex.singular.foot     , 'feet' ],
	    [ regex.singular.tooth    , 'teeth' ],
	    [ regex.singular.goose    , 'geese' ],
	    [ regex.singular.quiz     , '$1zes' ],
	    [ regex.singular.whereas  , '$1es' ],
	    [ regex.singular.criterion, '$1a' ],
	    [ regex.singular.genus    , 'genera' ],

	    [ regex.singular.s     , 's' ],
	    [ regex.singular.common, 's' ]
	  ];

	  /**
	   * @description These rules translate from the plural form of a noun to its singular form.
	   * @private
	   */
	  var singular_rules = [

	    // do not replace if its already a singular word
	    [ regex.singular.man     ],
	    [ regex.singular.person  ],
	    [ regex.singular.child   ],
	    [ regex.singular.ox      ],
	    [ regex.singular.axis    ],
	    [ regex.singular.octopus ],
	    [ regex.singular.alias   ],
	    [ regex.singular.summons ],
	    [ regex.singular.bus     ],
	    [ regex.singular.buffalo ],
	    [ regex.singular.tium    ],
	    [ regex.singular.sis     ],
	    [ regex.singular.ffe     ],
	    [ regex.singular.hive    ],
	    [ regex.singular.aeiouyy ],
	    [ regex.singular.x       ],
	    [ regex.singular.matrix  ],
	    [ regex.singular.mouse   ],
	    [ regex.singular.foot    ],
	    [ regex.singular.tooth   ],
	    [ regex.singular.goose   ],
	    [ regex.singular.quiz    ],
	    [ regex.singular.whereas ],
	    [ regex.singular.criterion ],
	    [ regex.singular.genus ],

	    // original rule
	    [ regex.plural.men      , '$1an' ],
	    [ regex.plural.people   , '$1rson' ],
	    [ regex.plural.children , '$1' ],
	    [ regex.plural.genera   , 'genus'],
	    [ regex.plural.criteria , '$1on'],
	    [ regex.plural.tia      , '$1um' ],
	    [ regex.plural.analyses , '$1$2sis' ],
	    [ regex.plural.hives    , '$1ve' ],
	    [ regex.plural.curves   , '$1' ],
	    [ regex.plural.lrves    , '$1f' ],
	    [ regex.plural.aves     , '$1ve' ],
	    [ regex.plural.foves    , '$1fe' ],
	    [ regex.plural.movies   , '$1ovie' ],
	    [ regex.plural.aeiouyies, '$1y' ],
	    [ regex.plural.series   , '$1eries' ],
	    [ regex.plural.xes      , '$1' ],
	    [ regex.plural.mice     , '$1ouse' ],
	    [ regex.plural.buses    , '$1' ],
	    [ regex.plural.oes      , '$1' ],
	    [ regex.plural.shoes    , '$1' ],
	    [ regex.plural.crises   , '$1is' ],
	    [ regex.plural.octopi   , '$1us' ],
	    [ regex.plural.aliases  , '$1' ],
	    [ regex.plural.summonses, '$1' ],
	    [ regex.plural.oxen     , '$1' ],
	    [ regex.plural.matrices , '$1ix' ],
	    [ regex.plural.vertices , '$1ex' ],
	    [ regex.plural.feet     , 'foot' ],
	    [ regex.plural.teeth    , 'tooth' ],
	    [ regex.plural.geese    , 'goose' ],
	    [ regex.plural.quizzes  , '$1' ],
	    [ regex.plural.whereases, '$1' ],

	    [ regex.plural.ss, 'ss' ],
	    [ regex.plural.s , '' ]
	  ];

	  /**
	   * @description This is a list of words that should not be capitalized for title case.
	   * @private
	   */
	  var non_titlecased_words = [
	    'and', 'or', 'nor', 'a', 'an', 'the', 'so', 'but', 'to', 'of', 'at','by',
	    'from', 'into', 'on', 'onto', 'off', 'out', 'in', 'over', 'with', 'for'
	  ];

	  /**
	   * @description These are regular expressions used for converting between String formats.
	   * @private
	   */
	  var id_suffix         = new RegExp( '(_ids|_id)$', 'g' );
	  var underbar          = new RegExp( '_', 'g' );
	  var space_or_underbar = new RegExp( '[\ _]', 'g' );
	  var uppercase         = new RegExp( '([A-Z])', 'g' );
	  var underbar_prefix   = new RegExp( '^_' );

	  var inflector = {

	  /**
	   * A helper method that applies rules based replacement to a String.
	   * @private
	   * @function
	   * @param {String} str String to modify and return based on the passed rules.
	   * @param {Array: [RegExp, String]} rules Regexp to match paired with String to use for replacement
	   * @param {Array: [String]} skip Strings to skip if they match
	   * @param {String} override String to return as though this method succeeded (used to conform to APIs)
	   * @returns {String} Return passed String modified by passed rules.
	   * @example
	   *
	   *     this._apply_rules( 'cows', singular_rules ); // === 'cow'
	   */
	    _apply_rules : function ( str, rules, skip, override ){
	      if( override ){
	        str = override;
	      }else {
	        var ignore = ( inflector.indexOf( skip, str.toLowerCase()) > -1 );

	        if( !ignore ){
	          var i = 0;
	          var j = rules.length;

	          for( ; i < j; i++ ){
	            if( str.match( rules[ i ][ 0 ])){
	              if( rules[ i ][ 1 ] !== undefined ){
	                str = str.replace( rules[ i ][ 0 ], rules[ i ][ 1 ]);
	              }
	              break;
	            }
	          }
	        }
	      }

	      return str;
	    },



	  /**
	   * This lets us detect if an Array contains a given element.
	   * @public
	   * @function
	   * @param {Array} arr The subject array.
	   * @param {Object} item Object to locate in the Array.
	   * @param {Number} from_index Starts checking from this position in the Array.(optional)
	   * @param {Function} compare_func Function used to compare Array item vs passed item.(optional)
	   * @returns {Number} Return index position in the Array of the passed item.
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.indexOf([ 'hi','there' ], 'guys' ); // === -1
	   *     inflection.indexOf([ 'hi','there' ], 'hi' ); // === 0
	   */
	    indexOf : function ( arr, item, from_index, compare_func ){
	      if( !from_index ){
	        from_index = -1;
	      }

	      var index = -1;
	      var i     = from_index;
	      var j     = arr.length;

	      for( ; i < j; i++ ){
	        if( arr[ i ]  === item || compare_func && compare_func( arr[ i ], item )){
	          index = i;
	          break;
	        }
	      }

	      return index;
	    },



	  /**
	   * This function adds pluralization support to every String object.
	   * @public
	   * @function
	   * @param {String} str The subject string.
	   * @param {String} plural Overrides normal output with said String.(optional)
	   * @returns {String} Singular English language nouns are returned in plural form.
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.pluralize( 'person' ); // === 'people'
	   *     inflection.pluralize( 'octopus' ); // === 'octopi'
	   *     inflection.pluralize( 'Hat' ); // === 'Hats'
	   *     inflection.pluralize( 'person', 'guys' ); // === 'guys'
	   */
	    pluralize : function ( str, plural ){
	      return inflector._apply_rules( str, plural_rules, uncountable_words, plural );
	    },



	  /**
	   * This function adds singularization support to every String object.
	   * @public
	   * @function
	   * @param {String} str The subject string.
	   * @param {String} singular Overrides normal output with said String.(optional)
	   * @returns {String} Plural English language nouns are returned in singular form.
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.singularize( 'people' ); // === 'person'
	   *     inflection.singularize( 'octopi' ); // === 'octopus'
	   *     inflection.singularize( 'Hats' ); // === 'Hat'
	   *     inflection.singularize( 'guys', 'person' ); // === 'person'
	   */
	    singularize : function ( str, singular ){
	      return inflector._apply_rules( str, singular_rules, uncountable_words, singular );
	    },


	  /**
	   * This function will pluralize or singularlize a String appropriately based on an integer value
	   * @public
	   * @function
	   * @param {String} str The subject string.
	   * @param {Number} count The number to base pluralization off of.
	   * @param {String} singular Overrides normal output with said String.(optional)
	   * @param {String} plural Overrides normal output with said String.(optional)
	   * @returns {String} English language nouns are returned in the plural or singular form based on the count.
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.inflect( 'people' 1 ); // === 'person'
	   *     inflection.inflect( 'octopi' 1 ); // === 'octopus'
	   *     inflection.inflect( 'Hats' 1 ); // === 'Hat'
	   *     inflection.inflect( 'guys', 1 , 'person' ); // === 'person'
	   *     inflection.inflect( 'person', 2 ); // === 'people'
	   *     inflection.inflect( 'octopus', 2 ); // === 'octopi'
	   *     inflection.inflect( 'Hat', 2 ); // === 'Hats'
	   *     inflection.inflect( 'person', 2, null, 'guys' ); // === 'guys'
	   */
	    inflect : function ( str, count, singular, plural ){
	      count = parseInt( count, 10 );

	      if( isNaN( count )) return str;

	      if( count === 0 || count > 1 ){
	        return inflector._apply_rules( str, plural_rules, uncountable_words, plural );
	      }else {
	        return inflector._apply_rules( str, singular_rules, uncountable_words, singular );
	      }
	    },



	  /**
	   * This function adds camelization support to every String object.
	   * @public
	   * @function
	   * @param {String} str The subject string.
	   * @param {Boolean} low_first_letter Default is to capitalize the first letter of the results.(optional)
	   *                                 Passing true will lowercase it.
	   * @returns {String} Lower case underscored words will be returned in camel case.
	   *                  additionally '/' is translated to '::'
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.camelize( 'message_properties' ); // === 'MessageProperties'
	   *     inflection.camelize( 'message_properties', true ); // === 'messageProperties'
	   */
	    camelize : function ( str, low_first_letter ){
	      var str_path = str.split( '/' );
	      var i        = 0;
	      var j        = str_path.length;
	      var str_arr, k, l, first;

	      for( ; i < j; i++ ){
	        str_arr = str_path[ i ].split( '_' );
	        k       = 0;
	        l       = str_arr.length;

	        for( ; k < l; k++ ){
	          if( k !== 0 ){
	            str_arr[ k ] = str_arr[ k ].toLowerCase();
	          }

	          first = str_arr[ k ].charAt( 0 );
	          first = low_first_letter && i === 0 && k === 0
	            ? first.toLowerCase() : first.toUpperCase();
	          str_arr[ k ] = first + str_arr[ k ].substring( 1 );
	        }

	        str_path[ i ] = str_arr.join( '' );
	      }

	      return str_path.join( '::' );
	    },



	  /**
	   * This function adds underscore support to every String object.
	   * @public
	   * @function
	   * @param {String} str The subject string.
	   * @param {Boolean} all_upper_case Default is to lowercase and add underscore prefix.(optional)
	   *                  Passing true will return as entered.
	   * @returns {String} Camel cased words are returned as lower cased and underscored.
	   *                  additionally '::' is translated to '/'.
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.underscore( 'MessageProperties' ); // === 'message_properties'
	   *     inflection.underscore( 'messageProperties' ); // === 'message_properties'
	   *     inflection.underscore( 'MP', true ); // === 'MP'
	   */
	    underscore : function ( str, all_upper_case ){
	      if( all_upper_case && str === str.toUpperCase()) return str;

	      var str_path = str.split( '::' );
	      var i        = 0;
	      var j        = str_path.length;

	      for( ; i < j; i++ ){
	        str_path[ i ] = str_path[ i ].replace( uppercase, '_$1' );
	        str_path[ i ] = str_path[ i ].replace( underbar_prefix, '' );
	      }

	      return str_path.join( '/' ).toLowerCase();
	    },



	  /**
	   * This function adds humanize support to every String object.
	   * @public
	   * @function
	   * @param {String} str The subject string.
	   * @param {Boolean} low_first_letter Default is to capitalize the first letter of the results.(optional)
	   *                                 Passing true will lowercase it.
	   * @returns {String} Lower case underscored words will be returned in humanized form.
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.humanize( 'message_properties' ); // === 'Message properties'
	   *     inflection.humanize( 'message_properties', true ); // === 'message properties'
	   */
	    humanize : function ( str, low_first_letter ){
	      str = str.toLowerCase();
	      str = str.replace( id_suffix, '' );
	      str = str.replace( underbar, ' ' );

	      if( !low_first_letter ){
	        str = inflector.capitalize( str );
	      }

	      return str;
	    },



	  /**
	   * This function adds capitalization support to every String object.
	   * @public
	   * @function
	   * @param {String} str The subject string.
	   * @returns {String} All characters will be lower case and the first will be upper.
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.capitalize( 'message_properties' ); // === 'Message_properties'
	   *     inflection.capitalize( 'message properties', true ); // === 'Message properties'
	   */
	    capitalize : function ( str ){
	      str = str.toLowerCase();

	      return str.substring( 0, 1 ).toUpperCase() + str.substring( 1 );
	    },



	  /**
	   * This function replaces underscores with dashes in the string.
	   * @public
	   * @function
	   * @param {String} str The subject string.
	   * @returns {String} Replaces all spaces or underscores with dashes.
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.dasherize( 'message_properties' ); // === 'message-properties'
	   *     inflection.dasherize( 'Message Properties' ); // === 'Message-Properties'
	   */
	    dasherize : function ( str ){
	      return str.replace( space_or_underbar, '-' );
	    },



	  /**
	   * This function adds titleize support to every String object.
	   * @public
	   * @function
	   * @param {String} str The subject string.
	   * @returns {String} Capitalizes words as you would for a book title.
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.titleize( 'message_properties' ); // === 'Message Properties'
	   *     inflection.titleize( 'message properties to keep' ); // === 'Message Properties to Keep'
	   */
	    titleize : function ( str ){
	      str         = str.toLowerCase().replace( underbar, ' ' );
	      var str_arr = str.split( ' ' );
	      var i       = 0;
	      var j       = str_arr.length;
	      var d, k, l;

	      for( ; i < j; i++ ){
	        d = str_arr[ i ].split( '-' );
	        k = 0;
	        l = d.length;

	        for( ; k < l; k++){
	          if( inflector.indexOf( non_titlecased_words, d[ k ].toLowerCase()) < 0 ){
	            d[ k ] = inflector.capitalize( d[ k ]);
	          }
	        }

	        str_arr[ i ] = d.join( '-' );
	      }

	      str = str_arr.join( ' ' );
	      str = str.substring( 0, 1 ).toUpperCase() + str.substring( 1 );

	      return str;
	    },



	  /**
	   * This function adds demodulize support to every String object.
	   * @public
	   * @function
	   * @param {String} str The subject string.
	   * @returns {String} Removes module names leaving only class names.(Ruby style)
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.demodulize( 'Message::Bus::Properties' ); // === 'Properties'
	   */
	    demodulize : function ( str ){
	      var str_arr = str.split( '::' );

	      return str_arr[ str_arr.length - 1 ];
	    },



	  /**
	   * This function adds tableize support to every String object.
	   * @public
	   * @function
	   * @param {String} str The subject string.
	   * @returns {String} Return camel cased words into their underscored plural form.
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.tableize( 'MessageBusProperty' ); // === 'message_bus_properties'
	   */
	    tableize : function ( str ){
	      str = inflector.underscore( str );
	      str = inflector.pluralize( str );

	      return str;
	    },



	  /**
	   * This function adds classification support to every String object.
	   * @public
	   * @function
	   * @param {String} str The subject string.
	   * @returns {String} Underscored plural nouns become the camel cased singular form.
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.classify( 'message_bus_properties' ); // === 'MessageBusProperty'
	   */
	    classify : function ( str ){
	      str = inflector.camelize( str );
	      str = inflector.singularize( str );

	      return str;
	    },



	  /**
	   * This function adds foreign key support to every String object.
	   * @public
	   * @function
	   * @param {String} str The subject string.
	   * @param {Boolean} drop_id_ubar Default is to seperate id with an underbar at the end of the class name,
	                                 you can pass true to skip it.(optional)
	   * @returns {String} Underscored plural nouns become the camel cased singular form.
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.foreign_key( 'MessageBusProperty' ); // === 'message_bus_property_id'
	   *     inflection.foreign_key( 'MessageBusProperty', true ); // === 'message_bus_propertyid'
	   */
	    foreign_key : function ( str, drop_id_ubar ){
	      str = inflector.demodulize( str );
	      str = inflector.underscore( str ) + (( drop_id_ubar ) ? ( '' ) : ( '_' )) + 'id';

	      return str;
	    },



	  /**
	   * This function adds ordinalize support to every String object.
	   * @public
	   * @function
	   * @param {String} str The subject string.
	   * @returns {String} Return all found numbers their sequence like '22nd'.
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.ordinalize( 'the 1 pitch' ); // === 'the 1st pitch'
	   */
	    ordinalize : function ( str ){
	      var str_arr = str.split( ' ' );
	      var i       = 0;
	      var j       = str_arr.length;

	      for( ; i < j; i++ ){
	        var k = parseInt( str_arr[ i ], 10 );

	        if( !isNaN( k )){
	          var ltd = str_arr[ i ].substring( str_arr[ i ].length - 2 );
	          var ld  = str_arr[ i ].substring( str_arr[ i ].length - 1 );
	          var suf = 'th';

	          if( ltd != '11' && ltd != '12' && ltd != '13' ){
	            if( ld === '1' ){
	              suf = 'st';
	            }else if( ld === '2' ){
	              suf = 'nd';
	            }else if( ld === '3' ){
	              suf = 'rd';
	            }
	          }

	          str_arr[ i ] += suf;
	        }
	      }

	      return str_arr.join( ' ' );
	    },

	  /**
	   * This function performs multiple inflection methods on a string
	   * @public
	   * @function
	   * @param {String} str The subject string.
	   * @param {Array} arr An array of inflection methods.
	   * @returns {String}
	   * @example
	   *
	   *     var inflection = require( 'inflection' );
	   *
	   *     inflection.transform( 'all job', [ 'pluralize', 'capitalize', 'dasherize' ]); // === 'All-jobs'
	   */
	    transform : function ( str, arr ){
	      var i = 0;
	      var j = arr.length;

	      for( ;i < j; i++ ){
	        var method = arr[ i ];

	        if( inflector.hasOwnProperty( method )){
	          str = inflector[ method ]( str );
	        }
	      }

	      return str;
	    }
	  };

	/**
	 * @public
	 */
	  inflector.version = '1.12.0';

	  return inflector;
	}));
	});
	var inflection_1 = inflection.camelize;
	var inflection_2 = inflection.pluralize;
	var inflection_3 = inflection.singularize;
	var inflection_4 = inflection.underscore;

	/**
	 * A bit of vocabulary
	 * 
	 * Consider this data:
	 * {
	 *     posts: [
	 *          { id: 1, title: 'foo', user_id: 123 }
	 *     ],
	 *     users: [
	 *          { id: 123, name: 'John Doe' }
	 *     ]
	 * }
	 * 
	 * We'll use the following names:
	 * - key: the keys in the data map, e.g. 'posts', 'users'
	 * - type: for a key, the related type in the graphQL schema, e.g. 'posts' => 'Post', 'users' => 'User'
	 * - field: the keys in a record, e.g. 'id', 'foo', user_id'
	 * - relationship field: a key ending in '_id', e.g. 'user_id'
	 * - related key: for a relationship field, the related key, e.g. 'user_id' => 'users'
	 */

	/**
	 * 
	 * @param {String} fieldName 'users'
	 * @return {String} 'Users'
	 */

	var getRelationshipFromKey = function getRelationshipFromKey(key) {
	  return inflection_1(key);
	};
	/**
	 * 
	 * @param {String} fieldName 'users'
	 * @return {String} 'User'
	 */

	var getTypeFromKey = function getTypeFromKey(key) {
	  return inflection_1(inflection_3(key));
	};
	/**
	 * 
	 * @param {String} fieldName 'user_id'
	 * @return {String} 'users'
	 */

	var getRelatedKey = function getRelatedKey(fieldName) {
	  return inflection_2(fieldName.substr(0, fieldName.length - 3));
	};
	/**
	 * 
	 * @param {String} key 'users'
	 * @return {String} 'user_id'
	 */

	var getReverseRelatedField = function getReverseRelatedField(key) {
	  return "".concat(inflection_3(key), "_id");
	};
	/**
	 * 
	 * @param {String} fieldName 'user_id'
	 * @return {String} 'User'
	 */

	var getRelatedType = function getRelatedType(fieldName) {
	  return getTypeFromKey(fieldName.substr(0, fieldName.length - 3));
	};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var path = {};

	var aFunction = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof NativeConstructor) {
	      switch (arguments.length) {
	        case 0: return new NativeConstructor();
	        case 1: return new NativeConstructor(a);
	        case 2: return new NativeConstructor(a, b);
	      } return new NativeConstructor(a, b, c);
	    } return NativeConstructor.apply(this, arguments);
	  };
	  Wrapper.prototype = NativeConstructor.prototype;
	  return Wrapper;
	};

	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var PROTO = options.proto;

	  var nativeSource = GLOBAL ? global_1 : STATIC ? global_1[TARGET] : (global_1[TARGET] || {}).prototype;

	  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
	  var targetPrototype = target.prototype;

	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contains in native
	    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

	    // bind timers to global for call from export context
	    if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global_1);
	    // wrap global constructors for prevent changs in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext(Function.call, sourceProperty);
	    // default case
	    else resultProperty = sourceProperty;

	    // add a flag to not completely full polyfills
	    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(resultProperty, 'sham', true);
	    }

	    target[key] = resultProperty;

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
	      if (!has(path, VIRTUAL_PROTOTYPE)) {
	        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
	      }
	      // export virtual prototype methods
	      path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
	      // export real prototype methods
	      if (options.real && targetPrototype && !targetPrototype[key]) {
	        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
	      }
	    }
	  }
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.4',
	  mode:  'pure' ,
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var notARegexp = function (it) {
	  if (isRegexp(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  } return it;
	};

	var MATCH$1 = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (e) {
	    try {
	      regexp[MATCH$1] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (f) { /* empty */ }
	  } return false;
	};

	var nativeEndsWith = ''.endsWith;
	var min$1 = Math.min;

	var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('endsWith');

	// `String.prototype.endsWith` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.endswith
	_export({ target: 'String', proto: true, forced:  !CORRECT_IS_REGEXP_LOGIC }, {
	  endsWith: function endsWith(searchString /* , endPosition = @length */) {
	    var that = String(requireObjectCoercible(this));
	    notARegexp(searchString);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = toLength(that.length);
	    var end = endPosition === undefined ? len : min$1(toLength(endPosition), len);
	    var search = String(searchString);
	    return nativeEndsWith
	      ? nativeEndsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

	var entryVirtual = function (CONSTRUCTOR) {
	  return path[CONSTRUCTOR + 'Prototype'];
	};

	var endsWith = entryVirtual('String').endsWith;

	var StringPrototype = String.prototype;

	var endsWith_1 = function (it) {
	  var own = it.endsWith;
	  return typeof it === 'string' || it === StringPrototype
	    || (it instanceof String && own === StringPrototype.endsWith) ? endsWith : own;
	};

	var endsWith$1 = endsWith_1;

	var endsWith$2 = endsWith$1;

	var isRelationshipFieldImport = (function (fieldName) {
	  return endsWith$2(fieldName).call(fieldName, '_id');
	});

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var aFunction$1 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process$1 = global_1.process;
	var versions = process$1 && process$1.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var concat = entryVirtual('Array').concat;

	var ArrayPrototype = Array.prototype;

	var concat_1 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.concat) ? concat : own;
	};

	var concat$1 = concat_1;

	var concat$2 = concat$1;

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod(6)
	};

	var defineProperty = Object.defineProperty;
	var cache = {};

	var thrower = function (it) { throw it; };

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;

	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = { length: -1 };

	    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;

	    method.call(O, argument0, argument1);
	  });
	};

	var $filter = arrayIteration.filter;



	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
	// Edge 14- issue
	var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

	// `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var filter = entryVirtual('Array').filter;

	var ArrayPrototype$1 = Array.prototype;

	var filter_1 = function (it) {
	  var own = it.filter;
	  return it === ArrayPrototype$1 || (it instanceof Array && own === ArrayPrototype$1.filter) ? filter : own;
	};

	var filter$1 = filter_1;

	var filter$2 = filter$1;

	var $map = arrayIteration.map;



	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');
	// FF49- issue
	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('map');

	// `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$1 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var map = entryVirtual('Array').map;

	var ArrayPrototype$2 = Array.prototype;

	var map_1 = function (it) {
	  var own = it.map;
	  return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.map) ? map : own;
	};

	var map$1 = map_1;

	var map$2 = map$1;

	var max = Math.max;
	var min$2 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$2(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$1 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod$1(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$1(false)
	};

	var hiddenKeys = {};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	// `Object.{ entries, values }` methods implementation
	var createMethod$2 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!descriptors || propertyIsEnumerable.call(O, key)) {
	        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.github.io/ecma262/#sec-object.entries
	  entries: createMethod$2(true),
	  // `Object.values` method
	  // https://tc39.github.io/ecma262/#sec-object.values
	  values: createMethod$2(false)
	};

	var $values = objectToArray.values;

	// `Object.values` method
	// https://tc39.github.io/ecma262/#sec-object.values
	_export({ target: 'Object', stat: true }, {
	  values: function values(O) {
	    return $values(O);
	  }
	});

	var values = path.Object.values;

	var values$1 = values;

	var values$2 = values$1;

	var f$3 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$3
	};

	var nativeAssign = Object.assign;
	var defineProperty$1 = Object.defineProperty;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$1({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$1(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
	  assign: objectAssign
	});

	var assign = path.Object.assign;

	var assign$1 = assign;

	var assign$2 = assign$1;

	var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var keys = path.Object.keys;

	var keys$1 = keys;

	var keys$2 = keys$1;

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod$3 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction(callbackfn);
	    var O = toObject(that);
	    var self = indexedObject(O);
	    var length = toLength(O.length);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	  left: createMethod$3(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$3(true)
	};

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $reduce = arrayReduce.left;



	var STRICT_METHOD = arrayMethodIsStrict('reduce');
	var USES_TO_LENGTH$2 = arrayMethodUsesToLength('reduce', { 1: 0 });

	// `Array.prototype.reduce` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH$2 }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var reduce = entryVirtual('Array').reduce;

	var ArrayPrototype$3 = Array.prototype;

	var reduce_1 = function (it) {
	  var own = it.reduce;
	  return it === ArrayPrototype$3 || (it instanceof Array && own === ArrayPrototype$3.reduce) ? reduce : own;
	};

	var reduce$1 = reduce_1;

	var reduce$2 = reduce$1;

	function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	/**
	 * Return true if `value` is object-like. A value is object-like if it's not
	 * `null` and has a `typeof` result of "object".
	 */
	function isObjectLike(value) {
	  return _typeof(value) == 'object' && value !== null;
	}

	// In ES2015 (or a polyfilled) environment, this will be Symbol.iterator
	// istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
	var SYMBOL_ITERATOR = typeof Symbol === 'function' && Symbol.iterator != null ? Symbol.iterator : '@@iterator'; // In ES2017 (or a polyfilled) environment, this will be Symbol.asyncIterator

	var SYMBOL_TO_STRING_TAG = typeof Symbol === 'function' && Symbol.toStringTag != null ? Symbol.toStringTag : '@@toStringTag';

	/**
	 * Represents a location in a Source.
	 */

	/**
	 * Takes a Source and a UTF-8 character offset, and returns the corresponding
	 * line and column as a SourceLocation.
	 */
	function getLocation(source, position) {
	  var lineRegexp = /\r\n|[\n\r]/g;
	  var line = 1;
	  var column = position + 1;
	  var match;

	  while ((match = lineRegexp.exec(source.body)) && match.index < position) {
	    line += 1;
	    column = position + 1 - (match.index + match[0].length);
	  }

	  return {
	    line: line,
	    column: column
	  };
	}

	/**
	 * Render a helpful description of the location in the GraphQL Source document.
	 */

	function printLocation(location) {
	  return printSourceLocation(location.source, getLocation(location.source, location.start));
	}
	/**
	 * Render a helpful description of the location in the GraphQL Source document.
	 */

	function printSourceLocation(source, sourceLocation) {
	  var firstLineColumnOffset = source.locationOffset.column - 1;
	  var body = whitespace(firstLineColumnOffset) + source.body;
	  var lineIndex = sourceLocation.line - 1;
	  var lineOffset = source.locationOffset.line - 1;
	  var lineNum = sourceLocation.line + lineOffset;
	  var columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
	  var columnNum = sourceLocation.column + columnOffset;
	  var locationStr = "".concat(source.name, ":").concat(lineNum, ":").concat(columnNum, "\n");
	  var lines = body.split(/\r\n|[\n\r]/g);
	  var locationLine = lines[lineIndex]; // Special case for minified documents

	  if (locationLine.length > 120) {
	    var subLineIndex = Math.floor(columnNum / 80);
	    var subLineColumnNum = columnNum % 80;
	    var subLines = [];

	    for (var i = 0; i < locationLine.length; i += 80) {
	      subLines.push(locationLine.slice(i, i + 80));
	    }

	    return locationStr + printPrefixedLines([["".concat(lineNum), subLines[0]]].concat(subLines.slice(1, subLineIndex + 1).map(function (subLine) {
	      return ['', subLine];
	    }), [[' ', whitespace(subLineColumnNum - 1) + '^'], ['', subLines[subLineIndex + 1]]]));
	  }

	  return locationStr + printPrefixedLines([// Lines specified like this: ["prefix", "string"],
	  ["".concat(lineNum - 1), lines[lineIndex - 1]], ["".concat(lineNum), locationLine], ['', whitespace(columnNum - 1) + '^'], ["".concat(lineNum + 1), lines[lineIndex + 1]]]);
	}

	function printPrefixedLines(lines) {
	  var existingLines = lines.filter(function (_ref) {
	    var _ = _ref[0],
	        line = _ref[1];
	    return line !== undefined;
	  });
	  var padLen = Math.max.apply(Math, existingLines.map(function (_ref2) {
	    var prefix = _ref2[0];
	    return prefix.length;
	  }));
	  return existingLines.map(function (_ref3) {
	    var prefix = _ref3[0],
	        line = _ref3[1];
	    return leftPad(padLen, prefix) + (line ? ' | ' + line : ' |');
	  }).join('\n');
	}

	function whitespace(len) {
	  return Array(len + 1).join(' ');
	}

	function leftPad(len, str) {
	  return whitespace(len - str.length) + str;
	}

	function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof$1(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

	function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
	/**
	 * A GraphQLError describes an Error found during the parse, validate, or
	 * execute phases of performing a GraphQL operation. In addition to a message
	 * and stack trace, it also includes information about the locations in a
	 * GraphQL document and/or execution result that correspond to the Error.
	 */

	var GraphQLError = /*#__PURE__*/function (_Error) {
	  _inherits(GraphQLError, _Error);

	  var _super = _createSuper(GraphQLError);

	  /**
	   * A message describing the Error for debugging purposes.
	   *
	   * Enumerable, and appears in the result of JSON.stringify().
	   *
	   * Note: should be treated as readonly, despite invariant usage.
	   */

	  /**
	   * An array of { line, column } locations within the source GraphQL document
	   * which correspond to this error.
	   *
	   * Errors during validation often contain multiple locations, for example to
	   * point out two things with the same name. Errors during execution include a
	   * single location, the field which produced the error.
	   *
	   * Enumerable, and appears in the result of JSON.stringify().
	   */

	  /**
	   * An array describing the JSON-path into the execution response which
	   * corresponds to this error. Only included for errors during execution.
	   *
	   * Enumerable, and appears in the result of JSON.stringify().
	   */

	  /**
	   * An array of GraphQL AST Nodes corresponding to this error.
	   */

	  /**
	   * The source GraphQL document for the first location of this error.
	   *
	   * Note that if this Error represents more than one node, the source may not
	   * represent nodes after the first node.
	   */

	  /**
	   * An array of character offsets within the source GraphQL document
	   * which correspond to this error.
	   */

	  /**
	   * The original error thrown from a field resolver during execution.
	   */

	  /**
	   * Extension fields to add to the formatted error.
	   */
	  function GraphQLError(message, nodes, source, positions, path, originalError, extensions) {
	    var _locations2, _source2, _positions2, _extensions2;

	    var _this;

	    _classCallCheck(this, GraphQLError);

	    _this = _super.call(this, message); // Compute list of blame nodes.

	    var _nodes = Array.isArray(nodes) ? nodes.length !== 0 ? nodes : undefined : nodes ? [nodes] : undefined; // Compute locations in the source for the given nodes/positions.


	    var _source = source;

	    if (!_source && _nodes) {
	      var _nodes$0$loc;

	      _source = (_nodes$0$loc = _nodes[0].loc) === null || _nodes$0$loc === void 0 ? void 0 : _nodes$0$loc.source;
	    }

	    var _positions = positions;

	    if (!_positions && _nodes) {
	      _positions = _nodes.reduce(function (list, node) {
	        if (node.loc) {
	          list.push(node.loc.start);
	        }

	        return list;
	      }, []);
	    }

	    if (_positions && _positions.length === 0) {
	      _positions = undefined;
	    }

	    var _locations;

	    if (positions && source) {
	      _locations = positions.map(function (pos) {
	        return getLocation(source, pos);
	      });
	    } else if (_nodes) {
	      _locations = _nodes.reduce(function (list, node) {
	        if (node.loc) {
	          list.push(getLocation(node.loc.source, node.loc.start));
	        }

	        return list;
	      }, []);
	    }

	    var _extensions = extensions;

	    if (_extensions == null && originalError != null) {
	      var originalExtensions = originalError.extensions;

	      if (isObjectLike(originalExtensions)) {
	        _extensions = originalExtensions;
	      }
	    }

	    Object.defineProperties(_assertThisInitialized(_this), {
	      name: {
	        value: 'GraphQLError'
	      },
	      message: {
	        value: message,
	        // By being enumerable, JSON.stringify will include `message` in the
	        // resulting output. This ensures that the simplest possible GraphQL
	        // service adheres to the spec.
	        enumerable: true,
	        writable: true
	      },
	      locations: {
	        // Coercing falsy values to undefined ensures they will not be included
	        // in JSON.stringify() when not provided.
	        value: (_locations2 = _locations) !== null && _locations2 !== void 0 ? _locations2 : undefined,
	        // By being enumerable, JSON.stringify will include `locations` in the
	        // resulting output. This ensures that the simplest possible GraphQL
	        // service adheres to the spec.
	        enumerable: _locations != null
	      },
	      path: {
	        // Coercing falsy values to undefined ensures they will not be included
	        // in JSON.stringify() when not provided.
	        value: path !== null && path !== void 0 ? path : undefined,
	        // By being enumerable, JSON.stringify will include `path` in the
	        // resulting output. This ensures that the simplest possible GraphQL
	        // service adheres to the spec.
	        enumerable: path != null
	      },
	      nodes: {
	        value: _nodes !== null && _nodes !== void 0 ? _nodes : undefined
	      },
	      source: {
	        value: (_source2 = _source) !== null && _source2 !== void 0 ? _source2 : undefined
	      },
	      positions: {
	        value: (_positions2 = _positions) !== null && _positions2 !== void 0 ? _positions2 : undefined
	      },
	      originalError: {
	        value: originalError
	      },
	      extensions: {
	        // Coercing falsy values to undefined ensures they will not be included
	        // in JSON.stringify() when not provided.
	        value: (_extensions2 = _extensions) !== null && _extensions2 !== void 0 ? _extensions2 : undefined,
	        // By being enumerable, JSON.stringify will include `path` in the
	        // resulting output. This ensures that the simplest possible GraphQL
	        // service adheres to the spec.
	        enumerable: _extensions != null
	      }
	    }); // Include (non-enumerable) stack trace.

	    if (originalError === null || originalError === void 0 ? void 0 : originalError.stack) {
	      Object.defineProperty(_assertThisInitialized(_this), 'stack', {
	        value: originalError.stack,
	        writable: true,
	        configurable: true
	      });
	      return _possibleConstructorReturn(_this);
	    } // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')


	    if (Error.captureStackTrace) {
	      Error.captureStackTrace(_assertThisInitialized(_this), GraphQLError);
	    } else {
	      Object.defineProperty(_assertThisInitialized(_this), 'stack', {
	        value: Error().stack,
	        writable: true,
	        configurable: true
	      });
	    }

	    return _this;
	  }

	  _createClass(GraphQLError, [{
	    key: "toString",
	    value: function toString() {
	      return printError(this);
	    } // FIXME: workaround to not break chai comparisons, should be remove in v16
	    // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet

	  }, {
	    key: SYMBOL_TO_STRING_TAG,
	    get: function get() {
	      return 'Object';
	    }
	  }]);

	  return GraphQLError;
	}( /*#__PURE__*/_wrapNativeSuper(Error));
	/**
	 * Prints a GraphQLError to a string, representing useful location information
	 * about the error's position in the source.
	 */

	function printError(error) {
	  var output = error.message;

	  if (error.nodes) {
	    for (var _i2 = 0, _error$nodes2 = error.nodes; _i2 < _error$nodes2.length; _i2++) {
	      var node = _error$nodes2[_i2];

	      if (node.loc) {
	        output += '\n\n' + printLocation(node.loc);
	      }
	    }
	  } else if (error.source && error.locations) {
	    for (var _i4 = 0, _error$locations2 = error.locations; _i4 < _error$locations2.length; _i4++) {
	      var location = _error$locations2[_i4];
	      output += '\n\n' + printSourceLocation(error.source, location);
	    }
	  }

	  return output;
	}

	/**
	 * Produces a GraphQLError representing a syntax error, containing useful
	 * descriptive information about the syntax error's position in the source.
	 */

	function syntaxError(source, position, description) {
	  return new GraphQLError("Syntax Error: ".concat(description), undefined, source, [position]);
	}

	/**
	 * The set of allowed kind values for AST nodes.
	 */
	var Kind = Object.freeze({
	  // Name
	  NAME: 'Name',
	  // Document
	  DOCUMENT: 'Document',
	  OPERATION_DEFINITION: 'OperationDefinition',
	  VARIABLE_DEFINITION: 'VariableDefinition',
	  SELECTION_SET: 'SelectionSet',
	  FIELD: 'Field',
	  ARGUMENT: 'Argument',
	  // Fragments
	  FRAGMENT_SPREAD: 'FragmentSpread',
	  INLINE_FRAGMENT: 'InlineFragment',
	  FRAGMENT_DEFINITION: 'FragmentDefinition',
	  // Values
	  VARIABLE: 'Variable',
	  INT: 'IntValue',
	  FLOAT: 'FloatValue',
	  STRING: 'StringValue',
	  BOOLEAN: 'BooleanValue',
	  NULL: 'NullValue',
	  ENUM: 'EnumValue',
	  LIST: 'ListValue',
	  OBJECT: 'ObjectValue',
	  OBJECT_FIELD: 'ObjectField',
	  // Directives
	  DIRECTIVE: 'Directive',
	  // Types
	  NAMED_TYPE: 'NamedType',
	  LIST_TYPE: 'ListType',
	  NON_NULL_TYPE: 'NonNullType',
	  // Type System Definitions
	  SCHEMA_DEFINITION: 'SchemaDefinition',
	  OPERATION_TYPE_DEFINITION: 'OperationTypeDefinition',
	  // Type Definitions
	  SCALAR_TYPE_DEFINITION: 'ScalarTypeDefinition',
	  OBJECT_TYPE_DEFINITION: 'ObjectTypeDefinition',
	  FIELD_DEFINITION: 'FieldDefinition',
	  INPUT_VALUE_DEFINITION: 'InputValueDefinition',
	  INTERFACE_TYPE_DEFINITION: 'InterfaceTypeDefinition',
	  UNION_TYPE_DEFINITION: 'UnionTypeDefinition',
	  ENUM_TYPE_DEFINITION: 'EnumTypeDefinition',
	  ENUM_VALUE_DEFINITION: 'EnumValueDefinition',
	  INPUT_OBJECT_TYPE_DEFINITION: 'InputObjectTypeDefinition',
	  // Directive Definitions
	  DIRECTIVE_DEFINITION: 'DirectiveDefinition',
	  // Type System Extensions
	  SCHEMA_EXTENSION: 'SchemaExtension',
	  // Type Extensions
	  SCALAR_TYPE_EXTENSION: 'ScalarTypeExtension',
	  OBJECT_TYPE_EXTENSION: 'ObjectTypeExtension',
	  INTERFACE_TYPE_EXTENSION: 'InterfaceTypeExtension',
	  UNION_TYPE_EXTENSION: 'UnionTypeExtension',
	  ENUM_TYPE_EXTENSION: 'EnumTypeExtension',
	  INPUT_OBJECT_TYPE_EXTENSION: 'InputObjectTypeExtension'
	});
	/**
	 * The enum type representing the possible kind values of AST nodes.
	 */

	function invariant(condition, message) {
	  var booleanCondition = Boolean(condition); // istanbul ignore else (See transformation done in './resources/inlineInvariant.js')

	  if (!booleanCondition) {
	    throw new Error(message != null ? message : 'Unexpected invariant triggered.');
	  }
	}

	// istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
	var nodejsCustomInspectSymbol = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('nodejs.util.inspect.custom') : undefined;

	/**
	 * The `defineInspect()` function defines `inspect()` prototype method as alias of `toJSON`
	 */

	function defineInspect(classObject) {
	  var fn = classObject.prototype.toJSON;
	  typeof fn === 'function' || invariant(0);
	  classObject.prototype.inspect = fn; // istanbul ignore else (See: 'https://github.com/graphql/graphql-js/issues/2317')

	  if (nodejsCustomInspectSymbol) {
	    classObject.prototype[nodejsCustomInspectSymbol] = fn;
	  }
	}

	/**
	 * Contains a range of UTF-8 character offsets and token references that
	 * identify the region of the source from which the AST derived.
	 */
	var Location = /*#__PURE__*/function () {
	  /**
	   * The character offset at which this Node begins.
	   */

	  /**
	   * The character offset at which this Node ends.
	   */

	  /**
	   * The Token at which this Node begins.
	   */

	  /**
	   * The Token at which this Node ends.
	   */

	  /**
	   * The Source document the AST represents.
	   */
	  function Location(startToken, endToken, source) {
	    this.start = startToken.start;
	    this.end = endToken.end;
	    this.startToken = startToken;
	    this.endToken = endToken;
	    this.source = source;
	  }

	  var _proto = Location.prototype;

	  _proto.toJSON = function toJSON() {
	    return {
	      start: this.start,
	      end: this.end
	    };
	  };

	  return Location;
	}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.

	defineInspect(Location);
	/**
	 * Represents a range of characters represented by a lexical token
	 * within a Source.
	 */

	var Token = /*#__PURE__*/function () {
	  /**
	   * The kind of Token.
	   */

	  /**
	   * The character offset at which this Node begins.
	   */

	  /**
	   * The character offset at which this Node ends.
	   */

	  /**
	   * The 1-indexed line number on which this Token appears.
	   */

	  /**
	   * The 1-indexed column number at which this Token begins.
	   */

	  /**
	   * For non-punctuation tokens, represents the interpreted value of the token.
	   */

	  /**
	   * Tokens exist as nodes in a double-linked-list amongst all tokens
	   * including ignored tokens. <SOF> is always the first node and <EOF>
	   * the last.
	   */
	  function Token(kind, start, end, line, column, prev, value) {
	    this.kind = kind;
	    this.start = start;
	    this.end = end;
	    this.line = line;
	    this.column = column;
	    this.value = value;
	    this.prev = prev;
	    this.next = null;
	  }

	  var _proto2 = Token.prototype;

	  _proto2.toJSON = function toJSON() {
	    return {
	      kind: this.kind,
	      value: this.value,
	      line: this.line,
	      column: this.column
	    };
	  };

	  return Token;
	}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.

	defineInspect(Token);
	/**
	 * @internal
	 */

	function isNode(maybeNode) {
	  return maybeNode != null && typeof maybeNode.kind === 'string';
	}
	/**
	 * The list of all possible AST node types.
	 */

	/**
	 * An exported enum describing the different kinds of tokens that the
	 * lexer emits.
	 */
	var TokenKind = Object.freeze({
	  SOF: '<SOF>',
	  EOF: '<EOF>',
	  BANG: '!',
	  DOLLAR: '$',
	  AMP: '&',
	  PAREN_L: '(',
	  PAREN_R: ')',
	  SPREAD: '...',
	  COLON: ':',
	  EQUALS: '=',
	  AT: '@',
	  BRACKET_L: '[',
	  BRACKET_R: ']',
	  BRACE_L: '{',
	  PIPE: '|',
	  BRACE_R: '}',
	  NAME: 'Name',
	  INT: 'Int',
	  FLOAT: 'Float',
	  STRING: 'String',
	  BLOCK_STRING: 'BlockString',
	  COMMENT: 'Comment'
	});
	/**
	 * The enum type representing the token kinds values.
	 */

	function _typeof$2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }
	var MAX_ARRAY_LENGTH = 10;
	var MAX_RECURSIVE_DEPTH = 2;
	/**
	 * Used to print values in error messages.
	 */

	function inspect(value) {
	  return formatValue(value, []);
	}

	function formatValue(value, seenValues) {
	  switch (_typeof$2(value)) {
	    case 'string':
	      return JSON.stringify(value);

	    case 'function':
	      return value.name ? "[function ".concat(value.name, "]") : '[function]';

	    case 'object':
	      if (value === null) {
	        return 'null';
	      }

	      return formatObjectValue(value, seenValues);

	    default:
	      return String(value);
	  }
	}

	function formatObjectValue(value, previouslySeenValues) {
	  if (previouslySeenValues.indexOf(value) !== -1) {
	    return '[Circular]';
	  }

	  var seenValues = [].concat(previouslySeenValues, [value]);
	  var customInspectFn = getCustomFn(value);

	  if (customInspectFn !== undefined) {
	    var customValue = customInspectFn.call(value); // check for infinite recursion

	    if (customValue !== value) {
	      return typeof customValue === 'string' ? customValue : formatValue(customValue, seenValues);
	    }
	  } else if (Array.isArray(value)) {
	    return formatArray(value, seenValues);
	  }

	  return formatObject(value, seenValues);
	}

	function formatObject(object, seenValues) {
	  var keys = Object.keys(object);

	  if (keys.length === 0) {
	    return '{}';
	  }

	  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
	    return '[' + getObjectTag(object) + ']';
	  }

	  var properties = keys.map(function (key) {
	    var value = formatValue(object[key], seenValues);
	    return key + ': ' + value;
	  });
	  return '{ ' + properties.join(', ') + ' }';
	}

	function formatArray(array, seenValues) {
	  if (array.length === 0) {
	    return '[]';
	  }

	  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
	    return '[Array]';
	  }

	  var len = Math.min(MAX_ARRAY_LENGTH, array.length);
	  var remaining = array.length - len;
	  var items = [];

	  for (var i = 0; i < len; ++i) {
	    items.push(formatValue(array[i], seenValues));
	  }

	  if (remaining === 1) {
	    items.push('... 1 more item');
	  } else if (remaining > 1) {
	    items.push("... ".concat(remaining, " more items"));
	  }

	  return '[' + items.join(', ') + ']';
	}

	function getCustomFn(object) {
	  var customInspectFn = object[String(nodejsCustomInspectSymbol)];

	  if (typeof customInspectFn === 'function') {
	    return customInspectFn;
	  }

	  if (typeof object.inspect === 'function') {
	    return object.inspect;
	  }
	}

	function getObjectTag(object) {
	  var tag = Object.prototype.toString.call(object).replace(/^\[object /, '').replace(/]$/, '');

	  if (tag === 'Object' && typeof object.constructor === 'function') {
	    var name = object.constructor.name;

	    if (typeof name === 'string' && name !== '') {
	      return name;
	    }
	  }

	  return tag;
	}

	function devAssert(condition, message) {
	  var booleanCondition = Boolean(condition); // istanbul ignore else (See transformation done in './resources/inlineInvariant.js')

	  if (!booleanCondition) {
	    throw new Error(message);
	  }
	}

	/**
	 * A replacement for instanceof which includes an error warning when multi-realm
	 * constructors are detected.
	 */
	// See: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
	// See: https://webpack.js.org/guides/production/
	var instanceOf = process.env.NODE_ENV === 'production' ? // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
	// eslint-disable-next-line no-shadow
	function instanceOf(value, constructor) {
	  return value instanceof constructor;
	} : // eslint-disable-next-line no-shadow
	function instanceOf(value, constructor) {
	  if (value instanceof constructor) {
	    return true;
	  }

	  if (value) {
	    var valueClass = value.constructor;
	    var className = constructor.name;

	    if (className && valueClass && valueClass.name === className) {
	      throw new Error("Cannot use ".concat(className, " \"").concat(value, "\" from another module or realm.\n\nEnsure that there is only one instance of \"graphql\" in the node_modules\ndirectory. If different versions of \"graphql\" are the dependencies of other\nrelied on modules, use \"resolutions\" to ensure only one version is installed.\n\nhttps://yarnpkg.com/en/docs/selective-version-resolutions\n\nDuplicate \"graphql\" modules cannot be used at the same time since different\nversions may have different capabilities and behavior. The data from one\nversion used in the function from another could produce confusing and\nspurious results."));
	    }
	  }

	  return false;
	};

	function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); return Constructor; }

	/**
	 * A representation of source input to GraphQL. The `name` and `locationOffset` parameters are
	 * optional, but they are useful for clients who store GraphQL documents in source files.
	 * For example, if the GraphQL input starts at line 40 in a file named `Foo.graphql`, it might
	 * be useful for `name` to be `"Foo.graphql"` and location to be `{ line: 40, column: 1 }`.
	 * The `line` and `column` properties in `locationOffset` are 1-indexed.
	 */
	var Source = /*#__PURE__*/function () {
	  function Source(body) {
	    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GraphQL request';
	    var locationOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
	      line: 1,
	      column: 1
	    };
	    typeof body === 'string' || devAssert(0, "Body must be a string. Received: ".concat(inspect(body), "."));
	    this.body = body;
	    this.name = name;
	    this.locationOffset = locationOffset;
	    this.locationOffset.line > 0 || devAssert(0, 'line in locationOffset is 1-indexed and must be positive.');
	    this.locationOffset.column > 0 || devAssert(0, 'column in locationOffset is 1-indexed and must be positive.');
	  } // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet


	  _createClass$1(Source, [{
	    key: SYMBOL_TO_STRING_TAG,
	    get: function get() {
	      return 'Source';
	    }
	  }]);

	  return Source;
	}();
	/**
	 * Test if the given value is a Source object.
	 *
	 * @internal
	 */

	// eslint-disable-next-line no-redeclare
	function isSource(source) {
	  return instanceOf(source, Source);
	}

	/**
	 * The set of allowed directive location values.
	 */
	var DirectiveLocation = Object.freeze({
	  // Request Definitions
	  QUERY: 'QUERY',
	  MUTATION: 'MUTATION',
	  SUBSCRIPTION: 'SUBSCRIPTION',
	  FIELD: 'FIELD',
	  FRAGMENT_DEFINITION: 'FRAGMENT_DEFINITION',
	  FRAGMENT_SPREAD: 'FRAGMENT_SPREAD',
	  INLINE_FRAGMENT: 'INLINE_FRAGMENT',
	  VARIABLE_DEFINITION: 'VARIABLE_DEFINITION',
	  // Type System Definitions
	  SCHEMA: 'SCHEMA',
	  SCALAR: 'SCALAR',
	  OBJECT: 'OBJECT',
	  FIELD_DEFINITION: 'FIELD_DEFINITION',
	  ARGUMENT_DEFINITION: 'ARGUMENT_DEFINITION',
	  INTERFACE: 'INTERFACE',
	  UNION: 'UNION',
	  ENUM: 'ENUM',
	  ENUM_VALUE: 'ENUM_VALUE',
	  INPUT_OBJECT: 'INPUT_OBJECT',
	  INPUT_FIELD_DEFINITION: 'INPUT_FIELD_DEFINITION'
	});
	/**
	 * The enum type representing the directive location values.
	 */

	/**
	 * Produces the value of a block string from its parsed raw value, similar to
	 * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
	 *
	 * This implements the GraphQL spec's BlockStringValue() static algorithm.
	 *
	 * @internal
	 */
	function dedentBlockStringValue(rawString) {
	  // Expand a block string's raw value into independent lines.
	  var lines = rawString.split(/\r\n|[\n\r]/g); // Remove common indentation from all lines but first.

	  var commonIndent = getBlockStringIndentation(rawString);

	  if (commonIndent !== 0) {
	    for (var i = 1; i < lines.length; i++) {
	      lines[i] = lines[i].slice(commonIndent);
	    }
	  } // Remove leading and trailing blank lines.


	  var startLine = 0;

	  while (startLine < lines.length && isBlank(lines[startLine])) {
	    ++startLine;
	  }

	  var endLine = lines.length;

	  while (endLine > startLine && isBlank(lines[endLine - 1])) {
	    --endLine;
	  } // Return a string of the lines joined with U+000A.


	  return lines.slice(startLine, endLine).join('\n');
	}

	function isBlank(str) {
	  for (var i = 0; i < str.length; ++i) {
	    if (str[i] !== ' ' && str[i] !== '\t') {
	      return false;
	    }
	  }

	  return true;
	}
	/**
	 * @internal
	 */


	function getBlockStringIndentation(value) {
	  var _commonIndent;

	  var isFirstLine = true;
	  var isEmptyLine = true;
	  var indent = 0;
	  var commonIndent = null;

	  for (var i = 0; i < value.length; ++i) {
	    switch (value.charCodeAt(i)) {
	      case 13:
	        //  \r
	        if (value.charCodeAt(i + 1) === 10) {
	          ++i; // skip \r\n as one symbol
	        }

	      // falls through

	      case 10:
	        //  \n
	        isFirstLine = false;
	        isEmptyLine = true;
	        indent = 0;
	        break;

	      case 9: //   \t

	      case 32:
	        //  <space>
	        ++indent;
	        break;

	      default:
	        if (isEmptyLine && !isFirstLine && (commonIndent === null || indent < commonIndent)) {
	          commonIndent = indent;
	        }

	        isEmptyLine = false;
	    }
	  }

	  return (_commonIndent = commonIndent) !== null && _commonIndent !== void 0 ? _commonIndent : 0;
	}
	/**
	 * Print a block string in the indented block form by adding a leading and
	 * trailing blank line. However, if a block string starts with whitespace and is
	 * a single-line, adding a leading blank line would strip that whitespace.
	 *
	 * @internal
	 */

	function printBlockString(value) {
	  var indentation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  var preferMultipleLines = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  var isSingleLine = value.indexOf('\n') === -1;
	  var hasLeadingSpace = value[0] === ' ' || value[0] === '\t';
	  var hasTrailingQuote = value[value.length - 1] === '"';
	  var hasTrailingSlash = value[value.length - 1] === '\\';
	  var printAsMultipleLines = !isSingleLine || hasTrailingQuote || hasTrailingSlash || preferMultipleLines;
	  var result = ''; // Format a multi-line block quote to account for leading space.

	  if (printAsMultipleLines && !(isSingleLine && hasLeadingSpace)) {
	    result += '\n' + indentation;
	  }

	  result += indentation ? value.replace(/\n/g, '\n' + indentation) : value;

	  if (printAsMultipleLines) {
	    result += '\n';
	  }

	  return '"""' + result.replace(/"""/g, '\\"""') + '"""';
	}

	/**
	 * Given a Source object, creates a Lexer for that source.
	 * A Lexer is a stateful stream generator in that every time
	 * it is advanced, it returns the next token in the Source. Assuming the
	 * source lexes, the final Token emitted by the lexer will be of kind
	 * EOF, after which the lexer will repeatedly return the same EOF token
	 * whenever called.
	 */

	var Lexer = /*#__PURE__*/function () {
	  /**
	   * The previously focused non-ignored token.
	   */

	  /**
	   * The currently focused non-ignored token.
	   */

	  /**
	   * The (1-indexed) line containing the current token.
	   */

	  /**
	   * The character offset at which the current line begins.
	   */
	  function Lexer(source) {
	    var startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0, null);
	    this.source = source;
	    this.lastToken = startOfFileToken;
	    this.token = startOfFileToken;
	    this.line = 1;
	    this.lineStart = 0;
	  }
	  /**
	   * Advances the token stream to the next non-ignored token.
	   */


	  var _proto = Lexer.prototype;

	  _proto.advance = function advance() {
	    this.lastToken = this.token;
	    var token = this.token = this.lookahead();
	    return token;
	  }
	  /**
	   * Looks ahead and returns the next non-ignored token, but does not change
	   * the state of Lexer.
	   */
	  ;

	  _proto.lookahead = function lookahead() {
	    var token = this.token;

	    if (token.kind !== TokenKind.EOF) {
	      do {
	        var _token$next;

	        // Note: next is only mutable during parsing, so we cast to allow this.
	        token = (_token$next = token.next) !== null && _token$next !== void 0 ? _token$next : token.next = readToken(this, token);
	      } while (token.kind === TokenKind.COMMENT);
	    }

	    return token;
	  };

	  return Lexer;
	}();
	/**
	 * @internal
	 */

	function isPunctuatorTokenKind(kind) {
	  return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
	}

	function printCharCode(code) {
	  return (// NaN/undefined represents access beyond the end of the file.
	    isNaN(code) ? TokenKind.EOF : // Trust JSON for ASCII.
	    code < 0x007f ? JSON.stringify(String.fromCharCode(code)) : // Otherwise print the escaped form.
	    "\"\\u".concat(('00' + code.toString(16).toUpperCase()).slice(-4), "\"")
	  );
	}
	/**
	 * Gets the next token from the source starting at the given position.
	 *
	 * This skips over whitespace until it finds the next lexable token, then lexes
	 * punctuators immediately or calls the appropriate helper function for more
	 * complicated tokens.
	 */


	function readToken(lexer, prev) {
	  var source = lexer.source;
	  var body = source.body;
	  var bodyLength = body.length;
	  var pos = prev.end;

	  while (pos < bodyLength) {
	    var code = body.charCodeAt(pos);
	    var _line = lexer.line;

	    var _col = 1 + pos - lexer.lineStart; // SourceCharacter


	    switch (code) {
	      case 0xfeff: // <BOM>

	      case 9: //   \t

	      case 32: //  <space>

	      case 44:
	        //  ,
	        ++pos;
	        continue;

	      case 10:
	        //  \n
	        ++pos;
	        ++lexer.line;
	        lexer.lineStart = pos;
	        continue;

	      case 13:
	        //  \r
	        if (body.charCodeAt(pos + 1) === 10) {
	          pos += 2;
	        } else {
	          ++pos;
	        }

	        ++lexer.line;
	        lexer.lineStart = pos;
	        continue;

	      case 33:
	        //  !
	        return new Token(TokenKind.BANG, pos, pos + 1, _line, _col, prev);

	      case 35:
	        //  #
	        return readComment(source, pos, _line, _col, prev);

	      case 36:
	        //  $
	        return new Token(TokenKind.DOLLAR, pos, pos + 1, _line, _col, prev);

	      case 38:
	        //  &
	        return new Token(TokenKind.AMP, pos, pos + 1, _line, _col, prev);

	      case 40:
	        //  (
	        return new Token(TokenKind.PAREN_L, pos, pos + 1, _line, _col, prev);

	      case 41:
	        //  )
	        return new Token(TokenKind.PAREN_R, pos, pos + 1, _line, _col, prev);

	      case 46:
	        //  .
	        if (body.charCodeAt(pos + 1) === 46 && body.charCodeAt(pos + 2) === 46) {
	          return new Token(TokenKind.SPREAD, pos, pos + 3, _line, _col, prev);
	        }

	        break;

	      case 58:
	        //  :
	        return new Token(TokenKind.COLON, pos, pos + 1, _line, _col, prev);

	      case 61:
	        //  =
	        return new Token(TokenKind.EQUALS, pos, pos + 1, _line, _col, prev);

	      case 64:
	        //  @
	        return new Token(TokenKind.AT, pos, pos + 1, _line, _col, prev);

	      case 91:
	        //  [
	        return new Token(TokenKind.BRACKET_L, pos, pos + 1, _line, _col, prev);

	      case 93:
	        //  ]
	        return new Token(TokenKind.BRACKET_R, pos, pos + 1, _line, _col, prev);

	      case 123:
	        // {
	        return new Token(TokenKind.BRACE_L, pos, pos + 1, _line, _col, prev);

	      case 124:
	        // |
	        return new Token(TokenKind.PIPE, pos, pos + 1, _line, _col, prev);

	      case 125:
	        // }
	        return new Token(TokenKind.BRACE_R, pos, pos + 1, _line, _col, prev);

	      case 34:
	        //  "
	        if (body.charCodeAt(pos + 1) === 34 && body.charCodeAt(pos + 2) === 34) {
	          return readBlockString(source, pos, _line, _col, prev, lexer);
	        }

	        return readString(source, pos, _line, _col, prev);

	      case 45: //  -

	      case 48: //  0

	      case 49: //  1

	      case 50: //  2

	      case 51: //  3

	      case 52: //  4

	      case 53: //  5

	      case 54: //  6

	      case 55: //  7

	      case 56: //  8

	      case 57:
	        //  9
	        return readNumber(source, pos, code, _line, _col, prev);

	      case 65: //  A

	      case 66: //  B

	      case 67: //  C

	      case 68: //  D

	      case 69: //  E

	      case 70: //  F

	      case 71: //  G

	      case 72: //  H

	      case 73: //  I

	      case 74: //  J

	      case 75: //  K

	      case 76: //  L

	      case 77: //  M

	      case 78: //  N

	      case 79: //  O

	      case 80: //  P

	      case 81: //  Q

	      case 82: //  R

	      case 83: //  S

	      case 84: //  T

	      case 85: //  U

	      case 86: //  V

	      case 87: //  W

	      case 88: //  X

	      case 89: //  Y

	      case 90: //  Z

	      case 95: //  _

	      case 97: //  a

	      case 98: //  b

	      case 99: //  c

	      case 100: // d

	      case 101: // e

	      case 102: // f

	      case 103: // g

	      case 104: // h

	      case 105: // i

	      case 106: // j

	      case 107: // k

	      case 108: // l

	      case 109: // m

	      case 110: // n

	      case 111: // o

	      case 112: // p

	      case 113: // q

	      case 114: // r

	      case 115: // s

	      case 116: // t

	      case 117: // u

	      case 118: // v

	      case 119: // w

	      case 120: // x

	      case 121: // y

	      case 122:
	        // z
	        return readName(source, pos, _line, _col, prev);
	    }

	    throw syntaxError(source, pos, unexpectedCharacterMessage(code));
	  }

	  var line = lexer.line;
	  var col = 1 + pos - lexer.lineStart;
	  return new Token(TokenKind.EOF, bodyLength, bodyLength, line, col, prev);
	}
	/**
	 * Report a message that an unexpected character was encountered.
	 */


	function unexpectedCharacterMessage(code) {
	  if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
	    return "Cannot contain the invalid character ".concat(printCharCode(code), ".");
	  }

	  if (code === 39) {
	    // '
	    return 'Unexpected single quote character (\'), did you mean to use a double quote (")?';
	  }

	  return "Cannot parse the unexpected character ".concat(printCharCode(code), ".");
	}
	/**
	 * Reads a comment token from the source file.
	 *
	 * #[\u0009\u0020-\uFFFF]*
	 */


	function readComment(source, start, line, col, prev) {
	  var body = source.body;
	  var code;
	  var position = start;

	  do {
	    code = body.charCodeAt(++position);
	  } while (!isNaN(code) && ( // SourceCharacter but not LineTerminator
	  code > 0x001f || code === 0x0009));

	  return new Token(TokenKind.COMMENT, start, position, line, col, prev, body.slice(start + 1, position));
	}
	/**
	 * Reads a number token from the source file, either a float
	 * or an int depending on whether a decimal point appears.
	 *
	 * Int:   -?(0|[1-9][0-9]*)
	 * Float: -?(0|[1-9][0-9]*)(\.[0-9]+)?((E|e)(+|-)?[0-9]+)?
	 */


	function readNumber(source, start, firstCode, line, col, prev) {
	  var body = source.body;
	  var code = firstCode;
	  var position = start;
	  var isFloat = false;

	  if (code === 45) {
	    // -
	    code = body.charCodeAt(++position);
	  }

	  if (code === 48) {
	    // 0
	    code = body.charCodeAt(++position);

	    if (code >= 48 && code <= 57) {
	      throw syntaxError(source, position, "Invalid number, unexpected digit after 0: ".concat(printCharCode(code), "."));
	    }
	  } else {
	    position = readDigits(source, position, code);
	    code = body.charCodeAt(position);
	  }

	  if (code === 46) {
	    // .
	    isFloat = true;
	    code = body.charCodeAt(++position);
	    position = readDigits(source, position, code);
	    code = body.charCodeAt(position);
	  }

	  if (code === 69 || code === 101) {
	    // E e
	    isFloat = true;
	    code = body.charCodeAt(++position);

	    if (code === 43 || code === 45) {
	      // + -
	      code = body.charCodeAt(++position);
	    }

	    position = readDigits(source, position, code);
	    code = body.charCodeAt(position);
	  } // Numbers cannot be followed by . or NameStart


	  if (code === 46 || isNameStart(code)) {
	    throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
	  }

	  return new Token(isFloat ? TokenKind.FLOAT : TokenKind.INT, start, position, line, col, prev, body.slice(start, position));
	}
	/**
	 * Returns the new position in the source after reading digits.
	 */


	function readDigits(source, start, firstCode) {
	  var body = source.body;
	  var position = start;
	  var code = firstCode;

	  if (code >= 48 && code <= 57) {
	    // 0 - 9
	    do {
	      code = body.charCodeAt(++position);
	    } while (code >= 48 && code <= 57); // 0 - 9


	    return position;
	  }

	  throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
	}
	/**
	 * Reads a string token from the source file.
	 *
	 * "([^"\\\u000A\u000D]|(\\(u[0-9a-fA-F]{4}|["\\/bfnrt])))*"
	 */


	function readString(source, start, line, col, prev) {
	  var body = source.body;
	  var position = start + 1;
	  var chunkStart = position;
	  var code = 0;
	  var value = '';

	  while (position < body.length && !isNaN(code = body.charCodeAt(position)) && // not LineTerminator
	  code !== 0x000a && code !== 0x000d) {
	    // Closing Quote (")
	    if (code === 34) {
	      value += body.slice(chunkStart, position);
	      return new Token(TokenKind.STRING, start, position + 1, line, col, prev, value);
	    } // SourceCharacter


	    if (code < 0x0020 && code !== 0x0009) {
	      throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
	    }

	    ++position;

	    if (code === 92) {
	      // \
	      value += body.slice(chunkStart, position - 1);
	      code = body.charCodeAt(position);

	      switch (code) {
	        case 34:
	          value += '"';
	          break;

	        case 47:
	          value += '/';
	          break;

	        case 92:
	          value += '\\';
	          break;

	        case 98:
	          value += '\b';
	          break;

	        case 102:
	          value += '\f';
	          break;

	        case 110:
	          value += '\n';
	          break;

	        case 114:
	          value += '\r';
	          break;

	        case 116:
	          value += '\t';
	          break;

	        case 117:
	          {
	            // uXXXX
	            var charCode = uniCharCode(body.charCodeAt(position + 1), body.charCodeAt(position + 2), body.charCodeAt(position + 3), body.charCodeAt(position + 4));

	            if (charCode < 0) {
	              var invalidSequence = body.slice(position + 1, position + 5);
	              throw syntaxError(source, position, "Invalid character escape sequence: \\u".concat(invalidSequence, "."));
	            }

	            value += String.fromCharCode(charCode);
	            position += 4;
	            break;
	          }

	        default:
	          throw syntaxError(source, position, "Invalid character escape sequence: \\".concat(String.fromCharCode(code), "."));
	      }

	      ++position;
	      chunkStart = position;
	    }
	  }

	  throw syntaxError(source, position, 'Unterminated string.');
	}
	/**
	 * Reads a block string token from the source file.
	 *
	 * """("?"?(\\"""|\\(?!=""")|[^"\\]))*"""
	 */


	function readBlockString(source, start, line, col, prev, lexer) {
	  var body = source.body;
	  var position = start + 3;
	  var chunkStart = position;
	  var code = 0;
	  var rawValue = '';

	  while (position < body.length && !isNaN(code = body.charCodeAt(position))) {
	    // Closing Triple-Quote (""")
	    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
	      rawValue += body.slice(chunkStart, position);
	      return new Token(TokenKind.BLOCK_STRING, start, position + 3, line, col, prev, dedentBlockStringValue(rawValue));
	    } // SourceCharacter


	    if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
	      throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
	    }

	    if (code === 10) {
	      // new line
	      ++position;
	      ++lexer.line;
	      lexer.lineStart = position;
	    } else if (code === 13) {
	      // carriage return
	      if (body.charCodeAt(position + 1) === 10) {
	        position += 2;
	      } else {
	        ++position;
	      }

	      ++lexer.line;
	      lexer.lineStart = position;
	    } else if ( // Escape Triple-Quote (\""")
	    code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
	      rawValue += body.slice(chunkStart, position) + '"""';
	      position += 4;
	      chunkStart = position;
	    } else {
	      ++position;
	    }
	  }

	  throw syntaxError(source, position, 'Unterminated string.');
	}
	/**
	 * Converts four hexadecimal chars to the integer that the
	 * string represents. For example, uniCharCode('0','0','0','f')
	 * will return 15, and uniCharCode('0','0','f','f') returns 255.
	 *
	 * Returns a negative number on error, if a char was invalid.
	 *
	 * This is implemented by noting that char2hex() returns -1 on error,
	 * which means the result of ORing the char2hex() will also be negative.
	 */


	function uniCharCode(a, b, c, d) {
	  return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
	}
	/**
	 * Converts a hex character to its integer value.
	 * '0' becomes 0, '9' becomes 9
	 * 'A' becomes 10, 'F' becomes 15
	 * 'a' becomes 10, 'f' becomes 15
	 *
	 * Returns -1 on error.
	 */


	function char2hex(a) {
	  return a >= 48 && a <= 57 ? a - 48 // 0-9
	  : a >= 65 && a <= 70 ? a - 55 // A-F
	  : a >= 97 && a <= 102 ? a - 87 // a-f
	  : -1;
	}
	/**
	 * Reads an alphanumeric + underscore name from the source.
	 *
	 * [_A-Za-z][_0-9A-Za-z]*
	 */


	function readName(source, start, line, col, prev) {
	  var body = source.body;
	  var bodyLength = body.length;
	  var position = start + 1;
	  var code = 0;

	  while (position !== bodyLength && !isNaN(code = body.charCodeAt(position)) && (code === 95 || // _
	  code >= 48 && code <= 57 || // 0-9
	  code >= 65 && code <= 90 || // A-Z
	  code >= 97 && code <= 122) // a-z
	  ) {
	    ++position;
	  }

	  return new Token(TokenKind.NAME, start, position, line, col, prev, body.slice(start, position));
	} // _ A-Z a-z


	function isNameStart(code) {
	  return code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
	}

	/**
	 * Configuration options to control parser behavior
	 */

	/**
	 * Given a GraphQL source, parses it into a Document.
	 * Throws GraphQLError if a syntax error is encountered.
	 */
	function parse(source, options) {
	  var parser = new Parser(source, options);
	  return parser.parseDocument();
	}
	/**
	 * This class is exported only to assist people in implementing their own parsers
	 * without duplicating too much code and should be used only as last resort for cases
	 * such as experimental syntax or if certain features could not be contributed upstream.
	 *
	 * It is still part of the internal API and is versioned, so any changes to it are never
	 * considered breaking changes. If you still need to support multiple versions of the
	 * library, please use the `versionInfo` variable for version detection.
	 *
	 * @internal
	 */

	var Parser = /*#__PURE__*/function () {
	  function Parser(source, options) {
	    var sourceObj = isSource(source) ? source : new Source(source);
	    this._lexer = new Lexer(sourceObj);
	    this._options = options;
	  }
	  /**
	   * Converts a name lex token into a name parse node.
	   */


	  var _proto = Parser.prototype;

	  _proto.parseName = function parseName() {
	    var token = this.expectToken(TokenKind.NAME);
	    return {
	      kind: Kind.NAME,
	      value: token.value,
	      loc: this.loc(token)
	    };
	  } // Implements the parsing rules in the Document section.

	  /**
	   * Document : Definition+
	   */
	  ;

	  _proto.parseDocument = function parseDocument() {
	    var start = this._lexer.token;
	    return {
	      kind: Kind.DOCUMENT,
	      definitions: this.many(TokenKind.SOF, this.parseDefinition, TokenKind.EOF),
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * Definition :
	   *   - ExecutableDefinition
	   *   - TypeSystemDefinition
	   *   - TypeSystemExtension
	   *
	   * ExecutableDefinition :
	   *   - OperationDefinition
	   *   - FragmentDefinition
	   */
	  ;

	  _proto.parseDefinition = function parseDefinition() {
	    if (this.peek(TokenKind.NAME)) {
	      switch (this._lexer.token.value) {
	        case 'query':
	        case 'mutation':
	        case 'subscription':
	          return this.parseOperationDefinition();

	        case 'fragment':
	          return this.parseFragmentDefinition();

	        case 'schema':
	        case 'scalar':
	        case 'type':
	        case 'interface':
	        case 'union':
	        case 'enum':
	        case 'input':
	        case 'directive':
	          return this.parseTypeSystemDefinition();

	        case 'extend':
	          return this.parseTypeSystemExtension();
	      }
	    } else if (this.peek(TokenKind.BRACE_L)) {
	      return this.parseOperationDefinition();
	    } else if (this.peekDescription()) {
	      return this.parseTypeSystemDefinition();
	    }

	    throw this.unexpected();
	  } // Implements the parsing rules in the Operations section.

	  /**
	   * OperationDefinition :
	   *  - SelectionSet
	   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
	   */
	  ;

	  _proto.parseOperationDefinition = function parseOperationDefinition() {
	    var start = this._lexer.token;

	    if (this.peek(TokenKind.BRACE_L)) {
	      return {
	        kind: Kind.OPERATION_DEFINITION,
	        operation: 'query',
	        name: undefined,
	        variableDefinitions: [],
	        directives: [],
	        selectionSet: this.parseSelectionSet(),
	        loc: this.loc(start)
	      };
	    }

	    var operation = this.parseOperationType();
	    var name;

	    if (this.peek(TokenKind.NAME)) {
	      name = this.parseName();
	    }

	    return {
	      kind: Kind.OPERATION_DEFINITION,
	      operation: operation,
	      name: name,
	      variableDefinitions: this.parseVariableDefinitions(),
	      directives: this.parseDirectives(false),
	      selectionSet: this.parseSelectionSet(),
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * OperationType : one of query mutation subscription
	   */
	  ;

	  _proto.parseOperationType = function parseOperationType() {
	    var operationToken = this.expectToken(TokenKind.NAME);

	    switch (operationToken.value) {
	      case 'query':
	        return 'query';

	      case 'mutation':
	        return 'mutation';

	      case 'subscription':
	        return 'subscription';
	    }

	    throw this.unexpected(operationToken);
	  }
	  /**
	   * VariableDefinitions : ( VariableDefinition+ )
	   */
	  ;

	  _proto.parseVariableDefinitions = function parseVariableDefinitions() {
	    return this.optionalMany(TokenKind.PAREN_L, this.parseVariableDefinition, TokenKind.PAREN_R);
	  }
	  /**
	   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
	   */
	  ;

	  _proto.parseVariableDefinition = function parseVariableDefinition() {
	    var start = this._lexer.token;
	    return {
	      kind: Kind.VARIABLE_DEFINITION,
	      variable: this.parseVariable(),
	      type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
	      defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseValueLiteral(true) : undefined,
	      directives: this.parseDirectives(true),
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * Variable : $ Name
	   */
	  ;

	  _proto.parseVariable = function parseVariable() {
	    var start = this._lexer.token;
	    this.expectToken(TokenKind.DOLLAR);
	    return {
	      kind: Kind.VARIABLE,
	      name: this.parseName(),
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * SelectionSet : { Selection+ }
	   */
	  ;

	  _proto.parseSelectionSet = function parseSelectionSet() {
	    var start = this._lexer.token;
	    return {
	      kind: Kind.SELECTION_SET,
	      selections: this.many(TokenKind.BRACE_L, this.parseSelection, TokenKind.BRACE_R),
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * Selection :
	   *   - Field
	   *   - FragmentSpread
	   *   - InlineFragment
	   */
	  ;

	  _proto.parseSelection = function parseSelection() {
	    return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
	  }
	  /**
	   * Field : Alias? Name Arguments? Directives? SelectionSet?
	   *
	   * Alias : Name :
	   */
	  ;

	  _proto.parseField = function parseField() {
	    var start = this._lexer.token;
	    var nameOrAlias = this.parseName();
	    var alias;
	    var name;

	    if (this.expectOptionalToken(TokenKind.COLON)) {
	      alias = nameOrAlias;
	      name = this.parseName();
	    } else {
	      name = nameOrAlias;
	    }

	    return {
	      kind: Kind.FIELD,
	      alias: alias,
	      name: name,
	      arguments: this.parseArguments(false),
	      directives: this.parseDirectives(false),
	      selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : undefined,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * Arguments[Const] : ( Argument[?Const]+ )
	   */
	  ;

	  _proto.parseArguments = function parseArguments(isConst) {
	    var item = isConst ? this.parseConstArgument : this.parseArgument;
	    return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
	  }
	  /**
	   * Argument[Const] : Name : Value[?Const]
	   */
	  ;

	  _proto.parseArgument = function parseArgument() {
	    var start = this._lexer.token;
	    var name = this.parseName();
	    this.expectToken(TokenKind.COLON);
	    return {
	      kind: Kind.ARGUMENT,
	      name: name,
	      value: this.parseValueLiteral(false),
	      loc: this.loc(start)
	    };
	  };

	  _proto.parseConstArgument = function parseConstArgument() {
	    var start = this._lexer.token;
	    return {
	      kind: Kind.ARGUMENT,
	      name: this.parseName(),
	      value: (this.expectToken(TokenKind.COLON), this.parseValueLiteral(true)),
	      loc: this.loc(start)
	    };
	  } // Implements the parsing rules in the Fragments section.

	  /**
	   * Corresponds to both FragmentSpread and InlineFragment in the spec.
	   *
	   * FragmentSpread : ... FragmentName Directives?
	   *
	   * InlineFragment : ... TypeCondition? Directives? SelectionSet
	   */
	  ;

	  _proto.parseFragment = function parseFragment() {
	    var start = this._lexer.token;
	    this.expectToken(TokenKind.SPREAD);
	    var hasTypeCondition = this.expectOptionalKeyword('on');

	    if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
	      return {
	        kind: Kind.FRAGMENT_SPREAD,
	        name: this.parseFragmentName(),
	        directives: this.parseDirectives(false),
	        loc: this.loc(start)
	      };
	    }

	    return {
	      kind: Kind.INLINE_FRAGMENT,
	      typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
	      directives: this.parseDirectives(false),
	      selectionSet: this.parseSelectionSet(),
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * FragmentDefinition :
	   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
	   *
	   * TypeCondition : NamedType
	   */
	  ;

	  _proto.parseFragmentDefinition = function parseFragmentDefinition() {
	    var _this$_options;

	    var start = this._lexer.token;
	    this.expectKeyword('fragment'); // Experimental support for defining variables within fragments changes
	    // the grammar of FragmentDefinition:
	    //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet

	    if (((_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.experimentalFragmentVariables) === true) {
	      return {
	        kind: Kind.FRAGMENT_DEFINITION,
	        name: this.parseFragmentName(),
	        variableDefinitions: this.parseVariableDefinitions(),
	        typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
	        directives: this.parseDirectives(false),
	        selectionSet: this.parseSelectionSet(),
	        loc: this.loc(start)
	      };
	    }

	    return {
	      kind: Kind.FRAGMENT_DEFINITION,
	      name: this.parseFragmentName(),
	      typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
	      directives: this.parseDirectives(false),
	      selectionSet: this.parseSelectionSet(),
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * FragmentName : Name but not `on`
	   */
	  ;

	  _proto.parseFragmentName = function parseFragmentName() {
	    if (this._lexer.token.value === 'on') {
	      throw this.unexpected();
	    }

	    return this.parseName();
	  } // Implements the parsing rules in the Values section.

	  /**
	   * Value[Const] :
	   *   - [~Const] Variable
	   *   - IntValue
	   *   - FloatValue
	   *   - StringValue
	   *   - BooleanValue
	   *   - NullValue
	   *   - EnumValue
	   *   - ListValue[?Const]
	   *   - ObjectValue[?Const]
	   *
	   * BooleanValue : one of `true` `false`
	   *
	   * NullValue : `null`
	   *
	   * EnumValue : Name but not `true`, `false` or `null`
	   */
	  ;

	  _proto.parseValueLiteral = function parseValueLiteral(isConst) {
	    var token = this._lexer.token;

	    switch (token.kind) {
	      case TokenKind.BRACKET_L:
	        return this.parseList(isConst);

	      case TokenKind.BRACE_L:
	        return this.parseObject(isConst);

	      case TokenKind.INT:
	        this._lexer.advance();

	        return {
	          kind: Kind.INT,
	          value: token.value,
	          loc: this.loc(token)
	        };

	      case TokenKind.FLOAT:
	        this._lexer.advance();

	        return {
	          kind: Kind.FLOAT,
	          value: token.value,
	          loc: this.loc(token)
	        };

	      case TokenKind.STRING:
	      case TokenKind.BLOCK_STRING:
	        return this.parseStringLiteral();

	      case TokenKind.NAME:
	        this._lexer.advance();

	        switch (token.value) {
	          case 'true':
	            return {
	              kind: Kind.BOOLEAN,
	              value: true,
	              loc: this.loc(token)
	            };

	          case 'false':
	            return {
	              kind: Kind.BOOLEAN,
	              value: false,
	              loc: this.loc(token)
	            };

	          case 'null':
	            return {
	              kind: Kind.NULL,
	              loc: this.loc(token)
	            };

	          default:
	            return {
	              kind: Kind.ENUM,
	              value: token.value,
	              loc: this.loc(token)
	            };
	        }

	      case TokenKind.DOLLAR:
	        if (!isConst) {
	          return this.parseVariable();
	        }

	        break;
	    }

	    throw this.unexpected();
	  };

	  _proto.parseStringLiteral = function parseStringLiteral() {
	    var token = this._lexer.token;

	    this._lexer.advance();

	    return {
	      kind: Kind.STRING,
	      value: token.value,
	      block: token.kind === TokenKind.BLOCK_STRING,
	      loc: this.loc(token)
	    };
	  }
	  /**
	   * ListValue[Const] :
	   *   - [ ]
	   *   - [ Value[?Const]+ ]
	   */
	  ;

	  _proto.parseList = function parseList(isConst) {
	    var _this = this;

	    var start = this._lexer.token;

	    var item = function item() {
	      return _this.parseValueLiteral(isConst);
	    };

	    return {
	      kind: Kind.LIST,
	      values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R),
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * ObjectValue[Const] :
	   *   - { }
	   *   - { ObjectField[?Const]+ }
	   */
	  ;

	  _proto.parseObject = function parseObject(isConst) {
	    var _this2 = this;

	    var start = this._lexer.token;

	    var item = function item() {
	      return _this2.parseObjectField(isConst);
	    };

	    return {
	      kind: Kind.OBJECT,
	      fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R),
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * ObjectField[Const] : Name : Value[?Const]
	   */
	  ;

	  _proto.parseObjectField = function parseObjectField(isConst) {
	    var start = this._lexer.token;
	    var name = this.parseName();
	    this.expectToken(TokenKind.COLON);
	    return {
	      kind: Kind.OBJECT_FIELD,
	      name: name,
	      value: this.parseValueLiteral(isConst),
	      loc: this.loc(start)
	    };
	  } // Implements the parsing rules in the Directives section.

	  /**
	   * Directives[Const] : Directive[?Const]+
	   */
	  ;

	  _proto.parseDirectives = function parseDirectives(isConst) {
	    var directives = [];

	    while (this.peek(TokenKind.AT)) {
	      directives.push(this.parseDirective(isConst));
	    }

	    return directives;
	  }
	  /**
	   * Directive[Const] : @ Name Arguments[?Const]?
	   */
	  ;

	  _proto.parseDirective = function parseDirective(isConst) {
	    var start = this._lexer.token;
	    this.expectToken(TokenKind.AT);
	    return {
	      kind: Kind.DIRECTIVE,
	      name: this.parseName(),
	      arguments: this.parseArguments(isConst),
	      loc: this.loc(start)
	    };
	  } // Implements the parsing rules in the Types section.

	  /**
	   * Type :
	   *   - NamedType
	   *   - ListType
	   *   - NonNullType
	   */
	  ;

	  _proto.parseTypeReference = function parseTypeReference() {
	    var start = this._lexer.token;
	    var type;

	    if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
	      type = this.parseTypeReference();
	      this.expectToken(TokenKind.BRACKET_R);
	      type = {
	        kind: Kind.LIST_TYPE,
	        type: type,
	        loc: this.loc(start)
	      };
	    } else {
	      type = this.parseNamedType();
	    }

	    if (this.expectOptionalToken(TokenKind.BANG)) {
	      return {
	        kind: Kind.NON_NULL_TYPE,
	        type: type,
	        loc: this.loc(start)
	      };
	    }

	    return type;
	  }
	  /**
	   * NamedType : Name
	   */
	  ;

	  _proto.parseNamedType = function parseNamedType() {
	    var start = this._lexer.token;
	    return {
	      kind: Kind.NAMED_TYPE,
	      name: this.parseName(),
	      loc: this.loc(start)
	    };
	  } // Implements the parsing rules in the Type Definition section.

	  /**
	   * TypeSystemDefinition :
	   *   - SchemaDefinition
	   *   - TypeDefinition
	   *   - DirectiveDefinition
	   *
	   * TypeDefinition :
	   *   - ScalarTypeDefinition
	   *   - ObjectTypeDefinition
	   *   - InterfaceTypeDefinition
	   *   - UnionTypeDefinition
	   *   - EnumTypeDefinition
	   *   - InputObjectTypeDefinition
	   */
	  ;

	  _proto.parseTypeSystemDefinition = function parseTypeSystemDefinition() {
	    // Many definitions begin with a description and require a lookahead.
	    var keywordToken = this.peekDescription() ? this._lexer.lookahead() : this._lexer.token;

	    if (keywordToken.kind === TokenKind.NAME) {
	      switch (keywordToken.value) {
	        case 'schema':
	          return this.parseSchemaDefinition();

	        case 'scalar':
	          return this.parseScalarTypeDefinition();

	        case 'type':
	          return this.parseObjectTypeDefinition();

	        case 'interface':
	          return this.parseInterfaceTypeDefinition();

	        case 'union':
	          return this.parseUnionTypeDefinition();

	        case 'enum':
	          return this.parseEnumTypeDefinition();

	        case 'input':
	          return this.parseInputObjectTypeDefinition();

	        case 'directive':
	          return this.parseDirectiveDefinition();
	      }
	    }

	    throw this.unexpected(keywordToken);
	  };

	  _proto.peekDescription = function peekDescription() {
	    return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
	  }
	  /**
	   * Description : StringValue
	   */
	  ;

	  _proto.parseDescription = function parseDescription() {
	    if (this.peekDescription()) {
	      return this.parseStringLiteral();
	    }
	  }
	  /**
	   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
	   */
	  ;

	  _proto.parseSchemaDefinition = function parseSchemaDefinition() {
	    var start = this._lexer.token;
	    var description = this.parseDescription();
	    this.expectKeyword('schema');
	    var directives = this.parseDirectives(true);
	    var operationTypes = this.many(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
	    return {
	      kind: Kind.SCHEMA_DEFINITION,
	      description: description,
	      directives: directives,
	      operationTypes: operationTypes,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * OperationTypeDefinition : OperationType : NamedType
	   */
	  ;

	  _proto.parseOperationTypeDefinition = function parseOperationTypeDefinition() {
	    var start = this._lexer.token;
	    var operation = this.parseOperationType();
	    this.expectToken(TokenKind.COLON);
	    var type = this.parseNamedType();
	    return {
	      kind: Kind.OPERATION_TYPE_DEFINITION,
	      operation: operation,
	      type: type,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
	   */
	  ;

	  _proto.parseScalarTypeDefinition = function parseScalarTypeDefinition() {
	    var start = this._lexer.token;
	    var description = this.parseDescription();
	    this.expectKeyword('scalar');
	    var name = this.parseName();
	    var directives = this.parseDirectives(true);
	    return {
	      kind: Kind.SCALAR_TYPE_DEFINITION,
	      description: description,
	      name: name,
	      directives: directives,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * ObjectTypeDefinition :
	   *   Description?
	   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
	   */
	  ;

	  _proto.parseObjectTypeDefinition = function parseObjectTypeDefinition() {
	    var start = this._lexer.token;
	    var description = this.parseDescription();
	    this.expectKeyword('type');
	    var name = this.parseName();
	    var interfaces = this.parseImplementsInterfaces();
	    var directives = this.parseDirectives(true);
	    var fields = this.parseFieldsDefinition();
	    return {
	      kind: Kind.OBJECT_TYPE_DEFINITION,
	      description: description,
	      name: name,
	      interfaces: interfaces,
	      directives: directives,
	      fields: fields,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * ImplementsInterfaces :
	   *   - implements `&`? NamedType
	   *   - ImplementsInterfaces & NamedType
	   */
	  ;

	  _proto.parseImplementsInterfaces = function parseImplementsInterfaces() {
	    var _this$_options2;

	    if (!this.expectOptionalKeyword('implements')) {
	      return [];
	    }

	    if (((_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.allowLegacySDLImplementsInterfaces) === true) {
	      var types = []; // Optional leading ampersand

	      this.expectOptionalToken(TokenKind.AMP);

	      do {
	        types.push(this.parseNamedType());
	      } while (this.expectOptionalToken(TokenKind.AMP) || this.peek(TokenKind.NAME));

	      return types;
	    }

	    return this.delimitedMany(TokenKind.AMP, this.parseNamedType);
	  }
	  /**
	   * FieldsDefinition : { FieldDefinition+ }
	   */
	  ;

	  _proto.parseFieldsDefinition = function parseFieldsDefinition() {
	    var _this$_options3;

	    // Legacy support for the SDL?
	    if (((_this$_options3 = this._options) === null || _this$_options3 === void 0 ? void 0 : _this$_options3.allowLegacySDLEmptyFields) === true && this.peek(TokenKind.BRACE_L) && this._lexer.lookahead().kind === TokenKind.BRACE_R) {
	      this._lexer.advance();

	      this._lexer.advance();

	      return [];
	    }

	    return this.optionalMany(TokenKind.BRACE_L, this.parseFieldDefinition, TokenKind.BRACE_R);
	  }
	  /**
	   * FieldDefinition :
	   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
	   */
	  ;

	  _proto.parseFieldDefinition = function parseFieldDefinition() {
	    var start = this._lexer.token;
	    var description = this.parseDescription();
	    var name = this.parseName();
	    var args = this.parseArgumentDefs();
	    this.expectToken(TokenKind.COLON);
	    var type = this.parseTypeReference();
	    var directives = this.parseDirectives(true);
	    return {
	      kind: Kind.FIELD_DEFINITION,
	      description: description,
	      name: name,
	      arguments: args,
	      type: type,
	      directives: directives,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * ArgumentsDefinition : ( InputValueDefinition+ )
	   */
	  ;

	  _proto.parseArgumentDefs = function parseArgumentDefs() {
	    return this.optionalMany(TokenKind.PAREN_L, this.parseInputValueDef, TokenKind.PAREN_R);
	  }
	  /**
	   * InputValueDefinition :
	   *   - Description? Name : Type DefaultValue? Directives[Const]?
	   */
	  ;

	  _proto.parseInputValueDef = function parseInputValueDef() {
	    var start = this._lexer.token;
	    var description = this.parseDescription();
	    var name = this.parseName();
	    this.expectToken(TokenKind.COLON);
	    var type = this.parseTypeReference();
	    var defaultValue;

	    if (this.expectOptionalToken(TokenKind.EQUALS)) {
	      defaultValue = this.parseValueLiteral(true);
	    }

	    var directives = this.parseDirectives(true);
	    return {
	      kind: Kind.INPUT_VALUE_DEFINITION,
	      description: description,
	      name: name,
	      type: type,
	      defaultValue: defaultValue,
	      directives: directives,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * InterfaceTypeDefinition :
	   *   - Description? interface Name Directives[Const]? FieldsDefinition?
	   */
	  ;

	  _proto.parseInterfaceTypeDefinition = function parseInterfaceTypeDefinition() {
	    var start = this._lexer.token;
	    var description = this.parseDescription();
	    this.expectKeyword('interface');
	    var name = this.parseName();
	    var interfaces = this.parseImplementsInterfaces();
	    var directives = this.parseDirectives(true);
	    var fields = this.parseFieldsDefinition();
	    return {
	      kind: Kind.INTERFACE_TYPE_DEFINITION,
	      description: description,
	      name: name,
	      interfaces: interfaces,
	      directives: directives,
	      fields: fields,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * UnionTypeDefinition :
	   *   - Description? union Name Directives[Const]? UnionMemberTypes?
	   */
	  ;

	  _proto.parseUnionTypeDefinition = function parseUnionTypeDefinition() {
	    var start = this._lexer.token;
	    var description = this.parseDescription();
	    this.expectKeyword('union');
	    var name = this.parseName();
	    var directives = this.parseDirectives(true);
	    var types = this.parseUnionMemberTypes();
	    return {
	      kind: Kind.UNION_TYPE_DEFINITION,
	      description: description,
	      name: name,
	      directives: directives,
	      types: types,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * UnionMemberTypes :
	   *   - = `|`? NamedType
	   *   - UnionMemberTypes | NamedType
	   */
	  ;

	  _proto.parseUnionMemberTypes = function parseUnionMemberTypes() {
	    return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
	  }
	  /**
	   * EnumTypeDefinition :
	   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
	   */
	  ;

	  _proto.parseEnumTypeDefinition = function parseEnumTypeDefinition() {
	    var start = this._lexer.token;
	    var description = this.parseDescription();
	    this.expectKeyword('enum');
	    var name = this.parseName();
	    var directives = this.parseDirectives(true);
	    var values = this.parseEnumValuesDefinition();
	    return {
	      kind: Kind.ENUM_TYPE_DEFINITION,
	      description: description,
	      name: name,
	      directives: directives,
	      values: values,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * EnumValuesDefinition : { EnumValueDefinition+ }
	   */
	  ;

	  _proto.parseEnumValuesDefinition = function parseEnumValuesDefinition() {
	    return this.optionalMany(TokenKind.BRACE_L, this.parseEnumValueDefinition, TokenKind.BRACE_R);
	  }
	  /**
	   * EnumValueDefinition : Description? EnumValue Directives[Const]?
	   *
	   * EnumValue : Name
	   */
	  ;

	  _proto.parseEnumValueDefinition = function parseEnumValueDefinition() {
	    var start = this._lexer.token;
	    var description = this.parseDescription();
	    var name = this.parseName();
	    var directives = this.parseDirectives(true);
	    return {
	      kind: Kind.ENUM_VALUE_DEFINITION,
	      description: description,
	      name: name,
	      directives: directives,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * InputObjectTypeDefinition :
	   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
	   */
	  ;

	  _proto.parseInputObjectTypeDefinition = function parseInputObjectTypeDefinition() {
	    var start = this._lexer.token;
	    var description = this.parseDescription();
	    this.expectKeyword('input');
	    var name = this.parseName();
	    var directives = this.parseDirectives(true);
	    var fields = this.parseInputFieldsDefinition();
	    return {
	      kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
	      description: description,
	      name: name,
	      directives: directives,
	      fields: fields,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * InputFieldsDefinition : { InputValueDefinition+ }
	   */
	  ;

	  _proto.parseInputFieldsDefinition = function parseInputFieldsDefinition() {
	    return this.optionalMany(TokenKind.BRACE_L, this.parseInputValueDef, TokenKind.BRACE_R);
	  }
	  /**
	   * TypeSystemExtension :
	   *   - SchemaExtension
	   *   - TypeExtension
	   *
	   * TypeExtension :
	   *   - ScalarTypeExtension
	   *   - ObjectTypeExtension
	   *   - InterfaceTypeExtension
	   *   - UnionTypeExtension
	   *   - EnumTypeExtension
	   *   - InputObjectTypeDefinition
	   */
	  ;

	  _proto.parseTypeSystemExtension = function parseTypeSystemExtension() {
	    var keywordToken = this._lexer.lookahead();

	    if (keywordToken.kind === TokenKind.NAME) {
	      switch (keywordToken.value) {
	        case 'schema':
	          return this.parseSchemaExtension();

	        case 'scalar':
	          return this.parseScalarTypeExtension();

	        case 'type':
	          return this.parseObjectTypeExtension();

	        case 'interface':
	          return this.parseInterfaceTypeExtension();

	        case 'union':
	          return this.parseUnionTypeExtension();

	        case 'enum':
	          return this.parseEnumTypeExtension();

	        case 'input':
	          return this.parseInputObjectTypeExtension();
	      }
	    }

	    throw this.unexpected(keywordToken);
	  }
	  /**
	   * SchemaExtension :
	   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
	   *  - extend schema Directives[Const]
	   */
	  ;

	  _proto.parseSchemaExtension = function parseSchemaExtension() {
	    var start = this._lexer.token;
	    this.expectKeyword('extend');
	    this.expectKeyword('schema');
	    var directives = this.parseDirectives(true);
	    var operationTypes = this.optionalMany(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);

	    if (directives.length === 0 && operationTypes.length === 0) {
	      throw this.unexpected();
	    }

	    return {
	      kind: Kind.SCHEMA_EXTENSION,
	      directives: directives,
	      operationTypes: operationTypes,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * ScalarTypeExtension :
	   *   - extend scalar Name Directives[Const]
	   */
	  ;

	  _proto.parseScalarTypeExtension = function parseScalarTypeExtension() {
	    var start = this._lexer.token;
	    this.expectKeyword('extend');
	    this.expectKeyword('scalar');
	    var name = this.parseName();
	    var directives = this.parseDirectives(true);

	    if (directives.length === 0) {
	      throw this.unexpected();
	    }

	    return {
	      kind: Kind.SCALAR_TYPE_EXTENSION,
	      name: name,
	      directives: directives,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * ObjectTypeExtension :
	   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
	   *  - extend type Name ImplementsInterfaces? Directives[Const]
	   *  - extend type Name ImplementsInterfaces
	   */
	  ;

	  _proto.parseObjectTypeExtension = function parseObjectTypeExtension() {
	    var start = this._lexer.token;
	    this.expectKeyword('extend');
	    this.expectKeyword('type');
	    var name = this.parseName();
	    var interfaces = this.parseImplementsInterfaces();
	    var directives = this.parseDirectives(true);
	    var fields = this.parseFieldsDefinition();

	    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
	      throw this.unexpected();
	    }

	    return {
	      kind: Kind.OBJECT_TYPE_EXTENSION,
	      name: name,
	      interfaces: interfaces,
	      directives: directives,
	      fields: fields,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * InterfaceTypeExtension :
	   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
	   *  - extend interface Name ImplementsInterfaces? Directives[Const]
	   *  - extend interface Name ImplementsInterfaces
	   */
	  ;

	  _proto.parseInterfaceTypeExtension = function parseInterfaceTypeExtension() {
	    var start = this._lexer.token;
	    this.expectKeyword('extend');
	    this.expectKeyword('interface');
	    var name = this.parseName();
	    var interfaces = this.parseImplementsInterfaces();
	    var directives = this.parseDirectives(true);
	    var fields = this.parseFieldsDefinition();

	    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
	      throw this.unexpected();
	    }

	    return {
	      kind: Kind.INTERFACE_TYPE_EXTENSION,
	      name: name,
	      interfaces: interfaces,
	      directives: directives,
	      fields: fields,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * UnionTypeExtension :
	   *   - extend union Name Directives[Const]? UnionMemberTypes
	   *   - extend union Name Directives[Const]
	   */
	  ;

	  _proto.parseUnionTypeExtension = function parseUnionTypeExtension() {
	    var start = this._lexer.token;
	    this.expectKeyword('extend');
	    this.expectKeyword('union');
	    var name = this.parseName();
	    var directives = this.parseDirectives(true);
	    var types = this.parseUnionMemberTypes();

	    if (directives.length === 0 && types.length === 0) {
	      throw this.unexpected();
	    }

	    return {
	      kind: Kind.UNION_TYPE_EXTENSION,
	      name: name,
	      directives: directives,
	      types: types,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * EnumTypeExtension :
	   *   - extend enum Name Directives[Const]? EnumValuesDefinition
	   *   - extend enum Name Directives[Const]
	   */
	  ;

	  _proto.parseEnumTypeExtension = function parseEnumTypeExtension() {
	    var start = this._lexer.token;
	    this.expectKeyword('extend');
	    this.expectKeyword('enum');
	    var name = this.parseName();
	    var directives = this.parseDirectives(true);
	    var values = this.parseEnumValuesDefinition();

	    if (directives.length === 0 && values.length === 0) {
	      throw this.unexpected();
	    }

	    return {
	      kind: Kind.ENUM_TYPE_EXTENSION,
	      name: name,
	      directives: directives,
	      values: values,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * InputObjectTypeExtension :
	   *   - extend input Name Directives[Const]? InputFieldsDefinition
	   *   - extend input Name Directives[Const]
	   */
	  ;

	  _proto.parseInputObjectTypeExtension = function parseInputObjectTypeExtension() {
	    var start = this._lexer.token;
	    this.expectKeyword('extend');
	    this.expectKeyword('input');
	    var name = this.parseName();
	    var directives = this.parseDirectives(true);
	    var fields = this.parseInputFieldsDefinition();

	    if (directives.length === 0 && fields.length === 0) {
	      throw this.unexpected();
	    }

	    return {
	      kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
	      name: name,
	      directives: directives,
	      fields: fields,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * DirectiveDefinition :
	   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
	   */
	  ;

	  _proto.parseDirectiveDefinition = function parseDirectiveDefinition() {
	    var start = this._lexer.token;
	    var description = this.parseDescription();
	    this.expectKeyword('directive');
	    this.expectToken(TokenKind.AT);
	    var name = this.parseName();
	    var args = this.parseArgumentDefs();
	    var repeatable = this.expectOptionalKeyword('repeatable');
	    this.expectKeyword('on');
	    var locations = this.parseDirectiveLocations();
	    return {
	      kind: Kind.DIRECTIVE_DEFINITION,
	      description: description,
	      name: name,
	      arguments: args,
	      repeatable: repeatable,
	      locations: locations,
	      loc: this.loc(start)
	    };
	  }
	  /**
	   * DirectiveLocations :
	   *   - `|`? DirectiveLocation
	   *   - DirectiveLocations | DirectiveLocation
	   */
	  ;

	  _proto.parseDirectiveLocations = function parseDirectiveLocations() {
	    return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
	  }
	  /*
	   * DirectiveLocation :
	   *   - ExecutableDirectiveLocation
	   *   - TypeSystemDirectiveLocation
	   *
	   * ExecutableDirectiveLocation : one of
	   *   `QUERY`
	   *   `MUTATION`
	   *   `SUBSCRIPTION`
	   *   `FIELD`
	   *   `FRAGMENT_DEFINITION`
	   *   `FRAGMENT_SPREAD`
	   *   `INLINE_FRAGMENT`
	   *
	   * TypeSystemDirectiveLocation : one of
	   *   `SCHEMA`
	   *   `SCALAR`
	   *   `OBJECT`
	   *   `FIELD_DEFINITION`
	   *   `ARGUMENT_DEFINITION`
	   *   `INTERFACE`
	   *   `UNION`
	   *   `ENUM`
	   *   `ENUM_VALUE`
	   *   `INPUT_OBJECT`
	   *   `INPUT_FIELD_DEFINITION`
	   */
	  ;

	  _proto.parseDirectiveLocation = function parseDirectiveLocation() {
	    var start = this._lexer.token;
	    var name = this.parseName();

	    if (DirectiveLocation[name.value] !== undefined) {
	      return name;
	    }

	    throw this.unexpected(start);
	  } // Core parsing utility functions

	  /**
	   * Returns a location object, used to identify the place in the source that created a given parsed object.
	   */
	  ;

	  _proto.loc = function loc(startToken) {
	    var _this$_options4;

	    if (((_this$_options4 = this._options) === null || _this$_options4 === void 0 ? void 0 : _this$_options4.noLocation) !== true) {
	      return new Location(startToken, this._lexer.lastToken, this._lexer.source);
	    }
	  }
	  /**
	   * Determines if the next token is of a given kind
	   */
	  ;

	  _proto.peek = function peek(kind) {
	    return this._lexer.token.kind === kind;
	  }
	  /**
	   * If the next token is of the given kind, return that token after advancing the lexer.
	   * Otherwise, do not change the parser state and throw an error.
	   */
	  ;

	  _proto.expectToken = function expectToken(kind) {
	    var token = this._lexer.token;

	    if (token.kind === kind) {
	      this._lexer.advance();

	      return token;
	    }

	    throw syntaxError(this._lexer.source, token.start, "Expected ".concat(getTokenKindDesc(kind), ", found ").concat(getTokenDesc(token), "."));
	  }
	  /**
	   * If the next token is of the given kind, return that token after advancing the lexer.
	   * Otherwise, do not change the parser state and return undefined.
	   */
	  ;

	  _proto.expectOptionalToken = function expectOptionalToken(kind) {
	    var token = this._lexer.token;

	    if (token.kind === kind) {
	      this._lexer.advance();

	      return token;
	    }

	    return undefined;
	  }
	  /**
	   * If the next token is a given keyword, advance the lexer.
	   * Otherwise, do not change the parser state and throw an error.
	   */
	  ;

	  _proto.expectKeyword = function expectKeyword(value) {
	    var token = this._lexer.token;

	    if (token.kind === TokenKind.NAME && token.value === value) {
	      this._lexer.advance();
	    } else {
	      throw syntaxError(this._lexer.source, token.start, "Expected \"".concat(value, "\", found ").concat(getTokenDesc(token), "."));
	    }
	  }
	  /**
	   * If the next token is a given keyword, return "true" after advancing the lexer.
	   * Otherwise, do not change the parser state and return "false".
	   */
	  ;

	  _proto.expectOptionalKeyword = function expectOptionalKeyword(value) {
	    var token = this._lexer.token;

	    if (token.kind === TokenKind.NAME && token.value === value) {
	      this._lexer.advance();

	      return true;
	    }

	    return false;
	  }
	  /**
	   * Helper function for creating an error when an unexpected lexed token is encountered.
	   */
	  ;

	  _proto.unexpected = function unexpected(atToken) {
	    var token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
	    return syntaxError(this._lexer.source, token.start, "Unexpected ".concat(getTokenDesc(token), "."));
	  }
	  /**
	   * Returns a possibly empty list of parse nodes, determined by the parseFn.
	   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
	   * Advances the parser to the next lex token after the closing token.
	   */
	  ;

	  _proto.any = function any(openKind, parseFn, closeKind) {
	    this.expectToken(openKind);
	    var nodes = [];

	    while (!this.expectOptionalToken(closeKind)) {
	      nodes.push(parseFn.call(this));
	    }

	    return nodes;
	  }
	  /**
	   * Returns a list of parse nodes, determined by the parseFn.
	   * It can be empty only if open token is missing otherwise it will always return non-empty list
	   * that begins with a lex token of openKind and ends with a lex token of closeKind.
	   * Advances the parser to the next lex token after the closing token.
	   */
	  ;

	  _proto.optionalMany = function optionalMany(openKind, parseFn, closeKind) {
	    if (this.expectOptionalToken(openKind)) {
	      var nodes = [];

	      do {
	        nodes.push(parseFn.call(this));
	      } while (!this.expectOptionalToken(closeKind));

	      return nodes;
	    }

	    return [];
	  }
	  /**
	   * Returns a non-empty list of parse nodes, determined by the parseFn.
	   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
	   * Advances the parser to the next lex token after the closing token.
	   */
	  ;

	  _proto.many = function many(openKind, parseFn, closeKind) {
	    this.expectToken(openKind);
	    var nodes = [];

	    do {
	      nodes.push(parseFn.call(this));
	    } while (!this.expectOptionalToken(closeKind));

	    return nodes;
	  }
	  /**
	   * Returns a non-empty list of parse nodes, determined by the parseFn.
	   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
	   * Advances the parser to the next lex token after last item in the list.
	   */
	  ;

	  _proto.delimitedMany = function delimitedMany(delimiterKind, parseFn) {
	    this.expectOptionalToken(delimiterKind);
	    var nodes = [];

	    do {
	      nodes.push(parseFn.call(this));
	    } while (this.expectOptionalToken(delimiterKind));

	    return nodes;
	  };

	  return Parser;
	}();
	/**
	 * A helper function to describe a token as a string for debugging.
	 */

	function getTokenDesc(token) {
	  var value = token.value;
	  return getTokenKindDesc(token.kind) + (value != null ? " \"".concat(value, "\"") : '');
	}
	/**
	 * A helper function to describe a token kind as a string for debugging.
	 */


	function getTokenKindDesc(kind) {
	  return isPunctuatorTokenKind(kind) ? "\"".concat(kind, "\"") : kind;
	}

	/**
	 * A visitor is provided to visit, it contains the collection of
	 * relevant functions to be called during the visitor's traversal.
	 */

	var QueryDocumentKeys = {
	  Name: [],
	  Document: ['definitions'],
	  OperationDefinition: ['name', 'variableDefinitions', 'directives', 'selectionSet'],
	  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
	  Variable: ['name'],
	  SelectionSet: ['selections'],
	  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
	  Argument: ['name', 'value'],
	  FragmentSpread: ['name', 'directives'],
	  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
	  FragmentDefinition: ['name', // Note: fragment variable definitions are experimental and may be changed
	  // or removed in the future.
	  'variableDefinitions', 'typeCondition', 'directives', 'selectionSet'],
	  IntValue: [],
	  FloatValue: [],
	  StringValue: [],
	  BooleanValue: [],
	  NullValue: [],
	  EnumValue: [],
	  ListValue: ['values'],
	  ObjectValue: ['fields'],
	  ObjectField: ['name', 'value'],
	  Directive: ['name', 'arguments'],
	  NamedType: ['name'],
	  ListType: ['type'],
	  NonNullType: ['type'],
	  SchemaDefinition: ['description', 'directives', 'operationTypes'],
	  OperationTypeDefinition: ['type'],
	  ScalarTypeDefinition: ['description', 'name', 'directives'],
	  ObjectTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
	  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
	  InputValueDefinition: ['description', 'name', 'type', 'defaultValue', 'directives'],
	  InterfaceTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
	  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
	  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
	  EnumValueDefinition: ['description', 'name', 'directives'],
	  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
	  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
	  SchemaExtension: ['directives', 'operationTypes'],
	  ScalarTypeExtension: ['name', 'directives'],
	  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
	  InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
	  UnionTypeExtension: ['name', 'directives', 'types'],
	  EnumTypeExtension: ['name', 'directives', 'values'],
	  InputObjectTypeExtension: ['name', 'directives', 'fields']
	};
	var BREAK = Object.freeze({});
	/**
	 * visit() will walk through an AST using a depth-first traversal, calling
	 * the visitor's enter function at each node in the traversal, and calling the
	 * leave function after visiting that node and all of its child nodes.
	 *
	 * By returning different values from the enter and leave functions, the
	 * behavior of the visitor can be altered, including skipping over a sub-tree of
	 * the AST (by returning false), editing the AST by returning a value or null
	 * to remove the value, or to stop the whole traversal by returning BREAK.
	 *
	 * When using visit() to edit an AST, the original AST will not be modified, and
	 * a new version of the AST with the changes applied will be returned from the
	 * visit function.
	 *
	 *     const editedAST = visit(ast, {
	 *       enter(node, key, parent, path, ancestors) {
	 *         // @return
	 *         //   undefined: no action
	 *         //   false: skip visiting this node
	 *         //   visitor.BREAK: stop visiting altogether
	 *         //   null: delete this node
	 *         //   any value: replace this node with the returned value
	 *       },
	 *       leave(node, key, parent, path, ancestors) {
	 *         // @return
	 *         //   undefined: no action
	 *         //   false: no action
	 *         //   visitor.BREAK: stop visiting altogether
	 *         //   null: delete this node
	 *         //   any value: replace this node with the returned value
	 *       }
	 *     });
	 *
	 * Alternatively to providing enter() and leave() functions, a visitor can
	 * instead provide functions named the same as the kinds of AST nodes, or
	 * enter/leave visitors at a named key, leading to four permutations of the
	 * visitor API:
	 *
	 * 1) Named visitors triggered when entering a node of a specific kind.
	 *
	 *     visit(ast, {
	 *       Kind(node) {
	 *         // enter the "Kind" node
	 *       }
	 *     })
	 *
	 * 2) Named visitors that trigger upon entering and leaving a node of
	 *    a specific kind.
	 *
	 *     visit(ast, {
	 *       Kind: {
	 *         enter(node) {
	 *           // enter the "Kind" node
	 *         }
	 *         leave(node) {
	 *           // leave the "Kind" node
	 *         }
	 *       }
	 *     })
	 *
	 * 3) Generic visitors that trigger upon entering and leaving any node.
	 *
	 *     visit(ast, {
	 *       enter(node) {
	 *         // enter any node
	 *       },
	 *       leave(node) {
	 *         // leave any node
	 *       }
	 *     })
	 *
	 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
	 *
	 *     visit(ast, {
	 *       enter: {
	 *         Kind(node) {
	 *           // enter the "Kind" node
	 *         }
	 *       },
	 *       leave: {
	 *         Kind(node) {
	 *           // leave the "Kind" node
	 *         }
	 *       }
	 *     })
	 */

	function visit(root, visitor) {
	  var visitorKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : QueryDocumentKeys;

	  /* eslint-disable no-undef-init */
	  var stack = undefined;
	  var inArray = Array.isArray(root);
	  var keys = [root];
	  var index = -1;
	  var edits = [];
	  var node = undefined;
	  var key = undefined;
	  var parent = undefined;
	  var path = [];
	  var ancestors = [];
	  var newRoot = root;
	  /* eslint-enable no-undef-init */

	  do {
	    index++;
	    var isLeaving = index === keys.length;
	    var isEdited = isLeaving && edits.length !== 0;

	    if (isLeaving) {
	      key = ancestors.length === 0 ? undefined : path[path.length - 1];
	      node = parent;
	      parent = ancestors.pop();

	      if (isEdited) {
	        if (inArray) {
	          node = node.slice();
	        } else {
	          var clone = {};

	          for (var _i2 = 0, _Object$keys2 = Object.keys(node); _i2 < _Object$keys2.length; _i2++) {
	            var k = _Object$keys2[_i2];
	            clone[k] = node[k];
	          }

	          node = clone;
	        }

	        var editOffset = 0;

	        for (var ii = 0; ii < edits.length; ii++) {
	          var editKey = edits[ii][0];
	          var editValue = edits[ii][1];

	          if (inArray) {
	            editKey -= editOffset;
	          }

	          if (inArray && editValue === null) {
	            node.splice(editKey, 1);
	            editOffset++;
	          } else {
	            node[editKey] = editValue;
	          }
	        }
	      }

	      index = stack.index;
	      keys = stack.keys;
	      edits = stack.edits;
	      inArray = stack.inArray;
	      stack = stack.prev;
	    } else {
	      key = parent ? inArray ? index : keys[index] : undefined;
	      node = parent ? parent[key] : newRoot;

	      if (node === null || node === undefined) {
	        continue;
	      }

	      if (parent) {
	        path.push(key);
	      }
	    }

	    var result = void 0;

	    if (!Array.isArray(node)) {
	      if (!isNode(node)) {
	        throw new Error("Invalid AST Node: ".concat(inspect(node), "."));
	      }

	      var visitFn = getVisitFn(visitor, node.kind, isLeaving);

	      if (visitFn) {
	        result = visitFn.call(visitor, node, key, parent, path, ancestors);

	        if (result === BREAK) {
	          break;
	        }

	        if (result === false) {
	          if (!isLeaving) {
	            path.pop();
	            continue;
	          }
	        } else if (result !== undefined) {
	          edits.push([key, result]);

	          if (!isLeaving) {
	            if (isNode(result)) {
	              node = result;
	            } else {
	              path.pop();
	              continue;
	            }
	          }
	        }
	      }
	    }

	    if (result === undefined && isEdited) {
	      edits.push([key, node]);
	    }

	    if (isLeaving) {
	      path.pop();
	    } else {
	      var _visitorKeys$node$kin;

	      stack = {
	        inArray: inArray,
	        index: index,
	        keys: keys,
	        edits: edits,
	        prev: stack
	      };
	      inArray = Array.isArray(node);
	      keys = inArray ? node : (_visitorKeys$node$kin = visitorKeys[node.kind]) !== null && _visitorKeys$node$kin !== void 0 ? _visitorKeys$node$kin : [];
	      index = -1;
	      edits = [];

	      if (parent) {
	        ancestors.push(parent);
	      }

	      parent = node;
	    }
	  } while (stack !== undefined);

	  if (edits.length !== 0) {
	    newRoot = edits[edits.length - 1][1];
	  }

	  return newRoot;
	}
	/**
	 * Creates a new visitor instance which delegates to many visitors to run in
	 * parallel. Each visitor will be visited for each node before moving on.
	 *
	 * If a prior visitor edits a node, no following visitors will see that node.
	 */

	function visitInParallel(visitors) {
	  var skipping = new Array(visitors.length);
	  return {
	    enter: function enter(node) {
	      for (var i = 0; i < visitors.length; i++) {
	        if (skipping[i] == null) {
	          var fn = getVisitFn(visitors[i], node.kind,
	          /* isLeaving */
	          false);

	          if (fn) {
	            var result = fn.apply(visitors[i], arguments);

	            if (result === false) {
	              skipping[i] = node;
	            } else if (result === BREAK) {
	              skipping[i] = BREAK;
	            } else if (result !== undefined) {
	              return result;
	            }
	          }
	        }
	      }
	    },
	    leave: function leave(node) {
	      for (var i = 0; i < visitors.length; i++) {
	        if (skipping[i] == null) {
	          var fn = getVisitFn(visitors[i], node.kind,
	          /* isLeaving */
	          true);

	          if (fn) {
	            var result = fn.apply(visitors[i], arguments);

	            if (result === BREAK) {
	              skipping[i] = BREAK;
	            } else if (result !== undefined && result !== false) {
	              return result;
	            }
	          }
	        } else if (skipping[i] === node) {
	          skipping[i] = null;
	        }
	      }
	    }
	  };
	}
	/**
	 * Given a visitor instance, if it is leaving or not, and a node kind, return
	 * the function the visitor runtime should call.
	 */

	function getVisitFn(visitor, kind, isLeaving) {
	  var kindVisitor = visitor[kind];

	  if (kindVisitor) {
	    if (!isLeaving && typeof kindVisitor === 'function') {
	      // { Kind() {} }
	      return kindVisitor;
	    }

	    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;

	    if (typeof kindSpecificVisitor === 'function') {
	      // { Kind: { enter() {}, leave() {} } }
	      return kindSpecificVisitor;
	    }
	  } else {
	    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;

	    if (specificVisitor) {
	      if (typeof specificVisitor === 'function') {
	        // { enter() {}, leave() {} }
	        return specificVisitor;
	      }

	      var specificKindVisitor = specificVisitor[kind];

	      if (typeof specificKindVisitor === 'function') {
	        // { enter: { Kind() {} }, leave: { Kind() {} } }
	        return specificKindVisitor;
	      }
	    }
	  }
	}

	/* eslint-disable no-redeclare */
	// $FlowFixMe[name-already-bound]
	var find = Array.prototype.find ? function (list, predicate) {
	  return Array.prototype.find.call(list, predicate);
	} : function (list, predicate) {
	  for (var _i2 = 0; _i2 < list.length; _i2++) {
	    var value = list[_i2];

	    if (predicate(value)) {
	      return value;
	    }
	  }
	};

	/* eslint-disable no-redeclare */
	// $FlowFixMe[name-already-bound] workaround for: https://github.com/facebook/flow/issues/4441
	var objectValues = Object.values || function (obj) {
	  return Object.keys(obj).map(function (key) {
	    return obj[key];
	  });
	};

	/* eslint-disable no-redeclare */
	// $FlowFixMe[name-already-bound] workaround for: https://github.com/facebook/flow/issues/4441
	var objectEntries = Object.entries || function (obj) {
	  return Object.keys(obj).map(function (key) {
	    return [key, obj[key]];
	  });
	};

	/**
	 * Creates a keyed JS object from an array, given a function to produce the keys
	 * for each value in the array.
	 *
	 * This provides a convenient lookup for the array items if the key function
	 * produces unique results.
	 *
	 *     const phoneBook = [
	 *       { name: 'Jon', num: '555-1234' },
	 *       { name: 'Jenny', num: '867-5309' }
	 *     ]
	 *
	 *     // { Jon: { name: 'Jon', num: '555-1234' },
	 *     //   Jenny: { name: 'Jenny', num: '867-5309' } }
	 *     const entriesByName = keyMap(
	 *       phoneBook,
	 *       entry => entry.name
	 *     )
	 *
	 *     // { name: 'Jenny', num: '857-6309' }
	 *     const jennyEntry = entriesByName['Jenny']
	 *
	 */
	function keyMap(list, keyFn) {
	  return list.reduce(function (map, item) {
	    map[keyFn(item)] = item;
	    return map;
	  }, Object.create(null));
	}

	/**
	 * Creates an object map with the same keys as `map` and values generated by
	 * running each value of `map` thru `fn`.
	 */
	function mapValue(map, fn) {
	  var result = Object.create(null);

	  for (var _i2 = 0, _objectEntries2 = objectEntries(map); _i2 < _objectEntries2.length; _i2++) {
	    var _ref2 = _objectEntries2[_i2];
	    var _key = _ref2[0];
	    var _value = _ref2[1];
	    result[_key] = fn(_value, _key);
	  }

	  return result;
	}

	function toObjMap(obj) {
	  /* eslint-enable no-redeclare */
	  if (Object.getPrototypeOf(obj) === null) {
	    return obj;
	  }

	  var map = Object.create(null);

	  for (var _i2 = 0, _objectEntries2 = objectEntries(obj); _i2 < _objectEntries2.length; _i2++) {
	    var _ref2 = _objectEntries2[_i2];
	    var key = _ref2[0];
	    var value = _ref2[1];
	    map[key] = value;
	  }

	  return map;
	}

	/**
	 * Creates a keyed JS object from an array, given a function to produce the keys
	 * and a function to produce the values from each item in the array.
	 *
	 *     const phoneBook = [
	 *       { name: 'Jon', num: '555-1234' },
	 *       { name: 'Jenny', num: '867-5309' }
	 *     ]
	 *
	 *     // { Jon: '555-1234', Jenny: '867-5309' }
	 *     const phonesByName = keyValMap(
	 *       phoneBook,
	 *       entry => entry.name,
	 *       entry => entry.num
	 *     )
	 *
	 */
	function keyValMap(list, keyFn, valFn) {
	  return list.reduce(function (map, item) {
	    map[keyFn(item)] = valFn(item);
	    return map;
	  }, Object.create(null));
	}

	var MAX_SUGGESTIONS = 5;
	/**
	 * Given [ A, B, C ] return ' Did you mean A, B, or C?'.
	 */

	// eslint-disable-next-line no-redeclare
	function didYouMean(firstArg, secondArg) {
	  var _ref = typeof firstArg === 'string' ? [firstArg, secondArg] : [undefined, firstArg],
	      subMessage = _ref[0],
	      suggestionsArg = _ref[1];

	  var message = ' Did you mean ';

	  if (subMessage) {
	    message += subMessage + ' ';
	  }

	  var suggestions = suggestionsArg.map(function (x) {
	    return "\"".concat(x, "\"");
	  });

	  switch (suggestions.length) {
	    case 0:
	      return '';

	    case 1:
	      return message + suggestions[0] + '?';

	    case 2:
	      return message + suggestions[0] + ' or ' + suggestions[1] + '?';
	  }

	  var selected = suggestions.slice(0, MAX_SUGGESTIONS);
	  var lastItem = selected.pop();
	  return message + selected.join(', ') + ', or ' + lastItem + '?';
	}

	/**
	 * Returns the first argument it receives.
	 */
	function identityFunc(x) {
	  return x;
	}

	/**
	 * Given an invalid input string and a list of valid options, returns a filtered
	 * list of valid options sorted based on their similarity with the input.
	 */
	function suggestionList(input, options) {
	  var optionsByDistance = Object.create(null);
	  var lexicalDistance = new LexicalDistance(input);
	  var threshold = Math.floor(input.length * 0.4) + 1;

	  for (var _i2 = 0; _i2 < options.length; _i2++) {
	    var option = options[_i2];
	    var distance = lexicalDistance.measure(option, threshold);

	    if (distance !== undefined) {
	      optionsByDistance[option] = distance;
	    }
	  }

	  return Object.keys(optionsByDistance).sort(function (a, b) {
	    var distanceDiff = optionsByDistance[a] - optionsByDistance[b];
	    return distanceDiff !== 0 ? distanceDiff : a.localeCompare(b);
	  });
	}
	/**
	 * Computes the lexical distance between strings A and B.
	 *
	 * The "distance" between two strings is given by counting the minimum number
	 * of edits needed to transform string A into string B. An edit can be an
	 * insertion, deletion, or substitution of a single character, or a swap of two
	 * adjacent characters.
	 *
	 * Includes a custom alteration from Damerau-Levenshtein to treat case changes
	 * as a single edit which helps identify mis-cased values with an edit distance
	 * of 1.
	 *
	 * This distance can be useful for detecting typos in input or sorting
	 */

	var LexicalDistance = /*#__PURE__*/function () {
	  function LexicalDistance(input) {
	    this._input = input;
	    this._inputLowerCase = input.toLowerCase();
	    this._inputArray = stringToArray(this._inputLowerCase);
	    this._rows = [new Array(input.length + 1).fill(0), new Array(input.length + 1).fill(0), new Array(input.length + 1).fill(0)];
	  }

	  var _proto = LexicalDistance.prototype;

	  _proto.measure = function measure(option, threshold) {
	    if (this._input === option) {
	      return 0;
	    }

	    var optionLowerCase = option.toLowerCase(); // Any case change counts as a single edit

	    if (this._inputLowerCase === optionLowerCase) {
	      return 1;
	    }

	    var a = stringToArray(optionLowerCase);
	    var b = this._inputArray;

	    if (a.length < b.length) {
	      var tmp = a;
	      a = b;
	      b = tmp;
	    }

	    var aLength = a.length;
	    var bLength = b.length;

	    if (aLength - bLength > threshold) {
	      return undefined;
	    }

	    var rows = this._rows;

	    for (var j = 0; j <= bLength; j++) {
	      rows[0][j] = j;
	    }

	    for (var i = 1; i <= aLength; i++) {
	      var upRow = rows[(i - 1) % 3];
	      var currentRow = rows[i % 3];
	      var smallestCell = currentRow[0] = i;

	      for (var _j = 1; _j <= bLength; _j++) {
	        var cost = a[i - 1] === b[_j - 1] ? 0 : 1;
	        var currentCell = Math.min(upRow[_j] + 1, // delete
	        currentRow[_j - 1] + 1, // insert
	        upRow[_j - 1] + cost // substitute
	        );

	        if (i > 1 && _j > 1 && a[i - 1] === b[_j - 2] && a[i - 2] === b[_j - 1]) {
	          // transposition
	          var doubleDiagonalCell = rows[(i - 2) % 3][_j - 2];
	          currentCell = Math.min(currentCell, doubleDiagonalCell + 1);
	        }

	        if (currentCell < smallestCell) {
	          smallestCell = currentCell;
	        }

	        currentRow[_j] = currentCell;
	      } // Early exit, since distance can't go smaller than smallest element of the previous row.


	      if (smallestCell > threshold) {
	        return undefined;
	      }
	    }

	    var distance = rows[aLength % 3][bLength];
	    return distance <= threshold ? distance : undefined;
	  };

	  return LexicalDistance;
	}();

	function stringToArray(str) {
	  var strLength = str.length;
	  var array = new Array(strLength);

	  for (var i = 0; i < strLength; ++i) {
	    array[i] = str.charCodeAt(i);
	  }

	  return array;
	}

	/**
	 * Converts an AST into a string, using one set of reasonable
	 * formatting rules.
	 */

	function print(ast) {
	  return visit(ast, {
	    leave: printDocASTReducer
	  });
	}
	var MAX_LINE_LENGTH = 80; // TODO: provide better type coverage in future

	var printDocASTReducer = {
	  Name: function Name(node) {
	    return node.value;
	  },
	  Variable: function Variable(node) {
	    return '$' + node.name;
	  },
	  // Document
	  Document: function Document(node) {
	    return join(node.definitions, '\n\n') + '\n';
	  },
	  OperationDefinition: function OperationDefinition(node) {
	    var op = node.operation;
	    var name = node.name;
	    var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
	    var directives = join(node.directives, ' ');
	    var selectionSet = node.selectionSet; // Anonymous queries with no directives or variable definitions can use
	    // the query short form.

	    return !name && !directives && !varDefs && op === 'query' ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], ' ');
	  },
	  VariableDefinition: function VariableDefinition(_ref) {
	    var variable = _ref.variable,
	        type = _ref.type,
	        defaultValue = _ref.defaultValue,
	        directives = _ref.directives;
	    return variable + ': ' + type + wrap(' = ', defaultValue) + wrap(' ', join(directives, ' '));
	  },
	  SelectionSet: function SelectionSet(_ref2) {
	    var selections = _ref2.selections;
	    return block(selections);
	  },
	  Field: function Field(_ref3) {
	    var alias = _ref3.alias,
	        name = _ref3.name,
	        args = _ref3.arguments,
	        directives = _ref3.directives,
	        selectionSet = _ref3.selectionSet;
	    var prefix = wrap('', alias, ': ') + name;
	    var argsLine = prefix + wrap('(', join(args, ', '), ')');

	    if (argsLine.length > MAX_LINE_LENGTH) {
	      argsLine = prefix + wrap('(\n', indent(join(args, '\n')), '\n)');
	    }

	    return join([argsLine, join(directives, ' '), selectionSet], ' ');
	  },
	  Argument: function Argument(_ref4) {
	    var name = _ref4.name,
	        value = _ref4.value;
	    return name + ': ' + value;
	  },
	  // Fragments
	  FragmentSpread: function FragmentSpread(_ref5) {
	    var name = _ref5.name,
	        directives = _ref5.directives;
	    return '...' + name + wrap(' ', join(directives, ' '));
	  },
	  InlineFragment: function InlineFragment(_ref6) {
	    var typeCondition = _ref6.typeCondition,
	        directives = _ref6.directives,
	        selectionSet = _ref6.selectionSet;
	    return join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' ');
	  },
	  FragmentDefinition: function FragmentDefinition(_ref7) {
	    var name = _ref7.name,
	        typeCondition = _ref7.typeCondition,
	        variableDefinitions = _ref7.variableDefinitions,
	        directives = _ref7.directives,
	        selectionSet = _ref7.selectionSet;
	    return (// Note: fragment variable definitions are experimental and may be changed
	      // or removed in the future.
	      "fragment ".concat(name).concat(wrap('(', join(variableDefinitions, ', '), ')'), " ") + "on ".concat(typeCondition, " ").concat(wrap('', join(directives, ' '), ' ')) + selectionSet
	    );
	  },
	  // Value
	  IntValue: function IntValue(_ref8) {
	    var value = _ref8.value;
	    return value;
	  },
	  FloatValue: function FloatValue(_ref9) {
	    var value = _ref9.value;
	    return value;
	  },
	  StringValue: function StringValue(_ref10, key) {
	    var value = _ref10.value,
	        isBlockString = _ref10.block;
	    return isBlockString ? printBlockString(value, key === 'description' ? '' : '  ') : JSON.stringify(value);
	  },
	  BooleanValue: function BooleanValue(_ref11) {
	    var value = _ref11.value;
	    return value ? 'true' : 'false';
	  },
	  NullValue: function NullValue() {
	    return 'null';
	  },
	  EnumValue: function EnumValue(_ref12) {
	    var value = _ref12.value;
	    return value;
	  },
	  ListValue: function ListValue(_ref13) {
	    var values = _ref13.values;
	    return '[' + join(values, ', ') + ']';
	  },
	  ObjectValue: function ObjectValue(_ref14) {
	    var fields = _ref14.fields;
	    return '{' + join(fields, ', ') + '}';
	  },
	  ObjectField: function ObjectField(_ref15) {
	    var name = _ref15.name,
	        value = _ref15.value;
	    return name + ': ' + value;
	  },
	  // Directive
	  Directive: function Directive(_ref16) {
	    var name = _ref16.name,
	        args = _ref16.arguments;
	    return '@' + name + wrap('(', join(args, ', '), ')');
	  },
	  // Type
	  NamedType: function NamedType(_ref17) {
	    var name = _ref17.name;
	    return name;
	  },
	  ListType: function ListType(_ref18) {
	    var type = _ref18.type;
	    return '[' + type + ']';
	  },
	  NonNullType: function NonNullType(_ref19) {
	    var type = _ref19.type;
	    return type + '!';
	  },
	  // Type System Definitions
	  SchemaDefinition: addDescription(function (_ref20) {
	    var directives = _ref20.directives,
	        operationTypes = _ref20.operationTypes;
	    return join(['schema', join(directives, ' '), block(operationTypes)], ' ');
	  }),
	  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
	    var operation = _ref21.operation,
	        type = _ref21.type;
	    return operation + ': ' + type;
	  },
	  ScalarTypeDefinition: addDescription(function (_ref22) {
	    var name = _ref22.name,
	        directives = _ref22.directives;
	    return join(['scalar', name, join(directives, ' ')], ' ');
	  }),
	  ObjectTypeDefinition: addDescription(function (_ref23) {
	    var name = _ref23.name,
	        interfaces = _ref23.interfaces,
	        directives = _ref23.directives,
	        fields = _ref23.fields;
	    return join(['type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
	  }),
	  FieldDefinition: addDescription(function (_ref24) {
	    var name = _ref24.name,
	        args = _ref24.arguments,
	        type = _ref24.type,
	        directives = _ref24.directives;
	    return name + (hasMultilineItems(args) ? wrap('(\n', indent(join(args, '\n')), '\n)') : wrap('(', join(args, ', '), ')')) + ': ' + type + wrap(' ', join(directives, ' '));
	  }),
	  InputValueDefinition: addDescription(function (_ref25) {
	    var name = _ref25.name,
	        type = _ref25.type,
	        defaultValue = _ref25.defaultValue,
	        directives = _ref25.directives;
	    return join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' ');
	  }),
	  InterfaceTypeDefinition: addDescription(function (_ref26) {
	    var name = _ref26.name,
	        interfaces = _ref26.interfaces,
	        directives = _ref26.directives,
	        fields = _ref26.fields;
	    return join(['interface', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
	  }),
	  UnionTypeDefinition: addDescription(function (_ref27) {
	    var name = _ref27.name,
	        directives = _ref27.directives,
	        types = _ref27.types;
	    return join(['union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
	  }),
	  EnumTypeDefinition: addDescription(function (_ref28) {
	    var name = _ref28.name,
	        directives = _ref28.directives,
	        values = _ref28.values;
	    return join(['enum', name, join(directives, ' '), block(values)], ' ');
	  }),
	  EnumValueDefinition: addDescription(function (_ref29) {
	    var name = _ref29.name,
	        directives = _ref29.directives;
	    return join([name, join(directives, ' ')], ' ');
	  }),
	  InputObjectTypeDefinition: addDescription(function (_ref30) {
	    var name = _ref30.name,
	        directives = _ref30.directives,
	        fields = _ref30.fields;
	    return join(['input', name, join(directives, ' '), block(fields)], ' ');
	  }),
	  DirectiveDefinition: addDescription(function (_ref31) {
	    var name = _ref31.name,
	        args = _ref31.arguments,
	        repeatable = _ref31.repeatable,
	        locations = _ref31.locations;
	    return 'directive @' + name + (hasMultilineItems(args) ? wrap('(\n', indent(join(args, '\n')), '\n)') : wrap('(', join(args, ', '), ')')) + (repeatable ? ' repeatable' : '') + ' on ' + join(locations, ' | ');
	  }),
	  SchemaExtension: function SchemaExtension(_ref32) {
	    var directives = _ref32.directives,
	        operationTypes = _ref32.operationTypes;
	    return join(['extend schema', join(directives, ' '), block(operationTypes)], ' ');
	  },
	  ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
	    var name = _ref33.name,
	        directives = _ref33.directives;
	    return join(['extend scalar', name, join(directives, ' ')], ' ');
	  },
	  ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
	    var name = _ref34.name,
	        interfaces = _ref34.interfaces,
	        directives = _ref34.directives,
	        fields = _ref34.fields;
	    return join(['extend type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
	  },
	  InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
	    var name = _ref35.name,
	        interfaces = _ref35.interfaces,
	        directives = _ref35.directives,
	        fields = _ref35.fields;
	    return join(['extend interface', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
	  },
	  UnionTypeExtension: function UnionTypeExtension(_ref36) {
	    var name = _ref36.name,
	        directives = _ref36.directives,
	        types = _ref36.types;
	    return join(['extend union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
	  },
	  EnumTypeExtension: function EnumTypeExtension(_ref37) {
	    var name = _ref37.name,
	        directives = _ref37.directives,
	        values = _ref37.values;
	    return join(['extend enum', name, join(directives, ' '), block(values)], ' ');
	  },
	  InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
	    var name = _ref38.name,
	        directives = _ref38.directives,
	        fields = _ref38.fields;
	    return join(['extend input', name, join(directives, ' '), block(fields)], ' ');
	  }
	};

	function addDescription(cb) {
	  return function (node) {
	    return join([node.description, cb(node)], '\n');
	  };
	}
	/**
	 * Given maybeArray, print an empty string if it is null or empty, otherwise
	 * print all items together separated by separator if provided
	 */


	function join(maybeArray) {
	  var _maybeArray$filter$jo;

	  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter(function (x) {
	    return x;
	  }).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : '';
	}
	/**
	 * Given array, print each item on its own line, wrapped in an
	 * indented "{ }" block.
	 */


	function block(array) {
	  return wrap('{\n', indent(join(array, '\n')), '\n}');
	}
	/**
	 * If maybeString is not null or empty, then wrap with start and end, otherwise print an empty string.
	 */


	function wrap(start, maybeString) {
	  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	  return maybeString != null && maybeString !== '' ? start + maybeString + end : '';
	}

	function indent(str) {
	  return wrap('  ', str.replace(/\n/g, '\n  '));
	}

	function isMultiline(str) {
	  return str.indexOf('\n') !== -1;
	}

	function hasMultilineItems(maybeArray) {
	  return maybeArray != null && maybeArray.some(isMultiline);
	}

	/**
	 * Produces a JavaScript value given a GraphQL Value AST.
	 *
	 * Unlike `valueFromAST()`, no type is provided. The resulting JavaScript value
	 * will reflect the provided GraphQL value AST.
	 *
	 * | GraphQL Value        | JavaScript Value |
	 * | -------------------- | ---------------- |
	 * | Input Object         | Object           |
	 * | List                 | Array            |
	 * | Boolean              | Boolean          |
	 * | String / Enum        | String           |
	 * | Int / Float          | Number           |
	 * | Null                 | null             |
	 *
	 */
	function valueFromASTUntyped(valueNode, variables) {
	  switch (valueNode.kind) {
	    case Kind.NULL:
	      return null;

	    case Kind.INT:
	      return parseInt(valueNode.value, 10);

	    case Kind.FLOAT:
	      return parseFloat(valueNode.value);

	    case Kind.STRING:
	    case Kind.ENUM:
	    case Kind.BOOLEAN:
	      return valueNode.value;

	    case Kind.LIST:
	      return valueNode.values.map(function (node) {
	        return valueFromASTUntyped(node, variables);
	      });

	    case Kind.OBJECT:
	      return keyValMap(valueNode.fields, function (field) {
	        return field.name.value;
	      }, function (field) {
	        return valueFromASTUntyped(field.value, variables);
	      });

	    case Kind.VARIABLE:
	      return variables === null || variables === void 0 ? void 0 : variables[valueNode.name.value];
	  } // istanbul ignore next (Not reachable. All possible value nodes have been considered)


	   invariant(0, 'Unexpected value node: ' + inspect(valueNode));
	}

	function _defineProperties$2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass$2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$2(Constructor.prototype, protoProps); if (staticProps) _defineProperties$2(Constructor, staticProps); return Constructor; }
	function isType(type) {
	  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type) || isListType(type) || isNonNullType(type);
	}
	function assertType(type) {
	  if (!isType(type)) {
	    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL type."));
	  }

	  return type;
	}
	/**
	 * There are predicates for each kind of GraphQL type.
	 */

	// eslint-disable-next-line no-redeclare
	function isScalarType(type) {
	  return instanceOf(type, GraphQLScalarType);
	}
	// eslint-disable-next-line no-redeclare
	function isObjectType(type) {
	  return instanceOf(type, GraphQLObjectType);
	}
	// eslint-disable-next-line no-redeclare
	function isInterfaceType(type) {
	  return instanceOf(type, GraphQLInterfaceType);
	}
	// eslint-disable-next-line no-redeclare
	function isUnionType(type) {
	  return instanceOf(type, GraphQLUnionType);
	}
	// eslint-disable-next-line no-redeclare
	function isEnumType(type) {
	  return instanceOf(type, GraphQLEnumType);
	}
	// eslint-disable-next-line no-redeclare
	function isInputObjectType(type) {
	  return instanceOf(type, GraphQLInputObjectType);
	}
	// eslint-disable-next-line no-redeclare
	function isListType(type) {
	  return instanceOf(type, GraphQLList);
	}
	// eslint-disable-next-line no-redeclare
	function isNonNullType(type) {
	  return instanceOf(type, GraphQLNonNull);
	}
	/**
	 * These types may be used as input types for arguments and directives.
	 */

	function isInputType(type) {
	  return isScalarType(type) || isEnumType(type) || isInputObjectType(type) || isWrappingType(type) && isInputType(type.ofType);
	}
	/**
	 * These types may describe types which may be leaf values.
	 */

	function isLeafType(type) {
	  return isScalarType(type) || isEnumType(type);
	}
	/**
	 * These types may describe the parent context of a selection set.
	 */

	function isCompositeType(type) {
	  return isObjectType(type) || isInterfaceType(type) || isUnionType(type);
	}
	/**
	 * These types may describe the parent context of a selection set.
	 */

	function isAbstractType(type) {
	  return isInterfaceType(type) || isUnionType(type);
	}
	/**
	 * List Type Wrapper
	 *
	 * A list is a wrapping type which points to another type.
	 * Lists are often created within the context of defining the fields of
	 * an object type.
	 *
	 * Example:
	 *
	 *     const PersonType = new GraphQLObjectType({
	 *       name: 'Person',
	 *       fields: () => ({
	 *         parents: { type: new GraphQLList(PersonType) },
	 *         children: { type: new GraphQLList(PersonType) },
	 *       })
	 *     })
	 *
	 */
	// FIXME: workaround to fix issue with Babel parser

	/* ::
	declare class GraphQLList<+T: GraphQLType> {
	  +ofType: T;
	  static <T>(ofType: T): GraphQLList<T>;
	  // Note: constructors cannot be used for covariant types. Drop the "new".
	  constructor(ofType: GraphQLType): void;
	}
	*/

	function GraphQLList(ofType) {
	  // istanbul ignore else (to be removed in v16.0.0)
	  if (this instanceof GraphQLList) {
	    this.ofType = assertType(ofType);
	  } else {
	    return new GraphQLList(ofType);
	  }
	} // Need to cast through any to alter the prototype.

	GraphQLList.prototype.toString = function toString() {
	  return '[' + String(this.ofType) + ']';
	};

	GraphQLList.prototype.toJSON = function toJSON() {
	  return this.toString();
	};

	Object.defineProperty(GraphQLList.prototype, SYMBOL_TO_STRING_TAG, {
	  get: function get() {
	    return 'GraphQLList';
	  }
	}); // Print a simplified form when appearing in `inspect` and `util.inspect`.

	defineInspect(GraphQLList);
	/**
	 * Non-Null Type Wrapper
	 *
	 * A non-null is a wrapping type which points to another type.
	 * Non-null types enforce that their values are never null and can ensure
	 * an error is raised if this ever occurs during a request. It is useful for
	 * fields which you can make a strong guarantee on non-nullability, for example
	 * usually the id field of a database row will never be null.
	 *
	 * Example:
	 *
	 *     const RowType = new GraphQLObjectType({
	 *       name: 'Row',
	 *       fields: () => ({
	 *         id: { type: new GraphQLNonNull(GraphQLString) },
	 *       })
	 *     })
	 *
	 * Note: the enforcement of non-nullability occurs within the executor.
	 */
	// FIXME: workaround to fix issue with Babel parser

	/* ::
	declare class GraphQLNonNull<+T: GraphQLNullableType> {
	  +ofType: T;
	  static <T>(ofType: T): GraphQLNonNull<T>;
	  // Note: constructors cannot be used for covariant types. Drop the "new".
	  constructor(ofType: GraphQLType): void;
	}
	*/

	function GraphQLNonNull(ofType) {
	  // istanbul ignore else (to be removed in v16.0.0)
	  if (this instanceof GraphQLNonNull) {
	    this.ofType = assertNullableType(ofType);
	  } else {
	    return new GraphQLNonNull(ofType);
	  }
	} // Need to cast through any to alter the prototype.

	GraphQLNonNull.prototype.toString = function toString() {
	  return String(this.ofType) + '!';
	};

	GraphQLNonNull.prototype.toJSON = function toJSON() {
	  return this.toString();
	};

	Object.defineProperty(GraphQLNonNull.prototype, SYMBOL_TO_STRING_TAG, {
	  get: function get() {
	    return 'GraphQLNonNull';
	  }
	}); // Print a simplified form when appearing in `inspect` and `util.inspect`.

	defineInspect(GraphQLNonNull);
	/**
	 * These types wrap and modify other types
	 */

	function isWrappingType(type) {
	  return isListType(type) || isNonNullType(type);
	}
	/**
	 * These types can all accept null as a value.
	 */

	function isNullableType(type) {
	  return isType(type) && !isNonNullType(type);
	}
	function assertNullableType(type) {
	  if (!isNullableType(type)) {
	    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL nullable type."));
	  }

	  return type;
	}
	/* eslint-disable no-redeclare */

	function getNullableType(type) {
	  /* eslint-enable no-redeclare */
	  if (type) {
	    return isNonNullType(type) ? type.ofType : type;
	  }
	}
	/* eslint-disable no-redeclare */

	function getNamedType(type) {
	  /* eslint-enable no-redeclare */
	  if (type) {
	    var unwrappedType = type;

	    while (isWrappingType(unwrappedType)) {
	      unwrappedType = unwrappedType.ofType;
	    }

	    return unwrappedType;
	  }
	}
	/**
	 * Used while defining GraphQL types to allow for circular references in
	 * otherwise immutable type definitions.
	 */

	function resolveThunk(thunk) {
	  // $FlowFixMe[incompatible-use]
	  return typeof thunk === 'function' ? thunk() : thunk;
	}

	function undefineIfEmpty(arr) {
	  return arr && arr.length > 0 ? arr : undefined;
	}
	/**
	 * Scalar Type Definition
	 *
	 * The leaf values of any request and input values to arguments are
	 * Scalars (or Enums) and are defined with a name and a series of functions
	 * used to parse input from ast or variables and to ensure validity.
	 *
	 * If a type's serialize function does not return a value (i.e. it returns
	 * `undefined`) then an error will be raised and a `null` value will be returned
	 * in the response. If the serialize function returns `null`, then no error will
	 * be included in the response.
	 *
	 * Example:
	 *
	 *     const OddType = new GraphQLScalarType({
	 *       name: 'Odd',
	 *       serialize(value) {
	 *         if (value % 2 === 1) {
	 *           return value;
	 *         }
	 *       }
	 *     });
	 *
	 */


	var GraphQLScalarType = /*#__PURE__*/function () {
	  function GraphQLScalarType(config) {
	    var _config$parseValue, _config$serialize, _config$parseLiteral;

	    var parseValue = (_config$parseValue = config.parseValue) !== null && _config$parseValue !== void 0 ? _config$parseValue : identityFunc;
	    this.name = config.name;
	    this.description = config.description;
	    this.specifiedByUrl = config.specifiedByUrl;
	    this.serialize = (_config$serialize = config.serialize) !== null && _config$serialize !== void 0 ? _config$serialize : identityFunc;
	    this.parseValue = parseValue;
	    this.parseLiteral = (_config$parseLiteral = config.parseLiteral) !== null && _config$parseLiteral !== void 0 ? _config$parseLiteral : function (node, variables) {
	      return parseValue(valueFromASTUntyped(node, variables));
	    };
	    this.extensions = config.extensions && toObjMap(config.extensions);
	    this.astNode = config.astNode;
	    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
	    typeof config.name === 'string' || devAssert(0, 'Must provide name.');
	    config.specifiedByUrl == null || typeof config.specifiedByUrl === 'string' || devAssert(0, "".concat(this.name, " must provide \"specifiedByUrl\" as a string, ") + "but got: ".concat(inspect(config.specifiedByUrl), "."));
	    config.serialize == null || typeof config.serialize === 'function' || devAssert(0, "".concat(this.name, " must provide \"serialize\" function. If this custom Scalar is also used as an input type, ensure \"parseValue\" and \"parseLiteral\" functions are also provided."));

	    if (config.parseLiteral) {
	      typeof config.parseValue === 'function' && typeof config.parseLiteral === 'function' || devAssert(0, "".concat(this.name, " must provide both \"parseValue\" and \"parseLiteral\" functions."));
	    }
	  }

	  var _proto = GraphQLScalarType.prototype;

	  _proto.toConfig = function toConfig() {
	    var _this$extensionASTNod;

	    return {
	      name: this.name,
	      description: this.description,
	      specifiedByUrl: this.specifiedByUrl,
	      serialize: this.serialize,
	      parseValue: this.parseValue,
	      parseLiteral: this.parseLiteral,
	      extensions: this.extensions,
	      astNode: this.astNode,
	      extensionASTNodes: (_this$extensionASTNod = this.extensionASTNodes) !== null && _this$extensionASTNod !== void 0 ? _this$extensionASTNod : []
	    };
	  };

	  _proto.toString = function toString() {
	    return this.name;
	  };

	  _proto.toJSON = function toJSON() {
	    return this.toString();
	  } // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet
	  ;

	  _createClass$2(GraphQLScalarType, [{
	    key: SYMBOL_TO_STRING_TAG,
	    get: function get() {
	      return 'GraphQLScalarType';
	    }
	  }]);

	  return GraphQLScalarType;
	}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.

	defineInspect(GraphQLScalarType);

	/**
	 * Object Type Definition
	 *
	 * Almost all of the GraphQL types you define will be object types. Object types
	 * have a name, but most importantly describe their fields.
	 *
	 * Example:
	 *
	 *     const AddressType = new GraphQLObjectType({
	 *       name: 'Address',
	 *       fields: {
	 *         street: { type: GraphQLString },
	 *         number: { type: GraphQLInt },
	 *         formatted: {
	 *           type: GraphQLString,
	 *           resolve(obj) {
	 *             return obj.number + ' ' + obj.street
	 *           }
	 *         }
	 *       }
	 *     });
	 *
	 * When two types need to refer to each other, or a type needs to refer to
	 * itself in a field, you can use a function expression (aka a closure or a
	 * thunk) to supply the fields lazily.
	 *
	 * Example:
	 *
	 *     const PersonType = new GraphQLObjectType({
	 *       name: 'Person',
	 *       fields: () => ({
	 *         name: { type: GraphQLString },
	 *         bestFriend: { type: PersonType },
	 *       })
	 *     });
	 *
	 */
	var GraphQLObjectType = /*#__PURE__*/function () {
	  function GraphQLObjectType(config) {
	    this.name = config.name;
	    this.description = config.description;
	    this.isTypeOf = config.isTypeOf;
	    this.extensions = config.extensions && toObjMap(config.extensions);
	    this.astNode = config.astNode;
	    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
	    this._fields = defineFieldMap.bind(undefined, config);
	    this._interfaces = defineInterfaces.bind(undefined, config);
	    typeof config.name === 'string' || devAssert(0, 'Must provide name.');
	    config.isTypeOf == null || typeof config.isTypeOf === 'function' || devAssert(0, "".concat(this.name, " must provide \"isTypeOf\" as a function, ") + "but got: ".concat(inspect(config.isTypeOf), "."));
	  }

	  var _proto2 = GraphQLObjectType.prototype;

	  _proto2.getFields = function getFields() {
	    if (typeof this._fields === 'function') {
	      this._fields = this._fields();
	    }

	    return this._fields;
	  };

	  _proto2.getInterfaces = function getInterfaces() {
	    if (typeof this._interfaces === 'function') {
	      this._interfaces = this._interfaces();
	    }

	    return this._interfaces;
	  };

	  _proto2.toConfig = function toConfig() {
	    return {
	      name: this.name,
	      description: this.description,
	      interfaces: this.getInterfaces(),
	      fields: fieldsToFieldsConfig(this.getFields()),
	      isTypeOf: this.isTypeOf,
	      extensions: this.extensions,
	      astNode: this.astNode,
	      extensionASTNodes: this.extensionASTNodes || []
	    };
	  };

	  _proto2.toString = function toString() {
	    return this.name;
	  };

	  _proto2.toJSON = function toJSON() {
	    return this.toString();
	  } // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet
	  ;

	  _createClass$2(GraphQLObjectType, [{
	    key: SYMBOL_TO_STRING_TAG,
	    get: function get() {
	      return 'GraphQLObjectType';
	    }
	  }]);

	  return GraphQLObjectType;
	}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.

	defineInspect(GraphQLObjectType);

	function defineInterfaces(config) {
	  var _resolveThunk;

	  var interfaces = (_resolveThunk = resolveThunk(config.interfaces)) !== null && _resolveThunk !== void 0 ? _resolveThunk : [];
	  Array.isArray(interfaces) || devAssert(0, "".concat(config.name, " interfaces must be an Array or a function which returns an Array."));
	  return interfaces;
	}

	function defineFieldMap(config) {
	  var fieldMap = resolveThunk(config.fields);
	  isPlainObj(fieldMap) || devAssert(0, "".concat(config.name, " fields must be an object with field names as keys or a function which returns such an object."));
	  return mapValue(fieldMap, function (fieldConfig, fieldName) {
	    var _fieldConfig$args;

	    isPlainObj(fieldConfig) || devAssert(0, "".concat(config.name, ".").concat(fieldName, " field config must be an object."));
	    !('isDeprecated' in fieldConfig) || devAssert(0, "".concat(config.name, ".").concat(fieldName, " should provide \"deprecationReason\" instead of \"isDeprecated\"."));
	    fieldConfig.resolve == null || typeof fieldConfig.resolve === 'function' || devAssert(0, "".concat(config.name, ".").concat(fieldName, " field resolver must be a function if ") + "provided, but got: ".concat(inspect(fieldConfig.resolve), "."));
	    var argsConfig = (_fieldConfig$args = fieldConfig.args) !== null && _fieldConfig$args !== void 0 ? _fieldConfig$args : {};
	    isPlainObj(argsConfig) || devAssert(0, "".concat(config.name, ".").concat(fieldName, " args must be an object with argument names as keys."));
	    var args = objectEntries(argsConfig).map(function (_ref) {
	      var argName = _ref[0],
	          argConfig = _ref[1];
	      return {
	        name: argName,
	        description: argConfig.description,
	        type: argConfig.type,
	        defaultValue: argConfig.defaultValue,
	        deprecationReason: argConfig.deprecationReason,
	        extensions: argConfig.extensions && toObjMap(argConfig.extensions),
	        astNode: argConfig.astNode
	      };
	    });
	    return {
	      name: fieldName,
	      description: fieldConfig.description,
	      type: fieldConfig.type,
	      args: args,
	      resolve: fieldConfig.resolve,
	      subscribe: fieldConfig.subscribe,
	      isDeprecated: fieldConfig.deprecationReason != null,
	      deprecationReason: fieldConfig.deprecationReason,
	      extensions: fieldConfig.extensions && toObjMap(fieldConfig.extensions),
	      astNode: fieldConfig.astNode
	    };
	  });
	}

	function isPlainObj(obj) {
	  return isObjectLike(obj) && !Array.isArray(obj);
	}

	function fieldsToFieldsConfig(fields) {
	  return mapValue(fields, function (field) {
	    return {
	      description: field.description,
	      type: field.type,
	      args: argsToArgsConfig(field.args),
	      resolve: field.resolve,
	      subscribe: field.subscribe,
	      deprecationReason: field.deprecationReason,
	      extensions: field.extensions,
	      astNode: field.astNode
	    };
	  });
	}
	/**
	 * @internal
	 */


	function argsToArgsConfig(args) {
	  return keyValMap(args, function (arg) {
	    return arg.name;
	  }, function (arg) {
	    return {
	      description: arg.description,
	      type: arg.type,
	      defaultValue: arg.defaultValue,
	      deprecationReason: arg.deprecationReason,
	      extensions: arg.extensions,
	      astNode: arg.astNode
	    };
	  });
	}
	function isRequiredArgument(arg) {
	  return isNonNullType(arg.type) && arg.defaultValue === undefined;
	}

	/**
	 * Interface Type Definition
	 *
	 * When a field can return one of a heterogeneous set of types, a Interface type
	 * is used to describe what types are possible, what fields are in common across
	 * all types, as well as a function to determine which type is actually used
	 * when the field is resolved.
	 *
	 * Example:
	 *
	 *     const EntityType = new GraphQLInterfaceType({
	 *       name: 'Entity',
	 *       fields: {
	 *         name: { type: GraphQLString }
	 *       }
	 *     });
	 *
	 */
	var GraphQLInterfaceType = /*#__PURE__*/function () {
	  function GraphQLInterfaceType(config) {
	    this.name = config.name;
	    this.description = config.description;
	    this.resolveType = config.resolveType;
	    this.extensions = config.extensions && toObjMap(config.extensions);
	    this.astNode = config.astNode;
	    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
	    this._fields = defineFieldMap.bind(undefined, config);
	    this._interfaces = defineInterfaces.bind(undefined, config);
	    typeof config.name === 'string' || devAssert(0, 'Must provide name.');
	    config.resolveType == null || typeof config.resolveType === 'function' || devAssert(0, "".concat(this.name, " must provide \"resolveType\" as a function, ") + "but got: ".concat(inspect(config.resolveType), "."));
	  }

	  var _proto3 = GraphQLInterfaceType.prototype;

	  _proto3.getFields = function getFields() {
	    if (typeof this._fields === 'function') {
	      this._fields = this._fields();
	    }

	    return this._fields;
	  };

	  _proto3.getInterfaces = function getInterfaces() {
	    if (typeof this._interfaces === 'function') {
	      this._interfaces = this._interfaces();
	    }

	    return this._interfaces;
	  };

	  _proto3.toConfig = function toConfig() {
	    var _this$extensionASTNod2;

	    return {
	      name: this.name,
	      description: this.description,
	      interfaces: this.getInterfaces(),
	      fields: fieldsToFieldsConfig(this.getFields()),
	      resolveType: this.resolveType,
	      extensions: this.extensions,
	      astNode: this.astNode,
	      extensionASTNodes: (_this$extensionASTNod2 = this.extensionASTNodes) !== null && _this$extensionASTNod2 !== void 0 ? _this$extensionASTNod2 : []
	    };
	  };

	  _proto3.toString = function toString() {
	    return this.name;
	  };

	  _proto3.toJSON = function toJSON() {
	    return this.toString();
	  } // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet
	  ;

	  _createClass$2(GraphQLInterfaceType, [{
	    key: SYMBOL_TO_STRING_TAG,
	    get: function get() {
	      return 'GraphQLInterfaceType';
	    }
	  }]);

	  return GraphQLInterfaceType;
	}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.

	defineInspect(GraphQLInterfaceType);

	/**
	 * Union Type Definition
	 *
	 * When a field can return one of a heterogeneous set of types, a Union type
	 * is used to describe what types are possible as well as providing a function
	 * to determine which type is actually used when the field is resolved.
	 *
	 * Example:
	 *
	 *     const PetType = new GraphQLUnionType({
	 *       name: 'Pet',
	 *       types: [ DogType, CatType ],
	 *       resolveType(value) {
	 *         if (value instanceof Dog) {
	 *           return DogType;
	 *         }
	 *         if (value instanceof Cat) {
	 *           return CatType;
	 *         }
	 *       }
	 *     });
	 *
	 */
	var GraphQLUnionType = /*#__PURE__*/function () {
	  function GraphQLUnionType(config) {
	    this.name = config.name;
	    this.description = config.description;
	    this.resolveType = config.resolveType;
	    this.extensions = config.extensions && toObjMap(config.extensions);
	    this.astNode = config.astNode;
	    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
	    this._types = defineTypes.bind(undefined, config);
	    typeof config.name === 'string' || devAssert(0, 'Must provide name.');
	    config.resolveType == null || typeof config.resolveType === 'function' || devAssert(0, "".concat(this.name, " must provide \"resolveType\" as a function, ") + "but got: ".concat(inspect(config.resolveType), "."));
	  }

	  var _proto4 = GraphQLUnionType.prototype;

	  _proto4.getTypes = function getTypes() {
	    if (typeof this._types === 'function') {
	      this._types = this._types();
	    }

	    return this._types;
	  };

	  _proto4.toConfig = function toConfig() {
	    var _this$extensionASTNod3;

	    return {
	      name: this.name,
	      description: this.description,
	      types: this.getTypes(),
	      resolveType: this.resolveType,
	      extensions: this.extensions,
	      astNode: this.astNode,
	      extensionASTNodes: (_this$extensionASTNod3 = this.extensionASTNodes) !== null && _this$extensionASTNod3 !== void 0 ? _this$extensionASTNod3 : []
	    };
	  };

	  _proto4.toString = function toString() {
	    return this.name;
	  };

	  _proto4.toJSON = function toJSON() {
	    return this.toString();
	  } // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet
	  ;

	  _createClass$2(GraphQLUnionType, [{
	    key: SYMBOL_TO_STRING_TAG,
	    get: function get() {
	      return 'GraphQLUnionType';
	    }
	  }]);

	  return GraphQLUnionType;
	}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.

	defineInspect(GraphQLUnionType);

	function defineTypes(config) {
	  var types = resolveThunk(config.types);
	  Array.isArray(types) || devAssert(0, "Must provide Array of types or a function which returns such an array for Union ".concat(config.name, "."));
	  return types;
	}

	/**
	 * Enum Type Definition
	 *
	 * Some leaf values of requests and input values are Enums. GraphQL serializes
	 * Enum values as strings, however internally Enums can be represented by any
	 * kind of type, often integers.
	 *
	 * Example:
	 *
	 *     const RGBType = new GraphQLEnumType({
	 *       name: 'RGB',
	 *       values: {
	 *         RED: { value: 0 },
	 *         GREEN: { value: 1 },
	 *         BLUE: { value: 2 }
	 *       }
	 *     });
	 *
	 * Note: If a value is not provided in a definition, the name of the enum value
	 * will be used as its internal value.
	 */
	var GraphQLEnumType
	/* <T> */
	= /*#__PURE__*/function () {
	  function GraphQLEnumType(config) {
	    this.name = config.name;
	    this.description = config.description;
	    this.extensions = config.extensions && toObjMap(config.extensions);
	    this.astNode = config.astNode;
	    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
	    this._values = defineEnumValues(this.name, config.values);
	    this._valueLookup = new Map(this._values.map(function (enumValue) {
	      return [enumValue.value, enumValue];
	    }));
	    this._nameLookup = keyMap(this._values, function (value) {
	      return value.name;
	    });
	    typeof config.name === 'string' || devAssert(0, 'Must provide name.');
	  }

	  var _proto5 = GraphQLEnumType.prototype;

	  _proto5.getValues = function getValues() {
	    return this._values;
	  };

	  _proto5.getValue = function getValue(name) {
	    return this._nameLookup[name];
	  };

	  _proto5.serialize = function serialize(outputValue) {
	    var enumValue = this._valueLookup.get(outputValue);

	    if (enumValue === undefined) {
	      throw new GraphQLError("Enum \"".concat(this.name, "\" cannot represent value: ").concat(inspect(outputValue)));
	    }

	    return enumValue.name;
	  };

	  _proto5.parseValue = function parseValue(inputValue)
	  /* T */
	  {
	    if (typeof inputValue !== 'string') {
	      var valueStr = inspect(inputValue);
	      throw new GraphQLError("Enum \"".concat(this.name, "\" cannot represent non-string value: ").concat(valueStr, ".") + didYouMeanEnumValue(this, valueStr));
	    }

	    var enumValue = this.getValue(inputValue);

	    if (enumValue == null) {
	      throw new GraphQLError("Value \"".concat(inputValue, "\" does not exist in \"").concat(this.name, "\" enum.") + didYouMeanEnumValue(this, inputValue));
	    }

	    return enumValue.value;
	  };

	  _proto5.parseLiteral = function parseLiteral(valueNode, _variables)
	  /* T */
	  {
	    // Note: variables will be resolved to a value before calling this function.
	    if (valueNode.kind !== Kind.ENUM) {
	      var valueStr = print(valueNode);
	      throw new GraphQLError("Enum \"".concat(this.name, "\" cannot represent non-enum value: ").concat(valueStr, ".") + didYouMeanEnumValue(this, valueStr), valueNode);
	    }

	    var enumValue = this.getValue(valueNode.value);

	    if (enumValue == null) {
	      var _valueStr = print(valueNode);

	      throw new GraphQLError("Value \"".concat(_valueStr, "\" does not exist in \"").concat(this.name, "\" enum.") + didYouMeanEnumValue(this, _valueStr), valueNode);
	    }

	    return enumValue.value;
	  };

	  _proto5.toConfig = function toConfig() {
	    var _this$extensionASTNod4;

	    var values = keyValMap(this.getValues(), function (value) {
	      return value.name;
	    }, function (value) {
	      return {
	        description: value.description,
	        value: value.value,
	        deprecationReason: value.deprecationReason,
	        extensions: value.extensions,
	        astNode: value.astNode
	      };
	    });
	    return {
	      name: this.name,
	      description: this.description,
	      values: values,
	      extensions: this.extensions,
	      astNode: this.astNode,
	      extensionASTNodes: (_this$extensionASTNod4 = this.extensionASTNodes) !== null && _this$extensionASTNod4 !== void 0 ? _this$extensionASTNod4 : []
	    };
	  };

	  _proto5.toString = function toString() {
	    return this.name;
	  };

	  _proto5.toJSON = function toJSON() {
	    return this.toString();
	  } // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet
	  ;

	  _createClass$2(GraphQLEnumType, [{
	    key: SYMBOL_TO_STRING_TAG,
	    get: function get() {
	      return 'GraphQLEnumType';
	    }
	  }]);

	  return GraphQLEnumType;
	}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.

	defineInspect(GraphQLEnumType);

	function didYouMeanEnumValue(enumType, unknownValueStr) {
	  var allNames = enumType.getValues().map(function (value) {
	    return value.name;
	  });
	  var suggestedValues = suggestionList(unknownValueStr, allNames);
	  return didYouMean('the enum value', suggestedValues);
	}

	function defineEnumValues(typeName, valueMap) {
	  isPlainObj(valueMap) || devAssert(0, "".concat(typeName, " values must be an object with value names as keys."));
	  return objectEntries(valueMap).map(function (_ref2) {
	    var valueName = _ref2[0],
	        valueConfig = _ref2[1];
	    isPlainObj(valueConfig) || devAssert(0, "".concat(typeName, ".").concat(valueName, " must refer to an object with a \"value\" key ") + "representing an internal value but got: ".concat(inspect(valueConfig), "."));
	    !('isDeprecated' in valueConfig) || devAssert(0, "".concat(typeName, ".").concat(valueName, " should provide \"deprecationReason\" instead of \"isDeprecated\"."));
	    return {
	      name: valueName,
	      description: valueConfig.description,
	      value: valueConfig.value !== undefined ? valueConfig.value : valueName,
	      isDeprecated: valueConfig.deprecationReason != null,
	      deprecationReason: valueConfig.deprecationReason,
	      extensions: valueConfig.extensions && toObjMap(valueConfig.extensions),
	      astNode: valueConfig.astNode
	    };
	  });
	}

	/**
	 * Input Object Type Definition
	 *
	 * An input object defines a structured collection of fields which may be
	 * supplied to a field argument.
	 *
	 * Using `NonNull` will ensure that a value must be provided by the query
	 *
	 * Example:
	 *
	 *     const GeoPoint = new GraphQLInputObjectType({
	 *       name: 'GeoPoint',
	 *       fields: {
	 *         lat: { type: new GraphQLNonNull(GraphQLFloat) },
	 *         lon: { type: new GraphQLNonNull(GraphQLFloat) },
	 *         alt: { type: GraphQLFloat, defaultValue: 0 },
	 *       }
	 *     });
	 *
	 */
	var GraphQLInputObjectType = /*#__PURE__*/function () {
	  function GraphQLInputObjectType(config) {
	    this.name = config.name;
	    this.description = config.description;
	    this.extensions = config.extensions && toObjMap(config.extensions);
	    this.astNode = config.astNode;
	    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
	    this._fields = defineInputFieldMap.bind(undefined, config);
	    typeof config.name === 'string' || devAssert(0, 'Must provide name.');
	  }

	  var _proto6 = GraphQLInputObjectType.prototype;

	  _proto6.getFields = function getFields() {
	    if (typeof this._fields === 'function') {
	      this._fields = this._fields();
	    }

	    return this._fields;
	  };

	  _proto6.toConfig = function toConfig() {
	    var _this$extensionASTNod5;

	    var fields = mapValue(this.getFields(), function (field) {
	      return {
	        description: field.description,
	        type: field.type,
	        defaultValue: field.defaultValue,
	        extensions: field.extensions,
	        astNode: field.astNode
	      };
	    });
	    return {
	      name: this.name,
	      description: this.description,
	      fields: fields,
	      extensions: this.extensions,
	      astNode: this.astNode,
	      extensionASTNodes: (_this$extensionASTNod5 = this.extensionASTNodes) !== null && _this$extensionASTNod5 !== void 0 ? _this$extensionASTNod5 : []
	    };
	  };

	  _proto6.toString = function toString() {
	    return this.name;
	  };

	  _proto6.toJSON = function toJSON() {
	    return this.toString();
	  } // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet
	  ;

	  _createClass$2(GraphQLInputObjectType, [{
	    key: SYMBOL_TO_STRING_TAG,
	    get: function get() {
	      return 'GraphQLInputObjectType';
	    }
	  }]);

	  return GraphQLInputObjectType;
	}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.

	defineInspect(GraphQLInputObjectType);

	function defineInputFieldMap(config) {
	  var fieldMap = resolveThunk(config.fields);
	  isPlainObj(fieldMap) || devAssert(0, "".concat(config.name, " fields must be an object with field names as keys or a function which returns such an object."));
	  return mapValue(fieldMap, function (fieldConfig, fieldName) {
	    !('resolve' in fieldConfig) || devAssert(0, "".concat(config.name, ".").concat(fieldName, " field has a resolve property, but Input Types cannot define resolvers."));
	    return {
	      name: fieldName,
	      description: fieldConfig.description,
	      type: fieldConfig.type,
	      defaultValue: fieldConfig.defaultValue,
	      deprecationReason: fieldConfig.deprecationReason,
	      extensions: fieldConfig.extensions && toObjMap(fieldConfig.extensions),
	      astNode: fieldConfig.astNode
	    };
	  });
	}

	function isRequiredInputField(field) {
	  return isNonNullType(field.type) && field.defaultValue === undefined;
	}

	/**
	 * Provided a type and a super type, return true if the first type is either
	 * equal or a subset of the second super type (covariant).
	 */

	function isTypeSubTypeOf(schema, maybeSubType, superType) {
	  // Equivalent type is a valid subtype
	  if (maybeSubType === superType) {
	    return true;
	  } // If superType is non-null, maybeSubType must also be non-null.


	  if (isNonNullType(superType)) {
	    if (isNonNullType(maybeSubType)) {
	      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
	    }

	    return false;
	  }

	  if (isNonNullType(maybeSubType)) {
	    // If superType is nullable, maybeSubType may be non-null or nullable.
	    return isTypeSubTypeOf(schema, maybeSubType.ofType, superType);
	  } // If superType type is a list, maybeSubType type must also be a list.


	  if (isListType(superType)) {
	    if (isListType(maybeSubType)) {
	      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
	    }

	    return false;
	  }

	  if (isListType(maybeSubType)) {
	    // If superType is not a list, maybeSubType must also be not a list.
	    return false;
	  } // If superType type is an abstract type, check if it is super type of maybeSubType.
	  // Otherwise, the child type is not a valid subtype of the parent type.


	  return isAbstractType(superType) && (isInterfaceType(maybeSubType) || isObjectType(maybeSubType)) && schema.isSubType(superType, maybeSubType);
	}
	/**
	 * Provided two composite types, determine if they "overlap". Two composite
	 * types overlap when the Sets of possible concrete types for each intersect.
	 *
	 * This is often used to determine if a fragment of a given type could possibly
	 * be visited in a context of another type.
	 *
	 * This function is commutative.
	 */

	function doTypesOverlap(schema, typeA, typeB) {
	  // Equivalent types overlap
	  if (typeA === typeB) {
	    return true;
	  }

	  if (isAbstractType(typeA)) {
	    if (isAbstractType(typeB)) {
	      // If both types are abstract, then determine if there is any intersection
	      // between possible concrete types of each.
	      return schema.getPossibleTypes(typeA).some(function (type) {
	        return schema.isSubType(typeB, type);
	      });
	    } // Determine if the latter type is a possible concrete type of the former.


	    return schema.isSubType(typeA, typeB);
	  }

	  if (isAbstractType(typeB)) {
	    // Determine if the former type is a possible concrete type of the latter.
	    return schema.isSubType(typeB, typeA);
	  } // Otherwise the types do not overlap.


	  return false;
	}

	/* eslint-disable no-redeclare */
	// $FlowFixMe[name-already-bound]
	var arrayFrom = Array.from || function (obj, mapFn, thisArg) {
	  if (obj == null) {
	    throw new TypeError('Array.from requires an array-like object - not null or undefined');
	  } // Is Iterable?


	  var iteratorMethod = obj[SYMBOL_ITERATOR];

	  if (typeof iteratorMethod === 'function') {
	    var iterator = iteratorMethod.call(obj);
	    var result = [];
	    var step;

	    for (var i = 0; !(step = iterator.next()).done; ++i) {
	      result.push(mapFn.call(thisArg, step.value, i)); // Infinite Iterators could cause forEach to run forever.
	      // After a very large number of iterations, produce an error.
	      // istanbul ignore if (Too big to actually test)

	      if (i > 9999999) {
	        throw new TypeError('Near-infinite iteration.');
	      }
	    }

	    return result;
	  } // Is Array like?


	  var length = obj.length;

	  if (typeof length === 'number' && length >= 0 && length % 1 === 0) {
	    var _result = [];

	    for (var _i = 0; _i < length; ++_i) {
	      if (Object.prototype.hasOwnProperty.call(obj, _i)) {
	        _result.push(mapFn.call(thisArg, obj[_i], _i));
	      }
	    }

	    return _result;
	  }

	  return [];
	};

	/* eslint-disable no-redeclare */
	// $FlowFixMe[name-already-bound] workaround for: https://github.com/facebook/flow/issues/4441
	var isFinitePolyfill = Number.isFinite || function (value) {
	  return typeof value === 'number' && isFinite(value);
	};

	function _typeof$3(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$3 = function _typeof(obj) { return typeof obj; }; } else { _typeof$3 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$3(obj); }
	/**
	 * Returns true if the provided object is an Object (i.e. not a string literal)
	 * and is either Iterable or Array-like.
	 *
	 * This may be used in place of [Array.isArray()][isArray] to determine if an
	 * object should be iterated-over. It always excludes string literals and
	 * includes Arrays (regardless of if it is Iterable). It also includes other
	 * Array-like objects such as NodeList, TypedArray, and Buffer.
	 *
	 * @example
	 *
	 * isCollection([ 1, 2, 3 ]) // true
	 * isCollection('ABC') // false
	 * isCollection({ length: 1, 0: 'Alpha' }) // true
	 * isCollection({ key: 'value' }) // false
	 * isCollection(new Map()) // true
	 *
	 * @param obj
	 *   An Object value which might implement the Iterable or Array-like protocols.
	 * @return {boolean} true if Iterable or Array-like Object.
	 */

	function isCollection(obj) {
	  if (obj == null || _typeof$3(obj) !== 'object') {
	    return false;
	  } // Is Array like?


	  var length = obj.length;

	  if (typeof length === 'number' && length >= 0 && length % 1 === 0) {
	    return true;
	  } // Is Iterable?


	  return typeof obj[SYMBOL_ITERATOR] === 'function';
	}

	/* eslint-disable no-redeclare */
	// $FlowFixMe[name-already-bound] workaround for: https://github.com/facebook/flow/issues/4441
	var isInteger = Number.isInteger || function (value) {
	  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
	};

	// 32-bit signed integer, providing the broadest support across platforms.
	//
	// n.b. JavaScript's integers are safe between -(2^53 - 1) and 2^53 - 1 because
	// they are internally represented as IEEE 754 doubles.

	var MAX_INT = 2147483647;
	var MIN_INT = -2147483648;

	function serializeInt(outputValue) {
	  var coercedValue = serializeObject(outputValue);

	  if (typeof coercedValue === 'boolean') {
	    return coercedValue ? 1 : 0;
	  }

	  var num = coercedValue;

	  if (typeof coercedValue === 'string' && coercedValue !== '') {
	    num = Number(coercedValue);
	  }

	  if (!isInteger(num)) {
	    throw new GraphQLError("Int cannot represent non-integer value: ".concat(inspect(coercedValue)));
	  }

	  if (num > MAX_INT || num < MIN_INT) {
	    throw new GraphQLError('Int cannot represent non 32-bit signed integer value: ' + inspect(coercedValue));
	  }

	  return num;
	}

	function coerceInt(inputValue) {
	  if (!isInteger(inputValue)) {
	    throw new GraphQLError("Int cannot represent non-integer value: ".concat(inspect(inputValue)));
	  }

	  if (inputValue > MAX_INT || inputValue < MIN_INT) {
	    throw new GraphQLError("Int cannot represent non 32-bit signed integer value: ".concat(inputValue));
	  }

	  return inputValue;
	}

	var GraphQLInt = new GraphQLScalarType({
	  name: 'Int',
	  description: 'The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.',
	  serialize: serializeInt,
	  parseValue: coerceInt,
	  parseLiteral: function parseLiteral(valueNode) {
	    if (valueNode.kind !== Kind.INT) {
	      throw new GraphQLError("Int cannot represent non-integer value: ".concat(print(valueNode)), valueNode);
	    }

	    var num = parseInt(valueNode.value, 10);

	    if (num > MAX_INT || num < MIN_INT) {
	      throw new GraphQLError("Int cannot represent non 32-bit signed integer value: ".concat(valueNode.value), valueNode);
	    }

	    return num;
	  }
	});

	function serializeFloat(outputValue) {
	  var coercedValue = serializeObject(outputValue);

	  if (typeof coercedValue === 'boolean') {
	    return coercedValue ? 1 : 0;
	  }

	  var num = coercedValue;

	  if (typeof coercedValue === 'string' && coercedValue !== '') {
	    num = Number(coercedValue);
	  }

	  if (!isFinitePolyfill(num)) {
	    throw new GraphQLError("Float cannot represent non numeric value: ".concat(inspect(coercedValue)));
	  }

	  return num;
	}

	function coerceFloat(inputValue) {
	  if (!isFinitePolyfill(inputValue)) {
	    throw new GraphQLError("Float cannot represent non numeric value: ".concat(inspect(inputValue)));
	  }

	  return inputValue;
	}

	var GraphQLFloat = new GraphQLScalarType({
	  name: 'Float',
	  description: 'The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).',
	  serialize: serializeFloat,
	  parseValue: coerceFloat,
	  parseLiteral: function parseLiteral(valueNode) {
	    if (valueNode.kind !== Kind.FLOAT && valueNode.kind !== Kind.INT) {
	      throw new GraphQLError("Float cannot represent non numeric value: ".concat(print(valueNode)), valueNode);
	    }

	    return parseFloat(valueNode.value);
	  }
	}); // Support serializing objects with custom valueOf() or toJSON() functions -
	// a common way to represent a complex value which can be represented as
	// a string (ex: MongoDB id objects).

	function serializeObject(outputValue) {
	  if (isObjectLike(outputValue)) {
	    if (typeof outputValue.valueOf === 'function') {
	      var valueOfResult = outputValue.valueOf();

	      if (!isObjectLike(valueOfResult)) {
	        return valueOfResult;
	      }
	    }

	    if (typeof outputValue.toJSON === 'function') {
	      // $FlowFixMe[incompatible-use]
	      return outputValue.toJSON();
	    }
	  }

	  return outputValue;
	}

	function serializeString(outputValue) {
	  var coercedValue = serializeObject(outputValue); // Serialize string, boolean and number values to a string, but do not
	  // attempt to coerce object, function, symbol, or other types as strings.

	  if (typeof coercedValue === 'string') {
	    return coercedValue;
	  }

	  if (typeof coercedValue === 'boolean') {
	    return coercedValue ? 'true' : 'false';
	  }

	  if (isFinitePolyfill(coercedValue)) {
	    return coercedValue.toString();
	  }

	  throw new GraphQLError("String cannot represent value: ".concat(inspect(outputValue)));
	}

	function coerceString(inputValue) {
	  if (typeof inputValue !== 'string') {
	    throw new GraphQLError("String cannot represent a non string value: ".concat(inspect(inputValue)));
	  }

	  return inputValue;
	}

	var GraphQLString = new GraphQLScalarType({
	  name: 'String',
	  description: 'The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.',
	  serialize: serializeString,
	  parseValue: coerceString,
	  parseLiteral: function parseLiteral(valueNode) {
	    if (valueNode.kind !== Kind.STRING) {
	      throw new GraphQLError("String cannot represent a non string value: ".concat(print(valueNode)), valueNode);
	    }

	    return valueNode.value;
	  }
	});

	function serializeBoolean(outputValue) {
	  var coercedValue = serializeObject(outputValue);

	  if (typeof coercedValue === 'boolean') {
	    return coercedValue;
	  }

	  if (isFinitePolyfill(coercedValue)) {
	    return coercedValue !== 0;
	  }

	  throw new GraphQLError("Boolean cannot represent a non boolean value: ".concat(inspect(coercedValue)));
	}

	function coerceBoolean(inputValue) {
	  if (typeof inputValue !== 'boolean') {
	    throw new GraphQLError("Boolean cannot represent a non boolean value: ".concat(inspect(inputValue)));
	  }

	  return inputValue;
	}

	var GraphQLBoolean = new GraphQLScalarType({
	  name: 'Boolean',
	  description: 'The `Boolean` scalar type represents `true` or `false`.',
	  serialize: serializeBoolean,
	  parseValue: coerceBoolean,
	  parseLiteral: function parseLiteral(valueNode) {
	    if (valueNode.kind !== Kind.BOOLEAN) {
	      throw new GraphQLError("Boolean cannot represent a non boolean value: ".concat(print(valueNode)), valueNode);
	    }

	    return valueNode.value;
	  }
	});

	function serializeID(outputValue) {
	  var coercedValue = serializeObject(outputValue);

	  if (typeof coercedValue === 'string') {
	    return coercedValue;
	  }

	  if (isInteger(coercedValue)) {
	    return String(coercedValue);
	  }

	  throw new GraphQLError("ID cannot represent value: ".concat(inspect(outputValue)));
	}

	function coerceID(inputValue) {
	  if (typeof inputValue === 'string') {
	    return inputValue;
	  }

	  if (isInteger(inputValue)) {
	    return inputValue.toString();
	  }

	  throw new GraphQLError("ID cannot represent value: ".concat(inspect(inputValue)));
	}

	var GraphQLID = new GraphQLScalarType({
	  name: 'ID',
	  description: 'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',
	  serialize: serializeID,
	  parseValue: coerceID,
	  parseLiteral: function parseLiteral(valueNode) {
	    if (valueNode.kind !== Kind.STRING && valueNode.kind !== Kind.INT) {
	      throw new GraphQLError('ID cannot represent a non-string and non-integer value: ' + print(valueNode), valueNode);
	    }

	    return valueNode.value;
	  }
	});
	var specifiedScalarTypes = Object.freeze([GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean, GraphQLID]);
	function isSpecifiedScalarType(type) {
	  return specifiedScalarTypes.some(function (_ref) {
	    var name = _ref.name;
	    return type.name === name;
	  });
	}

	/**
	 * Produces a GraphQL Value AST given a JavaScript object.
	 * Function will match JavaScript/JSON values to GraphQL AST schema format
	 * by using suggested GraphQLInputType. For example:
	 *
	 *     astFromValue("value", GraphQLString)
	 *
	 * A GraphQL type must be provided, which will be used to interpret different
	 * JavaScript values.
	 *
	 * | JSON Value    | GraphQL Value        |
	 * | ------------- | -------------------- |
	 * | Object        | Input Object         |
	 * | Array         | List                 |
	 * | Boolean       | Boolean              |
	 * | String        | String / Enum Value  |
	 * | Number        | Int / Float          |
	 * | Mixed         | Enum Value           |
	 * | null          | NullValue            |
	 *
	 */

	function astFromValue(value, type) {
	  if (isNonNullType(type)) {
	    var astValue = astFromValue(value, type.ofType);

	    if ((astValue === null || astValue === void 0 ? void 0 : astValue.kind) === Kind.NULL) {
	      return null;
	    }

	    return astValue;
	  } // only explicit null, not undefined, NaN


	  if (value === null) {
	    return {
	      kind: Kind.NULL
	    };
	  } // undefined


	  if (value === undefined) {
	    return null;
	  } // Convert JavaScript array to GraphQL list. If the GraphQLType is a list, but
	  // the value is not an array, convert the value using the list's item type.


	  if (isListType(type)) {
	    var itemType = type.ofType;

	    if (isCollection(value)) {
	      var valuesNodes = []; // Since we transpile for-of in loose mode it doesn't support iterators
	      // and it's required to first convert iteratable into array

	      for (var _i2 = 0, _arrayFrom2 = arrayFrom(value); _i2 < _arrayFrom2.length; _i2++) {
	        var item = _arrayFrom2[_i2];
	        var itemNode = astFromValue(item, itemType);

	        if (itemNode != null) {
	          valuesNodes.push(itemNode);
	        }
	      }

	      return {
	        kind: Kind.LIST,
	        values: valuesNodes
	      };
	    }

	    return astFromValue(value, itemType);
	  } // Populate the fields of the input object by creating ASTs from each value
	  // in the JavaScript object according to the fields in the input type.


	  if (isInputObjectType(type)) {
	    if (!isObjectLike(value)) {
	      return null;
	    }

	    var fieldNodes = [];

	    for (var _i4 = 0, _objectValues2 = objectValues(type.getFields()); _i4 < _objectValues2.length; _i4++) {
	      var field = _objectValues2[_i4];
	      var fieldValue = astFromValue(value[field.name], field.type);

	      if (fieldValue) {
	        fieldNodes.push({
	          kind: Kind.OBJECT_FIELD,
	          name: {
	            kind: Kind.NAME,
	            value: field.name
	          },
	          value: fieldValue
	        });
	      }
	    }

	    return {
	      kind: Kind.OBJECT,
	      fields: fieldNodes
	    };
	  } // istanbul ignore else (See: 'https://github.com/graphql/graphql-js/issues/2618')


	  if (isLeafType(type)) {
	    // Since value is an internally represented value, it must be serialized
	    // to an externally represented value before converting into an AST.
	    var serialized = type.serialize(value);

	    if (serialized == null) {
	      return null;
	    } // Others serialize based on their corresponding JavaScript scalar types.


	    if (typeof serialized === 'boolean') {
	      return {
	        kind: Kind.BOOLEAN,
	        value: serialized
	      };
	    } // JavaScript numbers can be Int or Float values.


	    if (typeof serialized === 'number' && isFinitePolyfill(serialized)) {
	      var stringNum = String(serialized);
	      return integerStringRegExp.test(stringNum) ? {
	        kind: Kind.INT,
	        value: stringNum
	      } : {
	        kind: Kind.FLOAT,
	        value: stringNum
	      };
	    }

	    if (typeof serialized === 'string') {
	      // Enum types use Enum literals.
	      if (isEnumType(type)) {
	        return {
	          kind: Kind.ENUM,
	          value: serialized
	        };
	      } // ID types can use Int literals.


	      if (type === GraphQLID && integerStringRegExp.test(serialized)) {
	        return {
	          kind: Kind.INT,
	          value: serialized
	        };
	      }

	      return {
	        kind: Kind.STRING,
	        value: serialized
	      };
	    }

	    throw new TypeError("Cannot convert value to AST: ".concat(inspect(serialized), "."));
	  } // istanbul ignore next (Not reachable. All possible input types have been considered)


	   invariant(0, 'Unexpected input type: ' + inspect(type));
	}
	/**
	 * IntValue:
	 *   - NegativeSign? 0
	 *   - NegativeSign? NonZeroDigit ( Digit+ )?
	 */

	var integerStringRegExp = /^-?(?:0|[1-9][0-9]*)$/;

	var __Schema = new GraphQLObjectType({
	  name: '__Schema',
	  description: 'A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.',
	  fields: function fields() {
	    return {
	      description: {
	        type: GraphQLString,
	        resolve: function resolve(schema) {
	          return schema.description;
	        }
	      },
	      types: {
	        description: 'A list of all types supported by this server.',
	        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__Type))),
	        resolve: function resolve(schema) {
	          return objectValues(schema.getTypeMap());
	        }
	      },
	      queryType: {
	        description: 'The type that query operations will be rooted at.',
	        type: new GraphQLNonNull(__Type),
	        resolve: function resolve(schema) {
	          return schema.getQueryType();
	        }
	      },
	      mutationType: {
	        description: 'If this server supports mutation, the type that mutation operations will be rooted at.',
	        type: __Type,
	        resolve: function resolve(schema) {
	          return schema.getMutationType();
	        }
	      },
	      subscriptionType: {
	        description: 'If this server support subscription, the type that subscription operations will be rooted at.',
	        type: __Type,
	        resolve: function resolve(schema) {
	          return schema.getSubscriptionType();
	        }
	      },
	      directives: {
	        description: 'A list of all directives supported by this server.',
	        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__Directive))),
	        resolve: function resolve(schema) {
	          return schema.getDirectives();
	        }
	      }
	    };
	  }
	});
	var __Directive = new GraphQLObjectType({
	  name: '__Directive',
	  description: "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
	  fields: function fields() {
	    return {
	      name: {
	        type: new GraphQLNonNull(GraphQLString),
	        resolve: function resolve(directive) {
	          return directive.name;
	        }
	      },
	      description: {
	        type: GraphQLString,
	        resolve: function resolve(directive) {
	          return directive.description;
	        }
	      },
	      isRepeatable: {
	        type: new GraphQLNonNull(GraphQLBoolean),
	        resolve: function resolve(directive) {
	          return directive.isRepeatable;
	        }
	      },
	      locations: {
	        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__DirectiveLocation))),
	        resolve: function resolve(directive) {
	          return directive.locations;
	        }
	      },
	      args: {
	        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__InputValue))),
	        resolve: function resolve(directive) {
	          return directive.args;
	        }
	      }
	    };
	  }
	});
	var __DirectiveLocation = new GraphQLEnumType({
	  name: '__DirectiveLocation',
	  description: 'A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.',
	  values: {
	    QUERY: {
	      value: DirectiveLocation.QUERY,
	      description: 'Location adjacent to a query operation.'
	    },
	    MUTATION: {
	      value: DirectiveLocation.MUTATION,
	      description: 'Location adjacent to a mutation operation.'
	    },
	    SUBSCRIPTION: {
	      value: DirectiveLocation.SUBSCRIPTION,
	      description: 'Location adjacent to a subscription operation.'
	    },
	    FIELD: {
	      value: DirectiveLocation.FIELD,
	      description: 'Location adjacent to a field.'
	    },
	    FRAGMENT_DEFINITION: {
	      value: DirectiveLocation.FRAGMENT_DEFINITION,
	      description: 'Location adjacent to a fragment definition.'
	    },
	    FRAGMENT_SPREAD: {
	      value: DirectiveLocation.FRAGMENT_SPREAD,
	      description: 'Location adjacent to a fragment spread.'
	    },
	    INLINE_FRAGMENT: {
	      value: DirectiveLocation.INLINE_FRAGMENT,
	      description: 'Location adjacent to an inline fragment.'
	    },
	    VARIABLE_DEFINITION: {
	      value: DirectiveLocation.VARIABLE_DEFINITION,
	      description: 'Location adjacent to a variable definition.'
	    },
	    SCHEMA: {
	      value: DirectiveLocation.SCHEMA,
	      description: 'Location adjacent to a schema definition.'
	    },
	    SCALAR: {
	      value: DirectiveLocation.SCALAR,
	      description: 'Location adjacent to a scalar definition.'
	    },
	    OBJECT: {
	      value: DirectiveLocation.OBJECT,
	      description: 'Location adjacent to an object type definition.'
	    },
	    FIELD_DEFINITION: {
	      value: DirectiveLocation.FIELD_DEFINITION,
	      description: 'Location adjacent to a field definition.'
	    },
	    ARGUMENT_DEFINITION: {
	      value: DirectiveLocation.ARGUMENT_DEFINITION,
	      description: 'Location adjacent to an argument definition.'
	    },
	    INTERFACE: {
	      value: DirectiveLocation.INTERFACE,
	      description: 'Location adjacent to an interface definition.'
	    },
	    UNION: {
	      value: DirectiveLocation.UNION,
	      description: 'Location adjacent to a union definition.'
	    },
	    ENUM: {
	      value: DirectiveLocation.ENUM,
	      description: 'Location adjacent to an enum definition.'
	    },
	    ENUM_VALUE: {
	      value: DirectiveLocation.ENUM_VALUE,
	      description: 'Location adjacent to an enum value definition.'
	    },
	    INPUT_OBJECT: {
	      value: DirectiveLocation.INPUT_OBJECT,
	      description: 'Location adjacent to an input object type definition.'
	    },
	    INPUT_FIELD_DEFINITION: {
	      value: DirectiveLocation.INPUT_FIELD_DEFINITION,
	      description: 'Location adjacent to an input object field definition.'
	    }
	  }
	});
	var __Type = new GraphQLObjectType({
	  name: '__Type',
	  description: 'The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.',
	  fields: function fields() {
	    return {
	      kind: {
	        type: new GraphQLNonNull(__TypeKind),
	        resolve: function resolve(type) {
	          if (isScalarType(type)) {
	            return TypeKind.SCALAR;
	          }

	          if (isObjectType(type)) {
	            return TypeKind.OBJECT;
	          }

	          if (isInterfaceType(type)) {
	            return TypeKind.INTERFACE;
	          }

	          if (isUnionType(type)) {
	            return TypeKind.UNION;
	          }

	          if (isEnumType(type)) {
	            return TypeKind.ENUM;
	          }

	          if (isInputObjectType(type)) {
	            return TypeKind.INPUT_OBJECT;
	          }

	          if (isListType(type)) {
	            return TypeKind.LIST;
	          } // istanbul ignore else (See: 'https://github.com/graphql/graphql-js/issues/2618')


	          if (isNonNullType(type)) {
	            return TypeKind.NON_NULL;
	          } // istanbul ignore next (Not reachable. All possible types have been considered)


	           invariant(0, "Unexpected type: \"".concat(inspect(type), "\"."));
	        }
	      },
	      name: {
	        type: GraphQLString,
	        resolve: function resolve(type) {
	          return type.name !== undefined ? type.name : undefined;
	        }
	      },
	      description: {
	        type: GraphQLString,
	        resolve: function resolve(type) {
	          return type.description !== undefined ? type.description : undefined;
	        }
	      },
	      specifiedByUrl: {
	        type: GraphQLString,
	        resolve: function resolve(obj) {
	          return obj.specifiedByUrl !== undefined ? obj.specifiedByUrl : undefined;
	        }
	      },
	      fields: {
	        type: new GraphQLList(new GraphQLNonNull(__Field)),
	        args: {
	          includeDeprecated: {
	            type: GraphQLBoolean,
	            defaultValue: false
	          }
	        },
	        resolve: function resolve(type, _ref) {
	          var includeDeprecated = _ref.includeDeprecated;

	          if (isObjectType(type) || isInterfaceType(type)) {
	            var fields = objectValues(type.getFields());
	            return includeDeprecated ? fields : fields.filter(function (field) {
	              return field.deprecationReason == null;
	            });
	          }
	        }
	      },
	      interfaces: {
	        type: new GraphQLList(new GraphQLNonNull(__Type)),
	        resolve: function resolve(type) {
	          if (isObjectType(type) || isInterfaceType(type)) {
	            return type.getInterfaces();
	          }
	        }
	      },
	      possibleTypes: {
	        type: new GraphQLList(new GraphQLNonNull(__Type)),
	        resolve: function resolve(type, _args, _context, _ref2) {
	          var schema = _ref2.schema;

	          if (isAbstractType(type)) {
	            return schema.getPossibleTypes(type);
	          }
	        }
	      },
	      enumValues: {
	        type: new GraphQLList(new GraphQLNonNull(__EnumValue)),
	        args: {
	          includeDeprecated: {
	            type: GraphQLBoolean,
	            defaultValue: false
	          }
	        },
	        resolve: function resolve(type, _ref3) {
	          var includeDeprecated = _ref3.includeDeprecated;

	          if (isEnumType(type)) {
	            var values = type.getValues();
	            return includeDeprecated ? values : values.filter(function (field) {
	              return field.deprecationReason == null;
	            });
	          }
	        }
	      },
	      inputFields: {
	        type: new GraphQLList(new GraphQLNonNull(__InputValue)),
	        args: {
	          includeDeprecated: {
	            type: GraphQLBoolean,
	            defaultValue: false
	          }
	        },
	        resolve: function resolve(type, _ref4) {
	          var includeDeprecated = _ref4.includeDeprecated;

	          if (isInputObjectType(type)) {
	            var values = objectValues(type.getFields());
	            return includeDeprecated ? values : values.filter(function (field) {
	              return field.deprecationReason == null;
	            });
	          }
	        }
	      },
	      ofType: {
	        type: __Type,
	        resolve: function resolve(type) {
	          return type.ofType !== undefined ? type.ofType : undefined;
	        }
	      }
	    };
	  }
	});
	var __Field = new GraphQLObjectType({
	  name: '__Field',
	  description: 'Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.',
	  fields: function fields() {
	    return {
	      name: {
	        type: new GraphQLNonNull(GraphQLString),
	        resolve: function resolve(field) {
	          return field.name;
	        }
	      },
	      description: {
	        type: GraphQLString,
	        resolve: function resolve(field) {
	          return field.description;
	        }
	      },
	      args: {
	        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__InputValue))),
	        args: {
	          includeDeprecated: {
	            type: GraphQLBoolean,
	            defaultValue: false
	          }
	        },
	        resolve: function resolve(field, _ref5) {
	          var includeDeprecated = _ref5.includeDeprecated;
	          return includeDeprecated ? field.args : field.args.filter(function (arg) {
	            return arg.deprecationReason == null;
	          });
	        }
	      },
	      type: {
	        type: new GraphQLNonNull(__Type),
	        resolve: function resolve(field) {
	          return field.type;
	        }
	      },
	      isDeprecated: {
	        type: new GraphQLNonNull(GraphQLBoolean),
	        resolve: function resolve(field) {
	          return field.deprecationReason != null;
	        }
	      },
	      deprecationReason: {
	        type: GraphQLString,
	        resolve: function resolve(field) {
	          return field.deprecationReason;
	        }
	      }
	    };
	  }
	});
	var __InputValue = new GraphQLObjectType({
	  name: '__InputValue',
	  description: 'Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.',
	  fields: function fields() {
	    return {
	      name: {
	        type: new GraphQLNonNull(GraphQLString),
	        resolve: function resolve(inputValue) {
	          return inputValue.name;
	        }
	      },
	      description: {
	        type: GraphQLString,
	        resolve: function resolve(inputValue) {
	          return inputValue.description;
	        }
	      },
	      type: {
	        type: new GraphQLNonNull(__Type),
	        resolve: function resolve(inputValue) {
	          return inputValue.type;
	        }
	      },
	      defaultValue: {
	        type: GraphQLString,
	        description: 'A GraphQL-formatted string representing the default value for this input value.',
	        resolve: function resolve(inputValue) {
	          var type = inputValue.type,
	              defaultValue = inputValue.defaultValue;
	          var valueAST = astFromValue(defaultValue, type);
	          return valueAST ? print(valueAST) : null;
	        }
	      },
	      isDeprecated: {
	        type: new GraphQLNonNull(GraphQLBoolean),
	        resolve: function resolve(field) {
	          return field.deprecationReason != null;
	        }
	      },
	      deprecationReason: {
	        type: GraphQLString,
	        resolve: function resolve(obj) {
	          return obj.deprecationReason;
	        }
	      }
	    };
	  }
	});
	var __EnumValue = new GraphQLObjectType({
	  name: '__EnumValue',
	  description: 'One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.',
	  fields: function fields() {
	    return {
	      name: {
	        type: new GraphQLNonNull(GraphQLString),
	        resolve: function resolve(enumValue) {
	          return enumValue.name;
	        }
	      },
	      description: {
	        type: GraphQLString,
	        resolve: function resolve(enumValue) {
	          return enumValue.description;
	        }
	      },
	      isDeprecated: {
	        type: new GraphQLNonNull(GraphQLBoolean),
	        resolve: function resolve(enumValue) {
	          return enumValue.deprecationReason != null;
	        }
	      },
	      deprecationReason: {
	        type: GraphQLString,
	        resolve: function resolve(enumValue) {
	          return enumValue.deprecationReason;
	        }
	      }
	    };
	  }
	});
	var TypeKind = Object.freeze({
	  SCALAR: 'SCALAR',
	  OBJECT: 'OBJECT',
	  INTERFACE: 'INTERFACE',
	  UNION: 'UNION',
	  ENUM: 'ENUM',
	  INPUT_OBJECT: 'INPUT_OBJECT',
	  LIST: 'LIST',
	  NON_NULL: 'NON_NULL'
	});
	var __TypeKind = new GraphQLEnumType({
	  name: '__TypeKind',
	  description: 'An enum describing what kind of type a given `__Type` is.',
	  values: {
	    SCALAR: {
	      value: TypeKind.SCALAR,
	      description: 'Indicates this type is a scalar.'
	    },
	    OBJECT: {
	      value: TypeKind.OBJECT,
	      description: 'Indicates this type is an object. `fields` and `interfaces` are valid fields.'
	    },
	    INTERFACE: {
	      value: TypeKind.INTERFACE,
	      description: 'Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields.'
	    },
	    UNION: {
	      value: TypeKind.UNION,
	      description: 'Indicates this type is a union. `possibleTypes` is a valid field.'
	    },
	    ENUM: {
	      value: TypeKind.ENUM,
	      description: 'Indicates this type is an enum. `enumValues` is a valid field.'
	    },
	    INPUT_OBJECT: {
	      value: TypeKind.INPUT_OBJECT,
	      description: 'Indicates this type is an input object. `inputFields` is a valid field.'
	    },
	    LIST: {
	      value: TypeKind.LIST,
	      description: 'Indicates this type is a list. `ofType` is a valid field.'
	    },
	    NON_NULL: {
	      value: TypeKind.NON_NULL,
	      description: 'Indicates this type is a non-null. `ofType` is a valid field.'
	    }
	  }
	});
	/**
	 * Note that these are GraphQLField and not GraphQLFieldConfig,
	 * so the format for args is different.
	 */

	var SchemaMetaFieldDef = {
	  name: '__schema',
	  type: new GraphQLNonNull(__Schema),
	  description: 'Access the current type schema of this server.',
	  args: [],
	  resolve: function resolve(_source, _args, _context, _ref6) {
	    var schema = _ref6.schema;
	    return schema;
	  },
	  isDeprecated: false,
	  deprecationReason: undefined,
	  extensions: undefined,
	  astNode: undefined
	};
	var TypeMetaFieldDef = {
	  name: '__type',
	  type: __Type,
	  description: 'Request the type information of a single type.',
	  args: [{
	    name: 'name',
	    description: undefined,
	    type: new GraphQLNonNull(GraphQLString),
	    defaultValue: undefined,
	    deprecationReason: undefined,
	    extensions: undefined,
	    astNode: undefined
	  }],
	  resolve: function resolve(_source, _ref7, _context, _ref8) {
	    var name = _ref7.name;
	    var schema = _ref8.schema;
	    return schema.getType(name);
	  },
	  isDeprecated: false,
	  deprecationReason: undefined,
	  extensions: undefined,
	  astNode: undefined
	};
	var TypeNameMetaFieldDef = {
	  name: '__typename',
	  type: new GraphQLNonNull(GraphQLString),
	  description: 'The name of the current Object type at runtime.',
	  args: [],
	  resolve: function resolve(_source, _args, _context, _ref9) {
	    var parentType = _ref9.parentType;
	    return parentType.name;
	  },
	  isDeprecated: false,
	  deprecationReason: undefined,
	  extensions: undefined,
	  astNode: undefined
	};
	var introspectionTypes = Object.freeze([__Schema, __Directive, __DirectiveLocation, __Type, __Field, __InputValue, __EnumValue, __TypeKind]);
	function isIntrospectionType(type) {
	  return introspectionTypes.some(function (_ref10) {
	    var name = _ref10.name;
	    return type.name === name;
	  });
	}

	function _defineProperties$3(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass$3(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$3(Constructor.prototype, protoProps); if (staticProps) _defineProperties$3(Constructor, staticProps); return Constructor; }
	/**
	 * Test if the given value is a GraphQL directive.
	 */

	// eslint-disable-next-line no-redeclare
	function isDirective(directive) {
	  return instanceOf(directive, GraphQLDirective);
	}
	/**
	 * Directives are used by the GraphQL runtime as a way of modifying execution
	 * behavior. Type system creators will usually not create these directly.
	 */

	var GraphQLDirective = /*#__PURE__*/function () {
	  function GraphQLDirective(config) {
	    var _config$isRepeatable, _config$args;

	    this.name = config.name;
	    this.description = config.description;
	    this.locations = config.locations;
	    this.isRepeatable = (_config$isRepeatable = config.isRepeatable) !== null && _config$isRepeatable !== void 0 ? _config$isRepeatable : false;
	    this.extensions = config.extensions && toObjMap(config.extensions);
	    this.astNode = config.astNode;
	    config.name || devAssert(0, 'Directive must be named.');
	    Array.isArray(config.locations) || devAssert(0, "@".concat(config.name, " locations must be an Array."));
	    var args = (_config$args = config.args) !== null && _config$args !== void 0 ? _config$args : {};
	    isObjectLike(args) && !Array.isArray(args) || devAssert(0, "@".concat(config.name, " args must be an object with argument names as keys."));
	    this.args = objectEntries(args).map(function (_ref) {
	      var argName = _ref[0],
	          argConfig = _ref[1];
	      return {
	        name: argName,
	        description: argConfig.description,
	        type: argConfig.type,
	        defaultValue: argConfig.defaultValue,
	        deprecationReason: argConfig.deprecationReason,
	        extensions: argConfig.extensions && toObjMap(argConfig.extensions),
	        astNode: argConfig.astNode
	      };
	    });
	  }

	  var _proto = GraphQLDirective.prototype;

	  _proto.toConfig = function toConfig() {
	    return {
	      name: this.name,
	      description: this.description,
	      locations: this.locations,
	      args: argsToArgsConfig(this.args),
	      isRepeatable: this.isRepeatable,
	      extensions: this.extensions,
	      astNode: this.astNode
	    };
	  };

	  _proto.toString = function toString() {
	    return '@' + this.name;
	  };

	  _proto.toJSON = function toJSON() {
	    return this.toString();
	  } // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet
	  ;

	  _createClass$3(GraphQLDirective, [{
	    key: SYMBOL_TO_STRING_TAG,
	    get: function get() {
	      return 'GraphQLDirective';
	    }
	  }]);

	  return GraphQLDirective;
	}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.

	defineInspect(GraphQLDirective);

	/**
	 * Used to conditionally include fields or fragments.
	 */
	var GraphQLIncludeDirective = new GraphQLDirective({
	  name: 'include',
	  description: 'Directs the executor to include this field or fragment only when the `if` argument is true.',
	  locations: [DirectiveLocation.FIELD, DirectiveLocation.FRAGMENT_SPREAD, DirectiveLocation.INLINE_FRAGMENT],
	  args: {
	    if: {
	      type: new GraphQLNonNull(GraphQLBoolean),
	      description: 'Included when true.'
	    }
	  }
	});
	/**
	 * Used to conditionally skip (exclude) fields or fragments.
	 */

	var GraphQLSkipDirective = new GraphQLDirective({
	  name: 'skip',
	  description: 'Directs the executor to skip this field or fragment when the `if` argument is true.',
	  locations: [DirectiveLocation.FIELD, DirectiveLocation.FRAGMENT_SPREAD, DirectiveLocation.INLINE_FRAGMENT],
	  args: {
	    if: {
	      type: new GraphQLNonNull(GraphQLBoolean),
	      description: 'Skipped when true.'
	    }
	  }
	});
	/**
	 * Constant string used for default reason for a deprecation.
	 */

	var DEFAULT_DEPRECATION_REASON = 'No longer supported';
	/**
	 * Used to declare element of a GraphQL schema as deprecated.
	 */

	var GraphQLDeprecatedDirective = new GraphQLDirective({
	  name: 'deprecated',
	  description: 'Marks an element of a GraphQL schema as no longer supported.',
	  locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.ARGUMENT_DEFINITION, DirectiveLocation.INPUT_FIELD_DEFINITION, DirectiveLocation.ENUM_VALUE],
	  args: {
	    reason: {
	      type: GraphQLString,
	      description: 'Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax, as specified by [CommonMark](https://commonmark.org/).',
	      defaultValue: DEFAULT_DEPRECATION_REASON
	    }
	  }
	});
	/**
	 * Used to provide a URL for specifying the behaviour of custom scalar definitions.
	 */

	var GraphQLSpecifiedByDirective = new GraphQLDirective({
	  name: 'specifiedBy',
	  description: 'Exposes a URL that specifies the behaviour of this scalar.',
	  locations: [DirectiveLocation.SCALAR],
	  args: {
	    url: {
	      type: new GraphQLNonNull(GraphQLString),
	      description: 'The URL that specifies the behaviour of this scalar.'
	    }
	  }
	});
	/**
	 * The full list of specified directives.
	 */

	var specifiedDirectives = Object.freeze([GraphQLIncludeDirective, GraphQLSkipDirective, GraphQLDeprecatedDirective, GraphQLSpecifiedByDirective]);

	function _defineProperties$4(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass$4(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$4(Constructor.prototype, protoProps); if (staticProps) _defineProperties$4(Constructor, staticProps); return Constructor; }
	/**
	 * Test if the given value is a GraphQL schema.
	 */

	// eslint-disable-next-line no-redeclare
	function isSchema(schema) {
	  return instanceOf(schema, GraphQLSchema);
	}
	function assertSchema(schema) {
	  if (!isSchema(schema)) {
	    throw new Error("Expected ".concat(inspect(schema), " to be a GraphQL schema."));
	  }

	  return schema;
	}
	/**
	 * Schema Definition
	 *
	 * A Schema is created by supplying the root types of each type of operation,
	 * query and mutation (optional). A schema definition is then supplied to the
	 * validator and executor.
	 *
	 * Example:
	 *
	 *     const MyAppSchema = new GraphQLSchema({
	 *       query: MyAppQueryRootType,
	 *       mutation: MyAppMutationRootType,
	 *     })
	 *
	 * Note: When the schema is constructed, by default only the types that are
	 * reachable by traversing the root types are included, other types must be
	 * explicitly referenced.
	 *
	 * Example:
	 *
	 *     const characterInterface = new GraphQLInterfaceType({
	 *       name: 'Character',
	 *       ...
	 *     });
	 *
	 *     const humanType = new GraphQLObjectType({
	 *       name: 'Human',
	 *       interfaces: [characterInterface],
	 *       ...
	 *     });
	 *
	 *     const droidType = new GraphQLObjectType({
	 *       name: 'Droid',
	 *       interfaces: [characterInterface],
	 *       ...
	 *     });
	 *
	 *     const schema = new GraphQLSchema({
	 *       query: new GraphQLObjectType({
	 *         name: 'Query',
	 *         fields: {
	 *           hero: { type: characterInterface, ... },
	 *         }
	 *       }),
	 *       ...
	 *       // Since this schema references only the `Character` interface it's
	 *       // necessary to explicitly list the types that implement it if
	 *       // you want them to be included in the final schema.
	 *       types: [humanType, droidType],
	 *     })
	 *
	 * Note: If an array of `directives` are provided to GraphQLSchema, that will be
	 * the exact list of directives represented and allowed. If `directives` is not
	 * provided then a default set of the specified directives (e.g. @include and
	 * @skip) will be used. If you wish to provide *additional* directives to these
	 * specified directives, you must explicitly declare them. Example:
	 *
	 *     const MyAppSchema = new GraphQLSchema({
	 *       ...
	 *       directives: specifiedDirectives.concat([ myCustomDirective ]),
	 *     })
	 *
	 */

	var GraphQLSchema = /*#__PURE__*/function () {
	  // Used as a cache for validateSchema().
	  function GraphQLSchema(config) {
	    var _config$directives;

	    // If this schema was built from a source known to be valid, then it may be
	    // marked with assumeValid to avoid an additional type system validation.
	    this.__validationErrors = config.assumeValid === true ? [] : undefined; // Check for common mistakes during construction to produce early errors.

	    isObjectLike(config) || devAssert(0, 'Must provide configuration object.');
	    !config.types || Array.isArray(config.types) || devAssert(0, "\"types\" must be Array if provided but got: ".concat(inspect(config.types), "."));
	    !config.directives || Array.isArray(config.directives) || devAssert(0, '"directives" must be Array if provided but got: ' + "".concat(inspect(config.directives), "."));
	    this.description = config.description;
	    this.extensions = config.extensions && toObjMap(config.extensions);
	    this.astNode = config.astNode;
	    this.extensionASTNodes = config.extensionASTNodes;
	    this._queryType = config.query;
	    this._mutationType = config.mutation;
	    this._subscriptionType = config.subscription; // Provide specified directives (e.g. @include and @skip) by default.

	    this._directives = (_config$directives = config.directives) !== null && _config$directives !== void 0 ? _config$directives : specifiedDirectives; // To preserve order of user-provided types, we add first to add them to
	    // the set of "collected" types, so `collectReferencedTypes` ignore them.

	    var allReferencedTypes = new Set(config.types);

	    if (config.types != null) {
	      for (var _i2 = 0, _config$types2 = config.types; _i2 < _config$types2.length; _i2++) {
	        var type = _config$types2[_i2];
	        // When we ready to process this type, we remove it from "collected" types
	        // and then add it together with all dependent types in the correct position.
	        allReferencedTypes.delete(type);
	        collectReferencedTypes(type, allReferencedTypes);
	      }
	    }

	    if (this._queryType != null) {
	      collectReferencedTypes(this._queryType, allReferencedTypes);
	    }

	    if (this._mutationType != null) {
	      collectReferencedTypes(this._mutationType, allReferencedTypes);
	    }

	    if (this._subscriptionType != null) {
	      collectReferencedTypes(this._subscriptionType, allReferencedTypes);
	    }

	    for (var _i4 = 0, _this$_directives2 = this._directives; _i4 < _this$_directives2.length; _i4++) {
	      var directive = _this$_directives2[_i4];

	      // Directives are not validated until validateSchema() is called.
	      if (isDirective(directive)) {
	        for (var _i6 = 0, _directive$args2 = directive.args; _i6 < _directive$args2.length; _i6++) {
	          var arg = _directive$args2[_i6];
	          collectReferencedTypes(arg.type, allReferencedTypes);
	        }
	      }
	    }

	    collectReferencedTypes(__Schema, allReferencedTypes); // Storing the resulting map for reference by the schema.

	    this._typeMap = Object.create(null);
	    this._subTypeMap = Object.create(null); // Keep track of all implementations by interface name.

	    this._implementationsMap = Object.create(null);

	    for (var _i8 = 0, _arrayFrom2 = arrayFrom(allReferencedTypes); _i8 < _arrayFrom2.length; _i8++) {
	      var namedType = _arrayFrom2[_i8];

	      if (namedType == null) {
	        continue;
	      }

	      var typeName = namedType.name;
	      typeName || devAssert(0, 'One of the provided types for building the Schema is missing a name.');

	      if (this._typeMap[typeName] !== undefined) {
	        throw new Error("Schema must contain uniquely named types but contains multiple types named \"".concat(typeName, "\"."));
	      }

	      this._typeMap[typeName] = namedType;

	      if (isInterfaceType(namedType)) {
	        // Store implementations by interface.
	        for (var _i10 = 0, _namedType$getInterfa2 = namedType.getInterfaces(); _i10 < _namedType$getInterfa2.length; _i10++) {
	          var iface = _namedType$getInterfa2[_i10];

	          if (isInterfaceType(iface)) {
	            var implementations = this._implementationsMap[iface.name];

	            if (implementations === undefined) {
	              implementations = this._implementationsMap[iface.name] = {
	                objects: [],
	                interfaces: []
	              };
	            }

	            implementations.interfaces.push(namedType);
	          }
	        }
	      } else if (isObjectType(namedType)) {
	        // Store implementations by objects.
	        for (var _i12 = 0, _namedType$getInterfa4 = namedType.getInterfaces(); _i12 < _namedType$getInterfa4.length; _i12++) {
	          var _iface = _namedType$getInterfa4[_i12];

	          if (isInterfaceType(_iface)) {
	            var _implementations = this._implementationsMap[_iface.name];

	            if (_implementations === undefined) {
	              _implementations = this._implementationsMap[_iface.name] = {
	                objects: [],
	                interfaces: []
	              };
	            }

	            _implementations.objects.push(namedType);
	          }
	        }
	      }
	    }
	  }

	  var _proto = GraphQLSchema.prototype;

	  _proto.getQueryType = function getQueryType() {
	    return this._queryType;
	  };

	  _proto.getMutationType = function getMutationType() {
	    return this._mutationType;
	  };

	  _proto.getSubscriptionType = function getSubscriptionType() {
	    return this._subscriptionType;
	  };

	  _proto.getTypeMap = function getTypeMap() {
	    return this._typeMap;
	  };

	  _proto.getType = function getType(name) {
	    return this.getTypeMap()[name];
	  };

	  _proto.getPossibleTypes = function getPossibleTypes(abstractType) {
	    return isUnionType(abstractType) ? abstractType.getTypes() : this.getImplementations(abstractType).objects;
	  };

	  _proto.getImplementations = function getImplementations(interfaceType) {
	    var implementations = this._implementationsMap[interfaceType.name];
	    return implementations !== null && implementations !== void 0 ? implementations : {
	      objects: [],
	      interfaces: []
	    };
	  } // @deprecated: use isSubType instead - will be removed in v16.
	  ;

	  _proto.isPossibleType = function isPossibleType(abstractType, possibleType) {
	    return this.isSubType(abstractType, possibleType);
	  };

	  _proto.isSubType = function isSubType(abstractType, maybeSubType) {
	    var map = this._subTypeMap[abstractType.name];

	    if (map === undefined) {
	      map = Object.create(null);

	      if (isUnionType(abstractType)) {
	        for (var _i14 = 0, _abstractType$getType2 = abstractType.getTypes(); _i14 < _abstractType$getType2.length; _i14++) {
	          var type = _abstractType$getType2[_i14];
	          map[type.name] = true;
	        }
	      } else {
	        var implementations = this.getImplementations(abstractType);

	        for (var _i16 = 0, _implementations$obje2 = implementations.objects; _i16 < _implementations$obje2.length; _i16++) {
	          var _type = _implementations$obje2[_i16];
	          map[_type.name] = true;
	        }

	        for (var _i18 = 0, _implementations$inte2 = implementations.interfaces; _i18 < _implementations$inte2.length; _i18++) {
	          var _type2 = _implementations$inte2[_i18];
	          map[_type2.name] = true;
	        }
	      }

	      this._subTypeMap[abstractType.name] = map;
	    }

	    return map[maybeSubType.name] !== undefined;
	  };

	  _proto.getDirectives = function getDirectives() {
	    return this._directives;
	  };

	  _proto.getDirective = function getDirective(name) {
	    return find(this.getDirectives(), function (directive) {
	      return directive.name === name;
	    });
	  };

	  _proto.toConfig = function toConfig() {
	    var _this$extensionASTNod;

	    return {
	      description: this.description,
	      query: this.getQueryType(),
	      mutation: this.getMutationType(),
	      subscription: this.getSubscriptionType(),
	      types: objectValues(this.getTypeMap()),
	      directives: this.getDirectives().slice(),
	      extensions: this.extensions,
	      astNode: this.astNode,
	      extensionASTNodes: (_this$extensionASTNod = this.extensionASTNodes) !== null && _this$extensionASTNod !== void 0 ? _this$extensionASTNod : [],
	      assumeValid: this.__validationErrors !== undefined
	    };
	  } // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet
	  ;

	  _createClass$4(GraphQLSchema, [{
	    key: SYMBOL_TO_STRING_TAG,
	    get: function get() {
	      return 'GraphQLSchema';
	    }
	  }]);

	  return GraphQLSchema;
	}();

	function collectReferencedTypes(type, typeSet) {
	  var namedType = getNamedType(type);

	  if (!typeSet.has(namedType)) {
	    typeSet.add(namedType);

	    if (isUnionType(namedType)) {
	      for (var _i20 = 0, _namedType$getTypes2 = namedType.getTypes(); _i20 < _namedType$getTypes2.length; _i20++) {
	        var memberType = _namedType$getTypes2[_i20];
	        collectReferencedTypes(memberType, typeSet);
	      }
	    } else if (isObjectType(namedType) || isInterfaceType(namedType)) {
	      for (var _i22 = 0, _namedType$getInterfa6 = namedType.getInterfaces(); _i22 < _namedType$getInterfa6.length; _i22++) {
	        var interfaceType = _namedType$getInterfa6[_i22];
	        collectReferencedTypes(interfaceType, typeSet);
	      }

	      for (var _i24 = 0, _objectValues2 = objectValues(namedType.getFields()); _i24 < _objectValues2.length; _i24++) {
	        var field = _objectValues2[_i24];
	        collectReferencedTypes(field.type, typeSet);

	        for (var _i26 = 0, _field$args2 = field.args; _i26 < _field$args2.length; _i26++) {
	          var arg = _field$args2[_i26];
	          collectReferencedTypes(arg.type, typeSet);
	        }
	      }
	    } else if (isInputObjectType(namedType)) {
	      for (var _i28 = 0, _objectValues4 = objectValues(namedType.getFields()); _i28 < _objectValues4.length; _i28++) {
	        var _field = _objectValues4[_i28];
	        collectReferencedTypes(_field.type, typeSet);
	      }
	    }
	  }

	  return typeSet;
	}

	/**
	 * Given a Schema and an AST node describing a type, return a GraphQLType
	 * definition which applies to that type. For example, if provided the parsed
	 * AST node for `[User]`, a GraphQLList instance will be returned, containing
	 * the type called "User" found in the schema. If a type called "User" is not
	 * found in the schema, then undefined will be returned.
	 */

	/* eslint-disable no-redeclare */

	function typeFromAST(schema, typeNode) {
	  /* eslint-enable no-redeclare */
	  var innerType;

	  if (typeNode.kind === Kind.LIST_TYPE) {
	    innerType = typeFromAST(schema, typeNode.type);
	    return innerType && new GraphQLList(innerType);
	  }

	  if (typeNode.kind === Kind.NON_NULL_TYPE) {
	    innerType = typeFromAST(schema, typeNode.type);
	    return innerType && new GraphQLNonNull(innerType);
	  } // istanbul ignore else (See: 'https://github.com/graphql/graphql-js/issues/2618')


	  if (typeNode.kind === Kind.NAMED_TYPE) {
	    return schema.getType(typeNode.name.value);
	  } // istanbul ignore next (Not reachable. All possible type nodes have been considered)


	   invariant(0, 'Unexpected type node: ' + inspect(typeNode));
	}

	function isExecutableDefinitionNode(node) {
	  return node.kind === Kind.OPERATION_DEFINITION || node.kind === Kind.FRAGMENT_DEFINITION;
	}
	function isTypeSystemDefinitionNode(node) {
	  return node.kind === Kind.SCHEMA_DEFINITION || isTypeDefinitionNode(node) || node.kind === Kind.DIRECTIVE_DEFINITION;
	}
	function isTypeDefinitionNode(node) {
	  return node.kind === Kind.SCALAR_TYPE_DEFINITION || node.kind === Kind.OBJECT_TYPE_DEFINITION || node.kind === Kind.INTERFACE_TYPE_DEFINITION || node.kind === Kind.UNION_TYPE_DEFINITION || node.kind === Kind.ENUM_TYPE_DEFINITION || node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION;
	}
	function isTypeSystemExtensionNode(node) {
	  return node.kind === Kind.SCHEMA_EXTENSION || isTypeExtensionNode(node);
	}
	function isTypeExtensionNode(node) {
	  return node.kind === Kind.SCALAR_TYPE_EXTENSION || node.kind === Kind.OBJECT_TYPE_EXTENSION || node.kind === Kind.INTERFACE_TYPE_EXTENSION || node.kind === Kind.UNION_TYPE_EXTENSION || node.kind === Kind.ENUM_TYPE_EXTENSION || node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION;
	}

	/**
	 * Executable definitions
	 *
	 * A GraphQL document is only valid for execution if all definitions are either
	 * operation or fragment definitions.
	 */
	function ExecutableDefinitionsRule(context) {
	  return {
	    Document: function Document(node) {
	      for (var _i2 = 0, _node$definitions2 = node.definitions; _i2 < _node$definitions2.length; _i2++) {
	        var definition = _node$definitions2[_i2];

	        if (!isExecutableDefinitionNode(definition)) {
	          var defName = definition.kind === Kind.SCHEMA_DEFINITION || definition.kind === Kind.SCHEMA_EXTENSION ? 'schema' : '"' + definition.name.value + '"';
	          context.reportError(new GraphQLError("The ".concat(defName, " definition is not executable."), definition));
	        }
	      }

	      return false;
	    }
	  };
	}

	/**
	 * Unique operation names
	 *
	 * A GraphQL document is only valid if all defined operations have unique names.
	 */
	function UniqueOperationNamesRule(context) {
	  var knownOperationNames = Object.create(null);
	  return {
	    OperationDefinition: function OperationDefinition(node) {
	      var operationName = node.name;

	      if (operationName) {
	        if (knownOperationNames[operationName.value]) {
	          context.reportError(new GraphQLError("There can be only one operation named \"".concat(operationName.value, "\"."), [knownOperationNames[operationName.value], operationName]));
	        } else {
	          knownOperationNames[operationName.value] = operationName;
	        }
	      }

	      return false;
	    },
	    FragmentDefinition: function FragmentDefinition() {
	      return false;
	    }
	  };
	}

	/**
	 * Lone anonymous operation
	 *
	 * A GraphQL document is only valid if when it contains an anonymous operation
	 * (the query short-hand) that it contains only that one operation definition.
	 */
	function LoneAnonymousOperationRule(context) {
	  var operationCount = 0;
	  return {
	    Document: function Document(node) {
	      operationCount = node.definitions.filter(function (definition) {
	        return definition.kind === Kind.OPERATION_DEFINITION;
	      }).length;
	    },
	    OperationDefinition: function OperationDefinition(node) {
	      if (!node.name && operationCount > 1) {
	        context.reportError(new GraphQLError('This anonymous operation must be the only defined operation.', node));
	      }
	    }
	  };
	}

	/**
	 * Subscriptions must only include one field.
	 *
	 * A GraphQL subscription is valid only if it contains a single root field.
	 */
	function SingleFieldSubscriptionsRule(context) {
	  return {
	    OperationDefinition: function OperationDefinition(node) {
	      if (node.operation === 'subscription') {
	        if (node.selectionSet.selections.length !== 1) {
	          context.reportError(new GraphQLError(node.name ? "Subscription \"".concat(node.name.value, "\" must select only one top level field.") : 'Anonymous Subscription must select only one top level field.', node.selectionSet.selections.slice(1)));
	        }
	      }
	    }
	  };
	}

	/**
	 * Known type names
	 *
	 * A GraphQL document is only valid if referenced types (specifically
	 * variable definitions and fragment conditions) are defined by the type schema.
	 */
	function KnownTypeNamesRule(context) {
	  var schema = context.getSchema();
	  var existingTypesMap = schema ? schema.getTypeMap() : Object.create(null);
	  var definedTypes = Object.create(null);

	  for (var _i2 = 0, _context$getDocument$2 = context.getDocument().definitions; _i2 < _context$getDocument$2.length; _i2++) {
	    var def = _context$getDocument$2[_i2];

	    if (isTypeDefinitionNode(def)) {
	      definedTypes[def.name.value] = true;
	    }
	  }

	  var typeNames = Object.keys(existingTypesMap).concat(Object.keys(definedTypes));
	  return {
	    NamedType: function NamedType(node, _1, parent, _2, ancestors) {
	      var typeName = node.name.value;

	      if (!existingTypesMap[typeName] && !definedTypes[typeName]) {
	        var _ancestors$;

	        var definitionNode = (_ancestors$ = ancestors[2]) !== null && _ancestors$ !== void 0 ? _ancestors$ : parent;
	        var isSDL = definitionNode != null && isSDLNode(definitionNode);

	        if (isSDL && isStandardTypeName(typeName)) {
	          return;
	        }

	        var suggestedTypes = suggestionList(typeName, isSDL ? standardTypeNames.concat(typeNames) : typeNames);
	        context.reportError(new GraphQLError("Unknown type \"".concat(typeName, "\".") + didYouMean(suggestedTypes), node));
	      }
	    }
	  };
	}
	var standardTypeNames = [].concat(specifiedScalarTypes, introspectionTypes).map(function (type) {
	  return type.name;
	});

	function isStandardTypeName(typeName) {
	  return standardTypeNames.indexOf(typeName) !== -1;
	}

	function isSDLNode(value) {
	  return !Array.isArray(value) && (isTypeSystemDefinitionNode(value) || isTypeSystemExtensionNode(value));
	}

	/**
	 * Fragments on composite type
	 *
	 * Fragments use a type condition to determine if they apply, since fragments
	 * can only be spread into a composite type (object, interface, or union), the
	 * type condition must also be a composite type.
	 */
	function FragmentsOnCompositeTypesRule(context) {
	  return {
	    InlineFragment: function InlineFragment(node) {
	      var typeCondition = node.typeCondition;

	      if (typeCondition) {
	        var type = typeFromAST(context.getSchema(), typeCondition);

	        if (type && !isCompositeType(type)) {
	          var typeStr = print(typeCondition);
	          context.reportError(new GraphQLError("Fragment cannot condition on non composite type \"".concat(typeStr, "\"."), typeCondition));
	        }
	      }
	    },
	    FragmentDefinition: function FragmentDefinition(node) {
	      var type = typeFromAST(context.getSchema(), node.typeCondition);

	      if (type && !isCompositeType(type)) {
	        var typeStr = print(node.typeCondition);
	        context.reportError(new GraphQLError("Fragment \"".concat(node.name.value, "\" cannot condition on non composite type \"").concat(typeStr, "\"."), node.typeCondition));
	      }
	    }
	  };
	}

	/**
	 * Variables are input types
	 *
	 * A GraphQL operation is only valid if all the variables it defines are of
	 * input types (scalar, enum, or input object).
	 */
	function VariablesAreInputTypesRule(context) {
	  return {
	    VariableDefinition: function VariableDefinition(node) {
	      var type = typeFromAST(context.getSchema(), node.type);

	      if (type && !isInputType(type)) {
	        var variableName = node.variable.name.value;
	        var typeName = print(node.type);
	        context.reportError(new GraphQLError("Variable \"$".concat(variableName, "\" cannot be non-input type \"").concat(typeName, "\"."), node.type));
	      }
	    }
	  };
	}

	/**
	 * Scalar leafs
	 *
	 * A GraphQL document is valid only if all leaf fields (fields without
	 * sub selections) are of scalar or enum types.
	 */
	function ScalarLeafsRule(context) {
	  return {
	    Field: function Field(node) {
	      var type = context.getType();
	      var selectionSet = node.selectionSet;

	      if (type) {
	        if (isLeafType(getNamedType(type))) {
	          if (selectionSet) {
	            var fieldName = node.name.value;
	            var typeStr = inspect(type);
	            context.reportError(new GraphQLError("Field \"".concat(fieldName, "\" must not have a selection since type \"").concat(typeStr, "\" has no subfields."), selectionSet));
	          }
	        } else if (!selectionSet) {
	          var _fieldName = node.name.value;

	          var _typeStr = inspect(type);

	          context.reportError(new GraphQLError("Field \"".concat(_fieldName, "\" of type \"").concat(_typeStr, "\" must have a selection of subfields. Did you mean \"").concat(_fieldName, " { ... }\"?"), node));
	        }
	      }
	    }
	  };
	}

	/**
	 * Fields on correct type
	 *
	 * A GraphQL document is only valid if all fields selected are defined by the
	 * parent type, or are an allowed meta field such as __typename.
	 */
	function FieldsOnCorrectTypeRule(context) {
	  return {
	    Field: function Field(node) {
	      var type = context.getParentType();

	      if (type) {
	        var fieldDef = context.getFieldDef();

	        if (!fieldDef) {
	          // This field doesn't exist, lets look for suggestions.
	          var schema = context.getSchema();
	          var fieldName = node.name.value; // First determine if there are any suggested types to condition on.

	          var suggestion = didYouMean('to use an inline fragment on', getSuggestedTypeNames(schema, type, fieldName)); // If there are no suggested types, then perhaps this was a typo?

	          if (suggestion === '') {
	            suggestion = didYouMean(getSuggestedFieldNames(type, fieldName));
	          } // Report an error, including helpful suggestions.


	          context.reportError(new GraphQLError("Cannot query field \"".concat(fieldName, "\" on type \"").concat(type.name, "\".") + suggestion, node));
	        }
	      }
	    }
	  };
	}
	/**
	 * Go through all of the implementations of type, as well as the interfaces that
	 * they implement. If any of those types include the provided field, suggest them,
	 * sorted by how often the type is referenced.
	 */

	function getSuggestedTypeNames(schema, type, fieldName) {
	  if (!isAbstractType(type)) {
	    // Must be an Object type, which does not have possible fields.
	    return [];
	  }

	  var suggestedTypes = new Set();
	  var usageCount = Object.create(null);

	  for (var _i2 = 0, _schema$getPossibleTy2 = schema.getPossibleTypes(type); _i2 < _schema$getPossibleTy2.length; _i2++) {
	    var possibleType = _schema$getPossibleTy2[_i2];

	    if (!possibleType.getFields()[fieldName]) {
	      continue;
	    } // This object type defines this field.


	    suggestedTypes.add(possibleType);
	    usageCount[possibleType.name] = 1;

	    for (var _i4 = 0, _possibleType$getInte2 = possibleType.getInterfaces(); _i4 < _possibleType$getInte2.length; _i4++) {
	      var _usageCount$possibleI;

	      var possibleInterface = _possibleType$getInte2[_i4];

	      if (!possibleInterface.getFields()[fieldName]) {
	        continue;
	      } // This interface type defines this field.


	      suggestedTypes.add(possibleInterface);
	      usageCount[possibleInterface.name] = ((_usageCount$possibleI = usageCount[possibleInterface.name]) !== null && _usageCount$possibleI !== void 0 ? _usageCount$possibleI : 0) + 1;
	    }
	  }

	  return arrayFrom(suggestedTypes).sort(function (typeA, typeB) {
	    // Suggest both interface and object types based on how common they are.
	    var usageCountDiff = usageCount[typeB.name] - usageCount[typeA.name];

	    if (usageCountDiff !== 0) {
	      return usageCountDiff;
	    } // Suggest super types first followed by subtypes


	    if (isInterfaceType(typeA) && schema.isSubType(typeA, typeB)) {
	      return -1;
	    }

	    if (isInterfaceType(typeB) && schema.isSubType(typeB, typeA)) {
	      return 1;
	    }

	    return typeA.name.localeCompare(typeB.name);
	  }).map(function (x) {
	    return x.name;
	  });
	}
	/**
	 * For the field name provided, determine if there are any similar field names
	 * that may be the result of a typo.
	 */


	function getSuggestedFieldNames(type, fieldName) {
	  if (isObjectType(type) || isInterfaceType(type)) {
	    var possibleFieldNames = Object.keys(type.getFields());
	    return suggestionList(fieldName, possibleFieldNames);
	  } // Otherwise, must be a Union type, which does not define fields.


	  return [];
	}

	/**
	 * Unique fragment names
	 *
	 * A GraphQL document is only valid if all defined fragments have unique names.
	 */
	function UniqueFragmentNamesRule(context) {
	  var knownFragmentNames = Object.create(null);
	  return {
	    OperationDefinition: function OperationDefinition() {
	      return false;
	    },
	    FragmentDefinition: function FragmentDefinition(node) {
	      var fragmentName = node.name.value;

	      if (knownFragmentNames[fragmentName]) {
	        context.reportError(new GraphQLError("There can be only one fragment named \"".concat(fragmentName, "\"."), [knownFragmentNames[fragmentName], node.name]));
	      } else {
	        knownFragmentNames[fragmentName] = node.name;
	      }

	      return false;
	    }
	  };
	}

	/**
	 * Known fragment names
	 *
	 * A GraphQL document is only valid if all `...Fragment` fragment spreads refer
	 * to fragments defined in the same document.
	 */
	function KnownFragmentNamesRule(context) {
	  return {
	    FragmentSpread: function FragmentSpread(node) {
	      var fragmentName = node.name.value;
	      var fragment = context.getFragment(fragmentName);

	      if (!fragment) {
	        context.reportError(new GraphQLError("Unknown fragment \"".concat(fragmentName, "\"."), node.name));
	      }
	    }
	  };
	}

	/**
	 * No unused fragments
	 *
	 * A GraphQL document is only valid if all fragment definitions are spread
	 * within operations, or spread within other fragments spread within operations.
	 */
	function NoUnusedFragmentsRule(context) {
	  var operationDefs = [];
	  var fragmentDefs = [];
	  return {
	    OperationDefinition: function OperationDefinition(node) {
	      operationDefs.push(node);
	      return false;
	    },
	    FragmentDefinition: function FragmentDefinition(node) {
	      fragmentDefs.push(node);
	      return false;
	    },
	    Document: {
	      leave: function leave() {
	        var fragmentNameUsed = Object.create(null);

	        for (var _i2 = 0; _i2 < operationDefs.length; _i2++) {
	          var operation = operationDefs[_i2];

	          for (var _i4 = 0, _context$getRecursive2 = context.getRecursivelyReferencedFragments(operation); _i4 < _context$getRecursive2.length; _i4++) {
	            var fragment = _context$getRecursive2[_i4];
	            fragmentNameUsed[fragment.name.value] = true;
	          }
	        }

	        for (var _i6 = 0; _i6 < fragmentDefs.length; _i6++) {
	          var fragmentDef = fragmentDefs[_i6];
	          var fragName = fragmentDef.name.value;

	          if (fragmentNameUsed[fragName] !== true) {
	            context.reportError(new GraphQLError("Fragment \"".concat(fragName, "\" is never used."), fragmentDef));
	          }
	        }
	      }
	    }
	  };
	}

	/**
	 * Possible fragment spread
	 *
	 * A fragment spread is only valid if the type condition could ever possibly
	 * be true: if there is a non-empty intersection of the possible parent types,
	 * and possible types which pass the type condition.
	 */
	function PossibleFragmentSpreadsRule(context) {
	  return {
	    InlineFragment: function InlineFragment(node) {
	      var fragType = context.getType();
	      var parentType = context.getParentType();

	      if (isCompositeType(fragType) && isCompositeType(parentType) && !doTypesOverlap(context.getSchema(), fragType, parentType)) {
	        var parentTypeStr = inspect(parentType);
	        var fragTypeStr = inspect(fragType);
	        context.reportError(new GraphQLError("Fragment cannot be spread here as objects of type \"".concat(parentTypeStr, "\" can never be of type \"").concat(fragTypeStr, "\"."), node));
	      }
	    },
	    FragmentSpread: function FragmentSpread(node) {
	      var fragName = node.name.value;
	      var fragType = getFragmentType(context, fragName);
	      var parentType = context.getParentType();

	      if (fragType && parentType && !doTypesOverlap(context.getSchema(), fragType, parentType)) {
	        var parentTypeStr = inspect(parentType);
	        var fragTypeStr = inspect(fragType);
	        context.reportError(new GraphQLError("Fragment \"".concat(fragName, "\" cannot be spread here as objects of type \"").concat(parentTypeStr, "\" can never be of type \"").concat(fragTypeStr, "\"."), node));
	      }
	    }
	  };
	}

	function getFragmentType(context, name) {
	  var frag = context.getFragment(name);

	  if (frag) {
	    var type = typeFromAST(context.getSchema(), frag.typeCondition);

	    if (isCompositeType(type)) {
	      return type;
	    }
	  }
	}

	function NoFragmentCyclesRule(context) {
	  // Tracks already visited fragments to maintain O(N) and to ensure that cycles
	  // are not redundantly reported.
	  var visitedFrags = Object.create(null); // Array of AST nodes used to produce meaningful errors

	  var spreadPath = []; // Position in the spread path

	  var spreadPathIndexByName = Object.create(null);
	  return {
	    OperationDefinition: function OperationDefinition() {
	      return false;
	    },
	    FragmentDefinition: function FragmentDefinition(node) {
	      detectCycleRecursive(node);
	      return false;
	    }
	  }; // This does a straight-forward DFS to find cycles.
	  // It does not terminate when a cycle was found but continues to explore
	  // the graph to find all possible cycles.

	  function detectCycleRecursive(fragment) {
	    if (visitedFrags[fragment.name.value]) {
	      return;
	    }

	    var fragmentName = fragment.name.value;
	    visitedFrags[fragmentName] = true;
	    var spreadNodes = context.getFragmentSpreads(fragment.selectionSet);

	    if (spreadNodes.length === 0) {
	      return;
	    }

	    spreadPathIndexByName[fragmentName] = spreadPath.length;

	    for (var _i2 = 0; _i2 < spreadNodes.length; _i2++) {
	      var spreadNode = spreadNodes[_i2];
	      var spreadName = spreadNode.name.value;
	      var cycleIndex = spreadPathIndexByName[spreadName];
	      spreadPath.push(spreadNode);

	      if (cycleIndex === undefined) {
	        var spreadFragment = context.getFragment(spreadName);

	        if (spreadFragment) {
	          detectCycleRecursive(spreadFragment);
	        }
	      } else {
	        var cyclePath = spreadPath.slice(cycleIndex);
	        var viaPath = cyclePath.slice(0, -1).map(function (s) {
	          return '"' + s.name.value + '"';
	        }).join(', ');
	        context.reportError(new GraphQLError("Cannot spread fragment \"".concat(spreadName, "\" within itself") + (viaPath !== '' ? " via ".concat(viaPath, ".") : '.'), cyclePath));
	      }

	      spreadPath.pop();
	    }

	    spreadPathIndexByName[fragmentName] = undefined;
	  }
	}

	/**
	 * Unique variable names
	 *
	 * A GraphQL operation is only valid if all its variables are uniquely named.
	 */
	function UniqueVariableNamesRule(context) {
	  var knownVariableNames = Object.create(null);
	  return {
	    OperationDefinition: function OperationDefinition() {
	      knownVariableNames = Object.create(null);
	    },
	    VariableDefinition: function VariableDefinition(node) {
	      var variableName = node.variable.name.value;

	      if (knownVariableNames[variableName]) {
	        context.reportError(new GraphQLError("There can be only one variable named \"$".concat(variableName, "\"."), [knownVariableNames[variableName], node.variable.name]));
	      } else {
	        knownVariableNames[variableName] = node.variable.name;
	      }
	    }
	  };
	}

	/**
	 * No undefined variables
	 *
	 * A GraphQL operation is only valid if all variables encountered, both directly
	 * and via fragment spreads, are defined by that operation.
	 */
	function NoUndefinedVariablesRule(context) {
	  var variableNameDefined = Object.create(null);
	  return {
	    OperationDefinition: {
	      enter: function enter() {
	        variableNameDefined = Object.create(null);
	      },
	      leave: function leave(operation) {
	        var usages = context.getRecursiveVariableUsages(operation);

	        for (var _i2 = 0; _i2 < usages.length; _i2++) {
	          var _ref2 = usages[_i2];
	          var node = _ref2.node;
	          var varName = node.name.value;

	          if (variableNameDefined[varName] !== true) {
	            context.reportError(new GraphQLError(operation.name ? "Variable \"$".concat(varName, "\" is not defined by operation \"").concat(operation.name.value, "\".") : "Variable \"$".concat(varName, "\" is not defined."), [node, operation]));
	          }
	        }
	      }
	    },
	    VariableDefinition: function VariableDefinition(node) {
	      variableNameDefined[node.variable.name.value] = true;
	    }
	  };
	}

	/**
	 * No unused variables
	 *
	 * A GraphQL operation is only valid if all variables defined by an operation
	 * are used, either directly or within a spread fragment.
	 */
	function NoUnusedVariablesRule(context) {
	  var variableDefs = [];
	  return {
	    OperationDefinition: {
	      enter: function enter() {
	        variableDefs = [];
	      },
	      leave: function leave(operation) {
	        var variableNameUsed = Object.create(null);
	        var usages = context.getRecursiveVariableUsages(operation);

	        for (var _i2 = 0; _i2 < usages.length; _i2++) {
	          var _ref2 = usages[_i2];
	          var node = _ref2.node;
	          variableNameUsed[node.name.value] = true;
	        }

	        for (var _i4 = 0, _variableDefs2 = variableDefs; _i4 < _variableDefs2.length; _i4++) {
	          var variableDef = _variableDefs2[_i4];
	          var variableName = variableDef.variable.name.value;

	          if (variableNameUsed[variableName] !== true) {
	            context.reportError(new GraphQLError(operation.name ? "Variable \"$".concat(variableName, "\" is never used in operation \"").concat(operation.name.value, "\".") : "Variable \"$".concat(variableName, "\" is never used."), variableDef));
	          }
	        }
	      }
	    },
	    VariableDefinition: function VariableDefinition(def) {
	      variableDefs.push(def);
	    }
	  };
	}

	/**
	 * Known directives
	 *
	 * A GraphQL document is only valid if all `@directives` are known by the
	 * schema and legally positioned.
	 */
	function KnownDirectivesRule(context) {
	  var locationsMap = Object.create(null);
	  var schema = context.getSchema();
	  var definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;

	  for (var _i2 = 0; _i2 < definedDirectives.length; _i2++) {
	    var directive = definedDirectives[_i2];
	    locationsMap[directive.name] = directive.locations;
	  }

	  var astDefinitions = context.getDocument().definitions;

	  for (var _i4 = 0; _i4 < astDefinitions.length; _i4++) {
	    var def = astDefinitions[_i4];

	    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
	      locationsMap[def.name.value] = def.locations.map(function (name) {
	        return name.value;
	      });
	    }
	  }

	  return {
	    Directive: function Directive(node, _key, _parent, _path, ancestors) {
	      var name = node.name.value;
	      var locations = locationsMap[name];

	      if (!locations) {
	        context.reportError(new GraphQLError("Unknown directive \"@".concat(name, "\"."), node));
	        return;
	      }

	      var candidateLocation = getDirectiveLocationForASTPath(ancestors);

	      if (candidateLocation && locations.indexOf(candidateLocation) === -1) {
	        context.reportError(new GraphQLError("Directive \"@".concat(name, "\" may not be used on ").concat(candidateLocation, "."), node));
	      }
	    }
	  };
	}

	function getDirectiveLocationForASTPath(ancestors) {
	  var appliedTo = ancestors[ancestors.length - 1];
	  !Array.isArray(appliedTo) || invariant(0);

	  switch (appliedTo.kind) {
	    case Kind.OPERATION_DEFINITION:
	      return getDirectiveLocationForOperation(appliedTo.operation);

	    case Kind.FIELD:
	      return DirectiveLocation.FIELD;

	    case Kind.FRAGMENT_SPREAD:
	      return DirectiveLocation.FRAGMENT_SPREAD;

	    case Kind.INLINE_FRAGMENT:
	      return DirectiveLocation.INLINE_FRAGMENT;

	    case Kind.FRAGMENT_DEFINITION:
	      return DirectiveLocation.FRAGMENT_DEFINITION;

	    case Kind.VARIABLE_DEFINITION:
	      return DirectiveLocation.VARIABLE_DEFINITION;

	    case Kind.SCHEMA_DEFINITION:
	    case Kind.SCHEMA_EXTENSION:
	      return DirectiveLocation.SCHEMA;

	    case Kind.SCALAR_TYPE_DEFINITION:
	    case Kind.SCALAR_TYPE_EXTENSION:
	      return DirectiveLocation.SCALAR;

	    case Kind.OBJECT_TYPE_DEFINITION:
	    case Kind.OBJECT_TYPE_EXTENSION:
	      return DirectiveLocation.OBJECT;

	    case Kind.FIELD_DEFINITION:
	      return DirectiveLocation.FIELD_DEFINITION;

	    case Kind.INTERFACE_TYPE_DEFINITION:
	    case Kind.INTERFACE_TYPE_EXTENSION:
	      return DirectiveLocation.INTERFACE;

	    case Kind.UNION_TYPE_DEFINITION:
	    case Kind.UNION_TYPE_EXTENSION:
	      return DirectiveLocation.UNION;

	    case Kind.ENUM_TYPE_DEFINITION:
	    case Kind.ENUM_TYPE_EXTENSION:
	      return DirectiveLocation.ENUM;

	    case Kind.ENUM_VALUE_DEFINITION:
	      return DirectiveLocation.ENUM_VALUE;

	    case Kind.INPUT_OBJECT_TYPE_DEFINITION:
	    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
	      return DirectiveLocation.INPUT_OBJECT;

	    case Kind.INPUT_VALUE_DEFINITION:
	      {
	        var parentNode = ancestors[ancestors.length - 3];
	        return parentNode.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION ? DirectiveLocation.INPUT_FIELD_DEFINITION : DirectiveLocation.ARGUMENT_DEFINITION;
	      }
	  }
	}

	function getDirectiveLocationForOperation(operation) {
	  switch (operation) {
	    case 'query':
	      return DirectiveLocation.QUERY;

	    case 'mutation':
	      return DirectiveLocation.MUTATION;

	    case 'subscription':
	      return DirectiveLocation.SUBSCRIPTION;
	  } // istanbul ignore next (Not reachable. All possible types have been considered)


	   invariant(0, 'Unexpected operation: ' + inspect(operation));
	}

	/**
	 * Unique directive names per location
	 *
	 * A GraphQL document is only valid if all non-repeatable directives at
	 * a given location are uniquely named.
	 */
	function UniqueDirectivesPerLocationRule(context) {
	  var uniqueDirectiveMap = Object.create(null);
	  var schema = context.getSchema();
	  var definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;

	  for (var _i2 = 0; _i2 < definedDirectives.length; _i2++) {
	    var directive = definedDirectives[_i2];
	    uniqueDirectiveMap[directive.name] = !directive.isRepeatable;
	  }

	  var astDefinitions = context.getDocument().definitions;

	  for (var _i4 = 0; _i4 < astDefinitions.length; _i4++) {
	    var def = astDefinitions[_i4];

	    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
	      uniqueDirectiveMap[def.name.value] = !def.repeatable;
	    }
	  }

	  var schemaDirectives = Object.create(null);
	  var typeDirectivesMap = Object.create(null);
	  return {
	    // Many different AST nodes may contain directives. Rather than listing
	    // them all, just listen for entering any node, and check to see if it
	    // defines any directives.
	    enter: function enter(node) {
	      if (node.directives == null) {
	        return;
	      }

	      var seenDirectives;

	      if (node.kind === Kind.SCHEMA_DEFINITION || node.kind === Kind.SCHEMA_EXTENSION) {
	        seenDirectives = schemaDirectives;
	      } else if (isTypeDefinitionNode(node) || isTypeExtensionNode(node)) {
	        var typeName = node.name.value;
	        seenDirectives = typeDirectivesMap[typeName];

	        if (seenDirectives === undefined) {
	          typeDirectivesMap[typeName] = seenDirectives = Object.create(null);
	        }
	      } else {
	        seenDirectives = Object.create(null);
	      }

	      for (var _i6 = 0, _node$directives2 = node.directives; _i6 < _node$directives2.length; _i6++) {
	        var _directive = _node$directives2[_i6];
	        var directiveName = _directive.name.value;

	        if (uniqueDirectiveMap[directiveName]) {
	          if (seenDirectives[directiveName]) {
	            context.reportError(new GraphQLError("The directive \"@".concat(directiveName, "\" can only be used once at this location."), [seenDirectives[directiveName], _directive]));
	          } else {
	            seenDirectives[directiveName] = _directive;
	          }
	        }
	      }
	    }
	  };
	}

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * Known argument names
	 *
	 * A GraphQL field is only valid if all supplied arguments are defined by
	 * that field.
	 */
	function KnownArgumentNamesRule(context) {
	  return _objectSpread(_objectSpread({}, KnownArgumentNamesOnDirectivesRule(context)), {}, {
	    Argument: function Argument(argNode) {
	      var argDef = context.getArgument();
	      var fieldDef = context.getFieldDef();
	      var parentType = context.getParentType();

	      if (!argDef && fieldDef && parentType) {
	        var argName = argNode.name.value;
	        var knownArgsNames = fieldDef.args.map(function (arg) {
	          return arg.name;
	        });
	        var suggestions = suggestionList(argName, knownArgsNames);
	        context.reportError(new GraphQLError("Unknown argument \"".concat(argName, "\" on field \"").concat(parentType.name, ".").concat(fieldDef.name, "\".") + didYouMean(suggestions), argNode));
	      }
	    }
	  });
	}
	/**
	 * @internal
	 */

	function KnownArgumentNamesOnDirectivesRule(context) {
	  var directiveArgs = Object.create(null);
	  var schema = context.getSchema();
	  var definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;

	  for (var _i2 = 0; _i2 < definedDirectives.length; _i2++) {
	    var directive = definedDirectives[_i2];
	    directiveArgs[directive.name] = directive.args.map(function (arg) {
	      return arg.name;
	    });
	  }

	  var astDefinitions = context.getDocument().definitions;

	  for (var _i4 = 0; _i4 < astDefinitions.length; _i4++) {
	    var def = astDefinitions[_i4];

	    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
	      var _def$arguments;

	      // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')
	      var argsNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== void 0 ? _def$arguments : [];
	      directiveArgs[def.name.value] = argsNodes.map(function (arg) {
	        return arg.name.value;
	      });
	    }
	  }

	  return {
	    Directive: function Directive(directiveNode) {
	      var directiveName = directiveNode.name.value;
	      var knownArgs = directiveArgs[directiveName];

	      if (directiveNode.arguments && knownArgs) {
	        for (var _i6 = 0, _directiveNode$argume2 = directiveNode.arguments; _i6 < _directiveNode$argume2.length; _i6++) {
	          var argNode = _directiveNode$argume2[_i6];
	          var argName = argNode.name.value;

	          if (knownArgs.indexOf(argName) === -1) {
	            var suggestions = suggestionList(argName, knownArgs);
	            context.reportError(new GraphQLError("Unknown argument \"".concat(argName, "\" on directive \"@").concat(directiveName, "\".") + didYouMean(suggestions), argNode));
	          }
	        }
	      }

	      return false;
	    }
	  };
	}

	/**
	 * Unique argument names
	 *
	 * A GraphQL field or directive is only valid if all supplied arguments are
	 * uniquely named.
	 */
	function UniqueArgumentNamesRule(context) {
	  var knownArgNames = Object.create(null);
	  return {
	    Field: function Field() {
	      knownArgNames = Object.create(null);
	    },
	    Directive: function Directive() {
	      knownArgNames = Object.create(null);
	    },
	    Argument: function Argument(node) {
	      var argName = node.name.value;

	      if (knownArgNames[argName]) {
	        context.reportError(new GraphQLError("There can be only one argument named \"".concat(argName, "\"."), [knownArgNames[argName], node.name]));
	      } else {
	        knownArgNames[argName] = node.name;
	      }

	      return false;
	    }
	  };
	}

	/**
	 * Value literals of correct type
	 *
	 * A GraphQL document is only valid if all value literals are of the type
	 * expected at their position.
	 */
	function ValuesOfCorrectTypeRule(context) {
	  return {
	    ListValue: function ListValue(node) {
	      // Note: TypeInfo will traverse into a list's item type, so look to the
	      // parent input type to check if it is a list.
	      var type = getNullableType(context.getParentInputType());

	      if (!isListType(type)) {
	        isValidValueNode(context, node);
	        return false; // Don't traverse further.
	      }
	    },
	    ObjectValue: function ObjectValue(node) {
	      var type = getNamedType(context.getInputType());

	      if (!isInputObjectType(type)) {
	        isValidValueNode(context, node);
	        return false; // Don't traverse further.
	      } // Ensure every required field exists.


	      var fieldNodeMap = keyMap(node.fields, function (field) {
	        return field.name.value;
	      });

	      for (var _i2 = 0, _objectValues2 = objectValues(type.getFields()); _i2 < _objectValues2.length; _i2++) {
	        var fieldDef = _objectValues2[_i2];
	        var fieldNode = fieldNodeMap[fieldDef.name];

	        if (!fieldNode && isRequiredInputField(fieldDef)) {
	          var typeStr = inspect(fieldDef.type);
	          context.reportError(new GraphQLError("Field \"".concat(type.name, ".").concat(fieldDef.name, "\" of required type \"").concat(typeStr, "\" was not provided."), node));
	        }
	      }
	    },
	    ObjectField: function ObjectField(node) {
	      var parentType = getNamedType(context.getParentInputType());
	      var fieldType = context.getInputType();

	      if (!fieldType && isInputObjectType(parentType)) {
	        var suggestions = suggestionList(node.name.value, Object.keys(parentType.getFields()));
	        context.reportError(new GraphQLError("Field \"".concat(node.name.value, "\" is not defined by type \"").concat(parentType.name, "\".") + didYouMean(suggestions), node));
	      }
	    },
	    NullValue: function NullValue(node) {
	      var type = context.getInputType();

	      if (isNonNullType(type)) {
	        context.reportError(new GraphQLError("Expected value of type \"".concat(inspect(type), "\", found ").concat(print(node), "."), node));
	      }
	    },
	    EnumValue: function EnumValue(node) {
	      return isValidValueNode(context, node);
	    },
	    IntValue: function IntValue(node) {
	      return isValidValueNode(context, node);
	    },
	    FloatValue: function FloatValue(node) {
	      return isValidValueNode(context, node);
	    },
	    StringValue: function StringValue(node) {
	      return isValidValueNode(context, node);
	    },
	    BooleanValue: function BooleanValue(node) {
	      return isValidValueNode(context, node);
	    }
	  };
	}
	/**
	 * Any value literal may be a valid representation of a Scalar, depending on
	 * that scalar type.
	 */

	function isValidValueNode(context, node) {
	  // Report any error at the full type expected by the location.
	  var locationType = context.getInputType();

	  if (!locationType) {
	    return;
	  }

	  var type = getNamedType(locationType);

	  if (!isLeafType(type)) {
	    var typeStr = inspect(locationType);
	    context.reportError(new GraphQLError("Expected value of type \"".concat(typeStr, "\", found ").concat(print(node), "."), node));
	    return;
	  } // Scalars and Enums determine if a literal value is valid via parseLiteral(),
	  // which may throw or return an invalid value to indicate failure.


	  try {
	    var parseResult = type.parseLiteral(node, undefined
	    /* variables */
	    );

	    if (parseResult === undefined) {
	      var _typeStr = inspect(locationType);

	      context.reportError(new GraphQLError("Expected value of type \"".concat(_typeStr, "\", found ").concat(print(node), "."), node));
	    }
	  } catch (error) {
	    var _typeStr2 = inspect(locationType);

	    if (error instanceof GraphQLError) {
	      context.reportError(error);
	    } else {
	      context.reportError(new GraphQLError("Expected value of type \"".concat(_typeStr2, "\", found ").concat(print(node), "; ") + error.message, node, undefined, undefined, undefined, error));
	    }
	  }
	}

	function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * Provided required arguments
	 *
	 * A field or directive is only valid if all required (non-null without a
	 * default value) field arguments have been provided.
	 */
	function ProvidedRequiredArgumentsRule(context) {
	  return _objectSpread$1(_objectSpread$1({}, ProvidedRequiredArgumentsOnDirectivesRule(context)), {}, {
	    Field: {
	      // Validate on leave to allow for deeper errors to appear first.
	      leave: function leave(fieldNode) {
	        var _fieldNode$arguments;

	        var fieldDef = context.getFieldDef();

	        if (!fieldDef) {
	          return false;
	        } // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')


	        var argNodes = (_fieldNode$arguments = fieldNode.arguments) !== null && _fieldNode$arguments !== void 0 ? _fieldNode$arguments : [];
	        var argNodeMap = keyMap(argNodes, function (arg) {
	          return arg.name.value;
	        });

	        for (var _i2 = 0, _fieldDef$args2 = fieldDef.args; _i2 < _fieldDef$args2.length; _i2++) {
	          var argDef = _fieldDef$args2[_i2];
	          var argNode = argNodeMap[argDef.name];

	          if (!argNode && isRequiredArgument(argDef)) {
	            var argTypeStr = inspect(argDef.type);
	            context.reportError(new GraphQLError("Field \"".concat(fieldDef.name, "\" argument \"").concat(argDef.name, "\" of type \"").concat(argTypeStr, "\" is required, but it was not provided."), fieldNode));
	          }
	        }
	      }
	    }
	  });
	}
	/**
	 * @internal
	 */

	function ProvidedRequiredArgumentsOnDirectivesRule(context) {
	  var requiredArgsMap = Object.create(null);
	  var schema = context.getSchema();
	  var definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;

	  for (var _i4 = 0; _i4 < definedDirectives.length; _i4++) {
	    var directive = definedDirectives[_i4];
	    requiredArgsMap[directive.name] = keyMap(directive.args.filter(isRequiredArgument), function (arg) {
	      return arg.name;
	    });
	  }

	  var astDefinitions = context.getDocument().definitions;

	  for (var _i6 = 0; _i6 < astDefinitions.length; _i6++) {
	    var def = astDefinitions[_i6];

	    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
	      var _def$arguments;

	      // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')
	      var argNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== void 0 ? _def$arguments : [];
	      requiredArgsMap[def.name.value] = keyMap(argNodes.filter(isRequiredArgumentNode), function (arg) {
	        return arg.name.value;
	      });
	    }
	  }

	  return {
	    Directive: {
	      // Validate on leave to allow for deeper errors to appear first.
	      leave: function leave(directiveNode) {
	        var directiveName = directiveNode.name.value;
	        var requiredArgs = requiredArgsMap[directiveName];

	        if (requiredArgs) {
	          var _directiveNode$argume;

	          // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')
	          var _argNodes = (_directiveNode$argume = directiveNode.arguments) !== null && _directiveNode$argume !== void 0 ? _directiveNode$argume : [];

	          var argNodeMap = keyMap(_argNodes, function (arg) {
	            return arg.name.value;
	          });

	          for (var _i8 = 0, _Object$keys2 = Object.keys(requiredArgs); _i8 < _Object$keys2.length; _i8++) {
	            var argName = _Object$keys2[_i8];

	            if (!argNodeMap[argName]) {
	              var argType = requiredArgs[argName].type;
	              var argTypeStr = isType(argType) ? inspect(argType) : print(argType);
	              context.reportError(new GraphQLError("Directive \"@".concat(directiveName, "\" argument \"").concat(argName, "\" of type \"").concat(argTypeStr, "\" is required, but it was not provided."), directiveNode));
	            }
	          }
	        }
	      }
	    }
	  };
	}

	function isRequiredArgumentNode(arg) {
	  return arg.type.kind === Kind.NON_NULL_TYPE && arg.defaultValue == null;
	}

	/**
	 * Variables passed to field arguments conform to type
	 */
	function VariablesInAllowedPositionRule(context) {
	  var varDefMap = Object.create(null);
	  return {
	    OperationDefinition: {
	      enter: function enter() {
	        varDefMap = Object.create(null);
	      },
	      leave: function leave(operation) {
	        var usages = context.getRecursiveVariableUsages(operation);

	        for (var _i2 = 0; _i2 < usages.length; _i2++) {
	          var _ref2 = usages[_i2];
	          var node = _ref2.node;
	          var type = _ref2.type;
	          var defaultValue = _ref2.defaultValue;
	          var varName = node.name.value;
	          var varDef = varDefMap[varName];

	          if (varDef && type) {
	            // A var type is allowed if it is the same or more strict (e.g. is
	            // a subtype of) than the expected type. It can be more strict if
	            // the variable type is non-null when the expected type is nullable.
	            // If both are list types, the variable item type can be more strict
	            // than the expected item type (contravariant).
	            var schema = context.getSchema();
	            var varType = typeFromAST(schema, varDef.type);

	            if (varType && !allowedVariableUsage(schema, varType, varDef.defaultValue, type, defaultValue)) {
	              var varTypeStr = inspect(varType);
	              var typeStr = inspect(type);
	              context.reportError(new GraphQLError("Variable \"$".concat(varName, "\" of type \"").concat(varTypeStr, "\" used in position expecting type \"").concat(typeStr, "\"."), [varDef, node]));
	            }
	          }
	        }
	      }
	    },
	    VariableDefinition: function VariableDefinition(node) {
	      varDefMap[node.variable.name.value] = node;
	    }
	  };
	}
	/**
	 * Returns true if the variable is allowed in the location it was found,
	 * which includes considering if default values exist for either the variable
	 * or the location at which it is located.
	 */

	function allowedVariableUsage(schema, varType, varDefaultValue, locationType, locationDefaultValue) {
	  if (isNonNullType(locationType) && !isNonNullType(varType)) {
	    var hasNonNullVariableDefaultValue = varDefaultValue != null && varDefaultValue.kind !== Kind.NULL;
	    var hasLocationDefaultValue = locationDefaultValue !== undefined;

	    if (!hasNonNullVariableDefaultValue && !hasLocationDefaultValue) {
	      return false;
	    }

	    var nullableLocationType = locationType.ofType;
	    return isTypeSubTypeOf(schema, varType, nullableLocationType);
	  }

	  return isTypeSubTypeOf(schema, varType, locationType);
	}

	function reasonMessage(reason) {
	  if (Array.isArray(reason)) {
	    return reason.map(function (_ref) {
	      var responseName = _ref[0],
	          subReason = _ref[1];
	      return "subfields \"".concat(responseName, "\" conflict because ") + reasonMessage(subReason);
	    }).join(' and ');
	  }

	  return reason;
	}
	/**
	 * Overlapping fields can be merged
	 *
	 * A selection set is only valid if all fields (including spreading any
	 * fragments) either correspond to distinct response names or can be merged
	 * without ambiguity.
	 */


	function OverlappingFieldsCanBeMergedRule(context) {
	  // A memoization for when two fragments are compared "between" each other for
	  // conflicts. Two fragments may be compared many times, so memoizing this can
	  // dramatically improve the performance of this validator.
	  var comparedFragmentPairs = new PairSet(); // A cache for the "field map" and list of fragment names found in any given
	  // selection set. Selection sets may be asked for this information multiple
	  // times, so this improves the performance of this validator.

	  var cachedFieldsAndFragmentNames = new Map();
	  return {
	    SelectionSet: function SelectionSet(selectionSet) {
	      var conflicts = findConflictsWithinSelectionSet(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, context.getParentType(), selectionSet);

	      for (var _i2 = 0; _i2 < conflicts.length; _i2++) {
	        var _ref3 = conflicts[_i2];
	        var _ref2$ = _ref3[0];
	        var responseName = _ref2$[0];
	        var reason = _ref2$[1];
	        var fields1 = _ref3[1];
	        var fields2 = _ref3[2];
	        var reasonMsg = reasonMessage(reason);
	        context.reportError(new GraphQLError("Fields \"".concat(responseName, "\" conflict because ").concat(reasonMsg, ". Use different aliases on the fields to fetch both if this was intentional."), fields1.concat(fields2)));
	      }
	    }
	  };
	}

	/**
	 * Algorithm:
	 *
	 * Conflicts occur when two fields exist in a query which will produce the same
	 * response name, but represent differing values, thus creating a conflict.
	 * The algorithm below finds all conflicts via making a series of comparisons
	 * between fields. In order to compare as few fields as possible, this makes
	 * a series of comparisons "within" sets of fields and "between" sets of fields.
	 *
	 * Given any selection set, a collection produces both a set of fields by
	 * also including all inline fragments, as well as a list of fragments
	 * referenced by fragment spreads.
	 *
	 * A) Each selection set represented in the document first compares "within" its
	 * collected set of fields, finding any conflicts between every pair of
	 * overlapping fields.
	 * Note: This is the *only time* that a the fields "within" a set are compared
	 * to each other. After this only fields "between" sets are compared.
	 *
	 * B) Also, if any fragment is referenced in a selection set, then a
	 * comparison is made "between" the original set of fields and the
	 * referenced fragment.
	 *
	 * C) Also, if multiple fragments are referenced, then comparisons
	 * are made "between" each referenced fragment.
	 *
	 * D) When comparing "between" a set of fields and a referenced fragment, first
	 * a comparison is made between each field in the original set of fields and
	 * each field in the the referenced set of fields.
	 *
	 * E) Also, if any fragment is referenced in the referenced selection set,
	 * then a comparison is made "between" the original set of fields and the
	 * referenced fragment (recursively referring to step D).
	 *
	 * F) When comparing "between" two fragments, first a comparison is made between
	 * each field in the first referenced set of fields and each field in the the
	 * second referenced set of fields.
	 *
	 * G) Also, any fragments referenced by the first must be compared to the
	 * second, and any fragments referenced by the second must be compared to the
	 * first (recursively referring to step F).
	 *
	 * H) When comparing two fields, if both have selection sets, then a comparison
	 * is made "between" both selection sets, first comparing the set of fields in
	 * the first selection set with the set of fields in the second.
	 *
	 * I) Also, if any fragment is referenced in either selection set, then a
	 * comparison is made "between" the other set of fields and the
	 * referenced fragment.
	 *
	 * J) Also, if two fragments are referenced in both selection sets, then a
	 * comparison is made "between" the two fragments.
	 *
	 */
	// Find all conflicts found "within" a selection set, including those found
	// via spreading in fragments. Called when visiting each SelectionSet in the
	// GraphQL Document.
	function findConflictsWithinSelectionSet(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentType, selectionSet) {
	  var conflicts = [];

	  var _getFieldsAndFragment = getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType, selectionSet),
	      fieldMap = _getFieldsAndFragment[0],
	      fragmentNames = _getFieldsAndFragment[1]; // (A) Find find all conflicts "within" the fields of this selection set.
	  // Note: this is the *only place* `collectConflictsWithin` is called.


	  collectConflictsWithin(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, fieldMap);

	  if (fragmentNames.length !== 0) {
	    // (B) Then collect conflicts between these fields and those represented by
	    // each spread fragment name found.
	    for (var i = 0; i < fragmentNames.length; i++) {
	      collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, false, fieldMap, fragmentNames[i]); // (C) Then compare this fragment with all other fragments found in this
	      // selection set to collect conflicts between fragments spread together.
	      // This compares each item in the list of fragment names to every other
	      // item in that same list (except for itself).

	      for (var j = i + 1; j < fragmentNames.length; j++) {
	        collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, false, fragmentNames[i], fragmentNames[j]);
	      }
	    }
	  }

	  return conflicts;
	} // Collect all conflicts found between a set of fields and a fragment reference
	// including via spreading in any nested fragments.


	function collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fragmentName) {
	  var fragment = context.getFragment(fragmentName);

	  if (!fragment) {
	    return;
	  }

	  var _getReferencedFieldsA = getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment),
	      fieldMap2 = _getReferencedFieldsA[0],
	      fragmentNames2 = _getReferencedFieldsA[1]; // Do not compare a fragment's fieldMap to itself.


	  if (fieldMap === fieldMap2) {
	    return;
	  } // (D) First collect any conflicts between the provided collection of fields
	  // and the collection of fields represented by the given fragment.


	  collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fieldMap2); // (E) Then collect any conflicts between the provided collection of fields
	  // and any fragment names found in the given fragment.

	  for (var i = 0; i < fragmentNames2.length; i++) {
	    collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fragmentNames2[i]);
	  }
	} // Collect all conflicts found between two fragments, including via spreading in
	// any nested fragments.


	function collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentName1, fragmentName2) {
	  // No need to compare a fragment to itself.
	  if (fragmentName1 === fragmentName2) {
	    return;
	  } // Memoize so two fragments are not compared for conflicts more than once.


	  if (comparedFragmentPairs.has(fragmentName1, fragmentName2, areMutuallyExclusive)) {
	    return;
	  }

	  comparedFragmentPairs.add(fragmentName1, fragmentName2, areMutuallyExclusive);
	  var fragment1 = context.getFragment(fragmentName1);
	  var fragment2 = context.getFragment(fragmentName2);

	  if (!fragment1 || !fragment2) {
	    return;
	  }

	  var _getReferencedFieldsA2 = getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment1),
	      fieldMap1 = _getReferencedFieldsA2[0],
	      fragmentNames1 = _getReferencedFieldsA2[1];

	  var _getReferencedFieldsA3 = getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment2),
	      fieldMap2 = _getReferencedFieldsA3[0],
	      fragmentNames2 = _getReferencedFieldsA3[1]; // (F) First, collect all conflicts between these two collections of fields
	  // (not including any nested fragments).


	  collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap1, fieldMap2); // (G) Then collect conflicts between the first fragment and any nested
	  // fragments spread in the second fragment.

	  for (var j = 0; j < fragmentNames2.length; j++) {
	    collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentName1, fragmentNames2[j]);
	  } // (G) Then collect conflicts between the second fragment and any nested
	  // fragments spread in the first fragment.


	  for (var i = 0; i < fragmentNames1.length; i++) {
	    collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentNames1[i], fragmentName2);
	  }
	} // Find all conflicts found between two selection sets, including those found
	// via spreading in fragments. Called when determining if conflicts exist
	// between the sub-fields of two overlapping fields.


	function findConflictsBetweenSubSelectionSets(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, parentType1, selectionSet1, parentType2, selectionSet2) {
	  var conflicts = [];

	  var _getFieldsAndFragment2 = getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType1, selectionSet1),
	      fieldMap1 = _getFieldsAndFragment2[0],
	      fragmentNames1 = _getFieldsAndFragment2[1];

	  var _getFieldsAndFragment3 = getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType2, selectionSet2),
	      fieldMap2 = _getFieldsAndFragment3[0],
	      fragmentNames2 = _getFieldsAndFragment3[1]; // (H) First, collect all conflicts between these two collections of field.


	  collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap1, fieldMap2); // (I) Then collect conflicts between the first collection of fields and
	  // those referenced by each fragment name associated with the second.

	  if (fragmentNames2.length !== 0) {
	    for (var j = 0; j < fragmentNames2.length; j++) {
	      collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap1, fragmentNames2[j]);
	    }
	  } // (I) Then collect conflicts between the second collection of fields and
	  // those referenced by each fragment name associated with the first.


	  if (fragmentNames1.length !== 0) {
	    for (var i = 0; i < fragmentNames1.length; i++) {
	      collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap2, fragmentNames1[i]);
	    }
	  } // (J) Also collect conflicts between any fragment names by the first and
	  // fragment names by the second. This compares each item in the first set of
	  // names to each item in the second set of names.


	  for (var _i3 = 0; _i3 < fragmentNames1.length; _i3++) {
	    for (var _j = 0; _j < fragmentNames2.length; _j++) {
	      collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentNames1[_i3], fragmentNames2[_j]);
	    }
	  }

	  return conflicts;
	} // Collect all Conflicts "within" one collection of fields.


	function collectConflictsWithin(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, fieldMap) {
	  // A field map is a keyed collection, where each key represents a response
	  // name and the value at that key is a list of all fields which provide that
	  // response name. For every response name, if there are multiple fields, they
	  // must be compared to find a potential conflict.
	  for (var _i5 = 0, _objectEntries2 = objectEntries(fieldMap); _i5 < _objectEntries2.length; _i5++) {
	    var _ref5 = _objectEntries2[_i5];
	    var responseName = _ref5[0];
	    var fields = _ref5[1];

	    // This compares every field in the list to every other field in this list
	    // (except to itself). If the list only has one item, nothing needs to
	    // be compared.
	    if (fields.length > 1) {
	      for (var i = 0; i < fields.length; i++) {
	        for (var j = i + 1; j < fields.length; j++) {
	          var conflict = findConflict(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, false, // within one collection is never mutually exclusive
	          responseName, fields[i], fields[j]);

	          if (conflict) {
	            conflicts.push(conflict);
	          }
	        }
	      }
	    }
	  }
	} // Collect all Conflicts between two collections of fields. This is similar to,
	// but different from the `collectConflictsWithin` function above. This check
	// assumes that `collectConflictsWithin` has already been called on each
	// provided collection of fields. This is true because this validator traverses
	// each individual selection set.


	function collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, fieldMap1, fieldMap2) {
	  // A field map is a keyed collection, where each key represents a response
	  // name and the value at that key is a list of all fields which provide that
	  // response name. For any response name which appears in both provided field
	  // maps, each field from the first field map must be compared to every field
	  // in the second field map to find potential conflicts.
	  for (var _i7 = 0, _Object$keys2 = Object.keys(fieldMap1); _i7 < _Object$keys2.length; _i7++) {
	    var responseName = _Object$keys2[_i7];
	    var fields2 = fieldMap2[responseName];

	    if (fields2) {
	      var fields1 = fieldMap1[responseName];

	      for (var i = 0; i < fields1.length; i++) {
	        for (var j = 0; j < fields2.length; j++) {
	          var conflict = findConflict(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, responseName, fields1[i], fields2[j]);

	          if (conflict) {
	            conflicts.push(conflict);
	          }
	        }
	      }
	    }
	  }
	} // Determines if there is a conflict between two particular fields, including
	// comparing their sub-fields.


	function findConflict(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, responseName, field1, field2) {
	  var parentType1 = field1[0],
	      node1 = field1[1],
	      def1 = field1[2];
	  var parentType2 = field2[0],
	      node2 = field2[1],
	      def2 = field2[2]; // If it is known that two fields could not possibly apply at the same
	  // time, due to the parent types, then it is safe to permit them to diverge
	  // in aliased field or arguments used as they will not present any ambiguity
	  // by differing.
	  // It is known that two parent types could never overlap if they are
	  // different Object types. Interface or Union types might overlap - if not
	  // in the current state of the schema, then perhaps in some future version,
	  // thus may not safely diverge.

	  var areMutuallyExclusive = parentFieldsAreMutuallyExclusive || parentType1 !== parentType2 && isObjectType(parentType1) && isObjectType(parentType2);

	  if (!areMutuallyExclusive) {
	    var _node1$arguments, _node2$arguments;

	    // Two aliases must refer to the same field.
	    var name1 = node1.name.value;
	    var name2 = node2.name.value;

	    if (name1 !== name2) {
	      return [[responseName, "\"".concat(name1, "\" and \"").concat(name2, "\" are different fields")], [node1], [node2]];
	    } // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')


	    var args1 = (_node1$arguments = node1.arguments) !== null && _node1$arguments !== void 0 ? _node1$arguments : []; // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')

	    var args2 = (_node2$arguments = node2.arguments) !== null && _node2$arguments !== void 0 ? _node2$arguments : []; // Two field calls must have the same arguments.

	    if (!sameArguments(args1, args2)) {
	      return [[responseName, 'they have differing arguments'], [node1], [node2]];
	    }
	  } // The return type for each field.


	  var type1 = def1 === null || def1 === void 0 ? void 0 : def1.type;
	  var type2 = def2 === null || def2 === void 0 ? void 0 : def2.type;

	  if (type1 && type2 && doTypesConflict(type1, type2)) {
	    return [[responseName, "they return conflicting types \"".concat(inspect(type1), "\" and \"").concat(inspect(type2), "\"")], [node1], [node2]];
	  } // Collect and compare sub-fields. Use the same "visited fragment names" list
	  // for both collections so fields in a fragment reference are never
	  // compared to themselves.


	  var selectionSet1 = node1.selectionSet;
	  var selectionSet2 = node2.selectionSet;

	  if (selectionSet1 && selectionSet2) {
	    var conflicts = findConflictsBetweenSubSelectionSets(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, getNamedType(type1), selectionSet1, getNamedType(type2), selectionSet2);
	    return subfieldConflicts(conflicts, responseName, node1, node2);
	  }
	}

	function sameArguments(arguments1, arguments2) {
	  if (arguments1.length !== arguments2.length) {
	    return false;
	  }

	  return arguments1.every(function (argument1) {
	    var argument2 = find(arguments2, function (argument) {
	      return argument.name.value === argument1.name.value;
	    });

	    if (!argument2) {
	      return false;
	    }

	    return sameValue(argument1.value, argument2.value);
	  });
	}

	function sameValue(value1, value2) {
	  return print(value1) === print(value2);
	} // Two types conflict if both types could not apply to a value simultaneously.
	// Composite types are ignored as their individual field types will be compared
	// later recursively. However List and Non-Null types must match.


	function doTypesConflict(type1, type2) {
	  if (isListType(type1)) {
	    return isListType(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
	  }

	  if (isListType(type2)) {
	    return true;
	  }

	  if (isNonNullType(type1)) {
	    return isNonNullType(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
	  }

	  if (isNonNullType(type2)) {
	    return true;
	  }

	  if (isLeafType(type1) || isLeafType(type2)) {
	    return type1 !== type2;
	  }

	  return false;
	} // Given a selection set, return the collection of fields (a mapping of response
	// name to field nodes and definitions) as well as a list of fragment names
	// referenced via fragment spreads.


	function getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType, selectionSet) {
	  var cached = cachedFieldsAndFragmentNames.get(selectionSet);

	  if (!cached) {
	    var nodeAndDefs = Object.create(null);
	    var fragmentNames = Object.create(null);

	    _collectFieldsAndFragmentNames(context, parentType, selectionSet, nodeAndDefs, fragmentNames);

	    cached = [nodeAndDefs, Object.keys(fragmentNames)];
	    cachedFieldsAndFragmentNames.set(selectionSet, cached);
	  }

	  return cached;
	} // Given a reference to a fragment, return the represented collection of fields
	// as well as a list of nested fragment names referenced via fragment spreads.


	function getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment) {
	  // Short-circuit building a type from the node if possible.
	  var cached = cachedFieldsAndFragmentNames.get(fragment.selectionSet);

	  if (cached) {
	    return cached;
	  }

	  var fragmentType = typeFromAST(context.getSchema(), fragment.typeCondition);
	  return getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragmentType, fragment.selectionSet);
	}

	function _collectFieldsAndFragmentNames(context, parentType, selectionSet, nodeAndDefs, fragmentNames) {
	  for (var _i9 = 0, _selectionSet$selecti2 = selectionSet.selections; _i9 < _selectionSet$selecti2.length; _i9++) {
	    var selection = _selectionSet$selecti2[_i9];

	    switch (selection.kind) {
	      case Kind.FIELD:
	        {
	          var fieldName = selection.name.value;
	          var fieldDef = void 0;

	          if (isObjectType(parentType) || isInterfaceType(parentType)) {
	            fieldDef = parentType.getFields()[fieldName];
	          }

	          var responseName = selection.alias ? selection.alias.value : fieldName;

	          if (!nodeAndDefs[responseName]) {
	            nodeAndDefs[responseName] = [];
	          }

	          nodeAndDefs[responseName].push([parentType, selection, fieldDef]);
	          break;
	        }

	      case Kind.FRAGMENT_SPREAD:
	        fragmentNames[selection.name.value] = true;
	        break;

	      case Kind.INLINE_FRAGMENT:
	        {
	          var typeCondition = selection.typeCondition;
	          var inlineFragmentType = typeCondition ? typeFromAST(context.getSchema(), typeCondition) : parentType;

	          _collectFieldsAndFragmentNames(context, inlineFragmentType, selection.selectionSet, nodeAndDefs, fragmentNames);

	          break;
	        }
	    }
	  }
	} // Given a series of Conflicts which occurred between two sub-fields, generate
	// a single Conflict.


	function subfieldConflicts(conflicts, responseName, node1, node2) {
	  if (conflicts.length > 0) {
	    return [[responseName, conflicts.map(function (_ref6) {
	      var reason = _ref6[0];
	      return reason;
	    })], conflicts.reduce(function (allFields, _ref7) {
	      var fields1 = _ref7[1];
	      return allFields.concat(fields1);
	    }, [node1]), conflicts.reduce(function (allFields, _ref8) {
	      var fields2 = _ref8[2];
	      return allFields.concat(fields2);
	    }, [node2])];
	  }
	}
	/**
	 * A way to keep track of pairs of things when the ordering of the pair does
	 * not matter. We do this by maintaining a sort of double adjacency sets.
	 */


	var PairSet = /*#__PURE__*/function () {
	  function PairSet() {
	    this._data = Object.create(null);
	  }

	  var _proto = PairSet.prototype;

	  _proto.has = function has(a, b, areMutuallyExclusive) {
	    var first = this._data[a];
	    var result = first && first[b];

	    if (result === undefined) {
	      return false;
	    } // areMutuallyExclusive being false is a superset of being true,
	    // hence if we want to know if this PairSet "has" these two with no
	    // exclusivity, we have to ensure it was added as such.


	    if (areMutuallyExclusive === false) {
	      return result === false;
	    }

	    return true;
	  };

	  _proto.add = function add(a, b, areMutuallyExclusive) {
	    this._pairSetAdd(a, b, areMutuallyExclusive);

	    this._pairSetAdd(b, a, areMutuallyExclusive);
	  };

	  _proto._pairSetAdd = function _pairSetAdd(a, b, areMutuallyExclusive) {
	    var map = this._data[a];

	    if (!map) {
	      map = Object.create(null);
	      this._data[a] = map;
	    }

	    map[b] = areMutuallyExclusive;
	  };

	  return PairSet;
	}();

	/**
	 * Unique input field names
	 *
	 * A GraphQL input object value is only valid if all supplied fields are
	 * uniquely named.
	 */
	function UniqueInputFieldNamesRule(context) {
	  var knownNameStack = [];
	  var knownNames = Object.create(null);
	  return {
	    ObjectValue: {
	      enter: function enter() {
	        knownNameStack.push(knownNames);
	        knownNames = Object.create(null);
	      },
	      leave: function leave() {
	        knownNames = knownNameStack.pop();
	      }
	    },
	    ObjectField: function ObjectField(node) {
	      var fieldName = node.name.value;

	      if (knownNames[fieldName]) {
	        context.reportError(new GraphQLError("There can be only one input field named \"".concat(fieldName, "\"."), [knownNames[fieldName], node.name]));
	      } else {
	        knownNames[fieldName] = node.name;
	      }
	    }
	  };
	}

	/**
	 * Lone Schema definition
	 *
	 * A GraphQL document is only valid if it contains only one schema definition.
	 */
	function LoneSchemaDefinitionRule(context) {
	  var _ref, _ref2, _oldSchema$astNode;

	  var oldSchema = context.getSchema();
	  var alreadyDefined = (_ref = (_ref2 = (_oldSchema$astNode = oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.astNode) !== null && _oldSchema$astNode !== void 0 ? _oldSchema$astNode : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getQueryType()) !== null && _ref2 !== void 0 ? _ref2 : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getMutationType()) !== null && _ref !== void 0 ? _ref : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getSubscriptionType();
	  var schemaDefinitionsCount = 0;
	  return {
	    SchemaDefinition: function SchemaDefinition(node) {
	      if (alreadyDefined) {
	        context.reportError(new GraphQLError('Cannot define a new schema within a schema extension.', node));
	        return;
	      }

	      if (schemaDefinitionsCount > 0) {
	        context.reportError(new GraphQLError('Must provide only one schema definition.', node));
	      }

	      ++schemaDefinitionsCount;
	    }
	  };
	}

	/**
	 * Unique operation types
	 *
	 * A GraphQL document is only valid if it has only one type per operation.
	 */
	function UniqueOperationTypesRule(context) {
	  var schema = context.getSchema();
	  var definedOperationTypes = Object.create(null);
	  var existingOperationTypes = schema ? {
	    query: schema.getQueryType(),
	    mutation: schema.getMutationType(),
	    subscription: schema.getSubscriptionType()
	  } : {};
	  return {
	    SchemaDefinition: checkOperationTypes,
	    SchemaExtension: checkOperationTypes
	  };

	  function checkOperationTypes(node) {
	    var _node$operationTypes;

	    // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')
	    var operationTypesNodes = (_node$operationTypes = node.operationTypes) !== null && _node$operationTypes !== void 0 ? _node$operationTypes : [];

	    for (var _i2 = 0; _i2 < operationTypesNodes.length; _i2++) {
	      var operationType = operationTypesNodes[_i2];
	      var operation = operationType.operation;
	      var alreadyDefinedOperationType = definedOperationTypes[operation];

	      if (existingOperationTypes[operation]) {
	        context.reportError(new GraphQLError("Type for ".concat(operation, " already defined in the schema. It cannot be redefined."), operationType));
	      } else if (alreadyDefinedOperationType) {
	        context.reportError(new GraphQLError("There can be only one ".concat(operation, " type in schema."), [alreadyDefinedOperationType, operationType]));
	      } else {
	        definedOperationTypes[operation] = operationType;
	      }
	    }

	    return false;
	  }
	}

	/**
	 * Unique type names
	 *
	 * A GraphQL document is only valid if all defined types have unique names.
	 */
	function UniqueTypeNamesRule(context) {
	  var knownTypeNames = Object.create(null);
	  var schema = context.getSchema();
	  return {
	    ScalarTypeDefinition: checkTypeName,
	    ObjectTypeDefinition: checkTypeName,
	    InterfaceTypeDefinition: checkTypeName,
	    UnionTypeDefinition: checkTypeName,
	    EnumTypeDefinition: checkTypeName,
	    InputObjectTypeDefinition: checkTypeName
	  };

	  function checkTypeName(node) {
	    var typeName = node.name.value;

	    if (schema === null || schema === void 0 ? void 0 : schema.getType(typeName)) {
	      context.reportError(new GraphQLError("Type \"".concat(typeName, "\" already exists in the schema. It cannot also be defined in this type definition."), node.name));
	      return;
	    }

	    if (knownTypeNames[typeName]) {
	      context.reportError(new GraphQLError("There can be only one type named \"".concat(typeName, "\"."), [knownTypeNames[typeName], node.name]));
	    } else {
	      knownTypeNames[typeName] = node.name;
	    }

	    return false;
	  }
	}

	/**
	 * Unique enum value names
	 *
	 * A GraphQL enum type is only valid if all its values are uniquely named.
	 */
	function UniqueEnumValueNamesRule(context) {
	  var schema = context.getSchema();
	  var existingTypeMap = schema ? schema.getTypeMap() : Object.create(null);
	  var knownValueNames = Object.create(null);
	  return {
	    EnumTypeDefinition: checkValueUniqueness,
	    EnumTypeExtension: checkValueUniqueness
	  };

	  function checkValueUniqueness(node) {
	    var _node$values;

	    var typeName = node.name.value;

	    if (!knownValueNames[typeName]) {
	      knownValueNames[typeName] = Object.create(null);
	    } // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')


	    var valueNodes = (_node$values = node.values) !== null && _node$values !== void 0 ? _node$values : [];
	    var valueNames = knownValueNames[typeName];

	    for (var _i2 = 0; _i2 < valueNodes.length; _i2++) {
	      var valueDef = valueNodes[_i2];
	      var valueName = valueDef.name.value;
	      var existingType = existingTypeMap[typeName];

	      if (isEnumType(existingType) && existingType.getValue(valueName)) {
	        context.reportError(new GraphQLError("Enum value \"".concat(typeName, ".").concat(valueName, "\" already exists in the schema. It cannot also be defined in this type extension."), valueDef.name));
	      } else if (valueNames[valueName]) {
	        context.reportError(new GraphQLError("Enum value \"".concat(typeName, ".").concat(valueName, "\" can only be defined once."), [valueNames[valueName], valueDef.name]));
	      } else {
	        valueNames[valueName] = valueDef.name;
	      }
	    }

	    return false;
	  }
	}

	/**
	 * Unique field definition names
	 *
	 * A GraphQL complex type is only valid if all its fields are uniquely named.
	 */
	function UniqueFieldDefinitionNamesRule(context) {
	  var schema = context.getSchema();
	  var existingTypeMap = schema ? schema.getTypeMap() : Object.create(null);
	  var knownFieldNames = Object.create(null);
	  return {
	    InputObjectTypeDefinition: checkFieldUniqueness,
	    InputObjectTypeExtension: checkFieldUniqueness,
	    InterfaceTypeDefinition: checkFieldUniqueness,
	    InterfaceTypeExtension: checkFieldUniqueness,
	    ObjectTypeDefinition: checkFieldUniqueness,
	    ObjectTypeExtension: checkFieldUniqueness
	  };

	  function checkFieldUniqueness(node) {
	    var _node$fields;

	    var typeName = node.name.value;

	    if (!knownFieldNames[typeName]) {
	      knownFieldNames[typeName] = Object.create(null);
	    } // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')


	    var fieldNodes = (_node$fields = node.fields) !== null && _node$fields !== void 0 ? _node$fields : [];
	    var fieldNames = knownFieldNames[typeName];

	    for (var _i2 = 0; _i2 < fieldNodes.length; _i2++) {
	      var fieldDef = fieldNodes[_i2];
	      var fieldName = fieldDef.name.value;

	      if (hasField(existingTypeMap[typeName], fieldName)) {
	        context.reportError(new GraphQLError("Field \"".concat(typeName, ".").concat(fieldName, "\" already exists in the schema. It cannot also be defined in this type extension."), fieldDef.name));
	      } else if (fieldNames[fieldName]) {
	        context.reportError(new GraphQLError("Field \"".concat(typeName, ".").concat(fieldName, "\" can only be defined once."), [fieldNames[fieldName], fieldDef.name]));
	      } else {
	        fieldNames[fieldName] = fieldDef.name;
	      }
	    }

	    return false;
	  }
	}

	function hasField(type, fieldName) {
	  if (isObjectType(type) || isInterfaceType(type) || isInputObjectType(type)) {
	    return type.getFields()[fieldName] != null;
	  }

	  return false;
	}

	/**
	 * Unique directive names
	 *
	 * A GraphQL document is only valid if all defined directives have unique names.
	 */
	function UniqueDirectiveNamesRule(context) {
	  var knownDirectiveNames = Object.create(null);
	  var schema = context.getSchema();
	  return {
	    DirectiveDefinition: function DirectiveDefinition(node) {
	      var directiveName = node.name.value;

	      if (schema === null || schema === void 0 ? void 0 : schema.getDirective(directiveName)) {
	        context.reportError(new GraphQLError("Directive \"@".concat(directiveName, "\" already exists in the schema. It cannot be redefined."), node.name));
	        return;
	      }

	      if (knownDirectiveNames[directiveName]) {
	        context.reportError(new GraphQLError("There can be only one directive named \"@".concat(directiveName, "\"."), [knownDirectiveNames[directiveName], node.name]));
	      } else {
	        knownDirectiveNames[directiveName] = node.name;
	      }

	      return false;
	    }
	  };
	}

	var _defKindToExtKind;

	function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * Possible type extension
	 *
	 * A type extension is only valid if the type is defined and has the same kind.
	 */
	function PossibleTypeExtensionsRule(context) {
	  var schema = context.getSchema();
	  var definedTypes = Object.create(null);

	  for (var _i2 = 0, _context$getDocument$2 = context.getDocument().definitions; _i2 < _context$getDocument$2.length; _i2++) {
	    var def = _context$getDocument$2[_i2];

	    if (isTypeDefinitionNode(def)) {
	      definedTypes[def.name.value] = def;
	    }
	  }

	  return {
	    ScalarTypeExtension: checkExtension,
	    ObjectTypeExtension: checkExtension,
	    InterfaceTypeExtension: checkExtension,
	    UnionTypeExtension: checkExtension,
	    EnumTypeExtension: checkExtension,
	    InputObjectTypeExtension: checkExtension
	  };

	  function checkExtension(node) {
	    var typeName = node.name.value;
	    var defNode = definedTypes[typeName];
	    var existingType = schema === null || schema === void 0 ? void 0 : schema.getType(typeName);
	    var expectedKind;

	    if (defNode) {
	      expectedKind = defKindToExtKind[defNode.kind];
	    } else if (existingType) {
	      expectedKind = typeToExtKind(existingType);
	    }

	    if (expectedKind) {
	      if (expectedKind !== node.kind) {
	        var kindStr = extensionKindToTypeName(node.kind);
	        context.reportError(new GraphQLError("Cannot extend non-".concat(kindStr, " type \"").concat(typeName, "\"."), defNode ? [defNode, node] : node));
	      }
	    } else {
	      var allTypeNames = Object.keys(definedTypes);

	      if (schema) {
	        allTypeNames = allTypeNames.concat(Object.keys(schema.getTypeMap()));
	      }

	      var suggestedTypes = suggestionList(typeName, allTypeNames);
	      context.reportError(new GraphQLError("Cannot extend type \"".concat(typeName, "\" because it is not defined.") + didYouMean(suggestedTypes), node.name));
	    }
	  }
	}
	var defKindToExtKind = (_defKindToExtKind = {}, _defineProperty$2(_defKindToExtKind, Kind.SCALAR_TYPE_DEFINITION, Kind.SCALAR_TYPE_EXTENSION), _defineProperty$2(_defKindToExtKind, Kind.OBJECT_TYPE_DEFINITION, Kind.OBJECT_TYPE_EXTENSION), _defineProperty$2(_defKindToExtKind, Kind.INTERFACE_TYPE_DEFINITION, Kind.INTERFACE_TYPE_EXTENSION), _defineProperty$2(_defKindToExtKind, Kind.UNION_TYPE_DEFINITION, Kind.UNION_TYPE_EXTENSION), _defineProperty$2(_defKindToExtKind, Kind.ENUM_TYPE_DEFINITION, Kind.ENUM_TYPE_EXTENSION), _defineProperty$2(_defKindToExtKind, Kind.INPUT_OBJECT_TYPE_DEFINITION, Kind.INPUT_OBJECT_TYPE_EXTENSION), _defKindToExtKind);

	function typeToExtKind(type) {
	  if (isScalarType(type)) {
	    return Kind.SCALAR_TYPE_EXTENSION;
	  }

	  if (isObjectType(type)) {
	    return Kind.OBJECT_TYPE_EXTENSION;
	  }

	  if (isInterfaceType(type)) {
	    return Kind.INTERFACE_TYPE_EXTENSION;
	  }

	  if (isUnionType(type)) {
	    return Kind.UNION_TYPE_EXTENSION;
	  }

	  if (isEnumType(type)) {
	    return Kind.ENUM_TYPE_EXTENSION;
	  } // istanbul ignore else (See: 'https://github.com/graphql/graphql-js/issues/2618')


	  if (isInputObjectType(type)) {
	    return Kind.INPUT_OBJECT_TYPE_EXTENSION;
	  } // istanbul ignore next (Not reachable. All possible types have been considered)


	   invariant(0, 'Unexpected type: ' + inspect(type));
	}

	function extensionKindToTypeName(kind) {
	  switch (kind) {
	    case Kind.SCALAR_TYPE_EXTENSION:
	      return 'scalar';

	    case Kind.OBJECT_TYPE_EXTENSION:
	      return 'object';

	    case Kind.INTERFACE_TYPE_EXTENSION:
	      return 'interface';

	    case Kind.UNION_TYPE_EXTENSION:
	      return 'union';

	    case Kind.ENUM_TYPE_EXTENSION:
	      return 'enum';

	    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
	      return 'input object';
	  } // istanbul ignore next (Not reachable. All possible types have been considered)


	   invariant(0, 'Unexpected kind: ' + inspect(kind));
	}

	// Spec Section: "Executable Definitions"
	/**
	 * This set includes all validation rules defined by the GraphQL spec.
	 *
	 * The order of the rules in this list has been adjusted to lead to the
	 * most clear output when encountering multiple validation errors.
	 */

	var specifiedRules = Object.freeze([ExecutableDefinitionsRule, UniqueOperationNamesRule, LoneAnonymousOperationRule, SingleFieldSubscriptionsRule, KnownTypeNamesRule, FragmentsOnCompositeTypesRule, VariablesAreInputTypesRule, ScalarLeafsRule, FieldsOnCorrectTypeRule, UniqueFragmentNamesRule, KnownFragmentNamesRule, NoUnusedFragmentsRule, PossibleFragmentSpreadsRule, NoFragmentCyclesRule, UniqueVariableNamesRule, NoUndefinedVariablesRule, NoUnusedVariablesRule, KnownDirectivesRule, UniqueDirectivesPerLocationRule, KnownArgumentNamesRule, UniqueArgumentNamesRule, ValuesOfCorrectTypeRule, ProvidedRequiredArgumentsRule, VariablesInAllowedPositionRule, OverlappingFieldsCanBeMergedRule, UniqueInputFieldNamesRule]);
	/**
	 * @internal
	 */

	var specifiedSDLRules = Object.freeze([LoneSchemaDefinitionRule, UniqueOperationTypesRule, UniqueTypeNamesRule, UniqueEnumValueNamesRule, UniqueFieldDefinitionNamesRule, UniqueDirectiveNamesRule, KnownTypeNamesRule, KnownDirectivesRule, UniqueDirectivesPerLocationRule, PossibleTypeExtensionsRule, KnownArgumentNamesOnDirectivesRule, UniqueArgumentNamesRule, UniqueInputFieldNamesRule, ProvidedRequiredArgumentsOnDirectivesRule]);

	function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

	/**
	 * An instance of this class is passed as the "this" context to all validators,
	 * allowing access to commonly useful contextual information from within a
	 * validation rule.
	 */
	var ASTValidationContext = /*#__PURE__*/function () {
	  function ASTValidationContext(ast, onError) {
	    this._ast = ast;
	    this._fragments = undefined;
	    this._fragmentSpreads = new Map();
	    this._recursivelyReferencedFragments = new Map();
	    this._onError = onError;
	  }

	  var _proto = ASTValidationContext.prototype;

	  _proto.reportError = function reportError(error) {
	    this._onError(error);
	  };

	  _proto.getDocument = function getDocument() {
	    return this._ast;
	  };

	  _proto.getFragment = function getFragment(name) {
	    var fragments = this._fragments;

	    if (!fragments) {
	      this._fragments = fragments = this.getDocument().definitions.reduce(function (frags, statement) {
	        if (statement.kind === Kind.FRAGMENT_DEFINITION) {
	          frags[statement.name.value] = statement;
	        }

	        return frags;
	      }, Object.create(null));
	    }

	    return fragments[name];
	  };

	  _proto.getFragmentSpreads = function getFragmentSpreads(node) {
	    var spreads = this._fragmentSpreads.get(node);

	    if (!spreads) {
	      spreads = [];
	      var setsToVisit = [node];

	      while (setsToVisit.length !== 0) {
	        var set = setsToVisit.pop();

	        for (var _i2 = 0, _set$selections2 = set.selections; _i2 < _set$selections2.length; _i2++) {
	          var selection = _set$selections2[_i2];

	          if (selection.kind === Kind.FRAGMENT_SPREAD) {
	            spreads.push(selection);
	          } else if (selection.selectionSet) {
	            setsToVisit.push(selection.selectionSet);
	          }
	        }
	      }

	      this._fragmentSpreads.set(node, spreads);
	    }

	    return spreads;
	  };

	  _proto.getRecursivelyReferencedFragments = function getRecursivelyReferencedFragments(operation) {
	    var fragments = this._recursivelyReferencedFragments.get(operation);

	    if (!fragments) {
	      fragments = [];
	      var collectedNames = Object.create(null);
	      var nodesToVisit = [operation.selectionSet];

	      while (nodesToVisit.length !== 0) {
	        var node = nodesToVisit.pop();

	        for (var _i4 = 0, _this$getFragmentSpre2 = this.getFragmentSpreads(node); _i4 < _this$getFragmentSpre2.length; _i4++) {
	          var spread = _this$getFragmentSpre2[_i4];
	          var fragName = spread.name.value;

	          if (collectedNames[fragName] !== true) {
	            collectedNames[fragName] = true;
	            var fragment = this.getFragment(fragName);

	            if (fragment) {
	              fragments.push(fragment);
	              nodesToVisit.push(fragment.selectionSet);
	            }
	          }
	        }
	      }

	      this._recursivelyReferencedFragments.set(operation, fragments);
	    }

	    return fragments;
	  };

	  return ASTValidationContext;
	}();
	var SDLValidationContext = /*#__PURE__*/function (_ASTValidationContext) {
	  _inheritsLoose(SDLValidationContext, _ASTValidationContext);

	  function SDLValidationContext(ast, schema, onError) {
	    var _this;

	    _this = _ASTValidationContext.call(this, ast, onError) || this;
	    _this._schema = schema;
	    return _this;
	  }

	  var _proto2 = SDLValidationContext.prototype;

	  _proto2.getSchema = function getSchema() {
	    return this._schema;
	  };

	  return SDLValidationContext;
	}(ASTValidationContext);

	/**
	 * @internal
	 */

	function validateSDL(documentAST, schemaToExtend) {
	  var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : specifiedSDLRules;
	  var errors = [];
	  var context = new SDLValidationContext(documentAST, schemaToExtend, function (error) {
	    errors.push(error);
	  });
	  var visitors = rules.map(function (rule) {
	    return rule(context);
	  });
	  visit(documentAST, visitInParallel(visitors));
	  return errors;
	}
	/**
	 * Utility function which asserts a SDL document is valid by throwing an error
	 * if it is invalid.
	 *
	 * @internal
	 */

	function assertValidSDLExtension(documentAST, schema) {
	  var errors = validateSDL(documentAST, schema);

	  if (errors.length !== 0) {
	    throw new Error(errors.map(function (error) {
	      return error.message;
	    }).join('\n\n'));
	  }
	}

	/**
	 * Produces a JavaScript value given a GraphQL Value AST.
	 *
	 * A GraphQL type must be provided, which will be used to interpret different
	 * GraphQL Value literals.
	 *
	 * Returns `undefined` when the value could not be validly coerced according to
	 * the provided type.
	 *
	 * | GraphQL Value        | JSON Value    |
	 * | -------------------- | ------------- |
	 * | Input Object         | Object        |
	 * | List                 | Array         |
	 * | Boolean              | Boolean       |
	 * | String               | String        |
	 * | Int / Float          | Number        |
	 * | Enum Value           | Mixed         |
	 * | NullValue            | null          |
	 *
	 */

	function valueFromAST(valueNode, type, variables) {
	  if (!valueNode) {
	    // When there is no node, then there is also no value.
	    // Importantly, this is different from returning the value null.
	    return;
	  }

	  if (valueNode.kind === Kind.VARIABLE) {
	    var variableName = valueNode.name.value;

	    if (variables == null || variables[variableName] === undefined) {
	      // No valid return value.
	      return;
	    }

	    var variableValue = variables[variableName];

	    if (variableValue === null && isNonNullType(type)) {
	      return; // Invalid: intentionally return no value.
	    } // Note: This does no further checking that this variable is correct.
	    // This assumes that this query has been validated and the variable
	    // usage here is of the correct type.


	    return variableValue;
	  }

	  if (isNonNullType(type)) {
	    if (valueNode.kind === Kind.NULL) {
	      return; // Invalid: intentionally return no value.
	    }

	    return valueFromAST(valueNode, type.ofType, variables);
	  }

	  if (valueNode.kind === Kind.NULL) {
	    // This is explicitly returning the value null.
	    return null;
	  }

	  if (isListType(type)) {
	    var itemType = type.ofType;

	    if (valueNode.kind === Kind.LIST) {
	      var coercedValues = [];

	      for (var _i2 = 0, _valueNode$values2 = valueNode.values; _i2 < _valueNode$values2.length; _i2++) {
	        var itemNode = _valueNode$values2[_i2];

	        if (isMissingVariable(itemNode, variables)) {
	          // If an array contains a missing variable, it is either coerced to
	          // null or if the item type is non-null, it considered invalid.
	          if (isNonNullType(itemType)) {
	            return; // Invalid: intentionally return no value.
	          }

	          coercedValues.push(null);
	        } else {
	          var itemValue = valueFromAST(itemNode, itemType, variables);

	          if (itemValue === undefined) {
	            return; // Invalid: intentionally return no value.
	          }

	          coercedValues.push(itemValue);
	        }
	      }

	      return coercedValues;
	    }

	    var coercedValue = valueFromAST(valueNode, itemType, variables);

	    if (coercedValue === undefined) {
	      return; // Invalid: intentionally return no value.
	    }

	    return [coercedValue];
	  }

	  if (isInputObjectType(type)) {
	    if (valueNode.kind !== Kind.OBJECT) {
	      return; // Invalid: intentionally return no value.
	    }

	    var coercedObj = Object.create(null);
	    var fieldNodes = keyMap(valueNode.fields, function (field) {
	      return field.name.value;
	    });

	    for (var _i4 = 0, _objectValues2 = objectValues(type.getFields()); _i4 < _objectValues2.length; _i4++) {
	      var field = _objectValues2[_i4];
	      var fieldNode = fieldNodes[field.name];

	      if (!fieldNode || isMissingVariable(fieldNode.value, variables)) {
	        if (field.defaultValue !== undefined) {
	          coercedObj[field.name] = field.defaultValue;
	        } else if (isNonNullType(field.type)) {
	          return; // Invalid: intentionally return no value.
	        }

	        continue;
	      }

	      var fieldValue = valueFromAST(fieldNode.value, field.type, variables);

	      if (fieldValue === undefined) {
	        return; // Invalid: intentionally return no value.
	      }

	      coercedObj[field.name] = fieldValue;
	    }

	    return coercedObj;
	  } // istanbul ignore else (See: 'https://github.com/graphql/graphql-js/issues/2618')


	  if (isLeafType(type)) {
	    // Scalars and Enums fulfill parsing a literal value via parseLiteral().
	    // Invalid values represent a failure to parse correctly, in which case
	    // no value is returned.
	    var result;

	    try {
	      result = type.parseLiteral(valueNode, variables);
	    } catch (_error) {
	      return; // Invalid: intentionally return no value.
	    }

	    if (result === undefined) {
	      return; // Invalid: intentionally return no value.
	    }

	    return result;
	  } // istanbul ignore next (Not reachable. All possible input types have been considered)


	   invariant(0, 'Unexpected input type: ' + inspect(type));
	} // Returns true if the provided valueNode is a variable which is not defined
	// in the set of variables.

	function isMissingVariable(valueNode, variables) {
	  return valueNode.kind === Kind.VARIABLE && (variables == null || variables[valueNode.name.value] === undefined);
	}

	/**
	 * Prepares an object map of argument values given a list of argument
	 * definitions and list of argument AST nodes.
	 *
	 * Note: The returned value is a plain Object with a prototype, since it is
	 * exposed to user code. Care should be taken to not pull values from the
	 * Object prototype.
	 *
	 * @internal
	 */


	function getArgumentValues(def, node, variableValues) {
	  var _node$arguments;

	  var coercedValues = {}; // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')

	  var argumentNodes = (_node$arguments = node.arguments) !== null && _node$arguments !== void 0 ? _node$arguments : [];
	  var argNodeMap = keyMap(argumentNodes, function (arg) {
	    return arg.name.value;
	  });

	  for (var _i4 = 0, _def$args2 = def.args; _i4 < _def$args2.length; _i4++) {
	    var argDef = _def$args2[_i4];
	    var name = argDef.name;
	    var argType = argDef.type;
	    var argumentNode = argNodeMap[name];

	    if (!argumentNode) {
	      if (argDef.defaultValue !== undefined) {
	        coercedValues[name] = argDef.defaultValue;
	      } else if (isNonNullType(argType)) {
	        throw new GraphQLError("Argument \"".concat(name, "\" of required type \"").concat(inspect(argType), "\" ") + 'was not provided.', node);
	      }

	      continue;
	    }

	    var valueNode = argumentNode.value;
	    var isNull = valueNode.kind === Kind.NULL;

	    if (valueNode.kind === Kind.VARIABLE) {
	      var variableName = valueNode.name.value;

	      if (variableValues == null || !hasOwnProperty$1(variableValues, variableName)) {
	        if (argDef.defaultValue !== undefined) {
	          coercedValues[name] = argDef.defaultValue;
	        } else if (isNonNullType(argType)) {
	          throw new GraphQLError("Argument \"".concat(name, "\" of required type \"").concat(inspect(argType), "\" ") + "was provided the variable \"$".concat(variableName, "\" which was not provided a runtime value."), valueNode);
	        }

	        continue;
	      }

	      isNull = variableValues[variableName] == null;
	    }

	    if (isNull && isNonNullType(argType)) {
	      throw new GraphQLError("Argument \"".concat(name, "\" of non-null type \"").concat(inspect(argType), "\" ") + 'must not be null.', valueNode);
	    }

	    var coercedValue = valueFromAST(valueNode, argType, variableValues);

	    if (coercedValue === undefined) {
	      // Note: ValuesOfCorrectTypeRule validation should catch this before
	      // execution. This is a runtime check to ensure execution does not
	      // continue with an invalid argument value.
	      throw new GraphQLError("Argument \"".concat(name, "\" has invalid value ").concat(print(valueNode), "."), valueNode);
	    }

	    coercedValues[name] = coercedValue;
	  }

	  return coercedValues;
	}
	/**
	 * Prepares an object map of argument values given a directive definition
	 * and a AST node which may contain directives. Optionally also accepts a map
	 * of variable values.
	 *
	 * If the directive does not exist on the node, returns undefined.
	 *
	 * Note: The returned value is a plain Object with a prototype, since it is
	 * exposed to user code. Care should be taken to not pull values from the
	 * Object prototype.
	 */

	function getDirectiveValues(directiveDef, node, variableValues) {
	  var directiveNode = node.directives && find(node.directives, function (directive) {
	    return directive.name.value === directiveDef.name;
	  });

	  if (directiveNode) {
	    return getArgumentValues(directiveDef, directiveNode, variableValues);
	  }
	}

	function hasOwnProperty$1(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty$3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * Produces a new schema given an existing schema and a document which may
	 * contain GraphQL type extensions and definitions. The original schema will
	 * remain unaltered.
	 *
	 * Because a schema represents a graph of references, a schema cannot be
	 * extended without effectively making an entire copy. We do not know until it's
	 * too late if subgraphs remain unchanged.
	 *
	 * This algorithm copies the provided schema, applying extensions while
	 * producing the copy. The original schema remains unaltered.
	 *
	 * Accepts options as a third argument:
	 *
	 *    - commentDescriptions:
	 *        Provide true to use preceding comments as the description.
	 *
	 */
	function extendSchema(schema, documentAST, options) {
	  assertSchema(schema);
	  documentAST != null && documentAST.kind === Kind.DOCUMENT || devAssert(0, 'Must provide valid Document AST.');

	  if ((options === null || options === void 0 ? void 0 : options.assumeValid) !== true && (options === null || options === void 0 ? void 0 : options.assumeValidSDL) !== true) {
	    assertValidSDLExtension(documentAST, schema);
	  }

	  var schemaConfig = schema.toConfig();
	  var extendedConfig = extendSchemaImpl(schemaConfig, documentAST, options);
	  return schemaConfig === extendedConfig ? schema : new GraphQLSchema(extendedConfig);
	}
	/**
	 * @internal
	 */

	function extendSchemaImpl(schemaConfig, documentAST, options) {
	  var _schemaDef, _schemaDef$descriptio, _schemaDef2, _options$assumeValid;

	  // Collect the type definitions and extensions found in the document.
	  var typeDefs = [];
	  var typeExtensionsMap = Object.create(null); // New directives and types are separate because a directives and types can
	  // have the same name. For example, a type named "skip".

	  var directiveDefs = [];
	  var schemaDef; // Schema extensions are collected which may add additional operation types.

	  var schemaExtensions = [];

	  for (var _i2 = 0, _documentAST$definiti2 = documentAST.definitions; _i2 < _documentAST$definiti2.length; _i2++) {
	    var def = _documentAST$definiti2[_i2];

	    if (def.kind === Kind.SCHEMA_DEFINITION) {
	      schemaDef = def;
	    } else if (def.kind === Kind.SCHEMA_EXTENSION) {
	      schemaExtensions.push(def);
	    } else if (isTypeDefinitionNode(def)) {
	      typeDefs.push(def);
	    } else if (isTypeExtensionNode(def)) {
	      var extendedTypeName = def.name.value;
	      var existingTypeExtensions = typeExtensionsMap[extendedTypeName];
	      typeExtensionsMap[extendedTypeName] = existingTypeExtensions ? existingTypeExtensions.concat([def]) : [def];
	    } else if (def.kind === Kind.DIRECTIVE_DEFINITION) {
	      directiveDefs.push(def);
	    }
	  } // If this document contains no new types, extensions, or directives then
	  // return the same unmodified GraphQLSchema instance.


	  if (Object.keys(typeExtensionsMap).length === 0 && typeDefs.length === 0 && directiveDefs.length === 0 && schemaExtensions.length === 0 && schemaDef == null) {
	    return schemaConfig;
	  }

	  var typeMap = Object.create(null);

	  for (var _i4 = 0, _schemaConfig$types2 = schemaConfig.types; _i4 < _schemaConfig$types2.length; _i4++) {
	    var existingType = _schemaConfig$types2[_i4];
	    typeMap[existingType.name] = extendNamedType(existingType);
	  }

	  for (var _i6 = 0; _i6 < typeDefs.length; _i6++) {
	    var _stdTypeMap$name;

	    var typeNode = typeDefs[_i6];
	    var name = typeNode.name.value;
	    typeMap[name] = (_stdTypeMap$name = stdTypeMap[name]) !== null && _stdTypeMap$name !== void 0 ? _stdTypeMap$name : buildType(typeNode);
	  }

	  var operationTypes = _objectSpread$2(_objectSpread$2({
	    // Get the extended root operation types.
	    query: schemaConfig.query && replaceNamedType(schemaConfig.query),
	    mutation: schemaConfig.mutation && replaceNamedType(schemaConfig.mutation),
	    subscription: schemaConfig.subscription && replaceNamedType(schemaConfig.subscription)
	  }, schemaDef && getOperationTypes([schemaDef])), getOperationTypes(schemaExtensions)); // Then produce and return a Schema config with these types.


	  return _objectSpread$2(_objectSpread$2({
	    description: (_schemaDef = schemaDef) === null || _schemaDef === void 0 ? void 0 : (_schemaDef$descriptio = _schemaDef.description) === null || _schemaDef$descriptio === void 0 ? void 0 : _schemaDef$descriptio.value
	  }, operationTypes), {}, {
	    types: objectValues(typeMap),
	    directives: [].concat(schemaConfig.directives.map(replaceDirective), directiveDefs.map(buildDirective)),
	    extensions: undefined,
	    astNode: (_schemaDef2 = schemaDef) !== null && _schemaDef2 !== void 0 ? _schemaDef2 : schemaConfig.astNode,
	    extensionASTNodes: schemaConfig.extensionASTNodes.concat(schemaExtensions),
	    assumeValid: (_options$assumeValid = options === null || options === void 0 ? void 0 : options.assumeValid) !== null && _options$assumeValid !== void 0 ? _options$assumeValid : false
	  }); // Below are functions used for producing this schema that have closed over
	  // this scope and have access to the schema, cache, and newly defined types.

	  function replaceType(type) {
	    if (isListType(type)) {
	      // $FlowFixMe[incompatible-return]
	      return new GraphQLList(replaceType(type.ofType));
	    }

	    if (isNonNullType(type)) {
	      // $FlowFixMe[incompatible-return]
	      return new GraphQLNonNull(replaceType(type.ofType));
	    }

	    return replaceNamedType(type);
	  }

	  function replaceNamedType(type) {
	    // Note: While this could make early assertions to get the correctly
	    // typed values, that would throw immediately while type system
	    // validation with validateSchema() will produce more actionable results.
	    return typeMap[type.name];
	  }

	  function replaceDirective(directive) {
	    var config = directive.toConfig();
	    return new GraphQLDirective(_objectSpread$2(_objectSpread$2({}, config), {}, {
	      args: mapValue(config.args, extendArg)
	    }));
	  }

	  function extendNamedType(type) {
	    if (isIntrospectionType(type) || isSpecifiedScalarType(type)) {
	      // Builtin types are not extended.
	      return type;
	    }

	    if (isScalarType(type)) {
	      return extendScalarType(type);
	    }

	    if (isObjectType(type)) {
	      return extendObjectType(type);
	    }

	    if (isInterfaceType(type)) {
	      return extendInterfaceType(type);
	    }

	    if (isUnionType(type)) {
	      return extendUnionType(type);
	    }

	    if (isEnumType(type)) {
	      return extendEnumType(type);
	    } // istanbul ignore else (See: 'https://github.com/graphql/graphql-js/issues/2618')


	    if (isInputObjectType(type)) {
	      return extendInputObjectType(type);
	    } // istanbul ignore next (Not reachable. All possible types have been considered)


	     invariant(0, 'Unexpected type: ' + inspect(type));
	  }

	  function extendInputObjectType(type) {
	    var _typeExtensionsMap$co;

	    var config = type.toConfig();
	    var extensions = (_typeExtensionsMap$co = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co !== void 0 ? _typeExtensionsMap$co : [];
	    return new GraphQLInputObjectType(_objectSpread$2(_objectSpread$2({}, config), {}, {
	      fields: function fields() {
	        return _objectSpread$2(_objectSpread$2({}, mapValue(config.fields, function (field) {
	          return _objectSpread$2(_objectSpread$2({}, field), {}, {
	            type: replaceType(field.type)
	          });
	        })), buildInputFieldMap(extensions));
	      },
	      extensionASTNodes: config.extensionASTNodes.concat(extensions)
	    }));
	  }

	  function extendEnumType(type) {
	    var _typeExtensionsMap$ty;

	    var config = type.toConfig();
	    var extensions = (_typeExtensionsMap$ty = typeExtensionsMap[type.name]) !== null && _typeExtensionsMap$ty !== void 0 ? _typeExtensionsMap$ty : [];
	    return new GraphQLEnumType(_objectSpread$2(_objectSpread$2({}, config), {}, {
	      values: _objectSpread$2(_objectSpread$2({}, config.values), buildEnumValueMap(extensions)),
	      extensionASTNodes: config.extensionASTNodes.concat(extensions)
	    }));
	  }

	  function extendScalarType(type) {
	    var _typeExtensionsMap$co2;

	    var config = type.toConfig();
	    var extensions = (_typeExtensionsMap$co2 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co2 !== void 0 ? _typeExtensionsMap$co2 : [];
	    var specifiedByUrl = config.specifiedByUrl;

	    for (var _i8 = 0; _i8 < extensions.length; _i8++) {
	      var _getSpecifiedByUrl;

	      var extensionNode = extensions[_i8];
	      specifiedByUrl = (_getSpecifiedByUrl = getSpecifiedByUrl(extensionNode)) !== null && _getSpecifiedByUrl !== void 0 ? _getSpecifiedByUrl : specifiedByUrl;
	    }

	    return new GraphQLScalarType(_objectSpread$2(_objectSpread$2({}, config), {}, {
	      specifiedByUrl: specifiedByUrl,
	      extensionASTNodes: config.extensionASTNodes.concat(extensions)
	    }));
	  }

	  function extendObjectType(type) {
	    var _typeExtensionsMap$co3;

	    var config = type.toConfig();
	    var extensions = (_typeExtensionsMap$co3 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co3 !== void 0 ? _typeExtensionsMap$co3 : [];
	    return new GraphQLObjectType(_objectSpread$2(_objectSpread$2({}, config), {}, {
	      interfaces: function interfaces() {
	        return [].concat(type.getInterfaces().map(replaceNamedType), buildInterfaces(extensions));
	      },
	      fields: function fields() {
	        return _objectSpread$2(_objectSpread$2({}, mapValue(config.fields, extendField)), buildFieldMap(extensions));
	      },
	      extensionASTNodes: config.extensionASTNodes.concat(extensions)
	    }));
	  }

	  function extendInterfaceType(type) {
	    var _typeExtensionsMap$co4;

	    var config = type.toConfig();
	    var extensions = (_typeExtensionsMap$co4 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co4 !== void 0 ? _typeExtensionsMap$co4 : [];
	    return new GraphQLInterfaceType(_objectSpread$2(_objectSpread$2({}, config), {}, {
	      interfaces: function interfaces() {
	        return [].concat(type.getInterfaces().map(replaceNamedType), buildInterfaces(extensions));
	      },
	      fields: function fields() {
	        return _objectSpread$2(_objectSpread$2({}, mapValue(config.fields, extendField)), buildFieldMap(extensions));
	      },
	      extensionASTNodes: config.extensionASTNodes.concat(extensions)
	    }));
	  }

	  function extendUnionType(type) {
	    var _typeExtensionsMap$co5;

	    var config = type.toConfig();
	    var extensions = (_typeExtensionsMap$co5 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co5 !== void 0 ? _typeExtensionsMap$co5 : [];
	    return new GraphQLUnionType(_objectSpread$2(_objectSpread$2({}, config), {}, {
	      types: function types() {
	        return [].concat(type.getTypes().map(replaceNamedType), buildUnionTypes(extensions));
	      },
	      extensionASTNodes: config.extensionASTNodes.concat(extensions)
	    }));
	  }

	  function extendField(field) {
	    return _objectSpread$2(_objectSpread$2({}, field), {}, {
	      type: replaceType(field.type),
	      // $FlowFixMe[incompatible-call]
	      args: mapValue(field.args, extendArg)
	    });
	  }

	  function extendArg(arg) {
	    return _objectSpread$2(_objectSpread$2({}, arg), {}, {
	      type: replaceType(arg.type)
	    });
	  }

	  function getOperationTypes(nodes) {
	    var opTypes = {};

	    for (var _i10 = 0; _i10 < nodes.length; _i10++) {
	      var _node$operationTypes;

	      var node = nodes[_i10];
	      // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')
	      var operationTypesNodes = (_node$operationTypes = node.operationTypes) !== null && _node$operationTypes !== void 0 ? _node$operationTypes : [];

	      for (var _i12 = 0; _i12 < operationTypesNodes.length; _i12++) {
	        var operationType = operationTypesNodes[_i12];
	        opTypes[operationType.operation] = getNamedType(operationType.type);
	      }
	    } // Note: While this could make early assertions to get the correctly
	    // typed values below, that would throw immediately while type system
	    // validation with validateSchema() will produce more actionable results.


	    return opTypes;
	  }

	  function getNamedType(node) {
	    var _stdTypeMap$name2;

	    var name = node.name.value;
	    var type = (_stdTypeMap$name2 = stdTypeMap[name]) !== null && _stdTypeMap$name2 !== void 0 ? _stdTypeMap$name2 : typeMap[name];

	    if (type === undefined) {
	      throw new Error("Unknown type: \"".concat(name, "\"."));
	    }

	    return type;
	  }

	  function getWrappedType(node) {
	    if (node.kind === Kind.LIST_TYPE) {
	      return new GraphQLList(getWrappedType(node.type));
	    }

	    if (node.kind === Kind.NON_NULL_TYPE) {
	      return new GraphQLNonNull(getWrappedType(node.type));
	    }

	    return getNamedType(node);
	  }

	  function buildDirective(node) {
	    var locations = node.locations.map(function (_ref) {
	      var value = _ref.value;
	      return value;
	    });
	    return new GraphQLDirective({
	      name: node.name.value,
	      description: getDescription(node, options),
	      locations: locations,
	      isRepeatable: node.repeatable,
	      args: buildArgumentMap(node.arguments),
	      astNode: node
	    });
	  }

	  function buildFieldMap(nodes) {
	    var fieldConfigMap = Object.create(null);

	    for (var _i14 = 0; _i14 < nodes.length; _i14++) {
	      var _node$fields;

	      var node = nodes[_i14];
	      // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')
	      var nodeFields = (_node$fields = node.fields) !== null && _node$fields !== void 0 ? _node$fields : [];

	      for (var _i16 = 0; _i16 < nodeFields.length; _i16++) {
	        var field = nodeFields[_i16];
	        fieldConfigMap[field.name.value] = {
	          // Note: While this could make assertions to get the correctly typed
	          // value, that would throw immediately while type system validation
	          // with validateSchema() will produce more actionable results.
	          type: getWrappedType(field.type),
	          description: getDescription(field, options),
	          args: buildArgumentMap(field.arguments),
	          deprecationReason: getDeprecationReason(field),
	          astNode: field
	        };
	      }
	    }

	    return fieldConfigMap;
	  }

	  function buildArgumentMap(args) {
	    // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')
	    var argsNodes = args !== null && args !== void 0 ? args : [];
	    var argConfigMap = Object.create(null);

	    for (var _i18 = 0; _i18 < argsNodes.length; _i18++) {
	      var arg = argsNodes[_i18];
	      // Note: While this could make assertions to get the correctly typed
	      // value, that would throw immediately while type system validation
	      // with validateSchema() will produce more actionable results.
	      var type = getWrappedType(arg.type);
	      argConfigMap[arg.name.value] = {
	        type: type,
	        description: getDescription(arg, options),
	        defaultValue: valueFromAST(arg.defaultValue, type),
	        deprecationReason: getDeprecationReason(arg),
	        astNode: arg
	      };
	    }

	    return argConfigMap;
	  }

	  function buildInputFieldMap(nodes) {
	    var inputFieldMap = Object.create(null);

	    for (var _i20 = 0; _i20 < nodes.length; _i20++) {
	      var _node$fields2;

	      var node = nodes[_i20];
	      // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')
	      var fieldsNodes = (_node$fields2 = node.fields) !== null && _node$fields2 !== void 0 ? _node$fields2 : [];

	      for (var _i22 = 0; _i22 < fieldsNodes.length; _i22++) {
	        var field = fieldsNodes[_i22];
	        // Note: While this could make assertions to get the correctly typed
	        // value, that would throw immediately while type system validation
	        // with validateSchema() will produce more actionable results.
	        var type = getWrappedType(field.type);
	        inputFieldMap[field.name.value] = {
	          type: type,
	          description: getDescription(field, options),
	          defaultValue: valueFromAST(field.defaultValue, type),
	          deprecationReason: getDeprecationReason(field),
	          astNode: field
	        };
	      }
	    }

	    return inputFieldMap;
	  }

	  function buildEnumValueMap(nodes) {
	    var enumValueMap = Object.create(null);

	    for (var _i24 = 0; _i24 < nodes.length; _i24++) {
	      var _node$values;

	      var node = nodes[_i24];
	      // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')
	      var valuesNodes = (_node$values = node.values) !== null && _node$values !== void 0 ? _node$values : [];

	      for (var _i26 = 0; _i26 < valuesNodes.length; _i26++) {
	        var value = valuesNodes[_i26];
	        enumValueMap[value.name.value] = {
	          description: getDescription(value, options),
	          deprecationReason: getDeprecationReason(value),
	          astNode: value
	        };
	      }
	    }

	    return enumValueMap;
	  }

	  function buildInterfaces(nodes) {
	    var interfaces = [];

	    for (var _i28 = 0; _i28 < nodes.length; _i28++) {
	      var _node$interfaces;

	      var node = nodes[_i28];
	      // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')
	      var interfacesNodes = (_node$interfaces = node.interfaces) !== null && _node$interfaces !== void 0 ? _node$interfaces : [];

	      for (var _i30 = 0; _i30 < interfacesNodes.length; _i30++) {
	        var type = interfacesNodes[_i30];
	        // Note: While this could make assertions to get the correctly typed
	        // values below, that would throw immediately while type system
	        // validation with validateSchema() will produce more actionable
	        // results.
	        interfaces.push(getNamedType(type));
	      }
	    }

	    return interfaces;
	  }

	  function buildUnionTypes(nodes) {
	    var types = [];

	    for (var _i32 = 0; _i32 < nodes.length; _i32++) {
	      var _node$types;

	      var node = nodes[_i32];
	      // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2203')
	      var typeNodes = (_node$types = node.types) !== null && _node$types !== void 0 ? _node$types : [];

	      for (var _i34 = 0; _i34 < typeNodes.length; _i34++) {
	        var type = typeNodes[_i34];
	        // Note: While this could make assertions to get the correctly typed
	        // values below, that would throw immediately while type system
	        // validation with validateSchema() will produce more actionable
	        // results.
	        types.push(getNamedType(type));
	      }
	    }

	    return types;
	  }

	  function buildType(astNode) {
	    var _typeExtensionsMap$na;

	    var name = astNode.name.value;
	    var description = getDescription(astNode, options);
	    var extensionNodes = (_typeExtensionsMap$na = typeExtensionsMap[name]) !== null && _typeExtensionsMap$na !== void 0 ? _typeExtensionsMap$na : [];

	    switch (astNode.kind) {
	      case Kind.OBJECT_TYPE_DEFINITION:
	        {
	          var extensionASTNodes = extensionNodes;
	          var allNodes = [astNode].concat(extensionASTNodes);
	          return new GraphQLObjectType({
	            name: name,
	            description: description,
	            interfaces: function interfaces() {
	              return buildInterfaces(allNodes);
	            },
	            fields: function fields() {
	              return buildFieldMap(allNodes);
	            },
	            astNode: astNode,
	            extensionASTNodes: extensionASTNodes
	          });
	        }

	      case Kind.INTERFACE_TYPE_DEFINITION:
	        {
	          var _extensionASTNodes = extensionNodes;

	          var _allNodes = [astNode].concat(_extensionASTNodes);

	          return new GraphQLInterfaceType({
	            name: name,
	            description: description,
	            interfaces: function interfaces() {
	              return buildInterfaces(_allNodes);
	            },
	            fields: function fields() {
	              return buildFieldMap(_allNodes);
	            },
	            astNode: astNode,
	            extensionASTNodes: _extensionASTNodes
	          });
	        }

	      case Kind.ENUM_TYPE_DEFINITION:
	        {
	          var _extensionASTNodes2 = extensionNodes;

	          var _allNodes2 = [astNode].concat(_extensionASTNodes2);

	          return new GraphQLEnumType({
	            name: name,
	            description: description,
	            values: buildEnumValueMap(_allNodes2),
	            astNode: astNode,
	            extensionASTNodes: _extensionASTNodes2
	          });
	        }

	      case Kind.UNION_TYPE_DEFINITION:
	        {
	          var _extensionASTNodes3 = extensionNodes;

	          var _allNodes3 = [astNode].concat(_extensionASTNodes3);

	          return new GraphQLUnionType({
	            name: name,
	            description: description,
	            types: function types() {
	              return buildUnionTypes(_allNodes3);
	            },
	            astNode: astNode,
	            extensionASTNodes: _extensionASTNodes3
	          });
	        }

	      case Kind.SCALAR_TYPE_DEFINITION:
	        {
	          var _extensionASTNodes4 = extensionNodes;
	          return new GraphQLScalarType({
	            name: name,
	            description: description,
	            specifiedByUrl: getSpecifiedByUrl(astNode),
	            astNode: astNode,
	            extensionASTNodes: _extensionASTNodes4
	          });
	        }

	      case Kind.INPUT_OBJECT_TYPE_DEFINITION:
	        {
	          var _extensionASTNodes5 = extensionNodes;

	          var _allNodes4 = [astNode].concat(_extensionASTNodes5);

	          return new GraphQLInputObjectType({
	            name: name,
	            description: description,
	            fields: function fields() {
	              return buildInputFieldMap(_allNodes4);
	            },
	            astNode: astNode,
	            extensionASTNodes: _extensionASTNodes5
	          });
	        }
	    } // istanbul ignore next (Not reachable. All possible type definition nodes have been considered)


	     invariant(0, 'Unexpected type definition node: ' + inspect(astNode));
	  }
	}
	var stdTypeMap = keyMap(specifiedScalarTypes.concat(introspectionTypes), function (type) {
	  return type.name;
	});
	/**
	 * Given a field or enum value node, returns the string value for the
	 * deprecation reason.
	 */

	function getDeprecationReason(node) {
	  var deprecated = getDirectiveValues(GraphQLDeprecatedDirective, node);
	  return deprecated === null || deprecated === void 0 ? void 0 : deprecated.reason;
	}
	/**
	 * Given a scalar node, returns the string value for the specifiedByUrl.
	 */


	function getSpecifiedByUrl(node) {
	  var specifiedBy = getDirectiveValues(GraphQLSpecifiedByDirective, node);
	  return specifiedBy === null || specifiedBy === void 0 ? void 0 : specifiedBy.url;
	}
	/**
	 * Given an ast node, returns its string description.
	 * @deprecated: provided to ease adoption and will be removed in v16.
	 *
	 * Accepts options as a second argument:
	 *
	 *    - commentDescriptions:
	 *        Provide true to use preceding comments as the description.
	 *
	 */


	function getDescription(node, options) {
	  if (node.description) {
	    return node.description.value;
	  }

	  if ((options === null || options === void 0 ? void 0 : options.commentDescriptions) === true) {
	    var rawValue = getLeadingCommentBlock(node);

	    if (rawValue !== undefined) {
	      return dedentBlockStringValue('\n' + rawValue);
	    }
	  }
	}

	function getLeadingCommentBlock(node) {
	  var loc = node.loc;

	  if (!loc) {
	    return;
	  }

	  var comments = [];
	  var token = loc.startToken.prev;

	  while (token != null && token.kind === TokenKind.COMMENT && token.next && token.prev && token.line + 1 === token.next.line && token.line !== token.prev.line) {
	    var value = String(token.value);
	    comments.push(value);
	    token = token.prev;
	  }

	  return comments.length > 0 ? comments.reverse().join('\n') : undefined;
	}

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var keys$3 = shared('keys');

	var sharedKey = function (key) {
	  return keys$3[key] || (keys$3[key] = uid(key));
	};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	var defineProperty$2 = objectDefineProperty.f;





	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;
	    if (!has(target, TO_STRING_TAG$2)) {
	      defineProperty$2(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && !toStringTagSupport) {
	      createNonEnumerableProperty(target, 'toString', objectToString);
	    }
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var redefine = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else createNonEnumerableProperty(target, key, value);
	};

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if (( FORCED) && IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG$3) {
	    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
	  }
	}

	var $forEach = arrayIteration.forEach;



	var STRICT_METHOD$1 = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = (!STRICT_METHOD$1 || !USES_TO_LENGTH$3) ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// `Array.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
	  forEach: arrayForEach
	});

	var forEach = entryVirtual('Array').forEach;

	var forEach$1 = forEach;

	var ArrayPrototype$4 = Array.prototype;

	var DOMIterables = {
	  DOMTokenList: true,
	  NodeList: true
	};

	var forEach_1 = function (it) {
	  var own = it.forEach;
	  return it === ArrayPrototype$4 || (it instanceof Array && own === ArrayPrototype$4.forEach)
	    // eslint-disable-next-line no-prototype-builtins
	    || DOMIterables.hasOwnProperty(classof(it)) ? forEach$1 : own;
	};

	var forEach$2 = forEach_1;

	var $includes = arrayIncludes.includes;



	var USES_TO_LENGTH$4 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

	// `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes
	_export({ target: 'Array', proto: true, forced: !USES_TO_LENGTH$4 }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var includes = entryVirtual('Array').includes;

	// `String.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.includes
	_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~String(requireObjectCoercible(this))
	      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var includes$1 = entryVirtual('String').includes;

	var ArrayPrototype$5 = Array.prototype;
	var StringPrototype$1 = String.prototype;

	var includes$2 = function (it) {
	  var own = it.includes;
	  if (it === ArrayPrototype$5 || (it instanceof Array && own === ArrayPrototype$5.includes)) return includes;
	  if (typeof it === 'string' || it === StringPrototype$1 || (it instanceof String && own === StringPrototype$1.includes)) {
	    return includes$1;
	  } return own;
	};

	var includes$3 = includes$2;

	var includes$4 = includes$3;

	// `Array.isArray` method
	// https://tc39.github.io/ecma262/#sec-array.isarray
	_export({ target: 'Array', stat: true }, {
	  isArray: isArray
	});

	var isArray$1 = path.Array.isArray;

	var isArray$2 = isArray$1;

	var isArray$3 = isArray$2;

	var floor$1 = Math.floor;

	// `Number.isInteger` method implementation
	// https://tc39.github.io/ecma262/#sec-number.isinteger
	var isInteger$1 = function isInteger(it) {
	  return !isObject(it) && isFinite(it) && floor$1(it) === it;
	};

	// `Number.isInteger` method
	// https://tc39.github.io/ecma262/#sec-number.isinteger
	_export({ target: 'Number', stat: true }, {
	  isInteger: isInteger$1
	});

	var isInteger$2 = path.Number.isInteger;

	var isInteger$3 = isInteger$2;

	var isInteger$4 = isInteger$3;

	var $every = arrayIteration.every;



	var STRICT_METHOD$2 = arrayMethodIsStrict('every');
	var USES_TO_LENGTH$5 = arrayMethodUsesToLength('every');

	// `Array.prototype.every` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.every
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$2 || !USES_TO_LENGTH$5 }, {
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var every = entryVirtual('Array').every;

	var ArrayPrototype$6 = Array.prototype;

	var every_1 = function (it) {
	  var own = it.every;
	  return it === ArrayPrototype$6 || (it instanceof Array && own === ArrayPrototype$6.every) ? every : own;
	};

	var every$1 = every_1;

	var every$2 = every$1;

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace$1 = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace$1 + whitespace$1 + '*');
	var rtrim = RegExp(whitespace$1 + whitespace$1 + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$4 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$4(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$4(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$4(3)
	};

	var trim = stringTrim.trim;


	var $parseFloat = global_1.parseFloat;
	var FORCED$1 = 1 / $parseFloat(whitespaces + '-0') !== -Infinity;

	// `parseFloat` method
	// https://tc39.github.io/ecma262/#sec-parsefloat-string
	var numberParseFloat = FORCED$1 ? function parseFloat(string) {
	  var trimmedString = trim(String(string));
	  var result = $parseFloat(trimmedString);
	  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	// `parseFloat` method
	// https://tc39.github.io/ecma262/#sec-parsefloat-string
	_export({ global: true, forced: parseFloat != numberParseFloat }, {
	  parseFloat: numberParseFloat
	});

	var _parseFloat = path.parseFloat;

	var _parseFloat$1 = _parseFloat;

	var _parseFloat$2 = _parseFloat$1;

	function identity(value) {
	  return value;
	}

	function ensureObject(value) {
	  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
	    throw new TypeError("JSONObject cannot represent non-object value: " + value);
	  }

	  return value;
	}

	function parseObject(typeName, ast, variables) {
	  var value = Object.create(null);
	  ast.fields.forEach(function (field) {
	    // eslint-disable-next-line no-use-before-define
	    value[field.name.value] = _parseLiteral(typeName, field.value, variables);
	  });
	  return value;
	}

	function _parseLiteral(typeName, ast, variables) {
	  switch (ast.kind) {
	    case Kind.STRING:
	    case Kind.BOOLEAN:
	      return ast.value;

	    case Kind.INT:
	    case Kind.FLOAT:
	      return parseFloat(ast.value);

	    case Kind.OBJECT:
	      return parseObject(typeName, ast, variables);

	    case Kind.LIST:
	      return ast.values.map(function (n) {
	        return _parseLiteral(typeName, n, variables);
	      });

	    case Kind.NULL:
	      return null;

	    case Kind.VARIABLE:
	      return variables ? variables[ast.name.value] : undefined;

	    default:
	      throw new TypeError(typeName + " cannot represent value: " + print(ast));
	  }
	} // This named export is intended for users of CommonJS. Users of ES modules
	//  should instead use the default export.


	var GraphQLJSON = new GraphQLScalarType({
	  name: 'JSON',
	  description: 'The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
	  specifiedByUrl: 'http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf',
	  serialize: identity,
	  parseValue: identity,
	  parseLiteral: function parseLiteral(ast, variables) {
	    return _parseLiteral('JSON', ast, variables);
	  }
	});
	var GraphQLJSONObject = new GraphQLScalarType({
	  name: 'JSONObject',
	  description: 'The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
	  specifiedByUrl: 'http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf',
	  serialize: ensureObject,
	  parseValue: ensureObject,
	  parseLiteral: function parseLiteral(ast, variables) {
	    if (ast.kind !== Kind.OBJECT) {
	      throw new TypeError("JSONObject cannot represent non-object value: " + print(ast));
	    }

	    return parseObject('JSONObject', ast, variables);
	  }
	});

	var DateType = new GraphQLScalarType({
	  name: 'Date',
	  description: 'Date type',
	  parseValue: function parseValue(value) {
	    // value comes from the client
	    return new Date(value); // sent to resolvers
	  },
	  serialize: function serialize(value) {
	    // value comes from resolvers
	    return value.toISOString(); // sent to the client
	  },
	  parseLiteral: function parseLiteral(ast) {
	    // ast comes from parsing the query
	    // this is where you can validate and transform
	    if (ast.kind !== Kind.STRING) {
	      throw new GraphQLError("Query error: Can only parse dates strings, got a: ".concat(ast.kind), [ast]);
	    }

	    if (isNaN(Date.parse(ast.value))) {
	      throw new GraphQLError("Query error: not a valid date", [ast]);
	    }

	    return new Date(ast.value);
	  }
	});

	var isNumeric = function isNumeric(value) {
	  return !isNaN(_parseFloat$2(value)) && isFinite(value);
	};

	var valuesAreNumeric = function valuesAreNumeric(values) {
	  return every$2(values).call(values, isNumeric);
	};

	var isInteger$5 = function isInteger(value) {
	  return isInteger$4(value);
	};

	var valuesAreInteger = function valuesAreInteger(values) {
	  return every$2(values).call(values, isInteger$5);
	};

	var isBoolean = function isBoolean(value) {
	  return typeof value === 'boolean';
	};

	var valuesAreBoolean = function valuesAreBoolean(values) {
	  return every$2(values).call(values, isBoolean);
	};

	var isString = function isString(value) {
	  return typeof value === 'string';
	};

	var valuesAreString = function valuesAreString(values) {
	  return every$2(values).call(values, isString);
	};

	var isArray$4 = function isArray(value) {
	  return isArray$3(value);
	};

	var valuesAreArray = function valuesAreArray(values) {
	  return every$2(values).call(values, isArray$4);
	};

	var isDate = function isDate(value) {
	  return value instanceof Date;
	};

	var valuesAreDate = function valuesAreDate(values) {
	  return every$2(values).call(values, isDate);
	};

	var isObject$1 = function isObject(value) {
	  return Object.prototype.toString.call(value) === '[object Object]';
	};

	var valuesAreObject = function valuesAreObject(values) {
	  return every$2(values).call(values, isObject$1);
	};

	var requiredTypeOrNormal = function requiredTypeOrNormal(type, isRequired) {
	  return isRequired ? new GraphQLNonNull(type) : type;
	};

	var getTypeFromValues = (function (name) {
	  var idArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	  var isRequired = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	  if (name === 'id' || name.substr(name.length - 3) === '_id' || includes$4(idArray).call(idArray, name)) {
	    return requiredTypeOrNormal(GraphQLID, isRequired);
	  }

	  if (values.length > 0) {
	    if (valuesAreArray(values)) {
	      var leafValues = reduce$2(values).call(values, function (agg, arr) {
	        forEach$2(arr).call(arr, function (value) {
	          return agg.push(value);
	        });

	        return agg;
	      }, []);

	      if (valuesAreBoolean(leafValues)) {
	        return requiredTypeOrNormal(new GraphQLList(GraphQLBoolean), isRequired);
	      }

	      if (valuesAreString(leafValues)) {
	        return requiredTypeOrNormal(new GraphQLList(GraphQLString), isRequired);
	      }

	      if (valuesAreInteger(leafValues)) {
	        return requiredTypeOrNormal(new GraphQLList(GraphQLInt), isRequired);
	      }

	      if (valuesAreNumeric(leafValues)) {
	        return requiredTypeOrNormal(new GraphQLList(GraphQLFloat), isRequired);
	      }

	      if (valuesAreObject(leafValues)) {
	        return requiredTypeOrNormal(GraphQLJSON, isRequired);
	      }

	      return requiredTypeOrNormal(new GraphQLList(GraphQLString), isRequired); // FIXME introspect further
	    }

	    if (valuesAreBoolean(values)) {
	      return requiredTypeOrNormal(GraphQLBoolean, isRequired);
	    }

	    if (valuesAreDate(values)) {
	      return requiredTypeOrNormal(DateType, isRequired);
	    }

	    if (valuesAreString(values)) {
	      return requiredTypeOrNormal(GraphQLString, isRequired);
	    }

	    if (valuesAreInteger(values)) {
	      return requiredTypeOrNormal(GraphQLInt, isRequired);
	    }

	    if (valuesAreNumeric(values)) {
	      return requiredTypeOrNormal(GraphQLFloat, isRequired);
	    }

	    if (valuesAreObject(values)) {
	      return requiredTypeOrNormal(GraphQLJSON, isRequired);
	    }
	  }

	  return requiredTypeOrNormal(GraphQLString, isRequired); // FIXME introspect further
	});

	/**
	 * Gets a list of values indexed by field based on a list of entities
	 * 
	 * @example
	 * const entities = [
	 *     {
	 *         id: 1,
	 *         title: "Lorem Ipsum",
	 *         views: 254,
	 *         user_id: 123,
	 *     },
	 *     {
	 *         id: 2,
	 *         title: "Sic Dolor amet",
	 *         views: 65,
	 *         user_id: 456,
	 *     },
	 * ];
	 * getValuesFromEntities(entities);
	 * // {
	 * //    id: [1, 2],
	 * //    title: ["Lorem Ipsum", "Sic Dolor amet"],
	 * //    views: [254, 65],
	 * //    user_id: [123, 456],
	 * // }
	 */
	var getValuesFromEntities = (function (entities) {
	  return reduce$2(entities).call(entities, function (values, entity) {
	    var _context;

	    forEach$2(_context = keys$2(entity)).call(_context, function (fieldName) {
	      if (!values[fieldName]) {
	        values[fieldName] = [];
	      }

	      if (entity[fieldName] != null) {
	        values[fieldName].push(entity[fieldName]);
	      }
	    });

	    return values;
	  }, {});
	});

	/**
	 * Get a list of GraphQL fields from a list of entities
	 * 
	 * @example
	 * const entities = [
	 *     {
	 *         "id": 1,
	 *         "title": "Lorem Ipsum",
	 *         "views": 254,
	 *         "user_id": 123,
	 *     },
	 *     {
	 *         "id": 2,
	 *         "title": "Sic Dolor amet",
	 *         "user_id": 456,
	 *     },
	 * ];
	 * const types = getFieldsFromEntities(entities);
	 * // {
	 * //    id: { type: new GraphQLNonNull(GraphQLString) },
	 * //    title: { type: new GraphQLNonNull(GraphQLString) },
	 * //    views: { type: GraphQLInt },
	 * //    user_id: { type: new GraphQLNonNull(GraphQLString) },
	 * // };
	 */

	var getFieldsFromEntities = (function (entities, idArray) {
	  var _context;

	  var checkRequired = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	  var fieldValues = getValuesFromEntities(entities);
	  var nbValues = entities.length;
	  return reduce$2(_context = keys$2(fieldValues)).call(_context, function (fields, fieldName) {
	    fields[fieldName] = {
	      type: getTypeFromValues(fieldName, idArray, fieldValues[fieldName], checkRequired ? fieldValues[fieldName].length === nbValues : false)
	    };
	    return fields;
	  }, {});
	});

	/**
	 * Get a list of GraphQLObjectType from data
	 * 
	 * @example
	 * const data = {
	 *    "posts": [
	 *        {
	 *            "id": 1,
	 *            "title": "Lorem Ipsum",
	 *            "views": 254,
	 *            "user_id": 123,
	 *        },
	 *        {
	 *            "id": 2,
	 *            "title": "Sic Dolor amet",
	 *            "views": 65,
	 *            "user_id": 456,
	 *        },
	 *    ],
	 *    "users": [
	 *        {
	 *            "id": 123,
	 *            "name": "John Doe"
	 *        },
	 *        {
	 *            "id": 456,
	 *            "name": "Jane Doe"
	 *        }
	 *    ],
	 * };
	 * const types = getTypesFromData(data);
	 * // [
	 * //     new GraphQLObjectType({
	 * //         name: "Posts",
	 * //         fields: {
	 * //             id: { type: graphql.GraphQLString },
	 * //             title: { type: graphql.GraphQLString },
	 * //             views: { type: graphql.GraphQLInt },
	 * //             user_id: { type: graphql.GraphQLString },
	 * //         }
	 * //     }),
	 * //     new GraphQLObjectType({
	 * //         name: "Users",
	 * //         fields: {
	 * //             id: { type: graphql.GraphQLString },
	 * //             name: { type: graphql.GraphQLString },
	 * //         }
	 * //     }),
	 * // ]
	 */

	var getTypesFromData = (function (data) {
	  var _context, _context2;

	  var idArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  return map$2(_context = map$2(_context2 = keys$2(data)).call(_context2, function (typeName) {
	    return {
	      name: inflection_1(inflection_3(typeName)),
	      fields: getFieldsFromEntities(data[typeName], idArr)
	    };
	  })).call(_context, function (typeObject) {
	    return new GraphQLObjectType(typeObject);
	  });
	});

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
	  defineProperty: objectDefineProperty.f
	});

	var defineProperty_1 = createCommonjsModule(function (module) {
	var Object = path.Object;

	var defineProperty = module.exports = function defineProperty(it, key, desc) {
	  return Object.defineProperty(it, key, desc);
	};

	if (Object.defineProperty.sham) defineProperty.sham = true;
	});

	var defineProperty$3 = defineProperty_1;

	var defineProperty$4 = defineProperty$3;

	function _defineProperty$4(obj, key, value) {
	  if (key in obj) {
	    defineProperty$4(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var defineProperty$5 = _defineProperty$4;

	var getRangeFiltersFromEntities = function getRangeFiltersFromEntities(entities, idArray) {
	  var _context;

	  var fieldValues = getValuesFromEntities(entities);
	  return reduce$2(_context = keys$2(fieldValues)).call(_context, function (fields, fieldName) {
	    var fieldType = getTypeFromValues(fieldName, idArray, fieldValues[fieldName], false);

	    if (fieldType == GraphQLInt || fieldType == GraphQLFloat || fieldType.name == 'Date') {
	      fields["".concat(fieldName, "_lt")] = {
	        type: fieldType
	      };
	      fields["".concat(fieldName, "_lte")] = {
	        type: fieldType
	      };
	      fields["".concat(fieldName, "_gt")] = {
	        type: fieldType
	      };
	      fields["".concat(fieldName, "_gte")] = {
	        type: fieldType
	      };
	    }

	    return fields;
	  }, {});
	};
	/**
	 * Get a list of GraphQLObjectType for filtering data
	 * 
	 * @example
	 * const data = {
	 *    "posts": [
	 *        {
	 *            "id": 1,
	 *            "title": "Lorem Ipsum",
	 *            "views": 254,
	 *            "user_id": 123,
	 *        },
	 *        {
	 *            "id": 2,
	 *            "title": "Sic Dolor amet",
	 *            "views": 65,
	 *            "user_id": 456,
	 *        },
	 *    ],
	 *    "users": [
	 *        {
	 *            "id": 123,
	 *            "name": "John Doe"
	 *        },
	 *        {
	 *            "id": 456,
	 *            "name": "Jane Doe"
	 *        }
	 *    ],
	 * };
	 * const types = getFilterTypesFromData(data);
	 * // {
	 * //     posts: new GraphQLInputObjectType({
	 * //         name: "PostFilter",
	 * //         fields: {
	 * //             q: { type: GraphQLString },
	 * //             id: { type: GraphQLString },
	 * //             title: { type: GraphQLString },
	 * //             views: { type: GraphQLInt },
	 * //             views_lt: { type: GraphQLInt },
	 * //             views_lte: { type: GraphQLInt },
	 * //             views_gt: { type: GraphQLInt },
	 * //             views_gte: { type: GraphQLInt },
	 * //             user_id: { type: GraphQLString },
	 * //         }
	 * //     }),
	 * //     users: new GraphQLObjectType({
	 * //         name: "UserFilter",
	 * //         fields: {
	 * //             q: { type: GraphQLString },
	 * //             id: { type: GraphQLString },
	 * //             name: { type: GraphQLString },
	 * //         }
	 * //     }),
	 * // }
	 */


	var getFilterTypesFromData = (function (data, idArray) {
	  var _context2;

	  return reduce$2(_context2 = keys$2(data)).call(_context2, function (types, key) {
	    return assign$2({}, types, defineProperty$5({}, getTypeFromKey(key), new GraphQLInputObjectType({
	      name: "".concat(getTypeFromKey(key), "Filter"),
	      fields: assign$2({
	        q: {
	          type: GraphQLString
	        }
	      }, getFieldsFromEntities(data[key], idArray, false), getRangeFiltersFromEntities(data[key], idArray))
	    })));
	  }, {});
	});

	/**
	 * Get a GraphQL schema from data
	 * 
	 * @example
	 * const data = {
	 *    "posts": [
	 *        {
	 *            "id": 1,
	 *            "title": "Lorem Ipsum",
	 *            "views": 254,
	 *            "user_id": 123,
	 *        },
	 *        {
	 *            "id": 2,
	 *            "title": "Sic Dolor amet",
	 *            "views": 65,
	 *            "user_id": 456,
	 *        },
	 *    ],
	 *    "users": [
	 *        {
	 *            "id": 123,
	 *            "name": "John Doe"
	 *        },
	 *        {
	 *            "id": 456,
	 *            "name": "Jane Doe"
	 *        }
	 *    ],
	 * };
	 * const types = getTypesFromData(data);
	 * // type Post {
	 * //     id: ID
	 * //     title: String
	 * //     views: Int
	 * //     user_id: ID
	 * // }
	 * //
	 * // type User {
	 * //     id: ID
	 * //     name: String
	 * // }
	 * //
	 * // type Query {
	 * //     Post(id: ID!): Post
	 * //     allPosts(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: String): [Post]
	 * //     User(id: ID!): User
	 * //     allUsers(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: String): [User]
	 * // }
	 * //
	 * // type Mutation {
	 * //     createPost(data: String): Post
	 * //     updatePost(data: String): Post
	 * //     removePost(id: ID!): Boolean
	 * //     createUser(data: String): User
	 * //     updateUser(data: String): User
	 * //     removeUser(id: ID!): Boolean
	 * // }
	 */

	var getSchemaFromData = (function (data) {
	  var _context2;

	  var idArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  if (typeof idArray === 'string') idArray = idArray.split(',');
	  var types = getTypesFromData(data);

	  var typesByName = reduce$2(types).call(types, function (types, type) {
	    types[type.name] = type;
	    return types;
	  }, {});

	  var filterTypesByName = getFilterTypesFromData(data, idArray);
	  var listMetadataType = new GraphQLObjectType({
	    name: 'ListMetadata',
	    fields: {
	      count: {
	        type: GraphQLInt
	      }
	    }
	  });
	  var queryType = new GraphQLObjectType({
	    name: 'Query',
	    fields: reduce$2(types).call(types, function (fields, type) {
	      fields[type.name] = {
	        type: typesByName[type.name],
	        args: {
	          id: {
	            type: new GraphQLNonNull(GraphQLID)
	          }
	        }
	      };
	      fields["all".concat(inflection_1(inflection_2(type.name)))] = {
	        type: new GraphQLList(typesByName[type.name]),
	        args: {
	          page: {
	            type: GraphQLInt
	          },
	          perPage: {
	            type: GraphQLInt
	          },
	          sortField: {
	            type: GraphQLString
	          },
	          sortOrder: {
	            type: GraphQLString
	          },
	          filter: {
	            type: filterTypesByName[type.name]
	          }
	        }
	      };
	      fields["_all".concat(inflection_1(inflection_2(type.name)), "Meta")] = {
	        type: listMetadataType,
	        args: {
	          page: {
	            type: GraphQLInt
	          },
	          perPage: {
	            type: GraphQLInt
	          },
	          filter: {
	            type: GraphQLString
	          }
	        }
	      };
	      return fields;
	    }, {})
	  });
	  var mutationType = new GraphQLObjectType({
	    name: 'Mutation',
	    fields: reduce$2(types).call(types, function (fields, type) {
	      var _context;

	      var typeFields = typesByName[type.name].getFields();

	      var nullableTypeFields = reduce$2(_context = keys$2(typeFields)).call(_context, function (f, fieldName) {
	        f[fieldName] = assign$2({}, typeFields[fieldName], {
	          type: fieldName !== 'id' && typeFields[fieldName].type instanceof GraphQLNonNull ? typeFields[fieldName].type.ofType : typeFields[fieldName].type
	        });
	        return f;
	      }, {});

	      fields["create".concat(type.name)] = {
	        type: typesByName[type.name],
	        args: typeFields
	      };
	      fields["update".concat(type.name)] = {
	        type: typesByName[type.name],
	        args: nullableTypeFields
	      };
	      fields["remove".concat(type.name)] = {
	        type: GraphQLBoolean,
	        args: {
	          id: {
	            type: new GraphQLNonNull(GraphQLID)
	          }
	        }
	      };
	      return fields;
	    }, {})
	  });
	  var schema = new GraphQLSchema({
	    query: queryType,
	    mutation: mutationType
	  });
	  /**
	   * extend schema to add relationship fields
	   * 
	   * @example
	   * If the `post` key contains a 'user_id' field, then
	   * add one-to-many and many-to-one type extensions:
	   *     extend type Post { User: User }
	   *     extend type User { Posts: [Post] }
	   */

	  var schemaExtension = reduce$2(_context2 = values$2(typesByName)).call(_context2, function (ext, type) {
	    var _context3, _context4;

	    map$2(_context3 = filter$2(_context4 = keys$2(type.getFields())).call(_context4, isRelationshipFieldImport)).call(_context3, function (fieldName) {
	      var _context5, _context6, _context7, _context8, _context9;

	      var relType = getRelatedType(fieldName);
	      var rel = inflection_2(type.toString());
	      ext += concat$2(_context5 = concat$2(_context6 = concat$2(_context7 = concat$2(_context8 = concat$2(_context9 = "\nextend type ".concat(type, " { ")).call(_context9, relType, ": ")).call(_context8, relType, " }\nextend type ")).call(_context7, relType, " { ")).call(_context6, rel, ": [")).call(_context5, type, "] }");
	    });

	    return ext;
	  }, '');

	  return schemaExtension ? extendSchema(schema, parse(schemaExtension)) : schema;
	});

	var isRelationshipField = isRelationshipFieldImport;

	exports.default = getSchemaFromData;
	exports.getRelatedKey = getRelatedKey;
	exports.getRelatedType = getRelatedType;
	exports.getRelationshipFromKey = getRelationshipFromKey;
	exports.getReverseRelatedField = getReverseRelatedField;
	exports.getTypeFromKey = getTypeFromKey;
	exports.isRelationshipField = isRelationshipField;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
