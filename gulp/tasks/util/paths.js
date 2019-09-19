const srcPath = 'src';
const destPath = 'dist';

const basePaths = {
  src: {
    root: srcPath,
    sass: `${srcPath}/scss`,
    js: `${srcPath}/js`,
    images: `${srcPath}/images`,
    fonts: `${srcPath}/fonts`,
    video: `${srcPath}/video`,
    ajaxIncludes: `${srcPath}/inc`
  },
  dest: {
    root: destPath,
    css: `${destPath}/css`,
    js: `${destPath}/js`,
    images: `${destPath}/images`,
    fonts: `${destPath}/fonts`,
    video: `${destPath}/video`,
    ajaxIncludes: `${destPath}/inc`
  }
};

module.exports = basePaths;
