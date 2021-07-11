import Cookie from '../cookie'
const ls = window.localStorage
const localStore = {
    get: function(key: string) {
        return ls ? ls.getItem(key) : Cookie.get(key)
    },
    /*赋值*/
    set: function(key: string, data: any) {
        try { //隐私模式异常
            ls ? ls.setItem(key, data) : Cookie.set(key, data)
        } catch (e) {
            console.log(e);
        }
    },
    /*删除*/
    remove: function(key: string) {
        ls ? ls.removeItem(key) : Cookie.del(key)
    },
    /* [慎用] 清除所有的key/value*/
    clear: function() {
        return ls && ls.clear();
    }
}

export default localStore;