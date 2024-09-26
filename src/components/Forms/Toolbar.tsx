const Toolbar: React.FC = ({ editor }) => {
    if (!editor) {
      return null;
    }
  
    return (
    <div className="menu-bar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        Blockquote
      </button>
      <button onClick={() => editor.chain().focus().setParagraph().run()}>
        Paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        Heading 2
      </button>
      <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()}>
        Insert Table
      </button>
    </div>
  );
  };
  export default Toolbar;