function DecodeUTF8(bytes) {
  const textDecoderUTF8 = new TextDecoder("utf-8");
  const decoded = textDecoderUTF8.decode(bytes);
  const data = JSON.parse(decoded);

  return data;
}

function EncodeUTF8(data) {
  const textEncoderUTF8 = new TextEncoder("utf-8");
  const json = JSON.stringify(data);
  const bytes = textEncoderUTF8.encode(json);

  return bytes;
}

function SortProducts({ data, encodedMergeObject }) {
  const products = DecodeUTF8(data);
  const mergeObject =
    encodedMergeObject?.length > 0 ? DecodeUTF8(encodedMergeObject) : {};

  for (const product of products) {
    const category = product.product_category;

    if (
      // Проверка на существование категории
      Object.prototype.hasOwnProperty.call(mergeObject, category)
    ) {
      mergeObject[category].push(product);
    } else {
      mergeObject[category] = [product];
    }
  }

  const encoded = EncodeUTF8(mergeObject);

  postMessage(encoded);
}

addEventListener("message", ({ data }) => {
  new Promise((resolve) => resolve(SortProducts(data)));
});
