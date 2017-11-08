/**
 * main
 */

import './index.less';

import VisualEditor from 'scripts/editor';

const editor = VisualEditor.create({
  domTextarea: document.getElementById('J_visualEditorInit'),
});

console.log('editor', editor);
