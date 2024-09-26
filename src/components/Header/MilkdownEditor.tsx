import React, { useEffect } from 'react';
import { Editor, rootCtx } from '@milkdown/core';
import { Milkdown, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';
import '@milkdown/theme-nord/style.css'; // Import the theme CSS

const MilkdownEditor: React.FC = () => {
    const { loading, editor } = useEditor((root) => {
        console.log('Creating editor instance...');
        
        return Editor.make()
            .config((ctx) => {
                // Set the root context for the editor
                ctx.set(rootCtx, root);
                console.log('Root context set:', root);
            })
            .use(commonmark) // Add commonmark preset
            .config(nord); // Apply Nord theme
    });

    useEffect(() => {
        if (loading) {
            console.log('Editor is still loading...');
        } else if (editor) {
            console.log('Editor loaded successfully:', editor);
        } else {
            console.log('Editor failed to load');
        }
    }, [loading, editor]);

    if (loading) return <div>Loading editor...</div>;
    if (!editor) return <div>Editor failed to load</div>;

    return (
        <div style={{ border: '1px solid gray', padding: '10px' }}>
            <Milkdown />
        </div>
    );
};

export default MilkdownEditor;
