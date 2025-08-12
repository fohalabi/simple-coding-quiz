import React from 'react';
import { CodeBlockProps } from './types';

const CodeBlockProps: React.FC<CodeBlockProps> = ({ code, language }) => {
    const getLanguageClass = (lang: string) => {
        const classes: {
            javascript: 'bg-yellow-50 border-yellow-200',
            css: 'bg-blue-50 border-blue-200',
            html: 'bg-orange-50 border-orange-200',
        };
        return classes[lang as keyof typeof classes] || 'bg-gray-50 border-gray-200';
    };

    return (
        <div className={`border-2 rounded-lg p-4 mb-6 ${getLanguageClass(language)}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {language}
        </span>
      </div>
      <pre className="text-sm font-mono text-gray-800 overflow-x-auto whitespace-pre-wrap">
        {code}
      </pre>
    </div>
    );
};

export default CodeBlockProps;