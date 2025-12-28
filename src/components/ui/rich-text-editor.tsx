import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';

/**
 * RichTextEditor Component
 * 
 * A rich text editor component built with React Quill that allows teachers and principals
 * to format question text with bold, italic, underline, lists, headers, and more.
 * 
 * Features:
 * - Text formatting (bold, italic, underline, strikethrough)
 * - Headers (H1, H2, H3)
 * - Lists (ordered and unordered)
 * - Subscript and superscript
 * - Text color and background color
 * - Text alignment
 * - Links and images
 * - Clean formatting option
 * 
 * Usage:
 * ```tsx
 * <RichTextEditor
 *   value={formData.question_text}
 *   onChange={(value) => setFormData({ ...formData, question_text: value })}
 *   placeholder="Enter question text with formatting..."
 * />
 * ```
 * 
 * To display formatted content:
 * ```tsx
 * <div 
 *   className="question-content"
 *   dangerouslySetInnerHTML={{ __html: question.question_text }}
 * />
 * ```
 */

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Enter text...',
  className,
  id,
}: RichTextEditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    // Apply custom styles to the Quill editor
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const toolbar = editor.getModule('toolbar');
      if (toolbar) {
        const container = toolbar.container;
        if (container) {
          container.style.borderTopLeftRadius = '8px';
          container.style.borderTopRightRadius = '8px';
        }
      }
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'script',
    'indent',
    'color',
    'background',
    'align',
    'link',
    'image',
  ];

  return (
    <div className={cn('rich-text-editor-wrapper', className)} id={id}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-background"
      />
    </div>
  );
}
