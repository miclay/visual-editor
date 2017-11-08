/**
 * VisualEditor
 */

import 'styles/editor.less';

import htmlFormator from 'pretty';

import {
  insertAfter,
} from 'scripts/dom';
import {
  addEvent,
} from 'scripts/event';

class Editor {
  constructor(options = {}) {
    const defaultOpts = {
      domTextarea: null,
    };
    this.opts = defaultOpts;
    for (const key in options) {
      this.opts[key] = options[key];
    }
    this.init();
  }

  init() {
    const opts = this.opts;
    if (!opts.domTextarea) {
      console.error('VisualEditor实例化失败：缺少有效的domTextarea参数');
      return false;
    }

    opts.domTextarea.style.display = 'none';

    this.initValue = opts.domTextarea.value || '';

    this.value = this.initValue;

    this.render((box) => {
      this.domEditorOuterBox = box;
      this.domInputSource = box.querySelector('.J_visualEditorSource');
      this.domToolbarBox = box.querySelector('.J_visualEditorToolbar');
      this.domInputView = box.querySelector('.J_visualEditorContainer');
      this.domLinkEditorPopup = box.querySelector('.J_visualEditorLinkPop');

      this.initDataRender();
      this.addEvents();
    });
  }

  initDataRender() {
    this.domInputSource.value = this.initValue;
    this.domInputView.innerHTML = this.initValue;
  }

  addEvents() {
    this.eventOnSourceEdit();
    this.eventOnViewEdit();
    this.eventOnViewClick();
  }

  eventOnSourceEdit() {
    const onSourceEdit = () => {
      this.value = this.domInputSource.value;
      this.updateView();
    };

    this.domInputSource.oninput = (e) => {
      console.log(e);
      onSourceEdit();
    };

    this.domInputSource.onpropertychange = (e) => {
      console.log(e);
      onSourceEdit();
    };
  }

  eventOnViewEdit() {
    this.domInputView.oninput = (e) => {
      this.value = this.domInputView.innerHTML || '';
      this.updateSource();
    };
  }

  eventOnViewClick() {
    addEvent(this.domInputView, 'click', (e) => {
      console.log(e);
      const domTarget = e.target;
      const tagName = domTarget.tagName.toLowerCase();
      if (tagName === 'a') {
        this.openLinkEditor(domTarget, 'href');
      } else if (tagName === 'img') {
        this.openLinkEditor(domTarget, 'src');
      }
    });
  }

  openLinkEditor(dom, attrName) {
    if (!dom) {
      return false;
    }
    const link = dom.getAttribute(attrName);
    console.log(link);
    this.domLinkEditorPopup.style.display = '';
  }

  closeLinkEditor() {
    this.domLinkEditorPopup.style.display = 'none';
  }

  updateView() {
    this.domInputView.innerHTML = this.value;
  }

  updateSource() {
    this.domInputSource.value = htmlFormator(this.value);
  }

  render(cb = () => {}) {
    const domVE = document.querySelector('.visual-editor');
    cb(domVE);
  }

  static create(options) {
    return new Editor(options);
  }
}

export const VisualEditor = Editor;

export default VisualEditor;
