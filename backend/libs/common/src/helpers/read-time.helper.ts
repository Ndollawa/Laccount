const WORDS_PER_MIN = 275; // Words per minute (WPM)
const IMAGE_READ_TIME = 12; // Average time to read an image in seconds
const CHINESE_KOREAN_READ_TIME = 500; // Characters per minute for Chinese/Korean
const IMAGE_TAGS = ['img', 'Image']; // HTML image tags

// Helper function to trim whitespaces from a string
const stripWhitespaces = (string) => string.trim();

// Count the number of images from the HTML string
const imageCount = (imageTags, string) => {
  const combinedImageTags = imageTags.join('|');
  const pattern = `<(${combinedImageTags})([\\w\\W]+?)[\\/]?>`;
  const reg = new RegExp(pattern, 'g');
  return (string.match(reg) || []).length;
};

// Calculate the read time for images
const imageReadTime = (
  customImageTime = IMAGE_READ_TIME,
  tags = IMAGE_TAGS,
  string,
) => {
  const count = imageCount(tags, string);
  const seconds =
    count > 10
      ? (count / 2) * (customImageTime + 3) + (count - 10) * 3
      : (count / 2) * (2 * customImageTime + (1 - count));

  return {
    time: seconds / 60, // return in minutes
    count,
  };
};

// Remove HTML tags from a string
const stripTags = (string) => {
  const pattern = `<\\w+(\\s+("[^"]*"|\\'[^\\']*'|[^>])+)?>|<\\/\\w+>`;
  const reg = new RegExp(pattern, 'gi');
  return string.replace(reg, '');
};

// Count the number of words in a string
const wordsCount = (string) => {
  const pattern = `\\w+`;
  const reg = new RegExp(pattern, 'g');
  return (string.match(reg) || []).length;
};

// Calculate the read time for non-latin (Chinese/Korean) characters
const otherLanguageReadTime = (string) => {
  const pattern =
    '[\u3040-\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]';
  const reg = new RegExp(pattern, 'g');
  const count = (string.match(reg) || []).length;
  const time = count / CHINESE_KOREAN_READ_TIME;
  const formattedString = string.replace(reg, ''); // Remove non-latin characters

  return {
    count,
    time,
    formattedString,
  };
};

// Calculate the read time for regular words
const wordsReadTime = (string, wordsPerMin = WORDS_PER_MIN) => {
  const {
    count: characterCount,
    time: nonLatinTime,
    formattedString,
  } = otherLanguageReadTime(string);
  const wordCount = wordsCount(formattedString);
  const wordTime = wordCount / wordsPerMin;

  return {
    characterCount,
    nonLatinTime,
    wordTime,
    wordCount,
  };
};

// Humanize the time (convert time to human-readable format)
const humanizeTime = (time) => {
  if (time < 0.5) {
    return 'less than a minute';
  } else if (time === 1) {
    return '1 minute';
  } else {
    return `${Math.ceil(time)} minutes`;
  }
};

// Main function to calculate total read time (including images and words)
export const totalReadTime = (
  string,
  customImageTime = IMAGE_READ_TIME,
  wordsPerMin = WORDS_PER_MIN,
) => {
  const { time: imageTime, count: imageCount } = imageReadTime(
    customImageTime,
    IMAGE_TAGS,
    string,
  );
  const { characterCount, nonLatinTime, wordTime, wordCount } = wordsReadTime(
    string,
    wordsPerMin,
  );

  const totalTime = imageTime + nonLatinTime + wordTime; // Total time in minutes

  return {
    totalTime: humanizeTime(totalTime),
    imageTime: humanizeTime(imageTime),
    wordTime: humanizeTime(wordTime),
    nonLatinTime: humanizeTime(nonLatinTime),
    wordCount,
    imageCount,
    characterCount,
  };
};

// Example usage:
// const sampleText = "<p>This is a sample text with an image <img src='sample.jpg'/> and some Chinese characters 你好.</p>";
// console.log(totalReadTime(sampleText));
