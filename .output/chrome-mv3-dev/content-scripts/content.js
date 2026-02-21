var content = (function() {
  "use strict";
  function defineContentScript(definition2) {
    return definition2;
  }
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getAugmentedNamespace(n) {
    if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
    var f = n.default;
    if (typeof f == "function") {
      var a = function a2() {
        var isInstance = false;
        try {
          isInstance = this instanceof a2;
        } catch {
        }
        if (isInstance) {
          return Reflect.construct(f, arguments, this.constructor);
        }
        return f.apply(this, arguments);
      };
      a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  var cryptoJs$1 = { exports: {} };
  function commonjsRequire(path) {
    throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }
  var core$1 = { exports: {} };
  const __viteBrowserExternal = new Proxy({}, {
    get(_, key) {
      throw new Error(`Module "" has been externalized for browser compatibility. Cannot access ".${key}" in client code.  See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
    }
  });
  const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: __viteBrowserExternal
  }, Symbol.toStringTag, { value: "Module" }));
  const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
  var core = core$1.exports;
  var hasRequiredCore;
  function requireCore() {
    if (hasRequiredCore) return core$1.exports;
    hasRequiredCore = 1;
    (function(module, exports$1) {
      (function(root, factory) {
        {
          module.exports = factory();
        }
      })(core, function() {
        var CryptoJS = CryptoJS || (function(Math2, undefined$1) {
          var crypto;
          if (typeof window !== "undefined" && window.crypto) {
            crypto = window.crypto;
          }
          if (typeof self !== "undefined" && self.crypto) {
            crypto = self.crypto;
          }
          if (typeof globalThis !== "undefined" && globalThis.crypto) {
            crypto = globalThis.crypto;
          }
          if (!crypto && typeof window !== "undefined" && window.msCrypto) {
            crypto = window.msCrypto;
          }
          if (!crypto && typeof commonjsGlobal !== "undefined" && commonjsGlobal.crypto) {
            crypto = commonjsGlobal.crypto;
          }
          if (!crypto && typeof commonjsRequire === "function") {
            try {
              crypto = require$$0;
            } catch (err) {
            }
          }
          var cryptoSecureRandomInt = function() {
            if (crypto) {
              if (typeof crypto.getRandomValues === "function") {
                try {
                  return crypto.getRandomValues(new Uint32Array(1))[0];
                } catch (err) {
                }
              }
              if (typeof crypto.randomBytes === "function") {
                try {
                  return crypto.randomBytes(4).readInt32LE();
                } catch (err) {
                }
              }
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
          };
          var create = Object.create || /* @__PURE__ */ (function() {
            function F() {
            }
            return function(obj) {
              var subtype;
              F.prototype = obj;
              subtype = new F();
              F.prototype = null;
              return subtype;
            };
          })();
          var C = {};
          var C_lib = C.lib = {};
          var Base = C_lib.Base = /* @__PURE__ */ (function() {
            return {
              /**
               * Creates a new object that inherits from this object.
               *
               * @param {Object} overrides Properties to copy into the new object.
               *
               * @return {Object} The new object.
               *
               * @static
               *
               * @example
               *
               *     var MyType = CryptoJS.lib.Base.extend({
               *         field: 'value',
               *
               *         method: function () {
               *         }
               *     });
               */
              extend: function(overrides) {
                var subtype = create(this);
                if (overrides) {
                  subtype.mixIn(overrides);
                }
                if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                  subtype.init = function() {
                    subtype.$super.init.apply(this, arguments);
                  };
                }
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
              },
              /**
               * Extends this object and runs the init method.
               * Arguments to create() will be passed to init().
               *
               * @return {Object} The new object.
               *
               * @static
               *
               * @example
               *
               *     var instance = MyType.create();
               */
              create: function() {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
              },
              /**
               * Initializes a newly created object.
               * Override this method to add some logic when your objects are created.
               *
               * @example
               *
               *     var MyType = CryptoJS.lib.Base.extend({
               *         init: function () {
               *             // ...
               *         }
               *     });
               */
              init: function() {
              },
              /**
               * Copies properties into this object.
               *
               * @param {Object} properties The properties to mix in.
               *
               * @example
               *
               *     MyType.mixIn({
               *         field: 'value'
               *     });
               */
              mixIn: function(properties) {
                for (var propertyName in properties) {
                  if (properties.hasOwnProperty(propertyName)) {
                    this[propertyName] = properties[propertyName];
                  }
                }
                if (properties.hasOwnProperty("toString")) {
                  this.toString = properties.toString;
                }
              },
              /**
               * Creates a copy of this object.
               *
               * @return {Object} The clone.
               *
               * @example
               *
               *     var clone = instance.clone();
               */
              clone: function() {
                return this.init.prototype.extend(this);
              }
            };
          })();
          var WordArray = C_lib.WordArray = Base.extend({
            /**
             * Initializes a newly created word array.
             *
             * @param {Array} words (Optional) An array of 32-bit words.
             * @param {number} sigBytes (Optional) The number of significant bytes in the words.
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.create();
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
             */
            init: function(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined$1) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 4;
              }
            },
            /**
             * Converts this word array to a string.
             *
             * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
             *
             * @return {string} The stringified word array.
             *
             * @example
             *
             *     var string = wordArray + '';
             *     var string = wordArray.toString();
             *     var string = wordArray.toString(CryptoJS.enc.Utf8);
             */
            toString: function(encoder) {
              return (encoder || Hex).stringify(this);
            },
            /**
             * Concatenates a word array to this word array.
             *
             * @param {WordArray} wordArray The word array to append.
             *
             * @return {WordArray} This word array.
             *
             * @example
             *
             *     wordArray1.concat(wordArray2);
             */
            concat: function(wordArray) {
              var thisWords = this.words;
              var thatWords = wordArray.words;
              var thisSigBytes = this.sigBytes;
              var thatSigBytes = wordArray.sigBytes;
              this.clamp();
              if (thisSigBytes % 4) {
                for (var i = 0; i < thatSigBytes; i++) {
                  var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                  thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                }
              } else {
                for (var j = 0; j < thatSigBytes; j += 4) {
                  thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
                }
              }
              this.sigBytes += thatSigBytes;
              return this;
            },
            /**
             * Removes insignificant bits.
             *
             * @example
             *
             *     wordArray.clamp();
             */
            clamp: function() {
              var words = this.words;
              var sigBytes = this.sigBytes;
              words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
              words.length = Math2.ceil(sigBytes / 4);
            },
            /**
             * Creates a copy of this word array.
             *
             * @return {WordArray} The clone.
             *
             * @example
             *
             *     var clone = wordArray.clone();
             */
            clone: function() {
              var clone = Base.clone.call(this);
              clone.words = this.words.slice(0);
              return clone;
            },
            /**
             * Creates a word array filled with random bytes.
             *
             * @param {number} nBytes The number of random bytes to generate.
             *
             * @return {WordArray} The random word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.random(16);
             */
            random: function(nBytes) {
              var words = [];
              for (var i = 0; i < nBytes; i += 4) {
                words.push(cryptoSecureRandomInt());
              }
              return new WordArray.init(words, nBytes);
            }
          });
          var C_enc = C.enc = {};
          var Hex = C_enc.Hex = {
            /**
             * Converts a word array to a hex string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The hex string.
             *
             * @static
             *
             * @example
             *
             *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var hexChars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 15).toString(16));
              }
              return hexChars.join("");
            },
            /**
             * Converts a hex string to a word array.
             *
             * @param {string} hexStr The hex string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
             */
            parse: function(hexStr) {
              var hexStrLength = hexStr.length;
              var words = [];
              for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
              }
              return new WordArray.init(words, hexStrLength / 2);
            }
          };
          var Latin1 = C_enc.Latin1 = {
            /**
             * Converts a word array to a Latin1 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Latin1 string.
             *
             * @static
             *
             * @example
             *
             *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var latin1Chars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                latin1Chars.push(String.fromCharCode(bite));
              }
              return latin1Chars.join("");
            },
            /**
             * Converts a Latin1 string to a word array.
             *
             * @param {string} latin1Str The Latin1 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
             */
            parse: function(latin1Str) {
              var latin1StrLength = latin1Str.length;
              var words = [];
              for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
              }
              return new WordArray.init(words, latin1StrLength);
            }
          };
          var Utf8 = C_enc.Utf8 = {
            /**
             * Converts a word array to a UTF-8 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-8 string.
             *
             * @static
             *
             * @example
             *
             *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
             */
            stringify: function(wordArray) {
              try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
              } catch (e) {
                throw new Error("Malformed UTF-8 data");
              }
            },
            /**
             * Converts a UTF-8 string to a word array.
             *
             * @param {string} utf8Str The UTF-8 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
             */
            parse: function(utf8Str) {
              return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
          };
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            /**
             * Resets this block algorithm's data buffer to its initial state.
             *
             * @example
             *
             *     bufferedBlockAlgorithm.reset();
             */
            reset: function() {
              this._data = new WordArray.init();
              this._nDataBytes = 0;
            },
            /**
             * Adds new data to this block algorithm's buffer.
             *
             * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
             *
             * @example
             *
             *     bufferedBlockAlgorithm._append('data');
             *     bufferedBlockAlgorithm._append(wordArray);
             */
            _append: function(data) {
              if (typeof data == "string") {
                data = Utf8.parse(data);
              }
              this._data.concat(data);
              this._nDataBytes += data.sigBytes;
            },
            /**
             * Processes available data blocks.
             *
             * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
             *
             * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
             *
             * @return {WordArray} The processed data.
             *
             * @example
             *
             *     var processedData = bufferedBlockAlgorithm._process();
             *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
             */
            _process: function(doFlush) {
              var processedWords;
              var data = this._data;
              var dataWords = data.words;
              var dataSigBytes = data.sigBytes;
              var blockSize = this.blockSize;
              var blockSizeBytes = blockSize * 4;
              var nBlocksReady = dataSigBytes / blockSizeBytes;
              if (doFlush) {
                nBlocksReady = Math2.ceil(nBlocksReady);
              } else {
                nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
              }
              var nWordsReady = nBlocksReady * blockSize;
              var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
              if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                  this._doProcessBlock(dataWords, offset);
                }
                processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
              }
              return new WordArray.init(processedWords, nBytesReady);
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = bufferedBlockAlgorithm.clone();
             */
            clone: function() {
              var clone = Base.clone.call(this);
              clone._data = this._data.clone();
              return clone;
            },
            _minBufferSize: 0
          });
          C_lib.Hasher = BufferedBlockAlgorithm.extend({
            /**
             * Configuration options.
             */
            cfg: Base.extend(),
            /**
             * Initializes a newly created hasher.
             *
             * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
             *
             * @example
             *
             *     var hasher = CryptoJS.algo.SHA256.create();
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
              this.reset();
            },
            /**
             * Resets this hasher to its initial state.
             *
             * @example
             *
             *     hasher.reset();
             */
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            /**
             * Updates this hasher with a message.
             *
             * @param {WordArray|string} messageUpdate The message to append.
             *
             * @return {Hasher} This hasher.
             *
             * @example
             *
             *     hasher.update('message');
             *     hasher.update(wordArray);
             */
            update: function(messageUpdate) {
              this._append(messageUpdate);
              this._process();
              return this;
            },
            /**
             * Finalizes the hash computation.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} messageUpdate (Optional) A final message update.
             *
             * @return {WordArray} The hash.
             *
             * @example
             *
             *     var hash = hasher.finalize();
             *     var hash = hasher.finalize('message');
             *     var hash = hasher.finalize(wordArray);
             */
            finalize: function(messageUpdate) {
              if (messageUpdate) {
                this._append(messageUpdate);
              }
              var hash = this._doFinalize();
              return hash;
            },
            blockSize: 512 / 32,
            /**
             * Creates a shortcut function to a hasher's object interface.
             *
             * @param {Hasher} hasher The hasher to create a helper for.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
             */
            _createHelper: function(hasher) {
              return function(message, cfg) {
                return new hasher.init(cfg).finalize(message);
              };
            },
            /**
             * Creates a shortcut function to the HMAC's object interface.
             *
             * @param {Hasher} hasher The hasher to use in this HMAC helper.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
             */
            _createHmacHelper: function(hasher) {
              return function(message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
              };
            }
          });
          var C_algo = C.algo = {};
          return C;
        })(Math);
        return CryptoJS;
      });
    })(core$1);
    return core$1.exports;
  }
  var x64Core$1 = { exports: {} };
  var x64Core = x64Core$1.exports;
  var hasRequiredX64Core;
  function requireX64Core() {
    if (hasRequiredX64Core) return x64Core$1.exports;
    hasRequiredX64Core = 1;
    (function(module, exports$1) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(x64Core, function(CryptoJS) {
        (function(undefined$1) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var X32WordArray = C_lib.WordArray;
          var C_x64 = C.x64 = {};
          C_x64.Word = Base.extend({
            /**
             * Initializes a newly created 64-bit word.
             *
             * @param {number} high The high 32 bits.
             * @param {number} low The low 32 bits.
             *
             * @example
             *
             *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
             */
            init: function(high, low) {
              this.high = high;
              this.low = low;
            }
            /**
             * Bitwise NOTs this word.
             *
             * @return {X64Word} A new x64-Word object after negating.
             *
             * @example
             *
             *     var negated = x64Word.not();
             */
            // not: function () {
            // var high = ~this.high;
            // var low = ~this.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise ANDs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to AND with this word.
             *
             * @return {X64Word} A new x64-Word object after ANDing.
             *
             * @example
             *
             *     var anded = x64Word.and(anotherX64Word);
             */
            // and: function (word) {
            // var high = this.high & word.high;
            // var low = this.low & word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise ORs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to OR with this word.
             *
             * @return {X64Word} A new x64-Word object after ORing.
             *
             * @example
             *
             *     var ored = x64Word.or(anotherX64Word);
             */
            // or: function (word) {
            // var high = this.high | word.high;
            // var low = this.low | word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise XORs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to XOR with this word.
             *
             * @return {X64Word} A new x64-Word object after XORing.
             *
             * @example
             *
             *     var xored = x64Word.xor(anotherX64Word);
             */
            // xor: function (word) {
            // var high = this.high ^ word.high;
            // var low = this.low ^ word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Shifts this word n bits to the left.
             *
             * @param {number} n The number of bits to shift.
             *
             * @return {X64Word} A new x64-Word object after shifting.
             *
             * @example
             *
             *     var shifted = x64Word.shiftL(25);
             */
            // shiftL: function (n) {
            // if (n < 32) {
            // var high = (this.high << n) | (this.low >>> (32 - n));
            // var low = this.low << n;
            // } else {
            // var high = this.low << (n - 32);
            // var low = 0;
            // }
            // return X64Word.create(high, low);
            // },
            /**
             * Shifts this word n bits to the right.
             *
             * @param {number} n The number of bits to shift.
             *
             * @return {X64Word} A new x64-Word object after shifting.
             *
             * @example
             *
             *     var shifted = x64Word.shiftR(7);
             */
            // shiftR: function (n) {
            // if (n < 32) {
            // var low = (this.low >>> n) | (this.high << (32 - n));
            // var high = this.high >>> n;
            // } else {
            // var low = this.high >>> (n - 32);
            // var high = 0;
            // }
            // return X64Word.create(high, low);
            // },
            /**
             * Rotates this word n bits to the left.
             *
             * @param {number} n The number of bits to rotate.
             *
             * @return {X64Word} A new x64-Word object after rotating.
             *
             * @example
             *
             *     var rotated = x64Word.rotL(25);
             */
            // rotL: function (n) {
            // return this.shiftL(n).or(this.shiftR(64 - n));
            // },
            /**
             * Rotates this word n bits to the right.
             *
             * @param {number} n The number of bits to rotate.
             *
             * @return {X64Word} A new x64-Word object after rotating.
             *
             * @example
             *
             *     var rotated = x64Word.rotR(7);
             */
            // rotR: function (n) {
            // return this.shiftR(n).or(this.shiftL(64 - n));
            // },
            /**
             * Adds this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to add with this word.
             *
             * @return {X64Word} A new x64-Word object after adding.
             *
             * @example
             *
             *     var added = x64Word.add(anotherX64Word);
             */
            // add: function (word) {
            // var low = (this.low + word.low) | 0;
            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
            // var high = (this.high + word.high + carry) | 0;
            // return X64Word.create(high, low);
            // }
          });
          C_x64.WordArray = Base.extend({
            /**
             * Initializes a newly created word array.
             *
             * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
             * @param {number} sigBytes (Optional) The number of significant bytes in the words.
             *
             * @example
             *
             *     var wordArray = CryptoJS.x64.WordArray.create();
             *
             *     var wordArray = CryptoJS.x64.WordArray.create([
             *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
             *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
             *     ]);
             *
             *     var wordArray = CryptoJS.x64.WordArray.create([
             *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
             *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
             *     ], 10);
             */
            init: function(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined$1) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 8;
              }
            },
            /**
             * Converts this 64-bit word array to a 32-bit word array.
             *
             * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
             *
             * @example
             *
             *     var x32WordArray = x64WordArray.toX32();
             */
            toX32: function() {
              var x64Words = this.words;
              var x64WordsLength = x64Words.length;
              var x32Words = [];
              for (var i = 0; i < x64WordsLength; i++) {
                var x64Word = x64Words[i];
                x32Words.push(x64Word.high);
                x32Words.push(x64Word.low);
              }
              return X32WordArray.create(x32Words, this.sigBytes);
            },
            /**
             * Creates a copy of this word array.
             *
             * @return {X64WordArray} The clone.
             *
             * @example
             *
             *     var clone = x64WordArray.clone();
             */
            clone: function() {
              var clone = Base.clone.call(this);
              var words = clone.words = this.words.slice(0);
              var wordsLength = words.length;
              for (var i = 0; i < wordsLength; i++) {
                words[i] = words[i].clone();
              }
              return clone;
            }
          });
        })();
        return CryptoJS;
      });
    })(x64Core$1);
    return x64Core$1.exports;
  }
  var libTypedarrays$1 = { exports: {} };
  var libTypedarrays = libTypedarrays$1.exports;
  var hasRequiredLibTypedarrays;
  function requireLibTypedarrays() {
    if (hasRequiredLibTypedarrays) return libTypedarrays$1.exports;
    hasRequiredLibTypedarrays = 1;
    (function(module, exports$1) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(libTypedarrays, function(CryptoJS) {
        (function() {
          if (typeof ArrayBuffer != "function") {
            return;
          }
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var superInit = WordArray.init;
          var subInit = WordArray.init = function(typedArray) {
            if (typedArray instanceof ArrayBuffer) {
              typedArray = new Uint8Array(typedArray);
            }
            if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
              typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
            }
            if (typedArray instanceof Uint8Array) {
              var typedArrayByteLength = typedArray.byteLength;
              var words = [];
              for (var i = 0; i < typedArrayByteLength; i++) {
                words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
              }
              superInit.call(this, words, typedArrayByteLength);
            } else {
              superInit.apply(this, arguments);
            }
          };
          subInit.prototype = WordArray;
        })();
        return CryptoJS.lib.WordArray;
      });
    })(libTypedarrays$1);
    return libTypedarrays$1.exports;
  }
  var encUtf16$1 = { exports: {} };
  var encUtf16 = encUtf16$1.exports;
  var hasRequiredEncUtf16;
  function requireEncUtf16() {
    if (hasRequiredEncUtf16) return encUtf16$1.exports;
    hasRequiredEncUtf16 = 1;
    (function(module, exports$1) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(encUtf16, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          C_enc.Utf16 = C_enc.Utf16BE = {
            /**
             * Converts a word array to a UTF-16 BE string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-16 BE string.
             *
             * @static
             *
             * @example
             *
             *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var utf16Chars = [];
              for (var i = 0; i < sigBytes; i += 2) {
                var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
                utf16Chars.push(String.fromCharCode(codePoint));
              }
              return utf16Chars.join("");
            },
            /**
             * Converts a UTF-16 BE string to a word array.
             *
             * @param {string} utf16Str The UTF-16 BE string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
             */
            parse: function(utf16Str) {
              var utf16StrLength = utf16Str.length;
              var words = [];
              for (var i = 0; i < utf16StrLength; i++) {
                words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
              }
              return WordArray.create(words, utf16StrLength * 2);
            }
          };
          C_enc.Utf16LE = {
            /**
             * Converts a word array to a UTF-16 LE string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-16 LE string.
             *
             * @static
             *
             * @example
             *
             *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var utf16Chars = [];
              for (var i = 0; i < sigBytes; i += 2) {
                var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 65535);
                utf16Chars.push(String.fromCharCode(codePoint));
              }
              return utf16Chars.join("");
            },
            /**
             * Converts a UTF-16 LE string to a word array.
             *
             * @param {string} utf16Str The UTF-16 LE string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
             */
            parse: function(utf16Str) {
              var utf16StrLength = utf16Str.length;
              var words = [];
              for (var i = 0; i < utf16StrLength; i++) {
                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
              }
              return WordArray.create(words, utf16StrLength * 2);
            }
          };
          function swapEndian(word) {
            return word << 8 & 4278255360 | word >>> 8 & 16711935;
          }
        })();
        return CryptoJS.enc.Utf16;
      });
    })(encUtf16$1);
    return encUtf16$1.exports;
  }
  var encBase64$1 = { exports: {} };
  var encBase64 = encBase64$1.exports;
  var hasRequiredEncBase64;
  function requireEncBase64() {
    if (hasRequiredEncBase64) return encBase64$1.exports;
    hasRequiredEncBase64 = 1;
    (function(module, exports$1) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(encBase64, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          C_enc.Base64 = {
            /**
             * Converts a word array to a Base64 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Base64 string.
             *
             * @static
             *
             * @example
             *
             *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = this._map;
              wordArray.clamp();
              var base64Chars = [];
              for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
                var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }
              return base64Chars.join("");
            },
            /**
             * Converts a Base64 string to a word array.
             *
             * @param {string} base64Str The Base64 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
             */
            parse: function(base64Str) {
              var base64StrLength = base64Str.length;
              var map = this._map;
              var reverseMap = this._reverseMap;
              if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                  reverseMap[map.charCodeAt(j)] = j;
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              }
              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
          };
          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
              if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }
            return WordArray.create(words, nBytes);
          }
        })();
        return CryptoJS.enc.Base64;
      });
    })(encBase64$1);
    return encBase64$1.exports;
  }
  var encBase64url$1 = { exports: {} };
  var encBase64url = encBase64url$1.exports;
  var hasRequiredEncBase64url;
  function requireEncBase64url() {
    if (hasRequiredEncBase64url) return encBase64url$1.exports;
    hasRequiredEncBase64url = 1;
    (function(module, exports$1) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(encBase64url, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          C_enc.Base64url = {
            /**
             * Converts a word array to a Base64url string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @param {boolean} urlSafe Whether to use url safe
             *
             * @return {string} The Base64url string.
             *
             * @static
             *
             * @example
             *
             *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
             */
            stringify: function(wordArray, urlSafe) {
              if (urlSafe === void 0) {
                urlSafe = true;
              }
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = urlSafe ? this._safe_map : this._map;
              wordArray.clamp();
              var base64Chars = [];
              for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
                var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }
              return base64Chars.join("");
            },
            /**
             * Converts a Base64url string to a word array.
             *
             * @param {string} base64Str The Base64url string.
             *
             * @param {boolean} urlSafe Whether to use url safe
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
             */
            parse: function(base64Str, urlSafe) {
              if (urlSafe === void 0) {
                urlSafe = true;
              }
              var base64StrLength = base64Str.length;
              var map = urlSafe ? this._safe_map : this._map;
              var reverseMap = this._reverseMap;
              if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                  reverseMap[map.charCodeAt(j)] = j;
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              }
              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
          };
          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
              if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }
            return WordArray.create(words, nBytes);
          }
        })();
        return CryptoJS.enc.Base64url;
      });
    })(encBase64url$1);
    return encBase64url$1.exports;
  }
  var md5$1 = { exports: {} };
  var md5 = md5$1.exports;
  var hasRequiredMd5;
  function requireMd5() {
    if (hasRequiredMd5) return md5$1.exports;
    hasRequiredMd5 = 1;
    (function(module, exports$1) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(md5, function(CryptoJS) {
        (function(Math2) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var T = [];
          (function() {
            for (var i = 0; i < 64; i++) {
              T[i] = Math2.abs(Math2.sin(i + 1)) * 4294967296 | 0;
            }
          })();
          var MD5 = C_algo.MD5 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878
              ]);
            },
            _doProcessBlock: function(M, offset) {
              for (var i = 0; i < 16; i++) {
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];
                M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
              var H = this._hash.words;
              var M_offset_0 = M[offset + 0];
              var M_offset_1 = M[offset + 1];
              var M_offset_2 = M[offset + 2];
              var M_offset_3 = M[offset + 3];
              var M_offset_4 = M[offset + 4];
              var M_offset_5 = M[offset + 5];
              var M_offset_6 = M[offset + 6];
              var M_offset_7 = M[offset + 7];
              var M_offset_8 = M[offset + 8];
              var M_offset_9 = M[offset + 9];
              var M_offset_10 = M[offset + 10];
              var M_offset_11 = M[offset + 11];
              var M_offset_12 = M[offset + 12];
              var M_offset_13 = M[offset + 13];
              var M_offset_14 = M[offset + 14];
              var M_offset_15 = M[offset + 15];
              var a = H[0];
              var b = H[1];
              var c = H[2];
              var d = H[3];
              a = FF(a, b, c, d, M_offset_0, 7, T[0]);
              d = FF(d, a, b, c, M_offset_1, 12, T[1]);
              c = FF(c, d, a, b, M_offset_2, 17, T[2]);
              b = FF(b, c, d, a, M_offset_3, 22, T[3]);
              a = FF(a, b, c, d, M_offset_4, 7, T[4]);
              d = FF(d, a, b, c, M_offset_5, 12, T[5]);
              c = FF(c, d, a, b, M_offset_6, 17, T[6]);
              b = FF(b, c, d, a, M_offset_7, 22, T[7]);
              a = FF(a, b, c, d, M_offset_8, 7, T[8]);
              d = FF(d, a, b, c, M_offset_9, 12, T[9]);
              c = FF(c, d, a, b, M_offset_10, 17, T[10]);
              b = FF(b, c, d, a, M_offset_11, 22, T[11]);
              a = FF(a, b, c, d, M_offset_12, 7, T[12]);
              d = FF(d, a, b, c, M_offset_13, 12, T[13]);
              c = FF(c, d, a, b, M_offset_14, 17, T[14]);
              b = FF(b, c, d, a, M_offset_15, 22, T[15]);
              a = GG(a, b, c, d, M_offset_1, 5, T[16]);
              d = GG(d, a, b, c, M_offset_6, 9, T[17]);
              c = GG(c, d, a, b, M_offset_11, 14, T[18]);
              b = GG(b, c, d, a, M_offset_0, 20, T[19]);
              a = GG(a, b, c, d, M_offset_5, 5, T[20]);
              d = GG(d, a, b, c, M_offset_10, 9, T[21]);
              c = GG(c, d, a, b, M_offset_15, 14, T[22]);
              b = GG(b, c, d, a, M_offset_4, 20, T[23]);
              a = GG(a, b, c, d, M_offset_9, 5, T[24]);
              d = GG(d, a, b, c, M_offset_14, 9, T[25]);
              c = GG(c, d, a, b, M_offset_3, 14, T[26]);
              b = GG(b, c, d, a, M_offset_8, 20, T[27]);
              a = GG(a, b, c, d, M_offset_13, 5, T[28]);
              d = GG(d, a, b, c, M_offset_2, 9, T[29]);
              c = GG(c, d, a, b, M_offset_7, 14, T[30]);
              b = GG(b, c, d, a, M_offset_12, 20, T[31]);
              a = HH(a, b, c, d, M_offset_5, 4, T[32]);
              d = HH(d, a, b, c, M_offset_8, 11, T[33]);
              c = HH(c, d, a, b, M_offset_11, 16, T[34]);
              b = HH(b, c, d, a, M_offset_14, 23, T[35]);
              a = HH(a, b, c, d, M_offset_1, 4, T[36]);
              d = HH(d, a, b, c, M_offset_4, 11, T[37]);
              c = HH(c, d, a, b, M_offset_7, 16, T[38]);
              b = HH(b, c, d, a, M_offset_10, 23, T[39]);
              a = HH(a, b, c, d, M_offset_13, 4, T[40]);
              d = HH(d, a, b, c, M_offset_0, 11, T[41]);
              c = HH(c, d, a, b, M_offset_3, 16, T[42]);
              b = HH(b, c, d, a, M_offset_6, 23, T[43]);
              a = HH(a, b, c, d, M_offset_9, 4, T[44]);
              d = HH(d, a, b, c, M_offset_12, 11, T[45]);
              c = HH(c, d, a, b, M_offset_15, 16, T[46]);
              b = HH(b, c, d, a, M_offset_2, 23, T[47]);
              a = II(a, b, c, d, M_offset_0, 6, T[48]);
              d = II(d, a, b, c, M_offset_7, 10, T[49]);
              c = II(c, d, a, b, M_offset_14, 15, T[50]);
              b = II(b, c, d, a, M_offset_5, 21, T[51]);
              a = II(a, b, c, d, M_offset_12, 6, T[52]);
              d = II(d, a, b, c, M_offset_3, 10, T[53]);
              c = II(c, d, a, b, M_offset_10, 15, T[54]);
              b = II(b, c, d, a, M_offset_1, 21, T[55]);
              a = II(a, b, c, d, M_offset_8, 6, T[56]);
              d = II(d, a, b, c, M_offset_15, 10, T[57]);
              c = II(c, d, a, b, M_offset_6, 15, T[58]);
              b = II(b, c, d, a, M_offset_13, 21, T[59]);
              a = II(a, b, c, d, M_offset_4, 6, T[60]);
              d = II(d, a, b, c, M_offset_11, 10, T[61]);
              c = II(c, d, a, b, M_offset_2, 15, T[62]);
              b = II(b, c, d, a, M_offset_9, 21, T[63]);
              H[0] = H[0] + a | 0;
              H[1] = H[1] + b | 0;
              H[2] = H[2] + c | 0;
              H[3] = H[3] + d | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              var nBitsTotalH = Math2.floor(nBitsTotal / 4294967296);
              var nBitsTotalL = nBitsTotal;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash = this._hash;
              var H = hash.words;
              for (var i = 0; i < 4; i++) {
                var H_i = H[i];
                H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          function FF(a, b, c, d, x, s, t) {
            var n = a + (b & c | ~b & d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function GG(a, b, c, d, x, s, t) {
            var n = a + (b & d | c & ~d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function HH(a, b, c, d, x, s, t) {
            var n = a + (b ^ c ^ d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function II(a, b, c, d, x, s, t) {
            var n = a + (c ^ (b | ~d)) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          C.MD5 = Hasher._createHelper(MD5);
          C.HmacMD5 = Hasher._createHmacHelper(MD5);
        })(Math);
        return CryptoJS.MD5;
      });
    })(md5$1);
    return md5$1.exports;
  }
  var sha1$1 = { exports: {} };
  var sha1 = sha1$1.exports;
  var hasRequiredSha1;
  function requireSha1() {
    if (hasRequiredSha1) return sha1$1.exports;
    hasRequiredSha1 = 1;
    (function(module, exports$1) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(sha1, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var W = [];
          var SHA1 = C_algo.SHA1 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878,
                3285377520
              ]);
            },
            _doProcessBlock: function(M, offset) {
              var H = this._hash.words;
              var a = H[0];
              var b = H[1];
              var c = H[2];
              var d = H[3];
              var e = H[4];
              for (var i = 0; i < 80; i++) {
                if (i < 16) {
                  W[i] = M[offset + i] | 0;
                } else {
                  var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                  W[i] = n << 1 | n >>> 31;
                }
                var t = (a << 5 | a >>> 27) + e + W[i];
                if (i < 20) {
                  t += (b & c | ~b & d) + 1518500249;
                } else if (i < 40) {
                  t += (b ^ c ^ d) + 1859775393;
                } else if (i < 60) {
                  t += (b & c | b & d | c & d) - 1894007588;
                } else {
                  t += (b ^ c ^ d) - 899497514;
                }
                e = d;
                d = c;
                c = b << 30 | b >>> 2;
                b = a;
                a = t;
              }
              H[0] = H[0] + a | 0;
              H[1] = H[1] + b | 0;
              H[2] = H[2] + c | 0;
              H[3] = H[3] + d | 0;
              H[4] = H[4] + e | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          C.SHA1 = Hasher._createHelper(SHA1);
          C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
        })();
        return CryptoJS.SHA1;
      });
    })(sha1$1);
    return sha1$1.exports;
  }
  var sha256$1 = { exports: {} };
  var sha256 = sha256$1.exports;
  var hasRequiredSha256;
  function requireSha256() {
    if (hasRequiredSha256) return sha256$1.exports;
    hasRequiredSha256 = 1;
    (function(module, exports$1) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(sha256, function(CryptoJS) {
        (function(Math2) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var H = [];
          var K = [];
          (function() {
            function isPrime(n2) {
              var sqrtN = Math2.sqrt(n2);
              for (var factor = 2; factor <= sqrtN; factor++) {
                if (!(n2 % factor)) {
                  return false;
                }
              }
              return true;
            }
            function getFractionalBits(n2) {
              return (n2 - (n2 | 0)) * 4294967296 | 0;
            }
            var n = 2;
            var nPrime = 0;
            while (nPrime < 64) {
              if (isPrime(n)) {
                if (nPrime < 8) {
                  H[nPrime] = getFractionalBits(Math2.pow(n, 1 / 2));
                }
                K[nPrime] = getFractionalBits(Math2.pow(n, 1 / 3));
                nPrime++;
              }
              n++;
            }
          })();
          var W = [];
          var SHA256 = C_algo.SHA256 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init(H.slice(0));
            },
            _doProcessBlock: function(M, offset) {
              var H2 = this._hash.words;
              var a = H2[0];
              var b = H2[1];
              var c = H2[2];
              var d = H2[3];
              var e = H2[4];
              var f = H2[5];
              var g = H2[6];
              var h = H2[7];
              for (var i = 0; i < 64; i++) {
                if (i < 16) {
                  W[i] = M[offset + i] | 0;
                } else {
                  var gamma0x = W[i - 15];
                  var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                  var gamma1x = W[i - 2];
                  var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                  W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                }
                var ch = e & f ^ ~e & g;
                var maj = a & b ^ a & c ^ b & c;
                var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
                var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
                var t1 = h + sigma1 + ch + K[i] + W[i];
                var t2 = sigma0 + maj;
                h = g;
                g = f;
                f = e;
                e = d + t1 | 0;
                d = c;
                c = b;
                b = a;
                a = t1 + t2 | 0;
              }
              H2[0] = H2[0] + a | 0;
              H2[1] = H2[1] + b | 0;
              H2[2] = H2[2] + c | 0;
              H2[3] = H2[3] + d | 0;
              H2[4] = H2[4] + e | 0;
              H2[5] = H2[5] + f | 0;
              H2[6] = H2[6] + g | 0;
              H2[7] = H2[7] + h | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math2.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          C.SHA256 = Hasher._createHelper(SHA256);
          C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
        })(Math);
        return CryptoJS.SHA256;
      });
    })(sha256$1);
    return sha256$1.exports;
  }
  var sha224$1 = { exports: {} };
  var sha224 = sha224$1.exports;
  var hasRequiredSha224;
  function requireSha224() {
    if (hasRequiredSha224) return sha224$1.exports;
    hasRequiredSha224 = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireSha256());
        }
      })(sha224, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var SHA256 = C_algo.SHA256;
          var SHA224 = C_algo.SHA224 = SHA256.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                3238371032,
                914150663,
                812702999,
                4144912697,
                4290775857,
                1750603025,
                1694076839,
                3204075428
              ]);
            },
            _doFinalize: function() {
              var hash = SHA256._doFinalize.call(this);
              hash.sigBytes -= 4;
              return hash;
            }
          });
          C.SHA224 = SHA256._createHelper(SHA224);
          C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
        })();
        return CryptoJS.SHA224;
      });
    })(sha224$1);
    return sha224$1.exports;
  }
  var sha512$1 = { exports: {} };
  var sha512 = sha512$1.exports;
  var hasRequiredSha512;
  function requireSha512() {
    if (hasRequiredSha512) return sha512$1.exports;
    hasRequiredSha512 = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireX64Core());
        }
      })(sha512, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var Hasher = C_lib.Hasher;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C.algo;
          function X64Word_create() {
            return X64Word.create.apply(X64Word, arguments);
          }
          var K = [
            X64Word_create(1116352408, 3609767458),
            X64Word_create(1899447441, 602891725),
            X64Word_create(3049323471, 3964484399),
            X64Word_create(3921009573, 2173295548),
            X64Word_create(961987163, 4081628472),
            X64Word_create(1508970993, 3053834265),
            X64Word_create(2453635748, 2937671579),
            X64Word_create(2870763221, 3664609560),
            X64Word_create(3624381080, 2734883394),
            X64Word_create(310598401, 1164996542),
            X64Word_create(607225278, 1323610764),
            X64Word_create(1426881987, 3590304994),
            X64Word_create(1925078388, 4068182383),
            X64Word_create(2162078206, 991336113),
            X64Word_create(2614888103, 633803317),
            X64Word_create(3248222580, 3479774868),
            X64Word_create(3835390401, 2666613458),
            X64Word_create(4022224774, 944711139),
            X64Word_create(264347078, 2341262773),
            X64Word_create(604807628, 2007800933),
            X64Word_create(770255983, 1495990901),
            X64Word_create(1249150122, 1856431235),
            X64Word_create(1555081692, 3175218132),
            X64Word_create(1996064986, 2198950837),
            X64Word_create(2554220882, 3999719339),
            X64Word_create(2821834349, 766784016),
            X64Word_create(2952996808, 2566594879),
            X64Word_create(3210313671, 3203337956),
            X64Word_create(3336571891, 1034457026),
            X64Word_create(3584528711, 2466948901),
            X64Word_create(113926993, 3758326383),
            X64Word_create(338241895, 168717936),
            X64Word_create(666307205, 1188179964),
            X64Word_create(773529912, 1546045734),
            X64Word_create(1294757372, 1522805485),
            X64Word_create(1396182291, 2643833823),
            X64Word_create(1695183700, 2343527390),
            X64Word_create(1986661051, 1014477480),
            X64Word_create(2177026350, 1206759142),
            X64Word_create(2456956037, 344077627),
            X64Word_create(2730485921, 1290863460),
            X64Word_create(2820302411, 3158454273),
            X64Word_create(3259730800, 3505952657),
            X64Word_create(3345764771, 106217008),
            X64Word_create(3516065817, 3606008344),
            X64Word_create(3600352804, 1432725776),
            X64Word_create(4094571909, 1467031594),
            X64Word_create(275423344, 851169720),
            X64Word_create(430227734, 3100823752),
            X64Word_create(506948616, 1363258195),
            X64Word_create(659060556, 3750685593),
            X64Word_create(883997877, 3785050280),
            X64Word_create(958139571, 3318307427),
            X64Word_create(1322822218, 3812723403),
            X64Word_create(1537002063, 2003034995),
            X64Word_create(1747873779, 3602036899),
            X64Word_create(1955562222, 1575990012),
            X64Word_create(2024104815, 1125592928),
            X64Word_create(2227730452, 2716904306),
            X64Word_create(2361852424, 442776044),
            X64Word_create(2428436474, 593698344),
            X64Word_create(2756734187, 3733110249),
            X64Word_create(3204031479, 2999351573),
            X64Word_create(3329325298, 3815920427),
            X64Word_create(3391569614, 3928383900),
            X64Word_create(3515267271, 566280711),
            X64Word_create(3940187606, 3454069534),
            X64Word_create(4118630271, 4000239992),
            X64Word_create(116418474, 1914138554),
            X64Word_create(174292421, 2731055270),
            X64Word_create(289380356, 3203993006),
            X64Word_create(460393269, 320620315),
            X64Word_create(685471733, 587496836),
            X64Word_create(852142971, 1086792851),
            X64Word_create(1017036298, 365543100),
            X64Word_create(1126000580, 2618297676),
            X64Word_create(1288033470, 3409855158),
            X64Word_create(1501505948, 4234509866),
            X64Word_create(1607167915, 987167468),
            X64Word_create(1816402316, 1246189591)
          ];
          var W = [];
          (function() {
            for (var i = 0; i < 80; i++) {
              W[i] = X64Word_create();
            }
          })();
          var SHA512 = C_algo.SHA512 = Hasher.extend({
            _doReset: function() {
              this._hash = new X64WordArray.init([
                new X64Word.init(1779033703, 4089235720),
                new X64Word.init(3144134277, 2227873595),
                new X64Word.init(1013904242, 4271175723),
                new X64Word.init(2773480762, 1595750129),
                new X64Word.init(1359893119, 2917565137),
                new X64Word.init(2600822924, 725511199),
                new X64Word.init(528734635, 4215389547),
                new X64Word.init(1541459225, 327033209)
              ]);
            },
            _doProcessBlock: function(M, offset) {
              var H = this._hash.words;
              var H0 = H[0];
              var H1 = H[1];
              var H2 = H[2];
              var H3 = H[3];
              var H4 = H[4];
              var H5 = H[5];
              var H6 = H[6];
              var H7 = H[7];
              var H0h = H0.high;
              var H0l = H0.low;
              var H1h = H1.high;
              var H1l = H1.low;
              var H2h = H2.high;
              var H2l = H2.low;
              var H3h = H3.high;
              var H3l = H3.low;
              var H4h = H4.high;
              var H4l = H4.low;
              var H5h = H5.high;
              var H5l = H5.low;
              var H6h = H6.high;
              var H6l = H6.low;
              var H7h = H7.high;
              var H7l = H7.low;
              var ah = H0h;
              var al = H0l;
              var bh = H1h;
              var bl = H1l;
              var ch = H2h;
              var cl = H2l;
              var dh = H3h;
              var dl = H3l;
              var eh = H4h;
              var el = H4l;
              var fh = H5h;
              var fl = H5l;
              var gh = H6h;
              var gl = H6l;
              var hh = H7h;
              var hl = H7l;
              for (var i = 0; i < 80; i++) {
                var Wil;
                var Wih;
                var Wi = W[i];
                if (i < 16) {
                  Wih = Wi.high = M[offset + i * 2] | 0;
                  Wil = Wi.low = M[offset + i * 2 + 1] | 0;
                } else {
                  var gamma0x = W[i - 15];
                  var gamma0xh = gamma0x.high;
                  var gamma0xl = gamma0x.low;
                  var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                  var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                  var gamma1x = W[i - 2];
                  var gamma1xh = gamma1x.high;
                  var gamma1xl = gamma1x.low;
                  var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                  var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                  var Wi7 = W[i - 7];
                  var Wi7h = Wi7.high;
                  var Wi7l = Wi7.low;
                  var Wi16 = W[i - 16];
                  var Wi16h = Wi16.high;
                  var Wi16l = Wi16.low;
                  Wil = gamma0l + Wi7l;
                  Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
                  Wil = Wil + gamma1l;
                  Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
                  Wil = Wil + Wi16l;
                  Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
                  Wi.high = Wih;
                  Wi.low = Wil;
                }
                var chh = eh & fh ^ ~eh & gh;
                var chl = el & fl ^ ~el & gl;
                var majh = ah & bh ^ ah & ch ^ bh & ch;
                var majl = al & bl ^ al & cl ^ bl & cl;
                var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
                var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
                var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
                var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
                var Ki = K[i];
                var Kih = Ki.high;
                var Kil = Ki.low;
                var t1l = hl + sigma1l;
                var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
                var t1l = t1l + chl;
                var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
                var t1l = t1l + Kil;
                var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
                var t1l = t1l + Wil;
                var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);
                var t2l = sigma0l + majl;
                var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
                hh = gh;
                hl = gl;
                gh = fh;
                gl = fl;
                fh = eh;
                fl = el;
                el = dl + t1l | 0;
                eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
                dh = ch;
                dl = cl;
                ch = bh;
                cl = bl;
                bh = ah;
                bl = al;
                al = t1l + t2l | 0;
                ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
              }
              H0l = H0.low = H0l + al;
              H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
              H1l = H1.low = H1l + bl;
              H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
              H2l = H2.low = H2l + cl;
              H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
              H3l = H3.low = H3l + dl;
              H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
              H4l = H4.low = H4l + el;
              H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
              H5l = H5.low = H5l + fl;
              H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
              H6l = H6.low = H6l + gl;
              H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
              H7l = H7.low = H7l + hl;
              H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              var hash = this._hash.toX32();
              return hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            },
            blockSize: 1024 / 32
          });
          C.SHA512 = Hasher._createHelper(SHA512);
          C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
        })();
        return CryptoJS.SHA512;
      });
    })(sha512$1);
    return sha512$1.exports;
  }
  var sha384$1 = { exports: {} };
  var sha384 = sha384$1.exports;
  var hasRequiredSha384;
  function requireSha384() {
    if (hasRequiredSha384) return sha384$1.exports;
    hasRequiredSha384 = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireX64Core(), requireSha512());
        }
      })(sha384, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C.algo;
          var SHA512 = C_algo.SHA512;
          var SHA384 = C_algo.SHA384 = SHA512.extend({
            _doReset: function() {
              this._hash = new X64WordArray.init([
                new X64Word.init(3418070365, 3238371032),
                new X64Word.init(1654270250, 914150663),
                new X64Word.init(2438529370, 812702999),
                new X64Word.init(355462360, 4144912697),
                new X64Word.init(1731405415, 4290775857),
                new X64Word.init(2394180231, 1750603025),
                new X64Word.init(3675008525, 1694076839),
                new X64Word.init(1203062813, 3204075428)
              ]);
            },
            _doFinalize: function() {
              var hash = SHA512._doFinalize.call(this);
              hash.sigBytes -= 16;
              return hash;
            }
          });
          C.SHA384 = SHA512._createHelper(SHA384);
          C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
        })();
        return CryptoJS.SHA384;
      });
    })(sha384$1);
    return sha384$1.exports;
  }
  var sha3$1 = { exports: {} };
  var sha3 = sha3$1.exports;
  var hasRequiredSha3;
  function requireSha3() {
    if (hasRequiredSha3) return sha3$1.exports;
    hasRequiredSha3 = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireX64Core());
        }
      })(sha3, function(CryptoJS) {
        (function(Math2) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var C_algo = C.algo;
          var RHO_OFFSETS = [];
          var PI_INDEXES = [];
          var ROUND_CONSTANTS = [];
          (function() {
            var x = 1, y = 0;
            for (var t = 0; t < 24; t++) {
              RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
              var newX = y % 5;
              var newY = (2 * x + 3 * y) % 5;
              x = newX;
              y = newY;
            }
            for (var x = 0; x < 5; x++) {
              for (var y = 0; y < 5; y++) {
                PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
              }
            }
            var LFSR = 1;
            for (var i = 0; i < 24; i++) {
              var roundConstantMsw = 0;
              var roundConstantLsw = 0;
              for (var j = 0; j < 7; j++) {
                if (LFSR & 1) {
                  var bitPosition = (1 << j) - 1;
                  if (bitPosition < 32) {
                    roundConstantLsw ^= 1 << bitPosition;
                  } else {
                    roundConstantMsw ^= 1 << bitPosition - 32;
                  }
                }
                if (LFSR & 128) {
                  LFSR = LFSR << 1 ^ 113;
                } else {
                  LFSR <<= 1;
                }
              }
              ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
            }
          })();
          var T = [];
          (function() {
            for (var i = 0; i < 25; i++) {
              T[i] = X64Word.create();
            }
          })();
          var SHA3 = C_algo.SHA3 = Hasher.extend({
            /**
             * Configuration options.
             *
             * @property {number} outputLength
             *   The desired number of bits in the output hash.
             *   Only values permitted are: 224, 256, 384, 512.
             *   Default: 512
             */
            cfg: Hasher.cfg.extend({
              outputLength: 512
            }),
            _doReset: function() {
              var state = this._state = [];
              for (var i = 0; i < 25; i++) {
                state[i] = new X64Word.init();
              }
              this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
            },
            _doProcessBlock: function(M, offset) {
              var state = this._state;
              var nBlockSizeLanes = this.blockSize / 2;
              for (var i = 0; i < nBlockSizeLanes; i++) {
                var M2i = M[offset + 2 * i];
                var M2i1 = M[offset + 2 * i + 1];
                M2i = (M2i << 8 | M2i >>> 24) & 16711935 | (M2i << 24 | M2i >>> 8) & 4278255360;
                M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 16711935 | (M2i1 << 24 | M2i1 >>> 8) & 4278255360;
                var lane = state[i];
                lane.high ^= M2i1;
                lane.low ^= M2i;
              }
              for (var round = 0; round < 24; round++) {
                for (var x = 0; x < 5; x++) {
                  var tMsw = 0, tLsw = 0;
                  for (var y = 0; y < 5; y++) {
                    var lane = state[x + 5 * y];
                    tMsw ^= lane.high;
                    tLsw ^= lane.low;
                  }
                  var Tx = T[x];
                  Tx.high = tMsw;
                  Tx.low = tLsw;
                }
                for (var x = 0; x < 5; x++) {
                  var Tx4 = T[(x + 4) % 5];
                  var Tx1 = T[(x + 1) % 5];
                  var Tx1Msw = Tx1.high;
                  var Tx1Lsw = Tx1.low;
                  var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
                  var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
                  for (var y = 0; y < 5; y++) {
                    var lane = state[x + 5 * y];
                    lane.high ^= tMsw;
                    lane.low ^= tLsw;
                  }
                }
                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                  var tMsw;
                  var tLsw;
                  var lane = state[laneIndex];
                  var laneMsw = lane.high;
                  var laneLsw = lane.low;
                  var rhoOffset = RHO_OFFSETS[laneIndex];
                  if (rhoOffset < 32) {
                    tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
                    tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
                  } else {
                    tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                    tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
                  }
                  var TPiLane = T[PI_INDEXES[laneIndex]];
                  TPiLane.high = tMsw;
                  TPiLane.low = tLsw;
                }
                var T0 = T[0];
                var state0 = state[0];
                T0.high = state0.high;
                T0.low = state0.low;
                for (var x = 0; x < 5; x++) {
                  for (var y = 0; y < 5; y++) {
                    var laneIndex = x + 5 * y;
                    var lane = state[laneIndex];
                    var TLane = T[laneIndex];
                    var Tx1Lane = T[(x + 1) % 5 + 5 * y];
                    var Tx2Lane = T[(x + 2) % 5 + 5 * y];
                    lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
                    lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
                  }
                }
                var lane = state[0];
                var roundConstant = ROUND_CONSTANTS[round];
                lane.high ^= roundConstant.high;
                lane.low ^= roundConstant.low;
              }
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              var blockSizeBits = this.blockSize * 32;
              dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32;
              dataWords[(Math2.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128;
              data.sigBytes = dataWords.length * 4;
              this._process();
              var state = this._state;
              var outputLengthBytes = this.cfg.outputLength / 8;
              var outputLengthLanes = outputLengthBytes / 8;
              var hashWords = [];
              for (var i = 0; i < outputLengthLanes; i++) {
                var lane = state[i];
                var laneMsw = lane.high;
                var laneLsw = lane.low;
                laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 16711935 | (laneMsw << 24 | laneMsw >>> 8) & 4278255360;
                laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 16711935 | (laneLsw << 24 | laneLsw >>> 8) & 4278255360;
                hashWords.push(laneLsw);
                hashWords.push(laneMsw);
              }
              return new WordArray.init(hashWords, outputLengthBytes);
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              var state = clone._state = this._state.slice(0);
              for (var i = 0; i < 25; i++) {
                state[i] = state[i].clone();
              }
              return clone;
            }
          });
          C.SHA3 = Hasher._createHelper(SHA3);
          C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
        })(Math);
        return CryptoJS.SHA3;
      });
    })(sha3$1);
    return sha3$1.exports;
  }
  var ripemd160$1 = { exports: {} };
  var ripemd160 = ripemd160$1.exports;
  var hasRequiredRipemd160;
  function requireRipemd160() {
    if (hasRequiredRipemd160) return ripemd160$1.exports;
    hasRequiredRipemd160 = 1;
    (function(module, exports$1) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(ripemd160, function(CryptoJS) {
        (function(Math2) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var _zl = WordArray.create([
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            7,
            4,
            13,
            1,
            10,
            6,
            15,
            3,
            12,
            0,
            9,
            5,
            2,
            14,
            11,
            8,
            3,
            10,
            14,
            4,
            9,
            15,
            8,
            1,
            2,
            7,
            0,
            6,
            13,
            11,
            5,
            12,
            1,
            9,
            11,
            10,
            0,
            8,
            12,
            4,
            13,
            3,
            7,
            15,
            14,
            5,
            6,
            2,
            4,
            0,
            5,
            9,
            7,
            12,
            2,
            10,
            14,
            1,
            3,
            8,
            11,
            6,
            15,
            13
          ]);
          var _zr = WordArray.create([
            5,
            14,
            7,
            0,
            9,
            2,
            11,
            4,
            13,
            6,
            15,
            8,
            1,
            10,
            3,
            12,
            6,
            11,
            3,
            7,
            0,
            13,
            5,
            10,
            14,
            15,
            8,
            12,
            4,
            9,
            1,
            2,
            15,
            5,
            1,
            3,
            7,
            14,
            6,
            9,
            11,
            8,
            12,
            2,
            10,
            0,
            4,
            13,
            8,
            6,
            4,
            1,
            3,
            11,
            15,
            0,
            5,
            12,
            2,
            13,
            9,
            7,
            10,
            14,
            12,
            15,
            10,
            4,
            1,
            5,
            8,
            7,
            6,
            2,
            13,
            14,
            0,
            3,
            9,
            11
          ]);
          var _sl = WordArray.create([
            11,
            14,
            15,
            12,
            5,
            8,
            7,
            9,
            11,
            13,
            14,
            15,
            6,
            7,
            9,
            8,
            7,
            6,
            8,
            13,
            11,
            9,
            7,
            15,
            7,
            12,
            15,
            9,
            11,
            7,
            13,
            12,
            11,
            13,
            6,
            7,
            14,
            9,
            13,
            15,
            14,
            8,
            13,
            6,
            5,
            12,
            7,
            5,
            11,
            12,
            14,
            15,
            14,
            15,
            9,
            8,
            9,
            14,
            5,
            6,
            8,
            6,
            5,
            12,
            9,
            15,
            5,
            11,
            6,
            8,
            13,
            12,
            5,
            12,
            13,
            14,
            11,
            8,
            5,
            6
          ]);
          var _sr = WordArray.create([
            8,
            9,
            9,
            11,
            13,
            15,
            15,
            5,
            7,
            7,
            8,
            11,
            14,
            14,
            12,
            6,
            9,
            13,
            15,
            7,
            12,
            8,
            9,
            11,
            7,
            7,
            12,
            7,
            6,
            15,
            13,
            11,
            9,
            7,
            15,
            11,
            8,
            6,
            6,
            14,
            12,
            13,
            5,
            14,
            13,
            13,
            7,
            5,
            15,
            5,
            8,
            11,
            14,
            14,
            6,
            14,
            6,
            9,
            12,
            9,
            12,
            5,
            15,
            8,
            8,
            5,
            12,
            9,
            12,
            5,
            14,
            6,
            8,
            13,
            6,
            5,
            15,
            13,
            11,
            11
          ]);
          var _hl = WordArray.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
          var _hr = WordArray.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
          var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
            _doReset: function() {
              this._hash = WordArray.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
            },
            _doProcessBlock: function(M, offset) {
              for (var i = 0; i < 16; i++) {
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];
                M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
              var H = this._hash.words;
              var hl = _hl.words;
              var hr = _hr.words;
              var zl = _zl.words;
              var zr = _zr.words;
              var sl = _sl.words;
              var sr = _sr.words;
              var al, bl, cl, dl, el;
              var ar, br, cr, dr, er;
              ar = al = H[0];
              br = bl = H[1];
              cr = cl = H[2];
              dr = dl = H[3];
              er = el = H[4];
              var t;
              for (var i = 0; i < 80; i += 1) {
                t = al + M[offset + zl[i]] | 0;
                if (i < 16) {
                  t += f1(bl, cl, dl) + hl[0];
                } else if (i < 32) {
                  t += f2(bl, cl, dl) + hl[1];
                } else if (i < 48) {
                  t += f3(bl, cl, dl) + hl[2];
                } else if (i < 64) {
                  t += f4(bl, cl, dl) + hl[3];
                } else {
                  t += f5(bl, cl, dl) + hl[4];
                }
                t = t | 0;
                t = rotl(t, sl[i]);
                t = t + el | 0;
                al = el;
                el = dl;
                dl = rotl(cl, 10);
                cl = bl;
                bl = t;
                t = ar + M[offset + zr[i]] | 0;
                if (i < 16) {
                  t += f5(br, cr, dr) + hr[0];
                } else if (i < 32) {
                  t += f4(br, cr, dr) + hr[1];
                } else if (i < 48) {
                  t += f3(br, cr, dr) + hr[2];
                } else if (i < 64) {
                  t += f2(br, cr, dr) + hr[3];
                } else {
                  t += f1(br, cr, dr) + hr[4];
                }
                t = t | 0;
                t = rotl(t, sr[i]);
                t = t + er | 0;
                ar = er;
                er = dr;
                dr = rotl(cr, 10);
                cr = br;
                br = t;
              }
              t = H[1] + cl + dr | 0;
              H[1] = H[2] + dl + er | 0;
              H[2] = H[3] + el + ar | 0;
              H[3] = H[4] + al + br | 0;
              H[4] = H[0] + bl + cr | 0;
              H[0] = t;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 16711935 | (nBitsTotal << 24 | nBitsTotal >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash = this._hash;
              var H = hash.words;
              for (var i = 0; i < 5; i++) {
                var H_i = H[i];
                H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          function f1(x, y, z) {
            return x ^ y ^ z;
          }
          function f2(x, y, z) {
            return x & y | ~x & z;
          }
          function f3(x, y, z) {
            return (x | ~y) ^ z;
          }
          function f4(x, y, z) {
            return x & z | y & ~z;
          }
          function f5(x, y, z) {
            return x ^ (y | ~z);
          }
          function rotl(x, n) {
            return x << n | x >>> 32 - n;
          }
          C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
          C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
        })();
        return CryptoJS.RIPEMD160;
      });
    })(ripemd160$1);
    return ripemd160$1.exports;
  }
  var hmac$1 = { exports: {} };
  var hmac = hmac$1.exports;
  var hasRequiredHmac;
  function requireHmac() {
    if (hasRequiredHmac) return hmac$1.exports;
    hasRequiredHmac = 1;
    (function(module, exports$1) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(hmac, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var C_enc = C.enc;
          var Utf8 = C_enc.Utf8;
          var C_algo = C.algo;
          C_algo.HMAC = Base.extend({
            /**
             * Initializes a newly created HMAC.
             *
             * @param {Hasher} hasher The hash algorithm to use.
             * @param {WordArray|string} key The secret key.
             *
             * @example
             *
             *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
             */
            init: function(hasher, key) {
              hasher = this._hasher = new hasher.init();
              if (typeof key == "string") {
                key = Utf8.parse(key);
              }
              var hasherBlockSize = hasher.blockSize;
              var hasherBlockSizeBytes = hasherBlockSize * 4;
              if (key.sigBytes > hasherBlockSizeBytes) {
                key = hasher.finalize(key);
              }
              key.clamp();
              var oKey = this._oKey = key.clone();
              var iKey = this._iKey = key.clone();
              var oKeyWords = oKey.words;
              var iKeyWords = iKey.words;
              for (var i = 0; i < hasherBlockSize; i++) {
                oKeyWords[i] ^= 1549556828;
                iKeyWords[i] ^= 909522486;
              }
              oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
              this.reset();
            },
            /**
             * Resets this HMAC to its initial state.
             *
             * @example
             *
             *     hmacHasher.reset();
             */
            reset: function() {
              var hasher = this._hasher;
              hasher.reset();
              hasher.update(this._iKey);
            },
            /**
             * Updates this HMAC with a message.
             *
             * @param {WordArray|string} messageUpdate The message to append.
             *
             * @return {HMAC} This HMAC instance.
             *
             * @example
             *
             *     hmacHasher.update('message');
             *     hmacHasher.update(wordArray);
             */
            update: function(messageUpdate) {
              this._hasher.update(messageUpdate);
              return this;
            },
            /**
             * Finalizes the HMAC computation.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} messageUpdate (Optional) A final message update.
             *
             * @return {WordArray} The HMAC.
             *
             * @example
             *
             *     var hmac = hmacHasher.finalize();
             *     var hmac = hmacHasher.finalize('message');
             *     var hmac = hmacHasher.finalize(wordArray);
             */
            finalize: function(messageUpdate) {
              var hasher = this._hasher;
              var innerHash = hasher.finalize(messageUpdate);
              hasher.reset();
              var hmac2 = hasher.finalize(this._oKey.clone().concat(innerHash));
              return hmac2;
            }
          });
        })();
      });
    })(hmac$1);
    return hmac$1.exports;
  }
  var pbkdf2$1 = { exports: {} };
  var pbkdf2 = pbkdf2$1.exports;
  var hasRequiredPbkdf2;
  function requirePbkdf2() {
    if (hasRequiredPbkdf2) return pbkdf2$1.exports;
    hasRequiredPbkdf2 = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireSha256(), requireHmac());
        }
      })(pbkdf2, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var SHA256 = C_algo.SHA256;
          var HMAC = C_algo.HMAC;
          var PBKDF2 = C_algo.PBKDF2 = Base.extend({
            /**
             * Configuration options.
             *
             * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
             * @property {Hasher} hasher The hasher to use. Default: SHA256
             * @property {number} iterations The number of iterations to perform. Default: 250000
             */
            cfg: Base.extend({
              keySize: 128 / 32,
              hasher: SHA256,
              iterations: 25e4
            }),
            /**
             * Initializes a newly created key derivation function.
             *
             * @param {Object} cfg (Optional) The configuration options to use for the derivation.
             *
             * @example
             *
             *     var kdf = CryptoJS.algo.PBKDF2.create();
             *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
             *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
            },
            /**
             * Computes the Password-Based Key Derivation Function 2.
             *
             * @param {WordArray|string} password The password.
             * @param {WordArray|string} salt A salt.
             *
             * @return {WordArray} The derived key.
             *
             * @example
             *
             *     var key = kdf.compute(password, salt);
             */
            compute: function(password, salt) {
              var cfg = this.cfg;
              var hmac2 = HMAC.create(cfg.hasher, password);
              var derivedKey = WordArray.create();
              var blockIndex = WordArray.create([1]);
              var derivedKeyWords = derivedKey.words;
              var blockIndexWords = blockIndex.words;
              var keySize = cfg.keySize;
              var iterations = cfg.iterations;
              while (derivedKeyWords.length < keySize) {
                var block = hmac2.update(salt).finalize(blockIndex);
                hmac2.reset();
                var blockWords = block.words;
                var blockWordsLength = blockWords.length;
                var intermediate = block;
                for (var i = 1; i < iterations; i++) {
                  intermediate = hmac2.finalize(intermediate);
                  hmac2.reset();
                  var intermediateWords = intermediate.words;
                  for (var j = 0; j < blockWordsLength; j++) {
                    blockWords[j] ^= intermediateWords[j];
                  }
                }
                derivedKey.concat(block);
                blockIndexWords[0]++;
              }
              derivedKey.sigBytes = keySize * 4;
              return derivedKey;
            }
          });
          C.PBKDF2 = function(password, salt, cfg) {
            return PBKDF2.create(cfg).compute(password, salt);
          };
        })();
        return CryptoJS.PBKDF2;
      });
    })(pbkdf2$1);
    return pbkdf2$1.exports;
  }
  var evpkdf$1 = { exports: {} };
  var evpkdf = evpkdf$1.exports;
  var hasRequiredEvpkdf;
  function requireEvpkdf() {
    if (hasRequiredEvpkdf) return evpkdf$1.exports;
    hasRequiredEvpkdf = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireSha1(), requireHmac());
        }
      })(evpkdf, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var MD5 = C_algo.MD5;
          var EvpKDF = C_algo.EvpKDF = Base.extend({
            /**
             * Configuration options.
             *
             * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
             * @property {Hasher} hasher The hash algorithm to use. Default: MD5
             * @property {number} iterations The number of iterations to perform. Default: 1
             */
            cfg: Base.extend({
              keySize: 128 / 32,
              hasher: MD5,
              iterations: 1
            }),
            /**
             * Initializes a newly created key derivation function.
             *
             * @param {Object} cfg (Optional) The configuration options to use for the derivation.
             *
             * @example
             *
             *     var kdf = CryptoJS.algo.EvpKDF.create();
             *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
             *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
            },
            /**
             * Derives a key from a password.
             *
             * @param {WordArray|string} password The password.
             * @param {WordArray|string} salt A salt.
             *
             * @return {WordArray} The derived key.
             *
             * @example
             *
             *     var key = kdf.compute(password, salt);
             */
            compute: function(password, salt) {
              var block;
              var cfg = this.cfg;
              var hasher = cfg.hasher.create();
              var derivedKey = WordArray.create();
              var derivedKeyWords = derivedKey.words;
              var keySize = cfg.keySize;
              var iterations = cfg.iterations;
              while (derivedKeyWords.length < keySize) {
                if (block) {
                  hasher.update(block);
                }
                block = hasher.update(password).finalize(salt);
                hasher.reset();
                for (var i = 1; i < iterations; i++) {
                  block = hasher.finalize(block);
                  hasher.reset();
                }
                derivedKey.concat(block);
              }
              derivedKey.sigBytes = keySize * 4;
              return derivedKey;
            }
          });
          C.EvpKDF = function(password, salt, cfg) {
            return EvpKDF.create(cfg).compute(password, salt);
          };
        })();
        return CryptoJS.EvpKDF;
      });
    })(evpkdf$1);
    return evpkdf$1.exports;
  }
  var cipherCore$1 = { exports: {} };
  var cipherCore = cipherCore$1.exports;
  var hasRequiredCipherCore;
  function requireCipherCore() {
    if (hasRequiredCipherCore) return cipherCore$1.exports;
    hasRequiredCipherCore = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEvpkdf());
        }
      })(cipherCore, function(CryptoJS) {
        CryptoJS.lib.Cipher || (function(undefined$1) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
          var C_enc = C.enc;
          C_enc.Utf8;
          var Base64 = C_enc.Base64;
          var C_algo = C.algo;
          var EvpKDF = C_algo.EvpKDF;
          var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
            /**
             * Configuration options.
             *
             * @property {WordArray} iv The IV to use for this operation.
             */
            cfg: Base.extend(),
            /**
             * Creates this cipher in encryption mode.
             *
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {Cipher} A cipher instance.
             *
             * @static
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
             */
            createEncryptor: function(key, cfg) {
              return this.create(this._ENC_XFORM_MODE, key, cfg);
            },
            /**
             * Creates this cipher in decryption mode.
             *
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {Cipher} A cipher instance.
             *
             * @static
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
             */
            createDecryptor: function(key, cfg) {
              return this.create(this._DEC_XFORM_MODE, key, cfg);
            },
            /**
             * Initializes a newly created cipher.
             *
             * @param {number} xformMode Either the encryption or decryption transormation mode constant.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
             */
            init: function(xformMode, key, cfg) {
              this.cfg = this.cfg.extend(cfg);
              this._xformMode = xformMode;
              this._key = key;
              this.reset();
            },
            /**
             * Resets this cipher to its initial state.
             *
             * @example
             *
             *     cipher.reset();
             */
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            /**
             * Adds data to be encrypted or decrypted.
             *
             * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
             *
             * @return {WordArray} The data after processing.
             *
             * @example
             *
             *     var encrypted = cipher.process('data');
             *     var encrypted = cipher.process(wordArray);
             */
            process: function(dataUpdate) {
              this._append(dataUpdate);
              return this._process();
            },
            /**
             * Finalizes the encryption or decryption process.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
             *
             * @return {WordArray} The data after final processing.
             *
             * @example
             *
             *     var encrypted = cipher.finalize();
             *     var encrypted = cipher.finalize('data');
             *     var encrypted = cipher.finalize(wordArray);
             */
            finalize: function(dataUpdate) {
              if (dataUpdate) {
                this._append(dataUpdate);
              }
              var finalProcessedData = this._doFinalize();
              return finalProcessedData;
            },
            keySize: 128 / 32,
            ivSize: 128 / 32,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            /**
             * Creates shortcut functions to a cipher's object interface.
             *
             * @param {Cipher} cipher The cipher to create a helper for.
             *
             * @return {Object} An object with encrypt and decrypt shortcut functions.
             *
             * @static
             *
             * @example
             *
             *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
             */
            _createHelper: /* @__PURE__ */ (function() {
              function selectCipherStrategy(key) {
                if (typeof key == "string") {
                  return PasswordBasedCipher;
                } else {
                  return SerializableCipher;
                }
              }
              return function(cipher) {
                return {
                  encrypt: function(message, key, cfg) {
                    return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                  },
                  decrypt: function(ciphertext, key, cfg) {
                    return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                  }
                };
              };
            })()
          });
          C_lib.StreamCipher = Cipher.extend({
            _doFinalize: function() {
              var finalProcessedBlocks = this._process(true);
              return finalProcessedBlocks;
            },
            blockSize: 1
          });
          var C_mode = C.mode = {};
          var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
            /**
             * Creates this mode for encryption.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @static
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
             */
            createEncryptor: function(cipher, iv) {
              return this.Encryptor.create(cipher, iv);
            },
            /**
             * Creates this mode for decryption.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @static
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
             */
            createDecryptor: function(cipher, iv) {
              return this.Decryptor.create(cipher, iv);
            },
            /**
             * Initializes a newly created mode.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
             */
            init: function(cipher, iv) {
              this._cipher = cipher;
              this._iv = iv;
            }
          });
          var CBC = C_mode.CBC = (function() {
            var CBC2 = BlockCipherMode.extend();
            CBC2.Encryptor = CBC2.extend({
              /**
               * Processes the data block at offset.
               *
               * @param {Array} words The data words to operate on.
               * @param {number} offset The offset where the block starts.
               *
               * @example
               *
               *     mode.processBlock(data.words, offset);
               */
              processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                xorBlock.call(this, words, offset, blockSize);
                cipher.encryptBlock(words, offset);
                this._prevBlock = words.slice(offset, offset + blockSize);
              }
            });
            CBC2.Decryptor = CBC2.extend({
              /**
               * Processes the data block at offset.
               *
               * @param {Array} words The data words to operate on.
               * @param {number} offset The offset where the block starts.
               *
               * @example
               *
               *     mode.processBlock(data.words, offset);
               */
              processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                var thisBlock = words.slice(offset, offset + blockSize);
                cipher.decryptBlock(words, offset);
                xorBlock.call(this, words, offset, blockSize);
                this._prevBlock = thisBlock;
              }
            });
            function xorBlock(words, offset, blockSize) {
              var block;
              var iv = this._iv;
              if (iv) {
                block = iv;
                this._iv = undefined$1;
              } else {
                block = this._prevBlock;
              }
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= block[i];
              }
            }
            return CBC2;
          })();
          var C_pad = C.pad = {};
          var Pkcs7 = C_pad.Pkcs7 = {
            /**
             * Pads data using the algorithm defined in PKCS #5/7.
             *
             * @param {WordArray} data The data to pad.
             * @param {number} blockSize The multiple that the data should be padded to.
             *
             * @static
             *
             * @example
             *
             *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
             */
            pad: function(data, blockSize) {
              var blockSizeBytes = blockSize * 4;
              var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
              var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
              var paddingWords = [];
              for (var i = 0; i < nPaddingBytes; i += 4) {
                paddingWords.push(paddingWord);
              }
              var padding = WordArray.create(paddingWords, nPaddingBytes);
              data.concat(padding);
            },
            /**
             * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
             *
             * @param {WordArray} data The data to unpad.
             *
             * @static
             *
             * @example
             *
             *     CryptoJS.pad.Pkcs7.unpad(wordArray);
             */
            unpad: function(data) {
              var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
              data.sigBytes -= nPaddingBytes;
            }
          };
          C_lib.BlockCipher = Cipher.extend({
            /**
             * Configuration options.
             *
             * @property {Mode} mode The block mode to use. Default: CBC
             * @property {Padding} padding The padding strategy to use. Default: Pkcs7
             */
            cfg: Cipher.cfg.extend({
              mode: CBC,
              padding: Pkcs7
            }),
            reset: function() {
              var modeCreator;
              Cipher.reset.call(this);
              var cfg = this.cfg;
              var iv = cfg.iv;
              var mode = cfg.mode;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                modeCreator = mode.createEncryptor;
              } else {
                modeCreator = mode.createDecryptor;
                this._minBufferSize = 1;
              }
              if (this._mode && this._mode.__creator == modeCreator) {
                this._mode.init(this, iv && iv.words);
              } else {
                this._mode = modeCreator.call(mode, this, iv && iv.words);
                this._mode.__creator = modeCreator;
              }
            },
            _doProcessBlock: function(words, offset) {
              this._mode.processBlock(words, offset);
            },
            _doFinalize: function() {
              var finalProcessedBlocks;
              var padding = this.cfg.padding;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                padding.pad(this._data, this.blockSize);
                finalProcessedBlocks = this._process(true);
              } else {
                finalProcessedBlocks = this._process(true);
                padding.unpad(finalProcessedBlocks);
              }
              return finalProcessedBlocks;
            },
            blockSize: 128 / 32
          });
          var CipherParams = C_lib.CipherParams = Base.extend({
            /**
             * Initializes a newly created cipher params object.
             *
             * @param {Object} cipherParams An object with any of the possible cipher parameters.
             *
             * @example
             *
             *     var cipherParams = CryptoJS.lib.CipherParams.create({
             *         ciphertext: ciphertextWordArray,
             *         key: keyWordArray,
             *         iv: ivWordArray,
             *         salt: saltWordArray,
             *         algorithm: CryptoJS.algo.AES,
             *         mode: CryptoJS.mode.CBC,
             *         padding: CryptoJS.pad.PKCS7,
             *         blockSize: 4,
             *         formatter: CryptoJS.format.OpenSSL
             *     });
             */
            init: function(cipherParams) {
              this.mixIn(cipherParams);
            },
            /**
             * Converts this cipher params object to a string.
             *
             * @param {Format} formatter (Optional) The formatting strategy to use.
             *
             * @return {string} The stringified cipher params.
             *
             * @throws Error If neither the formatter nor the default formatter is set.
             *
             * @example
             *
             *     var string = cipherParams + '';
             *     var string = cipherParams.toString();
             *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
             */
            toString: function(formatter) {
              return (formatter || this.formatter).stringify(this);
            }
          });
          var C_format = C.format = {};
          var OpenSSLFormatter = C_format.OpenSSL = {
            /**
             * Converts a cipher params object to an OpenSSL-compatible string.
             *
             * @param {CipherParams} cipherParams The cipher params object.
             *
             * @return {string} The OpenSSL-compatible string.
             *
             * @static
             *
             * @example
             *
             *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
             */
            stringify: function(cipherParams) {
              var wordArray;
              var ciphertext = cipherParams.ciphertext;
              var salt = cipherParams.salt;
              if (salt) {
                wordArray = WordArray.create([1398893684, 1701076831]).concat(salt).concat(ciphertext);
              } else {
                wordArray = ciphertext;
              }
              return wordArray.toString(Base64);
            },
            /**
             * Converts an OpenSSL-compatible string to a cipher params object.
             *
             * @param {string} openSSLStr The OpenSSL-compatible string.
             *
             * @return {CipherParams} The cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
             */
            parse: function(openSSLStr) {
              var salt;
              var ciphertext = Base64.parse(openSSLStr);
              var ciphertextWords = ciphertext.words;
              if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
                salt = WordArray.create(ciphertextWords.slice(2, 4));
                ciphertextWords.splice(0, 4);
                ciphertext.sigBytes -= 16;
              }
              return CipherParams.create({ ciphertext, salt });
            }
          };
          var SerializableCipher = C_lib.SerializableCipher = Base.extend({
            /**
             * Configuration options.
             *
             * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
             */
            cfg: Base.extend({
              format: OpenSSLFormatter
            }),
            /**
             * Encrypts a message.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {WordArray|string} message The message to encrypt.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {CipherParams} A cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             */
            encrypt: function(cipher, message, key, cfg) {
              cfg = this.cfg.extend(cfg);
              var encryptor = cipher.createEncryptor(key, cfg);
              var ciphertext = encryptor.finalize(message);
              var cipherCfg = encryptor.cfg;
              return CipherParams.create({
                ciphertext,
                key,
                iv: cipherCfg.iv,
                algorithm: cipher,
                mode: cipherCfg.mode,
                padding: cipherCfg.padding,
                blockSize: cipher.blockSize,
                formatter: cfg.format
              });
            },
            /**
             * Decrypts serialized ciphertext.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {WordArray} The plaintext.
             *
             * @static
             *
             * @example
             *
             *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             */
            decrypt: function(cipher, ciphertext, key, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
              return plaintext;
            },
            /**
             * Converts serialized ciphertext to CipherParams,
             * else assumed CipherParams already and returns ciphertext unchanged.
             *
             * @param {CipherParams|string} ciphertext The ciphertext.
             * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
             *
             * @return {CipherParams} The unserialized ciphertext.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
             */
            _parse: function(ciphertext, format) {
              if (typeof ciphertext == "string") {
                return format.parse(ciphertext, this);
              } else {
                return ciphertext;
              }
            }
          });
          var C_kdf = C.kdf = {};
          var OpenSSLKdf = C_kdf.OpenSSL = {
            /**
             * Derives a key and IV from a password.
             *
             * @param {string} password The password to derive from.
             * @param {number} keySize The size in words of the key to generate.
             * @param {number} ivSize The size in words of the IV to generate.
             * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
             *
             * @return {CipherParams} A cipher params object with the key, IV, and salt.
             *
             * @static
             *
             * @example
             *
             *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
             *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
             */
            execute: function(password, keySize, ivSize, salt, hasher) {
              if (!salt) {
                salt = WordArray.random(64 / 8);
              }
              if (!hasher) {
                var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
              } else {
                var key = EvpKDF.create({ keySize: keySize + ivSize, hasher }).compute(password, salt);
              }
              var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
              key.sigBytes = keySize * 4;
              return CipherParams.create({ key, iv, salt });
            }
          };
          var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
            /**
             * Configuration options.
             *
             * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
             */
            cfg: SerializableCipher.cfg.extend({
              kdf: OpenSSLKdf
            }),
            /**
             * Encrypts a message using a password.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {WordArray|string} message The message to encrypt.
             * @param {string} password The password.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {CipherParams} A cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
             *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
             */
            encrypt: function(cipher, message, password, cfg) {
              cfg = this.cfg.extend(cfg);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, cfg.salt, cfg.hasher);
              cfg.iv = derivedParams.iv;
              var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
              ciphertext.mixIn(derivedParams);
              return ciphertext;
            },
            /**
             * Decrypts serialized ciphertext using a password.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
             * @param {string} password The password.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {WordArray} The plaintext.
             *
             * @static
             *
             * @example
             *
             *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
             *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
             */
            decrypt: function(cipher, ciphertext, password, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt, cfg.hasher);
              cfg.iv = derivedParams.iv;
              var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
              return plaintext;
            }
          });
        })();
      });
    })(cipherCore$1);
    return cipherCore$1.exports;
  }
  var modeCfb$1 = { exports: {} };
  var modeCfb = modeCfb$1.exports;
  var hasRequiredModeCfb;
  function requireModeCfb() {
    if (hasRequiredModeCfb) return modeCfb$1.exports;
    hasRequiredModeCfb = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(modeCfb, function(CryptoJS) {
        CryptoJS.mode.CFB = (function() {
          var CFB = CryptoJS.lib.BlockCipherMode.extend();
          CFB.Encryptor = CFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
              this._prevBlock = words.slice(offset, offset + blockSize);
            }
          });
          CFB.Decryptor = CFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var thisBlock = words.slice(offset, offset + blockSize);
              generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
              this._prevBlock = thisBlock;
            }
          });
          function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
            var keystream;
            var iv = this._iv;
            if (iv) {
              keystream = iv.slice(0);
              this._iv = void 0;
            } else {
              keystream = this._prevBlock;
            }
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) {
              words[offset + i] ^= keystream[i];
            }
          }
          return CFB;
        })();
        return CryptoJS.mode.CFB;
      });
    })(modeCfb$1);
    return modeCfb$1.exports;
  }
  var modeCtr$1 = { exports: {} };
  var modeCtr = modeCtr$1.exports;
  var hasRequiredModeCtr;
  function requireModeCtr() {
    if (hasRequiredModeCtr) return modeCtr$1.exports;
    hasRequiredModeCtr = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(modeCtr, function(CryptoJS) {
        CryptoJS.mode.CTR = (function() {
          var CTR = CryptoJS.lib.BlockCipherMode.extend();
          var Encryptor = CTR.Encryptor = CTR.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var counter = this._counter;
              if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = void 0;
              }
              var keystream = counter.slice(0);
              cipher.encryptBlock(keystream, 0);
              counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
              }
            }
          });
          CTR.Decryptor = Encryptor;
          return CTR;
        })();
        return CryptoJS.mode.CTR;
      });
    })(modeCtr$1);
    return modeCtr$1.exports;
  }
  var modeCtrGladman$1 = { exports: {} };
  var modeCtrGladman = modeCtrGladman$1.exports;
  var hasRequiredModeCtrGladman;
  function requireModeCtrGladman() {
    if (hasRequiredModeCtrGladman) return modeCtrGladman$1.exports;
    hasRequiredModeCtrGladman = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(modeCtrGladman, function(CryptoJS) {
        CryptoJS.mode.CTRGladman = (function() {
          var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();
          function incWord(word) {
            if ((word >> 24 & 255) === 255) {
              var b1 = word >> 16 & 255;
              var b2 = word >> 8 & 255;
              var b3 = word & 255;
              if (b1 === 255) {
                b1 = 0;
                if (b2 === 255) {
                  b2 = 0;
                  if (b3 === 255) {
                    b3 = 0;
                  } else {
                    ++b3;
                  }
                } else {
                  ++b2;
                }
              } else {
                ++b1;
              }
              word = 0;
              word += b1 << 16;
              word += b2 << 8;
              word += b3;
            } else {
              word += 1 << 24;
            }
            return word;
          }
          function incCounter(counter) {
            if ((counter[0] = incWord(counter[0])) === 0) {
              counter[1] = incWord(counter[1]);
            }
            return counter;
          }
          var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var counter = this._counter;
              if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = void 0;
              }
              incCounter(counter);
              var keystream = counter.slice(0);
              cipher.encryptBlock(keystream, 0);
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
              }
            }
          });
          CTRGladman.Decryptor = Encryptor;
          return CTRGladman;
        })();
        return CryptoJS.mode.CTRGladman;
      });
    })(modeCtrGladman$1);
    return modeCtrGladman$1.exports;
  }
  var modeOfb$1 = { exports: {} };
  var modeOfb = modeOfb$1.exports;
  var hasRequiredModeOfb;
  function requireModeOfb() {
    if (hasRequiredModeOfb) return modeOfb$1.exports;
    hasRequiredModeOfb = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(modeOfb, function(CryptoJS) {
        CryptoJS.mode.OFB = (function() {
          var OFB = CryptoJS.lib.BlockCipherMode.extend();
          var Encryptor = OFB.Encryptor = OFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var keystream = this._keystream;
              if (iv) {
                keystream = this._keystream = iv.slice(0);
                this._iv = void 0;
              }
              cipher.encryptBlock(keystream, 0);
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
              }
            }
          });
          OFB.Decryptor = Encryptor;
          return OFB;
        })();
        return CryptoJS.mode.OFB;
      });
    })(modeOfb$1);
    return modeOfb$1.exports;
  }
  var modeEcb$1 = { exports: {} };
  var modeEcb = modeEcb$1.exports;
  var hasRequiredModeEcb;
  function requireModeEcb() {
    if (hasRequiredModeEcb) return modeEcb$1.exports;
    hasRequiredModeEcb = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(modeEcb, function(CryptoJS) {
        CryptoJS.mode.ECB = (function() {
          var ECB = CryptoJS.lib.BlockCipherMode.extend();
          ECB.Encryptor = ECB.extend({
            processBlock: function(words, offset) {
              this._cipher.encryptBlock(words, offset);
            }
          });
          ECB.Decryptor = ECB.extend({
            processBlock: function(words, offset) {
              this._cipher.decryptBlock(words, offset);
            }
          });
          return ECB;
        })();
        return CryptoJS.mode.ECB;
      });
    })(modeEcb$1);
    return modeEcb$1.exports;
  }
  var padAnsix923$1 = { exports: {} };
  var padAnsix923 = padAnsix923$1.exports;
  var hasRequiredPadAnsix923;
  function requirePadAnsix923() {
    if (hasRequiredPadAnsix923) return padAnsix923$1.exports;
    hasRequiredPadAnsix923 = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(padAnsix923, function(CryptoJS) {
        CryptoJS.pad.AnsiX923 = {
          pad: function(data, blockSize) {
            var dataSigBytes = data.sigBytes;
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
            var lastBytePos = dataSigBytes + nPaddingBytes - 1;
            data.clamp();
            data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
            data.sigBytes += nPaddingBytes;
          },
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        return CryptoJS.pad.Ansix923;
      });
    })(padAnsix923$1);
    return padAnsix923$1.exports;
  }
  var padIso10126$1 = { exports: {} };
  var padIso10126 = padIso10126$1.exports;
  var hasRequiredPadIso10126;
  function requirePadIso10126() {
    if (hasRequiredPadIso10126) return padIso10126$1.exports;
    hasRequiredPadIso10126 = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(padIso10126, function(CryptoJS) {
        CryptoJS.pad.Iso10126 = {
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
          },
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        return CryptoJS.pad.Iso10126;
      });
    })(padIso10126$1);
    return padIso10126$1.exports;
  }
  var padIso97971$1 = { exports: {} };
  var padIso97971 = padIso97971$1.exports;
  var hasRequiredPadIso97971;
  function requirePadIso97971() {
    if (hasRequiredPadIso97971) return padIso97971$1.exports;
    hasRequiredPadIso97971 = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(padIso97971, function(CryptoJS) {
        CryptoJS.pad.Iso97971 = {
          pad: function(data, blockSize) {
            data.concat(CryptoJS.lib.WordArray.create([2147483648], 1));
            CryptoJS.pad.ZeroPadding.pad(data, blockSize);
          },
          unpad: function(data) {
            CryptoJS.pad.ZeroPadding.unpad(data);
            data.sigBytes--;
          }
        };
        return CryptoJS.pad.Iso97971;
      });
    })(padIso97971$1);
    return padIso97971$1.exports;
  }
  var padZeropadding$1 = { exports: {} };
  var padZeropadding = padZeropadding$1.exports;
  var hasRequiredPadZeropadding;
  function requirePadZeropadding() {
    if (hasRequiredPadZeropadding) return padZeropadding$1.exports;
    hasRequiredPadZeropadding = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(padZeropadding, function(CryptoJS) {
        CryptoJS.pad.ZeroPadding = {
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            data.clamp();
            data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
          },
          unpad: function(data) {
            var dataWords = data.words;
            var i = data.sigBytes - 1;
            for (var i = data.sigBytes - 1; i >= 0; i--) {
              if (dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 255) {
                data.sigBytes = i + 1;
                break;
              }
            }
          }
        };
        return CryptoJS.pad.ZeroPadding;
      });
    })(padZeropadding$1);
    return padZeropadding$1.exports;
  }
  var padNopadding$1 = { exports: {} };
  var padNopadding = padNopadding$1.exports;
  var hasRequiredPadNopadding;
  function requirePadNopadding() {
    if (hasRequiredPadNopadding) return padNopadding$1.exports;
    hasRequiredPadNopadding = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(padNopadding, function(CryptoJS) {
        CryptoJS.pad.NoPadding = {
          pad: function() {
          },
          unpad: function() {
          }
        };
        return CryptoJS.pad.NoPadding;
      });
    })(padNopadding$1);
    return padNopadding$1.exports;
  }
  var formatHex$1 = { exports: {} };
  var formatHex = formatHex$1.exports;
  var hasRequiredFormatHex;
  function requireFormatHex() {
    if (hasRequiredFormatHex) return formatHex$1.exports;
    hasRequiredFormatHex = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(formatHex, function(CryptoJS) {
        (function(undefined$1) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var CipherParams = C_lib.CipherParams;
          var C_enc = C.enc;
          var Hex = C_enc.Hex;
          var C_format = C.format;
          C_format.Hex = {
            /**
             * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
             *
             * @param {CipherParams} cipherParams The cipher params object.
             *
             * @return {string} The hexadecimally encoded string.
             *
             * @static
             *
             * @example
             *
             *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
             */
            stringify: function(cipherParams) {
              return cipherParams.ciphertext.toString(Hex);
            },
            /**
             * Converts a hexadecimally encoded ciphertext string to a cipher params object.
             *
             * @param {string} input The hexadecimally encoded string.
             *
             * @return {CipherParams} The cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
             */
            parse: function(input) {
              var ciphertext = Hex.parse(input);
              return CipherParams.create({ ciphertext });
            }
          };
        })();
        return CryptoJS.format.Hex;
      });
    })(formatHex$1);
    return formatHex$1.exports;
  }
  var aes$1 = { exports: {} };
  var aes = aes$1.exports;
  var hasRequiredAes;
  function requireAes() {
    if (hasRequiredAes) return aes$1.exports;
    hasRequiredAes = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(aes, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C.algo;
          var SBOX = [];
          var INV_SBOX = [];
          var SUB_MIX_0 = [];
          var SUB_MIX_1 = [];
          var SUB_MIX_2 = [];
          var SUB_MIX_3 = [];
          var INV_SUB_MIX_0 = [];
          var INV_SUB_MIX_1 = [];
          var INV_SUB_MIX_2 = [];
          var INV_SUB_MIX_3 = [];
          (function() {
            var d = [];
            for (var i = 0; i < 256; i++) {
              if (i < 128) {
                d[i] = i << 1;
              } else {
                d[i] = i << 1 ^ 283;
              }
            }
            var x = 0;
            var xi = 0;
            for (var i = 0; i < 256; i++) {
              var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
              sx = sx >>> 8 ^ sx & 255 ^ 99;
              SBOX[x] = sx;
              INV_SBOX[sx] = x;
              var x2 = d[x];
              var x4 = d[x2];
              var x8 = d[x4];
              var t = d[sx] * 257 ^ sx * 16843008;
              SUB_MIX_0[x] = t << 24 | t >>> 8;
              SUB_MIX_1[x] = t << 16 | t >>> 16;
              SUB_MIX_2[x] = t << 8 | t >>> 24;
              SUB_MIX_3[x] = t;
              var t = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
              INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
              INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
              INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
              INV_SUB_MIX_3[sx] = t;
              if (!x) {
                x = xi = 1;
              } else {
                x = x2 ^ d[d[d[x8 ^ x2]]];
                xi ^= d[d[xi]];
              }
            }
          })();
          var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
          var AES = C_algo.AES = BlockCipher.extend({
            _doReset: function() {
              var t;
              if (this._nRounds && this._keyPriorReset === this._key) {
                return;
              }
              var key = this._keyPriorReset = this._key;
              var keyWords = key.words;
              var keySize = key.sigBytes / 4;
              var nRounds = this._nRounds = keySize + 6;
              var ksRows = (nRounds + 1) * 4;
              var keySchedule = this._keySchedule = [];
              for (var ksRow = 0; ksRow < ksRows; ksRow++) {
                if (ksRow < keySize) {
                  keySchedule[ksRow] = keyWords[ksRow];
                } else {
                  t = keySchedule[ksRow - 1];
                  if (!(ksRow % keySize)) {
                    t = t << 8 | t >>> 24;
                    t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                    t ^= RCON[ksRow / keySize | 0] << 24;
                  } else if (keySize > 6 && ksRow % keySize == 4) {
                    t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                  }
                  keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
                }
              }
              var invKeySchedule = this._invKeySchedule = [];
              for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
                var ksRow = ksRows - invKsRow;
                if (invKsRow % 4) {
                  var t = keySchedule[ksRow];
                } else {
                  var t = keySchedule[ksRow - 4];
                }
                if (invKsRow < 4 || ksRow <= 4) {
                  invKeySchedule[invKsRow] = t;
                } else {
                  invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t & 255]];
                }
              }
            },
            encryptBlock: function(M, offset) {
              this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
            },
            decryptBlock: function(M, offset) {
              var t = M[offset + 1];
              M[offset + 1] = M[offset + 3];
              M[offset + 3] = t;
              this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
              var t = M[offset + 1];
              M[offset + 1] = M[offset + 3];
              M[offset + 3] = t;
            },
            _doCryptBlock: function(M, offset, keySchedule, SUB_MIX_02, SUB_MIX_12, SUB_MIX_22, SUB_MIX_32, SBOX2) {
              var nRounds = this._nRounds;
              var s0 = M[offset] ^ keySchedule[0];
              var s1 = M[offset + 1] ^ keySchedule[1];
              var s2 = M[offset + 2] ^ keySchedule[2];
              var s3 = M[offset + 3] ^ keySchedule[3];
              var ksRow = 4;
              for (var round = 1; round < nRounds; round++) {
                var t0 = SUB_MIX_02[s0 >>> 24] ^ SUB_MIX_12[s1 >>> 16 & 255] ^ SUB_MIX_22[s2 >>> 8 & 255] ^ SUB_MIX_32[s3 & 255] ^ keySchedule[ksRow++];
                var t1 = SUB_MIX_02[s1 >>> 24] ^ SUB_MIX_12[s2 >>> 16 & 255] ^ SUB_MIX_22[s3 >>> 8 & 255] ^ SUB_MIX_32[s0 & 255] ^ keySchedule[ksRow++];
                var t2 = SUB_MIX_02[s2 >>> 24] ^ SUB_MIX_12[s3 >>> 16 & 255] ^ SUB_MIX_22[s0 >>> 8 & 255] ^ SUB_MIX_32[s1 & 255] ^ keySchedule[ksRow++];
                var t3 = SUB_MIX_02[s3 >>> 24] ^ SUB_MIX_12[s0 >>> 16 & 255] ^ SUB_MIX_22[s1 >>> 8 & 255] ^ SUB_MIX_32[s2 & 255] ^ keySchedule[ksRow++];
                s0 = t0;
                s1 = t1;
                s2 = t2;
                s3 = t3;
              }
              var t0 = (SBOX2[s0 >>> 24] << 24 | SBOX2[s1 >>> 16 & 255] << 16 | SBOX2[s2 >>> 8 & 255] << 8 | SBOX2[s3 & 255]) ^ keySchedule[ksRow++];
              var t1 = (SBOX2[s1 >>> 24] << 24 | SBOX2[s2 >>> 16 & 255] << 16 | SBOX2[s3 >>> 8 & 255] << 8 | SBOX2[s0 & 255]) ^ keySchedule[ksRow++];
              var t2 = (SBOX2[s2 >>> 24] << 24 | SBOX2[s3 >>> 16 & 255] << 16 | SBOX2[s0 >>> 8 & 255] << 8 | SBOX2[s1 & 255]) ^ keySchedule[ksRow++];
              var t3 = (SBOX2[s3 >>> 24] << 24 | SBOX2[s0 >>> 16 & 255] << 16 | SBOX2[s1 >>> 8 & 255] << 8 | SBOX2[s2 & 255]) ^ keySchedule[ksRow++];
              M[offset] = t0;
              M[offset + 1] = t1;
              M[offset + 2] = t2;
              M[offset + 3] = t3;
            },
            keySize: 256 / 32
          });
          C.AES = BlockCipher._createHelper(AES);
        })();
        return CryptoJS.AES;
      });
    })(aes$1);
    return aes$1.exports;
  }
  var tripledes$1 = { exports: {} };
  var tripledes = tripledes$1.exports;
  var hasRequiredTripledes;
  function requireTripledes() {
    if (hasRequiredTripledes) return tripledes$1.exports;
    hasRequiredTripledes = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(tripledes, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C.algo;
          var PC1 = [
            57,
            49,
            41,
            33,
            25,
            17,
            9,
            1,
            58,
            50,
            42,
            34,
            26,
            18,
            10,
            2,
            59,
            51,
            43,
            35,
            27,
            19,
            11,
            3,
            60,
            52,
            44,
            36,
            63,
            55,
            47,
            39,
            31,
            23,
            15,
            7,
            62,
            54,
            46,
            38,
            30,
            22,
            14,
            6,
            61,
            53,
            45,
            37,
            29,
            21,
            13,
            5,
            28,
            20,
            12,
            4
          ];
          var PC2 = [
            14,
            17,
            11,
            24,
            1,
            5,
            3,
            28,
            15,
            6,
            21,
            10,
            23,
            19,
            12,
            4,
            26,
            8,
            16,
            7,
            27,
            20,
            13,
            2,
            41,
            52,
            31,
            37,
            47,
            55,
            30,
            40,
            51,
            45,
            33,
            48,
            44,
            49,
            39,
            56,
            34,
            53,
            46,
            42,
            50,
            36,
            29,
            32
          ];
          var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
          var SBOX_P = [
            {
              0: 8421888,
              268435456: 32768,
              536870912: 8421378,
              805306368: 2,
              1073741824: 512,
              1342177280: 8421890,
              1610612736: 8389122,
              1879048192: 8388608,
              2147483648: 514,
              2415919104: 8389120,
              2684354560: 33280,
              2952790016: 8421376,
              3221225472: 32770,
              3489660928: 8388610,
              3758096384: 0,
              4026531840: 33282,
              134217728: 0,
              402653184: 8421890,
              671088640: 33282,
              939524096: 32768,
              1207959552: 8421888,
              1476395008: 512,
              1744830464: 8421378,
              2013265920: 2,
              2281701376: 8389120,
              2550136832: 33280,
              2818572288: 8421376,
              3087007744: 8389122,
              3355443200: 8388610,
              3623878656: 32770,
              3892314112: 514,
              4160749568: 8388608,
              1: 32768,
              268435457: 2,
              536870913: 8421888,
              805306369: 8388608,
              1073741825: 8421378,
              1342177281: 33280,
              1610612737: 512,
              1879048193: 8389122,
              2147483649: 8421890,
              2415919105: 8421376,
              2684354561: 8388610,
              2952790017: 33282,
              3221225473: 514,
              3489660929: 8389120,
              3758096385: 32770,
              4026531841: 0,
              134217729: 8421890,
              402653185: 8421376,
              671088641: 8388608,
              939524097: 512,
              1207959553: 32768,
              1476395009: 8388610,
              1744830465: 2,
              2013265921: 33282,
              2281701377: 32770,
              2550136833: 8389122,
              2818572289: 514,
              3087007745: 8421888,
              3355443201: 8389120,
              3623878657: 0,
              3892314113: 33280,
              4160749569: 8421378
            },
            {
              0: 1074282512,
              16777216: 16384,
              33554432: 524288,
              50331648: 1074266128,
              67108864: 1073741840,
              83886080: 1074282496,
              100663296: 1073758208,
              117440512: 16,
              134217728: 540672,
              150994944: 1073758224,
              167772160: 1073741824,
              184549376: 540688,
              201326592: 524304,
              218103808: 0,
              234881024: 16400,
              251658240: 1074266112,
              8388608: 1073758208,
              25165824: 540688,
              41943040: 16,
              58720256: 1073758224,
              75497472: 1074282512,
              92274688: 1073741824,
              109051904: 524288,
              125829120: 1074266128,
              142606336: 524304,
              159383552: 0,
              176160768: 16384,
              192937984: 1074266112,
              209715200: 1073741840,
              226492416: 540672,
              243269632: 1074282496,
              260046848: 16400,
              268435456: 0,
              285212672: 1074266128,
              301989888: 1073758224,
              318767104: 1074282496,
              335544320: 1074266112,
              352321536: 16,
              369098752: 540688,
              385875968: 16384,
              402653184: 16400,
              419430400: 524288,
              436207616: 524304,
              452984832: 1073741840,
              469762048: 540672,
              486539264: 1073758208,
              503316480: 1073741824,
              520093696: 1074282512,
              276824064: 540688,
              293601280: 524288,
              310378496: 1074266112,
              327155712: 16384,
              343932928: 1073758208,
              360710144: 1074282512,
              377487360: 16,
              394264576: 1073741824,
              411041792: 1074282496,
              427819008: 1073741840,
              444596224: 1073758224,
              461373440: 524304,
              478150656: 0,
              494927872: 16400,
              511705088: 1074266128,
              528482304: 540672
            },
            {
              0: 260,
              1048576: 0,
              2097152: 67109120,
              3145728: 65796,
              4194304: 65540,
              5242880: 67108868,
              6291456: 67174660,
              7340032: 67174400,
              8388608: 67108864,
              9437184: 67174656,
              10485760: 65792,
              11534336: 67174404,
              12582912: 67109124,
              13631488: 65536,
              14680064: 4,
              15728640: 256,
              524288: 67174656,
              1572864: 67174404,
              2621440: 0,
              3670016: 67109120,
              4718592: 67108868,
              5767168: 65536,
              6815744: 65540,
              7864320: 260,
              8912896: 4,
              9961472: 256,
              11010048: 67174400,
              12058624: 65796,
              13107200: 65792,
              14155776: 67109124,
              15204352: 67174660,
              16252928: 67108864,
              16777216: 67174656,
              17825792: 65540,
              18874368: 65536,
              19922944: 67109120,
              20971520: 256,
              22020096: 67174660,
              23068672: 67108868,
              24117248: 0,
              25165824: 67109124,
              26214400: 67108864,
              27262976: 4,
              28311552: 65792,
              29360128: 67174400,
              30408704: 260,
              31457280: 65796,
              32505856: 67174404,
              17301504: 67108864,
              18350080: 260,
              19398656: 67174656,
              20447232: 0,
              21495808: 65540,
              22544384: 67109120,
              23592960: 256,
              24641536: 67174404,
              25690112: 65536,
              26738688: 67174660,
              27787264: 65796,
              28835840: 67108868,
              29884416: 67109124,
              30932992: 67174400,
              31981568: 4,
              33030144: 65792
            },
            {
              0: 2151682048,
              65536: 2147487808,
              131072: 4198464,
              196608: 2151677952,
              262144: 0,
              327680: 4198400,
              393216: 2147483712,
              458752: 4194368,
              524288: 2147483648,
              589824: 4194304,
              655360: 64,
              720896: 2147487744,
              786432: 2151678016,
              851968: 4160,
              917504: 4096,
              983040: 2151682112,
              32768: 2147487808,
              98304: 64,
              163840: 2151678016,
              229376: 2147487744,
              294912: 4198400,
              360448: 2151682112,
              425984: 0,
              491520: 2151677952,
              557056: 4096,
              622592: 2151682048,
              688128: 4194304,
              753664: 4160,
              819200: 2147483648,
              884736: 4194368,
              950272: 4198464,
              1015808: 2147483712,
              1048576: 4194368,
              1114112: 4198400,
              1179648: 2147483712,
              1245184: 0,
              1310720: 4160,
              1376256: 2151678016,
              1441792: 2151682048,
              1507328: 2147487808,
              1572864: 2151682112,
              1638400: 2147483648,
              1703936: 2151677952,
              1769472: 4198464,
              1835008: 2147487744,
              1900544: 4194304,
              1966080: 64,
              2031616: 4096,
              1081344: 2151677952,
              1146880: 2151682112,
              1212416: 0,
              1277952: 4198400,
              1343488: 4194368,
              1409024: 2147483648,
              1474560: 2147487808,
              1540096: 64,
              1605632: 2147483712,
              1671168: 4096,
              1736704: 2147487744,
              1802240: 2151678016,
              1867776: 4160,
              1933312: 2151682048,
              1998848: 4194304,
              2064384: 4198464
            },
            {
              0: 128,
              4096: 17039360,
              8192: 262144,
              12288: 536870912,
              16384: 537133184,
              20480: 16777344,
              24576: 553648256,
              28672: 262272,
              32768: 16777216,
              36864: 537133056,
              40960: 536871040,
              45056: 553910400,
              49152: 553910272,
              53248: 0,
              57344: 17039488,
              61440: 553648128,
              2048: 17039488,
              6144: 553648256,
              10240: 128,
              14336: 17039360,
              18432: 262144,
              22528: 537133184,
              26624: 553910272,
              30720: 536870912,
              34816: 537133056,
              38912: 0,
              43008: 553910400,
              47104: 16777344,
              51200: 536871040,
              55296: 553648128,
              59392: 16777216,
              63488: 262272,
              65536: 262144,
              69632: 128,
              73728: 536870912,
              77824: 553648256,
              81920: 16777344,
              86016: 553910272,
              90112: 537133184,
              94208: 16777216,
              98304: 553910400,
              102400: 553648128,
              106496: 17039360,
              110592: 537133056,
              114688: 262272,
              118784: 536871040,
              122880: 0,
              126976: 17039488,
              67584: 553648256,
              71680: 16777216,
              75776: 17039360,
              79872: 537133184,
              83968: 536870912,
              88064: 17039488,
              92160: 128,
              96256: 553910272,
              100352: 262272,
              104448: 553910400,
              108544: 0,
              112640: 553648128,
              116736: 16777344,
              120832: 262144,
              124928: 537133056,
              129024: 536871040
            },
            {
              0: 268435464,
              256: 8192,
              512: 270532608,
              768: 270540808,
              1024: 268443648,
              1280: 2097152,
              1536: 2097160,
              1792: 268435456,
              2048: 0,
              2304: 268443656,
              2560: 2105344,
              2816: 8,
              3072: 270532616,
              3328: 2105352,
              3584: 8200,
              3840: 270540800,
              128: 270532608,
              384: 270540808,
              640: 8,
              896: 2097152,
              1152: 2105352,
              1408: 268435464,
              1664: 268443648,
              1920: 8200,
              2176: 2097160,
              2432: 8192,
              2688: 268443656,
              2944: 270532616,
              3200: 0,
              3456: 270540800,
              3712: 2105344,
              3968: 268435456,
              4096: 268443648,
              4352: 270532616,
              4608: 270540808,
              4864: 8200,
              5120: 2097152,
              5376: 268435456,
              5632: 268435464,
              5888: 2105344,
              6144: 2105352,
              6400: 0,
              6656: 8,
              6912: 270532608,
              7168: 8192,
              7424: 268443656,
              7680: 270540800,
              7936: 2097160,
              4224: 8,
              4480: 2105344,
              4736: 2097152,
              4992: 268435464,
              5248: 268443648,
              5504: 8200,
              5760: 270540808,
              6016: 270532608,
              6272: 270540800,
              6528: 270532616,
              6784: 8192,
              7040: 2105352,
              7296: 2097160,
              7552: 0,
              7808: 268435456,
              8064: 268443656
            },
            {
              0: 1048576,
              16: 33555457,
              32: 1024,
              48: 1049601,
              64: 34604033,
              80: 0,
              96: 1,
              112: 34603009,
              128: 33555456,
              144: 1048577,
              160: 33554433,
              176: 34604032,
              192: 34603008,
              208: 1025,
              224: 1049600,
              240: 33554432,
              8: 34603009,
              24: 0,
              40: 33555457,
              56: 34604032,
              72: 1048576,
              88: 33554433,
              104: 33554432,
              120: 1025,
              136: 1049601,
              152: 33555456,
              168: 34603008,
              184: 1048577,
              200: 1024,
              216: 34604033,
              232: 1,
              248: 1049600,
              256: 33554432,
              272: 1048576,
              288: 33555457,
              304: 34603009,
              320: 1048577,
              336: 33555456,
              352: 34604032,
              368: 1049601,
              384: 1025,
              400: 34604033,
              416: 1049600,
              432: 1,
              448: 0,
              464: 34603008,
              480: 33554433,
              496: 1024,
              264: 1049600,
              280: 33555457,
              296: 34603009,
              312: 1,
              328: 33554432,
              344: 1048576,
              360: 1025,
              376: 34604032,
              392: 33554433,
              408: 34603008,
              424: 0,
              440: 34604033,
              456: 1049601,
              472: 1024,
              488: 33555456,
              504: 1048577
            },
            {
              0: 134219808,
              1: 131072,
              2: 134217728,
              3: 32,
              4: 131104,
              5: 134350880,
              6: 134350848,
              7: 2048,
              8: 134348800,
              9: 134219776,
              10: 133120,
              11: 134348832,
              12: 2080,
              13: 0,
              14: 134217760,
              15: 133152,
              2147483648: 2048,
              2147483649: 134350880,
              2147483650: 134219808,
              2147483651: 134217728,
              2147483652: 134348800,
              2147483653: 133120,
              2147483654: 133152,
              2147483655: 32,
              2147483656: 134217760,
              2147483657: 2080,
              2147483658: 131104,
              2147483659: 134350848,
              2147483660: 0,
              2147483661: 134348832,
              2147483662: 134219776,
              2147483663: 131072,
              16: 133152,
              17: 134350848,
              18: 32,
              19: 2048,
              20: 134219776,
              21: 134217760,
              22: 134348832,
              23: 131072,
              24: 0,
              25: 131104,
              26: 134348800,
              27: 134219808,
              28: 134350880,
              29: 133120,
              30: 2080,
              31: 134217728,
              2147483664: 131072,
              2147483665: 2048,
              2147483666: 134348832,
              2147483667: 133152,
              2147483668: 32,
              2147483669: 134348800,
              2147483670: 134217728,
              2147483671: 134219808,
              2147483672: 134350880,
              2147483673: 134217760,
              2147483674: 134219776,
              2147483675: 0,
              2147483676: 133120,
              2147483677: 2080,
              2147483678: 131104,
              2147483679: 134350848
            }
          ];
          var SBOX_MASK = [
            4160749569,
            528482304,
            33030144,
            2064384,
            129024,
            8064,
            504,
            2147483679
          ];
          var DES = C_algo.DES = BlockCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              var keyBits = [];
              for (var i = 0; i < 56; i++) {
                var keyBitPos = PC1[i] - 1;
                keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
              }
              var subKeys = this._subKeys = [];
              for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
                var subKey = subKeys[nSubKey] = [];
                var bitShift = BIT_SHIFTS[nSubKey];
                for (var i = 0; i < 24; i++) {
                  subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;
                  subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
                }
                subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
                for (var i = 1; i < 7; i++) {
                  subKey[i] = subKey[i] >>> (i - 1) * 4 + 3;
                }
                subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
              }
              var invSubKeys = this._invSubKeys = [];
              for (var i = 0; i < 16; i++) {
                invSubKeys[i] = subKeys[15 - i];
              }
            },
            encryptBlock: function(M, offset) {
              this._doCryptBlock(M, offset, this._subKeys);
            },
            decryptBlock: function(M, offset) {
              this._doCryptBlock(M, offset, this._invSubKeys);
            },
            _doCryptBlock: function(M, offset, subKeys) {
              this._lBlock = M[offset];
              this._rBlock = M[offset + 1];
              exchangeLR.call(this, 4, 252645135);
              exchangeLR.call(this, 16, 65535);
              exchangeRL.call(this, 2, 858993459);
              exchangeRL.call(this, 8, 16711935);
              exchangeLR.call(this, 1, 1431655765);
              for (var round = 0; round < 16; round++) {
                var subKey = subKeys[round];
                var lBlock = this._lBlock;
                var rBlock = this._rBlock;
                var f = 0;
                for (var i = 0; i < 8; i++) {
                  f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
                }
                this._lBlock = rBlock;
                this._rBlock = lBlock ^ f;
              }
              var t = this._lBlock;
              this._lBlock = this._rBlock;
              this._rBlock = t;
              exchangeLR.call(this, 1, 1431655765);
              exchangeRL.call(this, 8, 16711935);
              exchangeRL.call(this, 2, 858993459);
              exchangeLR.call(this, 16, 65535);
              exchangeLR.call(this, 4, 252645135);
              M[offset] = this._lBlock;
              M[offset + 1] = this._rBlock;
            },
            keySize: 64 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
          });
          function exchangeLR(offset, mask) {
            var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
            this._rBlock ^= t;
            this._lBlock ^= t << offset;
          }
          function exchangeRL(offset, mask) {
            var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
            this._lBlock ^= t;
            this._rBlock ^= t << offset;
          }
          C.DES = BlockCipher._createHelper(DES);
          var TripleDES = C_algo.TripleDES = BlockCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
                throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
              }
              var key1 = keyWords.slice(0, 2);
              var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
              var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);
              this._des1 = DES.createEncryptor(WordArray.create(key1));
              this._des2 = DES.createEncryptor(WordArray.create(key2));
              this._des3 = DES.createEncryptor(WordArray.create(key3));
            },
            encryptBlock: function(M, offset) {
              this._des1.encryptBlock(M, offset);
              this._des2.decryptBlock(M, offset);
              this._des3.encryptBlock(M, offset);
            },
            decryptBlock: function(M, offset) {
              this._des3.decryptBlock(M, offset);
              this._des2.encryptBlock(M, offset);
              this._des1.decryptBlock(M, offset);
            },
            keySize: 192 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
          });
          C.TripleDES = BlockCipher._createHelper(TripleDES);
        })();
        return CryptoJS.TripleDES;
      });
    })(tripledes$1);
    return tripledes$1.exports;
  }
  var rc4$1 = { exports: {} };
  var rc4 = rc4$1.exports;
  var hasRequiredRc4;
  function requireRc4() {
    if (hasRequiredRc4) return rc4$1.exports;
    hasRequiredRc4 = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(rc4, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var RC4 = C_algo.RC4 = StreamCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              var keySigBytes = key.sigBytes;
              var S = this._S = [];
              for (var i = 0; i < 256; i++) {
                S[i] = i;
              }
              for (var i = 0, j = 0; i < 256; i++) {
                var keyByteIndex = i % keySigBytes;
                var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
                j = (j + S[i] + keyByte) % 256;
                var t = S[i];
                S[i] = S[j];
                S[j] = t;
              }
              this._i = this._j = 0;
            },
            _doProcessBlock: function(M, offset) {
              M[offset] ^= generateKeystreamWord.call(this);
            },
            keySize: 256 / 32,
            ivSize: 0
          });
          function generateKeystreamWord() {
            var S = this._S;
            var i = this._i;
            var j = this._j;
            var keystreamWord = 0;
            for (var n = 0; n < 4; n++) {
              i = (i + 1) % 256;
              j = (j + S[i]) % 256;
              var t = S[i];
              S[i] = S[j];
              S[j] = t;
              keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - n * 8;
            }
            this._i = i;
            this._j = j;
            return keystreamWord;
          }
          C.RC4 = StreamCipher._createHelper(RC4);
          var RC4Drop = C_algo.RC4Drop = RC4.extend({
            /**
             * Configuration options.
             *
             * @property {number} drop The number of keystream words to drop. Default 192
             */
            cfg: RC4.cfg.extend({
              drop: 192
            }),
            _doReset: function() {
              RC4._doReset.call(this);
              for (var i = this.cfg.drop; i > 0; i--) {
                generateKeystreamWord.call(this);
              }
            }
          });
          C.RC4Drop = StreamCipher._createHelper(RC4Drop);
        })();
        return CryptoJS.RC4;
      });
    })(rc4$1);
    return rc4$1.exports;
  }
  var rabbit$1 = { exports: {} };
  var rabbit = rabbit$1.exports;
  var hasRequiredRabbit;
  function requireRabbit() {
    if (hasRequiredRabbit) return rabbit$1.exports;
    hasRequiredRabbit = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(rabbit, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var S = [];
          var C_ = [];
          var G = [];
          var Rabbit = C_algo.Rabbit = StreamCipher.extend({
            _doReset: function() {
              var K = this._key.words;
              var iv = this.cfg.iv;
              for (var i = 0; i < 4; i++) {
                K[i] = (K[i] << 8 | K[i] >>> 24) & 16711935 | (K[i] << 24 | K[i] >>> 8) & 4278255360;
              }
              var X = this._X = [
                K[0],
                K[3] << 16 | K[2] >>> 16,
                K[1],
                K[0] << 16 | K[3] >>> 16,
                K[2],
                K[1] << 16 | K[0] >>> 16,
                K[3],
                K[2] << 16 | K[1] >>> 16
              ];
              var C2 = this._C = [
                K[2] << 16 | K[2] >>> 16,
                K[0] & 4294901760 | K[1] & 65535,
                K[3] << 16 | K[3] >>> 16,
                K[1] & 4294901760 | K[2] & 65535,
                K[0] << 16 | K[0] >>> 16,
                K[2] & 4294901760 | K[3] & 65535,
                K[1] << 16 | K[1] >>> 16,
                K[3] & 4294901760 | K[0] & 65535
              ];
              this._b = 0;
              for (var i = 0; i < 4; i++) {
                nextState.call(this);
              }
              for (var i = 0; i < 8; i++) {
                C2[i] ^= X[i + 4 & 7];
              }
              if (iv) {
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];
                var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                var i1 = i0 >>> 16 | i2 & 4294901760;
                var i3 = i2 << 16 | i0 & 65535;
                C2[0] ^= i0;
                C2[1] ^= i1;
                C2[2] ^= i2;
                C2[3] ^= i3;
                C2[4] ^= i0;
                C2[5] ^= i1;
                C2[6] ^= i2;
                C2[7] ^= i3;
                for (var i = 0; i < 4; i++) {
                  nextState.call(this);
                }
              }
            },
            _doProcessBlock: function(M, offset) {
              var X = this._X;
              nextState.call(this);
              S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
              S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
              S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
              S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
              for (var i = 0; i < 4; i++) {
                S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
                M[offset + i] ^= S[i];
              }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });
          function nextState() {
            var X = this._X;
            var C2 = this._C;
            for (var i = 0; i < 8; i++) {
              C_[i] = C2[i];
            }
            C2[0] = C2[0] + 1295307597 + this._b | 0;
            C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
            C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
            C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
            C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
            C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
            C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
            C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
            this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i = 0; i < 8; i++) {
              var gx = X[i] + C2[i];
              var ga = gx & 65535;
              var gb = gx >>> 16;
              var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
              var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
              G[i] = gh ^ gl;
            }
            X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
            X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
            X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
            X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
            X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
            X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
            X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
            X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
          }
          C.Rabbit = StreamCipher._createHelper(Rabbit);
        })();
        return CryptoJS.Rabbit;
      });
    })(rabbit$1);
    return rabbit$1.exports;
  }
  var rabbitLegacy$1 = { exports: {} };
  var rabbitLegacy = rabbitLegacy$1.exports;
  var hasRequiredRabbitLegacy;
  function requireRabbitLegacy() {
    if (hasRequiredRabbitLegacy) return rabbitLegacy$1.exports;
    hasRequiredRabbitLegacy = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(rabbitLegacy, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var S = [];
          var C_ = [];
          var G = [];
          var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
            _doReset: function() {
              var K = this._key.words;
              var iv = this.cfg.iv;
              var X = this._X = [
                K[0],
                K[3] << 16 | K[2] >>> 16,
                K[1],
                K[0] << 16 | K[3] >>> 16,
                K[2],
                K[1] << 16 | K[0] >>> 16,
                K[3],
                K[2] << 16 | K[1] >>> 16
              ];
              var C2 = this._C = [
                K[2] << 16 | K[2] >>> 16,
                K[0] & 4294901760 | K[1] & 65535,
                K[3] << 16 | K[3] >>> 16,
                K[1] & 4294901760 | K[2] & 65535,
                K[0] << 16 | K[0] >>> 16,
                K[2] & 4294901760 | K[3] & 65535,
                K[1] << 16 | K[1] >>> 16,
                K[3] & 4294901760 | K[0] & 65535
              ];
              this._b = 0;
              for (var i = 0; i < 4; i++) {
                nextState.call(this);
              }
              for (var i = 0; i < 8; i++) {
                C2[i] ^= X[i + 4 & 7];
              }
              if (iv) {
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];
                var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                var i1 = i0 >>> 16 | i2 & 4294901760;
                var i3 = i2 << 16 | i0 & 65535;
                C2[0] ^= i0;
                C2[1] ^= i1;
                C2[2] ^= i2;
                C2[3] ^= i3;
                C2[4] ^= i0;
                C2[5] ^= i1;
                C2[6] ^= i2;
                C2[7] ^= i3;
                for (var i = 0; i < 4; i++) {
                  nextState.call(this);
                }
              }
            },
            _doProcessBlock: function(M, offset) {
              var X = this._X;
              nextState.call(this);
              S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
              S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
              S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
              S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
              for (var i = 0; i < 4; i++) {
                S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
                M[offset + i] ^= S[i];
              }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });
          function nextState() {
            var X = this._X;
            var C2 = this._C;
            for (var i = 0; i < 8; i++) {
              C_[i] = C2[i];
            }
            C2[0] = C2[0] + 1295307597 + this._b | 0;
            C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
            C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
            C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
            C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
            C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
            C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
            C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
            this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i = 0; i < 8; i++) {
              var gx = X[i] + C2[i];
              var ga = gx & 65535;
              var gb = gx >>> 16;
              var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
              var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
              G[i] = gh ^ gl;
            }
            X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
            X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
            X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
            X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
            X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
            X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
            X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
            X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
          }
          C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
        })();
        return CryptoJS.RabbitLegacy;
      });
    })(rabbitLegacy$1);
    return rabbitLegacy$1.exports;
  }
  var blowfish$1 = { exports: {} };
  var blowfish = blowfish$1.exports;
  var hasRequiredBlowfish;
  function requireBlowfish() {
    if (hasRequiredBlowfish) return blowfish$1.exports;
    hasRequiredBlowfish = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(blowfish, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C.algo;
          const N = 16;
          const ORIG_P = [
            608135816,
            2242054355,
            320440878,
            57701188,
            2752067618,
            698298832,
            137296536,
            3964562569,
            1160258022,
            953160567,
            3193202383,
            887688300,
            3232508343,
            3380367581,
            1065670069,
            3041331479,
            2450970073,
            2306472731
          ];
          const ORIG_S = [
            [
              3509652390,
              2564797868,
              805139163,
              3491422135,
              3101798381,
              1780907670,
              3128725573,
              4046225305,
              614570311,
              3012652279,
              134345442,
              2240740374,
              1667834072,
              1901547113,
              2757295779,
              4103290238,
              227898511,
              1921955416,
              1904987480,
              2182433518,
              2069144605,
              3260701109,
              2620446009,
              720527379,
              3318853667,
              677414384,
              3393288472,
              3101374703,
              2390351024,
              1614419982,
              1822297739,
              2954791486,
              3608508353,
              3174124327,
              2024746970,
              1432378464,
              3864339955,
              2857741204,
              1464375394,
              1676153920,
              1439316330,
              715854006,
              3033291828,
              289532110,
              2706671279,
              2087905683,
              3018724369,
              1668267050,
              732546397,
              1947742710,
              3462151702,
              2609353502,
              2950085171,
              1814351708,
              2050118529,
              680887927,
              999245976,
              1800124847,
              3300911131,
              1713906067,
              1641548236,
              4213287313,
              1216130144,
              1575780402,
              4018429277,
              3917837745,
              3693486850,
              3949271944,
              596196993,
              3549867205,
              258830323,
              2213823033,
              772490370,
              2760122372,
              1774776394,
              2652871518,
              566650946,
              4142492826,
              1728879713,
              2882767088,
              1783734482,
              3629395816,
              2517608232,
              2874225571,
              1861159788,
              326777828,
              3124490320,
              2130389656,
              2716951837,
              967770486,
              1724537150,
              2185432712,
              2364442137,
              1164943284,
              2105845187,
              998989502,
              3765401048,
              2244026483,
              1075463327,
              1455516326,
              1322494562,
              910128902,
              469688178,
              1117454909,
              936433444,
              3490320968,
              3675253459,
              1240580251,
              122909385,
              2157517691,
              634681816,
              4142456567,
              3825094682,
              3061402683,
              2540495037,
              79693498,
              3249098678,
              1084186820,
              1583128258,
              426386531,
              1761308591,
              1047286709,
              322548459,
              995290223,
              1845252383,
              2603652396,
              3431023940,
              2942221577,
              3202600964,
              3727903485,
              1712269319,
              422464435,
              3234572375,
              1170764815,
              3523960633,
              3117677531,
              1434042557,
              442511882,
              3600875718,
              1076654713,
              1738483198,
              4213154764,
              2393238008,
              3677496056,
              1014306527,
              4251020053,
              793779912,
              2902807211,
              842905082,
              4246964064,
              1395751752,
              1040244610,
              2656851899,
              3396308128,
              445077038,
              3742853595,
              3577915638,
              679411651,
              2892444358,
              2354009459,
              1767581616,
              3150600392,
              3791627101,
              3102740896,
              284835224,
              4246832056,
              1258075500,
              768725851,
              2589189241,
              3069724005,
              3532540348,
              1274779536,
              3789419226,
              2764799539,
              1660621633,
              3471099624,
              4011903706,
              913787905,
              3497959166,
              737222580,
              2514213453,
              2928710040,
              3937242737,
              1804850592,
              3499020752,
              2949064160,
              2386320175,
              2390070455,
              2415321851,
              4061277028,
              2290661394,
              2416832540,
              1336762016,
              1754252060,
              3520065937,
              3014181293,
              791618072,
              3188594551,
              3933548030,
              2332172193,
              3852520463,
              3043980520,
              413987798,
              3465142937,
              3030929376,
              4245938359,
              2093235073,
              3534596313,
              375366246,
              2157278981,
              2479649556,
              555357303,
              3870105701,
              2008414854,
              3344188149,
              4221384143,
              3956125452,
              2067696032,
              3594591187,
              2921233993,
              2428461,
              544322398,
              577241275,
              1471733935,
              610547355,
              4027169054,
              1432588573,
              1507829418,
              2025931657,
              3646575487,
              545086370,
              48609733,
              2200306550,
              1653985193,
              298326376,
              1316178497,
              3007786442,
              2064951626,
              458293330,
              2589141269,
              3591329599,
              3164325604,
              727753846,
              2179363840,
              146436021,
              1461446943,
              4069977195,
              705550613,
              3059967265,
              3887724982,
              4281599278,
              3313849956,
              1404054877,
              2845806497,
              146425753,
              1854211946
            ],
            [
              1266315497,
              3048417604,
              3681880366,
              3289982499,
              290971e4,
              1235738493,
              2632868024,
              2414719590,
              3970600049,
              1771706367,
              1449415276,
              3266420449,
              422970021,
              1963543593,
              2690192192,
              3826793022,
              1062508698,
              1531092325,
              1804592342,
              2583117782,
              2714934279,
              4024971509,
              1294809318,
              4028980673,
              1289560198,
              2221992742,
              1669523910,
              35572830,
              157838143,
              1052438473,
              1016535060,
              1802137761,
              1753167236,
              1386275462,
              3080475397,
              2857371447,
              1040679964,
              2145300060,
              2390574316,
              1461121720,
              2956646967,
              4031777805,
              4028374788,
              33600511,
              2920084762,
              1018524850,
              629373528,
              3691585981,
              3515945977,
              2091462646,
              2486323059,
              586499841,
              988145025,
              935516892,
              3367335476,
              2599673255,
              2839830854,
              265290510,
              3972581182,
              2759138881,
              3795373465,
              1005194799,
              847297441,
              406762289,
              1314163512,
              1332590856,
              1866599683,
              4127851711,
              750260880,
              613907577,
              1450815602,
              3165620655,
              3734664991,
              3650291728,
              3012275730,
              3704569646,
              1427272223,
              778793252,
              1343938022,
              2676280711,
              2052605720,
              1946737175,
              3164576444,
              3914038668,
              3967478842,
              3682934266,
              1661551462,
              3294938066,
              4011595847,
              840292616,
              3712170807,
              616741398,
              312560963,
              711312465,
              1351876610,
              322626781,
              1910503582,
              271666773,
              2175563734,
              1594956187,
              70604529,
              3617834859,
              1007753275,
              1495573769,
              4069517037,
              2549218298,
              2663038764,
              504708206,
              2263041392,
              3941167025,
              2249088522,
              1514023603,
              1998579484,
              1312622330,
              694541497,
              2582060303,
              2151582166,
              1382467621,
              776784248,
              2618340202,
              3323268794,
              2497899128,
              2784771155,
              503983604,
              4076293799,
              907881277,
              423175695,
              432175456,
              1378068232,
              4145222326,
              3954048622,
              3938656102,
              3820766613,
              2793130115,
              2977904593,
              26017576,
              3274890735,
              3194772133,
              1700274565,
              1756076034,
              4006520079,
              3677328699,
              720338349,
              1533947780,
              354530856,
              688349552,
              3973924725,
              1637815568,
              332179504,
              3949051286,
              53804574,
              2852348879,
              3044236432,
              1282449977,
              3583942155,
              3416972820,
              4006381244,
              1617046695,
              2628476075,
              3002303598,
              1686838959,
              431878346,
              2686675385,
              1700445008,
              1080580658,
              1009431731,
              832498133,
              3223435511,
              2605976345,
              2271191193,
              2516031870,
              1648197032,
              4164389018,
              2548247927,
              300782431,
              375919233,
              238389289,
              3353747414,
              2531188641,
              2019080857,
              1475708069,
              455242339,
              2609103871,
              448939670,
              3451063019,
              1395535956,
              2413381860,
              1841049896,
              1491858159,
              885456874,
              4264095073,
              4001119347,
              1565136089,
              3898914787,
              1108368660,
              540939232,
              1173283510,
              2745871338,
              3681308437,
              4207628240,
              3343053890,
              4016749493,
              1699691293,
              1103962373,
              3625875870,
              2256883143,
              3830138730,
              1031889488,
              3479347698,
              1535977030,
              4236805024,
              3251091107,
              2132092099,
              1774941330,
              1199868427,
              1452454533,
              157007616,
              2904115357,
              342012276,
              595725824,
              1480756522,
              206960106,
              497939518,
              591360097,
              863170706,
              2375253569,
              3596610801,
              1814182875,
              2094937945,
              3421402208,
              1082520231,
              3463918190,
              2785509508,
              435703966,
              3908032597,
              1641649973,
              2842273706,
              3305899714,
              1510255612,
              2148256476,
              2655287854,
              3276092548,
              4258621189,
              236887753,
              3681803219,
              274041037,
              1734335097,
              3815195456,
              3317970021,
              1899903192,
              1026095262,
              4050517792,
              356393447,
              2410691914,
              3873677099,
              3682840055
            ],
            [
              3913112168,
              2491498743,
              4132185628,
              2489919796,
              1091903735,
              1979897079,
              3170134830,
              3567386728,
              3557303409,
              857797738,
              1136121015,
              1342202287,
              507115054,
              2535736646,
              337727348,
              3213592640,
              1301675037,
              2528481711,
              1895095763,
              1721773893,
              3216771564,
              62756741,
              2142006736,
              835421444,
              2531993523,
              1442658625,
              3659876326,
              2882144922,
              676362277,
              1392781812,
              170690266,
              3921047035,
              1759253602,
              3611846912,
              1745797284,
              664899054,
              1329594018,
              3901205900,
              3045908486,
              2062866102,
              2865634940,
              3543621612,
              3464012697,
              1080764994,
              553557557,
              3656615353,
              3996768171,
              991055499,
              499776247,
              1265440854,
              648242737,
              3940784050,
              980351604,
              3713745714,
              1749149687,
              3396870395,
              4211799374,
              3640570775,
              1161844396,
              3125318951,
              1431517754,
              545492359,
              4268468663,
              3499529547,
              1437099964,
              2702547544,
              3433638243,
              2581715763,
              2787789398,
              1060185593,
              1593081372,
              2418618748,
              4260947970,
              69676912,
              2159744348,
              86519011,
              2512459080,
              3838209314,
              1220612927,
              3339683548,
              133810670,
              1090789135,
              1078426020,
              1569222167,
              845107691,
              3583754449,
              4072456591,
              1091646820,
              628848692,
              1613405280,
              3757631651,
              526609435,
              236106946,
              48312990,
              2942717905,
              3402727701,
              1797494240,
              859738849,
              992217954,
              4005476642,
              2243076622,
              3870952857,
              3732016268,
              765654824,
              3490871365,
              2511836413,
              1685915746,
              3888969200,
              1414112111,
              2273134842,
              3281911079,
              4080962846,
              172450625,
              2569994100,
              980381355,
              4109958455,
              2819808352,
              2716589560,
              2568741196,
              3681446669,
              3329971472,
              1835478071,
              660984891,
              3704678404,
              4045999559,
              3422617507,
              3040415634,
              1762651403,
              1719377915,
              3470491036,
              2693910283,
              3642056355,
              3138596744,
              1364962596,
              2073328063,
              1983633131,
              926494387,
              3423689081,
              2150032023,
              4096667949,
              1749200295,
              3328846651,
              309677260,
              2016342300,
              1779581495,
              3079819751,
              111262694,
              1274766160,
              443224088,
              298511866,
              1025883608,
              3806446537,
              1145181785,
              168956806,
              3641502830,
              3584813610,
              1689216846,
              3666258015,
              3200248200,
              1692713982,
              2646376535,
              4042768518,
              1618508792,
              1610833997,
              3523052358,
              4130873264,
              2001055236,
              3610705100,
              2202168115,
              4028541809,
              2961195399,
              1006657119,
              2006996926,
              3186142756,
              1430667929,
              3210227297,
              1314452623,
              4074634658,
              4101304120,
              2273951170,
              1399257539,
              3367210612,
              3027628629,
              1190975929,
              2062231137,
              2333990788,
              2221543033,
              2438960610,
              1181637006,
              548689776,
              2362791313,
              3372408396,
              3104550113,
              3145860560,
              296247880,
              1970579870,
              3078560182,
              3769228297,
              1714227617,
              3291629107,
              3898220290,
              166772364,
              1251581989,
              493813264,
              448347421,
              195405023,
              2709975567,
              677966185,
              3703036547,
              1463355134,
              2715995803,
              1338867538,
              1343315457,
              2802222074,
              2684532164,
              233230375,
              2599980071,
              2000651841,
              3277868038,
              1638401717,
              4028070440,
              3237316320,
              6314154,
              819756386,
              300326615,
              590932579,
              1405279636,
              3267499572,
              3150704214,
              2428286686,
              3959192993,
              3461946742,
              1862657033,
              1266418056,
              963775037,
              2089974820,
              2263052895,
              1917689273,
              448879540,
              3550394620,
              3981727096,
              150775221,
              3627908307,
              1303187396,
              508620638,
              2975983352,
              2726630617,
              1817252668,
              1876281319,
              1457606340,
              908771278,
              3720792119,
              3617206836,
              2455994898,
              1729034894,
              1080033504
            ],
            [
              976866871,
              3556439503,
              2881648439,
              1522871579,
              1555064734,
              1336096578,
              3548522304,
              2579274686,
              3574697629,
              3205460757,
              3593280638,
              3338716283,
              3079412587,
              564236357,
              2993598910,
              1781952180,
              1464380207,
              3163844217,
              3332601554,
              1699332808,
              1393555694,
              1183702653,
              3581086237,
              1288719814,
              691649499,
              2847557200,
              2895455976,
              3193889540,
              2717570544,
              1781354906,
              1676643554,
              2592534050,
              3230253752,
              1126444790,
              2770207658,
              2633158820,
              2210423226,
              2615765581,
              2414155088,
              3127139286,
              673620729,
              2805611233,
              1269405062,
              4015350505,
              3341807571,
              4149409754,
              1057255273,
              2012875353,
              2162469141,
              2276492801,
              2601117357,
              993977747,
              3918593370,
              2654263191,
              753973209,
              36408145,
              2530585658,
              25011837,
              3520020182,
              2088578344,
              530523599,
              2918365339,
              1524020338,
              1518925132,
              3760827505,
              3759777254,
              1202760957,
              3985898139,
              3906192525,
              674977740,
              4174734889,
              2031300136,
              2019492241,
              3983892565,
              4153806404,
              3822280332,
              352677332,
              2297720250,
              60907813,
              90501309,
              3286998549,
              1016092578,
              2535922412,
              2839152426,
              457141659,
              509813237,
              4120667899,
              652014361,
              1966332200,
              2975202805,
              55981186,
              2327461051,
              676427537,
              3255491064,
              2882294119,
              3433927263,
              1307055953,
              942726286,
              933058658,
              2468411793,
              3933900994,
              4215176142,
              1361170020,
              2001714738,
              2830558078,
              3274259782,
              1222529897,
              1679025792,
              2729314320,
              3714953764,
              1770335741,
              151462246,
              3013232138,
              1682292957,
              1483529935,
              471910574,
              1539241949,
              458788160,
              3436315007,
              1807016891,
              3718408830,
              978976581,
              1043663428,
              3165965781,
              1927990952,
              4200891579,
              2372276910,
              3208408903,
              3533431907,
              1412390302,
              2931980059,
              4132332400,
              1947078029,
              3881505623,
              4168226417,
              2941484381,
              1077988104,
              1320477388,
              886195818,
              18198404,
              3786409e3,
              2509781533,
              112762804,
              3463356488,
              1866414978,
              891333506,
              18488651,
              661792760,
              1628790961,
              3885187036,
              3141171499,
              876946877,
              2693282273,
              1372485963,
              791857591,
              2686433993,
              3759982718,
              3167212022,
              3472953795,
              2716379847,
              445679433,
              3561995674,
              3504004811,
              3574258232,
              54117162,
              3331405415,
              2381918588,
              3769707343,
              4154350007,
              1140177722,
              4074052095,
              668550556,
              3214352940,
              367459370,
              261225585,
              2610173221,
              4209349473,
              3468074219,
              3265815641,
              314222801,
              3066103646,
              3808782860,
              282218597,
              3406013506,
              3773591054,
              379116347,
              1285071038,
              846784868,
              2669647154,
              3771962079,
              3550491691,
              2305946142,
              453669953,
              1268987020,
              3317592352,
              3279303384,
              3744833421,
              2610507566,
              3859509063,
              266596637,
              3847019092,
              517658769,
              3462560207,
              3443424879,
              370717030,
              4247526661,
              2224018117,
              4143653529,
              4112773975,
              2788324899,
              2477274417,
              1456262402,
              2901442914,
              1517677493,
              1846949527,
              2295493580,
              3734397586,
              2176403920,
              1280348187,
              1908823572,
              3871786941,
              846861322,
              1172426758,
              3287448474,
              3383383037,
              1655181056,
              3139813346,
              901632758,
              1897031941,
              2986607138,
              3066810236,
              3447102507,
              1393639104,
              373351379,
              950779232,
              625454576,
              3124240540,
              4148612726,
              2007998917,
              544563296,
              2244738638,
              2330496472,
              2058025392,
              1291430526,
              424198748,
              50039436,
              29584100,
              3605783033,
              2429876329,
              2791104160,
              1057563949,
              3255363231,
              3075367218,
              3463963227,
              1469046755,
              985887462
            ]
          ];
          var BLOWFISH_CTX = {
            pbox: [],
            sbox: []
          };
          function F(ctx, x) {
            let a = x >> 24 & 255;
            let b = x >> 16 & 255;
            let c = x >> 8 & 255;
            let d = x & 255;
            let y = ctx.sbox[0][a] + ctx.sbox[1][b];
            y = y ^ ctx.sbox[2][c];
            y = y + ctx.sbox[3][d];
            return y;
          }
          function BlowFish_Encrypt(ctx, left, right) {
            let Xl = left;
            let Xr = right;
            let temp;
            for (let i = 0; i < N; ++i) {
              Xl = Xl ^ ctx.pbox[i];
              Xr = F(ctx, Xl) ^ Xr;
              temp = Xl;
              Xl = Xr;
              Xr = temp;
            }
            temp = Xl;
            Xl = Xr;
            Xr = temp;
            Xr = Xr ^ ctx.pbox[N];
            Xl = Xl ^ ctx.pbox[N + 1];
            return { left: Xl, right: Xr };
          }
          function BlowFish_Decrypt(ctx, left, right) {
            let Xl = left;
            let Xr = right;
            let temp;
            for (let i = N + 1; i > 1; --i) {
              Xl = Xl ^ ctx.pbox[i];
              Xr = F(ctx, Xl) ^ Xr;
              temp = Xl;
              Xl = Xr;
              Xr = temp;
            }
            temp = Xl;
            Xl = Xr;
            Xr = temp;
            Xr = Xr ^ ctx.pbox[1];
            Xl = Xl ^ ctx.pbox[0];
            return { left: Xl, right: Xr };
          }
          function BlowFishInit(ctx, key, keysize) {
            for (let Row = 0; Row < 4; Row++) {
              ctx.sbox[Row] = [];
              for (let Col = 0; Col < 256; Col++) {
                ctx.sbox[Row][Col] = ORIG_S[Row][Col];
              }
            }
            let keyIndex = 0;
            for (let index = 0; index < N + 2; index++) {
              ctx.pbox[index] = ORIG_P[index] ^ key[keyIndex];
              keyIndex++;
              if (keyIndex >= keysize) {
                keyIndex = 0;
              }
            }
            let Data1 = 0;
            let Data2 = 0;
            let res = 0;
            for (let i = 0; i < N + 2; i += 2) {
              res = BlowFish_Encrypt(ctx, Data1, Data2);
              Data1 = res.left;
              Data2 = res.right;
              ctx.pbox[i] = Data1;
              ctx.pbox[i + 1] = Data2;
            }
            for (let i = 0; i < 4; i++) {
              for (let j = 0; j < 256; j += 2) {
                res = BlowFish_Encrypt(ctx, Data1, Data2);
                Data1 = res.left;
                Data2 = res.right;
                ctx.sbox[i][j] = Data1;
                ctx.sbox[i][j + 1] = Data2;
              }
            }
            return true;
          }
          var Blowfish = C_algo.Blowfish = BlockCipher.extend({
            _doReset: function() {
              if (this._keyPriorReset === this._key) {
                return;
              }
              var key = this._keyPriorReset = this._key;
              var keyWords = key.words;
              var keySize = key.sigBytes / 4;
              BlowFishInit(BLOWFISH_CTX, keyWords, keySize);
            },
            encryptBlock: function(M, offset) {
              var res = BlowFish_Encrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
              M[offset] = res.left;
              M[offset + 1] = res.right;
            },
            decryptBlock: function(M, offset) {
              var res = BlowFish_Decrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
              M[offset] = res.left;
              M[offset + 1] = res.right;
            },
            blockSize: 64 / 32,
            keySize: 128 / 32,
            ivSize: 64 / 32
          });
          C.Blowfish = BlockCipher._createHelper(Blowfish);
        })();
        return CryptoJS.Blowfish;
      });
    })(blowfish$1);
    return blowfish$1.exports;
  }
  var cryptoJs = cryptoJs$1.exports;
  var hasRequiredCryptoJs;
  function requireCryptoJs() {
    if (hasRequiredCryptoJs) return cryptoJs$1.exports;
    hasRequiredCryptoJs = 1;
    (function(module, exports$1) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireX64Core(), requireLibTypedarrays(), requireEncUtf16(), requireEncBase64(), requireEncBase64url(), requireMd5(), requireSha1(), requireSha256(), requireSha224(), requireSha512(), requireSha384(), requireSha3(), requireRipemd160(), requireHmac(), requirePbkdf2(), requireEvpkdf(), requireCipherCore(), requireModeCfb(), requireModeCtr(), requireModeCtrGladman(), requireModeOfb(), requireModeEcb(), requirePadAnsix923(), requirePadIso10126(), requirePadIso97971(), requirePadZeropadding(), requirePadNopadding(), requireFormatHex(), requireAes(), requireTripledes(), requireRc4(), requireRabbit(), requireRabbitLegacy(), requireBlowfish());
        }
      })(cryptoJs, function(CryptoJS) {
        return CryptoJS;
      });
    })(cryptoJs$1);
    return cryptoJs$1.exports;
  }
  requireCryptoJs();
  function getVaultValue(vault, key) {
    return vault.fields.find((f) => f.key === key)?.value;
  }
  const MAX_TOKENS_BYTES = 2048;
  const FILL_HIGHLIGHT_COLOR = "#3b82f620";
  const FILL_BORDER_COLOR = "#3b82f6";
  const SUCCESS_COLOR = "#10b98120";
  const SUCCESS_BORDER = "#10b981";
  const ERROR_COLOR = "#ef444420";
  const ERROR_BORDER = "#ef4444";
  function resolveLabel(el) {
    const ariaLabel = el.getAttribute("aria-label");
    if (ariaLabel) return ariaLabel.trim();
    const labelledBy = el.getAttribute("aria-labelledby");
    if (labelledBy) {
      const labelEl = document.getElementById(labelledBy);
      if (labelEl) return (labelEl.textContent ?? "").trim();
    }
    const id = el.id;
    if (id) {
      const label = document.querySelector(`label[for="${CSS.escape(id)}"]`);
      if (label) return (label.textContent ?? "").trim();
    }
    const wrappingLabel = el.closest("label");
    if (wrappingLabel) {
      const clone = wrappingLabel.cloneNode(true);
      clone.querySelectorAll("input,select,textarea").forEach((e) => e.remove());
      const text = (clone.textContent ?? "").trim();
      if (text) return text;
    }
    const placeholder = el.placeholder;
    if (placeholder) return placeholder.trim();
    const name = el.getAttribute("name");
    if (name) return name.replace(/[_-]/g, " ").trim();
    return "";
  }
  function getContext(el) {
    const parent = el.closest("div, section, fieldset, form") ?? el.parentElement;
    if (!parent) return "";
    const text = (parent.textContent ?? "").replace(/\s+/g, " ").trim();
    return text.slice(0, 100);
  }
  function getSemanticMap() {
    const INTERACTIVE_SELECTOR = 'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="image"]), select, textarea';
    const elements = Array.from(
      document.querySelectorAll(INTERACTIVE_SELECTOR)
    );
    const fields = [];
    let bytesUsed = 0;
    for (const el of elements) {
      if (!el.offsetParent && el.getAttribute("type") !== "hidden") continue;
      if (bytesUsed >= MAX_TOKENS_BYTES) break;
      const id = el.id || el.getAttribute("name") || `field_${fields.length}`;
      const type = el.tagName === "SELECT" ? "select" : el.tagName === "TEXTAREA" ? "textarea" : el.type || "text";
      const label = resolveLabel(el);
      if (!label) continue;
      const field = {
        id,
        type,
        label
      };
      const placeholder = el.placeholder;
      if (placeholder && placeholder !== label) field.placeholder = placeholder;
      const name = el.getAttribute("name");
      if (name && name !== id) field.name = name;
      if (el.tagName === "SELECT") {
        const opts = Array.from(el.options).map((o) => o.text.trim()).filter((t) => t && t.toLowerCase() !== "select" && t !== "--");
        if (opts.length) field.options = opts.slice(0, 10);
      }
      if (el.required) field.required = true;
      const context = getContext(el);
      if (context && context !== label) field.context = context;
      fields.push(field);
      bytesUsed += JSON.stringify(field).length;
    }
    return {
      url: window.location.href,
      title: document.title,
      fields,
      totalFields: elements.length
    };
  }
  function findElement(fieldId) {
    let el = document.getElementById(fieldId);
    if (el) return el;
    el = document.querySelector(`[name="${CSS.escape(fieldId)}"]`);
    if (el) return el;
    el = document.querySelector(`[data-testid="${CSS.escape(fieldId)}"]`);
    return el;
  }
  function highlightField(fieldId) {
    const el = findElement(fieldId);
    if (!el) return;
    el.style.backgroundColor = FILL_HIGHLIGHT_COLOR;
    el.style.borderColor = FILL_BORDER_COLOR;
    el.style.boxShadow = `0 0 0 2px ${FILL_BORDER_COLOR}`;
    el.style.outline = "none";
    el.style.transition = "all 0.2s ease";
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function markFieldSuccess(fieldId) {
    const el = findElement(fieldId);
    if (!el) return;
    el.style.backgroundColor = SUCCESS_COLOR;
    el.style.borderColor = SUCCESS_BORDER;
    el.style.boxShadow = `0 0 0 2px ${SUCCESS_BORDER}`;
    const wrapper = el.parentElement;
    if (wrapper) {
      const existing = wrapper.querySelector(".citizen-one-check");
      if (!existing) {
        const check = document.createElement("span");
        check.className = "citizen-one-check";
        check.textContent = "✓";
        check.style.cssText = `
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        color: #10b981;
        font-weight: bold;
        font-size: 16px;
        pointer-events: none;
        z-index: 9999;
      `;
        if (getComputedStyle(wrapper).position === "static") {
          wrapper.style.position = "relative";
        }
        wrapper.appendChild(check);
      }
    }
  }
  function markFieldError(fieldId) {
    const el = findElement(fieldId);
    if (!el) return;
    el.style.backgroundColor = ERROR_COLOR;
    el.style.borderColor = ERROR_BORDER;
    el.style.boxShadow = `0 0 0 2px ${ERROR_BORDER}`;
  }
  async function fillForm(mapping, vault) {
    const results = [];
    for (const [fieldId, vaultKey] of Object.entries(mapping)) {
      const value = getVaultValue(vault, vaultKey);
      const el = findElement(fieldId);
      if (!el) {
        results.push({ fieldId, success: false, mappedKey: vaultKey, error: "Element not found" });
        continue;
      }
      if (!value) {
        results.push({ fieldId, success: false, mappedKey: vaultKey, error: "No vault value for key: " + vaultKey });
        continue;
      }
      highlightField(fieldId);
      await sleep(150);
      try {
        if (el.tagName === "SELECT") {
          fillSelect(el, value);
        } else {
          fillInput(el, value);
        }
        markFieldSuccess(fieldId);
        results.push({ fieldId, success: true, mappedKey: vaultKey });
      } catch (err) {
        markFieldError(fieldId);
        results.push({
          fieldId,
          success: false,
          mappedKey: vaultKey,
          error: err instanceof Error ? err.message : "Unknown error"
        });
      }
      await sleep(100);
    }
    return results;
  }
  function fillInput(el, value) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      el.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype,
      "value"
    )?.set;
    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(el, value);
    } else {
      el.value = value;
    }
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    el.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true }));
  }
  function fillSelect(el, value) {
    for (const option of el.options) {
      if (option.value.toLowerCase() === value.toLowerCase() || option.text.toLowerCase() === value.toLowerCase()) {
        el.value = option.value;
        el.dispatchEvent(new Event("change", { bubbles: true }));
        return;
      }
    }
    for (const option of el.options) {
      if (option.text.toLowerCase().includes(value.toLowerCase()) || value.toLowerCase().includes(option.text.toLowerCase())) {
        el.value = option.value;
        el.dispatchEvent(new Event("change", { bubbles: true }));
        return;
      }
    }
    throw new Error(`No matching option for value: ${value}`);
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const definition = defineContentScript({
    matches: ["<all_urls>"],
    runAt: "document_idle",
    main() {
      console.log("[CitizenOne] Content script loaded.");
      chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
        handleContentMessage(message, sendResponse);
        return true;
      });
    }
  });
  function handleContentMessage(message, sendResponse) {
    switch (message.type) {
      case "GET_SEMANTIC_MAP": {
        try {
          const map = getSemanticMap();
          sendResponse({ success: true, data: map });
        } catch (err) {
          sendResponse({ success: false, error: String(err) });
        }
        break;
      }
      case "FILL_FORM": {
        const mapping = message.mapping;
        const vault = message.vault;
        fillForm(mapping, vault).then((results) => sendResponse({ success: true, data: results })).catch((err) => sendResponse({ success: false, error: String(err) }));
        break;
      }
      case "HIGHLIGHT_FIELD": {
        highlightField(message.fieldId);
        sendResponse({ success: true, data: null });
        break;
      }
      case "MARK_SUCCESS": {
        markFieldSuccess(message.fieldId);
        sendResponse({ success: true, data: null });
        break;
      }
      case "MARK_ERROR": {
        markFieldError(message.fieldId);
        sendResponse({ success: true, data: null });
        break;
      }
      default:
        sendResponse({ success: false, error: `Unknown message: ${message.type}` });
    }
  }
  function print$1(method, ...args) {
    if (typeof args[0] === "string") method(`[wxt] ${args.shift()}`, ...args);
    else method("[wxt]", ...args);
  }
  const logger$1 = {
    debug: (...args) => print$1(console.debug, ...args),
    log: (...args) => print$1(console.log, ...args),
    warn: (...args) => print$1(console.warn, ...args),
    error: (...args) => print$1(console.error, ...args)
  };
  const browser$1 = globalThis.browser?.runtime?.id ? globalThis.browser : globalThis.chrome;
  const browser = browser$1;
  var WxtLocationChangeEvent = class WxtLocationChangeEvent2 extends Event {
    static EVENT_NAME = getUniqueEventName("wxt:locationchange");
    constructor(newUrl, oldUrl) {
      super(WxtLocationChangeEvent2.EVENT_NAME, {});
      this.newUrl = newUrl;
      this.oldUrl = oldUrl;
    }
  };
  function getUniqueEventName(eventName) {
    return `${browser?.runtime?.id}:${"content"}:${eventName}`;
  }
  function createLocationWatcher(ctx) {
    let interval;
    let oldUrl;
    return { run() {
      if (interval != null) return;
      oldUrl = new URL(location.href);
      interval = ctx.setInterval(() => {
        let newUrl = new URL(location.href);
        if (newUrl.href !== oldUrl.href) {
          window.dispatchEvent(new WxtLocationChangeEvent(newUrl, oldUrl));
          oldUrl = newUrl;
        }
      }, 1e3);
    } };
  }
  var ContentScriptContext = class ContentScriptContext2 {
    static SCRIPT_STARTED_MESSAGE_TYPE = getUniqueEventName("wxt:content-script-started");
    id;
    abortController;
    locationWatcher = createLocationWatcher(this);
    constructor(contentScriptName, options) {
      this.contentScriptName = contentScriptName;
      this.options = options;
      this.id = Math.random().toString(36).slice(2);
      this.abortController = new AbortController();
      this.stopOldScripts();
      this.listenForNewerScripts();
    }
    get signal() {
      return this.abortController.signal;
    }
    abort(reason) {
      return this.abortController.abort(reason);
    }
    get isInvalid() {
      if (browser.runtime?.id == null) this.notifyInvalidated();
      return this.signal.aborted;
    }
    get isValid() {
      return !this.isInvalid;
    }
    /**
    * Add a listener that is called when the content script's context is invalidated.
    *
    * @returns A function to remove the listener.
    *
    * @example
    * browser.runtime.onMessage.addListener(cb);
    * const removeInvalidatedListener = ctx.onInvalidated(() => {
    *   browser.runtime.onMessage.removeListener(cb);
    * })
    * // ...
    * removeInvalidatedListener();
    */
    onInvalidated(cb) {
      this.signal.addEventListener("abort", cb);
      return () => this.signal.removeEventListener("abort", cb);
    }
    /**
    * Return a promise that never resolves. Useful if you have an async function that shouldn't run
    * after the context is expired.
    *
    * @example
    * const getValueFromStorage = async () => {
    *   if (ctx.isInvalid) return ctx.block();
    *
    *   // ...
    * }
    */
    block() {
      return new Promise(() => {
      });
    }
    /**
    * Wrapper around `window.setInterval` that automatically clears the interval when invalidated.
    *
    * Intervals can be cleared by calling the normal `clearInterval` function.
    */
    setInterval(handler, timeout) {
      const id = setInterval(() => {
        if (this.isValid) handler();
      }, timeout);
      this.onInvalidated(() => clearInterval(id));
      return id;
    }
    /**
    * Wrapper around `window.setTimeout` that automatically clears the interval when invalidated.
    *
    * Timeouts can be cleared by calling the normal `setTimeout` function.
    */
    setTimeout(handler, timeout) {
      const id = setTimeout(() => {
        if (this.isValid) handler();
      }, timeout);
      this.onInvalidated(() => clearTimeout(id));
      return id;
    }
    /**
    * Wrapper around `window.requestAnimationFrame` that automatically cancels the request when
    * invalidated.
    *
    * Callbacks can be canceled by calling the normal `cancelAnimationFrame` function.
    */
    requestAnimationFrame(callback) {
      const id = requestAnimationFrame((...args) => {
        if (this.isValid) callback(...args);
      });
      this.onInvalidated(() => cancelAnimationFrame(id));
      return id;
    }
    /**
    * Wrapper around `window.requestIdleCallback` that automatically cancels the request when
    * invalidated.
    *
    * Callbacks can be canceled by calling the normal `cancelIdleCallback` function.
    */
    requestIdleCallback(callback, options) {
      const id = requestIdleCallback((...args) => {
        if (!this.signal.aborted) callback(...args);
      }, options);
      this.onInvalidated(() => cancelIdleCallback(id));
      return id;
    }
    addEventListener(target, type, handler, options) {
      if (type === "wxt:locationchange") {
        if (this.isValid) this.locationWatcher.run();
      }
      target.addEventListener?.(type.startsWith("wxt:") ? getUniqueEventName(type) : type, handler, {
        ...options,
        signal: this.signal
      });
    }
    /**
    * @internal
    * Abort the abort controller and execute all `onInvalidated` listeners.
    */
    notifyInvalidated() {
      this.abort("Content script context invalidated");
      logger$1.debug(`Content script "${this.contentScriptName}" context invalidated`);
    }
    stopOldScripts() {
      document.dispatchEvent(new CustomEvent(ContentScriptContext2.SCRIPT_STARTED_MESSAGE_TYPE, { detail: {
        contentScriptName: this.contentScriptName,
        messageId: this.id
      } }));
      window.postMessage({
        type: ContentScriptContext2.SCRIPT_STARTED_MESSAGE_TYPE,
        contentScriptName: this.contentScriptName,
        messageId: this.id
      }, "*");
    }
    verifyScriptStartedEvent(event) {
      const isSameContentScript = event.detail?.contentScriptName === this.contentScriptName;
      const isFromSelf = event.detail?.messageId === this.id;
      return isSameContentScript && !isFromSelf;
    }
    listenForNewerScripts() {
      const cb = (event) => {
        if (!(event instanceof CustomEvent) || !this.verifyScriptStartedEvent(event)) return;
        this.notifyInvalidated();
      };
      document.addEventListener(ContentScriptContext2.SCRIPT_STARTED_MESSAGE_TYPE, cb);
      this.onInvalidated(() => document.removeEventListener(ContentScriptContext2.SCRIPT_STARTED_MESSAGE_TYPE, cb));
    }
  };
  function initPlugins() {
  }
  function print(method, ...args) {
    if (typeof args[0] === "string") method(`[wxt] ${args.shift()}`, ...args);
    else method("[wxt]", ...args);
  }
  const logger = {
    debug: (...args) => print(console.debug, ...args),
    log: (...args) => print(console.log, ...args),
    warn: (...args) => print(console.warn, ...args),
    error: (...args) => print(console.error, ...args)
  };
  const result = (async () => {
    try {
      initPlugins();
      const { main, ...options } = definition;
      return await main(new ContentScriptContext("content", options));
    } catch (err) {
      logger.error(`The content script "${"content"}" crashed on startup!`, err);
      throw err;
    }
  })();
  return result;
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3d4dC9kaXN0L3V0aWxzL2RlZmluZS1jb250ZW50LXNjcmlwdC5tanMiLCIuLi8uLi8uLi9fX3ZpdGUtYnJvd3Nlci1leHRlcm5hbCIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvY29yZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMveDY0LWNvcmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2xpYi10eXBlZGFycmF5cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvZW5jLXV0ZjE2LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9lbmMtYmFzZTY0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9lbmMtYmFzZTY0dXJsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9tZDUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3NoYTEuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3NoYTI1Ni5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvc2hhMjI0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9zaGE1MTIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3NoYTM4NC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvc2hhMy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvcmlwZW1kMTYwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9obWFjLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9wYmtkZjIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2V2cGtkZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvY2lwaGVyLWNvcmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL21vZGUtY2ZiLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9tb2RlLWN0ci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvbW9kZS1jdHItZ2xhZG1hbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvbW9kZS1vZmIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL21vZGUtZWNiLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9wYWQtYW5zaXg5MjMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3BhZC1pc28xMDEyNi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvcGFkLWlzbzk3OTcxLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9wYWQtemVyb3BhZGRpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3BhZC1ub3BhZGRpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2Zvcm1hdC1oZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2Flcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvdHJpcGxlZGVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9yYzQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3JhYmJpdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvcmFiYml0LWxlZ2FjeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvYmxvd2Zpc2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2luZGV4LmpzIiwiLi4vLi4vLi4vc3JjL2xpYi92YXVsdC50cyIsIi4uLy4uLy4uL3NyYy9saWIvZG9tVXRpbHMudHMiLCIuLi8uLi8uLi9zcmMvZW50cnlwb2ludHMvY29udGVudC50cyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy93eHQvZGlzdC91dGlscy9pbnRlcm5hbC9sb2dnZXIubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0B3eHQtZGV2L2Jyb3dzZXIvc3JjL2luZGV4Lm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy93eHQvZGlzdC9icm93c2VyLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy93eHQvZGlzdC91dGlscy9pbnRlcm5hbC9jdXN0b20tZXZlbnRzLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy93eHQvZGlzdC91dGlscy9pbnRlcm5hbC9sb2NhdGlvbi13YXRjaGVyLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy93eHQvZGlzdC91dGlscy9jb250ZW50LXNjcmlwdC1jb250ZXh0Lm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyNyZWdpb24gc3JjL3V0aWxzL2RlZmluZS1jb250ZW50LXNjcmlwdC50c1xuZnVuY3Rpb24gZGVmaW5lQ29udGVudFNjcmlwdChkZWZpbml0aW9uKSB7XG5cdHJldHVybiBkZWZpbml0aW9uO1xufVxuXG4vLyNlbmRyZWdpb25cbmV4cG9ydCB7IGRlZmluZUNvbnRlbnRTY3JpcHQgfTsiLCIgIGV4cG9ydCBkZWZhdWx0IG5ldyBQcm94eSh7fSwge1xuICAgIGdldChfLCBrZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTW9kdWxlIFwiXCIgaGFzIGJlZW4gZXh0ZXJuYWxpemVkIGZvciBicm93c2VyIGNvbXBhdGliaWxpdHkuIENhbm5vdCBhY2Nlc3MgXCIuJHtrZXl9XCIgaW4gY2xpZW50IGNvZGUuICBTZWUgaHR0cHM6Ly92aXRlLmRldi9ndWlkZS90cm91Ymxlc2hvb3RpbmcuaHRtbCNtb2R1bGUtZXh0ZXJuYWxpemVkLWZvci1icm93c2VyLWNvbXBhdGliaWxpdHkgZm9yIG1vcmUgZGV0YWlscy5gKVxuICAgIH1cbiAgfSkiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeSgpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0cm9vdC5DcnlwdG9KUyA9IGZhY3RvcnkoKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cblx0LypnbG9iYWxzIHdpbmRvdywgZ2xvYmFsLCByZXF1aXJlKi9cblxuXHQvKipcblx0ICogQ3J5cHRvSlMgY29yZSBjb21wb25lbnRzLlxuXHQgKi9cblx0dmFyIENyeXB0b0pTID0gQ3J5cHRvSlMgfHwgKGZ1bmN0aW9uIChNYXRoLCB1bmRlZmluZWQpIHtcblxuXHQgICAgdmFyIGNyeXB0bztcblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBmcm9tIHdpbmRvdyAoQnJvd3Nlcilcblx0ICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gd2luZG93LmNyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBpbiB3ZWIgd29ya2VyIChCcm93c2VyKVxuXHQgICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLmNyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IHNlbGYuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGZyb20gd29ya2VyXG5cdCAgICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gZ2xvYmFsVGhpcy5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSAoZXhwZXJpbWVudGFsIElFIDExKSBjcnlwdG8gZnJvbSB3aW5kb3cgKEJyb3dzZXIpXG5cdCAgICBpZiAoIWNyeXB0byAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubXNDcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSB3aW5kb3cubXNDcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gZnJvbSBnbG9iYWwgKE5vZGVKUylcblx0ICAgIGlmICghY3J5cHRvICYmIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbC5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSBnbG9iYWwuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGltcG9ydCB2aWEgcmVxdWlyZSAoTm9kZUpTKVxuXHQgICAgaWYgKCFjcnlwdG8gJiYgdHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcblx0ICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG5cdCAgICB9XG5cblx0ICAgIC8qXG5cdCAgICAgKiBDcnlwdG9ncmFwaGljYWxseSBzZWN1cmUgcHNldWRvcmFuZG9tIG51bWJlciBnZW5lcmF0b3Jcblx0ICAgICAqXG5cdCAgICAgKiBBcyBNYXRoLnJhbmRvbSgpIGlzIGNyeXB0b2dyYXBoaWNhbGx5IG5vdCBzYWZlIHRvIHVzZVxuXHQgICAgICovXG5cdCAgICB2YXIgY3J5cHRvU2VjdXJlUmFuZG9tSW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmIChjcnlwdG8pIHtcblx0ICAgICAgICAgICAgLy8gVXNlIGdldFJhbmRvbVZhbHVlcyBtZXRob2QgKEJyb3dzZXIpXG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDMyQXJyYXkoMSkpWzBdO1xuXHQgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gVXNlIHJhbmRvbUJ5dGVzIG1ldGhvZCAoTm9kZUpTKVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGNyeXB0by5yYW5kb21CeXRlcyA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3J5cHRvLnJhbmRvbUJ5dGVzKDQpLnJlYWRJbnQzMkxFKCk7XG5cdCAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05hdGl2ZSBjcnlwdG8gbW9kdWxlIGNvdWxkIG5vdCBiZSB1c2VkIHRvIGdldCBzZWN1cmUgcmFuZG9tIG51bWJlci4nKTtcblx0ICAgIH07XG5cblx0ICAgIC8qXG5cdCAgICAgKiBMb2NhbCBwb2x5ZmlsbCBvZiBPYmplY3QuY3JlYXRlXG5cblx0ICAgICAqL1xuXHQgICAgdmFyIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUgfHwgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmdW5jdGlvbiBGKCkge31cblxuXHQgICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG5cdCAgICAgICAgICAgIHZhciBzdWJ0eXBlO1xuXG5cdCAgICAgICAgICAgIEYucHJvdG90eXBlID0gb2JqO1xuXG5cdCAgICAgICAgICAgIHN1YnR5cGUgPSBuZXcgRigpO1xuXG5cdCAgICAgICAgICAgIEYucHJvdG90eXBlID0gbnVsbDtcblxuXHQgICAgICAgICAgICByZXR1cm4gc3VidHlwZTtcblx0ICAgICAgICB9O1xuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBDcnlwdG9KUyBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGlicmFyeSBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2xpYiA9IEMubGliID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogQmFzZSBvYmplY3QgZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZSA9IChmdW5jdGlvbiAoKSB7XG5cblxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvdmVycmlkZXMgUHJvcGVydGllcyB0byBjb3B5IGludG8gdGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBNeVR5cGUgPSBDcnlwdG9KUy5saWIuQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnLFxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIG1ldGhvZDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgZXh0ZW5kOiBmdW5jdGlvbiAob3ZlcnJpZGVzKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTcGF3blxuXHQgICAgICAgICAgICAgICAgdmFyIHN1YnR5cGUgPSBjcmVhdGUodGhpcyk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEF1Z21lbnRcblx0ICAgICAgICAgICAgICAgIGlmIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLm1peEluKG92ZXJyaWRlcyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBkZWZhdWx0IGluaXRpYWxpemVyXG5cdCAgICAgICAgICAgICAgICBpZiAoIXN1YnR5cGUuaGFzT3duUHJvcGVydHkoJ2luaXQnKSB8fCB0aGlzLmluaXQgPT09IHN1YnR5cGUuaW5pdCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHQgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemVyJ3MgcHJvdG90eXBlIGlzIHRoZSBzdWJ0eXBlIG9iamVjdFxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0LnByb3RvdHlwZSA9IHN1YnR5cGU7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlZmVyZW5jZSBzdXBlcnR5cGVcblx0ICAgICAgICAgICAgICAgIHN1YnR5cGUuJHN1cGVyID0gdGhpcztcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnR5cGU7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEV4dGVuZHMgdGhpcyBvYmplY3QgYW5kIHJ1bnMgdGhlIGluaXQgbWV0aG9kLlxuXHQgICAgICAgICAgICAgKiBBcmd1bWVudHMgdG8gY3JlYXRlKCkgd2lsbCBiZSBwYXNzZWQgdG8gaW5pdCgpLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgaW5zdGFuY2UgPSBNeVR5cGUuY3JlYXRlKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMuZXh0ZW5kKCk7XG5cdCAgICAgICAgICAgICAgICBpbnN0YW5jZS5pbml0LmFwcGx5KGluc3RhbmNlLCBhcmd1bWVudHMpO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBvYmplY3QuXG5cdCAgICAgICAgICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIGFkZCBzb21lIGxvZ2ljIHdoZW4geW91ciBvYmplY3RzIGFyZSBjcmVhdGVkLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgICAgICAvLyAuLi5cblx0ICAgICAgICAgICAgICogICAgICAgICB9XG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ29waWVzIHByb3BlcnRpZXMgaW50byB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXMgVGhlIHByb3BlcnRpZXMgdG8gbWl4IGluLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgTXlUeXBlLm1peEluKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBmaWVsZDogJ3ZhbHVlJ1xuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBtaXhJbjogZnVuY3Rpb24gKHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3BlcnR5TmFtZSBpbiBwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJRSB3b24ndCBjb3B5IHRvU3RyaW5nIHVzaW5nIHRoZSBsb29wIGFib3ZlXG5cdCAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndG9TdHJpbmcnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9TdHJpbmcgPSBwcm9wZXJ0aWVzLnRvU3RyaW5nO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSBpbnN0YW5jZS5jbG9uZSgpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluaXQucHJvdG90eXBlLmV4dGVuZCh0aGlzKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH07XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge0FycmF5fSB3b3JkcyBUaGUgYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNpZ0J5dGVzIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICovXG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5ID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtBcnJheX0gd29yZHMgKE9wdGlvbmFsKSBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNpZ0J5dGVzIChPcHRpb25hbCkgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGUgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFsweDAwMDEwMjAzLCAweDA0MDUwNjA3XSwgNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdvcmRzLCBzaWdCeXRlcykge1xuXHQgICAgICAgICAgICB3b3JkcyA9IHRoaXMud29yZHMgPSB3b3JkcyB8fCBbXTtcblxuXHQgICAgICAgICAgICBpZiAoc2lnQnl0ZXMgIT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gd29yZHMubGVuZ3RoICogNDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIHdvcmQgYXJyYXkgdG8gYSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0VuY29kZXJ9IGVuY29kZXIgKE9wdGlvbmFsKSBUaGUgZW5jb2Rpbmcgc3RyYXRlZ3kgdG8gdXNlLiBEZWZhdWx0OiBDcnlwdG9KUy5lbmMuSGV4XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmdpZmllZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5ICsgJyc7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkudG9TdHJpbmcoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uIChlbmNvZGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAoZW5jb2RlciB8fCBIZXgpLnN0cmluZ2lmeSh0aGlzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uY2F0ZW5hdGVzIGEgd29yZCBhcnJheSB0byB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5IHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkxLmNvbmNhdCh3b3JkQXJyYXkyKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjb25jYXQ6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB0aGlzV29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhpc1NpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIHRoYXRTaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICB0aGlzLmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29uY2F0XG5cdCAgICAgICAgICAgIGlmICh0aGlzU2lnQnl0ZXMgJSA0KSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSBieXRlIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGF0U2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0Qnl0ZSA9ICh0aGF0V29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaSkgPj4+IDJdIHw9IHRoYXRCeXRlIDw8ICgyNCAtICgodGhpc1NpZ0J5dGVzICsgaSkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBvbmUgd29yZCBhdCBhIHRpbWVcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhhdFNpZ0J5dGVzOyBqICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzV29yZHNbKHRoaXNTaWdCeXRlcyArIGopID4+PiAyXSA9IHRoYXRXb3Jkc1tqID4+PiAyXTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzICs9IHRoYXRTaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDaGFpbmFibGVcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlbW92ZXMgaW5zaWduaWZpY2FudCBiaXRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbGFtcDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcFxuXHQgICAgICAgICAgICB3b3Jkc1tzaWdCeXRlcyA+Pj4gMl0gJj0gMHhmZmZmZmZmZiA8PCAoMzIgLSAoc2lnQnl0ZXMgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB3b3Jkcy5sZW5ndGggPSBNYXRoLmNlaWwoc2lnQnl0ZXMgLyA0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IHdvcmRBcnJheS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUud29yZHMgPSB0aGlzLndvcmRzLnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHdvcmQgYXJyYXkgZmlsbGVkIHdpdGggcmFuZG9tIGJ5dGVzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG5CeXRlcyBUaGUgbnVtYmVyIG9mIHJhbmRvbSBieXRlcyB0byBnZW5lcmF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHJhbmRvbSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5yYW5kb20oMTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJhbmRvbTogZnVuY3Rpb24gKG5CeXRlcykge1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5CeXRlczsgaSArPSA0KSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkcy5wdXNoKGNyeXB0b1NlY3VyZVJhbmRvbUludCgpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIG5CeXRlcyk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogRW5jb2RlciBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogSGV4IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgSGV4ID0gQ19lbmMuSGV4ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhleFN0cmluZyA9IENyeXB0b0pTLmVuYy5IZXguc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBoZXhDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgPj4+IDQpLnRvU3RyaW5nKDE2KSk7XG5cdCAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKChiaXRlICYgMHgwZikudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBoZXhDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBoZXggc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXhTdHIgVGhlIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkhleC5wYXJzZShoZXhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoaGV4U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBoZXhTdHJMZW5ndGggPSBoZXhTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGV4U3RyTGVuZ3RoOyBpICs9IDIpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDNdIHw9IHBhcnNlSW50KGhleFN0ci5zdWJzdHIoaSwgMiksIDE2KSA8PCAoMjQgLSAoaSAlIDgpICogNCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBoZXhTdHJMZW5ndGggLyAyKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExhdGluMSBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIExhdGluMSA9IENfZW5jLkxhdGluMSA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBsYXRpbjFTdHJpbmcgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xQ2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0ZSA9ICh3b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICBsYXRpbjFDaGFycy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYml0ZSkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGxhdGluMUNoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIExhdGluMSBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGxhdGluMVN0ciBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnBhcnNlKGxhdGluMVN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChsYXRpbjFTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGxhdGluMVN0ckxlbmd0aCA9IGxhdGluMVN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXRpbjFTdHJMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gMl0gfD0gKGxhdGluMVN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZikgPDwgKDI0IC0gKGkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbGF0aW4xU3RyTGVuZ3RoKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFVURi04IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgVXRmOCA9IENfZW5jLlV0ZjggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHV0ZjhTdHJpbmcgPSBDcnlwdG9KUy5lbmMuVXRmOC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKExhdGluMS5zdHJpbmdpZnkod29yZEFycmF5KSkpO1xuXHQgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBVVEYtOCBkYXRhJyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBVVEYtOCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHV0ZjhTdHIgVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh1dGY4U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHV0ZjhTdHIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIExhdGluMS5wYXJzZSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodXRmOFN0cikpKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGJ1ZmZlcmVkIGJsb2NrIGFsZ29yaXRobSB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBUaGUgcHJvcGVydHkgYmxvY2tTaXplIG11c3QgYmUgaW1wbGVtZW50ZWQgaW4gYSBjb25jcmV0ZSBzdWJ0eXBlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfbWluQnVmZmVyU2l6ZSBUaGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IHNob3VsZCBiZSBrZXB0IHVucHJvY2Vzc2VkIGluIHRoZSBidWZmZXIuIERlZmF1bHQ6IDBcblx0ICAgICAqL1xuXHQgICAgdmFyIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBDX2xpYi5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGRhdGEgYnVmZmVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBXb3JkQXJyYXkuaW5pdCgpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzID0gMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWRkcyBuZXcgZGF0YSB0byB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGJ1ZmZlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBhcHBlbmQuIFN0cmluZ3MgYXJlIGNvbnZlcnRlZCB0byBhIFdvcmRBcnJheSB1c2luZyBVVEYtOC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKCdkYXRhJyk7XG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX2FwcGVuZCh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9hcHBlbmQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgc3RyaW5nIHRvIFdvcmRBcnJheSwgZWxzZSBhc3N1bWUgV29yZEFycmF5IGFscmVhZHlcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICBkYXRhID0gVXRmOC5wYXJzZShkYXRhKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEFwcGVuZFxuXHQgICAgICAgICAgICB0aGlzLl9kYXRhLmNvbmNhdChkYXRhKTtcblx0ICAgICAgICAgICAgdGhpcy5fbkRhdGFCeXRlcyArPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBQcm9jZXNzZXMgYXZhaWxhYmxlIGRhdGEgYmxvY2tzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogVGhpcyBtZXRob2QgaW52b2tlcyBfZG9Qcm9jZXNzQmxvY2sob2Zmc2V0KSwgd2hpY2ggbXVzdCBiZSBpbXBsZW1lbnRlZCBieSBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRvRmx1c2ggV2hldGhlciBhbGwgYmxvY2tzIGFuZCBwYXJ0aWFsIGJsb2NrcyBzaG91bGQgYmUgcHJvY2Vzc2VkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcHJvY2Vzc2VkIGRhdGEuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcygpO1xuXHQgICAgICAgICAqICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX3Byb2Nlc3MoISEnZmx1c2gnKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfcHJvY2VzczogZnVuY3Rpb24gKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFdvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVNpZ0J5dGVzID0gZGF0YS5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZSA9IHRoaXMuYmxvY2tTaXplO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplQnl0ZXMgPSBibG9ja1NpemUgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIENvdW50IGJsb2NrcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbkJsb2Nrc1JlYWR5ID0gZGF0YVNpZ0J5dGVzIC8gYmxvY2tTaXplQnl0ZXM7XG5cdCAgICAgICAgICAgIGlmIChkb0ZsdXNoKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBSb3VuZCB1cCB0byBpbmNsdWRlIHBhcnRpYWwgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICBuQmxvY2tzUmVhZHkgPSBNYXRoLmNlaWwobkJsb2Nrc1JlYWR5KTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIGRvd24gdG8gaW5jbHVkZSBvbmx5IGZ1bGwgYmxvY2tzLFxuXHQgICAgICAgICAgICAgICAgLy8gbGVzcyB0aGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IG11c3QgcmVtYWluIGluIHRoZSBidWZmZXJcblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGgubWF4KChuQmxvY2tzUmVhZHkgfCAwKSAtIHRoaXMuX21pbkJ1ZmZlclNpemUsIDApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgd29yZHMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5Xb3Jkc1JlYWR5ID0gbkJsb2Nrc1JlYWR5ICogYmxvY2tTaXplO1xuXG5cdCAgICAgICAgICAgIC8vIENvdW50IGJ5dGVzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQnl0ZXNSZWFkeSA9IE1hdGgubWluKG5Xb3Jkc1JlYWR5ICogNCwgZGF0YVNpZ0J5dGVzKTtcblxuXHQgICAgICAgICAgICAvLyBQcm9jZXNzIGJsb2Nrc1xuXHQgICAgICAgICAgICBpZiAobldvcmRzUmVhZHkpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIG9mZnNldCA9IDA7IG9mZnNldCA8IG5Xb3Jkc1JlYWR5OyBvZmZzZXQgKz0gYmxvY2tTaXplKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1hbGdvcml0aG0gbG9naWNcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLl9kb1Byb2Nlc3NCbG9jayhkYXRhV29yZHMsIG9mZnNldCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBwcm9jZXNzZWQgd29yZHNcblx0ICAgICAgICAgICAgICAgIHByb2Nlc3NlZFdvcmRzID0gZGF0YVdvcmRzLnNwbGljZSgwLCBuV29yZHNSZWFkeSk7XG5cdCAgICAgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzIC09IG5CeXRlc1JlYWR5O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHByb2Nlc3NlZFdvcmRzLCBuQnl0ZXNSZWFkeSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9kYXRhID0gdGhpcy5fZGF0YS5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX21pbkJ1ZmZlclNpemU6IDBcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGhhc2hlciB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYmxvY2tTaXplIFRoZSBudW1iZXIgb2YgMzItYml0IHdvcmRzIHRoaXMgaGFzaGVyIG9wZXJhdGVzIG9uLiBEZWZhdWx0OiAxNiAoNTEyIGJpdHMpXG5cdCAgICAgKi9cblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXIgPSBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQmFzZS5leHRlbmQoKSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgaGFzaCBjb21wdXRhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2hlciA9IENyeXB0b0pTLmFsZ28uU0hBMjU2LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIHRoaXMuY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgaGFzaGVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBSZXNldCBkYXRhIGJ1ZmZlclxuXHQgICAgICAgICAgICBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0LmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdGhpcy5fZG9SZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVcGRhdGVzIHRoaXMgaGFzaGVyIHdpdGggYSBtZXNzYWdlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0hhc2hlcn0gVGhpcyBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci51cGRhdGUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblxuXHQgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGhhc2hcblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRmluYWxpemVzIHRoZSBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgKE9wdGlvbmFsKSBBIGZpbmFsIG1lc3NhZ2UgdXBkYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gRmluYWwgbWVzc2FnZSB1cGRhdGVcblx0ICAgICAgICAgICAgaWYgKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtaGFzaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5fZG9GaW5hbGl6ZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDUxMi8zMixcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBzaG9ydGN1dCBmdW5jdGlvbiB0byBhIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gY3JlYXRlIGEgaGVscGVyIGZvci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIZWxwZXIoQ3J5cHRvSlMuYWxnby5TSEEyNTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9jcmVhdGVIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBjZmcpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgaGFzaGVyLmluaXQoY2ZnKS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byB1c2UgaW4gdGhpcyBITUFDIGhlbHBlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBIbWFjU0hBMjU2ID0gQ3J5cHRvSlMubGliLkhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhtYWNIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBrZXkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ19hbGdvLkhNQUMuaW5pdChoYXNoZXIsIGtleSkuZmluYWxpemUobWVzc2FnZSk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWxnb3JpdGhtIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbyA9IHt9O1xuXG5cdCAgICByZXR1cm4gQztcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlM7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAodW5kZWZpbmVkKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZTtcblx0ICAgIHZhciBYMzJXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogeDY0IG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfeDY0ID0gQy54NjQgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBIDY0LWJpdCB3b3JkLlxuXHQgICAgICovXG5cdCAgICB2YXIgWDY0V29yZCA9IENfeDY0LldvcmQgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIDY0LWJpdCB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGhpZ2ggVGhlIGhpZ2ggMzIgYml0cy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbG93IFRoZSBsb3cgMzIgYml0cy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHg2NFdvcmQgPSBDcnlwdG9KUy54NjQuV29yZC5jcmVhdGUoMHgwMDAxMDIwMywgMHgwNDA1MDYwNyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGhpZ2gsIGxvdykge1xuXHQgICAgICAgICAgICB0aGlzLmhpZ2ggPSBoaWdoO1xuXHQgICAgICAgICAgICB0aGlzLmxvdyA9IGxvdztcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBCaXR3aXNlIE5PVHMgdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIG5lZ2F0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgbmVnYXRlZCA9IHg2NFdvcmQubm90KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gbm90OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBoaWdoID0gfnRoaXMuaGlnaDtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9IH50aGlzLmxvdztcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQml0d2lzZSBBTkRzIHRoaXMgd29yZCB3aXRoIHRoZSBwYXNzZWQgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7WDY0V29yZH0gd29yZCBUaGUgeDY0LVdvcmQgdG8gQU5EIHdpdGggdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIEFORGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGFuZGVkID0geDY0V29yZC5hbmQoYW5vdGhlclg2NFdvcmQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIGFuZDogZnVuY3Rpb24gKHdvcmQpIHtcblx0ICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB0aGlzLmhpZ2ggJiB3b3JkLmhpZ2g7XG5cdCAgICAgICAgICAgIC8vIHZhciBsb3cgPSB0aGlzLmxvdyAmIHdvcmQubG93O1xuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBCaXR3aXNlIE9ScyB0aGlzIHdvcmQgd2l0aCB0aGUgcGFzc2VkIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1g2NFdvcmR9IHdvcmQgVGhlIHg2NC1Xb3JkIHRvIE9SIHdpdGggdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIE9SaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgb3JlZCA9IHg2NFdvcmQub3IoYW5vdGhlclg2NFdvcmQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIG9yOiBmdW5jdGlvbiAod29yZCkge1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IHRoaXMuaGlnaCB8IHdvcmQuaGlnaDtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9IHRoaXMubG93IHwgd29yZC5sb3c7XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEJpdHdpc2UgWE9ScyB0aGlzIHdvcmQgd2l0aCB0aGUgcGFzc2VkIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1g2NFdvcmR9IHdvcmQgVGhlIHg2NC1Xb3JkIHRvIFhPUiB3aXRoIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBYT1JpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB4b3JlZCA9IHg2NFdvcmQueG9yKGFub3RoZXJYNjRXb3JkKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyB4b3I6IGZ1bmN0aW9uICh3b3JkKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5oaWdoIF4gd29yZC5oaWdoO1xuXHQgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5sb3cgXiB3b3JkLmxvdztcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogU2hpZnRzIHRoaXMgd29yZCBuIGJpdHMgdG8gdGhlIGxlZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gc2hpZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgc2hpZnRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzaGlmdGVkID0geDY0V29yZC5zaGlmdEwoMjUpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIHNoaWZ0TDogZnVuY3Rpb24gKG4pIHtcblx0ICAgICAgICAgICAgLy8gaWYgKG4gPCAzMikge1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSAodGhpcy5oaWdoIDw8IG4pIHwgKHRoaXMubG93ID4+PiAoMzIgLSBuKSk7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5sb3cgPDwgbjtcblx0ICAgICAgICAgICAgLy8gfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5sb3cgPDwgKG4gLSAzMik7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gMDtcblx0ICAgICAgICAgICAgLy8gfVxuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBTaGlmdHMgdGhpcyB3b3JkIG4gYml0cyB0byB0aGUgcmlnaHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gc2hpZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgc2hpZnRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzaGlmdGVkID0geDY0V29yZC5zaGlmdFIoNyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gc2hpZnRSOiBmdW5jdGlvbiAobikge1xuXHQgICAgICAgICAgICAvLyBpZiAobiA8IDMyKSB7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gKHRoaXMubG93ID4+PiBuKSB8ICh0aGlzLmhpZ2ggPDwgKDMyIC0gbikpO1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB0aGlzLmhpZ2ggPj4+IG47XG5cdCAgICAgICAgICAgIC8vIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5oaWdoID4+PiAobiAtIDMyKTtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBoaWdoID0gMDtcblx0ICAgICAgICAgICAgLy8gfVxuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSb3RhdGVzIHRoaXMgd29yZCBuIGJpdHMgdG8gdGhlIGxlZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gcm90YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIHJvdGF0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgcm90YXRlZCA9IHg2NFdvcmQucm90TCgyNSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gcm90TDogZnVuY3Rpb24gKG4pIHtcblx0ICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuc2hpZnRMKG4pLm9yKHRoaXMuc2hpZnRSKDY0IC0gbikpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSb3RhdGVzIHRoaXMgd29yZCBuIGJpdHMgdG8gdGhlIHJpZ2h0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHJvdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciByb3RhdGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHJvdGF0ZWQgPSB4NjRXb3JkLnJvdFIoNyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gcm90UjogZnVuY3Rpb24gKG4pIHtcblx0ICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuc2hpZnRSKG4pLm9yKHRoaXMuc2hpZnRMKDY0IC0gbikpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBBZGRzIHRoaXMgd29yZCB3aXRoIHRoZSBwYXNzZWQgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7WDY0V29yZH0gd29yZCBUaGUgeDY0LVdvcmQgdG8gYWRkIHdpdGggdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIGFkZGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGFkZGVkID0geDY0V29yZC5hZGQoYW5vdGhlclg2NFdvcmQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIGFkZDogZnVuY3Rpb24gKHdvcmQpIHtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9ICh0aGlzLmxvdyArIHdvcmQubG93KSB8IDA7XG5cdCAgICAgICAgICAgIC8vIHZhciBjYXJyeSA9IChsb3cgPj4+IDApIDwgKHRoaXMubG93ID4+PiAwKSA/IDEgOiAwO1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9ICh0aGlzLmhpZ2ggKyB3b3JkLmhpZ2ggKyBjYXJyeSkgfCAwO1xuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFuIGFycmF5IG9mIDY0LWJpdCB3b3Jkcy5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge0FycmF5fSB3b3JkcyBUaGUgYXJyYXkgb2YgQ3J5cHRvSlMueDY0LldvcmQgb2JqZWN0cy5cblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaWdCeXRlcyBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFg2NFdvcmRBcnJheSA9IENfeDY0LldvcmRBcnJheSA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHdvcmRzIChPcHRpb25hbCkgQW4gYXJyYXkgb2YgQ3J5cHRvSlMueDY0LldvcmQgb2JqZWN0cy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc2lnQnl0ZXMgKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoZSB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLng2NC5Xb3JkQXJyYXkuY3JlYXRlKCk7XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLng2NC5Xb3JkQXJyYXkuY3JlYXRlKFtcblx0ICAgICAgICAgKiAgICAgICAgIENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDAwMDEwMjAzLCAweDA0MDUwNjA3KSxcblx0ICAgICAgICAgKiAgICAgICAgIENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDE4MTkxYTFiLCAweDFjMWQxZTFmKVxuXHQgICAgICAgICAqICAgICBdKTtcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMueDY0LldvcmRBcnJheS5jcmVhdGUoW1xuXHQgICAgICAgICAqICAgICAgICAgQ3J5cHRvSlMueDY0LldvcmQuY3JlYXRlKDB4MDAwMTAyMDMsIDB4MDQwNTA2MDcpLFxuXHQgICAgICAgICAqICAgICAgICAgQ3J5cHRvSlMueDY0LldvcmQuY3JlYXRlKDB4MTgxOTFhMWIsIDB4MWMxZDFlMWYpXG5cdCAgICAgICAgICogICAgIF0sIDEwKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAod29yZHMsIHNpZ0J5dGVzKSB7XG5cdCAgICAgICAgICAgIHdvcmRzID0gdGhpcy53b3JkcyA9IHdvcmRzIHx8IFtdO1xuXG5cdCAgICAgICAgICAgIGlmIChzaWdCeXRlcyAhPSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSBzaWdCeXRlcztcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSB3b3Jkcy5sZW5ndGggKiA4O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHRoaXMgNjQtYml0IHdvcmQgYXJyYXkgdG8gYSAzMi1iaXQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0NyeXB0b0pTLmxpYi5Xb3JkQXJyYXl9IFRoaXMgd29yZCBhcnJheSdzIGRhdGEgYXMgYSAzMi1iaXQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHgzMldvcmRBcnJheSA9IHg2NFdvcmRBcnJheS50b1gzMigpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHRvWDMyOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgeDY0V29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgeDY0V29yZHNMZW5ndGggPSB4NjRXb3Jkcy5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgeDMyV29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4NjRXb3Jkc0xlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgeDY0V29yZCA9IHg2NFdvcmRzW2ldO1xuXHQgICAgICAgICAgICAgICAgeDMyV29yZHMucHVzaCh4NjRXb3JkLmhpZ2gpO1xuXHQgICAgICAgICAgICAgICAgeDMyV29yZHMucHVzaCh4NjRXb3JkLmxvdyk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gWDMyV29yZEFycmF5LmNyZWF0ZSh4MzJXb3JkcywgdGhpcy5zaWdCeXRlcyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmRBcnJheX0gVGhlIGNsb25lLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSB4NjRXb3JkQXJyYXkuY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gQ2xvbmUgXCJ3b3Jkc1wiIGFycmF5XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IGNsb25lLndvcmRzID0gdGhpcy53b3Jkcy5zbGljZSgwKTtcblxuXHQgICAgICAgICAgICAvLyBDbG9uZSBlYWNoIFg2NFdvcmQgb2JqZWN0XG5cdCAgICAgICAgICAgIHZhciB3b3Jkc0xlbmd0aCA9IHdvcmRzLmxlbmd0aDtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkc0xlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpXSA9IHdvcmRzW2ldLmNsb25lKCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlM7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBDaGVjayBpZiB0eXBlZCBhcnJheXMgYXJlIHN1cHBvcnRlZFxuXHQgICAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgcmV0dXJuO1xuXHQgICAgfVxuXG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cblx0ICAgIC8vIFJlZmVyZW5jZSBvcmlnaW5hbCBpbml0XG5cdCAgICB2YXIgc3VwZXJJbml0ID0gV29yZEFycmF5LmluaXQ7XG5cblx0ICAgIC8vIEF1Z21lbnQgV29yZEFycmF5LmluaXQgdG8gaGFuZGxlIHR5cGVkIGFycmF5c1xuXHQgICAgdmFyIHN1YkluaXQgPSBXb3JkQXJyYXkuaW5pdCA9IGZ1bmN0aW9uICh0eXBlZEFycmF5KSB7XG5cdCAgICAgICAgLy8gQ29udmVydCBidWZmZXJzIHRvIHVpbnQ4XG5cdCAgICAgICAgaWYgKHR5cGVkQXJyYXkgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuXHQgICAgICAgICAgICB0eXBlZEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodHlwZWRBcnJheSk7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gQ29udmVydCBvdGhlciBhcnJheSB2aWV3cyB0byB1aW50OFxuXHQgICAgICAgIGlmIChcblx0ICAgICAgICAgICAgdHlwZWRBcnJheSBpbnN0YW5jZW9mIEludDhBcnJheSB8fFxuXHQgICAgICAgICAgICAodHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVkQXJyYXkgaW5zdGFuY2VvZiBVaW50OENsYW1wZWRBcnJheSkgfHxcblx0ICAgICAgICAgICAgdHlwZWRBcnJheSBpbnN0YW5jZW9mIEludDE2QXJyYXkgfHxcblx0ICAgICAgICAgICAgdHlwZWRBcnJheSBpbnN0YW5jZW9mIFVpbnQxNkFycmF5IHx8XG5cdCAgICAgICAgICAgIHR5cGVkQXJyYXkgaW5zdGFuY2VvZiBJbnQzMkFycmF5IHx8XG5cdCAgICAgICAgICAgIHR5cGVkQXJyYXkgaW5zdGFuY2VvZiBVaW50MzJBcnJheSB8fFxuXHQgICAgICAgICAgICB0eXBlZEFycmF5IGluc3RhbmNlb2YgRmxvYXQzMkFycmF5IHx8XG5cdCAgICAgICAgICAgIHR5cGVkQXJyYXkgaW5zdGFuY2VvZiBGbG9hdDY0QXJyYXlcblx0ICAgICAgICApIHtcblx0ICAgICAgICAgICAgdHlwZWRBcnJheSA9IG5ldyBVaW50OEFycmF5KHR5cGVkQXJyYXkuYnVmZmVyLCB0eXBlZEFycmF5LmJ5dGVPZmZzZXQsIHR5cGVkQXJyYXkuYnl0ZUxlbmd0aCk7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gSGFuZGxlIFVpbnQ4QXJyYXlcblx0ICAgICAgICBpZiAodHlwZWRBcnJheSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIHR5cGVkQXJyYXlCeXRlTGVuZ3RoID0gdHlwZWRBcnJheS5ieXRlTGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIEV4dHJhY3QgYnl0ZXNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZWRBcnJheUJ5dGVMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gMl0gfD0gdHlwZWRBcnJheVtpXSA8PCAoMjQgLSAoaSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJbml0aWFsaXplIHRoaXMgd29yZCBhcnJheVxuXHQgICAgICAgICAgICBzdXBlckluaXQuY2FsbCh0aGlzLCB3b3JkcywgdHlwZWRBcnJheUJ5dGVMZW5ndGgpO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIC8vIEVsc2UgY2FsbCBub3JtYWwgaW5pdFxuXHQgICAgICAgICAgICBzdXBlckluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICBzdWJJbml0LnByb3RvdHlwZSA9IFdvcmRBcnJheTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5saWIuV29yZEFycmF5O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmM7XG5cblx0ICAgIC8qKlxuXHQgICAgICogVVRGLTE2IEJFIGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgVXRmMTZCRSA9IENfZW5jLlV0ZjE2ID0gQ19lbmMuVXRmMTZCRSA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBVVEYtMTYgQkUgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIFVURi0xNiBCRSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB1dGYxNlN0cmluZyA9IENyeXB0b0pTLmVuYy5VdGYxNi5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHV0ZjE2Q2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSArPSAyKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgY29kZVBvaW50ID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMTYgLSAoaSAlIDQpICogOCkpICYgMHhmZmZmO1xuXHQgICAgICAgICAgICAgICAgdXRmMTZDaGFycy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZVBvaW50KSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gdXRmMTZDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBVVEYtMTYgQkUgc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1dGYxNlN0ciBUaGUgVVRGLTE2IEJFIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuVXRmMTYucGFyc2UodXRmMTZTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAodXRmMTZTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIHV0ZjE2U3RyTGVuZ3RoID0gdXRmMTZTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXRmMTZTdHJMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gMV0gfD0gdXRmMTZTdHIuY2hhckNvZGVBdChpKSA8PCAoMTYgLSAoaSAlIDIpICogMTYpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIFdvcmRBcnJheS5jcmVhdGUod29yZHMsIHV0ZjE2U3RyTGVuZ3RoICogMik7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBVVEYtMTYgTEUgZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIENfZW5jLlV0ZjE2TEUgPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgVVRGLTE2IExFIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBVVEYtMTYgTEUgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgdXRmMTZTdHIgPSBDcnlwdG9KUy5lbmMuVXRmMTZMRS5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHV0ZjE2Q2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSArPSAyKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgY29kZVBvaW50ID0gc3dhcEVuZGlhbigod29yZHNbaSA+Pj4gMl0gPj4+ICgxNiAtIChpICUgNCkgKiA4KSkgJiAweGZmZmYpO1xuXHQgICAgICAgICAgICAgICAgdXRmMTZDaGFycy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZVBvaW50KSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gdXRmMTZDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBVVEYtMTYgTEUgc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1dGYxNlN0ciBUaGUgVVRGLTE2IExFIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuVXRmMTZMRS5wYXJzZSh1dGYxNlN0cik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uICh1dGYxNlN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgdXRmMTZTdHJMZW5ndGggPSB1dGYxNlN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1dGYxNlN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAxXSB8PSBzd2FwRW5kaWFuKHV0ZjE2U3RyLmNoYXJDb2RlQXQoaSkgPDwgKDE2IC0gKGkgJSAyKSAqIDE2KSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gV29yZEFycmF5LmNyZWF0ZSh3b3JkcywgdXRmMTZTdHJMZW5ndGggKiAyKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICBmdW5jdGlvbiBzd2FwRW5kaWFuKHdvcmQpIHtcblx0ICAgICAgICByZXR1cm4gKCh3b3JkIDw8IDgpICYgMHhmZjAwZmYwMCkgfCAoKHdvcmQgPj4+IDgpICYgMHgwMGZmMDBmZik7XG5cdCAgICB9XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuZW5jLlV0ZjE2O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmM7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQmFzZTY0IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgQmFzZTY0ID0gQ19lbmMuQmFzZTY0ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIEJhc2U2NCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgQmFzZTY0IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGJhc2U2NFN0cmluZyA9IENyeXB0b0pTLmVuYy5CYXNlNjQuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBiYXNlNjRDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpICs9IDMpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBieXRlMSA9ICh3b3Jkc1tpID4+PiAyXSAgICAgICA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAgICAgICAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICB2YXIgYnl0ZTIgPSAod29yZHNbKGkgKyAxKSA+Pj4gMl0gPj4+ICgyNCAtICgoaSArIDEpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgdmFyIGJ5dGUzID0gKHdvcmRzWyhpICsgMikgPj4+IDJdID4+PiAoMjQgLSAoKGkgKyAyKSAlIDQpICogOCkpICYgMHhmZjtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHRyaXBsZXQgPSAoYnl0ZTEgPDwgMTYpIHwgKGJ5dGUyIDw8IDgpIHwgYnl0ZTM7XG5cblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyAoaiA8IDQpICYmIChpICsgaiAqIDAuNzUgPCBzaWdCeXRlcyk7IGorKykge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NENoYXJzLnB1c2gobWFwLmNoYXJBdCgodHJpcGxldCA+Pj4gKDYgKiAoMyAtIGopKSkgJiAweDNmKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICB2YXIgcGFkZGluZ0NoYXIgPSBtYXAuY2hhckF0KDY0KTtcblx0ICAgICAgICAgICAgaWYgKHBhZGRpbmdDaGFyKSB7XG5cdCAgICAgICAgICAgICAgICB3aGlsZSAoYmFzZTY0Q2hhcnMubGVuZ3RoICUgNCkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NENoYXJzLnB1c2gocGFkZGluZ0NoYXIpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGJhc2U2NENoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIEJhc2U2NCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGJhc2U2NFN0ciBUaGUgQmFzZTY0IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuQmFzZTY0LnBhcnNlKGJhc2U2NFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChiYXNlNjRTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBiYXNlNjRTdHJMZW5ndGggPSBiYXNlNjRTdHIubGVuZ3RoO1xuXHQgICAgICAgICAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuXHQgICAgICAgICAgICB2YXIgcmV2ZXJzZU1hcCA9IHRoaXMuX3JldmVyc2VNYXA7XG5cblx0ICAgICAgICAgICAgaWYgKCFyZXZlcnNlTWFwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZU1hcCA9IHRoaXMuX3JldmVyc2VNYXAgPSBbXTtcblx0ICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1hcC5sZW5ndGg7IGorKykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXZlcnNlTWFwW21hcC5jaGFyQ29kZUF0KGopXSA9IGo7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSWdub3JlIHBhZGRpbmdcblx0ICAgICAgICAgICAgdmFyIHBhZGRpbmdDaGFyID0gbWFwLmNoYXJBdCg2NCk7XG5cdCAgICAgICAgICAgIGlmIChwYWRkaW5nQ2hhcikge1xuXHQgICAgICAgICAgICAgICAgdmFyIHBhZGRpbmdJbmRleCA9IGJhc2U2NFN0ci5pbmRleE9mKHBhZGRpbmdDaGFyKTtcblx0ICAgICAgICAgICAgICAgIGlmIChwYWRkaW5nSW5kZXggIT09IC0xKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYmFzZTY0U3RyTGVuZ3RoID0gcGFkZGluZ0luZGV4O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICByZXR1cm4gcGFyc2VMb29wKGJhc2U2NFN0ciwgYmFzZTY0U3RyTGVuZ3RoLCByZXZlcnNlTWFwKTtcblxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfbWFwOiAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nXG5cdCAgICB9O1xuXG5cdCAgICBmdW5jdGlvbiBwYXJzZUxvb3AoYmFzZTY0U3RyLCBiYXNlNjRTdHJMZW5ndGgsIHJldmVyc2VNYXApIHtcblx0ICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgIHZhciBuQnl0ZXMgPSAwO1xuXHQgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2U2NFN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICBpZiAoaSAlIDQpIHtcblx0ICAgICAgICAgICAgICB2YXIgYml0czEgPSByZXZlcnNlTWFwW2Jhc2U2NFN0ci5jaGFyQ29kZUF0KGkgLSAxKV0gPDwgKChpICUgNCkgKiAyKTtcblx0ICAgICAgICAgICAgICB2YXIgYml0czIgPSByZXZlcnNlTWFwW2Jhc2U2NFN0ci5jaGFyQ29kZUF0KGkpXSA+Pj4gKDYgLSAoaSAlIDQpICogMik7XG5cdCAgICAgICAgICAgICAgdmFyIGJpdHNDb21iaW5lZCA9IGJpdHMxIHwgYml0czI7XG5cdCAgICAgICAgICAgICAgd29yZHNbbkJ5dGVzID4+PiAyXSB8PSBiaXRzQ29tYmluZWQgPDwgKDI0IC0gKG5CeXRlcyAlIDQpICogOCk7XG5cdCAgICAgICAgICAgICAgbkJ5dGVzKys7XG5cdCAgICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIFdvcmRBcnJheS5jcmVhdGUod29yZHMsIG5CeXRlcyk7XG5cdCAgICB9XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuZW5jLkJhc2U2NDtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEJhc2U2NHVybCBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEJhc2U2NHVybCA9IENfZW5jLkJhc2U2NHVybCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBCYXNlNjR1cmwgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdXJsU2FmZSBXaGV0aGVyIHRvIHVzZSB1cmwgc2FmZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgQmFzZTY0dXJsIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGJhc2U2NFN0cmluZyA9IENyeXB0b0pTLmVuYy5CYXNlNjR1cmwuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5LCB1cmxTYWZlKSB7XG5cdCAgICAgICAgICAgIGlmICh1cmxTYWZlID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHVybFNhZmUgPSB0cnVlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgbWFwID0gdXJsU2FmZSA/IHRoaXMuX3NhZmVfbWFwIDogdGhpcy5fbWFwO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wIGV4Y2VzcyBiaXRzXG5cdCAgICAgICAgICAgIHdvcmRBcnJheS5jbGFtcCgpO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIGJhc2U2NENoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkgKz0gMykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJ5dGUxID0gKHdvcmRzW2kgPj4+IDJdICAgICAgID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICAgICAgICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIHZhciBieXRlMiA9ICh3b3Jkc1soaSArIDEpID4+PiAyXSA+Pj4gKDI0IC0gKChpICsgMSkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICB2YXIgYnl0ZTMgPSAod29yZHNbKGkgKyAyKSA+Pj4gMl0gPj4+ICgyNCAtICgoaSArIDIpICUgNCkgKiA4KSkgJiAweGZmO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgdHJpcGxldCA9IChieXRlMSA8PCAxNikgfCAoYnl0ZTIgPDwgOCkgfCBieXRlMztcblxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IChqIDwgNCkgJiYgKGkgKyBqICogMC43NSA8IHNpZ0J5dGVzKTsgaisrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYmFzZTY0Q2hhcnMucHVzaChtYXAuY2hhckF0KCh0cmlwbGV0ID4+PiAoNiAqICgzIC0gaikpKSAmIDB4M2YpKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIHZhciBwYWRkaW5nQ2hhciA9IG1hcC5jaGFyQXQoNjQpO1xuXHQgICAgICAgICAgICBpZiAocGFkZGluZ0NoYXIpIHtcblx0ICAgICAgICAgICAgICAgIHdoaWxlIChiYXNlNjRDaGFycy5sZW5ndGggJSA0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYmFzZTY0Q2hhcnMucHVzaChwYWRkaW5nQ2hhcik7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gYmFzZTY0Q2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgQmFzZTY0dXJsIHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZTY0U3RyIFRoZSBCYXNlNjR1cmwgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtib29sZWFufSB1cmxTYWZlIFdoZXRoZXIgdG8gdXNlIHVybCBzYWZlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkJhc2U2NHVybC5wYXJzZShiYXNlNjRTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoYmFzZTY0U3RyLCB1cmxTYWZlKSB7XG5cdCAgICAgICAgICAgIGlmICh1cmxTYWZlID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHVybFNhZmUgPSB0cnVlXG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGJhc2U2NFN0ckxlbmd0aCA9IGJhc2U2NFN0ci5sZW5ndGg7XG5cdCAgICAgICAgICAgIHZhciBtYXAgPSB1cmxTYWZlID8gdGhpcy5fc2FmZV9tYXAgOiB0aGlzLl9tYXA7XG5cdCAgICAgICAgICAgIHZhciByZXZlcnNlTWFwID0gdGhpcy5fcmV2ZXJzZU1hcDtcblxuXHQgICAgICAgICAgICBpZiAoIXJldmVyc2VNYXApIHtcblx0ICAgICAgICAgICAgICAgIHJldmVyc2VNYXAgPSB0aGlzLl9yZXZlcnNlTWFwID0gW107XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1hcC5sZW5ndGg7IGorKykge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldmVyc2VNYXBbbWFwLmNoYXJDb2RlQXQoaildID0gajtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIElnbm9yZSBwYWRkaW5nXG5cdCAgICAgICAgICAgIHZhciBwYWRkaW5nQ2hhciA9IG1hcC5jaGFyQXQoNjQpO1xuXHQgICAgICAgICAgICBpZiAocGFkZGluZ0NoYXIpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBwYWRkaW5nSW5kZXggPSBiYXNlNjRTdHIuaW5kZXhPZihwYWRkaW5nQ2hhcik7XG5cdCAgICAgICAgICAgICAgICBpZiAocGFkZGluZ0luZGV4ICE9PSAtMSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NFN0ckxlbmd0aCA9IHBhZGRpbmdJbmRleDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgcmV0dXJuIHBhcnNlTG9vcChiYXNlNjRTdHIsIGJhc2U2NFN0ckxlbmd0aCwgcmV2ZXJzZU1hcCk7XG5cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX21hcDogJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89Jyxcblx0ICAgICAgICBfc2FmZV9tYXA6ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fJyxcblx0ICAgIH07XG5cblx0ICAgIGZ1bmN0aW9uIHBhcnNlTG9vcChiYXNlNjRTdHIsIGJhc2U2NFN0ckxlbmd0aCwgcmV2ZXJzZU1hcCkge1xuXHQgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgIHZhciBuQnl0ZXMgPSAwO1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmFzZTY0U3RyTGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgaWYgKGkgJSA0KSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0czEgPSByZXZlcnNlTWFwW2Jhc2U2NFN0ci5jaGFyQ29kZUF0KGkgLSAxKV0gPDwgKChpICUgNCkgKiAyKTtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRzMiA9IHJldmVyc2VNYXBbYmFzZTY0U3RyLmNoYXJDb2RlQXQoaSldID4+PiAoNiAtIChpICUgNCkgKiAyKTtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRzQ29tYmluZWQgPSBiaXRzMSB8IGJpdHMyO1xuXHQgICAgICAgICAgICAgICAgd29yZHNbbkJ5dGVzID4+PiAyXSB8PSBiaXRzQ29tYmluZWQgPDwgKDI0IC0gKG5CeXRlcyAlIDQpICogOCk7XG5cdCAgICAgICAgICAgICAgICBuQnl0ZXMrKztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gV29yZEFycmF5LmNyZWF0ZSh3b3JkcywgbkJ5dGVzKTtcblx0ICAgIH1cblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5lbmMuQmFzZTY0dXJsO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKE1hdGgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBDb25zdGFudHMgdGFibGVcblx0ICAgIHZhciBUID0gW107XG5cblx0ICAgIC8vIENvbXB1dGUgY29uc3RhbnRzXG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuXHQgICAgICAgICAgICBUW2ldID0gKE1hdGguYWJzKE1hdGguc2luKGkgKyAxKSkgKiAweDEwMDAwMDAwMCkgfCAwO1xuXHQgICAgICAgIH1cblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogTUQ1IGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgTUQ1ID0gQ19hbGdvLk1ENSA9IEhhc2hlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgV29yZEFycmF5LmluaXQoW1xuXHQgICAgICAgICAgICAgICAgMHg2NzQ1MjMwMSwgMHhlZmNkYWI4OSxcblx0ICAgICAgICAgICAgICAgIDB4OThiYWRjZmUsIDB4MTAzMjU0NzZcblx0ICAgICAgICAgICAgXSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIG9mZnNldF9pID0gb2Zmc2V0ICsgaTtcblx0ICAgICAgICAgICAgICAgIHZhciBNX29mZnNldF9pID0gTVtvZmZzZXRfaV07XG5cblx0ICAgICAgICAgICAgICAgIE1bb2Zmc2V0X2ldID0gKFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE1fb2Zmc2V0X2kgPDwgOCkgIHwgKE1fb2Zmc2V0X2kgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgKCgoTV9vZmZzZXRfaSA8PCAyNCkgfCAoTV9vZmZzZXRfaSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICAgICApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBIID0gdGhpcy5faGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMCAgPSBNW29mZnNldCArIDBdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMSAgPSBNW29mZnNldCArIDFdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMiAgPSBNW29mZnNldCArIDJdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMyAgPSBNW29mZnNldCArIDNdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfNCAgPSBNW29mZnNldCArIDRdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfNSAgPSBNW29mZnNldCArIDVdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfNiAgPSBNW29mZnNldCArIDZdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfNyAgPSBNW29mZnNldCArIDddO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfOCAgPSBNW29mZnNldCArIDhdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfOSAgPSBNW29mZnNldCArIDldO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTAgPSBNW29mZnNldCArIDEwXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzExID0gTVtvZmZzZXQgKyAxMV07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xMiA9IE1bb2Zmc2V0ICsgMTJdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTMgPSBNW29mZnNldCArIDEzXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzE0ID0gTVtvZmZzZXQgKyAxNF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xNSA9IE1bb2Zmc2V0ICsgMTVdO1xuXG5cdCAgICAgICAgICAgIC8vIFdvcmtpbmcgdmFyaWFibGVzXG5cdCAgICAgICAgICAgIHZhciBhID0gSFswXTtcblx0ICAgICAgICAgICAgdmFyIGIgPSBIWzFdO1xuXHQgICAgICAgICAgICB2YXIgYyA9IEhbMl07XG5cdCAgICAgICAgICAgIHZhciBkID0gSFszXTtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRhdGlvblxuXHQgICAgICAgICAgICBhID0gRkYoYSwgYiwgYywgZCwgTV9vZmZzZXRfMCwgIDcsICBUWzBdKTtcblx0ICAgICAgICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzEsICAxMiwgVFsxXSk7XG5cdCAgICAgICAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBNX29mZnNldF8yLCAgMTcsIFRbMl0pO1xuXHQgICAgICAgICAgICBiID0gRkYoYiwgYywgZCwgYSwgTV9vZmZzZXRfMywgIDIyLCBUWzNdKTtcblx0ICAgICAgICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzQsICA3LCAgVFs0XSk7XG5cdCAgICAgICAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBNX29mZnNldF81LCAgMTIsIFRbNV0pO1xuXHQgICAgICAgICAgICBjID0gRkYoYywgZCwgYSwgYiwgTV9vZmZzZXRfNiwgIDE3LCBUWzZdKTtcblx0ICAgICAgICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzcsICAyMiwgVFs3XSk7XG5cdCAgICAgICAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBNX29mZnNldF84LCAgNywgIFRbOF0pO1xuXHQgICAgICAgICAgICBkID0gRkYoZCwgYSwgYiwgYywgTV9vZmZzZXRfOSwgIDEyLCBUWzldKTtcblx0ICAgICAgICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzEwLCAxNywgVFsxMF0pO1xuXHQgICAgICAgICAgICBiID0gRkYoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTEsIDIyLCBUWzExXSk7XG5cdCAgICAgICAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBNX29mZnNldF8xMiwgNywgIFRbMTJdKTtcblx0ICAgICAgICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzEzLCAxMiwgVFsxM10pO1xuXHQgICAgICAgICAgICBjID0gRkYoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTQsIDE3LCBUWzE0XSk7XG5cdCAgICAgICAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBNX29mZnNldF8xNSwgMjIsIFRbMTVdKTtcblxuXHQgICAgICAgICAgICBhID0gR0coYSwgYiwgYywgZCwgTV9vZmZzZXRfMSwgIDUsICBUWzE2XSk7XG5cdCAgICAgICAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBNX29mZnNldF82LCAgOSwgIFRbMTddKTtcblx0ICAgICAgICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzExLCAxNCwgVFsxOF0pO1xuXHQgICAgICAgICAgICBiID0gR0coYiwgYywgZCwgYSwgTV9vZmZzZXRfMCwgIDIwLCBUWzE5XSk7XG5cdCAgICAgICAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBNX29mZnNldF81LCAgNSwgIFRbMjBdKTtcblx0ICAgICAgICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzEwLCA5LCAgVFsyMV0pO1xuXHQgICAgICAgICAgICBjID0gR0coYywgZCwgYSwgYiwgTV9vZmZzZXRfMTUsIDE0LCBUWzIyXSk7XG5cdCAgICAgICAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBNX29mZnNldF80LCAgMjAsIFRbMjNdKTtcblx0ICAgICAgICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzksICA1LCAgVFsyNF0pO1xuXHQgICAgICAgICAgICBkID0gR0coZCwgYSwgYiwgYywgTV9vZmZzZXRfMTQsIDksICBUWzI1XSk7XG5cdCAgICAgICAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBNX29mZnNldF8zLCAgMTQsIFRbMjZdKTtcblx0ICAgICAgICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzgsICAyMCwgVFsyN10pO1xuXHQgICAgICAgICAgICBhID0gR0coYSwgYiwgYywgZCwgTV9vZmZzZXRfMTMsIDUsICBUWzI4XSk7XG5cdCAgICAgICAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBNX29mZnNldF8yLCAgOSwgIFRbMjldKTtcblx0ICAgICAgICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzcsICAxNCwgVFszMF0pO1xuXHQgICAgICAgICAgICBiID0gR0coYiwgYywgZCwgYSwgTV9vZmZzZXRfMTIsIDIwLCBUWzMxXSk7XG5cblx0ICAgICAgICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzUsICA0LCAgVFszMl0pO1xuXHQgICAgICAgICAgICBkID0gSEgoZCwgYSwgYiwgYywgTV9vZmZzZXRfOCwgIDExLCBUWzMzXSk7XG5cdCAgICAgICAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBNX29mZnNldF8xMSwgMTYsIFRbMzRdKTtcblx0ICAgICAgICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzE0LCAyMywgVFszNV0pO1xuXHQgICAgICAgICAgICBhID0gSEgoYSwgYiwgYywgZCwgTV9vZmZzZXRfMSwgIDQsICBUWzM2XSk7XG5cdCAgICAgICAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBNX29mZnNldF80LCAgMTEsIFRbMzddKTtcblx0ICAgICAgICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzcsICAxNiwgVFszOF0pO1xuXHQgICAgICAgICAgICBiID0gSEgoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTAsIDIzLCBUWzM5XSk7XG5cdCAgICAgICAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBNX29mZnNldF8xMywgNCwgIFRbNDBdKTtcblx0ICAgICAgICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzAsICAxMSwgVFs0MV0pO1xuXHQgICAgICAgICAgICBjID0gSEgoYywgZCwgYSwgYiwgTV9vZmZzZXRfMywgIDE2LCBUWzQyXSk7XG5cdCAgICAgICAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBNX29mZnNldF82LCAgMjMsIFRbNDNdKTtcblx0ICAgICAgICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzksICA0LCAgVFs0NF0pO1xuXHQgICAgICAgICAgICBkID0gSEgoZCwgYSwgYiwgYywgTV9vZmZzZXRfMTIsIDExLCBUWzQ1XSk7XG5cdCAgICAgICAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBNX29mZnNldF8xNSwgMTYsIFRbNDZdKTtcblx0ICAgICAgICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzIsICAyMywgVFs0N10pO1xuXG5cdCAgICAgICAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBNX29mZnNldF8wLCAgNiwgIFRbNDhdKTtcblx0ICAgICAgICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzcsICAxMCwgVFs0OV0pO1xuXHQgICAgICAgICAgICBjID0gSUkoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTQsIDE1LCBUWzUwXSk7XG5cdCAgICAgICAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBNX29mZnNldF81LCAgMjEsIFRbNTFdKTtcblx0ICAgICAgICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEyLCA2LCAgVFs1Ml0pO1xuXHQgICAgICAgICAgICBkID0gSUkoZCwgYSwgYiwgYywgTV9vZmZzZXRfMywgIDEwLCBUWzUzXSk7XG5cdCAgICAgICAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBNX29mZnNldF8xMCwgMTUsIFRbNTRdKTtcblx0ICAgICAgICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzEsICAyMSwgVFs1NV0pO1xuXHQgICAgICAgICAgICBhID0gSUkoYSwgYiwgYywgZCwgTV9vZmZzZXRfOCwgIDYsICBUWzU2XSk7XG5cdCAgICAgICAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBNX29mZnNldF8xNSwgMTAsIFRbNTddKTtcblx0ICAgICAgICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzYsICAxNSwgVFs1OF0pO1xuXHQgICAgICAgICAgICBiID0gSUkoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTMsIDIxLCBUWzU5XSk7XG5cdCAgICAgICAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBNX29mZnNldF80LCAgNiwgIFRbNjBdKTtcblx0ICAgICAgICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzExLCAxMCwgVFs2MV0pO1xuXHQgICAgICAgICAgICBjID0gSUkoYywgZCwgYSwgYiwgTV9vZmZzZXRfMiwgIDE1LCBUWzYyXSk7XG5cdCAgICAgICAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBNX29mZnNldF85LCAgMjEsIFRbNjNdKTtcblxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICBIWzBdID0gKEhbMF0gKyBhKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMV0gPSAoSFsxXSArIGIpIHwgMDtcblx0ICAgICAgICAgICAgSFsyXSA9IChIWzJdICsgYykgfCAwO1xuXHQgICAgICAgICAgICBIWzNdID0gKEhbM10gKyBkKSB8IDA7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsID0gdGhpcy5fbkRhdGFCeXRlcyAqIDg7XG5cdCAgICAgICAgICAgIHZhciBuQml0c0xlZnQgPSBkYXRhLnNpZ0J5dGVzICogODtcblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbbkJpdHNMZWZ0ID4+PiA1XSB8PSAweDgwIDw8ICgyNCAtIG5CaXRzTGVmdCAlIDMyKTtcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbEggPSBNYXRoLmZsb29yKG5CaXRzVG90YWwgLyAweDEwMDAwMDAwMCk7XG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsTCA9IG5CaXRzVG90YWw7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTVdID0gKFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbEggPDwgOCkgIHwgKG5CaXRzVG90YWxIID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbEggPDwgMjQpIHwgKG5CaXRzVG90YWxIID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSAoXG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsTCA8PCA4KSAgfCAobkJpdHNUb3RhbEwgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsTCA8PCAyNCkgfCAobkJpdHNUb3RhbEwgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICApO1xuXG5cdCAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgPSAoZGF0YVdvcmRzLmxlbmd0aCArIDEpICogNDtcblxuXHQgICAgICAgICAgICAvLyBIYXNoIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5faGFzaDtcblx0ICAgICAgICAgICAgdmFyIEggPSBoYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICAgICAgdmFyIEhfaSA9IEhbaV07XG5cblx0ICAgICAgICAgICAgICAgIEhbaV0gPSAoKChIX2kgPDwgOCkgIHwgKEhfaSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAgICAoKChIX2kgPDwgMjQpIHwgKEhfaSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIGZpbmFsIGNvbXB1dGVkIGhhc2hcblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEhhc2hlci5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS5faGFzaCA9IHRoaXMuX2hhc2guY2xvbmUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIGZ1bmN0aW9uIEZGKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcblx0ICAgICAgICB2YXIgbiA9IGEgKyAoKGIgJiBjKSB8ICh+YiAmIGQpKSArIHggKyB0O1xuXHQgICAgICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIEdHKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcblx0ICAgICAgICB2YXIgbiA9IGEgKyAoKGIgJiBkKSB8IChjICYgfmQpKSArIHggKyB0O1xuXHQgICAgICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIEhIKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcblx0ICAgICAgICB2YXIgbiA9IGEgKyAoYiBeIGMgXiBkKSArIHggKyB0O1xuXHQgICAgICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIElJKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcblx0ICAgICAgICB2YXIgbiA9IGEgKyAoYyBeIChiIHwgfmQpKSArIHggKyB0O1xuXHQgICAgICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XG5cdCAgICB9XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5NRDUoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLk1ENSh3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLk1ENSA9IEhhc2hlci5fY3JlYXRlSGVscGVyKE1ENSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjTUQ1KG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY01ENSA9IEhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihNRDUpO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5NRDU7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gUmV1c2FibGUgb2JqZWN0XG5cdCAgICB2YXIgVyA9IFtdO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS0xIGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgU0hBMSA9IENfYWxnby5TSEExID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICAweDY3NDUyMzAxLCAweGVmY2RhYjg5LFxuXHQgICAgICAgICAgICAgICAgMHg5OGJhZGNmZSwgMHgxMDMyNTQ3Nixcblx0ICAgICAgICAgICAgICAgIDB4YzNkMmUxZjBcblx0ICAgICAgICAgICAgXSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgSCA9IHRoaXMuX2hhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gV29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgdmFyIGEgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgYiA9IEhbMV07XG5cdCAgICAgICAgICAgIHZhciBjID0gSFsyXTtcblx0ICAgICAgICAgICAgdmFyIGQgPSBIWzNdO1xuXHQgICAgICAgICAgICB2YXIgZSA9IEhbNF07XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0YXRpb25cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4MDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoaSA8IDE2KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IE1bb2Zmc2V0ICsgaV0gfCAwO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IFdbaSAtIDNdIF4gV1tpIC0gOF0gXiBXW2kgLSAxNF0gXiBXW2kgLSAxNl07XG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IChuIDw8IDEpIHwgKG4gPj4+IDMxKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgdmFyIHQgPSAoKGEgPDwgNSkgfCAoYSA+Pj4gMjcpKSArIGUgKyBXW2ldO1xuXHQgICAgICAgICAgICAgICAgaWYgKGkgPCAyMCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHQgKz0gKChiICYgYykgfCAofmIgJiBkKSkgKyAweDVhODI3OTk5O1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpIDwgNDApIHtcblx0ICAgICAgICAgICAgICAgICAgICB0ICs9IChiIF4gYyBeIGQpICsgMHg2ZWQ5ZWJhMTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IDYwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdCArPSAoKGIgJiBjKSB8IChiICYgZCkgfCAoYyAmIGQpKSAtIDB4NzBlNDQzMjQ7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgLyogaWYgKGkgPCA4MCkgKi8ge1xuXHQgICAgICAgICAgICAgICAgICAgIHQgKz0gKGIgXiBjIF4gZCkgLSAweDM1OWQzZTJhO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBlID0gZDtcblx0ICAgICAgICAgICAgICAgIGQgPSBjO1xuXHQgICAgICAgICAgICAgICAgYyA9IChiIDw8IDMwKSB8IChiID4+PiAyKTtcblx0ICAgICAgICAgICAgICAgIGIgPSBhO1xuXHQgICAgICAgICAgICAgICAgYSA9IHQ7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICBIWzBdID0gKEhbMF0gKyBhKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMV0gPSAoSFsxXSArIGIpIHwgMDtcblx0ICAgICAgICAgICAgSFsyXSA9IChIWzJdICsgYykgfCAwO1xuXHQgICAgICAgICAgICBIWzNdID0gKEhbM10gKyBkKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNF0gPSAoSFs0XSArIGUpIHwgMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IE1hdGguZmxvb3IobkJpdHNUb3RhbCAvIDB4MTAwMDAwMDAwKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNV0gPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gZGF0YVdvcmRzLmxlbmd0aCAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMSgnbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMSh3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTEgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihTSEExKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEExKG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTEgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBMSk7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuU0hBMTtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uIChNYXRoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gSW5pdGlhbGl6YXRpb24gYW5kIHJvdW5kIGNvbnN0YW50cyB0YWJsZXNcblx0ICAgIHZhciBIID0gW107XG5cdCAgICB2YXIgSyA9IFtdO1xuXG5cdCAgICAvLyBDb21wdXRlIGNvbnN0YW50c1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmdW5jdGlvbiBpc1ByaW1lKG4pIHtcblx0ICAgICAgICAgICAgdmFyIHNxcnROID0gTWF0aC5zcXJ0KG4pO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBmYWN0b3IgPSAyOyBmYWN0b3IgPD0gc3FydE47IGZhY3RvcisrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoIShuICUgZmFjdG9yKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGZ1bmN0aW9uIGdldEZyYWN0aW9uYWxCaXRzKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuICgobiAtIChuIHwgMCkpICogMHgxMDAwMDAwMDApIHwgMDtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgbiA9IDI7XG5cdCAgICAgICAgdmFyIG5QcmltZSA9IDA7XG5cdCAgICAgICAgd2hpbGUgKG5QcmltZSA8IDY0KSB7XG5cdCAgICAgICAgICAgIGlmIChpc1ByaW1lKG4pKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoblByaW1lIDwgOCkge1xuXHQgICAgICAgICAgICAgICAgICAgIEhbblByaW1lXSA9IGdldEZyYWN0aW9uYWxCaXRzKE1hdGgucG93KG4sIDEgLyAyKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBLW25QcmltZV0gPSBnZXRGcmFjdGlvbmFsQml0cyhNYXRoLnBvdyhuLCAxIC8gMykpO1xuXG5cdCAgICAgICAgICAgICAgICBuUHJpbWUrKztcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIG4rKztcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvLyBSZXVzYWJsZSBvYmplY3Rcblx0ICAgIHZhciBXID0gW107XG5cblx0ICAgIC8qKlxuXHQgICAgICogU0hBLTI1NiBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNIQTI1NiA9IENfYWxnby5TSEEyNTYgPSBIYXNoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoID0gbmV3IFdvcmRBcnJheS5pbml0KEguc2xpY2UoMCkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIEggPSB0aGlzLl9oYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFdvcmtpbmcgdmFyaWFibGVzXG5cdCAgICAgICAgICAgIHZhciBhID0gSFswXTtcblx0ICAgICAgICAgICAgdmFyIGIgPSBIWzFdO1xuXHQgICAgICAgICAgICB2YXIgYyA9IEhbMl07XG5cdCAgICAgICAgICAgIHZhciBkID0gSFszXTtcblx0ICAgICAgICAgICAgdmFyIGUgPSBIWzRdO1xuXHQgICAgICAgICAgICB2YXIgZiA9IEhbNV07XG5cdCAgICAgICAgICAgIHZhciBnID0gSFs2XTtcblx0ICAgICAgICAgICAgdmFyIGggPSBIWzddO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGF0aW9uXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgaWYgKGkgPCAxNikge1xuXHQgICAgICAgICAgICAgICAgICAgIFdbaV0gPSBNW29mZnNldCArIGldIHwgMDtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMHggPSBXW2kgLSAxNV07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMCAgPSAoKGdhbW1hMHggPDwgMjUpIHwgKGdhbW1hMHggPj4+IDcpKSAgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChnYW1tYTB4IDw8IDE0KSB8IChnYW1tYTB4ID4+PiAxOCkpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZ2FtbWEweCA+Pj4gMyk7XG5cblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeCA9IFdbaSAtIDJdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTEgID0gKChnYW1tYTF4IDw8IDE1KSB8IChnYW1tYTF4ID4+PiAxNykpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoZ2FtbWExeCA8PCAxMykgfCAoZ2FtbWExeCA+Pj4gMTkpKSBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdhbW1hMXggPj4+IDEwKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIFdbaV0gPSBnYW1tYTAgKyBXW2kgLSA3XSArIGdhbW1hMSArIFdbaSAtIDE2XTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgdmFyIGNoICA9IChlICYgZikgXiAofmUgJiBnKTtcblx0ICAgICAgICAgICAgICAgIHZhciBtYWogPSAoYSAmIGIpIF4gKGEgJiBjKSBeIChiICYgYyk7XG5cblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTAgPSAoKGEgPDwgMzApIHwgKGEgPj4+IDIpKSBeICgoYSA8PCAxOSkgfCAoYSA+Pj4gMTMpKSBeICgoYSA8PCAxMCkgfCAoYSA+Pj4gMjIpKTtcblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTEgPSAoKGUgPDwgMjYpIHwgKGUgPj4+IDYpKSBeICgoZSA8PCAyMSkgfCAoZSA+Pj4gMTEpKSBeICgoZSA8PCA3KSAgfCAoZSA+Pj4gMjUpKTtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHQxID0gaCArIHNpZ21hMSArIGNoICsgS1tpXSArIFdbaV07XG5cdCAgICAgICAgICAgICAgICB2YXIgdDIgPSBzaWdtYTAgKyBtYWo7XG5cblx0ICAgICAgICAgICAgICAgIGggPSBnO1xuXHQgICAgICAgICAgICAgICAgZyA9IGY7XG5cdCAgICAgICAgICAgICAgICBmID0gZTtcblx0ICAgICAgICAgICAgICAgIGUgPSAoZCArIHQxKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBkID0gYztcblx0ICAgICAgICAgICAgICAgIGMgPSBiO1xuXHQgICAgICAgICAgICAgICAgYiA9IGE7XG5cdCAgICAgICAgICAgICAgICBhID0gKHQxICsgdDIpIHwgMDtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEludGVybWVkaWF0ZSBoYXNoIHZhbHVlXG5cdCAgICAgICAgICAgIEhbMF0gPSAoSFswXSArIGEpIHwgMDtcblx0ICAgICAgICAgICAgSFsxXSA9IChIWzFdICsgYikgfCAwO1xuXHQgICAgICAgICAgICBIWzJdID0gKEhbMl0gKyBjKSB8IDA7XG5cdCAgICAgICAgICAgIEhbM10gPSAoSFszXSArIGQpIHwgMDtcblx0ICAgICAgICAgICAgSFs0XSA9IChIWzRdICsgZSkgfCAwO1xuXHQgICAgICAgICAgICBIWzVdID0gKEhbNV0gKyBmKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNl0gPSAoSFs2XSArIGcpIHwgMDtcblx0ICAgICAgICAgICAgSFs3XSA9IChIWzddICsgaCkgfCAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gTWF0aC5mbG9vcihuQml0c1RvdGFsIC8gMHgxMDAwMDAwMDApO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE1XSA9IG5CaXRzVG90YWw7XG5cdCAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgPSBkYXRhV29yZHMubGVuZ3RoICogNDtcblxuXHQgICAgICAgICAgICAvLyBIYXNoIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIGZpbmFsIGNvbXB1dGVkIGhhc2hcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEhhc2hlci5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS5faGFzaCA9IHRoaXMuX2hhc2guY2xvbmUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEyNTYoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTI1Nih3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTI1NiA9IEhhc2hlci5fY3JlYXRlSGVscGVyKFNIQTI1Nik7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjU0hBMjU2KG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTI1NiA9IEhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihTSEEyNTYpO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEEyNTY7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vc2hhMjU2XCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL3NoYTI1NlwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cdCAgICB2YXIgU0hBMjU2ID0gQ19hbGdvLlNIQTI1NjtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTSEEtMjI0IGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgU0hBMjI0ID0gQ19hbGdvLlNIQTIyNCA9IFNIQTI1Ni5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgV29yZEFycmF5LmluaXQoW1xuXHQgICAgICAgICAgICAgICAgMHhjMTA1OWVkOCwgMHgzNjdjZDUwNywgMHgzMDcwZGQxNywgMHhmNzBlNTkzOSxcblx0ICAgICAgICAgICAgICAgIDB4ZmZjMDBiMzEsIDB4Njg1ODE1MTEsIDB4NjRmOThmYTcsIDB4YmVmYTRmYTRcblx0ICAgICAgICAgICAgXSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gU0hBMjU2Ll9kb0ZpbmFsaXplLmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgaGFzaC5zaWdCeXRlcyAtPSA0O1xuXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMjI0KCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEyMjQod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEEyMjQgPSBTSEEyNTYuX2NyZWF0ZUhlbHBlcihTSEEyMjQpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY1NIQTIyNChtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEEyMjQgPSBTSEEyNTYuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBMjI0KTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEEyMjQ7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4veDY0LWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4veDY0LWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ194NjQgPSBDLng2NDtcblx0ICAgIHZhciBYNjRXb3JkID0gQ194NjQuV29yZDtcblx0ICAgIHZhciBYNjRXb3JkQXJyYXkgPSBDX3g2NC5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICBmdW5jdGlvbiBYNjRXb3JkX2NyZWF0ZSgpIHtcblx0ICAgICAgICByZXR1cm4gWDY0V29yZC5jcmVhdGUuYXBwbHkoWDY0V29yZCwgYXJndW1lbnRzKTtcblx0ICAgIH1cblxuXHQgICAgLy8gQ29uc3RhbnRzXG5cdCAgICB2YXIgSyA9IFtcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDQyOGEyZjk4LCAweGQ3MjhhZTIyKSwgWDY0V29yZF9jcmVhdGUoMHg3MTM3NDQ5MSwgMHgyM2VmNjVjZCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhiNWMwZmJjZiwgMHhlYzRkM2IyZiksIFg2NFdvcmRfY3JlYXRlKDB4ZTliNWRiYTUsIDB4ODE4OWRiYmMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4Mzk1NmMyNWIsIDB4ZjM0OGI1MzgpLCBYNjRXb3JkX2NyZWF0ZSgweDU5ZjExMWYxLCAweGI2MDVkMDE5KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDkyM2Y4MmE0LCAweGFmMTk0ZjliKSwgWDY0V29yZF9jcmVhdGUoMHhhYjFjNWVkNSwgMHhkYTZkODExOCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhkODA3YWE5OCwgMHhhMzAzMDI0MiksIFg2NFdvcmRfY3JlYXRlKDB4MTI4MzViMDEsIDB4NDU3MDZmYmUpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MjQzMTg1YmUsIDB4NGVlNGIyOGMpLCBYNjRXb3JkX2NyZWF0ZSgweDU1MGM3ZGMzLCAweGQ1ZmZiNGUyKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDcyYmU1ZDc0LCAweGYyN2I4OTZmKSwgWDY0V29yZF9jcmVhdGUoMHg4MGRlYjFmZSwgMHgzYjE2OTZiMSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg5YmRjMDZhNywgMHgyNWM3MTIzNSksIFg2NFdvcmRfY3JlYXRlKDB4YzE5YmYxNzQsIDB4Y2Y2OTI2OTQpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZTQ5YjY5YzEsIDB4OWVmMTRhZDIpLCBYNjRXb3JkX2NyZWF0ZSgweGVmYmU0Nzg2LCAweDM4NGYyNWUzKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDBmYzE5ZGM2LCAweDhiOGNkNWI1KSwgWDY0V29yZF9jcmVhdGUoMHgyNDBjYTFjYywgMHg3N2FjOWM2NSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyZGU5MmM2ZiwgMHg1OTJiMDI3NSksIFg2NFdvcmRfY3JlYXRlKDB4NGE3NDg0YWEsIDB4NmVhNmU0ODMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NWNiMGE5ZGMsIDB4YmQ0MWZiZDQpLCBYNjRXb3JkX2NyZWF0ZSgweDc2Zjk4OGRhLCAweDgzMTE1M2I1KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDk4M2U1MTUyLCAweGVlNjZkZmFiKSwgWDY0V29yZF9jcmVhdGUoMHhhODMxYzY2ZCwgMHgyZGI0MzIxMCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhiMDAzMjdjOCwgMHg5OGZiMjEzZiksIFg2NFdvcmRfY3JlYXRlKDB4YmY1OTdmYzcsIDB4YmVlZjBlZTQpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YzZlMDBiZjMsIDB4M2RhODhmYzIpLCBYNjRXb3JkX2NyZWF0ZSgweGQ1YTc5MTQ3LCAweDkzMGFhNzI1KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDA2Y2E2MzUxLCAweGUwMDM4MjZmKSwgWDY0V29yZF9jcmVhdGUoMHgxNDI5Mjk2NywgMHgwYTBlNmU3MCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyN2I3MGE4NSwgMHg0NmQyMmZmYyksIFg2NFdvcmRfY3JlYXRlKDB4MmUxYjIxMzgsIDB4NWMyNmM5MjYpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NGQyYzZkZmMsIDB4NWFjNDJhZWQpLCBYNjRXb3JkX2NyZWF0ZSgweDUzMzgwZDEzLCAweDlkOTViM2RmKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDY1MGE3MzU0LCAweDhiYWY2M2RlKSwgWDY0V29yZF9jcmVhdGUoMHg3NjZhMGFiYiwgMHgzYzc3YjJhOCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg4MWMyYzkyZSwgMHg0N2VkYWVlNiksIFg2NFdvcmRfY3JlYXRlKDB4OTI3MjJjODUsIDB4MTQ4MjM1M2IpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YTJiZmU4YTEsIDB4NGNmMTAzNjQpLCBYNjRXb3JkX2NyZWF0ZSgweGE4MWE2NjRiLCAweGJjNDIzMDAxKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGMyNGI4YjcwLCAweGQwZjg5NzkxKSwgWDY0V29yZF9jcmVhdGUoMHhjNzZjNTFhMywgMHgwNjU0YmUzMCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhkMTkyZTgxOSwgMHhkNmVmNTIxOCksIFg2NFdvcmRfY3JlYXRlKDB4ZDY5OTA2MjQsIDB4NTU2NWE5MTApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZjQwZTM1ODUsIDB4NTc3MTIwMmEpLCBYNjRXb3JkX2NyZWF0ZSgweDEwNmFhMDcwLCAweDMyYmJkMWI4KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDE5YTRjMTE2LCAweGI4ZDJkMGM4KSwgWDY0V29yZF9jcmVhdGUoMHgxZTM3NmMwOCwgMHg1MTQxYWI1MyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyNzQ4Nzc0YywgMHhkZjhlZWI5OSksIFg2NFdvcmRfY3JlYXRlKDB4MzRiMGJjYjUsIDB4ZTE5YjQ4YTgpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MzkxYzBjYjMsIDB4YzVjOTVhNjMpLCBYNjRXb3JkX2NyZWF0ZSgweDRlZDhhYTRhLCAweGUzNDE4YWNiKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDViOWNjYTRmLCAweDc3NjNlMzczKSwgWDY0V29yZF9jcmVhdGUoMHg2ODJlNmZmMywgMHhkNmIyYjhhMyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg3NDhmODJlZSwgMHg1ZGVmYjJmYyksIFg2NFdvcmRfY3JlYXRlKDB4NzhhNTYzNmYsIDB4NDMxNzJmNjApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ODRjODc4MTQsIDB4YTFmMGFiNzIpLCBYNjRXb3JkX2NyZWF0ZSgweDhjYzcwMjA4LCAweDFhNjQzOWVjKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDkwYmVmZmZhLCAweDIzNjMxZTI4KSwgWDY0V29yZF9jcmVhdGUoMHhhNDUwNmNlYiwgMHhkZTgyYmRlOSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhiZWY5YTNmNywgMHhiMmM2NzkxNSksIFg2NFdvcmRfY3JlYXRlKDB4YzY3MTc4ZjIsIDB4ZTM3MjUzMmIpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4Y2EyNzNlY2UsIDB4ZWEyNjYxOWMpLCBYNjRXb3JkX2NyZWF0ZSgweGQxODZiOGM3LCAweDIxYzBjMjA3KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGVhZGE3ZGQ2LCAweGNkZTBlYjFlKSwgWDY0V29yZF9jcmVhdGUoMHhmNTdkNGY3ZiwgMHhlZTZlZDE3OCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgwNmYwNjdhYSwgMHg3MjE3NmZiYSksIFg2NFdvcmRfY3JlYXRlKDB4MGE2MzdkYzUsIDB4YTJjODk4YTYpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MTEzZjk4MDQsIDB4YmVmOTBkYWUpLCBYNjRXb3JkX2NyZWF0ZSgweDFiNzEwYjM1LCAweDEzMWM0NzFiKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDI4ZGI3N2Y1LCAweDIzMDQ3ZDg0KSwgWDY0V29yZF9jcmVhdGUoMHgzMmNhYWI3YiwgMHg0MGM3MjQ5MyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgzYzllYmUwYSwgMHgxNWM5YmViYyksIFg2NFdvcmRfY3JlYXRlKDB4NDMxZDY3YzQsIDB4OWMxMDBkNGMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NGNjNWQ0YmUsIDB4Y2IzZTQyYjYpLCBYNjRXb3JkX2NyZWF0ZSgweDU5N2YyOTljLCAweGZjNjU3ZTJhKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDVmY2I2ZmFiLCAweDNhZDZmYWVjKSwgWDY0V29yZF9jcmVhdGUoMHg2YzQ0MTk4YywgMHg0YTQ3NTgxNylcblx0ICAgIF07XG5cblx0ICAgIC8vIFJldXNhYmxlIG9iamVjdHNcblx0ICAgIHZhciBXID0gW107XG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODA7IGkrKykge1xuXHQgICAgICAgICAgICBXW2ldID0gWDY0V29yZF9jcmVhdGUoKTtcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS01MTIgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEE1MTIgPSBDX2FsZ28uU0hBNTEyID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBYNjRXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4NmEwOWU2NjcsIDB4ZjNiY2M5MDgpLCBuZXcgWDY0V29yZC5pbml0KDB4YmI2N2FlODUsIDB4ODRjYWE3M2IpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDNjNmVmMzcyLCAweGZlOTRmODJiKSwgbmV3IFg2NFdvcmQuaW5pdCgweGE1NGZmNTNhLCAweDVmMWQzNmYxKSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHg1MTBlNTI3ZiwgMHhhZGU2ODJkMSksIG5ldyBYNjRXb3JkLmluaXQoMHg5YjA1Njg4YywgMHgyYjNlNmMxZiksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4MWY4M2Q5YWIsIDB4ZmI0MWJkNmIpLCBuZXcgWDY0V29yZC5pbml0KDB4NWJlMGNkMTksIDB4MTM3ZTIxNzkpXG5cdCAgICAgICAgICAgIF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBIID0gdGhpcy5faGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgSDAgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgSDEgPSBIWzFdO1xuXHQgICAgICAgICAgICB2YXIgSDIgPSBIWzJdO1xuXHQgICAgICAgICAgICB2YXIgSDMgPSBIWzNdO1xuXHQgICAgICAgICAgICB2YXIgSDQgPSBIWzRdO1xuXHQgICAgICAgICAgICB2YXIgSDUgPSBIWzVdO1xuXHQgICAgICAgICAgICB2YXIgSDYgPSBIWzZdO1xuXHQgICAgICAgICAgICB2YXIgSDcgPSBIWzddO1xuXG5cdCAgICAgICAgICAgIHZhciBIMGggPSBIMC5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDBsID0gSDAubG93O1xuXHQgICAgICAgICAgICB2YXIgSDFoID0gSDEuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEgxbCA9IEgxLmxvdztcblx0ICAgICAgICAgICAgdmFyIEgyaCA9IEgyLmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBIMmwgPSBIMi5sb3c7XG5cdCAgICAgICAgICAgIHZhciBIM2ggPSBIMy5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDNsID0gSDMubG93O1xuXHQgICAgICAgICAgICB2YXIgSDRoID0gSDQuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEg0bCA9IEg0Lmxvdztcblx0ICAgICAgICAgICAgdmFyIEg1aCA9IEg1LmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBINWwgPSBINS5sb3c7XG5cdCAgICAgICAgICAgIHZhciBINmggPSBINi5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDZsID0gSDYubG93O1xuXHQgICAgICAgICAgICB2YXIgSDdoID0gSDcuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEg3bCA9IEg3LmxvdztcblxuXHQgICAgICAgICAgICAvLyBXb3JraW5nIHZhcmlhYmxlc1xuXHQgICAgICAgICAgICB2YXIgYWggPSBIMGg7XG5cdCAgICAgICAgICAgIHZhciBhbCA9IEgwbDtcblx0ICAgICAgICAgICAgdmFyIGJoID0gSDFoO1xuXHQgICAgICAgICAgICB2YXIgYmwgPSBIMWw7XG5cdCAgICAgICAgICAgIHZhciBjaCA9IEgyaDtcblx0ICAgICAgICAgICAgdmFyIGNsID0gSDJsO1xuXHQgICAgICAgICAgICB2YXIgZGggPSBIM2g7XG5cdCAgICAgICAgICAgIHZhciBkbCA9IEgzbDtcblx0ICAgICAgICAgICAgdmFyIGVoID0gSDRoO1xuXHQgICAgICAgICAgICB2YXIgZWwgPSBINGw7XG5cdCAgICAgICAgICAgIHZhciBmaCA9IEg1aDtcblx0ICAgICAgICAgICAgdmFyIGZsID0gSDVsO1xuXHQgICAgICAgICAgICB2YXIgZ2ggPSBINmg7XG5cdCAgICAgICAgICAgIHZhciBnbCA9IEg2bDtcblx0ICAgICAgICAgICAgdmFyIGhoID0gSDdoO1xuXHQgICAgICAgICAgICB2YXIgaGwgPSBIN2w7XG5cblx0ICAgICAgICAgICAgLy8gUm91bmRzXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODA7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIFdpbDtcblx0ICAgICAgICAgICAgICAgIHZhciBXaWg7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgICAgICB2YXIgV2kgPSBXW2ldO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBFeHRlbmQgbWVzc2FnZVxuXHQgICAgICAgICAgICAgICAgaWYgKGkgPCAxNikge1xuXHQgICAgICAgICAgICAgICAgICAgIFdpaCA9IFdpLmhpZ2ggPSBNW29mZnNldCArIGkgKiAyXSAgICAgfCAwO1xuXHQgICAgICAgICAgICAgICAgICAgIFdpbCA9IFdpLmxvdyAgPSBNW29mZnNldCArIGkgKiAyICsgMV0gfCAwO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBHYW1tYTBcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEweCAgPSBXW2kgLSAxNV07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMHhoID0gZ2FtbWEweC5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTB4bCA9IGdhbW1hMHgubG93O1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTBoICA9ICgoZ2FtbWEweGggPj4+IDEpIHwgKGdhbW1hMHhsIDw8IDMxKSkgXiAoKGdhbW1hMHhoID4+PiA4KSB8IChnYW1tYTB4bCA8PCAyNCkpIF4gKGdhbW1hMHhoID4+PiA3KTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEwbCAgPSAoKGdhbW1hMHhsID4+PiAxKSB8IChnYW1tYTB4aCA8PCAzMSkpIF4gKChnYW1tYTB4bCA+Pj4gOCkgfCAoZ2FtbWEweGggPDwgMjQpKSBeICgoZ2FtbWEweGwgPj4+IDcpIHwgKGdhbW1hMHhoIDw8IDI1KSk7XG5cblx0ICAgICAgICAgICAgICAgICAgICAvLyBHYW1tYTFcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeCAgPSBXW2kgLSAyXTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeGggPSBnYW1tYTF4LmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMXhsID0gZ2FtbWExeC5sb3c7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMWggID0gKChnYW1tYTF4aCA+Pj4gMTkpIHwgKGdhbW1hMXhsIDw8IDEzKSkgXiAoKGdhbW1hMXhoIDw8IDMpIHwgKGdhbW1hMXhsID4+PiAyOSkpIF4gKGdhbW1hMXhoID4+PiA2KTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExbCAgPSAoKGdhbW1hMXhsID4+PiAxOSkgfCAoZ2FtbWExeGggPDwgMTMpKSBeICgoZ2FtbWExeGwgPDwgMykgfCAoZ2FtbWExeGggPj4+IDI5KSkgXiAoKGdhbW1hMXhsID4+PiA2KSB8IChnYW1tYTF4aCA8PCAyNikpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gV1tpXSA9IGdhbW1hMCArIFdbaSAtIDddICsgZ2FtbWExICsgV1tpIC0gMTZdXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpNyAgPSBXW2kgLSA3XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2k3aCA9IFdpNy5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTdsID0gV2k3LmxvdztcblxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTE2ICA9IFdbaSAtIDE2XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2kxNmggPSBXaTE2LmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpMTZsID0gV2kxNi5sb3c7XG5cblx0ICAgICAgICAgICAgICAgICAgICBXaWwgPSBnYW1tYTBsICsgV2k3bDtcblx0ICAgICAgICAgICAgICAgICAgICBXaWggPSBnYW1tYTBoICsgV2k3aCArICgoV2lsID4+PiAwKSA8IChnYW1tYTBsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgICAgICBXaWwgPSBXaWwgKyBnYW1tYTFsO1xuXHQgICAgICAgICAgICAgICAgICAgIFdpaCA9IFdpaCArIGdhbW1hMWggKyAoKFdpbCA+Pj4gMCkgPCAoZ2FtbWExbCA+Pj4gMCkgPyAxIDogMCk7XG5cdCAgICAgICAgICAgICAgICAgICAgV2lsID0gV2lsICsgV2kxNmw7XG5cdCAgICAgICAgICAgICAgICAgICAgV2loID0gV2loICsgV2kxNmggKyAoKFdpbCA+Pj4gMCkgPCAoV2kxNmwgPj4+IDApID8gMSA6IDApO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgV2kuaGlnaCA9IFdpaDtcblx0ICAgICAgICAgICAgICAgICAgICBXaS5sb3cgID0gV2lsO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICB2YXIgY2hoICA9IChlaCAmIGZoKSBeICh+ZWggJiBnaCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgY2hsICA9IChlbCAmIGZsKSBeICh+ZWwgJiBnbCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFqaCA9IChhaCAmIGJoKSBeIChhaCAmIGNoKSBeIChiaCAmIGNoKTtcblx0ICAgICAgICAgICAgICAgIHZhciBtYWpsID0gKGFsICYgYmwpIF4gKGFsICYgY2wpIF4gKGJsICYgY2wpO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWEwaCA9ICgoYWggPj4+IDI4KSB8IChhbCA8PCA0KSkgIF4gKChhaCA8PCAzMCkgIHwgKGFsID4+PiAyKSkgXiAoKGFoIDw8IDI1KSB8IChhbCA+Pj4gNykpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMGwgPSAoKGFsID4+PiAyOCkgfCAoYWggPDwgNCkpICBeICgoYWwgPDwgMzApICB8IChhaCA+Pj4gMikpIF4gKChhbCA8PCAyNSkgfCAoYWggPj4+IDcpKTtcblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTFoID0gKChlaCA+Pj4gMTQpIHwgKGVsIDw8IDE4KSkgXiAoKGVoID4+PiAxOCkgfCAoZWwgPDwgMTQpKSBeICgoZWggPDwgMjMpIHwgKGVsID4+PiA5KSk7XG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWExbCA9ICgoZWwgPj4+IDE0KSB8IChlaCA8PCAxOCkpIF4gKChlbCA+Pj4gMTgpIHwgKGVoIDw8IDE0KSkgXiAoKGVsIDw8IDIzKSB8IChlaCA+Pj4gOSkpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyB0MSA9IGggKyBzaWdtYTEgKyBjaCArIEtbaV0gKyBXW2ldXG5cdCAgICAgICAgICAgICAgICB2YXIgS2kgID0gS1tpXTtcblx0ICAgICAgICAgICAgICAgIHZhciBLaWggPSBLaS5oaWdoO1xuXHQgICAgICAgICAgICAgICAgdmFyIEtpbCA9IEtpLmxvdztcblxuXHQgICAgICAgICAgICAgICAgdmFyIHQxbCA9IGhsICsgc2lnbWExbDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWggPSBoaCArIHNpZ21hMWggKyAoKHQxbCA+Pj4gMCkgPCAoaGwgPj4+IDApID8gMSA6IDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxbCA9IHQxbCArIGNobDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWggPSB0MWggKyBjaGggKyAoKHQxbCA+Pj4gMCkgPCAoY2hsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWwgPSB0MWwgKyBLaWw7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFoID0gdDFoICsgS2loICsgKCh0MWwgPj4+IDApIDwgKEtpbCA+Pj4gMCkgPyAxIDogMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFsID0gdDFsICsgV2lsO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxaCA9IHQxaCArIFdpaCArICgodDFsID4+PiAwKSA8IChXaWwgPj4+IDApID8gMSA6IDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyB0MiA9IHNpZ21hMCArIG1halxuXHQgICAgICAgICAgICAgICAgdmFyIHQybCA9IHNpZ21hMGwgKyBtYWpsO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQyaCA9IHNpZ21hMGggKyBtYWpoICsgKCh0MmwgPj4+IDApIDwgKHNpZ21hMGwgPj4+IDApID8gMSA6IDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBVcGRhdGUgd29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgICAgIGhoID0gZ2g7XG5cdCAgICAgICAgICAgICAgICBobCA9IGdsO1xuXHQgICAgICAgICAgICAgICAgZ2ggPSBmaDtcblx0ICAgICAgICAgICAgICAgIGdsID0gZmw7XG5cdCAgICAgICAgICAgICAgICBmaCA9IGVoO1xuXHQgICAgICAgICAgICAgICAgZmwgPSBlbDtcblx0ICAgICAgICAgICAgICAgIGVsID0gKGRsICsgdDFsKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBlaCA9IChkaCArIHQxaCArICgoZWwgPj4+IDApIDwgKGRsID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgICAgICAgICAgZGggPSBjaDtcblx0ICAgICAgICAgICAgICAgIGRsID0gY2w7XG5cdCAgICAgICAgICAgICAgICBjaCA9IGJoO1xuXHQgICAgICAgICAgICAgICAgY2wgPSBibDtcblx0ICAgICAgICAgICAgICAgIGJoID0gYWg7XG5cdCAgICAgICAgICAgICAgICBibCA9IGFsO1xuXHQgICAgICAgICAgICAgICAgYWwgPSAodDFsICsgdDJsKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBhaCA9ICh0MWggKyB0MmggKyAoKGFsID4+PiAwKSA8ICh0MWwgPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICBIMGwgPSBIMC5sb3cgID0gKEgwbCArIGFsKTtcblx0ICAgICAgICAgICAgSDAuaGlnaCA9IChIMGggKyBhaCArICgoSDBsID4+PiAwKSA8IChhbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIMWwgPSBIMS5sb3cgID0gKEgxbCArIGJsKTtcblx0ICAgICAgICAgICAgSDEuaGlnaCA9IChIMWggKyBiaCArICgoSDFsID4+PiAwKSA8IChibCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIMmwgPSBIMi5sb3cgID0gKEgybCArIGNsKTtcblx0ICAgICAgICAgICAgSDIuaGlnaCA9IChIMmggKyBjaCArICgoSDJsID4+PiAwKSA8IChjbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIM2wgPSBIMy5sb3cgID0gKEgzbCArIGRsKTtcblx0ICAgICAgICAgICAgSDMuaGlnaCA9IChIM2ggKyBkaCArICgoSDNsID4+PiAwKSA8IChkbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBINGwgPSBINC5sb3cgID0gKEg0bCArIGVsKTtcblx0ICAgICAgICAgICAgSDQuaGlnaCA9IChINGggKyBlaCArICgoSDRsID4+PiAwKSA8IChlbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBINWwgPSBINS5sb3cgID0gKEg1bCArIGZsKTtcblx0ICAgICAgICAgICAgSDUuaGlnaCA9IChINWggKyBmaCArICgoSDVsID4+PiAwKSA8IChmbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBINmwgPSBINi5sb3cgID0gKEg2bCArIGdsKTtcblx0ICAgICAgICAgICAgSDYuaGlnaCA9IChINmggKyBnaCArICgoSDZsID4+PiAwKSA8IChnbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIN2wgPSBINy5sb3cgID0gKEg3bCArIGhsKTtcblx0ICAgICAgICAgICAgSDcuaGlnaCA9IChIN2ggKyBoaCArICgoSDdsID4+PiAwKSA8IChobCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyAxMjgpID4+PiAxMCkgPDwgNSkgKyAzMF0gPSBNYXRoLmZsb29yKG5CaXRzVG90YWwgLyAweDEwMDAwMDAwMCk7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyAxMjgpID4+PiAxMCkgPDwgNSkgKyAzMV0gPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gZGF0YVdvcmRzLmxlbmd0aCAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgaGFzaCB0byAzMi1iaXQgd29yZCBhcnJheSBiZWZvcmUgcmV0dXJuaW5nXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5faGFzaC50b1gzMigpO1xuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDEwMjQvMzJcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBNTEyKCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEE1MTIod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEE1MTIgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihTSEE1MTIpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY1NIQTUxMihtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEE1MTIgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBNTEyKTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEE1MTI7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4veDY0LWNvcmVcIiksIHJlcXVpcmUoXCIuL3NoYTUxMlwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi94NjQtY29yZVwiLCBcIi4vc2hhNTEyXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfeDY0ID0gQy54NjQ7XG5cdCAgICB2YXIgWDY0V29yZCA9IENfeDY0LldvcmQ7XG5cdCAgICB2YXIgWDY0V29yZEFycmF5ID0gQ194NjQuV29yZEFycmF5O1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblx0ICAgIHZhciBTSEE1MTIgPSBDX2FsZ28uU0hBNTEyO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS0zODQgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEEzODQgPSBDX2FsZ28uU0hBMzg0ID0gU0hBNTEyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBYNjRXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4Y2JiYjlkNWQsIDB4YzEwNTllZDgpLCBuZXcgWDY0V29yZC5pbml0KDB4NjI5YTI5MmEsIDB4MzY3Y2Q1MDcpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDkxNTkwMTVhLCAweDMwNzBkZDE3KSwgbmV3IFg2NFdvcmQuaW5pdCgweDE1MmZlY2Q4LCAweGY3MGU1OTM5KSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHg2NzMzMjY2NywgMHhmZmMwMGIzMSksIG5ldyBYNjRXb3JkLmluaXQoMHg4ZWI0NGE4NywgMHg2ODU4MTUxMSksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4ZGIwYzJlMGQsIDB4NjRmOThmYTcpLCBuZXcgWDY0V29yZC5pbml0KDB4NDdiNTQ4MWQsIDB4YmVmYTRmYTQpXG5cdCAgICAgICAgICAgIF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IFNIQTUxMi5fZG9GaW5hbGl6ZS5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIGhhc2guc2lnQnl0ZXMgLT0gMTY7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEzODQoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTM4NCh3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTM4NCA9IFNIQTUxMi5fY3JlYXRlSGVscGVyKFNIQTM4NCk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjU0hBMzg0KG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTM4NCA9IFNIQTUxMi5fY3JlYXRlSG1hY0hlbHBlcihTSEEzODQpO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlNIQTM4NDtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi94NjQtY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi94NjQtY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uIChNYXRoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfeDY0ID0gQy54NjQ7XG5cdCAgICB2YXIgWDY0V29yZCA9IENfeDY0LldvcmQ7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBDb25zdGFudHMgdGFibGVzXG5cdCAgICB2YXIgUkhPX09GRlNFVFMgPSBbXTtcblx0ICAgIHZhciBQSV9JTkRFWEVTICA9IFtdO1xuXHQgICAgdmFyIFJPVU5EX0NPTlNUQU5UUyA9IFtdO1xuXG5cdCAgICAvLyBDb21wdXRlIENvbnN0YW50c1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAvLyBDb21wdXRlIHJobyBvZmZzZXQgY29uc3RhbnRzXG5cdCAgICAgICAgdmFyIHggPSAxLCB5ID0gMDtcblx0ICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IDI0OyB0KyspIHtcblx0ICAgICAgICAgICAgUkhPX09GRlNFVFNbeCArIDUgKiB5XSA9ICgodCArIDEpICogKHQgKyAyKSAvIDIpICUgNjQ7XG5cblx0ICAgICAgICAgICAgdmFyIG5ld1ggPSB5ICUgNTtcblx0ICAgICAgICAgICAgdmFyIG5ld1kgPSAoMiAqIHggKyAzICogeSkgJSA1O1xuXHQgICAgICAgICAgICB4ID0gbmV3WDtcblx0ICAgICAgICAgICAgeSA9IG5ld1k7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gQ29tcHV0ZSBwaSBpbmRleCBjb25zdGFudHNcblx0ICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDU7IHgrKykge1xuXHQgICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IDU7IHkrKykge1xuXHQgICAgICAgICAgICAgICAgUElfSU5ERVhFU1t4ICsgNSAqIHldID0geSArICgoMiAqIHggKyAzICogeSkgJSA1KSAqIDU7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyBDb21wdXRlIHJvdW5kIGNvbnN0YW50c1xuXHQgICAgICAgIHZhciBMRlNSID0gMHgwMTtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI0OyBpKyspIHtcblx0ICAgICAgICAgICAgdmFyIHJvdW5kQ29uc3RhbnRNc3cgPSAwO1xuXHQgICAgICAgICAgICB2YXIgcm91bmRDb25zdGFudExzdyA9IDA7XG5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA3OyBqKyspIHtcblx0ICAgICAgICAgICAgICAgIGlmIChMRlNSICYgMHgwMSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBiaXRQb3NpdGlvbiA9ICgxIDw8IGopIC0gMTtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoYml0UG9zaXRpb24gPCAzMikge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByb3VuZENvbnN0YW50THN3IF49IDEgPDwgYml0UG9zaXRpb247XG5cdCAgICAgICAgICAgICAgICAgICAgfSBlbHNlIC8qIGlmIChiaXRQb3NpdGlvbiA+PSAzMikgKi8ge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByb3VuZENvbnN0YW50TXN3IF49IDEgPDwgKGJpdFBvc2l0aW9uIC0gMzIpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gQ29tcHV0ZSBuZXh0IExGU1Jcblx0ICAgICAgICAgICAgICAgIGlmIChMRlNSICYgMHg4MCkge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIFByaW1pdGl2ZSBwb2x5bm9taWFsIG92ZXIgR0YoMik6IHheOCArIHheNiArIHheNSArIHheNCArIDFcblx0ICAgICAgICAgICAgICAgICAgICBMRlNSID0gKExGU1IgPDwgMSkgXiAweDcxO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBMRlNSIDw8PSAxO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgUk9VTkRfQ09OU1RBTlRTW2ldID0gWDY0V29yZC5jcmVhdGUocm91bmRDb25zdGFudE1zdywgcm91bmRDb25zdGFudExzdyk7XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLy8gUmV1c2FibGUgb2JqZWN0cyBmb3IgdGVtcG9yYXJ5IHZhbHVlc1xuXHQgICAgdmFyIFQgPSBbXTtcblx0ICAgIChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTsgaSsrKSB7XG5cdCAgICAgICAgICAgIFRbaV0gPSBYNjRXb3JkLmNyZWF0ZSgpO1xuXHQgICAgICAgIH1cblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU0hBLTMgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEEzID0gQ19hbGdvLlNIQTMgPSBIYXNoZXIuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gb3V0cHV0TGVuZ3RoXG5cdCAgICAgICAgICogICBUaGUgZGVzaXJlZCBudW1iZXIgb2YgYml0cyBpbiB0aGUgb3V0cHV0IGhhc2guXG5cdCAgICAgICAgICogICBPbmx5IHZhbHVlcyBwZXJtaXR0ZWQgYXJlOiAyMjQsIDI1NiwgMzg0LCA1MTIuXG5cdCAgICAgICAgICogICBEZWZhdWx0OiA1MTJcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjZmc6IEhhc2hlci5jZmcuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgb3V0cHV0TGVuZ3RoOiA1MTJcblx0ICAgICAgICB9KSxcblxuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuX3N0YXRlID0gW11cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBzdGF0ZVtpXSA9IG5ldyBYNjRXb3JkLmluaXQoKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHRoaXMuYmxvY2tTaXplID0gKDE2MDAgLSAyICogdGhpcy5jZmcub3V0cHV0TGVuZ3RoKSAvIDMyO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuX3N0YXRlO1xuXHQgICAgICAgICAgICB2YXIgbkJsb2NrU2l6ZUxhbmVzID0gdGhpcy5ibG9ja1NpemUgLyAyO1xuXG5cdCAgICAgICAgICAgIC8vIEFic29yYlxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5CbG9ja1NpemVMYW5lczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBNMmkgID0gTVtvZmZzZXQgKyAyICogaV07XG5cdCAgICAgICAgICAgICAgICB2YXIgTTJpMSA9IE1bb2Zmc2V0ICsgMiAqIGkgKyAxXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgICAgIE0yaSA9IChcblx0ICAgICAgICAgICAgICAgICAgICAoKChNMmkgPDwgOCkgIHwgKE0yaSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAoKChNMmkgPDwgMjQpIHwgKE0yaSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICAgICApO1xuXHQgICAgICAgICAgICAgICAgTTJpMSA9IChcblx0ICAgICAgICAgICAgICAgICAgICAoKChNMmkxIDw8IDgpICB8IChNMmkxID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE0yaTEgPDwgMjQpIHwgKE0yaTEgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICAgICAgKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gQWJzb3JiIG1lc3NhZ2UgaW50byBzdGF0ZVxuXHQgICAgICAgICAgICAgICAgdmFyIGxhbmUgPSBzdGF0ZVtpXTtcblx0ICAgICAgICAgICAgICAgIGxhbmUuaGlnaCBePSBNMmkxO1xuXHQgICAgICAgICAgICAgICAgbGFuZS5sb3cgIF49IE0yaTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFJvdW5kc1xuXHQgICAgICAgICAgICBmb3IgKHZhciByb3VuZCA9IDA7IHJvdW5kIDwgMjQ7IHJvdW5kKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFRoZXRhXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDU7IHgrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIE1peCBjb2x1bW4gbGFuZXNcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdE1zdyA9IDAsIHRMc3cgPSAwO1xuXHQgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgNTsgeSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYW5lID0gc3RhdGVbeCArIDUgKiB5XTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdE1zdyBePSBsYW5lLmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRMc3cgXj0gbGFuZS5sb3c7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gVGVtcG9yYXJ5IHZhbHVlc1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBUeCA9IFRbeF07XG5cdCAgICAgICAgICAgICAgICAgICAgVHguaGlnaCA9IHRNc3c7XG5cdCAgICAgICAgICAgICAgICAgICAgVHgubG93ICA9IHRMc3c7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDU7IHgrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBUeDQgPSBUWyh4ICsgNCkgJSA1XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgVHgxID0gVFsoeCArIDEpICUgNV07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFR4MU1zdyA9IFR4MS5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBUeDFMc3cgPSBUeDEubG93O1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gTWl4IHN1cnJvdW5kaW5nIGNvbHVtbnNcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdE1zdyA9IFR4NC5oaWdoIF4gKChUeDFNc3cgPDwgMSkgfCAoVHgxTHN3ID4+PiAzMSkpO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0THN3ID0gVHg0LmxvdyAgXiAoKFR4MUxzdyA8PCAxKSB8IChUeDFNc3cgPj4+IDMxKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCA1OyB5KyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmUgPSBzdGF0ZVt4ICsgNSAqIHldO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBsYW5lLmhpZ2ggXj0gdE1zdztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbGFuZS5sb3cgIF49IHRMc3c7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBSaG8gUGlcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGxhbmVJbmRleCA9IDE7IGxhbmVJbmRleCA8IDI1OyBsYW5lSW5kZXgrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0TXN3O1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0THN3O1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmUgPSBzdGF0ZVtsYW5lSW5kZXhdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBsYW5lTXN3ID0gbGFuZS5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBsYW5lTHN3ID0gbGFuZS5sb3c7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHJob09mZnNldCA9IFJIT19PRkZTRVRTW2xhbmVJbmRleF07XG5cblx0ICAgICAgICAgICAgICAgICAgICAvLyBSb3RhdGUgbGFuZXNcblx0ICAgICAgICAgICAgICAgICAgICBpZiAocmhvT2Zmc2V0IDwgMzIpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdE1zdyA9IChsYW5lTXN3IDw8IHJob09mZnNldCkgfCAobGFuZUxzdyA+Pj4gKDMyIC0gcmhvT2Zmc2V0KSk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRMc3cgPSAobGFuZUxzdyA8PCByaG9PZmZzZXQpIHwgKGxhbmVNc3cgPj4+ICgzMiAtIHJob09mZnNldCkpO1xuXHQgICAgICAgICAgICAgICAgICAgIH0gZWxzZSAvKiBpZiAocmhvT2Zmc2V0ID49IDMyKSAqLyB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRNc3cgPSAobGFuZUxzdyA8PCAocmhvT2Zmc2V0IC0gMzIpKSB8IChsYW5lTXN3ID4+PiAoNjQgLSByaG9PZmZzZXQpKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdExzdyA9IChsYW5lTXN3IDw8IChyaG9PZmZzZXQgLSAzMikpIHwgKGxhbmVMc3cgPj4+ICg2NCAtIHJob09mZnNldCkpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgICAgIC8vIFRyYW5zcG9zZSBsYW5lc1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBUUGlMYW5lID0gVFtQSV9JTkRFWEVTW2xhbmVJbmRleF1dO1xuXHQgICAgICAgICAgICAgICAgICAgIFRQaUxhbmUuaGlnaCA9IHRNc3c7XG5cdCAgICAgICAgICAgICAgICAgICAgVFBpTGFuZS5sb3cgID0gdExzdztcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gUmhvIHBpIGF0IHggPSB5ID0gMFxuXHQgICAgICAgICAgICAgICAgdmFyIFQwID0gVFswXTtcblx0ICAgICAgICAgICAgICAgIHZhciBzdGF0ZTAgPSBzdGF0ZVswXTtcblx0ICAgICAgICAgICAgICAgIFQwLmhpZ2ggPSBzdGF0ZTAuaGlnaDtcblx0ICAgICAgICAgICAgICAgIFQwLmxvdyAgPSBzdGF0ZTAubG93O1xuXG5cdCAgICAgICAgICAgICAgICAvLyBDaGlcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgNTsgeCsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCA1OyB5KyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYW5lSW5kZXggPSB4ICsgNSAqIHk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYW5lID0gc3RhdGVbbGFuZUluZGV4XTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFRMYW5lID0gVFtsYW5lSW5kZXhdO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YXIgVHgxTGFuZSA9IFRbKCh4ICsgMSkgJSA1KSArIDUgKiB5XTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFR4MkxhbmUgPSBUWygoeCArIDIpICUgNSkgKyA1ICogeV07XG5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWl4IHJvd3Ncblx0ICAgICAgICAgICAgICAgICAgICAgICAgbGFuZS5oaWdoID0gVExhbmUuaGlnaCBeICh+VHgxTGFuZS5oaWdoICYgVHgyTGFuZS5oaWdoKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbGFuZS5sb3cgID0gVExhbmUubG93ICBeICh+VHgxTGFuZS5sb3cgICYgVHgyTGFuZS5sb3cpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gSW90YVxuXHQgICAgICAgICAgICAgICAgdmFyIGxhbmUgPSBzdGF0ZVswXTtcblx0ICAgICAgICAgICAgICAgIHZhciByb3VuZENvbnN0YW50ID0gUk9VTkRfQ09OU1RBTlRTW3JvdW5kXTtcblx0ICAgICAgICAgICAgICAgIGxhbmUuaGlnaCBePSByb3VuZENvbnN0YW50LmhpZ2g7XG5cdCAgICAgICAgICAgICAgICBsYW5lLmxvdyAgXj0gcm91bmRDb25zdGFudC5sb3c7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsID0gdGhpcy5fbkRhdGFCeXRlcyAqIDg7XG5cdCAgICAgICAgICAgIHZhciBuQml0c0xlZnQgPSBkYXRhLnNpZ0J5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZUJpdHMgPSB0aGlzLmJsb2NrU2l6ZSAqIDMyO1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4MSA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKE1hdGguY2VpbCgobkJpdHNMZWZ0ICsgMSkgLyBibG9ja1NpemVCaXRzKSAqIGJsb2NrU2l6ZUJpdHMpID4+PiA1KSAtIDFdIHw9IDB4ODA7XG5cdCAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgPSBkYXRhV29yZHMubGVuZ3RoICogNDtcblxuXHQgICAgICAgICAgICAvLyBIYXNoIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuX3N0YXRlO1xuXHQgICAgICAgICAgICB2YXIgb3V0cHV0TGVuZ3RoQnl0ZXMgPSB0aGlzLmNmZy5vdXRwdXRMZW5ndGggLyA4O1xuXHQgICAgICAgICAgICB2YXIgb3V0cHV0TGVuZ3RoTGFuZXMgPSBvdXRwdXRMZW5ndGhCeXRlcyAvIDg7XG5cblx0ICAgICAgICAgICAgLy8gU3F1ZWV6ZVxuXHQgICAgICAgICAgICB2YXIgaGFzaFdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3V0cHV0TGVuZ3RoTGFuZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICB2YXIgbGFuZSA9IHN0YXRlW2ldO1xuXHQgICAgICAgICAgICAgICAgdmFyIGxhbmVNc3cgPSBsYW5lLmhpZ2g7XG5cdCAgICAgICAgICAgICAgICB2YXIgbGFuZUxzdyA9IGxhbmUubG93O1xuXG5cdCAgICAgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICAgICAgbGFuZU1zdyA9IChcblx0ICAgICAgICAgICAgICAgICAgICAoKChsYW5lTXN3IDw8IDgpICB8IChsYW5lTXN3ID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICgoKGxhbmVNc3cgPDwgMjQpIHwgKGxhbmVNc3cgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICAgICAgKTtcblx0ICAgICAgICAgICAgICAgIGxhbmVMc3cgPSAoXG5cdCAgICAgICAgICAgICAgICAgICAgKCgobGFuZUxzdyA8PCA4KSAgfCAobGFuZUxzdyA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAoKChsYW5lTHN3IDw8IDI0KSB8IChsYW5lTHN3ID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgICAgICk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFNxdWVlemUgc3RhdGUgdG8gcmV0cmlldmUgaGFzaFxuXHQgICAgICAgICAgICAgICAgaGFzaFdvcmRzLnB1c2gobGFuZUxzdyk7XG5cdCAgICAgICAgICAgICAgICBoYXNoV29yZHMucHVzaChsYW5lTXN3KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQoaGFzaFdvcmRzLCBvdXRwdXRMZW5ndGhCeXRlcyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEhhc2hlci5jbG9uZS5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIHZhciBzdGF0ZSA9IGNsb25lLl9zdGF0ZSA9IHRoaXMuX3N0YXRlLnNsaWNlKDApO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHN0YXRlW2ldID0gc3RhdGVbaV0uY2xvbmUoKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTMoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTMod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEEzID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoU0hBMyk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjU0hBMyhtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEEzID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKFNIQTMpO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEEzO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQvKiogQHByZXNlcnZlXG5cdChjKSAyMDEyIGJ5IEPDqWRyaWMgTWVzbmlsLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5cdFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuXHQgICAgLSBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG5cdCAgICAtIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuXHRUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG5cdCovXG5cblx0KGZ1bmN0aW9uIChNYXRoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gQ29uc3RhbnRzIHRhYmxlXG5cdCAgICB2YXIgX3psID0gV29yZEFycmF5LmNyZWF0ZShbXG5cdCAgICAgICAgMCwgIDEsICAyLCAgMywgIDQsICA1LCAgNiwgIDcsICA4LCAgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSxcblx0ICAgICAgICA3LCAgNCwgMTMsICAxLCAxMCwgIDYsIDE1LCAgMywgMTIsICAwLCAgOSwgIDUsICAyLCAxNCwgMTEsICA4LFxuXHQgICAgICAgIDMsIDEwLCAxNCwgIDQsICA5LCAxNSwgIDgsICAxLCAgMiwgIDcsICAwLCAgNiwgMTMsIDExLCAgNSwgMTIsXG5cdCAgICAgICAgMSwgIDksIDExLCAxMCwgIDAsICA4LCAxMiwgIDQsIDEzLCAgMywgIDcsIDE1LCAxNCwgIDUsICA2LCAgMixcblx0ICAgICAgICA0LCAgMCwgIDUsICA5LCAgNywgMTIsICAyLCAxMCwgMTQsICAxLCAgMywgIDgsIDExLCAgNiwgMTUsIDEzXSk7XG5cdCAgICB2YXIgX3pyID0gV29yZEFycmF5LmNyZWF0ZShbXG5cdCAgICAgICAgNSwgMTQsICA3LCAgMCwgIDksICAyLCAxMSwgIDQsIDEzLCAgNiwgMTUsICA4LCAgMSwgMTAsICAzLCAxMixcblx0ICAgICAgICA2LCAxMSwgIDMsICA3LCAgMCwgMTMsICA1LCAxMCwgMTQsIDE1LCAgOCwgMTIsICA0LCAgOSwgIDEsICAyLFxuXHQgICAgICAgIDE1LCAgNSwgIDEsICAzLCAgNywgMTQsICA2LCAgOSwgMTEsICA4LCAxMiwgIDIsIDEwLCAgMCwgIDQsIDEzLFxuXHQgICAgICAgIDgsICA2LCAgNCwgIDEsICAzLCAxMSwgMTUsICAwLCAgNSwgMTIsICAyLCAxMywgIDksICA3LCAxMCwgMTQsXG5cdCAgICAgICAgMTIsIDE1LCAxMCwgIDQsICAxLCAgNSwgIDgsICA3LCAgNiwgIDIsIDEzLCAxNCwgIDAsICAzLCAgOSwgMTFdKTtcblx0ICAgIHZhciBfc2wgPSBXb3JkQXJyYXkuY3JlYXRlKFtcblx0ICAgICAgICAgMTEsIDE0LCAxNSwgMTIsICA1LCAgOCwgIDcsICA5LCAxMSwgMTMsIDE0LCAxNSwgIDYsICA3LCAgOSwgIDgsXG5cdCAgICAgICAgNywgNiwgICA4LCAxMywgMTEsICA5LCAgNywgMTUsICA3LCAxMiwgMTUsICA5LCAxMSwgIDcsIDEzLCAxMixcblx0ICAgICAgICAxMSwgMTMsICA2LCAgNywgMTQsICA5LCAxMywgMTUsIDE0LCAgOCwgMTMsICA2LCAgNSwgMTIsICA3LCAgNSxcblx0ICAgICAgICAgIDExLCAxMiwgMTQsIDE1LCAxNCwgMTUsICA5LCAgOCwgIDksIDE0LCAgNSwgIDYsICA4LCAgNiwgIDUsIDEyLFxuXHQgICAgICAgIDksIDE1LCAgNSwgMTEsICA2LCAgOCwgMTMsIDEyLCAgNSwgMTIsIDEzLCAxNCwgMTEsICA4LCAgNSwgIDYgXSk7XG5cdCAgICB2YXIgX3NyID0gV29yZEFycmF5LmNyZWF0ZShbXG5cdCAgICAgICAgOCwgIDksICA5LCAxMSwgMTMsIDE1LCAxNSwgIDUsICA3LCAgNywgIDgsIDExLCAxNCwgMTQsIDEyLCAgNixcblx0ICAgICAgICA5LCAxMywgMTUsICA3LCAxMiwgIDgsICA5LCAxMSwgIDcsICA3LCAxMiwgIDcsICA2LCAxNSwgMTMsIDExLFxuXHQgICAgICAgIDksICA3LCAxNSwgMTEsICA4LCAgNiwgIDYsIDE0LCAxMiwgMTMsICA1LCAxNCwgMTMsIDEzLCAgNywgIDUsXG5cdCAgICAgICAgMTUsICA1LCAgOCwgMTEsIDE0LCAxNCwgIDYsIDE0LCAgNiwgIDksIDEyLCAgOSwgMTIsICA1LCAxNSwgIDgsXG5cdCAgICAgICAgOCwgIDUsIDEyLCAgOSwgMTIsICA1LCAxNCwgIDYsICA4LCAxMywgIDYsICA1LCAxNSwgMTMsIDExLCAxMSBdKTtcblxuXHQgICAgdmFyIF9obCA9ICBXb3JkQXJyYXkuY3JlYXRlKFsgMHgwMDAwMDAwMCwgMHg1QTgyNzk5OSwgMHg2RUQ5RUJBMSwgMHg4RjFCQkNEQywgMHhBOTUzRkQ0RV0pO1xuXHQgICAgdmFyIF9ociA9ICBXb3JkQXJyYXkuY3JlYXRlKFsgMHg1MEEyOEJFNiwgMHg1QzRERDEyNCwgMHg2RDcwM0VGMywgMHg3QTZENzZFOSwgMHgwMDAwMDAwMF0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFJJUEVNRDE2MCBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFJJUEVNRDE2MCA9IENfYWxnby5SSVBFTUQxNjAgPSBIYXNoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoICA9IFdvcmRBcnJheS5jcmVhdGUoWzB4Njc0NTIzMDEsIDB4RUZDREFCODksIDB4OThCQURDRkUsIDB4MTAzMjU0NzYsIDB4QzNEMkUxRjBdKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cblx0ICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBvZmZzZXRfaSA9IG9mZnNldCArIGk7XG5cdCAgICAgICAgICAgICAgICB2YXIgTV9vZmZzZXRfaSA9IE1bb2Zmc2V0X2ldO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBTd2FwXG5cdCAgICAgICAgICAgICAgICBNW29mZnNldF9pXSA9IChcblx0ICAgICAgICAgICAgICAgICAgICAoKChNX29mZnNldF9pIDw8IDgpICB8IChNX29mZnNldF9pID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE1fb2Zmc2V0X2kgPDwgMjQpIHwgKE1fb2Zmc2V0X2kgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICAgICAgKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgSCAgPSB0aGlzLl9oYXNoLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgaGwgPSBfaGwud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBociA9IF9oci53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHpsID0gX3psLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgenIgPSBfenIud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzbCA9IF9zbC53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNyID0gX3NyLndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFdvcmtpbmcgdmFyaWFibGVzXG5cdCAgICAgICAgICAgIHZhciBhbCwgYmwsIGNsLCBkbCwgZWw7XG5cdCAgICAgICAgICAgIHZhciBhciwgYnIsIGNyLCBkciwgZXI7XG5cblx0ICAgICAgICAgICAgYXIgPSBhbCA9IEhbMF07XG5cdCAgICAgICAgICAgIGJyID0gYmwgPSBIWzFdO1xuXHQgICAgICAgICAgICBjciA9IGNsID0gSFsyXTtcblx0ICAgICAgICAgICAgZHIgPSBkbCA9IEhbM107XG5cdCAgICAgICAgICAgIGVyID0gZWwgPSBIWzRdO1xuXHQgICAgICAgICAgICAvLyBDb21wdXRhdGlvblxuXHQgICAgICAgICAgICB2YXIgdDtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4MDsgaSArPSAxKSB7XG5cdCAgICAgICAgICAgICAgICB0ID0gKGFsICsgIE1bb2Zmc2V0K3psW2ldXSl8MDtcblx0ICAgICAgICAgICAgICAgIGlmIChpPDE2KXtcblx0XHQgICAgICAgICAgICB0ICs9ICBmMShibCxjbCxkbCkgKyBobFswXTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaTwzMikge1xuXHRcdCAgICAgICAgICAgIHQgKz0gIGYyKGJsLGNsLGRsKSArIGhsWzFdO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpPDQ4KSB7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjMoYmwsY2wsZGwpICsgaGxbMl07XG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGk8NjQpIHtcblx0XHQgICAgICAgICAgICB0ICs9ICBmNChibCxjbCxkbCkgKyBobFszXTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly8gaWYgKGk8ODApIHtcblx0XHQgICAgICAgICAgICB0ICs9ICBmNShibCxjbCxkbCkgKyBobFs0XTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHQgPSB0fDA7XG5cdCAgICAgICAgICAgICAgICB0ID0gIHJvdGwodCxzbFtpXSk7XG5cdCAgICAgICAgICAgICAgICB0ID0gKHQrZWwpfDA7XG5cdCAgICAgICAgICAgICAgICBhbCA9IGVsO1xuXHQgICAgICAgICAgICAgICAgZWwgPSBkbDtcblx0ICAgICAgICAgICAgICAgIGRsID0gcm90bChjbCwgMTApO1xuXHQgICAgICAgICAgICAgICAgY2wgPSBibDtcblx0ICAgICAgICAgICAgICAgIGJsID0gdDtcblxuXHQgICAgICAgICAgICAgICAgdCA9IChhciArIE1bb2Zmc2V0K3pyW2ldXSl8MDtcblx0ICAgICAgICAgICAgICAgIGlmIChpPDE2KXtcblx0XHQgICAgICAgICAgICB0ICs9ICBmNShicixjcixkcikgKyBoclswXTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaTwzMikge1xuXHRcdCAgICAgICAgICAgIHQgKz0gIGY0KGJyLGNyLGRyKSArIGhyWzFdO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpPDQ4KSB7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjMoYnIsY3IsZHIpICsgaHJbMl07XG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGk8NjQpIHtcblx0XHQgICAgICAgICAgICB0ICs9ICBmMihicixjcixkcikgKyBoclszXTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly8gaWYgKGk8ODApIHtcblx0XHQgICAgICAgICAgICB0ICs9ICBmMShicixjcixkcikgKyBocls0XTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHQgPSB0fDA7XG5cdCAgICAgICAgICAgICAgICB0ID0gIHJvdGwodCxzcltpXSkgO1xuXHQgICAgICAgICAgICAgICAgdCA9ICh0K2VyKXwwO1xuXHQgICAgICAgICAgICAgICAgYXIgPSBlcjtcblx0ICAgICAgICAgICAgICAgIGVyID0gZHI7XG5cdCAgICAgICAgICAgICAgICBkciA9IHJvdGwoY3IsIDEwKTtcblx0ICAgICAgICAgICAgICAgIGNyID0gYnI7XG5cdCAgICAgICAgICAgICAgICBiciA9IHQ7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcblx0ICAgICAgICAgICAgdCAgICA9IChIWzFdICsgY2wgKyBkcil8MDtcblx0ICAgICAgICAgICAgSFsxXSA9IChIWzJdICsgZGwgKyBlcil8MDtcblx0ICAgICAgICAgICAgSFsyXSA9IChIWzNdICsgZWwgKyBhcil8MDtcblx0ICAgICAgICAgICAgSFszXSA9IChIWzRdICsgYWwgKyBicil8MDtcblx0ICAgICAgICAgICAgSFs0XSA9IChIWzBdICsgYmwgKyBjcil8MDtcblx0ICAgICAgICAgICAgSFswXSA9ICB0O1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gKFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbCA8PCA4KSAgfCAobkJpdHNUb3RhbCA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWwgPDwgMjQpIHwgKG5CaXRzVG90YWwgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICApO1xuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gKGRhdGFXb3Jkcy5sZW5ndGggKyAxKSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IHRoaXMuX2hhc2g7XG5cdCAgICAgICAgICAgIHZhciBIID0gaGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgICAgIHZhciBIX2kgPSBIW2ldO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBTd2FwXG5cdCAgICAgICAgICAgICAgICBIW2ldID0gKCgoSF9pIDw8IDgpICB8IChIX2kgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgICAgKCgoSF9pIDw8IDI0KSB8IChIX2kgPj4+IDgpKSAgJiAweGZmMDBmZjAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cblx0ICAgIGZ1bmN0aW9uIGYxKHgsIHksIHopIHtcblx0ICAgICAgICByZXR1cm4gKCh4KSBeICh5KSBeICh6KSk7XG5cblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gZjIoeCwgeSwgeikge1xuXHQgICAgICAgIHJldHVybiAoKCh4KSYoeSkpIHwgKCh+eCkmKHopKSk7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIGYzKHgsIHksIHopIHtcblx0ICAgICAgICByZXR1cm4gKCgoeCkgfCAofih5KSkpIF4gKHopKTtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gZjQoeCwgeSwgeikge1xuXHQgICAgICAgIHJldHVybiAoKCh4KSAmICh6KSkgfCAoKHkpJih+KHopKSkpO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBmNSh4LCB5LCB6KSB7XG5cdCAgICAgICAgcmV0dXJuICgoeCkgXiAoKHkpIHwofih6KSkpKTtcblxuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiByb3RsKHgsbikge1xuXHQgICAgICAgIHJldHVybiAoeDw8bikgfCAoeD4+PigzMi1uKSk7XG5cdCAgICB9XG5cblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlJJUEVNRDE2MCgnbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuUklQRU1EMTYwKHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuUklQRU1EMTYwID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoUklQRU1EMTYwKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNSSVBFTUQxNjAobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjUklQRU1EMTYwID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKFJJUEVNRDE2MCk7XG5cdH0oTWF0aCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlJJUEVNRDE2MDtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIEJhc2UgPSBDX2xpYi5CYXNlO1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmM7XG5cdCAgICB2YXIgVXRmOCA9IENfZW5jLlV0Zjg7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEhNQUMgYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgSE1BQyA9IENfYWxnby5ITUFDID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBITUFDLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaCBhbGdvcml0aG0gdG8gdXNlLlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaG1hY0hhc2hlciA9IENyeXB0b0pTLmFsZ28uSE1BQy5jcmVhdGUoQ3J5cHRvSlMuYWxnby5TSEEyNTYsIGtleSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGhhc2hlciwga2V5KSB7XG5cdCAgICAgICAgICAgIC8vIEluaXQgaGFzaGVyXG5cdCAgICAgICAgICAgIGhhc2hlciA9IHRoaXMuX2hhc2hlciA9IG5ldyBoYXNoZXIuaW5pdCgpO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgc3RyaW5nIHRvIFdvcmRBcnJheSwgZWxzZSBhc3N1bWUgV29yZEFycmF5IGFscmVhZHlcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgIGtleSA9IFV0ZjgucGFyc2Uoa2V5KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgaGFzaGVyQmxvY2tTaXplID0gaGFzaGVyLmJsb2NrU2l6ZTtcblx0ICAgICAgICAgICAgdmFyIGhhc2hlckJsb2NrU2l6ZUJ5dGVzID0gaGFzaGVyQmxvY2tTaXplICogNDtcblxuXHQgICAgICAgICAgICAvLyBBbGxvdyBhcmJpdHJhcnkgbGVuZ3RoIGtleXNcblx0ICAgICAgICAgICAgaWYgKGtleS5zaWdCeXRlcyA+IGhhc2hlckJsb2NrU2l6ZUJ5dGVzKSB7XG5cdCAgICAgICAgICAgICAgICBrZXkgPSBoYXNoZXIuZmluYWxpemUoa2V5KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIENsYW1wIGV4Y2VzcyBiaXRzXG5cdCAgICAgICAgICAgIGtleS5jbGFtcCgpO1xuXG5cdCAgICAgICAgICAgIC8vIENsb25lIGtleSBmb3IgaW5uZXIgYW5kIG91dGVyIHBhZHNcblx0ICAgICAgICAgICAgdmFyIG9LZXkgPSB0aGlzLl9vS2V5ID0ga2V5LmNsb25lKCk7XG5cdCAgICAgICAgICAgIHZhciBpS2V5ID0gdGhpcy5faUtleSA9IGtleS5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgb0tleVdvcmRzID0gb0tleS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGlLZXlXb3JkcyA9IGlLZXkud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gWE9SIGtleXMgd2l0aCBwYWQgY29uc3RhbnRzXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFzaGVyQmxvY2tTaXplOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIG9LZXlXb3Jkc1tpXSBePSAweDVjNWM1YzVjO1xuXHQgICAgICAgICAgICAgICAgaUtleVdvcmRzW2ldIF49IDB4MzYzNjM2MzY7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgb0tleS5zaWdCeXRlcyA9IGlLZXkuc2lnQnl0ZXMgPSBoYXNoZXJCbG9ja1NpemVCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZXNldHMgdGhpcyBITUFDIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBobWFjSGFzaGVyLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGhhc2hlciA9IHRoaXMuX2hhc2hlcjtcblxuXHQgICAgICAgICAgICAvLyBSZXNldFxuXHQgICAgICAgICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgICAgaGFzaGVyLnVwZGF0ZSh0aGlzLl9pS2V5KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogVXBkYXRlcyB0aGlzIEhNQUMgd2l0aCBhIG1lc3NhZ2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgVGhlIG1lc3NhZ2UgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7SE1BQ30gVGhpcyBITUFDIGluc3RhbmNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBobWFjSGFzaGVyLnVwZGF0ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICBobWFjSGFzaGVyLnVwZGF0ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaGVyLnVwZGF0ZShtZXNzYWdlVXBkYXRlKTtcblxuXHQgICAgICAgICAgICAvLyBDaGFpbmFibGVcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEZpbmFsaXplcyB0aGUgSE1BQyBjb21wdXRhdGlvbi5cblx0ICAgICAgICAgKiBOb3RlIHRoYXQgdGhlIGZpbmFsaXplIG9wZXJhdGlvbiBpcyBlZmZlY3RpdmVseSBhIGRlc3RydWN0aXZlLCByZWFkLW9uY2Ugb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIChPcHRpb25hbCkgQSBmaW5hbCBtZXNzYWdlIHVwZGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBobWFjID0gaG1hY0hhc2hlci5maW5hbGl6ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgaG1hYyA9IGhtYWNIYXNoZXIuZmluYWxpemUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhtYWMgPSBobWFjSGFzaGVyLmZpbmFsaXplKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBoYXNoZXIgPSB0aGlzLl9oYXNoZXI7XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0ZSBITUFDXG5cdCAgICAgICAgICAgIHZhciBpbm5lckhhc2ggPSBoYXNoZXIuZmluYWxpemUobWVzc2FnZVVwZGF0ZSk7XG5cdCAgICAgICAgICAgIGhhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAgICB2YXIgaG1hYyA9IGhhc2hlci5maW5hbGl6ZSh0aGlzLl9vS2V5LmNsb25lKCkuY29uY2F0KGlubmVySGFzaCkpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBobWFjO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXHR9KCkpO1xuXG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vc2hhMjU2XCIpLCByZXF1aXJlKFwiLi9obWFjXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL3NoYTI1NlwiLCBcIi4vaG1hY1wiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIEJhc2UgPSBDX2xpYi5CYXNlO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cdCAgICB2YXIgU0hBMjU2ID0gQ19hbGdvLlNIQTI1Njtcblx0ICAgIHZhciBITUFDID0gQ19hbGdvLkhNQUM7XG5cblx0ICAgIC8qKlxuXHQgICAgICogUGFzc3dvcmQtQmFzZWQgS2V5IERlcml2YXRpb24gRnVuY3Rpb24gMiBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBQQktERjIgPSBDX2FsZ28uUEJLREYyID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBrZXlTaXplIFRoZSBrZXkgc2l6ZSBpbiB3b3JkcyB0byBnZW5lcmF0ZS4gRGVmYXVsdDogNCAoMTI4IGJpdHMpXG5cdCAgICAgICAgICogQHByb3BlcnR5IHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaGVyIHRvIHVzZS4gRGVmYXVsdDogU0hBMjU2XG5cdCAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGl0ZXJhdGlvbnMgVGhlIG51bWJlciBvZiBpdGVyYXRpb25zIHRvIHBlcmZvcm0uIERlZmF1bHQ6IDI1MDAwMFxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICBrZXlTaXplOiAxMjgvMzIsXG5cdCAgICAgICAgICAgIGhhc2hlcjogU0hBMjU2LFxuXHQgICAgICAgICAgICBpdGVyYXRpb25zOiAyNTAwMDBcblx0ICAgICAgICB9KSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBrZXkgZGVyaXZhdGlvbiBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhlIGRlcml2YXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBrZGYgPSBDcnlwdG9KUy5hbGdvLlBCS0RGMi5jcmVhdGUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGtkZiA9IENyeXB0b0pTLmFsZ28uUEJLREYyLmNyZWF0ZSh7IGtleVNpemU6IDggfSk7XG5cdCAgICAgICAgICogICAgIHZhciBrZGYgPSBDcnlwdG9KUy5hbGdvLlBCS0RGMi5jcmVhdGUoeyBrZXlTaXplOiA4LCBpdGVyYXRpb25zOiAxMDAwIH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29tcHV0ZXMgdGhlIFBhc3N3b3JkLUJhc2VkIEtleSBEZXJpdmF0aW9uIEZ1bmN0aW9uIDIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZC5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHNhbHQgQSBzYWx0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgZGVyaXZlZCBrZXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBrZXkgPSBrZGYuY29tcHV0ZShwYXNzd29yZCwgc2FsdCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY29tcHV0ZTogZnVuY3Rpb24gKHBhc3N3b3JkLCBzYWx0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBjZmcgPSB0aGlzLmNmZztcblxuXHQgICAgICAgICAgICAvLyBJbml0IEhNQUNcblx0ICAgICAgICAgICAgdmFyIGhtYWMgPSBITUFDLmNyZWF0ZShjZmcuaGFzaGVyLCBwYXNzd29yZCk7XG5cblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdmFyIGRlcml2ZWRLZXkgPSBXb3JkQXJyYXkuY3JlYXRlKCk7XG5cdCAgICAgICAgICAgIHZhciBibG9ja0luZGV4ID0gV29yZEFycmF5LmNyZWF0ZShbMHgwMDAwMDAwMV0pO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGVyaXZlZEtleVdvcmRzID0gZGVyaXZlZEtleS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGJsb2NrSW5kZXhXb3JkcyA9IGJsb2NrSW5kZXgud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBrZXlTaXplID0gY2ZnLmtleVNpemU7XG5cdCAgICAgICAgICAgIHZhciBpdGVyYXRpb25zID0gY2ZnLml0ZXJhdGlvbnM7XG5cblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUga2V5XG5cdCAgICAgICAgICAgIHdoaWxlIChkZXJpdmVkS2V5V29yZHMubGVuZ3RoIDwga2V5U2l6ZSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJsb2NrID0gaG1hYy51cGRhdGUoc2FsdCkuZmluYWxpemUoYmxvY2tJbmRleCk7XG5cdCAgICAgICAgICAgICAgICBobWFjLnJlc2V0KCk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIGJsb2NrV29yZHMgPSBibG9jay53b3Jkcztcblx0ICAgICAgICAgICAgICAgIHZhciBibG9ja1dvcmRzTGVuZ3RoID0gYmxvY2tXb3Jkcy5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEl0ZXJhdGlvbnNcblx0ICAgICAgICAgICAgICAgIHZhciBpbnRlcm1lZGlhdGUgPSBibG9jaztcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgaXRlcmF0aW9uczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaW50ZXJtZWRpYXRlID0gaG1hYy5maW5hbGl6ZShpbnRlcm1lZGlhdGUpO1xuXHQgICAgICAgICAgICAgICAgICAgIGhtYWMucmVzZXQoKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGludGVybWVkaWF0ZVdvcmRzID0gaW50ZXJtZWRpYXRlLndvcmRzO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gWE9SIGludGVybWVkaWF0ZSB3aXRoIGJsb2NrXG5cdCAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBibG9ja1dvcmRzTGVuZ3RoOyBqKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tXb3Jkc1tqXSBePSBpbnRlcm1lZGlhdGVXb3Jkc1tqXTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIGRlcml2ZWRLZXkuY29uY2F0KGJsb2NrKTtcblx0ICAgICAgICAgICAgICAgIGJsb2NrSW5kZXhXb3Jkc1swXSsrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGRlcml2ZWRLZXkuc2lnQnl0ZXMgPSBrZXlTaXplICogNDtcblxuXHQgICAgICAgICAgICByZXR1cm4gZGVyaXZlZEtleTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBDb21wdXRlcyB0aGUgUGFzc3dvcmQtQmFzZWQgS2V5IERlcml2YXRpb24gRnVuY3Rpb24gMi5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gc2FsdCBBIHNhbHQuXG5cdCAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgY29tcHV0YXRpb24uXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgZGVyaXZlZCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBrZXkgPSBDcnlwdG9KUy5QQktERjIocGFzc3dvcmQsIHNhbHQpO1xuXHQgICAgICogICAgIHZhciBrZXkgPSBDcnlwdG9KUy5QQktERjIocGFzc3dvcmQsIHNhbHQsIHsga2V5U2l6ZTogOCB9KTtcblx0ICAgICAqICAgICB2YXIga2V5ID0gQ3J5cHRvSlMuUEJLREYyKHBhc3N3b3JkLCBzYWx0LCB7IGtleVNpemU6IDgsIGl0ZXJhdGlvbnM6IDEwMDAgfSk7XG5cdCAgICAgKi9cblx0ICAgIEMuUEJLREYyID0gZnVuY3Rpb24gKHBhc3N3b3JkLCBzYWx0LCBjZmcpIHtcblx0ICAgICAgICByZXR1cm4gUEJLREYyLmNyZWF0ZShjZmcpLmNvbXB1dGUocGFzc3dvcmQsIHNhbHQpO1xuXHQgICAgfTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5QQktERjI7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vc2hhMVwiKSwgcmVxdWlyZShcIi4vaG1hY1wiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9zaGExXCIsIFwiLi9obWFjXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2U7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblx0ICAgIHZhciBNRDUgPSBDX2FsZ28uTUQ1O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFRoaXMga2V5IGRlcml2YXRpb24gZnVuY3Rpb24gaXMgbWVhbnQgdG8gY29uZm9ybSB3aXRoIEVWUF9CeXRlc1RvS2V5LlxuXHQgICAgICogd3d3Lm9wZW5zc2wub3JnL2RvY3MvY3J5cHRvL0VWUF9CeXRlc1RvS2V5Lmh0bWxcblx0ICAgICAqL1xuXHQgICAgdmFyIEV2cEtERiA9IENfYWxnby5FdnBLREYgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGtleVNpemUgVGhlIGtleSBzaXplIGluIHdvcmRzIHRvIGdlbmVyYXRlLiBEZWZhdWx0OiA0ICgxMjggYml0cylcblx0ICAgICAgICAgKiBAcHJvcGVydHkge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoIGFsZ29yaXRobSB0byB1c2UuIERlZmF1bHQ6IE1ENVxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpdGVyYXRpb25zIFRoZSBudW1iZXIgb2YgaXRlcmF0aW9ucyB0byBwZXJmb3JtLiBEZWZhdWx0OiAxXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgIGtleVNpemU6IDEyOC8zMixcblx0ICAgICAgICAgICAgaGFzaGVyOiBNRDUsXG5cdCAgICAgICAgICAgIGl0ZXJhdGlvbnM6IDFcblx0ICAgICAgICB9KSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBrZXkgZGVyaXZhdGlvbiBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhlIGRlcml2YXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBrZGYgPSBDcnlwdG9KUy5hbGdvLkV2cEtERi5jcmVhdGUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGtkZiA9IENyeXB0b0pTLmFsZ28uRXZwS0RGLmNyZWF0ZSh7IGtleVNpemU6IDggfSk7XG5cdCAgICAgICAgICogICAgIHZhciBrZGYgPSBDcnlwdG9KUy5hbGdvLkV2cEtERi5jcmVhdGUoeyBrZXlTaXplOiA4LCBpdGVyYXRpb25zOiAxMDAwIH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRGVyaXZlcyBhIGtleSBmcm9tIGEgcGFzc3dvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZC5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHNhbHQgQSBzYWx0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgZGVyaXZlZCBrZXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBrZXkgPSBrZGYuY29tcHV0ZShwYXNzd29yZCwgc2FsdCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY29tcHV0ZTogZnVuY3Rpb24gKHBhc3N3b3JkLCBzYWx0KSB7XG5cdCAgICAgICAgICAgIHZhciBibG9jaztcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgY2ZnID0gdGhpcy5jZmc7XG5cblx0ICAgICAgICAgICAgLy8gSW5pdCBoYXNoZXJcblx0ICAgICAgICAgICAgdmFyIGhhc2hlciA9IGNmZy5oYXNoZXIuY3JlYXRlKCk7XG5cblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdmFyIGRlcml2ZWRLZXkgPSBXb3JkQXJyYXkuY3JlYXRlKCk7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkZXJpdmVkS2V5V29yZHMgPSBkZXJpdmVkS2V5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIga2V5U2l6ZSA9IGNmZy5rZXlTaXplO1xuXHQgICAgICAgICAgICB2YXIgaXRlcmF0aW9ucyA9IGNmZy5pdGVyYXRpb25zO1xuXG5cdCAgICAgICAgICAgIC8vIEdlbmVyYXRlIGtleVxuXHQgICAgICAgICAgICB3aGlsZSAoZGVyaXZlZEtleVdvcmRzLmxlbmd0aCA8IGtleVNpemUpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChibG9jaykge1xuXHQgICAgICAgICAgICAgICAgICAgIGhhc2hlci51cGRhdGUoYmxvY2spO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYmxvY2sgPSBoYXNoZXIudXBkYXRlKHBhc3N3b3JkKS5maW5hbGl6ZShzYWx0KTtcblx0ICAgICAgICAgICAgICAgIGhhc2hlci5yZXNldCgpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBJdGVyYXRpb25zXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGl0ZXJhdGlvbnM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIGJsb2NrID0gaGFzaGVyLmZpbmFsaXplKGJsb2NrKTtcblx0ICAgICAgICAgICAgICAgICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgZGVyaXZlZEtleS5jb25jYXQoYmxvY2spO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGRlcml2ZWRLZXkuc2lnQnl0ZXMgPSBrZXlTaXplICogNDtcblxuXHQgICAgICAgICAgICByZXR1cm4gZGVyaXZlZEtleTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBEZXJpdmVzIGEga2V5IGZyb20gYSBwYXNzd29yZC5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gc2FsdCBBIHNhbHQuXG5cdCAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgY29tcHV0YXRpb24uXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgZGVyaXZlZCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBrZXkgPSBDcnlwdG9KUy5FdnBLREYocGFzc3dvcmQsIHNhbHQpO1xuXHQgICAgICogICAgIHZhciBrZXkgPSBDcnlwdG9KUy5FdnBLREYocGFzc3dvcmQsIHNhbHQsIHsga2V5U2l6ZTogOCB9KTtcblx0ICAgICAqICAgICB2YXIga2V5ID0gQ3J5cHRvSlMuRXZwS0RGKHBhc3N3b3JkLCBzYWx0LCB7IGtleVNpemU6IDgsIGl0ZXJhdGlvbnM6IDEwMDAgfSk7XG5cdCAgICAgKi9cblx0ICAgIEMuRXZwS0RGID0gZnVuY3Rpb24gKHBhc3N3b3JkLCBzYWx0LCBjZmcpIHtcblx0ICAgICAgICByZXR1cm4gRXZwS0RGLmNyZWF0ZShjZmcpLmNvbXB1dGUocGFzc3dvcmQsIHNhbHQpO1xuXHQgICAgfTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5FdnBLREY7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vZXZwa2RmXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2V2cGtkZlwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0LyoqXG5cdCAqIENpcGhlciBjb3JlIGNvbXBvbmVudHMuXG5cdCAqL1xuXHRDcnlwdG9KUy5saWIuQ2lwaGVyIHx8IChmdW5jdGlvbiAodW5kZWZpbmVkKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZTtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgQnVmZmVyZWRCbG9ja0FsZ29yaXRobSA9IENfbGliLkJ1ZmZlcmVkQmxvY2tBbGdvcml0aG07XG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYztcblx0ICAgIHZhciBVdGY4ID0gQ19lbmMuVXRmODtcblx0ICAgIHZhciBCYXNlNjQgPSBDX2VuYy5CYXNlNjQ7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXHQgICAgdmFyIEV2cEtERiA9IENfYWxnby5FdnBLREY7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgYmFzZSBjaXBoZXIgdGVtcGxhdGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGtleVNpemUgVGhpcyBjaXBoZXIncyBrZXkgc2l6ZS4gRGVmYXVsdDogNCAoMTI4IGJpdHMpXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gaXZTaXplIFRoaXMgY2lwaGVyJ3MgSVYgc2l6ZS4gRGVmYXVsdDogNCAoMTI4IGJpdHMpXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gX0VOQ19YRk9STV9NT0RFIEEgY29uc3RhbnQgcmVwcmVzZW50aW5nIGVuY3J5cHRpb24gbW9kZS5cblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfREVDX1hGT1JNX01PREUgQSBjb25zdGFudCByZXByZXNlbnRpbmcgZGVjcnlwdGlvbiBtb2RlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ2lwaGVyID0gQ19saWIuQ2lwaGVyID0gQnVmZmVyZWRCbG9ja0FsZ29yaXRobS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7V29yZEFycmF5fSBpdiBUaGUgSVYgdG8gdXNlIGZvciB0aGlzIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjZmc6IEJhc2UuZXh0ZW5kKCksXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIHRoaXMgY2lwaGVyIGluIGVuY3J5cHRpb24gbW9kZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSBrZXkgVGhlIGtleS5cblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q2lwaGVyfSBBIGNpcGhlciBpbnN0YW5jZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNpcGhlciA9IENyeXB0b0pTLmFsZ28uQUVTLmNyZWF0ZUVuY3J5cHRvcihrZXlXb3JkQXJyYXksIHsgaXY6IGl2V29yZEFycmF5IH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNyZWF0ZUVuY3J5cHRvcjogZnVuY3Rpb24gKGtleSwgY2ZnKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh0aGlzLl9FTkNfWEZPUk1fTU9ERSwga2V5LCBjZmcpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIHRoaXMgY2lwaGVyIGluIGRlY3J5cHRpb24gbW9kZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSBrZXkgVGhlIGtleS5cblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q2lwaGVyfSBBIGNpcGhlciBpbnN0YW5jZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNpcGhlciA9IENyeXB0b0pTLmFsZ28uQUVTLmNyZWF0ZURlY3J5cHRvcihrZXlXb3JkQXJyYXksIHsgaXY6IGl2V29yZEFycmF5IH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNyZWF0ZURlY3J5cHRvcjogZnVuY3Rpb24gKGtleSwgY2ZnKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh0aGlzLl9ERUNfWEZPUk1fTU9ERSwga2V5LCBjZmcpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgY2lwaGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHhmb3JtTW9kZSBFaXRoZXIgdGhlIGVuY3J5cHRpb24gb3IgZGVjcnlwdGlvbiB0cmFuc29ybWF0aW9uIG1vZGUgY29uc3RhbnQuXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IGtleSBUaGUga2V5LlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXIgPSBDcnlwdG9KUy5hbGdvLkFFUy5jcmVhdGUoQ3J5cHRvSlMuYWxnby5BRVMuX0VOQ19YRk9STV9NT0RFLCBrZXlXb3JkQXJyYXksIHsgaXY6IGl2V29yZEFycmF5IH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh4Zm9ybU1vZGUsIGtleSwgY2ZnKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGx5IGNvbmZpZyBkZWZhdWx0c1xuXHQgICAgICAgICAgICB0aGlzLmNmZyA9IHRoaXMuY2ZnLmV4dGVuZChjZmcpO1xuXG5cdCAgICAgICAgICAgIC8vIFN0b3JlIHRyYW5zZm9ybSBtb2RlIGFuZCBrZXlcblx0ICAgICAgICAgICAgdGhpcy5feGZvcm1Nb2RlID0geGZvcm1Nb2RlO1xuXHQgICAgICAgICAgICB0aGlzLl9rZXkgPSBrZXk7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgY2lwaGVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBjaXBoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBSZXNldCBkYXRhIGJ1ZmZlclxuXHQgICAgICAgICAgICBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0LmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1jaXBoZXIgbG9naWNcblx0ICAgICAgICAgICAgdGhpcy5fZG9SZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBBZGRzIGRhdGEgdG8gYmUgZW5jcnlwdGVkIG9yIGRlY3J5cHRlZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gZGF0YVVwZGF0ZSBUaGUgZGF0YSB0byBlbmNyeXB0IG9yIGRlY3J5cHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBkYXRhIGFmdGVyIHByb2Nlc3NpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBlbmNyeXB0ZWQgPSBjaXBoZXIucHJvY2VzcygnZGF0YScpO1xuXHQgICAgICAgICAqICAgICB2YXIgZW5jcnlwdGVkID0gY2lwaGVyLnByb2Nlc3Mod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwcm9jZXNzOiBmdW5jdGlvbiAoZGF0YVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBBcHBlbmRcblx0ICAgICAgICAgICAgdGhpcy5fYXBwZW5kKGRhdGFVcGRhdGUpO1xuXG5cdCAgICAgICAgICAgIC8vIFByb2Nlc3MgYXZhaWxhYmxlIGJsb2Nrc1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJvY2VzcygpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBGaW5hbGl6ZXMgdGhlIGVuY3J5cHRpb24gb3IgZGVjcnlwdGlvbiBwcm9jZXNzLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGRhdGFVcGRhdGUgVGhlIGZpbmFsIGRhdGEgdG8gZW5jcnlwdCBvciBkZWNyeXB0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgZGF0YSBhZnRlciBmaW5hbCBwcm9jZXNzaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgZW5jcnlwdGVkID0gY2lwaGVyLmZpbmFsaXplKCk7XG5cdCAgICAgICAgICogICAgIHZhciBlbmNyeXB0ZWQgPSBjaXBoZXIuZmluYWxpemUoJ2RhdGEnKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGVuY3J5cHRlZCA9IGNpcGhlci5maW5hbGl6ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbiAoZGF0YVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBGaW5hbCBkYXRhIHVwZGF0ZVxuXHQgICAgICAgICAgICBpZiAoZGF0YVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fYXBwZW5kKGRhdGFVcGRhdGUpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1jaXBoZXIgbG9naWNcblx0ICAgICAgICAgICAgdmFyIGZpbmFsUHJvY2Vzc2VkRGF0YSA9IHRoaXMuX2RvRmluYWxpemUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gZmluYWxQcm9jZXNzZWREYXRhO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBrZXlTaXplOiAxMjgvMzIsXG5cblx0ICAgICAgICBpdlNpemU6IDEyOC8zMixcblxuXHQgICAgICAgIF9FTkNfWEZPUk1fTU9ERTogMSxcblxuXHQgICAgICAgIF9ERUNfWEZPUk1fTU9ERTogMixcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgc2hvcnRjdXQgZnVuY3Rpb25zIHRvIGEgY2lwaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyfSBjaXBoZXIgVGhlIGNpcGhlciB0byBjcmVhdGUgYSBoZWxwZXIgZm9yLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCBlbmNyeXB0IGFuZCBkZWNyeXB0IHNob3J0Y3V0IGZ1bmN0aW9ucy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIEFFUyA9IENyeXB0b0pTLmxpYi5DaXBoZXIuX2NyZWF0ZUhlbHBlcihDcnlwdG9KUy5hbGdvLkFFUyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhlbHBlcjogKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q2lwaGVyU3RyYXRlZ3koa2V5KSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBQYXNzd29yZEJhc2VkQ2lwaGVyO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gU2VyaWFsaXphYmxlQ2lwaGVyO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjaXBoZXIpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZnVuY3Rpb24gKG1lc3NhZ2UsIGtleSwgY2ZnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RDaXBoZXJTdHJhdGVneShrZXkpLmVuY3J5cHQoY2lwaGVyLCBtZXNzYWdlLCBrZXksIGNmZyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAgICAgICAgIGRlY3J5cHQ6IGZ1bmN0aW9uIChjaXBoZXJ0ZXh0LCBrZXksIGNmZykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0Q2lwaGVyU3RyYXRlZ3koa2V5KS5kZWNyeXB0KGNpcGhlciwgY2lwaGVydGV4dCwga2V5LCBjZmcpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfSgpKVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgYmFzZSBzdHJlYW0gY2lwaGVyIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBibG9ja1NpemUgVGhlIG51bWJlciBvZiAzMi1iaXQgd29yZHMgdGhpcyBjaXBoZXIgb3BlcmF0ZXMgb24uIERlZmF1bHQ6IDEgKDMyIGJpdHMpXG5cdCAgICAgKi9cblx0ICAgIHZhciBTdHJlYW1DaXBoZXIgPSBDX2xpYi5TdHJlYW1DaXBoZXIgPSBDaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBQcm9jZXNzIHBhcnRpYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHZhciBmaW5hbFByb2Nlc3NlZEJsb2NrcyA9IHRoaXMuX3Byb2Nlc3MoISEnZmx1c2gnKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gZmluYWxQcm9jZXNzZWRCbG9ja3M7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogMVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogTW9kZSBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX21vZGUgPSBDLm1vZGUgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBYnN0cmFjdCBiYXNlIGJsb2NrIGNpcGhlciBtb2RlIHRlbXBsYXRlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQmxvY2tDaXBoZXJNb2RlID0gQ19saWIuQmxvY2tDaXBoZXJNb2RlID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgdGhpcyBtb2RlIGZvciBlbmNyeXB0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtDaXBoZXJ9IGNpcGhlciBBIGJsb2NrIGNpcGhlciBpbnN0YW5jZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBpdiBUaGUgSVYgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBtb2RlID0gQ3J5cHRvSlMubW9kZS5DQkMuY3JlYXRlRW5jcnlwdG9yKGNpcGhlciwgaXYud29yZHMpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNyZWF0ZUVuY3J5cHRvcjogZnVuY3Rpb24gKGNpcGhlciwgaXYpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuRW5jcnlwdG9yLmNyZWF0ZShjaXBoZXIsIGl2KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyB0aGlzIG1vZGUgZm9yIGRlY3J5cHRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlcn0gY2lwaGVyIEEgYmxvY2sgY2lwaGVyIGluc3RhbmNlLlxuXHQgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGl2IFRoZSBJViB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIG1vZGUgPSBDcnlwdG9KUy5tb2RlLkNCQy5jcmVhdGVEZWNyeXB0b3IoY2lwaGVyLCBpdi53b3Jkcyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY3JlYXRlRGVjcnlwdG9yOiBmdW5jdGlvbiAoY2lwaGVyLCBpdikge1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5EZWNyeXB0b3IuY3JlYXRlKGNpcGhlciwgaXYpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgbW9kZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyfSBjaXBoZXIgQSBibG9jayBjaXBoZXIgaW5zdGFuY2UuXG5cdCAgICAgICAgICogQHBhcmFtIHtBcnJheX0gaXYgVGhlIElWIHdvcmRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgbW9kZSA9IENyeXB0b0pTLm1vZGUuQ0JDLkVuY3J5cHRvci5jcmVhdGUoY2lwaGVyLCBpdi53b3Jkcyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGNpcGhlciwgaXYpIHtcblx0ICAgICAgICAgICAgdGhpcy5fY2lwaGVyID0gY2lwaGVyO1xuXHQgICAgICAgICAgICB0aGlzLl9pdiA9IGl2O1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIENpcGhlciBCbG9jayBDaGFpbmluZyBtb2RlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ0JDID0gQ19tb2RlLkNCQyA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWJzdHJhY3QgYmFzZSBDQkMgbW9kZS5cblx0ICAgICAgICAgKi9cblx0ICAgICAgICB2YXIgQ0JDID0gQmxvY2tDaXBoZXJNb2RlLmV4dGVuZCgpO1xuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ0JDIGVuY3J5cHRvci5cblx0ICAgICAgICAgKi9cblx0ICAgICAgICBDQkMuRW5jcnlwdG9yID0gQ0JDLmV4dGVuZCh7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBQcm9jZXNzZXMgdGhlIGRhdGEgYmxvY2sgYXQgb2Zmc2V0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB3b3JkcyBUaGUgZGF0YSB3b3JkcyB0byBvcGVyYXRlIG9uLlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgd2hlcmUgdGhlIGJsb2NrIHN0YXJ0cy5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIG1vZGUucHJvY2Vzc0Jsb2NrKGRhdGEud29yZHMsIG9mZnNldCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBwcm9jZXNzQmxvY2s6IGZ1bmN0aW9uICh3b3Jkcywgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBjaXBoZXIgPSB0aGlzLl9jaXBoZXI7XG5cdCAgICAgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gY2lwaGVyLmJsb2NrU2l6ZTtcblxuXHQgICAgICAgICAgICAgICAgLy8gWE9SIGFuZCBlbmNyeXB0XG5cdCAgICAgICAgICAgICAgICB4b3JCbG9jay5jYWxsKHRoaXMsIHdvcmRzLCBvZmZzZXQsIGJsb2NrU2l6ZSk7XG5cdCAgICAgICAgICAgICAgICBjaXBoZXIuZW5jcnlwdEJsb2NrKHdvcmRzLCBvZmZzZXQpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1lbWJlciB0aGlzIGJsb2NrIHRvIHVzZSB3aXRoIG5leHQgYmxvY2tcblx0ICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZCbG9jayA9IHdvcmRzLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgYmxvY2tTaXplKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0pO1xuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ0JDIGRlY3J5cHRvci5cblx0ICAgICAgICAgKi9cblx0ICAgICAgICBDQkMuRGVjcnlwdG9yID0gQ0JDLmV4dGVuZCh7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBQcm9jZXNzZXMgdGhlIGRhdGEgYmxvY2sgYXQgb2Zmc2V0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB3b3JkcyBUaGUgZGF0YSB3b3JkcyB0byBvcGVyYXRlIG9uLlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgd2hlcmUgdGhlIGJsb2NrIHN0YXJ0cy5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIG1vZGUucHJvY2Vzc0Jsb2NrKGRhdGEud29yZHMsIG9mZnNldCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBwcm9jZXNzQmxvY2s6IGZ1bmN0aW9uICh3b3Jkcywgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBjaXBoZXIgPSB0aGlzLl9jaXBoZXI7XG5cdCAgICAgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gY2lwaGVyLmJsb2NrU2l6ZTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhpcyBibG9jayB0byB1c2Ugd2l0aCBuZXh0IGJsb2NrXG5cdCAgICAgICAgICAgICAgICB2YXIgdGhpc0Jsb2NrID0gd29yZHMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBibG9ja1NpemUpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBEZWNyeXB0IGFuZCBYT1Jcblx0ICAgICAgICAgICAgICAgIGNpcGhlci5kZWNyeXB0QmxvY2sod29yZHMsIG9mZnNldCk7XG5cdCAgICAgICAgICAgICAgICB4b3JCbG9jay5jYWxsKHRoaXMsIHdvcmRzLCBvZmZzZXQsIGJsb2NrU2l6ZSk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFRoaXMgYmxvY2sgYmVjb21lcyB0aGUgcHJldmlvdXMgYmxvY2tcblx0ICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZCbG9jayA9IHRoaXNCbG9jaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0pO1xuXG5cdCAgICAgICAgZnVuY3Rpb24geG9yQmxvY2sod29yZHMsIG9mZnNldCwgYmxvY2tTaXplKSB7XG5cdCAgICAgICAgICAgIHZhciBibG9jaztcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgaXYgPSB0aGlzLl9pdjtcblxuXHQgICAgICAgICAgICAvLyBDaG9vc2UgbWl4aW5nIGJsb2NrXG5cdCAgICAgICAgICAgIGlmIChpdikge1xuXHQgICAgICAgICAgICAgICAgYmxvY2sgPSBpdjtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIElWIGZvciBzdWJzZXF1ZW50IGJsb2Nrc1xuXHQgICAgICAgICAgICAgICAgdGhpcy5faXYgPSB1bmRlZmluZWQ7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBibG9jayA9IHRoaXMuX3ByZXZCbG9jaztcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFhPUiBibG9ja3Ncblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBibG9ja1NpemU7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbb2Zmc2V0ICsgaV0gXj0gYmxvY2tbaV07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICByZXR1cm4gQ0JDO1xuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBQYWRkaW5nIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfcGFkID0gQy5wYWQgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBQS0NTICM1LzcgcGFkZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFBrY3M3ID0gQ19wYWQuUGtjczcgPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUGFkcyBkYXRhIHVzaW5nIHRoZSBhbGdvcml0aG0gZGVmaW5lZCBpbiBQS0NTICM1LzcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gZGF0YSBUaGUgZGF0YSB0byBwYWQuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGJsb2NrU2l6ZSBUaGUgbXVsdGlwbGUgdGhhdCB0aGUgZGF0YSBzaG91bGQgYmUgcGFkZGVkIHRvLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBDcnlwdG9KUy5wYWQuUGtjczcucGFkKHdvcmRBcnJheSwgNCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFkOiBmdW5jdGlvbiAoZGF0YSwgYmxvY2tTaXplKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgcGFkZGluZyBieXRlc1xuXHQgICAgICAgICAgICB2YXIgblBhZGRpbmdCeXRlcyA9IGJsb2NrU2l6ZUJ5dGVzIC0gZGF0YS5zaWdCeXRlcyAlIGJsb2NrU2l6ZUJ5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENyZWF0ZSBwYWRkaW5nIHdvcmRcblx0ICAgICAgICAgICAgdmFyIHBhZGRpbmdXb3JkID0gKG5QYWRkaW5nQnl0ZXMgPDwgMjQpIHwgKG5QYWRkaW5nQnl0ZXMgPDwgMTYpIHwgKG5QYWRkaW5nQnl0ZXMgPDwgOCkgfCBuUGFkZGluZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENyZWF0ZSBwYWRkaW5nXG5cdCAgICAgICAgICAgIHZhciBwYWRkaW5nV29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuUGFkZGluZ0J5dGVzOyBpICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgIHBhZGRpbmdXb3Jkcy5wdXNoKHBhZGRpbmdXb3JkKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgcGFkZGluZyA9IFdvcmRBcnJheS5jcmVhdGUocGFkZGluZ1dvcmRzLCBuUGFkZGluZ0J5dGVzKTtcblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICBkYXRhLmNvbmNhdChwYWRkaW5nKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogVW5wYWRzIGRhdGEgdGhhdCBoYWQgYmVlbiBwYWRkZWQgdXNpbmcgdGhlIGFsZ29yaXRobSBkZWZpbmVkIGluIFBLQ1MgIzUvNy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSBkYXRhIFRoZSBkYXRhIHRvIHVucGFkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBDcnlwdG9KUy5wYWQuUGtjczcudW5wYWQod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB1bnBhZDogZnVuY3Rpb24gKGRhdGEpIHtcblx0ICAgICAgICAgICAgLy8gR2V0IG51bWJlciBvZiBwYWRkaW5nIGJ5dGVzIGZyb20gbGFzdCBieXRlXG5cdCAgICAgICAgICAgIHZhciBuUGFkZGluZ0J5dGVzID0gZGF0YS53b3Jkc1soZGF0YS5zaWdCeXRlcyAtIDEpID4+PiAyXSAmIDB4ZmY7XG5cblx0ICAgICAgICAgICAgLy8gUmVtb3ZlIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyAtPSBuUGFkZGluZ0J5dGVzO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgYmFzZSBibG9jayBjaXBoZXIgdGVtcGxhdGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGJsb2NrU2l6ZSBUaGUgbnVtYmVyIG9mIDMyLWJpdCB3b3JkcyB0aGlzIGNpcGhlciBvcGVyYXRlcyBvbi4gRGVmYXVsdDogNCAoMTI4IGJpdHMpXG5cdCAgICAgKi9cblx0ICAgIHZhciBCbG9ja0NpcGhlciA9IENfbGliLkJsb2NrQ2lwaGVyID0gQ2lwaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHByb3BlcnR5IHtNb2RlfSBtb2RlIFRoZSBibG9jayBtb2RlIHRvIHVzZS4gRGVmYXVsdDogQ0JDXG5cdCAgICAgICAgICogQHByb3BlcnR5IHtQYWRkaW5nfSBwYWRkaW5nIFRoZSBwYWRkaW5nIHN0cmF0ZWd5IHRvIHVzZS4gRGVmYXVsdDogUGtjczdcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjZmc6IENpcGhlci5jZmcuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgbW9kZTogQ0JDLFxuXHQgICAgICAgICAgICBwYWRkaW5nOiBQa2NzN1xuXHQgICAgICAgIH0pLFxuXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIG1vZGVDcmVhdG9yO1xuXG5cdCAgICAgICAgICAgIC8vIFJlc2V0IGNpcGhlclxuXHQgICAgICAgICAgICBDaXBoZXIucmVzZXQuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGNmZyA9IHRoaXMuY2ZnO1xuXHQgICAgICAgICAgICB2YXIgaXYgPSBjZmcuaXY7XG5cdCAgICAgICAgICAgIHZhciBtb2RlID0gY2ZnLm1vZGU7XG5cblx0ICAgICAgICAgICAgLy8gUmVzZXQgYmxvY2sgbW9kZVxuXHQgICAgICAgICAgICBpZiAodGhpcy5feGZvcm1Nb2RlID09IHRoaXMuX0VOQ19YRk9STV9NT0RFKSB7XG5cdCAgICAgICAgICAgICAgICBtb2RlQ3JlYXRvciA9IG1vZGUuY3JlYXRlRW5jcnlwdG9yO1xuXHQgICAgICAgICAgICB9IGVsc2UgLyogaWYgKHRoaXMuX3hmb3JtTW9kZSA9PSB0aGlzLl9ERUNfWEZPUk1fTU9ERSkgKi8ge1xuXHQgICAgICAgICAgICAgICAgbW9kZUNyZWF0b3IgPSBtb2RlLmNyZWF0ZURlY3J5cHRvcjtcblx0ICAgICAgICAgICAgICAgIC8vIEtlZXAgYXQgbGVhc3Qgb25lIGJsb2NrIGluIHRoZSBidWZmZXIgZm9yIHVucGFkZGluZ1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fbWluQnVmZmVyU2l6ZSA9IDE7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBpZiAodGhpcy5fbW9kZSAmJiB0aGlzLl9tb2RlLl9fY3JlYXRvciA9PSBtb2RlQ3JlYXRvcikge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fbW9kZS5pbml0KHRoaXMsIGl2ICYmIGl2LndvcmRzKTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX21vZGUgPSBtb2RlQ3JlYXRvci5jYWxsKG1vZGUsIHRoaXMsIGl2ICYmIGl2LndvcmRzKTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX21vZGUuX19jcmVhdG9yID0gbW9kZUNyZWF0b3I7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAod29yZHMsIG9mZnNldCkge1xuXHQgICAgICAgICAgICB0aGlzLl9tb2RlLnByb2Nlc3NCbG9jayh3b3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGZpbmFsUHJvY2Vzc2VkQmxvY2tzO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBwYWRkaW5nID0gdGhpcy5jZmcucGFkZGluZztcblxuXHQgICAgICAgICAgICAvLyBGaW5hbGl6ZVxuXHQgICAgICAgICAgICBpZiAodGhpcy5feGZvcm1Nb2RlID09IHRoaXMuX0VOQ19YRk9STV9NT0RFKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBQYWQgZGF0YVxuXHQgICAgICAgICAgICAgICAgcGFkZGluZy5wYWQodGhpcy5fZGF0YSwgdGhpcy5ibG9ja1NpemUpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICAgICAgZmluYWxQcm9jZXNzZWRCbG9ja3MgPSB0aGlzLl9wcm9jZXNzKCEhJ2ZsdXNoJyk7XG5cdCAgICAgICAgICAgIH0gZWxzZSAvKiBpZiAodGhpcy5feGZvcm1Nb2RlID09IHRoaXMuX0RFQ19YRk9STV9NT0RFKSAqLyB7XG5cdCAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICAgICAgZmluYWxQcm9jZXNzZWRCbG9ja3MgPSB0aGlzLl9wcm9jZXNzKCEhJ2ZsdXNoJyk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFVucGFkIGRhdGFcblx0ICAgICAgICAgICAgICAgIHBhZGRpbmcudW5wYWQoZmluYWxQcm9jZXNzZWRCbG9ja3MpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGZpbmFsUHJvY2Vzc2VkQmxvY2tzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDEyOC8zMlxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQSBjb2xsZWN0aW9uIG9mIGNpcGhlciBwYXJhbWV0ZXJzLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7V29yZEFycmF5fSBjaXBoZXJ0ZXh0IFRoZSByYXcgY2lwaGVydGV4dC5cblx0ICAgICAqIEBwcm9wZXJ0eSB7V29yZEFycmF5fSBrZXkgVGhlIGtleSB0byB0aGlzIGNpcGhlcnRleHQuXG5cdCAgICAgKiBAcHJvcGVydHkge1dvcmRBcnJheX0gaXYgVGhlIElWIHVzZWQgaW4gdGhlIGNpcGhlcmluZyBvcGVyYXRpb24uXG5cdCAgICAgKiBAcHJvcGVydHkge1dvcmRBcnJheX0gc2FsdCBUaGUgc2FsdCB1c2VkIHdpdGggYSBrZXkgZGVyaXZhdGlvbiBmdW5jdGlvbi5cblx0ICAgICAqIEBwcm9wZXJ0eSB7Q2lwaGVyfSBhbGdvcml0aG0gVGhlIGNpcGhlciBhbGdvcml0aG0uXG5cdCAgICAgKiBAcHJvcGVydHkge01vZGV9IG1vZGUgVGhlIGJsb2NrIG1vZGUgdXNlZCBpbiB0aGUgY2lwaGVyaW5nIG9wZXJhdGlvbi5cblx0ICAgICAqIEBwcm9wZXJ0eSB7UGFkZGluZ30gcGFkZGluZyBUaGUgcGFkZGluZyBzY2hlbWUgdXNlZCBpbiB0aGUgY2lwaGVyaW5nIG9wZXJhdGlvbi5cblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBibG9ja1NpemUgVGhlIGJsb2NrIHNpemUgb2YgdGhlIGNpcGhlci5cblx0ICAgICAqIEBwcm9wZXJ0eSB7Rm9ybWF0fSBmb3JtYXR0ZXIgVGhlIGRlZmF1bHQgZm9ybWF0dGluZyBzdHJhdGVneSB0byBjb252ZXJ0IHRoaXMgY2lwaGVyIHBhcmFtcyBvYmplY3QgdG8gYSBzdHJpbmcuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDaXBoZXJQYXJhbXMgPSBDX2xpYi5DaXBoZXJQYXJhbXMgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNpcGhlclBhcmFtcyBBbiBvYmplY3Qgd2l0aCBhbnkgb2YgdGhlIHBvc3NpYmxlIGNpcGhlciBwYXJhbWV0ZXJzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2lwaGVyUGFyYW1zID0gQ3J5cHRvSlMubGliLkNpcGhlclBhcmFtcy5jcmVhdGUoe1xuXHQgICAgICAgICAqICAgICAgICAgY2lwaGVydGV4dDogY2lwaGVydGV4dFdvcmRBcnJheSxcblx0ICAgICAgICAgKiAgICAgICAgIGtleToga2V5V29yZEFycmF5LFxuXHQgICAgICAgICAqICAgICAgICAgaXY6IGl2V29yZEFycmF5LFxuXHQgICAgICAgICAqICAgICAgICAgc2FsdDogc2FsdFdvcmRBcnJheSxcblx0ICAgICAgICAgKiAgICAgICAgIGFsZ29yaXRobTogQ3J5cHRvSlMuYWxnby5BRVMsXG5cdCAgICAgICAgICogICAgICAgICBtb2RlOiBDcnlwdG9KUy5tb2RlLkNCQyxcblx0ICAgICAgICAgKiAgICAgICAgIHBhZGRpbmc6IENyeXB0b0pTLnBhZC5QS0NTNyxcblx0ICAgICAgICAgKiAgICAgICAgIGJsb2NrU2l6ZTogNCxcblx0ICAgICAgICAgKiAgICAgICAgIGZvcm1hdHRlcjogQ3J5cHRvSlMuZm9ybWF0Lk9wZW5TU0xcblx0ICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGNpcGhlclBhcmFtcykge1xuXHQgICAgICAgICAgICB0aGlzLm1peEluKGNpcGhlclBhcmFtcyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHRoaXMgY2lwaGVyIHBhcmFtcyBvYmplY3QgdG8gYSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0Zvcm1hdH0gZm9ybWF0dGVyIChPcHRpb25hbCkgVGhlIGZvcm1hdHRpbmcgc3RyYXRlZ3kgdG8gdXNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5naWZpZWQgY2lwaGVyIHBhcmFtcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEB0aHJvd3MgRXJyb3IgSWYgbmVpdGhlciB0aGUgZm9ybWF0dGVyIG5vciB0aGUgZGVmYXVsdCBmb3JtYXR0ZXIgaXMgc2V0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gY2lwaGVyUGFyYW1zICsgJyc7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSBjaXBoZXJQYXJhbXMudG9TdHJpbmcoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IGNpcGhlclBhcmFtcy50b1N0cmluZyhDcnlwdG9KUy5mb3JtYXQuT3BlblNTTCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uIChmb3JtYXR0ZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIChmb3JtYXR0ZXIgfHwgdGhpcy5mb3JtYXR0ZXIpLnN0cmluZ2lmeSh0aGlzKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBGb3JtYXQgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19mb3JtYXQgPSBDLmZvcm1hdCA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIE9wZW5TU0wgZm9ybWF0dGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIE9wZW5TU0xGb3JtYXR0ZXIgPSBDX2Zvcm1hdC5PcGVuU1NMID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgY2lwaGVyIHBhcmFtcyBvYmplY3QgdG8gYW4gT3BlblNTTC1jb21wYXRpYmxlIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyUGFyYW1zfSBjaXBoZXJQYXJhbXMgVGhlIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgT3BlblNTTC1jb21wYXRpYmxlIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIG9wZW5TU0xTdHJpbmcgPSBDcnlwdG9KUy5mb3JtYXQuT3BlblNTTC5zdHJpbmdpZnkoY2lwaGVyUGFyYW1zKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uIChjaXBoZXJQYXJhbXMpIHtcblx0ICAgICAgICAgICAgdmFyIHdvcmRBcnJheTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGNpcGhlcnRleHQgPSBjaXBoZXJQYXJhbXMuY2lwaGVydGV4dDtcblx0ICAgICAgICAgICAgdmFyIHNhbHQgPSBjaXBoZXJQYXJhbXMuc2FsdDtcblxuXHQgICAgICAgICAgICAvLyBGb3JtYXRcblx0ICAgICAgICAgICAgaWYgKHNhbHQpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRBcnJheSA9IFdvcmRBcnJheS5jcmVhdGUoWzB4NTM2MTZjNzQsIDB4NjU2NDVmNWZdKS5jb25jYXQoc2FsdCkuY29uY2F0KGNpcGhlcnRleHQpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgd29yZEFycmF5ID0gY2lwaGVydGV4dDtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiB3b3JkQXJyYXkudG9TdHJpbmcoQmFzZTY0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYW4gT3BlblNTTC1jb21wYXRpYmxlIHN0cmluZyB0byBhIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG9wZW5TU0xTdHIgVGhlIE9wZW5TU0wtY29tcGF0aWJsZSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtDaXBoZXJQYXJhbXN9IFRoZSBjaXBoZXIgcGFyYW1zIG9iamVjdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNpcGhlclBhcmFtcyA9IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMLnBhcnNlKG9wZW5TU0xTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAob3BlblNTTFN0cikge1xuXHQgICAgICAgICAgICB2YXIgc2FsdDtcblxuXHQgICAgICAgICAgICAvLyBQYXJzZSBiYXNlNjRcblx0ICAgICAgICAgICAgdmFyIGNpcGhlcnRleHQgPSBCYXNlNjQucGFyc2Uob3BlblNTTFN0cik7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGNpcGhlcnRleHRXb3JkcyA9IGNpcGhlcnRleHQud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gVGVzdCBmb3Igc2FsdFxuXHQgICAgICAgICAgICBpZiAoY2lwaGVydGV4dFdvcmRzWzBdID09IDB4NTM2MTZjNzQgJiYgY2lwaGVydGV4dFdvcmRzWzFdID09IDB4NjU2NDVmNWYpIHtcblx0ICAgICAgICAgICAgICAgIC8vIEV4dHJhY3Qgc2FsdFxuXHQgICAgICAgICAgICAgICAgc2FsdCA9IFdvcmRBcnJheS5jcmVhdGUoY2lwaGVydGV4dFdvcmRzLnNsaWNlKDIsIDQpKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHNhbHQgZnJvbSBjaXBoZXJ0ZXh0XG5cdCAgICAgICAgICAgICAgICBjaXBoZXJ0ZXh0V29yZHMuc3BsaWNlKDAsIDQpO1xuXHQgICAgICAgICAgICAgICAgY2lwaGVydGV4dC5zaWdCeXRlcyAtPSAxNjtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBDaXBoZXJQYXJhbXMuY3JlYXRlKHsgY2lwaGVydGV4dDogY2lwaGVydGV4dCwgc2FsdDogc2FsdCB9KTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEEgY2lwaGVyIHdyYXBwZXIgdGhhdCByZXR1cm5zIGNpcGhlcnRleHQgYXMgYSBzZXJpYWxpemFibGUgY2lwaGVyIHBhcmFtcyBvYmplY3QuXG5cdCAgICAgKi9cblx0ICAgIHZhciBTZXJpYWxpemFibGVDaXBoZXIgPSBDX2xpYi5TZXJpYWxpemFibGVDaXBoZXIgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHByb3BlcnR5IHtGb3JtYXR0ZXJ9IGZvcm1hdCBUaGUgZm9ybWF0dGluZyBzdHJhdGVneSB0byBjb252ZXJ0IGNpcGhlciBwYXJhbSBvYmplY3RzIHRvIGFuZCBmcm9tIGEgc3RyaW5nLiBEZWZhdWx0OiBPcGVuU1NMXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgIGZvcm1hdDogT3BlblNTTEZvcm1hdHRlclxuXHQgICAgICAgIH0pLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRW5jcnlwdHMgYSBtZXNzYWdlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtDaXBoZXJ9IGNpcGhlciBUaGUgY2lwaGVyIGFsZ29yaXRobSB0byB1c2UuXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGVuY3J5cHQuXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IGtleSBUaGUga2V5LlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtDaXBoZXJQYXJhbXN9IEEgY2lwaGVyIHBhcmFtcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0UGFyYW1zID0gQ3J5cHRvSlMubGliLlNlcmlhbGl6YWJsZUNpcGhlci5lbmNyeXB0KENyeXB0b0pTLmFsZ28uQUVTLCBtZXNzYWdlLCBrZXkpO1xuXHQgICAgICAgICAqICAgICB2YXIgY2lwaGVydGV4dFBhcmFtcyA9IENyeXB0b0pTLmxpYi5TZXJpYWxpemFibGVDaXBoZXIuZW5jcnlwdChDcnlwdG9KUy5hbGdvLkFFUywgbWVzc2FnZSwga2V5LCB7IGl2OiBpdiB9KTtcblx0ICAgICAgICAgKiAgICAgdmFyIGNpcGhlcnRleHRQYXJhbXMgPSBDcnlwdG9KUy5saWIuU2VyaWFsaXphYmxlQ2lwaGVyLmVuY3J5cHQoQ3J5cHRvSlMuYWxnby5BRVMsIG1lc3NhZ2UsIGtleSwgeyBpdjogaXYsIGZvcm1hdDogQ3J5cHRvSlMuZm9ybWF0Lk9wZW5TU0wgfSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgZW5jcnlwdDogZnVuY3Rpb24gKGNpcGhlciwgbWVzc2FnZSwga2V5LCBjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIGNmZyA9IHRoaXMuY2ZnLmV4dGVuZChjZmcpO1xuXG5cdCAgICAgICAgICAgIC8vIEVuY3J5cHRcblx0ICAgICAgICAgICAgdmFyIGVuY3J5cHRvciA9IGNpcGhlci5jcmVhdGVFbmNyeXB0b3Ioa2V5LCBjZmcpO1xuXHQgICAgICAgICAgICB2YXIgY2lwaGVydGV4dCA9IGVuY3J5cHRvci5maW5hbGl6ZShtZXNzYWdlKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgY2lwaGVyQ2ZnID0gZW5jcnlwdG9yLmNmZztcblxuXHQgICAgICAgICAgICAvLyBDcmVhdGUgYW5kIHJldHVybiBzZXJpYWxpemFibGUgY2lwaGVyIHBhcmFtc1xuXHQgICAgICAgICAgICByZXR1cm4gQ2lwaGVyUGFyYW1zLmNyZWF0ZSh7XG5cdCAgICAgICAgICAgICAgICBjaXBoZXJ0ZXh0OiBjaXBoZXJ0ZXh0LFxuXHQgICAgICAgICAgICAgICAga2V5OiBrZXksXG5cdCAgICAgICAgICAgICAgICBpdjogY2lwaGVyQ2ZnLml2LFxuXHQgICAgICAgICAgICAgICAgYWxnb3JpdGhtOiBjaXBoZXIsXG5cdCAgICAgICAgICAgICAgICBtb2RlOiBjaXBoZXJDZmcubW9kZSxcblx0ICAgICAgICAgICAgICAgIHBhZGRpbmc6IGNpcGhlckNmZy5wYWRkaW5nLFxuXHQgICAgICAgICAgICAgICAgYmxvY2tTaXplOiBjaXBoZXIuYmxvY2tTaXplLFxuXHQgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBjZmcuZm9ybWF0XG5cdCAgICAgICAgICAgIH0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBEZWNyeXB0cyBzZXJpYWxpemVkIGNpcGhlcnRleHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlcn0gY2lwaGVyIFRoZSBjaXBoZXIgYWxnb3JpdGhtIHRvIHVzZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlclBhcmFtc3xzdHJpbmd9IGNpcGhlcnRleHQgVGhlIGNpcGhlcnRleHQgdG8gZGVjcnlwdC5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0ga2V5IFRoZSBrZXkuXG5cdCAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGlzIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHBsYWludGV4dC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHBsYWludGV4dCA9IENyeXB0b0pTLmxpYi5TZXJpYWxpemFibGVDaXBoZXIuZGVjcnlwdChDcnlwdG9KUy5hbGdvLkFFUywgZm9ybWF0dGVkQ2lwaGVydGV4dCwga2V5LCB7IGl2OiBpdiwgZm9ybWF0OiBDcnlwdG9KUy5mb3JtYXQuT3BlblNTTCB9KTtcblx0ICAgICAgICAgKiAgICAgdmFyIHBsYWludGV4dCA9IENyeXB0b0pTLmxpYi5TZXJpYWxpemFibGVDaXBoZXIuZGVjcnlwdChDcnlwdG9KUy5hbGdvLkFFUywgY2lwaGVydGV4dFBhcmFtcywga2V5LCB7IGl2OiBpdiwgZm9ybWF0OiBDcnlwdG9KUy5mb3JtYXQuT3BlblNTTCB9KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBkZWNyeXB0OiBmdW5jdGlvbiAoY2lwaGVyLCBjaXBoZXJ0ZXh0LCBrZXksIGNmZykge1xuXHQgICAgICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcblx0ICAgICAgICAgICAgY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gQ2lwaGVyUGFyYW1zXG5cdCAgICAgICAgICAgIGNpcGhlcnRleHQgPSB0aGlzLl9wYXJzZShjaXBoZXJ0ZXh0LCBjZmcuZm9ybWF0KTtcblxuXHQgICAgICAgICAgICAvLyBEZWNyeXB0XG5cdCAgICAgICAgICAgIHZhciBwbGFpbnRleHQgPSBjaXBoZXIuY3JlYXRlRGVjcnlwdG9yKGtleSwgY2ZnKS5maW5hbGl6ZShjaXBoZXJ0ZXh0LmNpcGhlcnRleHQpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBwbGFpbnRleHQ7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHNlcmlhbGl6ZWQgY2lwaGVydGV4dCB0byBDaXBoZXJQYXJhbXMsXG5cdCAgICAgICAgICogZWxzZSBhc3N1bWVkIENpcGhlclBhcmFtcyBhbHJlYWR5IGFuZCByZXR1cm5zIGNpcGhlcnRleHQgdW5jaGFuZ2VkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtDaXBoZXJQYXJhbXN8c3RyaW5nfSBjaXBoZXJ0ZXh0IFRoZSBjaXBoZXJ0ZXh0LlxuXHQgICAgICAgICAqIEBwYXJhbSB7Rm9ybWF0dGVyfSBmb3JtYXQgVGhlIGZvcm1hdHRpbmcgc3RyYXRlZ3kgdG8gdXNlIHRvIHBhcnNlIHNlcmlhbGl6ZWQgY2lwaGVydGV4dC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0NpcGhlclBhcmFtc30gVGhlIHVuc2VyaWFsaXplZCBjaXBoZXJ0ZXh0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2lwaGVydGV4dFBhcmFtcyA9IENyeXB0b0pTLmxpYi5TZXJpYWxpemFibGVDaXBoZXIuX3BhcnNlKGNpcGhlcnRleHRTdHJpbmdPclBhcmFtcywgZm9ybWF0KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfcGFyc2U6IGZ1bmN0aW9uIChjaXBoZXJ0ZXh0LCBmb3JtYXQpIHtcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBjaXBoZXJ0ZXh0ID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0LnBhcnNlKGNpcGhlcnRleHQsIHRoaXMpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGNpcGhlcnRleHQ7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBLZXkgZGVyaXZhdGlvbiBmdW5jdGlvbiBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2tkZiA9IEMua2RmID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogT3BlblNTTCBrZXkgZGVyaXZhdGlvbiBmdW5jdGlvbi5cblx0ICAgICAqL1xuXHQgICAgdmFyIE9wZW5TU0xLZGYgPSBDX2tkZi5PcGVuU1NMID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIERlcml2ZXMgYSBrZXkgYW5kIElWIGZyb20gYSBwYXNzd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCBUaGUgcGFzc3dvcmQgdG8gZGVyaXZlIGZyb20uXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGtleVNpemUgVGhlIHNpemUgaW4gd29yZHMgb2YgdGhlIGtleSB0byBnZW5lcmF0ZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaXZTaXplIFRoZSBzaXplIGluIHdvcmRzIG9mIHRoZSBJViB0byBnZW5lcmF0ZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHNhbHQgKE9wdGlvbmFsKSBBIDY0LWJpdCBzYWx0IHRvIHVzZS4gSWYgb21pdHRlZCwgYSBzYWx0IHdpbGwgYmUgZ2VuZXJhdGVkIHJhbmRvbWx5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q2lwaGVyUGFyYW1zfSBBIGNpcGhlciBwYXJhbXMgb2JqZWN0IHdpdGggdGhlIGtleSwgSVYsIGFuZCBzYWx0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgZGVyaXZlZFBhcmFtcyA9IENyeXB0b0pTLmtkZi5PcGVuU1NMLmV4ZWN1dGUoJ1Bhc3N3b3JkJywgMjU2LzMyLCAxMjgvMzIpO1xuXHQgICAgICAgICAqICAgICB2YXIgZGVyaXZlZFBhcmFtcyA9IENyeXB0b0pTLmtkZi5PcGVuU1NMLmV4ZWN1dGUoJ1Bhc3N3b3JkJywgMjU2LzMyLCAxMjgvMzIsICdzYWx0c2FsdCcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChwYXNzd29yZCwga2V5U2l6ZSwgaXZTaXplLCBzYWx0LCBoYXNoZXIpIHtcblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUgcmFuZG9tIHNhbHRcblx0ICAgICAgICAgICAgaWYgKCFzYWx0KSB7XG5cdCAgICAgICAgICAgICAgICBzYWx0ID0gV29yZEFycmF5LnJhbmRvbSg2NC84KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIERlcml2ZSBrZXkgYW5kIElWXG5cdCAgICAgICAgICAgIGlmICghaGFzaGVyKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIga2V5ID0gRXZwS0RGLmNyZWF0ZSh7IGtleVNpemU6IGtleVNpemUgKyBpdlNpemUgfSkuY29tcHV0ZShwYXNzd29yZCwgc2FsdCk7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB2YXIga2V5ID0gRXZwS0RGLmNyZWF0ZSh7IGtleVNpemU6IGtleVNpemUgKyBpdlNpemUsIGhhc2hlcjogaGFzaGVyIH0pLmNvbXB1dGUocGFzc3dvcmQsIHNhbHQpO1xuXHQgICAgICAgICAgICB9XG5cblxuXHQgICAgICAgICAgICAvLyBTZXBhcmF0ZSBrZXkgYW5kIElWXG5cdCAgICAgICAgICAgIHZhciBpdiA9IFdvcmRBcnJheS5jcmVhdGUoa2V5LndvcmRzLnNsaWNlKGtleVNpemUpLCBpdlNpemUgKiA0KTtcblx0ICAgICAgICAgICAga2V5LnNpZ0J5dGVzID0ga2V5U2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIHBhcmFtc1xuXHQgICAgICAgICAgICByZXR1cm4gQ2lwaGVyUGFyYW1zLmNyZWF0ZSh7IGtleToga2V5LCBpdjogaXYsIHNhbHQ6IHNhbHQgfSk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBIHNlcmlhbGl6YWJsZSBjaXBoZXIgd3JhcHBlciB0aGF0IGRlcml2ZXMgdGhlIGtleSBmcm9tIGEgcGFzc3dvcmQsXG5cdCAgICAgKiBhbmQgcmV0dXJucyBjaXBoZXJ0ZXh0IGFzIGEgc2VyaWFsaXphYmxlIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICovXG5cdCAgICB2YXIgUGFzc3dvcmRCYXNlZENpcGhlciA9IENfbGliLlBhc3N3b3JkQmFzZWRDaXBoZXIgPSBTZXJpYWxpemFibGVDaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcHJvcGVydHkge0tERn0ga2RmIFRoZSBrZXkgZGVyaXZhdGlvbiBmdW5jdGlvbiB0byB1c2UgdG8gZ2VuZXJhdGUgYSBrZXkgYW5kIElWIGZyb20gYSBwYXNzd29yZC4gRGVmYXVsdDogT3BlblNTTFxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogU2VyaWFsaXphYmxlQ2lwaGVyLmNmZy5leHRlbmQoe1xuXHQgICAgICAgICAgICBrZGY6IE9wZW5TU0xLZGZcblx0ICAgICAgICB9KSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEVuY3J5cHRzIGEgbWVzc2FnZSB1c2luZyBhIHBhc3N3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtDaXBoZXJ9IGNpcGhlciBUaGUgY2lwaGVyIGFsZ29yaXRobSB0byB1c2UuXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGVuY3J5cHQuXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZC5cblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q2lwaGVyUGFyYW1zfSBBIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2lwaGVydGV4dFBhcmFtcyA9IENyeXB0b0pTLmxpYi5QYXNzd29yZEJhc2VkQ2lwaGVyLmVuY3J5cHQoQ3J5cHRvSlMuYWxnby5BRVMsIG1lc3NhZ2UsICdwYXNzd29yZCcpO1xuXHQgICAgICAgICAqICAgICB2YXIgY2lwaGVydGV4dFBhcmFtcyA9IENyeXB0b0pTLmxpYi5QYXNzd29yZEJhc2VkQ2lwaGVyLmVuY3J5cHQoQ3J5cHRvSlMuYWxnby5BRVMsIG1lc3NhZ2UsICdwYXNzd29yZCcsIHsgZm9ybWF0OiBDcnlwdG9KUy5mb3JtYXQuT3BlblNTTCB9KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBlbmNyeXB0OiBmdW5jdGlvbiAoY2lwaGVyLCBtZXNzYWdlLCBwYXNzd29yZCwgY2ZnKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGx5IGNvbmZpZyBkZWZhdWx0c1xuXHQgICAgICAgICAgICBjZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBEZXJpdmUga2V5IGFuZCBvdGhlciBwYXJhbXNcblx0ICAgICAgICAgICAgdmFyIGRlcml2ZWRQYXJhbXMgPSBjZmcua2RmLmV4ZWN1dGUocGFzc3dvcmQsIGNpcGhlci5rZXlTaXplLCBjaXBoZXIuaXZTaXplLCBjZmcuc2FsdCwgY2ZnLmhhc2hlcik7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIElWIHRvIGNvbmZpZ1xuXHQgICAgICAgICAgICBjZmcuaXYgPSBkZXJpdmVkUGFyYW1zLml2O1xuXG5cdCAgICAgICAgICAgIC8vIEVuY3J5cHRcblx0ICAgICAgICAgICAgdmFyIGNpcGhlcnRleHQgPSBTZXJpYWxpemFibGVDaXBoZXIuZW5jcnlwdC5jYWxsKHRoaXMsIGNpcGhlciwgbWVzc2FnZSwgZGVyaXZlZFBhcmFtcy5rZXksIGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gTWl4IGluIGRlcml2ZWQgcGFyYW1zXG5cdCAgICAgICAgICAgIGNpcGhlcnRleHQubWl4SW4oZGVyaXZlZFBhcmFtcyk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNpcGhlcnRleHQ7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIERlY3J5cHRzIHNlcmlhbGl6ZWQgY2lwaGVydGV4dCB1c2luZyBhIHBhc3N3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtDaXBoZXJ9IGNpcGhlciBUaGUgY2lwaGVyIGFsZ29yaXRobSB0byB1c2UuXG5cdCAgICAgICAgICogQHBhcmFtIHtDaXBoZXJQYXJhbXN8c3RyaW5nfSBjaXBoZXJ0ZXh0IFRoZSBjaXBoZXJ0ZXh0IHRvIGRlY3J5cHQuXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZC5cblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcGxhaW50ZXh0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgcGxhaW50ZXh0ID0gQ3J5cHRvSlMubGliLlBhc3N3b3JkQmFzZWRDaXBoZXIuZGVjcnlwdChDcnlwdG9KUy5hbGdvLkFFUywgZm9ybWF0dGVkQ2lwaGVydGV4dCwgJ3Bhc3N3b3JkJywgeyBmb3JtYXQ6IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMIH0pO1xuXHQgICAgICAgICAqICAgICB2YXIgcGxhaW50ZXh0ID0gQ3J5cHRvSlMubGliLlBhc3N3b3JkQmFzZWRDaXBoZXIuZGVjcnlwdChDcnlwdG9KUy5hbGdvLkFFUywgY2lwaGVydGV4dFBhcmFtcywgJ3Bhc3N3b3JkJywgeyBmb3JtYXQ6IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMIH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGRlY3J5cHQ6IGZ1bmN0aW9uIChjaXBoZXIsIGNpcGhlcnRleHQsIHBhc3N3b3JkLCBjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIGNmZyA9IHRoaXMuY2ZnLmV4dGVuZChjZmcpO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgc3RyaW5nIHRvIENpcGhlclBhcmFtc1xuXHQgICAgICAgICAgICBjaXBoZXJ0ZXh0ID0gdGhpcy5fcGFyc2UoY2lwaGVydGV4dCwgY2ZnLmZvcm1hdCk7XG5cblx0ICAgICAgICAgICAgLy8gRGVyaXZlIGtleSBhbmQgb3RoZXIgcGFyYW1zXG5cdCAgICAgICAgICAgIHZhciBkZXJpdmVkUGFyYW1zID0gY2ZnLmtkZi5leGVjdXRlKHBhc3N3b3JkLCBjaXBoZXIua2V5U2l6ZSwgY2lwaGVyLml2U2l6ZSwgY2lwaGVydGV4dC5zYWx0LCBjZmcuaGFzaGVyKTtcblxuXHQgICAgICAgICAgICAvLyBBZGQgSVYgdG8gY29uZmlnXG5cdCAgICAgICAgICAgIGNmZy5pdiA9IGRlcml2ZWRQYXJhbXMuaXY7XG5cblx0ICAgICAgICAgICAgLy8gRGVjcnlwdFxuXHQgICAgICAgICAgICB2YXIgcGxhaW50ZXh0ID0gU2VyaWFsaXphYmxlQ2lwaGVyLmRlY3J5cHQuY2FsbCh0aGlzLCBjaXBoZXIsIGNpcGhlcnRleHQsIGRlcml2ZWRQYXJhbXMua2V5LCBjZmcpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBwbGFpbnRleHQ7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdH0oKSk7XG5cblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9jaXBoZXItY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0LyoqXG5cdCAqIENpcGhlciBGZWVkYmFjayBibG9jayBtb2RlLlxuXHQgKi9cblx0Q3J5cHRvSlMubW9kZS5DRkIgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIENGQiA9IENyeXB0b0pTLmxpYi5CbG9ja0NpcGhlck1vZGUuZXh0ZW5kKCk7XG5cblx0ICAgIENGQi5FbmNyeXB0b3IgPSBDRkIuZXh0ZW5kKHtcblx0ICAgICAgICBwcm9jZXNzQmxvY2s6IGZ1bmN0aW9uICh3b3Jkcywgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgY2lwaGVyID0gdGhpcy5fY2lwaGVyO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gY2lwaGVyLmJsb2NrU2l6ZTtcblxuXHQgICAgICAgICAgICBnZW5lcmF0ZUtleXN0cmVhbUFuZEVuY3J5cHQuY2FsbCh0aGlzLCB3b3Jkcywgb2Zmc2V0LCBibG9ja1NpemUsIGNpcGhlcik7XG5cblx0ICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhpcyBibG9jayB0byB1c2Ugd2l0aCBuZXh0IGJsb2NrXG5cdCAgICAgICAgICAgIHRoaXMuX3ByZXZCbG9jayA9IHdvcmRzLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgYmxvY2tTaXplKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgQ0ZCLkRlY3J5cHRvciA9IENGQi5leHRlbmQoe1xuXHQgICAgICAgIHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKHdvcmRzLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBjaXBoZXIgPSB0aGlzLl9jaXBoZXI7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemUgPSBjaXBoZXIuYmxvY2tTaXplO1xuXG5cdCAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoaXMgYmxvY2sgdG8gdXNlIHdpdGggbmV4dCBibG9ja1xuXHQgICAgICAgICAgICB2YXIgdGhpc0Jsb2NrID0gd29yZHMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBibG9ja1NpemUpO1xuXG5cdCAgICAgICAgICAgIGdlbmVyYXRlS2V5c3RyZWFtQW5kRW5jcnlwdC5jYWxsKHRoaXMsIHdvcmRzLCBvZmZzZXQsIGJsb2NrU2l6ZSwgY2lwaGVyKTtcblxuXHQgICAgICAgICAgICAvLyBUaGlzIGJsb2NrIGJlY29tZXMgdGhlIHByZXZpb3VzIGJsb2NrXG5cdCAgICAgICAgICAgIHRoaXMuX3ByZXZCbG9jayA9IHRoaXNCbG9jaztcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgZnVuY3Rpb24gZ2VuZXJhdGVLZXlzdHJlYW1BbmRFbmNyeXB0KHdvcmRzLCBvZmZzZXQsIGJsb2NrU2l6ZSwgY2lwaGVyKSB7XG5cdCAgICAgICAgdmFyIGtleXN0cmVhbTtcblxuXHQgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgdmFyIGl2ID0gdGhpcy5faXY7XG5cblx0ICAgICAgICAvLyBHZW5lcmF0ZSBrZXlzdHJlYW1cblx0ICAgICAgICBpZiAoaXYpIHtcblx0ICAgICAgICAgICAga2V5c3RyZWFtID0gaXYuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgLy8gUmVtb3ZlIElWIGZvciBzdWJzZXF1ZW50IGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9pdiA9IHVuZGVmaW5lZDtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBrZXlzdHJlYW0gPSB0aGlzLl9wcmV2QmxvY2s7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGNpcGhlci5lbmNyeXB0QmxvY2soa2V5c3RyZWFtLCAwKTtcblxuXHQgICAgICAgIC8vIEVuY3J5cHRcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2NrU2l6ZTsgaSsrKSB7XG5cdCAgICAgICAgICAgIHdvcmRzW29mZnNldCArIGldIF49IGtleXN0cmVhbVtpXTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBDRkI7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMubW9kZS5DRkI7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vY2lwaGVyLWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdC8qKlxuXHQgKiBDb3VudGVyIGJsb2NrIG1vZGUuXG5cdCAqL1xuXHRDcnlwdG9KUy5tb2RlLkNUUiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgQ1RSID0gQ3J5cHRvSlMubGliLkJsb2NrQ2lwaGVyTW9kZS5leHRlbmQoKTtcblxuXHQgICAgdmFyIEVuY3J5cHRvciA9IENUUi5FbmNyeXB0b3IgPSBDVFIuZXh0ZW5kKHtcblx0ICAgICAgICBwcm9jZXNzQmxvY2s6IGZ1bmN0aW9uICh3b3Jkcywgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgY2lwaGVyID0gdGhpcy5fY2lwaGVyXG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemUgPSBjaXBoZXIuYmxvY2tTaXplO1xuXHQgICAgICAgICAgICB2YXIgaXYgPSB0aGlzLl9pdjtcblx0ICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSB0aGlzLl9jb3VudGVyO1xuXG5cdCAgICAgICAgICAgIC8vIEdlbmVyYXRlIGtleXN0cmVhbVxuXHQgICAgICAgICAgICBpZiAoaXYpIHtcblx0ICAgICAgICAgICAgICAgIGNvdW50ZXIgPSB0aGlzLl9jb3VudGVyID0gaXYuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBJViBmb3Igc3Vic2VxdWVudCBibG9ja3Ncblx0ICAgICAgICAgICAgICAgIHRoaXMuX2l2ID0gdW5kZWZpbmVkO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciBrZXlzdHJlYW0gPSBjb3VudGVyLnNsaWNlKDApO1xuXHQgICAgICAgICAgICBjaXBoZXIuZW5jcnlwdEJsb2NrKGtleXN0cmVhbSwgMCk7XG5cblx0ICAgICAgICAgICAgLy8gSW5jcmVtZW50IGNvdW50ZXJcblx0ICAgICAgICAgICAgY291bnRlcltibG9ja1NpemUgLSAxXSA9IChjb3VudGVyW2Jsb2NrU2l6ZSAtIDFdICsgMSkgfCAwXG5cblx0ICAgICAgICAgICAgLy8gRW5jcnlwdFxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2NrU2l6ZTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tvZmZzZXQgKyBpXSBePSBrZXlzdHJlYW1baV07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgQ1RSLkRlY3J5cHRvciA9IEVuY3J5cHRvcjtcblxuXHQgICAgcmV0dXJuIENUUjtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5tb2RlLkNUUjtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9jaXBoZXItY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0LyoqIEBwcmVzZXJ2ZVxuXHQgKiBDb3VudGVyIGJsb2NrIG1vZGUgY29tcGF0aWJsZSB3aXRoICBEciBCcmlhbiBHbGFkbWFuIGZpbGVlbmMuY1xuXHQgKiBkZXJpdmVkIGZyb20gQ3J5cHRvSlMubW9kZS5DVFJcblx0ICogSmFuIEhydWJ5IGpocnVieS53ZWJAZ21haWwuY29tXG5cdCAqL1xuXHRDcnlwdG9KUy5tb2RlLkNUUkdsYWRtYW4gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIENUUkdsYWRtYW4gPSBDcnlwdG9KUy5saWIuQmxvY2tDaXBoZXJNb2RlLmV4dGVuZCgpO1xuXG5cdFx0ZnVuY3Rpb24gaW5jV29yZCh3b3JkKVxuXHRcdHtcblx0XHRcdGlmICgoKHdvcmQgPj4gMjQpICYgMHhmZikgPT09IDB4ZmYpIHsgLy9vdmVyZmxvd1xuXHRcdFx0dmFyIGIxID0gKHdvcmQgPj4gMTYpJjB4ZmY7XG5cdFx0XHR2YXIgYjIgPSAod29yZCA+PiA4KSYweGZmO1xuXHRcdFx0dmFyIGIzID0gd29yZCAmIDB4ZmY7XG5cblx0XHRcdGlmIChiMSA9PT0gMHhmZikgLy8gb3ZlcmZsb3cgYjFcblx0XHRcdHtcblx0XHRcdGIxID0gMDtcblx0XHRcdGlmIChiMiA9PT0gMHhmZilcblx0XHRcdHtcblx0XHRcdFx0YjIgPSAwO1xuXHRcdFx0XHRpZiAoYjMgPT09IDB4ZmYpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRiMyA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0KytiMztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQrK2IyO1xuXHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0KytiMTtcblx0XHRcdH1cblxuXHRcdFx0d29yZCA9IDA7XG5cdFx0XHR3b3JkICs9IChiMSA8PCAxNik7XG5cdFx0XHR3b3JkICs9IChiMiA8PCA4KTtcblx0XHRcdHdvcmQgKz0gYjM7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHR3b3JkICs9ICgweDAxIDw8IDI0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB3b3JkO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGluY0NvdW50ZXIoY291bnRlcilcblx0XHR7XG5cdFx0XHRpZiAoKGNvdW50ZXJbMF0gPSBpbmNXb3JkKGNvdW50ZXJbMF0pKSA9PT0gMClcblx0XHRcdHtcblx0XHRcdFx0Ly8gZW5jcl9kYXRhIGluIGZpbGVlbmMuYyBmcm9tICBEciBCcmlhbiBHbGFkbWFuJ3MgY291bnRzIG9ubHkgd2l0aCBEV09SRCBqIDwgOFxuXHRcdFx0XHRjb3VudGVyWzFdID0gaW5jV29yZChjb3VudGVyWzFdKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBjb3VudGVyO1xuXHRcdH1cblxuXHQgICAgdmFyIEVuY3J5cHRvciA9IENUUkdsYWRtYW4uRW5jcnlwdG9yID0gQ1RSR2xhZG1hbi5leHRlbmQoe1xuXHQgICAgICAgIHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKHdvcmRzLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBjaXBoZXIgPSB0aGlzLl9jaXBoZXJcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZSA9IGNpcGhlci5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBpdiA9IHRoaXMuX2l2O1xuXHQgICAgICAgICAgICB2YXIgY291bnRlciA9IHRoaXMuX2NvdW50ZXI7XG5cblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUga2V5c3RyZWFtXG5cdCAgICAgICAgICAgIGlmIChpdikge1xuXHQgICAgICAgICAgICAgICAgY291bnRlciA9IHRoaXMuX2NvdW50ZXIgPSBpdi5zbGljZSgwKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIElWIGZvciBzdWJzZXF1ZW50IGJsb2Nrc1xuXHQgICAgICAgICAgICAgICAgdGhpcy5faXYgPSB1bmRlZmluZWQ7XG5cdCAgICAgICAgICAgIH1cblxuXHRcdFx0XHRpbmNDb3VudGVyKGNvdW50ZXIpO1xuXG5cdFx0XHRcdHZhciBrZXlzdHJlYW0gPSBjb3VudGVyLnNsaWNlKDApO1xuXHQgICAgICAgICAgICBjaXBoZXIuZW5jcnlwdEJsb2NrKGtleXN0cmVhbSwgMCk7XG5cblx0ICAgICAgICAgICAgLy8gRW5jcnlwdFxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2NrU2l6ZTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tvZmZzZXQgKyBpXSBePSBrZXlzdHJlYW1baV07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgQ1RSR2xhZG1hbi5EZWNyeXB0b3IgPSBFbmNyeXB0b3I7XG5cblx0ICAgIHJldHVybiBDVFJHbGFkbWFuO1xuXHR9KCkpO1xuXG5cblxuXG5cdHJldHVybiBDcnlwdG9KUy5tb2RlLkNUUkdsYWRtYW47XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vY2lwaGVyLWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdC8qKlxuXHQgKiBPdXRwdXQgRmVlZGJhY2sgYmxvY2sgbW9kZS5cblx0ICovXG5cdENyeXB0b0pTLm1vZGUuT0ZCID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBPRkIgPSBDcnlwdG9KUy5saWIuQmxvY2tDaXBoZXJNb2RlLmV4dGVuZCgpO1xuXG5cdCAgICB2YXIgRW5jcnlwdG9yID0gT0ZCLkVuY3J5cHRvciA9IE9GQi5leHRlbmQoe1xuXHQgICAgICAgIHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKHdvcmRzLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBjaXBoZXIgPSB0aGlzLl9jaXBoZXJcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZSA9IGNpcGhlci5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBpdiA9IHRoaXMuX2l2O1xuXHQgICAgICAgICAgICB2YXIga2V5c3RyZWFtID0gdGhpcy5fa2V5c3RyZWFtO1xuXG5cdCAgICAgICAgICAgIC8vIEdlbmVyYXRlIGtleXN0cmVhbVxuXHQgICAgICAgICAgICBpZiAoaXYpIHtcblx0ICAgICAgICAgICAgICAgIGtleXN0cmVhbSA9IHRoaXMuX2tleXN0cmVhbSA9IGl2LnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgSVYgZm9yIHN1YnNlcXVlbnQgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICB0aGlzLl9pdiA9IHVuZGVmaW5lZDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBjaXBoZXIuZW5jcnlwdEJsb2NrKGtleXN0cmVhbSwgMCk7XG5cblx0ICAgICAgICAgICAgLy8gRW5jcnlwdFxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2NrU2l6ZTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tvZmZzZXQgKyBpXSBePSBrZXlzdHJlYW1baV07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgT0ZCLkRlY3J5cHRvciA9IEVuY3J5cHRvcjtcblxuXHQgICAgcmV0dXJuIE9GQjtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5tb2RlLk9GQjtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9jaXBoZXItY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0LyoqXG5cdCAqIEVsZWN0cm9uaWMgQ29kZWJvb2sgYmxvY2sgbW9kZS5cblx0ICovXG5cdENyeXB0b0pTLm1vZGUuRUNCID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBFQ0IgPSBDcnlwdG9KUy5saWIuQmxvY2tDaXBoZXJNb2RlLmV4dGVuZCgpO1xuXG5cdCAgICBFQ0IuRW5jcnlwdG9yID0gRUNCLmV4dGVuZCh7XG5cdCAgICAgICAgcHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAod29yZHMsIG9mZnNldCkge1xuXHQgICAgICAgICAgICB0aGlzLl9jaXBoZXIuZW5jcnlwdEJsb2NrKHdvcmRzLCBvZmZzZXQpO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICBFQ0IuRGVjcnlwdG9yID0gRUNCLmV4dGVuZCh7XG5cdCAgICAgICAgcHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAod29yZHMsIG9mZnNldCkge1xuXHQgICAgICAgICAgICB0aGlzLl9jaXBoZXIuZGVjcnlwdEJsb2NrKHdvcmRzLCBvZmZzZXQpO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICByZXR1cm4gRUNCO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLm1vZGUuRUNCO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQvKipcblx0ICogQU5TSSBYLjkyMyBwYWRkaW5nIHN0cmF0ZWd5LlxuXHQgKi9cblx0Q3J5cHRvSlMucGFkLkFuc2lYOTIzID0ge1xuXHQgICAgcGFkOiBmdW5jdGlvbiAoZGF0YSwgYmxvY2tTaXplKSB7XG5cdCAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgdmFyIGRhdGFTaWdCeXRlcyA9IGRhdGEuc2lnQnl0ZXM7XG5cdCAgICAgICAgdmFyIGJsb2NrU2l6ZUJ5dGVzID0gYmxvY2tTaXplICogNDtcblxuXHQgICAgICAgIC8vIENvdW50IHBhZGRpbmcgYnl0ZXNcblx0ICAgICAgICB2YXIgblBhZGRpbmdCeXRlcyA9IGJsb2NrU2l6ZUJ5dGVzIC0gZGF0YVNpZ0J5dGVzICUgYmxvY2tTaXplQnl0ZXM7XG5cblx0ICAgICAgICAvLyBDb21wdXRlIGxhc3QgYnl0ZSBwb3NpdGlvblxuXHQgICAgICAgIHZhciBsYXN0Qnl0ZVBvcyA9IGRhdGFTaWdCeXRlcyArIG5QYWRkaW5nQnl0ZXMgLSAxO1xuXG5cdCAgICAgICAgLy8gUGFkXG5cdCAgICAgICAgZGF0YS5jbGFtcCgpO1xuXHQgICAgICAgIGRhdGEud29yZHNbbGFzdEJ5dGVQb3MgPj4+IDJdIHw9IG5QYWRkaW5nQnl0ZXMgPDwgKDI0IC0gKGxhc3RCeXRlUG9zICUgNCkgKiA4KTtcblx0ICAgICAgICBkYXRhLnNpZ0J5dGVzICs9IG5QYWRkaW5nQnl0ZXM7XG5cdCAgICB9LFxuXG5cdCAgICB1bnBhZDogZnVuY3Rpb24gKGRhdGEpIHtcblx0ICAgICAgICAvLyBHZXQgbnVtYmVyIG9mIHBhZGRpbmcgYnl0ZXMgZnJvbSBsYXN0IGJ5dGVcblx0ICAgICAgICB2YXIgblBhZGRpbmdCeXRlcyA9IGRhdGEud29yZHNbKGRhdGEuc2lnQnl0ZXMgLSAxKSA+Pj4gMl0gJiAweGZmO1xuXG5cdCAgICAgICAgLy8gUmVtb3ZlIHBhZGRpbmdcblx0ICAgICAgICBkYXRhLnNpZ0J5dGVzIC09IG5QYWRkaW5nQnl0ZXM7XG5cdCAgICB9XG5cdH07XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMucGFkLkFuc2l4OTIzO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQvKipcblx0ICogSVNPIDEwMTI2IHBhZGRpbmcgc3RyYXRlZ3kuXG5cdCAqL1xuXHRDcnlwdG9KUy5wYWQuSXNvMTAxMjYgPSB7XG5cdCAgICBwYWQ6IGZ1bmN0aW9uIChkYXRhLCBibG9ja1NpemUpIHtcblx0ICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAvLyBDb3VudCBwYWRkaW5nIGJ5dGVzXG5cdCAgICAgICAgdmFyIG5QYWRkaW5nQnl0ZXMgPSBibG9ja1NpemVCeXRlcyAtIGRhdGEuc2lnQnl0ZXMgJSBibG9ja1NpemVCeXRlcztcblxuXHQgICAgICAgIC8vIFBhZFxuXHQgICAgICAgIGRhdGEuY29uY2F0KENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkucmFuZG9tKG5QYWRkaW5nQnl0ZXMgLSAxKSkuXG5cdCAgICAgICAgICAgICBjb25jYXQoQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoW25QYWRkaW5nQnl0ZXMgPDwgMjRdLCAxKSk7XG5cdCAgICB9LFxuXG5cdCAgICB1bnBhZDogZnVuY3Rpb24gKGRhdGEpIHtcblx0ICAgICAgICAvLyBHZXQgbnVtYmVyIG9mIHBhZGRpbmcgYnl0ZXMgZnJvbSBsYXN0IGJ5dGVcblx0ICAgICAgICB2YXIgblBhZGRpbmdCeXRlcyA9IGRhdGEud29yZHNbKGRhdGEuc2lnQnl0ZXMgLSAxKSA+Pj4gMl0gJiAweGZmO1xuXG5cdCAgICAgICAgLy8gUmVtb3ZlIHBhZGRpbmdcblx0ICAgICAgICBkYXRhLnNpZ0J5dGVzIC09IG5QYWRkaW5nQnl0ZXM7XG5cdCAgICB9XG5cdH07XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMucGFkLklzbzEwMTI2O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQvKipcblx0ICogSVNPL0lFQyA5Nzk3LTEgUGFkZGluZyBNZXRob2QgMi5cblx0ICovXG5cdENyeXB0b0pTLnBhZC5Jc285Nzk3MSA9IHtcblx0ICAgIHBhZDogZnVuY3Rpb24gKGRhdGEsIGJsb2NrU2l6ZSkge1xuXHQgICAgICAgIC8vIEFkZCAweDgwIGJ5dGVcblx0ICAgICAgICBkYXRhLmNvbmNhdChDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZShbMHg4MDAwMDAwMF0sIDEpKTtcblxuXHQgICAgICAgIC8vIFplcm8gcGFkIHRoZSByZXN0XG5cdCAgICAgICAgQ3J5cHRvSlMucGFkLlplcm9QYWRkaW5nLnBhZChkYXRhLCBibG9ja1NpemUpO1xuXHQgICAgfSxcblxuXHQgICAgdW5wYWQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgLy8gUmVtb3ZlIHplcm8gcGFkZGluZ1xuXHQgICAgICAgIENyeXB0b0pTLnBhZC5aZXJvUGFkZGluZy51bnBhZChkYXRhKTtcblxuXHQgICAgICAgIC8vIFJlbW92ZSBvbmUgbW9yZSBieXRlIC0tIHRoZSAweDgwIGJ5dGVcblx0ICAgICAgICBkYXRhLnNpZ0J5dGVzLS07XG5cdCAgICB9XG5cdH07XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMucGFkLklzbzk3OTcxO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQvKipcblx0ICogWmVybyBwYWRkaW5nIHN0cmF0ZWd5LlxuXHQgKi9cblx0Q3J5cHRvSlMucGFkLlplcm9QYWRkaW5nID0ge1xuXHQgICAgcGFkOiBmdW5jdGlvbiAoZGF0YSwgYmxvY2tTaXplKSB7XG5cdCAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICB2YXIgYmxvY2tTaXplQnl0ZXMgPSBibG9ja1NpemUgKiA0O1xuXG5cdCAgICAgICAgLy8gUGFkXG5cdCAgICAgICAgZGF0YS5jbGFtcCgpO1xuXHQgICAgICAgIGRhdGEuc2lnQnl0ZXMgKz0gYmxvY2tTaXplQnl0ZXMgLSAoKGRhdGEuc2lnQnl0ZXMgJSBibG9ja1NpemVCeXRlcykgfHwgYmxvY2tTaXplQnl0ZXMpO1xuXHQgICAgfSxcblxuXHQgICAgdW5wYWQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgIC8vIFVucGFkXG5cdCAgICAgICAgdmFyIGkgPSBkYXRhLnNpZ0J5dGVzIC0gMTtcblx0ICAgICAgICBmb3IgKHZhciBpID0gZGF0YS5zaWdCeXRlcyAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdCAgICAgICAgICAgIGlmICgoKGRhdGFXb3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmYpKSB7XG5cdCAgICAgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gaSArIDE7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5wYWQuWmVyb1BhZGRpbmc7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vY2lwaGVyLWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdC8qKlxuXHQgKiBBIG5vb3AgcGFkZGluZyBzdHJhdGVneS5cblx0ICovXG5cdENyeXB0b0pTLnBhZC5Ob1BhZGRpbmcgPSB7XG5cdCAgICBwYWQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIH0sXG5cblx0ICAgIHVucGFkOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB9XG5cdH07XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMucGFkLk5vUGFkZGluZztcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9jaXBoZXItY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICh1bmRlZmluZWQpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIENpcGhlclBhcmFtcyA9IENfbGliLkNpcGhlclBhcmFtcztcblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jO1xuXHQgICAgdmFyIEhleCA9IENfZW5jLkhleDtcblx0ICAgIHZhciBDX2Zvcm1hdCA9IEMuZm9ybWF0O1xuXG5cdCAgICB2YXIgSGV4Rm9ybWF0dGVyID0gQ19mb3JtYXQuSGV4ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHRoZSBjaXBoZXJ0ZXh0IG9mIGEgY2lwaGVyIHBhcmFtcyBvYmplY3QgdG8gYSBoZXhhZGVjaW1hbGx5IGVuY29kZWQgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtDaXBoZXJQYXJhbXN9IGNpcGhlclBhcmFtcyBUaGUgY2lwaGVyIHBhcmFtcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBoZXhhZGVjaW1hbGx5IGVuY29kZWQgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGV4U3RyaW5nID0gQ3J5cHRvSlMuZm9ybWF0LkhleC5zdHJpbmdpZnkoY2lwaGVyUGFyYW1zKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uIChjaXBoZXJQYXJhbXMpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGNpcGhlclBhcmFtcy5jaXBoZXJ0ZXh0LnRvU3RyaW5nKEhleCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgaGV4YWRlY2ltYWxseSBlbmNvZGVkIGNpcGhlcnRleHQgc3RyaW5nIHRvIGEgY2lwaGVyIHBhcmFtcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXQgVGhlIGhleGFkZWNpbWFsbHkgZW5jb2RlZCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtDaXBoZXJQYXJhbXN9IFRoZSBjaXBoZXIgcGFyYW1zIG9iamVjdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNpcGhlclBhcmFtcyA9IENyeXB0b0pTLmZvcm1hdC5IZXgucGFyc2UoaGV4U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGlucHV0KSB7XG5cdCAgICAgICAgICAgIHZhciBjaXBoZXJ0ZXh0ID0gSGV4LnBhcnNlKGlucHV0KTtcblx0ICAgICAgICAgICAgcmV0dXJuIENpcGhlclBhcmFtcy5jcmVhdGUoeyBjaXBoZXJ0ZXh0OiBjaXBoZXJ0ZXh0IH0pO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuZm9ybWF0LkhleDtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9lbmMtYmFzZTY0XCIpLCByZXF1aXJlKFwiLi9tZDVcIiksIHJlcXVpcmUoXCIuL2V2cGtkZlwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vZW5jLWJhc2U2NFwiLCBcIi4vbWQ1XCIsIFwiLi9ldnBrZGZcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgQmxvY2tDaXBoZXIgPSBDX2xpYi5CbG9ja0NpcGhlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIExvb2t1cCB0YWJsZXNcblx0ICAgIHZhciBTQk9YID0gW107XG5cdCAgICB2YXIgSU5WX1NCT1ggPSBbXTtcblx0ICAgIHZhciBTVUJfTUlYXzAgPSBbXTtcblx0ICAgIHZhciBTVUJfTUlYXzEgPSBbXTtcblx0ICAgIHZhciBTVUJfTUlYXzIgPSBbXTtcblx0ICAgIHZhciBTVUJfTUlYXzMgPSBbXTtcblx0ICAgIHZhciBJTlZfU1VCX01JWF8wID0gW107XG5cdCAgICB2YXIgSU5WX1NVQl9NSVhfMSA9IFtdO1xuXHQgICAgdmFyIElOVl9TVUJfTUlYXzIgPSBbXTtcblx0ICAgIHZhciBJTlZfU1VCX01JWF8zID0gW107XG5cblx0ICAgIC8vIENvbXB1dGUgbG9va3VwIHRhYmxlc1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAvLyBDb21wdXRlIGRvdWJsZSB0YWJsZVxuXHQgICAgICAgIHZhciBkID0gW107XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuXHQgICAgICAgICAgICBpZiAoaSA8IDEyOCkge1xuXHQgICAgICAgICAgICAgICAgZFtpXSA9IGkgPDwgMTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGRbaV0gPSAoaSA8PCAxKSBeIDB4MTFiO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gV2FsayBHRigyXjgpXG5cdCAgICAgICAgdmFyIHggPSAwO1xuXHQgICAgICAgIHZhciB4aSA9IDA7XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuXHQgICAgICAgICAgICAvLyBDb21wdXRlIHNib3hcblx0ICAgICAgICAgICAgdmFyIHN4ID0geGkgXiAoeGkgPDwgMSkgXiAoeGkgPDwgMikgXiAoeGkgPDwgMykgXiAoeGkgPDwgNCk7XG5cdCAgICAgICAgICAgIHN4ID0gKHN4ID4+PiA4KSBeIChzeCAmIDB4ZmYpIF4gMHg2Mztcblx0ICAgICAgICAgICAgU0JPWFt4XSA9IHN4O1xuXHQgICAgICAgICAgICBJTlZfU0JPWFtzeF0gPSB4O1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGUgbXVsdGlwbGljYXRpb25cblx0ICAgICAgICAgICAgdmFyIHgyID0gZFt4XTtcblx0ICAgICAgICAgICAgdmFyIHg0ID0gZFt4Ml07XG5cdCAgICAgICAgICAgIHZhciB4OCA9IGRbeDRdO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGUgc3ViIGJ5dGVzLCBtaXggY29sdW1ucyB0YWJsZXNcblx0ICAgICAgICAgICAgdmFyIHQgPSAoZFtzeF0gKiAweDEwMSkgXiAoc3ggKiAweDEwMTAxMDApO1xuXHQgICAgICAgICAgICBTVUJfTUlYXzBbeF0gPSAodCA8PCAyNCkgfCAodCA+Pj4gOCk7XG5cdCAgICAgICAgICAgIFNVQl9NSVhfMVt4XSA9ICh0IDw8IDE2KSB8ICh0ID4+PiAxNik7XG5cdCAgICAgICAgICAgIFNVQl9NSVhfMlt4XSA9ICh0IDw8IDgpICB8ICh0ID4+PiAyNCk7XG5cdCAgICAgICAgICAgIFNVQl9NSVhfM1t4XSA9IHQ7XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0ZSBpbnYgc3ViIGJ5dGVzLCBpbnYgbWl4IGNvbHVtbnMgdGFibGVzXG5cdCAgICAgICAgICAgIHZhciB0ID0gKHg4ICogMHgxMDEwMTAxKSBeICh4NCAqIDB4MTAwMDEpIF4gKHgyICogMHgxMDEpIF4gKHggKiAweDEwMTAxMDApO1xuXHQgICAgICAgICAgICBJTlZfU1VCX01JWF8wW3N4XSA9ICh0IDw8IDI0KSB8ICh0ID4+PiA4KTtcblx0ICAgICAgICAgICAgSU5WX1NVQl9NSVhfMVtzeF0gPSAodCA8PCAxNikgfCAodCA+Pj4gMTYpO1xuXHQgICAgICAgICAgICBJTlZfU1VCX01JWF8yW3N4XSA9ICh0IDw8IDgpICB8ICh0ID4+PiAyNCk7XG5cdCAgICAgICAgICAgIElOVl9TVUJfTUlYXzNbc3hdID0gdDtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIG5leHQgY291bnRlclxuXHQgICAgICAgICAgICBpZiAoIXgpIHtcblx0ICAgICAgICAgICAgICAgIHggPSB4aSA9IDE7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB4ID0geDIgXiBkW2RbZFt4OCBeIHgyXV1dO1xuXHQgICAgICAgICAgICAgICAgeGkgXj0gZFtkW3hpXV07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvLyBQcmVjb21wdXRlZCBSY29uIGxvb2t1cFxuXHQgICAgdmFyIFJDT04gPSBbMHgwMCwgMHgwMSwgMHgwMiwgMHgwNCwgMHgwOCwgMHgxMCwgMHgyMCwgMHg0MCwgMHg4MCwgMHgxYiwgMHgzNl07XG5cblx0ICAgIC8qKlxuXHQgICAgICogQUVTIGJsb2NrIGNpcGhlciBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBBRVMgPSBDX2FsZ28uQUVTID0gQmxvY2tDaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgdDtcblxuXHQgICAgICAgICAgICAvLyBTa2lwIHJlc2V0IG9mIG5Sb3VuZHMgaGFzIGJlZW4gc2V0IGJlZm9yZSBhbmQga2V5IGRpZCBub3QgY2hhbmdlXG5cdCAgICAgICAgICAgIGlmICh0aGlzLl9uUm91bmRzICYmIHRoaXMuX2tleVByaW9yUmVzZXQgPT09IHRoaXMuX2tleSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBrZXkgPSB0aGlzLl9rZXlQcmlvclJlc2V0ID0gdGhpcy5fa2V5O1xuXHQgICAgICAgICAgICB2YXIga2V5V29yZHMgPSBrZXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBrZXlTaXplID0ga2V5LnNpZ0J5dGVzIC8gNDtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIG51bWJlciBvZiByb3VuZHNcblx0ICAgICAgICAgICAgdmFyIG5Sb3VuZHMgPSB0aGlzLl9uUm91bmRzID0ga2V5U2l6ZSArIDY7XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0ZSBudW1iZXIgb2Yga2V5IHNjaGVkdWxlIHJvd3Ncblx0ICAgICAgICAgICAgdmFyIGtzUm93cyA9IChuUm91bmRzICsgMSkgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGUga2V5IHNjaGVkdWxlXG5cdCAgICAgICAgICAgIHZhciBrZXlTY2hlZHVsZSA9IHRoaXMuX2tleVNjaGVkdWxlID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGtzUm93ID0gMDsga3NSb3cgPCBrc1Jvd3M7IGtzUm93KyspIHtcblx0ICAgICAgICAgICAgICAgIGlmIChrc1JvdyA8IGtleVNpemUpIHtcblx0ICAgICAgICAgICAgICAgICAgICBrZXlTY2hlZHVsZVtrc1Jvd10gPSBrZXlXb3Jkc1trc1Jvd107XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHQgPSBrZXlTY2hlZHVsZVtrc1JvdyAtIDFdO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKCEoa3NSb3cgJSBrZXlTaXplKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyBSb3Qgd29yZFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0ID0gKHQgPDwgOCkgfCAodCA+Pj4gMjQpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1YiB3b3JkXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHQgPSAoU0JPWFt0ID4+PiAyNF0gPDwgMjQpIHwgKFNCT1hbKHQgPj4+IDE2KSAmIDB4ZmZdIDw8IDE2KSB8IChTQk9YWyh0ID4+PiA4KSAmIDB4ZmZdIDw8IDgpIHwgU0JPWFt0ICYgMHhmZl07XG5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWl4IFJjb25cblx0ICAgICAgICAgICAgICAgICAgICAgICAgdCBePSBSQ09OWyhrc1JvdyAvIGtleVNpemUpIHwgMF0gPDwgMjQ7XG5cdCAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChrZXlTaXplID4gNiAmJiBrc1JvdyAlIGtleVNpemUgPT0gNCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdWIgd29yZFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0ID0gKFNCT1hbdCA+Pj4gMjRdIDw8IDI0KSB8IChTQk9YWyh0ID4+PiAxNikgJiAweGZmXSA8PCAxNikgfCAoU0JPWFsodCA+Pj4gOCkgJiAweGZmXSA8PCA4KSB8IFNCT1hbdCAmIDB4ZmZdO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgICAgIGtleVNjaGVkdWxlW2tzUm93XSA9IGtleVNjaGVkdWxlW2tzUm93IC0ga2V5U2l6ZV0gXiB0O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0ZSBpbnYga2V5IHNjaGVkdWxlXG5cdCAgICAgICAgICAgIHZhciBpbnZLZXlTY2hlZHVsZSA9IHRoaXMuX2ludktleVNjaGVkdWxlID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGludktzUm93ID0gMDsgaW52S3NSb3cgPCBrc1Jvd3M7IGludktzUm93KyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBrc1JvdyA9IGtzUm93cyAtIGludktzUm93O1xuXG5cdCAgICAgICAgICAgICAgICBpZiAoaW52S3NSb3cgJSA0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBrZXlTY2hlZHVsZVtrc1Jvd107XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0ID0ga2V5U2NoZWR1bGVba3NSb3cgLSA0XTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgaWYgKGludktzUm93IDwgNCB8fCBrc1JvdyA8PSA0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaW52S2V5U2NoZWR1bGVbaW52S3NSb3ddID0gdDtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaW52S2V5U2NoZWR1bGVbaW52S3NSb3ddID0gSU5WX1NVQl9NSVhfMFtTQk9YW3QgPj4+IDI0XV0gXiBJTlZfU1VCX01JWF8xW1NCT1hbKHQgPj4+IDE2KSAmIDB4ZmZdXSBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSU5WX1NVQl9NSVhfMltTQk9YWyh0ID4+PiA4KSAmIDB4ZmZdXSBeIElOVl9TVUJfTUlYXzNbU0JPWFt0ICYgMHhmZl1dO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGVuY3J5cHRCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICB0aGlzLl9kb0NyeXB0QmxvY2soTSwgb2Zmc2V0LCB0aGlzLl9rZXlTY2hlZHVsZSwgU1VCX01JWF8wLCBTVUJfTUlYXzEsIFNVQl9NSVhfMiwgU1VCX01JWF8zLCBTQk9YKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgZGVjcnlwdEJsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFN3YXAgMm5kIGFuZCA0dGggcm93c1xuXHQgICAgICAgICAgICB2YXIgdCA9IE1bb2Zmc2V0ICsgMV07XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0ICsgMV0gPSBNW29mZnNldCArIDNdO1xuXHQgICAgICAgICAgICBNW29mZnNldCArIDNdID0gdDtcblxuXHQgICAgICAgICAgICB0aGlzLl9kb0NyeXB0QmxvY2soTSwgb2Zmc2V0LCB0aGlzLl9pbnZLZXlTY2hlZHVsZSwgSU5WX1NVQl9NSVhfMCwgSU5WX1NVQl9NSVhfMSwgSU5WX1NVQl9NSVhfMiwgSU5WX1NVQl9NSVhfMywgSU5WX1NCT1gpO1xuXG5cdCAgICAgICAgICAgIC8vIEludiBzd2FwIDJuZCBhbmQgNHRoIHJvd3Ncblx0ICAgICAgICAgICAgdmFyIHQgPSBNW29mZnNldCArIDFdO1xuXHQgICAgICAgICAgICBNW29mZnNldCArIDFdID0gTVtvZmZzZXQgKyAzXTtcblx0ICAgICAgICAgICAgTVtvZmZzZXQgKyAzXSA9IHQ7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0NyeXB0QmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQsIGtleVNjaGVkdWxlLCBTVUJfTUlYXzAsIFNVQl9NSVhfMSwgU1VCX01JWF8yLCBTVUJfTUlYXzMsIFNCT1gpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIG5Sb3VuZHMgPSB0aGlzLl9uUm91bmRzO1xuXG5cdCAgICAgICAgICAgIC8vIEdldCBpbnB1dCwgYWRkIHJvdW5kIGtleVxuXHQgICAgICAgICAgICB2YXIgczAgPSBNW29mZnNldF0gICAgIF4ga2V5U2NoZWR1bGVbMF07XG5cdCAgICAgICAgICAgIHZhciBzMSA9IE1bb2Zmc2V0ICsgMV0gXiBrZXlTY2hlZHVsZVsxXTtcblx0ICAgICAgICAgICAgdmFyIHMyID0gTVtvZmZzZXQgKyAyXSBeIGtleVNjaGVkdWxlWzJdO1xuXHQgICAgICAgICAgICB2YXIgczMgPSBNW29mZnNldCArIDNdIF4ga2V5U2NoZWR1bGVbM107XG5cblx0ICAgICAgICAgICAgLy8gS2V5IHNjaGVkdWxlIHJvdyBjb3VudGVyXG5cdCAgICAgICAgICAgIHZhciBrc1JvdyA9IDQ7XG5cblx0ICAgICAgICAgICAgLy8gUm91bmRzXG5cdCAgICAgICAgICAgIGZvciAodmFyIHJvdW5kID0gMTsgcm91bmQgPCBuUm91bmRzOyByb3VuZCsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaGlmdCByb3dzLCBzdWIgYnl0ZXMsIG1peCBjb2x1bW5zLCBhZGQgcm91bmQga2V5XG5cdCAgICAgICAgICAgICAgICB2YXIgdDAgPSBTVUJfTUlYXzBbczAgPj4+IDI0XSBeIFNVQl9NSVhfMVsoczEgPj4+IDE2KSAmIDB4ZmZdIF4gU1VCX01JWF8yWyhzMiA+Pj4gOCkgJiAweGZmXSBeIFNVQl9NSVhfM1tzMyAmIDB4ZmZdIF4ga2V5U2NoZWR1bGVba3NSb3crK107XG5cdCAgICAgICAgICAgICAgICB2YXIgdDEgPSBTVUJfTUlYXzBbczEgPj4+IDI0XSBeIFNVQl9NSVhfMVsoczIgPj4+IDE2KSAmIDB4ZmZdIF4gU1VCX01JWF8yWyhzMyA+Pj4gOCkgJiAweGZmXSBeIFNVQl9NSVhfM1tzMCAmIDB4ZmZdIF4ga2V5U2NoZWR1bGVba3NSb3crK107XG5cdCAgICAgICAgICAgICAgICB2YXIgdDIgPSBTVUJfTUlYXzBbczIgPj4+IDI0XSBeIFNVQl9NSVhfMVsoczMgPj4+IDE2KSAmIDB4ZmZdIF4gU1VCX01JWF8yWyhzMCA+Pj4gOCkgJiAweGZmXSBeIFNVQl9NSVhfM1tzMSAmIDB4ZmZdIF4ga2V5U2NoZWR1bGVba3NSb3crK107XG5cdCAgICAgICAgICAgICAgICB2YXIgdDMgPSBTVUJfTUlYXzBbczMgPj4+IDI0XSBeIFNVQl9NSVhfMVsoczAgPj4+IDE2KSAmIDB4ZmZdIF4gU1VCX01JWF8yWyhzMSA+Pj4gOCkgJiAweGZmXSBeIFNVQl9NSVhfM1tzMiAmIDB4ZmZdIF4ga2V5U2NoZWR1bGVba3NSb3crK107XG5cblx0ICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBzdGF0ZVxuXHQgICAgICAgICAgICAgICAgczAgPSB0MDtcblx0ICAgICAgICAgICAgICAgIHMxID0gdDE7XG5cdCAgICAgICAgICAgICAgICBzMiA9IHQyO1xuXHQgICAgICAgICAgICAgICAgczMgPSB0Mztcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFNoaWZ0IHJvd3MsIHN1YiBieXRlcywgYWRkIHJvdW5kIGtleVxuXHQgICAgICAgICAgICB2YXIgdDAgPSAoKFNCT1hbczAgPj4+IDI0XSA8PCAyNCkgfCAoU0JPWFsoczEgPj4+IDE2KSAmIDB4ZmZdIDw8IDE2KSB8IChTQk9YWyhzMiA+Pj4gOCkgJiAweGZmXSA8PCA4KSB8IFNCT1hbczMgJiAweGZmXSkgXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblx0ICAgICAgICAgICAgdmFyIHQxID0gKChTQk9YW3MxID4+PiAyNF0gPDwgMjQpIHwgKFNCT1hbKHMyID4+PiAxNikgJiAweGZmXSA8PCAxNikgfCAoU0JPWFsoczMgPj4+IDgpICYgMHhmZl0gPDwgOCkgfCBTQk9YW3MwICYgMHhmZl0pIF4ga2V5U2NoZWR1bGVba3NSb3crK107XG5cdCAgICAgICAgICAgIHZhciB0MiA9ICgoU0JPWFtzMiA+Pj4gMjRdIDw8IDI0KSB8IChTQk9YWyhzMyA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHwgKFNCT1hbKHMwID4+PiA4KSAmIDB4ZmZdIDw8IDgpIHwgU0JPWFtzMSAmIDB4ZmZdKSBeIGtleVNjaGVkdWxlW2tzUm93KytdO1xuXHQgICAgICAgICAgICB2YXIgdDMgPSAoKFNCT1hbczMgPj4+IDI0XSA8PCAyNCkgfCAoU0JPWFsoczAgPj4+IDE2KSAmIDB4ZmZdIDw8IDE2KSB8IChTQk9YWyhzMSA+Pj4gOCkgJiAweGZmXSA8PCA4KSB8IFNCT1hbczIgJiAweGZmXSkgXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblxuXHQgICAgICAgICAgICAvLyBTZXQgb3V0cHV0XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0XSAgICAgPSB0MDtcblx0ICAgICAgICAgICAgTVtvZmZzZXQgKyAxXSA9IHQxO1xuXHQgICAgICAgICAgICBNW29mZnNldCArIDJdID0gdDI7XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0ICsgM10gPSB0Mztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAga2V5U2l6ZTogMjU2LzMyXG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbnMgdG8gdGhlIGNpcGhlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGNpcGhlcnRleHQgPSBDcnlwdG9KUy5BRVMuZW5jcnlwdChtZXNzYWdlLCBrZXksIGNmZyk7XG5cdCAgICAgKiAgICAgdmFyIHBsYWludGV4dCAgPSBDcnlwdG9KUy5BRVMuZGVjcnlwdChjaXBoZXJ0ZXh0LCBrZXksIGNmZyk7XG5cdCAgICAgKi9cblx0ICAgIEMuQUVTID0gQmxvY2tDaXBoZXIuX2NyZWF0ZUhlbHBlcihBRVMpO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLkFFUztcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9lbmMtYmFzZTY0XCIpLCByZXF1aXJlKFwiLi9tZDVcIiksIHJlcXVpcmUoXCIuL2V2cGtkZlwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vZW5jLWJhc2U2NFwiLCBcIi4vbWQ1XCIsIFwiLi9ldnBrZGZcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIEJsb2NrQ2lwaGVyID0gQ19saWIuQmxvY2tDaXBoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBQZXJtdXRlZCBDaG9pY2UgMSBjb25zdGFudHNcblx0ICAgIHZhciBQQzEgPSBbXG5cdCAgICAgICAgNTcsIDQ5LCA0MSwgMzMsIDI1LCAxNywgOSwgIDEsXG5cdCAgICAgICAgNTgsIDUwLCA0MiwgMzQsIDI2LCAxOCwgMTAsIDIsXG5cdCAgICAgICAgNTksIDUxLCA0MywgMzUsIDI3LCAxOSwgMTEsIDMsXG5cdCAgICAgICAgNjAsIDUyLCA0NCwgMzYsIDYzLCA1NSwgNDcsIDM5LFxuXHQgICAgICAgIDMxLCAyMywgMTUsIDcsICA2MiwgNTQsIDQ2LCAzOCxcblx0ICAgICAgICAzMCwgMjIsIDE0LCA2LCAgNjEsIDUzLCA0NSwgMzcsXG5cdCAgICAgICAgMjksIDIxLCAxMywgNSwgIDI4LCAyMCwgMTIsIDRcblx0ICAgIF07XG5cblx0ICAgIC8vIFBlcm11dGVkIENob2ljZSAyIGNvbnN0YW50c1xuXHQgICAgdmFyIFBDMiA9IFtcblx0ICAgICAgICAxNCwgMTcsIDExLCAyNCwgMSwgIDUsXG5cdCAgICAgICAgMywgIDI4LCAxNSwgNiwgIDIxLCAxMCxcblx0ICAgICAgICAyMywgMTksIDEyLCA0LCAgMjYsIDgsXG5cdCAgICAgICAgMTYsIDcsICAyNywgMjAsIDEzLCAyLFxuXHQgICAgICAgIDQxLCA1MiwgMzEsIDM3LCA0NywgNTUsXG5cdCAgICAgICAgMzAsIDQwLCA1MSwgNDUsIDMzLCA0OCxcblx0ICAgICAgICA0NCwgNDksIDM5LCA1NiwgMzQsIDUzLFxuXHQgICAgICAgIDQ2LCA0MiwgNTAsIDM2LCAyOSwgMzJcblx0ICAgIF07XG5cblx0ICAgIC8vIEN1bXVsYXRpdmUgYml0IHNoaWZ0IGNvbnN0YW50c1xuXHQgICAgdmFyIEJJVF9TSElGVFMgPSBbMSwgIDIsICA0LCAgNiwgIDgsICAxMCwgMTIsIDE0LCAxNSwgMTcsIDE5LCAyMSwgMjMsIDI1LCAyNywgMjhdO1xuXG5cdCAgICAvLyBTQk9YZXMgYW5kIHJvdW5kIHBlcm11dGF0aW9uIGNvbnN0YW50c1xuXHQgICAgdmFyIFNCT1hfUCA9IFtcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIDB4MDogMHg4MDgyMDAsXG5cdCAgICAgICAgICAgIDB4MTAwMDAwMDA6IDB4ODAwMCxcblx0ICAgICAgICAgICAgMHgyMDAwMDAwMDogMHg4MDgwMDIsXG5cdCAgICAgICAgICAgIDB4MzAwMDAwMDA6IDB4Mixcblx0ICAgICAgICAgICAgMHg0MDAwMDAwMDogMHgyMDAsXG5cdCAgICAgICAgICAgIDB4NTAwMDAwMDA6IDB4ODA4MjAyLFxuXHQgICAgICAgICAgICAweDYwMDAwMDAwOiAweDgwMDIwMixcblx0ICAgICAgICAgICAgMHg3MDAwMDAwMDogMHg4MDAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDA6IDB4MjAyLFxuXHQgICAgICAgICAgICAweDkwMDAwMDAwOiAweDgwMDIwMCxcblx0ICAgICAgICAgICAgMHhhMDAwMDAwMDogMHg4MjAwLFxuXHQgICAgICAgICAgICAweGIwMDAwMDAwOiAweDgwODAwMCxcblx0ICAgICAgICAgICAgMHhjMDAwMDAwMDogMHg4MDAyLFxuXHQgICAgICAgICAgICAweGQwMDAwMDAwOiAweDgwMDAwMixcblx0ICAgICAgICAgICAgMHhlMDAwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweGYwMDAwMDAwOiAweDgyMDIsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweDE4MDAwMDAwOiAweDgwODIwMixcblx0ICAgICAgICAgICAgMHgyODAwMDAwMDogMHg4MjAyLFxuXHQgICAgICAgICAgICAweDM4MDAwMDAwOiAweDgwMDAsXG5cdCAgICAgICAgICAgIDB4NDgwMDAwMDA6IDB4ODA4MjAwLFxuXHQgICAgICAgICAgICAweDU4MDAwMDAwOiAweDIwMCxcblx0ICAgICAgICAgICAgMHg2ODAwMDAwMDogMHg4MDgwMDIsXG5cdCAgICAgICAgICAgIDB4NzgwMDAwMDA6IDB4Mixcblx0ICAgICAgICAgICAgMHg4ODAwMDAwMDogMHg4MDAyMDAsXG5cdCAgICAgICAgICAgIDB4OTgwMDAwMDA6IDB4ODIwMCxcblx0ICAgICAgICAgICAgMHhhODAwMDAwMDogMHg4MDgwMDAsXG5cdCAgICAgICAgICAgIDB4YjgwMDAwMDA6IDB4ODAwMjAyLFxuXHQgICAgICAgICAgICAweGM4MDAwMDAwOiAweDgwMDAwMixcblx0ICAgICAgICAgICAgMHhkODAwMDAwMDogMHg4MDAyLFxuXHQgICAgICAgICAgICAweGU4MDAwMDAwOiAweDIwMixcblx0ICAgICAgICAgICAgMHhmODAwMDAwMDogMHg4MDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTogMHg4MDAwLFxuXHQgICAgICAgICAgICAweDEwMDAwMDAxOiAweDIsXG5cdCAgICAgICAgICAgIDB4MjAwMDAwMDE6IDB4ODA4MjAwLFxuXHQgICAgICAgICAgICAweDMwMDAwMDAxOiAweDgwMDAwMCxcblx0ICAgICAgICAgICAgMHg0MDAwMDAwMTogMHg4MDgwMDIsXG5cdCAgICAgICAgICAgIDB4NTAwMDAwMDE6IDB4ODIwMCxcblx0ICAgICAgICAgICAgMHg2MDAwMDAwMTogMHgyMDAsXG5cdCAgICAgICAgICAgIDB4NzAwMDAwMDE6IDB4ODAwMjAyLFxuXHQgICAgICAgICAgICAweDgwMDAwMDAxOiAweDgwODIwMixcblx0ICAgICAgICAgICAgMHg5MDAwMDAwMTogMHg4MDgwMDAsXG5cdCAgICAgICAgICAgIDB4YTAwMDAwMDE6IDB4ODAwMDAyLFxuXHQgICAgICAgICAgICAweGIwMDAwMDAxOiAweDgyMDIsXG5cdCAgICAgICAgICAgIDB4YzAwMDAwMDE6IDB4MjAyLFxuXHQgICAgICAgICAgICAweGQwMDAwMDAxOiAweDgwMDIwMCxcblx0ICAgICAgICAgICAgMHhlMDAwMDAwMTogMHg4MDAyLFxuXHQgICAgICAgICAgICAweGYwMDAwMDAxOiAweDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTogMHg4MDgyMDIsXG5cdCAgICAgICAgICAgIDB4MTgwMDAwMDE6IDB4ODA4MDAwLFxuXHQgICAgICAgICAgICAweDI4MDAwMDAxOiAweDgwMDAwMCxcblx0ICAgICAgICAgICAgMHgzODAwMDAwMTogMHgyMDAsXG5cdCAgICAgICAgICAgIDB4NDgwMDAwMDE6IDB4ODAwMCxcblx0ICAgICAgICAgICAgMHg1ODAwMDAwMTogMHg4MDAwMDIsXG5cdCAgICAgICAgICAgIDB4NjgwMDAwMDE6IDB4Mixcblx0ICAgICAgICAgICAgMHg3ODAwMDAwMTogMHg4MjAyLFxuXHQgICAgICAgICAgICAweDg4MDAwMDAxOiAweDgwMDIsXG5cdCAgICAgICAgICAgIDB4OTgwMDAwMDE6IDB4ODAwMjAyLFxuXHQgICAgICAgICAgICAweGE4MDAwMDAxOiAweDIwMixcblx0ICAgICAgICAgICAgMHhiODAwMDAwMTogMHg4MDgyMDAsXG5cdCAgICAgICAgICAgIDB4YzgwMDAwMDE6IDB4ODAwMjAwLFxuXHQgICAgICAgICAgICAweGQ4MDAwMDAxOiAweDAsXG5cdCAgICAgICAgICAgIDB4ZTgwMDAwMDE6IDB4ODIwMCxcblx0ICAgICAgICAgICAgMHhmODAwMDAwMTogMHg4MDgwMDJcblx0ICAgICAgICB9LFxuXHQgICAgICAgIHtcblx0ICAgICAgICAgICAgMHgwOiAweDQwMDg0MDEwLFxuXHQgICAgICAgICAgICAweDEwMDAwMDA6IDB4NDAwMCxcblx0ICAgICAgICAgICAgMHgyMDAwMDAwOiAweDgwMDAwLFxuXHQgICAgICAgICAgICAweDMwMDAwMDA6IDB4NDAwODAwMTAsXG5cdCAgICAgICAgICAgIDB4NDAwMDAwMDogMHg0MDAwMDAxMCxcblx0ICAgICAgICAgICAgMHg1MDAwMDAwOiAweDQwMDg0MDAwLFxuXHQgICAgICAgICAgICAweDYwMDAwMDA6IDB4NDAwMDQwMDAsXG5cdCAgICAgICAgICAgIDB4NzAwMDAwMDogMHgxMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwOiAweDg0MDAwLFxuXHQgICAgICAgICAgICAweDkwMDAwMDA6IDB4NDAwMDQwMTAsXG5cdCAgICAgICAgICAgIDB4YTAwMDAwMDogMHg0MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHhiMDAwMDAwOiAweDg0MDEwLFxuXHQgICAgICAgICAgICAweGMwMDAwMDA6IDB4ODAwMTAsXG5cdCAgICAgICAgICAgIDB4ZDAwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweGUwMDAwMDA6IDB4NDAxMCxcblx0ICAgICAgICAgICAgMHhmMDAwMDAwOiAweDQwMDgwMDAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDogMHg0MDAwNDAwMCxcblx0ICAgICAgICAgICAgMHgxODAwMDAwOiAweDg0MDEwLFxuXHQgICAgICAgICAgICAweDI4MDAwMDA6IDB4MTAsXG5cdCAgICAgICAgICAgIDB4MzgwMDAwMDogMHg0MDAwNDAxMCxcblx0ICAgICAgICAgICAgMHg0ODAwMDAwOiAweDQwMDg0MDEwLFxuXHQgICAgICAgICAgICAweDU4MDAwMDA6IDB4NDAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4NjgwMDAwMDogMHg4MDAwMCxcblx0ICAgICAgICAgICAgMHg3ODAwMDAwOiAweDQwMDgwMDEwLFxuXHQgICAgICAgICAgICAweDg4MDAwMDA6IDB4ODAwMTAsXG5cdCAgICAgICAgICAgIDB4OTgwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweGE4MDAwMDA6IDB4NDAwMCxcblx0ICAgICAgICAgICAgMHhiODAwMDAwOiAweDQwMDgwMDAwLFxuXHQgICAgICAgICAgICAweGM4MDAwMDA6IDB4NDAwMDAwMTAsXG5cdCAgICAgICAgICAgIDB4ZDgwMDAwMDogMHg4NDAwMCxcblx0ICAgICAgICAgICAgMHhlODAwMDAwOiAweDQwMDg0MDAwLFxuXHQgICAgICAgICAgICAweGY4MDAwMDA6IDB4NDAxMCxcblx0ICAgICAgICAgICAgMHgxMDAwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweDExMDAwMDAwOiAweDQwMDgwMDEwLFxuXHQgICAgICAgICAgICAweDEyMDAwMDAwOiAweDQwMDA0MDEwLFxuXHQgICAgICAgICAgICAweDEzMDAwMDAwOiAweDQwMDg0MDAwLFxuXHQgICAgICAgICAgICAweDE0MDAwMDAwOiAweDQwMDgwMDAwLFxuXHQgICAgICAgICAgICAweDE1MDAwMDAwOiAweDEwLFxuXHQgICAgICAgICAgICAweDE2MDAwMDAwOiAweDg0MDEwLFxuXHQgICAgICAgICAgICAweDE3MDAwMDAwOiAweDQwMDAsXG5cdCAgICAgICAgICAgIDB4MTgwMDAwMDA6IDB4NDAxMCxcblx0ICAgICAgICAgICAgMHgxOTAwMDAwMDogMHg4MDAwMCxcblx0ICAgICAgICAgICAgMHgxYTAwMDAwMDogMHg4MDAxMCxcblx0ICAgICAgICAgICAgMHgxYjAwMDAwMDogMHg0MDAwMDAxMCxcblx0ICAgICAgICAgICAgMHgxYzAwMDAwMDogMHg4NDAwMCxcblx0ICAgICAgICAgICAgMHgxZDAwMDAwMDogMHg0MDAwNDAwMCxcblx0ICAgICAgICAgICAgMHgxZTAwMDAwMDogMHg0MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxZjAwMDAwMDogMHg0MDA4NDAxMCxcblx0ICAgICAgICAgICAgMHgxMDgwMDAwMDogMHg4NDAxMCxcblx0ICAgICAgICAgICAgMHgxMTgwMDAwMDogMHg4MDAwMCxcblx0ICAgICAgICAgICAgMHgxMjgwMDAwMDogMHg0MDA4MDAwMCxcblx0ICAgICAgICAgICAgMHgxMzgwMDAwMDogMHg0MDAwLFxuXHQgICAgICAgICAgICAweDE0ODAwMDAwOiAweDQwMDA0MDAwLFxuXHQgICAgICAgICAgICAweDE1ODAwMDAwOiAweDQwMDg0MDEwLFxuXHQgICAgICAgICAgICAweDE2ODAwMDAwOiAweDEwLFxuXHQgICAgICAgICAgICAweDE3ODAwMDAwOiAweDQwMDAwMDAwLFxuXHQgICAgICAgICAgICAweDE4ODAwMDAwOiAweDQwMDg0MDAwLFxuXHQgICAgICAgICAgICAweDE5ODAwMDAwOiAweDQwMDAwMDEwLFxuXHQgICAgICAgICAgICAweDFhODAwMDAwOiAweDQwMDA0MDEwLFxuXHQgICAgICAgICAgICAweDFiODAwMDAwOiAweDgwMDEwLFxuXHQgICAgICAgICAgICAweDFjODAwMDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWQ4MDAwMDA6IDB4NDAxMCxcblx0ICAgICAgICAgICAgMHgxZTgwMDAwMDogMHg0MDA4MDAxMCxcblx0ICAgICAgICAgICAgMHgxZjgwMDAwMDogMHg4NDAwMFxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4MTA0LFxuXHQgICAgICAgICAgICAweDEwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweDIwMDAwMDogMHg0MDAwMTAwLFxuXHQgICAgICAgICAgICAweDMwMDAwMDogMHgxMDEwNCxcblx0ICAgICAgICAgICAgMHg0MDAwMDA6IDB4MTAwMDQsXG5cdCAgICAgICAgICAgIDB4NTAwMDAwOiAweDQwMDAwMDQsXG5cdCAgICAgICAgICAgIDB4NjAwMDAwOiAweDQwMTAxMDQsXG5cdCAgICAgICAgICAgIDB4NzAwMDAwOiAweDQwMTAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwOiAweDQwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4OTAwMDAwOiAweDQwMTAxMDAsXG5cdCAgICAgICAgICAgIDB4YTAwMDAwOiAweDEwMTAwLFxuXHQgICAgICAgICAgICAweGIwMDAwMDogMHg0MDEwMDA0LFxuXHQgICAgICAgICAgICAweGMwMDAwMDogMHg0MDAwMTA0LFxuXHQgICAgICAgICAgICAweGQwMDAwMDogMHgxMDAwMCxcblx0ICAgICAgICAgICAgMHhlMDAwMDA6IDB4NCxcblx0ICAgICAgICAgICAgMHhmMDAwMDA6IDB4MTAwLFxuXHQgICAgICAgICAgICAweDgwMDAwOiAweDQwMTAxMDAsXG5cdCAgICAgICAgICAgIDB4MTgwMDAwOiAweDQwMTAwMDQsXG5cdCAgICAgICAgICAgIDB4MjgwMDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MzgwMDAwOiAweDQwMDAxMDAsXG5cdCAgICAgICAgICAgIDB4NDgwMDAwOiAweDQwMDAwMDQsXG5cdCAgICAgICAgICAgIDB4NTgwMDAwOiAweDEwMDAwLFxuXHQgICAgICAgICAgICAweDY4MDAwMDogMHgxMDAwNCxcblx0ICAgICAgICAgICAgMHg3ODAwMDA6IDB4MTA0LFxuXHQgICAgICAgICAgICAweDg4MDAwMDogMHg0LFxuXHQgICAgICAgICAgICAweDk4MDAwMDogMHgxMDAsXG5cdCAgICAgICAgICAgIDB4YTgwMDAwOiAweDQwMTAwMDAsXG5cdCAgICAgICAgICAgIDB4YjgwMDAwOiAweDEwMTA0LFxuXHQgICAgICAgICAgICAweGM4MDAwMDogMHgxMDEwMCxcblx0ICAgICAgICAgICAgMHhkODAwMDA6IDB4NDAwMDEwNCxcblx0ICAgICAgICAgICAgMHhlODAwMDA6IDB4NDAxMDEwNCxcblx0ICAgICAgICAgICAgMHhmODAwMDA6IDB4NDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxMDAwMDAwOiAweDQwMTAxMDAsXG5cdCAgICAgICAgICAgIDB4MTEwMDAwMDogMHgxMDAwNCxcblx0ICAgICAgICAgICAgMHgxMjAwMDAwOiAweDEwMDAwLFxuXHQgICAgICAgICAgICAweDEzMDAwMDA6IDB4NDAwMDEwMCxcblx0ICAgICAgICAgICAgMHgxNDAwMDAwOiAweDEwMCxcblx0ICAgICAgICAgICAgMHgxNTAwMDAwOiAweDQwMTAxMDQsXG5cdCAgICAgICAgICAgIDB4MTYwMDAwMDogMHg0MDAwMDA0LFxuXHQgICAgICAgICAgICAweDE3MDAwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHgxODAwMDAwOiAweDQwMDAxMDQsXG5cdCAgICAgICAgICAgIDB4MTkwMDAwMDogMHg0MDAwMDAwLFxuXHQgICAgICAgICAgICAweDFhMDAwMDA6IDB4NCxcblx0ICAgICAgICAgICAgMHgxYjAwMDAwOiAweDEwMTAwLFxuXHQgICAgICAgICAgICAweDFjMDAwMDA6IDB4NDAxMDAwMCxcblx0ICAgICAgICAgICAgMHgxZDAwMDAwOiAweDEwNCxcblx0ICAgICAgICAgICAgMHgxZTAwMDAwOiAweDEwMTA0LFxuXHQgICAgICAgICAgICAweDFmMDAwMDA6IDB4NDAxMDAwNCxcblx0ICAgICAgICAgICAgMHgxMDgwMDAwOiAweDQwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTE4MDAwMDogMHgxMDQsXG5cdCAgICAgICAgICAgIDB4MTI4MDAwMDogMHg0MDEwMTAwLFxuXHQgICAgICAgICAgICAweDEzODAwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHgxNDgwMDAwOiAweDEwMDA0LFxuXHQgICAgICAgICAgICAweDE1ODAwMDA6IDB4NDAwMDEwMCxcblx0ICAgICAgICAgICAgMHgxNjgwMDAwOiAweDEwMCxcblx0ICAgICAgICAgICAgMHgxNzgwMDAwOiAweDQwMTAwMDQsXG5cdCAgICAgICAgICAgIDB4MTg4MDAwMDogMHgxMDAwMCxcblx0ICAgICAgICAgICAgMHgxOTgwMDAwOiAweDQwMTAxMDQsXG5cdCAgICAgICAgICAgIDB4MWE4MDAwMDogMHgxMDEwNCxcblx0ICAgICAgICAgICAgMHgxYjgwMDAwOiAweDQwMDAwMDQsXG5cdCAgICAgICAgICAgIDB4MWM4MDAwMDogMHg0MDAwMTA0LFxuXHQgICAgICAgICAgICAweDFkODAwMDA6IDB4NDAxMDAwMCxcblx0ICAgICAgICAgICAgMHgxZTgwMDAwOiAweDQsXG5cdCAgICAgICAgICAgIDB4MWY4MDAwMDogMHgxMDEwMFxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4ODA0MDEwMDAsXG5cdCAgICAgICAgICAgIDB4MTAwMDA6IDB4ODAwMDEwNDAsXG5cdCAgICAgICAgICAgIDB4MjAwMDA6IDB4NDAxMDQwLFxuXHQgICAgICAgICAgICAweDMwMDAwOiAweDgwNDAwMDAwLFxuXHQgICAgICAgICAgICAweDQwMDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4NTAwMDA6IDB4NDAxMDAwLFxuXHQgICAgICAgICAgICAweDYwMDAwOiAweDgwMDAwMDQwLFxuXHQgICAgICAgICAgICAweDcwMDAwOiAweDQwMDA0MCxcblx0ICAgICAgICAgICAgMHg4MDAwMDogMHg4MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHg5MDAwMDogMHg0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4YTAwMDA6IDB4NDAsXG5cdCAgICAgICAgICAgIDB4YjAwMDA6IDB4ODAwMDEwMDAsXG5cdCAgICAgICAgICAgIDB4YzAwMDA6IDB4ODA0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4ZDAwMDA6IDB4MTA0MCxcblx0ICAgICAgICAgICAgMHhlMDAwMDogMHgxMDAwLFxuXHQgICAgICAgICAgICAweGYwMDAwOiAweDgwNDAxMDQwLFxuXHQgICAgICAgICAgICAweDgwMDA6IDB4ODAwMDEwNDAsXG5cdCAgICAgICAgICAgIDB4MTgwMDA6IDB4NDAsXG5cdCAgICAgICAgICAgIDB4MjgwMDA6IDB4ODA0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4MzgwMDA6IDB4ODAwMDEwMDAsXG5cdCAgICAgICAgICAgIDB4NDgwMDA6IDB4NDAxMDAwLFxuXHQgICAgICAgICAgICAweDU4MDAwOiAweDgwNDAxMDQwLFxuXHQgICAgICAgICAgICAweDY4MDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4NzgwMDA6IDB4ODA0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4ODgwMDA6IDB4MTAwMCxcblx0ICAgICAgICAgICAgMHg5ODAwMDogMHg4MDQwMTAwMCxcblx0ICAgICAgICAgICAgMHhhODAwMDogMHg0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4YjgwMDA6IDB4MTA0MCxcblx0ICAgICAgICAgICAgMHhjODAwMDogMHg4MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHhkODAwMDogMHg0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4ZTgwMDA6IDB4NDAxMDQwLFxuXHQgICAgICAgICAgICAweGY4MDAwOiAweDgwMDAwMDQwLFxuXHQgICAgICAgICAgICAweDEwMDAwMDogMHg0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4MTEwMDAwOiAweDQwMTAwMCxcblx0ICAgICAgICAgICAgMHgxMjAwMDA6IDB4ODAwMDAwNDAsXG5cdCAgICAgICAgICAgIDB4MTMwMDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MTQwMDAwOiAweDEwNDAsXG5cdCAgICAgICAgICAgIDB4MTUwMDAwOiAweDgwNDAwMDQwLFxuXHQgICAgICAgICAgICAweDE2MDAwMDogMHg4MDQwMTAwMCxcblx0ICAgICAgICAgICAgMHgxNzAwMDA6IDB4ODAwMDEwNDAsXG5cdCAgICAgICAgICAgIDB4MTgwMDAwOiAweDgwNDAxMDQwLFxuXHQgICAgICAgICAgICAweDE5MDAwMDogMHg4MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxYTAwMDA6IDB4ODA0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWIwMDAwOiAweDQwMTA0MCxcblx0ICAgICAgICAgICAgMHgxYzAwMDA6IDB4ODAwMDEwMDAsXG5cdCAgICAgICAgICAgIDB4MWQwMDAwOiAweDQwMDAwMCxcblx0ICAgICAgICAgICAgMHgxZTAwMDA6IDB4NDAsXG5cdCAgICAgICAgICAgIDB4MWYwMDAwOiAweDEwMDAsXG5cdCAgICAgICAgICAgIDB4MTA4MDAwOiAweDgwNDAwMDAwLFxuXHQgICAgICAgICAgICAweDExODAwMDogMHg4MDQwMTA0MCxcblx0ICAgICAgICAgICAgMHgxMjgwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHgxMzgwMDA6IDB4NDAxMDAwLFxuXHQgICAgICAgICAgICAweDE0ODAwMDogMHg0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4MTU4MDAwOiAweDgwMDAwMDAwLFxuXHQgICAgICAgICAgICAweDE2ODAwMDogMHg4MDAwMTA0MCxcblx0ICAgICAgICAgICAgMHgxNzgwMDA6IDB4NDAsXG5cdCAgICAgICAgICAgIDB4MTg4MDAwOiAweDgwMDAwMDQwLFxuXHQgICAgICAgICAgICAweDE5ODAwMDogMHgxMDAwLFxuXHQgICAgICAgICAgICAweDFhODAwMDogMHg4MDAwMTAwMCxcblx0ICAgICAgICAgICAgMHgxYjgwMDA6IDB4ODA0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4MWM4MDAwOiAweDEwNDAsXG5cdCAgICAgICAgICAgIDB4MWQ4MDAwOiAweDgwNDAxMDAwLFxuXHQgICAgICAgICAgICAweDFlODAwMDogMHg0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWY4MDAwOiAweDQwMTA0MFxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4ODAsXG5cdCAgICAgICAgICAgIDB4MTAwMDogMHgxMDQwMDAwLFxuXHQgICAgICAgICAgICAweDIwMDA6IDB4NDAwMDAsXG5cdCAgICAgICAgICAgIDB4MzAwMDogMHgyMDAwMDAwMCxcblx0ICAgICAgICAgICAgMHg0MDAwOiAweDIwMDQwMDgwLFxuXHQgICAgICAgICAgICAweDUwMDA6IDB4MTAwMDA4MCxcblx0ICAgICAgICAgICAgMHg2MDAwOiAweDIxMDAwMDgwLFxuXHQgICAgICAgICAgICAweDcwMDA6IDB4NDAwODAsXG5cdCAgICAgICAgICAgIDB4ODAwMDogMHgxMDAwMDAwLFxuXHQgICAgICAgICAgICAweDkwMDA6IDB4MjAwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4YTAwMDogMHgyMDAwMDA4MCxcblx0ICAgICAgICAgICAgMHhiMDAwOiAweDIxMDQwMDgwLFxuXHQgICAgICAgICAgICAweGMwMDA6IDB4MjEwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4ZDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweGUwMDA6IDB4MTA0MDA4MCxcblx0ICAgICAgICAgICAgMHhmMDAwOiAweDIxMDAwMDAwLFxuXHQgICAgICAgICAgICAweDgwMDogMHgxMDQwMDgwLFxuXHQgICAgICAgICAgICAweDE4MDA6IDB4MjEwMDAwODAsXG5cdCAgICAgICAgICAgIDB4MjgwMDogMHg4MCxcblx0ICAgICAgICAgICAgMHgzODAwOiAweDEwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4NDgwMDogMHg0MDAwMCxcblx0ICAgICAgICAgICAgMHg1ODAwOiAweDIwMDQwMDgwLFxuXHQgICAgICAgICAgICAweDY4MDA6IDB4MjEwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4NzgwMDogMHgyMDAwMDAwMCxcblx0ICAgICAgICAgICAgMHg4ODAwOiAweDIwMDQwMDAwLFxuXHQgICAgICAgICAgICAweDk4MDA6IDB4MCxcblx0ICAgICAgICAgICAgMHhhODAwOiAweDIxMDQwMDgwLFxuXHQgICAgICAgICAgICAweGI4MDA6IDB4MTAwMDA4MCxcblx0ICAgICAgICAgICAgMHhjODAwOiAweDIwMDAwMDgwLFxuXHQgICAgICAgICAgICAweGQ4MDA6IDB4MjEwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4ZTgwMDogMHgxMDAwMDAwLFxuXHQgICAgICAgICAgICAweGY4MDA6IDB4NDAwODAsXG5cdCAgICAgICAgICAgIDB4MTAwMDA6IDB4NDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTEwMDA6IDB4ODAsXG5cdCAgICAgICAgICAgIDB4MTIwMDA6IDB4MjAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTMwMDA6IDB4MjEwMDAwODAsXG5cdCAgICAgICAgICAgIDB4MTQwMDA6IDB4MTAwMDA4MCxcblx0ICAgICAgICAgICAgMHgxNTAwMDogMHgyMTA0MDAwMCxcblx0ICAgICAgICAgICAgMHgxNjAwMDogMHgyMDA0MDA4MCxcblx0ICAgICAgICAgICAgMHgxNzAwMDogMHgxMDAwMDAwLFxuXHQgICAgICAgICAgICAweDE4MDAwOiAweDIxMDQwMDgwLFxuXHQgICAgICAgICAgICAweDE5MDAwOiAweDIxMDAwMDAwLFxuXHQgICAgICAgICAgICAweDFhMDAwOiAweDEwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWIwMDA6IDB4MjAwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWMwMDA6IDB4NDAwODAsXG5cdCAgICAgICAgICAgIDB4MWQwMDA6IDB4MjAwMDAwODAsXG5cdCAgICAgICAgICAgIDB4MWUwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHgxZjAwMDogMHgxMDQwMDgwLFxuXHQgICAgICAgICAgICAweDEwODAwOiAweDIxMDAwMDgwLFxuXHQgICAgICAgICAgICAweDExODAwOiAweDEwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTI4MDA6IDB4MTA0MDAwMCxcblx0ICAgICAgICAgICAgMHgxMzgwMDogMHgyMDA0MDA4MCxcblx0ICAgICAgICAgICAgMHgxNDgwMDogMHgyMDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxNTgwMDogMHgxMDQwMDgwLFxuXHQgICAgICAgICAgICAweDE2ODAwOiAweDgwLFxuXHQgICAgICAgICAgICAweDE3ODAwOiAweDIxMDQwMDAwLFxuXHQgICAgICAgICAgICAweDE4ODAwOiAweDQwMDgwLFxuXHQgICAgICAgICAgICAweDE5ODAwOiAweDIxMDQwMDgwLFxuXHQgICAgICAgICAgICAweDFhODAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWI4MDA6IDB4MjEwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWM4MDA6IDB4MTAwMDA4MCxcblx0ICAgICAgICAgICAgMHgxZDgwMDogMHg0MDAwMCxcblx0ICAgICAgICAgICAgMHgxZTgwMDogMHgyMDA0MDAwMCxcblx0ICAgICAgICAgICAgMHgxZjgwMDogMHgyMDAwMDA4MFxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4MTAwMDAwMDgsXG5cdCAgICAgICAgICAgIDB4MTAwOiAweDIwMDAsXG5cdCAgICAgICAgICAgIDB4MjAwOiAweDEwMjAwMDAwLFxuXHQgICAgICAgICAgICAweDMwMDogMHgxMDIwMjAwOCxcblx0ICAgICAgICAgICAgMHg0MDA6IDB4MTAwMDIwMDAsXG5cdCAgICAgICAgICAgIDB4NTAwOiAweDIwMDAwMCxcblx0ICAgICAgICAgICAgMHg2MDA6IDB4MjAwMDA4LFxuXHQgICAgICAgICAgICAweDcwMDogMHgxMDAwMDAwMCxcblx0ICAgICAgICAgICAgMHg4MDA6IDB4MCxcblx0ICAgICAgICAgICAgMHg5MDA6IDB4MTAwMDIwMDgsXG5cdCAgICAgICAgICAgIDB4YTAwOiAweDIwMjAwMCxcblx0ICAgICAgICAgICAgMHhiMDA6IDB4OCxcblx0ICAgICAgICAgICAgMHhjMDA6IDB4MTAyMDAwMDgsXG5cdCAgICAgICAgICAgIDB4ZDAwOiAweDIwMjAwOCxcblx0ICAgICAgICAgICAgMHhlMDA6IDB4MjAwOCxcblx0ICAgICAgICAgICAgMHhmMDA6IDB4MTAyMDIwMDAsXG5cdCAgICAgICAgICAgIDB4ODA6IDB4MTAyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTgwOiAweDEwMjAyMDA4LFxuXHQgICAgICAgICAgICAweDI4MDogMHg4LFxuXHQgICAgICAgICAgICAweDM4MDogMHgyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4NDgwOiAweDIwMjAwOCxcblx0ICAgICAgICAgICAgMHg1ODA6IDB4MTAwMDAwMDgsXG5cdCAgICAgICAgICAgIDB4NjgwOiAweDEwMDAyMDAwLFxuXHQgICAgICAgICAgICAweDc4MDogMHgyMDA4LFxuXHQgICAgICAgICAgICAweDg4MDogMHgyMDAwMDgsXG5cdCAgICAgICAgICAgIDB4OTgwOiAweDIwMDAsXG5cdCAgICAgICAgICAgIDB4YTgwOiAweDEwMDAyMDA4LFxuXHQgICAgICAgICAgICAweGI4MDogMHgxMDIwMDAwOCxcblx0ICAgICAgICAgICAgMHhjODA6IDB4MCxcblx0ICAgICAgICAgICAgMHhkODA6IDB4MTAyMDIwMDAsXG5cdCAgICAgICAgICAgIDB4ZTgwOiAweDIwMjAwMCxcblx0ICAgICAgICAgICAgMHhmODA6IDB4MTAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTAwMDogMHgxMDAwMjAwMCxcblx0ICAgICAgICAgICAgMHgxMTAwOiAweDEwMjAwMDA4LFxuXHQgICAgICAgICAgICAweDEyMDA6IDB4MTAyMDIwMDgsXG5cdCAgICAgICAgICAgIDB4MTMwMDogMHgyMDA4LFxuXHQgICAgICAgICAgICAweDE0MDA6IDB4MjAwMDAwLFxuXHQgICAgICAgICAgICAweDE1MDA6IDB4MTAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTYwMDogMHgxMDAwMDAwOCxcblx0ICAgICAgICAgICAgMHgxNzAwOiAweDIwMjAwMCxcblx0ICAgICAgICAgICAgMHgxODAwOiAweDIwMjAwOCxcblx0ICAgICAgICAgICAgMHgxOTAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWEwMDogMHg4LFxuXHQgICAgICAgICAgICAweDFiMDA6IDB4MTAyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWMwMDogMHgyMDAwLFxuXHQgICAgICAgICAgICAweDFkMDA6IDB4MTAwMDIwMDgsXG5cdCAgICAgICAgICAgIDB4MWUwMDogMHgxMDIwMjAwMCxcblx0ICAgICAgICAgICAgMHgxZjAwOiAweDIwMDAwOCxcblx0ICAgICAgICAgICAgMHgxMDgwOiAweDgsXG5cdCAgICAgICAgICAgIDB4MTE4MDogMHgyMDIwMDAsXG5cdCAgICAgICAgICAgIDB4MTI4MDogMHgyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTM4MDogMHgxMDAwMDAwOCxcblx0ICAgICAgICAgICAgMHgxNDgwOiAweDEwMDAyMDAwLFxuXHQgICAgICAgICAgICAweDE1ODA6IDB4MjAwOCxcblx0ICAgICAgICAgICAgMHgxNjgwOiAweDEwMjAyMDA4LFxuXHQgICAgICAgICAgICAweDE3ODA6IDB4MTAyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTg4MDogMHgxMDIwMjAwMCxcblx0ICAgICAgICAgICAgMHgxOTgwOiAweDEwMjAwMDA4LFxuXHQgICAgICAgICAgICAweDFhODA6IDB4MjAwMCxcblx0ICAgICAgICAgICAgMHgxYjgwOiAweDIwMjAwOCxcblx0ICAgICAgICAgICAgMHgxYzgwOiAweDIwMDAwOCxcblx0ICAgICAgICAgICAgMHgxZDgwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWU4MDogMHgxMDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxZjgwOiAweDEwMDAyMDA4XG5cdCAgICAgICAgfSxcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIDB4MDogMHgxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTA6IDB4MjAwMDQwMSxcblx0ICAgICAgICAgICAgMHgyMDogMHg0MDAsXG5cdCAgICAgICAgICAgIDB4MzA6IDB4MTAwNDAxLFxuXHQgICAgICAgICAgICAweDQwOiAweDIxMDA0MDEsXG5cdCAgICAgICAgICAgIDB4NTA6IDB4MCxcblx0ICAgICAgICAgICAgMHg2MDogMHgxLFxuXHQgICAgICAgICAgICAweDcwOiAweDIxMDAwMDEsXG5cdCAgICAgICAgICAgIDB4ODA6IDB4MjAwMDQwMCxcblx0ICAgICAgICAgICAgMHg5MDogMHgxMDAwMDEsXG5cdCAgICAgICAgICAgIDB4YTA6IDB4MjAwMDAwMSxcblx0ICAgICAgICAgICAgMHhiMDogMHgyMTAwNDAwLFxuXHQgICAgICAgICAgICAweGMwOiAweDIxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4ZDA6IDB4NDAxLFxuXHQgICAgICAgICAgICAweGUwOiAweDEwMDQwMCxcblx0ICAgICAgICAgICAgMHhmMDogMHgyMDAwMDAwLFxuXHQgICAgICAgICAgICAweDg6IDB4MjEwMDAwMSxcblx0ICAgICAgICAgICAgMHgxODogMHgwLFxuXHQgICAgICAgICAgICAweDI4OiAweDIwMDA0MDEsXG5cdCAgICAgICAgICAgIDB4Mzg6IDB4MjEwMDQwMCxcblx0ICAgICAgICAgICAgMHg0ODogMHgxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4NTg6IDB4MjAwMDAwMSxcblx0ICAgICAgICAgICAgMHg2ODogMHgyMDAwMDAwLFxuXHQgICAgICAgICAgICAweDc4OiAweDQwMSxcblx0ICAgICAgICAgICAgMHg4ODogMHgxMDA0MDEsXG5cdCAgICAgICAgICAgIDB4OTg6IDB4MjAwMDQwMCxcblx0ICAgICAgICAgICAgMHhhODogMHgyMTAwMDAwLFxuXHQgICAgICAgICAgICAweGI4OiAweDEwMDAwMSxcblx0ICAgICAgICAgICAgMHhjODogMHg0MDAsXG5cdCAgICAgICAgICAgIDB4ZDg6IDB4MjEwMDQwMSxcblx0ICAgICAgICAgICAgMHhlODogMHgxLFxuXHQgICAgICAgICAgICAweGY4OiAweDEwMDQwMCxcblx0ICAgICAgICAgICAgMHgxMDA6IDB4MjAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxMTA6IDB4MTAwMDAwLFxuXHQgICAgICAgICAgICAweDEyMDogMHgyMDAwNDAxLFxuXHQgICAgICAgICAgICAweDEzMDogMHgyMTAwMDAxLFxuXHQgICAgICAgICAgICAweDE0MDogMHgxMDAwMDEsXG5cdCAgICAgICAgICAgIDB4MTUwOiAweDIwMDA0MDAsXG5cdCAgICAgICAgICAgIDB4MTYwOiAweDIxMDA0MDAsXG5cdCAgICAgICAgICAgIDB4MTcwOiAweDEwMDQwMSxcblx0ICAgICAgICAgICAgMHgxODA6IDB4NDAxLFxuXHQgICAgICAgICAgICAweDE5MDogMHgyMTAwNDAxLFxuXHQgICAgICAgICAgICAweDFhMDogMHgxMDA0MDAsXG5cdCAgICAgICAgICAgIDB4MWIwOiAweDEsXG5cdCAgICAgICAgICAgIDB4MWMwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWQwOiAweDIxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWUwOiAweDIwMDAwMDEsXG5cdCAgICAgICAgICAgIDB4MWYwOiAweDQwMCxcblx0ICAgICAgICAgICAgMHgxMDg6IDB4MTAwNDAwLFxuXHQgICAgICAgICAgICAweDExODogMHgyMDAwNDAxLFxuXHQgICAgICAgICAgICAweDEyODogMHgyMTAwMDAxLFxuXHQgICAgICAgICAgICAweDEzODogMHgxLFxuXHQgICAgICAgICAgICAweDE0ODogMHgyMDAwMDAwLFxuXHQgICAgICAgICAgICAweDE1ODogMHgxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTY4OiAweDQwMSxcblx0ICAgICAgICAgICAgMHgxNzg6IDB4MjEwMDQwMCxcblx0ICAgICAgICAgICAgMHgxODg6IDB4MjAwMDAwMSxcblx0ICAgICAgICAgICAgMHgxOTg6IDB4MjEwMDAwMCxcblx0ICAgICAgICAgICAgMHgxYTg6IDB4MCxcblx0ICAgICAgICAgICAgMHgxYjg6IDB4MjEwMDQwMSxcblx0ICAgICAgICAgICAgMHgxYzg6IDB4MTAwNDAxLFxuXHQgICAgICAgICAgICAweDFkODogMHg0MDAsXG5cdCAgICAgICAgICAgIDB4MWU4OiAweDIwMDA0MDAsXG5cdCAgICAgICAgICAgIDB4MWY4OiAweDEwMDAwMVxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4ODAwMDgyMCxcblx0ICAgICAgICAgICAgMHgxOiAweDIwMDAwLFxuXHQgICAgICAgICAgICAweDI6IDB4ODAwMDAwMCxcblx0ICAgICAgICAgICAgMHgzOiAweDIwLFxuXHQgICAgICAgICAgICAweDQ6IDB4MjAwMjAsXG5cdCAgICAgICAgICAgIDB4NTogMHg4MDIwODIwLFxuXHQgICAgICAgICAgICAweDY6IDB4ODAyMDgwMCxcblx0ICAgICAgICAgICAgMHg3OiAweDgwMCxcblx0ICAgICAgICAgICAgMHg4OiAweDgwMjAwMDAsXG5cdCAgICAgICAgICAgIDB4OTogMHg4MDAwODAwLFxuXHQgICAgICAgICAgICAweGE6IDB4MjA4MDAsXG5cdCAgICAgICAgICAgIDB4YjogMHg4MDIwMDIwLFxuXHQgICAgICAgICAgICAweGM6IDB4ODIwLFxuXHQgICAgICAgICAgICAweGQ6IDB4MCxcblx0ICAgICAgICAgICAgMHhlOiAweDgwMDAwMjAsXG5cdCAgICAgICAgICAgIDB4ZjogMHgyMDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwMDogMHg4MDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDE6IDB4ODAyMDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwMjogMHg4MDAwODIwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDAzOiAweDgwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDQ6IDB4ODAyMDAwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwNTogMHgyMDgwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwNjogMHgyMDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwNzogMHgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwODogMHg4MDAwMDIwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDA5OiAweDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwYTogMHgyMDAyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwYjogMHg4MDIwODAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDBjOiAweDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMGQ6IDB4ODAyMDAyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwZTogMHg4MDAwODAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDBmOiAweDIwMDAwLFxuXHQgICAgICAgICAgICAweDEwOiAweDIwODIwLFxuXHQgICAgICAgICAgICAweDExOiAweDgwMjA4MDAsXG5cdCAgICAgICAgICAgIDB4MTI6IDB4MjAsXG5cdCAgICAgICAgICAgIDB4MTM6IDB4ODAwLFxuXHQgICAgICAgICAgICAweDE0OiAweDgwMDA4MDAsXG5cdCAgICAgICAgICAgIDB4MTU6IDB4ODAwMDAyMCxcblx0ICAgICAgICAgICAgMHgxNjogMHg4MDIwMDIwLFxuXHQgICAgICAgICAgICAweDE3OiAweDIwMDAwLFxuXHQgICAgICAgICAgICAweDE4OiAweDAsXG5cdCAgICAgICAgICAgIDB4MTk6IDB4MjAwMjAsXG5cdCAgICAgICAgICAgIDB4MWE6IDB4ODAyMDAwMCxcblx0ICAgICAgICAgICAgMHgxYjogMHg4MDAwODIwLFxuXHQgICAgICAgICAgICAweDFjOiAweDgwMjA4MjAsXG5cdCAgICAgICAgICAgIDB4MWQ6IDB4MjA4MDAsXG5cdCAgICAgICAgICAgIDB4MWU6IDB4ODIwLFxuXHQgICAgICAgICAgICAweDFmOiAweDgwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTA6IDB4MjAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTE6IDB4ODAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDEyOiAweDgwMjAwMjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTM6IDB4MjA4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTQ6IDB4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTU6IDB4ODAyMDAwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAxNjogMHg4MDAwMDAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDE3OiAweDgwMDA4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTg6IDB4ODAyMDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAxOTogMHg4MDAwMDIwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDFhOiAweDgwMDA4MDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMWI6IDB4MCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAxYzogMHgyMDgwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAxZDogMHg4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMWU6IDB4MjAwMjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMWY6IDB4ODAyMDgwMFxuXHQgICAgICAgIH1cblx0ICAgIF07XG5cblx0ICAgIC8vIE1hc2tzIHRoYXQgc2VsZWN0IHRoZSBTQk9YIGlucHV0XG5cdCAgICB2YXIgU0JPWF9NQVNLID0gW1xuXHQgICAgICAgIDB4ZjgwMDAwMDEsIDB4MWY4MDAwMDAsIDB4MDFmODAwMDAsIDB4MDAxZjgwMDAsXG5cdCAgICAgICAgMHgwMDAxZjgwMCwgMHgwMDAwMWY4MCwgMHgwMDAwMDFmOCwgMHg4MDAwMDAxZlxuXHQgICAgXTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBERVMgYmxvY2sgY2lwaGVyIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIERFUyA9IENfYWxnby5ERVMgPSBCbG9ja0NpcGhlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIga2V5ID0gdGhpcy5fa2V5O1xuXHQgICAgICAgICAgICB2YXIga2V5V29yZHMgPSBrZXkud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gU2VsZWN0IDU2IGJpdHMgYWNjb3JkaW5nIHRvIFBDMVxuXHQgICAgICAgICAgICB2YXIga2V5Qml0cyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU2OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBrZXlCaXRQb3MgPSBQQzFbaV0gLSAxO1xuXHQgICAgICAgICAgICAgICAga2V5Qml0c1tpXSA9IChrZXlXb3Jkc1trZXlCaXRQb3MgPj4+IDVdID4+PiAoMzEgLSBrZXlCaXRQb3MgJSAzMikpICYgMTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEFzc2VtYmxlIDE2IHN1YmtleXNcblx0ICAgICAgICAgICAgdmFyIHN1YktleXMgPSB0aGlzLl9zdWJLZXlzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIG5TdWJLZXkgPSAwOyBuU3ViS2V5IDwgMTY7IG5TdWJLZXkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHN1YmtleVxuXHQgICAgICAgICAgICAgICAgdmFyIHN1YktleSA9IHN1YktleXNbblN1YktleV0gPSBbXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRTaGlmdCA9IEJJVF9TSElGVFNbblN1YktleV07XG5cblx0ICAgICAgICAgICAgICAgIC8vIFNlbGVjdCA0OCBiaXRzIGFjY29yZGluZyB0byBQQzJcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIFNlbGVjdCBmcm9tIHRoZSBsZWZ0IDI4IGtleSBiaXRzXG5cdCAgICAgICAgICAgICAgICAgICAgc3ViS2V5WyhpIC8gNikgfCAwXSB8PSBrZXlCaXRzWygoUEMyW2ldIC0gMSkgKyBiaXRTaGlmdCkgJSAyOF0gPDwgKDMxIC0gaSAlIDYpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gU2VsZWN0IGZyb20gdGhlIHJpZ2h0IDI4IGtleSBiaXRzXG5cdCAgICAgICAgICAgICAgICAgICAgc3ViS2V5WzQgKyAoKGkgLyA2KSB8IDApXSB8PSBrZXlCaXRzWzI4ICsgKCgoUEMyW2kgKyAyNF0gLSAxKSArIGJpdFNoaWZ0KSAlIDI4KV0gPDwgKDMxIC0gaSAlIDYpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBTaW5jZSBlYWNoIHN1YmtleSBpcyBhcHBsaWVkIHRvIGFuIGV4cGFuZGVkIDMyLWJpdCBpbnB1dCxcblx0ICAgICAgICAgICAgICAgIC8vIHRoZSBzdWJrZXkgY2FuIGJlIGJyb2tlbiBpbnRvIDggdmFsdWVzIHNjYWxlZCB0byAzMi1iaXRzLFxuXHQgICAgICAgICAgICAgICAgLy8gd2hpY2ggYWxsb3dzIHRoZSBrZXkgdG8gYmUgdXNlZCB3aXRob3V0IGV4cGFuc2lvblxuXHQgICAgICAgICAgICAgICAgc3ViS2V5WzBdID0gKHN1YktleVswXSA8PCAxKSB8IChzdWJLZXlbMF0gPj4+IDMxKTtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgNzsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3ViS2V5W2ldID0gc3ViS2V5W2ldID4+PiAoKGkgLSAxKSAqIDQgKyAzKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHN1YktleVs3XSA9IChzdWJLZXlbN10gPDwgNSkgfCAoc3ViS2V5WzddID4+PiAyNyk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIGludmVyc2Ugc3Via2V5c1xuXHQgICAgICAgICAgICB2YXIgaW52U3ViS2V5cyA9IHRoaXMuX2ludlN1YktleXMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBpbnZTdWJLZXlzW2ldID0gc3ViS2V5c1sxNSAtIGldO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGVuY3J5cHRCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICB0aGlzLl9kb0NyeXB0QmxvY2soTSwgb2Zmc2V0LCB0aGlzLl9zdWJLZXlzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgZGVjcnlwdEJsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2RvQ3J5cHRCbG9jayhNLCBvZmZzZXQsIHRoaXMuX2ludlN1YktleXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9DcnlwdEJsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0LCBzdWJLZXlzKSB7XG5cdCAgICAgICAgICAgIC8vIEdldCBpbnB1dFxuXHQgICAgICAgICAgICB0aGlzLl9sQmxvY2sgPSBNW29mZnNldF07XG5cdCAgICAgICAgICAgIHRoaXMuX3JCbG9jayA9IE1bb2Zmc2V0ICsgMV07XG5cblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCBwZXJtdXRhdGlvblxuXHQgICAgICAgICAgICBleGNoYW5nZUxSLmNhbGwodGhpcywgNCwgIDB4MGYwZjBmMGYpO1xuXHQgICAgICAgICAgICBleGNoYW5nZUxSLmNhbGwodGhpcywgMTYsIDB4MDAwMGZmZmYpO1xuXHQgICAgICAgICAgICBleGNoYW5nZVJMLmNhbGwodGhpcywgMiwgIDB4MzMzMzMzMzMpO1xuXHQgICAgICAgICAgICBleGNoYW5nZVJMLmNhbGwodGhpcywgOCwgIDB4MDBmZjAwZmYpO1xuXHQgICAgICAgICAgICBleGNoYW5nZUxSLmNhbGwodGhpcywgMSwgIDB4NTU1NTU1NTUpO1xuXG5cdCAgICAgICAgICAgIC8vIFJvdW5kc1xuXHQgICAgICAgICAgICBmb3IgKHZhciByb3VuZCA9IDA7IHJvdW5kIDwgMTY7IHJvdW5kKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIHN1YktleSA9IHN1YktleXNbcm91bmRdO1xuXHQgICAgICAgICAgICAgICAgdmFyIGxCbG9jayA9IHRoaXMuX2xCbG9jaztcblx0ICAgICAgICAgICAgICAgIHZhciByQmxvY2sgPSB0aGlzLl9yQmxvY2s7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEZlaXN0ZWwgZnVuY3Rpb25cblx0ICAgICAgICAgICAgICAgIHZhciBmID0gMDtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZiB8PSBTQk9YX1BbaV1bKChyQmxvY2sgXiBzdWJLZXlbaV0pICYgU0JPWF9NQVNLW2ldKSA+Pj4gMF07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9sQmxvY2sgPSByQmxvY2s7XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9yQmxvY2sgPSBsQmxvY2sgXiBmO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gVW5kbyBzd2FwIGZyb20gbGFzdCByb3VuZFxuXHQgICAgICAgICAgICB2YXIgdCA9IHRoaXMuX2xCbG9jaztcblx0ICAgICAgICAgICAgdGhpcy5fbEJsb2NrID0gdGhpcy5fckJsb2NrO1xuXHQgICAgICAgICAgICB0aGlzLl9yQmxvY2sgPSB0O1xuXG5cdCAgICAgICAgICAgIC8vIEZpbmFsIHBlcm11dGF0aW9uXG5cdCAgICAgICAgICAgIGV4Y2hhbmdlTFIuY2FsbCh0aGlzLCAxLCAgMHg1NTU1NTU1NSk7XG5cdCAgICAgICAgICAgIGV4Y2hhbmdlUkwuY2FsbCh0aGlzLCA4LCAgMHgwMGZmMDBmZik7XG5cdCAgICAgICAgICAgIGV4Y2hhbmdlUkwuY2FsbCh0aGlzLCAyLCAgMHgzMzMzMzMzMyk7XG5cdCAgICAgICAgICAgIGV4Y2hhbmdlTFIuY2FsbCh0aGlzLCAxNiwgMHgwMDAwZmZmZik7XG5cdCAgICAgICAgICAgIGV4Y2hhbmdlTFIuY2FsbCh0aGlzLCA0LCAgMHgwZjBmMGYwZik7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IG91dHB1dFxuXHQgICAgICAgICAgICBNW29mZnNldF0gPSB0aGlzLl9sQmxvY2s7XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0ICsgMV0gPSB0aGlzLl9yQmxvY2s7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGtleVNpemU6IDY0LzMyLFxuXG5cdCAgICAgICAgaXZTaXplOiA2NC8zMixcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogNjQvMzJcblx0ICAgIH0pO1xuXG5cdCAgICAvLyBTd2FwIGJpdHMgYWNyb3NzIHRoZSBsZWZ0IGFuZCByaWdodCB3b3Jkc1xuXHQgICAgZnVuY3Rpb24gZXhjaGFuZ2VMUihvZmZzZXQsIG1hc2spIHtcblx0ICAgICAgICB2YXIgdCA9ICgodGhpcy5fbEJsb2NrID4+PiBvZmZzZXQpIF4gdGhpcy5fckJsb2NrKSAmIG1hc2s7XG5cdCAgICAgICAgdGhpcy5fckJsb2NrIF49IHQ7XG5cdCAgICAgICAgdGhpcy5fbEJsb2NrIF49IHQgPDwgb2Zmc2V0O1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBleGNoYW5nZVJMKG9mZnNldCwgbWFzaykge1xuXHQgICAgICAgIHZhciB0ID0gKCh0aGlzLl9yQmxvY2sgPj4+IG9mZnNldCkgXiB0aGlzLl9sQmxvY2spICYgbWFzaztcblx0ICAgICAgICB0aGlzLl9sQmxvY2sgXj0gdDtcblx0ICAgICAgICB0aGlzLl9yQmxvY2sgXj0gdCA8PCBvZmZzZXQ7XG5cdCAgICB9XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb25zIHRvIHRoZSBjaXBoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0ID0gQ3J5cHRvSlMuREVTLmVuY3J5cHQobWVzc2FnZSwga2V5LCBjZmcpO1xuXHQgICAgICogICAgIHZhciBwbGFpbnRleHQgID0gQ3J5cHRvSlMuREVTLmRlY3J5cHQoY2lwaGVydGV4dCwga2V5LCBjZmcpO1xuXHQgICAgICovXG5cdCAgICBDLkRFUyA9IEJsb2NrQ2lwaGVyLl9jcmVhdGVIZWxwZXIoREVTKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBUcmlwbGUtREVTIGJsb2NrIGNpcGhlciBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBUcmlwbGVERVMgPSBDX2FsZ28uVHJpcGxlREVTID0gQmxvY2tDaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGtleSA9IHRoaXMuX2tleTtcblx0ICAgICAgICAgICAgdmFyIGtleVdvcmRzID0ga2V5LndvcmRzO1xuXHQgICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIGtleSBsZW5ndGggaXMgdmFsaWQgKDY0LCAxMjggb3IgPj0gMTkyIGJpdClcblx0ICAgICAgICAgICAgaWYgKGtleVdvcmRzLmxlbmd0aCAhPT0gMiAmJiBrZXlXb3Jkcy5sZW5ndGggIT09IDQgJiYga2V5V29yZHMubGVuZ3RoIDwgNikge1xuXHQgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGtleSBsZW5ndGggLSAzREVTIHJlcXVpcmVzIHRoZSBrZXkgbGVuZ3RoIHRvIGJlIDY0LCAxMjgsIDE5MiBvciA+MTkyLicpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gRXh0ZW5kIHRoZSBrZXkgYWNjb3JkaW5nIHRvIHRoZSBrZXlpbmcgb3B0aW9ucyBkZWZpbmVkIGluIDNERVMgc3RhbmRhcmRcblx0ICAgICAgICAgICAgdmFyIGtleTEgPSBrZXlXb3Jkcy5zbGljZSgwLCAyKTtcblx0ICAgICAgICAgICAgdmFyIGtleTIgPSBrZXlXb3Jkcy5sZW5ndGggPCA0ID8ga2V5V29yZHMuc2xpY2UoMCwgMikgOiBrZXlXb3Jkcy5zbGljZSgyLCA0KTtcblx0ICAgICAgICAgICAgdmFyIGtleTMgPSBrZXlXb3Jkcy5sZW5ndGggPCA2ID8ga2V5V29yZHMuc2xpY2UoMCwgMikgOiBrZXlXb3Jkcy5zbGljZSg0LCA2KTtcblxuXHQgICAgICAgICAgICAvLyBDcmVhdGUgREVTIGluc3RhbmNlc1xuXHQgICAgICAgICAgICB0aGlzLl9kZXMxID0gREVTLmNyZWF0ZUVuY3J5cHRvcihXb3JkQXJyYXkuY3JlYXRlKGtleTEpKTtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMiA9IERFUy5jcmVhdGVFbmNyeXB0b3IoV29yZEFycmF5LmNyZWF0ZShrZXkyKSk7XG5cdCAgICAgICAgICAgIHRoaXMuX2RlczMgPSBERVMuY3JlYXRlRW5jcnlwdG9yKFdvcmRBcnJheS5jcmVhdGUoa2V5MykpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBlbmNyeXB0QmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMS5lbmNyeXB0QmxvY2soTSwgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMi5kZWNyeXB0QmxvY2soTSwgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMy5lbmNyeXB0QmxvY2soTSwgb2Zmc2V0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgZGVjcnlwdEJsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2RlczMuZGVjcnlwdEJsb2NrKE0sIG9mZnNldCk7XG5cdCAgICAgICAgICAgIHRoaXMuX2RlczIuZW5jcnlwdEJsb2NrKE0sIG9mZnNldCk7XG5cdCAgICAgICAgICAgIHRoaXMuX2RlczEuZGVjcnlwdEJsb2NrKE0sIG9mZnNldCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGtleVNpemU6IDE5Mi8zMixcblxuXHQgICAgICAgIGl2U2l6ZTogNjQvMzIsXG5cblx0ICAgICAgICBibG9ja1NpemU6IDY0LzMyXG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbnMgdG8gdGhlIGNpcGhlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGNpcGhlcnRleHQgPSBDcnlwdG9KUy5UcmlwbGVERVMuZW5jcnlwdChtZXNzYWdlLCBrZXksIGNmZyk7XG5cdCAgICAgKiAgICAgdmFyIHBsYWludGV4dCAgPSBDcnlwdG9KUy5UcmlwbGVERVMuZGVjcnlwdChjaXBoZXJ0ZXh0LCBrZXksIGNmZyk7XG5cdCAgICAgKi9cblx0ICAgIEMuVHJpcGxlREVTID0gQmxvY2tDaXBoZXIuX2NyZWF0ZUhlbHBlcihUcmlwbGVERVMpO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlRyaXBsZURFUztcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9lbmMtYmFzZTY0XCIpLCByZXF1aXJlKFwiLi9tZDVcIiksIHJlcXVpcmUoXCIuL2V2cGtkZlwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vZW5jLWJhc2U2NFwiLCBcIi4vbWQ1XCIsIFwiLi9ldnBrZGZcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgU3RyZWFtQ2lwaGVyID0gQ19saWIuU3RyZWFtQ2lwaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLyoqXG5cdCAgICAgKiBSQzQgc3RyZWFtIGNpcGhlciBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBSQzQgPSBDX2FsZ28uUkM0ID0gU3RyZWFtQ2lwaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBrZXkgPSB0aGlzLl9rZXk7XG5cdCAgICAgICAgICAgIHZhciBrZXlXb3JkcyA9IGtleS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGtleVNpZ0J5dGVzID0ga2V5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIEluaXQgc2JveFxuXHQgICAgICAgICAgICB2YXIgUyA9IHRoaXMuX1MgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgU1tpXSA9IGk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBLZXkgc2V0dXBcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSAwOyBpIDwgMjU2OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBrZXlCeXRlSW5kZXggPSBpICUga2V5U2lnQnl0ZXM7XG5cdCAgICAgICAgICAgICAgICB2YXIga2V5Qnl0ZSA9IChrZXlXb3Jkc1trZXlCeXRlSW5kZXggPj4+IDJdID4+PiAoMjQgLSAoa2V5Qnl0ZUluZGV4ICUgNCkgKiA4KSkgJiAweGZmO1xuXG5cdCAgICAgICAgICAgICAgICBqID0gKGogKyBTW2ldICsga2V5Qnl0ZSkgJSAyNTY7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFN3YXBcblx0ICAgICAgICAgICAgICAgIHZhciB0ID0gU1tpXTtcblx0ICAgICAgICAgICAgICAgIFNbaV0gPSBTW2pdO1xuXHQgICAgICAgICAgICAgICAgU1tqXSA9IHQ7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb3VudGVyc1xuXHQgICAgICAgICAgICB0aGlzLl9pID0gdGhpcy5faiA9IDA7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICBNW29mZnNldF0gXj0gZ2VuZXJhdGVLZXlzdHJlYW1Xb3JkLmNhbGwodGhpcyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGtleVNpemU6IDI1Ni8zMixcblxuXHQgICAgICAgIGl2U2l6ZTogMFxuXHQgICAgfSk7XG5cblx0ICAgIGZ1bmN0aW9uIGdlbmVyYXRlS2V5c3RyZWFtV29yZCgpIHtcblx0ICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICB2YXIgUyA9IHRoaXMuX1M7XG5cdCAgICAgICAgdmFyIGkgPSB0aGlzLl9pO1xuXHQgICAgICAgIHZhciBqID0gdGhpcy5fajtcblxuXHQgICAgICAgIC8vIEdlbmVyYXRlIGtleXN0cmVhbSB3b3JkXG5cdCAgICAgICAgdmFyIGtleXN0cmVhbVdvcmQgPSAwO1xuXHQgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgNDsgbisrKSB7XG5cdCAgICAgICAgICAgIGkgPSAoaSArIDEpICUgMjU2O1xuXHQgICAgICAgICAgICBqID0gKGogKyBTW2ldKSAlIDI1NjtcblxuXHQgICAgICAgICAgICAvLyBTd2FwXG5cdCAgICAgICAgICAgIHZhciB0ID0gU1tpXTtcblx0ICAgICAgICAgICAgU1tpXSA9IFNbal07XG5cdCAgICAgICAgICAgIFNbal0gPSB0O1xuXG5cdCAgICAgICAgICAgIGtleXN0cmVhbVdvcmQgfD0gU1soU1tpXSArIFNbal0pICUgMjU2XSA8PCAoMjQgLSBuICogOCk7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gVXBkYXRlIGNvdW50ZXJzXG5cdCAgICAgICAgdGhpcy5faSA9IGk7XG5cdCAgICAgICAgdGhpcy5faiA9IGo7XG5cblx0ICAgICAgICByZXR1cm4ga2V5c3RyZWFtV29yZDtcblx0ICAgIH1cblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbnMgdG8gdGhlIGNpcGhlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGNpcGhlcnRleHQgPSBDcnlwdG9KUy5SQzQuZW5jcnlwdChtZXNzYWdlLCBrZXksIGNmZyk7XG5cdCAgICAgKiAgICAgdmFyIHBsYWludGV4dCAgPSBDcnlwdG9KUy5SQzQuZGVjcnlwdChjaXBoZXJ0ZXh0LCBrZXksIGNmZyk7XG5cdCAgICAgKi9cblx0ICAgIEMuUkM0ID0gU3RyZWFtQ2lwaGVyLl9jcmVhdGVIZWxwZXIoUkM0KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBNb2RpZmllZCBSQzQgc3RyZWFtIGNpcGhlciBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBSQzREcm9wID0gQ19hbGdvLlJDNERyb3AgPSBSQzQuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gZHJvcCBUaGUgbnVtYmVyIG9mIGtleXN0cmVhbSB3b3JkcyB0byBkcm9wLiBEZWZhdWx0IDE5MlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogUkM0LmNmZy5leHRlbmQoe1xuXHQgICAgICAgICAgICBkcm9wOiAxOTJcblx0ICAgICAgICB9KSxcblxuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIFJDNC5fZG9SZXNldC5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIC8vIERyb3Bcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuY2ZnLmRyb3A7IGkgPiAwOyBpLS0pIHtcblx0ICAgICAgICAgICAgICAgIGdlbmVyYXRlS2V5c3RyZWFtV29yZC5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb25zIHRvIHRoZSBjaXBoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0ID0gQ3J5cHRvSlMuUkM0RHJvcC5lbmNyeXB0KG1lc3NhZ2UsIGtleSwgY2ZnKTtcblx0ICAgICAqICAgICB2YXIgcGxhaW50ZXh0ICA9IENyeXB0b0pTLlJDNERyb3AuZGVjcnlwdChjaXBoZXJ0ZXh0LCBrZXksIGNmZyk7XG5cdCAgICAgKi9cblx0ICAgIEMuUkM0RHJvcCA9IFN0cmVhbUNpcGhlci5fY3JlYXRlSGVscGVyKFJDNERyb3ApO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlJDNDtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9lbmMtYmFzZTY0XCIpLCByZXF1aXJlKFwiLi9tZDVcIiksIHJlcXVpcmUoXCIuL2V2cGtkZlwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vZW5jLWJhc2U2NFwiLCBcIi4vbWQ1XCIsIFwiLi9ldnBrZGZcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgU3RyZWFtQ2lwaGVyID0gQ19saWIuU3RyZWFtQ2lwaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gUmV1c2FibGUgb2JqZWN0c1xuXHQgICAgdmFyIFMgID0gW107XG5cdCAgICB2YXIgQ18gPSBbXTtcblx0ICAgIHZhciBHICA9IFtdO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFJhYmJpdCBzdHJlYW0gY2lwaGVyIGFsZ29yaXRobVxuXHQgICAgICovXG5cdCAgICB2YXIgUmFiYml0ID0gQ19hbGdvLlJhYmJpdCA9IFN0cmVhbUNpcGhlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgSyA9IHRoaXMuX2tleS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGl2ID0gdGhpcy5jZmcuaXY7XG5cblx0ICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIEtbaV0gPSAoKChLW2ldIDw8IDgpICB8IChLW2ldID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICAgICgoKEtbaV0gPDwgMjQpIHwgKEtbaV0gPj4+IDgpKSAgJiAweGZmMDBmZjAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEdlbmVyYXRlIGluaXRpYWwgc3RhdGUgdmFsdWVzXG5cdCAgICAgICAgICAgIHZhciBYID0gdGhpcy5fWCA9IFtcblx0ICAgICAgICAgICAgICAgIEtbMF0sIChLWzNdIDw8IDE2KSB8IChLWzJdID4+PiAxNiksXG5cdCAgICAgICAgICAgICAgICBLWzFdLCAoS1swXSA8PCAxNikgfCAoS1szXSA+Pj4gMTYpLFxuXHQgICAgICAgICAgICAgICAgS1syXSwgKEtbMV0gPDwgMTYpIHwgKEtbMF0gPj4+IDE2KSxcblx0ICAgICAgICAgICAgICAgIEtbM10sIChLWzJdIDw8IDE2KSB8IChLWzFdID4+PiAxNilcblx0ICAgICAgICAgICAgXTtcblxuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSBpbml0aWFsIGNvdW50ZXIgdmFsdWVzXG5cdCAgICAgICAgICAgIHZhciBDID0gdGhpcy5fQyA9IFtcblx0ICAgICAgICAgICAgICAgIChLWzJdIDw8IDE2KSB8IChLWzJdID4+PiAxNiksIChLWzBdICYgMHhmZmZmMDAwMCkgfCAoS1sxXSAmIDB4MDAwMGZmZmYpLFxuXHQgICAgICAgICAgICAgICAgKEtbM10gPDwgMTYpIHwgKEtbM10gPj4+IDE2KSwgKEtbMV0gJiAweGZmZmYwMDAwKSB8IChLWzJdICYgMHgwMDAwZmZmZiksXG5cdCAgICAgICAgICAgICAgICAoS1swXSA8PCAxNikgfCAoS1swXSA+Pj4gMTYpLCAoS1syXSAmIDB4ZmZmZjAwMDApIHwgKEtbM10gJiAweDAwMDBmZmZmKSxcblx0ICAgICAgICAgICAgICAgIChLWzFdIDw8IDE2KSB8IChLWzFdID4+PiAxNiksIChLWzNdICYgMHhmZmZmMDAwMCkgfCAoS1swXSAmIDB4MDAwMGZmZmYpXG5cdCAgICAgICAgICAgIF07XG5cblx0ICAgICAgICAgICAgLy8gQ2FycnkgYml0XG5cdCAgICAgICAgICAgIHRoaXMuX2IgPSAwO1xuXG5cdCAgICAgICAgICAgIC8vIEl0ZXJhdGUgdGhlIHN5c3RlbSBmb3VyIHRpbWVzXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBuZXh0U3RhdGUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIE1vZGlmeSB0aGUgY291bnRlcnNcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIENbaV0gXj0gWFsoaSArIDQpICYgN107XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJViBzZXR1cFxuXHQgICAgICAgICAgICBpZiAoaXYpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIElWID0gaXYud29yZHM7XG5cdCAgICAgICAgICAgICAgICB2YXIgSVZfMCA9IElWWzBdO1xuXHQgICAgICAgICAgICAgICAgdmFyIElWXzEgPSBJVlsxXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgZm91ciBzdWJ2ZWN0b3JzXG5cdCAgICAgICAgICAgICAgICB2YXIgaTAgPSAoKChJVl8wIDw8IDgpIHwgKElWXzAgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8ICgoKElWXzAgPDwgMjQpIHwgKElWXzAgPj4+IDgpKSAmIDB4ZmYwMGZmMDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIGkyID0gKCgoSVZfMSA8PCA4KSB8IChJVl8xID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfCAoKChJVl8xIDw8IDI0KSB8IChJVl8xID4+PiA4KSkgJiAweGZmMDBmZjAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciBpMSA9IChpMCA+Pj4gMTYpIHwgKGkyICYgMHhmZmZmMDAwMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgaTMgPSAoaTIgPDwgMTYpICB8IChpMCAmIDB4MDAwMGZmZmYpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBNb2RpZnkgY291bnRlciB2YWx1ZXNcblx0ICAgICAgICAgICAgICAgIENbMF0gXj0gaTA7XG5cdCAgICAgICAgICAgICAgICBDWzFdIF49IGkxO1xuXHQgICAgICAgICAgICAgICAgQ1syXSBePSBpMjtcblx0ICAgICAgICAgICAgICAgIENbM10gXj0gaTM7XG5cdCAgICAgICAgICAgICAgICBDWzRdIF49IGkwO1xuXHQgICAgICAgICAgICAgICAgQ1s1XSBePSBpMTtcblx0ICAgICAgICAgICAgICAgIENbNl0gXj0gaTI7XG5cdCAgICAgICAgICAgICAgICBDWzddIF49IGkzO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBJdGVyYXRlIHRoZSBzeXN0ZW0gZm91ciB0aW1lc1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICBuZXh0U3RhdGUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIFggPSB0aGlzLl9YO1xuXG5cdCAgICAgICAgICAgIC8vIEl0ZXJhdGUgdGhlIHN5c3RlbVxuXHQgICAgICAgICAgICBuZXh0U3RhdGUuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSBmb3VyIGtleXN0cmVhbSB3b3Jkc1xuXHQgICAgICAgICAgICBTWzBdID0gWFswXSBeIChYWzVdID4+PiAxNikgXiAoWFszXSA8PCAxNik7XG5cdCAgICAgICAgICAgIFNbMV0gPSBYWzJdIF4gKFhbN10gPj4+IDE2KSBeIChYWzVdIDw8IDE2KTtcblx0ICAgICAgICAgICAgU1syXSA9IFhbNF0gXiAoWFsxXSA+Pj4gMTYpIF4gKFhbN10gPDwgMTYpO1xuXHQgICAgICAgICAgICBTWzNdID0gWFs2XSBeIChYWzNdID4+PiAxNikgXiAoWFsxXSA8PCAxNik7XG5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgICAgICBTW2ldID0gKCgoU1tpXSA8PCA4KSAgfCAoU1tpXSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAgICAoKChTW2ldIDw8IDI0KSB8IChTW2ldID4+PiA4KSkgICYgMHhmZjAwZmYwMCk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEVuY3J5cHRcblx0ICAgICAgICAgICAgICAgIE1bb2Zmc2V0ICsgaV0gXj0gU1tpXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDEyOC8zMixcblxuXHQgICAgICAgIGl2U2l6ZTogNjQvMzJcblx0ICAgIH0pO1xuXG5cdCAgICBmdW5jdGlvbiBuZXh0U3RhdGUoKSB7XG5cdCAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgdmFyIFggPSB0aGlzLl9YO1xuXHQgICAgICAgIHZhciBDID0gdGhpcy5fQztcblxuXHQgICAgICAgIC8vIFNhdmUgb2xkIGNvdW50ZXIgdmFsdWVzXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcblx0ICAgICAgICAgICAgQ19baV0gPSBDW2ldO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgY291bnRlciB2YWx1ZXNcblx0ICAgICAgICBDWzBdID0gKENbMF0gKyAweDRkMzRkMzRkICsgdGhpcy5fYikgfCAwO1xuXHQgICAgICAgIENbMV0gPSAoQ1sxXSArIDB4ZDM0ZDM0ZDMgKyAoKENbMF0gPj4+IDApIDwgKENfWzBdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbMl0gPSAoQ1syXSArIDB4MzRkMzRkMzQgKyAoKENbMV0gPj4+IDApIDwgKENfWzFdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbM10gPSAoQ1szXSArIDB4NGQzNGQzNGQgKyAoKENbMl0gPj4+IDApIDwgKENfWzJdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbNF0gPSAoQ1s0XSArIDB4ZDM0ZDM0ZDMgKyAoKENbM10gPj4+IDApIDwgKENfWzNdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbNV0gPSAoQ1s1XSArIDB4MzRkMzRkMzQgKyAoKENbNF0gPj4+IDApIDwgKENfWzRdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbNl0gPSAoQ1s2XSArIDB4NGQzNGQzNGQgKyAoKENbNV0gPj4+IDApIDwgKENfWzVdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbN10gPSAoQ1s3XSArIDB4ZDM0ZDM0ZDMgKyAoKENbNl0gPj4+IDApIDwgKENfWzZdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIHRoaXMuX2IgPSAoQ1s3XSA+Pj4gMCkgPCAoQ19bN10gPj4+IDApID8gMSA6IDA7XG5cblx0ICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGctdmFsdWVzXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcblx0ICAgICAgICAgICAgdmFyIGd4ID0gWFtpXSArIENbaV07XG5cblx0ICAgICAgICAgICAgLy8gQ29uc3RydWN0IGhpZ2ggYW5kIGxvdyBhcmd1bWVudCBmb3Igc3F1YXJpbmdcblx0ICAgICAgICAgICAgdmFyIGdhID0gZ3ggJiAweGZmZmY7XG5cdCAgICAgICAgICAgIHZhciBnYiA9IGd4ID4+PiAxNjtcblxuXHQgICAgICAgICAgICAvLyBDYWxjdWxhdGUgaGlnaCBhbmQgbG93IHJlc3VsdCBvZiBzcXVhcmluZ1xuXHQgICAgICAgICAgICB2YXIgZ2ggPSAoKCgoZ2EgKiBnYSkgPj4+IDE3KSArIGdhICogZ2IpID4+PiAxNSkgKyBnYiAqIGdiO1xuXHQgICAgICAgICAgICB2YXIgZ2wgPSAoKChneCAmIDB4ZmZmZjAwMDApICogZ3gpIHwgMCkgKyAoKChneCAmIDB4MDAwMGZmZmYpICogZ3gpIHwgMCk7XG5cblx0ICAgICAgICAgICAgLy8gSGlnaCBYT1IgbG93XG5cdCAgICAgICAgICAgIEdbaV0gPSBnaCBeIGdsO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgc3RhdGUgdmFsdWVzXG5cdCAgICAgICAgWFswXSA9IChHWzBdICsgKChHWzddIDw8IDE2KSB8IChHWzddID4+PiAxNikpICsgKChHWzZdIDw8IDE2KSB8IChHWzZdID4+PiAxNikpKSB8IDA7XG5cdCAgICAgICAgWFsxXSA9IChHWzFdICsgKChHWzBdIDw8IDgpICB8IChHWzBdID4+PiAyNCkpICsgR1s3XSkgfCAwO1xuXHQgICAgICAgIFhbMl0gPSAoR1syXSArICgoR1sxXSA8PCAxNikgfCAoR1sxXSA+Pj4gMTYpKSArICgoR1swXSA8PCAxNikgfCAoR1swXSA+Pj4gMTYpKSkgfCAwO1xuXHQgICAgICAgIFhbM10gPSAoR1szXSArICgoR1syXSA8PCA4KSAgfCAoR1syXSA+Pj4gMjQpKSArIEdbMV0pIHwgMDtcblx0ICAgICAgICBYWzRdID0gKEdbNF0gKyAoKEdbM10gPDwgMTYpIHwgKEdbM10gPj4+IDE2KSkgKyAoKEdbMl0gPDwgMTYpIHwgKEdbMl0gPj4+IDE2KSkpIHwgMDtcblx0ICAgICAgICBYWzVdID0gKEdbNV0gKyAoKEdbNF0gPDwgOCkgIHwgKEdbNF0gPj4+IDI0KSkgKyBHWzNdKSB8IDA7XG5cdCAgICAgICAgWFs2XSA9IChHWzZdICsgKChHWzVdIDw8IDE2KSB8IChHWzVdID4+PiAxNikpICsgKChHWzRdIDw8IDE2KSB8IChHWzRdID4+PiAxNikpKSB8IDA7XG5cdCAgICAgICAgWFs3XSA9IChHWzddICsgKChHWzZdIDw8IDgpICB8IChHWzZdID4+PiAyNCkpICsgR1s1XSkgfCAwO1xuXHQgICAgfVxuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9ucyB0byB0aGUgY2lwaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgY2lwaGVydGV4dCA9IENyeXB0b0pTLlJhYmJpdC5lbmNyeXB0KG1lc3NhZ2UsIGtleSwgY2ZnKTtcblx0ICAgICAqICAgICB2YXIgcGxhaW50ZXh0ICA9IENyeXB0b0pTLlJhYmJpdC5kZWNyeXB0KGNpcGhlcnRleHQsIGtleSwgY2ZnKTtcblx0ICAgICAqL1xuXHQgICAgQy5SYWJiaXQgPSBTdHJlYW1DaXBoZXIuX2NyZWF0ZUhlbHBlcihSYWJiaXQpO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlJhYmJpdDtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9lbmMtYmFzZTY0XCIpLCByZXF1aXJlKFwiLi9tZDVcIiksIHJlcXVpcmUoXCIuL2V2cGtkZlwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vZW5jLWJhc2U2NFwiLCBcIi4vbWQ1XCIsIFwiLi9ldnBrZGZcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgU3RyZWFtQ2lwaGVyID0gQ19saWIuU3RyZWFtQ2lwaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gUmV1c2FibGUgb2JqZWN0c1xuXHQgICAgdmFyIFMgID0gW107XG5cdCAgICB2YXIgQ18gPSBbXTtcblx0ICAgIHZhciBHICA9IFtdO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFJhYmJpdCBzdHJlYW0gY2lwaGVyIGFsZ29yaXRobS5cblx0ICAgICAqXG5cdCAgICAgKiBUaGlzIGlzIGEgbGVnYWN5IHZlcnNpb24gdGhhdCBuZWdsZWN0ZWQgdG8gY29udmVydCB0aGUga2V5IHRvIGxpdHRsZS1lbmRpYW4uXG5cdCAgICAgKiBUaGlzIGVycm9yIGRvZXNuJ3QgYWZmZWN0IHRoZSBjaXBoZXIncyBzZWN1cml0eSxcblx0ICAgICAqIGJ1dCBpdCBkb2VzIGFmZmVjdCBpdHMgY29tcGF0aWJpbGl0eSB3aXRoIG90aGVyIGltcGxlbWVudGF0aW9ucy5cblx0ICAgICAqL1xuXHQgICAgdmFyIFJhYmJpdExlZ2FjeSA9IENfYWxnby5SYWJiaXRMZWdhY3kgPSBTdHJlYW1DaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIEsgPSB0aGlzLl9rZXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBpdiA9IHRoaXMuY2ZnLml2O1xuXG5cdCAgICAgICAgICAgIC8vIEdlbmVyYXRlIGluaXRpYWwgc3RhdGUgdmFsdWVzXG5cdCAgICAgICAgICAgIHZhciBYID0gdGhpcy5fWCA9IFtcblx0ICAgICAgICAgICAgICAgIEtbMF0sIChLWzNdIDw8IDE2KSB8IChLWzJdID4+PiAxNiksXG5cdCAgICAgICAgICAgICAgICBLWzFdLCAoS1swXSA8PCAxNikgfCAoS1szXSA+Pj4gMTYpLFxuXHQgICAgICAgICAgICAgICAgS1syXSwgKEtbMV0gPDwgMTYpIHwgKEtbMF0gPj4+IDE2KSxcblx0ICAgICAgICAgICAgICAgIEtbM10sIChLWzJdIDw8IDE2KSB8IChLWzFdID4+PiAxNilcblx0ICAgICAgICAgICAgXTtcblxuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSBpbml0aWFsIGNvdW50ZXIgdmFsdWVzXG5cdCAgICAgICAgICAgIHZhciBDID0gdGhpcy5fQyA9IFtcblx0ICAgICAgICAgICAgICAgIChLWzJdIDw8IDE2KSB8IChLWzJdID4+PiAxNiksIChLWzBdICYgMHhmZmZmMDAwMCkgfCAoS1sxXSAmIDB4MDAwMGZmZmYpLFxuXHQgICAgICAgICAgICAgICAgKEtbM10gPDwgMTYpIHwgKEtbM10gPj4+IDE2KSwgKEtbMV0gJiAweGZmZmYwMDAwKSB8IChLWzJdICYgMHgwMDAwZmZmZiksXG5cdCAgICAgICAgICAgICAgICAoS1swXSA8PCAxNikgfCAoS1swXSA+Pj4gMTYpLCAoS1syXSAmIDB4ZmZmZjAwMDApIHwgKEtbM10gJiAweDAwMDBmZmZmKSxcblx0ICAgICAgICAgICAgICAgIChLWzFdIDw8IDE2KSB8IChLWzFdID4+PiAxNiksIChLWzNdICYgMHhmZmZmMDAwMCkgfCAoS1swXSAmIDB4MDAwMGZmZmYpXG5cdCAgICAgICAgICAgIF07XG5cblx0ICAgICAgICAgICAgLy8gQ2FycnkgYml0XG5cdCAgICAgICAgICAgIHRoaXMuX2IgPSAwO1xuXG5cdCAgICAgICAgICAgIC8vIEl0ZXJhdGUgdGhlIHN5c3RlbSBmb3VyIHRpbWVzXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBuZXh0U3RhdGUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIE1vZGlmeSB0aGUgY291bnRlcnNcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIENbaV0gXj0gWFsoaSArIDQpICYgN107XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJViBzZXR1cFxuXHQgICAgICAgICAgICBpZiAoaXYpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIElWID0gaXYud29yZHM7XG5cdCAgICAgICAgICAgICAgICB2YXIgSVZfMCA9IElWWzBdO1xuXHQgICAgICAgICAgICAgICAgdmFyIElWXzEgPSBJVlsxXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgZm91ciBzdWJ2ZWN0b3JzXG5cdCAgICAgICAgICAgICAgICB2YXIgaTAgPSAoKChJVl8wIDw8IDgpIHwgKElWXzAgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8ICgoKElWXzAgPDwgMjQpIHwgKElWXzAgPj4+IDgpKSAmIDB4ZmYwMGZmMDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIGkyID0gKCgoSVZfMSA8PCA4KSB8IChJVl8xID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfCAoKChJVl8xIDw8IDI0KSB8IChJVl8xID4+PiA4KSkgJiAweGZmMDBmZjAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciBpMSA9IChpMCA+Pj4gMTYpIHwgKGkyICYgMHhmZmZmMDAwMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgaTMgPSAoaTIgPDwgMTYpICB8IChpMCAmIDB4MDAwMGZmZmYpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBNb2RpZnkgY291bnRlciB2YWx1ZXNcblx0ICAgICAgICAgICAgICAgIENbMF0gXj0gaTA7XG5cdCAgICAgICAgICAgICAgICBDWzFdIF49IGkxO1xuXHQgICAgICAgICAgICAgICAgQ1syXSBePSBpMjtcblx0ICAgICAgICAgICAgICAgIENbM10gXj0gaTM7XG5cdCAgICAgICAgICAgICAgICBDWzRdIF49IGkwO1xuXHQgICAgICAgICAgICAgICAgQ1s1XSBePSBpMTtcblx0ICAgICAgICAgICAgICAgIENbNl0gXj0gaTI7XG5cdCAgICAgICAgICAgICAgICBDWzddIF49IGkzO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBJdGVyYXRlIHRoZSBzeXN0ZW0gZm91ciB0aW1lc1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICBuZXh0U3RhdGUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIFggPSB0aGlzLl9YO1xuXG5cdCAgICAgICAgICAgIC8vIEl0ZXJhdGUgdGhlIHN5c3RlbVxuXHQgICAgICAgICAgICBuZXh0U3RhdGUuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSBmb3VyIGtleXN0cmVhbSB3b3Jkc1xuXHQgICAgICAgICAgICBTWzBdID0gWFswXSBeIChYWzVdID4+PiAxNikgXiAoWFszXSA8PCAxNik7XG5cdCAgICAgICAgICAgIFNbMV0gPSBYWzJdIF4gKFhbN10gPj4+IDE2KSBeIChYWzVdIDw8IDE2KTtcblx0ICAgICAgICAgICAgU1syXSA9IFhbNF0gXiAoWFsxXSA+Pj4gMTYpIF4gKFhbN10gPDwgMTYpO1xuXHQgICAgICAgICAgICBTWzNdID0gWFs2XSBeIChYWzNdID4+PiAxNikgXiAoWFsxXSA8PCAxNik7XG5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgICAgICBTW2ldID0gKCgoU1tpXSA8PCA4KSAgfCAoU1tpXSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAgICAoKChTW2ldIDw8IDI0KSB8IChTW2ldID4+PiA4KSkgICYgMHhmZjAwZmYwMCk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEVuY3J5cHRcblx0ICAgICAgICAgICAgICAgIE1bb2Zmc2V0ICsgaV0gXj0gU1tpXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDEyOC8zMixcblxuXHQgICAgICAgIGl2U2l6ZTogNjQvMzJcblx0ICAgIH0pO1xuXG5cdCAgICBmdW5jdGlvbiBuZXh0U3RhdGUoKSB7XG5cdCAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgdmFyIFggPSB0aGlzLl9YO1xuXHQgICAgICAgIHZhciBDID0gdGhpcy5fQztcblxuXHQgICAgICAgIC8vIFNhdmUgb2xkIGNvdW50ZXIgdmFsdWVzXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcblx0ICAgICAgICAgICAgQ19baV0gPSBDW2ldO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgY291bnRlciB2YWx1ZXNcblx0ICAgICAgICBDWzBdID0gKENbMF0gKyAweDRkMzRkMzRkICsgdGhpcy5fYikgfCAwO1xuXHQgICAgICAgIENbMV0gPSAoQ1sxXSArIDB4ZDM0ZDM0ZDMgKyAoKENbMF0gPj4+IDApIDwgKENfWzBdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbMl0gPSAoQ1syXSArIDB4MzRkMzRkMzQgKyAoKENbMV0gPj4+IDApIDwgKENfWzFdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbM10gPSAoQ1szXSArIDB4NGQzNGQzNGQgKyAoKENbMl0gPj4+IDApIDwgKENfWzJdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbNF0gPSAoQ1s0XSArIDB4ZDM0ZDM0ZDMgKyAoKENbM10gPj4+IDApIDwgKENfWzNdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbNV0gPSAoQ1s1XSArIDB4MzRkMzRkMzQgKyAoKENbNF0gPj4+IDApIDwgKENfWzRdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbNl0gPSAoQ1s2XSArIDB4NGQzNGQzNGQgKyAoKENbNV0gPj4+IDApIDwgKENfWzVdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbN10gPSAoQ1s3XSArIDB4ZDM0ZDM0ZDMgKyAoKENbNl0gPj4+IDApIDwgKENfWzZdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIHRoaXMuX2IgPSAoQ1s3XSA+Pj4gMCkgPCAoQ19bN10gPj4+IDApID8gMSA6IDA7XG5cblx0ICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGctdmFsdWVzXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcblx0ICAgICAgICAgICAgdmFyIGd4ID0gWFtpXSArIENbaV07XG5cblx0ICAgICAgICAgICAgLy8gQ29uc3RydWN0IGhpZ2ggYW5kIGxvdyBhcmd1bWVudCBmb3Igc3F1YXJpbmdcblx0ICAgICAgICAgICAgdmFyIGdhID0gZ3ggJiAweGZmZmY7XG5cdCAgICAgICAgICAgIHZhciBnYiA9IGd4ID4+PiAxNjtcblxuXHQgICAgICAgICAgICAvLyBDYWxjdWxhdGUgaGlnaCBhbmQgbG93IHJlc3VsdCBvZiBzcXVhcmluZ1xuXHQgICAgICAgICAgICB2YXIgZ2ggPSAoKCgoZ2EgKiBnYSkgPj4+IDE3KSArIGdhICogZ2IpID4+PiAxNSkgKyBnYiAqIGdiO1xuXHQgICAgICAgICAgICB2YXIgZ2wgPSAoKChneCAmIDB4ZmZmZjAwMDApICogZ3gpIHwgMCkgKyAoKChneCAmIDB4MDAwMGZmZmYpICogZ3gpIHwgMCk7XG5cblx0ICAgICAgICAgICAgLy8gSGlnaCBYT1IgbG93XG5cdCAgICAgICAgICAgIEdbaV0gPSBnaCBeIGdsO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgc3RhdGUgdmFsdWVzXG5cdCAgICAgICAgWFswXSA9IChHWzBdICsgKChHWzddIDw8IDE2KSB8IChHWzddID4+PiAxNikpICsgKChHWzZdIDw8IDE2KSB8IChHWzZdID4+PiAxNikpKSB8IDA7XG5cdCAgICAgICAgWFsxXSA9IChHWzFdICsgKChHWzBdIDw8IDgpICB8IChHWzBdID4+PiAyNCkpICsgR1s3XSkgfCAwO1xuXHQgICAgICAgIFhbMl0gPSAoR1syXSArICgoR1sxXSA8PCAxNikgfCAoR1sxXSA+Pj4gMTYpKSArICgoR1swXSA8PCAxNikgfCAoR1swXSA+Pj4gMTYpKSkgfCAwO1xuXHQgICAgICAgIFhbM10gPSAoR1szXSArICgoR1syXSA8PCA4KSAgfCAoR1syXSA+Pj4gMjQpKSArIEdbMV0pIHwgMDtcblx0ICAgICAgICBYWzRdID0gKEdbNF0gKyAoKEdbM10gPDwgMTYpIHwgKEdbM10gPj4+IDE2KSkgKyAoKEdbMl0gPDwgMTYpIHwgKEdbMl0gPj4+IDE2KSkpIHwgMDtcblx0ICAgICAgICBYWzVdID0gKEdbNV0gKyAoKEdbNF0gPDwgOCkgIHwgKEdbNF0gPj4+IDI0KSkgKyBHWzNdKSB8IDA7XG5cdCAgICAgICAgWFs2XSA9IChHWzZdICsgKChHWzVdIDw8IDE2KSB8IChHWzVdID4+PiAxNikpICsgKChHWzRdIDw8IDE2KSB8IChHWzRdID4+PiAxNikpKSB8IDA7XG5cdCAgICAgICAgWFs3XSA9IChHWzddICsgKChHWzZdIDw8IDgpICB8IChHWzZdID4+PiAyNCkpICsgR1s1XSkgfCAwO1xuXHQgICAgfVxuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9ucyB0byB0aGUgY2lwaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgY2lwaGVydGV4dCA9IENyeXB0b0pTLlJhYmJpdExlZ2FjeS5lbmNyeXB0KG1lc3NhZ2UsIGtleSwgY2ZnKTtcblx0ICAgICAqICAgICB2YXIgcGxhaW50ZXh0ICA9IENyeXB0b0pTLlJhYmJpdExlZ2FjeS5kZWNyeXB0KGNpcGhlcnRleHQsIGtleSwgY2ZnKTtcblx0ICAgICAqL1xuXHQgICAgQy5SYWJiaXRMZWdhY3kgPSBTdHJlYW1DaXBoZXIuX2NyZWF0ZUhlbHBlcihSYWJiaXRMZWdhY3kpO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlJhYmJpdExlZ2FjeTtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9lbmMtYmFzZTY0XCIpLCByZXF1aXJlKFwiLi9tZDVcIiksIHJlcXVpcmUoXCIuL2V2cGtkZlwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vZW5jLWJhc2U2NFwiLCBcIi4vbWQ1XCIsIFwiLi9ldnBrZGZcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgQmxvY2tDaXBoZXIgPSBDX2xpYi5CbG9ja0NpcGhlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIGNvbnN0IE4gPSAxNjtcblxuXHQgICAgLy9PcmlnaW4gcGJveCBhbmQgc2JveCwgZGVyaXZlZCBmcm9tIFBJXG5cdCAgICBjb25zdCBPUklHX1AgPSBbXG5cdCAgICAgICAgMHgyNDNGNkE4OCwgMHg4NUEzMDhEMywgMHgxMzE5OEEyRSwgMHgwMzcwNzM0NCxcblx0ICAgICAgICAweEE0MDkzODIyLCAweDI5OUYzMUQwLCAweDA4MkVGQTk4LCAweEVDNEU2Qzg5LFxuXHQgICAgICAgIDB4NDUyODIxRTYsIDB4MzhEMDEzNzcsIDB4QkU1NDY2Q0YsIDB4MzRFOTBDNkMsXG5cdCAgICAgICAgMHhDMEFDMjlCNywgMHhDOTdDNTBERCwgMHgzRjg0RDVCNSwgMHhCNTQ3MDkxNyxcblx0ICAgICAgICAweDkyMTZENUQ5LCAweDg5NzlGQjFCXG5cdCAgICBdO1xuXG5cdCAgICBjb25zdCBPUklHX1MgPSBbXG5cdCAgICAgICAgWyAgIDB4RDEzMTBCQTYsIDB4OThERkI1QUMsIDB4MkZGRDcyREIsIDB4RDAxQURGQjcsXG5cdCAgICAgICAgICAgIDB4QjhFMUFGRUQsIDB4NkEyNjdFOTYsIDB4QkE3QzkwNDUsIDB4RjEyQzdGOTksXG5cdCAgICAgICAgICAgIDB4MjRBMTk5NDcsIDB4QjM5MTZDRjcsIDB4MDgwMUYyRTIsIDB4ODU4RUZDMTYsXG5cdCAgICAgICAgICAgIDB4NjM2OTIwRDgsIDB4NzE1NzRFNjksIDB4QTQ1OEZFQTMsIDB4RjQ5MzNEN0UsXG5cdCAgICAgICAgICAgIDB4MEQ5NTc0OEYsIDB4NzI4RUI2NTgsIDB4NzE4QkNENTgsIDB4ODIxNTRBRUUsXG5cdCAgICAgICAgICAgIDB4N0I1NEE0MUQsIDB4QzI1QTU5QjUsIDB4OUMzMEQ1MzksIDB4MkFGMjYwMTMsXG5cdCAgICAgICAgICAgIDB4QzVEMUIwMjMsIDB4Mjg2MDg1RjAsIDB4Q0E0MTc5MTgsIDB4QjhEQjM4RUYsXG5cdCAgICAgICAgICAgIDB4OEU3OURDQjAsIDB4NjAzQTE4MEUsIDB4NkM5RTBFOEIsIDB4QjAxRThBM0UsXG5cdCAgICAgICAgICAgIDB4RDcxNTc3QzEsIDB4QkQzMTRCMjcsIDB4NzhBRjJGREEsIDB4NTU2MDVDNjAsXG5cdCAgICAgICAgICAgIDB4RTY1NTI1RjMsIDB4QUE1NUFCOTQsIDB4NTc0ODk4NjIsIDB4NjNFODE0NDAsXG5cdCAgICAgICAgICAgIDB4NTVDQTM5NkEsIDB4MkFBQjEwQjYsIDB4QjRDQzVDMzQsIDB4MTE0MUU4Q0UsXG5cdCAgICAgICAgICAgIDB4QTE1NDg2QUYsIDB4N0M3MkU5OTMsIDB4QjNFRTE0MTEsIDB4NjM2RkJDMkEsXG5cdCAgICAgICAgICAgIDB4MkJBOUM1NUQsIDB4NzQxODMxRjYsIDB4Q0U1QzNFMTYsIDB4OUI4NzkzMUUsXG5cdCAgICAgICAgICAgIDB4QUZENkJBMzMsIDB4NkMyNENGNUMsIDB4N0EzMjUzODEsIDB4Mjg5NTg2NzcsXG5cdCAgICAgICAgICAgIDB4M0I4RjQ4OTgsIDB4NkI0QkI5QUYsIDB4QzRCRkU4MUIsIDB4NjYyODIxOTMsXG5cdCAgICAgICAgICAgIDB4NjFEODA5Q0MsIDB4RkIyMUE5OTEsIDB4NDg3Q0FDNjAsIDB4NURFQzgwMzIsXG5cdCAgICAgICAgICAgIDB4RUY4NDVENUQsIDB4RTk4NTc1QjEsIDB4REMyNjIzMDIsIDB4RUI2NTFCODgsXG5cdCAgICAgICAgICAgIDB4MjM4OTNFODEsIDB4RDM5NkFDQzUsIDB4MEY2RDZGRjMsIDB4ODNGNDQyMzksXG5cdCAgICAgICAgICAgIDB4MkUwQjQ0ODIsIDB4QTQ4NDIwMDQsIDB4NjlDOEYwNEEsIDB4OUUxRjlCNUUsXG5cdCAgICAgICAgICAgIDB4MjFDNjY4NDIsIDB4RjZFOTZDOUEsIDB4NjcwQzlDNjEsIDB4QUJEMzg4RjAsXG5cdCAgICAgICAgICAgIDB4NkE1MUEwRDIsIDB4RDg1NDJGNjgsIDB4OTYwRkE3MjgsIDB4QUI1MTMzQTMsXG5cdCAgICAgICAgICAgIDB4NkVFRjBCNkMsIDB4MTM3QTNCRTQsIDB4QkEzQkYwNTAsIDB4N0VGQjJBOTgsXG5cdCAgICAgICAgICAgIDB4QTFGMTY1MUQsIDB4MzlBRjAxNzYsIDB4NjZDQTU5M0UsIDB4ODI0MzBFODgsXG5cdCAgICAgICAgICAgIDB4OENFRTg2MTksIDB4NDU2RjlGQjQsIDB4N0Q4NEE1QzMsIDB4M0I4QjVFQkUsXG5cdCAgICAgICAgICAgIDB4RTA2Rjc1RDgsIDB4ODVDMTIwNzMsIDB4NDAxQTQ0OUYsIDB4NTZDMTZBQTYsXG5cdCAgICAgICAgICAgIDB4NEVEM0FBNjIsIDB4MzYzRjc3MDYsIDB4MUJGRURGNzIsIDB4NDI5QjAyM0QsXG5cdCAgICAgICAgICAgIDB4MzdEMEQ3MjQsIDB4RDAwQTEyNDgsIDB4REIwRkVBRDMsIDB4NDlGMUMwOUIsXG5cdCAgICAgICAgICAgIDB4MDc1MzcyQzksIDB4ODA5OTFCN0IsIDB4MjVENDc5RDgsIDB4RjZFOERFRjcsXG5cdCAgICAgICAgICAgIDB4RTNGRTUwMUEsIDB4QjY3OTRDM0IsIDB4OTc2Q0UwQkQsIDB4MDRDMDA2QkEsXG5cdCAgICAgICAgICAgIDB4QzFBOTRGQjYsIDB4NDA5RjYwQzQsIDB4NUU1QzlFQzIsIDB4MTk2QTI0NjMsXG5cdCAgICAgICAgICAgIDB4NjhGQjZGQUYsIDB4M0U2QzUzQjUsIDB4MTMzOUIyRUIsIDB4M0I1MkVDNkYsXG5cdCAgICAgICAgICAgIDB4NkRGQzUxMUYsIDB4OUIzMDk1MkMsIDB4Q0M4MTQ1NDQsIDB4QUY1RUJEMDksXG5cdCAgICAgICAgICAgIDB4QkVFM0QwMDQsIDB4REUzMzRBRkQsIDB4NjYwRjI4MDcsIDB4MTkyRTRCQjMsXG5cdCAgICAgICAgICAgIDB4QzBDQkE4NTcsIDB4NDVDODc0MEYsIDB4RDIwQjVGMzksIDB4QjlEM0ZCREIsXG5cdCAgICAgICAgICAgIDB4NTU3OUMwQkQsIDB4MUE2MDMyMEEsIDB4RDZBMTAwQzYsIDB4NDAyQzcyNzksXG5cdCAgICAgICAgICAgIDB4Njc5RjI1RkUsIDB4RkIxRkEzQ0MsIDB4OEVBNUU5RjgsIDB4REIzMjIyRjgsXG5cdCAgICAgICAgICAgIDB4M0M3NTE2REYsIDB4RkQ2MTZCMTUsIDB4MkY1MDFFQzgsIDB4QUQwNTUyQUIsXG5cdCAgICAgICAgICAgIDB4MzIzREI1RkEsIDB4RkQyMzg3NjAsIDB4NTMzMTdCNDgsIDB4M0UwMERGODIsXG5cdCAgICAgICAgICAgIDB4OUU1QzU3QkIsIDB4Q0E2RjhDQTAsIDB4MUE4NzU2MkUsIDB4REYxNzY5REIsXG5cdCAgICAgICAgICAgIDB4RDU0MkE4RjYsIDB4Mjg3RUZGQzMsIDB4QUM2NzMyQzYsIDB4OEM0RjU1NzMsXG5cdCAgICAgICAgICAgIDB4Njk1QjI3QjAsIDB4QkJDQTU4QzgsIDB4RTFGRkEzNUQsIDB4QjhGMDExQTAsXG5cdCAgICAgICAgICAgIDB4MTBGQTNEOTgsIDB4RkQyMTgzQjgsIDB4NEFGQ0I1NkMsIDB4MkREMUQzNUIsXG5cdCAgICAgICAgICAgIDB4OUE1M0U0NzksIDB4QjZGODQ1NjUsIDB4RDI4RTQ5QkMsIDB4NEJGQjk3OTAsXG5cdCAgICAgICAgICAgIDB4RTFEREYyREEsIDB4QTRDQjdFMzMsIDB4NjJGQjEzNDEsIDB4Q0VFNEM2RTgsXG5cdCAgICAgICAgICAgIDB4RUYyMENBREEsIDB4MzY3NzRDMDEsIDB4RDA3RTlFRkUsIDB4MkJGMTFGQjQsXG5cdCAgICAgICAgICAgIDB4OTVEQkRBNEQsIDB4QUU5MDkxOTgsIDB4RUFBRDhFNzEsIDB4NkI5M0Q1QTAsXG5cdCAgICAgICAgICAgIDB4RDA4RUQxRDAsIDB4QUZDNzI1RTAsIDB4OEUzQzVCMkYsIDB4OEU3NTk0QjcsXG5cdCAgICAgICAgICAgIDB4OEZGNkUyRkIsIDB4RjIxMjJCNjQsIDB4ODg4OEI4MTIsIDB4OTAwREYwMUMsXG5cdCAgICAgICAgICAgIDB4NEZBRDVFQTAsIDB4Njg4RkMzMUMsIDB4RDFDRkYxOTEsIDB4QjNBOEMxQUQsXG5cdCAgICAgICAgICAgIDB4MkYyRjIyMTgsIDB4QkUwRTE3NzcsIDB4RUE3NTJERkUsIDB4OEIwMjFGQTEsXG5cdCAgICAgICAgICAgIDB4RTVBMENDMEYsIDB4QjU2Rjc0RTgsIDB4MThBQ0YzRDYsIDB4Q0U4OUUyOTksXG5cdCAgICAgICAgICAgIDB4QjRBODRGRTAsIDB4RkQxM0UwQjcsIDB4N0NDNDNCODEsIDB4RDJBREE4RDksXG5cdCAgICAgICAgICAgIDB4MTY1RkEyNjYsIDB4ODA5NTc3MDUsIDB4OTNDQzczMTQsIDB4MjExQTE0NzcsXG5cdCAgICAgICAgICAgIDB4RTZBRDIwNjUsIDB4NzdCNUZBODYsIDB4Qzc1NDQyRjUsIDB4RkI5RDM1Q0YsXG5cdCAgICAgICAgICAgIDB4RUJDREFGMEMsIDB4N0IzRTg5QTAsIDB4RDY0MTFCRDMsIDB4QUUxRTdFNDksXG5cdCAgICAgICAgICAgIDB4MDAyNTBFMkQsIDB4MjA3MUIzNUUsIDB4MjI2ODAwQkIsIDB4NTdCOEUwQUYsXG5cdCAgICAgICAgICAgIDB4MjQ2NDM2OUIsIDB4RjAwOUI5MUUsIDB4NTU2MzkxMUQsIDB4NTlERkE2QUEsXG5cdCAgICAgICAgICAgIDB4NzhDMTQzODksIDB4RDk1QTUzN0YsIDB4MjA3RDVCQTIsIDB4MDJFNUI5QzUsXG5cdCAgICAgICAgICAgIDB4ODMyNjAzNzYsIDB4NjI5NUNGQTksIDB4MTFDODE5NjgsIDB4NEU3MzRBNDEsXG5cdCAgICAgICAgICAgIDB4QjM0NzJEQ0EsIDB4N0IxNEE5NEEsIDB4MUI1MTAwNTIsIDB4OUE1MzI5MTUsXG5cdCAgICAgICAgICAgIDB4RDYwRjU3M0YsIDB4QkM5QkM2RTQsIDB4MkI2MEE0NzYsIDB4ODFFNjc0MDAsXG5cdCAgICAgICAgICAgIDB4MDhCQTZGQjUsIDB4NTcxQkU5MUYsIDB4RjI5NkVDNkIsIDB4MkEwREQ5MTUsXG5cdCAgICAgICAgICAgIDB4QjY2MzY1MjEsIDB4RTdCOUY5QjYsIDB4RkYzNDA1MkUsIDB4QzU4NTU2NjQsXG5cdCAgICAgICAgICAgIDB4NTNCMDJENUQsIDB4QTk5RjhGQTEsIDB4MDhCQTQ3OTksIDB4NkU4NTA3NkEgICBdLFxuXHQgICAgICAgIFsgICAweDRCN0E3MEU5LCAweEI1QjMyOTQ0LCAweERCNzUwOTJFLCAweEM0MTkyNjIzLFxuXHQgICAgICAgICAgICAweEFENkVBNkIwLCAweDQ5QTdERjdELCAweDlDRUU2MEI4LCAweDhGRURCMjY2LFxuXHQgICAgICAgICAgICAweEVDQUE4QzcxLCAweDY5OUExN0ZGLCAweDU2NjQ1MjZDLCAweEMyQjE5RUUxLFxuXHQgICAgICAgICAgICAweDE5MzYwMkE1LCAweDc1MDk0QzI5LCAweEEwNTkxMzQwLCAweEU0MTgzQTNFLFxuXHQgICAgICAgICAgICAweDNGNTQ5ODlBLCAweDVCNDI5RDY1LCAweDZCOEZFNEQ2LCAweDk5RjczRkQ2LFxuXHQgICAgICAgICAgICAweEExRDI5QzA3LCAweEVGRTgzMEY1LCAweDREMkQzOEU2LCAweEYwMjU1REMxLFxuXHQgICAgICAgICAgICAweDRDREQyMDg2LCAweDg0NzBFQjI2LCAweDYzODJFOUM2LCAweDAyMUVDQzVFLFxuXHQgICAgICAgICAgICAweDA5Njg2QjNGLCAweDNFQkFFRkM5LCAweDNDOTcxODE0LCAweDZCNkE3MEExLFxuXHQgICAgICAgICAgICAweDY4N0YzNTg0LCAweDUyQTBFMjg2LCAweEI3OUM1MzA1LCAweEFBNTAwNzM3LFxuXHQgICAgICAgICAgICAweDNFMDc4NDFDLCAweDdGREVBRTVDLCAweDhFN0Q0NEVDLCAweDU3MTZGMkI4LFxuXHQgICAgICAgICAgICAweEIwM0FEQTM3LCAweEYwNTAwQzBELCAweEYwMUMxRjA0LCAweDAyMDBCM0ZGLFxuXHQgICAgICAgICAgICAweEFFMENGNTFBLCAweDNDQjU3NEIyLCAweDI1ODM3QTU4LCAweERDMDkyMUJELFxuXHQgICAgICAgICAgICAweEQxOTExM0Y5LCAweDdDQTkyRkY2LCAweDk0MzI0NzczLCAweDIyRjU0NzAxLFxuXHQgICAgICAgICAgICAweDNBRTVFNTgxLCAweDM3QzJEQURDLCAweEM4QjU3NjM0LCAweDlBRjNEREE3LFxuXHQgICAgICAgICAgICAweEE5NDQ2MTQ2LCAweDBGRDAwMzBFLCAweEVDQzhDNzNFLCAweEE0NzUxRTQxLFxuXHQgICAgICAgICAgICAweEUyMzhDRDk5LCAweDNCRUEwRTJGLCAweDMyODBCQkExLCAweDE4M0VCMzMxLFxuXHQgICAgICAgICAgICAweDRFNTQ4QjM4LCAweDRGNkRCOTA4LCAweDZGNDIwRDAzLCAweEY2MEEwNEJGLFxuXHQgICAgICAgICAgICAweDJDQjgxMjkwLCAweDI0OTc3Qzc5LCAweDU2NzlCMDcyLCAweEJDQUY4OUFGLFxuXHQgICAgICAgICAgICAweERFOUE3NzFGLCAweEQ5OTMwODEwLCAweEIzOEJBRTEyLCAweERDQ0YzRjJFLFxuXHQgICAgICAgICAgICAweDU1MTI3MjFGLCAweDJFNkI3MTI0LCAweDUwMUFEREU2LCAweDlGODRDRDg3LFxuXHQgICAgICAgICAgICAweDdBNTg0NzE4LCAweDc0MDhEQTE3LCAweEJDOUY5QUJDLCAweEU5NEI3RDhDLFxuXHQgICAgICAgICAgICAweEVDN0FFQzNBLCAweERCODUxREZBLCAweDYzMDk0MzY2LCAweEM0NjRDM0QyLFxuXHQgICAgICAgICAgICAweEVGMUMxODQ3LCAweDMyMTVEOTA4LCAweERENDMzQjM3LCAweDI0QzJCQTE2LFxuXHQgICAgICAgICAgICAweDEyQTE0RDQzLCAweDJBNjVDNDUxLCAweDUwOTQwMDAyLCAweDEzM0FFNERELFxuXHQgICAgICAgICAgICAweDcxREZGODlFLCAweDEwMzE0RTU1LCAweDgxQUM3N0Q2LCAweDVGMTExOTlCLFxuXHQgICAgICAgICAgICAweDA0MzU1NkYxLCAweEQ3QTNDNzZCLCAweDNDMTExODNCLCAweDU5MjRBNTA5LFxuXHQgICAgICAgICAgICAweEYyOEZFNkVELCAweDk3RjFGQkZBLCAweDlFQkFCRjJDLCAweDFFMTUzQzZFLFxuXHQgICAgICAgICAgICAweDg2RTM0NTcwLCAweEVBRTk2RkIxLCAweDg2MEU1RTBBLCAweDVBM0UyQUIzLFxuXHQgICAgICAgICAgICAweDc3MUZFNzFDLCAweDRFM0QwNkZBLCAweDI5NjVEQ0I5LCAweDk5RTcxRDBGLFxuXHQgICAgICAgICAgICAweDgwM0U4OUQ2LCAweDUyNjZDODI1LCAweDJFNENDOTc4LCAweDlDMTBCMzZBLFxuXHQgICAgICAgICAgICAweEM2MTUwRUJBLCAweDk0RTJFQTc4LCAweEE1RkMzQzUzLCAweDFFMEEyREY0LFxuXHQgICAgICAgICAgICAweEYyRjc0RUE3LCAweDM2MUQyQjNELCAweDE5MzkyNjBGLCAweDE5QzI3OTYwLFxuXHQgICAgICAgICAgICAweDUyMjNBNzA4LCAweEY3MTMxMkI2LCAweEVCQURGRTZFLCAweEVBQzMxRjY2LFxuXHQgICAgICAgICAgICAweEUzQkM0NTk1LCAweEE2N0JDODgzLCAweEIxN0YzN0QxLCAweDAxOENGRjI4LFxuXHQgICAgICAgICAgICAweEMzMzJEREVGLCAweEJFNkM1QUE1LCAweDY1NTgyMTg1LCAweDY4QUI5ODAyLFxuXHQgICAgICAgICAgICAweEVFQ0VBNTBGLCAweERCMkY5NTNCLCAweDJBRUY3REFELCAweDVCNkUyRjg0LFxuXHQgICAgICAgICAgICAweDE1MjFCNjI4LCAweDI5MDc2MTcwLCAweEVDREQ0Nzc1LCAweDYxOUYxNTEwLFxuXHQgICAgICAgICAgICAweDEzQ0NBODMwLCAweEVCNjFCRDk2LCAweDAzMzRGRTFFLCAweEFBMDM2M0NGLFxuXHQgICAgICAgICAgICAweEI1NzM1QzkwLCAweDRDNzBBMjM5LCAweEQ1OUU5RTBCLCAweENCQUFERTE0LFxuXHQgICAgICAgICAgICAweEVFQ0M4NkJDLCAweDYwNjIyQ0E3LCAweDlDQUI1Q0FCLCAweEIyRjM4NDZFLFxuXHQgICAgICAgICAgICAweDY0OEIxRUFGLCAweDE5QkRGMENBLCAweEEwMjM2OUI5LCAweDY1NUFCQjUwLFxuXHQgICAgICAgICAgICAweDQwNjg1QTMyLCAweDNDMkFCNEIzLCAweDMxOUVFOUQ1LCAweEMwMjFCOEY3LFxuXHQgICAgICAgICAgICAweDlCNTQwQjE5LCAweDg3NUZBMDk5LCAweDk1Rjc5OTdFLCAweDYyM0Q3REE4LFxuXHQgICAgICAgICAgICAweEY4Mzc4ODlBLCAweDk3RTMyRDc3LCAweDExRUQ5MzVGLCAweDE2NjgxMjgxLFxuXHQgICAgICAgICAgICAweDBFMzU4ODI5LCAweEM3RTYxRkQ2LCAweDk2REVERkExLCAweDc4NThCQTk5LFxuXHQgICAgICAgICAgICAweDU3RjU4NEE1LCAweDFCMjI3MjYzLCAweDlCODNDM0ZGLCAweDFBQzI0Njk2LFxuXHQgICAgICAgICAgICAweENEQjMwQUVCLCAweDUzMkUzMDU0LCAweDhGRDk0OEU0LCAweDZEQkMzMTI4LFxuXHQgICAgICAgICAgICAweDU4RUJGMkVGLCAweDM0QzZGRkVBLCAweEZFMjhFRDYxLCAweEVFN0MzQzczLFxuXHQgICAgICAgICAgICAweDVENEExNEQ5LCAweEU4NjRCN0UzLCAweDQyMTA1RDE0LCAweDIwM0UxM0UwLFxuXHQgICAgICAgICAgICAweDQ1RUVFMkI2LCAweEEzQUFBQkVBLCAweERCNkM0RjE1LCAweEZBQ0I0RkQwLFxuXHQgICAgICAgICAgICAweEM3NDJGNDQyLCAweEVGNkFCQkI1LCAweDY1NEYzQjFELCAweDQxQ0QyMTA1LFxuXHQgICAgICAgICAgICAweEQ4MUU3OTlFLCAweDg2ODU0REM3LCAweEU0NEI0NzZBLCAweDNEODE2MjUwLFxuXHQgICAgICAgICAgICAweENGNjJBMUYyLCAweDVCOEQyNjQ2LCAweEZDODg4M0EwLCAweEMxQzdCNkEzLFxuXHQgICAgICAgICAgICAweDdGMTUyNEMzLCAweDY5Q0I3NDkyLCAweDQ3ODQ4QTBCLCAweDU2OTJCMjg1LFxuXHQgICAgICAgICAgICAweDA5NUJCRjAwLCAweEFEMTk0ODlELCAweDE0NjJCMTc0LCAweDIzODIwRTAwLFxuXHQgICAgICAgICAgICAweDU4NDI4RDJBLCAweDBDNTVGNUVBLCAweDFEQURGNDNFLCAweDIzM0Y3MDYxLFxuXHQgICAgICAgICAgICAweDMzNzJGMDkyLCAweDhEOTM3RTQxLCAweEQ2NUZFQ0YxLCAweDZDMjIzQkRCLFxuXHQgICAgICAgICAgICAweDdDREUzNzU5LCAweENCRUU3NDYwLCAweDQwODVGMkE3LCAweENFNzczMjZFLFxuXHQgICAgICAgICAgICAweEE2MDc4MDg0LCAweDE5Rjg1MDlFLCAweEU4RUZEODU1LCAweDYxRDk5NzM1LFxuXHQgICAgICAgICAgICAweEE5NjlBN0FBLCAweEM1MEMwNkMyLCAweDVBMDRBQkZDLCAweDgwMEJDQURDLFxuXHQgICAgICAgICAgICAweDlFNDQ3QTJFLCAweEMzNDUzNDg0LCAweEZERDU2NzA1LCAweDBFMUU5RUM5LFxuXHQgICAgICAgICAgICAweERCNzNEQkQzLCAweDEwNTU4OENELCAweDY3NUZEQTc5LCAweEUzNjc0MzQwLFxuXHQgICAgICAgICAgICAweEM1QzQzNDY1LCAweDcxM0UzOEQ4LCAweDNEMjhGODlFLCAweEYxNkRGRjIwLFxuXHQgICAgICAgICAgICAweDE1M0UyMUU3LCAweDhGQjAzRDRBLCAweEU2RTM5RjJCLCAweERCODNBREY3ICAgXSxcblx0ICAgICAgICBbICAgMHhFOTNENUE2OCwgMHg5NDgxNDBGNywgMHhGNjRDMjYxQywgMHg5NDY5MjkzNCxcblx0ICAgICAgICAgICAgMHg0MTE1MjBGNywgMHg3NjAyRDRGNywgMHhCQ0Y0NkIyRSwgMHhENEEyMDA2OCxcblx0ICAgICAgICAgICAgMHhENDA4MjQ3MSwgMHgzMzIwRjQ2QSwgMHg0M0I3RDRCNywgMHg1MDAwNjFBRixcblx0ICAgICAgICAgICAgMHgxRTM5RjYyRSwgMHg5NzI0NDU0NiwgMHgxNDIxNEY3NCwgMHhCRjhCODg0MCxcblx0ICAgICAgICAgICAgMHg0RDk1RkMxRCwgMHg5NkI1OTFBRiwgMHg3MEY0REREMywgMHg2NkEwMkY0NSxcblx0ICAgICAgICAgICAgMHhCRkJDMDlFQywgMHgwM0JEOTc4NSwgMHg3RkFDNkREMCwgMHgzMUNCODUwNCxcblx0ICAgICAgICAgICAgMHg5NkVCMjdCMywgMHg1NUZEMzk0MSwgMHhEQTI1NDdFNiwgMHhBQkNBMEE5QSxcblx0ICAgICAgICAgICAgMHgyODUwNzgyNSwgMHg1MzA0MjlGNCwgMHgwQTJDODZEQSwgMHhFOUI2NkRGQixcblx0ICAgICAgICAgICAgMHg2OERDMTQ2MiwgMHhENzQ4NjkwMCwgMHg2ODBFQzBBNCwgMHgyN0ExOERFRSxcblx0ICAgICAgICAgICAgMHg0RjNGRkVBMiwgMHhFODg3QUQ4QywgMHhCNThDRTAwNiwgMHg3QUY0RDZCNixcblx0ICAgICAgICAgICAgMHhBQUNFMUU3QywgMHhEMzM3NUZFQywgMHhDRTc4QTM5OSwgMHg0MDZCMkE0Mixcblx0ICAgICAgICAgICAgMHgyMEZFOUUzNSwgMHhEOUYzODVCOSwgMHhFRTM5RDdBQiwgMHgzQjEyNEU4Qixcblx0ICAgICAgICAgICAgMHgxREM5RkFGNywgMHg0QjZEMTg1NiwgMHgyNkEzNjYzMSwgMHhFQUUzOTdCMixcblx0ICAgICAgICAgICAgMHgzQTZFRkE3NCwgMHhERDVCNDMzMiwgMHg2ODQxRTdGNywgMHhDQTc4MjBGQixcblx0ICAgICAgICAgICAgMHhGQjBBRjU0RSwgMHhEOEZFQjM5NywgMHg0NTQwNTZBQywgMHhCQTQ4OTUyNyxcblx0ICAgICAgICAgICAgMHg1NTUzM0EzQSwgMHgyMDgzOEQ4NywgMHhGRTZCQTlCNywgMHhEMDk2OTU0Qixcblx0ICAgICAgICAgICAgMHg1NUE4NjdCQywgMHhBMTE1OUE1OCwgMHhDQ0E5Mjk2MywgMHg5OUUxREIzMyxcblx0ICAgICAgICAgICAgMHhBNjJBNEE1NiwgMHgzRjMxMjVGOSwgMHg1RUY0N0UxQywgMHg5MDI5MzE3Qyxcblx0ICAgICAgICAgICAgMHhGREY4RTgwMiwgMHgwNDI3MkY3MCwgMHg4MEJCMTU1QywgMHgwNTI4MkNFMyxcblx0ICAgICAgICAgICAgMHg5NUMxMTU0OCwgMHhFNEM2NkQyMiwgMHg0OEMxMTMzRiwgMHhDNzBGODZEQyxcblx0ICAgICAgICAgICAgMHgwN0Y5QzlFRSwgMHg0MTA0MUYwRiwgMHg0MDQ3NzlBNCwgMHg1RDg4NkUxNyxcblx0ICAgICAgICAgICAgMHgzMjVGNTFFQiwgMHhENTlCQzBEMSwgMHhGMkJDQzE4RiwgMHg0MTExMzU2NCxcblx0ICAgICAgICAgICAgMHgyNTdCNzgzNCwgMHg2MDJBOUM2MCwgMHhERkY4RThBMywgMHgxRjYzNkMxQixcblx0ICAgICAgICAgICAgMHgwRTEyQjRDMiwgMHgwMkUxMzI5RSwgMHhBRjY2NEZEMSwgMHhDQUQxODExNSxcblx0ICAgICAgICAgICAgMHg2QjIzOTVFMCwgMHgzMzNFOTJFMSwgMHgzQjI0MEI2MiwgMHhFRUJFQjkyMixcblx0ICAgICAgICAgICAgMHg4NUIyQTIwRSwgMHhFNkJBMEQ5OSwgMHhERTcyMEM4QywgMHgyREEyRjcyOCxcblx0ICAgICAgICAgICAgMHhEMDEyNzg0NSwgMHg5NUI3OTRGRCwgMHg2NDdEMDg2MiwgMHhFN0NDRjVGMCxcblx0ICAgICAgICAgICAgMHg1NDQ5QTM2RiwgMHg4NzdENDhGQSwgMHhDMzlERkQyNywgMHhGMzNFOEQxRSxcblx0ICAgICAgICAgICAgMHgwQTQ3NjM0MSwgMHg5OTJFRkY3NCwgMHgzQTZGNkVBQiwgMHhGNEY4RkQzNyxcblx0ICAgICAgICAgICAgMHhBODEyREM2MCwgMHhBMUVCRERGOCwgMHg5OTFCRTE0QywgMHhEQjZFNkIwRCxcblx0ICAgICAgICAgICAgMHhDNjdCNTUxMCwgMHg2RDY3MkMzNywgMHgyNzY1RDQzQiwgMHhEQ0QwRTgwNCxcblx0ICAgICAgICAgICAgMHhGMTI5MERDNywgMHhDQzAwRkZBMywgMHhCNTM5MEY5MiwgMHg2OTBGRUQwQixcblx0ICAgICAgICAgICAgMHg2NjdCOUZGQiwgMHhDRURCN0Q5QywgMHhBMDkxQ0YwQiwgMHhEOTE1NUVBMyxcblx0ICAgICAgICAgICAgMHhCQjEzMkY4OCwgMHg1MTVCQUQyNCwgMHg3Qjk0NzlCRiwgMHg3NjNCRDZFQixcblx0ICAgICAgICAgICAgMHgzNzM5MkVCMywgMHhDQzExNTk3OSwgMHg4MDI2RTI5NywgMHhGNDJFMzEyRCxcblx0ICAgICAgICAgICAgMHg2ODQyQURBNywgMHhDNjZBMkIzQiwgMHgxMjc1NENDQywgMHg3ODJFRjExQyxcblx0ICAgICAgICAgICAgMHg2QTEyNDIzNywgMHhCNzkyNTFFNywgMHgwNkExQkJFNiwgMHg0QkZCNjM1MCxcblx0ICAgICAgICAgICAgMHgxQTZCMTAxOCwgMHgxMUNBRURGQSwgMHgzRDI1QkREOCwgMHhFMkUxQzNDOSxcblx0ICAgICAgICAgICAgMHg0NDQyMTY1OSwgMHgwQTEyMTM4NiwgMHhEOTBDRUM2RSwgMHhENUFCRUEyQSxcblx0ICAgICAgICAgICAgMHg2NEFGNjc0RSwgMHhEQTg2QTg1RiwgMHhCRUJGRTk4OCwgMHg2NEU0QzNGRSxcblx0ICAgICAgICAgICAgMHg5REJDODA1NywgMHhGMEY3QzA4NiwgMHg2MDc4N0JGOCwgMHg2MDAzNjA0RCxcblx0ICAgICAgICAgICAgMHhEMUZEODM0NiwgMHhGNjM4MUZCMCwgMHg3NzQ1QUUwNCwgMHhENzM2RkNDQyxcblx0ICAgICAgICAgICAgMHg4MzQyNkIzMywgMHhGMDFFQUI3MSwgMHhCMDgwNDE4NywgMHgzQzAwNUU1Rixcblx0ICAgICAgICAgICAgMHg3N0EwNTdCRSwgMHhCREU4QUUyNCwgMHg1NTQ2NDI5OSwgMHhCRjU4MkU2MSxcblx0ICAgICAgICAgICAgMHg0RTU4RjQ4RiwgMHhGMkRERkRBMiwgMHhGNDc0RUYzOCwgMHg4Nzg5QkRDMixcblx0ICAgICAgICAgICAgMHg1MzY2RjlDMywgMHhDOEIzOEU3NCwgMHhCNDc1RjI1NSwgMHg0NkZDRDlCOSxcblx0ICAgICAgICAgICAgMHg3QUVCMjY2MSwgMHg4QjFEREY4NCwgMHg4NDZBMEU3OSwgMHg5MTVGOTVFMixcblx0ICAgICAgICAgICAgMHg0NjZFNTk4RSwgMHgyMEI0NTc3MCwgMHg4Q0Q1NTU5MSwgMHhDOTAyREU0Qyxcblx0ICAgICAgICAgICAgMHhCOTBCQUNFMSwgMHhCQjgyMDVEMCwgMHgxMUE4NjI0OCwgMHg3NTc0QTk5RSxcblx0ICAgICAgICAgICAgMHhCNzdGMTlCNiwgMHhFMEE5REMwOSwgMHg2NjJEMDlBMSwgMHhDNDMyNDYzMyxcblx0ICAgICAgICAgICAgMHhFODVBMUYwMiwgMHgwOUYwQkU4QywgMHg0QTk5QTAyNSwgMHgxRDZFRkUxMCxcblx0ICAgICAgICAgICAgMHgxQUI5M0QxRCwgMHgwQkE1QTRERiwgMHhBMTg2RjIwRiwgMHgyODY4RjE2OSxcblx0ICAgICAgICAgICAgMHhEQ0I3REE4MywgMHg1NzM5MDZGRSwgMHhBMUUyQ0U5QiwgMHg0RkNEN0Y1Mixcblx0ICAgICAgICAgICAgMHg1MDExNUUwMSwgMHhBNzA2ODNGQSwgMHhBMDAyQjVDNCwgMHgwREU2RDAyNyxcblx0ICAgICAgICAgICAgMHg5QUY4OEMyNywgMHg3NzNGODY0MSwgMHhDMzYwNEMwNiwgMHg2MUE4MDZCNSxcblx0ICAgICAgICAgICAgMHhGMDE3N0EyOCwgMHhDMEY1ODZFMCwgMHgwMDYwNThBQSwgMHgzMERDN0Q2Mixcblx0ICAgICAgICAgICAgMHgxMUU2OUVENywgMHgyMzM4RUE2MywgMHg1M0MyREQ5NCwgMHhDMkMyMTYzNCxcblx0ICAgICAgICAgICAgMHhCQkNCRUU1NiwgMHg5MEJDQjZERSwgMHhFQkZDN0RBMSwgMHhDRTU5MUQ3Nixcblx0ICAgICAgICAgICAgMHg2RjA1RTQwOSwgMHg0QjdDMDE4OCwgMHgzOTcyMEEzRCwgMHg3QzkyN0MyNCxcblx0ICAgICAgICAgICAgMHg4NkUzNzI1RiwgMHg3MjREOURCOSwgMHgxQUMxNUJCNCwgMHhEMzlFQjhGQyxcblx0ICAgICAgICAgICAgMHhFRDU0NTU3OCwgMHgwOEZDQTVCNSwgMHhEODNEN0NEMywgMHg0REFEMEZDNCxcblx0ICAgICAgICAgICAgMHgxRTUwRUY1RSwgMHhCMTYxRTZGOCwgMHhBMjg1MTREOSwgMHg2QzUxMTMzQyxcblx0ICAgICAgICAgICAgMHg2RkQ1QzdFNywgMHg1NkUxNEVDNCwgMHgzNjJBQkZDRSwgMHhEREM2QzgzNyxcblx0ICAgICAgICAgICAgMHhENzlBMzIzNCwgMHg5MjYzODIxMiwgMHg2NzBFRkE4RSwgMHg0MDYwMDBFMCAgXSxcblx0ICAgICAgICBbICAgMHgzQTM5Q0UzNywgMHhEM0ZBRjVDRiwgMHhBQkMyNzczNywgMHg1QUM1MkQxQixcblx0ICAgICAgICAgICAgMHg1Q0IwNjc5RSwgMHg0RkEzMzc0MiwgMHhEMzgyMjc0MCwgMHg5OUJDOUJCRSxcblx0ICAgICAgICAgICAgMHhENTExOEU5RCwgMHhCRjBGNzMxNSwgMHhENjJEMUM3RSwgMHhDNzAwQzQ3Qixcblx0ICAgICAgICAgICAgMHhCNzhDMUI2QiwgMHgyMUExOTA0NSwgMHhCMjZFQjFCRSwgMHg2QTM2NkVCNCxcblx0ICAgICAgICAgICAgMHg1NzQ4QUIyRiwgMHhCQzk0NkU3OSwgMHhDNkEzNzZEMiwgMHg2NTQ5QzJDOCxcblx0ICAgICAgICAgICAgMHg1MzBGRjhFRSwgMHg0NjhEREU3RCwgMHhENTczMEExRCwgMHg0Q0QwNERDNixcblx0ICAgICAgICAgICAgMHgyOTM5QkJEQiwgMHhBOUJBNDY1MCwgMHhBQzk1MjZFOCwgMHhCRTVFRTMwNCxcblx0ICAgICAgICAgICAgMHhBMUZBRDVGMCwgMHg2QTJENTE5QSwgMHg2M0VGOENFMiwgMHg5QTg2RUUyMixcblx0ICAgICAgICAgICAgMHhDMDg5QzJCOCwgMHg0MzI0MkVGNiwgMHhBNTFFMDNBQSwgMHg5Q0YyRDBBNCxcblx0ICAgICAgICAgICAgMHg4M0MwNjFCQSwgMHg5QkU5NkE0RCwgMHg4RkU1MTU1MCwgMHhCQTY0NUJENixcblx0ICAgICAgICAgICAgMHgyODI2QTJGOSwgMHhBNzNBM0FFMSwgMHg0QkE5OTU4NiwgMHhFRjU1NjJFOSxcblx0ICAgICAgICAgICAgMHhDNzJGRUZEMywgMHhGNzUyRjdEQSwgMHgzRjA0NkY2OSwgMHg3N0ZBMEE1OSxcblx0ICAgICAgICAgICAgMHg4MEU0QTkxNSwgMHg4N0IwODYwMSwgMHg5QjA5RTZBRCwgMHgzQjNFRTU5Myxcblx0ICAgICAgICAgICAgMHhFOTkwRkQ1QSwgMHg5RTM0RDc5NywgMHgyQ0YwQjdEOSwgMHgwMjJCOEI1MSxcblx0ICAgICAgICAgICAgMHg5NkQ1QUMzQSwgMHgwMTdEQTY3RCwgMHhEMUNGM0VENiwgMHg3QzdEMkQyOCxcblx0ICAgICAgICAgICAgMHgxRjlGMjVDRiwgMHhBREYyQjg5QiwgMHg1QUQ2QjQ3MiwgMHg1QTg4RjU0Qyxcblx0ICAgICAgICAgICAgMHhFMDI5QUM3MSwgMHhFMDE5QTVFNiwgMHg0N0IwQUNGRCwgMHhFRDkzRkE5Qixcblx0ICAgICAgICAgICAgMHhFOEQzQzQ4RCwgMHgyODNCNTdDQywgMHhGOEQ1NjYyOSwgMHg3OTEzMkUyOCxcblx0ICAgICAgICAgICAgMHg3ODVGMDE5MSwgMHhFRDc1NjA1NSwgMHhGNzk2MEU0NCwgMHhFM0QzNUU4Qyxcblx0ICAgICAgICAgICAgMHgxNTA1NkRENCwgMHg4OEY0NkRCQSwgMHgwM0ExNjEyNSwgMHgwNTY0RjBCRCxcblx0ICAgICAgICAgICAgMHhDM0VCOUUxNSwgMHgzQzkwNTdBMiwgMHg5NzI3MUFFQywgMHhBOTNBMDcyQSxcblx0ICAgICAgICAgICAgMHgxQjNGNkQ5QiwgMHgxRTYzMjFGNSwgMHhGNTlDNjZGQiwgMHgyNkRDRjMxOSxcblx0ICAgICAgICAgICAgMHg3NTMzRDkyOCwgMHhCMTU1RkRGNSwgMHgwMzU2MzQ4MiwgMHg4QUJBM0NCQixcblx0ICAgICAgICAgICAgMHgyODUxNzcxMSwgMHhDMjBBRDlGOCwgMHhBQkNDNTE2NywgMHhDQ0FEOTI1Rixcblx0ICAgICAgICAgICAgMHg0REU4MTc1MSwgMHgzODMwREM4RSwgMHgzNzlENTg2MiwgMHg5MzIwRjk5MSxcblx0ICAgICAgICAgICAgMHhFQTdBOTBDMiwgMHhGQjNFN0JDRSwgMHg1MTIxQ0U2NCwgMHg3NzRGQkUzMixcblx0ICAgICAgICAgICAgMHhBOEI2RTM3RSwgMHhDMzI5M0Q0NiwgMHg0OERFNTM2OSwgMHg2NDEzRTY4MCxcblx0ICAgICAgICAgICAgMHhBMkFFMDgxMCwgMHhERDZEQjIyNCwgMHg2OTg1MkRGRCwgMHgwOTA3MjE2Nixcblx0ICAgICAgICAgICAgMHhCMzlBNDYwQSwgMHg2NDQ1QzBERCwgMHg1ODZDREVDRiwgMHgxQzIwQzhBRSxcblx0ICAgICAgICAgICAgMHg1QkJFRjdERCwgMHgxQjU4OEQ0MCwgMHhDQ0QyMDE3RiwgMHg2QkI0RTNCQixcblx0ICAgICAgICAgICAgMHhEREEyNkE3RSwgMHgzQTU5RkY0NSwgMHgzRTM1MEE0NCwgMHhCQ0I0Q0RENSxcblx0ICAgICAgICAgICAgMHg3MkVBQ0VBOCwgMHhGQTY0ODRCQiwgMHg4RDY2MTJBRSwgMHhCRjNDNkY0Nyxcblx0ICAgICAgICAgICAgMHhEMjlCRTQ2MywgMHg1NDJGNUQ5RSwgMHhBRUMyNzcxQiwgMHhGNjRFNjM3MCxcblx0ICAgICAgICAgICAgMHg3NDBFMEQ4RCwgMHhFNzVCMTM1NywgMHhGODcyMTY3MSwgMHhBRjUzN0Q1RCxcblx0ICAgICAgICAgICAgMHg0MDQwQ0IwOCwgMHg0RUI0RTJDQywgMHgzNEQyNDY2QSwgMHgwMTE1QUY4NCxcblx0ICAgICAgICAgICAgMHhFMUIwMDQyOCwgMHg5NTk4M0ExRCwgMHgwNkI4OUZCNCwgMHhDRTZFQTA0OCxcblx0ICAgICAgICAgICAgMHg2RjNGM0I4MiwgMHgzNTIwQUI4MiwgMHgwMTFBMUQ0QiwgMHgyNzcyMjdGOCxcblx0ICAgICAgICAgICAgMHg2MTE1NjBCMSwgMHhFNzkzM0ZEQywgMHhCQjNBNzkyQiwgMHgzNDQ1MjVCRCxcblx0ICAgICAgICAgICAgMHhBMDg4MzlFMSwgMHg1MUNFNzk0QiwgMHgyRjMyQzlCNywgMHhBMDFGQkFDOSxcblx0ICAgICAgICAgICAgMHhFMDFDQzg3RSwgMHhCQ0M3RDFGNiwgMHhDRjAxMTFDMywgMHhBMUU4QUFDNyxcblx0ICAgICAgICAgICAgMHgxQTkwODc0OSwgMHhENDRGQkQ5QSwgMHhEMERBREVDQiwgMHhENTBBREEzOCxcblx0ICAgICAgICAgICAgMHgwMzM5QzMyQSwgMHhDNjkxMzY2NywgMHg4REY5MzE3QywgMHhFMEIxMkI0Rixcblx0ICAgICAgICAgICAgMHhGNzlFNTlCNywgMHg0M0Y1QkIzQSwgMHhGMkQ1MTlGRiwgMHgyN0Q5NDU5Qyxcblx0ICAgICAgICAgICAgMHhCRjk3MjIyQywgMHgxNUU2RkMyQSwgMHgwRjkxRkM3MSwgMHg5Qjk0MTUyNSxcblx0ICAgICAgICAgICAgMHhGQUU1OTM2MSwgMHhDRUI2OUNFQiwgMHhDMkE4NjQ1OSwgMHgxMkJBQThEMSxcblx0ICAgICAgICAgICAgMHhCNkMxMDc1RSwgMHhFMzA1NkEwQywgMHgxMEQyNTA2NSwgMHhDQjAzQTQ0Mixcblx0ICAgICAgICAgICAgMHhFMEVDNkUwRSwgMHgxNjk4REIzQiwgMHg0Qzk4QTBCRSwgMHgzMjc4RTk2NCxcblx0ICAgICAgICAgICAgMHg5RjFGOTUzMiwgMHhFMEQzOTJERiwgMHhEM0EwMzQyQiwgMHg4OTcxRjIxRSxcblx0ICAgICAgICAgICAgMHgxQjBBNzQ0MSwgMHg0QkEzMzQ4QywgMHhDNUJFNzEyMCwgMHhDMzc2MzJEOCxcblx0ICAgICAgICAgICAgMHhERjM1OUY4RCwgMHg5Qjk5MkYyRSwgMHhFNjBCNkY0NywgMHgwRkUzRjExRCxcblx0ICAgICAgICAgICAgMHhFNTRDREE1NCwgMHgxRURBRDg5MSwgMHhDRTYyNzlDRiwgMHhDRDNFN0U2Rixcblx0ICAgICAgICAgICAgMHgxNjE4QjE2NiwgMHhGRDJDMUQwNSwgMHg4NDhGRDJDNSwgMHhGNkZCMjI5OSxcblx0ICAgICAgICAgICAgMHhGNTIzRjM1NywgMHhBNjMyNzYyMywgMHg5M0E4MzUzMSwgMHg1NkNDQ0QwMixcblx0ICAgICAgICAgICAgMHhBQ0YwODE2MiwgMHg1QTc1RUJCNSwgMHg2RTE2MzY5NywgMHg4OEQyNzNDQyxcblx0ICAgICAgICAgICAgMHhERTk2NjI5MiwgMHg4MUI5NDlEMCwgMHg0QzUwOTAxQiwgMHg3MUM2NTYxNCxcblx0ICAgICAgICAgICAgMHhFNkM2QzdCRCwgMHgzMjdBMTQwQSwgMHg0NUUxRDAwNiwgMHhDM0YyN0I5QSxcblx0ICAgICAgICAgICAgMHhDOUFBNTNGRCwgMHg2MkE4MEYwMCwgMHhCQjI1QkZFMiwgMHgzNUJERDJGNixcblx0ICAgICAgICAgICAgMHg3MTEyNjkwNSwgMHhCMjA0MDIyMiwgMHhCNkNCQ0Y3QywgMHhDRDc2OUMyQixcblx0ICAgICAgICAgICAgMHg1MzExM0VDMCwgMHgxNjQwRTNEMywgMHgzOEFCQkQ2MCwgMHgyNTQ3QURGMCxcblx0ICAgICAgICAgICAgMHhCQTM4MjA5QywgMHhGNzQ2Q0U3NiwgMHg3N0FGQTFDNSwgMHgyMDc1NjA2MCxcblx0ICAgICAgICAgICAgMHg4NUNCRkU0RSwgMHg4QUU4OEREOCwgMHg3QUFBRjlCMCwgMHg0Q0Y5QUE3RSxcblx0ICAgICAgICAgICAgMHgxOTQ4QzI1QywgMHgwMkZCOEE4QywgMHgwMUMzNkFFNCwgMHhENkVCRTFGOSxcblx0ICAgICAgICAgICAgMHg5MEQ0Rjg2OSwgMHhBNjVDREVBMCwgMHgzRjA5MjUyRCwgMHhDMjA4RTY5Rixcblx0ICAgICAgICAgICAgMHhCNzRFNjEzMiwgMHhDRTc3RTI1QiwgMHg1NzhGREZFMywgMHgzQUMzNzJFNiAgXVxuXHQgICAgXTtcblxuXHQgICAgdmFyIEJMT1dGSVNIX0NUWCA9IHtcblx0ICAgICAgICBwYm94OiBbXSxcblx0ICAgICAgICBzYm94OiBbXVxuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBGKGN0eCwgeCl7XG5cdCAgICAgICAgbGV0IGEgPSAoeCA+PiAyNCkgJiAweEZGO1xuXHQgICAgICAgIGxldCBiID0gKHggPj4gMTYpICYgMHhGRjtcblx0ICAgICAgICBsZXQgYyA9ICh4ID4+IDgpICYgMHhGRjtcblx0ICAgICAgICBsZXQgZCA9IHggJiAweEZGO1xuXG5cdCAgICAgICAgbGV0IHkgPSBjdHguc2JveFswXVthXSArIGN0eC5zYm94WzFdW2JdO1xuXHQgICAgICAgIHkgPSB5IF4gY3R4LnNib3hbMl1bY107XG5cdCAgICAgICAgeSA9IHkgKyBjdHguc2JveFszXVtkXTtcblxuXHQgICAgICAgIHJldHVybiB5O1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBCbG93RmlzaF9FbmNyeXB0KGN0eCwgbGVmdCwgcmlnaHQpe1xuXHQgICAgICAgIGxldCBYbCA9IGxlZnQ7XG5cdCAgICAgICAgbGV0IFhyID0gcmlnaHQ7XG5cdCAgICAgICAgbGV0IHRlbXA7XG5cblx0ICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgTjsgKytpKXtcblx0ICAgICAgICAgICAgWGwgPSBYbCBeIGN0eC5wYm94W2ldO1xuXHQgICAgICAgICAgICBYciA9IEYoY3R4LCBYbCkgXiBYcjtcblxuXHQgICAgICAgICAgICB0ZW1wID0gWGw7XG5cdCAgICAgICAgICAgIFhsID0gWHI7XG5cdCAgICAgICAgICAgIFhyID0gdGVtcDtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB0ZW1wID0gWGw7XG5cdCAgICAgICAgWGwgPSBYcjtcblx0ICAgICAgICBYciA9IHRlbXA7XG5cblx0ICAgICAgICBYciA9IFhyIF4gY3R4LnBib3hbTl07XG5cdCAgICAgICAgWGwgPSBYbCBeIGN0eC5wYm94W04gKyAxXTtcblxuXHQgICAgICAgIHJldHVybiB7bGVmdDogWGwsIHJpZ2h0OiBYcn07XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIEJsb3dGaXNoX0RlY3J5cHQoY3R4LCBsZWZ0LCByaWdodCl7XG5cdCAgICAgICAgbGV0IFhsID0gbGVmdDtcblx0ICAgICAgICBsZXQgWHIgPSByaWdodDtcblx0ICAgICAgICBsZXQgdGVtcDtcblxuXHQgICAgICAgIGZvcihsZXQgaSA9IE4gKyAxOyBpID4gMTsgLS1pKXtcblx0ICAgICAgICAgICAgWGwgPSBYbCBeIGN0eC5wYm94W2ldO1xuXHQgICAgICAgICAgICBYciA9IEYoY3R4LCBYbCkgXiBYcjtcblxuXHQgICAgICAgICAgICB0ZW1wID0gWGw7XG5cdCAgICAgICAgICAgIFhsID0gWHI7XG5cdCAgICAgICAgICAgIFhyID0gdGVtcDtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB0ZW1wID0gWGw7XG5cdCAgICAgICAgWGwgPSBYcjtcblx0ICAgICAgICBYciA9IHRlbXA7XG5cblx0ICAgICAgICBYciA9IFhyIF4gY3R4LnBib3hbMV07XG5cdCAgICAgICAgWGwgPSBYbCBeIGN0eC5wYm94WzBdO1xuXG5cdCAgICAgICAgcmV0dXJuIHtsZWZ0OiBYbCwgcmlnaHQ6IFhyfTtcblx0ICAgIH1cblxuXHQgICAgLyoqXG5cdCAgICAgKiBJbml0aWFsaXphdGlvbiBjdHgncyBwYm94IGFuZCBzYm94LlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjdHggVGhlIG9iamVjdCBoYXMgcGJveCBhbmQgc2JveC5cblx0ICAgICAqIEBwYXJhbSB7QXJyYXl9IGtleSBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgKiBAcGFyYW0ge2ludH0ga2V5c2l6ZSBUaGUgbGVuZ3RoIG9mIHRoZSBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgQmxvd0Zpc2hJbml0KEJMT1dGSVNIX0NUWCwga2V5LCAxMjgvMzIpO1xuXHQgICAgICovXG5cdCAgICBmdW5jdGlvbiBCbG93RmlzaEluaXQoY3R4LCBrZXksIGtleXNpemUpXG5cdCAgICB7XG5cdCAgICAgICAgZm9yKGxldCBSb3cgPSAwOyBSb3cgPCA0OyBSb3crKylcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIGN0eC5zYm94W1Jvd10gPSBbXTtcblx0ICAgICAgICAgICAgZm9yKGxldCBDb2wgPSAwOyBDb2wgPCAyNTY7IENvbCsrKVxuXHQgICAgICAgICAgICB7XG5cdCAgICAgICAgICAgICAgICBjdHguc2JveFtSb3ddW0NvbF0gPSBPUklHX1NbUm93XVtDb2xdO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgbGV0IGtleUluZGV4ID0gMDtcblx0ICAgICAgICBmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCBOICsgMjsgaW5kZXgrKylcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIGN0eC5wYm94W2luZGV4XSA9IE9SSUdfUFtpbmRleF0gXiBrZXlba2V5SW5kZXhdO1xuXHQgICAgICAgICAgICBrZXlJbmRleCsrO1xuXHQgICAgICAgICAgICBpZihrZXlJbmRleCA+PSBrZXlzaXplKVxuXHQgICAgICAgICAgICB7XG5cdCAgICAgICAgICAgICAgICBrZXlJbmRleCA9IDA7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICBsZXQgRGF0YTEgPSAwO1xuXHQgICAgICAgIGxldCBEYXRhMiA9IDA7XG5cdCAgICAgICAgbGV0IHJlcyA9IDA7XG5cdCAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IE4gKyAyOyBpICs9IDIpXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICByZXMgPSBCbG93RmlzaF9FbmNyeXB0KGN0eCwgRGF0YTEsIERhdGEyKTtcblx0ICAgICAgICAgICAgRGF0YTEgPSByZXMubGVmdDtcblx0ICAgICAgICAgICAgRGF0YTIgPSByZXMucmlnaHQ7XG5cdCAgICAgICAgICAgIGN0eC5wYm94W2ldID0gRGF0YTE7XG5cdCAgICAgICAgICAgIGN0eC5wYm94W2kgKyAxXSA9IERhdGEyO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA0OyBpKyspXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgMjU2OyBqICs9IDIpXG5cdCAgICAgICAgICAgIHtcblx0ICAgICAgICAgICAgICAgIHJlcyA9IEJsb3dGaXNoX0VuY3J5cHQoY3R4LCBEYXRhMSwgRGF0YTIpO1xuXHQgICAgICAgICAgICAgICAgRGF0YTEgPSByZXMubGVmdDtcblx0ICAgICAgICAgICAgICAgIERhdGEyID0gcmVzLnJpZ2h0O1xuXHQgICAgICAgICAgICAgICAgY3R4LnNib3hbaV1bal0gPSBEYXRhMTtcblx0ICAgICAgICAgICAgICAgIGN0eC5zYm94W2ldW2ogKyAxXSA9IERhdGEyO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICB9XG5cblx0ICAgIC8qKlxuXHQgICAgICogQmxvd2Zpc2ggYmxvY2sgY2lwaGVyIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEJsb3dmaXNoID0gQ19hbGdvLkJsb3dmaXNoID0gQmxvY2tDaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTa2lwIHJlc2V0IG9mIG5Sb3VuZHMgaGFzIGJlZW4gc2V0IGJlZm9yZSBhbmQga2V5IGRpZCBub3QgY2hhbmdlXG5cdCAgICAgICAgICAgIGlmICh0aGlzLl9rZXlQcmlvclJlc2V0ID09PSB0aGlzLl9rZXkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybjtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIga2V5ID0gdGhpcy5fa2V5UHJpb3JSZXNldCA9IHRoaXMuX2tleTtcblx0ICAgICAgICAgICAgdmFyIGtleVdvcmRzID0ga2V5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIga2V5U2l6ZSA9IGtleS5zaWdCeXRlcyAvIDQ7XG5cblx0ICAgICAgICAgICAgLy9Jbml0aWFsaXphdGlvbiBwYm94IGFuZCBzYm94XG5cdCAgICAgICAgICAgIEJsb3dGaXNoSW5pdChCTE9XRklTSF9DVFgsIGtleVdvcmRzLCBrZXlTaXplKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgZW5jcnlwdEJsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIHZhciByZXMgPSBCbG93RmlzaF9FbmNyeXB0KEJMT1dGSVNIX0NUWCwgTVtvZmZzZXRdLCBNW29mZnNldCArIDFdKTtcblx0ICAgICAgICAgICAgTVtvZmZzZXRdID0gcmVzLmxlZnQ7XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0ICsgMV0gPSByZXMucmlnaHQ7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGRlY3J5cHRCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICB2YXIgcmVzID0gQmxvd0Zpc2hfRGVjcnlwdChCTE9XRklTSF9DVFgsIE1bb2Zmc2V0XSwgTVtvZmZzZXQgKyAxXSk7XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0XSA9IHJlcy5sZWZ0O1xuXHQgICAgICAgICAgICBNW29mZnNldCArIDFdID0gcmVzLnJpZ2h0O1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDY0LzMyLFxuXG5cdCAgICAgICAga2V5U2l6ZTogMTI4LzMyLFxuXG5cdCAgICAgICAgaXZTaXplOiA2NC8zMlxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb25zIHRvIHRoZSBjaXBoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0ID0gQ3J5cHRvSlMuQmxvd2Zpc2guZW5jcnlwdChtZXNzYWdlLCBrZXksIGNmZyk7XG5cdCAgICAgKiAgICAgdmFyIHBsYWludGV4dCAgPSBDcnlwdG9KUy5CbG93ZmlzaC5kZWNyeXB0KGNpcGhlcnRleHQsIGtleSwgY2ZnKTtcblx0ICAgICAqL1xuXHQgICAgQy5CbG93ZmlzaCA9IEJsb2NrQ2lwaGVyLl9jcmVhdGVIZWxwZXIoQmxvd2Zpc2gpO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLkJsb3dmaXNoO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL3g2NC1jb3JlXCIpLCByZXF1aXJlKFwiLi9saWItdHlwZWRhcnJheXNcIiksIHJlcXVpcmUoXCIuL2VuYy11dGYxNlwiKSwgcmVxdWlyZShcIi4vZW5jLWJhc2U2NFwiKSwgcmVxdWlyZShcIi4vZW5jLWJhc2U2NHVybFwiKSwgcmVxdWlyZShcIi4vbWQ1XCIpLCByZXF1aXJlKFwiLi9zaGExXCIpLCByZXF1aXJlKFwiLi9zaGEyNTZcIiksIHJlcXVpcmUoXCIuL3NoYTIyNFwiKSwgcmVxdWlyZShcIi4vc2hhNTEyXCIpLCByZXF1aXJlKFwiLi9zaGEzODRcIiksIHJlcXVpcmUoXCIuL3NoYTNcIiksIHJlcXVpcmUoXCIuL3JpcGVtZDE2MFwiKSwgcmVxdWlyZShcIi4vaG1hY1wiKSwgcmVxdWlyZShcIi4vcGJrZGYyXCIpLCByZXF1aXJlKFwiLi9ldnBrZGZcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpLCByZXF1aXJlKFwiLi9tb2RlLWNmYlwiKSwgcmVxdWlyZShcIi4vbW9kZS1jdHJcIiksIHJlcXVpcmUoXCIuL21vZGUtY3RyLWdsYWRtYW5cIiksIHJlcXVpcmUoXCIuL21vZGUtb2ZiXCIpLCByZXF1aXJlKFwiLi9tb2RlLWVjYlwiKSwgcmVxdWlyZShcIi4vcGFkLWFuc2l4OTIzXCIpLCByZXF1aXJlKFwiLi9wYWQtaXNvMTAxMjZcIiksIHJlcXVpcmUoXCIuL3BhZC1pc285Nzk3MVwiKSwgcmVxdWlyZShcIi4vcGFkLXplcm9wYWRkaW5nXCIpLCByZXF1aXJlKFwiLi9wYWQtbm9wYWRkaW5nXCIpLCByZXF1aXJlKFwiLi9mb3JtYXQtaGV4XCIpLCByZXF1aXJlKFwiLi9hZXNcIiksIHJlcXVpcmUoXCIuL3RyaXBsZWRlc1wiKSwgcmVxdWlyZShcIi4vcmM0XCIpLCByZXF1aXJlKFwiLi9yYWJiaXRcIiksIHJlcXVpcmUoXCIuL3JhYmJpdC1sZWdhY3lcIiksIHJlcXVpcmUoXCIuL2Jsb3dmaXNoXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL3g2NC1jb3JlXCIsIFwiLi9saWItdHlwZWRhcnJheXNcIiwgXCIuL2VuYy11dGYxNlwiLCBcIi4vZW5jLWJhc2U2NFwiLCBcIi4vZW5jLWJhc2U2NHVybFwiLCBcIi4vbWQ1XCIsIFwiLi9zaGExXCIsIFwiLi9zaGEyNTZcIiwgXCIuL3NoYTIyNFwiLCBcIi4vc2hhNTEyXCIsIFwiLi9zaGEzODRcIiwgXCIuL3NoYTNcIiwgXCIuL3JpcGVtZDE2MFwiLCBcIi4vaG1hY1wiLCBcIi4vcGJrZGYyXCIsIFwiLi9ldnBrZGZcIiwgXCIuL2NpcGhlci1jb3JlXCIsIFwiLi9tb2RlLWNmYlwiLCBcIi4vbW9kZS1jdHJcIiwgXCIuL21vZGUtY3RyLWdsYWRtYW5cIiwgXCIuL21vZGUtb2ZiXCIsIFwiLi9tb2RlLWVjYlwiLCBcIi4vcGFkLWFuc2l4OTIzXCIsIFwiLi9wYWQtaXNvMTAxMjZcIiwgXCIuL3BhZC1pc285Nzk3MVwiLCBcIi4vcGFkLXplcm9wYWRkaW5nXCIsIFwiLi9wYWQtbm9wYWRkaW5nXCIsIFwiLi9mb3JtYXQtaGV4XCIsIFwiLi9hZXNcIiwgXCIuL3RyaXBsZWRlc1wiLCBcIi4vcmM0XCIsIFwiLi9yYWJiaXRcIiwgXCIuL3JhYmJpdC1sZWdhY3lcIiwgXCIuL2Jsb3dmaXNoXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0cm9vdC5DcnlwdG9KUyA9IGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0cmV0dXJuIENyeXB0b0pTO1xuXG59KSk7IiwiLy8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcbi8vIENpdGl6ZW5PbmUg4oCTIEFFUy0yNTYgRW5jcnlwdGVkIExvY2FsIFZhdWx0XHJcbi8vIFVzZXMgQ3J5cHRvSlMgZm9yIGVuY3J5cHRpb24gc28gdGhlcmUncyBubyBXZWIgQ3J5cHRvIEFQSSBkZXBlbmRlbmN5IGlzc3Vlc1xyXG4vLyBpbiB0aGUgZXh0ZW5zaW9uIGNvbnRleHQuXHJcbi8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG5cclxuaW1wb3J0IENyeXB0b0pTIGZyb20gJ2NyeXB0by1qcyc7XHJcbmltcG9ydCB0eXBlIHsgVmF1bHQsIFZhdWx0RmllbGQgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG5jb25zdCBWQVVMVF9TVE9SQUdFX0tFWSA9ICdjaXRpemVuX29uZV92YXVsdF9lbmNyeXB0ZWQnO1xyXG5jb25zdCBWQVVMVF9TQUxUX0tFWSA9ICdjaXRpemVuX29uZV92YXVsdF9zYWx0JztcclxuY29uc3QgVkFVTFRfQ0hFQ0tfS0VZID0gJ2NpdGl6ZW5fb25lX3ZhdWx0X2NoZWNrJztcclxuY29uc3QgQ0hFQ0tfUExBSU5URVhUID0gJ0NJVElaRU5fT05FX1ZBVUxUX09LJztcclxuXHJcbi8vIOKUgOKUgOKUgCBLZXkgRGVyaXZhdGlvbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuXHJcbmZ1bmN0aW9uIGRlcml2ZUtleShwYXNzd29yZDogc3RyaW5nLCBzYWx0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qga2V5ID0gQ3J5cHRvSlMuUEJLREYyKHBhc3N3b3JkLCBzYWx0LCB7XHJcbiAgICAgICAga2V5U2l6ZTogMjU2IC8gMzIsXHJcbiAgICAgICAgaXRlcmF0aW9uczogMTAwXzAwMCxcclxuICAgICAgICBoYXNoZXI6IENyeXB0b0pTLmFsZ28uU0hBMjU2LFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ga2V5LnRvU3RyaW5nKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlU2FsdCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkucmFuZG9tKDEyOCAvIDgpLnRvU3RyaW5nKCk7XHJcbn1cclxuXHJcbi8vIOKUgOKUgOKUgCBFbmNyeXB0IC8gRGVjcnlwdCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuXHJcbmZ1bmN0aW9uIGVuY3J5cHQocGxhaW50ZXh0OiBzdHJpbmcsIGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBDcnlwdG9KUy5BRVMuZW5jcnlwdChwbGFpbnRleHQsIGtleSkudG9TdHJpbmcoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVjcnlwdChjaXBoZXJ0ZXh0OiBzdHJpbmcsIGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGJ5dGVzID0gQ3J5cHRvSlMuQUVTLmRlY3J5cHQoY2lwaGVydGV4dCwga2V5KTtcclxuICAgIHJldHVybiBieXRlcy50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XHJcbn1cclxuXHJcbi8vIOKUgOKUgOKUgCBDaHJvbWUgU3RvcmFnZSBIZWxwZXJzIChwcm9taXNlLXdyYXBwZWQpIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG5cclxuYXN5bmMgZnVuY3Rpb24gc3RvcmFnZUdldDxUPihrZXlzOiBzdHJpbmdbXSk6IFByb21pc2U8UmVjb3JkPHN0cmluZywgVD4+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KGtleXMsIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQgYXMgUmVjb3JkPHN0cmluZywgVD4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gc3RvcmFnZVNldChpdGVtczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KGl0ZW1zLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIOKUgOKUgOKUgCBWYXVsdCBBUEkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIGEgdmF1bHQgaGFzIGJlZW4gY3JlYXRlZCAoc2FsdCBleGlzdHMgaW4gc3RvcmFnZSkuXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdmF1bHRFeGlzdHMoKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzdG9yYWdlR2V0PHN0cmluZz4oW1ZBVUxUX1NBTFRfS0VZXSk7XHJcbiAgICByZXR1cm4gISFyZXN1bHRbVkFVTFRfU0FMVF9LRVldO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIGJyYW5kLW5ldyB2YXVsdCBwcm90ZWN0ZWQgYnkgYG1hc3RlclBhc3N3b3JkYC5cclxuICogT3ZlcndyaXRlcyBhbnkgZXhpc3RpbmcgdmF1bHQuXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVmF1bHQoXHJcbiAgICBtYXN0ZXJQYXNzd29yZDogc3RyaW5nLFxyXG4gICAgaW5pdGlhbEZpZWxkczogVmF1bHRGaWVsZFtdID0gW10sXHJcbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3Qgc2FsdCA9IGdlbmVyYXRlU2FsdCgpO1xyXG4gICAgY29uc3Qga2V5ID0gZGVyaXZlS2V5KG1hc3RlclBhc3N3b3JkLCBzYWx0KTtcclxuXHJcbiAgICBjb25zdCBlbXB0eVZhdWx0OiBWYXVsdCA9IHsgZmllbGRzOiBpbml0aWFsRmllbGRzLCB1cGRhdGVkQXQ6IERhdGUubm93KCkgfTtcclxuICAgIGNvbnN0IGVuY3J5cHRlZFZhdWx0ID0gZW5jcnlwdChKU09OLnN0cmluZ2lmeShlbXB0eVZhdWx0KSwga2V5KTtcclxuICAgIGNvbnN0IGVuY3J5cHRlZENoZWNrID0gZW5jcnlwdChDSEVDS19QTEFJTlRFWFQsIGtleSk7XHJcblxyXG4gICAgYXdhaXQgc3RvcmFnZVNldCh7XHJcbiAgICAgICAgW1ZBVUxUX1NBTFRfS0VZXTogc2FsdCxcclxuICAgICAgICBbVkFVTFRfU1RPUkFHRV9LRVldOiBlbmNyeXB0ZWRWYXVsdCxcclxuICAgICAgICBbVkFVTFRfQ0hFQ0tfS0VZXTogZW5jcnlwdGVkQ2hlY2ssXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVubG9ja3MgdGhlIHZhdWx0IGFuZCByZXR1cm5zIHRoZSBkZWNyeXB0ZWQgVmF1bHQgb2JqZWN0LlxyXG4gKiBUaHJvd3MgaWYgdGhlIHBhc3N3b3JkIGlzIHdyb25nLlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVubG9ja1ZhdWx0KG1hc3RlclBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPFZhdWx0PiB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzdG9yYWdlR2V0PHN0cmluZz4oW1xyXG4gICAgICAgIFZBVUxUX1NBTFRfS0VZLFxyXG4gICAgICAgIFZBVUxUX1NUT1JBR0VfS0VZLFxyXG4gICAgICAgIFZBVUxUX0NIRUNLX0tFWSxcclxuICAgIF0pO1xyXG5cclxuICAgIGNvbnN0IHNhbHQgPSByZXN1bHRbVkFVTFRfU0FMVF9LRVldO1xyXG4gICAgY29uc3QgZW5jcnlwdGVkVmF1bHQgPSByZXN1bHRbVkFVTFRfU1RPUkFHRV9LRVldO1xyXG4gICAgY29uc3QgZW5jcnlwdGVkQ2hlY2sgPSByZXN1bHRbVkFVTFRfQ0hFQ0tfS0VZXTtcclxuXHJcbiAgICBpZiAoIXNhbHQgfHwgIWVuY3J5cHRlZFZhdWx0IHx8ICFlbmNyeXB0ZWRDaGVjaykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gdmF1bHQgZm91bmQuIFBsZWFzZSBjcmVhdGUgb25lIGZpcnN0LicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGtleSA9IGRlcml2ZUtleShtYXN0ZXJQYXNzd29yZCwgc2FsdCk7XHJcblxyXG4gICAgLy8gVmVyaWZ5IHBhc3N3b3JkIGJlZm9yZSBkZWNyeXB0aW5nIHZhdWx0XHJcbiAgICBsZXQgY2hlY2tQbGFpbjogc3RyaW5nO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjaGVja1BsYWluID0gZGVjcnlwdChlbmNyeXB0ZWRDaGVjaywga2V5KTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IG1hc3RlciBwYXNzd29yZC4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hlY2tQbGFpbiAhPT0gQ0hFQ0tfUExBSU5URVhUKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgbWFzdGVyIHBhc3N3b3JkLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZhdWx0SnNvbiA9IGRlY3J5cHQoZW5jcnlwdGVkVmF1bHQsIGtleSk7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh2YXVsdEpzb24pIGFzIFZhdWx0O1xyXG59XHJcblxyXG4vKipcclxuICogU2F2ZXMgdGhlIHVwZGF0ZWQgdmF1bHQgYmFjayB0byBzdG9yYWdlIChyZXF1aXJlcyByZS1lbmNyeXB0aW5nKS5cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlVmF1bHQoXHJcbiAgICBtYXN0ZXJQYXNzd29yZDogc3RyaW5nLFxyXG4gICAgdmF1bHQ6IFZhdWx0LFxyXG4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHN0b3JhZ2VHZXQ8c3RyaW5nPihbVkFVTFRfU0FMVF9LRVldKTtcclxuICAgIGNvbnN0IHNhbHQgPSByZXN1bHRbVkFVTFRfU0FMVF9LRVldO1xyXG5cclxuICAgIGlmICghc2FsdCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gdmF1bHQgZm91bmQuIENyZWF0ZSBvbmUgZmlyc3QuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qga2V5ID0gZGVyaXZlS2V5KG1hc3RlclBhc3N3b3JkLCBzYWx0KTtcclxuICAgIHZhdWx0LnVwZGF0ZWRBdCA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCBlbmNyeXB0ZWRWYXVsdCA9IGVuY3J5cHQoSlNPTi5zdHJpbmdpZnkodmF1bHQpLCBrZXkpO1xyXG5cclxuICAgIGF3YWl0IHN0b3JhZ2VTZXQoeyBbVkFVTFRfU1RPUkFHRV9LRVldOiBlbmNyeXB0ZWRWYXVsdCB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoYW5nZXMgdGhlIG1hc3RlciBwYXNzd29yZCBieSByZS1lbmNyeXB0aW5nIHRoZSB2YXVsdCB3aXRoIGEgbmV3IGtleS5cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGFuZ2VNYXN0ZXJQYXNzd29yZChcclxuICAgIG9sZFBhc3N3b3JkOiBzdHJpbmcsXHJcbiAgICBuZXdQYXNzd29yZDogc3RyaW5nLFxyXG4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IHZhdWx0ID0gYXdhaXQgdW5sb2NrVmF1bHQob2xkUGFzc3dvcmQpO1xyXG4gICAgYXdhaXQgY3JlYXRlVmF1bHQobmV3UGFzc3dvcmQsIHZhdWx0LmZpZWxkcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBXaXBlcyB0aGUgdmF1bHQgZW50aXJlbHkgZnJvbSBzdG9yYWdlLlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlc3Ryb3lWYXVsdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKFxyXG4gICAgICAgICAgICBbVkFVTFRfU0FMVF9LRVksIFZBVUxUX1NUT1JBR0VfS0VZLCBWQVVMVF9DSEVDS19LRVldLFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBvbmx5IHZhdWx0IGZpZWxkIGtleXMgKGxhYmVscykg4oCUIHNhZmUgdG8gc2VuZCB0byBMTE0uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmF1bHRLZXlzKHZhdWx0OiBWYXVsdCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiB2YXVsdC5maWVsZHMubWFwKChmKSA9PiBmLmtleSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZXMgdGhlIHZhbHVlIGZvciBhIGdpdmVuIGtleSBmcm9tIHRoZSB2YXVsdCAoaW4tbWVtb3J5IG9ubHkpLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhdWx0VmFsdWUodmF1bHQ6IFZhdWx0LCBrZXk6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdmF1bHQuZmllbGRzLmZpbmQoKGYpID0+IGYua2V5ID09PSBrZXkpPy52YWx1ZTtcclxufVxyXG4iLCIvLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuLy8gQ2l0aXplbk9uZSDigJMgRE9NIFNlbWFudGljIE1hcCBFeHRyYWN0b3IgKyBGb3JtIEZpbGxlciAoQ29udGVudCBTY3JpcHQpXHJcbi8vIFJ1bnMgaW5zaWRlIHRoZSBwYWdlIGNvbnRleHQuIENvbW11bmljYXRlcyB3aXRoIHRoZSBiYWNrZ3JvdW5kIHZpYSBtZXNzYWdlcy5cclxuLy8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcblxyXG5pbXBvcnQgdHlwZSB7IEZpZWxkTWFwcGluZywgRmlsbFJlc3VsdCwgU2VtYW50aWNGaWVsZCwgU2VtYW50aWNNYXAsIFZhdWx0IH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBnZXRWYXVsdFZhbHVlIH0gZnJvbSAnLi4vbGliL3ZhdWx0JztcclxuXHJcbmNvbnN0IE1BWF9UT0tFTlNfQllURVMgPSAyMDQ4O1xyXG5jb25zdCBGSUxMX0hJR0hMSUdIVF9DT0xPUiA9ICcjM2I4MmY2MjAnO1xyXG5jb25zdCBGSUxMX0JPUkRFUl9DT0xPUiA9ICcjM2I4MmY2JztcclxuY29uc3QgU1VDQ0VTU19DT0xPUiA9ICcjMTBiOTgxMjAnO1xyXG5jb25zdCBTVUNDRVNTX0JPUkRFUiA9ICcjMTBiOTgxJztcclxuY29uc3QgRVJST1JfQ09MT1IgPSAnI2VmNDQ0NDIwJztcclxuY29uc3QgRVJST1JfQk9SREVSID0gJyNlZjQ0NDQnO1xyXG5cclxuLy8g4pSA4pSA4pSAIExhYmVsIFJlc29sdXRpb24g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcblxyXG5mdW5jdGlvbiByZXNvbHZlTGFiZWwoZWw6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcclxuICAgIC8vIDEuIGFyaWEtbGFiZWxcclxuICAgIGNvbnN0IGFyaWFMYWJlbCA9IGVsLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpO1xyXG4gICAgaWYgKGFyaWFMYWJlbCkgcmV0dXJuIGFyaWFMYWJlbC50cmltKCk7XHJcblxyXG4gICAgLy8gMi4gYXJpYS1sYWJlbGxlZGJ5XHJcbiAgICBjb25zdCBsYWJlbGxlZEJ5ID0gZWwuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkYnknKTtcclxuICAgIGlmIChsYWJlbGxlZEJ5KSB7XHJcbiAgICAgICAgY29uc3QgbGFiZWxFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxhYmVsbGVkQnkpO1xyXG4gICAgICAgIGlmIChsYWJlbEVsKSByZXR1cm4gKGxhYmVsRWwudGV4dENvbnRlbnQgPz8gJycpLnRyaW0oKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAzLiA8bGFiZWwgZm9yPVwiaWRcIj5cclxuICAgIGNvbnN0IGlkID0gZWwuaWQ7XHJcbiAgICBpZiAoaWQpIHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTExhYmVsRWxlbWVudD4oYGxhYmVsW2Zvcj1cIiR7Q1NTLmVzY2FwZShpZCl9XCJdYCk7XHJcbiAgICAgICAgaWYgKGxhYmVsKSByZXR1cm4gKGxhYmVsLnRleHRDb250ZW50ID8/ICcnKS50cmltKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gNC4gV3JhcHBpbmcgPGxhYmVsPlxyXG4gICAgY29uc3Qgd3JhcHBpbmdMYWJlbCA9IGVsLmNsb3Nlc3QoJ2xhYmVsJyk7XHJcbiAgICBpZiAod3JhcHBpbmdMYWJlbCkge1xyXG4gICAgICAgIC8vIEdldCB0ZXh0IHdpdGhvdXQgdGhlIGlucHV0J3Mgb3duIHRleHRcclxuICAgICAgICBjb25zdCBjbG9uZSA9IHdyYXBwaW5nTGFiZWwuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNsb25lLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LHNlbGVjdCx0ZXh0YXJlYScpLmZvckVhY2goKGUpID0+IGUucmVtb3ZlKCkpO1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSAoY2xvbmUudGV4dENvbnRlbnQgPz8gJycpLnRyaW0oKTtcclxuICAgICAgICBpZiAodGV4dCkgcmV0dXJuIHRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gNS4gUGxhY2Vob2xkZXIgYXMgZmFsbGJhY2tcclxuICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gKGVsIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnBsYWNlaG9sZGVyO1xyXG4gICAgaWYgKHBsYWNlaG9sZGVyKSByZXR1cm4gcGxhY2Vob2xkZXIudHJpbSgpO1xyXG5cclxuICAgIC8vIDYuIE5hbWUgYXR0cmlidXRlXHJcbiAgICBjb25zdCBuYW1lID0gZWwuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICBpZiAobmFtZSkgcmV0dXJuIG5hbWUucmVwbGFjZSgvW18tXS9nLCAnICcpLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gJyc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENvbnRleHQoZWw6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcclxuICAgIC8vIEdyYWIgc3Vycm91bmRpbmcgdGV4dCBmb3IgY29udGV4dFxyXG4gICAgY29uc3QgcGFyZW50ID0gZWwuY2xvc2VzdCgnZGl2LCBzZWN0aW9uLCBmaWVsZHNldCwgZm9ybScpID8/IGVsLnBhcmVudEVsZW1lbnQ7XHJcbiAgICBpZiAoIXBhcmVudCkgcmV0dXJuICcnO1xyXG4gICAgY29uc3QgdGV4dCA9IChwYXJlbnQudGV4dENvbnRlbnQgPz8gJycpLnJlcGxhY2UoL1xccysvZywgJyAnKS50cmltKCk7XHJcbiAgICByZXR1cm4gdGV4dC5zbGljZSgwLCAxMDApO1xyXG59XHJcblxyXG4vLyDilIDilIDilIAgU2VtYW50aWMgTWFwIEJ1aWxkZXIg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VtYW50aWNNYXAoKTogU2VtYW50aWNNYXAge1xyXG4gICAgY29uc3QgSU5URVJBQ1RJVkVfU0VMRUNUT1IgPVxyXG4gICAgICAgICdpbnB1dDpub3QoW3R5cGU9XCJoaWRkZW5cIl0pOm5vdChbdHlwZT1cInN1Ym1pdFwiXSk6bm90KFt0eXBlPVwiYnV0dG9uXCJdKTpub3QoW3R5cGU9XCJyZXNldFwiXSk6bm90KFt0eXBlPVwiaW1hZ2VcIl0pLCBzZWxlY3QsIHRleHRhcmVhJztcclxuXHJcbiAgICBjb25zdCBlbGVtZW50cyA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oSU5URVJBQ1RJVkVfU0VMRUNUT1IpLFxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBmaWVsZHM6IFNlbWFudGljRmllbGRbXSA9IFtdO1xyXG4gICAgbGV0IGJ5dGVzVXNlZCA9IDA7XHJcblxyXG4gICAgZm9yIChjb25zdCBlbCBvZiBlbGVtZW50cykge1xyXG4gICAgICAgIGlmICghZWwub2Zmc2V0UGFyZW50ICYmIGVsLmdldEF0dHJpYnV0ZSgndHlwZScpICE9PSAnaGlkZGVuJykgY29udGludWU7IC8vIHNraXAgaW52aXNpYmxlXHJcbiAgICAgICAgaWYgKGJ5dGVzVXNlZCA+PSBNQVhfVE9LRU5TX0JZVEVTKSBicmVhaztcclxuXHJcbiAgICAgICAgY29uc3QgaWQgPVxyXG4gICAgICAgICAgICBlbC5pZCB8fFxyXG4gICAgICAgICAgICBlbC5nZXRBdHRyaWJ1dGUoJ25hbWUnKSB8fFxyXG4gICAgICAgICAgICBgZmllbGRfJHtmaWVsZHMubGVuZ3RofWA7XHJcblxyXG4gICAgICAgIGNvbnN0IHR5cGUgPVxyXG4gICAgICAgICAgICBlbC50YWdOYW1lID09PSAnU0VMRUNUJ1xyXG4gICAgICAgICAgICAgICAgPyAnc2VsZWN0J1xyXG4gICAgICAgICAgICAgICAgOiBlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnXHJcbiAgICAgICAgICAgICAgICAgICAgPyAndGV4dGFyZWEnXHJcbiAgICAgICAgICAgICAgICAgICAgOiAoZWwgYXMgSFRNTElucHV0RWxlbWVudCkudHlwZSB8fCAndGV4dCc7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhYmVsID0gcmVzb2x2ZUxhYmVsKGVsKTtcclxuICAgICAgICBpZiAoIWxhYmVsKSBjb250aW51ZTsgLy8gc2tpcCB1bmxhYmVsZWQgZmllbGRzIOKAlCBMTE0gY2FuJ3QgbWFwIHRoZW1cclxuXHJcbiAgICAgICAgY29uc3QgZmllbGQ6IFNlbWFudGljRmllbGQgPSB7XHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICBsYWJlbCxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IChlbCBhcyBIVE1MSW5wdXRFbGVtZW50KS5wbGFjZWhvbGRlcjtcclxuICAgICAgICBpZiAocGxhY2Vob2xkZXIgJiYgcGxhY2Vob2xkZXIgIT09IGxhYmVsKSBmaWVsZC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xyXG5cclxuICAgICAgICBjb25zdCBuYW1lID0gZWwuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICAgICAgaWYgKG5hbWUgJiYgbmFtZSAhPT0gaWQpIGZpZWxkLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ1NFTEVDVCcpIHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0cyA9IEFycmF5LmZyb20oKGVsIGFzIEhUTUxTZWxlY3RFbGVtZW50KS5vcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgLm1hcCgobykgPT4gby50ZXh0LnRyaW0oKSlcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKHQpID0+IHQgJiYgdC50b0xvd2VyQ2FzZSgpICE9PSAnc2VsZWN0JyAmJiB0ICE9PSAnLS0nKTtcclxuICAgICAgICAgICAgaWYgKG9wdHMubGVuZ3RoKSBmaWVsZC5vcHRpb25zID0gb3B0cy5zbGljZSgwLCAxMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKGVsIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnJlcXVpcmVkKSBmaWVsZC5yZXF1aXJlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSBnZXRDb250ZXh0KGVsKTtcclxuICAgICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0ICE9PSBsYWJlbCkgZmllbGQuY29udGV4dCA9IGNvbnRleHQ7XHJcblxyXG4gICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkKTtcclxuICAgICAgICBieXRlc1VzZWQgKz0gSlNPTi5zdHJpbmdpZnkoZmllbGQpLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYsXHJcbiAgICAgICAgdGl0bGU6IGRvY3VtZW50LnRpdGxlLFxyXG4gICAgICAgIGZpZWxkcyxcclxuICAgICAgICB0b3RhbEZpZWxkczogZWxlbWVudHMubGVuZ3RoLFxyXG4gICAgfTtcclxufVxyXG5cclxuLy8g4pSA4pSA4pSAIEZpZWxkIExvY2F0b3Ig4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcblxyXG5mdW5jdGlvbiBmaW5kRWxlbWVudChmaWVsZElkOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB8IG51bGwge1xyXG4gICAgLy8gVHJ5IGJ5IElEIGZpcnN0XHJcbiAgICBsZXQgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChmaWVsZElkKSBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoZWwpIHJldHVybiBlbDtcclxuXHJcbiAgICAvLyBUcnkgYnkgbmFtZVxyXG4gICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgW25hbWU9XCIke0NTUy5lc2NhcGUoZmllbGRJZCl9XCJdYCk7XHJcbiAgICBpZiAoZWwpIHJldHVybiBlbDtcclxuXHJcbiAgICAvLyBUcnkgZGF0YS10ZXN0aWQgb3IgYXJpYS1sYWJlbFxyXG4gICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgW2RhdGEtdGVzdGlkPVwiJHtDU1MuZXNjYXBlKGZpZWxkSWQpfVwiXWApO1xyXG4gICAgcmV0dXJuIGVsO1xyXG59XHJcblxyXG4vLyDilIDilIDilIAgRmllbGQgSGlnaGxpZ2h0ZXIg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGlnaGxpZ2h0RmllbGQoZmllbGRJZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBlbCA9IGZpbmRFbGVtZW50KGZpZWxkSWQpIGFzIEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG5cclxuICAgIGVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IEZJTExfSElHSExJR0hUX0NPTE9SO1xyXG4gICAgZWwuc3R5bGUuYm9yZGVyQ29sb3IgPSBGSUxMX0JPUkRFUl9DT0xPUjtcclxuICAgIGVsLnN0eWxlLmJveFNoYWRvdyA9IGAwIDAgMCAycHggJHtGSUxMX0JPUkRFUl9DT0xPUn1gO1xyXG4gICAgZWwuc3R5bGUub3V0bGluZSA9ICdub25lJztcclxuICAgIGVsLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDAuMnMgZWFzZSc7XHJcbiAgICBlbC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFya0ZpZWxkU3VjY2VzcyhmaWVsZElkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IGVsID0gZmluZEVsZW1lbnQoZmllbGRJZCkgYXMgSFRNTElucHV0RWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIWVsKSByZXR1cm47XHJcblxyXG4gICAgZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gU1VDQ0VTU19DT0xPUjtcclxuICAgIGVsLnN0eWxlLmJvcmRlckNvbG9yID0gU1VDQ0VTU19CT1JERVI7XHJcbiAgICBlbC5zdHlsZS5ib3hTaGFkb3cgPSBgMCAwIDAgMnB4ICR7U1VDQ0VTU19CT1JERVJ9YDtcclxuXHJcbiAgICAvLyBBZGQgc3VjY2VzcyBpY29uIG92ZXJsYXlcclxuICAgIGNvbnN0IHdyYXBwZXIgPSBlbC5wYXJlbnRFbGVtZW50O1xyXG4gICAgaWYgKHdyYXBwZXIpIHtcclxuICAgICAgICBjb25zdCBleGlzdGluZyA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcignLmNpdGl6ZW4tb25lLWNoZWNrJyk7XHJcbiAgICAgICAgaWYgKCFleGlzdGluZykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGVjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgY2hlY2suY2xhc3NOYW1lID0gJ2NpdGl6ZW4tb25lLWNoZWNrJztcclxuICAgICAgICAgICAgY2hlY2sudGV4dENvbnRlbnQgPSAn4pyTJztcclxuICAgICAgICAgICAgY2hlY2suc3R5bGUuY3NzVGV4dCA9IGBcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgcmlnaHQ6IDhweDtcclxuICAgICAgICB0b3A6IDUwJTtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICAgICAgY29sb3I6ICMxMGI5ODE7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgICAgIHotaW5kZXg6IDk5OTk7XHJcbiAgICAgIGA7XHJcbiAgICAgICAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKHdyYXBwZXIpLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xyXG4gICAgICAgICAgICAgICAgd3JhcHBlci5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChjaGVjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFya0ZpZWxkRXJyb3IoZmllbGRJZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBlbCA9IGZpbmRFbGVtZW50KGZpZWxkSWQpIGFzIEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG5cclxuICAgIGVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IEVSUk9SX0NPTE9SO1xyXG4gICAgZWwuc3R5bGUuYm9yZGVyQ29sb3IgPSBFUlJPUl9CT1JERVI7XHJcbiAgICBlbC5zdHlsZS5ib3hTaGFkb3cgPSBgMCAwIDAgMnB4ICR7RVJST1JfQk9SREVSfWA7XHJcbn1cclxuXHJcbi8vIOKUgOKUgOKUgCBaZXJvLUtub3dsZWRnZSBGb3JtIEZpbGxlciDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxsRm9ybShtYXBwaW5nOiBGaWVsZE1hcHBpbmcsIHZhdWx0OiBWYXVsdCk6IFByb21pc2U8RmlsbFJlc3VsdFtdPiB7XHJcbiAgICBjb25zdCByZXN1bHRzOiBGaWxsUmVzdWx0W10gPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IFtmaWVsZElkLCB2YXVsdEtleV0gb2YgT2JqZWN0LmVudHJpZXMobWFwcGluZykpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGdldFZhdWx0VmFsdWUodmF1bHQsIHZhdWx0S2V5KTtcclxuICAgICAgICBjb25zdCBlbCA9IGZpbmRFbGVtZW50KGZpZWxkSWQpIGFzIEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQgfCBudWxsO1xyXG5cclxuICAgICAgICBpZiAoIWVsKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCh7IGZpZWxkSWQsIHN1Y2Nlc3M6IGZhbHNlLCBtYXBwZWRLZXk6IHZhdWx0S2V5LCBlcnJvcjogJ0VsZW1lbnQgbm90IGZvdW5kJyB9KTtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCh7IGZpZWxkSWQsIHN1Y2Nlc3M6IGZhbHNlLCBtYXBwZWRLZXk6IHZhdWx0S2V5LCBlcnJvcjogJ05vIHZhdWx0IHZhbHVlIGZvciBrZXk6ICcgKyB2YXVsdEtleSB9KTtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoaWdobGlnaHRGaWVsZChmaWVsZElkKTtcclxuICAgICAgICBhd2FpdCBzbGVlcCgxNTApOyAvLyBWaXN1YWwgZmVlZGJhY2sgZGVsYXlcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGVsLnRhZ05hbWUgPT09ICdTRUxFQ1QnKSB7XHJcbiAgICAgICAgICAgICAgICBmaWxsU2VsZWN0KGVsIGFzIEhUTUxTZWxlY3RFbGVtZW50LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmaWxsSW5wdXQoZWwgYXMgSFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtYXJrRmllbGRTdWNjZXNzKGZpZWxkSWQpO1xyXG4gICAgICAgICAgICByZXN1bHRzLnB1c2goeyBmaWVsZElkLCBzdWNjZXNzOiB0cnVlLCBtYXBwZWRLZXk6IHZhdWx0S2V5IH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBtYXJrRmllbGRFcnJvcihmaWVsZElkKTtcclxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZpZWxkSWQsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG1hcHBlZEtleTogdmF1bHRLZXksXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdVbmtub3duIGVycm9yJyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCBzbGVlcCgxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHRzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWxsSW5wdXQoZWw6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAvLyBOYXRpdmUgaW5wdXQgdmFsdWUgc2V0dGVyIChuZWVkZWQgZm9yIFJlYWN0LWNvbnRyb2xsZWQgaW5wdXRzKVxyXG4gICAgY29uc3QgbmF0aXZlSW5wdXRWYWx1ZVNldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXHJcbiAgICAgICAgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJ1xyXG4gICAgICAgICAgICA/IEhUTUxUZXh0QXJlYUVsZW1lbnQucHJvdG90eXBlXHJcbiAgICAgICAgICAgIDogSFRNTElucHV0RWxlbWVudC5wcm90b3R5cGUsXHJcbiAgICAgICAgJ3ZhbHVlJyxcclxuICAgICk/LnNldDtcclxuXHJcbiAgICBpZiAobmF0aXZlSW5wdXRWYWx1ZVNldHRlcikge1xyXG4gICAgICAgIG5hdGl2ZUlucHV0VmFsdWVTZXR0ZXIuY2FsbChlbCwgdmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBlbC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERpc3BhdGNoIGV2ZW50cyB0byB0cmlnZ2VyIFJlYWN0L1Z1ZS9Bbmd1bGFyIGxpc3RlbmVyc1xyXG4gICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JywgeyBidWJibGVzOiB0cnVlIH0pKTtcclxuICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xyXG4gICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgS2V5Ym9hcmRFdmVudCgna2V5dXAnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWxsU2VsZWN0KGVsOiBIVE1MU2VsZWN0RWxlbWVudCwgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgLy8gVHJ5IGV4YWN0IG9wdGlvbiB2YWx1ZSBtYXRjaFxyXG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZWwub3B0aW9ucykge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgb3B0aW9uLnZhbHVlLnRvTG93ZXJDYXNlKCkgPT09IHZhbHVlLnRvTG93ZXJDYXNlKCkgfHxcclxuICAgICAgICAgICAgb3B0aW9uLnRleHQudG9Mb3dlckNhc2UoKSA9PT0gdmFsdWUudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBlbC52YWx1ZSA9IG9wdGlvbi52YWx1ZTtcclxuICAgICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHsgYnViYmxlczogdHJ1ZSB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVHJ5IHBhcnRpYWwgbWF0Y2hcclxuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIGVsLm9wdGlvbnMpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUudG9Mb3dlckNhc2UoKSkgfHxcclxuICAgICAgICAgICAgdmFsdWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhvcHRpb24udGV4dC50b0xvd2VyQ2FzZSgpKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBlbC52YWx1ZSA9IG9wdGlvbi52YWx1ZTtcclxuICAgICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHsgYnViYmxlczogdHJ1ZSB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyBtYXRjaGluZyBvcHRpb24gZm9yIHZhbHVlOiAke3ZhbHVlfWApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzbGVlcChtczogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcclxufVxyXG4iLCIvLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuLy8gQ2l0aXplbk9uZSDigJMgQ29udGVudCBTY3JpcHRcclxuLy8gSW5qZWN0ZWQgaW50byBwYWdlcyB0byBleHRyYWN0IHNlbWFudGljIG1hcHMgYW5kIGZpbGwgZm9ybXMuXHJcbi8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG5cclxuaW1wb3J0IHtcclxuICAgIGdldFNlbWFudGljTWFwLFxyXG4gICAgZmlsbEZvcm0sXHJcbiAgICBoaWdobGlnaHRGaWVsZCxcclxuICAgIG1hcmtGaWVsZFN1Y2Nlc3MsXHJcbiAgICBtYXJrRmllbGRFcnJvcixcclxufSBmcm9tICd+L2xpYi9kb21VdGlscyc7XHJcbmltcG9ydCB0eXBlIHsgRmllbGRNYXBwaW5nLCBWYXVsdCB9IGZyb20gJ34vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29udGVudFNjcmlwdCh7XHJcbiAgICBtYXRjaGVzOiBbJzxhbGxfdXJscz4nXSxcclxuICAgIHJ1bkF0OiAnZG9jdW1lbnRfaWRsZScsXHJcblxyXG4gICAgbWFpbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnW0NpdGl6ZW5PbmVdIENvbnRlbnQgc2NyaXB0IGxvYWRlZC4nKTtcclxuXHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBfc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgaGFuZGxlQ29udGVudE1lc3NhZ2UobWVzc2FnZSwgc2VuZFJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUNvbnRlbnRNZXNzYWdlKFxyXG4gICAgbWVzc2FnZTogeyB0eXBlOiBzdHJpbmc7W2tleTogc3RyaW5nXTogdW5rbm93biB9LFxyXG4gICAgc2VuZFJlc3BvbnNlOiAocmVzcG9uc2U6IHVua25vd24pID0+IHZvaWQsXHJcbik6IHZvaWQge1xyXG4gICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcclxuICAgICAgICBjYXNlICdHRVRfU0VNQU5USUNfTUFQJzoge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWFwID0gZ2V0U2VtYW50aWNNYXAoKTtcclxuICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IG1hcCB9KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFN0cmluZyhlcnIpIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSAnRklMTF9GT1JNJzoge1xyXG4gICAgICAgICAgICBjb25zdCBtYXBwaW5nID0gbWVzc2FnZS5tYXBwaW5nIGFzIEZpZWxkTWFwcGluZztcclxuICAgICAgICAgICAgY29uc3QgdmF1bHQgPSBtZXNzYWdlLnZhdWx0IGFzIFZhdWx0O1xyXG5cclxuICAgICAgICAgICAgZmlsbEZvcm0obWFwcGluZywgdmF1bHQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0cykgPT4gc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcmVzdWx0cyB9KSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFN0cmluZyhlcnIpIH0pKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlICdISUdITElHSFRfRklFTEQnOiB7XHJcbiAgICAgICAgICAgIGhpZ2hsaWdodEZpZWxkKG1lc3NhZ2UuZmllbGRJZCBhcyBzdHJpbmcpO1xyXG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBudWxsIH0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgJ01BUktfU1VDQ0VTUyc6IHtcclxuICAgICAgICAgICAgbWFya0ZpZWxkU3VjY2VzcyhtZXNzYWdlLmZpZWxkSWQgYXMgc3RyaW5nKTtcclxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbnVsbCB9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlICdNQVJLX0VSUk9SJzoge1xyXG4gICAgICAgICAgICBtYXJrRmllbGRFcnJvcihtZXNzYWdlLmZpZWxkSWQgYXMgc3RyaW5nKTtcclxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbnVsbCB9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGBVbmtub3duIG1lc3NhZ2U6ICR7bWVzc2FnZS50eXBlfWAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8jcmVnaW9uIHNyYy91dGlscy9pbnRlcm5hbC9sb2dnZXIudHNcbmZ1bmN0aW9uIHByaW50KG1ldGhvZCwgLi4uYXJncykge1xuXHRpZiAoaW1wb3J0Lm1ldGEuZW52Lk1PREUgPT09IFwicHJvZHVjdGlvblwiKSByZXR1cm47XG5cdGlmICh0eXBlb2YgYXJnc1swXSA9PT0gXCJzdHJpbmdcIikgbWV0aG9kKGBbd3h0XSAke2FyZ3Muc2hpZnQoKX1gLCAuLi5hcmdzKTtcblx0ZWxzZSBtZXRob2QoXCJbd3h0XVwiLCAuLi5hcmdzKTtcbn1cbi8qKlxuKiBXcmFwcGVyIGFyb3VuZCBgY29uc29sZWAgd2l0aCBhIFwiW3d4dF1cIiBwcmVmaXhcbiovXG5jb25zdCBsb2dnZXIgPSB7XG5cdGRlYnVnOiAoLi4uYXJncykgPT4gcHJpbnQoY29uc29sZS5kZWJ1ZywgLi4uYXJncyksXG5cdGxvZzogKC4uLmFyZ3MpID0+IHByaW50KGNvbnNvbGUubG9nLCAuLi5hcmdzKSxcblx0d2FybjogKC4uLmFyZ3MpID0+IHByaW50KGNvbnNvbGUud2FybiwgLi4uYXJncyksXG5cdGVycm9yOiAoLi4uYXJncykgPT4gcHJpbnQoY29uc29sZS5lcnJvciwgLi4uYXJncylcbn07XG5cbi8vI2VuZHJlZ2lvblxuZXhwb3J0IHsgbG9nZ2VyIH07IiwiLy8gI3JlZ2lvbiBzbmlwcGV0XG5leHBvcnQgY29uc3QgYnJvd3NlciA9IGdsb2JhbFRoaXMuYnJvd3Nlcj8ucnVudGltZT8uaWRcbiAgPyBnbG9iYWxUaGlzLmJyb3dzZXJcbiAgOiBnbG9iYWxUaGlzLmNocm9tZTtcbi8vICNlbmRyZWdpb24gc25pcHBldFxuIiwiaW1wb3J0IHsgYnJvd3NlciBhcyBicm93c2VyJDEgfSBmcm9tIFwiQHd4dC1kZXYvYnJvd3NlclwiO1xuXG4vLyNyZWdpb24gc3JjL2Jyb3dzZXIudHNcbi8qKlxuKiBDb250YWlucyB0aGUgYGJyb3dzZXJgIGV4cG9ydCB3aGljaCB5b3Ugc2hvdWxkIHVzZSB0byBhY2Nlc3MgdGhlIGV4dGVuc2lvbiBBUElzIGluIHlvdXIgcHJvamVjdDpcbiogYGBgdHNcbiogaW1wb3J0IHsgYnJvd3NlciB9IGZyb20gJ3d4dC9icm93c2VyJztcbipcbiogYnJvd3Nlci5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcbiogICAvLyAuLi5cbiogfSlcbiogYGBgXG4qIEBtb2R1bGUgd3h0L2Jyb3dzZXJcbiovXG5jb25zdCBicm93c2VyID0gYnJvd3NlciQxO1xuXG4vLyNlbmRyZWdpb25cbmV4cG9ydCB7IGJyb3dzZXIgfTsiLCJpbXBvcnQgeyBicm93c2VyIH0gZnJvbSBcInd4dC9icm93c2VyXCI7XG5cbi8vI3JlZ2lvbiBzcmMvdXRpbHMvaW50ZXJuYWwvY3VzdG9tLWV2ZW50cy50c1xudmFyIFd4dExvY2F0aW9uQ2hhbmdlRXZlbnQgPSBjbGFzcyBXeHRMb2NhdGlvbkNoYW5nZUV2ZW50IGV4dGVuZHMgRXZlbnQge1xuXHRzdGF0aWMgRVZFTlRfTkFNRSA9IGdldFVuaXF1ZUV2ZW50TmFtZShcInd4dDpsb2NhdGlvbmNoYW5nZVwiKTtcblx0Y29uc3RydWN0b3IobmV3VXJsLCBvbGRVcmwpIHtcblx0XHRzdXBlcihXeHRMb2NhdGlvbkNoYW5nZUV2ZW50LkVWRU5UX05BTUUsIHt9KTtcblx0XHR0aGlzLm5ld1VybCA9IG5ld1VybDtcblx0XHR0aGlzLm9sZFVybCA9IG9sZFVybDtcblx0fVxufTtcbi8qKlxuKiBSZXR1cm5zIGFuIGV2ZW50IG5hbWUgdW5pcXVlIHRvIHRoZSBleHRlbnNpb24gYW5kIGNvbnRlbnQgc2NyaXB0IHRoYXQncyBydW5uaW5nLlxuKi9cbmZ1bmN0aW9uIGdldFVuaXF1ZUV2ZW50TmFtZShldmVudE5hbWUpIHtcblx0cmV0dXJuIGAke2Jyb3dzZXI/LnJ1bnRpbWU/LmlkfToke2ltcG9ydC5tZXRhLmVudi5FTlRSWVBPSU5UfToke2V2ZW50TmFtZX1gO1xufVxuXG4vLyNlbmRyZWdpb25cbmV4cG9ydCB7IFd4dExvY2F0aW9uQ2hhbmdlRXZlbnQsIGdldFVuaXF1ZUV2ZW50TmFtZSB9OyIsImltcG9ydCB7IFd4dExvY2F0aW9uQ2hhbmdlRXZlbnQgfSBmcm9tIFwiLi9jdXN0b20tZXZlbnRzLm1qc1wiO1xuXG4vLyNyZWdpb24gc3JjL3V0aWxzL2ludGVybmFsL2xvY2F0aW9uLXdhdGNoZXIudHNcbi8qKlxuKiBDcmVhdGUgYSB1dGlsIHRoYXQgd2F0Y2hlcyBmb3IgVVJMIGNoYW5nZXMsIGRpc3BhdGNoaW5nIHRoZSBjdXN0b20gZXZlbnQgd2hlbiBkZXRlY3RlZC4gU3RvcHNcbiogd2F0Y2hpbmcgd2hlbiBjb250ZW50IHNjcmlwdCBpcyBpbnZhbGlkYXRlZC5cbiovXG5mdW5jdGlvbiBjcmVhdGVMb2NhdGlvbldhdGNoZXIoY3R4KSB7XG5cdGxldCBpbnRlcnZhbDtcblx0bGV0IG9sZFVybDtcblx0cmV0dXJuIHsgcnVuKCkge1xuXHRcdGlmIChpbnRlcnZhbCAhPSBudWxsKSByZXR1cm47XG5cdFx0b2xkVXJsID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKTtcblx0XHRpbnRlcnZhbCA9IGN0eC5zZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHRsZXQgbmV3VXJsID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKTtcblx0XHRcdGlmIChuZXdVcmwuaHJlZiAhPT0gb2xkVXJsLmhyZWYpIHtcblx0XHRcdFx0d2luZG93LmRpc3BhdGNoRXZlbnQobmV3IFd4dExvY2F0aW9uQ2hhbmdlRXZlbnQobmV3VXJsLCBvbGRVcmwpKTtcblx0XHRcdFx0b2xkVXJsID0gbmV3VXJsO1xuXHRcdFx0fVxuXHRcdH0sIDFlMyk7XG5cdH0gfTtcbn1cblxuLy8jZW5kcmVnaW9uXG5leHBvcnQgeyBjcmVhdGVMb2NhdGlvbldhdGNoZXIgfTsiLCJpbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi9pbnRlcm5hbC9sb2dnZXIubWpzXCI7XG5pbXBvcnQgeyBnZXRVbmlxdWVFdmVudE5hbWUgfSBmcm9tIFwiLi9pbnRlcm5hbC9jdXN0b20tZXZlbnRzLm1qc1wiO1xuaW1wb3J0IHsgY3JlYXRlTG9jYXRpb25XYXRjaGVyIH0gZnJvbSBcIi4vaW50ZXJuYWwvbG9jYXRpb24td2F0Y2hlci5tanNcIjtcbmltcG9ydCB7IGJyb3dzZXIgfSBmcm9tIFwid3h0L2Jyb3dzZXJcIjtcblxuLy8jcmVnaW9uIHNyYy91dGlscy9jb250ZW50LXNjcmlwdC1jb250ZXh0LnRzXG4vKipcbiogSW1wbGVtZW50cyBbYEFib3J0Q29udHJvbGxlcmBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9BYm9ydENvbnRyb2xsZXIpLlxuKiBVc2VkIHRvIGRldGVjdCBhbmQgc3RvcCBjb250ZW50IHNjcmlwdCBjb2RlIHdoZW4gdGhlIHNjcmlwdCBpcyBpbnZhbGlkYXRlZC5cbipcbiogSXQgYWxzbyBwcm92aWRlcyBzZXZlcmFsIHV0aWxpdGllcyBsaWtlIGBjdHguc2V0VGltZW91dGAgYW5kIGBjdHguc2V0SW50ZXJ2YWxgIHRoYXQgc2hvdWxkIGJlIHVzZWQgaW5cbiogY29udGVudCBzY3JpcHRzIGluc3RlYWQgb2YgYHdpbmRvdy5zZXRUaW1lb3V0YCBvciBgd2luZG93LnNldEludGVydmFsYC5cbipcbiogVG8gY3JlYXRlIGNvbnRleHQgZm9yIHRlc3RpbmcsIHlvdSBjYW4gdXNlIHRoZSBjbGFzcydzIGNvbnN0cnVjdG9yOlxuKlxuKiBgYGB0c1xuKiBpbXBvcnQgeyBDb250ZW50U2NyaXB0Q29udGV4dCB9IGZyb20gJ3d4dC91dGlscy9jb250ZW50LXNjcmlwdHMtY29udGV4dCc7XG4qXG4qIHRlc3QoXCJzdG9yYWdlIGxpc3RlbmVyIHNob3VsZCBiZSByZW1vdmVkIHdoZW4gY29udGV4dCBpcyBpbnZhbGlkYXRlZFwiLCAoKSA9PiB7XG4qICAgY29uc3QgY3R4ID0gbmV3IENvbnRlbnRTY3JpcHRDb250ZXh0KCd0ZXN0Jyk7XG4qICAgY29uc3QgaXRlbSA9IHN0b3JhZ2UuZGVmaW5lSXRlbShcImxvY2FsOmNvdW50XCIsIHsgZGVmYXVsdFZhbHVlOiAwIH0pO1xuKiAgIGNvbnN0IHdhdGNoZXIgPSB2aS5mbigpO1xuKlxuKiAgIGNvbnN0IHVud2F0Y2ggPSBpdGVtLndhdGNoKHdhdGNoZXIpO1xuKiAgIGN0eC5vbkludmFsaWRhdGVkKHVud2F0Y2gpOyAvLyBMaXN0ZW4gZm9yIGludmFsaWRhdGUgaGVyZVxuKlxuKiAgIGF3YWl0IGl0ZW0uc2V0VmFsdWUoMSk7XG4qICAgZXhwZWN0KHdhdGNoZXIpLnRvQmVDYWxsZWRUaW1lcygxKTtcbiogICBleHBlY3Qod2F0Y2hlcikudG9CZUNhbGxlZFdpdGgoMSwgMCk7XG4qXG4qICAgY3R4Lm5vdGlmeUludmFsaWRhdGVkKCk7IC8vIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIGludmFsaWRhdGUgdGhlIGNvbnRleHRcbiogICBhd2FpdCBpdGVtLnNldFZhbHVlKDIpO1xuKiAgIGV4cGVjdCh3YXRjaGVyKS50b0JlQ2FsbGVkVGltZXMoMSk7XG4qIH0pO1xuKiBgYGBcbiovXG52YXIgQ29udGVudFNjcmlwdENvbnRleHQgPSBjbGFzcyBDb250ZW50U2NyaXB0Q29udGV4dCB7XG5cdHN0YXRpYyBTQ1JJUFRfU1RBUlRFRF9NRVNTQUdFX1RZUEUgPSBnZXRVbmlxdWVFdmVudE5hbWUoXCJ3eHQ6Y29udGVudC1zY3JpcHQtc3RhcnRlZFwiKTtcblx0aWQ7XG5cdGFib3J0Q29udHJvbGxlcjtcblx0bG9jYXRpb25XYXRjaGVyID0gY3JlYXRlTG9jYXRpb25XYXRjaGVyKHRoaXMpO1xuXHRjb25zdHJ1Y3Rvcihjb250ZW50U2NyaXB0TmFtZSwgb3B0aW9ucykge1xuXHRcdHRoaXMuY29udGVudFNjcmlwdE5hbWUgPSBjb250ZW50U2NyaXB0TmFtZTtcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdHRoaXMuaWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyKTtcblx0XHR0aGlzLmFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblx0XHR0aGlzLnN0b3BPbGRTY3JpcHRzKCk7XG5cdFx0dGhpcy5saXN0ZW5Gb3JOZXdlclNjcmlwdHMoKTtcblx0fVxuXHRnZXQgc2lnbmFsKCkge1xuXHRcdHJldHVybiB0aGlzLmFib3J0Q29udHJvbGxlci5zaWduYWw7XG5cdH1cblx0YWJvcnQocmVhc29uKSB7XG5cdFx0cmV0dXJuIHRoaXMuYWJvcnRDb250cm9sbGVyLmFib3J0KHJlYXNvbik7XG5cdH1cblx0Z2V0IGlzSW52YWxpZCgpIHtcblx0XHRpZiAoYnJvd3Nlci5ydW50aW1lPy5pZCA9PSBudWxsKSB0aGlzLm5vdGlmeUludmFsaWRhdGVkKCk7XG5cdFx0cmV0dXJuIHRoaXMuc2lnbmFsLmFib3J0ZWQ7XG5cdH1cblx0Z2V0IGlzVmFsaWQoKSB7XG5cdFx0cmV0dXJuICF0aGlzLmlzSW52YWxpZDtcblx0fVxuXHQvKipcblx0KiBBZGQgYSBsaXN0ZW5lciB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSBjb250ZW50IHNjcmlwdCdzIGNvbnRleHQgaXMgaW52YWxpZGF0ZWQuXG5cdCpcblx0KiBAcmV0dXJucyBBIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG5cdCpcblx0KiBAZXhhbXBsZVxuXHQqIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoY2IpO1xuXHQqIGNvbnN0IHJlbW92ZUludmFsaWRhdGVkTGlzdGVuZXIgPSBjdHgub25JbnZhbGlkYXRlZCgoKSA9PiB7XG5cdCogICBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLnJlbW92ZUxpc3RlbmVyKGNiKTtcblx0KiB9KVxuXHQqIC8vIC4uLlxuXHQqIHJlbW92ZUludmFsaWRhdGVkTGlzdGVuZXIoKTtcblx0Ki9cblx0b25JbnZhbGlkYXRlZChjYikge1xuXHRcdHRoaXMuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBjYik7XG5cdFx0cmV0dXJuICgpID0+IHRoaXMuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBjYik7XG5cdH1cblx0LyoqXG5cdCogUmV0dXJuIGEgcHJvbWlzZSB0aGF0IG5ldmVyIHJlc29sdmVzLiBVc2VmdWwgaWYgeW91IGhhdmUgYW4gYXN5bmMgZnVuY3Rpb24gdGhhdCBzaG91bGRuJ3QgcnVuXG5cdCogYWZ0ZXIgdGhlIGNvbnRleHQgaXMgZXhwaXJlZC5cblx0KlxuXHQqIEBleGFtcGxlXG5cdCogY29uc3QgZ2V0VmFsdWVGcm9tU3RvcmFnZSA9IGFzeW5jICgpID0+IHtcblx0KiAgIGlmIChjdHguaXNJbnZhbGlkKSByZXR1cm4gY3R4LmJsb2NrKCk7XG5cdCpcblx0KiAgIC8vIC4uLlxuXHQqIH1cblx0Ki9cblx0YmxvY2soKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKCgpID0+IHt9KTtcblx0fVxuXHQvKipcblx0KiBXcmFwcGVyIGFyb3VuZCBgd2luZG93LnNldEludGVydmFsYCB0aGF0IGF1dG9tYXRpY2FsbHkgY2xlYXJzIHRoZSBpbnRlcnZhbCB3aGVuIGludmFsaWRhdGVkLlxuXHQqXG5cdCogSW50ZXJ2YWxzIGNhbiBiZSBjbGVhcmVkIGJ5IGNhbGxpbmcgdGhlIG5vcm1hbCBgY2xlYXJJbnRlcnZhbGAgZnVuY3Rpb24uXG5cdCovXG5cdHNldEludGVydmFsKGhhbmRsZXIsIHRpbWVvdXQpIHtcblx0XHRjb25zdCBpZCA9IHNldEludGVydmFsKCgpID0+IHtcblx0XHRcdGlmICh0aGlzLmlzVmFsaWQpIGhhbmRsZXIoKTtcblx0XHR9LCB0aW1lb3V0KTtcblx0XHR0aGlzLm9uSW52YWxpZGF0ZWQoKCkgPT4gY2xlYXJJbnRlcnZhbChpZCkpO1xuXHRcdHJldHVybiBpZDtcblx0fVxuXHQvKipcblx0KiBXcmFwcGVyIGFyb3VuZCBgd2luZG93LnNldFRpbWVvdXRgIHRoYXQgYXV0b21hdGljYWxseSBjbGVhcnMgdGhlIGludGVydmFsIHdoZW4gaW52YWxpZGF0ZWQuXG5cdCpcblx0KiBUaW1lb3V0cyBjYW4gYmUgY2xlYXJlZCBieSBjYWxsaW5nIHRoZSBub3JtYWwgYHNldFRpbWVvdXRgIGZ1bmN0aW9uLlxuXHQqL1xuXHRzZXRUaW1lb3V0KGhhbmRsZXIsIHRpbWVvdXQpIHtcblx0XHRjb25zdCBpZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMuaXNWYWxpZCkgaGFuZGxlcigpO1xuXHRcdH0sIHRpbWVvdXQpO1xuXHRcdHRoaXMub25JbnZhbGlkYXRlZCgoKSA9PiBjbGVhclRpbWVvdXQoaWQpKTtcblx0XHRyZXR1cm4gaWQ7XG5cdH1cblx0LyoqXG5cdCogV3JhcHBlciBhcm91bmQgYHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVgIHRoYXQgYXV0b21hdGljYWxseSBjYW5jZWxzIHRoZSByZXF1ZXN0IHdoZW5cblx0KiBpbnZhbGlkYXRlZC5cblx0KlxuXHQqIENhbGxiYWNrcyBjYW4gYmUgY2FuY2VsZWQgYnkgY2FsbGluZyB0aGUgbm9ybWFsIGBjYW5jZWxBbmltYXRpb25GcmFtZWAgZnVuY3Rpb24uXG5cdCovXG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjaykge1xuXHRcdGNvbnN0IGlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCguLi5hcmdzKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5pc1ZhbGlkKSBjYWxsYmFjayguLi5hcmdzKTtcblx0XHR9KTtcblx0XHR0aGlzLm9uSW52YWxpZGF0ZWQoKCkgPT4gY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpKTtcblx0XHRyZXR1cm4gaWQ7XG5cdH1cblx0LyoqXG5cdCogV3JhcHBlciBhcm91bmQgYHdpbmRvdy5yZXF1ZXN0SWRsZUNhbGxiYWNrYCB0aGF0IGF1dG9tYXRpY2FsbHkgY2FuY2VscyB0aGUgcmVxdWVzdCB3aGVuXG5cdCogaW52YWxpZGF0ZWQuXG5cdCpcblx0KiBDYWxsYmFja3MgY2FuIGJlIGNhbmNlbGVkIGJ5IGNhbGxpbmcgdGhlIG5vcm1hbCBgY2FuY2VsSWRsZUNhbGxiYWNrYCBmdW5jdGlvbi5cblx0Ki9cblx0cmVxdWVzdElkbGVDYWxsYmFjayhjYWxsYmFjaywgb3B0aW9ucykge1xuXHRcdGNvbnN0IGlkID0gcmVxdWVzdElkbGVDYWxsYmFjaygoLi4uYXJncykgPT4ge1xuXHRcdFx0aWYgKCF0aGlzLnNpZ25hbC5hYm9ydGVkKSBjYWxsYmFjayguLi5hcmdzKTtcblx0XHR9LCBvcHRpb25zKTtcblx0XHR0aGlzLm9uSW52YWxpZGF0ZWQoKCkgPT4gY2FuY2VsSWRsZUNhbGxiYWNrKGlkKSk7XG5cdFx0cmV0dXJuIGlkO1xuXHR9XG5cdGFkZEV2ZW50TGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBoYW5kbGVyLCBvcHRpb25zKSB7XG5cdFx0aWYgKHR5cGUgPT09IFwid3h0OmxvY2F0aW9uY2hhbmdlXCIpIHtcblx0XHRcdGlmICh0aGlzLmlzVmFsaWQpIHRoaXMubG9jYXRpb25XYXRjaGVyLnJ1bigpO1xuXHRcdH1cblx0XHR0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcj8uKHR5cGUuc3RhcnRzV2l0aChcInd4dDpcIikgPyBnZXRVbmlxdWVFdmVudE5hbWUodHlwZSkgOiB0eXBlLCBoYW5kbGVyLCB7XG5cdFx0XHQuLi5vcHRpb25zLFxuXHRcdFx0c2lnbmFsOiB0aGlzLnNpZ25hbFxuXHRcdH0pO1xuXHR9XG5cdC8qKlxuXHQqIEBpbnRlcm5hbFxuXHQqIEFib3J0IHRoZSBhYm9ydCBjb250cm9sbGVyIGFuZCBleGVjdXRlIGFsbCBgb25JbnZhbGlkYXRlZGAgbGlzdGVuZXJzLlxuXHQqL1xuXHRub3RpZnlJbnZhbGlkYXRlZCgpIHtcblx0XHR0aGlzLmFib3J0KFwiQ29udGVudCBzY3JpcHQgY29udGV4dCBpbnZhbGlkYXRlZFwiKTtcblx0XHRsb2dnZXIuZGVidWcoYENvbnRlbnQgc2NyaXB0IFwiJHt0aGlzLmNvbnRlbnRTY3JpcHROYW1lfVwiIGNvbnRleHQgaW52YWxpZGF0ZWRgKTtcblx0fVxuXHRzdG9wT2xkU2NyaXB0cygpIHtcblx0XHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChDb250ZW50U2NyaXB0Q29udGV4dC5TQ1JJUFRfU1RBUlRFRF9NRVNTQUdFX1RZUEUsIHsgZGV0YWlsOiB7XG5cdFx0XHRjb250ZW50U2NyaXB0TmFtZTogdGhpcy5jb250ZW50U2NyaXB0TmFtZSxcblx0XHRcdG1lc3NhZ2VJZDogdGhpcy5pZFxuXHRcdH0gfSkpO1xuXHRcdHdpbmRvdy5wb3N0TWVzc2FnZSh7XG5cdFx0XHR0eXBlOiBDb250ZW50U2NyaXB0Q29udGV4dC5TQ1JJUFRfU1RBUlRFRF9NRVNTQUdFX1RZUEUsXG5cdFx0XHRjb250ZW50U2NyaXB0TmFtZTogdGhpcy5jb250ZW50U2NyaXB0TmFtZSxcblx0XHRcdG1lc3NhZ2VJZDogdGhpcy5pZFxuXHRcdH0sIFwiKlwiKTtcblx0fVxuXHR2ZXJpZnlTY3JpcHRTdGFydGVkRXZlbnQoZXZlbnQpIHtcblx0XHRjb25zdCBpc1NhbWVDb250ZW50U2NyaXB0ID0gZXZlbnQuZGV0YWlsPy5jb250ZW50U2NyaXB0TmFtZSA9PT0gdGhpcy5jb250ZW50U2NyaXB0TmFtZTtcblx0XHRjb25zdCBpc0Zyb21TZWxmID0gZXZlbnQuZGV0YWlsPy5tZXNzYWdlSWQgPT09IHRoaXMuaWQ7XG5cdFx0cmV0dXJuIGlzU2FtZUNvbnRlbnRTY3JpcHQgJiYgIWlzRnJvbVNlbGY7XG5cdH1cblx0bGlzdGVuRm9yTmV3ZXJTY3JpcHRzKCkge1xuXHRcdGNvbnN0IGNiID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRpZiAoIShldmVudCBpbnN0YW5jZW9mIEN1c3RvbUV2ZW50KSB8fCAhdGhpcy52ZXJpZnlTY3JpcHRTdGFydGVkRXZlbnQoZXZlbnQpKSByZXR1cm47XG5cdFx0XHR0aGlzLm5vdGlmeUludmFsaWRhdGVkKCk7XG5cdFx0fTtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKENvbnRlbnRTY3JpcHRDb250ZXh0LlNDUklQVF9TVEFSVEVEX01FU1NBR0VfVFlQRSwgY2IpO1xuXHRcdHRoaXMub25JbnZhbGlkYXRlZCgoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKENvbnRlbnRTY3JpcHRDb250ZXh0LlNDUklQVF9TVEFSVEVEX01FU1NBR0VfVFlQRSwgY2IpKTtcblx0fVxufTtcblxuLy8jZW5kcmVnaW9uXG5leHBvcnQgeyBDb250ZW50U2NyaXB0Q29udGV4dCB9OyJdLCJuYW1lcyI6WyJkZWZpbml0aW9uIiwidGhpcyIsIk1hdGgiLCJ1bmRlZmluZWQiLCJnbG9iYWwiLCJyZXF1aXJlIiwicmVxdWlyZSQkMCIsIm4iLCJIIiwicmVxdWlyZSQkMSIsInJlcXVpcmUkJDIiLCJobWFjIiwiQ0JDIiwicmVxdWlyZSQkMyIsInJlcXVpcmUkJDQiLCJTVUJfTUlYXzAiLCJTVUJfTUlYXzEiLCJTVUJfTUlYXzIiLCJTVUJfTUlYXzMiLCJTQk9YIiwiQyIsInJlcXVpcmUkJDUiLCJyZXF1aXJlJCQ2IiwicmVxdWlyZSQkNyIsInJlcXVpcmUkJDgiLCJyZXF1aXJlJCQ5IiwicmVxdWlyZSQkMTAiLCJyZXF1aXJlJCQxMSIsInJlcXVpcmUkJDEyIiwicmVxdWlyZSQkMTMiLCJyZXF1aXJlJCQxNCIsInJlcXVpcmUkJDE1IiwicmVxdWlyZSQkMTYiLCJyZXF1aXJlJCQxNyIsInJlcXVpcmUkJDE4IiwicmVxdWlyZSQkMTkiLCJyZXF1aXJlJCQyMCIsInJlcXVpcmUkJDIxIiwicmVxdWlyZSQkMjIiLCJyZXF1aXJlJCQyMyIsInJlcXVpcmUkJDI0IiwicmVxdWlyZSQkMjUiLCJyZXF1aXJlJCQyNiIsInJlcXVpcmUkJDI3IiwicmVxdWlyZSQkMjgiLCJyZXF1aXJlJCQyOSIsInJlcXVpcmUkJDMwIiwicmVxdWlyZSQkMzEiLCJyZXF1aXJlJCQzMiIsInJlcXVpcmUkJDMzIiwicmVxdWlyZSQkMzQiLCJwcmludCIsImxvZ2dlciIsImJyb3dzZXIiLCJXeHRMb2NhdGlvbkNoYW5nZUV2ZW50IiwiQ29udGVudFNjcmlwdENvbnRleHQiXSwibWFwcGluZ3MiOiI7O0FBQ0EsV0FBUyxvQkFBb0JBLGFBQVk7QUFDeEMsV0FBT0E7QUFBQSxFQUNSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIRSxRQUFBLHdCQUFlLElB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QUcsR0FBRyxhQUFhLEdBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLGFBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsYUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFFekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsR0FBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxHQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxHQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLEdBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLGFBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxZQUFhLEdBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLGFBQWEsR0FBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxZQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLGFBQWEsR0FBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxHQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxZQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLGFBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUV6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxHQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxZQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLGFBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsYUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxZQUFhLEdBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLGFBQWEsR0FBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxZQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxHQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLGFBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBRXpDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxZQUFhLEdBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsYUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxZQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLGFBQWEsR0FBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztB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WSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsV0FBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsV0FBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsV0FBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsV0FBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsV0FBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFNBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7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QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUM1RDtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFVBQUUsQ0FBQztBQUNsRSxjQUFJLE1BQU0sVUFBVSxPQUFPO0FBQUEsWUFDdkI7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUc7QUFBQSxZQUMzRDtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQzVEO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFDNUQ7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUMzRDtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFVBQUUsQ0FBQztBQUNuRSxjQUFJLE1BQU0sVUFBVSxPQUFPO0FBQUEsWUFDdEI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUM5RDtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQzNEO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFDM0Q7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUM5RDtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFdBQUc7QUFDbkUsY0FBSSxNQUFNLFVBQVUsT0FBTztBQUFBLFlBQ3ZCO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFDNUQ7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUMzRDtBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQzVEO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFDN0Q7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZ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QUFBQSxZQUFJO0FBQUEsWUFDNUI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDNUI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDNUI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDNUI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDNUI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDNUI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUE7QUFJaEMsY0FBSSxNQUFNO0FBQUEsWUFDTjtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDcEI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQ3BCO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUNwQjtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDcEI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQ3BCO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUNwQjtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDcEI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBO0FBSXhCLGNBQUksYUFBYSxDQUFDLEdBQUksR0FBSSxHQUFJLEdBQUksR0FBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFHaEYsY0FBSSxTQUFTO0FBQUEsWUFDVDtBQUFBLGNBQ0ksR0FBSztBQUFBLGNBQ0wsV0FBWTtBQUFBLGNBQ1osV0FBWTtBQUFBLGNBQ1osV0FBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osV0FBVztBQUFBLGNBQ1gsV0FBWTtBQUFBLGNBQ1osV0FBWTtBQUFBLGNBQ1osV0FBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osR0FBSztBQUFBLGNBQ0wsV0FBWTtBQUFBLGNBQ1osV0FBWTtBQUFBLGNBQ1osV0FBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osV0FBVztBQUFBLGNBQ1gsV0FBWTtBQUFBLGNBQ1osV0FBWTtBQUFBLGNBQ1osV0FBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBO1lBRWhCO0FBQUEsY0FDSSxHQUFLO0FBQUEsY0FDTCxVQUFXO0FBQUEsY0FDWCxVQUFXO0FBQUEsY0FDWCxVQUFXO0FBQUEsY0FDWCxVQUFXO0FBQUEsY0FDWCxVQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxTQUFVO0FBQUEsY0FDVixVQUFXO0FBQUEsY0FDWCxVQUFXO0FBQUEsY0FDWCxVQUFXO0FBQUEsY0FDWCxVQUFXO0FBQUEsY0FDWCxVQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFXO0FBQUEsY0FDWCxXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUEsY0FDWixXQUFZO0FBQUE7WUFFaEI7QUFBQSxjQUNJLEdBQUs7QUFBQSxjQUNMLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFFBQVM7QUFBQSxjQUNULFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQTtZQUVmO0FBQUEsY0FDSSxHQUFLO0FBQUEsY0FDTCxPQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxPQUFRO0FBQUEsY0FDUixPQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxTQUFTO0FBQUEsY0FDVCxTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUEsY0FDVixTQUFVO0FBQUE7WUFFZDtBQUFBLGNBQ0ksR0FBSztBQUFBLGNBQ0wsTUFBUTtBQUFBLGNBQ1IsTUFBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsTUFBTztBQUFBLGNBQ1AsTUFBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUTtBQUFBLGNBQ1IsT0FBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsT0FBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBO1lBRWI7QUFBQSxjQUNJLEdBQUs7QUFBQSxjQUNMLEtBQU87QUFBQSxjQUNQLEtBQU87QUFBQSxjQUNQLEtBQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLEtBQU07QUFBQSxjQUNOLEtBQU87QUFBQSxjQUNQLEtBQU87QUFBQSxjQUNQLEtBQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQTtZQUVaO0FBQUEsY0FDSSxHQUFLO0FBQUEsY0FDTCxJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixHQUFLO0FBQUEsY0FDTCxJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFNO0FBQUEsY0FDTixLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUEsY0FDUCxLQUFPO0FBQUE7WUFFWDtBQUFBLGNBQ0ksR0FBSztBQUFBLGNBQ0wsR0FBSztBQUFBLGNBQ0wsR0FBSztBQUFBLGNBQ0wsR0FBSztBQUFBLGNBQ0wsR0FBSztBQUFBLGNBQ0wsR0FBSztBQUFBLGNBQ0wsR0FBSztBQUFBLGNBQ0wsR0FBSztBQUFBLGNBQ0wsR0FBSztBQUFBLGNBQ0wsR0FBSztBQUFBLGNBQ0wsSUFBSztBQUFBLGNBQ0wsSUFBSztBQUFBLGNBQ0wsSUFBSztBQUFBLGNBQ0wsSUFBSztBQUFBLGNBQ0wsSUFBSztBQUFBLGNBQ0wsSUFBSztBQUFBLGNBQ0wsWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLGNBQ1osWUFBWTtBQUFBLFlBQ3pCO0FBQUE7QUFJSyxjQUFJLFlBQVk7QUFBQSxZQUNaO0FBQUEsWUFBWTtBQUFBLFlBQVk7QUFBQSxZQUFZO0FBQUEsWUFDcEM7QUFBQSxZQUFZO0FBQUEsWUFBWTtBQUFBLFlBQVk7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SyxFQUFFLENBQUMsS0FBTSxFQUFFLENBQUMsS0FBSyxLQUFPLEVBQUUsQ0FBQyxNQUFNLE9BQVMsRUFBRSxDQUFDLEtBQUssS0FBTyxFQUFFLENBQUMsTUFBTSxNQUFRO0FBQ2xGLGNBQUUsQ0FBQyxJQUFLLEVBQUUsQ0FBQyxLQUFNLEVBQUUsQ0FBQyxLQUFLLElBQU8sRUFBRSxDQUFDLE1BQU0sTUFBTyxFQUFFLENBQUMsSUFBSztBQUN4RCxjQUFFLENBQUMsSUFBSyxFQUFFLENBQUMsS0FBTSxFQUFFLENBQUMsS0FBSyxLQUFPLEVBQUUsQ0FBQyxNQUFNLE9BQVMsRUFBRSxDQUFDLEtBQUssS0FBTyxFQUFFLENBQUMsTUFBTSxNQUFRO0FBQ2xGLGNBQUUsQ0FBQyxJQUFLLEVBQUUsQ0FBQyxLQUFNLEVBQUUsQ0FBQyxLQUFLLElBQU8sRUFBRSxDQUFDLE1BQU0sTUFBTyxFQUFFLENBQUMsSUFBSztBQUN4RCxjQUFFLENBQUMsSUFBSyxFQUFFLENBQUMsS0FBTSxFQUFFLENBQUMsS0FBSyxLQUFPLEVBQUUsQ0FBQyxNQUFNLE9BQVMsRUFBRSxDQUFDLEtBQUssS0FBTyxFQUFFLENBQUMsTUFBTSxNQUFRO0FBQ2xGLGNBQUUsQ0FBQyxJQUFLLEVBQUUsQ0FBQyxLQUFNLEVBQUUsQ0FBQyxLQUFLLElBQU8sRUFBRSxDQUFDLE1BQU0sTUFBTyxFQUFFLENBQUMsSUFBSztBQUN4RCxjQUFFLENBQUMsSUFBSyxFQUFFLENBQUMsS0FBTSxFQUFFLENBQUMsS0FBSyxLQUFPLEVBQUUsQ0FBQyxNQUFNLE9BQVMsRUFBRSxDQUFDLEtBQUssS0FBTyxFQUFFLENBQUMsTUFBTSxNQUFRO0FBQ2xGLGNBQUUsQ0FBQyxJQUFLLEVBQUUsQ0FBQyxLQUFNLEVBQUUsQ0FBQyxLQUFLLElBQU8sRUFBRSxDQUFDLE1BQU0sTUFBTyxFQUFFLENBQUMsSUFBSztBQUFBLFVBQ2pFO0FBVUssWUFBRSxlQUFlLGFBQWEsY0FBYyxZQUFZO0FBQUEsUUFDN0QsR0FBRTtBQUdELGVBQU8sU0FBUztBQUFBLE1BRWpCLENBQUM7QUFBQTs7Ozs7Ozs7OztBQzdMQSxPQUFDLFNBQVUsTUFBTSxTQUFTLE9BQU87QUFDQTtBQUVoQyxpQkFBQSxVQUEyQixRQUFRZCxlQUFtQkcsb0JBQXlCQyxjQUFrQkcsaUJBQXFCQyxtQkFBd0I7QUFBQSxRQUNoSjtBQUFBLE1BU0EsR0FBRWIsVUFBTSxTQUFVLFVBQVU7QUFFM0IsU0FBQyxXQUFZO0FBRVQsY0FBSSxJQUFJO0FBQ1IsY0FBSSxRQUFRLEVBQUU7QUFDZCxjQUFJLGNBQWMsTUFBTTtBQUN4QixjQUFJLFNBQVMsRUFBRTtBQUVmLGdCQUFNLElBQUk7QUFHVixnQkFBTSxTQUFTO0FBQUEsWUFDWDtBQUFBLFlBQVk7QUFBQSxZQUFZO0FBQUEsWUFBWTtBQUFBLFlBQ3BDO0FBQUEsWUFBWTtBQUFBLFlBQVk7QUFBQSxZQUFZO0FBQUEsWUFDcEM7QUFBQSxZQUFZO0FBQUEsWUFBWTtBQUFBLFlBQVk7QUFBQSxZQUNwQztBQUFBLFlBQVk7QUFBQSxZQUFZO0FBQUEsWUFBWTtBQUFBLFlBQ3BDO0FBQUEsWUFBWTtBQUFBO0FBR2hCLGdCQUFNLFNBQVM7QUFBQSxZQUNYO0FBQUEsY0FBSTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLFlBQVU7QUFBQSxZQUNsRDtBQUFBLGNBQUk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxZQUFVO0FBQUEsWUFDbEQ7QUFBQSxjQUFJO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsWUFBVTtBQUFBLFlBQ2xEO0FBQUEsY0FBSTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtB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Q0EsaUJBQWlCO0FBQ2hCLGVBQVMsY0FBYyxJQUFJLFlBQVlHLHNCQUFxQiw2QkFBNkIsRUFBRSxRQUFRO0FBQUEsUUFDbEcsbUJBQW1CLEtBQUs7QUFBQSxRQUN4QixXQUFXLEtBQUs7QUFBQSxNQUNuQixFQUFHLENBQUUsQ0FBQztBQUNKLGFBQU8sWUFBWTtBQUFBLFFBQ2xCLE1BQU1BLHNCQUFxQjtBQUFBLFFBQzNCLG1CQUFtQixLQUFLO0FBQUEsUUFDeEIsV0FBVyxLQUFLO0FBQUEsTUFDbkIsR0FBSyxHQUFHO0FBQUEsSUFDUDtBQUFBLElBQ0EseUJBQXlCLE9BQU87QUFDL0IsWUFBTSxzQkFBc0IsTUFBTSxRQUFRLHNCQUFzQixLQUFLO0FBQ3JFLFlBQU0sYUFBYSxNQUFNLFFBQVEsY0FBYyxLQUFLO0FBQ3BELGFBQU8sdUJBQXVCLENBQUM7QUFBQSxJQUNoQztBQUFBLElBQ0Esd0JBQXdCO0FBQ3ZCLFlBQU0sS0FBSyxDQUFDLFVBQVU7QUFDckIsWUFBSSxFQUFFLGlCQUFpQixnQkFBZ0IsQ0FBQyxLQUFLLHlCQUF5QixLQUFLLEVBQUc7QUFDOUUsYUFBSyxrQkFBaUI7QUFBQSxNQUN2QjtBQUNBLGVBQVMsaUJBQWlCQSxzQkFBcUIsNkJBQTZCLEVBQUU7QUFDOUUsV0FBSyxjQUFjLE1BQU0sU0FBUyxvQkFBb0JBLHNCQUFxQiw2QkFBNkIsRUFBRSxDQUFDO0FBQUEsSUFDNUc7QUFBQSxFQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwyMCwyMSwyMiwyMywyNCwyNSwyNiwyNywyOCwyOSwzMCwzMSwzMiwzMywzNCwzNSwzNiwzNyw0MSw0Miw0Myw0NCw0NSw0Nl19
content;