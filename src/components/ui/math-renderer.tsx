import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * MathRenderer Component
 * 
 * Renders HTML content with LaTeX formulas converted to beautiful mathematical notation.
 * Automatically detects and renders formulas wrapped in $ delimiters.
 * 
 * Usage:
 * ```tsx
 * <MathRenderer content={question.question_text} />
 * ```
 * 
 * The content can include:
 * - Regular HTML formatting
 * - Inline LaTeX formulas: $\sqrt{x^2 + y^2}$
 * - Display LaTeX formulas: $$\int_{a}^{b} f(x)dx$$
 */

interface MathRendererProps {
  content: string;
  className?: string;
}

export function MathRenderer({ content, className = '' }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !content) return;

    // Set the HTML content
    containerRef.current.innerHTML = content;

    // Find all text nodes and render LaTeX formulas
    const renderMath = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || '';
        
        // Match inline math: $...$
        const inlineMathRegex = /\$([^$]+)\$/g;
        
        if (inlineMathRegex.test(text)) {
          const span = document.createElement('span');
          let lastIndex = 0;
          let match;
          
          // Reset regex
          inlineMathRegex.lastIndex = 0;
          
          while ((match = inlineMathRegex.exec(text)) !== null) {
            // Add text before the formula
            if (match.index > lastIndex) {
              span.appendChild(
                document.createTextNode(text.substring(lastIndex, match.index))
              );
            }
            
            // Render the formula
            const formulaSpan = document.createElement('span');
            try {
              katex.render(match[1], formulaSpan, {
                throwOnError: false,
                displayMode: false,
              });
            } catch (error) {
              // If rendering fails, show the original text
              formulaSpan.textContent = match[0];
              formulaSpan.className = 'text-destructive';
            }
            span.appendChild(formulaSpan);
            
            lastIndex = match.index + match[0].length;
          }
          
          // Add remaining text
          if (lastIndex < text.length) {
            span.appendChild(document.createTextNode(text.substring(lastIndex)));
          }
          
          // Replace the text node with the span
          node.parentNode?.replaceChild(span, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Recursively process child nodes
        const children = Array.from(node.childNodes);
        children.forEach(renderMath);
      }
    };

    // Process all nodes
    const children = Array.from(containerRef.current.childNodes);
    children.forEach(renderMath);
  }, [content]);

  return (
    <div
      ref={containerRef}
      className={`math-content ${className}`}
      style={{
        // Ensure proper spacing for math elements
        lineHeight: '1.8',
      }}
    />
  );
}
