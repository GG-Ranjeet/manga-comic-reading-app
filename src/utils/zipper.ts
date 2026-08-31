import * as FileSystem from 'expo-file-system/legacy';
import { unzipSync } from 'fflate';
// import 'react-native-get-random-values';

const unzip = async (zipUri: string, folderName: string) => {

  const fileName = 'temp_archive.zip';
  const destinationUri = `${FileSystem.cacheDirectory}${fileName}`;

  await FileSystem.copyAsync({
      from: zipUri,
      to: destinationUri,
    });

  // 1. Read ZIP file as base64 string
  const base64Data = await FileSystem.readAsStringAsync(destinationUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // 2. Convert base64 to binary byte array
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // 3. Decompress files
  const unzippedFiles = unzipSync(bytes);

  const safeFolderName = folderName.replace(/[^a-zA-Z0-9_\- ]/g, "");
  const targetFolder = `${FileSystem.documentDirectory}manga_collection/${safeFolderName}/`;
  await FileSystem.makeDirectoryAsync(targetFolder, { intermediates: true });

  // 4. Save extracted images to app storage
  for (const relativePath in unzippedFiles) {
    if (relativePath.includes('__MACOSX') || relativePath.startsWith('.')) continue;

    const fileData = unzippedFiles[relativePath];
    if (relativePath.endsWith('/')) {
      await FileSystem.makeDirectoryAsync(`${targetFolder}${relativePath}`, { intermediates: true });
      continue;
    }

    let binaryStr = '';
    const chunkSize = 8192;
    for (let i = 0; i < fileData.length; i += chunkSize) {
      binaryStr += String.fromCharCode.apply(null, Array.from(fileData.subarray(i, i + chunkSize)));
    }

    await FileSystem.writeAsStringAsync(
      `${targetFolder}${relativePath}`,
      btoa(binaryStr),
      { encoding: FileSystem.EncodingType.Base64 }
    );
  }

  await FileSystem.deleteAsync(destinationUri, { idempotent: true });

  return targetFolder;
};

export { unzip };