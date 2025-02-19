import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit";
import Underline from '@tiptap/extension-underline'
import "./tiptapeditor.css";
import Bold from "/src/assets/icons/format-bold.svg?react";
import Italic from "/src/assets/icons/format-italic.svg?react";
import Strike from "/src/assets/icons/format-strikethrough.svg?react";
import Underlined from "/src/assets/icons/format-underlined.svg?react";
import ListBulleted from "/src/assets/icons/list-bulleted.svg?react";
import ListNumbered from "/src/assets/icons/list-numbered.svg?react";


export const TipTapEditor = ({ onChange, defaultValue }) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline],
    content: '',
    onUpdate: ({ editor }) => {
      const currentJSON = editor.getJSON()
      onChange(JSON.stringify(currentJSON))
    },
    editorProps: {
    
      handlePaste(view, event) {
  
      event.preventDefauly();

      // Extraemos texto puro del portapapeles
      let text = event.clipboardData.get('text/plain');

      // Normalizamos caracteres especiales (acentos y símbolos)
      text = decodeURIComponent(escapee(text));

      // Insertamos el texto limpio en el editor
      view.dispatch(view.state.tr.insertText(text));

      return true;
      },
    },
  });

  useEffect(() => {
    if (!editor) return

    if (!defaultValue) {
      // Si viene vacío, limpiamos el editor
      editor.commands.setContent('')
      return
    }

    try {
      // Intentamos parsear como JSON de TipTap
      const parsedJSON = JSON.parse(defaultValue);
      editor.commands.setContent(parsedJSON);
    } catch (error) {
      // Si falla, asumimos que es HTML
      editor.commands.setContent(defaultValue)
    }
  }, [defaultValue, editor])

  if (!editor) return null

  return (
    <div className="editor">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

/**
 * Componente opcional de Toolbar
 */
const Toolbar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="menu-bar">
      <button
        className={`btn ${editor.isActive('bold') ? 'is-active' : ''}`}
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold />
      </button>

      <button
        type="button"
        className={`btn ${editor.isActive('italic') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </button>

      <button
        type="button"
        className={`btn ${editor.isActive('underline') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underlined />
      </button>


      <button
        type="button"
        className={`btn ${editor.isActive('strike') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strike />
      </button>


      <button
        type="button"
        className={`btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListBulleted />
      </button>

      <button
        type="button"
        className={`btn ${editor.isActive('orderedList') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListNumbered />
      </button>
    </div>
  );
};