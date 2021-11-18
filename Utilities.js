require('dotenv').config()
const { execSync } = require('child_process')
class Utilities {
  _$ = (require("cheerio")).load;
  _slice(v) {
    return Object.values(v).slice(0, v.length);
  }
  curl(url) {
    return execSync(`curl -LsSf ${url} -A "${this.userAgent ?? process.env.USER_AGENT}" -o -`).toString();
  }
  dateFormat(d) {
    d = new Date(d);
    return [this.getFullYear(d), this.getMonth(d), this.getDate(d)].join('-');
  }
  yester(dataTime) {
    return this.dateFormat(new Date(Date.parse(dataTime) - (this._24HoursInMillis = 86400000)));
  }
  nowDate() {
    return new Date(this.dateFormat(new Date()));
  }
  dateCheck(d) {
    const dateNow = this.nowDate();
    const dateYester = this.yester(dateNow);
    const monthDateNow = this.getMonthDate(dateNow);
    const monthDateYester = this.getMonthDate(dateYester);
    const monthDate = this.getMonthDate(d);
    switch (monthDate) {
      case monthDateNow:
        return `${this.getFullYear(dateNow)}-${monthDateNow}`;
      case monthDateYester:
        return `${this.getFullYear(dateYester)}-${monthDateYester}`;
      default:
        return null;
    }
  }
  getMonth(d) {
    d = '' + (new Date(d).getMonth() + 1);
    return (d.length < 2) ? ('0' + d) : d;
  }
  getDate(d) {
    d = '' + (new Date(d).getDate());
    return (d.length < 2) ? ('0' + d) : d;
  }
  getMonthDate(d) {
    return `${this.getMonth(d)}-${this.getDate(d)}`;
  }
  getFullYear(d) {
    return new Date(d).getFullYear();
  }
  newDate() {
    return this.dateFormat(new Date());
  }
  isType(variable, variable_type) {
    return !(typeof variable != variable_type);
  }
  html(DOM) {
    return this._$(DOM.html());
  }
  innerFind(DOM, ...selectors) {
    selectors = selectors ? (this.isType(selectors[0], 'string')
      ? selectors
      : selectors[0]) : undefined;
    const _ = this.html(DOM);
    return selectors.length ? this.innerFind(_(selectors[0]), selectors.slice(1, selectors.length)) : _;
  }
  entries(a) {
    return Object.entries(a);
  }
  filterIncludesKeys(a, b) {
    return Object.keys(a).filter((_) => (b.includes(_)))
  }
  filterIncludesValues(a, b) {
    return Object.values(a).filter((_) => (b.includes(_)))
  }
  includesNumber(t) {
    return t.match(/[\d]/);
  }
  includesAlphabet(t) {
    return t.match(/[A-Za-z]/);
  }
  includesHangul(t) {
    return t.match(/[가-힣ㄱ-ㅎㅏ-ㅣ]/);
  }
  deleteNumber(t) {
    return t.replaceAll(/[\d]/g, "");
  }
  deleteAlphabet(t) {
    return t.replaceAll(/[A-Za-z]/g, "");
  }
  deleteHangul(t) {
    return t.replaceAll(/[가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");
  }
  filterNumber(t) {
    return t.replaceAll(/[^\d]/g, "");
  }
  filterAlphabet(t) {
    return t.replaceAll(/[^A-Za-z]/g, "");
  }
  filterHangul(t) {
    return t.replaceAll(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");
  }
  isNumberOnly(t) {
    return t == this.filterNumber(t);
  }
}
module.exports = Utilities;