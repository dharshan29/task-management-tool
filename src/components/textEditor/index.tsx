'use client'

import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from 'next/image';
import BoldIcon from '@/assets/icons/B.svg'
import ItalicIcon from '@/assets/icons/I.svg'
import StrikethroughIcon from '@/assets/icons/S.svg'
import ListOrdered from '@/assets/icons/ordered.svg'
import ListUnOrdered from '@/assets/icons/unordered.svg'
import './style.css'
import { useState } from 'react';

interface TextEditorProps {
  content: string;
  handleChange: (newContent: string) => void;
}

const MAX_CHARACTERS = 300;

const TextEditor: React.FC<TextEditorProps> = ({ content, handleChange }) => {
    const [charCount, setCharCount] = useState(content.length);
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
        attributes: {
          class: 'custom-editor', 
        },
    },
    onUpdate({ editor }) {
        const text = editor.getText(); 

        if (text.length > MAX_CHARACTERS) {
          // Trim excess text while keeping formatting
          editor.commands.undo();
        } else {
          setCharCount(text.length);
          handleChange(editor.getHTML());
        }
    },
    content: content,
  })

  return (
    <Stack 
        tabIndex={0} 
        sx={{
            border: "1px solid #00000021",
            borderRadius: '8px',
            background: "#F1F1F15C",
            padding: "0px 8px 10px 8px",
            minHeight: '130px',
            justifyContent: 'space-between',
            "&:hover": {
                border: "1px solid black", 
            },
            "&:focus-within": {
                border: "2px solid black", 
            }
        }}
    >
        <EditorContent      
            editor={editor} 
        />
        <Stack sx={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Stack sx={{flexDirection: 'row', gap: '4px', alignItems: 'center'}}>
                <IconButton onClick={(e) => {
                        e.preventDefault();
                        if (editor) { 
                            editor.chain().focus().toggleBold().run();
                        }
                    }}
                    sx={{
                        backgroundColor: editor?.isActive('bold') ? '#7B1984' : 'inherit',
                        borderRadius: '4px'
                    }}
                >
                    <Image src={BoldIcon} alt='bold' />
                </IconButton>
                <IconButton
                sx={{
                    backgroundColor: editor?.isActive('italic') ? '#7B1984' : 'inherit',
                    borderRadius: '4px'
                }}
                onClick={(e) => {
                    e.preventDefault();
                    if (editor) { 
                        editor.chain().focus().toggleItalic().run();
                    }
                }}>
                    <Image src={ItalicIcon} alt='italic' />
                </IconButton>
                <IconButton 
                sx={{
                    backgroundColor: editor?.isActive('strike') ? '#7B1984' : 'inherit',
                    borderRadius: '4px'
                }}
                onClick={(e) => {
                    e.preventDefault();
                    if (editor) { 
                        editor.chain().focus().toggleStrike().run();
                    }
                }}>
                    <Image src={StrikethroughIcon} alt='strike' />
                </IconButton>
                <Divider orientation="vertical"  sx={{height : '18px', bgcolor: theme => theme.palette.black[100_10]}}/>
                <IconButton 
                sx={{
                    backgroundColor: editor?.isActive('orderedList') ? '#7B1984' : 'inherit',
                    borderRadius: '4px'
                }}
                onClick={(e) => {
                    e.preventDefault();
                    if (editor) { 
                        editor.chain().focus().toggleOrderedList().run();
                    }
                }}>
                    <Image src={ListOrdered} alt='order' />
                </IconButton>
                <IconButton 
                sx={{
                    backgroundColor: editor?.isActive('bulletList') ? '#7B1984' : 'inherit',
                    borderRadius: '4px'
                }}
                onClick={(e) => {
                    e.preventDefault();
                    if (editor) { 
                        editor.chain().focus().toggleBulletList().run();
                    }
                }}>
                    <Image src={ListUnOrdered} alt='unorder' />
                </IconButton>
            </Stack>
            <Typography variant='caption' sx={{color: theme => theme.palette.black[200]}}>
                {charCount}/{MAX_CHARACTERS} characters
            </Typography>
        </Stack>
    </Stack>
  )
}

export default TextEditor