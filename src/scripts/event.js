
/**
 * 添加事件绑定
 * @param  {[type]}   dom       [description]
 * @param  {String}   eventName [description]
 * @param  {Function} fn        [description]
 * @return {[type]}             [description]
 */
export const addEvent = (dom = null, eventName = '', fn = () => {})=>{
  if (!dom || !eventName) { return false; }
  if (dom.addEventListener) {
    dom.addEventListener(eventName, fn, true);
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + eventName, fn);
  }
};

/**
 * 移除事件绑定
 * @param  {[type]}   dom [description]
 * @param  {String}   ev  [description]
 * @param  {Function} fn  [description]
 */
export const removeEvent = (dom = null, eventName = '', fn = () => {})=>{
  if (!dom || !eventName) { return false; }
  if (dom.removeEventListener) {
    dom.removeEventListener(eventName, fn, true);
  } else if (dom.detachEvent) {
    dom.detachEvent('on' + eventName, fn);
  }
};