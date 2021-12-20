import createError from 'http-errors';
import { detect } from 'chardet';

import csv from 'csvtojson';
import iconv from 'iconv-lite';
import requestImageSize from 'request-image-size';

import asyncHandler from './async-handler';

const getImageSize = async (id, url) => {
  const { height, width } = await requestImageSize(url);
  return { id, height, width };
};

const csvUpload = asyncHandler(async (req, res) => {
  const { file } = req;

  // check file and process encoding
  const encoding = detect(file.buffer);

  if (!encoding) {
    throw new createError.BadRequest(
      'Character encoding can not be determined.'
    );
  }

  if (!iconv.encodingExists(encoding)) {
    throw new createError.BadRequest(
      `Character encoding is not supported: ${encoding}`
    );
  }

  // Convert from an encoded buffer to js string.
  const fileContent = iconv.decode(req.file.buffer, encoding);

  // read raw users from file
  const rawImages = await csv({
    trim: true,
    delimiter: [';'],
    headers: ['id', 'name', 'url'],
  }).fromString(fileContent);

  const data = [];
  const errors = [];

  const promises = rawImages.map((val) => getImageSize(val.id, val.url));
  const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
  const validResults = results.filter((result) => !(result instanceof Error));

  rawImages.forEach(({ id, name, url }) => {
    const foundValidResult = validResults.find((val) => val.id === id);
    if (foundValidResult) {
      data.push({
        id,
        name,
        picture: {
          url,
          width: foundValidResult.width,
          height: foundValidResult.height,
        },
      });
    } else {
      errors.push(id);
    }
  });

  res.status(200).json({ data, errors });
});

export default csvUpload;
