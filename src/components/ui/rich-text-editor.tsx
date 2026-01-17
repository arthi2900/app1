import { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';

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
 * - Mathematical and science symbols
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

// Mathematical and Science Symbols organized by category
const MATH_SYMBOLS = {
  arithmetic: [
    { symbol: '÷', label: 'Division (÷)' },
    { symbol: '×', label: 'Multiplication (×)' },
    { symbol: '±', label: 'Plus-Minus (±)' },
    { symbol: '∓', label: 'Minus-Plus (∓)' },
    { symbol: '√', label: 'Square Root (√)' },
    { symbol: '∛', label: 'Cube Root (∛)' },
    { symbol: '∜', label: 'Fourth Root (∜)' },
    { symbol: '∞', label: 'Infinity (∞)' },
  ],
  comparison: [
    { symbol: '≠', label: 'Not Equal (≠)' },
    { symbol: '≈', label: 'Approximately (≈)' },
    { symbol: '≡', label: 'Identical (≡)' },
    { symbol: '≤', label: 'Less Than or Equal (≤)' },
    { symbol: '≥', label: 'Greater Than or Equal (≥)' },
    { symbol: '≪', label: 'Much Less Than (≪)' },
    { symbol: '≫', label: 'Much Greater Than (≫)' },
  ],
  algebra: [
    { symbol: '∑', label: 'Summation (∑)' },
    { symbol: '∏', label: 'Product (∏)' },
    { symbol: '∫', label: 'Integral (∫)' },
    { symbol: '∂', label: 'Partial Derivative (∂)' },
    { symbol: '∆', label: 'Delta (∆)' },
    { symbol: '∇', label: 'Nabla (∇)' },
  ],
  geometry: [
    { symbol: '°', label: 'Degree (°)' },
    { symbol: '∠', label: 'Angle (∠)' },
    { symbol: '⊥', label: 'Perpendicular (⊥)' },
    { symbol: '∥', label: 'Parallel (∥)' },
    { symbol: '△', label: 'Triangle (△)' },
    { symbol: '□', label: 'Square (□)' },
    { symbol: '○', label: 'Circle (○)' },
    { symbol: '⌀', label: 'Diameter (⌀)' },
  ],
  greek: [
    { symbol: 'α', label: 'Alpha (α)' },
    { symbol: 'β', label: 'Beta (β)' },
    { symbol: 'γ', label: 'Gamma (γ)' },
    { symbol: 'δ', label: 'Delta (δ)' },
    { symbol: 'ε', label: 'Epsilon (ε)' },
    { symbol: 'θ', label: 'Theta (θ)' },
    { symbol: 'λ', label: 'Lambda (λ)' },
    { symbol: 'μ', label: 'Mu (μ)' },
    { symbol: 'π', label: 'Pi (π)' },
    { symbol: 'σ', label: 'Sigma (σ)' },
    { symbol: 'φ', label: 'Phi (φ)' },
    { symbol: 'ω', label: 'Omega (ω)' },
    { symbol: 'Ω', label: 'Omega Capital (Ω)' },
  ],
  physics: [
    { symbol: '℃', label: 'Celsius (℃)' },
    { symbol: '℉', label: 'Fahrenheit (℉)' },
    { symbol: 'Å', label: 'Angstrom (Å)' },
    { symbol: 'ℏ', label: 'Planck Constant (ℏ)' },
    { symbol: '⊕', label: 'Earth (⊕)' },
    { symbol: '⊗', label: 'Tensor Product (⊗)' },
  ],
  chemistry: [
    { symbol: '⇌', label: 'Equilibrium (⇌)' },
    { symbol: '→', label: 'Reaction Arrow (→)' },
    { symbol: '←', label: 'Reverse Arrow (←)' },
    { symbol: '↑', label: 'Gas Evolution (↑)' },
    { symbol: '↓', label: 'Precipitate (↓)' },
  ],
  fractions: [
    { symbol: '½', label: 'One Half (½)' },
    { symbol: '⅓', label: 'One Third (⅓)' },
    { symbol: '⅔', label: 'Two Thirds (⅔)' },
    { symbol: '¼', label: 'One Quarter (¼)' },
    { symbol: '¾', label: 'Three Quarters (¾)' },
    { symbol: '⅕', label: 'One Fifth (⅕)' },
    { symbol: '⅖', label: 'Two Fifths (⅖)' },
    { symbol: '⅗', label: 'Three Fifths (⅗)' },
    { symbol: '⅘', label: 'Four Fifths (⅘)' },
    { symbol: '⅙', label: 'One Sixth (⅙)' },
    { symbol: '⅚', label: 'Five Sixths (⅚)' },
    { symbol: '⅛', label: 'One Eighth (⅛)' },
    { symbol: '⅜', label: 'Three Eighths (⅜)' },
    { symbol: '⅝', label: 'Five Eighths (⅝)' },
    { symbol: '⅞', label: 'Seven Eighths (⅞)' },
  ],
  superscripts: [
    { symbol: '⁰', label: 'Superscript 0 (⁰)' },
    { symbol: '¹', label: 'Superscript 1 (¹)' },
    { symbol: '²', label: 'Superscript 2 (²)' },
    { symbol: '³', label: 'Superscript 3 (³)' },
    { symbol: '⁴', label: 'Superscript 4 (⁴)' },
    { symbol: '⁵', label: 'Superscript 5 (⁵)' },
    { symbol: '⁶', label: 'Superscript 6 (⁶)' },
    { symbol: '⁷', label: 'Superscript 7 (⁷)' },
    { symbol: '⁸', label: 'Superscript 8 (⁸)' },
    { symbol: '⁹', label: 'Superscript 9 (⁹)' },
    { symbol: '⁺', label: 'Superscript Plus (⁺)' },
    { symbol: '⁻', label: 'Superscript Minus (⁻)' },
    { symbol: '⁼', label: 'Superscript Equals (⁼)' },
    { symbol: '⁽', label: 'Superscript Left Paren (⁽)' },
    { symbol: '⁾', label: 'Superscript Right Paren (⁾)' },
  ],
  subscripts: [
    { symbol: '₀', label: 'Subscript 0 (₀)' },
    { symbol: '₁', label: 'Subscript 1 (₁)' },
    { symbol: '₂', label: 'Subscript 2 (₂)' },
    { symbol: '₃', label: 'Subscript 3 (₃)' },
    { symbol: '₄', label: 'Subscript 4 (₄)' },
    { symbol: '₅', label: 'Subscript 5 (₅)' },
    { symbol: '₆', label: 'Subscript 6 (₆)' },
    { symbol: '₇', label: 'Subscript 7 (₇)' },
    { symbol: '₈', label: 'Subscript 8 (₈)' },
    { symbol: '₉', label: 'Subscript 9 (₉)' },
    { symbol: '₊', label: 'Subscript Plus (₊)' },
    { symbol: '₋', label: 'Subscript Minus (₋)' },
    { symbol: '₌', label: 'Subscript Equals (₌)' },
    { symbol: '₍', label: 'Subscript Left Paren (₍)' },
    { symbol: '₎', label: 'Subscript Right Paren (₎)' },
  ],
};

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
  const previousValueRef = useRef<string>(value);
  const [symbolsOpen, setSymbolsOpen] = useState(false);

  const insertSymbol = (symbol: string) => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const range = editor.getSelection();
      if (range) {
        editor.insertText(range.index, symbol);
        editor.setSelection(range.index + symbol.length, 0);
      }
    }
    setSymbolsOpen(false);
  };

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

  // Update the ref when value prop changes from parent
  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  const handleChange = (newValue: string) => {
    // Only call onChange if the value has actually changed
    if (newValue !== previousValueRef.current) {
      previousValueRef.current = newValue;
      onChange(newValue);
    }
  };

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
    <div className={cn('rich-text-editor-wrapper space-y-2', className)} id={id}>
      {/* Symbols Dropdown */}
      <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg border">
        <DropdownMenu open={symbolsOpen} onOpenChange={setSymbolsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <span className="text-lg">∑</span>
              <span className="text-sm">Math Symbols</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[400px] max-h-[500px] overflow-y-auto">
            <DropdownMenuLabel>Arithmetic Operations</DropdownMenuLabel>
            <div className="grid grid-cols-4 gap-1 p-2">
              {MATH_SYMBOLS.arithmetic.map((item) => (
                <DropdownMenuItem
                  key={item.symbol}
                  onClick={() => insertSymbol(item.symbol)}
                  className="justify-center text-xl cursor-pointer"
                  title={item.label}
                >
                  {item.symbol}
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Comparison & Relations</DropdownMenuLabel>
            <div className="grid grid-cols-4 gap-1 p-2">
              {MATH_SYMBOLS.comparison.map((item) => (
                <DropdownMenuItem
                  key={item.symbol}
                  onClick={() => insertSymbol(item.symbol)}
                  className="justify-center text-xl cursor-pointer"
                  title={item.label}
                >
                  {item.symbol}
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Algebra</DropdownMenuLabel>
            <div className="grid grid-cols-4 gap-1 p-2">
              {MATH_SYMBOLS.algebra.map((item) => (
                <DropdownMenuItem
                  key={item.symbol}
                  onClick={() => insertSymbol(item.symbol)}
                  className="justify-center text-xl cursor-pointer"
                  title={item.label}
                >
                  {item.symbol}
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Geometry</DropdownMenuLabel>
            <div className="grid grid-cols-4 gap-1 p-2">
              {MATH_SYMBOLS.geometry.map((item) => (
                <DropdownMenuItem
                  key={item.symbol}
                  onClick={() => insertSymbol(item.symbol)}
                  className="justify-center text-xl cursor-pointer"
                  title={item.label}
                >
                  {item.symbol}
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Greek Letters</DropdownMenuLabel>
            <div className="grid grid-cols-6 gap-1 p-2">
              {MATH_SYMBOLS.greek.map((item) => (
                <DropdownMenuItem
                  key={item.symbol}
                  onClick={() => insertSymbol(item.symbol)}
                  className="justify-center text-xl cursor-pointer"
                  title={item.label}
                >
                  {item.symbol}
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Physics</DropdownMenuLabel>
            <div className="grid grid-cols-4 gap-1 p-2">
              {MATH_SYMBOLS.physics.map((item) => (
                <DropdownMenuItem
                  key={item.symbol}
                  onClick={() => insertSymbol(item.symbol)}
                  className="justify-center text-xl cursor-pointer"
                  title={item.label}
                >
                  {item.symbol}
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Chemistry</DropdownMenuLabel>
            <div className="grid grid-cols-4 gap-1 p-2">
              {MATH_SYMBOLS.chemistry.map((item) => (
                <DropdownMenuItem
                  key={item.symbol}
                  onClick={() => insertSymbol(item.symbol)}
                  className="justify-center text-xl cursor-pointer"
                  title={item.label}
                >
                  {item.symbol}
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Fractions</DropdownMenuLabel>
            <div className="grid grid-cols-5 gap-1 p-2">
              {MATH_SYMBOLS.fractions.map((item) => (
                <DropdownMenuItem
                  key={item.symbol}
                  onClick={() => insertSymbol(item.symbol)}
                  className="justify-center text-xl cursor-pointer"
                  title={item.label}
                >
                  {item.symbol}
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Superscripts</DropdownMenuLabel>
            <div className="grid grid-cols-5 gap-1 p-2">
              {MATH_SYMBOLS.superscripts.map((item) => (
                <DropdownMenuItem
                  key={item.symbol}
                  onClick={() => insertSymbol(item.symbol)}
                  className="justify-center text-lg cursor-pointer"
                  title={item.label}
                >
                  {item.symbol}
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Subscripts</DropdownMenuLabel>
            <div className="grid grid-cols-5 gap-1 p-2">
              {MATH_SYMBOLS.subscripts.map((item) => (
                <DropdownMenuItem
                  key={item.symbol}
                  onClick={() => insertSymbol(item.symbol)}
                  className="justify-center text-lg cursor-pointer"
                  title={item.label}
                >
                  {item.symbol}
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <span className="text-xs text-muted-foreground">
          Click to insert mathematical and science symbols into your text
        </span>
      </div>

      {/* Quill Editor */}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-background"
      />
    </div>
  );
}
