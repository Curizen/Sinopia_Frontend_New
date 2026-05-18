import { useMemo } from 'react';

interface TermsContentProps {
  content: string;
  className?: string;
}

export function TermsContent({ content, className = '' }: TermsContentProps) {
  const renderedContent = useMemo(() => {
    const lines = content.split('\n');
    
    return lines.map((line, index) => {
      const parts: (string | JSX.Element)[] = [];
      let remaining = line;
      let keyCounter = 0;
      
      while (remaining.length > 0) {
        const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
        
        if (boldMatch && boldMatch.index !== undefined) {
          if (boldMatch.index > 0) {
            parts.push(remaining.slice(0, boldMatch.index));
          }
          parts.push(
            <strong key={`${index}-${keyCounter++}`} className="font-semibold text-foreground">
              {boldMatch[1]}
            </strong>
          );
          remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
        } else {
          parts.push(remaining);
          break;
        }
      }
      
      return (
        <span key={index}>
          {parts}
          {index < lines.length - 1 && '\n'}
        </span>
      );
    });
  }, [content]);

  return (
    <div className={`whitespace-pre-line ${className}`} data-testid="terms-content">
      {renderedContent}
    </div>
  );
}
