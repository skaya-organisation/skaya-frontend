import React from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from '@codesandbox/sandpack-react';

interface CodeSandboxEditorProps {
  files: { [path: string]: string };
  dependencies?: { [name: string]: string };
  title: string;
  description: string;
  height?: string;
  view?: 'preview' | 'editor';
}

const CodeSandboxEditor: React.FC<CodeSandboxEditorProps> = ({
  files,
  height = '100vh',
  view = 'editor',
}) => {
  const allFiles = { ...files };

  return (
    <div
      style={{
        width: '100%',
        height, // ensure outer div has height
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SandpackProvider
        files={allFiles}
        options={{
          activeFile: 'src/main.jsx',
          externalResources: ['https://cdn.tailwindcss.com'],
        }}
        theme="auto"
      >
        <SandpackLayout
          style={{
            height: height, // full height inside container
            width: '100%',
            border: 'none',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'row',
          }}
          className="sandpack-layout"
        >
          {view === 'editor' && (
            <SandpackFileExplorer
            style={{
              minWidth: 180,
              height: '100%',
            }}
            />
          )}


          {view === 'editor' && (
            <SandpackCodeEditor
              showLineNumbers
              showInlineErrors
              wrapContent
              closableTabs
              showTabs
              style={{ flex: 1, height: '100%' }}
            />
          )}

          <SandpackPreview showNavigator={true} style={{ height: '100%' }} />

        </SandpackLayout>
      </SandpackProvider>

      {/* CSS overrides for mobile responsiveness */}
      <style>
        {`
          .sandpack-layout,
          .sp-code-editor,
          .sp-preview {
            height: ${height} !important;
          }

          @media (max-width: 768px) {
            .sandpack-layout {
              flex-direction: column-reverse !important;
            }

            .sp-code-editor {
              height: 20vh !important;
            }

            .sp-file-explorer {
              height: 20vh !important;
            }

            .sp-preview {
              height: 60vh !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default React.memo(CodeSandboxEditor);
