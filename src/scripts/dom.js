/**
 * 相关DOM操作
 */

/**
 * 在目标节点后面插入新节点
 * @param  {[type]} targetElement [description]
 * @param  {[type]} newElement    [description]
 * @return {[type]}               [description]
 */
export const insertAfter = (targetElement, newElement)=>{
  const parent = targetElement.parentNode;
  if (parent.lastChild === targetElement) {
    parent.appendChild(newElement);
  }else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
};

/**
 * 删除一个节点
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
export const removeElement = (element)=>{
  const parentElement = element.parentNode;
  if(parentElement){
    parentElement.removeChild(element);  
  }
};
