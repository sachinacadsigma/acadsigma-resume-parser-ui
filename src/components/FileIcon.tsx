import { useEffect, useState } from 'react';

type FileTypeProps = {
  fileType: string | null;
};

const FileIcon = ({ fileType }: FileTypeProps) => {
  const [icon, setIcon] = useState<string>('');

  useEffect(() => {
    if (!fileType) return;

    const ext = fileType.split('/')[1];

    import(`../assets/file_icons/${ext.toUpperCase()}.svg`)
      .then((mod) => setIcon(mod.default))
      .catch(() =>
        import('../assets/file_icons/DOC.svg').then((mod) =>
          setIcon(mod.default)
        )
      );
  }, [fileType]);

  if (!icon) return null;

  return <img src={icon} className='w-10 h-10' />;
};

export default FileIcon;
