const downloadSummary = (
  data: BlobPart,
  headers: any,
  fallbackName = 'results.xlsx'
) => {
  console.log('download started: ', data);
  // detect filename if backend sets it
  let filename = fallbackName;
  const disposition = headers['content-disposition'];
  if (disposition && disposition.includes('filename=')) {
    const match = disposition.match(/filename="?([^"]+)"?/);
    if (match?.[1]) {
      filename = match[1];
    }
  }

  // force Excel MIME type
  const mimeType =
    headers['content-type'] ||
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`;
  document.body.appendChild(a);
  a.click();

  a.remove();
  window.URL.revokeObjectURL(url);
};

export default downloadSummary;
