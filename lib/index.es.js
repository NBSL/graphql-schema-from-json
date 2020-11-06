import { GraphQLScalarType, GraphQLError, GraphQLNonNull, GraphQLList, GraphQLBoolean, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLID, GraphQLObjectType, GraphQLInputObjectType, GraphQLSchema, extendSchema, parse } from 'graphql';

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
var getRelationshipFromKey = function (key) { return inflection_1(key); };
/**
 *
 * @param {String} fieldName 'users'
 * @return {String} 'User'
 */
var getTypeFromKey = function (key) { return inflection_1(inflection_3(key)); };
/**
 *
 * @param {String} fieldName 'user_id'
 * @return {String} 'users'
 */
var getRelatedKey = function (fieldName) {
    return inflection_2(fieldName.substr(0, fieldName.length - 3));
};
/**
 *
 * @param {String} key 'users'
 * @return {String} 'user_id'
 */
var getReverseRelatedField = function (key) { return inflection_3(key) + "_id"; };
/**
 *
 * @param {String} fieldName 'user_id'
 * @return {String} 'User'
 */
var getRelatedType = function (fieldName) {
    return getTypeFromKey(fieldName.substr(0, fieldName.length - 3));
};

var isRelationshipFieldImport = (function (fieldName) { return fieldName.endsWith('_id'); });

// istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
var nodejsCustomInspectSymbol = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('nodejs.util.inspect.custom') : undefined;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
/**
 * Used to print values in error messages.
 */

function inspect(value) {
  return formatValue(value, []);
}

function formatValue(value, seenValues) {
  switch (_typeof(value)) {
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
 * Produces the value of a block string from its parsed raw value, similar to
 * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 *
 * @internal
 */
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
    parseValue: function (value) {
        // value comes from the client
        return new Date(value); // sent to resolvers
    },
    serialize: function (value) {
        // value comes from resolvers
        return value.toISOString(); // sent to the client
    },
    parseLiteral: function (ast) {
        // ast comes from parsing the query
        // this is where you can validate and transform
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError("Query error: Can only parse dates strings, got a: " + ast.kind, [ast]);
        }
        if (isNaN(Date.parse(ast.value))) {
            throw new GraphQLError("Query error: not a valid date", [ast]);
        }
        return new Date(ast.value);
    },
});

var isNumeric = function (value) { return !isNaN(parseFloat(value)) && isFinite(parseFloat(value)); };
var valuesAreNumeric = function (values) { return values.every(isNumeric); };
var isInteger = function (value) { return Number.isInteger(value); };
var valuesAreInteger = function (values) { return values.every(isInteger); };
var isBoolean = function (value) { return value === 'boolean'; };
var valuesAreBoolean = function (values) { return values.every(isBoolean); };
var isString = function (value) { return value === 'string'; };
var valuesAreString = function (values) { return values.every(isString); };
var isArray = function (value) { return Array.isArray(value); };
var valuesAreArray = function (values) { return values.every(isArray); };
var isDate = function (value) { return value instanceof Date; };
var valuesAreDate = function (values) { return values.every(isDate); };
var isObject = function (value) {
    return Object.prototype.toString.call(value) === '[object Object]';
};
var valuesAreObject = function (values) { return values.every(isObject); };
function requiredTypeOrNormal(type, isRequired) {
    return isRequired ? new GraphQLNonNull(type) : type;
}
var getTypeFromValues = (function (name, idArray, values, isRequired) {
    if (idArray === void 0) { idArray = []; }
    if (values === void 0) { values = []; }
    if (isRequired === void 0) { isRequired = false; }
    if (name === 'id' || name.substr(name.length - 3) === '_id' || idArray.includes(name)) {
        return requiredTypeOrNormal(GraphQLID, isRequired);
    }
    if (values.length > 0) {
        if (valuesAreArray(values)) {
            var leafValues = values.reduce(function (agg, arr) {
                arr.forEach(function (value) { return agg.push(value); });
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
    return entities.reduce(function (values, entity) {
        Object.keys(entity).forEach(function (fieldName) {
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

// import { GraphQLFieldConfigMap, GraphQLInputFieldConfigMap } from 'graphql/type/definition';
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
var getFieldsFromEntities = (function (entities, idArray, checkRequired) {
    if (checkRequired === void 0) { checkRequired = true; }
    var fieldValues = getValuesFromEntities(entities);
    var nbValues = entities.length;
    return Object.keys(fieldValues).reduce(function (fields, fieldName) {
        fields[fieldName] = {
            type: getTypeFromValues(fieldName, idArray, fieldValues[fieldName], checkRequired
                ? fieldValues[fieldName].length === nbValues
                : false),
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
var getTypesFromData = (function (data, idArr) {
    if (idArr === void 0) { idArr = []; }
    return Object.keys(data)
        .map(function (typeName) { return ({
        name: inflection_1(inflection_3(typeName)),
        fields: getFieldsFromEntities(data[typeName], idArr),
    }); })
        .map(function (typeObject) { return new GraphQLObjectType(typeObject); });
});

var getRangeFiltersFromEntities = function (entities, idArray) {
    var fieldValues = getValuesFromEntities(entities);
    return Object.keys(fieldValues).reduce(function (fields, fieldName) {
        var fieldType = getTypeFromValues(fieldName, idArray, fieldValues[fieldName], false);
        if (fieldType == GraphQLInt ||
            fieldType == GraphQLFloat ||
            fieldName == 'Date') {
            fields[fieldName + "_lt"] = { type: fieldType };
            fields[fieldName + "_lte"] = { type: fieldType };
            fields[fieldName + "_gt"] = { type: fieldType };
            fields[fieldName + "_gte"] = { type: fieldType };
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
    return Object.keys(data).reduce(function (types, key) {
        var _a;
        return Object.assign({}, types, (_a = {},
            _a[getTypeFromKey(key)] = new GraphQLInputObjectType({
                name: getTypeFromKey(key) + "Filter",
                fields: Object.assign({
                    q: { type: GraphQLString },
                }, getFieldsFromEntities(data[key], idArray, false), getRangeFiltersFromEntities(data[key], idArray)),
            }),
            _a));
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
var getSchemaFromData = (function (data, idArray) {
    if (idArray === void 0) { idArray = []; }
    if (typeof idArray === 'string')
        idArray = idArray.split(',');
    var types = getTypesFromData(data);
    var typesByName = types.reduce(function (types, type) {
        types[type.name] = type;
        return types;
    }, {});
    // console.log(typesByName);
    // for (const type of types) {
    //     console.log(type);
    // }
    var filterTypesByName = getFilterTypesFromData(data, idArray);
    // console.log(filterTypesByName);
    var listMetadataType = new GraphQLObjectType({
        name: 'ListMetadata',
        fields: {
            count: { type: GraphQLInt },
        },
    });
    // console.log(listMetadataType);
    var queryType = new GraphQLObjectType({
        name: 'Query',
        fields: types.reduce(function (fields, type) {
            fields[type.name] = {
                type: typesByName[type.name],
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) },
                },
            };
            fields["all" + inflection_1(inflection_2(type.name))] = {
                type: new GraphQLList(typesByName[type.name]),
                args: {
                    page: { type: GraphQLInt },
                    perPage: { type: GraphQLInt },
                    sortField: { type: GraphQLString },
                    sortOrder: { type: GraphQLString },
                    filter: { type: filterTypesByName[type.name] },
                },
            };
            fields["_all" + inflection_1(inflection_2(type.name)) + "Meta"] = {
                type: listMetadataType,
                args: {
                    page: { type: GraphQLInt },
                    perPage: { type: GraphQLInt },
                    filter: { type: GraphQLString },
                },
            };
            return fields;
        }, {}),
    });
    // console.log(queryType);
    var mutationType = new GraphQLObjectType({
        name: 'Mutation',
        fields: types.reduce(function (fields, type) {
            var typeFields = typesByName[type.name].getFields();
            var nullableTypeFields = Object.keys(typeFields).reduce(function (f, fieldName) {
                f[fieldName] = Object.assign({}, typeFields[fieldName], {
                    type: fieldName !== 'id' &&
                        typeFields[fieldName].type instanceof GraphQLNonNull
                        ? typeFields[fieldName].type.ofType
                        : typeFields[fieldName].type,
                });
                return f;
            }, {});
            fields["create" + type.name] = {
                type: typesByName[type.name],
                args: typeFields,
            };
            fields["update" + type.name] = {
                type: typesByName[type.name],
                args: nullableTypeFields,
            };
            fields["remove" + type.name] = {
                type: GraphQLBoolean,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) },
                },
            };
            return fields;
        }, {}),
    });
    console.log(mutationType);
    var schema = new GraphQLSchema({
        query: queryType,
        mutation: mutationType,
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
    var schemaExtension = Object.values(typesByName).reduce(function (ext, type) {
        Object.keys(type.getFields())
            .filter(isRelationshipFieldImport)
            .map(function (fieldName) {
            var relType = getRelatedType(fieldName);
            var rel = inflection_2(type.toString());
            ext += "\n    extend type " + type + " { " + relType + ": " + relType + " }\n    extend type " + relType + " { " + rel + ": [" + type + "] }";
        });
        return ext;
    }, '');
    return schemaExtension
        ? extendSchema(schema, parse(schemaExtension))
        : schema;
});

var isRelationshipField = isRelationshipFieldImport;

export default getSchemaFromData;
export { getRelatedKey, getRelatedType, getRelationshipFromKey, getReverseRelatedField, getTypeFromKey, isRelationshipField };
//# sourceMappingURL=index.es.js.map
