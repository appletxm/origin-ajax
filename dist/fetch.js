import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
var Fetch = function () {
  function Fetch() {
    _classCallCheck(this, Fetch);
  }

  _createClass(Fetch, [{
    key: "doFetch",
    value: function doFetch(url, options) {
      return fetch(url, options);
    }
  }, {
    key: "compatiable",
    value: function compatiable() {}
  }]);

  return Fetch;
}();

export default Fetch;