

export class AppContext {
  // 20210209, 禁止直接使用 account 和 PROJECT /////////////////
  // Not use static,closure,global patten it may be memory leak
  static account = 'na'; //隱式的相依
  static PROJECT = 'phxs:publisher'; //隱式的相依
  ////////////////////////////////////////////////////////////

  /**
   * 初始 app 设置，应在 auth_guard-v2  或 在 app.component 中使用
   *
   * @static
   * @param {string} [_project='x6']
   * @param {string} [_account='na']
   * @memberof AppContext
   */
  static init(_project: string = 'pub', _account: string = 'na') {
    AppContext.PROJECT = _project;
    AppContext.account = _account;

    console.log(`inited app context:${AppContext.PROJECT}`);
  }

  static fromSession(itemKey: string): string {
    const list:any = this.getProjectCache("GENERAL_SESSION_KEY");
    if (!list) {
      return '';
    }
    const g = list.find((x: { item_key: string; }) => x.item_key.toUpperCase() === itemKey.toUpperCase());
    if (!g || !g.item_value) {
      return '';
    }
    return g.item_value;
  }

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 讀取緩存
  /**
   * 从 Project 级会话取资料
   *
   * @static
   * @template T
   * @param {string} key
   * @return {*}  {T}
   * @memberof AppContext
   */
  static getSession<T>(key: string): T | null {
    const prefix = `awt:${AppContext.PROJECT}:`;
    let data: T | null = null;
    const storage = window.sessionStorage;
    if (storage) {
      const str: string | null = storage.getItem(prefix + key);
      if (str != null && str.length > 0) {
        try {
          data = <T>JSON.parse(str);
        } catch (error) {
          data = null;
        }
      }
    }
    return data;
  }

  /**
   * 将资料储存到 Project 级会话
   *
   * @static
   * @param {string} key
   * @param {*} val
   * @memberof AppContext
   */
  static setSession(key: string, val: any): void {
    const prefix = `awt:${AppContext.PROJECT}:`;
    const storage = window.sessionStorage;
    if (storage) {
      storage.setItem(prefix + key, JSON.stringify(val));
    }
  }

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 讀取緩存
  /**
   * 从 用户 级缓存取资料
   *
   * @static
   * @template T
   * @param {string} key
   * @return {*}  {T}
   * @memberof AppContext
   */
  static getCache<T>(key: string): T | null {

    const prefix = `awt:${AppContext.PROJECT}:${AppContext.account}:`;
    let data: T | null = null;
    const storage = window.localStorage;
    if (storage) {
      const str: string | null = storage.getItem(prefix + key);
      if (str != null && str.length > 0) {
        try {
          data = <T>JSON.parse(str);
        } catch (error) {
          data = null;
        }
      }
    }
    return data;
  }

  /**
   * 将资料储存到 用户 级缓存
   *
   * @static
   * @param {string} key
   * @param {*} val
   * @memberof AppContext
   */
  static setCache(key: string, val: any): void {
    const prefix = `awt:${AppContext.PROJECT}:${AppContext.account}:`;
    const storage = window.localStorage;
    if (storage) {
      storage.setItem(prefix + key, JSON.stringify(val));
    }
  }

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 讀取緩存
  /**
   * 从 Project 级的缓存取资料
   *
   * @static
   * @template T
   * @param {string} key
   * @return {*}  {T}
   * @memberof AppContext
   */
  static getProjectCache<T>(key: string): T | null {

    const prefix = `awt:${AppContext.PROJECT}:`;
    let data: T | null = null;
    const storage = window.localStorage;
    if (storage) {
      const str: string | null = storage.getItem(prefix + key);
      if (str != null && str.length > 0) {
        try {
          data = <T>JSON.parse(str);
        } catch (error) {
          data = null;
        }
      }
    }
    return data;
  }

  /**
   * 将资料储存到 Project 级的缓存
   *
   * @static
   * @param {string} key
   * @param {*} val
   * @memberof AppContext
   */
  static setProjectCache(key: string, val: any): void {
    const prefix = `awt:${AppContext.PROJECT}:`;
    const storage = window.localStorage;
    if (storage) {
      storage.setItem(prefix + key, JSON.stringify(val));
    }
  }

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}
