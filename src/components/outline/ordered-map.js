export default class OrderedMap {
  constructor() {
    this._order = [];
    this._items = new Map();
  }

  has(key) {
    return this._items.has(key);
  }

  get(key) {
    return this._items.get(key);
  }

  delete(key) {
    const index = this._order.indexOf(key);
    if (index > -1) {
      this._order.splice(index, 1);
    }

    return this._items.delete(key);
  }

  set(key, value, after = null) {
    if (!this.has(key)) {
      const index = this._order.indexOf(after);
      if (index > -1) {
        this._order.splice(index + 1, 0, key);
      }
      else {
        this._order.push(key);
      }

      this._items.set(key, value);
      return true;
    }

    const current = this.get(key);
    if (value.some((value, index) => value !== current[index])) {
      this._items.set(key, value);
      return true;
    }

    return false;
  }

  get output() {
    let current = 0;
    const output = [ [] ];

    for (const key of this._order) {
      const [ level, name ] = this.get(key);

      while (current < level) {
        current++;
        const next = [];
        output[output.length - 1].push(next);
        output.push(next);
      }
      while (current > level) {
        output.pop();
        current--;
      }

      output[output.length - 1].push(name);
    }

    return output[0];
  }
}
