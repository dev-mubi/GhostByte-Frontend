const API_URL = process.env.REACT_APP_API_URL;

export async function uploadEncryptedFile(bytes, originalName) {
  const formData = new FormData();
  formData.append("file", new Blob([bytes]));
  formData.append("filename", originalName);

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  return {
    downloadUrl: data.downloadUrl,
    originalName,
  };
}
