import React from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from '@codesandbox/sandpack-react';

// Interface for the component's props, matching the previous StackBlitz component
interface CodeSandboxEditorProps {
  files: { [path: string]: string };
  dependencies?: { [name: string]: string };
  title: string;
  description: string;
  height?: string;
  view?: 'preview' | 'editor';
}

/**
 * A React component that embeds a CodeSandbox Sandpack editor.
 * It's designed as a replacement for the StackBlitz SDK embed.
 *
 * @param {CodeSandboxEditorProps} props The component props.
 * @returns {JSX.Element} The rendered Sandpack editor component.
 */
const CodeSandboxEditor: React.FC<CodeSandboxEditorProps> = ({
  files,
  height ,
  view = 'editor',
}) => {
  // Combine the user-provided files with our generated package.json
  const allFiles = {
    ...files,
  };

  return (
    <SandpackProvider
      // The 'react-ts' template is a modern equivalent to 'create-react-app'
      template="react-ts"
      files={allFiles}
      options={{
        activeFile: 'src/App.tsx', // Default file to open in the editor
        autorun: true,
        externalResources: ['https://cdn.tailwindcss.com'],
      }}
      theme="auto"
    >
      <SandpackLayout
        style={{ height, width: '100%', border: 'none', borderRadius: '8px' }}
      >
        {/* Conditionally show the file explorer for the 'editor' view */}
        {view === 'editor' && <SandpackFileExplorer style={{ height }} />}

        {/* Conditionally show the code editor for the 'editor' view */}
        {view === 'editor' && (
          <SandpackCodeEditor closableTabs showTabs style={{ height }} />
        )}

        {/* The preview is always visible */}
        <SandpackPreview showNavigator={true} style={{ height }} />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default React.memo(CodeSandboxEditor);
