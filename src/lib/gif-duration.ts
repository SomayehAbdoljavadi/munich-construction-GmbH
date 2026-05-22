/**
 * Parse the total animation duration of a GIF (in milliseconds) by reading
 * its Graphics Control Extension blocks. Each GCE carries a 1/100s frame
 * delay; summing them yields the full single-playthrough duration.
 *
 * Returns null if the file cannot be parsed as an animated GIF.
 */
export async function getGifDurationMs(url: string): Promise<number | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = new Uint8Array(await res.arrayBuffer());

    // Header must be GIF87a or GIF89a
    if (buf.length < 6) return null;
    const header = String.fromCharCode(buf[0], buf[1], buf[2]);
    if (header !== "GIF") return null;

    let i = 6; // skip header
    if (i + 7 > buf.length) return null;

    // Logical Screen Descriptor
    const packed = buf[i + 4];
    i += 7;
    const hasGCT = (packed & 0x80) !== 0;
    const gctSize = hasGCT ? 3 * (1 << ((packed & 0x07) + 1)) : 0;
    i += gctSize;

    let totalCs = 0; // hundredths of a second

    while (i < buf.length) {
      const marker = buf[i++];
      if (marker === 0x3b) break; // trailer
      if (marker === 0x21) {
        // Extension
        const label = buf[i++];
        if (label === 0xf9) {
          // Graphics Control Extension
          const blockSize = buf[i++]; // should be 4
          if (blockSize === 4 && i + 4 <= buf.length) {
            const delay = buf[i + 1] | (buf[i + 2] << 8);
            totalCs += delay;
          }
          i += blockSize;
          // skip sub-blocks until terminator
          while (i < buf.length && buf[i] !== 0) i += buf[i] + 1;
          i++; // terminator
        } else {
          // skip other extensions
          while (i < buf.length && buf[i] !== 0) i += buf[i] + 1;
          i++;
        }
      } else if (marker === 0x2c) {
        // Image Descriptor
        if (i + 9 > buf.length) break;
        const imgPacked = buf[i + 8];
        i += 9;
        const hasLCT = (imgPacked & 0x80) !== 0;
        const lctSize = hasLCT ? 3 * (1 << ((imgPacked & 0x07) + 1)) : 0;
        i += lctSize;
        i++; // LZW min code size
        while (i < buf.length && buf[i] !== 0) i += buf[i] + 1;
        i++; // terminator
      } else {
        break;
      }
    }

    if (totalCs <= 0) return null;
    return totalCs * 10; // → ms
  } catch {
    return null;
  }
}
