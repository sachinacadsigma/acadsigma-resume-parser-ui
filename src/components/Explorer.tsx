import { useEffect, useRef, useState } from 'react';
import { FilePlus, Edit2, Trash2, Check, X, FileText } from 'lucide-react';

type FileItem = {
  id: string;
  name: string; // filename with extension
  content?: string;
  createdAt: string;
};

export default function FileExplorer({
  storageKey = 'vscode_files',
  initialFiles = [],
}: {
  storageKey?: string;
  initialFiles?: FileItem[];
}) {
  const [files, setFiles] = useState<FileItem[]>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) return JSON.parse(raw) as FileItem[];
    } catch (e) {
      // ignore
    }
    return initialFiles;
  });

  const [selectedId, setSelectedId] = useState<string | null>(
    files.length ? files[0].id : null
  );
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // persist files
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(files));
    } catch (e) {
      // ignore
    }
  }, [files, storageKey]);

  useEffect(() => {
    // focus input when starting rename
    if (renamingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [renamingId]);

  useEffect(() => {
    // keep selectedId stable if files change
    if (files.length === 0) {
      setSelectedId(null);
    } else if (!selectedId) {
      setSelectedId(files[0].id);
    } else if (!files.find((f) => f.id === selectedId)) {
      setSelectedId(files[0].id);
    }
  }, [files, selectedId]);

  const createFile = (preferredName?: string) => {
    const base = preferredName || 'untitled';
    // ensure unique name
    let name = `${base}.txt`;
    let counter = 1;
    while (files.some((f) => f.name === name)) {
      name = `${base} (${counter}).txt`;
      counter += 1;
    }
    const newFile: FileItem = {
      id: cryptoRandomId(),
      name,
      content: '',
      createdAt: new Date().toISOString(),
    };
    setFiles((prev) => [newFile, ...prev]);
    setSelectedId(newFile.id);
    // open rename immediately
    setRenamingId(newFile.id);
    setTempName(newFile.name);
  };

  const selectFile = (id: string) => {
    setSelectedId(id);
  };

  const startRename = (id: string) => {
    setRenamingId(id);
    const f = files.find((x) => x.id === id);
    setTempName(f?.name ?? '');
  };

  const confirmRename = (id: string) => {
    const trimmed = tempName.trim();
    if (!trimmed) return;
    // avoid duplicates
    const exists = files.some((f) => f.name === trimmed && f.id !== id);
    if (exists) {
      // append suffix
      let base = trimmed;
      let ext = '';
      const lastDot = trimmed.lastIndexOf('.');
      if (lastDot > 0) {
        base = trimmed.slice(0, lastDot);
        ext = trimmed.slice(lastDot);
      }
      let counter = 1;
      let name = trimmed;
      while (files.some((f) => f.name === name && f.id !== id)) {
        name = `${base} (${counter})${ext}`;
        counter++;
      }
      setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
    } else {
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, name: trimmed } : f))
      );
    }
    setRenamingId(null);
  };

  const cancelRename = () => {
    setRenamingId(null);
    setTempName('');
  };

  const deleteFile = (id: string) => {
    const idx = files.findIndex((f) => f.id === id);
    if (idx === -1) return;
    const next = [...files.slice(0, idx), ...files.slice(idx + 1)];
    setFiles(next);
    if (selectedId === id) {
      setSelectedId(next.length ? next[0].id : null);
    }
  };

  // small helper to generate ids (fallback if crypto not available)
  function cryptoRandomId() {
    try {
      return (
        crypto.getRandomValues(new Uint32Array(1))[0].toString(36) +
        Date.now().toString(36)
      );
    } catch (e) {
      return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }
  }

  // keyboard handlers: Enter to create file, Delete to delete selected, F2 to rename
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // ignore when typing in input
      const active = document.activeElement;
      if (
        active &&
        (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')
      )
        return;

      if (e.key === 'F2' && selectedId) {
        e.preventDefault();
        startRename(selectedId);
      } else if (e.key === 'Delete' && selectedId) {
        e.preventDefault();
        deleteFile(selectedId);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        createFile('untitled');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, files]);

  return (
    <div className='w-full max-w-xs rounded-md p-3'>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='text-sm font-semibold flex items-center gap-2 text-gray-700'>
          <FileText size={16} /> Files
        </h3>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => createFile()}
            title='New File (Ctrl/Cmd + N)'
            className='p-1 rounded-md hover:bg-gray-100'
          >
            <FilePlus size={16} />
          </button>
        </div>
      </div>

      <div className='space-y-1'>
        {files.length === 0 && (
          <div className='text-sm text-gray-500 px-2 py-4'>
            No files. Create one with{' '}
            <span className='font-medium'>Ctrl/Cmd + N</span>.
          </div>
        )}

        {files.map((f) => {
          const isSelected = f.id === selectedId;
          const isRenaming = f.id === renamingId;
          return (
            <div
              key={f.id}
              className={`flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer ${
                isSelected ? 'bg-primary/10' : 'hover:bg-gray-100'
              }`}
              onClick={() => selectFile(f.id)}
              onDoubleClick={() => startRename(f.id)}
              role='button'
              aria-pressed={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') selectFile(f.id);
                if (e.key === 'F2') startRename(f.id);
              }}
            >
              <div className='w-6 flex items-center justify-center text-gray-500'>
                <FileText size={14} />
              </div>

              {!isRenaming ? (
                <div className='flex-1 text-sm text-gray-700 truncate'>
                  {f.name}
                </div>
              ) : (
                <div className='flex-1'>
                  <input
                    ref={inputRef}
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') confirmRename(f.id);
                      if (e.key === 'Escape') cancelRename();
                    }}
                    className='w-full px-2 py-1 border rounded text-sm'
                  />
                </div>
              )}

              <div className='flex items-center gap-2'>
                {!isRenaming ? (
                  <>
                    <button
                      onClick={(ev) => {
                        ev.stopPropagation();
                        startRename(f.id);
                      }}
                      title='Rename (F2)'
                      className='p-1 rounded hover:bg-gray-100'
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={(ev) => {
                        ev.stopPropagation();
                        if (confirm(`Delete ${f.name}?`)) deleteFile(f.id);
                      }}
                      title='Delete'
                      className='p-1 rounded hover:bg-gray-100 text-red-600'
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={(ev) => {
                        ev.stopPropagation();
                        confirmRename(f.id);
                      }}
                      title='Confirm'
                      className='p-1 rounded hover:bg-gray-100 text-green-600'
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={(ev) => {
                        ev.stopPropagation();
                        cancelRename();
                      }}
                      title='Cancel'
                      className='p-1 rounded hover:bg-gray-100 text-gray-600'
                    >
                      <X size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer - small actions */}
      <div className='mt-3 flex items-center gap-2 text-xs text-gray-500'>
        <div className='flex-1'>{files.length} files</div>
      </div>
    </div>
  );
}
