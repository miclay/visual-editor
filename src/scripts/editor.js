/**
 * VisualEditor
 */

import 'styles/editor.less';

import htmlFormator from 'pretty';

import {
  insertAfter,
  removeElement,
} from 'scripts/dom';
import {
  addEvent,
} from 'scripts/event';

import htmlMinify from 'scripts/htmlmin';

class Editor {
  constructor(options = {}) {
    const defaultOpts = {
      domTextarea: null,
      fieldName: 'veditor',
    };

    if (defaultOpts.domTextarea && defaultOpts.domTextarea.getAttribute && defaultOpts.domTextarea.getAttribute('name')) {
      defaultOpts.fieldName = defaultOpts.domTextarea.getAttribute('name');
    }

    this.opts = {};
    for (const key in defaultOpts) {
      this.opts[key] = defaultOpts[key];
    }
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

    this.initValue = htmlFormator(opts.domTextarea.value || '');
    this.value = this.initValue;
    this.minValue = htmlMinify(this.value);

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
    this.domInputSource.value = this.value;
    this.domInputView.innerHTML = this.minValue;
  }

  addEvents() {
    this.eventOnSourceEdit();
    this.eventOnViewEdit();
    this.eventOnViewClick();
  }

  eventOnSourceEdit() {
    const onSourceEdit = () => {
      this.value = htmlFormator(this.domInputSource.value);
      this.minValue = htmlMinify(this.value);
      this.domInputView.innerHTML = this.value;
    };

    this.domInputSource.oninput = (e) => {
      onSourceEdit();
    };

    this.domInputSource.onpropertychange = (e) => {
      onSourceEdit();
    };
  }

  eventOnViewEdit() {
    this.domInputView.oninput = (e) => {
      this.value = htmlFormator(this.domInputView.innerHTML);
      this.minValue = htmlMinify(this.value);
      this.domInputSource.value = this.value;
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

  render(cb = () => {}) {
    const opts = this.opts;

    const domVE = document.createElement('div');
    domVE.className = 'visual-editor';
    domVE.innerHTML = '\
      <input class="J_visualEditorValue" type="hidden" name="' + opts.fieldName + '">\
      <textarea class="visual-editor-source J_visualEditorSource"></textarea>\
      <div class="visual-editor-view J_visualEditorView">\
        <div class="visual-editor-link-pop J_visualEditorLinkPop">\
          <label>链接地址：</label>\
          <input type="text" class="visual-editor-input J_visualEditorInput" placeholder="http://" />\
          <button>确定</button>\
        </div>\
        <div class="visual-editor-toolbar J_visualEditorToolbar"></div>\
        <div class="visual-editor-con J_visualEditorContainer" contenteditable></div>\
      </div>\
    ';

    insertAfter(opts.domTextarea, domVE);
    removeElement(opts.domTextarea);

    cb(domVE);
  }

  getValue() {
    return this.value;
  }

  getMinValue() {
    return this.minValue;
  }

  static create(options) {
    return new Editor(options);
  }
}

export const VisualEditor = Editor;

export default VisualEditor;
